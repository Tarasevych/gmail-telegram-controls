const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const multiSource = fs.readFileSync(path.resolve(__dirname, '..', 'MultiAccount.gs'), 'utf8');
const codeSource = fs.readFileSync(path.resolve(__dirname, '..', 'Code.gs'), 'utf8');

const STATE_PROPERTY = 'MAILBOX_SOURCE_OAUTH_STATES_V1';
const REGISTRY_PROPERTY = 'MAILBOX_SOURCE_REGISTRY_V1';
const TOKEN_PREFIX = 'MAILBOX_SOURCE_OAUTH_TOKEN_V1_';
const DRIVE_SCOPE = 'https://www.googleapis.com/auth/drive.readonly';
const REDIRECT_URI =
  'https://script.google.com/macros/s/TEST_DEPLOYMENT_ID/exec?action=drive_oauth_callback';

class MemoryProperties {
  constructor(initial = {}) {
    this.values = new Map(Object.entries(initial).map(([key, value]) => [key, String(value)]));
  }

  getProperty(key) {
    return this.values.has(key) ? this.values.get(key) : null;
  }

  setProperty(key, value) {
    this.values.set(key, String(value));
  }

  setProperties(values) {
    Object.entries(values || {}).forEach(([key, value]) => this.setProperty(key, value));
  }

  deleteProperty(key) {
    this.values.delete(key);
  }
}

function plain(value) {
  return JSON.parse(JSON.stringify(value));
}

function captureError(callback) {
  try {
    callback();
  } catch (error) {
    return error;
  }
  throw new Error('Expected callback to throw.');
}

function tokenFor(index) {
  return `S${String(index).padStart(6, '0')}${'x'.repeat(36)}`;
}

function response(status, body = {}) {
  return {
    body,
    getResponseCode() {
      return status;
    },
    getContentText() {
      return JSON.stringify(body);
    },
  };
}

function createHarness() {
  const properties = new MemoryProperties({
    GOOGLE_OAUTH_CLIENT_ID: '123456789-drive-test.apps.googleusercontent.com',
    GOOGLE_OAUTH_CLIENT_SECRET: 'synthetic-client-secret-value',
    GOOGLE_DRIVE_OAUTH_REDIRECT_URI: REDIRECT_URI,
  });
  const randomTokens = [];
  const fetchCalls = [];
  const exchangeCalls = [];
  let now = 1760000000000;
  let fetchHandler = () => {
    throw new Error('Unexpected external fetch in synthetic contract.');
  };
  let exchangeHandler = code => ({
    accessToken: `access_${code}_synthetic`,
    refreshToken: `refresh_${code}_synthetic`,
    expiresAt: now + 3600000,
    scopes: ['openid', 'email', 'profile', DRIVE_SCOPE],
  });
  let identity = {
    email: 'drive.owner@example.invalid',
    subject: 'drive-owner-subject',
    displayName: 'Drive Owner',
    avatarUrl: 'https://profiles.example.invalid/drive-owner.png',
  };

  const NativeDate = Date;
  class FakeDate extends NativeDate {}
  FakeDate.now = () => now;

  const context = {
    console: { log() {}, warn() {}, error() {} },
    Date: FakeDate,
    LockService: {
      getScriptLock() {
        return { tryLock: () => true, releaseLock() {} };
      },
    },
    PropertiesService: {
      getScriptProperties() {
        return properties;
      },
    },
    UrlFetchApp: {
      fetch(url, options) {
        fetchCalls.push({ url: String(url), options: plain(options || {}) });
        return fetchHandler(String(url), options || {});
      },
    },
  };
  vm.createContext(context);
  vm.runInContext(multiSource, context, { filename: 'MultiAccount.gs' });

  Object.assign(context, {
    assertTelegramPropertyStoreFits_() {},
    assertTelegramPropertyValueFits_() {},
    constantTimeEqual_(left, right) {
      return String(left || '') === String(right || '');
    },
    mailboxAssertAllowedKeys_(value, allowed) {
      Object.keys(value || {}).forEach(key => {
        if (!allowed.includes(key)) {
          throw context.mailboxError_('INVALID_REQUEST', 'Unexpected request field.');
        }
      });
    },
    mailboxError_(code, message) {
      const error = new Error(String(message || code));
      error.code = code;
      return error;
    },
    mailboxGoogleExchangeCode_(config, code) {
      exchangeCalls.push({ redirectUri: config.redirectUri, code: String(code) });
      return exchangeHandler(String(code));
    },
    mailboxGoogleFetchOpenIdIdentity_() {
      return { ...identity };
    },
    mailboxGoogleJson_(value) {
      return value && value.body;
    },
    mailboxGoogleSafeToken_(value) {
      const token = String(value || '');
      return token.length >= 16 && token.length <= 4096 && !/[\s\u0000-\u001f\u007f]/.test(token)
        ? token
        : '';
    },
    mailboxIsPlainObject_(value) {
      return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
    },
    mailboxMultiHashText_(value) {
      return crypto.createHash('sha256').update(String(value), 'utf8').digest('hex');
    },
    mailboxMultiOpaqueId_(value, prefix) {
      const candidate = String(value || '');
      if (!new RegExp(`^${prefix}-[a-f0-9]{24}$`).test(candidate)) {
        throw context.mailboxError_('INVALID_SOURCE', 'Invalid opaque source id.');
      }
      return candidate;
    },
    mailboxMultiSafeAvatarUrl_(value) {
      const candidate = String(value || '');
      return /^https:\/\/[A-Za-z0-9.-]+(?:\/[^\s]*)?$/.test(candidate) ? candidate : '';
    },
    mailboxMultiTimestamp_(value) {
      const candidate = Number(value);
      if (!Number.isInteger(candidate) || candidate < 1) {
        throw context.mailboxError_('SERVER_CONFIG', 'Invalid timestamp.');
      }
      return candidate;
    },
    mailboxRandomToken_() {
      if (!randomTokens.length) throw new Error('Synthetic state queue is empty.');
      return randomTokens.shift();
    },
    mailboxSafeEmail_(value) {
      const candidate = String(value || '').toLowerCase();
      return candidate.length <= 254 && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(candidate)
        ? candidate
        : '';
    },
    mailboxSafeText_(value, limit) {
      const candidate = String(value || '').trim();
      return candidate.length <= Number(limit || 0) && !/[\u0000-\u001f\u007f]/.test(candidate)
        ? candidate
        : '';
    },
  });

  return {
    context,
    exchangeCalls,
    fetchCalls,
    properties,
    get now() {
      return now;
    },
    queueState(value) {
      randomTokens.push(value);
    },
    setExchange(handler) {
      exchangeHandler = handler;
    },
    setFetch(handler) {
      fetchHandler = handler;
    },
    setIdentity(value) {
      identity = { ...value };
    },
    setNow(value) {
      now = Number(value);
    },
  };
}

function startDrive(harness, userId, state, loginHint = '') {
  harness.queueState(state);
  return harness.context.mailboxDriveConnectStart_(
    { provider: 'drive', loginHint },
    { userId: String(userId) }
  );
}

function persistDrive(harness, userId, suffix, refreshToken = `refresh_${suffix}_synthetic`) {
  return harness.context.mailboxDrivePersistConnection_(
    { provider: 'drive', userId: String(userId) },
    {
      accessToken: `access_${suffix}_synthetic`,
      refreshToken,
      expiresAt: harness.now + 3600000,
      scopes: ['openid', 'email', 'profile', DRIVE_SCOPE],
    },
    {
      email: `drive.${suffix}@example.invalid`,
      subject: `subject-${suffix}`,
      displayName: `Drive ${suffix}`,
      avatarUrl: `https://profiles.example.invalid/${suffix}.png`,
    }
  );
}

function sourceBetween(source, start, end) {
  const from = source.indexOf(start);
  const to = source.indexOf(end, from + start.length);
  assert.notEqual(from, -1, `Missing source marker: ${start}`);
  assert.notEqual(to, -1, `Missing source marker: ${end}`);
  return source.slice(from, to);
}

test('Drive start binds owner to an opaque bounded state and exact callback URL', () => {
  const h = createHarness();
  const firstState = tokenFor(1);
  const started = startDrive(h, '1001', firstState, 'drive.owner@example.invalid');
  const authorizationUrl = new URL(started.authorizationUrl);

  assert.equal(authorizationUrl.origin, 'https://accounts.google.com');
  assert.equal(authorizationUrl.pathname, '/o/oauth2/v2/auth');
  assert.equal(authorizationUrl.searchParams.get('redirect_uri'), REDIRECT_URI);
  assert.equal(authorizationUrl.searchParams.get('state'), firstState);
  assert.equal(authorizationUrl.searchParams.get('scope').split(' ').includes(DRIVE_SCOPE), true);
  assert.equal(authorizationUrl.searchParams.get('access_type'), 'offline');
  assert.equal(authorizationUrl.searchParams.get('prompt'), 'select_account consent');
  assert.deepEqual(plain(Object.keys(started).sort()), ['authorizationUrl', 'expiresAt', 'provider']);

  const serialized = h.properties.getProperty(STATE_PROPERTY);
  const stored = JSON.parse(serialized);
  assert.equal(serialized.includes(firstState), false);
  assert.equal(stored.length, 1);
  assert.equal(stored[0].hash, crypto.createHash('sha256').update(firstState).digest('hex'));
  assert.equal(stored[0].provider, 'drive');
  assert.equal(stored[0].userId, '1001');
  assert.equal(stored[0].expiresAt - stored[0].createdAt, 10 * 60 * 1000);

  const replacement = tokenFor(2);
  startDrive(h, '1001', replacement);
  const replacedStates = JSON.parse(h.properties.getProperty(STATE_PROPERTY));
  assert.equal(replacedStates.length, 1);
  assert.equal(replacedStates[0].hash, crypto.createHash('sha256').update(replacement).digest('hex'));

  for (let index = 0; index < 30; index += 1) {
    startDrive(h, String(2000 + index), tokenFor(100 + index));
  }
  const boundedStates = JSON.parse(h.properties.getProperty(STATE_PROPERTY));
  assert.equal(boundedStates.length, 24);
  assert.equal(boundedStates.every(item => item.provider === 'drive'), true);
});

test('Drive state expires, is consumed once, and rejects replay', () => {
  const h = createHarness();
  const state = tokenFor(3);
  startDrive(h, '1001', state);

  const consumed = h.context.mailboxSourceConsumeOauthState_(state);
  assert.equal(consumed.userId, '1001');
  assert.equal(consumed.provider, 'drive');
  assert.equal(captureError(() => h.context.mailboxSourceConsumeOauthState_(state)).code, 'SOURCE_OAUTH_INVALID');

  const expiredHarness = createHarness();
  const expiredState = tokenFor(4);
  const started = startDrive(expiredHarness, '1002', expiredState);
  expiredHarness.setNow(started.expiresAt + 1);
  assert.equal(
    captureError(() => expiredHarness.context.mailboxSourceConsumeOauthState_(expiredState)).code,
    'SOURCE_OAUTH_INVALID'
  );
  assert.equal(
    captureError(() => expiredHarness.context.mailboxSourceConsumeOauthState_('short')).code,
    'SOURCE_OAUTH_INVALID'
  );
});

test('Drive callback enforces its envelope and sanitizes provider denial', () => {
  const h = createHarness();
  const deniedState = tokenFor(5);
  startDrive(h, '1001', deniedState);
  const denial = captureError(() => h.context.mailboxDriveHandleOAuthCallback_({
    state: deniedState,
    code: '',
    error: 'access_denied',
    errorDescription: 'private provider detail must not escape',
  }));
  assert.equal(denial.code, 'DRIVE_OAUTH_DENIED');
  assert.equal(denial.message.includes('private provider detail'), false);
  assert.equal(captureError(() => h.context.mailboxSourceConsumeOauthState_(deniedState)).code, 'SOURCE_OAUTH_INVALID');

  const invalidErrorState = tokenFor(6);
  startDrive(h, '1002', invalidErrorState);
  assert.equal(captureError(() => h.context.mailboxDriveHandleOAuthCallback_({
    state: invalidErrorState,
    code: '',
    error: 'invalid request',
    errorDescription: 'not accepted',
  })).code, 'DRIVE_OAUTH_INVALID');
  assert.equal(h.context.mailboxSourceConsumeOauthState_(invalidErrorState).userId, '1002');

  assert.equal(captureError(() => h.context.mailboxDriveHandleOAuthCallback_({
    state: tokenFor(7),
    code: 'code-only',
    error: '',
    errorDescription: '',
    unexpected: 'field',
  })).code, 'INVALID_REQUEST');
  assert.equal(captureError(() => h.context.mailboxDriveHandleOAuthCallback_({
    state: tokenFor(8),
    code: 'code',
    error: 'access_denied',
    errorDescription: '',
  })).code, 'DRIVE_OAUTH_INVALID');
  assert.equal(captureError(() => h.context.mailboxDriveHandleOAuthCallback_({
    state: tokenFor(9),
    code: 'code',
    error: '',
    errorDescription: 'description without provider error',
  })).code, 'DRIVE_OAUTH_INVALID');
  assert.equal(h.exchangeCalls.length, 0);
  assert.equal(h.fetchCalls.length, 0);
});

test('Drive callback rejects a state issued for another source provider', () => {
  const h = createHarness();
  const state = tokenFor(10);
  h.properties.setProperty(STATE_PROPERTY, JSON.stringify([{
    v: 1,
    hash: crypto.createHash('sha256').update(state).digest('hex'),
    provider: 'box',
    userId: '1001',
    createdAt: h.now,
    expiresAt: h.now + 10 * 60 * 1000,
  }]));

  const error = captureError(() => h.context.mailboxDriveHandleOAuthCallback_({
    state,
    code: 'synthetic-drive-code',
    error: '',
    errorDescription: '',
  }));
  assert.equal(error.code, 'DRIVE_OAUTH_INVALID');
  assert.equal(h.exchangeCalls.length, 0);
  assert.equal(h.properties.getProperty(REGISTRY_PROPERTY), null);
  assert.equal(captureError(() => h.context.mailboxSourceConsumeOauthState_(state)).code, 'SOURCE_OAUTH_INVALID');
});

test('Successful Drive callback persists exact owner and returns token-free public DTOs', () => {
  const h = createHarness();
  const state = tokenFor(11);
  startDrive(h, '1001', state, 'drive.owner@example.invalid');
  const result = plain(h.context.mailboxDriveHandleOAuthCallback_({
    state,
    code: 'synthetic-code',
    error: '',
    errorDescription: '',
  }));

  assert.equal(result.ok, true);
  assert.deepEqual(Object.keys(result).sort(), ['account', 'ok']);
  assert.deepEqual(Object.keys(result.account).sort(), ['email', 'id', 'name', 'provider']);
  assert.equal(result.account.provider, 'drive');
  assert.equal(result.account.email, 'drive.owner@example.invalid');
  assert.equal(JSON.stringify(result).includes('access_synthetic-code_synthetic'), false);
  assert.equal(JSON.stringify(result).includes('refresh_synthetic-code_synthetic'), false);

  const registry = JSON.parse(h.properties.getProperty(REGISTRY_PROPERTY));
  assert.equal(registry.connections.length, 1);
  assert.equal(registry.connections[0].ownerUserId, '1001');
  assert.equal(registry.connections[0].id, result.account.id);
  assert.notEqual(h.properties.getProperty(TOKEN_PREFIX + result.account.id), null);

  const accounts = plain(h.context.mailboxSourceAccounts_({ provider: 'drive' }, { userId: '1001' }));
  assert.equal(accounts.accounts.length, 1);
  assert.equal(accounts.accounts[0].id, result.account.id);
  assert.equal(/accessToken|refreshToken|subject/.test(JSON.stringify(accounts)), false);
  assert.equal(
    captureError(() => h.context.mailboxSourceResolveAccess_(
      { userId: '1002' },
      result.account.id,
      'drive'
    )).code,
    'FORBIDDEN'
  );
  assert.equal(
    captureError(() => h.context.mailboxDriveConnectStart_(
      { provider: 'drive', loginHint: '' },
      { userId: 'invalid-session' }
    )).code,
    'UNAUTHORIZED'
  );
  assert.equal(
    captureError(() => h.context.mailboxDriveConnectStart_(
      { provider: 'box', loginHint: '' },
      { userId: '1001' }
    )).code,
    'INVALID_SOURCE'
  );
});

test('Drive access reuses valid token, rotates generation, and fails closed on refresh errors', () => {
  const h = createHarness();
  const first = plain(persistDrive(h, '1001', 'one'));
  const key = TOKEN_PREFIX + first.account.id;

  assert.equal(
    h.context.mailboxDriveAccessToken_({ userId: '1001' }, first.account.id),
    'access_one_synthetic'
  );
  assert.equal(h.fetchCalls.length, 0);

  const rotated = plain(persistDrive(h, '1001', 'one', ''));
  assert.equal(rotated.account.id, first.account.id);
  let registry = JSON.parse(h.properties.getProperty(REGISTRY_PROPERTY));
  let record = JSON.parse(h.properties.getProperty(key));
  assert.equal(registry.connections[0].tokenGeneration, 2);
  assert.equal(record.generation, 2);
  assert.equal(record.refreshToken, 'refresh_one_synthetic');

  record.generation = 1;
  h.properties.setProperty(key, JSON.stringify(record));
  assert.equal(
    captureError(() => h.context.mailboxDriveAccessToken_({ userId: '1001' }, first.account.id)).code,
    'SOURCE_REAUTH_REQUIRED'
  );
  assert.equal(h.fetchCalls.length, 0);

  record.generation = 2;
  record.accessExpiresAt = h.now - 1;
  h.properties.setProperty(key, JSON.stringify(record));
  h.setFetch((url, options) => {
    assert.equal(url, 'https://oauth2.googleapis.com/token');
    assert.equal(options.payload.grant_type, 'refresh_token');
    return response(200, { access_token: 'refreshed_access_token_synthetic', expires_in: 3600 });
  });
  assert.equal(
    h.context.mailboxDriveAccessToken_({ userId: '1001' }, first.account.id),
    'refreshed_access_token_synthetic'
  );
  record = JSON.parse(h.properties.getProperty(key));
  assert.equal(record.generation, 2);
  assert.equal(record.refreshToken, 'refresh_one_synthetic');

  record.accessExpiresAt = h.now - 1;
  h.properties.setProperty(key, JSON.stringify(record));
  const beforeFailure = h.properties.getProperty(key);
  h.setFetch(() => response(400, { error: 'invalid_grant' }));
  assert.equal(
    captureError(() => h.context.mailboxDriveAccessToken_({ userId: '1001' }, first.account.id)).code,
    'SOURCE_REAUTH_REQUIRED'
  );
  assert.equal(h.properties.getProperty(key), beforeFailure);
});

test('Drive disconnect revokes only the exact selected source account', () => {
  const h = createHarness();
  const first = plain(persistDrive(h, '1001', 'first'));
  const second = plain(persistDrive(h, '1001', 'second'));
  const firstKey = TOKEN_PREFIX + first.account.id;
  const secondKey = TOKEN_PREFIX + second.account.id;

  assert.equal(
    captureError(() => h.context.mailboxDriveDisconnect_(
      { provider: 'drive', sourceConnectionId: first.account.id },
      { userId: '1002' }
    )).code,
    'FORBIDDEN'
  );
  assert.equal(h.fetchCalls.length, 0);

  h.setFetch((url, options) => {
    assert.equal(url, 'https://oauth2.googleapis.com/revoke');
    assert.equal(options.followRedirects, false);
    return response(200);
  });
  const disconnected = plain(h.context.mailboxDriveDisconnect_(
    { provider: 'drive', sourceConnectionId: first.account.id },
    { userId: '1001' }
  ));
  assert.deepEqual(disconnected, {
    provider: 'drive',
    disconnected: true,
    sourceConnectionId: first.account.id,
  });

  let registry = JSON.parse(h.properties.getProperty(REGISTRY_PROPERTY));
  assert.equal(registry.connections.find(item => item.id === first.account.id).status, 'revoked');
  assert.equal(registry.connections.find(item => item.id === second.account.id).status, 'active');
  assert.equal(registry.preferences[0].active.drive, second.account.id);
  assert.equal(h.properties.getProperty(firstKey), null);
  assert.notEqual(h.properties.getProperty(secondKey), null);

  const beforeFailedRevoke = h.properties.getProperty(REGISTRY_PROPERTY);
  h.setFetch(() => response(503));
  assert.equal(
    captureError(() => h.context.mailboxDriveDisconnect_(
      { provider: 'drive', sourceConnectionId: second.account.id },
      { userId: '1001' }
    )).code,
    'SOURCE_CLEANUP_PENDING'
  );
  assert.equal(h.properties.getProperty(REGISTRY_PROPERTY), beforeFailedRevoke);
  assert.notEqual(h.properties.getProperty(secondKey), null);
  assert.equal(
    captureError(() => h.context.mailboxDriveDisconnect_(
      { provider: 'box', sourceConnectionId: second.account.id },
      { userId: '1001' }
    )).code,
    'INVALID_SOURCE'
  );
});

test('Apps Script exposes one exact Drive callback route without raw provider rendering', () => {
  assert.match(
    codeSource,
    /if \(action === 'drive_oauth_callback'\) \{\s*return serveDriveOAuthCallback_\(e\);\s*\}/
  );
  const callbackSource = sourceBetween(
    codeSource,
    'function serveDriveOAuthCallback_(e) {',
    '/** Validate Telegram identity without granting access to any mailbox. */'
  );
  assert.match(callbackSource, /mailboxDriveHandleOAuthCallback_\(\{\s*code: String\(params\.code \|\| ''\),\s*state: String\(params\.state \|\| ''\),\s*error: String\(params\.error \|\| ''\),\s*errorDescription: String\(params\.error_description \|\| ''\),\s*\}\)/);
  assert.match(callbackSource, /history\.replaceState\(null,"",location\.pathname\+"\?action=drive_oauth_callback"\)/);
  assert.doesNotMatch(callbackSource, /console\./);
  assert.doesNotMatch(callbackSource, /accessToken|refreshToken|clientSecret|BOT_TOKEN/);
  assert.match(multiSource, /exec\\\?action=drive_oauth_callback\$/);
});
