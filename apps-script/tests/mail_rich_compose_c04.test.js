const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '..', 'MailApp.html'), 'utf8');

function sourceBetween(start, end) {
  const from = source.indexOf(start);
  const to = source.indexOf(end, from + start.length);
  assert.notEqual(from, -1, `Missing start marker: ${start}`);
  assert.notEqual(to, -1, `Missing end marker: ${end}`);
  return source.slice(from, to);
}

test('recipient tokenizer supports quoted names, long lists, Unicode and strict address validation', () => {
  const functions = sourceBetween(
    '      function splitComposeRecipientTokens(value) {',
    '      function composeRecipientListElement(input) {'
  );
  const context = vm.createContext({
    safeText(value, fallback = '') {
      return value == null || value === '' ? String(fallback || '') : String(value);
    },
  });
  vm.runInContext(functions, context);

  const quoted = context.splitComposeRecipientTokens(
    '"Тарасевич, Павло" <pavlo@example.com>; Ольга <olha@example.org>'
  );
  assert.deepEqual(Array.from(quoted), [
    '"Тарасевич, Павло" <pavlo@example.com>',
    'Ольга <olha@example.org>',
  ]);
  assert.equal(context.normalizeComposeRecipientToken(quoted[0]).email, 'pavlo@example.com');
  assert.equal(context.normalizeComposeRecipientToken('не адреса'), null);
  assert.equal(context.normalizeComposeRecipientToken('a@example.com\nBcc: hidden@example.com'), null);

  const hundred = Array.from({ length: 100 }, (_, index) => `user${index}@example.com`).join(',');
  assert.equal(context.splitComposeRecipientTokens(hundred).length, 100);
  assert.equal(
    context.splitComposeRecipientTokens(hundred).map(context.normalizeComposeRecipientToken).filter(Boolean).length,
    100
  );
});

test('To CC and BCC use one accessible chip model without changing canonical draft strings', () => {
  assert.equal((source.match(/class="compose-recipient-editor" data-recipient-kind=/g) || []).length, 3);
  assert.equal((source.match(/class="compose-recipient-chips"[^>]+role="list"/g) || []).length, 3);
  assert.match(source, /composeRecipientValue\(els\.composeTo\)/);
  assert.match(source, /setComposeRecipientValue\(els\.composeTo, draft\.to\)/);
  assert.match(source, /aria-label", "Видалити одержувача " \+ entry\.email/);
  assert.match(source, /event\.key === "ArrowLeft"[\s\S]*compose-recipient-remove/);
  assert.match(source, /event\.key === "Delete" \|\| event\.key === "Backspace"/);
  assert.match(source, /\.compose-recipient-editor \{[\s\S]*max-height: 96px;[\s\S]*overflow-y: auto;/);
  assert.match(source, /\.compose-fields \{[\s\S]*max-height: min\(38vh, 260px\);[\s\S]*overflow-y: auto;/);
});

test('rich paste uses the existing allowlist sanitizer and never inserts raw clipboard HTML', () => {
  const paste = sourceBetween(
    '        els.composeBody.addEventListener("paste"',
    '        els.composeBody.addEventListener("drop"'
  );
  const insertion = sourceBetween(
    '      function insertSafeRichTextIntoCompose(html, plainText) {',
    '      function splitComposeRecipientTokens(value) {'
  );
  assert.match(paste, /clipboard\.getData\("text\/html"\)/);
  assert.match(paste, /insertSafeRichTextIntoCompose\(richText, plainText\)/);
  assert.match(insertion, /var sanitized = sanitizeComposeHtml\(html\)/);
  assert.match(insertion, /document\.importNode\(node, true\)/);
  assert.doesNotMatch(insertion, /innerHTML\s*=\s*html/);
  assert.match(source, /if \(!inlineToken\) return null;/);
});

test('format toolbar is progressive and preserves existing selection-driven commands', () => {
  assert.match(source, /id="composeMoreFormattingButton"[^>]+aria-expanded="false"[^>]+aria-controls="composeSecondaryFormatting"/);
  assert.match(source, /id="composeSecondaryFormatting"[^>]+role="group"[^>]+hidden/);
  assert.match(source, /function setComposeSecondaryFormatting\(expanded, focusFirst\)/);
  assert.match(source, /compose-format-secondary\[hidden\][\s\S]*display: none/);
  assert.match(source, /composeFormatToolbar\.addEventListener\("pointerdown"[\s\S]*state\.composeSelection = range\.cloneRange/);
  assert.match(source, /renderOptions\.preserveSelection \? composeSelectionBookmark\(\) : null/);
  assert.match(source, /restoreComposeSelectionBookmark\(selectionBookmark\)/);
});

test('table editing exposes labels deletion and keyboard cell navigation with mobile-safe scrolling', () => {
  assert.match(source, /data-table-action="removeTable">Видалити таблицю/);
  assert.match(source, /function refreshComposeTableAccessibility\(table\)/);
  assert.match(source, /aria-rowcount/);
  assert.match(source, /"columnheader" : "cell"/);
  assert.match(source, /function moveComposeTableCell\(direction\)/);
  assert.match(source, /event\.key === "Tab" && composeSelectedTableCell\(\)/);
  assert.match(source, /action === "removeTable"[\s\S]*replaceChild\(paragraph, table\)/);
  assert.match(source, /\.compose-editor \{[\s\S]*overflow: auto;[\s\S]*overscroll-behavior: contain;/);
  assert.match(source, /\.compose-table-panel \{[\s\S]*overflow: auto;/);
});
