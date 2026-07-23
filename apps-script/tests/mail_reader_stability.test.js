const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const source = fs.readFileSync(path.resolve(__dirname, '..', 'MailApp.html'), 'utf8');

function functionSource(name) {
  const start = source.indexOf(`function ${name}(`);
  assert.notEqual(start, -1, `${name} must exist`);
  const bodyStart = source.indexOf('{', start);
  let depth = 0;
  for (let index = bodyStart; index < source.length; index += 1) {
    if (source[index] === '{') depth += 1;
    if (source[index] === '}') {
      depth -= 1;
      if (depth === 0) return source.slice(start, index + 1);
    }
  }
  throw new Error(`${name} has no closing brace`);
}

function sourceBetween(startMarker, endMarker) {
  const start = source.indexOf(startMarker);
  assert.notEqual(start, -1, `missing ${startMarker}`);
  const end = source.indexOf(endMarker, start + startMarker.length);
  assert.notEqual(end, -1, `missing ${endMarker}`);
  return source.slice(start, end);
}

test('reader render skips identical state and captures view before replacing DOM', () => {
  const render = functionSource('renderThread');
  assert.ok(
    render.indexOf('p0ReaderRenderSignature()') < render.indexOf('clear(els.readerContentHost)'),
    'render signature must gate root replacement'
  );
  assert.match(render, /readerRenderSkips \+= 1/);
  assert.ok(
    render.indexOf('p0CaptureReaderView(existingScroll)') < render.indexOf('clear(els.readerContentHost)'),
    'scroll and focus must be captured before root replacement'
  );
  assert.match(render, /p0RestoreReaderView\(scroll, preservedReaderView/);
  assert.doesNotMatch(render, /setTimeout\(function \(\) \{[\s\S]*resumeRail\.readingProgress/);
});

test('reader uses stable thread and message anchors instead of list ordinals', () => {
  const marker = functionSource('p0MarkReaderMessageAnchors');
  const render = functionSource('renderThread');
  assert.match(marker, /var messageId = safeId\(message && message\.id\)/);
  assert.match(marker, /"message:" \+ messageId/);
  assert.match(marker, /":body:" \+ index/);
  assert.match(render, /"thread:" \+ safeId\(state\.thread\.id\) \+ ":title"/);
  assert.match(render, /p0MarkReaderMessageAnchors\(renderMessage\(latest\), latest\)/);
  assert.doesNotMatch(marker, /attachmentId|subject|sender|bodyText/);
});

test('anchor restoration keeps the same visible element offset after layout growth', () => {
  const context = vm.createContext({
    safeText: value => String(value || ''),
    Array,
    Math,
    Number,
  });
  vm.runInContext([
    functionSource('p0ReaderAnchorById'),
    functionSource('p0ReaderAnchorSnapshot'),
    functionSource('p0ApplyReaderPosition'),
  ].join('\n'), context);

  let anchorTop = 120;
  const anchor = {
    getAttribute: name => name === 'data-reader-anchor' ? 'message:m1:body:3' : '',
    getBoundingClientRect: () => ({ top: anchorTop, bottom: anchorTop + 100 }),
  };
  const scroll = {
    scrollTop: 400,
    scrollHeight: 1600,
    clientHeight: 500,
    getBoundingClientRect: () => ({ top: 0, bottom: 500 }),
    querySelectorAll: () => [anchor],
  };
  const snapshot = context.p0ReaderAnchorSnapshot(scroll);
  assert.equal(snapshot.anchorId, 'message:m1:body:3');
  assert.equal(snapshot.anchorOffset, 120);

  anchorTop = 180;
  assert.equal(context.p0ApplyReaderPosition(scroll, snapshot), true);
  assert.equal(scroll.scrollTop, 460, 'layout growth above the anchor must not move the reading point');
});

test('bottom-pinned reader stays at the bottom after content growth', () => {
  const context = vm.createContext({
    safeText: value => String(value || ''),
    Array,
    Math,
    Number,
  });
  vm.runInContext([
    functionSource('p0ReaderAnchorById'),
    functionSource('p0ApplyReaderPosition'),
  ].join('\n'), context);
  const scroll = {
    scrollTop: 500,
    scrollHeight: 1400,
    clientHeight: 500,
    querySelectorAll: () => [],
  };
  context.p0ApplyReaderPosition(scroll, { top: 500, atBottom: true });
  assert.equal(scroll.scrollTop, 900);
});

test('reader focus identity restores the same control without forcing scroll', () => {
  const oldButton = {
    tagName: 'BUTTON',
    id: '',
    textContent: 'Відповісти',
    getAttribute(name) {
      return ({ 'data-mail-action': 'reply', 'aria-label': 'Відповісти', name: '', type: 'button' })[name] || '';
    },
  };
  let focusOptions = null;
  const newButton = {
    ...oldButton,
    focus(options) { focusOptions = options; documentStub.activeElement = newButton; },
  };
  const body = {};
  const documentStub = { activeElement: oldButton, body, documentElement: {} };
  const oldHost = {
    contains: node => node === oldButton,
    querySelectorAll: () => [oldButton],
  };
  const context = vm.createContext({
    safeText: value => String(value || ''),
    document: documentStub,
    els: { readerContentHost: oldHost },
    p0Runtime: { metrics: { readerFocusRestores: 0 } },
    Array,
    Number,
  });
  vm.runInContext([
    functionSource('p0ReaderFocusableNodes'),
    functionSource('p0ReaderFocusIdentity'),
    functionSource('p0ReaderFocusIdentityMatches'),
    functionSource('p0ReaderFocusSnapshot'),
    functionSource('p0RestoreReaderFocus'),
  ].join('\n'), context);
  const snapshot = context.p0ReaderFocusSnapshot();
  context.els.readerContentHost = {
    contains: node => node === newButton,
    querySelectorAll: () => [newButton],
  };
  documentStub.activeElement = body;
  assert.equal(context.p0RestoreReaderFocus(snapshot), true);
  assert.equal(focusOptions.preventScroll, true);
  assert.equal(context.p0Runtime.metrics.readerFocusRestores, 1);
});

test('persistent view stores anchors while focus stays memory-only', () => {
  const uiState = functionSource('p0UiStateValue');
  const hydration = sourceBetween(
    '      async function p0HydratePersistentState() {',
    '      function p0ApplyPersistedView() {'
  );
  assert.match(source, /readerViews:\s*new Map\(\)/);
  assert.match(source, /readerFocuses:\s*new Map\(\)/);
  assert.match(uiState, /readerViews:\s*readerViews/);
  assert.doesNotMatch(uiState, /readerFocuses/);
  assert.match(hydration, /restoredUi\.readerViews/);
});

test('layout changes are observed without creating a reading-progress loop', () => {
  const install = functionSource('p0InstallReaderLayoutTracking');
  const render = functionSource('renderThread');
  assert.match(install, /new ResizeObserver/);
  assert.match(install, /tracker\.observer\.observe\(scroll\)/);
  assert.match(install, /tracker\.observer\.observe\(content\)/);
  assert.match(install, /image\.addEventListener\("load"/);
  assert.match(render, /p0TrackReaderLayout\(scroll\)/);
  assert.match(render, /if \(!p0ReaderScrollIsProgrammatic\(scroll\)\) scheduleReadingProgress\(scroll\)/);
});

test('user Home End and Page navigation remains available', () => {
  const keyboard = functionSource('handleReaderScrollKeydown');
  assert.match(keyboard, /\["PageDown", "PageUp", "Home", "End"\]/);
  assert.match(keyboard, /key === "Home" \? 0 : scroll\.scrollHeight/);
  assert.match(keyboard, /event\.preventDefault\(\)/);
});
