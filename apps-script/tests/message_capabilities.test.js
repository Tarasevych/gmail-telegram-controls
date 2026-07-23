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

function gmailUrlContext(state) {
  const context = vm.createContext({
    state,
    safeText: (value, fallback) => value === undefined || value === null ? String(fallback || '') : String(value),
    safeId: value => /^[A-Za-z0-9_-]+$/.test(String(value || '')) ? String(value) : '',
    Array,
    encodeURIComponent,
  });
  vm.runInContext([
    functionSource('currentGmailAccountIdentity'),
    functionSource('accountCorrectGmailUrl'),
  ].join('\n'), context);
  return context;
}

test('desktop and mobile expose one primary message-action surface each', () => {
  assert.match(source, /\.reader-actionbar\s*\{[\s\S]*?display:\s*none;/);
  assert.match(source, /@media[\s\S]*?\.reader-actionbar\s*\{[\s\S]*?display:\s*flex;/);
  assert.match(source, /\.conversation-actions\s*\{\s*display:\s*none;/);
  assert.match(source, /\.thread-toolbar \.toolbar-button:not\(\[aria-controls="moreMenu"\]\)\s*\{\s*display:\s*none;/);
  assert.match(functionSource('buildThreadToolbar'), /primaryLabels = \["Редагувати чернетку", "Відповісти", "Переслати", "Ще"\]/);
  assert.match(functionSource('buildMobileActionBar'), /"Відповісти"/);
});

test('Gmail handoff binds a stable connection before using the account email', () => {
  const context = gmailUrlContext({
    thread: { accountId: 'connection-b', gmailUrl: 'https://mail.google.com/mail/u/0/#inbox/thread-b' },
    account: { id: 'connection-a', email: 'first@example.invalid' },
    accounts: [
      { id: 'connection-a', email: 'first@example.invalid' },
      { id: 'connection-b', email: 'second@example.invalid' },
    ],
  });
  assert.equal(
    context.accountCorrectGmailUrl('#inbox/thread-b'),
    'https://mail.google.com/mail/?authuser=second%40example.invalid#inbox/thread-b'
  );
  assert.doesNotMatch(functionSource('accountCorrectGmailUrl'), /\/u\/0/);
});

test('Gmail handoff fails closed when no exact account can be established', () => {
  const context = gmailUrlContext({
    thread: { accountId: 'missing' },
    account: { id: 'other', email: 'other@example.invalid' },
    accounts: [{ id: 'other', email: 'other@example.invalid' }],
  });
  assert.equal(context.accountCorrectGmailUrl('#inbox'), '');
  assert.doesNotMatch(source, /openSafeUrl\(state\.thread\.gmailUrl/);
});

test('progressive More menu separates API actions from honest Gmail boundaries', () => {
  const more = functionSource('toggleMoreMenu');
  [
    'Відкрити в Gmail',
    'Друк через Gmail',
    'Фільтрувати схожі листи',
    'Перекласти в Gmail',
    'Показати оригінал або .eml',
    'Повідомити про фішинг',
    'Надіслати відгук',
  ].forEach(label => assert.match(more, new RegExp(label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))));
  assert.doesNotMatch(more, /changeThreadAction\("(?:phishing|translate|print|raw|feedback)"/);
  assert.match(more, /Gmail API не надає безпечного контракту/);
});

test('settings capability hub covers all requested sections without a parallel account model', () => {
  const hub = functionSource('buildGmailCapabilityHub');
  [
    'Загальні',
    'Мітки',
    'Вхідні',
    'Акаунти й імпорт',
    'Фільтри',
    'Пересилання, POP та IMAP',
    'Додатки',
    'Chat і Meet',
    'Розширені',
    'Офлайн',
    'Теми',
  ].forEach(label => assert.match(hub, new RegExp(label)));
  assert.match(hub, /aria-describedby/);
  assert.match(hub, /aria-label/);
  assert.match(hub, /openGmailSettingsSection\(row\[3\]\)/);
  assert.doesNotMatch(hub, /localStorage|sessionStorage|activeAccount\s*=/);
});

test('settings links are account-correct and allowlisted', () => {
  const settings = functionSource('openGmailSettingsSection');
  assert.match(settings, /general:\s*"#settings\/general"/);
  assert.match(settings, /forwarding:\s*"#settings\/fwdandpop"/);
  assert.match(settings, /offline:\s*"#settings\/offline"/);
  assert.match(settings, /accountCorrectGmailUrl\(sections\[section\] \|\| ""\)/);
  assert.match(settings, /Не вдалося однозначно визначити Gmail-акаунт/);
  assert.doesNotMatch(settings, /\/u\/0|window\.open/);
});
