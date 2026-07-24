const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

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
    if (char === '"' || char === "'" || char === '`') { quote = char; continue; }
    if (char === '{') depth += 1;
    if (char === '}') {
      depth -= 1;
      if (depth === 0) return source.slice(start, index + 1);
    }
  }
  throw new Error(`unterminated function ${name}`);
}

test('offline bootstrap snapshot is bounded, encrypted and contains no session credential', () => {
  const value = functionSource('p0OfflineBootstrapValue');
  assert.match(value, /offlineBootstrapVersion:\s*1/);
  assert.match(value, /cacheSchema:\s*P0_CACHE_SCHEMA/);
  assert.match(value, /session:\s*\{\s*cacheScope:\s*scope\s*\}/);
  assert.match(value, /P0_OFFLINE_UNLOCK_MAX_AGE_MS/);
  assert.doesNotMatch(
    value,
    /sessionToken|refreshToken|accessToken|initData|telegramSignature|signedLaunch/,
  );
  const persist = functionSource('p0PersistOfflineBootstrapSnapshot');
  assert.match(persist, /p0WriteRecord\(\s*P0_OFFLINE_BOOTSTRAP_KIND/);
  assert.match(persist, /p0PrivateCacheAccessAllowed\(namespace\)/);
});

test('offline snapshot validator binds cache schema, owner scope, age and account set', () => {
  const validate = functionSource('p0ValidateOfflineBootstrapSnapshot');
  assert.match(validate, /snapshot\.cacheSchema !== P0_CACHE_SCHEMA/);
  assert.match(validate, /snapshot\.session && snapshot\.session\.cacheScope/);
  assert.match(validate, /P0_OFFLINE_UNLOCK_MAX_AGE_MS/);
  assert.match(validate, /new Set\(ids\)\.size !== ids\.length/);
  assert.match(validate, /ids\.indexOf\(activeId\) === -1/);
});

test('locked bootstrap read accepts only the exact encrypted owner bootstrap record', () => {
  const decrypt = functionSource('p0DecryptStoredRecord');
  assert.match(decrypt, /opts\.offlineBootstrap === true/);
  assert.match(decrypt, /record\.kind !== P0_OFFLINE_BOOTSTRAP_KIND/);
  assert.match(decrypt, /record\.key !== p0RecordKey\(P0_OFFLINE_BOOTSTRAP_KIND, expectedScope\)/);
  assert.match(decrypt, /record\.namespace !== p0OfflineBootstrapNamespace\(expectedScope\)/);
  assert.match(decrypt, /window\.crypto\.subtle\.decrypt/);
  assert.match(decrypt, /additionalData:\s*p0RecordAdditionalData\(record\)/);
});

test('offline unlock requires Telegram SecureStorage key material and authenticated ciphertext', () => {
  const restore = functionSource('p0RestoreOfflineBootstrapFromSecureStorage');
  assert.match(restore, /telegramSecureCacheEnvelopeGet/);
  assert.match(restore, /p0ParseSecureCacheEnvelope/);
  assert.match(restore, /stored && stored\.canRestore === true/);
  assert.match(restore, /p0DbGetStoredRecord/);
  assert.match(restore, /offlineBootstrap:\s*true/);
  assert.match(restore, /p0ValidateOfflineBootstrapSnapshot/);
  assert.match(restore, /p0UnlockPrivateCacheFromOfflineBootstrap/);
  assert.match(restore, /p0HydratePersistentState/);
  assert.doesNotMatch(restore, /restoreItem|requestAccess|openLink|showPopup/);
});

test('offline cache access is read-only and online verified bootstrap clears offline mode', () => {
  const access = functionSource('p0PrivateCacheAccessAllowed');
  assert.match(access, /!state\.session && p0Runtime\.offlineUnlockActive !== true/);
  const onlineUnlock = functionSource('p0UnlockPrivateCacheFromVerifiedBootstrap');
  assert.match(onlineUnlock, /p0Runtime\.offlineUnlockActive = false/);
  const offlineUnlock = functionSource('p0UnlockPrivateCacheFromOfflineBootstrap');
  assert.match(offlineUnlock, /if \(state\.session/);
  assert.match(offlineUnlock, /p0Runtime\.offlineUnlockActive = true/);
  const rpc = functionSource('rpc');
  assert.match(rpc, /p0Runtime\.offlineUnlockActive === true && !state\.session/);
  assert.match(rpc, /OFFLINE_CACHE_ONLY/);
  assert.ok(
    rpc.indexOf('OFFLINE_CACHE_ONLY') < rpc.indexOf('executeMailboxRpc'),
    'offline mode must fail before any server RPC is created',
  );
});

test('offline list path renders cache without scheduling network revalidation', () => {
  const load = functionSource('loadThreads');
  assert.match(load, /opts\.returnAfterCache \|\| opts\.offlineOnly/);
  assert.match(load, /if \(opts\.offlineOnly\)/);
  assert.match(load, /Офлайн · показано захищену локальну копію/);
  assert.match(load, /Офлайн-копія цього списку ще не збережена/);
});

test('boot fallback is limited to transient network failure and preserves auth hard stops', () => {
  const boot = functionSource('runBootPipeline');
  assert.match(boot, /reasonCode === "TRANSIENT_NETWORK_FAILURE"/);
  assert.match(boot, /p0RestoreOfflineBootstrapFromSecureStorage/);
  assert.match(boot, /offlineOnly:\s*true/);
  assert.match(boot, /await p0PersistOfflineBootstrapSnapshot\(\)/);
  assert.doesNotMatch(
    boot,
    /reasonCode === "(?:UNAUTHORIZED|FORBIDDEN|SESSION_EXPIRED)"[\s\S]{0,120}p0RestoreOfflineBootstrap/,
  );
});

test('account-changing verified bootstraps refresh the encrypted offline snapshot', () => {
  const persistCalls = source.match(/await p0PersistOfflineBootstrapSnapshot\(\);/g) || [];
  assert.equal(persistCalls.length, 5);
  assert.match(functionSource('acceptWorkspaceInvite'), /p0HydratePersistentState\(\);[\s\S]*p0PersistOfflineBootstrapSnapshot\(\)/);
  assert.match(functionSource('disconnectMailboxAccount'), /p0HydratePersistentState\(\);[\s\S]*p0PersistOfflineBootstrapSnapshot\(\)/);
  assert.match(functionSource('switchMailboxAccount'), /p0HydratePersistentState\(\);[\s\S]*p0PersistOfflineBootstrapSnapshot\(\)/);
});

test('background work retries verified online boot without prefetching while offline', () => {
  const background = functionSource('p0StartBackgroundWork');
  assert.match(background, /if \(!p0Runtime\.offlineUnlockActive\) window\.setTimeout\(p0PrefetchVisibleThreads, 0\)/);
  assert.match(background, /navigator\.onLine !== false/);
  assert.match(background, /boot\(\{\s*force:\s*true\s*\}\)/);
});
