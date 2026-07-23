'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const MULTI_ACCOUNT_PATH = path.join(__dirname, '..', 'MultiAccount.gs');
const MULTI_ACCOUNT_SOURCE = fs.readFileSync(MULTI_ACCOUNT_PATH, 'utf8');
const ROLES = ['viewer', 'responder', 'manager', 'admin', 'owner'];
const INVITE_ROLES = ['viewer', 'responder', 'manager', 'admin'];
const ROLE_ORDER = new Map(ROLES.map((role, index) => [role, index]));

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function makeRegistry() {
  const now = Date.now();
  return {
    v: 1,
    revision: 1,
    zones: [
      { id: 'zone-shared', name: 'Shared', ownerUserId: '1001', createdAt: now },
      { id: 'zone-other', name: 'Other', ownerUserId: '9001', createdAt: now },
    ],
    members: [
      { zoneId: 'zone-shared', userId: '1001', role: 'owner', status: 'active', addedAt: now },
      { zoneId: 'zone-other', userId: '9001', role: 'owner', status: 'active', addedAt: now },
    ],
    connections: [
      {
        id: 'gmail-shared-first',
        zoneId: 'zone-shared',
        provider: 'google_oauth',
        email: 'shared@example.invalid',
        displayName: 'Shared',
        avatarUrl: '',
        status: 'active',
        connectedByUserId: '1001',
        connectedAt: now,
        tokenGeneration: 1,
      },
      {
        id: 'gmail-shared-second',
        zoneId: 'zone-shared',
        provider: 'google_oauth',
        email: 'shared@example.invalid',
        displayName: 'Shared',
        avatarUrl: '',
        status: 'active',
        connectedByUserId: '1001',
        connectedAt: now,
        tokenGeneration: 1,
      },
      {
        id: 'gmail-shared-reauth',
        zoneId: 'zone-shared',
        provider: 'google_oauth',
        email: 'reauth@example.invalid',
        displayName: 'Reauth',
        avatarUrl: '',
        status: 'reauth_required',
        connectedByUserId: '1001',
        connectedAt: now,
        tokenGeneration: 2,
      },
      {
        id: 'gmail-shared-revoked',
        zoneId: 'zone-shared',
        provider: 'google_oauth',
        email: 'revoked@example.invalid',
        displayName: 'Revoked',
        avatarUrl: '',
        status: 'revoked',
        connectedByUserId: '1001',
        connectedAt: now,
        tokenGeneration: 3,
      },
      {
        id: 'gmail-other',
        zoneId: 'zone-other',
        provider: 'google_oauth',
        email: 'other@example.invalid',
        displayName: 'Other',
        avatarUrl: '',
        status: 'active',
        connectedByUserId: '9001',
        connectedAt: now,
        tokenGeneration: 1,
      },
    ],
    invites: [],
    preferences: [],
  };
}

function addMember(registry, userId, role, status = 'active', zoneId = 'zone-shared') {
  registry.members.push({ zoneId, userId, role, status, addedAt: Date.now() });
}

function inviteRecord(token, overrides = {}) {
  return Object.assign({
    id: 'invite-' + token.slice(0, 20),
    zoneId: 'zone-shared',
    role: 'viewer',
    status: 'pending',
    secretHash: 'hash:' + token,
    createdByUserId: '1001',
    createdAt: Date.now() - 1000,
    expiresAt: Date.now() + 60000,
    acceptedByUserId: '',
    acceptedAt: 0,
  }, overrides);
}

function makeHarness(initialRegistry) {
  const state = { registry: clone(initialRegistry) };
  let randomCounter = 0;
  const sandbox = {
    console,
    mailboxError_: (code, message) => Object.assign(new Error(message), { code }),
    mailboxAssertAllowedKeys_: (value, allowed) => {
      const unknown = Object.keys(value || {}).find(key => !allowed.includes(key));
      if (unknown) throw Object.assign(new Error('Unexpected key: ' + unknown), { code: 'INVALID_REQUEST' });
    },
    mailboxIsPlainObject_: value => value !== null && typeof value === 'object' && !Array.isArray(value),
    mailboxSafeText_: value => String(value || ''),
    mailboxSafeEmail_: value => String(value || ''),
    constantTimeEqual_: (left, right) => String(left) === String(right),
    LockService: {
      getScriptLock: () => ({ tryLock: () => true, releaseLock: () => {} }),
    },
    PropertiesService: {
      getScriptProperties: () => ({}),
    },
  };

  vm.createContext(sandbox);
  vm.runInContext(MULTI_ACCOUNT_SOURCE, sandbox);

  sandbox.__readRegistry = () => clone(state.registry);
  sandbox.__writeRegistry = (_properties, registry) => {
    state.registry = clone(registry);
    return clone(state.registry);
  };
  sandbox.__hashText = value => 'hash:' + String(value);
  sandbox.__randomToken = () => {
    randomCounter += 1;
    return String.fromCharCode(64 + randomCounter).repeat(43);
  };
  vm.runInContext(`
    mailboxMultiReadRegistry_ = __readRegistry;
    mailboxMultiWriteRegistry_ = __writeRegistry;
    mailboxMultiHashText_ = __hashText;
    mailboxRandomToken_ = __randomToken;
  `, sandbox);

  return { sandbox, state };
}

function expectCode(action, expectedCode) {
  let caught = null;
  try {
    action();
  } catch (error) {
    caught = error;
  }
  assert.ok(caught, 'expected ' + expectedCode + ' to be thrown');
  assert.equal(caught.code, expectedCode);
}

test('mailbox access enforces the complete five-role threshold matrix', () => {
  for (const actualRole of ROLES) {
    const registry = makeRegistry();
    const userId = actualRole === 'owner' ? '1001' : String(2000 + ROLE_ORDER.get(actualRole));
    if (actualRole !== 'owner') addMember(registry, userId, actualRole);
    const { sandbox } = makeHarness(registry);

    for (const minimumRole of ROLES) {
      const allowed = ROLE_ORDER.get(actualRole) >= ROLE_ORDER.get(minimumRole);
      if (allowed) {
        const access = sandbox.mailboxMultiResolveAccess_(
          { userId },
          'gmail-shared-first',
          minimumRole,
          registry
        );
        assert.equal(access.connection.id, 'gmail-shared-first');
        assert.equal(access.member.role, actualRole);
      } else {
        expectCode(
          () => sandbox.mailboxMultiResolveAccess_(
            { userId },
            'gmail-shared-first',
            minimumRole,
            registry
          ),
          'FORBIDDEN'
        );
      }
    }
  }
});

test('owner and shared-role access select the exact connection and deny other zones or users', () => {
  const registry = makeRegistry();
  addMember(registry, '2002', 'responder');
  const { sandbox } = makeHarness(registry);

  const ownerAccess = sandbox.mailboxMultiResolveAccess_(
    { userId: '1001' },
    'gmail-shared-first',
    'owner',
    registry
  );
  assert.equal(ownerAccess.member.role, 'owner');

  const session = { userId: '2002', connectionId: 'gmail-shared-first' };
  const selected = sandbox.mailboxMultiSelectConnection_(session, 'gmail-shared-second', registry);
  assert.equal(selected.connection.id, 'gmail-shared-second');
  assert.equal(session.connectionId, 'gmail-shared-second');
  assert.equal(session.zoneId, 'zone-shared');
  assert.equal(session.role, 'responder');

  expectCode(
    () => sandbox.mailboxMultiResolveAccess_(session, 'gmail-other', 'viewer', registry),
    'FORBIDDEN'
  );
  expectCode(
    () => sandbox.mailboxMultiResolveAccess_({ userId: '7777' }, 'gmail-shared-first', 'viewer', registry),
    'FORBIDDEN'
  );
});

test('revoked membership and connection stay inaccessible and hidden while reauth remains explicit', () => {
  const registry = makeRegistry();
  addMember(registry, '2001', 'viewer');
  const { sandbox } = makeHarness(registry);
  const visible = sandbox.mailboxMultiVisibleAccounts_({ userId: '2001' }, registry);

  assert.deepEqual(
    visible.map(item => item.id).sort(),
    ['gmail-shared-first', 'gmail-shared-reauth', 'gmail-shared-second']
  );
  assert.equal(visible.find(item => item.id === 'gmail-shared-reauth').requiresReauth, true);
  expectCode(
    () => sandbox.mailboxMultiResolveAccess_(
      { userId: '2001' },
      'gmail-shared-revoked',
      'viewer',
      registry
    ),
    'NOT_FOUND'
  );
  expectCode(
    () => sandbox.mailboxMultiSelectConnection_(
      { userId: '2001', connectionId: 'gmail-shared-first' },
      'gmail-shared-reauth',
      registry
    ),
    'REAUTH_REQUIRED'
  );

  registry.members.find(item => item.userId === '2001').status = 'revoked';
  assert.deepEqual(sandbox.mailboxMultiVisibleAccounts_({ userId: '2001' }, registry), []);
  expectCode(
    () => sandbox.mailboxMultiResolveAccess_(
      { userId: '2001' },
      'gmail-shared-first',
      'viewer',
      registry
    ),
    'FORBIDDEN'
  );
});

test('pending invites grant no access and expired, revoked, or replayed invites fail closed', () => {
  const token = 'P'.repeat(43);
  const pendingRegistry = makeRegistry();
  pendingRegistry.invites.push(inviteRecord(token));
  const pendingHarness = makeHarness(pendingRegistry);
  expectCode(
    () => pendingHarness.sandbox.mailboxMultiResolveAccess_(
      { userId: '3001' },
      'gmail-shared-first',
      'viewer',
      pendingRegistry
    ),
    'FORBIDDEN'
  );

  const cases = [
    { status: 'pending', expiresAt: Date.now() - 1 },
    { status: 'revoked' },
    { status: 'accepted', acceptedByUserId: '3001', acceptedAt: Date.now() - 10 },
    { status: 'expired', expiresAt: Date.now() - 1 },
  ];
  for (const state of cases) {
    const registry = makeRegistry();
    registry.invites.push(inviteRecord(token, state));
    const { sandbox } = makeHarness(registry);
    expectCode(() => sandbox.mailboxMultiAcceptInvite_('3001', token), 'INVALID_INVITE');
  }
});

test('accepted invitations grant each supported shared role once and enforce its exact threshold', () => {
  for (const role of INVITE_ROLES) {
    const token = role.charAt(0).toUpperCase().repeat(43);
    const registry = makeRegistry();
    registry.invites.push(inviteRecord(token, { role }));
    const { sandbox, state } = makeHarness(registry);
    const userId = String(4000 + ROLE_ORDER.get(role));

    assert.deepEqual(
      clone(sandbox.mailboxMultiAcceptInvite_(userId, token)),
      { zoneId: 'zone-shared', role }
    );
    const member = state.registry.members.find(item => item.userId === userId);
    assert.equal(member.status, 'active');
    assert.equal(member.role, role);
    assert.equal(state.registry.invites[0].status, 'accepted');
    assert.equal(state.registry.invites[0].acceptedByUserId, userId);

    const access = sandbox.mailboxMultiResolveAccess_(
      { userId },
      'gmail-shared-first',
      role,
      state.registry
    );
    assert.equal(access.member.role, role);
    const nextRole = ROLES[ROLE_ORDER.get(role) + 1];
    expectCode(
      () => sandbox.mailboxMultiResolveAccess_(
        { userId },
        'gmail-shared-first',
        nextRole,
        state.registry
      ),
      'FORBIDDEN'
    );
    expectCode(() => sandbox.mailboxMultiAcceptInvite_(userId, token), 'INVALID_INVITE');
  }
});

test('a valid invite can reactivate a revoked member only with the invited role', () => {
  const token = 'M'.repeat(43);
  const registry = makeRegistry();
  addMember(registry, '5001', 'viewer', 'revoked');
  registry.invites.push(inviteRecord(token, { role: 'manager' }));
  const { sandbox, state } = makeHarness(registry);

  assert.deepEqual(
    clone(sandbox.mailboxMultiAcceptInvite_('5001', token)),
    { zoneId: 'zone-shared', role: 'manager' }
  );
  const member = state.registry.members.find(item => item.userId === '5001');
  assert.equal(member.status, 'active');
  assert.equal(member.role, 'manager');
});

test('invite creation follows the actual actor-role and delegated-role matrix', () => {
  for (const actorRole of ROLES) {
    for (const invitedRole of INVITE_ROLES) {
      const registry = makeRegistry();
      const actorUserId = actorRole === 'owner' ? '1001' : String(6000 + ROLE_ORDER.get(actorRole));
      if (actorRole !== 'owner') addMember(registry, actorUserId, actorRole);
      const { sandbox, state } = makeHarness(registry);
      const allowed = ROLE_ORDER.get(actorRole) >= ROLE_ORDER.get('admin') &&
        ROLE_ORDER.get(invitedRole) < ROLE_ORDER.get(actorRole);

      if (allowed) {
        const result = sandbox.mailboxMultiCreateInvite_(
          { userId: actorUserId },
          { zoneId: 'zone-shared', role: invitedRole }
        );
        assert.equal(typeof result.inviteToken, 'string');
        assert.equal(result.inviteToken.length, 43);
        const created = state.registry.invites.at(-1);
        assert.equal(created.status, 'pending');
        assert.equal(created.role, invitedRole);
        assert.equal(created.createdByUserId, actorUserId);
      } else {
        expectCode(
          () => sandbox.mailboxMultiCreateInvite_(
            { userId: actorUserId },
            { zoneId: 'zone-shared', role: invitedRole }
          ),
          'FORBIDDEN'
        );
      }
    }
  }
});
