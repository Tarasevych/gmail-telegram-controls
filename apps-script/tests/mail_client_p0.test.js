const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '..', 'MailApp.html'), 'utf8');
const releaseState = JSON.parse(fs.readFileSync(
  path.join(__dirname, '..', '..', 'docs', 'release-state.json'),
  'utf8',
));

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

function loadFunctions(names) {
  const context = {
    safeId: value => String(value == null ? '' : value).replace(/[^A-Za-z0-9._:-]/g, '').slice(0, 256),
    safeText: (value, fallback = '') => String(value == null || value === '' ? fallback : value),
    Set,
    Array,
    Object,
    JSON,
    Number,
  };
  vm.createContext(context);
  vm.runInContext(names.map(functionSource).join('\n'), context);
  return context;
}

test('P0 cache is bounded, versioned and account-scoped', () => {
  assert.match(source, /var P0_CACHE_SCHEMA = 1;/);
  assert.match(source, /P0_CACHE_MAX_RECORDS = 120/);
  assert.match(source, /P0_CACHE_MAX_BYTES = 4 \* 1024 \* 1024/);
  assert.match(source, /indexedDB\.open\("gmail-telegram-controls-versie-1"/);
  assert.match(source, /p0NamespaceAllowed\(record\.namespace, p0Runtime\.allowedAccountIds\)/);
});

test('namespace contract rejects cross-account and malformed shared records', () => {
  const context = loadFunctions([
    'p0NamespaceAllowed',
    'p0NamespaceAccountIds',
    'p0ListSnapshotMatchesNamespace',
  ]);
  assert.equal(context.p0NamespaceAllowed('a:alpha', ['alpha', 'beta']), true);
  assert.equal(context.p0NamespaceAllowed('a:gamma', ['alpha', 'beta']), false);
  assert.equal(context.p0NamespaceAllowed('u:alpha,beta', ['alpha', 'beta']), true);
  assert.equal(context.p0NamespaceAllowed('u:alpha,gamma', ['alpha', 'beta']), false);
  assert.equal(context.p0NamespaceAllowed('u:alpha', ['alpha']), false);
  assert.equal(context.p0ListSnapshotMatchesNamespace({ threads: [
    { accountId: 'alpha' },
  ] }, 'a:alpha'), true);
  assert.equal(context.p0ListSnapshotMatchesNamespace({ threads: [
    { accountId: 'beta' },
  ] }, 'a:alpha'), false);
  assert.equal(context.p0ListSnapshotMatchesNamespace({ threads: [
    { account: { id: 'alpha' } },
    { connectionId: 'beta' },
  ] }, 'u:alpha,beta'), true);
  assert.equal(context.p0ListSnapshotMatchesNamespace({ threads: [
    { accountId: 'gamma' },
  ] }, 'u:alpha,beta'), false);
});

test('account switch clears the prior account reader before the new bootstrap', () => {
  const reset = functionSource('p0ResetAccountScopedView');
  assert.match(reset, /p0Runtime\.readerGeneration \+= 1/,
    'pending reader work must be invalidated before another account can render');
  assert.match(reset, /state\.requestVersion \+= 1/,
    'pending list work must be invalidated before another account can render');
  assert.match(reset, /state\.selectedThreadId = ""/);
  assert.match(reset, /state\.selectedConnectionId = ""/);
  assert.match(reset, /state\.thread = null/);
  assert.match(reset, /state\.threads = \[\]/);
  assert.match(reset, /state\.account = null/,
    'the old account identity must not remain active between switch and bootstrap');
  assert.match(reset, /app\.classList\.remove\("reader-open"\)/);
  assert.match(reset, /els\.readerContentHost\.hidden = true/);
  assert.match(reset, /clear\(els\.readerContentHost\)/,
    'old account message DOM must be removed rather than merely hidden by state');

  const switcher = functionSource('switchMailboxAccount');
  assert.match(switcher, /await p0PersistUiStateNow\(\)/,
    'the outgoing account view must be checkpointed before the server selection changes');
  const switchRequest = switcher.indexOf('op: "switchAccount"');
  const resetCall = switcher.indexOf('p0ResetAccountScopedView()');
  const bootstrapRequest = switcher.indexOf('op: "bootstrap"');
  assert.ok(switchRequest !== -1 && resetCall > switchRequest && bootstrapRequest > resetCall,
    'account-scoped UI must be cleared after a confirmed switch and before bootstrap');
  assert.match(switcher, /state\.compose \|\| state\.composeBusy \|\| state\.actionBusy \|\| state\.handoffBusy/,
    'account switching must not expose an active draft or mutation in another account context');
  assert.match(switcher,
    /initializeFromBootstrap\(bootstrap \|\| selected \|\| \{\}\);[\s\S]{0,160}await p0HydratePersistentState\(\);[\s\S]{0,80}p0ApplyPersistedView\(\)/,
    'the incoming account must hydrate only its own persisted view');
  assert.match(switcher,
    /restoredTargetView\.selectedConnectionId[\s\S]{0,240}openThread\(/,
    'returning A to B to A must restore only the reader bound to the target account');
  assert.match(functionSource('renderAccountPanel'),
    /card\.disabled = Boolean\(account\.current \|\| state\.accountManagementBusy\)/,
    'parallel account switches must be disabled while one switch is in flight');
});

test('single-account lists pin the exact connection and reject poisoned cache or responses', () => {
  const request = functionSource('listRequest');
  const translate = functionSource('translateRpcRequest');
  const load = functionSource('loadThreads');
  assert.match(request,
    /connectionId: unified \? "" : safeId\(state\.account && state\.account\.id\)/,
    'the list intent must capture the exact active Gmail connection');
  assert.match(translate,
    /connectionId: unifiedList \? "" : safeId\(input\.connectionId\)/,
    'the exact connection must reach the existing server-side per-request authorization boundary');
  assert.match(load, /namespace: namespace/,
    'each queued intent must retain the namespace that existed when it was created');
  assert.match(load,
    /p0ListSnapshotMatchesNamespace\(cached\.value, intent\.namespace\)/,
    'a persisted list may render only after every card matches its cache namespace');
  assert.match(load,
    /p0ListSnapshotMatchesNamespace\(\{ threads: normalized \}, activeIntent\.namespace\)/,
    'a server response from another account must fail closed before rendering or caching');
  assert.match(load, /p0DbDelete\(poisonedListKey\)/,
    'a poisoned historical cache entry must be removed instead of repeatedly redisplayed');
});

test('LRU eviction is deterministic by access time and byte budget', () => {
  const context = loadFunctions(['p0EvictionKeys']);
  const records = [
    { key: 'old', accessedAt: 1, bytes: 40 },
    { key: 'middle', accessedAt: 2, bytes: 40 },
    { key: 'new', accessedAt: 3, bytes: 40 },
  ];
  assert.deepEqual(Array.from(context.p0EvictionKeys(records, 2, 100)), ['old']);
  assert.deepEqual(Array.from(context.p0EvictionKeys(records, 3, 60)), ['old', 'middle']);
});

test('warm list and thread paths render cached state before background revalidation', () => {
  const list = functionSource('loadThreads');
  const thread = functionSource('openThread');
  assert.match(list, /p0PeekRecord\("list"/);
  assert.match(list, /Оновлюю у фоні/);
  assert.match(thread, /p0PeekRecord\("thread"/);
  assert.match(thread, /refresh\.catch/);
  assert.doesNotMatch(thread, /state\.threadLoading \|\|/);
});

test('thread list reconciliation reuses stable keyed rows', () => {
  const render = functionSource('renderThreadList');
  assert.match(render, /data-p0-thread-key/);
  assert.match(render, /rowReuses/);
  assert.match(render, /replaceChildren\(fragment\)/);
  assert.doesNotMatch(render, /clear\(els\.threadList\);\s*visibleThreads\.forEach/);
});

test('mutations are optimistic but restore the prior state on API failure', () => {
  const action = functionSource('changeThreadAction');
  const labels = functionSource('applyUserLabels');
  assert.match(action, /p0SnapshotMailboxState/);
  assert.match(action, /p0RestoreMailboxState\(optimisticSnapshot\)/);
  assert.match(labels, /p0ApplyOptimisticLabels/);
  assert.match(labels, /Мітки повернено/);
});

test('draft recovery stores text locally without tokens or attachment bytes', () => {
  const recovery = functionSource('p0ComposeRecoveryValue');
  assert.match(recovery, /bodyHtml/);
  assert.match(recovery, /attachmentCount/);
  assert.doesNotMatch(recovery, /accessToken|refreshToken|sessionToken|dataBase64|attachmentId/);
  assert.match(functionSource('markComposeChanged'), /p0PersistComposeRecovery/);
  assert.match(functionSource('bestEffortLifecycleAutosave'), /p0PersistComposeRecovery/);
});

test('release decision performs at most one automatic reload per target', () => {
  const context = loadFunctions(['p0ReleaseAction', 'p0ExtractReleaseVersion']);
  const productionVersion = releaseState.production.appsScriptImmutable;
  const previousImmutableVersion = Number(source.match(/var P0_PREVIOUS_IMMUTABLE_VERSION = (\d+);/)[1]);
  const sourceVersion = Number(source.match(/var P0_CLIENT_RELEASE_VERSION = (\d+);/)[1]);
  const sourceReleaseId = source.match(/var P0_CLIENT_RELEASE_ID = "([^"]+)";/)[1];

  assert.equal(context.p0ExtractReleaseVersion(releaseState), productionVersion,
    'the client must read the canonical release-state manifest field');
  assert.ok(previousImmutableVersion >= productionVersion,
    'the cumulative source base cannot precede current production');
  assert.equal(sourceVersion, previousImmutableVersion + 1,
    'source must identify exactly the next immutable after the preserved candidate history');
  assert.equal(sourceReleaseId, 'Versie-1-v' + sourceVersion + '-p0');
  assert.equal(context.p0ReleaseAction(sourceVersion, productionVersion, 0), 'none');
  assert.equal(context.p0ReleaseAction(productionVersion, productionVersion + 1, 0), 'reload');
  assert.equal(context.p0ReleaseAction(productionVersion, productionVersion + 1, productionVersion + 1), 'manual');
  assert.equal(context.p0ReleaseAction(productionVersion + 1, productionVersion + 1, productionVersion + 1), 'none');
  assert.match(functionSource('p0ExtractReleaseVersion'), /production\.appsScriptImmutable/);
  assert.equal((functionSource('p0CheckClientRelease').match(/location\.reload\(\)/g) || []).length, 1);
});

test('P0 does not pretend to install a Service Worker or Background Sync', () => {
  const p0Block = source.slice(source.indexOf('var P0_CACHE_SCHEMA'), source.indexOf('function mailboxViewContext'));
  assert.doesNotMatch(p0Block, /serviceWorker\.register|SyncManager|registration\.sync/);
  assert.match(p0Block, /P0_RELEASE_MANIFEST_URL/);
});

test('typography uses the measured Gmail-compatible local fallback stacks', () => {
  assert.match(source, /--mail-font-ui: "Google Sans", Roboto, RobotoDraft, Helvetica, Arial, sans-serif/);
  assert.match(source, /\.thread-sender,\s*\.thread-subject[\s\S]*font-size: 14px/);
  assert.match(source, /\.message-body,\s*\.compose-editor[\s\S]*line-height: 1\.5/);
  assert.doesNotMatch(source, /fonts\.googleapis\.com/);
});

test('preview diagnostics expose only content-free counters', () => {
  const diagnostics = functionSource('p0ExposeDiagnostics');
  assert.match(diagnostics, /metrics: p0Runtime\.metrics/);
  assert.match(diagnostics, /cacheSchema/);
  assert.doesNotMatch(diagnostics, /accountEmail|subject|body|token|session/);
});

test('fresh cached thread navigation skips an immediate duplicate RPC', () => {
  assert.match(source, /cacheFresh\s*=\s*Boolean\(cached\s*&&\s*Number\(cached\.freshUntil\s*\|\|\s*0\)\s*>\s*Date\.now\(\)\)/,
    'thread cache freshness must be derived from the bounded record TTL');
  assert.match(source, /if\s*\(cached\s*&&\s*cacheFresh\s*&&\s*!force\s*&&\s*!openOptions\.background\)[\s\S]{0,180}return true/,
    'a fresh cache hit must render locally without an immediate duplicate read RPC');
  assert.match(source, /data-p0-diagnostics/,
    'preview must publish content-free counters for measured browser acceptance');
  assert.match(source, /lastThreadUsableMs/,
    'preview diagnostics must report internal reader usability time without identifiers');
  assert.match(functionSource('runBootPipeline'),
    /initializeFromBootstrap\(bootstrap \|\| \{\}\);[\s\S]{0,120}await p0HydratePersistentState\(\);[\s\S]*await loadThreads\(true\)/,
    'initial bootstrap must establish the account allowlist before cached state and list reads');
  assert.match(functionSource('openCompose'),
    /draft\.replyToMessageId[\s\S]*state\.compose = p0ApplyRecoveredDraft\(setComposeBaseline\(draft\)\)/,
    'reply recovery must match only after the stable thread and message identity is populated');
  assert.match(source, /draft-save["']\) === ["']fail["'][\s\S]{0,120}Preview draft save failure/,
    'local preview must support deterministic failed-server-save recovery acceptance');
});
