const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const uiSource = fs.readFileSync(path.join(__dirname, '..', 'MailApp.html'), 'utf8');

function sourceBetween(start, end) {
  const startIndex = uiSource.indexOf(start);
  const endIndex = uiSource.indexOf(end, startIndex + start.length);
  assert.ok(startIndex >= 0, `missing start marker: ${start}`);
  assert.ok(endIndex > startIndex, `missing end marker: ${end}`);
  return uiSource.slice(startIndex, endIndex);
}

test('mail rows expose semantic unread state and explicit multi-selection controls', () => {
  assert.match(uiSource, /id="bulkToolbar" role="region" aria-label="Групові дії з вибраними листами" hidden/);
  assert.match(uiSource, /className: "thread-select-checkbox"[\s\S]*type: "checkbox"/);
  assert.match(uiSource, /"aria-label": \(thread\.unread \? "Непрочитаний лист\. " : ""\)/);
  assert.match(uiSource, /\.thread-row\[data-selected="true"\]\s*\{/);
  assert.match(uiSource, /\.thread-select-control\s*\{[\s\S]*min-height:\s*44px;/);
  assert.doesNotMatch(sourceBetween('      function p0BuildThreadRow(thread) {', '      async function loadThreads(reset, options) {'),
    /aria-selected/,
    'listitem selection must remain represented by a real checkbox rather than an unsupported aria-selected attribute');
});

test('selection is stable inside one list namespace and clears on account or filter namespace change', () => {
  const selectionSource = sourceBetween(
    '      function threadSelectionKey(thread) {',
    '      function renderBulkThreadToolbar(visibleThreads) {'
  );
  const context = vm.createContext({
    state: {
      threadSelectionNamespace: '',
      selectedThreadKeys: [],
      threads: [],
      backlogRescue: { threads: [] },
      threadOpenIntent: { key: '', startedAt: 0, promise: null },
    },
    namespace: 'account-a:inbox',
    safeId(value) { return String(value || '').replace(/[^A-Za-z0-9_-]/g, ''); },
    p0ListCacheKey() { return context.namespace; },
    mailboxViewContext() { return {}; },
    renderThreadList() {},
    ensureMailboxListHistory_() {},
    writeMailboxRoute_() {},
    openThread() { return Promise.resolve(true); },
    Date: { now() { return 1_000; } },
    Map,
    Set,
    Array,
    Number,
    Promise,
  });
  vm.runInContext(selectionSource, context);

  const first = { id: 'thread-1', accountId: 'account-a' };
  const second = { id: 'thread-2', accountId: 'account-a' };
  context.state.threads = [first, second];
  assert.equal(context.setThreadSelection(first, true), true);
  assert.deepEqual(Array.from(context.state.selectedThreadKeys), ['account-a:thread-1']);
  assert.deepEqual(Array.from(context.selectedThreadItems()).map(item => item.id), ['thread-1']);

  context.namespace = 'account-b:inbox';
  context.syncThreadSelectionNamespace();
  assert.deepEqual(Array.from(context.state.selectedThreadKeys), []);

  context.namespace = 'account-a:inbox';
  const page = Array.from({ length: 500 }, (_, index) => ({
    id: `thread-${index + 1}`,
    accountId: 'account-a',
  }));
  context.state.threads = page;
  for (let index = 0; index < 50; index += 1) {
    context.setThreadSelection(page[index], true);
  }
  assert.equal(context.selectedThreadItems().length, 50);
  context.state.threads = page.slice().reverse();
  assert.equal(context.selectedThreadItems().length, 50,
    'stable keys preserve selection when a 500-row page is reordered by revalidation');
});

test('row activation is single-flight and keyboard Space never reuses the open action', () => {
  const selectionSource = sourceBetween(
    '      function threadSelectionKey(thread) {',
    '      function renderBulkThreadToolbar(visibleThreads) {'
  );
  let opens = 0;
  let routes = 0;
  const context = vm.createContext({
    state: {
      threadSelectionNamespace: '',
      selectedThreadKeys: [],
      threads: [],
      backlogRescue: { threads: [] },
      threadOpenIntent: { key: '', startedAt: 0, promise: null },
    },
    safeId(value) { return String(value || '').replace(/[^A-Za-z0-9_-]/g, ''); },
    p0ListCacheKey() { return 'account-a:inbox'; },
    mailboxViewContext() { return {}; },
    renderThreadList() {},
    ensureMailboxListHistory_() {},
    writeMailboxRoute_() { routes += 1; },
    openThread() {
      opens += 1;
      return new Promise(() => {});
    },
    Date: { now() { return 1_000; } },
    Map,
    Set,
    Array,
    Number,
    Promise,
  });
  vm.runInContext(selectionSource, context);
  const thread = { id: 'thread-1', accountId: 'account-a' };
  context.activateThreadRow(thread);
  context.activateThreadRow(thread);
  assert.equal(opens, 1);
  assert.equal(routes, 1);

  const handlerSource = sourceBetween(
    '      function handleThreadRowKeydown(event, row) {',
    '      function coProcessingPhase(value, nowValue) {'
  );
  assert.match(handlerSource, /event\.key === "Enter"[\s\S]*row\.click\(\)/);
  assert.match(handlerSource, /event\.key === " "[\s\S]*thread-select-checkbox[\s\S]*checkbox\.click\(\)/);
});

test('bulk actions are bounded, sequential, account-scoped, and keyed reconciliation restores focus', () => {
  const bulkSource = sourceBetween(
    '      async function runBulkThreadAction(action) {',
    '      function handleThreadRowKeydown(event, row) {'
  );
  assert.match(bulkSource, /BULK_THREAD_ACTION_LIMIT/);
  assert.match(bulkSource, /for \(var index = 0; index < items\.length; index \+= 1\)/);
  assert.match(bulkSource, /await changeThreadAction\(action, thread\.id, \{[\s\S]*connectionId: thread\.accountId/);
  assert.doesNotMatch(bulkSource, /Promise\.all/);

  const renderSource = sourceBetween(
    '      function renderThreadList() {',
    '      async function loadThreads(reset, options) {'
  );
  assert.match(renderSource, /focusedKey[\s\S]*focusWasCheckbox/);
  assert.match(renderSource, /data-selected/);
  assert.match(renderSource, /selectionBox\.checked = selected/);
  assert.match(renderSource, /requestAnimationFrame[\s\S]*preventScroll/);
  assert.match(renderSource, /data-p0-thread-key/);
});
