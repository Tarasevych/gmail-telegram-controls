const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const code = fs.readFileSync(path.join(root, 'Code.gs'), 'utf8');

function makeContext(overrides = {}) {
  const context = vm.createContext({
    console,
    URL,
    Set,
    ...overrides,
  });
  vm.runInContext(code, context);
  return context;
}

test('notifyMessage_ card includes complete sender, Ukrainian sent date, summary, importance, and attachments', () => {
  const translationCalls = [];
  const context = makeContext({
    LanguageApp: {
      translate(value, sourceLanguage, targetLanguage) {
        translationCalls.push({ value, sourceLanguage, targetLanguage });
        return translationCalls.length === 1
          ? 'Потрібно підтвердити платіж на 125 євро сьогодні та використати код перевірки.'
          : 'Підтвердьте платіж сьогодні до 15:00.';
      },
    },
    Session: {
      getScriptTimeZone: () => 'Europe/Brussels',
    },
    Utilities: {
      DigestAlgorithm: { SHA_256: 'SHA_256' },
      Charset: { UTF_8: 'UTF_8' },
      computeDigest(value) {
        return Array.from(crypto.createHash('sha256').update(String(value), 'utf8').digest());
      },
      formatDate(date, timezone, pattern) {
        assert.equal(timezone, 'Europe/Brussels');
        return ({
          u: '3',
          M: '7',
          d: '15',
          "yyyy 'о' HH:mm": '2026 о 13:45',
        })[pattern];
      },
    },
  });
  let sent;
  context.telegramTopicId_ = name => name === 'inbox' ? 321 : null;
  context.sendTelegramText_ = (html, replyMarkup, options) => {
    sent = { html, replyMarkup, options };
    return { message_id: 9001 };
  };

  const result = context.notifyMessage_({
    id: 'message_12345',
    threadId: 'thread_12345',
    from: '"Олена Коваль" <olena.koval@gmail.com>',
    subject: 'Термінове підтвердження платежу',
    sentAt: 'Wed, 15 Jul 2026 11:45:00 GMT',
    timestamp: String(Date.UTC(2026, 6, 15, 11, 45)),
    plain: 'Please confirm the €125 invoice today at 15:00. Your verification code is 123456.',
    html: '',
    snippet: '',
    attachments: [
      {
        partId: '1',
        attachmentId: 'attachment_invoice',
        name: 'рахунок липень.pdf',
        type: 'application/pdf',
        size: 2048,
      },
      {
        partId: '2',
        attachmentId: 'attachment_terms',
        name: 'умови договору.docx',
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        size: 4096,
      },
    ],
    unsubscribe: { available: false, mode: 'none' },
    labelIds: ['INBOX', 'UNREAD'],
  });

  assert.equal(result.message_id, 9001);
  assert.ok(sent, 'notifyMessage_ must send exactly one compact Telegram card');
  assert.match(sent.html, /<b>Термінове підтвердження платежу<\/b>/);
  assert.match(sent.html, /<b>Олена Коваль<\/b>/);
  assert.match(sent.html, /<code>olena\.koval@gmail\.com<\/code>/);
  assert.match(sent.html, /<i>середа, 15 липня 2026 о 13:45<\/i>/);
  assert.match(sent.html, /<blockquote><b>Коротко українською<\/b>\n/);
  assert.match(
    sent.html,
    /Потрібно підтвердити платіж на 125 євро сьогодні та використати код перевірки\./
  );
  assert.match(sent.html, /🔴 <b>висока<\/b> · містить одноразовий код/);
  assert.match(sent.html, /<b>📎 Вкладення<\/b>/);
  assert.match(sent.html, /• рахунок липень\.pdf \(2\.0 КБ\)/);
  assert.match(sent.html, /• умови договору\.docx \(4\.0 КБ\)/);
  assert.equal(sent.options.threadId, 321, 'new mail must be routed to the Inbox topic');
});

test('automatic ADHD focus is promoted to the top of the Telegram card and priority button', () => {
  const context = makeContext({
    Session: { getScriptTimeZone: () => 'Europe/Brussels' },
    PropertiesService: {
      getScriptProperties: () => ({ getProperty: name => name === 'CHAT_ID' ? '427886279' : null }),
    },
    Utilities: {
      formatDate(date, timezone, pattern) {
        return ({ u: '6', M: '7', d: '18', "yyyy 'о' HH:mm": '2026 о 09:30' })[pattern];
      },
    },
  });
  context.mailboxFocusRegistryForCurrentSession_ = () => ({ rules: [] });
  context.mailboxFocusEvaluate_ = (registry, thread) => {
    assert.equal(thread.id, 'thread_focus_notice');
    assert.equal(thread.sender.email, 'worker@example.com');
    return {
      priority: 'critical', label: 'Не пропустити', color: '#d93025', rank: 4,
      source: 'rule', reason: 'Правило: Соціальний працівник',
    };
  };
  context.telegramTopicId_ = () => 321;
  let sent = null;
  context.sendTelegramText_ = (html, markup) => {
    sent = { html, markup: JSON.parse(markup) };
    return { message_id: 9010 };
  };
  context.notifyMessage_({
    id: 'message_focus_notice', threadId: 'thread_focus_notice',
    from: 'Social Worker <worker@example.com>', subject: 'Документи на оплату',
    sentAt: 'Sat, 18 Jul 2026 07:30:00 GMT', timestamp: String(Date.UTC(2026, 6, 18, 7, 30)),
    plain: 'Просимо оплатити рахунок до понеділка.', html: '', snippet: '',
    attachments: [], unsubscribe: { available: false, mode: 'none' }, labelIds: ['INBOX', 'UNREAD'],
  }, {
    userId: '427886279', chatId: '427886279',
    account: { id: 'gmail-owner', email: 'tarasevych.pavlo@gmail.com' },
  });
  assert.ok(sent);
  assert.match(sent.html, /^<b>🔴 Не пропустити<\/b> · Правило: Соціальний працівник/);
  const priority = sent.markup.inline_keyboard.flat()
    .find(button => button.text === '🔴 Не пропустити');
  assert.ok(priority);
  assert.deepEqual({ ...context.parseTelegramFocusCallback_(priority.callback_data) }, {
    action: 'menu', connectionId: 'gmail-owner', messageId: 'message_focus_notice',
  });
});

test('notification analysis prefers a richer HTML alternative over an incomplete plain fallback', () => {
  const context = makeContext({
    LanguageApp: { translate: value => value },
    Session: { getScriptTimeZone: () => 'Europe/Brussels' },
    Utilities: {
      formatDate(date, timezone, pattern) {
        return ({ u: '3', M: '7', d: '15', "yyyy 'о' HH:mm": '2026 о 12:40' })[pattern];
      },
    },
  });
  let sent;
  context.telegramTopicId_ = () => null;
  context.sendTelegramText_ = (html, replyMarkup) => {
    sent = { html, replyMarkup: JSON.parse(replyMarkup) };
    return { message_id: 9002 };
  };

  context.notifyMessage_({
    id: 'message_rich_html',
    threadId: 'thread_rich_html',
    from: 'Notifier <sender@example.com>',
    subject: 'Payment confirmation and access code',
    sentAt: 'Wed, 15 Jul 2026 10:40:00 GMT',
    timestamp: String(Date.UTC(2026, 6, 15, 10, 40)),
    plain: 'Controlled integration test. No action is required.',
    html: '<p>Your verification code is <strong>482731</strong>.</p>' +
      '<p>The amount is <strong>€27.40</strong>. Please review it by 17/07/2026 at 18:00.</p>',
    snippet: '',
    attachments: [],
    unsubscribe: { available: false, mode: 'none' },
    labelIds: ['INBOX'],
  });

  assert.match(sent.html, /<code>482731<\/code>/);
  const copyButton = sent.replyMarkup.inline_keyboard
    .flat()
    .find(button => button.copy_text && button.copy_text.text === '482731');
  assert.ok(copyButton, 'the OTP from the richer HTML alternative must be one-tap copyable');
});

test('analysis keeps decimal amounts intact and ignores explicit no-action statements', () => {
  const context = makeContext({
    LanguageApp: { translate: value => value },
  });
  const analysis = context.analyzeMessage_(
    'Payment update',
    'The payment amount is €31.80, and the review deadline is 18 July 2026 at 16:30. ' +
      'Please review the test details. No action is required.'
  );

  assert.equal(analysis.action, 'Please review the test details.');
  assert.deepEqual(Array.from(analysis.amounts), ['€31.80']);
  assert.deepEqual(Array.from(analysis.deadlines), ['18 July 2026 at 16:30']);

  const informational = context.analyzeMessage_(
    'Information only',
    'Your account remains active. No action is required.'
  );
  assert.equal(informational.action, '');
});

test('analyzeMessage_ translates both the whole-message summary and action to Ukrainian', () => {
  const calls = [];
  const context = makeContext({
    LanguageApp: {
      translate(value, sourceLanguage, targetLanguage) {
        calls.push({ value, sourceLanguage, targetLanguage });
        return `uk:${value}`;
      },
    },
  });

  const analysis = context.analyzeMessage_(
    'Action required for your account',
    'Your subscription remains active until tomorrow at 15:00. Please confirm the updated billing details before then.'
  );

  assert.equal(calls.length, 2, 'summary and actionable conclusion must each be translated');
  assert.ok(calls[0].value.includes('subscription'), 'the first translation must cover message context');
  assert.match(calls[1].value, /Please confirm/i, 'the second translation must cover the action');
  for (const call of calls) {
    assert.equal(call.sourceLanguage, '', 'source language must be auto-detected');
    assert.equal(call.targetLanguage, 'uk', 'all user-facing analysis must target Ukrainian');
  }
  assert.match(analysis.essence, /^uk:/);
  assert.match(analysis.action, /^uk:/);
});

test('OTP keyboard button uses Telegram copy_text for one-tap copying', () => {
  const context = makeContext();
  const keyboard = JSON.parse(context.buildMailKeyboard_(
    'https://mail.google.com/mail/u/0/#all/thread_12345',
    'sender@example.com',
    [{ display: '123 456', value: '123456' }],
    'message_12345',
    { available: false, mode: 'none' },
    'thread_12345',
    ['INBOX']
  ));
  const button = keyboard.inline_keyboard
    .flat()
    .find(item => item.text === '📋 Скопіювати код 123 456');

  assert.ok(button, 'OTP copy button must be present');
  assert.equal(button.copy_text.text, '123456');
  assert.equal(button.callback_data, undefined);
  assert.equal(button.url, undefined);
  assert.equal(button.web_app, undefined);
});

test('Telegram delivery is silent from 22:00 through 07:59 and audible from 08:00 through 21:59', () => {
  let hour = 12;
  const calls = [];
  const context = makeContext({
    PropertiesService: {
      getScriptProperties: () => ({
        getProperty: name => name === 'CHAT_ID' ? '123456' : null,
      }),
    },
    Session: {
      getScriptTimeZone: () => 'Europe/Brussels',
    },
    Utilities: {
      formatDate: (date, timezone, pattern) => {
        assert.equal(timezone, 'Europe/Brussels');
        assert.equal(pattern, 'H');
        return String(hour);
      },
    },
  });
  context.telegramRequest_ = (method, payload) => {
    calls.push({ method, payload });
    return { message_id: calls.length };
  };

  for (const [sampleHour, expectedSilent] of [
    [21, false],
    [22, true],
    [23, true],
    [0, true],
    [7, true],
    [8, false],
    [12, false],
  ]) {
    hour = sampleHour;
    context.sendTelegramText_('<b>Test</b>');
    const call = calls.at(-1);
    assert.equal(call.method, 'sendMessage');
    assert.equal(
      call.payload.disable_notification,
      expectedSilent,
      `hour ${String(sampleHour).padStart(2, '0')}:00 must have disable_notification=${expectedSilent}`
    );
  }
});
