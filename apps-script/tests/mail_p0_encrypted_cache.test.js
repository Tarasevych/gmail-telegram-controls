const test = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { TextDecoder, TextEncoder } = require('node:util');

const source = fs.readFileSync(path.join(__dirname, '..', 'MailApp.html'), 'utf8');

function functionSource(name) {
  const marker = new RegExp(`(?:async\\s+)?function\\s+${name}\\s*\\(`);
  const match = marker.exec(source);
  assert.ok(match, `missing function ${name}`);
  const start = match.index;
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

function encryptedCacheContext() {
  const scope = 'A'.repeat(43);
  const context = {
    P0_CACHE_SCHEMA: 3,
    P0_CACHE_MAX_RECORD_BYTES: 1536 * 1024,
    safeId: value => String(value == null ? '' : value)
      .replace(/[^A-Za-z0-9._:-]/g, '').slice(0, 256),
    safeText: (value, fallback = '') => String(
      value == null || value === '' ? fallback : value,
    ),
    state: {
      session: 'verified-session',
      cacheScope: scope,
      accounts: [{ id: 'gmail-a' }],
    },
    p0Runtime: {
      cacheUnlocked: true,
      unlockedCacheScope: scope,
      unlockedAccountIds: ['gmail-a'],
      cacheScope: scope,
      allowedAccountIds: ['gmail-a'],
      encryptionKey: null,
      encryptionScope: scope,
      metrics: { cacheCryptoFailures: 0 },
    },
    window: {
      crypto: crypto.webcrypto,
      btoa: value => Buffer.from(value, 'binary').toString('base64'),
      atob: value => Buffer.from(value, 'base64').toString('binary'),
      __gtCacheCryptoDiagnostics: null,
    },
    TextEncoder,
    TextDecoder,
    Uint8Array,
    Object,
    Array,
    String,
    Number,
    JSON,
    Set,
  };
  vm.createContext(context);
  vm.runInContext([
    'p0SafeCacheScope',
    'p0NamespaceAllowed',
    'p0PrivateCacheAccessAllowed',
    'p0CacheCryptoAvailable',
    'p0BytesToBase64Url',
    'p0Base64UrlToBytes',
    'p0ParseSecureCacheEnvelope',
    'p0EncryptedCacheReady',
    'p0RecordAdditionalData',
    'recordP0CacheCryptoDiagnostic',
    'p0EncryptStoredRecord',
    'p0DecryptStoredRecord',
  ].map(functionSource).join('\n'), context);
  return context;
}

test('schema 3 clears incompatible plaintext records during IndexedDB upgrade', () => {
  assert.match(source, /var P0_CACHE_SCHEMA = 3;/);
  const open = functionSource('p0OpenDb');
  assert.match(open, /event\.oldVersion/);
  assert.match(open, /objectStore\("records"\)\.clear\(\)/);
});

test('AES-GCM round trip binds ciphertext to exact record metadata', async () => {
  const context = encryptedCacheContext();
  const rawKey = new Uint8Array(32);
  rawKey.fill(7);
  context.p0Runtime.encryptionKey = await crypto.webcrypto.subtle.importKey(
    'raw', rawKey, { name: 'AES-GCM' }, false, ['encrypt', 'decrypt'],
  );
  const namespace = `t:${'A'.repeat(43)}|a:gmail-a`;
  const record = {
    key: 'p0:3:thread:thread-a',
    schema: 3,
    kind: 'thread',
    namespace,
    value: { id: 'thread-a', bodyText: 'private body' },
    bytes: 128,
    updatedAt: 10,
    accessedAt: 10,
    freshUntil: 20,
    expiresAt: 30,
  };
  const stored = await context.p0EncryptStoredRecord(record);
  assert.ok(stored);
  assert.equal(Object.hasOwn(stored, 'value'), false);
  assert.equal(stored.cipher.algorithm, 'A256GCM');
  assert.equal(stored.cipher.data.includes('private'), false);
  const restored = await context.p0DecryptStoredRecord(stored);
  assert.deepEqual(JSON.parse(JSON.stringify(restored.value)), record.value);

  const swapped = { ...stored, namespace: `t:${'A'.repeat(43)}|a:gmail-b` };
  assert.equal(await context.p0DecryptStoredRecord(swapped), null);
});

test('secure cache envelope is compact, owner-scoped, and contains one 256-bit key', () => {
  const context = encryptedCacheContext();
  const rawKey = new Uint8Array(32);
  rawKey.fill(11);
  const encoded = context.p0BytesToBase64Url(rawKey);
  const envelope = `p0ce1.${'A'.repeat(43)}.${encoded}`;
  const parsed = context.p0ParseSecureCacheEnvelope(envelope);
  assert.equal(parsed.scope, 'A'.repeat(43));
  assert.equal(parsed.keyBytes.length, 32);
  assert.equal(context.p0ParseSecureCacheEnvelope(
    `p0ce1.${'B'.repeat(43)}.short`,
  ), null);
  assert.doesNotMatch(envelope, /gmail-a|thread|message|body|token/i);
});

test('persistent writes encrypt before IndexedDB and never store record.value', () => {
  const put = functionSource('p0DbPut');
  assert.match(put, /p0EncryptStoredRecord\(record\)/);
  assert.match(put, /hasOwnProperty\.call\(storedRecord, "value"\)/);
  assert.match(put, /\.put\(storedRecord\)/);
  assert.doesNotMatch(put, /\.put\(record\)/);
  assert.match(functionSource('p0DbGet'), /p0DecryptStoredRecord\(stored\)/);
  assert.match(functionSource('p0DbGetAll'), /stored\.map\(p0DecryptStoredRecord\)/);
});

test('content key uses Telegram SecureStorage only and never browser storage', () => {
  const get = functionSource('telegramSecureCacheEnvelopeGet');
  const set = functionSource('telegramSecureCacheEnvelopeSet');
  const prepare = functionSource('p0PrepareEncryptedCacheKeyForVerifiedBootstrap');
  assert.match(get, /tg\.SecureStorage\.getItem\(TELEGRAM_SECURE_CACHE_KEY/);
  assert.match(set, /tg\.SecureStorage\.setItem\(TELEGRAM_SECURE_CACHE_KEY/);
  assert.match(prepare, /AES-GCM/);
  assert.match(prepare, /stored\.status !== "MISSING"/);
  assert.match(prepare, /stored\.canRestore === true/);
  assert.doesNotMatch(
    [get, set, prepare].join('\n'),
    /localStorage|sessionStorage|DeviceStorage|indexedDB|accessToken|refreshToken|initData/,
  );
});

test('every verified bootstrap prepares encryption before cache unlock and hydration', () => {
  for (const name of [
    'runBootPipeline',
    'acceptWorkspaceInvite',
    'disconnectMailboxAccount',
    'switchMailboxAccount',
    'refreshAccountsAfterGoogleOAuth',
  ]) {
    const body = functionSource(name);
    const initializeAt = body.indexOf('initializeFromBootstrap(');
    const prepareAt = body.indexOf(
      'p0PrepareEncryptedCacheKeyForVerifiedBootstrap',
      initializeAt,
    );
    const unlockAt = body.indexOf(
      'p0UnlockPrivateCacheFromVerifiedBootstrap()',
      prepareAt,
    );
    const hydrateAt = body.indexOf('p0HydratePersistentState()', unlockAt);
    assert.ok(
      initializeAt !== -1 &&
      prepareAt > initializeAt &&
      unlockAt > prepareAt &&
      hydrateAt > unlockAt,
      `${name} must prepare, unlock, and hydrate in order`,
    );
  }
});

test('cache lock drops the runtime encryption key but retains secure device storage', () => {
  const lock = functionSource('p0LockPrivateCache');
  assert.match(lock, /p0Runtime\.encryptionKey = null/);
  assert.match(lock, /p0Runtime\.encryptionScope = ""/);
  assert.doesNotMatch(
    lock,
    /telegramSecureCacheEnvelopeSet|SecureStorage\.removeItem|p0DbDelete|deleteDatabase/,
  );
});
