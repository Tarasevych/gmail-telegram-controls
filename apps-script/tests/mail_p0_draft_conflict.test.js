const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const client = fs.readFileSync(path.join(__dirname, '..', 'MailApp.html'), 'utf8');
const server = fs.readFileSync(path.join(__dirname, '..', 'MailClient.gs'), 'utf8');

function functionSource(source, name) {
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

test('server version token is opaque and changes with canonical Gmail draft content', () => {
  const context = vm.createContext({
    mailboxSafeGmailId_: value => String(value || ''),
    mailboxSafeOpaqueToken_: value => String(value || ''),
    mailboxIsPlainObject_: value => Boolean(value && typeof value === 'object' && !Array.isArray(value)),
    mailboxCanonicalOperationValue_: value => value,
    mailboxDigestText_: value => {
      let hash = 0;
      for (const char of String(value)) hash = (Math.imul(hash, 31) + char.charCodeAt(0)) >>> 0;
      return String(hash).padStart(43, 'A').slice(-43);
    },
    JSON,
    Math,
    Number,
    String,
  });
  vm.runInContext(functionSource(server, 'mailboxDraftVersion_'), context);
  const base = {
    id: 'draft-1',
    message: {
      id: 'message-1',
      threadId: 'thread-1',
      historyId: '100',
      payload: { headers: [{ name: 'Subject', value: 'One' }] },
    },
  };
  const first = context.mailboxDraftVersion_(base);
  const second = context.mailboxDraftVersion_(JSON.parse(JSON.stringify(base)));
  const changed = JSON.parse(JSON.stringify(base));
  changed.message.payload.headers[0].value = 'Two';
  assert.match(first, /^[A-Za-z0-9_-]{43}$/);
  assert.equal(first, second);
  assert.notEqual(first, context.mailboxDraftVersion_(changed));
});

test('canonical draft DTO carries only an opaque server version token', () => {
  const dto = functionSource(server, 'mailboxEditableDraftDto_');
  assert.match(dto, /serverVersion:\s*mailboxDraftVersion_/);
  assert.doesNotMatch(dto, /accessToken|refreshToken|initData|etagSecret/);
});

test('existing draft save requires and checks expected version twice before PUT', () => {
  const save = functionSource(server, 'mailboxSaveDraft_');
  assert.match(save, /'expectedVersion'/);
  assert.match(save, /DRAFT_VERSION_REQUIRED/);
  const checks = save.match(/mailboxDraftVersion_\([^)]+\) !== expectedVersion/g) || [];
  assert.equal(checks.length, 2);
  const put = save.indexOf("method: 'put'");
  const lastCheck = save.lastIndexOf('mailboxDraftVersion_');
  assert.ok(lastCheck !== -1 && put > lastCheck, 'the final version check must precede Gmail PUT');
  assert.match(save, /mailboxDraftConflictResponse_\(operation, latestDraft\)/);
});

test('server conflict response is read-only and closes the failed journal reservation', () => {
  const conflict = functionSource(server, 'mailboxDraftConflictResponse_');
  assert.match(conflict, /mailboxDraftResponseFromFull_/);
  assert.match(conflict, /mailboxFailDraftOperation_/);
  assert.match(conflict, /conflict:\s*true/);
  assert.doesNotMatch(conflict, /gmailApiRequest_|method:\s*['"]put|method:\s*['"]post/);
});

test('client persists expected version through encrypted recovery and save payload', () => {
  const recovery = functionSource(client, 'p0ComposeRecoveryValue');
  const normalize = functionSource(client, 'normalizeDraft');
  const payload = functionSource(client, 'composePayload');
  const translate = functionSource(client, 'translateRpcRequest');
  assert.match(recovery, /serverVersion/);
  assert.match(normalize, /serverVersion/);
  assert.match(payload, /expectedVersion:\s*safeText\(draft\.serverVersion\)/);
  assert.match(translate, /expectedVersion:\s*safeText\(draft\.expectedVersion\)/);
  assert.match(translate, /Оновіть Gmail-чернетку перед збереженням/);
});

test('client exposes explicit local-or-Gmail conflict choice without retry loop', () => {
  const save = functionSource(client, 'saveDraft');
  const controls = functionSource(client, 'p0RenderDraftConflictControls');
  assert.match(save, /data && data\.conflict && data\.draft/);
  assert.match(save, /normalizeDraft\(data\.draft, "draft", \{ skipRecovery: true \}\)/);
  assert.match(save, /p0Runtime\.composeConflict/);
  assert.match(save, /draftSaveDeferred = true/);
  assert.match(save, /typeof p0Runtime === "object"[\s\S]*p0Runtime\.composeConflict/);
  assert.match(controls, /Залишити локальну/);
  assert.match(controls, /Використати Gmail/);
  assert.match(controls, /conflict && conflict\.server && conflict\.server\.serverVersion/);
  assert.ok(
    controls.indexOf('state.compose.serverVersion') < controls.indexOf('scheduleComposeAutosave(0)'),
    'an explicit local choice must adopt the latest server token before retry',
  );
});
