const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const uiPath = path.resolve(__dirname, '..', 'MailApp.html');
const uiSource = fs.readFileSync(uiPath, 'utf8');

function sourceBetween(start, end) {
  const startIndex = uiSource.indexOf(start);
  assert.notEqual(startIndex, -1, `Missing UI source marker: ${start}`);
  const endIndex = uiSource.indexOf(end, startIndex + start.length);
  assert.notEqual(endIndex, -1, `Missing UI source marker: ${end}`);
  return uiSource.slice(startIndex, endIndex);
}

function extractUiFunction(name) {
  const pattern = new RegExp(
    `      function ${name}\\([^\\n]*\\) \\{[\\s\\S]*?\\n      \\}`
  );
  const match = uiSource.match(pattern);
  assert.ok(match, `Missing MailApp function: ${name}`);
  return match[0].trim();
}

test('message normalization prefers the structured sender DTO over the raw From header', () => {
  const normalizeMessageSource = sourceBetween(
    '      function normalizeMessage(value) {',
    '      function normalizeReplyPreset(value) {'
  );
  const context = vm.createContext({
    input: {
      id: 'message_sender_contract_1',
      from: 'Raw Header <raw@example.invalid>',
      sender: {
        name: 'Structured Sender',
        email: 'sender@example.com',
        avatarUrl: 'https://www.google.com/s2/favicons?domain_url=https%3A%2F%2Fexample.com&sz=128',
      },
      attachments: [],
      inlineAttachments: [],
      codes: [],
    },
    safeId: value => String(value || ''),
    safeText: (value, fallback = '') => value == null || value === '' ? String(fallback || '') : String(value),
    normalizePerson: value => value,
    parseRecipientHeader: () => [],
    normalizeAttachment: value => value,
    formatMessageHeaderTimestamp: () => '',
    normalizeDraft: value => value,
  });
  vm.runInContext(`${normalizeMessageSource}\nresult = normalizeMessage(input);`, context);

  assert.equal(context.result.from.name, 'Structured Sender');
  assert.equal(context.result.from.email, 'sender@example.com');
  assert.match(context.result.from.avatarUrl, /^https:\/\//);
  assert.doesNotMatch(JSON.stringify(context.result.from), /raw@example\.invalid/);
});

test('unsubscribe sends only the server-provided supporting message ID', () => {
  const actionSource = sourceBetween(
    '      async function changeThreadAction(action, explicitThreadId, options) {',
    '      function actionSuccessMessage(action) {'
  );
  const detailSource = sourceBetween(
    '      function normalizeThreadDetail(value) {',
    '      function renderReaderLoading() {'
  );

  assert.match(actionSource, /state\.thread\s*&&\s*state\.thread\.unsubscribeMessageId/);
  assert.match(actionSource, /messageId:\s*unsubscribeMessageId/);
  assert.doesNotMatch(actionSource, /latestMessage|messages\s*\[/);
  assert.match(actionSource, /if\s*\(action === "unsubscribe" && !unsubscribeMessageId\)/);
  assert.match(detailSource, /var unsubscribeMessageId = safeId\(source\.unsubscribeMessageId\)/);
  assert.match(detailSource, /unsubscribeMessageId\s*&&[\s\S]*source\.unsubscribeAvailable/);
});

test('preview contracts render Ukrainian analysis, sender avatars and a real reply-all audience', () => {
  const previewSource = sourceBetween(
    '      var PREVIEW_THREADS = [',
    '      cacheElements();'
  );

  assert.match(previewSource, /summaryUk:\s*thread\.summaryUk/);
  assert.match(previewSource, /analysis:\s*thread\.analysis/);
  assert.match(previewSource, /avatarUrl:\s*thread\.avatarUrl/);
  assert.match(previewSource, /summaryUk:\s*base\.analysis\.summaryUk/);
  assert.match(previewSource, /analysis:\s*previewAnalysis/);
  assert.match(previewSource, /sourceFragments:\s*\[previewEvidence\]/);
  assert.match(previewSource, /avatarUrl:\s*base\.avatarUrl/);
  assert.match(previewSource, /canReplyAll:\s*hasPreviewReplyAll/);
  assert.match(previewSource, /olena\.design@example\.com/);
  assert.match(previewSource, /teamlead@example\.com/);
  assert.match(previewSource, /payload\.messageId !== unsubscribeBase\.unsubscribeMessageId/);
  assert.match(previewSource, /unsubscribeMessageId:\s*base\.unsubscribeMessageId \|\| ""/);
});

test('evidence-grounded handoff stays account-bound explicit and calendar-scope free', () => {
  const normalizeSource = sourceBetween(
    '      function normalizeThreadHandoff(value, context) {',
    '      function normalizeThreadDetail(value) {'
  );
  const exact = {
    version: 1,
    account: { id: 'gmail-account-1', email: 'owner@example.com' },
    gmailUrl: 'https://mail.google.com/mail/u/0/#inbox/thread-1',
    task: {
      available: true,
      title: 'Сплатити рахунок',
      source: { messageId: 'message-1', timestamp: 123, quote: 'Сплатіть рахунок до п’ятниці.' },
    },
    calendar: {
      available: true,
      title: 'Рахунок',
      deadlineText: 'до п’ятниці',
      timezone: 'Europe/Brussels',
      source: { messageId: 'message-1', timestamp: 123, quote: 'Сплатіть рахунок до п’ятниці.' },
    },
  };
  const context = vm.createContext({
    input: exact,
    expected: {
      accountId: 'gmail-account-1',
      accountEmail: 'owner@example.com',
      gmailUrl: exact.gmailUrl,
    },
    safeId: value => /^[A-Za-z0-9._:@+-]+$/.test(String(value || '')) ? String(value) : '',
    safeText: (value, fallback = '') => value == null || value === '' ? String(fallback || '') : String(value),
    safeUrl: value => /^https:\/\//.test(String(value || '')) ? String(value) : '',
  });
  vm.runInContext(`${normalizeSource}\nresult = normalizeThreadHandoff(input, expected);`, context);
  assert.equal(context.result.task.available, true);
  assert.equal(context.result.calendar.available, true);
  assert.equal(context.result.calendar.startLocal, '');
  assert.equal(context.result.calendar.endLocal, '');

  context.input = { ...exact, account: { ...exact.account, id: 'another-account' } };
  vm.runInContext('result = normalizeThreadHandoff(input, expected);', context);
  assert.equal(context.result.task.available, false, 'a different Gmail account must disable the task proposal');
  assert.equal(context.result.calendar.available, false, 'a different Gmail account must disable the Calendar proposal');

  const handoffSource = sourceBetween(
    '      function setHandoffIsolation(active) {',
    '      function buildAttentionAssist() {'
  );
  assert.match(handoffSource, /updateAttention\(\{ triage: "action", nextAction: title \}\)/);
  assert.match(handoffSource, /new URL\("https:\/\/calendar\.google\.com\/calendar\/render"\)/);
  assert.match(handoffSource, /searchParams\.set\("action", "TEMPLATE"\)/);
  assert.match(handoffSource, /accountEmail: safeText\(handoff\.account && handoff\.account\.email\)\.trim\(\)\.toLowerCase\(\)/);
  assert.match(handoffSource, /searchParams\.set\("authuser", dialog\.accountEmail\)/);
  assert.match(handoffSource, /dialog\.accountEmail !== safeText\(state\.thread\.accountEmail\)\.trim\(\)\.toLowerCase\(\)/);
  assert.match(handoffSource, /dialog\.gmailUrl !== safeText\(state\.thread\.handoff && state\.thread\.handoff\.gmailUrl\)/);
  assert.match(handoffSource, /searchParams\.set\("dates", start \+ "\/" \+ end\)/);
  assert.match(handoffSource, /els\.handoffStart\.value = ""/);
  assert.match(handoffSource, /els\.handoffEnd\.value = ""/);
  assert.match(handoffSource, /completedKind === "task" && els\.handoffLayer\.hidden && state\.thread[\s\S]*renderThread\(\)[\s\S]*focusThreadHandoffSuggestion\(completedKind\)/,
    'after explicit handoff finishes the suggestion controls must be rendered enabled again');
  assert.match(handoffSource, /function closeThreadHandoff\(restoreFocus, force\)[\s\S]*state\.handoffBusy && !force/,
    'user close, Cancel and Escape must not dismiss an in-flight mutation');
  assert.match(handoffSource, /state\.handoffBusy = true;[\s\S]*els\.closeHandoff\.disabled = true;[\s\S]*els\.cancelHandoff\.disabled = true;/);
  assert.match(uiSource, /if \(!id \|\| state\.threadLoading \|\| state\.handoffBusy \|\|/,
    'an in-flight handoff must also freeze programmatic reader switching');
  assert.match(handoffSource, /completedKind = "task";[\s\S]*closeThreadHandoff\(false, true\)/);
  assert.match(handoffSource, /completedKind = "calendar";[\s\S]*closeThreadHandoff\(true, true\)/);
  assert.match(uiSource, /els\.cancelHandoff\.addEventListener\("click", function \(\) \{ closeThreadHandoff\(true\); \}\)/);
  assert.match(uiSource, /if \(!els\.handoffLayer\.hidden\)[\s\S]*event\.key === "Escape"[\s\S]*closeThreadHandoff\(true\)/);
  assert.doesNotMatch(handoffSource, /CalendarApp|google\.script\.run|window\.confirm|\bprompt\(/);

  const manifest = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'appsscript.json'), 'utf8'));
  assert.equal(manifest.oauthScopes.some(scope => /calendar/i.test(scope)), false,
    'the handoff opens an official user-confirmed template and must not add Calendar OAuth scope');
});

test('mail actions remain one-click and never open a confirmation dialog', () => {
  assert.doesNotMatch(uiSource, /(?:window\.)?confirm\s*\(/);
});

test('mail list uses honest server-wide Gmail filters and has no fake oldest sort', () => {
  assert.match(uiSource, /<select id="filterSelect"[^>]*>/);
  for (const [value, label] of [
    ['all', 'Усі листи'],
    ['unread', 'Непрочитані'],
    ['starred', 'Із зірочкою'],
    ['hasAttachment', 'З вкладеннями'],
    ['important', 'Важливі'],
  ]) {
    assert.match(uiSource, new RegExp(`<option value="${value}">${label}<\\/option>`));
  }
  assert.doesNotMatch(uiSource, /<option value="oldest">/);
  assert.doesNotMatch(uiSource, /state\.sort|sortThreadsForView/);

  const requestSource = sourceBetween(
    '      function safeMailboxFilter(value) {',
    '      function formatTimestampLabel(value, fallback) {'
  );
  assert.match(requestSource, /filter:\s*safeMailboxFilter\(view\.filter\)/);
  assert.match(requestSource, /query:\s*view\.query/);
  assert.doesNotMatch(requestSource, /is:unread|is:starred|has:attachment|is:important/,
    'the client must not smuggle filter operators into the user search string');

  const translationSource = sourceBetween(
    '      function translateRpcRequest(request) {',
    '      function rpc(request) {'
  );
  assert.match(translationSource, /op:\s*input\.unified \? "unifiedList" : "list"[\s\S]*filter:\s*safeMailboxFilter\(input\.filter\)/);
});

test('Telegram deep links apply folder filters and open the real label panel only', () => {
  const routeSource = sourceBetween(
    '      function parseLocationRoute() {',
    '      function safeColor(value, fallback) {'
  );
  assert.match(routeSource, /new Set\(\["view", "thread", "message", "panel", "account"\]\)/);
  assert.match(routeSource, /panel && panel !== "labels"/);
  assert.match(routeSource, /new Set\(\["view", "folder", "filter"\]\)/);
  assert.match(routeSource, /state\.filter = safeMailboxFilter\(route\.filter \|\| "all"\)/);
  assert.match(routeSource, /els\.filterSelect\.value = state\.filter/);
  assert.match(routeSource, /function openThreadRoutePanel\(route\)/);
  assert.match(routeSource, /toggleLabelMenu\(trigger\)/);
  assert.match(uiSource, /openThreadRoutePanel\(initialRoute\)/);
});

test('opening an unread thread marks it read without closing the active reader', () => {
  const openThreadSource = sourceBetween(
    '      async function openThread(threadId, force, connectionId) {',
    '      function closeReader() {'
  );
  assert.match(openThreadSource, /if \(state\.thread\.unread\)/);
  assert.match(openThreadSource, /await changeThreadAction\("markRead", id, \{[\s\S]*preserveOpen: true,[\s\S]*silentSuccess: true/);
  const actionSource = sourceBetween(
    '      async function changeThreadAction(action, explicitThreadId, options) {',
    '      function actionSuccessMessage(action) {'
  );
  assert.match(actionSource, /removeFromView && !actionOptions\.preserveOpen/);
  assert.match(actionSource, /if \(!actionOptions\.silentSuccess\)/);
});

test('unsupported unsubscribe remains visible as a muted explanatory control', () => {
  assert.match(uiSource, /\.action-menu-item\.unavailable\s*\{/);
  const menuSource = sourceBetween(
    '      function toggleMoreMenu(invoker) {',
    '      function toggleLabelMenu(invoker) {'
  );
  assert.match(menuSource, /var unavailable = Boolean\(item\.onlyUnsubscribe && !state\.thread\.unsubscribeAvailable\)/);
  assert.match(menuSource, /className: "action-menu-item" \+ \(unavailable \? " unavailable" : ""\)/);
  assert.match(menuSource, /Цей відправник не підтримує безпечну відписку/);
  assert.doesNotMatch(menuSource, /if \(item\.onlyUnsubscribe && !state\.thread\.unsubscribeAvailable\) return/);
});

test('a slow list request is superseded and the latest queued view is rendered', async () => {
  const requestSource = sourceBetween(
    '      function safeMailboxFilter(value) {',
    '      function formatTimestampLabel(value, fallback) {'
  );
  const sortSource = sourceBetween(
    '      function sortThreadsNewest(items) {',
    '      function renderListLoading() {'
  );
  const loadSource = sourceBetween(
    '      async function loadThreads(reset) {',
    '      function normalizePerson(value) {'
  );
  const deferred = () => {
    let resolve;
    let reject;
    const promise = new Promise((res, rej) => { resolve = res; reject = rej; });
    return { promise, resolve, reject };
  };
  const firstResponse = deferred();
  const secondResponse = deferred();
  const requests = [];
  const renders = [];
  let context;
  context = vm.createContext({
    state: {
      currentFolderId: 'INBOX',
      currentLabelId: '',
      query: '',
      filter: 'all',
      threads: [],
      nextPageToken: '',
      totalEstimate: null,
      listLoading: false,
      pendingListIntent: null,
      requestVersion: 0,
    },
    els: {
      threadList: { setAttribute() {}, removeAttribute() {} },
      refreshButton: { disabled: false },
      mobileRefreshButton: { disabled: false },
    },
    safeText: (value, fallback = '') => value == null || value === '' ? String(fallback || '') : String(value),
    safeId: value => String(value || ''),
    normalizeThread: value => value,
    renderListLoading() {},
    renderListState(kind, message) { throw new Error(`${kind}: ${message}`); },
    renderThreadList() { renders.push(context.state.threads.map(thread => thread.id)); },
    rpc(request) {
      requests.push(request);
      return requests.length === 1 ? firstResponse.promise : secondResponse.promise;
    },
  });
  vm.runInContext(`${requestSource}\n${sortSource}\n${loadSource}`, context);

  const firstLoad = context.loadThreads(true);
  assert.equal(requests.length, 1);
  assert.equal(requests[0].folderId, 'INBOX');

  context.state.currentFolderId = 'ARCHIVE';
  await context.loadThreads(true);
  assert.equal(requests.length, 1, 'the newer intent must wait behind the in-flight RPC');

  firstResponse.resolve({ threads: [{ id: 'stale', timestamp: 1 }] });
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(requests.length, 2, 'the latest queued intent must run automatically');
  assert.equal(requests[1].folderId, 'ARCHIVE');
  assert.deepEqual(Array.from(context.state.threads), [], 'the stale response must not mutate the visible list');

  secondResponse.resolve({ threads: [{ id: 'fresh', timestamp: 2 }] });
  await firstLoad;
  assert.deepEqual(Array.from(context.state.threads, thread => thread.id), ['fresh']);
  assert.deepEqual(JSON.parse(JSON.stringify(renders)), [['fresh']]);
  assert.equal(context.state.listLoading, false);
  assert.equal(context.state.pendingListIntent, null);
});

test('thread actions are folder-aware, server-directed, and disabled while busy', () => {
  const toolbarSource = sourceBetween(
    '      function toolbarButton(iconName, label, action, options) {',
    '      function threadStateLabels() {'
  );
  assert.match(toolbarSource, /folder === "ARCHIVE"[\s\S]*action: "inbox"[\s\S]*label: "До Вхідних"/);
  assert.match(toolbarSource, /folder === "ARCHIVE" \|\| folder === "SNOOZED"/);
  assert.match(toolbarSource, /folder === "TRASH"[\s\S]*action: "untrash"[\s\S]*label: "Відновити"/);
  assert.match(toolbarSource, /folder === "SPAM"[\s\S]*action: "notSpam"[\s\S]*label: "Не спам"/);
  assert.match(toolbarSource, /state\.thread\.important \? "notImportant" : "important"/);
  assert.match(toolbarSource, /button\.disabled = Boolean\(opts\.mailAction && state\.actionBusy\)/);

  const actionSource = sourceBetween(
    '      function setMailboxActionBusy(busy) {',
    '      function actionSuccessMessage(action) {'
  );
  assert.match(actionSource, /Object\.assign\(\{\}, options && options\.payload \|\| \{\}, mailboxViewContext\(\)/);
  assert.match(actionSource, /typeof data\.removeFromView === "boolean"/);
  assert.match(actionSource, /document\.querySelectorAll\("\[data-mail-action\]"\)/);
  assert.doesNotMatch(actionSource, /var move = action === "archive"/);
});

test('Snoozed and returned Gmail categories have dedicated navigation groups', () => {
  assert.match(uiSource, /id="categorySection"[^>]*hidden/);
  assert.match(uiSource, /id="categoryNav"/);
  assert.match(uiSource, /\{ id: "SNOOZED", name: "Відкладені", icon: "snooze" \}/);
  for (const id of ['PRIMARY', 'SOCIAL', 'PROMOTIONS', 'UPDATES', 'FORUMS']) {
    assert.match(uiSource, new RegExp(`\\{ id: "${id}"[^\\n]+group: "categories"[^\\n]+optional: true`));
  }
  const mergeSource = sourceBetween(
    '      function stableFolderUiId(value) {',
    '      function normalizeLabels(labels) {'
  );
  assert.match(mergeSource, /CATEGORY_\(\?:PRIMARY\|SOCIAL\|PROMOTIONS\|UPDATES\|FORUMS\)/);
  assert.match(mergeSource, /return id\.slice\(9\)/);
  assert.match(mergeSource, /if \(base\.optional && !byId\[base\.id\]\) return null/);
  assert.match(mergeSource, /group:\s*safeText\(server\.group, base\.group\)/);
  const navigationSource = sourceBetween(
    '      function renderNavigation() {',
    '      function selectedNavigationName() {'
  );
  assert.match(navigationSource, /folder\.group === "categories"/);
  assert.match(navigationSource, /categorySection\.hidden = !categories\.length/);
});

test('removing the active custom label immediately removes the thread from that label view', () => {
  const labelSource = sourceBetween(
    '      async function applyUserLabels(addLabelIds, removeLabelIds) {',
    '      function closeActionMenus(options) {'
  );
  assert.match(labelSource, /state\.currentLabelId && removeLabelIds\.indexOf\(state\.currentLabelId\) !== -1/);
  assert.match(labelSource, /removeThreadFromCurrentView\(threadId, connectionId\)/);
});

test('thread rows use list semantics and support deterministic keyboard navigation', () => {
  assert.match(uiSource, /id="threadList" role="list"/);
  assert.match(uiSource, /role:\s*"listitem"/);
  const listSource = sourceBetween(
    '      function renderThreadList() {',
    '      function renderReaderLoading() {'
  );
  assert.doesNotMatch(listSource, /role="listbox"|role:\s*"option"|aria-selected/);

  const handlerSource = sourceBetween(
    '      function handleThreadRowKeydown(event, row) {',
    '      function renderThreadList() {'
  );
  let focused = -1;
  let clicked = -1;
  const rows = [0, 1, 2].map(index => ({
    focus() { focused = index; },
    click() { clicked = index; },
  }));
  const context = vm.createContext({
    els: { threadList: { querySelectorAll() { return rows; } } },
  });
  vm.runInContext(handlerSource, context);

  let prevented = false;
  context.handleThreadRowKeydown({
    key: 'ArrowDown',
    target: rows[1],
    preventDefault() { prevented = true; },
  }, rows[1]);
  assert.equal(prevented, true);
  assert.equal(focused, 2);

  prevented = false;
  context.handleThreadRowKeydown({
    key: 'Home',
    target: rows[2],
    preventDefault() { prevented = true; },
  }, rows[2]);
  assert.equal(prevented, true);
  assert.equal(focused, 0);

  context.handleThreadRowKeydown({
    key: 'Enter',
    target: rows[1],
    preventDefault() {},
  }, rows[1]);
  assert.equal(clicked, 1);

  focused = -1;
  context.handleThreadRowKeydown({
    key: 'ArrowDown',
    target: { nestedControl: true },
    preventDefault() { throw new Error('nested controls must keep their own keyboard behavior'); },
  }, rows[1]);
  assert.equal(focused, -1);
});

test('compose is a labelled modal that isolates the background and traps focus at runtime', () => {
  assert.match(uiSource, /id="composeSheet" role="dialog" aria-modal="true" aria-labelledby="composeTitle"[^>]*tabindex="-1"/);
  assert.match(uiSource, /id="composeCloseDialog" role="alertdialog" aria-modal="true" aria-labelledby="composeCloseTitle" aria-describedby="composeCloseDescription"/);
  assert.match(uiSource, /for="attachmentInput">Вибрати файли для вкладення<\/label>/);
  assert.match(uiSource, /id="attachmentInput"[^>]*aria-label="Вибрати файли для вкладення"/);

  const isolationSource = sourceBetween(
    '      function setComposeModalIsolation(active) {',
    '      function composeFocusableElements() {'
  );
  function fakeNode(initialAriaHidden) {
    const attrs = new Map();
    if (initialAriaHidden != null) attrs.set('aria-hidden', initialAriaHidden);
    return {
      dataset: {},
      inert: false,
      hasAttribute(name) { return attrs.has(name); },
      getAttribute(name) { return attrs.get(name) ?? null; },
      setAttribute(name, value) { attrs.set(name, String(value)); },
      removeAttribute(name) { attrs.delete(name); },
    };
  }
  const background = fakeNode();
  const previouslyHidden = fakeNode('false');
  const composeBackdrop = fakeNode();
  const composeSheet = fakeNode();
  const snackbar = fakeNode();
  const isolationContext = vm.createContext({
    app: { children: [background, previouslyHidden, composeBackdrop, composeSheet, snackbar] },
    els: { composeBackdrop, composeSheet, snackbar },
  });
  vm.runInContext(isolationSource, isolationContext);
  isolationContext.setComposeModalIsolation(true);
  assert.equal(background.inert, true);
  assert.equal(background.getAttribute('aria-hidden'), 'true');
  assert.equal(previouslyHidden.inert, true);
  assert.equal(composeSheet.inert, false);
  assert.equal(snackbar.inert, false);
  isolationContext.setComposeModalIsolation(false);
  assert.equal(background.inert, false);
  assert.equal(background.hasAttribute('aria-hidden'), false);
  assert.equal(previouslyHidden.getAttribute('aria-hidden'), 'false');

  const trapSource = sourceBetween(
    '      function composeFocusableElements() {',
    '      function showCompose() {'
  );
  const documentStub = { activeElement: null };
  const focusables = [0, 1].map(index => ({
    hidden: false,
    getAttribute() { return null; },
    getClientRects() { return [1]; },
    focus() { documentStub.activeElement = focusables[index]; },
  }));
  const sheetStub = {
    classList: { contains(name) { return name === 'open'; } },
    querySelectorAll() { return focusables; },
    contains(node) { return focusables.includes(node); },
    focus() { documentStub.activeElement = sheetStub; },
  };
  const trapContext = vm.createContext({
    state: { composeCloseDialogOpen: false },
    els: { composeSheet: sheetStub, composeCloseDialog: sheetStub },
    document: documentStub,
  });
  vm.runInContext(trapSource, trapContext);
  documentStub.activeElement = focusables[1];
  let prevented = false;
  trapContext.trapComposeFocus({ key: 'Tab', shiftKey: false, preventDefault() { prevented = true; } });
  assert.equal(prevented, true);
  assert.equal(documentStub.activeElement, focusables[0]);
  documentStub.activeElement = focusables[0];
  trapContext.trapComposeFocus({ key: 'Tab', shiftKey: true, preventDefault() {} });
  assert.equal(documentStub.activeElement, focusables[1]);
});

test('compose close is explicit, clean close is immediate, and minimize stays non-blocking while Gmail saves', () => {
  const decisionSource = sourceBetween(
    '      function setComposeCloseIsolation(active) {',
    '      function renderComposeAttachments() {'
  );
  const closeSource = sourceBetween(
    '      function requestCloseCompose() {',
    '      function renderComposeAttachments() {'
  );
  assert.match(uiSource, /id="saveAndCloseComposeButton"[^>]*>Зберегти в чернетки<\/button>/);
  assert.match(uiSource, /id="discardComposeButton"[^>]*>Відхилити зміни<\/button>/);
  assert.match(uiSource, /id="continueComposeButton"[^>]*>Продовжити<\/button>/);
  assert.match(closeSource, /state\.composeBusy \|\| state\.composeSaveInFlight \|\| composePendingKind\(\)[\s\S]*Редактор лишається відкритим/);
  assert.match(closeSource, /\(!state\.compose\.dirty && !composeAttachmentJobs\(\)\.length\) \|\| !hasDraftContent\(\)[\s\S]*finishCloseCompose\(\)/);
  assert.match(closeSource, /openComposeCloseDialog\(\)/);
  assert.match(decisionSource, /function discardComposeChanges\(\)[\s\S]*finishCloseCompose\(\)/);
  assert.match(decisionSource, /async function minimizeCompose\(options\)[\s\S]*applyConfirmedComposeMinimize\([\s\S]*saveDraft\(\{ quiet: true, background: true/);
  assert.doesNotMatch(decisionSource, /async function minimizeCompose\(options\)[\s\S]*await saveDraft\(/);
  assert.match(decisionSource, /function applyConfirmedComposeMinimize\(options\)[\s\S]*composeRestoreChip\.hidden = false/);
  assert.match(decisionSource, /function restoreCompose\(\)[\s\S]*composeRestoreChip\.hidden = true/);
  assert.match(closeSource, /setComposeModalIsolation\(false\)/);
  assert.match(closeSource, /returnFocus && returnFocus\.isConnected/);

  const keydownSource = sourceBetween(
    '        document.addEventListener("keydown", function (event) {',
    '        window.addEventListener("online"'
  );
  assert.match(keydownSource, /event\.key === "Tab"\) trapComposeFocus\(event\)/);
  assert.match(keydownSource, /event\.key === "Escape"[\s\S]*state\.composeCloseDialogOpen[\s\S]*closeComposeCloseDialog\(true\)[\s\S]*state\.composeSourceOpen[\s\S]*requestCloseCompose\(\)/);
});

test('local attachment staging starts every accepted file in parallel and cancellation aborts the exact reader', () => {
  const addSource = extractUiFunction('addOutgoingFiles');
  assert.doesNotMatch(addSource, /\bawait\b|state\.composeBusy\s*=/);
  assert.match(addSource, /accepted\.forEach[\s\S]*startComposeAttachmentJob\(job, false\)/);

  const started = [];
  const notices = [];
  let nextId = 0;
  const state = {
    composeBusy: false,
    compose: { attachments: [], inlineAttachments: [] },
    composeAttachmentJobs: new Map(),
    limits: {
      maxOutgoingAttachments: 20,
      maxOutgoingAttachmentBytes: 1024,
      maxOutgoingAttachmentsTotalBytes: 4096,
    },
  };
  const context = vm.createContext({
    state,
    els: { attachmentInput: { value: 'chosen' }, attachmentFolderInput: { value: 'chosen' } },
    composeAttachmentsLocked: () => false,
    composeAttachmentJobs: () => Array.from(state.composeAttachmentJobs.values()),
    validateOutgoingFile: file => ({ name: file.name, size: file.size, mimeType: file.type }),
    createComposeAttachmentJob(file, info) {
      return { id: `job-${++nextId}`, order: nextId, file, ...info, state: 'queued', cancelled: false };
    },
    startComposeAttachmentJob(job) {
      started.push(job.file.name);
      return new Promise(() => {});
    },
    renderComposeAttachments() {},
    updateComposeLifecycleControls() {},
    showSnackbar(message) { notices.push(message); },
    safeText: (value, fallback = '') => value == null || value === '' ? String(fallback || '') : String(value),
    formatSize: value => `${value} B`,
    Array,
    Map,
    Promise,
  });
  vm.runInContext(addSource, context);

  const accepted = context.addOutgoingFiles([
    { name: 'one.pdf', size: 10, type: 'application/pdf' },
    { name: 'two.png', size: 20, type: 'image/png' },
    { name: 'three.zip', size: 30, type: 'application/zip' },
  ]);
  assert.deepEqual(started, ['one.pdf', 'two.png', 'three.zip']);
  assert.equal(accepted.length, 3);
  assert.equal(state.composeAttachmentJobs.size, 3);
  assert.equal(state.composeBusy, false, 'local reads must not lock the editor');
  assert.match(notices.join('\n'), /паралельна обробка/);

  const cancelSource = extractUiFunction('cancelComposeAttachmentJob');
  let aborts = 0;
  let released = 0;
  let scheduled = 0;
  const reader = { readyState: 1, abort() { aborts += 1; } };
  const cancelState = { composeAttachmentJobs: new Map([['job-cancel', { id: 'job-cancel', reader, cancelled: false }]]) };
  const cancelContext = vm.createContext({
    state: cancelState,
    safeClientOperationId: value => String(value || ''),
    releaseComposeAttachmentJob() { released += 1; },
    renderComposeAttachments() {},
    updateComposeLifecycleControls() {},
    flushReadyComposeAttachmentJobs() {},
    window: { setTimeout() { scheduled += 1; } },
    Number,
  });
  vm.runInContext(cancelSource, cancelContext);
  assert.equal(cancelContext.cancelComposeAttachmentJob('job-cancel'), true);
  assert.equal(aborts, 1);
  assert.equal(released, 1);
  assert.equal(cancelState.composeAttachmentJobs.has('job-cancel'), false);
  assert.equal(scheduled, 1);
});

test('attachment queue exposes progress, early preview, independent scrolling, and honest local-only recovery', () => {
  assert.match(uiSource, /\.compose-attachments\s*\{[\s\S]*max-height:\s*154px;[\s\S]*overflow-y:\s*auto;/);
  assert.match(uiSource, /className:\s*"compose-attachment-progress"[\s\S]*loaded[\s\S]*job\.size/);
  assert.match(uiSource, /function fileToBase64\(file, options\)[\s\S]*reader\.onprogress[\s\S]*reader\.onabort/);
  assert.match(uiSource, /function attachmentJobEta\(job\)[\s\S]*loaded \/ elapsed/);
  assert.match(uiSource, /function attachmentJobStatus\(job\)[\s\S]*минуло [" ]*\+ formatAttachmentJobDuration\(attachmentJobElapsed\(job\)\)/);
  assert.match(uiSource, /job\.tickTimer = window\.setInterval\([\s\S]*renderComposeAttachments\(\)[\s\S]*1000\)/);
  assert.match(uiSource, /function openLocalAttachmentJobPreview\(job, trigger\)[\s\S]*blob:\s*job\.file[\s\S]*renderAttachmentPreviewData\(data\)/);
  assert.match(uiSource, /cancel\.addEventListener\("click"[\s\S]*cancelComposeAttachmentJob\(job\.id\)/);
  assert.match(uiSource, /Якщо закрити Mini App до завершення, незавершені файли потрібно вибрати знову/);
  assert.match(uiSource, /Поки це вікно Mini App відкрите, локальні зміни зберігаються у фоні/);
  assert.doesNotMatch(uiSource, /Редактор згорнуто\. Локальні зміни продовжують зберігатися у фоні/);
  assert.match(uiSource, /Перевіряю метадані без повного завантаження файла/);
  assert.doesNotMatch(uiSource, /Перевіряю файл без завантаження байтів/);
  assert.match(uiSource, /sendCompose\(\)[\s\S]*composeAttachmentJobs\(\)\.length[\s\S]*Незавершені файли не надсилаються/);
  assert.match(uiSource, /saveDraft\(options\)[\s\S]*opts\.closeAfter && composeAttachmentJobs\(\)\.length/);
});

test('short-height compose keeps the footer and cancellable attachment gallery within a 470px viewport budget', () => {
  const compactSource = sourceBetween(
    '    @media (max-height: 560px) {',
    '    @media (pointer: coarse) {'
  );
  assert.match(compactSource, /\.compose-sheet\s*\{[\s\S]*min-height:\s*0;[\s\S]*max-height:\s*100dvh;/);
  assert.match(compactSource, /\.compose-header,[\s\S]*\.compose-footer\s*\{[\s\S]*min-height:\s*40px;/);
  assert.match(compactSource, /\.compose-field\s*\{[\s\S]*min-height:\s*31px;/);
  assert.match(compactSource, /\.compose-format-toolbar\s*\{[\s\S]*max-height:\s*40px;[\s\S]*overflow-x:\s*auto;/);
  assert.match(compactSource, /\.compose-editor\s*\{[\s\S]*min-height:\s*58px;/);
  assert.match(compactSource, /\.compose-attachments\s*\{[\s\S]*max-height:\s*88px;/);
  assert.match(uiSource, /\.compose-attachments\s*\{[\s\S]*overflow-y:\s*auto;/);
  assert.match(uiSource, /aria-label": "Скасувати й прибрати " \+ job\.name/);
  const budget = 40 + (5 * 31) + 40 + 58 + 88 + 40;
  assert.ok(budget <= 470, `compact compose fixed-content budget ${budget}px must fit a 470px viewport`);
});

test('short-height compose panels stay in body flow and snackbars do not mask attachment actions', () => {
  const linkPanelCss = sourceBetween(
    '    .compose-link-panel {',
    '    .compose-table-panel {'
  );
  const tablePanelCss = sourceBetween(
    '    .compose-table-panel {',
    '    .compose-table-panel[hidden] {'
  );
  assert.match(linkPanelCss, /flex:\s*0 1 auto;[\s\S]*max-height:\s*96px;[\s\S]*overflow:\s*auto;/);
  assert.match(tablePanelCss, /flex:\s*0 1 auto;[\s\S]*max-height:\s*156px;[\s\S]*overflow:\s*auto;/);

  const compactSource = sourceBetween(
    '    @media (max-height: 560px) {',
    '    @media (pointer: coarse) {'
  );
  assert.match(compactSource, /\.compose-table-panel\s*\{[\s\S]*min-height:\s*96px;[\s\S]*max-height:\s*132px;/);

  const toolbarButton = uiSource.indexOf('data-format="clearFormatting"');
  const toolbarClose = uiSource.indexOf('        </div>', toolbarButton);
  const linkForm = uiSource.indexOf('id="composeLinkForm"');
  const tablePanel = uiSource.indexOf('id="composeTablePanel"');
  const composeBody = uiSource.indexOf('id="composeBody"');
  assert.ok(toolbarButton >= 0 && toolbarClose > toolbarButton);
  assert.ok(toolbarClose < linkForm && linkForm < tablePanel && tablePanel < composeBody);

  const snackbarVisibleCss = sourceBetween(
    '    .snackbar.visible {',
    '    .snackbar.error {'
  );
  const snackbarButtonCss = sourceBetween(
    '    .snackbar button {',
    '    .snackbar button:hover {'
  );
  assert.match(snackbarVisibleCss, /pointer-events:\s*none;/);
  assert.match(snackbarButtonCss, /pointer-events:\s*auto;/);
});
test('unread rows have a theme-safe visual surface while selected and hover precedence stays explicit', () => {
  assert.match(uiSource, /\.thread-row\.unread\s*\{[\s\S]*background:\s*color-mix\(in srgb, var\(--primary\) 7%, var\(--bg\)\);[\s\S]*box-shadow:/);
  assert.match(uiSource, /\.thread-row\.unread:hover\s*\{[\s\S]*background:\s*color-mix/);
  assert.match(uiSource, /\.thread-row\.unread\[aria-current="true"\]\s*\{[\s\S]*background:\s*var\(--selected\);/);
  assert.match(uiSource, /\.thread-row\.unread \.thread-time,[\s\S]*\.thread-row\.unread \.thread-summary[\s\S]*font-weight:\s*700;/);
});

test('compose keeps recipients compact, formatting selection stable, and table controls explicit', () => {
  assert.match(uiSource, /\.compose-header\s*\{[\s\S]*position:\s*sticky;/);
  assert.match(uiSource, /\.compose-editor\s*\{[\s\S]*overflow-y:\s*auto;/);
  assert.match(uiSource, /\.compose-optional\s*\{[\s\S]*display:\s*none;/);
  assert.match(uiSource, /id="hideCcButton"[\s\S]*id="hideBccButton"/);
  assert.match(uiSource, /function collapseEmptyRecipientField\(kind\)[\s\S]*setOptionalRecipientField\(kind, false, false\)/);

  const formattingSource = sourceBetween(
    '      function selectComposeContents(node) {',
    '      function insertComposeList(tagName) {'
  );
  assert.match(formattingSource, /range\.selectNodeContents\(node\)[\s\S]*state\.composeSelection = range\.cloneRange\(\)/);
  assert.match(formattingSource, /function wrapComposeSelection[\s\S]*selectComposeContents\(wrapper\)[\s\S]*syncComposeFromFields\(\)/);
  const blockFormattingSource = sourceBetween(
    '      function selectedComposeBlocks() {',
    '      function insertComposeNode(node, focusNode, collapseToStart) {'
  );
  assert.match(blockFormattingSource, /function selectComposeBlockSpan[\s\S]*range\.setStart\(first, 0\)[\s\S]*range\.setEnd\(last, last\.childNodes\.length\)[\s\S]*state\.composeSelection = range\.cloneRange\(\)/);
  assert.match(blockFormattingSource, /function applyComposeBlockTag[\s\S]*selectComposeBlockSpan\(blocks\)/);
  assert.doesNotMatch(blockFormattingSource, /function applyComposeBlockTag[\s\S]*selectComposeNode\(blocks\[/);
  assert.match(uiSource, /function clearComposeFormatting[\s\S]*selectComposeContents\(node\)/);

  assert.match(uiSource, /composeFormatToolbar\.addEventListener\("pointerdown"[\s\S]*state\.composeSelection = range\.cloneRange\(\)/);

  for (const id of [
    'composeTableRows', 'composeTableColumns', 'composeTableBorderStyle',
    'composeTableBorderWidth', 'composeTableBorderColor',
  ]) assert.match(uiSource, new RegExp(`id="${id}"`));
  for (const action of [
    'addRowAbove', 'addRowBelow', 'addColumnLeft', 'addColumnRight', 'removeRow', 'removeColumn',
  ]) assert.match(uiSource, new RegExp(`data-table-action="${action}"`));
  assert.match(uiSource, /function composeTableSpec\(\)[\s\S]*Math\.min\(20[\s\S]*Math\.min\(10/);
  assert.match(uiSource, /function mutateComposeTable\(action\)[\s\S]*addRowAbove[\s\S]*addColumnLeft[\s\S]*removeRow[\s\S]*removeColumn/);
  assert.match(uiSource, /Gmail може нормалізувати їх під час канонічного збереження/);
});

test('device and Drive chooser affordances use native picker APIs with safe browser fallbacks', () => {
  assert.match(uiSource, /id="attachmentFolderInput"[^>]*webkitdirectory/);
  assert.match(uiSource, /function openDeviceFileChooser\(\)[\s\S]*showOpenFilePicker\(\{ multiple: true \}\)[\s\S]*attachmentInput\.click\(\)/);
  assert.match(uiSource, /function openDeviceFolderChooser\(\)[\s\S]*showDirectoryPicker\(\{ mode: "read" \}\)[\s\S]*attachmentFolderInput\.click\(\)/);
  assert.match(uiSource, /renderDriveSourceItem\(metadata\)[\s\S]*addEventListener\("dblclick"[\s\S]*addComposeSourceAttachment\(metadata, false\)/);
});

test('reader owns a real scroll viewport for mouse, touch, and keyboard navigation', () => {
  assert.match(uiSource, /#readerContentHost\s*\{[\s\S]*display:\s*flex;[\s\S]*min-height:\s*0;[\s\S]*flex:\s*1 1 auto;[\s\S]*overflow:\s*hidden;/);
  assert.match(uiSource, /\.reader-scroll\s*\{[\s\S]*overflow-y:\s*auto;[\s\S]*touch-action:\s*pan-y pinch-zoom;[\s\S]*-webkit-overflow-scrolling:\s*touch;/);
  const renderSource = sourceBetween(
    '      function renderThread() {',
    '      function setAttachmentPreviewIsolation(active) {'
  );
  assert.match(renderSource, /className:\s*"reader-scroll"[\s\S]*tabindex:\s*"0"[\s\S]*role:\s*"region"[\s\S]*aria-label":\s*"Повний вміст розмови"/);

  const keyboardSource = sourceBetween(
    '      function handleReaderScrollKeydown(event, explicitScroll) {',
    '      function buildMobileActionBar() {'
  );
  const calls = [];
  const scroll = {
    clientHeight: 500,
    scrollHeight: 2400,
    scrollTop: 0,
    scrollBy(value) { calls.push(['by', value.top]); },
    scrollTo(value) { calls.push(['to', value.top]); },
  };
  const context = vm.createContext({ app: { classList: { contains() { return true; } } }, els: {} });
  vm.runInContext(keyboardSource, context);
  let prevented = false;
  assert.equal(context.handleReaderScrollKeydown({
    key: 'PageDown', target: {}, preventDefault() { prevented = true; },
  }, scroll), true);
  assert.equal(prevented, true);
  assert.deepEqual(calls[0], ['by', 430]);
  context.handleReaderScrollKeydown({ key: 'End', target: {}, preventDefault() {} }, scroll);
  assert.deepEqual(calls[1], ['to', 2400]);
  assert.equal(context.handleReaderScrollKeydown({
    key: 'Home',
    target: { isContentEditable: true },
    preventDefault() { throw new Error('editable content must retain Home/End'); },
  }, scroll), false);
});

test('long sanitized HTML expands inside the reader without enabling mail scripts', () => {
  const fitSource = sourceBetween(
    '      function fitSandboxedMailFrame(frame, fallbackHeight) {',
    '      function setSanitizedMessageBody(container, message) {'
  );
  let onLoad;
  const mailDocument = {
    documentElement: { scrollHeight: 1200, offsetHeight: 1190 },
    body: { scrollHeight: 1180, offsetHeight: 1170 },
    querySelectorAll() { return []; },
  };
  const frame = {
    style: {},
    contentDocument: mailDocument,
    addEventListener(name, handler) { if (name === 'load') onLoad = handler; },
  };
  const context = vm.createContext({});
  vm.runInContext(fitSource, context);
  context.fitSandboxedMailFrame(frame, 180);
  assert.equal(frame.style.height, '180px');
  onLoad();
  assert.equal(frame.style.height, '1200px');

  const bodySource = sourceBetween(
    '      function setSanitizedMessageBody(container, message) {',
    '      function attachmentTypeInfo(attachment) {'
  );
  assert.match(bodySource, /sandbox:\s*"allow-same-origin allow-popups allow-popups-to-escape-sandbox"/);
  assert.doesNotMatch(bodySource, /allow-scripts/);
  assert.match(bodySource, /fitSandboxedMailFrame\(frame, mailDocument\.height\)/);
});

test('expired mailbox sessions are classified, cleared, and never retried with the old bearer', () => {
  const responseSource = sourceBetween(
    '      function normalizeResponse(response) {',
    '      function callOpenSession(initData) {'
  );
  const shown = [];
  const state = { session: 'expired-bearer', routeReady: true, requestVersion: 2, sessionFailureShown: false };
  const context = vm.createContext({
    state,
    app: { setAttribute() {} },
    safeText(value, fallback = '') { return value == null || String(value).trim() === '' ? String(fallback || '') : String(value); },
    showBootError(message, options) { shown.push([message, options]); },
  });
  vm.runInContext(responseSource, context);
  let error;
  try {
    context.normalizeResponse({ ok: false, error: { code: 'SESSION_EXPIRED', message: 'Сеанс пошти завершився.' } });
  } catch (caught) {
    error = caught;
  }
  assert.equal(error.code, 'SESSION_EXPIRED');
  assert.equal(context.handleMailboxSessionFailure(error), true);
  assert.equal(state.session, null);
  assert.equal(state.routeReady, false);
  assert.equal(state.requestVersion, 3);
  assert.equal(shown.length, 1);

  const restartSource = sourceBetween(
    '      async function restartMailboxApp() {',
    '      function setBootLoading() {'
  );
  assert.match(restartSource, /state\.session = null/);
  assert.match(restartSource, /await renewMailboxSession\(\)/);
  assert.match(restartSource, /window\.top\.location\.href = bridgeUrl/);
  assert.match(restartSource, /window\.location\.replace\(bridgeUrl\)/);
  assert.match(restartSource, /tg\.close\(\)/);
  assert.match(restartSource, /retry\.addEventListener\("click", function \(\) \{/);
  assert.match(restartSource, /restartMailboxApp\(\)/);
  assert.doesNotMatch(restartSource, /retry\.addEventListener\("click", boot\)/);
  assert.doesNotMatch(restartSource, /window\.location\.reload\(\)/);

  const rpcSource = sourceBetween(
    '      function callRenewSession(refreshToken) {',
    '      function applyTheme() {'
  );
  assert.match(rpcSource, /mailboxRenewSession\(refreshToken\)/);
  assert.match(rpcSource, /if \(state\.renewPromise\) return state\.renewPromise/);
  assert.match(rpcSource, /var attemptedSession = state\.session/);
  assert.match(rpcSource, /executeMailboxRpc\(payload, attemptedSession\)\.catch/);
  assert.match(rpcSource, /return executeMailboxRpc\(payload, state\.session\)/);
  assert.match(rpcSource, /handleMailboxSessionFailure\(retryError\)/);
});

test('reply actions and attachment intent have explicit visible labels', () => {
  const actionSource = sourceBetween(
    '      function buildConversationActions() {',
    '      function handleReaderScrollKeydown(event, explicitScroll) {'
  );
  for (const label of ['Відповісти', 'Відповісти всім', 'Переслати']) {
    assert.match(actionSource, new RegExp(`"${label}"`));
  }
  assert.match(actionSource, /aria-label":\s*"Відповідь на розмову"/);
  const attachmentSource = sourceBetween(
    '      function renderAttachment(attachment, message, index, total) {',
    '      function renderMessage(message) {'
  );
  assert.match(attachmentSource, /attachment\.downloadable \? "Переглянути" : "У Gmail"/);
  assert.match(attachmentSource, /text:\s*"Завантажити"/);
  const requestSource = sourceBetween(
    '      function incomingAttachmentRequest(attachment, message) {',
    '      function fetchIncomingAttachmentData(attachment, message, index) {'
  );
  assert.match(requestSource, /messageId:\s*safeId\(message && message\.id\),[\s\S]*partId:\s*safeText\(attachment && attachment\.partId\)/);
  assert.match(requestSource, /if \(attachment && attachment\.id\) request\.attachmentId = attachment\.id/);
  assert.match(uiSource, /content\.append\(buildConversationActions\(\)\)/);
});

test('attachment download preserves the stable MIME part identity through RPC translation', () => {
  const translationSource = sourceBetween(
    '      function translateRpcRequest(request) {',
    '      function executeMailboxRpc(payload, sessionToken) {'
  );
  const context = vm.createContext({
    safeText: (value, fallback = '') => value == null || value === ''
      ? String(fallback || '')
      : String(value),
    safeId: value => String(value || ''),
    safeMailboxFilter: value => String(value || ''),
    safeClientOperationId: value => String(value || ''),
    Number,
  });
  vm.runInContext(translationSource, context);
  const translated = context.translateRpcRequest({
    op: 'attachment',
    threadId: 'thread_attachment_ui_1',
    messageId: 'message_attachment_ui_1',
    partId: '1.2',
    attachmentId: 'stale_attachment_id_from_thread_read',
  });
  assert.deepEqual(JSON.parse(JSON.stringify(translated)), {
    op: 'attachment',
    connectionId: '',
    payload: {
      threadId: 'thread_attachment_ui_1',
      messageId: 'message_attachment_ui_1',
      partId: '1.2',
      attachmentId: 'stale_attachment_id_from_thread_read',
    },
  });
});

test('attachment gallery keeps duplicate names distinct and previews safely inside the Mini App', () => {
  const keySource = sourceBetween(
    '      function stableAttachmentKey(attachment, message, index) {',
    '      function normalizeComposeInlineAttachment(value) {'
  );
  const context = vm.createContext({
    safeId: value => String(value || ''),
    safeText: value => String(value || ''),
    safeClientOperationId: value => String(value || ''),
    Math,
    Number,
    String,
  });
  vm.runInContext(keySource, context);
  const duplicate = { name: 'invoice.pdf', partId: '', id: '' };
  const first = context.stableAttachmentKey(duplicate, { id: 'message-1' }, 0);
  const second = context.stableAttachmentKey(duplicate, { id: 'message-1' }, 1);
  assert.notEqual(first, second);

  const gallerySource = sourceBetween(
    '      function attachmentTypeInfo(attachment) {',
    '      function renderMessage(message) {'
  );
  assert.match(gallerySource, /aria-posinset/);
  assert.match(gallerySource, /aria-setsize/);
  assert.match(gallerySource, /data-attachment-key/);
  assert.match(gallerySource, /attachmentTypeInfo\(attachment\)[\s\S]*formatSize\(attachment\.size\)/);
  assert.match(gallerySource, /loadAttachmentThumbnail\(tile, attachment, message, index\)/);
  assert.match(gallerySource, /IntersectionObserver/);
  assert.match(uiSource, /id="attachmentPreviewDialog" role="dialog" aria-modal="true"/);

  const previewSource = sourceBetween(
    '      function setAttachmentPreviewIsolation(active) {',
    '      function base64UrlToBlob(encodedValue, mimeType, expectedSize) {'
  );
  assert.match(previewSource, /browserSupportsPdfBlobPreview/);
  assert.match(previewSource, /#page=1&view=FitH&toolbar=0&navpanes=0/);
  assert.match(previewSource, /Цей браузер не підтримує вбудований перегляд PDF/);
  assert.match(previewSource, /type\.preview === "text"[\s\S]*renderTextAttachmentPreview/);
  assert.match(previewSource, /type\.preview === "archive"[\s\S]*renderZipAttachmentPreview/);
  assert.match(previewSource, /type\.preview === "audio" \|\| type\.preview === "video"/);
  assert.match(previewSource, /attachmentPreviewLayer\.hidden = false/);
  assert.doesNotMatch(previewSource, /window\.open|tg\.openLink/);

  const zipSource = sourceBetween(
    '      function zipArchiveEntries(buffer) {',
    '      function renderTextAttachmentPreview(data) {'
  );
  const zipContext = vm.createContext({
    Uint8Array, DataView, ArrayBuffer, TextDecoder, Math, Boolean, String,
    safeText: (value, fallback = '') => value == null || value === '' ? String(fallback || '') : String(value),
  });
  vm.runInContext(zipSource, zipContext);
  const filename = new TextEncoder().encode('docs/report.pdf');
  const centralSize = 46 + filename.length;
  const zipBytes = new Uint8Array(centralSize + 22);
  const zipView = new DataView(zipBytes.buffer);
  zipView.setUint32(0, 0x02014b50, true);
  zipView.setUint32(20, 12, true);
  zipView.setUint32(24, 34, true);
  zipView.setUint16(28, filename.length, true);
  zipBytes.set(filename, 46);
  zipView.setUint32(centralSize, 0x06054b50, true);
  zipView.setUint16(centralSize + 8, 1, true);
  zipView.setUint16(centralSize + 10, 1, true);
  zipView.setUint32(centralSize + 12, centralSize, true);
  zipView.setUint32(centralSize + 16, 0, true);
  const listing = zipContext.zipArchiveEntries(zipBytes.buffer);
  assert.equal(listing.total, 1);
  assert.equal(listing.entries[0].name, 'docs/report.pdf');
  assert.equal(listing.entries[0].size, 34);

  const composePreviewSource = sourceBetween(
    '      function renderComposeAttachments() {',
    '      function validateOutgoingFile(file, index) {'
  );
  assert.match(composePreviewSource, /className:\s*"compose-attachment-preview"/);
  assert.match(composePreviewSource, /aria-label":\s*"Переглянути вкладення "/);
  assert.match(composePreviewSource, /loadComposeAttachmentThumbnail\(preview, attachment, index\)/);
  assert.match(composePreviewSource, /function loadComposeAttachmentThumbnail\(host, attachment, index\)/);
  assert.match(composePreviewSource, /attachmentTypeInfo\(attachment\)\.preview !== "image"/);
  assert.match(composePreviewSource, /sourceContent[\s\S]*fetchIncomingAttachmentData/);
  assert.match(composePreviewSource, /openComposeAttachmentPreview\(attachment, index, preview\)/);
  assert.match(composePreviewSource, /if \(attachment\.source\)[\s\S]*openSourcePreview/);
  assert.match(composePreviewSource, /if \(attachment\.dataBase64\)[\s\S]*renderAttachmentPreviewData/);
  assert.match(composePreviewSource, /if \(attachment\.partId && attachment\.messageId\)[\s\S]*openAttachmentPreview/);
  assert.doesNotMatch(composePreviewSource, /window\.open|tg\.openLink/);
});

test('compose attachment sources use the exact Drive, Box and publicHttps RPC contract without HTML bytes', () => {
  assert.match(uiSource, /id="composeSourceDeviceTab"/);
  assert.match(uiSource, /provider-mark-box[^>]*>box<\/span>/);
  assert.match(uiSource, /fill="#0f9d58"/);
  assert.match(uiSource, /provider-label">Google Drive<\/span>/);
  assert.match(uiSource, /id="composeSourceDriveTab"/);
  assert.match(uiSource, /id="composeSourceBoxTab"/);
  assert.match(uiSource, /id="composeSourcePublicTab"/);
  assert.match(uiSource, /id="composePublicLinkText"[^>]*maxlength="160"/);
  assert.match(uiSource, /id="composePublicInsertLink"[^>]*type="button">Вставити як посилання<\/button>/);
  assert.match(uiSource, /YouTube, Vimeo, Instagram, TikTok, Google, OneDrive, Dropbox, Box, iCloud, MEGA та pCloud/);
  assert.match(uiSource, /provider:\s*"publicHttps"/);
  assert.doesNotMatch(uiSource, /\b(?:prompt|confirm)\s*\(/);
  assert.doesNotMatch(uiSource, /execCommand\s*\(/);

  const translationSource = sourceBetween(
    '      function translateRpcRequest(request) {',
    '      function executeMailboxRpc(payload, sessionToken) {'
  );
  const context = vm.createContext({
    safeText: (value, fallback = '') => value == null || value === '' ? String(fallback || '') : String(value),
    safeId: value => String(value || ''),
    safeMailboxFilter: value => String(value || ''),
    safeClientOperationId: value => String(value || ''),
    safeInlineImageToken: value => String(value || ''),
    safeInlineImageMime: value => String(value || ''),
    normalizeAttachmentSource(value) {
      if (!value || !['drive', 'box', 'publicHttps'].includes(value.provider)) return null;
      return JSON.parse(JSON.stringify(value));
    },
    normalizeBoxItemId: value => /^\d{1,32}$/.test(String(value || '')) ? String(value) : '',
    state: { limits: { maxIncomingAttachmentBytes: 15 * 1024 * 1024 } },
    Math,
    Number,
    String,
  });
  vm.runInContext(translationSource, context);
  assert.deepEqual(JSON.parse(JSON.stringify(context.translateRpcRequest({
    op: 'sourceList', provider: 'drive', query: 'report', pageToken: 'next', pageSize: 12,
  }))), {
    op: 'sourceList',
    payload: { provider: 'drive', query: 'report', pageToken: 'next', pageSize: 12 },
  });
  assert.deepEqual(JSON.parse(JSON.stringify(context.translateRpcRequest({
    op: 'sourceList', provider: 'box', folderId: '12345', query: 'invoice', pageToken: 'box-next', pageSize: 8,
  }))), {
    op: 'sourceList',
    payload: { provider: 'box', query: 'invoice', pageToken: 'box-next', pageSize: 8, folderId: '12345' },
  });
  ['boxStatus', 'boxConnectStart', 'boxDisconnect'].forEach(op => {
    assert.deepEqual(JSON.parse(JSON.stringify(context.translateRpcRequest({ op, ignored: 'not-forwarded' }))), {
      op,
      payload: {},
    });
  });
  assert.deepEqual(JSON.parse(JSON.stringify(context.translateRpcRequest({
    op: 'sourceContent',
    source: { provider: 'publicHttps', url: 'https://example.com/file.pdf' },
    purpose: 'preview',
    maxBytes: 4096,
  }))), {
    op: 'sourceContent',
    payload: {
      source: { provider: 'publicHttps', url: 'https://example.com/file.pdf' },
      purpose: 'preview',
      maxBytes: 4096,
    },
  });
  const saved = context.translateRpcRequest({
    op: 'saveDraft',
    draft: {
      clientOperationId: 'draft_operation_source_123456',
      bodyHtml: '<p>Див. вкладення</p>',
      attachments: [{
        token: 'source_image_token',
        source: { provider: 'drive', fileId: 'drive-file-1', exportAs: 'pdf' },
      }],
    },
  });
  assert.deepEqual(JSON.parse(JSON.stringify(saved.payload.attachments)), [{
    token: 'source_image_token',
    source: { provider: 'drive', fileId: 'drive-file-1', exportAs: 'pdf' },
  }]);
  assert.doesNotMatch(JSON.stringify(saved.payload.attachments), /dataBase64/);

  const sourceUi = sourceBetween(
    '      function setComposeSourceIsolation(active) {',
    '      function renderComposeAttachments() {'
  );
  assert.match(sourceUi, /op:\s*"sourceList"[\s\S]*provider:\s*"drive"/);
  assert.match(sourceUi, /op:\s*"sourceList"[\s\S]*provider:\s*"box"[\s\S]*folderId:/);
  assert.match(sourceUi, /op:\s*"sourceContent"[\s\S]*purpose:\s*"preview"/);
  assert.match(sourceUi, /function insertComposeAttachmentReference\(attachment, explicitIndex\)[\s\S]*createTextNode\("\\u00a0"\)[\s\S]*insertComposeNode\(fragment, separator, false\)/);
  assert.match(sourceUi, /function insertPublicSourceLink\(\)[\s\S]*safeComposeLink\(els\.composePublicSourceUrl\.value\)/);
  assert.match(sourceUi, /anchor\.setAttribute\("target", "_blank"\)/);
  assert.match(sourceUi, /anchor\.setAttribute\("rel", "noopener noreferrer"\)/);
  assert.match(sourceUi, /insertComposeNode\(fragment, separator, false\)[\s\S]*closeComposeSourceDialog\(true\)/);
  assert.match(sourceUi, /youtube\\\.com[\s\S]*vimeo\\\.com[\s\S]*instagram\\\.com[\s\S]*tiktok\\\.com/);
  assert.match(sourceUi, /onedrive\\\.live\\\.com[\s\S]*dropbox\\\.com[\s\S]*icloud\\\.com[\s\S]*mega/);
  assert.match(sourceUi, /sourceReferenceFromMetadata[\s\S]*exportAs:\s*"pdf"/);
  assert.match(uiSource, /if \(op === "sourceMetadata"\)/);
  assert.match(uiSource, /if \(op === "sourceContent"\)/);
});

test('Box source UI normalizes a token-free DTO, navigates folders, and attaches only files', () => {
  assert.match(uiSource, /id="composeSourceBoxPanel"[^>]*role="tabpanel"/);
  assert.match(uiSource, /id="composeBoxConnect"[^>]*href="#"[^>]*target="_blank"[^>]*rel="noopener noreferrer"/);
  assert.match(uiSource, /id="composeBoxIdentity"/);
  assert.match(uiSource, /id="composeBoxCapacity"/);
  assert.match(uiSource, /id="composeBoxBreadcrumbs"[^>]*aria-label="Шлях у Box"/);
  assert.match(uiSource, /id="composeBoxSearchForm"/);
  assert.match(uiSource, /id="composeBoxLoadMore"/);
  assert.doesNotMatch(uiSource, /Box Business/i);

  const sourceNormalization = sourceBetween(
    '      function normalizeAttachmentSource(value) {',
    '      function normalizeSourceMetadata(value, fallbackSource) {'
  );
  const sourceContext = vm.createContext({
    safeText: (value, fallback = '') => value == null || value === '' ? String(fallback || '') : String(value).trim(),
    safeUrl: value => String(value || '').startsWith('https://') ? String(value) : '',
  });
  vm.runInContext(sourceNormalization, sourceContext);
  assert.deepEqual(JSON.parse(JSON.stringify(sourceContext.normalizeAttachmentSource({
    provider: 'box', id: '987654321', extra: 'not-forwarded',
  }))), { provider: 'box', fileId: '987654321' });
  assert.equal(sourceContext.normalizeAttachmentSource({ provider: 'box', fileId: '../folder' }), null);

  const adapterSource = sourceBetween(
    '      function normalizeBoxStatus(value) {',
    '      function newClientOperationId() {'
  );
  const adapterContext = vm.createContext({
    safeText: (value, fallback = '') => value == null || value === '' ? String(fallback || '') : String(value).trim(),
    safeUrl: value => String(value || '').startsWith('https://') ? String(value) : '',
    normalizeAttachmentSource(value) {
      if (!value || value.provider !== 'box' || !/^\d{1,32}$/.test(String(value.fileId || ''))) return null;
      return { provider: 'box', fileId: String(value.fileId) };
    },
    URL,
    Number,
    Math,
    Array,
  });
  vm.runInContext(adapterSource, adapterContext);
  const status = adapterContext.normalizeBoxStatus({
    connected: true,
    user: { id: 'u-1', displayName: 'Павло', email: 'pavlo@example.com', privateCredential: 'must-not-render' },
    storage: { used: 25, total: 100 },
    privateCredential: 'must-not-render',
  });
  assert.deepEqual(JSON.parse(JSON.stringify(status)), {
    loaded: true,
    status: 'connected',
    connected: true,
    account: { id: 'u-1', name: 'Павло', login: 'pavlo@example.com' },
    capacity: { usedBytes: 25, totalBytes: 100 },
  });
  assert.doesNotMatch(JSON.stringify(status), /must-not-render|privateCredential/);

  const folder = adapterContext.normalizeBoxEntry({ type: 'folder', id: '700001', name: 'Проєкт', itemCount: 3 });
  const file = adapterContext.normalizeBoxEntry({ type: 'file', id: '700002', name: 'Звіт.pdf', mimeType: 'application/pdf', size: 42 });
  assert.equal(folder.source, null, 'folders must never become attachment sources');
  assert.deepEqual(JSON.parse(JSON.stringify(file.source)), { provider: 'box', fileId: '700002' });
  assert.equal(adapterContext.normalizeBoxEntry({ type: 'web_link', id: '700003', name: 'Посилання' }), null);
  assert.equal(adapterContext.normalizeBoxEntry({ type: 'file', id: 'file-1', name: 'Некоректний' }), null);
  const listing = adapterContext.normalizeBoxSourceList({
    folderId: '700001',
    breadcrumbs: [{ id: '0', name: 'Усі файли' }, { id: '700001', name: 'Проєкт' }],
    items: [folder, file],
    nextPageToken: 'opaque-next-page',
  }, { folderId: '700001', query: '' });
  assert.equal(listing.folderId, '700001');
  assert.equal(listing.items.length, 2);
  assert.equal(listing.nextPageToken, 'opaque-next-page');

  const validState = 'A'.repeat(43);
  const safeStart = adapterContext.normalizeBoxConnectStart({
    authUrl: 'https://account.box.com/api/oauth2/authorize?response_type=code&client_id=test&scope=root_readonly&state=' + validState,
    privateCredential: 'must-not-render',
  });
  assert.match(safeStart.authorizationUrl, /^https:\/\/account\.box\.com\/api\/oauth2\/authorize/);
  assert.equal(adapterContext.normalizeBoxConnectStart({ url: 'https://evil.example/box' }).authorizationUrl, '');
  assert.equal(adapterContext.normalizeBoxConnectStart({ url: 'https://account.box.com/api/oauth2/authorize/extra?response_type=code&client_id=test&scope=root_readonly&state=' + validState }).authorizationUrl, '');
  assert.equal(adapterContext.normalizeBoxConnectStart({ url: 'https://account.box.com/api/oauth2/authorize?response_type=token&client_id=test&scope=root_readonly&state=' + validState }).authorizationUrl, '');
  assert.equal(adapterContext.normalizeBoxConnectStart({ url: 'https://account.box.com/api/oauth2/authorize?response_type=code&client_id=test&scope=root_readonly&state=short' }).authorizationUrl, '');
  assert.equal(adapterContext.normalizeBoxConnectStart({ url: 'https://account.box.com/api/oauth2/authorize?response_type=code&client_id=test&scope=root_readonly&state=' + validState + '#fragment' }).authorizationUrl, '');

  const entrySource = sourceBetween(
    '      function renderBoxSourceEntry(entry) {',
    '      function renderBoxSourceResults() {'
  );
  assert.match(entrySource, /entry\.type !== "folder"[\s\S]*renderDriveSourceItem\(metadata\)/);
  assert.match(entrySource, /className:\s*"compose-source-item compose-box-folder"[\s\S]*text:\s*"Відкрити"/);
  assert.doesNotMatch(entrySource, /text:\s*"Додати/);

  const listSource = sourceBetween(
    '      async function loadBoxSources(options) {',
    '      async function disconnectBox() {'
  );
  assert.match(listSource, /folderId:\s*folderId[\s\S]*query:\s*query[\s\S]*pageToken:\s*pageToken/);
  assert.match(listSource, /version !== state\.boxRequestVersion/);
  assert.match(listSource, /append \? state\.boxItems\.concat\(normalized\.items\) : normalized\.items/);
});

test('Box chooser uses isolated multi-account source RPCs instead of the legacy global grant', () => {
  assert.match(uiSource, /id="composeBoxAccount"[^>]*aria-label="Акаунт Box"/);
  assert.match(uiSource, /Акаунт Box обирається незалежно від Gmail-відправника та Google Drive/);
  const loadSource = sourceBetween(
    '      async function loadBoxStatus(options) {',
    '      async function startBoxConnection(event) {'
  );
  const connectSource = sourceBetween(
    '      async function startBoxConnection(event) {',
    '      async function selectBoxAccount() {'
  );
  const selectSource = sourceBetween(
    '      async function selectBoxAccount() {',
    '      function renderBoxBreadcrumbs() {'
  );
  assert.match(loadSource, /rpc\(\{ op: "sourceAccounts", provider: "box" \}\)/);
  assert.match(connectSource, /op: "sourceConnectStart", provider: "box"/);
  assert.match(selectSource, /op: "sourceSelect", provider: "box", sourceConnectionId: sourceConnectionId/);
  assert.doesNotMatch(loadSource + connectSource + selectSource, /op: "(?:boxStatus|boxConnectStart)"|accessToken|refreshToken/);
});
test('Box disconnect uses a custom confirmation and revokes provider access without mail actions', () => {
  assert.match(uiSource, /id="composeBoxDisconnectDialog"[^>]*role="alertdialog"[^>]*aria-modal="true"/);
  assert.match(uiSource, /Буде відкликано лише доступ цього застосунку до Box\. Файли в Box, чернетка й пошта не видаляються\./);
  assert.doesNotMatch(uiSource, /(?:window\.)?confirm\s*\(/);

  const disconnectSource = sourceBetween(
    '      async function disconnectBox() {',
    '      function attachmentJobElapsed(job) {'
  );
  assert.match(disconnectSource, /op: "sourceDisconnect"[\s\S]*provider: "box"[\s\S]*sourceConnectionId: state\.activeBoxSourceConnectionId/);
  assert.match(disconnectSource, /state\.activeBoxSourceConnectionId = ""[\s\S]*loadBoxStatus/);
  assert.doesNotMatch(disconnectSource, /changeThreadAction|archive|trash|delete|sendDraft/);

  const boxContractSource = sourceBetween(
    '      function normalizeBoxStatus(value) {',
    '      function newClientOperationId() {'
  );
  assert.doesNotMatch(boxContractSource, /\b(?:accessToken|refreshToken|clientSecret)\b/);
  assert.match(uiSource, /\.compose-source-options\s*\{[\s\S]*grid-template-columns:\s*repeat\(4,/);
  assert.match(uiSource, /@media \(max-height: 560px\)[\s\S]*\.compose-source-options\s*\{[\s\S]*repeat\(4,/);
});

test('consecutive attachment references keep insertion order at the compose caret', () => {
  const insertReferenceSource = extractUiFunction('insertComposeAttachmentReference');
  const rendered = [];
  let caret = 0;

  function makeContainer(type) {
    return {
      type,
      children: [],
      append(...nodes) { this.children.push(...nodes); },
    };
  }

  const documentStub = {
    createElement(tagName) {
      return {
        type: 'element',
        tagName,
        textContent: '',
        attributes: {},
        setAttribute(name, value) { this.attributes[name] = value; },
      };
    },
    createTextNode(value) { return { type: 'text', textContent: String(value) }; },
    createDocumentFragment() { return makeContainer('fragment'); },
  };
  const attachments = [
    { name: 'Перший.pdf' },
    { name: 'Другий.png' },
  ];
  const context = vm.createContext({
    state: { compose: { attachments } },
    document: documentStub,
    safeText: (value, fallback = '') => value == null || value === '' ? String(fallback || '') : String(value),
    insertComposeNode(fragment, focusNode, collapseToStart) {
      const inserted = fragment.children.slice();
      rendered.splice(caret, 0, ...inserted);
      caret = rendered.indexOf(focusNode) + (collapseToStart === false ? 1 : 0);
    },
  });
  vm.runInContext(insertReferenceSource, context);

  context.insertComposeAttachmentReference(attachments[0]);
  context.insertComposeAttachmentReference(attachments[1]);

  assert.deepEqual(
    rendered.filter(node => node.type === 'element').map(node => node.textContent),
    ['📎 Вкладення 1: Перший.pdf', '📎 Вкладення 2: Другий.png']
  );
  assert.equal(
    rendered.map(node => node.textContent).join(''),
    '📎 Вкладення 1: Перший.pdf\u00a0📎 Вкладення 2: Другий.png\u00a0',
    'references must retain a visible separator'
  );
});

test('canonical compose redraw restores the exact caret before the next attachment reference', () => {
  function makeNode(nodeType, value = '') {
    const node = {
      nodeType,
      nodeValue: nodeType === 3 ? String(value) : null,
      textContent: nodeType === 3 ? String(value) : '',
      childNodes: [],
      parentNode: null,
      attributes: {},
      setAttribute(name, attributeValue) { this.attributes[name] = attributeValue; },
      append(...children) {
        children.forEach(child => {
          child.parentNode = this;
          this.childNodes.push(child);
        });
      },
      replaceChildren(...children) {
        this.childNodes.forEach(child => { child.parentNode = null; });
        this.childNodes = [];
        this.append(...children);
      },
      contains(candidate) {
        return candidate === this || this.childNodes.some(child => child.contains(candidate));
      },
    };
    return node;
  }

  function cloneTree(node) {
    const cloned = makeNode(node.nodeType, node.nodeValue || '');
    cloned.textContent = node.textContent;
    cloned.attributes = { ...node.attributes };
    cloned.append(...node.childNodes.map(cloneTree));
    return cloned;
  }

  class FakeRange {
    constructor(startContainer = null, startOffset = 0, endContainer = startContainer, endOffset = startOffset) {
      this.startContainer = startContainer;
      this.startOffset = startOffset;
      this.endContainer = endContainer;
      this.endOffset = endOffset;
    }
    get commonAncestorContainer() { return this.startContainer; }
    cloneRange() {
      return new FakeRange(this.startContainer, this.startOffset, this.endContainer, this.endOffset);
    }
    setStart(node, offset) { this.startContainer = node; this.startOffset = offset; }
    setEnd(node, offset) { this.endContainer = node; this.endOffset = offset; }
  }

  const composeBody = makeNode(1);
  const selection = {
    range: null,
    get rangeCount() { return this.range ? 1 : 0; },
    getRangeAt() { return this.range; },
    removeAllRanges() { this.range = null; },
    addRange(range) { this.range = range; },
  };
  const documentStub = {
    createElement() { return makeNode(1); },
    createTextNode(value) { return makeNode(3, value); },
    createDocumentFragment() { return makeNode(11); },
    createRange() { return new FakeRange(); },
  };
  const attachments = [{ name: 'Перший.pdf' }, { name: 'Другий.png' }];
  let context;
  context = vm.createContext({
    state: { compose: { attachments }, composeSelection: null },
    els: { composeBody },
    document: documentStub,
    window: { getSelection() { return selection; } },
    safeText: (value, fallback = '') => value == null || value === '' ? String(fallback || '') : String(value),
    insertComposeNode(fragment, focusNode, collapseToStart) {
      const range = context.composeSelectionRange();
      let insertionIndex = composeBody.childNodes.length;
      if (range && range.startContainer === composeBody) insertionIndex = range.startOffset;
      else if (range && range.startContainer && range.startContainer.parentNode === composeBody) {
        insertionIndex = composeBody.childNodes.indexOf(range.startContainer);
        if (range.startContainer.nodeType === 3 &&
            range.startOffset >= String(range.startContainer.nodeValue || '').length) insertionIndex += 1;
      }
      const inserted = fragment.childNodes.slice();
      inserted.forEach(node => { node.parentNode = composeBody; });
      composeBody.childNodes.splice(insertionIndex, 0, ...inserted);
      const focusOffset = collapseToStart === false && focusNode.nodeType === 3
        ? String(focusNode.nodeValue || '').length
        : 0;
      const nextRange = new FakeRange(focusNode, focusOffset, focusNode, focusOffset);
      selection.removeAllRanges();
      selection.addRange(nextRange);
      context.state.composeSelection = nextRange.cloneRange();
    },
    Array,
    Number,
  });
  [
    'composeSelectionRange',
    'composeNodePath',
    'composeNodeFromPath',
    'composeSelectionBookmark',
    'clearComposeSelection',
    'restoreComposeSelectionBookmark',
    'insertComposeAttachmentReference',
  ].forEach(name => vm.runInContext(extractUiFunction(name), context));

  context.insertComposeAttachmentReference(attachments[0]);
  composeBody.append(makeNode(3, ' '));
  const savedBookmark = context.composeSelectionBookmark();
  context.clearComposeSelection();
  composeBody.replaceChildren(...composeBody.childNodes
    .filter(node => !(node.nodeType === 3 && node.nodeValue === ' '))
    .map(cloneTree));
  assert.equal(context.restoreComposeSelectionBookmark(savedBookmark), true);
  context.insertComposeAttachmentReference(attachments[1]);
  assert.deepEqual(
    composeBody.childNodes.filter(node => node.nodeType === 1).map(node => node.textContent),
    ['📎 Вкладення 1: Перший.pdf', '📎 Вкладення 2: Другий.png'],
    'a canonical Gmail redraw must not move the next insertion before the prior reference'
  );
  assert.equal(
    composeBody.childNodes.map(node => node.nodeType === 3 ? node.nodeValue : node.textContent).join(''),
    '📎 Вкладення 1: Перший.pdf\u00a0📎 Вкладення 2: Другий.png\u00a0',
    'canonical readback may strip ordinary trailing spaces but must keep a readable separator'
  );

  const paragraph = makeNode(1);
  paragraph.append(makeNode(3, 'Текст перед курсором і після'));
  composeBody.replaceChildren(paragraph);
  selection.addRange(new FakeRange(paragraph.childNodes[0], 7, paragraph.childNodes[0], 7));
  const middleBookmark = context.composeSelectionBookmark();
  context.clearComposeSelection();
  composeBody.replaceChildren(cloneTree(paragraph));
  assert.equal(context.restoreComposeSelectionBookmark(middleBookmark), true);
  assert.equal(selection.range.startContainer.nodeValue, 'Текст перед курсором і після');
  assert.equal(selection.range.startOffset, 7, 'an arbitrary text caret must survive canonical redraw');

  const saveSource = sourceBetween(
    '      async function saveDraft(options) {',
    '      async function sendCompose() {'
  );
  assert.match(saveSource, /state\.compose = canonical;[\s\S]*renderCompose\(\{ preserveSelection: true \}\)/);
});

test('source previews use the dedicated bootstrap cap instead of the larger Gmail attachment cap', () => {
  assert.match(uiSource, /maxSourcePreviewBytes:\s*2 \* 1024 \* 1024/);
  const bootstrapSource = sourceBetween(
    '      function initializeFromBootstrap(data) {',
    '      function renderAccountPanel() {'
  );
  assert.match(bootstrapSource, /"maxSourcePreviewBytes"/);
  assert.match(bootstrapSource, /"maxSourceDownloadBytes"/);

  const translationSource = sourceBetween(
    '      function translateRpcRequest(request) {',
    '      function executeMailboxRpc(payload, sessionToken) {'
  );
  const context = vm.createContext({
    safeText: (value, fallback = '') => value == null || value === '' ? String(fallback || '') : String(value),
    safeId: value => String(value || ''),
    safeMailboxFilter: value => String(value || ''),
    safeClientOperationId: value => String(value || ''),
    safeInlineImageToken: value => String(value || ''),
    safeInlineImageMime: value => String(value || ''),
    normalizeAttachmentSource: value => value,
    state: { limits: {
      maxIncomingAttachmentBytes: 15 * 1024 * 1024,
      maxSourcePreviewBytes: 2 * 1024 * 1024,
      maxSourceDownloadBytes: 10 * 1024 * 1024,
    } },
    Math,
    Number,
    String,
  });
  vm.runInContext(translationSource, context);
  const preview = context.translateRpcRequest({
    op: 'sourceContent', source: { provider: 'drive', fileId: 'drive-1' },
    purpose: 'preview', maxBytes: 15 * 1024 * 1024,
  });
  const download = context.translateRpcRequest({
    op: 'sourceContent', source: { provider: 'drive', fileId: 'drive-1' },
    purpose: 'download', maxBytes: 15 * 1024 * 1024,
  });
  assert.equal(preview.payload.maxBytes, 2 * 1024 * 1024);
  assert.equal(download.payload.maxBytes, 10 * 1024 * 1024);

  const sourcePreview = sourceBetween(
    '      async function openSourcePreview(metadata, trigger) {',
    '      function renderDriveSourceItem(metadata) {'
  );
  const thumbnail = sourceBetween(
    '      function loadComposeAttachmentThumbnail(host, attachment, index) {',
    '      function openComposeAttachmentPreview(attachment, index, trigger) {'
  );
  assert.match(sourcePreview, /maxBytes:\s*state\.limits\.maxSourcePreviewBytes/);
  assert.match(thumbnail, /maxBytes:\s*state\.limits\.maxSourcePreviewBytes/);
});

test('attachment preview cleanup cannot trap PDF or image dialogs in WebViews without Blob URL revocation', () => {
  const previewCleanupSource = sourceBetween(
    '      function beginAttachmentPreviewRequest() {',
    '      function releaseAttachmentResources() {'
  );
  function closeWithUrlApi(urlApi) {
    let isolated = true;
    let cleared = false;
    let focused = false;
    const context = vm.createContext({
      state: {
        attachmentPreviewRequestId: 0,
        attachmentPreviewUrl: 'blob:preview-pdf',
        attachmentPreviewData: { name: 'report.pdf' },
        attachmentPreviewReturnFocus: { isConnected: true, focus() { focused = true; } },
      },
      els: {
        attachmentPreviewLayer: { hidden: false },
        attachmentPreviewBody: {},
        attachmentPreviewStatus: { textContent: 'Готово' },
      },
      window: { URL: urlApi },
      clear() { cleared = true; },
      setAttachmentPreviewIsolation(value) { isolated = value; },
    });
    vm.runInContext(`${previewCleanupSource}\ncloseAttachmentPreview(true);`, context);
    return { context, isolated, cleared, focused };
  }

  const missing = closeWithUrlApi({});
  assert.equal(missing.context.state.attachmentPreviewUrl, '');
  assert.equal(missing.context.state.attachmentPreviewData, null);
  assert.equal(missing.context.els.attachmentPreviewLayer.hidden, true);
  assert.equal(missing.context.els.attachmentPreviewStatus.textContent, '');
  assert.equal(missing.isolated, false);
  assert.equal(missing.cleared, true);
  assert.equal(missing.focused, true);

  const throwing = closeWithUrlApi({ revokeObjectURL() { throw new Error('WebView denied revoke'); } });
  assert.equal(throwing.context.state.attachmentPreviewUrl, '');
  assert.equal(throwing.context.els.attachmentPreviewLayer.hidden, true);
  assert.equal(throwing.isolated, false);
});

test('a stale attachment preview response cannot overwrite a newer preview after close and reopen', async () => {
  const previewLifecycleSource = sourceBetween(
    '      function beginAttachmentPreviewRequest() {',
    '      function releaseAttachmentResources() {'
  );
  const sourcePreviewSource = sourceBetween(
    '      async function openSourcePreview(metadata, trigger) {',
    '      function renderDriveSourceItem(metadata) {'
  );
  function deferred() {
    let resolve;
    const promise = new Promise(value => { resolve = value; });
    return { promise, resolve };
  }
  const first = deferred();
  const second = deferred();
  const pending = [first, second];
  const rendered = [];
  const context = vm.createContext({
    Number,
    state: {
      attachmentPreviewRequestId: 0,
      attachmentPreviewUrl: '',
      attachmentPreviewData: null,
      attachmentPreviewReturnFocus: null,
      limits: { maxSourcePreviewBytes: 2 * 1024 * 1024 },
    },
    els: {
      attachmentPreviewLayer: { hidden: true },
      attachmentPreviewDialog: { focus() {} },
      attachmentPreviewTitle: { textContent: '' },
      attachmentPreviewStatus: { textContent: '' },
      attachmentPreviewDownload: { disabled: true },
      attachmentPreviewBody: { append() {} },
    },
    document: { activeElement: null },
    window: { URL: {}, setTimeout(callback) { callback(); } },
    safeText(value, fallback = '') { return value == null || value === '' ? String(fallback || '') : String(value); },
    formatSize(value) { return String(value); },
    sourceReferenceFromMetadata(metadata) { return metadata.source; },
    rpc() { return pending.shift().promise; },
    sourcePreviewData(response) { return response; },
    renderAttachmentPreviewData(data) { rendered.push(data.name); },
    attachmentPreviewFallback() {},
    setAttachmentPreviewIsolation() {},
    clear() {},
    make() { return {}; },
  });
  vm.runInContext(`${previewLifecycleSource}\n${sourcePreviewSource}`, context);

  const firstOpen = context.openSourcePreview({ name: 'A.pdf', source: { provider: 'drive', fileId: 'a' } });
  context.closeAttachmentPreview(false);
  const secondOpen = context.openSourcePreview({ name: 'B.pdf', source: { provider: 'drive', fileId: 'b' } });

  first.resolve({ name: 'A.pdf', mimeType: 'application/pdf', size: 1, blob: {} });
  await Promise.resolve();
  await Promise.resolve();
  assert.deepEqual(rendered, [], 'the late A response must not render inside the B dialog');
  assert.equal(context.els.attachmentPreviewTitle.textContent, 'B.pdf');

  second.resolve({ name: 'B.pdf', mimeType: 'application/pdf', size: 1, blob: {} });
  await secondOpen;
  await firstOpen;
  assert.deepEqual(rendered, ['B.pdf']);
  assert.equal(context.state.attachmentPreviewData.name, 'B.pdf');
});

test('compose isolation keeps its nested attachment preview interactive', () => {
  const isolationSource = sourceBetween(
    '      function setComposeModalIsolation(active) {',
    '      function composeFocusableElements() {'
  );
  function node() {
    const attributes = new Map();
    return {
      dataset: {},
      inert: false,
      hasAttribute(name) { return attributes.has(name); },
      getAttribute(name) { return attributes.get(name) ?? null; },
      setAttribute(name, value) { attributes.set(name, String(value)); },
      removeAttribute(name) { attributes.delete(name); },
      attribute(name) { return attributes.get(name) ?? null; },
    };
  }
  const background = node();
  const composeBackdrop = node();
  const composeSheet = node();
  const attachmentPreviewLayer = node();
  const snackbar = node();
  const context = vm.createContext({
    app: { children: [background, composeBackdrop, composeSheet, attachmentPreviewLayer, snackbar] },
    els: { composeBackdrop, composeSheet, attachmentPreviewLayer, snackbar },
    Array,
  });
  vm.runInContext(isolationSource, context);
  context.setComposeModalIsolation(true);
  assert.equal(background.inert, true);
  assert.equal(background.attribute('aria-hidden'), 'true');
  assert.equal(composeSheet.inert, false);
  assert.equal(attachmentPreviewLayer.inert, false);
  assert.equal(attachmentPreviewLayer.attribute('aria-hidden'), null);
  context.setComposeModalIsolation(false);
  assert.equal(background.inert, false);
  assert.equal(background.attribute('aria-hidden'), null);
});

test('mobile reader close releases attachment blobs and both caches have hard bounds', () => {
  const closeSource = sourceBetween(
    '      function closeReader() {',
    '      function toolbarButton(iconName, label, action, options) {'
  );
  const closeState = { selectedThreadId: 'thread-with-large-blobs', thread: { id: 'thread-with-large-blobs' } };
  let releaseCount = 0;
  let selectedAtRelease = '';
  const closeContext = vm.createContext({
    app: { classList: { remove() {} } },
    state: closeState,
    window: { matchMedia: () => ({ matches: true }) },
    closeActionMenus() {},
    closeSnoozePanel() {},
    renderThreadList() {},
    releaseAttachmentResources() {
      releaseCount += 1;
      selectedAtRelease = closeState.selectedThreadId;
    },
  });
  vm.runInContext(`${closeSource}\ncloseReader();`, closeContext);
  assert.equal(releaseCount, 1);
  assert.equal(selectedAtRelease, 'thread-with-large-blobs');
  assert.equal(closeContext.state.selectedThreadId, '');
  assert.equal(closeContext.state.thread, null);

  const cacheSource = sourceBetween(
    '      function cachedAttachmentData(key) {',
    '      function fetchIncomingAttachmentData(attachment, message, index) {'
  );
  const revoked = [];
  const cacheContext = vm.createContext({
    state: { attachmentDataCache: new Map(), attachmentObjectUrls: new Set() },
    MAX_ATTACHMENT_DATA_CACHE_ENTRIES: 4,
    MAX_ATTACHMENT_OBJECT_URLS: 12,
    URL: { revokeObjectURL: url => revoked.push(url) },
  });
  vm.runInContext(cacheSource, cacheContext);
  for (let index = 0; index < 6; index += 1) cacheContext.cacheAttachmentData(`blob-${index}`, Promise.resolve(index));
  assert.deepEqual(Array.from(cacheContext.state.attachmentDataCache.keys()), ['blob-2', 'blob-3', 'blob-4', 'blob-5']);
  for (let index = 0; index < 14; index += 1) cacheContext.trackAttachmentObjectUrl(`blob:url-${index}`);
  assert.equal(cacheContext.state.attachmentObjectUrls.size, 12);
  assert.deepEqual(revoked, ['blob:url-0', 'blob:url-1']);
  assert.match(uiSource, /function closeReader\(\)[\s\S]*?releaseAttachmentResources\(\);[\s\S]*?state\.selectedThreadId = ""/);
});

test('inline CID images resolve only authenticated attachment tokens into short-lived safe image blobs', () => {
  const tokenSource = extractUiFunction('attachmentImageToken');
  const tokenContext = vm.createContext({
    safeText: value => String(value || ''),
    safeInlineImageToken: value => /^[A-Za-z0-9][A-Za-z0-9._-]{0,79}$/.test(String(value || '')) ? String(value) : '',
  });
  vm.runInContext(tokenSource, tokenContext);
  assert.equal(tokenContext.attachmentImageToken('attachment:inline_abc-123'), 'inline_abc-123');
  assert.equal(tokenContext.attachmentImageToken('blob:https://evil.example/id'), '');
  assert.equal(tokenContext.attachmentImageToken('attachment:../../secret'), '');
  assert.equal(tokenContext.attachmentImageToken('javascript:alert(1)'), '');

  const lookupSource = extractUiFunction('inlineAttachmentForToken');
  const lookupContext = vm.createContext({
    safeInlineImageToken: value => String(value || ''),
    safeInlineImageMime: value => /^(?:image\/png|image\/jpeg|image\/gif|image\/webp)$/.test(String(value || '')) ? String(value) : '',
    Array,
  });
  vm.runInContext(lookupSource, lookupContext);
  const message = { attachments: [
    { inline: true, downloadable: true, partId: '1.2', token: 'good', mimeType: 'image/png' },
    { inline: true, downloadable: true, partId: '1.3', token: 'svg', mimeType: 'image/svg+xml' },
    { inline: false, downloadable: true, partId: '1.4', token: 'regular', mimeType: 'image/png' },
  ] };
  assert.equal(lookupContext.inlineAttachmentForToken(message, 'good').attachment.partId, '1.2');
  assert.equal(lookupContext.inlineAttachmentForToken(message, 'svg'), null);
  assert.equal(lookupContext.inlineAttachmentForToken(message, 'regular'), null);

  const sandboxSource = sourceBetween(
    '      function buildSandboxedMailDocument(serverSanitizedMarkup) {',
    '      function fitSandboxedMailFrame(frame, fallbackHeight) {'
  );
  assert.match(sandboxSource, /data-attachment-token/);
  assert.match(sandboxSource, /img-src https: data: blob:/);
  assert.match(sandboxSource, /table\{max-width:100%\}/);
  assert.doesNotMatch(sandboxSource, /table\{display:block/);
  assert.doesNotMatch(sandboxSource, /th,td\{padding:/);
  assert.match(sandboxSource, /inlineAttachmentForToken\(message, token\)/);
  assert.match(sandboxSource, /fetchIncomingAttachmentData\(resolved\.attachment, message, resolved\.index\)/);
  assert.match(sandboxSource, /safeInlineImageMime\(data && data\.mimeType\) !== expectedMimeType/);
  assert.match(sandboxSource, /trackAttachmentObjectUrl\(url\)/);
  assert.match(sandboxSource, /releaseTrackedAttachmentObjectUrl\(url\)/);
  const safeUrlSource = extractUiFunction('safeUrl');
  assert.doesNotMatch(safeUrlSource, /protocol === "blob:"/);
  assert.doesNotMatch(sandboxSource, /image\.setAttribute\("src",\s*image\.getAttribute\("data-attachment-token"\)/);
});

test('reply attachments are an explicit opt-in and remain individually removable', () => {
  assert.match(uiSource, /id="replyAttachmentsOption"[^>]*hidden/);
  assert.match(uiSource, /id="includeOriginalAttachments" type="checkbox"/);
  assert.match(uiSource, /Додати вкладення з оригінального листа/);
  const composeSource = sourceBetween(
    '      async function openCompose(mode) {',
    '      function setComposeModalIsolation(active) {'
  );
  assert.match(composeSource, /composeMode === "reply" \|\| composeMode === "replyAll"[\s\S]*draft\.subject/);
  assert.match(composeSource, /function setReplyOriginalAttachments\(include\)/);
  assert.match(composeSource, /var retained = state\.compose\.attachments\.filter\(function \(attachment\) \{ return !attachment\.forward; \}\)/);
  assert.match(composeSource, /var selection = prepareForwardAttachments\(message\)/);
  assert.match(composeSource, /state\.compose\.attachments = retained\.concat\(selection\.attachments\)/);
  assert.match(composeSource, /state\.composeBusy = false;\s*renderCompose\(\);\s*showCompose\(\);/,
    'opening a reply must release the busy guard before attachment controls render');
  assert.match(uiSource, /aria-label": "Прибрати " \+ attachment\.name/);
  assert.match(uiSource, /removedForwardedAttachment[\s\S]*state\.compose\.forwardSource = null/);
});

test('the profile avatar exposes real server-backed Gmail connection and switching controls', () => {
  assert.match(uiSource, /<button class="account-avatar" id="accountAvatar"[^>]*aria-controls="accountPanel"[^>]*aria-haspopup="dialog"/);
  assert.match(uiSource, /id="mobileAccountButton"[^>]*aria-controls="accountPanel"/);
  assert.match(uiSource, /id="accountPanel" role="dialog" aria-modal="false" aria-labelledby="accountPanelTitle"/);
  assert.match(uiSource, /id="accountList" role="list" aria-label="Підключені облікові записи"/);
  const accountSource = sourceBetween(
    '      function normalizeAccounts(values, primaryValue) {',
    '      function renderNavigation() {'
  );
  assert.match(accountSource, /Array\.isArray\(values\)/);
  assert.match(accountSource,
    /id: safeId\(account\.id \|\| \(bootstrap\.session && bootstrap\.session\.connectionId\)\)/,
    'the active legacy profile must retain the server-provided opaque Gmail connection ID');
  assert.match(accountSource, /state\.accounts = normalizeAccounts\(bootstrap\.accounts, fallbackAccount\)/);
  assert.match(accountSource, /activeAccountIds[\s\S]*unifiedConnectionIds[\s\S]*filter/,
    'stale or inactive connection IDs must not inflate the visible unified account count');
  assert.match(accountSource, /renderAccountButtonAvatar\(els\.accountAvatar, state\.account\)/);
  assert.match(accountSource, /renderAccountButtonAvatar\(els\.mobileAccountButton, state\.account\)/);

  const normalizeAccountsSource = extractUiFunction('normalizeAccounts');
  const fallbackContext = vm.createContext({
    values: [],
    primary: {
      id: 'gmail-owner-live',
      email: 'tarasevych.pavlo@gmail.com',
      name: 'Павло Тарасевич',
      connected: true,
      current: true,
    },
    safeId: value => /^[A-Za-z0-9_-]{1,128}$/.test(String(value || '')) ? String(value) : '',
    safeText: (value, fallback = '') => value == null || value === '' ? String(fallback || '') : String(value),
    avatarInitial: () => 'П',
    safeUrl: () => '',
  });
  vm.runInContext(
    `${normalizeAccountsSource}\nresult = normalizeAccounts(values, primary);`,
    fallbackContext
  );
  assert.equal(fallbackContext.result.length, 1);
  assert.equal(fallbackContext.result[0].id, 'gmail-owner-live');
  assert.equal(fallbackContext.result[0].current, true);
  assert.match(accountSource, /role: "listitem"/);
  assert.match(accountSource, /"data-account-id": account\.id/);
  assert.match(accountSource, /"data-account-current": account\.current \? "true" : "false"/);
  assert.match(accountSource, /text: account\.current \? "Підключено · поточний" : "Підключено"/);
  assert.match(uiSource, /id="connectGoogleAccount"[^>]*>＋ Додати Gmail-акаунт<\/button>/);
  assert.match(uiSource, /id="continueGoogleOAuth"[^>]*target="_blank"[^>]*hidden>Продовжити в Google<\/a>/);
  assert.match(accountSource, /rpc\(\{ op: "switchAccount", payload: \{ connectionId: requested \} \}\)/);
  assert.match(accountSource, /rpc\(\{ op: "connectGoogleStart", payload: \{\} \}\)/);
  assert.match(accountSource, /parsed\.hostname === "accounts\.google\.com"/);
  const connectSource = sourceBetween(
    '      async function connectGoogleMailbox() {',
    '      function setAccountPanelOpen('
  );
  assert.match(connectSource, /continueGoogleOAuth\.href = url/);
  assert.match(connectSource, /continueGoogleOAuth\.dataset\.expiresAt/);
  assert.match(connectSource, /tg && typeof tg\.openLink === "function"/);
  assert.match(connectSource, /tg\.openLink\(url\)/);
  assert.match(connectSource, /window\.open\(url, "_blank", "noopener,noreferrer"\)/,
    'a safe browser fallback must remain when Telegram openLink is unavailable');
  assert.match(accountSource, /function refreshAccountsAfterGoogleOAuth\(\)/);
  assert.match(uiSource, /window\.addEventListener\("focus"[\s\S]*refreshAccountsAfterGoogleOAuth\(\)/);
});

test('action menus synchronize the active trigger, initial focus, keyboard movement, and Escape return', () => {
  assert.match(uiSource, /id="labelMenu" role="dialog"/);
  assert.match(uiSource, /id="focusMenu" role="dialog"/);
  assert.match(uiSource, /popupRole:\s*"dialog"/);

  const openSource = sourceBetween(
    '      function popupFocusableItems(popup) {',
    '      function toggleMoreMenu(invoker) {'
  );
  let focused = -1;
  const items = [0, 1, 2].map(index => ({
    hidden: false,
    getAttribute(name) { return name === 'role' ? 'menuitem' : null; },
    focus() { focused = index; documentStub.activeElement = items[index]; },
  }));
  const documentStub = { activeElement: null };
  const menu = {
    classList: { add(name) { this[name] = true; } },
    querySelectorAll() { return items; },
  };
  const triggerAttrs = {};
  const trigger = {
    isConnected: true,
    setAttribute(name, value) { triggerAttrs[name] = value; },
  };
  const openContext = vm.createContext({
    state: { openMenuTrigger: null },
    els: { moreMenu: menu },
    document: documentStub,
  });
  vm.runInContext(openSource, openContext);
  openContext.openActionMenu(menu, trigger);
  assert.equal(openContext.state.openMenuTrigger, trigger);
  assert.equal(triggerAttrs['aria-expanded'], 'true');
  assert.equal(focused, 0);
  openContext.handleActionMenuKeydown({
    currentTarget: menu,
    key: 'End',
    preventDefault() {},
  });
  assert.equal(focused, 2);

  const closeSource = sourceBetween(
    '      function closeActionMenus(options) {',
    '      function showSnackbar(message, options) {'
  );
  let returned = false;
  const expandedControls = [{ setAttribute(name, value) { this[name] = value; } }];
  const closeContext = vm.createContext({
    state: { openMenuTrigger: { isConnected: true, focus() { returned = true; } } },
    els: {
      moreMenu: { classList: { remove() {} } },
      labelMenu: { classList: { remove() {} } },
      focusMenu: { classList: { remove() {} } },
    },
    document: { querySelectorAll() { return expandedControls; } },
  });
  vm.runInContext(closeSource, closeContext);
  closeContext.closeActionMenus({ restoreFocus: true });
  assert.equal(returned, true);
  assert.equal(expandedControls[0]['aria-expanded'], 'false');
  assert.equal(closeContext.state.openMenuTrigger, null);
});

test('secondary text contrast and coarse-pointer targets meet the accessibility contract', () => {
  function channel(value) {
    const normalized = value / 255;
    return normalized <= 0.04045 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
  }
  function luminance(hex) {
    const value = Number.parseInt(hex.slice(1), 16);
    return 0.2126 * channel((value >> 16) & 255) +
      0.7152 * channel((value >> 8) & 255) +
      0.0722 * channel(value & 255);
  }
  function contrast(a, b) {
    const high = Math.max(luminance(a), luminance(b));
    const low = Math.min(luminance(a), luminance(b));
    return (high + 0.05) / (low + 0.05);
  }
  const lightSoft = uiSource.match(/:root\s*\{[\s\S]*?--soft-text:\s*(#[0-9a-f]{6})/i)?.[1];
  const darkSoft = uiSource.match(/html\[data-theme="dark"\]\s*\{[\s\S]*?--soft-text:\s*(#[0-9a-f]{6})/i)?.[1];
  assert.ok(lightSoft && darkSoft);
  assert.ok(contrast(lightSoft, '#ffffff') >= 4.5);
  assert.ok(contrast(lightSoft, '#f7f9fc') >= 4.5);
  assert.ok(contrast(darkSoft, '#17212b') >= 4.5);
  assert.ok(contrast(darkSoft, '#111a24') >= 4.5);
  const coarseTargets = sourceBetween(
    '    @media (pointer: coarse) {',
    '    @media (prefers-reduced-motion: reduce) {'
  );
  assert.match(coarseTargets, /min-width:\s*44px[\s\S]*height:\s*44px/);
  for (const selector of ['.action-menu-item', '.label-choice', '.nav-item', '.row-star']) {
    assert.match(coarseTargets, new RegExp(selector.replace('.', '\\.') + '[\\s\\S]*44px'));
  }
  assert.match(uiSource, /@media \(max-width: 900px\)[\s\S]*\.menu-button\s*\{[\s\S]*width:\s*44px[\s\S]*height:\s*44px/);
});

test('decorative controls do not claim unsupported actions', () => {
  for (const id of ['settingsButton', 'helpButton', 'composeMoreButton', 'sendOptionsButton']) {
    assert.doesNotMatch(uiSource, new RegExp(`id="${id}"`));
  }
  for (const fakeMessage of [
    'Налаштування синхронізуються з Gmail і ботом.',
    'Усі зміни одразу зберігаються в Gmail.',
    'Лист буде надіслано одразу після натискання',
    'Копія й прихована копія доступні в полі одержувача.',
  ]) {
    assert.doesNotMatch(uiSource, new RegExp(fakeMessage.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
  const labelsHeading = sourceBetween(
    '          <span id="labelsHeading">Мітки</span>',
    '        <nav id="labelNav"'
  );
  assert.doesNotMatch(labelsHeading, /<svg|<button/);
});

test('bot-managed Snooze is visible, time-bounded, and sends an integer epoch payload', () => {
  assert.match(uiSource, /id="snoozePanel" role="dialog" aria-modal="true" aria-labelledby="snoozeTitle"/);
  assert.match(uiSource, /Керується ботом:[\s\S]*Це не нативне відкладення Gmail/);
  for (const id of ['snoozeLaterToday', 'snoozeTomorrowMorning', 'snoozeNextMonday', 'snoozeCustomDate']) {
    assert.match(uiSource, new RegExp(`id="${id}"`));
  }

  const toolbarSource = sourceBetween(
    '      function buildThreadToolbar() {',
    '      function threadStateLabels() {'
  );
  assert.match(toolbarSource, /toolbarButton\("snooze", "Відкласти"[\s\S]*openSnoozePanel/);
  const mobileSource = sourceBetween(
    '      function buildMobileActionBar() {',
    '      function renderThread() {'
  );
  assert.match(mobileSource, /\["snooze", "Відкласти"[\s\S]*openSnoozePanel/);
  const moreSource = sourceBetween(
    '      function toggleMoreMenu(invoker) {',
    '      function toggleLabelMenu(invoker) {'
  );
  assert.match(moreSource, /icon: "snooze", label: "Відкласти"[\s\S]*mailAction: "snooze"/);

  const translateSource = sourceBetween(
    '      function translateRpcRequest(request) {',
    '      function executeMailboxRpc(payload, sessionToken) {'
  );
  assert.match(translateSource, /translatedAction === "snooze" && Number\.isSafeInteger\(snoozeUntil\)[\s\S]*actionPayload\.snoozeUntil = snoozeUntil/);
  const scheduleSource = sourceBetween(
    '      function formatSnoozeDateTime(value) {',
    '      function applyActionState(action, threadId, data, connectionId) {'
  );
  assert.match(scheduleSource, /Number\.isSafeInteger\(snoozeUntil\)/);
  assert.match(scheduleSource, /snoozeUntil < now \+ 60 \* 1000/);
  assert.match(scheduleSource, /snoozeUntil > now \+ 365 \* 24 \* 60 \* 60 \* 1000/);
  assert.match(scheduleSource, /changeThreadAction\("snooze", "", \{[\s\S]*payload: \{ snoozeUntil: snoozeUntil \}/);
  assert.match(uiSource, /if \(action === "snooze"\) return true/);
  assert.match(uiSource, /successMessage: "Лист відкладено\. Бот поверне його " \+ returnLabel/);
});

test('Snoozed exposes the Inbox repair action and surfaces durable repair count', () => {
  assert.match(uiSource, /id="snoozeRepairNotice" role="status" hidden/);
  assert.match(uiSource, /state\.capabilities = bootstrap\.capabilities/);

  const notice = {
    hidden: true,
    children: [],
    append(...items) { this.children.push(...items); }
  };
  const sandbox = {
    Number,
    state: {
      currentFolderId: 'SNOOZED',
      currentLabelId: '',
      capabilities: {
        snooze: { repair: { requiredCount: 2, description: 'Безпечне відновлення ботом.' } }
      }
    },
    els: { snoozeRepairNotice: notice },
    safeText: value => String(value || ''),
    clear: node => { node.children = []; },
    svgIcon: name => ({ icon: name }),
    make: (tag, options) => ({ tag, text: String(options && options.text || '') })
  };
  const context = vm.createContext(sandbox);
  vm.runInContext([
    extractUiFunction('mailboxMoveActionsForView'),
    extractUiFunction('snoozeRepairInfo'),
    extractUiFunction('renderSnoozeRepairNotice')
  ].join('\n\n'), context);

  const actions = Array.from(context.mailboxMoveActionsForView(), item => item.action);
  assert.equal(actions[0], 'inbox');
  assert.ok(actions.includes('trash'));
  context.renderSnoozeRepairNotice();
  assert.equal(notice.hidden, false);
  assert.match(notice.children.map(item => item.text || '').join(' '), /2 відкладених листів потребують відновлення/);
  assert.match(notice.children.map(item => item.text || '').join(' '), /До Вхідних/);
});

test('compose uses a safe rich-text editor and persists both HTML and plain-text fallback', () => {
  assert.match(uiSource, /id="composeBody" contenteditable="true" role="textbox" aria-multiline="true"/);
  for (const format of [
    'bold', 'italic', 'underline', 'strike', 'unorderedList', 'orderedList', 'link',
    'alignLeft', 'alignCenter', 'alignRight', 'alignJustify', 'indent', 'outdent',
    'blockquote', 'horizontalRule', 'table', 'image', 'undo', 'redo', 'clearFormatting',
  ]) {
    assert.match(uiSource, new RegExp(`data-format="${format}"`));
  }
  for (const id of ['composeParagraphStyle', 'composeFontFamily', 'composeFontSize', 'composeTextColor', 'composeBackgroundColor']) {
    assert.match(uiSource, new RegExp(`id="${id}"`));
  }
  assert.match(uiSource, /id="composeLinkForm" hidden/);

  const editorSource = sourceBetween(
    '      function safeComposeLink(value) {',
    '      function renderCompose(options) {'
  );
  assert.match(editorSource, /url\.protocol !== "https:" && url\.protocol !== "mailto:"/);
  assert.match(editorSource, /function sanitizeComposeStyle\(value, tagName\)/);
  assert.match(editorSource, /var allowed = \{[\s\S]*H1:\s*"h1"/);
  assert.match(editorSource, /STRONG:\s*"strong"/);
  assert.match(editorSource, /SPAN:\s*"span"/);
  assert.match(editorSource, /TABLE:\s*"table"/);
  assert.match(editorSource, /A:\s*"a"/);
  assert.match(editorSource, /font-family[\s\S]*font-size[\s\S]*background-color[\s\S]*text-align[\s\S]*margin-left/);
  assert.match(editorSource, /var sanitized = sanitizeComposeHtml\(bodyHtml\)/);
  assert.doesNotMatch(editorSource, /execCommand|window\.prompt|\.innerHTML\s*=/);
  assert.doesNotMatch(uiSource, /\b(?:localStorage|sessionStorage)\b/i);

  const editorEventsSource = sourceBetween(
    '      function bindEvents() {',
    '      async function boot() {'
  );
  assert.match(editorEventsSource, /event\.clipboardData \|\| window\.clipboardData/);
  assert.match(editorEventsSource, /insertPlainTextIntoCompose/);

  const composeDataSource = sourceBetween(
    '      function blankCompose(mode) {',
    '      function fallbackReplyPreset(lastMessage) {'
  ) + sourceBetween(
    '      function syncComposeFromFields(options) {',
    '      function openExistingDraft(value) {'
  );
  assert.match(composeDataSource, /bodyHtml: sanitizeComposeHtml\(draft\.bodyHtml\)/);
  assert.match(composeDataSource, /state\.compose\.body = composeEditorText\(\)/);
  assert.match(composeDataSource, /state\.compose\.bodyHtml = composeEditorHtml\(\)/);
  assert.match(composeDataSource, /bodyText: draft\.body/);
  assert.match(composeDataSource, /bodyHtml: draft\.bodyHtml/);
  assert.match(uiSource, /bodyHtml: draft\.bodyHtml == null \? "" : String\(draft\.bodyHtml\)/);
});

test('inline compose images use safe local tokens and keep binary data out of HTML and regular attachments', () => {
  assert.match(uiSource, /id="inlineImageInput" type="file" multiple accept="image\/png,image\/jpeg,image\/gif,image\/webp"/);
  const editorSource = sourceBetween(
    '      function safeComposeLink(value) {',
    '      function renderCompose(options) {'
  );
  assert.match(editorSource, /IMG:\s*"img"/);
  assert.match(editorSource, /cleanTag === "img"[\s\S]*safeInlineImageToken[\s\S]*setAttribute\("src", inlineImageSource\(inlineToken\)\)/);
  assert.match(editorSource, /function insertComposeInlineImage\(attachment\)[\s\S]*data-inline-token[\s\S]*syncComposeFromFields\(\)/);
  assert.match(editorSource, /format === "image"[\s\S]*inlineImageInput\.click\(\)/);
  assert.doesNotMatch(editorSource, /clean\.setAttribute\("src",\s*node\.getAttribute\("src"\)\)/);

  const fileSource = sourceBetween(
    '      function fileToBase64(file, options) {',
    '      function bindEvents() {'
  );
  const inlineQueueSource = sourceBetween(
    '      function addInlineImageFiles(files) {',
    '      function addOutgoingFiles(files) {'
  );
  assert.match(fileSource, /function addInlineImageFile\(file\)/);
  assert.match(inlineQueueSource, /safeInlineImageMime\(info\.mimeType\)/);
  assert.match(fileSource, /token:\s*opts\.intent === "inline" \? newClientOperationId\(\) : ""/);
  assert.match(uiSource, /state\.compose\.inlineAttachments = inlineValues\.concat\(\[attachment\]\)/);
  assert.match(uiSource, /function finalizeComposeInlineAttachmentJob\(job\)[\s\S]*insertComposeInlineImage\(attachment\)/);
  assert.match(inlineQueueSource, /intent:\s*"inline"[\s\S]*accepted\.forEach[\s\S]*startComposeAttachmentJob\(job, false\)/);
  assert.doesNotMatch(inlineQueueSource, /\bawait\b|state\.composeBusy\s*=/);
  assert.match(uiSource, /inlineImageInput\.addEventListener\("change"[\s\S]*addInlineImageFiles\(event\.target\.files\)/);

  const startedInline = [];
  let inlineId = 0;
  const inlineState = {
    composeBusy: false,
    compose: { attachments: [], inlineAttachments: [] },
    composeAttachmentJobs: new Map(),
    limits: { maxOutgoingAttachments: 20, maxOutgoingAttachmentsTotalBytes: 4096 },
  };
  const inlineContext = vm.createContext({
    state: inlineState,
    els: { inlineImageInput: { value: 'chosen' } },
    composeAttachmentsLocked: () => false,
    composeAttachmentJobs: () => Array.from(inlineState.composeAttachmentJobs.values()),
    composeSelectionRange: () => ({ cloneRange() { return this; } }),
    newClientOperationId: () => `inline-group-${++inlineId}`,
    validateOutgoingFile: file => ({ name: file.name, size: file.size, mimeType: file.type }),
    safeInlineImageMime: value => /^image\/(png|jpeg)$/.test(value) ? value : '',
    createComposeAttachmentJob(file, info, options) {
      return { id: `inline-${++inlineId}`, file, ...info, intent: options.intent, cancelled: false };
    },
    startComposeAttachmentJob(job) { startedInline.push(job.file.name); },
    renderComposeAttachments() {},
    updateComposeLifecycleControls() {},
    showSnackbar() {},
    safeText: (value, fallback = '') => value == null || value === '' ? String(fallback || '') : String(value),
    formatSize: value => `${value} B`,
    Array,
    Map,
    Number,
  });
  vm.runInContext(extractUiFunction('addInlineImageFiles'), inlineContext);
  const queuedInline = inlineContext.addInlineImageFiles([
    { name: 'first.png', size: 12, type: 'image/png' },
    { name: 'second.jpg', size: 14, type: 'image/jpeg' },
  ]);
  assert.deepEqual(startedInline, ['first.png', 'second.jpg']);
  assert.equal(queuedInline.length, 2);
  assert.equal(inlineState.composeBusy, false);

  const payloadSource = sourceBetween(
    '      function composePayload() {',
    '      function hasDraftContent() {'
  );
  assert.match(payloadSource, /newInlineAttachments[\s\S]*!attachment\.existing/);
  assert.match(payloadSource, /existingInlineAttachments[\s\S]*attachment\.existing/);
  assert.match(payloadSource, /inlineAttachments:\s*newInlineAttachments\.map/);
  assert.match(payloadSource, /existingInlineAttachments:\s*existingInlineAttachments\.map/);

  const translationSource = sourceBetween(
    '      function translateRpcRequest(request) {',
    '      function executeMailboxRpc(payload, sessionToken) {'
  );
  const context = vm.createContext({
    safeText: (value, fallback = '') => value == null || value === '' ? String(fallback || '') : String(value).trim(),
    safeId: value => String(value || ''),
    safeClientOperationId: value => /^[A-Za-z0-9_-]{16,128}$/.test(String(value || '')) ? String(value) : '',
    safeInlineImageToken: value => /^[A-Za-z0-9][A-Za-z0-9._-]{0,79}$/.test(String(value || '')) ? String(value) : '',
    safeInlineImageMime: value => /^(?:image\/png|image\/jpeg|image\/gif|image\/webp)$/.test(String(value || '')) ? String(value) : '',
    normalizeAttachmentSource: value => value && value.provider ? value : null,
    safeMailboxFilter: value => String(value || ''),
    Number,
  });
  vm.runInContext(translationSource, context);
  const token = 'inline_image_token_1234567890';
  const result = context.translateRpcRequest({
    op: 'saveDraft',
    draft: {
      clientOperationId: 'draft_operation_1234567890',
      bodyHtml: `<p>До фото</p><img src="attachment:${token}" alt="Фото">`,
      attachments: [{ name: 'document.pdf', mimeType: 'application/pdf', dataBase64: 'REGULAR_BYTES' }],
      inlineAttachments: [{ token, name: 'photo.webp', mimeType: 'image/webp', dataBase64: 'INLINE_BYTES' }],
    },
  });
  assert.equal(result.payload.bodyHtml, `<p>До фото</p><img src="attachment:${token}" alt="Фото">`);
  assert.equal(result.payload.attachments[0].dataBase64, 'REGULAR_BYTES');
  assert.equal(result.payload.inlineAttachments[0].token, token);
  assert.equal(result.payload.inlineAttachments[0].dataBase64, 'INLINE_BYTES');
  assert.doesNotMatch(result.payload.bodyHtml, /INLINE_BYTES|data:image/i);
  assert.equal(result.payload.attachments.some(item => item.name === 'photo.webp'), false);

  const existing = context.translateRpcRequest({
    op: 'saveDraft',
    draft: {
      id: 'draft-1',
      clientOperationId: 'draft_operation_1234567890',
      bodyHtml: '<img src="attachment:inline_readback.token">',
      inlineAttachments: [],
      existingInlineAttachments: [{
        messageId: 'message-1', partId: '2.1', attachmentId: 'attachment-1', token: 'inline_readback.token',
      }],
    },
  });
  assert.deepEqual(JSON.parse(JSON.stringify(existing.payload.existingInlineAttachments)), [{
    messageId: 'message-1', partId: '2.1', attachmentId: 'attachment-1', token: 'inline_readback.token',
  }]);
  assert.equal(existing.payload.inlineAttachments.length, 0);
});

test('compose autosave is serialized, revision-aware, and lifecycle exits are explicitly best-effort', () => {
  const lifecycleSource = sourceBetween(
    '      function clearComposeAutosaveTimer() {',
    '      function composeErrorCode(error) {'
  );
  assert.match(lifecycleSource, /function scheduleComposeAutosave\(delay\)[\s\S]*setTimeout[\s\S]*saveDraft\(\{ quiet: true, background: true \}\)/);
  assert.match(lifecycleSource, /function flushComposeAutosave\(reason\)[\s\S]*return saveDraft\(\{ quiet: true, background: true, reason:/);
  assert.match(lifecycleSource, /function bestEffortLifecycleAutosave\(reason\)[\s\S]*Unload cannot guarantee delivery/);
  assert.match(lifecycleSource, /enableClosingConfirmation/);
  assert.match(lifecycleSource, /disableClosingConfirmation/);
  assert.match(lifecycleSource, /tg\.BackButton\.show/);
  assert.match(lifecycleSource, /tg\.BackButton\.hide/);

  const saveSource = sourceBetween(
    '      async function saveDraft(options) {',
    '      async function sendCompose() {'
  );
  assert.match(saveSource, /if \(state\.composeSavePromise\)[\s\S]*await state\.composeSavePromise/);
  assert.match(saveSource, /snapshot = \{[\s\S]*revision:[\s\S]*fingerprint:[\s\S]*operationId:[\s\S]*payload:/);
  assert.match(saveSource, /composeAtStart\.pendingSaveSnapshot = snapshot/);
  assert.match(saveSource, /currentRevision === snapshot\.revision[\s\S]*state\.compose = canonical/);
  assert.match(saveSource, /else \{[\s\S]*composeAtStart\.id = canonical\.id[\s\S]*composeAtStart\.savedRevision = snapshot\.revision[\s\S]*updateComposeDirty\(\)/);
  assert.match(saveSource, /if \(state\.compose\.dirty\) state\.composeSaveQueued = true/);
  assert.match(saveSource, /state\.composeSavePromise = work/);

  const eventSource = sourceBetween(
    '      function bindEvents() {',
    '      async function boot() {'
  );
  assert.match(eventSource, /visibilitychange[\s\S]*bestEffortLifecycleAutosave\("visibility"\)/);
  assert.match(eventSource, /pagehide[\s\S]*bestEffortLifecycleAutosave\("pagehide"\)/);
  assert.match(eventSource, /beforeunload[\s\S]*bestEffortLifecycleAutosave\("beforeunload"\)[\s\S]*event\.returnValue = ""/);
  assert.match(eventSource, /beforeunload[\s\S]*composeAttachmentJobs\(\)\.length[\s\S]*bestEffortLifecycleAutosave\("beforeunload"\)/);
  assert.match(eventSource, /tg\.BackButton\.onClick[\s\S]*requestCloseCompose\(\)/);
});

test('draft and send RPCs carry separate validated idempotency keys', () => {
  const translationSource = sourceBetween(
    '      function translateRpcRequest(request) {',
    '      function executeMailboxRpc(payload, sessionToken) {'
  );
  const context = vm.createContext({
    safeText: (value, fallback = '') => value == null || value === '' ? String(fallback || '') : String(value).trim(),
    safeId: value => String(value || ''),
    safeClientOperationId: value => /^[A-Za-z0-9_-]{16,128}$/.test(String(value || '')) ? String(value) : '',
    safeInlineImageToken: value => String(value || ''),
    normalizeAttachmentSource: value => value && value.provider ? value : null,
    safeMailboxFilter: value => String(value || ''),
    Number,
  });
  vm.runInContext(translationSource, context);

  const draftOperationId = 'draft_operation_1234567890';
  const sendOperationId = 'send_operation_12345678901';
  const save = context.translateRpcRequest({
    op: 'saveDraft',
    draft: { clientOperationId: draftOperationId, to: 'owner@example.com', attachments: [] },
  });
  const send = context.translateRpcRequest({
    op: 'sendDraft', draftId: 'draft123', clientOperationId: sendOperationId,
  });
  const ack = context.translateRpcRequest({
    op: 'ackOperation', clientOperationId: sendOperationId, kind: 'send',
  });
  assert.equal(save.payload.clientOperationId, draftOperationId);
  assert.equal(send.payload.clientOperationId, sendOperationId);
  assert.equal(ack.payload.clientOperationId, sendOperationId);
  assert.equal(ack.payload.kind, 'send');
  assert.notEqual(save.payload.clientOperationId, send.payload.clientOperationId);
  assert.equal(context.translateRpcRequest({
    op: 'sendDraft', draftId: 'draft123', clientOperationId: 'too-short',
  }).payload.clientOperationId, '');
});

test('equal-size replacement attachments stay distinguishable without hashing their bytes on every keystroke', () => {
  const fingerprintSource = sourceBetween(
    '      function composeFingerprint(draftValue) {',
    '      function setComposeBaseline(draft) {'
  );
  const context = vm.createContext({
    safeId: value => String(value || ''),
    safeText: value => String(value || ''),
    safeClientOperationId: value => /^[A-Za-z0-9_-]{16,128}$/.test(String(value || '')) ? String(value) : '',
    safeInlineImageToken: value => String(value || ''),
    normalizeAttachmentSource: value => value && value.provider ? value : null,
    normalizeComposeFrom: value => String(value || '').toLowerCase(),
    JSON,
    Number,
    Boolean,
    String,
  });
  vm.runInContext(fingerprintSource, context);
  const base = {
    id: 'draft-1', mode: 'draft', threadId: 'thread-1', replyToMessageId: 'message-1',
    from: 'owner@example.com', to: 'target@example.com', subject: 'Subject', body: 'Body', bodyHtml: '',
    attachments: [{
      name: 'same.bin', mimeType: 'application/octet-stream', size: 4, dataBase64: 'QUFBQQ==',
      clientAttachmentKey: 'attachment_key_1234567890',
    }],
  };
  const replacement = JSON.parse(JSON.stringify(base));
  replacement.attachments[0].dataBase64 = 'QkJCQg==';
  replacement.attachments[0].clientAttachmentKey = 'attachment_key_0987654321';
  assert.notEqual(context.composeFingerprint(base), context.composeFingerprint(replacement));
  assert.match(fingerprintSource, /clientAttachmentKey/);
  assert.doesNotMatch(fingerprintSource, /subtle\.digest|SHA-|dataBase64\s*\)/);
});

test('canonical draft readback preserves concurrent regular attachment add remove and reorder intent', () => {
  const mergeSource = sourceBetween(
    '      function composeRegularAttachmentIdentity(attachment) {',
    '      function mergeCanonicalInlineAttachments(canonicalValues, localValues, keepLocalOrder) {'
  );
  const context = vm.createContext({
    safeId: value => String(value || ''),
    safeText: (value, fallback = '') => value == null || value === '' ? String(fallback || '') : String(value),
    safeClientOperationId: value => /^[A-Za-z0-9_-]{16,128}$/.test(String(value || '')) ? String(value) : '',
    normalizeAttachment: value => ({
      ...value,
      id: String(value && (value.attachmentId || value.id) || ''),
      clientAttachmentKey: String(value && value.clientAttachmentKey || ''),
    }),
  });
  vm.runInContext(mergeSource, context);

  const a = { clientAttachmentKey: 'attachment_key_A_123456789', name: 'a.pdf', source: { provider: 'drive', fileId: '1' } };
  const b = { existing: true, messageId: 'old-message', partId: '2', id: 'old-b', name: 'b.pdf' };
  const c = { clientAttachmentKey: 'attachment_key_C_123456789', name: 'c.pdf', dataBase64: 'Qw==' };
  const snapshotKeys = context.composeRegularAttachmentSnapshot([a, b, c]);
  const canonical = [
    { existing: true, messageId: 'saved-message', partId: '1', attachmentId: 'saved-a', name: 'a.pdf' },
    { existing: true, messageId: 'saved-message', partId: '2', attachmentId: 'saved-b', name: 'b.pdf' },
    { existing: true, messageId: 'saved-message', partId: '3', attachmentId: 'saved-c', name: 'c.pdf' },
  ];
  const d = { clientAttachmentKey: 'attachment_key_D_123456789', name: 'd.pdf', source: { provider: 'box', fileId: '700004' } };
  const merged = context.mergeCanonicalRegularAttachments(canonical, [c, d, b], snapshotKeys);

  assert.deepEqual(merged.map(item => item.id || item.name), ['saved-c', 'd.pdf', 'saved-b']);
  assert.equal(merged[0].clientAttachmentKey, c.clientAttachmentKey);
  assert.equal(merged[0].partId, '3');
  assert.deepEqual(JSON.parse(JSON.stringify(merged[1].source)), d.source);
  assert.equal(merged[2].partId, '2');
  assert.equal(merged.some(item => item.id === 'saved-a'), false);
  assert.throws(
    () => context.mergeCanonicalRegularAttachments(canonical.slice(0, 2), [c, b], snapshotKeys),
    /неповний набір вкладень/
  );
  assert.throws(
    () => context.composeRegularAttachmentSnapshot([a, { ...a }]),
    /не вдалося однозначно/i
  );

  const saveSource = sourceBetween(
    '      async function saveDraft(options) {',
    '      async function sendCompose() {'
  );
  assert.match(saveSource, /attachmentKeys:\s*composeRegularAttachmentSnapshot\(composeAtStart\.attachments\)/);
  assert.match(saveSource, /mergeCanonicalRegularAttachments\([\s\S]*snapshot\.attachmentKeys/);
  assert.match(saveSource, /if \(!composeAtStart\.attachments\.some\(function \(attachment\) \{ return attachment\.forward; \}\)\)[\s\S]*forwardSource = null/);
});

test('pending draft save retries the identical operation and baselines only after canonical Gmail readback', async () => {
  const operationSource = sourceBetween(
    '      async function saveDraft(options) {',
    '      function setComposeBusy(busy) {'
  );
  const requests = [];
  let attempt = 0;
  const state = {
    composeBusy: false,
    composeSaveInFlight: false,
    composeSavePromise: null,
    composeSaveQueued: false,
    composeAutosaveTimer: 0,
    composeMinimized: false,
    composeCloseDialogOpen: false,
    compose: {
      id: '', dirty: true, pendingKind: '', closeAfterSave: false,
      connectionId: 'gmail-unit-personal',
      draftOperationId: '', sendOperationId: '', attachments: [],
      pendingSaveSnapshot: null, revision: 1, savedRevision: 0, baselineFingerprint: 'baseline',
    },
  };
  const context = vm.createContext({
    state,
    els: { composeTo: { focus() {} }, composeBody: { focus() {} } },
    composePendingKind: () => String(state.compose && state.compose.pendingKind || ''),
    syncComposeFromFields() {},
    clearComposeAutosaveTimer() {},
    hasDraftContent: () => true,
    composeFingerprint: draft => JSON.stringify({ id: draft.id || '', body: draft.body || '' }),
    safeClientOperationId: value => /^[A-Za-z0-9_-]{16,128}$/.test(String(value || '')) ? String(value) : '',
    safeId: value => String(value || ''),
    newClientOperationId: () => 'draft_operation_1234567890',
    setComposeBusy() {},
    composePayload: () => ({ clientOperationId: state.compose.draftOperationId, subject: 'Subject' }),
    rpc: async request => {
      requests.push(JSON.parse(JSON.stringify(request)));
      attempt += 1;
      if (attempt === 1) {
        const error = new Error('pending');
        error.code = 'DRAFT_PENDING';
        throw error;
      }
      return { draft: { id: 'draft-1' } };
    },
    normalizeDraft: () => ({
      id: 'draft-1', dirty: false, pendingKind: '', closeAfterSave: false,
      draftOperationId: '', sendOperationId: '', attachments: [],
      pendingSaveSnapshot: null, revision: 0, savedRevision: 0, baselineFingerprint: 'canonical',
    }),
    composeRegularAttachmentSnapshot: values => (values || []).map((value, index) => String(index)),
    mergeCanonicalRegularAttachments: canonical => canonical || [],
    mergeCanonicalInlineAttachments: canonical => canonical || [],
    renderCompose() {},
    acknowledgeComposeOperation() {},
    showSnackbar() {},
    safeText: (value, fallback = '') => value == null || value === '' ? String(fallback || '') : String(value),
    composeOperationIsPending: (error, kind) => error.code === (kind === 'send' ? 'SEND_PENDING' : 'DRAFT_PENDING'),
    pendingComposeMessage: () => 'pending',
    updateComposeDirty() { state.compose.dirty = true; },
    renderReplyAttachmentsOption() {},
    renderComposeAttachments() {},
    updateComposeLifecycleControls() {},
    scheduleComposeAutosave() {},
    minimizeCompose() {},
    finishCloseCompose() {},
    haptic() {},
    loadThreads() {},
  });
  vm.runInContext(operationSource, context);

  assert.equal(await context.saveDraft(), false);
  assert.equal(state.compose.pendingKind, 'draft');
  assert.equal(state.compose.dirty, true, 'pending must not establish a new baseline');
  assert.equal(await context.saveDraft(), true);
  assert.equal(requests.length, 2);
  assert.equal(requests[0].draft.clientOperationId, requests[1].draft.clientOperationId);
  assert.equal(requests[0].draft.clientOperationId, 'draft_operation_1234567890');
  assert.equal(state.compose.id, 'draft-1');
  assert.equal(state.compose.draftOperationId, '');
  assert.equal(state.compose.pendingKind, '');
});

test('only explicit pending or an uncoded lost response keeps an active compose operation locked', () => {
  const helperSource = sourceBetween(
    '      function composeErrorCode(error) {',
    '      function pendingComposeMessage(kind) {'
  );
  const context = vm.createContext({
    safeText: value => String(value || ''),
  });
  vm.runInContext(helperSource, context);
  assert.equal(context.composeOperationIsPending({ code: 'DRAFT_PENDING' }, 'draft'), true);
  assert.equal(context.composeOperationIsPending({ code: 'SEND_PENDING' }, 'send'), true);
  assert.equal(context.composeOperationIsPending(new Error('transport'), 'send'), true);
  assert.equal(context.composeOperationIsPending({ code: 'GMAIL_ERROR' }, 'draft'), false);
  assert.equal(context.composeOperationIsPending({ code: 'REQUEST_FAILED' }, 'send'), false);
  assert.equal(context.composeOperationIsPending({ code: 'INVALID_RECIPIENT' }, 'send'), false);
  assert.equal(context.composeOperationIsPending({ code: 'OPERATION_CONFLICT' }, 'draft'), false);
  assert.equal(context.composeOperationIsPending({ code: 'STORAGE_FULL' }, 'draft'), false);
});

test('confirmed compose operations are acknowledged only as best-effort cleanup after local success', async () => {
  const acknowledgementSource = sourceBetween(
    '      function acknowledgeComposeOperation(kind, operationId, connectionId) {',
    '      function pendingComposeMessage(kind) {'
  );
  const requests = [];
  const context = vm.createContext({
    safeClientOperationId: value => /^[A-Za-z0-9_-]{16,128}$/.test(String(value || '')) ? String(value) : '',
    safeId: value => String(value || ''),
    state: { compose: { connectionId: 'gmail-unit-personal' } },
    rpc: request => {
      requests.push(request);
      return Promise.reject(new Error('ack transport failure'));
    },
    Promise,
  });
  vm.runInContext(acknowledgementSource, context);
  assert.doesNotThrow(() => context.acknowledgeComposeOperation('draft', 'draft_operation_1234567890', 'gmail-unit-personal'));
  assert.doesNotThrow(() => context.acknowledgeComposeOperation('other', 'draft_operation_1234567890'));
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(requests.length, 1);
  assert.equal(requests[0].op, 'ackOperation');
  assert.equal(requests[0].kind, 'draft');
  assert.equal(requests[0].connectionId, 'gmail-unit-personal');

  const operationSource = sourceBetween(
    '      async function saveDraft(options) {',
    '      function setComposeBusy(busy) {'
  );
  const canonicalDraftIndex = operationSource.indexOf('var canonical = normalizeDraft(data.draft, "draft")');
  const draftAcknowledgementIndex = operationSource.indexOf('acknowledgeComposeOperation("draft", completedDraftOperationId, composeAtStart.connectionId)');
  assert.notEqual(canonicalDraftIndex, -1);
  assert.notEqual(draftAcknowledgementIndex, -1);
  assert.ok(
    canonicalDraftIndex < draftAcknowledgementIndex,
    'draft success must be adopted before acknowledgement'
  );
  assert.ok(
    operationSource.indexOf('finishCloseCompose();', operationSource.indexOf('async function sendCompose')) <
      operationSource.indexOf('acknowledgeComposeOperation("send", completedSendOperationId, completedSendConnectionId)'),
    'send success must close locally before acknowledgement'
  );
});

test('definitive coded save and send failures clear their operation IDs and unlock compose', async () => {
  const operationSource = sourceBetween(
    '      async function saveDraft(options) {',
    '      function setComposeBusy(busy) {'
  );
  function buildContext(compose, errorCode) {
    Object.assign(compose, {
      pendingSaveSnapshot: null,
      revision: Number(compose.revision || 1),
      savedRevision: Number(compose.savedRevision || 0),
      baselineFingerprint: compose.baselineFingerprint || 'baseline',
    });
    const state = {
      composeBusy: false, compose,
      composeSaveInFlight: false, composeSavePromise: null, composeSaveQueued: false,
      composeAutosaveTimer: 0, composeMinimized: false, composeCloseDialogOpen: false,
    };
    const context = vm.createContext({
      state,
      els: { composeTo: { focus() {} }, composeBody: { focus() {} } },
      composePendingKind: () => String(state.compose && state.compose.pendingKind || ''),
      composeAttachmentJobs: () => [],
      syncComposeFromFields() {},
      clearComposeAutosaveTimer() {},
      hasDraftContent: () => true,
      composeFingerprint: draft => JSON.stringify({ id: draft.id || '', body: draft.body || '' }),
      safeText: (value, fallback = '') => value == null || value === '' ? String(fallback || '') : String(value),
      safeId: value => String(value || ''),
      safeClientOperationId: value => /^[A-Za-z0-9_-]{16,128}$/.test(String(value || '')) ? String(value) : '',
      newClientOperationId: () => 'new_operation_1234567890123',
      setComposeBusy() {},
      composePayload: () => ({ clientOperationId: state.compose.draftOperationId }),
      rpc: async () => {
        const error = new Error('definitive');
        error.code = errorCode;
        throw error;
      },
      normalizeDraft: value => value,
      composeRegularAttachmentSnapshot: values => (values || []).map((value, index) => String(index)),
      mergeCanonicalRegularAttachments: canonical => canonical || [],
      mergeCanonicalInlineAttachments: canonical => canonical || [],
      renderCompose() {},
      acknowledgeComposeOperation() {},
      showSnackbar() {},
      composeOperationIsPending: error => !error.code || /_PENDING$/.test(error.code),
      pendingComposeMessage: () => 'pending',
      updateComposeDirty() { state.compose.dirty = true; },
      renderReplyAttachmentsOption() {},
      renderComposeAttachments() {},
      updateComposeLifecycleControls() {},
      scheduleComposeAutosave() {},
      minimizeCompose() {},
      finishCloseCompose() {},
      haptic() {},
      loadThreads() {},
    });
    vm.runInContext(operationSource, context);
    return { context, state };
  }

  const save = buildContext({
    id: 'draft-1', dirty: true, pendingKind: '', closeAfterSave: false,
    draftOperationId: '', sendOperationId: '', attachments: [], to: 'target@example.com', body: 'Body',
  }, 'GMAIL_ERROR');
  assert.equal(await save.context.saveDraft(), false);
  assert.equal(save.state.compose.draftOperationId, '');
  assert.equal(save.state.compose.pendingKind, '');
  assert.equal(save.state.composeBusy, false);

  const send = buildContext({
    id: 'draft-1', dirty: false, pendingKind: 'send', closeAfterSave: false,
    draftOperationId: '', sendOperationId: 'send_operation_12345678901', attachments: [],
    to: 'target@example.com', body: 'Body',
  }, 'REQUEST_FAILED');
  await send.context.sendCompose();
  assert.equal(send.state.compose.sendOperationId, '');
  assert.equal(send.state.compose.pendingKind, '');
  assert.equal(send.state.composeBusy, false);
});

test('pending send locks onto one send operation and never repeats the draft save', async () => {
  const operationSource = sourceBetween(
    '      async function saveDraft(options) {',
    '      function setComposeBusy(busy) {'
  );
  const requests = [];
  let attempt = 0;
  let closed = false;
  const state = {
    composeBusy: false,
    compose: {
      id: 'draft-1', dirty: false, pendingKind: 'send', closeAfterSave: false,
      draftOperationId: '', sendOperationId: 'send_operation_12345678901', attachments: [], to: 'target@example.com', body: 'Body',
    },
  };
  const context = vm.createContext({
    state,
    els: { composeTo: { focus() {} }, composeBody: { focus() {} } },
    composePendingKind: () => String(state.compose && state.compose.pendingKind || ''),
    composeAttachmentJobs: () => [],
    syncComposeFromFields() {},
    hasDraftContent: () => true,
    safeText: (value, fallback = '') => value == null || value === '' ? String(fallback || '') : String(value),
    safeId: value => String(value || ''),
    safeClientOperationId: value => /^[A-Za-z0-9_-]{16,128}$/.test(String(value || '')) ? String(value) : '',
    newClientOperationId: () => 'send_operation_12345678901',
    setComposeBusy() {},
    composePayload: () => ({ clientOperationId: state.compose.draftOperationId }),
    rpc: async request => {
      requests.push(JSON.parse(JSON.stringify(request)));
      assert.equal(request.op, 'sendDraft');
      attempt += 1;
      if (attempt === 1) {
        const error = new Error('pending');
        error.code = 'SEND_PENDING';
        throw error;
      }
      return { message: { id: 'message-1' } };
    },
    normalizeDraft: value => value,
    mergeCanonicalInlineAttachments: canonical => canonical || [],
    renderCompose() {},
    acknowledgeComposeOperation() {},
    showSnackbar() {},
    composeOperationIsPending: (error, kind) => error.code === (kind === 'send' ? 'SEND_PENDING' : 'DRAFT_PENDING'),
    pendingComposeMessage: () => 'pending',
    finishCloseCompose: () => { closed = true; },
    haptic() {},
    loadThreads() {},
  });
  vm.runInContext(operationSource, context);

  await context.sendCompose();
  assert.equal(state.compose.pendingKind, 'send');
  assert.equal(closed, false);
  await context.sendCompose();
  assert.equal(requests.length, 2);
  assert.equal(requests[0].clientOperationId, requests[1].clientOperationId);
  assert.equal(requests[0].clientOperationId, 'send_operation_12345678901');
  assert.equal(closed, true);
  assert.equal(state.compose.sendOperationId, '');
});

test('a clean existing draft with attachments is still confirmed by save before a new send', async () => {
  const operationSource = sourceBetween(
    '      async function saveDraft(options) {',
    '      function setComposeBusy(busy) {'
  );
  const requests = [];
  const operationIds = ['draft_operation_1234567890', 'send_operation_12345678901'];
  const existingAttachment = {
    existing: true, messageId: 'draft-message-1', partId: '1', id: 'attachment-1',
    name: 'proof.pdf', size: 512,
  };
  const state = {
    composeBusy: false,
    composeSaveInFlight: false,
    composeSavePromise: null,
    composeSaveQueued: false,
    composeAutosaveTimer: 0,
    composeMinimized: false,
    composeCloseDialogOpen: false,
    compose: {
      id: 'draft-1', dirty: false, pendingKind: '', closeAfterSave: false,
      draftOperationId: '', sendOperationId: '', attachments: [existingAttachment],
      to: 'target@example.com', body: 'Body',
      pendingSaveSnapshot: null, revision: 0, savedRevision: 0, baselineFingerprint: 'baseline',
    },
  };
  const context = vm.createContext({
    state,
    els: { composeTo: { focus() {} }, composeBody: { focus() {} } },
    composePendingKind: () => String(state.compose && state.compose.pendingKind || ''),
    composeAttachmentJobs: () => [],
    syncComposeFromFields() {},
    clearComposeAutosaveTimer() {},
    hasDraftContent: () => true,
    composeFingerprint: draft => JSON.stringify({
      id: draft.id || '', body: draft.body || '',
      attachments: (draft.attachments || []).map(item => item.id || item.attachmentId || ''),
    }),
    safeText: (value, fallback = '') => value == null || value === '' ? String(fallback || '') : String(value),
    safeId: value => String(value || ''),
    safeClientOperationId: value => /^[A-Za-z0-9_-]{16,128}$/.test(String(value || '')) ? String(value) : '',
    newClientOperationId: () => operationIds.shift(),
    setComposeBusy() {},
    composePayload: () => ({
      id: state.compose.id,
      clientOperationId: state.compose.draftOperationId,
      existingAttachments: state.compose.attachments.map(item => ({
        messageId: item.messageId, partId: item.partId, attachmentId: item.id,
      })),
    }),
    rpc: async request => {
      requests.push(JSON.parse(JSON.stringify(request)));
      if (request.op === 'saveDraft') {
        return {
          draft: {
            id: 'draft-1', messageId: 'draft-message-2', to: 'target@example.com', bodyText: 'Body',
            attachments: [{
              existing: true, messageId: 'draft-message-2', partId: '1', attachmentId: 'attachment-2',
              name: 'proof.pdf', size: 512,
            }],
          },
        };
      }
      return { message: { id: 'sent-message-1' } };
    },
    normalizeDraft: value => ({
      id: value.id, dirty: false, pendingKind: '', closeAfterSave: false,
      draftOperationId: '', sendOperationId: '', attachments: value.attachments,
      to: value.to, body: value.bodyText,
      pendingSaveSnapshot: null, revision: 0, savedRevision: 0, baselineFingerprint: 'canonical',
    }),
    composeRegularAttachmentSnapshot: values => (values || []).map((value, index) => String(index)),
    mergeCanonicalRegularAttachments: canonical => canonical || [],
    mergeCanonicalInlineAttachments: canonical => canonical || [],
    renderCompose() {},
    acknowledgeComposeOperation() {},
    showSnackbar() {},
    composeOperationIsPending: () => false,
    pendingComposeMessage: () => 'pending',
    updateComposeDirty() { state.compose.dirty = true; },
    renderReplyAttachmentsOption() {},
    renderComposeAttachments() {},
    updateComposeLifecycleControls() {},
    scheduleComposeAutosave() {},
    minimizeCompose() {},
    finishCloseCompose() {},
    haptic() {},
    loadThreads() {},
  });
  vm.runInContext(operationSource, context);

  await context.sendCompose();
  assert.deepEqual(requests.map(request => request.op), ['saveDraft', 'sendDraft']);
  assert.equal(requests[0].draft.existingAttachments[0].attachmentId, 'attachment-1');
  assert.equal(requests[1].draftId, 'draft-1');
  assert.equal(requests[0].draft.clientOperationId, 'draft_operation_1234567890');
  assert.equal(requests[1].clientOperationId, 'send_operation_12345678901');
});

test('pending compose state keeps exit controls usable while exposing reconciliation state', () => {
  const busySource = sourceBetween(
    '      function setComposeBusy(busy) {',
    '      function requestCloseCompose() {'
  );
  assert.match(busySource, /pendingKind === "send"/);
  assert.match(busySource, /pendingKind === "draft"/);
  assert.match(busySource, /"Перевірити збереження"/);
  assert.match(busySource, /"Перевірити надсилання"/);
  assert.match(busySource, /contenteditable", locked \? "false" : "true"/);
  assert.match(busySource, /closeComposeButton\.disabled = false/);
  assert.match(busySource, /minimizeComposeButton\.disabled = false/);
  assert.match(busySource, /var saving = Boolean\(state\.composeSaveInFlight \|\| pendingKind === "draft"\)/);
  assert.match(busySource, /var locked = Boolean\(networkBusy \|\| pendingKind === "send"\)/);
});

test('compose From selector contains only current profile or verified Gmail send-as aliases', () => {
  assert.match(uiSource, /<label for="composeFrom">Від<\/label>[\s\S]*<select id="composeFrom" aria-label="Адреса відправника"><\/select>/);
  const accountSource = sourceBetween(
    '      function normalizeAccounts(values, primaryValue) {',
    '      function renderAccountPanel() {'
  );
  assert.match(accountSource, /function normalizeSendAs\(values, primaryEmail\)/);
  assert.match(accountSource, /item\.verified === false \|\| item\.accepted === false/);
  assert.match(accountSource, /\["accepted", "verified"\]\.indexOf\(status\) === -1/);
  assert.match(accountSource, /if \(primary && !seen\.has\(primary\.toLowerCase\(\)\)\)/);
  assert.match(accountSource, /state\.sendAs = normalizeSendAs\(bootstrap\.sendAs, state\.account\.email\)/);
  assert.match(uiSource, /state\.compose\.from = normalizeComposeFrom\(els\.composeFrom\.value\)/);
  assert.match(uiSource, /from: normalizeComposeFrom\(draft\.from\)/);
  assert.match(uiSource, /from: safeText\(draft\.from\)/);
  assert.doesNotMatch(accountSource, /example\.com|fake|вигадан/i);
});

test('unified inbox and every mailbox operation preserve the exact Gmail connection', () => {
  const translationSource = sourceBetween(
    '      function translateRpcRequest(request) {',
    '      function rpc(request) {'
  );
  assert.match(translationSource, /op: input\.unified \? "unifiedList" : "list"/);
  for (const operation of ['thread', 'attachment', 'label', 'action', 'saveDraft', 'sendDraft', 'ackOperation']) {
    assert.match(translationSource, new RegExp(`op: "${operation}"[\\s\\S]*?connectionId: safeId\\(`));
  }

  const readerSource = sourceBetween(
    '      async function openThread(threadId, force, connectionId) {',
    '      function closeReader() {'
  );
  assert.match(readerSource, /state\.selectedConnectionId = requestedConnectionId/);
  assert.match(readerSource, /rpc\(\{ op: "getThread", threadId: id, connectionId: requestedConnectionId \}\)/);
  assert.match(readerSource, /connectionId: requestedConnectionId/);

  const actionSource = sourceBetween(
    '      async function changeThreadAction(action, explicitThreadId, options) {',
    '      function actionSuccessMessage(action) {'
  );
  assert.match(actionSource, /actionOptions\.connectionId/);
  assert.match(actionSource, /op: "action",[\s\S]*connectionId: connectionId/);
  assert.match(actionSource, /Object\.assign\(\{\}, data\.undo, \{ connectionId: connectionId \}\)/);

  const composeSource = sourceBetween(
    '      function blankCompose(mode) {',
    '      function safeComposeLink(value) {'
  );
  assert.match(composeSource, /connectionId: safeId\(/);
  assert.match(composeSource, /draft\.connectionId = safeId\(/);
  assert.match(uiSource, /op: "saveDraft",[\s\S]*connectionId: safeId\(composeAtStart\.connectionId\)/);
  assert.match(uiSource, /op: "sendDraft",[\s\S]*connectionId: safeId\(state\.compose\.connectionId\)/);
});

test('Google Drive attachment accounts are independently connectable and switchable', () => {
  assert.match(uiSource, /id="composeDriveAccount" aria-label="Акаунт Google Drive"/);
  assert.match(uiSource, /id="composeDriveConnect"[^>]*>＋ Підключити Drive<\/button>/);
  assert.match(uiSource, /id="composeDriveContinue"[^>]*target="_blank"[^>]*rel="noopener noreferrer"[^>]*hidden>Продовжити в Google Drive<\/a>/);
  assert.match(uiSource, /Акаунт Drive обирається незалежно від Gmail-адреси/);
  const driveSource = sourceBetween(
    '      function renderDriveAccounts(value) {',
    '      function renderBoxAccounts(value) {'
  );
  assert.match(driveSource, /op: "sourceAccounts", provider: "drive"/);
  assert.match(driveSource, /op: "sourceConnectStart", provider: "drive"/);
  assert.match(driveSource, /Сервер не повернув безпечну адресу Google/);
  assert.match(driveSource, /composeDriveContinue\.href = url/);
  assert.match(driveSource, /composeDriveContinue\.dataset\.expiresAt/);
  assert.doesNotMatch(driveSource, /openSafeUrl\(url, false\)/);
  assert.match(driveSource, /op: "sourceSelect", provider: "drive", sourceConnectionId: sourceConnectionId/);
  assert.match(driveSource, /op: "sourceList", provider: "drive", sourceConnectionId: state\.activeDriveSourceConnectionId/);
  const previewSource = sourceBetween('      function previewRpc(request) {', '      cacheElements();');
  assert.match(previewSource, /if \(op === "sourceAccounts"\)/);
  assert.match(previewSource, /source-drive-preview-work/);
  assert.match(previewSource, /prompt=select_account%20consent/);
});

test('account panel uses correct singular Gmail account accessibility label', () => {
  assert.match(uiSource, /unifiedCount === 1 \? "акаунт" : "акаунтів"/);
});

test('account panel closes only the current Mini App session', () => {
  assert.match(uiSource, /id="signOutMailboxSession"[^>]*>Вийти з цього сеансу</);
  assert.match(uiSource, /function callCloseMailboxSession\(sessionToken, refreshToken\)/);
  assert.match(uiSource, /\.mailboxCloseSession\(sessionToken, refreshToken\)/);
  const signOutSource = sourceBetween(
    '      async function signOutMailboxSession() {',
    '      async function recoverSessionCapacity(recoveryToken) {'
  );
  assert.match(signOutSource, /await prepareComposeForSessionClose\(\)/);
  assert.match(signOutSource, /result\.signedOut !== true/);
  assert.match(signOutSource, /state\.session = null/);
  assert.match(signOutSource, /state\.refreshToken = null/);
  assert.match(signOutSource, /state\.sessionClosing = true/);
  assert.match(signOutSource, /Gmail-акаунти залишилися підключеними/);
  assert.doesNotMatch(signOutSource, /disconnectGmail|sourceDisconnect|archive|trash|sendDraft/);
  assert.match(uiSource, /signOutMailboxSession\.addEventListener\("click", signOutMailboxSession\)/);
});

test('Gmail zones expose invitation roles and an inline revocable disconnect flow', () => {
  assert.match(uiSource, /id="workspaceAccessPanel"/);
  const translationSource = sourceBetween(
    '      function translateRpcRequest(request) {',
    '      function rpc(request) {'
  );
  for (const operation of ['workspaceAccess', 'createInvite', 'acceptInvite', 'updateMember', 'disconnectGmail']) {
    assert.match(translationSource, new RegExp(`op === "${operation}"`));
  }
  assert.match(translationSource, /disconnectGmail", payload: \{ connectionId: safeId\(disconnect\.connectionId\) \}/);

  const accountSource = sourceBetween(
    '      function renderAccountPanel() {',
    '      async function switchMailboxAccount(connectionId) {'
  );
  assert.match(accountSource, /Підтвердити від’єднання/);
  assert.match(accountSource, /disconnectMailboxAccount\(account\)/);
  assert.match(accountSource, /Код запрошення/);
  assert.match(accountSource, /Створити запрошення/);
  assert.match(accountSource, /Telegram ID/);
  assert.match(accountSource, /Забрати доступ/);
  assert.match(accountSource, /copyText\(output\.value, "Код запрошення скопійовано"\)/);
  assert.doesNotMatch(accountSource, /window\.confirm|window\.prompt|\bconfirm\(|\bprompt\(/);
  const normalizationSource = sourceBetween(
    '      function normalizeAccounts(values, primaryValue) {',
    '      function normalizeSendAs(values, primaryEmail) {'
  );
  assert.match(normalizationSource, /seen\.has\(id\)/);
  assert.match(normalizationSource, /hasExplicitCurrent/);
  assert.doesNotMatch(normalizationSource, /seen\.has\(key\)/);
});

test('Gmail metadata panel refreshes the active account and manages only guarded user labels', () => {
  assert.match(uiSource, /id="gmailMetadataPanel"/);
  assert.match(uiSource, /id="refreshGmailMetadata"[^>]*>Оновити<\/button>/);
  assert.match(uiSource, /Мітки й налаштування Gmail/);
  const translationSource = sourceBetween(
    '      function translateRpcRequest(request) {',
    '      function rpc(request) {'
  );
  assert.match(translationSource, /if \(op === "metadata"\)[\s\S]*connectionId: safeId\(input\.connectionId\)/);
  assert.match(translationSource, /if \(op === "labelAdmin"\)/);
  assert.match(translationSource, /expectedVersion/);
  assert.match(translationSource, /confirmDelete/);
  const metadataSource = sourceBetween(
    '      function applyGmailMetadataSnapshot(value) {',
    '      async function loadWorkspaceAccess() {'
  );
  assert.match(metadataSource, /state\.labels = metadata\.labels\.filter/);
  assert.match(metadataSource, /label\.type === "user" && label\.canApply/);
  assert.match(metadataSource, /var requestId = \+\+state\.gmailMetadataRequestId/);
  assert.match(metadataSource, /requestId !== state\.gmailMetadataRequestId/);
  assert.match(metadataSource, /safeId\(state\.account && state\.account\.id\) !== connectionId/);
  assert.match(metadataSource, /Підтвердити/);
  assert.match(metadataSource, /confirmDelete: "DELETE_LABEL"/);
  assert.match(metadataSource, /Системні папки й мітки Gmail/);
  assert.match(metadataSource, /state\.sendAs = metadata\.sendAs\.value/);
  assert.match(metadataSource, /Фонова синхронізація/);
  assert.match(metadataSource, /function refreshOpenAccountMetadataIfStale\(\)/);
  assert.match(metadataSource, /Date\.now\(\) - metadata\.fetchedAt >= 60 \* 1000/);
  assert.match(uiSource, /loadGmailMetadata\(\{ silent: true \}\)/,
    'opening the account panel must refresh the exact active Gmail connection without a noisy toast');
  assert.match(uiSource, /window\.setInterval\(refreshOpenAccountMetadataIfStale, 60 \* 1000\)/);
  assert.doesNotMatch(metadataSource, /window\.confirm|window\.prompt|\bconfirm\(|\bprompt\(/);
});

test('ADHD focus is visible, manually assignable, and rule-driven per Gmail account', () => {
  assert.match(uiSource, /id="focusSettingsPanel"/);
  assert.ok(
    uiSource.indexOf('id="focusSettingsPanel"') < uiSource.indexOf('id="accountList"') &&
      uiSource.indexOf('id="focusSettingsPanel"') < uiSource.indexOf('id="gmailMetadataPanel"'),
    'neuroinclusive support and rules must remain before every dynamic account, access, and Gmail label list'
  );
  assert.match(uiSource, /ADHD-фокус і пріоритети/);
  assert.match(uiSource, /className: "thread-row"[\s\S]*focus-priority/);
  assert.match(uiSource, /className: "focus-badge"/);
  assert.match(uiSource, /label: "Персональний пріоритет"[\s\S]*toggleFocusMenu/);
  assert.match(uiSource, /setThreadFocus\("none", "", ""\)/);
  const translationSource = sourceBetween(
    '      function translateRpcRequest(request) {',
    '      function rpc(request) {'
  );
  for (const operation of ['focusConfig', 'focusThread', 'focusRuleAdmin']) {
    assert.match(translationSource, new RegExp(`op === "${operation}"`));
  }
  const focusSource = sourceBetween(
    '      function normalizeFocusConfig(value) {',
    '      async function loadWorkspaceAccess() {'
  );
  assert.match(focusSource, /Соціальний працівник/);
  assert.match(focusSource, /Точна адреса відправника/);
  assert.match(focusSource, /Слова в темі/);
  assert.match(focusSource, /Створити правило/);
  assert.match(focusSource, /expectedRevision/);
  assert.doesNotMatch(focusSource, /window\.confirm|window\.prompt|\bconfirm\(|\bprompt\(/);
});

test('Focus View exposes bounded triage next action Resume Rail and exactly three primary actions', () => {
  assert.match(uiSource, /\{ id: "FOCUS", name: "Фокус", icon: "important" \}/);
  assert.match(uiSource, /requestedFolder\.toUpperCase\(\) === "FOCUS"/);
  assert.match(uiSource, /function normalizeAttention\(value, threadId\)/);
  assert.match(uiSource, /op === "attentionState"/);
  assert.match(uiSource, /op === "attentionUpdate"/);
  assert.match(uiSource, /Продовжити з місця, де зупинились/);
  assert.match(uiSource, /Автоматичний AI-аналіз/);
  assert.match(uiSource, /Впевненість: /);
  assert.match(uiSource, /Цитати-джерела \(/);
  assert.match(uiSource, /Ризик \(автоматична оцінка\)/);
  const attentionAssist = sourceBetween(
    '      function buildAttentionAssist() {',
    '      function renderThread() {'
  );
  assert.match(attentionAssist, /analysis\.sourceFragments/);
  assert.match(attentionAssist, /Метод: /);
  assert.match(attentionAssist, /Перейти до повідомлення-джерела/);
  assert.match(attentionAssist, /details\.quoted-history/);
  assert.match(attentionAssist, /openSafeUrl\(state\.thread\.gmailUrl, false\)/,
    'an evidence fragment outside the rendered window must still reach the original Gmail thread');
  assert.doesNotMatch(attentionAssist, /message\.bodyText|messages\.slice\(-3\)/,
    'the UI must render only server-bound evidence and never invent citations from message bodies');
  assert.match(uiSource, /className: "next-action-input"/);
  for (const label of ['Дія', 'Чекаю', 'Інфо', 'Пізніше']) {
    assert.match(uiSource, new RegExp(`"${label}"`));
  }
  const actionBar = sourceBetween(
    '      function buildMobileActionBar() {',
    '      function buildResumeRail() {'
  );
  for (const label of ['Зробити', 'Відповісти', 'Відкласти']) {
    assert.match(actionBar, new RegExp(`"${label}"`));
  }
  assert.doesNotMatch(actionBar, /Переслати|До кошика|mailboxMoveActionsForView|"Ще"/,
    'the low-energy primary bar must not exceed the three intentional actions');
  assert.match(uiSource, /slice\(0, focusLimit\)/, 'Focus queue must follow the bounded energy preset');
  assert.match(uiSource, /scheduleReadingProgress\(scroll\)/);
});

test('energy presets and reminder modes keep Focus compassionate bounded and account-scoped', () => {
  assert.match(uiSource, /id="focusSessionBar"/);
  assert.match(uiSource, /op === "attentionPreferences"/);
  assert.match(uiSource, /function normalizeAttentionPreferences\(value\)/);
  assert.match(uiSource, /function updateAttentionPreferences\(changes\)/);
  assert.match(uiSource, /connectionId: connectionId/,
    'preference writes must preserve the exact selected Gmail connection');
  const switchSource = sourceBetween(
    '      async function switchMailboxAccount(connectionId) {',
    '      async function toggleAccountPreference(connectionId, kind, enabled) {'
  );
  assert.match(switchSource, /state\.attentionPreferences = normalizeAttentionPreferences\(null\)/);
  assert.match(switchSource, /op: "attentionState", connectionId: requested/,
    'account switching must reload preferences from the exact new Gmail connection');
  assert.match(uiSource, /low: "Почнемо з одного листа\. Цього достатньо\."/);
  assert.match(uiSource, /five_minutes: "Можна зупинитися після цього короткого блоку\."/);
  assert.match(uiSource, /three_threads: "Залишилося не більше трьох рішень\."/);
  assert.match(uiSource, /untimed: "Працюйте у своєму темпі\."/);
  for (const label of ['Мало сил', '5 хвилин', '3 листи', 'Без таймера', 'М’яко', 'Дайджест', 'Лише термінове']) {
    assert.match(uiSource, new RegExp(label));
  }
  assert.doesNotMatch(uiSource, /ви знову не|ви пропустили|провалили інбокс|серія втрачена/i,
    'neuroinclusive copy must not shame users for unfinished mail');
});

test('adaptive density follows energy preserves evidence and keeps minimal mode to three primary actions', () => {
  assert.match(uiSource, /densityMode: "auto"/);
  assert.match(uiSource, /function effectiveDensityMode\(value\)/);
  const effectiveSource = sourceBetween(
    '      function effectiveDensityMode(value) {',
    '      function densityModeLabel(mode) {'
  );
  assert.match(effectiveSource, /sessionPreset === "low"\) return "minimal"/);
  assert.match(effectiveSource, /sessionPreset === "untimed"\) return "analytical"/);
  assert.match(effectiveSource, /return "standard"/);
  for (const label of ['Авто за енергією', 'Мінімум', 'Стандарт', 'Аналітично']) {
    assert.match(uiSource, new RegExp(label));
  }
  assert.match(uiSource, /updateAttentionPreferences\(\{ densityMode: densitySelect\.value \}\)/);
  assert.match(uiSource, /"aria-label": "Вигляд відкритого листа"/,
    'the density selector must remain available in every open reader, not only Focus');
  assert.match(uiSource, /updateAttentionPreferences\(\{ densityMode: densityReaderSelect\.value \}\)/,
    'the reader-level selector must persist through the account-scoped preference RPC');
  const preferenceUpdateSource = sourceBetween(
    '      async function updateAttentionPreferences(changes) {',
    '      async function loadBacklogRescue(action, options) {'
  );
  assert.match(preferenceUpdateSource, /requestId !== state\.attentionPreferencesRequestId/);
  assert.match(preferenceUpdateSource, /safeId\(state\.account && state\.account\.id\) !== connectionId/,
    'a late preference response must not overwrite a newly selected Gmail account');
  const switchAccountSource = sourceBetween(
    '      async function switchMailboxAccount(connectionId) {',
    '      async function toggleAccountPreference(connectionId, kind, enabled) {'
  );
  assert.match(switchAccountSource,
    /await rpc\(\{ op: "switchAccount"[\s\S]*state\.attentionPreferencesRequestId \+= 1/,
    'only a confirmed account switch may invalidate an in-flight preference response');
  assert.match(uiSource, /data-density": densityMode/);
  assert.match(uiSource, /Показати оригінал листа й переписку/,
    'minimal mode must keep the full original one interaction away');
  assert.match(uiSource, /sources\.open = analyticalDensity \|\| minimalDensity/,
    'one minimal-mode disclosure must expose the already-open grounded sources');
  assert.match(uiSource, /target\.closest\("details\.density-original"\)[\s\S]*original\.open = true/,
    'source navigation must reveal a target hidden inside the minimal original disclosure');
  assert.match(uiSource, /history\.open = densityMode === "analytical"/);
  assert.match(uiSource, /if \(!minimalDensity && \(\(handoff\.task/,
    'minimal mode must not duplicate handoff controls below its three primary actions');
  assert.match(uiSource, /effectiveDensityMode\(\) === "minimal"[\s\S]*Додати до календаря/,
    'a calendar-only secondary action remains reachable through the Other actions menu');

  const toolbarSource = sourceBetween(
    '      function buildAdaptiveThreadToolbar(densityMode) {',
    '      function threadStateLabels() {'
  );
  assert.equal((toolbarSource.match(/primaryAction: true/g) || []).length, 3,
    'minimal mode must expose exactly three primary actions');
  for (const label of ['Відповісти', 'Перетворити на задачу', 'Відкласти', 'Інші дії']) {
    assert.match(toolbarSource, new RegExp(label));
  }
  assert.doesNotMatch(toolbarSource, /Архівувати|До кошика|Позначити прочитаним|Мітки/,
    'secondary mail management must stay behind the single Other actions disclosure');
});

test('co-processing presence is explicit private restorable and never mutates mail', () => {
  assert.match(uiSource, /op === "coProcessingSession"/);
  assert.match(uiSource, /function normalizeCoProcessing\(value\)/);
  assert.match(uiSource, /function manageCoProcessing\(action, durationMinutes, options\)/);
  assert.match(uiSource, /Тиха присутність/);
  assert.match(uiSource, /Побути поруч " \+ minutes \+ " хв/);
  assert.match(uiSource, /allowedDurations: \[10, 25\]/);
  assert.match(uiSource, /Готово на сьогодні/);
  assert.match(uiSource, /Зупинити без оцінки/);
  assert.match(uiSource, /aria-live": "polite"/);
  assert.match(uiSource, /className: "co-processing-progress"/);
  assert.match(uiSource, /window\.setInterval\(updateCoProcessingClock, 1000\)/);
  assert.match(uiSource, /кілька м’яких підказок лише у відкритому Mini App/,
    'the UI must describe in-app presence instead of an unsolicited push channel');

  const mutationSource = sourceBetween(
    '      async function manageCoProcessing(action, durationMinutes, options) {',
    '      function renderCoProcessingCard() {'
  );
  assert.match(mutationSource, /connectionId = safeId\(state\.account && state\.account\.id\)/);
  assert.match(mutationSource, /expectedRevision: normalizeAttentionPreferences\(state\.attentionPreferences\)\.revision/);
  assert.match(mutationSource, /operationId: newClientOperationId\(\)/);
  assert.match(mutationSource, /op: "coProcessingSession", connectionId: connectionId/);
  assert.doesNotMatch(mutationSource,
    /changeThreadAction|attentionUpdate|saveDraft|sendDraft|label|subject|sender|bodyText|summaryUk|localStorage|sessionStorage/,
    'starting or stopping presence must never mutate Gmail, inspect mail content, or create browser tracking');

  const switchSource = sourceBetween(
    '      async function switchMailboxAccount(connectionId) {',
    '      async function toggleAccountPreference(connectionId, kind, enabled) {'
  );
  assert.match(switchSource, /state\.coProcessing = normalizeCoProcessing\(null\)/);
  assert.match(switchSource, /state\.coProcessing = accountAttention\.presence/,
    'account switching must restore presence only from the exact selected Gmail connection');

  const normalizeSource = sourceBetween(
    '      function normalizeCoProcessing(value) {',
    '      function normalizeBacklogRescue(value, threadsValue) {'
  );
  assert.doesNotMatch(normalizeSource, /threadId|messageId|subject|sender|bodyText|summaryUk/,
    'the client presence DTO must remain content-free');
  assert.doesNotMatch(uiSource, /presence streak|серія присутності|пропущена сесія/i,
    'presence must not introduce streaks or shame copy');
});

test('gentle milestones acknowledge bounded session progress without gamification or durable tracking', () => {
  assert.match(uiSource, /function resetGentleMilestones\(accountId\)/);
  assert.match(uiSource, /function recordGentleMilestone\(kind\)/);
  assert.match(uiSource, /function renderGentleMilestoneCard\(\)/);
  assert.match(uiSource, /Маленький крок/);
  assert.match(uiSource, /Один лист уже отримав рішення/);
  assert.match(uiSource, /Три рішення прийнято/);
  assert.match(uiSource, /Десять хвилин тихої присутності завершено/);
  assert.match(uiSource, /Без балів, серій, порівнянь і вимоги продовжувати/);
  assert.match(uiSource, /"aria-live": "polite"/);
  assert.match(uiSource, /"aria-label": "Сховати м’яке підтвердження"/);

  const milestoneSource = sourceBetween(
    '      function resetGentleMilestones(accountId) {',
    '      function renderFocusSessionBar(focusMode) {'
  );
  assert.doesNotMatch(milestoneSource,
    /localStorage|sessionStorage|mailboxRpc|\brpc\(|threadId|messageId|subject|sender|bodyText|summaryUk|score|points|confetti/i,
    'milestones must remain ephemeral, content-free, provider-free, and non-competitive');
  assert.match(milestoneSource, /Math\.min\(3, Number\(milestones\.decisions \|\| 0\) \+ 1\)/,
    'the visible decision acknowledgement must be capped instead of creating an endless counter');

  const attentionUpdate = sourceBetween(
    '      async function updateAttention(changes, options) {',
    '      function renderAttentionPreferenceSurfaces() {'
  );
  assert.match(attentionUpdate,
    /previousTriage === "none" && result\.thread\.triage !== "none"/,
    'only a confirmed first decision for the open thread may advance the transient milestone');
  assert.match(uiSource,
    /var priorTriage = attention\.triage;[\s\S]*previousTriage: priorTriage/,
    'optimistic triage rendering must still pass the pre-click state into the confirmed milestone check');
  const switchSource = sourceBetween(
    '      async function switchMailboxAccount(connectionId) {',
    '      async function toggleAccountPreference(connectionId, kind, enabled) {'
  );
  assert.match(switchSource, /resetGentleMilestones\(requested\)/,
    'switching Gmail accounts must discard the old account transient session acknowledgement');
});

test('backlog rescue is explicit bounded restorable and never turns Focus into an infinite inbox', () => {
  assert.match(uiSource, /op === "backlogRescue"/);
  assert.match(uiSource, /function normalizeBacklogRescue\(value, threadsValue\)/);
  assert.match(uiSource, /Підібрати короткий блок/);
  assert.match(uiSource, /із " \+ state\.backlogRescue\.selectedCount/);
  assert.match(uiSource, /Можна зупинитися будь-коли/);
  assert.match(uiSource, /Завершити сесію/);
  assert.match(uiSource, /Жоден лист автоматично не змінено/);
  assert.match(uiSource, /короткі сесії ніколи не змішують акаунти/);
  assert.match(uiSource, /startRescue\.disabled = state\.unifiedMode/,
    'a mixed-account feed must not start an ambiguous rescue session');
  assert.match(uiSource, /state\.backlogRescue\.active \? state\.backlogRescue\.threads/,
    'an active rescue session must render its exact bounded server selection');
  assert.match(uiSource, /slice\(0, 10\)\.map\(normalizeThread\)/,
    'the client must reject an oversized rescue payload');

  const rescueSource = sourceBetween(
    '      async function loadBacklogRescue(action, options) {',
    '      function scheduleReadingProgress(scroll) {'
  );
  assert.match(rescueSource, /connectionId: connectionId/,
    'rescue operations must preserve the exact active Gmail connection');
  assert.match(rescueSource, /expectedRevision: normalizeAttentionPreferences\(state\.attentionPreferences\)\.revision/,
    'rescue mutations must use optimistic account-scoped revisions');
  assert.match(rescueSource, /op: "backlogRescue"[\s\S]*action: "complete"[\s\S]*threadId: id/);
  assert.doesNotMatch(rescueSource, /localStorage|sessionStorage|subject|sender|bodyText|summaryUk/,
    'rescue persistence must not copy email content into browser storage');

  const actionSource = sourceBetween(
    '      async function changeThreadAction(action, explicitThreadId, options) {',
    '      function actionSuccessMessage(action) {'
  );
  assert.match(actionSource, /var data = await rpc[\s\S]*await completeBacklogRescueThread\(threadId, connectionId\)/,
    'rescue progress may advance only after the requested Gmail action succeeds');
  const switchSource = sourceBetween(
    '      async function switchMailboxAccount(connectionId) {',
    '      async function toggleAccountPreference(connectionId, kind, enabled) {'
  );
  assert.match(switchSource, /state\.backlogRescue = normalizeBacklogRescue\(null\)/);
  assert.match(switchSource, /op: "attentionState", connectionId: requested[\s\S]*accountAttention\.rescue/,
    'switching Gmail accounts must clear the old rescue and restore only the selected account session');
});

test('functional metrics explain opt-in relief without mail content shame or browser tracking', () => {
  assert.match(uiSource, /op === "functionalMetrics"/);
  assert.match(uiSource, /function normalizeFunctionalMetrics\(value\)/);
  assert.match(uiSource, /function appendFunctionalMetricsCard\(\)/);
  assert.match(uiSource, /Мій ритм · приватно/);
  assert.match(uiSource, /Це не оцінка продуктивності й не серія/);
  assert.match(uiSource, /без streaks і червоних боргів/);
  assert.match(uiSource, /Увімкнути приватну статистику/);
  assert.match(uiSource, /Підтвердити очищення/);
  assert.match(uiSource, /Лише денні лічильники й часові діапазони/);

  const metricsSource = sourceBetween(
    '      function normalizeFunctionalMetrics(value) {',
    '      function renderFocusSettings() {'
  );
  assert.match(metricsSource, /state\.functionalMetricsAccountId === activeId/,
    'metrics must render only for the exact selected Gmail connection');
  assert.match(metricsSource, /manageFunctionalMetrics\(metrics\.enabled \? "disable" : "enable"\)/);
  assert.match(metricsSource, /manageFunctionalMetrics\("clear"\)/);
  assert.doesNotMatch(metricsSource,
    /localStorage|sessionStorage|threadId|messageId|subject|sender|bodyText|summaryUk|streakCount/i,
    'the metrics UI must not create browser tracking or consume mail content');

  const mutationSource = sourceBetween(
    '      async function manageFunctionalMetrics(action) {',
    '      async function manageFocusRule(request) {'
  );
  assert.match(mutationSource, /connectionId: connectionId/);
  assert.match(mutationSource, /expectedRevision: current\.revision/,
    'metrics preference writes must use optimistic account-scoped revisions');
  assert.match(mutationSource, /op: "functionalMetrics"[\s\S]*action: "state"/,
    'a conflict must refresh authoritative server state');

  const outsideClickSource = sourceBetween(
    '        document.addEventListener("click", function (event) {',
    '        document.addEventListener("focusin", function (event) {'
  );
  assert.match(outsideClickSource, /event\.composedPath\(\)/);
  assert.match(outsideClickSource, /clickPath\.indexOf\(els\.accountPanel\) !== -1/,
    'a synchronous in-panel rerender must not turn its original click into a false outside click');
});

test('three-screen onboarding is accessible explicit and isolated per Gmail account', () => {
  for (const id of ['onboardingLayer', 'onboardingStepOne', 'onboardingStepTwo', 'onboardingStepThree',
    'skipOnboarding', 'onboardingBack', 'onboardingNext', 'openOnboardingSettings']) {
    assert.match(uiSource, new RegExp(`id="${id}"`));
  }
  assert.equal((uiSource.match(/id="onboardingStep(?:One|Two|Three)"/g) || []).length, 3,
    'onboarding must contain exactly three screens');
  assert.match(uiSource, /"Крок " \+ step \+ " із 3"/);
  assert.match(uiSource, />\s*Допомога\s*</);
  assert.match(uiSource, />\s*Пропустити\s*</);
  assert.match(uiSource, /function trapOnboardingFocus\(event\)/);
  assert.match(uiSource, /if \(state\.onboardingOpen\)[\s\S]*trapOnboardingFocus\(event\)/);
  const isolationSource = sourceBetween(
    '      function setOnboardingIsolation(active) {',
    '      function renderOnboarding() {'
  );
  assert.match(isolationSource, /node === app[\s\S]*Array\.from\(app\.children\)[\s\S]*child !== els\.onboardingLayer/,
    'the app shell must stay interactive enough for its onboarding child while every sibling becomes inert');
  assert.doesNotMatch(isolationSource, /node\.inert = true/,
    'the app shell itself cannot become inert because inert propagates into the onboarding dialog');
  assert.match(uiSource, /#focusSettingsPanel \.toolbar-group\s*\{[\s\S]*grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\)[\s\S]*width:\s*100%/,
    'mobile account settings must keep both Support and Rules reachable on their own full-width row');
  assert.match(uiSource, /completeOnboarding:[\s\S]*true|completeOnboarding: true/);
  assert.match(uiSource, /digestWindows: state\.onboardingDraft\.digestWindows/);
  assert.match(uiSource, /timezone: state\.onboardingDraft\.timezone/);

  const bootSource = sourceBetween(
    '      async function boot() {',
    '      function previewOpenSession() {'
  );
  assert.match(bootSource, /await loadThreads\(true\);[\s\S]*state\.routeReady = true;[\s\S]*!state\.attentionPreferences\.onboardingCompletedAt[\s\S]*setOnboardingOpen\(true/,
    'first-run onboarding must wait for the exact account attention state');
  assert.ok(bootSource.indexOf('setOnboardingOpen(true') < bootSource.indexOf('await openThread(initialRoute.threadId'),
    'onboarding must gate automatic thread opening');

  const switchSource = sourceBetween(
    '      async function switchMailboxAccount(connectionId) {',
    '      async function toggleAccountPreference(connectionId, kind, enabled) {'
  );
  assert.match(switchSource, /op: "attentionState", connectionId: requested/);
  assert.match(switchSource, /!state\.attentionPreferences\.onboardingCompletedAt[\s\S]*setOnboardingOpen\(true/,
    'each Gmail account must decide onboarding from its own saved preferences');
  assert.doesNotMatch(uiSource, /ви знову не|ви пропустили|провалили|ледач/i,
    'onboarding copy must remain non-shaming');
});

test('send later saves a Gmail draft first and keeps scheduling explicit account-scoped and recoverable', () => {
  for (const id of [
    'sendLaterButton', 'sendLaterPanel', 'sendLaterDateTime', 'confirmSendLater', 'cancelScheduledSend'
  ]) {
    assert.match(uiSource, new RegExp(`id="${id}"`));
  }
  assert.match(uiSource, /Час не вибирається автоматично/);
  assert.match(uiSource, /\.compose-footer \.send-later-panel \{[\s\S]*position: fixed;[\s\S]*right: 12px;[\s\S]*left: 12px;/,
    'the mobile panel must anchor to the viewport instead of overflowing from its narrow grid column');

  const translationSource = sourceBetween(
    '      function translateRpcRequest(request) {',
    '      function rpc(request) {'
  );
  for (const operation of ['scheduledSendState', 'scheduleDraftSend', 'rescheduleDraftSend', 'cancelScheduledSend']) {
    assert.match(translationSource, new RegExp(`op === "${operation}"`));
  }
  assert.match(translationSource, /scheduleDraftSend[\s\S]*connectionId: safeId\(input\.connectionId\)/);
  assert.match(translationSource, /clientOperationId: safeClientOperationId\(input\.clientOperationId\)/);
  assert.match(translationSource, /expectedRevision: Math\.max\(1, Math\.floor\(Number\(input\.expectedRevision \|\| 0\)\)\)/);

  const openDraftSource = sourceBetween(
    '      function openExistingDraft(value) {',
    '      async function saveDraft(options) {'
  );
  assert.match(openDraftSource, /state\.composeScheduleLoading = true/);
  assert.match(openDraftSource, /loadComposeScheduledSend\(\{ alreadyLoading: true \}\)/);

  const saveSource = sourceBetween(
    '      async function saveDraft(options) {',
    '      function normalizeScheduledSend(value) {'
  );
  assert.match(saveSource, /canonical\.scheduleOperationId = composeAtStart\.scheduleOperationId/,
    'a canonical Gmail draft redraw must preserve the retry identity of an uncertain schedule request');

  const scheduleSource = sourceBetween(
    '      async function scheduleComposeAt(epochValue) {',
    '      async function cancelComposeScheduledSend() {'
  );
  assert.ok(scheduleSource.indexOf('await saveDraft({ quiet: true })') < scheduleSource.indexOf('op: "scheduleDraftSend"'),
    'new schedules must persist a confirmed Gmail draft before the scheduling record');
  assert.match(scheduleSource, /composeAtStart\.scheduleOperationId = newClientOperationId\(\)/);
  assert.match(scheduleSource, /op: "rescheduleDraftSend"[\s\S]*expectedRevision: currentSchedule\.revision/);
  assert.doesNotMatch(scheduleSource, /op: "sendDraft"/);

  const sendSource = sourceBetween(
    '      async function sendCompose() {',
    '      function setComposeBusy(busy) {'
  );
  assert.match(sendSource, /scheduleCheckFailed/);
  assert.match(sendSource, /state\.compose\.scheduledSend\.state === "scheduled"/);
  assert.match(sendSource, /Спочатку явно скасуйте заплановане надсилання/);

  const eventSource = sourceBetween(
    '        els.saveDraftButton.addEventListener("click"',
    '        els.moreMenu.addEventListener("keydown"'
  );
  assert.match(eventSource, /sendLaterTomorrow[\s\S]*sendLaterDateTime\.value = localDateTimeInputValue\(dueAt\)/);
  assert.match(eventSource, /sendLaterForm\.addEventListener\("submit"[\s\S]*scheduleComposeAt\(/);
  assert.doesNotMatch(eventSource, /sendLaterTomorrow[\s\S]{0,350}scheduleComposeAt\(/,
    'a preset may fill the explicit form but cannot silently schedule a message');
});

test('low-pressure reply starters are editable bounded and never overwrite or auto-send', () => {
  assert.match(uiSource, /id="replyStarterPanel"/);
  assert.equal((uiSource.match(/data-reply-starter="(?:short|professional|warm)"/g) || []).length, 3);
  for (const label of ['Коротко', 'Професійно', 'Тепло']) assert.match(uiSource, new RegExp(label));
  const starterSource = sourceBetween(
    '      function replyStarterText(styleValue) {',
    '      function renderReplyAttachmentsOption() {'
  );
  assert.match(starterSource, /if \(composeEditorText\(\)\.trim\(\)\)/,
    'an existing reply must block template replacement');
  assert.match(starterSource, /setComposeEditorContent\("", replyStarterText\(style\)\)/);
  assert.match(starterSource, /syncComposeFromFields\(\)/,
    'a chosen starter must enter the normal editable Gmail draft lifecycle');
  assert.match(starterSource, /Перевірте факти й відредагуйте текст/);
  assert.doesNotMatch(starterSource, /sendDraft|saveDraft\s*\(|op:\s*"sendDraft"/,
    'choosing a starter must never send or force-save a message directly');
  assert.match(uiSource, /редагований шаблон · нічого не надсилається автоматично/);
});

test('preview draft save returns the current canonical nested draft contract', () => {
  const previewSource = sourceBetween(
    '      function previewRpc(request) {',
    '      cacheElements();'
  );
  assert.match(
    previewSource,
    /if \(op === "saveDraft"\)[\s\S]*?resolve\(\{\s*message:\s*"Чернетку збережено",\s*draft:\s*\{/
  );
  assert.match(previewSource, /attachments:\s*previewDraftAttachments\(payload\)/);
  assert.match(previewSource, /inlineAttachments:\s*payload\.inlineAttachments \|\| \[\]/);
  assert.match(uiSource, /function previewDraftAttachments\(payload\)[\s\S]*?retained\.concat\(added\)/);
});

test('all inline Mini App scripts remain syntactically valid', () => {
  const inlineScripts = [...uiSource.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)]
    .map(match => match[1])
    .filter(source => source.trim());
  assert.ok(inlineScripts.length > 0);
  inlineScripts.forEach(source => assert.doesNotThrow(() => new Function(source)));
});
