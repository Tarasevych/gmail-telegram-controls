const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '..', 'MailApp.html'), 'utf8');

function functionSource(name) {
  const marker = new RegExp(`(?:async\\s+)?function\\s+${name}\\s*\\(`);
  const match = marker.exec(source);
  assert.ok(match, `missing function ${name}`);
  const start = match.index + match[0].indexOf('function');
  const open = source.indexOf('{', match.index);
  let depth = 0;
  let quote = '';
  let escaped = false;
  for (let index = open; index < source.length; index += 1) {
    const char = source[index];
    if (quote) {
      if (escaped) escaped = false;
      else if (char === '\\') escaped = true;
      else if (char === quote) quote = '';
      continue;
    }
    if (char === '"' || char === "'" || char === '`') {
      quote = char;
      continue;
    }
    if (char === '{') depth += 1;
    if (char === '}') {
      depth -= 1;
      if (depth === 0) return source.slice(start, index + 1);
    }
  }
  throw new Error(`unterminated function ${name}`);
}

function cacheLockContext() {
  const context = {
    safeId: value => String(value == null ? '' : value)
      .replace(/[^A-Za-z0-9._:-]/g, '').slice(0, 256),
    safeText: (value, fallback = '') => String(
      value == null || value === '' ? fallback : value,
    ),
    state: {
      session: 'validated-app-session',
      cacheScope: 'A'.repeat(43),
      accounts: [{ id: 'gmail-a' }, { id: 'gmail-b' }],
    },
    p0Runtime: {
      cacheUnlocked: false,
      unlockedCacheScope: '',
      unlockedAccountIds: [],
      cacheScope: '',
      allowedAccountIds: [],
      memory: new Map([['private', { value: true }]]),
      pendingDrafts: [{ bodyHtml: 'private' }],
      restoredUi: { selectedThreadId: 'private' },
      readerViews: new Map([['private', {}]]),
      readerScrolls: new Map([['private', 10]]),
      listScrolls: new Map([['private', 20]]),
      currentListKey: 'private-list',
      currentThreadKey: 'private-thread',
      cacheLockReason: '',
    },
    Set,
    Map,
    Array,
    String,
  };
  vm.createContext(context);
  vm.runInContext([
    'p0SafeCacheScope',
    'p0NamespaceAllowed',
    'p0LockPrivateCache',
    'p0PrivateCacheAccessAllowed',
    'p0UnlockPrivateCacheFromVerifiedBootstrap',
  ].map(functionSource).join('\n'), context);
  return context;
}

test('private cache stays fail closed until an exact verified session bootstrap unlocks it', () => {
  const context = cacheLockContext();
  const namespace = `t:${'A'.repeat(43)}|a:gmail-a`;
  assert.equal(context.p0PrivateCacheAccessAllowed(namespace), false);
  assert.equal(context.p0UnlockPrivateCacheFromVerifiedBootstrap(), true);
  assert.equal(context.p0PrivateCacheAccessAllowed(namespace), true);
  assert.equal(
    context.p0PrivateCacheAccessAllowed(`t:${'A'.repeat(43)}|a:gmail-c`),
    false,
  );
  context.state.accounts = [{ id: 'gmail-a' }];
  assert.equal(context.p0PrivateCacheAccessAllowed(namespace), false);
});

test('locking drops all in-memory private state without deleting persistent records', () => {
  const context = cacheLockContext();
  assert.equal(context.p0UnlockPrivateCacheFromVerifiedBootstrap(), true);
  assert.equal(context.p0LockPrivateCache('signed-out'), true);
  assert.equal(context.p0Runtime.cacheUnlocked, false);
  assert.equal(context.p0Runtime.memory.size, 0);
  assert.equal(context.p0Runtime.pendingDrafts.length, 0);
  assert.equal(context.p0Runtime.restoredUi, null);
  assert.equal(context.p0Runtime.readerViews.size, 0);
  assert.equal(context.p0Runtime.readerScrolls.size, 0);
  assert.equal(context.p0Runtime.listScrolls.size, 0);
  assert.equal(context.p0Runtime.cacheLockReason, 'signed-out');
  assert.doesNotMatch(functionSource('p0LockPrivateCache'), /p0DbDelete|deleteDatabase/);
});

test('low-level reads and writes require the explicit cache unlock gate', () => {
  assert.match(functionSource('p0DbGet'), /p0PrivateCacheAccessAllowed\(\)/);
  assert.match(functionSource('p0DbGetAll'), /p0PrivateCacheAccessAllowed\(\)/);
  assert.match(functionSource('p0DbPut'), /p0PrivateCacheAccessAllowed\(record\.namespace\)/);
  assert.match(functionSource('p0PeekRecord'), /p0PrivateCacheAccessAllowed\(\)/);
  assert.match(functionSource('p0ReadRecord'), /p0PrivateCacheAccessAllowed\(\)/);
  assert.match(functionSource('p0WriteRecord'), /p0PrivateCacheAccessAllowed\(namespace\)/);
});

test('hydration cannot self-authorize from unverified account data', () => {
  const hydrate = functionSource('p0HydratePersistentState');
  assert.match(hydrate, /if \(!p0PrivateCacheAccessAllowed\(\)\)/);
  assert.match(hydrate, /p0LockPrivateCache\("hydrate-denied"\)/);
  assert.doesNotMatch(hydrate, /p0Runtime\.cacheScope\s*=/);
  assert.doesNotMatch(hydrate, /p0Runtime\.allowedAccountIds\s*=/);
});

test('boot and account switch unlock only after verified bootstrap and before hydration', () => {
  const pipeline = functionSource('runBootPipeline');
  const initializeAt = pipeline.indexOf('initializeFromBootstrap(bootstrap || {})');
  const unlockAt = pipeline.indexOf('p0UnlockPrivateCacheFromVerifiedBootstrap()', initializeAt);
  const hydrateAt = pipeline.indexOf('p0HydratePersistentState()', unlockAt);
  assert.ok(initializeAt !== -1 && unlockAt > initializeAt && hydrateAt > unlockAt);

  const switcher = functionSource('switchMailboxAccount');
  const resetAt = switcher.indexOf('p0ResetAccountScopedView()');
  const switchedInitializeAt = switcher.indexOf(
    'initializeFromBootstrap(bootstrap || selected || {})',
    resetAt,
  );
  const switchedUnlockAt = switcher.indexOf(
    'p0UnlockPrivateCacheFromVerifiedBootstrap()',
    switchedInitializeAt,
  );
  const switchedHydrateAt = switcher.indexOf(
    'p0HydratePersistentState()',
    switchedUnlockAt,
  );
  assert.ok(
    resetAt !== -1 &&
    switchedInitializeAt > resetAt &&
    switchedUnlockAt > switchedInitializeAt &&
    switchedHydrateAt > switchedUnlockAt,
  );
});

test('every account-changing bootstrap rebinds the exact private-cache allowlist', () => {
  for (const name of [
    'acceptWorkspaceInvite',
    'disconnectMailboxAccount',
    'refreshAccountsAfterGoogleOAuth',
  ]) {
    const body = functionSource(name);
    const initializeAt = body.indexOf('initializeFromBootstrap(');
    const unlockAt = body.indexOf('p0UnlockPrivateCacheFromVerifiedBootstrap()', initializeAt);
    assert.ok(initializeAt !== -1 && unlockAt > initializeAt, `${name} must rebind cache`);
  }
});

test('account reset and confirmed sign-out lock private cache without browser secrets', () => {
  assert.match(
    functionSource('p0ResetAccountScopedView'),
    /p0LockPrivateCache\("account-context-reset"\)/,
  );
  const signOut = functionSource('signOutMailboxSession');
  assert.ok(
    signOut.indexOf('state.session = null') <
    signOut.indexOf('p0ResetAccountScopedView()'),
  );
  assert.doesNotMatch(
    [
      functionSource('p0LockPrivateCache'),
      functionSource('p0UnlockPrivateCacheFromVerifiedBootstrap'),
    ].join('\n'),
    /localStorage|sessionStorage|DeviceStorage|accessToken|refreshToken|initData/,
  );
});
