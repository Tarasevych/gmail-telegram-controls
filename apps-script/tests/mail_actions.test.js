const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const code = fs.readFileSync(path.join(root, 'Code.gs'), 'utf8');
const miniAppSource = fs.readFileSync(path.join(root, '..', 'index.html'), 'utf8');
const context = vm.createContext({
  console,
  URL,
  Set,
});
vm.runInContext(code, context);

function memoryProperties(store = {}) {
  return {
    store,
    service: {
      getScriptProperties: () => ({
        getProperty: name => Object.prototype.hasOwnProperty.call(store, name) ? store[name] : null,
        getProperties: () => ({ ...store }),
        setProperty: (name, value) => { store[name] = String(value); },
        deleteProperty: name => { delete store[name]; },
      }),
    },
  };
}

function immediateScriptLock() {
  const createLock = () => ({ tryLock: () => true, releaseLock: () => {} });
  return {
    getScriptLock: createLock,
    getUserLock: createLock,
  };
}

function boxOAuthEvent(values = {}, parameterOverrides = {}) {
  const parameter = { action: 'box_oauth_callback', ...values };
  const parameters = Object.fromEntries(
    Object.entries(parameter).map(([name, value]) => [name, [String(value)]])
  );
  Object.assign(parameters, parameterOverrides);
  return { parameter, parameters };
}

function capturingHtmlService(outputs) {
  return {
    createHtmlOutput(html) {
      const output = {
        html: String(html),
        title: '',
        setTitle(title) {
          this.title = String(title);
          return this;
        },
      };
      outputs.push(output);
      return output;
    },
  };
}

function plainJsonValue(value) {
  return JSON.parse(JSON.stringify(value));
}

function headers(values) {
  return Object.entries(values).flatMap(([name, value]) =>
    (Array.isArray(value) ? value : [value]).map(item => ({ name, value: item }))
  );
}

function fakeFetchResponse(status, body = '', responseHeaders = {}) {
  return {
    getResponseCode: () => status,
    getContentText: () => body,
    getAllHeaders: () => ({ ...responseHeaders }),
    getHeaders: () => ({ ...responseHeaders }),
  };
}

function unsubscribeFetchHarness(dnsAnswers, responses = []) {
  const calls = [];
  let responseIndex = 0;
  return {
    calls,
    fetch(url, options = {}) {
      const value = String(url);
      const parsed = new URL(value);
      if (parsed.hostname === 'dns.google' && parsed.pathname === '/resolve') {
        const host = parsed.searchParams.get('name');
        const type = Number(parsed.searchParams.get('type'));
        const configured = dnsAnswers[host] || {};
        const addresses = configured[type] || [];
        calls.push({ kind: 'dns', host, type, options });
        return fakeFetchResponse(200, JSON.stringify({
          Status: 0,
          Answer: addresses.map(address => ({ name: host + '.', type, data: address })),
        }));
      }
      calls.push({ kind: 'post', url: value, options });
      const response = responses[responseIndex++] || { status: 204 };
      return fakeFetchResponse(response.status, response.body || '', response.headers || {});
    },
  };
}
test('only safe public HTTPS unsubscribe targets are accepted', () => {
  assert.equal(context.isSafePublicHttpsUrl_('https://news.example.com/u?id=1'), 'https://news.example.com/u?id=1');
  assert.equal(context.isSafePublicHttpsUrl_('http://news.example.com/u'), '');
  assert.equal(context.isSafePublicHttpsUrl_('https://localhost/u'), '');
  assert.equal(context.isSafePublicHttpsUrl_('https://127.0.0.1/u'), '');
  assert.equal(context.isSafePublicHttpsUrl_('https://0x7f.0.0.1/u'), '');
  assert.equal(context.isSafePublicHttpsUrl_('https://0177.0.0.1/u'), '');
  assert.equal(context.isSafePublicHttpsUrl_('https://router.home/u'), '');
  assert.equal(context.isSafePublicHttpsUrl_('https://user:pass@example.com/u'), '');
  assert.equal(context.isSafePublicHttpsUrl_('https://example.com:8443/u'), '');
  assert.equal(context.isSafePublicHttpsUrl_('https://example.com:443/u'), '');
  assert.equal(context.isSafePublicHttpsUrl_('https://example.com:/u'), '');
  assert.equal(context.isSafePublicHttpsUrl_('https://127.0.0.1.nip.io/u'), '');
  assert.equal(context.isSafePublicHttpsUrl_('https://127.0.0.1.sslip.io/u'), '');
  assert.equal(context.isSafePublicHttpsUrl_('https://localtest.me/u'), '');
  assert.equal(context.isSafePublicHttpsUrl_('https://app.lvh.me/u'), '');
});

test('one-click POST validates public DNS and sends only the RFC 8058 form payload', () => {
  const original = context.UrlFetchApp;
  const fetcher = unsubscribeFetchHarness({
    'news.example.com': {
      1: ['93.184.216.34'],
      28: ['2606:2800:220:1:248:1893:25c8:1946'],
    },
  });
  try {
    context.UrlFetchApp = fetcher;
    const response = context.performOneClickUnsubscribe_('https://news.example.com/u/opaque#ignored');
    assert.equal(response.getResponseCode(), 204);
    const posts = fetcher.calls.filter(call => call.kind === 'post');
    assert.equal(posts.length, 1);
    assert.equal(posts[0].url, 'https://news.example.com/u/opaque');
    assert.deepEqual(plainJsonValue(posts[0].options), {
      method: 'post',
      contentType: 'application/x-www-form-urlencoded',
      payload: 'List-Unsubscribe=One-Click',
      followRedirects: false,
      validateHttpsCertificates: true,
      muteHttpExceptions: true,
    });
  } finally {
    context.UrlFetchApp = original;
  }
});

test('one-click POST blocks special-use and mixed DNS answers before contacting the target', () => {
  const original = context.UrlFetchApp;
  const cases = [
    ['loopback', { 1: ['127.0.0.1'] }],
    ['private', { 1: ['10.0.0.8'] }],
    ['CGNAT', { 1: ['100.64.0.1'] }],
    ['metadata', { 1: ['169.254.169.254'] }],
    ['IPv6 loopback', { 28: ['::1'] }],
    ['IPv6 link-local', { 28: ['fe80::1'] }],
    ['IPv6 ULA', { 28: ['fd00::1'] }],
    ['mixed rebinding-style', { 1: ['93.184.216.34', '192.168.1.20'] }],
    ['no address', {}],
  ];
  try {
    for (const [label, answers] of cases) {
      const fetcher = unsubscribeFetchHarness({ 'news.example.com': answers });
      context.UrlFetchApp = fetcher;
      assert.throws(
        () => context.performOneClickUnsubscribe_('https://news.example.com/u/opaque'),
        /безпеч|публіч|DNS|адрес/i,
        label
      );
      assert.equal(fetcher.calls.filter(call => call.kind === 'post').length, 0, label);
    }
  } finally {
    context.UrlFetchApp = original;
  }
});

test('one-click DNS verification fails closed on resolver errors and truncated data', () => {
  const original = context.UrlFetchApp;
  const failures = [
    fakeFetchResponse(503),
    fakeFetchResponse(200, 'not-json'),
    fakeFetchResponse(200, JSON.stringify({ Status: 2 })),
    fakeFetchResponse(200, JSON.stringify({
      Status: 0,
      TC: true,
      Answer: [{ type: 1, data: '93.184.216.34' }],
    })),
  ];
  try {
    for (const response of failures) {
      let calls = 0;
      context.UrlFetchApp = {
        fetch: () => {
          calls += 1;
          return response;
        },
      };
      assert.throws(
        () => context.performOneClickUnsubscribe_('https://news.example.com/u/opaque'),
        /безпеч|публіч|DNS|адрес/i
      );
      assert.equal(calls, 1);
    }
  } finally {
    context.UrlFetchApp = original;
  }
});
test('one-click rejects every redirect without resolving or contacting its Location', () => {
  const originals = {
    UrlFetchApp: context.UrlFetchApp,
    unsubscribeInfoFromHeaders_: context.unsubscribeInfoFromHeaders_,
    beginUnsubscribeClaim_: context.beginUnsubscribeClaim_,
    finishUnsubscribeClaim_: context.finishUnsubscribeClaim_,
    hashedMessageId_: context.hashedMessageId_,
  };
  const finished = [];
  try {
    context.unsubscribeInfoFromHeaders_ = () => ({
      available: true,
      mode: 'one_click',
      url: 'https://news.example.com/u',
    });
    context.beginUnsubscribeClaim_ = () => ({ claimed: true, alreadySent: false });
    context.finishUnsubscribeClaim_ = (messageId, success) => {
      finished.push([messageId, success]);
      return true;
    };
    context.hashedMessageId_ = () => 'test-hash';

    for (const status of [301, 302, 303, 307, 308]) {
      const fetcher = unsubscribeFetchHarness({
        'news.example.com': { 1: ['93.184.216.34'] },
        'redirect.example': { 1: ['127.0.0.1'] },
      }, [{ status, headers: { Location: 'https://redirect.example/private' } }]);
      context.UrlFetchApp = fetcher;
      assert.throws(
        () => context.executeUnsubscribe_({ headers: [] }, 'redirect-' + status, 'Redirect'),
        new RegExp('HTTP ' + status)
      );
      assert.equal(fetcher.calls.filter(call => call.kind === 'post').length, 1, String(status));
      assert.deepEqual(
        fetcher.calls.filter(call => call.kind === 'dns').map(call => call.host),
        ['news.example.com', 'news.example.com'],
        String(status)
      );
    }
    assert.deepEqual(plainJsonValue(finished), [301, 302, 303, 307, 308]
      .map(status => ['redirect-' + status, false]));
  } finally {
    Object.assign(context, originals);
  }
});
test('RFC 8058 one-click requires HTTPS, post header, DKIM pass, and signed headers', () => {
  const valid = headers({
    'List-Unsubscribe': '<mailto:list@example.com?subject=unsubscribe>, <https://news.example.com/u/opaque>',
    'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
    'DKIM-Signature': 'v=1; d=news.example.com; s=mail; h=from:to:subject:list-unsubscribe:list-unsubscribe-post; b=abc',
    'Authentication-Results': 'mx.google.com; dkim=pass header.i=@news.example.com header.d=news.example.com header.s=mail header.b=abc',
  });
  const info = context.unsubscribeInfoFromHeaders_(valid);
  assert.equal(info.available, true);
  assert.equal(info.mode, 'one_click');
  assert.equal(info.url, 'https://news.example.com/u/opaque');

  const gmailStyleIdentityOnly = valid.map(header => header.name === 'Authentication-Results'
    ? {
        ...header,
        value: 'mx.google.com; dkim=pass header.i=@news.example.com header.s=mail header.b=abc',
      }
    : header);
  assert.equal(context.unsubscribeInfoFromHeaders_(gmailStyleIdentityOnly).mode, 'one_click');

  const mismatchedIdentity = gmailStyleIdentityOnly.map(header =>
    header.name === 'Authentication-Results'
      ? { ...header, value: header.value.replace('@news.example.com', '@attacker.example') }
      : header);
  assert.equal(context.unsubscribeInfoFromHeaders_(mismatchedIdentity).mode, 'web');

  const noDkim = valid.filter(header => header.name !== 'Authentication-Results');
  assert.equal(context.unsubscribeInfoFromHeaders_(noDkim).mode, 'web');

  const notSigned = valid.map(header => header.name === 'DKIM-Signature'
    ? { ...header, value: 'v=1; d=news.example.com; h=from:to:subject; b=abc' }
    : header);
  assert.equal(context.unsubscribeInfoFromHeaders_(notSigned).mode, 'web');

  const mixedSignatures = headers({
    'List-Unsubscribe': '<https://news.example.com/u/opaque>',
    'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
    'DKIM-Signature': [
      'v=1; d=news.example.com; s=real; h=from:to:subject; b=verifiedSignature',
      'v=1; d=news.example.com; s=fake; h=from:to:subject:list-unsubscribe:list-unsubscribe-post; b=unverifiedSignature',
    ],
    'Authentication-Results': 'mx.google.com; dkim=pass header.d=news.example.com header.s=real header.b=verified',
  });
  assert.equal(context.unsubscribeInfoFromHeaders_(mixedSignatures).mode, 'web');

  const duplicateUnsubscribe = headers({
    'List-Unsubscribe': [
      '<https://attacker.example/u/opaque>',
      '<https://news.example.com/u/opaque>',
    ],
    'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
    'DKIM-Signature': 'v=1; d=news.example.com; s=mail; h=from:to:subject:list-unsubscribe:list-unsubscribe-post; b=abc',
    'Authentication-Results': 'mx.google.com; dkim=pass header.d=news.example.com header.s=mail header.b=abc',
  });
  assert.equal(context.unsubscribeInfoFromHeaders_(duplicateUnsubscribe).mode, 'web');

  const multipleUris = headers({
    'List-Unsubscribe': '<https://first.example/u>, <https://second.example/u>',
    'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
    'DKIM-Signature': 'v=1; d=first.example; s=mail; h=from:to:subject:list-unsubscribe:list-unsubscribe-post; b=abc',
    'Authentication-Results': 'mx.google.com; dkim=pass header.d=first.example header.s=mail header.b=abc',
  });
  assert.equal(context.unsubscribeInfoFromHeaders_(multipleUris).mode, 'web');

  const contradictoryAuth = valid.map(header => header.name === 'Authentication-Results'
    ? {
        ...header,
        value: 'mx.google.com; dkim=fail header.d=news.example.com header.s=mail header.b=abc; ' +
          'dkim=pass header.d=news.example.com header.s=mail header.b=abc',
      }
    : header);
  assert.equal(context.unsubscribeInfoFromHeaders_(contradictoryAuth).mode, 'web');

  const duplicateAuth = valid.concat(headers({
    'Authentication-Results': 'mx.google.com; dkim=pass header.d=news.example.com header.s=mail header.b=abc',
  }));
  assert.equal(context.unsubscribeInfoFromHeaders_(duplicateAuth).mode, 'web');
});

test('mailto fallback opens a user-reviewed Gmail compose URL', () => {
  const info = context.unsubscribeInfoFromHeaders_(headers({
    'List-Unsubscribe': '<mailto:list@example.com?subject=remove%20me&body=unsubscribe%20please>',
  }));
  assert.equal(info.available, true);
  assert.equal(info.mode, 'mailto');
  assert.match(info.openUrl, /^https:\/\/mail\.google\.com\/mail\//);
  assert.match(info.openUrl, /to=list%40example\.com/);
});

test('mail cards use native callbacks for actions and show conditional unsubscribe', () => {
  const keyboard = JSON.parse(context.buildMailKeyboard_(
    'https://mail.google.com/mail/u/0/#all/thread',
    'sender@example.com',
    [],
    'abcde12345',
    { available: true, mode: 'one_click' }
  ));
  const buttons = keyboard.inline_keyboard.flat();
  const texts = buttons.map(button => button.text);
  assert.ok(texts.includes('🗄 Архівувати'));
  assert.ok(texts.includes('🗑 Видалити'));
  assert.ok(texts.includes('🚫 Спам'));
  assert.ok(texts.includes('🔕 Відписатися'));
  for (const text of ['🗄 Архівувати', '🗑 Видалити', '🚫 Спам', '🔕 Відписатися', '📎 Оригінал .eml']) {
    const button = buttons.find(item => item.text === text);
    assert.ok(button.callback_data, `${text} must use callback_data`);
    assert.equal(button.web_app, undefined, `${text} must not open a Mini App`);
    assert.ok(Buffer.byteLength(button.callback_data, 'utf8') <= 64);
  }

  const webUnsubscribe = JSON.parse(context.buildMailKeyboard_(
    'https://mail.google.com/mail/u/0/#all/thread',
    'sender@example.com',
    [],
    'abcde12345',
    { available: true, mode: 'web', openUrl: 'https://news.example.com/unsubscribe' }
  )).inline_keyboard.flat().find(button => button.text === '🔕 Відписатися');
  assert.equal(webUnsubscribe.url, 'https://news.example.com/unsubscribe');
});

test('unsupported unsubscribe stays visible and returns a non-mutating callback', () => {
  const buildButtons = unsubscribe => JSON.parse(context.buildMailKeyboard_(
    'https://mail.google.com/mail/u/0/#all/thread',
    'sender@example.com',
    [],
    'abcde12345',
    unsubscribe
  )).inline_keyboard.flat();

  for (const unsupported of [
    undefined,
    { available: false, mode: 'none' },
    { available: true, mode: 'web', openUrl: 'http://unsafe.example/u' },
    { available: true, mode: 'web', openUrl: 'https://localhost/u' },
  ]) {
    const unavailable = buildButtons(unsupported)
      .filter(button => button.text === '▫️ Відписка недоступна');
    assert.equal(unavailable.length, 1);
    assert.equal(unavailable[0].callback_data, 'mail.unsub_na');
  }

  const mailto = context.unsubscribeInfoFromHeaders_(headers({
    'List-Unsubscribe': '<mailto:list@example.com?subject=unsubscribe>',
  }));
  const button = buildButtons(mailto).find(item => item.text === '🔕 Відписатися');
  assert.match(button.url, /^https:\/\/mail\.google\.com\/mail\//);
  assert.equal(button.callback_data, undefined);
  assert.equal(button.web_app, undefined);
});

test('legacy Mini App endpoint still requires a server-side confirmed flag', () => {
  const original = context.executeMailboxAction_;
  try {
    context.executeMailboxAction_ = (action, id) => ({ ok: true, message: `${action}:${id}` });
    assert.throws(
      () => context.executeControlAction_('archive', 'abcde12345', ''),
      /підтвердження/i
    );
    assert.deepEqual(
      { ...context.executeControlAction_('archive', 'abcde12345', '1') },
      { ok: true, message: 'archive:abcde12345' }
    );
  } finally {
    context.executeMailboxAction_ = original;
  }
});

test('mailbox mutations require signed Telegram initData in addition to the private key', () => {
  const originals = {
    validateControlToken_: context.validateControlToken_,
    validateTelegramMiniApp_: context.validateTelegramMiniApp_,
    executeControlAction_: context.executeControlAction_,
  };
  try {
    context.validateControlToken_ = () => {};
    context.validateTelegramMiniApp_ = value => {
      if (!value) throw new Error('missing Telegram signature');
    };
    context.executeControlAction_ = action => ({ ok: true, message: action });

    assert.throws(
      () => context.handlePrivateWebAction_('trash', 'abcde12345', 'private-key', '', '1'),
      /Telegram signature/
    );
    assert.equal(
      context.handlePrivateWebAction_('trash', 'abcde12345', 'private-key', 'signed', '1').message,
      'trash'
    );
    assert.equal(
      context.handlePrivateWebAction_('check', '', 'private-key', '', '').message,
      'check'
    );
  } finally {
    Object.assign(context, originals);
  }
});

test('archive, trash, and spam use message-level reversible Gmail operations', () => {
  const calls = [];
  const originals = {
    LockService: context.LockService,
    recordMailboxAction_: context.recordMailboxAction_,
    gmailApiRequest_: context.gmailApiRequest_,
    getMailboxActionMetadata_: context.getMailboxActionMetadata_,
  };
  try {
    context.LockService = {
      getScriptLock: () => ({ tryLock: () => true, releaseLock: () => {} }),
    };
    context.recordMailboxAction_ = () => {};
    context.gmailApiRequest_ = (requestPath, options) => {
      calls.push({ requestPath, options });
      return {};
    };

    context.getMailboxActionMetadata_ = () => ({ labelIds: ['INBOX'], subject: 'Test', headers: [] });
    context.executeMailboxAction_('archive', 'abcde12345');
    assert.equal(calls.at(-1).requestPath, '/messages/abcde12345/modify');
    assert.deepEqual(JSON.parse(JSON.stringify(calls.at(-1).options.body)), { removeLabelIds: ['INBOX'] });

    context.executeMailboxAction_('trash', 'abcde12345');
    assert.equal(calls.at(-1).requestPath, '/messages/abcde12345/trash');

    context.executeMailboxAction_('spam', 'abcde12345');
    assert.equal(calls.at(-1).requestPath, '/messages/abcde12345/modify');
    assert.deepEqual(JSON.parse(JSON.stringify(calls.at(-1).options.body)), {
      addLabelIds: ['SPAM'],
      removeLabelIds: ['INBOX'],
    });
  } finally {
    Object.assign(context, originals);
  }
});

test('one-click unsubscribe is claimed idempotently without holding the shared lock during POST', () => {
  const store = {};
  let held = false;
  let fetchCount = 0;
  const originals = {
    PropertiesService: context.PropertiesService,
    LockService: context.LockService,
    UrlFetchApp: context.UrlFetchApp,
    recordMailboxAction_: context.recordMailboxAction_,
  };
  const props = {
    getProperty: name => Object.prototype.hasOwnProperty.call(store, name) ? store[name] : null,
    setProperty: (name, value) => { store[name] = String(value); },
  };
  try {
    context.PropertiesService = { getScriptProperties: () => props };
    context.LockService = {
      getScriptLock: () => ({
        tryLock: () => {
          if (held) return false;
          held = true;
          return true;
        },
        releaseLock: () => { held = false; },
      }),
    };
    context.UrlFetchApp = {
      fetch: (url) => {
        assert.equal(held, false, 'outbound unsubscribe network work must run after releasing ScriptLock');
        const parsed = new URL(String(url));
        if (parsed.hostname === 'dns.google') {
          const type = Number(parsed.searchParams.get('type'));
          return fakeFetchResponse(200, JSON.stringify({
            Status: 0,
            Answer: type === 1
              ? [{ name: 'news.example.com.', type: 1, data: '93.184.216.34' }]
              : [],
          }));
        }
        fetchCount += 1;
        return fakeFetchResponse(204);
      },
    };
    context.recordMailboxAction_ = () => {};

    const metadata = {
      headers: headers({
        'List-Unsubscribe': '<https://news.example.com/u/opaque>',
        'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
        'DKIM-Signature': 'v=1; d=news.example.com; s=mail; h=from:to:subject:list-unsubscribe:list-unsubscribe-post; b=abc',
        'Authentication-Results': 'mx.google.com; dkim=pass header.d=news.example.com header.s=mail header.b=abc',
      }),
    };
    assert.match(context.executeUnsubscribe_(metadata, 'abcde12345', 'Test').message, /прийнято/i);
    assert.equal(fetchCount, 1);
    assert.equal(held, false);
    assert.equal(store.UNSUBSCRIBE_STATE_abcde12345, 'sent');
    assert.match(context.executeUnsubscribe_(metadata, 'abcde12345', 'Test').message, /вже надсилали/i);
    assert.equal(fetchCount, 1, 'a repeated action must not send a second POST');
  } finally {
    Object.assign(context, originals);
  }
});

test('manifest requests gmail.modify without full-mail or send scope', () => {
  const manifest = JSON.parse(fs.readFileSync(path.join(root, 'appsscript.json'), 'utf8'));
  assert.ok(manifest.oauthScopes.includes('https://www.googleapis.com/auth/gmail.modify'));
  assert.ok(!manifest.oauthScopes.includes('https://www.googleapis.com/auth/gmail.readonly'));
  assert.ok(!manifest.oauthScopes.includes('https://mail.google.com/'));
  assert.ok(!manifest.oauthScopes.includes('https://www.googleapis.com/auth/gmail.send'));
});

test('legacy Mini App auto-runs mailbox actions without rendering a confirmation screen', () => {
  const html = fs.readFileSync(path.join(root, '..', 'index.html'), 'utf8');
  const inlineScripts = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)];
  assert.ok(inlineScripts.length > 0);
  assert.doesNotThrow(() => new Function(inlineScripts.at(-1)[1]));
  assert.match(html, /const mailboxActions = new Set/);
  assert.match(html, /backend\.searchParams\.set\('confirmed', '1'\)/);
  assert.doesNotMatch(html, /confirmActions|Видалити цей лист\?|Підтвердити/);
  assert.match(html, /startRequest\(\);/);
});

test('webhook setup uses native callbacks and a direct HtmlService 2xx response', () => {
  assert.match(code, /telegramRequest_\('setWebhook'/);
  assert.match(code, /WEBHOOK_REVISION:\s*'[^']+'/);
  assert.match(code, /function nativeWebhookUrl_\(webhookKey\)[\s\S]*?['"]&rev=['"]/);
  assert.match(code, /allowed_updates:\s*JSON\.stringify\(\['message', 'callback_query'\]\)/);
  assert.match(code, /drop_pending_updates:\s*!nativeWebhookWasReady/);
  assert.match(code, /function webhookOk_\(\)[\s\S]*?HtmlService\.createHtmlOutput\('ok'\)/);
  assert.match(code, /function verifyWebhookTransport_\(\)[\s\S]*?followRedirects:\s*false/);
  assert.doesNotMatch(code, /telegramRequest_\('deleteWebhook'/);
});

test('Telegram transport loss is marked uncertain only for non-idempotent creates', () => {
  const memory = memoryProperties({ BOT_TOKEN: 'test-token' });
  const originals = {
    PropertiesService: context.PropertiesService,
    UrlFetchApp: context.UrlFetchApp,
  };
  try {
    context.PropertiesService = memory.service;
    context.UrlFetchApp = { fetch: () => { throw new Error('network vanished'); } };
    assert.throws(
      () => context.telegramRequest_('sendMessage', { chat_id: '123', text: 'x' }),
      error => error.telegramOutcomeUncertain === true && error.telegramHttpStatus === 0
    );
    assert.throws(
      () => context.telegramRequest_('getMe', {}),
      error => error.telegramOutcomeUncertain === false && error.telegramHttpStatus === 0
    );
  } finally {
    Object.assign(context, originals);
  }
});

test('mail checks cannot block Telegram callback deduplication', () => {
  const mailCheck = code.match(/function runMailCheck_\(source\)\s*\{([\s\S]*?)\n\}/);
  const callbackClaim = code.match(/function claimTelegramUpdate_\(updateId, update\)\s*\{([\s\S]*?)\n\}/);
  assert.ok(mailCheck, 'runMailCheck_ must exist');
  assert.ok(callbackClaim, 'claimTelegramUpdate_ must exist');
  assert.match(mailCheck[1], /LockService\.getUserLock\(\)/);
  assert.doesNotMatch(mailCheck[1], /LockService\.getScriptLock\(\)/);
  assert.match(callbackClaim[1], /LockService\.getScriptLock\(\)/);
});

test('topic setup network cannot block Telegram callback deduplication', () => {
  const topicLock = code.match(/function telegramTopicSetupLock_\(\)\s*\{([\s\S]*?)\n\}/);
  const topicSetup = code.match(/function ensureTelegramMailTopics_\(\)\s*\{([\s\S]*?)\n\}/);
  const callbackClaim = code.match(/function claimTelegramUpdate_\(updateId, update\)\s*\{([\s\S]*?)\n\}/);
  assert.ok(topicLock && topicSetup && callbackClaim, 'topic and webhook lock regions must exist');
  assert.match(topicLock[1], /LockService\.getUserLock\(\)/);
  assert.doesNotMatch(topicLock[1], /LockService\.getScriptLock\(\)/);
  assert.match(topicSetup[1], /telegramTopicSetupLock_\(\)/);
  assert.match(topicSetup[1], /telegramRequest_\(/);
  assert.doesNotMatch(topicSetup[1], /LockService\.getScriptLock\(\)/);
  assert.match(callbackClaim[1], /LockService\.getScriptLock\(\)/);
  assert.doesNotMatch(callbackClaim[1], /LockService\.getUserLock\(\)/);
});


test('a poison notification is quarantined, later pages advance, and retry eventually delivers it', () => {
  const memory = memoryProperties({
    BOT_TOKEN: 'test-token', CHAT_ID: '123', STARTED_AT: '1000', SEEN_MESSAGE_IDS: '[]',
    GMAIL_NOTIFICATION_WATERMARK_MS: '1000',
    GMAIL_NOTIFICATION_SCAN_V1: JSON.stringify({
      version: 1, lowerBoundMs: 1000, upperBoundMs: 4000, pageToken: '', page: 0,
      pass: 0, passNewCount: 0, verificationPass: false, createdAt: 5000,
    }),
  });
  const originals = {
    PropertiesService: context.PropertiesService,
    LockService: context.LockService,
    gmailNotificationScanState_: context.gmailNotificationScanState_,
    listGmailNotificationPage_: context.listGmailNotificationPage_,
    getGmailMessage_: context.getGmailMessage_,
    notifyMessage_: context.notifyMessage_,
    hashedMessageId_: context.hashedMessageId_,
  };
  const delivered = [];
  let poisonFails = true;
  try {
    context.PropertiesService = memory.service;
    context.LockService = {
      getUserLock: () => ({ tryLock: () => true, releaseLock: () => {} }),
    };
    context.listGmailNotificationPage_ = scan => String(scan.pageToken || '') === 'page_2'
      ? { ids: ['later12345'], nextPageToken: '' }
      : { ids: ['poison12345', 'healthy12345'], nextPageToken: 'page_2' };
    context.getGmailMessage_ = id => ({
      id,
      timestamp: id === 'poison12345' ? 2000 : 3000,
      labelIds: ['INBOX'],
    });
    context.notifyMessage_ = message => {
      if (message.id === 'poison12345' && poisonFails) throw new Error('synthetic delivery failure');
      delivered.push(message.id);
      return { message_id: delivered.length };
    };
    context.hashedMessageId_ = id => `hash:${id}`;
    const first = context.runMailCheck_('timer');
    assert.deepEqual(
      { ...first },
      {
        busy: false, delivered: 1, failed: 1, uncertain: 0, quarantined: 1,
        deadLettered: 0, deadLetteredTotal: 0, retryPending: 1, pending: true,
      }
    );
    assert.deepEqual(delivered, ['healthy12345']);
    assert.deepEqual(JSON.parse(memory.store.SEEN_MESSAGE_IDS), ['healthy12345']);
    assert.equal(JSON.parse(memory.store.GMAIL_NOTIFICATION_QUARANTINE_V1)[0][0], 'poison12345');
    assert.equal(JSON.parse(memory.store.GMAIL_NOTIFICATION_SCAN_V1).pageToken, 'page_2');

    const second = context.runMailCheck_('timer');
    assert.equal(second.delivered, 1);
    assert.deepEqual(delivered, ['healthy12345', 'later12345']);
    assert.equal(JSON.parse(memory.store.GMAIL_NOTIFICATION_SCAN_V1).verificationPass, true);

    const quarantine = JSON.parse(memory.store.GMAIL_NOTIFICATION_QUARANTINE_V1);
    quarantine[0][2] = 0;
    memory.store.GMAIL_NOTIFICATION_QUARANTINE_V1 = JSON.stringify(quarantine);
    poisonFails = false;
    const retry = context.runMailCheck_('timer');
    assert.equal(retry.delivered, 1, 'the due quarantine retry must count its delivered message');
    assert.equal(memory.store.GMAIL_NOTIFICATION_QUARANTINE_V1, undefined);
    assert.equal(delivered.filter(id => id === 'poison12345').length, 1);
  } finally {
    Object.assign(context, originals);
  }
});

test('a full poison quarantine dead-letters the most exhausted row and never pins the next page', () => {
  const now = Date.now();
  const permanentRows = Array.from({ length: 60 }, (_, index) => [
    `stuck_${String(index).padStart(4, '0')}`,
    8,
    now + 24 * 60 * 60 * 1000,
    1000 + index,
    1000,
    4000,
  ]);
  const memory = memoryProperties({
    BOT_TOKEN: 'test-token', CHAT_ID: '123', STARTED_AT: '1000', SEEN_MESSAGE_IDS: '[]',
    GMAIL_NOTIFICATION_WATERMARK_MS: '1000',
    GMAIL_NOTIFICATION_QUARANTINE_V1: JSON.stringify(permanentRows),
    GMAIL_NOTIFICATION_SCAN_V1: JSON.stringify({
      version: 1, lowerBoundMs: 1000, upperBoundMs: 4000, pageToken: '', page: 0,
      pass: 0, passNewCount: 0, verificationPass: false, createdAt: 5000,
    }),
  });
  const delivered = [];
  const originals = {
    PropertiesService: context.PropertiesService,
    LockService: context.LockService,
    listGmailNotificationPage_: context.listGmailNotificationPage_,
    getGmailMessage_: context.getGmailMessage_,
    notifyMessage_: context.notifyMessage_,
    hashedMessageId_: context.hashedMessageId_,
  };
  try {
    context.PropertiesService = memory.service;
    context.LockService = {
      getUserLock: () => ({ tryLock: () => true, releaseLock: () => {} }),
    };
    context.listGmailNotificationPage_ = scan => String(scan.pageToken || '') === 'page_2'
      ? { ids: ['later_0001'], nextPageToken: '' }
      : { ids: ['new_poison'], nextPageToken: 'page_2' };
    context.getGmailMessage_ = id => ({ id, timestamp: 3000, labelIds: ['INBOX'] });
    context.notifyMessage_ = message => {
      if (message.id === 'new_poison') throw new Error('permanent synthetic poison');
      delivered.push(message.id);
      return { message_id: delivered.length };
    };
    context.hashedMessageId_ = id => `hash:${id}`;

    const first = context.runMailCheck_('timer');
    assert.equal(first.pending, true);
    assert.equal(first.failed, 1);
    assert.equal(first.quarantined, 1);
    assert.equal(first.deadLettered, 1, 'capacity eviction must be surfaced by the check result');
    assert.equal(first.deadLetteredTotal, 1);
    assert.equal(first.retryPending, 60);
    assert.equal(JSON.parse(memory.store.GMAIL_NOTIFICATION_SCAN_V1).pageToken, 'page_2');
    const durable = JSON.parse(memory.store.GMAIL_NOTIFICATION_QUARANTINE_V1);
    assert.equal(Array.isArray(durable), false);
    assert.equal(durable.q.length, 60);
    assert.ok(durable.q.some(row => row[0] === 'new_poison'));
    assert.ok(!durable.q.some(row => row[0] === 'stuck_0000'));
    assert.deepEqual(durable.d, [1, 'stuck_0000', durable.d[2], 8, 'capacity']);
    assert.ok(Number(durable.d[2]) > 0);
    assert.ok(Buffer.byteLength(memory.store.GMAIL_NOTIFICATION_QUARANTINE_V1, 'utf8') < 8500);

    const second = context.runMailCheck_('timer');
    assert.equal(second.delivered, 1);
    assert.deepEqual(delivered, ['later_0001']);
    assert.equal(JSON.parse(memory.store.GMAIL_NOTIFICATION_QUARANTINE_V1).d[0], 1);
  } finally {
    Object.assign(context, originals);
  }
});

test('max-attempt dead letter remains visible when the frozen watermark commits', () => {
  const memory = memoryProperties({
    BOT_TOKEN: 'test-token', CHAT_ID: '123', STARTED_AT: '1000', SEEN_MESSAGE_IDS: '[]',
    GMAIL_NOTIFICATION_WATERMARK_MS: '1000',
    GMAIL_NOTIFICATION_QUARANTINE_V1: JSON.stringify([
      ['exhausted_12345', 7, 0, 1000, 1000, 4000],
    ]),
    GMAIL_NOTIFICATION_SCAN_V1: JSON.stringify({
      version: 1, lowerBoundMs: 1000, upperBoundMs: 4000, pageToken: '', page: 0,
      pass: 1, passNewCount: 0, verificationPass: true, createdAt: 5000,
    }),
  });
  const originals = {
    PropertiesService: context.PropertiesService,
    LockService: context.LockService,
    listGmailNotificationPage_: context.listGmailNotificationPage_,
    getGmailMessage_: context.getGmailMessage_,
    notifyMessage_: context.notifyMessage_,
    hashedMessageId_: context.hashedMessageId_,
  };
  try {
    context.PropertiesService = memory.service;
    context.LockService = {
      getUserLock: () => ({ tryLock: () => true, releaseLock: () => {} }),
    };
    context.listGmailNotificationPage_ = () => ({ ids: [], nextPageToken: '' });
    context.getGmailMessage_ = id => ({ id, timestamp: 2000, labelIds: ['INBOX'] });
    context.notifyMessage_ = () => { throw new Error('still unavailable'); };
    context.hashedMessageId_ = id => `hash:${id}`;

    const result = context.runMailCheck_('manual');
    assert.equal(result.pending, false);
    assert.equal(result.failed, 1);
    assert.equal(result.deadLettered, 1);
    assert.equal(result.deadLetteredTotal, 1);
    assert.equal(result.retryPending, 0);
    assert.equal(memory.store.GMAIL_NOTIFICATION_WATERMARK_MS, '4000');
    const durable = JSON.parse(memory.store.GMAIL_NOTIFICATION_QUARANTINE_V1);
    assert.deepEqual(durable.q, []);
    assert.equal(durable.d[0], 1);
    assert.equal(durable.d[1], 'exhausted_12345');
    assert.equal(durable.d[3], 8);
    assert.equal(durable.d[4], 'attempts');
  } finally {
    Object.assign(context, originals);
  }
});

test('manual check reports retry and dead-letter counts without promising an impossible retry', () => {
  const originals = {
    runMailCheck_: context.runMailCheck_,
    sendTelegramText_: context.sendTelegramText_,
    replyKeyboard_: context.replyKeyboard_,
    systemTopicOptions_: context.systemTopicOptions_,
    telegramRequest_: context.telegramRequest_,
    telegramTopicId_: context.telegramTopicId_,
    PropertiesService: context.PropertiesService,
  };
  const messages = [];
  try {
    context.PropertiesService = memoryProperties({ CHAT_ID: '123' }).service;
    context.telegramRequest_ = () => true;
    context.telegramTopicId_ = () => null;
    context.replyKeyboard_ = () => '{}';
    context.systemTopicOptions_ = value => value || {};
    context.sendTelegramText_ = text => { messages.push(text); return true; };
    context.runMailCheck_ = () => ({
      busy: false,
      delivered: 0,
      failed: 1,
      uncertain: 0,
      quarantined: 0,
      deadLettered: 1,
      deadLetteredTotal: 3,
      retryPending: 2,
      pending: false,
    });

    context.runManualMailCheck_();
    const message = messages.at(-1);
    assert.match(message, /очікують автоматичного повтору:\s*<b>2<\/b>/i);
    assert.match(message, /автоматичні спроби остаточно вичерпано[^]*<b>1<\/b>/i);
    assert.match(message, /Без автоматичного повтору за весь час:\s*<b>3<\/b>/i);
    assert.doesNotMatch(message, /бот повторить ці листи автоматично/i);
  } finally {
    Object.assign(context, originals);
  }
});

test('bot status exposes durable Gmail dead letters and abandoned card moves', () => {
  const moveKey = 'TELEGRAM_CARD_MOVE_123_880_102';
  const memory = memoryProperties({
    CHAT_ID: '123',
    GMAIL_NOTIFICATION_QUARANTINE_V1: JSON.stringify({
      q: [['retry_12345', 2, Date.now() + 60000, Date.now(), 1000, 4000]],
      d: [4, 'lost_12345', Date.now(), 8, 'attempts'],
    }),
    TELEGRAM_CARD_MOVE_INDEX: JSON.stringify([moveKey]),
    [moveKey]: JSON.stringify({ propertyKey: moveKey, state: 'abandoned' }),
    TELEGRAM_CARD_MOVE_ABANDONED_AUDIT_V1: JSON.stringify({
      version: 1,
      total: 7,
      recentKeys: [moveKey],
      lastAt: Date.now(),
      lastStage: 'copy_retry_exhausted',
      lastError: 'manual recovery required',
    }),
  });
  const originals = {
    PropertiesService: context.PropertiesService,
    ScriptApp: context.ScriptApp,
    telegramRequest_: context.telegramRequest_,
    sendTelegramText_: context.sendTelegramText_,
    inlineControlMenu_: context.inlineControlMenu_,
    systemTopicOptions_: context.systemTopicOptions_,
    isQuietHours_: context.isQuietHours_,
  };
  let statusText = '';
  try {
    context.PropertiesService = memory.service;
    context.ScriptApp = { getProjectTriggers: () => [] };
    context.telegramRequest_ = () => ({ url: '' });
    context.inlineControlMenu_ = () => '{}';
    context.systemTopicOptions_ = value => value || {};
    context.isQuietHours_ = () => false;
    context.sendTelegramText_ = text => { statusText = text; return true; };

    context.sendBotStatus_();
    assert.match(statusText, /Gmail-сповіщення у черзі повтору:\s*<b>1<\/b>/i);
    assert.match(statusText, /Gmail-сповіщення без автоповтору:\s*<b>4<\/b>/i);
    assert.match(statusText, /Переміщення карток для ручної перевірки:\s*<b>1<\/b>/i);
    assert.match(statusText, /Усього зафіксовано таких переміщень:\s*<b>7<\/b>/i);
    assert.match(statusText, /автоматичні спроби вичерпано/i);
  } finally {
    Object.assign(context, originals);
  }
});

test('a frozen Gmail scan drains more than 500 messages across durable pages without loss', () => {
  const scan = {
    version: 1, lowerBoundMs: 1000, upperBoundMs: 10000,
    pageToken: '', page: 0, createdAt: 20000,
  };
  const memory = memoryProperties({
    BOT_TOKEN: 'test-token', CHAT_ID: '123', STARTED_AT: '1000',
    SEEN_MESSAGE_IDS: '[]', GMAIL_NOTIFICATION_WATERMARK_MS: '1000',
    GMAIL_NOTIFICATION_SCAN_V1: JSON.stringify(scan),
  });
  const ids = Array.from({ length: 501 }, (_, index) =>
    `burst_${String(index).padStart(4, '0')}`
  );
  const pages = {};
  for (let page = 0; page < 6; page += 1) {
    const token = page === 0 ? '' : `page_${page + 1}`;
    const nextPageToken = page === 5 ? '' : `page_${page + 2}`;
    pages[token] = { ids: ids.slice(page * 100, (page + 1) * 100), nextPageToken };
  }
  const originals = {
    PropertiesService: context.PropertiesService,
    LockService: context.LockService,
    listGmailNotificationPage_: context.listGmailNotificationPage_,
    getGmailMessage_: context.getGmailMessage_,
    notifyMessage_: context.notifyMessage_,
  };
  const delivered = [];
  try {
    context.PropertiesService = memory.service;
    context.LockService = {
      getUserLock: () => ({ tryLock: () => true, releaseLock: () => {} }),
    };
    context.listGmailNotificationPage_ = current => pages[String(current.pageToken || '')];
    context.getGmailMessage_ = id => ({ id, timestamp: 5000, labelIds: ['INBOX'] });
    context.notifyMessage_ = message => { delivered.push(message.id); return { message_id: delivered.length }; };

    // Six delivery pages plus a full zero-new verification pass.
    const results = Array.from({ length: 12 }, () => context.runMailCheck_('timer'));
    assert.deepEqual(
      results.map(result => result.delivered),
      [100, 100, 100, 100, 100, 1, 0, 0, 0, 0, 0, 0]
    );
    assert.deepEqual(
      results.map(result => result.pending),
      [true, true, true, true, true, true, true, true, true, true, true, false]
    );
    assert.equal(delivered.length, 501);
    assert.equal(new Set(delivered).size, 501);
    assert.equal(memory.store.GMAIL_NOTIFICATION_WATERMARK_MS, '10000');
    assert.equal(memory.store.GMAIL_NOTIFICATION_SCAN_V1, undefined);
    assert.equal(memory.store.GMAIL_NOTIFICATION_PAGE_DONE_V1, undefined);
    assert.equal(
      Object.keys(memory.store).filter(name => name.startsWith('GMAIL_NOTIFICATION_SCAN_DONE_V1_')).length,
      0
    );
  } finally {
    Object.assign(context, originals);
  }
});

test('label changes cannot shift frozen pagination because the list query is label-independent', () => {
  const scan = {
    version: 1, lowerBoundMs: 1000, upperBoundMs: 10000,
    pageToken: '', page: 0, pass: 0, passNewCount: 0,
    verificationPass: false, createdAt: 20000,
  };
  const memory = memoryProperties({
    BOT_TOKEN: 'test-token', CHAT_ID: '123', STARTED_AT: '1000',
    SEEN_MESSAGE_IDS: '[]', GMAIL_NOTIFICATION_WATERMARK_MS: '1000',
    GMAIL_NOTIFICATION_SCAN_V1: JSON.stringify(scan),
  });
  const ids = Array.from({ length: 250 }, (_, index) => `mail_${String(index).padStart(4, '0')}`);
  const removedFromInbox = new Set();
  const trashed = new Set();
  const paths = [];
  const delivered = [];
  const originals = {
    PropertiesService: context.PropertiesService,
    LockService: context.LockService,
    gmailApi_: context.gmailApi_,
    getGmailMessage_: context.getGmailMessage_,
    notifyMessage_: context.notifyMessage_,
  };
  try {
    context.PropertiesService = memory.service;
    context.LockService = {
      getUserLock: () => ({ tryLock: () => true, releaseLock: () => {} }),
    };
    context.gmailApi_ = pathValue => {
      paths.push(pathValue);
      const url = new URL(`https://gmail.invalid${pathValue}`);
      const query = url.searchParams.get('q') || '';
      const includeSpamTrash = url.searchParams.get('includeSpamTrash') === 'true';
      let source = ids.slice();
      if (/\bin:inbox\b/i.test(query)) source = source.filter(id => !removedFromInbox.has(id));
      if (!includeSpamTrash) source = source.filter(id => !trashed.has(id));
      const offset = Number(url.searchParams.get('pageToken') || 0);
      return {
        messages: source.slice(offset, offset + 100).map(id => ({ id })),
        nextPageToken: offset + 100 < source.length ? String(offset + 100) : '',
      };
    };
    context.getGmailMessage_ = id => ({ id, timestamp: 5000, labelIds: ['INBOX'] });
    context.notifyMessage_ = message => { delivered.push(message.id); return { message_id: delivered.length }; };

    context.runMailCheck_('timer');
    ids.slice(0, 50).forEach(id => {
      removedFromInbox.add(id);
      trashed.add(id);
    });
    const results = Array.from({ length: 5 }, () => context.runMailCheck_('timer'));
    assert.equal(results.at(-1).pending, false);
    assert.equal(delivered.length, 250);
    assert.equal(new Set(delivered).size, 250);
    assert.ok(paths.every(pathValue => !/in%3Ainbox/i.test(pathValue)));
    assert.ok(paths.every(pathValue => /includeSpamTrash=true/.test(pathValue)));
  } finally {
    Object.assign(context, originals);
  }
});

test('an invalid persisted page token restarts the same scan without replaying more than 500 done IDs', () => {
  const completedIds = Array.from({ length: 501 }, (_, index) => `done_${String(index).padStart(4, '0')}`);
  const store = {
    BOT_TOKEN: 'test-token', CHAT_ID: '123', STARTED_AT: '1000',
    SEEN_MESSAGE_IDS: '[]', GMAIL_NOTIFICATION_WATERMARK_MS: '1000',
    GMAIL_NOTIFICATION_SCAN_V1: JSON.stringify({
      version: 1, lowerBoundMs: 1000, upperBoundMs: 10000,
      pageToken: 'stale-token', page: 7, pass: 0, passNewCount: 501,
      verificationPass: false, createdAt: 20000,
    }),
  };
  for (let offset = 0; offset < completedIds.length; offset += 100) {
    store[`GMAIL_NOTIFICATION_SCAN_DONE_V1_${offset / 100}`] =
      JSON.stringify(completedIds.slice(offset, offset + 100));
  }
  const memory = memoryProperties(store);
  const delivered = [];
  const requestedTokens = [];
  const originals = {
    PropertiesService: context.PropertiesService,
    LockService: context.LockService,
    listGmailNotificationPage_: context.listGmailNotificationPage_,
    getGmailMessage_: context.getGmailMessage_,
    notifyMessage_: context.notifyMessage_,
  };
  try {
    context.PropertiesService = memory.service;
    context.LockService = {
      getUserLock: () => ({ tryLock: () => true, releaseLock: () => {} }),
    };
    context.listGmailNotificationPage_ = current => {
      requestedTokens.push(String(current.pageToken || ''));
      if (current.pageToken) {
        const error = new Error('HTTP 400 invalid page token');
        error.gmailHttpStatus = 400;
        throw error;
      }
      return { ids: [completedIds[0], completedIds[500], 'fresh_0001'], nextPageToken: '' };
    };
    context.getGmailMessage_ = id => ({ id, timestamp: 5000, labelIds: ['INBOX'] });
    context.notifyMessage_ = message => { delivered.push(message.id); return { message_id: delivered.length }; };

    const first = context.runMailCheck_('timer');
    assert.equal(first.pending, true);
    assert.deepEqual(requestedTokens, ['stale-token', '']);
    assert.deepEqual(delivered, ['fresh_0001']);
    const second = context.runMailCheck_('timer');
    assert.equal(second.pending, false);
    assert.deepEqual(delivered, ['fresh_0001']);
    assert.equal(memory.store.GMAIL_NOTIFICATION_WATERMARK_MS, '10000');
    assert.equal(memory.store.GMAIL_NOTIFICATION_SCAN_V1, undefined);
    assert.equal(
      Object.keys(memory.store).filter(name => name.startsWith('GMAIL_NOTIFICATION_SCAN_DONE_V1_')).length,
      0
    );
  } finally {
    Object.assign(context, originals);
  }
});

test('a late search result is delivered before the verification barrier commits the watermark', () => {
  const memory = memoryProperties({
    BOT_TOKEN: 'test-token', CHAT_ID: '123', STARTED_AT: '1000',
    SEEN_MESSAGE_IDS: '[]', GMAIL_NOTIFICATION_WATERMARK_MS: '1000',
    GMAIL_NOTIFICATION_SCAN_V1: JSON.stringify({
      version: 1, lowerBoundMs: 1000, upperBoundMs: 10000,
      pageToken: '', page: 0, pass: 0, passNewCount: 0,
      verificationPass: false, createdAt: 20000,
    }),
  });
  let visibleIds = [];
  const delivered = [];
  const originals = {
    PropertiesService: context.PropertiesService,
    LockService: context.LockService,
    listGmailNotificationPage_: context.listGmailNotificationPage_,
    getGmailMessage_: context.getGmailMessage_,
    notifyMessage_: context.notifyMessage_,
  };
  try {
    context.PropertiesService = memory.service;
    context.LockService = {
      getUserLock: () => ({ tryLock: () => true, releaseLock: () => {} }),
    };
    context.listGmailNotificationPage_ = () => ({ ids: visibleIds.slice(), nextPageToken: '' });
    context.getGmailMessage_ = id => ({ id, timestamp: 5000, labelIds: ['INBOX'] });
    context.notifyMessage_ = message => { delivered.push(message.id); return { message_id: delivered.length }; };

    assert.equal(context.runMailCheck_('timer').pending, true);
    assert.equal(memory.store.GMAIL_NOTIFICATION_WATERMARK_MS, '1000');
    visibleIds = ['late_0001'];
    assert.equal(context.runMailCheck_('timer').pending, true);
    assert.deepEqual(delivered, ['late_0001']);
    assert.equal(memory.store.GMAIL_NOTIFICATION_WATERMARK_MS, '1000');
    assert.equal(context.runMailCheck_('timer').pending, false);
    assert.equal(memory.store.GMAIL_NOTIFICATION_WATERMARK_MS, '10000');
  } finally {
    Object.assign(context, originals);
  }
});

test('rotating Gmail metadata fallback is sparse instead of running every minute', () => {
  const now = Date.now();
  const memory = memoryProperties({ TELEGRAM_MAIL_FALLBACK_SYNC_AT_V1: String(now) });
  const originals = {
    PropertiesService: context.PropertiesService,
    syncTelegramMailCardsFromGmail_: context.syncTelegramMailCardsFromGmail_,
  };
  let calls = 0;
  try {
    context.PropertiesService = memory.service;
    context.syncTelegramMailCardsFromGmail_ = limit => { calls += 1; return { attempted: limit }; };
    assert.equal(context.syncTelegramMailCardsFromGmailFallbackIfDue_(5).deferred, true);
    assert.equal(calls, 0);
    memory.store.TELEGRAM_MAIL_FALLBACK_SYNC_AT_V1 = String(now - 16 * 60 * 1000);
    assert.equal(context.syncTelegramMailCardsFromGmailFallbackIfDue_(5).attempted, 5);
    assert.equal(calls, 1);
  } finally {
    Object.assign(context, originals);
  }
});

test('Telegram update journal marks completion last and retries failed work durably', () => {
  const memory = memoryProperties({ CHAT_ID: '123' });
  const originals = {
    PropertiesService: context.PropertiesService,
    LockService: context.LockService,
  };
  try {
    context.PropertiesService = memory.service;
    context.LockService = immediateScriptLock();
    const update = {
      update_id: 77,
      message: { chat: { id: 123, type: 'private' }, from: { id: 123 }, text: '/status' },
    };
    assert.equal(context.claimTelegramUpdate_(77, update), 'new');
    let rows = JSON.parse(memory.store.TELEGRAM_UPDATE_JOURNAL);
    assert.equal(rows[0][1], 'p', 'claim must persist processing, not prematurely processed');
    assert.deepEqual(JSON.parse(memory.store.PROCESSED_TELEGRAM_UPDATE_IDS), []);
    assert.equal(context.claimTelegramUpdate_(77, update), 'busy');

    assert.equal(context.failTelegramUpdate_(77, new Error('temporary')), 'f');
    assert.equal(context.claimTelegramUpdate_(77), 'retry');
    assert.equal(context.completeTelegramUpdate_(77), 'd');
    assert.equal(context.claimTelegramUpdate_(77), 'duplicate');
    rows = JSON.parse(memory.store.TELEGRAM_UPDATE_JOURNAL);
    assert.equal(rows[0][1], 'd');
    assert.deepEqual(JSON.parse(memory.store.PROCESSED_TELEGRAM_UPDATE_IDS), ['77']);
    assert.equal(memory.store.TELEGRAM_UPDATE_PAYLOAD_77, undefined);
  } finally {
    Object.assign(context, originals);
  }
});

test('Telegram update journal retains every active retry beyond its soft limit and evicts terminal rows', () => {
  const memory = memoryProperties({ CHAT_ID: '123' });
  const activeRows = Array.from({ length: 45 }, (_, index) => [
    String(1000 + index),
    index % 2 ? 'f' : 'p',
    index + 1,
    1,
    '',
  ]);
  const terminalRows = Array.from({ length: 12 }, (_, index) => [
    String(2000 + index),
    index % 2 ? 'x' : 'd',
    index + 1,
    1,
    '',
  ]);
  [...activeRows, ...terminalRows].forEach(row => {
    memory.store[`TELEGRAM_UPDATE_PAYLOAD_${row[0]}`] = 'payload';
    memory.store[`TELEGRAM_UPDATE_OPERATION_${row[0]}`] = 'operation';
  });

  context.writeTelegramUpdateJournal_(memory.service.getScriptProperties(), [
    ...terminalRows.slice(0, 6),
    ...activeRows,
    ...terminalRows.slice(6),
  ]);

  const kept = JSON.parse(memory.store.TELEGRAM_UPDATE_JOURNAL);
  assert.equal(kept.length, 45, 'active work may exceed the nominal 40-row soft limit');
  assert.deepEqual(new Set(kept.map(row => row[0])), new Set(activeRows.map(row => row[0])));
  terminalRows.forEach(row => {
    assert.equal(memory.store[`TELEGRAM_UPDATE_PAYLOAD_${row[0]}`], undefined);
    assert.equal(memory.store[`TELEGRAM_UPDATE_OPERATION_${row[0]}`], undefined);
  });
  activeRows.forEach(row => {
    assert.equal(memory.store[`TELEGRAM_UPDATE_PAYLOAD_${row[0]}`], 'payload');
  });
});

test('Telegram update journal keeps active rows plus the newest terminal history within its soft limit', () => {
  const memory = memoryProperties({ CHAT_ID: '123' });
  const activeRows = Array.from({ length: 5 }, (_, index) => [String(3000 + index), 'f', index, 1, '']);
  const terminalRows = Array.from({ length: 45 }, (_, index) => [String(4000 + index), 'd', index, 1, '']);
  terminalRows.forEach(row => {
    memory.store[`TELEGRAM_UPDATE_PAYLOAD_${row[0]}`] = 'terminal';
  });
  context.writeTelegramUpdateJournal_(memory.service.getScriptProperties(), [
    ...terminalRows.slice(0, 20),
    ...activeRows,
    ...terminalRows.slice(20),
  ]);

  const kept = JSON.parse(memory.store.TELEGRAM_UPDATE_JOURNAL);
  assert.equal(kept.length, 40);
  activeRows.forEach(row => assert.ok(kept.some(item => item[0] === row[0])));
  terminalRows.slice(0, 10).forEach(row => {
    assert.ok(!kept.some(item => item[0] === row[0]));
    assert.equal(memory.store[`TELEGRAM_UPDATE_PAYLOAD_${row[0]}`], undefined);
  });
  terminalRows.slice(10).forEach(row => assert.ok(kept.some(item => item[0] === row[0])));
});

test('new webhook work is rejected before routing when the durable active hard limit is full', () => {
  const activeRows = Array.from(
    { length: context.CONFIG ? context.CONFIG.TELEGRAM_UPDATE_ACTIVE_HARD_LIMIT : 32 },
    (_, index) => [String(1000 + index), 'f', Date.now(), 1, 'temporary']
  );
  const memory = memoryProperties({
    CHAT_ID: '123',
    TELEGRAM_UPDATE_JOURNAL: JSON.stringify(activeRows),
  });
  const originals = {
    PropertiesService: context.PropertiesService,
    LockService: context.LockService,
  };
  try {
    context.PropertiesService = memory.service;
    context.LockService = immediateScriptLock();
    const update = {
      update_id: 9999,
      callback_query: {
        id: 'callback-overload',
        data: context.mailboxCallbackData_('archive', 'abcde12345'),
        from: { id: 123 },
        message: { message_id: 7, chat: { id: 123, type: 'private' } },
      },
    };
    assert.equal(context.claimTelegramUpdate_(update.update_id, update), 'overloaded');
    assert.equal(memory.store.TELEGRAM_UPDATE_PAYLOAD_9999, undefined);
    assert.equal(JSON.parse(memory.store.TELEGRAM_UPDATE_JOURNAL).length, activeRows.length);
  } finally {
    Object.assign(context, originals);
  }
});

test('durable Telegram retries never persist arbitrary private chat text', () => {
  assert.equal(context.durableTelegramCommandText_('/check'), '/check');
  assert.equal(
    context.durableTelegramCommandText_('🔄 Перевірити пошту зараз'),
    '🔄 Перевірити пошту зараз'
  );
  assert.equal(context.durableTelegramCommandText_('my password is private'), '');
  const payload = context.durableTelegramUpdatePayload_({
    update_id: 8,
    message: {
      message_id: 9,
      text: 'my password is private',
      from: { id: 123 },
      chat: { id: 123, type: 'private' },
    },
  });
  assert.equal(payload.message.text, '');
});

test('a retried mailbox update never repeats Gmail after the gmail_done boundary', () => {
  const memory = memoryProperties({ CHAT_ID: '123' });
  const originals = {
    PropertiesService: context.PropertiesService,
    executeMailboxAction_: context.executeMailboxAction_,
    finalizeMailboxCallback_: context.finalizeMailboxCallback_,
  };
  let gmailCalls = 0;
  let cardCalls = 0;
  try {
    context.PropertiesService = memory.service;
    context.executeMailboxAction_ = () => {
      gmailCalls += 1;
      return { ok: true, message: 'done' };
    };
    context.finalizeMailboxCallback_ = () => {
      cardCalls += 1;
      if (cardCalls === 1) throw new Error('temporary Telegram failure');
      return { moved: true };
    };
    const mailbox = { action: 'archive', messageId: 'abcde12345' };
    const query = { data: context.mailboxCallbackData_('archive', mailbox.messageId), message: {} };
    assert.throws(
      () => context.executeDurableMailboxCallback_(88, query, mailbox),
      /temporary Telegram failure/
    );
    const saved = JSON.parse(memory.store.TELEGRAM_UPDATE_OPERATION_88);
    assert.equal(saved.phase, 'gmail_done');
    const result = context.executeDurableMailboxCallback_(88, query, mailbox);
    assert.equal(result.message, '✅ Архівовано');
    assert.equal(gmailCalls, 1, 'retry must skip the already confirmed Gmail mutation');
    assert.equal(cardCalls, 2);
  } finally {
    Object.assign(context, originals);
  }
});

test('mailbox callback reserves guarded operation headroom before Gmail and storage rejection blocks the action', () => {
  const memory = memoryProperties({ CHAT_ID: '123' });
  const baseProps = memory.service.getScriptProperties();
  const events = [];
  const props = {
    getProperty: baseProps.getProperty,
    getProperties: baseProps.getProperties,
    deleteProperty: baseProps.deleteProperty,
    setProperty: (name, value) => {
      events.push({ kind: 'set', name, value: String(value) });
      baseProps.setProperty(name, value);
    },
  };
  const originals = {
    PropertiesService: context.PropertiesService,
    assertTelegramPropertyValueFits_: context.assertTelegramPropertyValueFits_,
    assertTelegramPropertyStoreFits_: context.assertTelegramPropertyStoreFits_,
    executeMailboxAction_: context.executeMailboxAction_,
    finalizeMailboxCallback_: context.finalizeMailboxCallback_,
  };
  let gmailCalls = 0;
  try {
    context.PropertiesService = { getScriptProperties: () => props };
    context.assertTelegramPropertyValueFits_ = (name, value) => {
      events.push({ kind: 'value_guard', name, value: String(value) });
    };
    context.assertTelegramPropertyStoreFits_ = (receivedProps, replacements) => {
      assert.equal(receivedProps, props);
      const names = Object.keys(replacements);
      assert.equal(names.length, 1);
      events.push({
        kind: 'store_guard',
        name: names[0],
        value: String(replacements[names[0]]),
      });
    };
    context.executeMailboxAction_ = () => {
      gmailCalls += 1;
      events.push({ kind: 'gmail' });
      const reserved = JSON.parse(memory.store.TELEGRAM_UPDATE_OPERATION_92);
      assert.equal(reserved.phase, 'reserved');
      assert.ok(reserved.capacityPadding.length >= 700);
      return { ok: true, message: 'done' };
    };
    context.finalizeMailboxCallback_ = () => ({ moved: true });
    const mailbox = { action: 'archive', messageId: 'guarded12345' };
    const query = { data: context.mailboxCallbackData_('archive', mailbox.messageId), message: {} };

    const result = context.executeDurableMailboxCallback_(92, query, mailbox);

    assert.equal(result.message, '✅ Архівовано');
    assert.equal(gmailCalls, 1);
    assert.deepEqual(events.slice(0, 4).map(event => event.kind), [
      'value_guard', 'store_guard', 'set', 'gmail',
    ]);
    const guardedValues = events.filter(event => event.kind === 'value_guard');
    const guardedStores = events.filter(event => event.kind === 'store_guard');
    const writes = events.filter(event => event.kind === 'set');
    assert.equal(writes.length, 3, 'reserved, gmail_done, and final phases must all persist');
    assert.deepEqual(
      guardedValues.map(event => [event.name, event.value]),
      writes.map(event => [event.name, event.value]),
      'every operation value must pass the per-value guard before setProperty'
    );
    assert.deepEqual(
      guardedStores.map(event => [event.name, event.value]),
      writes.map(event => [event.name, event.value]),
      'every operation value must pass the total-store guard before setProperty'
    );
    const reservedBytes = context.utf8ByteLength_(writes[0].value);
    const finalBytes = context.utf8ByteLength_(writes[writes.length - 1].value);
    assert.ok(finalBytes <= reservedBytes, 'final operation must fit inside reserved headroom');
    const finalOperation = JSON.parse(memory.store.TELEGRAM_UPDATE_OPERATION_92);
    assert.equal(finalOperation.phase, 'gmail_done');
    assert.equal(finalOperation.capacityPadding, undefined);

    const rejectedMemory = memoryProperties({ CHAT_ID: '123' });
    const rejectedBaseProps = rejectedMemory.service.getScriptProperties();
    let rejectedWrites = 0;
    const rejectedProps = {
      getProperty: rejectedBaseProps.getProperty,
      getProperties: rejectedBaseProps.getProperties,
      deleteProperty: rejectedBaseProps.deleteProperty,
      setProperty: (name, value) => {
        rejectedWrites += 1;
        rejectedBaseProps.setProperty(name, value);
      },
    };
    context.PropertiesService = { getScriptProperties: () => rejectedProps };
    context.assertTelegramPropertyValueFits_ = () => {};
    context.assertTelegramPropertyStoreFits_ = () => {
      throw new Error('simulated operation-store rejection');
    };
    assert.throws(
      () => context.executeDurableMailboxCallback_(
        93,
        { data: context.mailboxCallbackData_('trash', 'guarded67890'), message: {} },
        { action: 'trash', messageId: 'guarded67890' }
      ),
      /simulated operation-store rejection/
    );
    assert.equal(gmailCalls, 1, 'Gmail must not run when the reservation cannot be stored');
    assert.equal(rejectedWrites, 0);
    assert.equal(rejectedMemory.store.TELEGRAM_UPDATE_OPERATION_93, undefined);
  } finally {
    Object.assign(context, originals);
  }
});

test('a failed Telegram card queue is retried without repeating the Gmail action', () => {
  const memory = memoryProperties({ CHAT_ID: '123' });
  const originals = {
    PropertiesService: context.PropertiesService,
    executeMailboxAction_: context.executeMailboxAction_,
    finalizeMailboxCallback_: context.finalizeMailboxCallback_,
  };
  let gmailCalls = 0;
  let reconciliationCalls = 0;
  try {
    context.PropertiesService = memory.service;
    context.executeMailboxAction_ = () => {
      gmailCalls += 1;
      return { ok: true, message: 'готово' };
    };
    context.finalizeMailboxCallback_ = () => {
      reconciliationCalls += 1;
      return reconciliationCalls === 1
        ? { moved: false, retryNeeded: true, warning: 'temporary card queue failure' }
        : { moved: true };
    };
    const mailbox = { action: 'archive', messageId: 'abcde12345' };
    const query = { data: context.mailboxCallbackData_('archive', mailbox.messageId), message: {} };

    assert.throws(
      () => context.executeDurableMailboxCallback_(89, query, mailbox),
      /temporary card queue failure/
    );
    assert.equal(JSON.parse(memory.store.TELEGRAM_UPDATE_OPERATION_89).phase, 'gmail_done');

    const result = context.executeDurableMailboxCallback_(89, query, mailbox);
    assert.equal(result.message, '✅ Архівовано');
    assert.equal(gmailCalls, 1);
    assert.equal(reconciliationCalls, 2);
  } finally {
    Object.assign(context, originals);
  }
});

test('a terminal uncertain card move is surfaced in the callback result and durable operation', () => {
  const memory = memoryProperties({ CHAT_ID: '123' });
  const originals = {
    PropertiesService: context.PropertiesService,
    executeMailboxAction_: context.executeMailboxAction_,
    finalizeMailboxCallback_: context.finalizeMailboxCallback_,
  };
  try {
    context.PropertiesService = memory.service;
    context.executeMailboxAction_ = () => ({ ok: true, message: 'done' });
    context.finalizeMailboxCallback_ = () => ({
      moved: false,
      sourceDeleted: false,
      warning: 'Telegram не підтвердив copyMessage; джерело збережено',
    });
    const mailbox = { action: 'archive', messageId: 'warningcopy12345' };
    const query = { data: context.mailboxCallbackData_('archive', mailbox.messageId), message: {} };

    const result = context.executeDurableMailboxCallback_(9001, query, mailbox);
    assert.match(result.message, /Архівовано/);
    assert.match(result.message, /Telegram не підтвердив copyMessage/);
    const stored = JSON.parse(memory.store.TELEGRAM_UPDATE_OPERATION_9001);
    assert.match(stored.message, /Telegram не підтвердив copyMessage/);
    assert.equal(stored.reconciliationWarning, 'Telegram не підтвердив copyMessage; джерело збережено');
  } finally {
    Object.assign(context, originals);
  }
});

test('timer retry replays a stored failed update and marks it complete', () => {
  const memory = memoryProperties({ CHAT_ID: '123' });
  const originals = {
    PropertiesService: context.PropertiesService,
    LockService: context.LockService,
    routeTelegramUpdate_: context.routeTelegramUpdate_,
  };
  let routed = 0;
  try {
    context.PropertiesService = memory.service;
    context.LockService = immediateScriptLock();
    const update = {
      update_id: 90,
      message: {
        message_id: 1,
        text: '/status',
        from: { id: 123 },
        chat: { id: 123, type: 'private' },
      },
    };
    context.claimTelegramUpdate_(90, update);
    context.failTelegramUpdate_(90, new Error('temporary'));
    context.routeTelegramUpdate_ = replayed => {
      assert.equal(replayed.message.text, '/status');
      routed += 1;
    };
    const retried = context.retryFailedTelegramUpdates_(3);
    assert.deepEqual(JSON.parse(JSON.stringify(retried)), { attempted: 1, completed: 1 });
    assert.equal(routed, 1);
    assert.equal(JSON.parse(memory.store.TELEGRAM_UPDATE_JOURNAL)[0][1], 'd');
  } finally {
    Object.assign(context, originals);
  }
});

test('the first native webhook setup drops stale updates and later setups preserve fresh ones', () => {
  const store = { CHAT_ID: '123', BOT_TOKEN: 'token' };
  const setWebhookCalls = [];
  let failAfterWebhook = true;
  const originals = {
    PropertiesService: context.PropertiesService,
    ensureControlToken_: context.ensureControlToken_,
    ensureWebhookKey_: context.ensureWebhookKey_,
    telegramRequest_: context.telegramRequest_,
    sendTelegramText_: context.sendTelegramText_,
    replyKeyboard_: context.replyKeyboard_,
    webAppActionUrl_: context.webAppActionUrl_,
    ensureTelegramMailTopics_: context.ensureTelegramMailTopics_,
  };
  const props = {
    getProperty: name => Object.prototype.hasOwnProperty.call(store, name) ? store[name] : null,
    setProperty: (name, value) => { store[name] = String(value); },
  };
  try {
    context.PropertiesService = { getScriptProperties: () => props };
    context.ensureControlToken_ = () => 'control';
    context.ensureWebhookKey_ = () => 'webhook-secret';
    context.telegramRequest_ = (method, payload) => {
      if (method === 'setWebhook') setWebhookCalls.push(payload);
      if (method === 'deleteMyCommands' && failAfterWebhook) {
        failAfterWebhook = false;
        throw new Error('temporary post-webhook failure');
      }
      return {};
    };
    context.sendTelegramText_ = () => {};
    context.replyKeyboard_ = () => '{}';
    context.webAppActionUrl_ = () => 'https://example.com/controls';
    context.ensureTelegramMailTopics_ = () => ({});

    assert.throws(() => context.setupTelegramControls_(), /temporary post-webhook failure/);
    assert.equal(store.NATIVE_CALLBACK_WEBHOOK_READY, '1');
    context.setupTelegramControls_();
    assert.equal(setWebhookCalls[0].drop_pending_updates, true);
    assert.equal(setWebhookCalls[1].drop_pending_updates, false);
    const webhookUrl = new URL(setWebhookCalls[0].url);
    assert.equal(webhookUrl.searchParams.get('key'), 'webhook-secret');
    assert.equal(webhookUrl.searchParams.get('rev'), code.match(/WEBHOOK_REVISION:\s*'([^']+)'/)[1]);
    assert.equal(store.NATIVE_CALLBACK_WEBHOOK_READY, '1');
  } finally {
    Object.assign(context, originals);
  }
});

test('deployment migration recreates one current minute trigger without resetting mailbox history', () => {
  const store = {
    BOT_TOKEN: 'token',
    CHAT_ID: '123',
    STARTED_AT: '1710000000000',
    SEEN_MESSAGE_IDS: '["message_1"]',
  };
  const oldTriggers = [
    { id: 'legacy', getHandlerFunction: () => 'checkNewMail' },
    { id: 'current', getHandlerFunction: () => 'checkNewMail_' },
    { id: 'other', getHandlerFunction: () => 'unrelatedHandler_' },
  ];
  const deleted = [];
  const created = [];
  const originals = {
    PropertiesService: context.PropertiesService,
    ScriptApp: context.ScriptApp,
    setupTelegramControls_: context.setupTelegramControls_,
    verifyWebhookTransport_: context.verifyWebhookTransport_,
  };
  const props = {
    getProperty: name => Object.prototype.hasOwnProperty.call(store, name) ? store[name] : null,
    setProperty: (name, value) => { store[name] = String(value); },
  };
  try {
    context.PropertiesService = { getScriptProperties: () => props };
    context.ScriptApp = {
      getProjectTriggers: () => oldTriggers,
      deleteTrigger: trigger => deleted.push(trigger.id),
      newTrigger: handler => ({
        timeBased() { return this; },
        everyMinutes(minutes) { this.minutes = minutes; return this; },
        create() { created.push({ handler, minutes: this.minutes }); return { handler }; },
      }),
    };
    context.setupTelegramControls_ = () => {};
    context.verifyWebhookTransport_ = () => ({ ok: true });

    const result = context.migrateDeployment_();
    assert.deepEqual(deleted, ['legacy', 'current']);
    assert.deepEqual(created, [{ handler: 'checkNewMail_', minutes: 1 }]);
    assert.equal(store.STARTED_AT, '1710000000000');
    assert.equal(store.SEEN_MESSAGE_IDS, '["message_1"]');
    assert.equal(result.statePreserved, true);
  } finally {
    Object.assign(context, originals);
  }
});

test('minute-trigger replacement never deletes the working trigger before replacement creation', () => {
  const oldTriggers = [
    { id: 'legacy', getHandlerFunction: () => 'checkNewMail' },
    { id: 'current', getHandlerFunction: () => 'checkNewMail_' },
  ];
  const deleted = [];
  const originalScriptApp = context.ScriptApp;
  try {
    context.ScriptApp = {
      getProjectTriggers: () => oldTriggers,
      deleteTrigger: trigger => deleted.push(trigger.id),
      newTrigger: () => ({
        timeBased() { return this; },
        everyMinutes() { return this; },
        create() { throw new Error('temporary trigger creation failure'); },
      }),
    };
    assert.throws(() => context.replaceMailCheckTrigger_(), /temporary trigger creation failure/);
    assert.deepEqual(deleted, [], 'the known working trigger must survive replacement creation failure');
  } finally {
    context.ScriptApp = originalScriptApp;
  }
});

test('mail topic setup creates one quiet folder header and does not duplicate it', () => {
  const topicKeys = [
    'inbox', 'sent', 'drafts', 'snoozed', 'archive', 'trash',
    'spam', 'starred', 'important', 'all', 'system',
  ];
  const topics = Object.fromEntries(topicKeys.map((key, index) => [key, 100 + index]));
  const existingHeaders = Object.fromEntries(
    topicKeys.filter(key => key !== 'inbox').map((key, index) => [key, 500 + index])
  );
  const store = {
    CHAT_ID: '123',
    TELEGRAM_MAIL_TOPICS: JSON.stringify(topics),
    TELEGRAM_TOPIC_HEADERS: JSON.stringify(existingHeaders),
  };
  const sendCalls = [];
  const originals = {
    PropertiesService: context.PropertiesService,
    LockService: context.LockService,
    telegramRequest_: context.telegramRequest_,
  };
  const props = {
    getProperty: name => Object.prototype.hasOwnProperty.call(store, name) ? store[name] : null,
    setProperty: (name, value) => { store[name] = String(value); },
  };
  try {
    context.PropertiesService = { getScriptProperties: () => props };
    context.LockService = immediateScriptLock();
    context.telegramRequest_ = (method, payload) => {
      if (method === 'getMe') return { has_topics_enabled: true };
      if (method === 'createForumTopic') {
        assert.fail('all folder topics already exist and must not be recreated');
      }
      if (method === 'sendMessage') {
        sendCalls.push(payload);
        return { message_id: 9001 };
      }
      return {};
    };

    context.ensureTelegramMailTopics_();
    context.ensureTelegramMailTopics_();

    assert.equal(sendCalls.length, 1, 'repeated setup must not duplicate a topic header');
    const header = sendCalls[0];
    assert.equal(header.chat_id, '123');
    assert.equal(header.message_thread_id, topics.inbox);
    assert.equal(header.disable_notification, true);
    const buttons = JSON.parse(header.reply_markup).inline_keyboard.flat();
    assert.equal(buttons.length, 1);
    assert.equal(buttons[0].web_app.url, context.mailboxFolderUrl_('inbox'));
    assert.match(buttons[0].web_app.url, /[?&]action=mailbox#view=list&folder=inbox$/);

    const savedHeaders = JSON.parse(store.TELEGRAM_TOPIC_HEADERS);
    assert.equal(savedHeaders.inbox, 9001);
    assert.deepEqual(
      Object.keys(savedHeaders).sort(),
      topicKeys.slice().sort(),
      'the persisted header map must retain existing headers and add the new one'
    );
    const versioned = JSON.parse(store.TELEGRAM_MAIL_TOPIC_STATE);
    assert.equal(versioned.chatId, '123');
    assert.equal(versioned.roles.inbox, 'canonical');
    assert.equal(versioned.roles.starred, 'index');
    assert.equal(versioned.roles.system, 'index');
    assert.equal(store.TELEGRAM_TOPICS_STATUS, 'ready');
  } finally {
    Object.assign(context, originals);
  }
});

test('topic state is CHAT_ID-bound and ready is impossible with a missing header', () => {
  const topicKeys = Object.keys(context.telegramTopicRoles_());
  const topics = Object.fromEntries(topicKeys.map((key, index) => [key, 100 + index]));
  const oldState = {
    version: 1,
    topologyVersion: 2,
    chatId: 'old-chat',
    topics,
    headers: topics,
  };
  const memory = memoryProperties({
    CHAT_ID: 'new-chat',
    TELEGRAM_MAIL_TOPIC_STATE: JSON.stringify(oldState),
    TELEGRAM_MAIL_TOPICS_CHAT_ID: 'old-chat',
  });
  const originals = {
    PropertiesService: context.PropertiesService,
    LockService: context.LockService,
    telegramRequest_: context.telegramRequest_,
  };
  try {
    context.PropertiesService = memory.service;
    context.LockService = immediateScriptLock();
    assert.deepEqual(
      JSON.parse(JSON.stringify(context.loadTelegramTopicState_(memory.service.getScriptProperties()).topics)),
      {},
      'topic IDs from another private chat must never be reused'
    );

    memory.store.TELEGRAM_MAIL_TOPIC_STATE = JSON.stringify({
      ...oldState,
      chatId: 'new-chat',
      headers: Object.fromEntries(topicKeys.slice(1).map((key, index) => [key, 500 + index])),
    });
    memory.store.TELEGRAM_MAIL_TOPICS_CHAT_ID = 'new-chat';
    context.telegramRequest_ = method => {
      if (method === 'getMe') return { has_topics_enabled: true };
      if (method === 'createForumTopic') assert.fail('all topic IDs already exist');
      if (method === 'sendMessage') throw new Error('temporary header failure');
      return {};
    };
    context.ensureTelegramMailTopics_();
    assert.match(memory.store.TELEGRAM_TOPICS_STATUS, /^incomplete:/);
    assert.notEqual(memory.store.TELEGRAM_TOPICS_STATUS, 'ready');
  } finally {
    Object.assign(context, originals);
  }
});

test('mailbox launches through the top-level Telegram Web App without URL credentials', () => {
  const inbox = context.mailboxFolderUrl_('inbox');
  const thread = context.mailboxAppUrl_('thread', '19f5f8958d96673c', '19f5f8958d96673d');

  for (const url of [inbox, thread]) {
    assert.match(url, /^https:\/\/tarasevych\.github\.io\/gmail-telegram-controls\?/);
    assert.match(url, /[?&]action=mailbox(?:#|$)/);
    assert.doesNotMatch(url, /[?&](?:key|token|session|refresh(?:_?token)?|init_data)=/i);
    assert.doesNotMatch(url, /script\.google\.com\/macros\/s\//i);
  }
  assert.match(inbox, /#view=list&folder=inbox$/);
  assert.match(thread, /#view=thread&thread=19f5f8958d96673c&message=19f5f8958d96673d$/);
});

test('mailbox bootstrap form POST precedes the legacy private-key path', () => {
  const mailboxBranch = miniAppSource.indexOf("if (action === 'mailbox')");
  const keyGuard = miniAppSource.indexOf("if (!/^[A-Za-z0-9_-]{40,128}$/.test(key))");
  assert.ok(mailboxBranch >= 0 && keyGuard > mailboxBranch);
  assert.match(miniAppSource, /form\.method\s*=\s*['"]post['"]/i);
  assert.match(miniAppSource, /form\.enctype\s*=\s*['"]application\/x-www-form-urlencoded['"]/i);
  assert.match(miniAppSource, /form\.action\s*=\s*BACKEND\s*\+\s*['"]\?action=mailbox['"]/);
  assert.match(miniAppSource, /addField\(['"]mailbox_bootstrap['"],\s*['"]1['"]\)/);
  assert.match(miniAppSource, /addField\(['"]init_data['"],\s*initData\)/);
  assert.match(miniAppSource, /addField\(['"]route['"],/);
  assert.match(miniAppSource, /history\.replaceState\(/);
  assert.match(miniAppSource, /Content-Security-Policy/i);
  assert.match(miniAppSource, /script-src[^>]+https:\/\/script\.google\.com[^>]+https:\/\/script\.googleusercontent\.com/i);
  assert.match(miniAppSource, /form-action[^>]+https:\/\/script\.google\.com[^>]+https:\/\/script\.googleusercontent\.com/i);
  assert.doesNotMatch(
    miniAppSource.slice(mailboxBranch, keyGuard),
    /searchParams\.set\(\s*['"](?:init_data|key|token|session|refreshToken)['"]/i,
    'mailbox bootstrap credentials must be carried only in the POST body'
  );
});

test('mailbox POST validates Telegram before rendering a short-lived session', () => {
  const originals = {
    mailboxOpenSession: context.mailboxOpenSession,
    validateTelegramMiniApp_: context.validateTelegramMiniApp_,
    claimMailboxLaunchInitData_: context.claimMailboxLaunchInitData_,
    storeMailboxLaunchSession_: context.storeMailboxLaunchSession_,
    serveMailboxApp_: context.serveMailboxApp_,
    PropertiesService: context.PropertiesService,
  };
  const calls = [];
  try {
    context.PropertiesService = {
      getScriptProperties: () => ({
        getProperty: () => { throw new Error('webhook properties must not be read for mailbox launch'); },
      }),
    };
    context.mailboxOpenSession = initData => {
      calls.push(initData);
      return {
        ok: true,
        data: {
          sessionToken: 's'.repeat(43),
          refreshToken: 'mbr1.' + 'p'.repeat(60) + '.' + 'r'.repeat(43),
        },
      };
    };
    context.validateTelegramMiniApp_ = () => ({ id: '123' });
    context.claimMailboxLaunchInitData_ = () => {};
    context.storeMailboxLaunchSession_ = (token, refreshToken) => {
      assert.equal(token, 's'.repeat(43));
      assert.equal(refreshToken, 'mbr1.' + 'p'.repeat(60) + '.' + 'r'.repeat(43));
      return 'n'.repeat(43);
    };
    context.serveMailboxApp_ = options => ({ rendered: options });

    const result = context.doPost({
      parameter: {
        action: 'mailbox',
        mailbox_bootstrap: '1',
        init_data: 'signed-telegram-init-data',
        route: 'view=thread&thread=19f5f8958d96673c&message=19f5f8958d96673d',
      },
    });
    assert.deepEqual(calls, ['signed-telegram-init-data']);
    assert.deepEqual(JSON.parse(JSON.stringify(result.rendered)), {
      launchNonce: 'n'.repeat(43),
      route: 'view=thread&thread=19f5f8958d96673c&message=19f5f8958d96673d',
    });
  } finally {
    Object.assign(context, originals);
  }
});

test('mailbox bridge strips Telegram launch metadata and preserves initData exactly', () => {
  const scripts = [...miniAppSource.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)]
    .map(match => match[1])
    .filter(Boolean);
  const script = scripts.at(-1);
  assert.ok(script && script.includes("if (action === 'mailbox')"));

  const submitted = { form: null, historyUrl: '' };
  const elements = new Map();
  function uiElement() {
    return {
      textContent: '',
      hidden: false,
      classList: { add() {}, remove() {}, toggle() {} },
    };
  }
  for (const id of ['card', 'logo', 'title', 'status', 'bar']) elements.set(id, uiElement());
  const document = {
    getElementById: id => elements.get(id),
    createElement: tag => {
      if (tag === 'form') {
        const form = {
          fields: [],
          appendChild(input) { this.fields.push(input); },
          submit() { submitted.form = this; },
        };
        return form;
      }
      return {};
    },
    body: { appendChild() {} },
    head: { appendChild() {} },
  };
  const rawInitData = 'query_id=A%2BB%3D%3D&user=%7B%22id%22%3A123%7D&hash=' + 'a'.repeat(64);
  const location = {
    search: '?v=test&action=mailbox',
    hash: '#view=list&folder=inbox&filter=unread&tgWebAppData=' + encodeURIComponent(rawInitData) +
      '&tgWebAppVersion=9.0&tgWebAppPlatform=tdesktop',
    pathname: '/gmail-telegram-controls/',
  };
  const tg = { platform: 'tdesktop', initData: rawInitData, ready() {}, expand() {} };
  const window = { Telegram: { WebApp: tg } };
  vm.runInNewContext(script, {
    window,
    document,
    location,
    history: { replaceState: (_state, _title, url) => { submitted.historyUrl = url; } },
    URL,
    URLSearchParams,
    Set,
    Date,
    Boolean,
    String,
    setTimeout: () => 1,
    clearTimeout: () => {},
  });

  assert.ok(submitted.form, 'mailbox form must submit');
  assert.equal(submitted.form.method, 'post');
  const fields = Object.fromEntries(submitted.form.fields.map(input => [input.name, input.value]));
  assert.deepEqual(fields, {
    mailbox_bootstrap: '1',
    init_data: rawInitData,
    route: 'view=list&folder=inbox&filter=unread',
  });
  assert.equal(
    submitted.historyUrl,
    '/gmail-telegram-controls/?v=test&action=mailbox#view=list&folder=inbox&filter=unread'
  );
  assert.doesNotMatch(submitted.historyUrl, /tgWebAppData|query_id|hash=/);
  assert.match(miniAppSource, /\['view', 'thread', 'message', 'folder', 'filter', 'panel'\]/);
});

test('mailbox launch routes are canonical and reject injected or oversized state', () => {
  assert.equal(
    context.normalizeMailboxLaunchRoute_('#view=list&folder=Drafts'),
    'view=list&folder=drafts'
  );
  assert.equal(
    context.normalizeMailboxLaunchRoute_('view=list&folder=label%3ALabel_123'),
    'view=list&folder=label%3ALabel_123'
  );
  for (const folder of [
    'snoozed', 'primary', 'social', 'promotions', 'updates', 'forums',
  ]) {
    assert.equal(
      context.normalizeMailboxLaunchRoute_('view=list&folder=' + folder),
      'view=list&folder=' + folder,
      folder + ' must remain a canonical Mini App deep link'
    );
  }
  assert.equal(context.normalizeMailboxLaunchRoute_('view=list&folder=inbox&evil=1'), '');
  assert.equal(context.normalizeMailboxLaunchRoute_('view=thread&thread=%3Cscript%3E'), '');
  assert.equal(context.normalizeMailboxLaunchRoute_('view=list&folder=' + 'a'.repeat(600)), '');
  assert.equal(context.normalizeMailboxLaunchRoute_('view=thread&thread=ok&thread=duplicate'), '');
});

test('a failed early Telegram callback acknowledgement does not cancel the Gmail action', () => {
  const originals = {
    PropertiesService: context.PropertiesService,
    isOwnPrivateUpdate_: context.isOwnPrivateUpdate_,
    claimTelegramUpdate_: context.claimTelegramUpdate_,
    telegramRequest_: context.telegramRequest_,
    routeTelegramUpdate_: context.routeTelegramUpdate_,
    completeTelegramUpdate_: context.completeTelegramUpdate_,
    failTelegramUpdate_: context.failTelegramUpdate_,
    webhookOk_: context.webhookOk_,
  };
  let routed = 0;
  try {
    context.PropertiesService = {
      getScriptProperties: () => ({
        getProperty: name => ({ WEBHOOK_KEY: 'secret', CHAT_ID: '123' })[name] || null,
      }),
    };
    context.isOwnPrivateUpdate_ = () => true;
    context.claimTelegramUpdate_ = () => 'new';
    context.telegramRequest_ = method => {
      if (method === 'answerCallbackQuery') throw new Error('temporary Telegram failure');
      return {};
    };
    context.routeTelegramUpdate_ = () => { routed += 1; };
    context.completeTelegramUpdate_ = () => 'd';
    context.failTelegramUpdate_ = () => 'f';
    context.webhookOk_ = () => 'ok';

    const result = context.doPost({
      parameter: { key: 'secret' },
      postData: { contents: JSON.stringify({
        update_id: 1,
        callback_query: { id: 'cb', data: 'mail:a:abcde12345' },
      }) },
    });
    assert.equal(result, 'ok');
    assert.equal(routed, 1);
  } finally {
    Object.assign(context, originals);
  }
});

test('native mailbox callback shows one short server result after Gmail work and never answers twice', () => {
  const originals = {
    PropertiesService: context.PropertiesService,
    isOwnPrivateUpdate_: context.isOwnPrivateUpdate_,
    claimTelegramUpdate_: context.claimTelegramUpdate_,
    routeTelegramUpdate_: context.routeTelegramUpdate_,
    answerTelegramCallback_: context.answerTelegramCallback_,
    completeTelegramUpdate_: context.completeTelegramUpdate_,
    failTelegramUpdate_: context.failTelegramUpdate_,
    webhookOk_: context.webhookOk_,
  };
  const events = [];
  try {
    context.PropertiesService = {
      getScriptProperties: () => ({
        getProperty: name => ({ WEBHOOK_KEY: 'secret', CHAT_ID: '123' })[name] || null,
      }),
    };
    context.isOwnPrivateUpdate_ = () => true;
    context.claimTelegramUpdate_ = () => 'new';
    context.routeTelegramUpdate_ = () => {
      events.push('server:start');
      events.push('server:complete');
      events.push('card:done');
      return { ok: true, message: 'Лист архівовано' };
    };
    context.answerTelegramCallback_ = (callbackId, message) => {
      events.push(`ack:${callbackId}:${message}`);
    };
    context.completeTelegramUpdate_ = () => 'd';
    context.failTelegramUpdate_ = () => 'f';
    context.webhookOk_ = () => 'ok';

    const result = context.doPost({
      parameter: { key: 'secret' },
      postData: { contents: JSON.stringify({
        update_id: 2,
        callback_query: {
          id: 'cb-result',
          data: context.mailboxCallbackData_('archive', 'abcde12345'),
        },
      }) },
    });

    assert.equal(result, 'ok');
    assert.deepEqual(events, [
      'server:start',
      'server:complete',
      'card:done',
      'ack:cb-result:Лист архівовано',
    ]);
  } finally {
    Object.assign(context, originals);
  }
});

test('native mailbox failure produces one auto-disappearing toast after the server error', () => {
  const originals = {
    PropertiesService: context.PropertiesService,
    isOwnPrivateUpdate_: context.isOwnPrivateUpdate_,
    claimTelegramUpdate_: context.claimTelegramUpdate_,
    routeTelegramUpdate_: context.routeTelegramUpdate_,
    answerTelegramCallback_: context.answerTelegramCallback_,
    failTelegramUpdate_: context.failTelegramUpdate_,
    markTelegramCallbackFailure_: context.markTelegramCallbackFailure_,
    webhookOk_: context.webhookOk_,
  };
  const events = [];
  try {
    context.PropertiesService = memoryProperties({ WEBHOOK_KEY: 'secret', CHAT_ID: '123' }).service;
    context.isOwnPrivateUpdate_ = () => true;
    context.claimTelegramUpdate_ = () => 'new';
    context.routeTelegramUpdate_ = () => {
      events.push('server:error');
      throw new Error('Gmail unavailable');
    };
    context.failTelegramUpdate_ = () => { events.push('journal:failed'); };
    context.markTelegramCallbackFailure_ = () => { events.push('card:retry'); };
    context.answerTelegramCallback_ = (id, message) => events.push(`toast:${id}:${message}`);
    context.webhookOk_ = () => 'ok';

    context.doPost({
      parameter: { key: 'secret' },
      postData: { contents: JSON.stringify({
        update_id: 89,
        callback_query: {
          id: 'cb-error',
          data: context.mailboxCallbackData_('archive', 'abcde12345'),
        },
      }) },
    });
    assert.deepEqual(events, [
      'server:error',
      'journal:failed',
      'card:retry',
      'toast:cb-error:⚠️ Gmail unavailable',
    ]);
    assert.equal(events.filter(item => item.startsWith('toast:')).length, 1);
  } finally {
    Object.assign(context, originals);
  }
});

test('mail moves copy the card to the destination topic before deleting the source', () => {
  const originals = {
    PropertiesService: context.PropertiesService,
    LockService: context.LockService,
    telegramTopicId_: context.telegramTopicId_,
    telegramRequest_: context.telegramRequest_,
  };
  const topicIds = {
    inbox: 101,
    archive: 102,
    trash: 103,
    spam: 104,
  };
  const cases = [
    ['archive', 'archive', 'inbox'],
    ['trash', 'trash', 'untrash'],
    ['spam', 'spam', 'notSpam'],
    ['inbox', 'inbox', 'archive'],
    ['untrash', 'inbox', 'archive'],
    ['notSpam', 'inbox', 'archive'],
  ];
  try {
    context.telegramTopicId_ = name => topicIds[name] || null;
    for (const [index, [action, destination, expectedInverse]] of cases.entries()) {
      const memory = memoryProperties({ CHAT_ID: '123' });
      context.PropertiesService = memory.service;
      context.LockService = immediateScriptLock();
      const calls = [];
      context.telegramRequest_ = (method, payload) => {
        calls.push({ method, payload });
        return method === 'copyMessage' ? { message_id: 900 } : true;
      };
      const messageId = 'abcde12345';
      const replyMarkup = JSON.parse(context.buildMailKeyboard_(
        'https://mail.google.com/mail/u/0/#all/thread',
        'sender@example.com',
        [],
        messageId,
        { available: true, mode: 'one_click' }
      ));

      const sourceMessageId = 456 + index;
      context.finalizeMailboxCallback_(
        { chat: { id: 123 }, message_id: sourceMessageId, reply_markup: replyMarkup },
        context.mailboxCallbackData_(action, messageId),
        action,
        messageId
      );

      assert.deepEqual(
        calls.map(call => call.method),
        ['copyMessage', 'deleteMessage'],
        `${action} must copy first and delete the source only after a successful copy`
      );
      assert.equal(calls[0].payload.chat_id, '123');
      assert.equal(calls[0].payload.from_chat_id, '123');
      assert.equal(calls[0].payload.message_id, sourceMessageId);
      assert.equal(calls[0].payload.message_thread_id, topicIds[destination]);
      assert.equal(calls[0].payload.disable_notification, true);
      assert.equal(calls[1].payload.message_id, sourceMessageId);

      const relocatedButtons = JSON.parse(calls[0].payload.reply_markup).inline_keyboard.flat();
      const relocatedActions = relocatedButtons
        .map(button => context.parseMailboxCallback_(button.callback_data))
        .filter(Boolean)
        .map(parsed => parsed.action);
      assert.ok(
        relocatedActions.includes(expectedInverse),
        `${action} must expose its inverse action after relocation`
      );
      assert.ok(
        !relocatedActions.includes(action) || action === expectedInverse,
        `${action} must not leave the already completed action active`
      );
    }
  } finally {
    Object.assign(context, originals);
  }
});

test('without private-chat topics a completed move hides the flat-chat card', () => {
  const originals = {
    telegramTopicId_: context.telegramTopicId_,
    telegramRequest_: context.telegramRequest_,
    PropertiesService: context.PropertiesService,
  };
  const calls = [];
  try {
    context.PropertiesService = memoryProperties({ CHAT_ID: '123' }).service;
    context.telegramTopicId_ = () => null;
    context.telegramRequest_ = (method, payload) => {
      calls.push({ method, payload });
      return true;
    };
    const messageId = 'abcde12345';
    const result = context.finalizeMailboxCallback_(
      { chat: { id: 123 }, message_id: 456, reply_markup: { inline_keyboard: [] } },
      context.mailboxCallbackData_('archive', messageId),
      'archive',
      messageId
    );

    assert.equal(calls.length, 1);
    assert.equal(calls[0].method, 'deleteMessage');
    assert.equal(calls[0].payload.chat_id, '123');
    assert.equal(calls[0].payload.message_id, 456);
    assert.equal(result.hidden, true);
    assert.equal(result.sourceDeleted, true);
    assert.equal(result.retryNeeded, undefined);
  } finally {
    Object.assign(context, originals);
  }
});

test('flat-chat card deletion failure retries Telegram only after Gmail success', () => {
  const memory = memoryProperties({ CHAT_ID: '123' });
  const originals = {
    PropertiesService: context.PropertiesService,
    executeMailboxAction_: context.executeMailboxAction_,
    telegramTopicId_: context.telegramTopicId_,
    telegramRequest_: context.telegramRequest_,
    markMailboxCallbackDone_: context.markMailboxCallbackDone_,
  };
  let gmailCalls = 0;
  let deleteCalls = 0;
  try {
    context.PropertiesService = memory.service;
    context.executeMailboxAction_ = () => {
      gmailCalls += 1;
      return { ok: true };
    };
    context.telegramTopicId_ = () => null;
    context.markMailboxCallbackDone_ = () => {};
    context.telegramRequest_ = method => {
      assert.equal(method, 'deleteMessage');
      deleteCalls += 1;
      if (deleteCalls === 1) throw new Error('temporary Telegram failure');
      return true;
    };
    const mailbox = { action: 'archive', messageId: 'abcde12345' };
    const query = {
      data: context.mailboxCallbackData_('archive', mailbox.messageId),
      message: { chat: { id: 123 }, message_id: 456, reply_markup: { inline_keyboard: [] } },
    };

    assert.throws(
      () => context.executeDurableMailboxCallback_(91, query, mailbox),
      /Telegram-картку/
    );
    const result = context.executeDurableMailboxCallback_(91, query, mailbox);
    assert.equal(result.message, '✅ Архівовано');
    assert.equal(gmailCalls, 1);
    assert.equal(deleteCalls, 2);
  } finally {
    Object.assign(context, originals);
  }
});

test('callback message mutations use the lossless configured owner chat ID', () => {
  const originals = {
    PropertiesService: context.PropertiesService,
    telegramRequest_: context.telegramRequest_,
  };
  const calls = [];
  try {
    context.PropertiesService = {
      getScriptProperties: () => ({
        getProperty: name => name === 'CHAT_ID' ? '77377267392' : null,
      }),
    };
    context.telegramRequest_ = (method, payload) => {
      calls.push({ method, payload });
      return true;
    };
    const messageId = 'abcde12345';
    const replyMarkup = JSON.parse(context.buildMailKeyboard_(
      'https://mail.google.com/mail/u/0/#all/thread',
      'sender@example.com',
      [],
      messageId,
      { available: false, mode: 'none' }
    ));

    context.updateMailboxToggle_(
      { chat: { id: 77377267392 }, message_id: 456, reply_markup: replyMarkup },
      context.mailboxCallbackData_('star', messageId),
      'star',
      messageId
    );

    assert.equal(calls.length, 1);
    assert.equal(calls[0].method, 'editMessageReplyMarkup');
    assert.equal(calls[0].payload.chat_id, '77377267392');
    const updatedButtons = JSON.parse(calls[0].payload.reply_markup).inline_keyboard.flat();
    const inverseStar = updatedButtons.find(button => {
      const parsed = context.parseMailboxCallback_(button.callback_data);
      return parsed && parsed.action === 'unstar';
    });
    assert.ok(inverseStar);
    assert.equal(inverseStar.text, '⭐ Зняти зірочку');
  } finally {
    Object.assign(context, originals);
  }
});

test('a failed topic copy never deletes the source card', () => {
  const originals = {
    PropertiesService: context.PropertiesService,
    LockService: context.LockService,
    telegramTopicId_: context.telegramTopicId_,
    telegramRequest_: context.telegramRequest_,
  };
  const methods = [];
  try {
    context.PropertiesService = memoryProperties({ CHAT_ID: '123' }).service;
    context.LockService = immediateScriptLock();
    context.telegramTopicId_ = () => 102;
    context.telegramRequest_ = (method) => {
      methods.push(method);
      if (method === 'copyMessage') throw new Error('temporary copy failure');
      return true;
    };
    const messageId = 'abcde12345';
    const replyMarkup = JSON.parse(context.buildMailKeyboard_(
      'https://mail.google.com/mail/u/0/#all/thread',
      'sender@example.com',
      [],
      messageId,
      { available: true, mode: 'one_click' }
    ));

    context.finalizeMailboxCallback_(
      { chat: { id: 123 }, message_id: 456, reply_markup: replyMarkup },
      context.mailboxCallbackData_('archive', messageId),
      'archive',
      messageId
    );

    assert.deepEqual(methods, ['copyMessage', 'editMessageReplyMarkup']);
    assert.ok(!methods.includes('deleteMessage'));
  } finally {
    Object.assign(context, originals);
  }
});

test('an uncertain copyMessage outcome is abandoned without retrying or deleting the source', () => {
  const memory = memoryProperties({ CHAT_ID: '123' });
  const originals = {
    PropertiesService: context.PropertiesService,
    LockService: context.LockService,
    telegramRequest_: context.telegramRequest_,
  };
  const calls = [];
  try {
    context.PropertiesService = memory.service;
    context.LockService = immediateScriptLock();
    context.telegramRequest_ = method => {
      calls.push(method);
      const error = new Error('copy transport lost');
      error.telegramOutcomeUncertain = true;
      throw error;
    };
    const propertyKey = 'TELEGRAM_CARD_MOVE_123_501_102';
    context.saveTelegramCardMove_({
      propertyKey,
      chatId: '123',
      gmailMessageId: 'copy_uncertain_12345',
      sourceMessageId: 501,
      sourceThreadId: 101,
      destination: 'archive',
      destinationThreadId: 102,
      destinationMessageId: 0,
      replyMarkup: '{}',
      state: 'copy_pending',
      copyAttempts: 0,
      deleteAttempts: 0,
      nextRetryAt: 0,
      lastError: '',
      createdAt: Date.now(),
    });

    const first = context.runTelegramCardMove_(propertyKey);
    const second = context.runTelegramCardMove_(propertyKey);
    assert.equal(first.moved, false);
    assert.equal(first.sourceDeleted, false);
    assert.equal(second.sourceDeleted, false);
    assert.deepEqual(calls, ['copyMessage']);
    const stored = JSON.parse(memory.store[propertyKey]);
    assert.equal(stored.state, 'abandoned');
    assert.equal(stored.copyOutcomeUncertain, true);
    assert.equal(stored.destinationMessageId, 0);
  } finally {
    Object.assign(context, originals);
  }
});

test('an expired copying lease is quarantined without issuing a second copyMessage', () => {
  const memory = memoryProperties({ CHAT_ID: '123' });
  const originals = {
    PropertiesService: context.PropertiesService,
    LockService: context.LockService,
    telegramRequest_: context.telegramRequest_,
  };
  const calls = [];
  try {
    context.PropertiesService = memory.service;
    context.LockService = immediateScriptLock();
    context.telegramRequest_ = method => { calls.push(method); return { message_id: 999 }; };
    const propertyKey = 'TELEGRAM_CARD_MOVE_123_777_202';
    context.saveTelegramCardMove_({
      propertyKey,
      chatId: '123',
      gmailMessageId: 'stale_copying_12345',
      sourceMessageId: 777,
      sourceThreadId: 101,
      destination: 'archive',
      destinationThreadId: 202,
      destinationMessageId: 0,
      replyMarkup: '{}',
      state: 'copying',
      copyAttempts: 1,
      deleteAttempts: 0,
      nextRetryAt: 0,
      lastError: '',
      createdAt: Date.now() - 10 * 60 * 1000,
    });
    const stored = JSON.parse(memory.store[propertyKey]);
    stored.updatedAt = Date.now() - 10 * 60 * 1000;
    memory.store[propertyKey] = JSON.stringify(stored);

    const result = context.runTelegramCardMove_(propertyKey);
    assert.equal(result.moved, false);
    assert.equal(result.sourceDeleted, false);
    assert.match(result.warning, /copyMessage|автоматичного повтору/i);
    assert.deepEqual(calls, [], 'stale unknown copy outcome must not create another copy');
    const quarantined = JSON.parse(memory.store[propertyKey]);
    assert.equal(quarantined.state, 'abandoned');
    assert.equal(quarantined.copyOutcomeUncertain, true);
    assert.equal(quarantined.destinationMessageId, 0);
  } finally {
    Object.assign(context, originals);
  }
});

test('exhausted card moves are audited once and require honest manual recovery', () => {
  const memory = memoryProperties({ CHAT_ID: '123' });
  const originals = {
    PropertiesService: context.PropertiesService,
    LockService: context.LockService,
    telegramRequest_: context.telegramRequest_,
  };
  const calls = [];
  try {
    context.PropertiesService = memory.service;
    context.LockService = immediateScriptLock();
    context.telegramRequest_ = method => {
      calls.push(method);
      throw new Error(method === 'copyMessage' ? 'copy remains unavailable' : 'delete remains unavailable');
    };

    const copyKey = 'TELEGRAM_CARD_MOVE_123_701_102';
    context.saveTelegramCardMove_({
      propertyKey: copyKey,
      gmailMessageId: 'copy_exhausted_12345',
      sourceMessageId: 701,
      destination: 'archive',
      destinationThreadId: 102,
      destinationMessageId: 0,
      replyMarkup: '{}',
      state: 'copy_pending',
      copyAttempts: 5,
      deleteAttempts: 0,
      nextRetryAt: 0,
      createdAt: Date.now(),
    });
    const copyResult = context.runTelegramCardMove_(copyKey);
    assert.match(copyResult.warning, /спроби[^]*вичерпано[^]*ручна перевірка/i);
    assert.equal(JSON.parse(memory.store[copyKey]).state, 'abandoned');
    assert.equal(JSON.parse(memory.store[copyKey]).nextRetryAt, 0);
    assert.equal(JSON.parse(memory.store[copyKey]).abandonReason, 'copy_retry_exhausted');

    const callsAfterCopy = calls.length;
    context.runTelegramCardMove_(copyKey);
    assert.equal(calls.length, callsAfterCopy, 'an abandoned copy must not be retried');
    let audit = JSON.parse(memory.store.TELEGRAM_CARD_MOVE_ABANDONED_AUDIT_V1);
    assert.equal(audit.total, 1, 're-reading an abandoned move must not double-count it');

    const deleteKey = 'TELEGRAM_CARD_MOVE_123_702_102';
    context.saveTelegramCardMove_({
      propertyKey: deleteKey,
      gmailMessageId: 'delete_exhausted_12345',
      sourceMessageId: 702,
      destination: 'archive',
      destinationThreadId: 102,
      destinationMessageId: 902,
      replyMarkup: '{}',
      state: 'delete_pending',
      copyAttempts: 1,
      deleteAttempts: 5,
      nextRetryAt: 0,
      createdAt: Date.now(),
    });
    const deleteResult = context.runTelegramCardMove_(deleteKey);
    assert.match(deleteResult.warning, /стару картку не прибрано[^]*спроби вичерпано[^]*ручна перевірка/i);
    assert.equal(JSON.parse(memory.store[deleteKey]).state, 'abandoned');
    assert.equal(JSON.parse(memory.store[deleteKey]).abandonReason, 'delete_retry_exhausted');
    audit = JSON.parse(memory.store.TELEGRAM_CARD_MOVE_ABANDONED_AUDIT_V1);
    assert.equal(audit.total, 2);
    assert.equal(audit.recentKeys.length, 2);
    assert.deepEqual(
      JSON.parse(JSON.stringify(context.telegramCardMoveAbandonmentStatus_(memory.service.getScriptProperties()))),
      {
        current: 2,
        total: 2,
        lastAt: audit.lastAt,
        lastStage: 'delete_retry_exhausted',
        lastError: audit.lastError,
      }
    );
  } finally {
    Object.assign(context, originals);
  }
});

test('copy success is persisted before delete and a delete retry never creates a second copy', () => {
  const memory = memoryProperties({ CHAT_ID: '123' });
  const originals = {
    PropertiesService: context.PropertiesService,
    LockService: context.LockService,
    telegramTopicId_: context.telegramTopicId_,
    telegramRequest_: context.telegramRequest_,
  };
  const calls = [];
  let deletionFails = true;
  try {
    context.PropertiesService = memory.service;
    context.LockService = immediateScriptLock();
    context.telegramTopicId_ = name => name === 'archive' ? 102 : null;
    context.telegramRequest_ = (method, payload) => {
      calls.push({ method, payload });
      if (method === 'copyMessage') return { message_id: 900 };
      if (method === 'deleteMessage' && deletionFails) throw new Error('temporary delete failure');
      return true;
    };
    const messageId = 'abcde12345';
    const replyMarkup = JSON.parse(context.buildMailKeyboard_(
      'https://mail.google.com/mail/u/0/#all/thread',
      'sender@example.com', [], messageId, { available: false, mode: 'none' }
    ));
    const first = context.finalizeMailboxCallback_(
      { chat: { id: 123 }, message_id: 456, message_thread_id: 101, reply_markup: replyMarkup },
      context.mailboxCallbackData_('archive', messageId),
      'archive',
      messageId
    );
    assert.equal(first.moved, true);
    assert.equal(first.sourceDeleted, false);
    assert.equal(calls.filter(call => call.method === 'copyMessage').length, 1);

    const moveKey = JSON.parse(memory.store.TELEGRAM_CARD_MOVE_INDEX)[0];
    let durableMove = JSON.parse(memory.store[moveKey]);
    assert.equal(durableMove.destinationMessageId, 900);
    assert.equal(durableMove.state, 'delete_pending');
    durableMove.nextRetryAt = 0;
    memory.store[moveKey] = JSON.stringify(durableMove);
    deletionFails = false;
    const retried = context.runTelegramCardMove_(moveKey);
    assert.equal(retried.sourceDeleted, true);
    assert.equal(calls.filter(call => call.method === 'copyMessage').length, 1,
      'delete retry must use the persisted copy ID and never call copyMessage again');
    assert.equal(calls.filter(call => call.method === 'deleteMessage').length, 2);
    durableMove = JSON.parse(memory.store[moveKey]);
    assert.equal(durableMove.state, 'done');
  } finally {
    Object.assign(context, originals);
  }
});

test('card-move ledger never evicts retryable work when active moves exceed the soft limit', () => {
  const memory = memoryProperties({ CHAT_ID: '123' });
  const originals = {
    PropertiesService: context.PropertiesService,
    LockService: context.LockService,
  };
  try {
    context.PropertiesService = memory.service;
    context.LockService = immediateScriptLock();
    const terminalKeys = [];
    for (let index = 0; index < 8; index += 1) {
      const propertyKey = `TELEGRAM_CARD_MOVE_123_${100 + index}_900`;
      terminalKeys.push(propertyKey);
      context.saveTelegramCardMove_({ propertyKey, state: index % 2 ? 'abandoned' : 'done' });
    }
    const activeKeys = [];
    for (let index = 0; index < 65; index += 1) {
      const propertyKey = `TELEGRAM_CARD_MOVE_123_${1000 + index}_900`;
      activeKeys.push(propertyKey);
      context.saveTelegramCardMove_({
        propertyKey,
        state: index % 3 === 0 ? 'copying' : (index % 3 === 1 ? 'copy_pending' : 'delete_pending'),
      });
    }

    const kept = JSON.parse(memory.store.TELEGRAM_CARD_MOVE_INDEX);
    assert.equal(kept.length, 65, 'all active work must survive even beyond the 60-record soft limit');
    assert.deepEqual(new Set(kept), new Set(activeKeys));
    activeKeys.forEach(key => assert.ok(memory.store[key], `missing active ledger ${key}`));
    terminalKeys.forEach(key => assert.equal(memory.store[key], undefined));
  } finally {
    Object.assign(context, originals);
  }
});

test('abandoned card move stays visible in status when active moves exceed the soft limit', () => {
  const memory = memoryProperties({ CHAT_ID: '123' });
  const originals = {
    PropertiesService: context.PropertiesService,
    LockService: context.LockService,
  };
  try {
    context.PropertiesService = memory.service;
    context.LockService = immediateScriptLock();
    const activeKeys = [];
    for (let index = 0; index < 65; index += 1) {
      const propertyKey = `TELEGRAM_CARD_MOVE_123_${4000 + index}_902`;
      activeKeys.push(propertyKey);
      context.saveTelegramCardMove_({
        propertyKey,
        state: 'copy_pending',
        sourceMessageId: 4000 + index,
        destinationMessageId: 0,
      });
    }

    const abandonedKey = activeKeys[0];
    context.saveTelegramCardMove_({
      propertyKey: abandonedKey,
      state: 'abandoned',
      abandonReason: 'copy_retry_exhausted',
      lastError: 'manual recovery required',
      sourceMessageId: 4000,
      destinationMessageId: 0,
    });

    assert.ok(memory.store[abandonedKey], 'the exact abandoned tombstone must remain durable');
    assert.ok(!JSON.parse(memory.store.TELEGRAM_CARD_MOVE_INDEX).includes(abandonedKey),
      'the saturation fixture must exercise the audit-only secondary index');
    const audit = JSON.parse(memory.store.TELEGRAM_CARD_MOVE_ABANDONED_AUDIT_V1);
    assert.ok(audit.recentKeys.includes(abandonedKey));
    assert.deepEqual(
      JSON.parse(JSON.stringify(context.telegramCardMoveAbandonmentStatus_(
        memory.service.getScriptProperties()
      ))),
      {
        current: 1,
        total: 1,
        lastAt: audit.lastAt,
        lastStage: 'copy_retry_exhausted',
        lastError: 'manual recovery required',
      }
    );
  } finally {
    Object.assign(context, originals);
  }
});

test('card-move ledger evicts oldest terminal records before any active move', () => {
  const memory = memoryProperties({ CHAT_ID: '123' });
  const originals = {
    PropertiesService: context.PropertiesService,
    LockService: context.LockService,
  };
  try {
    context.PropertiesService = memory.service;
    context.LockService = immediateScriptLock();
    const activeKeys = [];
    for (let index = 0; index < 8; index += 1) {
      const propertyKey = `TELEGRAM_CARD_MOVE_123_${2000 + index}_901`;
      activeKeys.push(propertyKey);
      context.saveTelegramCardMove_({ propertyKey, state: index % 2 ? 'copy_pending' : 'delete_pending' });
    }
    const terminalKeys = [];
    for (let index = 0; index < 60; index += 1) {
      const propertyKey = `TELEGRAM_CARD_MOVE_123_${3000 + index}_901`;
      terminalKeys.push(propertyKey);
      context.saveTelegramCardMove_({ propertyKey, state: index % 2 ? 'abandoned' : 'done' });
    }

    const kept = JSON.parse(memory.store.TELEGRAM_CARD_MOVE_INDEX);
    assert.equal(kept.length, 60);
    activeKeys.forEach(key => assert.ok(kept.includes(key), `active ledger was evicted: ${key}`));
    terminalKeys.slice(0, 8).forEach(key => {
      assert.ok(!kept.includes(key));
      assert.equal(memory.store[key], undefined);
    });
    terminalKeys.slice(8).forEach(key => assert.ok(kept.includes(key)));
  } finally {
    Object.assign(context, originals);
  }
});

test('mail-card registry never forgets an over-soft-limit card before Telegram confirms deletion', () => {
  const memory = memoryProperties({ CHAT_ID: '123' });
  const originals = {
    PropertiesService: context.PropertiesService,
    LockService: context.LockService,
    telegramRequest_: context.telegramRequest_,
  };
  try {
    context.PropertiesService = memory.service;
    context.LockService = immediateScriptLock();
    for (let index = 0; index < 61; index += 1) {
      context.saveTelegramMailCard_({
        gmailMessageId: `gmail_card_${String(index).padStart(3, '0')}`,
        gmailThreadId: `gmail_thread_${String(index).padStart(3, '0')}`,
        telegramMessageId: 5000 + index,
        messageThreadId: 0,
        topic: 'inbox',
        replyMarkup: '{}',
      });
    }
    let keys = JSON.parse(memory.store.TELEGRAM_MAIL_CARD_INDEX);
    assert.equal(keys.length, 61);
    const oldestKey = keys[0];
    assert.ok(memory.store[oldestKey], 'oldest over-soft-limit card must remain registered');
    assert.ok(context.utf8ByteLength_(memory.store.TELEGRAM_MAIL_CARD_INDEX) < 8500);

    context.telegramRequest_ = () => { throw new Error('temporary delete failure'); };
    assert.deepEqual(
      JSON.parse(JSON.stringify(context.purgeOldTelegramMailCards_(5))),
      { attempted: 1, removed: 0 }
    );
    assert.ok(memory.store[oldestKey], 'failed Telegram delete must retain the registry record');

    context.telegramRequest_ = () => true;
    assert.deepEqual(
      JSON.parse(JSON.stringify(context.purgeOldTelegramMailCards_(5))),
      { attempted: 1, removed: 1 }
    );
    keys = JSON.parse(memory.store.TELEGRAM_MAIL_CARD_INDEX);
    assert.equal(keys.length, 60);
    assert.equal(memory.store[oldestKey], undefined, 'record is removed only after confirmed delete');
  } finally {
    Object.assign(context, originals);
  }
});

test('new mail-card delivery is reserved before Telegram send and becomes active only after promotion', () => {
  const gmailMessageId = 'delivery12345';
  const memory = memoryProperties({ CHAT_ID: '123' });
  const originals = {
    PropertiesService: context.PropertiesService,
    LockService: context.LockService,
    cleanHeader_: context.cleanHeader_,
    senderName_: context.senderName_,
    senderEmail_: context.senderEmail_,
    selectAnalysisBody_: context.selectAnalysisBody_,
    analyzeMessage_: context.analyzeMessage_,
    formatSentDate_: context.formatSentDate_,
    buildMailKeyboard_: context.buildMailKeyboard_,
    getSenderPhoto_: context.getSenderPhoto_,
    telegramTopicId_: context.telegramTopicId_,
    sendTelegramText_: context.sendTelegramText_,
  };
  try {
    context.PropertiesService = memory.service;
    context.LockService = immediateScriptLock();
    context.cleanHeader_ = value => value;
    context.senderName_ = () => 'Sender';
    context.senderEmail_ = () => 'sender@example.com';
    context.selectAnalysisBody_ = () => 'Body';
    context.analyzeMessage_ = () => ({
      deadlines: [],
      amounts: [],
      otpCodes: [],
      importance: { icon: 'ℹ️', level: 'normal', reason: 'test' },
      action: '',
      essence: 'Test message',
    });
    context.formatSentDate_ = () => '15.07.2026 12:00';
    context.buildMailKeyboard_ = () => '{"inline_keyboard":[]}';
    context.getSenderPhoto_ = () => '';
    context.telegramTopicId_ = () => 101;
    context.sendTelegramText_ = () => {
      const keysAtSend = JSON.parse(memory.store.TELEGRAM_MAIL_CARD_INDEX);
      assert.equal(keysAtSend.length, 1, 'the registry slot must exist before Telegram send');
      const reserved = JSON.parse(memory.store[keysAtSend[0]]);
      assert.equal(reserved.state, 'delivery_reserved');
      assert.equal(reserved.gmailMessageId, gmailMessageId);
      assert.equal(
        context.readTelegramMailCards_({ gmailMessageId }).length,
        0,
        'a reservation is not an active Telegram card'
      );
      return { message_id: 7001 };
    };

    const sent = context.notifyMessage_({
      id: gmailMessageId,
      threadId: 'delivery_thread_12345',
      from: 'Sender <sender@example.com>',
      subject: 'Delivery test',
      plain: 'Body',
      html: '',
      snippet: 'Body',
      sentAt: '',
      timestamp: Date.now(),
      attachments: [],
      unsubscribe: { available: false, mode: 'none' },
      labelIds: ['INBOX'],
    });

    assert.equal(sent.message_id, 7001);
    const cards = context.readTelegramMailCards_({ gmailMessageId });
    assert.equal(cards.length, 1);
    assert.equal(cards[0].state, 'active');
    assert.equal(cards[0].telegramMessageId, 7001);
    assert.equal(cards[0].reservationId, undefined);
  } finally {
    Object.assign(context, originals);
  }
});

test('an uncertain Telegram send is durably quarantined and never resent automatically', () => {
  const gmailMessageId = 'uncertain_delivery_12345';
  const memory = memoryProperties({ CHAT_ID: '123' });
  const originals = {
    PropertiesService: context.PropertiesService,
    LockService: context.LockService,
    cleanHeader_: context.cleanHeader_,
    senderName_: context.senderName_,
    senderEmail_: context.senderEmail_,
    selectAnalysisBody_: context.selectAnalysisBody_,
    analyzeMessage_: context.analyzeMessage_,
    formatSentDate_: context.formatSentDate_,
    buildMailKeyboard_: context.buildMailKeyboard_,
    getSenderPhoto_: context.getSenderPhoto_,
    telegramTopicId_: context.telegramTopicId_,
    sendTelegramText_: context.sendTelegramText_,
  };
  let sends = 0;
  const message = {
    id: gmailMessageId,
    threadId: 'uncertain_thread_12345',
    from: 'Sender <sender@example.com>',
    subject: 'Uncertain delivery test',
    plain: 'Body', html: '', snippet: 'Body', sentAt: '', timestamp: Date.now(),
    attachments: [], unsubscribe: { available: false, mode: 'none' }, labelIds: ['INBOX'],
  };
  try {
    context.PropertiesService = memory.service;
    context.LockService = immediateScriptLock();
    context.cleanHeader_ = value => value;
    context.senderName_ = () => 'Sender';
    context.senderEmail_ = () => 'sender@example.com';
    context.selectAnalysisBody_ = () => 'Body';
    context.analyzeMessage_ = () => ({
      deadlines: [], amounts: [], otpCodes: [],
      importance: { icon: 'ℹ️', level: 'normal', reason: 'test' },
      action: '', essence: 'Test message',
    });
    context.formatSentDate_ = () => '15.07.2026 12:00';
    context.buildMailKeyboard_ = () => '{"inline_keyboard":[]}';
    context.getSenderPhoto_ = () => '';
    context.telegramTopicId_ = () => 101;
    context.sendTelegramText_ = () => {
      sends += 1;
      const error = new Error('synthetic transport loss');
      error.telegramOutcomeUncertain = true;
      throw error;
    };

    const first = context.notifyMessage_(message);
    const second = context.notifyMessage_(message);
    assert.equal(first.uncertain, true);
    assert.equal(second.uncertain, true);
    assert.equal(second.reused, true);
    assert.equal(sends, 1, 'an unknown send outcome must never be retried');
    assert.deepEqual(JSON.parse(memory.store.TELEGRAM_MAIL_CARD_INDEX), []);
    const keys = JSON.parse(memory.store.TELEGRAM_MAIL_DELIVERY_QUARANTINE_INDEX_V1);
    assert.equal(keys.length, 1);
    const durable = JSON.parse(memory.store[keys[0]]);
    assert.equal(durable.state, 'delivery_uncertain');
    assert.equal(durable.telegramMessageId, 0);
    assert.equal(durable.reservationId, undefined);
    assert.ok(JSON.parse(memory.store.SEEN_MESSAGE_IDS).includes(gmailMessageId));
    assert.equal(memory.store.TELEGRAM_MAIL_DELIVERY_QUARANTINE_TOTAL_V1, '1');
  } finally {
    Object.assign(context, originals);
  }
});

test('bounded uncertain-delivery quarantine cannot pin or exhaust the active mail-card registry', () => {
  const memory = memoryProperties({ CHAT_ID: '123' });
  const originals = {
    PropertiesService: context.PropertiesService,
    LockService: context.LockService,
    telegramRequest_: context.telegramRequest_,
  };
  try {
    context.PropertiesService = memory.service;
    context.LockService = immediateScriptLock();
    context.telegramRequest_ = () => true;

    for (let index = 0; index < 25; index += 1) {
      const reservation = context.reserveTelegramMailCardDelivery_({
        gmailMessageId: `uncertain_bound_${String(index).padStart(3, '0')}`,
        gmailThreadId: `uncertain_bound_thread_${String(index).padStart(3, '0')}`,
        messageThreadId: 101,
        topic: 'inbox',
        replyMarkup: '{}',
      });
      const error = new Error(`unknown-${index}`);
      error.telegramOutcomeUncertain = true;
      context.markTelegramMailCardDeliveryUncertain_(reservation, error);
    }

    const quarantineKeys = JSON.parse(memory.store.TELEGRAM_MAIL_DELIVERY_QUARANTINE_INDEX_V1);
    assert.equal(quarantineKeys.length, 20, 'quarantine must stay bounded');
    assert.equal(memory.store.TELEGRAM_MAIL_DELIVERY_QUARANTINE_TOTAL_V1, '25');
    assert.equal(memory.store.TELEGRAM_MAIL_CARD_uncertain_bound_000, undefined);
    assert.deepEqual(JSON.parse(memory.store.TELEGRAM_MAIL_CARD_INDEX), []);

    for (let index = 0; index < 60; index += 1) {
      context.saveTelegramMailCard_({
        gmailMessageId: `active_after_quarantine_${String(index).padStart(3, '0')}`,
        gmailThreadId: `active_after_quarantine_thread_${String(index).padStart(3, '0')}`,
        telegramMessageId: 7000 + index,
        messageThreadId: 101,
        topic: 'inbox',
        replyMarkup: '{}',
      });
    }
    for (let index = 0; index < 20; index += 1) {
      const reservation = context.reserveTelegramMailCardDelivery_({
        gmailMessageId: `fresh_after_quarantine_${String(index).padStart(3, '0')}`,
        gmailThreadId: `fresh_after_quarantine_thread_${String(index).padStart(3, '0')}`,
        messageThreadId: 101,
        topic: 'inbox',
        replyMarkup: '{}',
      });
      context.finalizeTelegramMailCardDelivery_(reservation, { message_id: 9000 + index });
    }
    assert.ok(JSON.parse(memory.store.TELEGRAM_MAIL_CARD_INDEX).length <= 61);
    assert.equal(JSON.parse(memory.store.TELEGRAM_MAIL_DELIVERY_QUARANTINE_INDEX_V1).length, 20);
  } finally {
    Object.assign(context, originals);
  }
});

test('a stale create reservation becomes at-most-once quarantine instead of being resent', () => {
  const memory = memoryProperties({ CHAT_ID: '123' });
  const originals = {
    PropertiesService: context.PropertiesService,
    LockService: context.LockService,
  };
  try {
    context.PropertiesService = memory.service;
    context.LockService = immediateScriptLock();
    const card = {
      gmailMessageId: 'stale_delivery_reservation_12345',
      gmailThreadId: 'stale_delivery_thread_12345',
      messageThreadId: 101,
      topic: 'inbox',
      replyMarkup: '{}',
    };
    const first = context.reserveTelegramMailCardDelivery_(card);
    const stored = JSON.parse(memory.store[first.propertyKey]);
    stored.createdAt = Date.now() - 10 * 60 * 1000;
    stored.updatedAt = stored.createdAt;
    memory.store[first.propertyKey] = JSON.stringify(stored);

    const recovered = context.reserveTelegramMailCardDelivery_(card);
    assert.equal(recovered.outcomeUncertain, true);
    assert.equal(recovered.reservationId, undefined);
    assert.equal(recovered.card.state, 'delivery_uncertain');
    assert.match(recovered.card.lastError, /Застаріла резервація|автоматичний повтор заборонено/);
    assert.deepEqual(JSON.parse(memory.store.TELEGRAM_MAIL_CARD_INDEX), []);
    assert.deepEqual(
      JSON.parse(memory.store.TELEGRAM_MAIL_DELIVERY_QUARANTINE_INDEX_V1),
      [first.propertyKey]
    );
    assert.ok(JSON.parse(memory.store.SEEN_MESSAGE_IDS).includes(card.gmailMessageId));
  } finally {
    Object.assign(context, originals);
  }
});

test('mail-card delivery hard limit counts reservations and cancellation releases a slot', () => {
  const memory = memoryProperties({ CHAT_ID: '123' });
  const originals = {
    PropertiesService: context.PropertiesService,
    LockService: context.LockService,
  };
  try {
    context.PropertiesService = memory.service;
    context.LockService = immediateScriptLock();
    const reservations = [];
    for (let index = 0; index < 72; index += 1) {
      reservations.push(context.reserveTelegramMailCardDelivery_({
        gmailMessageId: `reserved_card_${String(index).padStart(3, '0')}`,
        gmailThreadId: `reserved_thread_${String(index).padStart(3, '0')}`,
        messageThreadId: 101,
        topic: 'inbox',
        replyMarkup: '{}',
      }));
    }
    assert.equal(JSON.parse(memory.store.TELEGRAM_MAIL_CARD_INDEX).length, 72);
    assert.throws(
      () => context.reserveTelegramMailCardDelivery_({
        gmailMessageId: 'reserved_card_overflow',
        gmailThreadId: 'reserved_thread_overflow',
        messageThreadId: 101,
        topic: 'inbox',
        replyMarkup: '{}',
      }),
      /temporarily|тимчасово/i,
      'unfinalized reservations must consume the same hard-limit slots as active cards'
    );

    assert.equal(context.cancelTelegramMailCardDelivery_(reservations[0]), true);
    assert.equal(JSON.parse(memory.store.TELEGRAM_MAIL_CARD_INDEX).length, 71);
    assert.equal(memory.store[reservations[0].propertyKey], undefined);
    const replacement = context.reserveTelegramMailCardDelivery_({
      gmailMessageId: 'reserved_card_replacement',
      gmailThreadId: 'reserved_thread_replacement',
      messageThreadId: 101,
      topic: 'inbox',
      replyMarkup: '{}',
    });
    assert.equal(replacement.alreadyRegistered, false);
    assert.equal(JSON.parse(memory.store.TELEGRAM_MAIL_CARD_INDEX).length, 72);
  } finally {
    Object.assign(context, originals);
  }
});

test('mail-card promotion failure deletes the sent Telegram card and releases its reservation', () => {
  const gmailMessageId = 'promotion12345';
  const memory = memoryProperties({ CHAT_ID: '123' });
  const originals = {
    PropertiesService: context.PropertiesService,
    LockService: context.LockService,
    cleanHeader_: context.cleanHeader_,
    senderName_: context.senderName_,
    senderEmail_: context.senderEmail_,
    selectAnalysisBody_: context.selectAnalysisBody_,
    analyzeMessage_: context.analyzeMessage_,
    formatSentDate_: context.formatSentDate_,
    buildMailKeyboard_: context.buildMailKeyboard_,
    getSenderPhoto_: context.getSenderPhoto_,
    telegramTopicId_: context.telegramTopicId_,
    sendTelegramText_: context.sendTelegramText_,
    finalizeTelegramMailCardDelivery_: context.finalizeTelegramMailCardDelivery_,
    telegramRequest_: context.telegramRequest_,
  };
  const telegramCalls = [];
  try {
    context.PropertiesService = memory.service;
    context.LockService = immediateScriptLock();
    context.cleanHeader_ = value => value;
    context.senderName_ = () => 'Sender';
    context.senderEmail_ = () => 'sender@example.com';
    context.selectAnalysisBody_ = () => 'Body';
    context.analyzeMessage_ = () => ({
      deadlines: [],
      amounts: [],
      otpCodes: [],
      importance: { icon: 'ℹ️', level: 'normal', reason: 'test' },
      action: '',
      essence: 'Test message',
    });
    context.formatSentDate_ = () => '15.07.2026 12:00';
    context.buildMailKeyboard_ = () => '{}';
    context.getSenderPhoto_ = () => '';
    context.telegramTopicId_ = () => 101;
    context.sendTelegramText_ = () => ({ message_id: 8001 });
    context.finalizeTelegramMailCardDelivery_ = () => {
      throw new Error('temporary promotion failure');
    };
    context.telegramRequest_ = (method, payload) => {
      telegramCalls.push({ method, payload });
      return true;
    };

    assert.throws(
      () => context.notifyMessage_({
        id: gmailMessageId,
        threadId: 'promotion_thread_12345',
        from: 'Sender <sender@example.com>',
        subject: 'Promotion test',
        plain: 'Body',
        html: '',
        snippet: 'Body',
        sentAt: '',
        timestamp: Date.now(),
        attachments: [],
        unsubscribe: { available: false, mode: 'none' },
        labelIds: ['INBOX'],
      }),
      /temporary promotion failure/
    );
    assert.deepEqual(JSON.parse(JSON.stringify(telegramCalls)), [{
      method: 'deleteMessage',
      payload: { chat_id: '123', message_id: 8001 },
    }]);
    assert.deepEqual(JSON.parse(memory.store.TELEGRAM_MAIL_CARD_INDEX), []);
    assert.equal(context.readTelegramMailCards_({ gmailMessageId }).length, 0);
  } finally {
    Object.assign(context, originals);
  }
});

test('failed promotion plus unconfirmed compensation quarantines the known Telegram card', () => {
  const gmailMessageId = 'promotion_uncertain_12345';
  const memory = memoryProperties({ CHAT_ID: '123' });
  const originals = {
    PropertiesService: context.PropertiesService,
    LockService: context.LockService,
    cleanHeader_: context.cleanHeader_,
    senderName_: context.senderName_,
    senderEmail_: context.senderEmail_,
    selectAnalysisBody_: context.selectAnalysisBody_,
    analyzeMessage_: context.analyzeMessage_,
    formatSentDate_: context.formatSentDate_,
    buildMailKeyboard_: context.buildMailKeyboard_,
    getSenderPhoto_: context.getSenderPhoto_,
    telegramTopicId_: context.telegramTopicId_,
    sendTelegramText_: context.sendTelegramText_,
    finalizeTelegramMailCardDelivery_: context.finalizeTelegramMailCardDelivery_,
    telegramRequest_: context.telegramRequest_,
  };
  let sends = 0;
  try {
    context.PropertiesService = memory.service;
    context.LockService = immediateScriptLock();
    context.cleanHeader_ = value => value;
    context.senderName_ = () => 'Sender';
    context.senderEmail_ = () => 'sender@example.com';
    context.selectAnalysisBody_ = () => 'Body';
    context.analyzeMessage_ = () => ({
      deadlines: [], amounts: [], otpCodes: [],
      importance: { icon: 'ℹ️', level: 'normal', reason: 'test' },
      action: '', essence: 'Test message',
    });
    context.formatSentDate_ = () => '15.07.2026 12:00';
    context.buildMailKeyboard_ = () => '{}';
    context.getSenderPhoto_ = () => '';
    context.telegramTopicId_ = () => 101;
    context.sendTelegramText_ = () => { sends += 1; return { message_id: 8002 }; };
    context.finalizeTelegramMailCardDelivery_ = () => { throw new Error('promotion lost'); };
    context.telegramRequest_ = method => {
      assert.equal(method, 'deleteMessage');
      throw new Error('delete transport lost');
    };
    const message = {
      id: gmailMessageId, threadId: 'promotion_uncertain_thread_12345',
      from: 'Sender <sender@example.com>', subject: 'Promotion uncertain',
      plain: 'Body', html: '', snippet: 'Body', sentAt: '', timestamp: Date.now(),
      attachments: [], unsubscribe: { available: false, mode: 'none' }, labelIds: ['INBOX'],
    };

    const first = context.notifyMessage_(message);
    const second = context.notifyMessage_(message);
    assert.equal(first.uncertain, true);
    assert.equal(second.uncertain, true);
    assert.equal(second.reused, true);
    assert.equal(sends, 1);
    assert.deepEqual(JSON.parse(memory.store.TELEGRAM_MAIL_CARD_INDEX), []);
    const key = JSON.parse(memory.store.TELEGRAM_MAIL_DELIVERY_QUARANTINE_INDEX_V1)[0];
    const stored = JSON.parse(memory.store[key]);
    assert.equal(stored.state, 'delivery_uncertain');
    assert.equal(stored.telegramMessageId, 8002);
  } finally {
    Object.assign(context, originals);
  }
});

test('Telegram record indexes stay below the conservative Apps Script value limit', () => {
  const memory = memoryProperties({ CHAT_ID: '123' });
  const originals = {
    PropertiesService: context.PropertiesService,
    LockService: context.LockService,
  };
  try {
    context.PropertiesService = memory.service;
    context.LockService = immediateScriptLock();
    for (let index = 0; index < 72; index += 1) {
      context.saveTelegramCardMove_({
        propertyKey: `TELEGRAM_CARD_MOVE_123_${10000 + index}_${20000 + index}`,
        sourceMessageId: 10000 + index,
        destinationThreadId: 20000 + index,
        state: index < 12 ? 'copy_pending' : 'done',
      });
    }
    assert.ok(context.utf8ByteLength_(memory.store.TELEGRAM_CARD_MOVE_INDEX) < 8500);
    assert.ok(context.utf8ByteLength_(JSON.stringify(
      Array.from({ length: 32 }, (_, index) => [String(index), 'f', Date.now(), 1, 'x'.repeat(140)])
    )) < 8500);
  } finally {
    Object.assign(context, originals);
  }
});

test('stale Mini App reservation is recovered from read-only Gmail state and reconciles Telegram only', () => {
  const gmailMessageId = 'stale_archive_12345';
  const gmailThreadId = 'stale_thread_12345';
  const memory = memoryProperties({ CHAT_ID: '123' });
  const originals = {
    PropertiesService: context.PropertiesService,
    LockService: context.LockService,
    telegramTopicId_: context.telegramTopicId_,
    telegramRequest_: context.telegramRequest_,
    gmailApiRequest_: context.gmailApiRequest_,
  };
  const gmailCalls = [];
  const telegramCalls = [];
  try {
    context.PropertiesService = memory.service;
    context.LockService = immediateScriptLock();
    context.telegramTopicId_ = name => ({ inbox: 101, archive: 102 })[name] || null;
    context.telegramRequest_ = (method, payload) => {
      telegramCalls.push({ method, payload });
      return method === 'copyMessage' ? { message_id: 9101 } : true;
    };
    context.gmailApiRequest_ = (path, options) => {
      gmailCalls.push({ path, options });
      assert.equal(String(options && options.method || 'get').toLowerCase(), 'get');
      assert.equal(Object.prototype.hasOwnProperty.call(options || {}, 'body'), false);
      return {
        id: gmailThreadId,
        messages: [{
          id: gmailMessageId,
          threadId: gmailThreadId,
          labelIds: ['CATEGORY_PERSONAL'],
        }],
      };
    };
    context.saveTelegramMailCard_({
      gmailMessageId,
      gmailThreadId,
      telegramMessageId: 456,
      messageThreadId: 101,
      topic: 'inbox',
      replyMarkup: context.buildMailKeyboard_(
        'https://mail.google.com/mail/u/0/#all/thread',
        'sender@example.com', [], gmailMessageId, { available: false, mode: 'none' }
      ),
    });
    const reservation = context.prepareTelegramMailCardAction_({
      gmailMessageId,
      gmailThreadId,
      action: 'archive',
    });
    const record = JSON.parse(memory.store[reservation.propertyKey]);
    record.createdAt = Date.now() - 21 * 60 * 1000;
    record.updatedAt = record.createdAt;
    memory.store[reservation.propertyKey] = JSON.stringify(record);

    const retry = context.retryPendingTelegramMailCardActions_(5);

    assert.deepEqual(JSON.parse(JSON.stringify(retry)), { attempted: 1, completed: 1 });
    assert.equal(gmailCalls.length, 1);
    assert.match(gmailCalls[0].path, new RegExp(
      '^/threads/' + gmailThreadId + '\\?format=metadata'
    ));
    assert.deepEqual(telegramCalls.map(call => call.method), ['copyMessage', 'deleteMessage']);
    assert.equal(
      telegramCalls.some(call => String(call.method).toLowerCase().includes('gmail')),
      false
    );
    const completed = JSON.parse(memory.store[reservation.propertyKey]);
    assert.equal(completed.state, 'done');
    assert.equal(completed.outcome, 'queued');
    assert.notEqual(completed.outcome, 'reservation_expired');
    const cards = context.readTelegramMailCards_({ gmailMessageId });
    assert.equal(cards.length, 1);
    assert.equal(cards[0].telegramMessageId, 9101);
    assert.equal(cards[0].topic, 'archive');
  } finally {
    Object.assign(context, originals);
  }
});

test('ambiguous Gmail read failure leaves a stale Mini App reservation retryable', () => {
  const gmailMessageId = 'stale_failure_12345';
  const gmailThreadId = 'stale_failure_thread_12345';
  const memory = memoryProperties({ CHAT_ID: '123' });
  const originals = {
    PropertiesService: context.PropertiesService,
    LockService: context.LockService,
    telegramRequest_: context.telegramRequest_,
    gmailApiRequest_: context.gmailApiRequest_,
  };
  const gmailCalls = [];
  try {
    context.PropertiesService = memory.service;
    context.LockService = immediateScriptLock();
    context.telegramRequest_ = method => {
      assert.fail(`Telegram must wait for an unambiguous Gmail read, got ${method}`);
    };
    context.gmailApiRequest_ = (path, options) => {
      gmailCalls.push({ path, options });
      assert.equal(String(options && options.method || 'get').toLowerCase(), 'get');
      throw new Error('temporary Gmail metadata failure');
    };
    context.saveTelegramMailCard_({
      gmailMessageId,
      gmailThreadId,
      telegramMessageId: 457,
      messageThreadId: 101,
      topic: 'inbox',
      replyMarkup: '{}',
    });
    const reservation = context.prepareTelegramMailCardAction_({
      gmailMessageId,
      gmailThreadId,
      action: 'trash',
    });
    const record = JSON.parse(memory.store[reservation.propertyKey]);
    record.createdAt = Date.now() - 21 * 60 * 1000;
    record.updatedAt = record.createdAt;
    memory.store[reservation.propertyKey] = JSON.stringify(record);

    const retry = context.retryPendingTelegramMailCardActions_(5);

    assert.deepEqual(JSON.parse(JSON.stringify(retry)), { attempted: 1, completed: 0 });
    assert.equal(gmailCalls.length, 1);
    const retained = JSON.parse(memory.store[reservation.propertyKey]);
    assert.equal(retained.state, 'uncertain');
    assert.notEqual(retained.state, 'done');
    assert.notEqual(retained.outcome, 'reservation_expired');
    assert.match(retained.lastError, /temporary Gmail metadata failure/);
    assert.ok(retained.nextRetryAt > Date.now());
    assert.ok(JSON.parse(memory.store.TELEGRAM_MAIL_RECONCILE_INDEX).includes(reservation.propertyKey));
  } finally {
    Object.assign(context, originals);
  }
});

test('thread-level Mini App reconciliation moves every active card sharing the Gmail thread', () => {
  const gmailThreadId = 'shared_thread_12345';
  const memory = memoryProperties({ CHAT_ID: '123' });
  const originals = {
    PropertiesService: context.PropertiesService,
    LockService: context.LockService,
    telegramTopicId_: context.telegramTopicId_,
    telegramRequest_: context.telegramRequest_,
  };
  const calls = [];
  let copied = 0;
  try {
    context.PropertiesService = memory.service;
    context.LockService = immediateScriptLock();
    context.telegramTopicId_ = name => ({ inbox: 101, archive: 102 })[name] || null;
    context.telegramRequest_ = (method, payload) => {
      calls.push({ method, payload });
      if (method === 'copyMessage') {
        copied += 1;
        return { message_id: 9200 + copied };
      }
      return true;
    };
    const sharedCards = [
      { gmailMessageId: 'shared_message_1', telegramMessageId: 501 },
      { gmailMessageId: 'shared_message_2', telegramMessageId: 502 },
    ];
    sharedCards.forEach(card => context.saveTelegramMailCard_({
      ...card,
      gmailThreadId,
      messageThreadId: 101,
      topic: 'inbox',
      replyMarkup: '{}',
    }));
    context.saveTelegramMailCard_({
      gmailMessageId: 'other_message_3',
      gmailThreadId: 'other_thread_67890',
      telegramMessageId: 503,
      messageThreadId: 101,
      topic: 'inbox',
      replyMarkup: '{}',
    });

    const result = context.reconcileTelegramMailCardAction_({
      gmailMessageId: sharedCards[0].gmailMessageId,
      gmailThreadId,
      action: 'archive',
    });

    assert.equal(result.queued, 1);
    assert.equal(result.cardMoves, 2);
    assert.deepEqual(calls.map(call => call.method), [
      'copyMessage', 'deleteMessage', 'copyMessage', 'deleteMessage',
    ]);
    assert.deepEqual(
      calls.filter(call => call.method === 'copyMessage').map(call => call.payload.message_id),
      [501, 502],
      'the exact message ID must not narrow a thread-level reconciliation'
    );
    const movedCards = context.readTelegramMailCards_({ gmailThreadId });
    assert.equal(movedCards.length, 2);
    assert.deepEqual(
      Array.from(movedCards, card => String(card.gmailMessageId)).sort(),
      sharedCards.map(card => card.gmailMessageId).sort()
    );
    movedCards.forEach(card => {
      assert.equal(card.topic, 'archive');
      assert.equal(card.messageThreadId, 102);
    });
    const unrelated = context.readTelegramMailCards_({ gmailMessageId: 'other_message_3' });
    assert.equal(unrelated.length, 1);
    assert.equal(unrelated[0].topic, 'inbox');
    assert.equal(unrelated[0].telegramMessageId, 503);
  } finally {
    Object.assign(context, originals);
  }
});

test('Mini App reconciliation hook moves a registered card without touching Gmail', () => {
  const memory = memoryProperties({ CHAT_ID: '123' });
  const originals = {
    PropertiesService: context.PropertiesService,
    LockService: context.LockService,
    telegramTopicId_: context.telegramTopicId_,
    telegramRequest_: context.telegramRequest_,
  };
  const calls = [];
  try {
    context.PropertiesService = memory.service;
    context.LockService = immediateScriptLock();
    context.telegramTopicId_ = name => ({ inbox: 101, archive: 102 })[name] || null;
    context.telegramRequest_ = (method, payload) => {
      calls.push({ method, payload });
      return method === 'copyMessage' ? { message_id: 901 } : true;
    };
    const gmailMessageId = 'abcde12345';
    const replyMarkup = context.buildMailKeyboard_(
      'https://mail.google.com/mail/u/0/#all/thread',
      'sender@example.com', [], gmailMessageId, { available: false, mode: 'none' }
    );
    context.saveTelegramMailCard_({
      gmailMessageId,
      gmailThreadId: 'thread_12345',
      telegramMessageId: 456,
      messageThreadId: 101,
      topic: 'inbox',
      replyMarkup,
    });
    const result = context.reconcileTelegramMailCardAction_({
      gmailMessageId,
      gmailThreadId: 'thread_12345',
      action: 'archive',
    });
    assert.equal(result.queued, 1);
    assert.deepEqual(calls.map(call => call.method), ['copyMessage', 'deleteMessage']);
    const cards = context.readTelegramMailCards_({ gmailMessageId });
    assert.equal(cards[0].telegramMessageId, 901);
    assert.equal(cards[0].topic, 'archive');
    assert.equal(calls.some(call => String(call.method).toLowerCase().includes('gmail')), false);
  } finally {
    Object.assign(context, originals);
  }
});

test('Mini App reconciliation retries a failure before card-move ledger creation without Gmail replay', () => {
  const memory = memoryProperties({ CHAT_ID: '123' });
  const originals = {
    PropertiesService: context.PropertiesService,
    LockService: context.LockService,
    telegramTopicId_: context.telegramTopicId_,
    telegramRequest_: context.telegramRequest_,
    queueTelegramCardMove_: context.queueTelegramCardMove_,
  };
  const telegramMethods = [];
  let queueCalls = 0;
  try {
    context.PropertiesService = memory.service;
    context.LockService = immediateScriptLock();
    context.telegramTopicId_ = name => name === 'archive' ? 102 : 101;
    context.telegramRequest_ = (method) => {
      telegramMethods.push(method);
      return method === 'copyMessage' ? { message_id: 990 } : true;
    };
    const gmailMessageId = 'abcde67890';
    context.saveTelegramMailCard_({
      gmailMessageId,
      gmailThreadId: 'thread_67890',
      telegramMessageId: 789,
      messageThreadId: 101,
      topic: 'inbox',
      replyMarkup: context.buildMailKeyboard_(
        'https://mail.google.com/mail/u/0/#all/thread',
        'sender@example.com', [], gmailMessageId, { available: false, mode: 'none' }
      ),
    });
    context.queueTelegramCardMove_ = () => {
      queueCalls += 1;
      throw new Error('temporary ledger write failure');
    };

    const first = context.reconcileTelegramMailCardAction_({
      gmailMessageId,
      gmailThreadId: 'thread_67890',
      action: 'archive',
    });
    assert.equal(first.queued, 1, 'durable bridge request must be acknowledged');
    assert.equal(first.pending, true);
    const reconciliationKey = JSON.parse(memory.store.TELEGRAM_MAIL_RECONCILE_INDEX)[0];
    let reconciliation = JSON.parse(memory.store[reconciliationKey]);
    assert.equal(reconciliation.state, 'failed');
    assert.match(reconciliation.lastError, /temporary ledger write failure/);
    assert.equal(memory.store.TELEGRAM_CARD_MOVE_INDEX, undefined);

    reconciliation.nextRetryAt = 0;
    memory.store[reconciliationKey] = JSON.stringify(reconciliation);
    context.queueTelegramCardMove_ = originals.queueTelegramCardMove_;
    const retry = context.retryPendingTelegramMailCardActions_(5);
    assert.deepEqual(JSON.parse(JSON.stringify(retry)), { attempted: 1, completed: 1 });
    reconciliation = JSON.parse(memory.store[reconciliationKey]);
    assert.equal(reconciliation.state, 'done');
    assert.equal(reconciliation.outcome, 'queued');
    assert.deepEqual(telegramMethods, ['copyMessage', 'deleteMessage']);
    assert.equal(queueCalls, 1);
  } finally {
    Object.assign(context, originals);
  }
});

test('Mini App no-card reconciliation settles durably and timer entry point includes its retry queue', () => {
  const memory = memoryProperties({ CHAT_ID: '123' });
  const originals = {
    PropertiesService: context.PropertiesService,
    LockService: context.LockService,
  };
  try {
    context.PropertiesService = memory.service;
    context.LockService = immediateScriptLock();
    const result = context.reconcileTelegramMailCardAction_({
      gmailMessageId: 'missing12345',
      gmailThreadId: 'missingthread12345',
      action: 'trash',
    });
    assert.equal(result.queued, 1);
    assert.equal(result.pending, false);
    assert.equal(result.reason, 'no_card');
    const key = JSON.parse(memory.store.TELEGRAM_MAIL_RECONCILE_INDEX)[0];
    const record = JSON.parse(memory.store[key]);
    assert.equal(record.state, 'done');
    assert.equal(record.outcome, 'no_card');
    const timerBody = code.match(/function checkNewMail_\(\)\s*\{([\s\S]*?)\n\}/);
    assert.ok(timerBody);
  assert.match(timerBody[1], /retryPendingTelegramMailCardActions_\(5\)/);
  assert.match(timerBody[1], /mailboxProcessMetadataReconciliations_\(1\)/,
    'the minute timer must rotate one isolated Gmail metadata connection');
  } finally {
    Object.assign(context, originals);
  }
});

test('timer processes bot-managed snooze before the ordinary inbox poll', () => {
  const timerStart = code.indexOf('function checkNewMail_()');
  const snoozeWorker = code.indexOf('processDueBotManagedSnoozes_(10)', timerStart);
  const inboxPoll = code.indexOf("return runMailCheck_('timer')", timerStart);
  assert.ok(timerStart >= 0 && snoozeWorker > timerStart, 'timer must invoke the snooze worker');
  assert.ok(
    inboxPoll > snoozeWorker,
    'due snoozes must be restored before the normal inbox check observes current Gmail state'
  );
  assert.match(
    code,
    /public Gmail API documents `in:snoozed` for search but no write endpoint for[\s\S]{0,80}native snooze/i
  );
  assert.doesNotMatch(code, /processDueBotManagedSnoozes_[\s\S]{0,10000}method\s*:\s*['"]delete['"]/i);
});

test('more than twenty snooze repairs never evict the oldest and saturation remains recoverable', () => {
  const memory = memoryProperties();
  const originals = {
    PropertiesService: context.PropertiesService,
    LockService: context.LockService,
    gmailApiRequest_: context.gmailApiRequest_,
  };
  try {
    context.PropertiesService = memory.service;
    context.LockService = immediateScriptLock();
    const labelId = 'Label_repair_pressure';
    const repairKeys = [];
    for (let index = 0; index < 48; index += 1) {
      const threadId = `r${String(index).padStart(3, '0')}${'x'.repeat(124)}`;
      const saved = context.withBotSnoozeLock_(props => context.botSnoozeWriteRepairLocked_(props, {
        threadId,
        snoozeUntil: Date.now() - 1000,
        labelId,
        operationToken: `repair-pressure-${index}`,
        failedAt: Date.now() - (100000 - index),
        attempts: 8,
        repairReason: 'retry_exhausted',
      }));
      repairKeys.push(saved.propertyKey);
      if (index === 24) {
        assert.equal(context.botSnoozeRepairCount_(), 25, 'count above the old 20-item cap is honest');
        assert.ok(memory.store[repairKeys[0]], 'the oldest unresolved repair must still exist');
      }
    }
    assert.equal(JSON.parse(memory.store.BOT_SNOOZE_REPAIR_INDEX_V1).length, 48);
    assert.ok(
      Buffer.byteLength(memory.store.BOT_SNOOZE_REPAIR_INDEX_V1, 'utf8') < 8500,
      'the conservative cap must fit even 48 maximum-length Gmail IDs'
    );
    assert.ok(memory.store[repairKeys[0]], 'filling the bounded registry must not evict its oldest item');

    const overflowThreadId = 'thread_repair_pressure_overflow';
    const active = context.withBotSnoozeLock_(props => context.botSnoozeWriteRecordLocked_(props, {
      threadId: overflowThreadId,
      snoozeUntil: Date.now() - 1000,
      labelId,
      state: 'processing',
      processingKind: 'wake',
      operationToken: 'overflow-active-token',
      createdAt: Date.now() - 60000,
      updatedAt: Date.now() - 60000,
      nextRetryAt: 0,
      leaseUntil: 0,
      attempts: 8,
    }));
    assert.throws(
      () => context.withBotSnoozeLock_(props => context.botSnoozeMoveToRepairLocked_(
        props, active, 'retry_exhausted', new Error('persistent Gmail failure')
      )),
      error => error && error.botSnoozeCode === 'SNOOZE_REPAIR_CAPACITY'
    );
    const retained = JSON.parse(memory.store[active.propertyKey]);
    assert.equal(retained.state, 'repair_required');
    assert.equal(retained.repairReason, 'retry_exhausted');
    assert.ok(memory.store[repairKeys[0]], 'a rejected transition must not sacrifice older repair metadata');
    assert.equal(context.botSnoozeRepairCount_(), 49, 'terminal active fallback must be included in status');
    const recovery = context.prepareBotManagedSnoozeCancellation_(overflowThreadId, 'inbox');
    assert.equal(recovery.required, true);
    assert.equal(recovery.source, 'active_repair', 'the Gmail marker retains a direct Inbox recovery path');

    let gmailPosts = 0;
    context.gmailApiRequest_ = (requestPath, options) => {
      if (requestPath === '/labels' && String(options && options.method || 'get') === 'get') {
        return { labels: [{ id: labelId, name: 'Telegram/Відкладені', type: 'user' }] };
      }
      if (String(options && options.method || 'get').toLowerCase() === 'post') gmailPosts += 1;
      throw new Error(`Unexpected Gmail request: ${requestPath}`);
    };
    assert.throws(
      () => context.prepareBotManagedSnooze_({
        threadId: 'thread_repair_pressure_new',
        snoozeUntil: Date.now() + 60 * 60 * 1000,
      }),
      error => error && error.botSnoozeCode === 'SNOOZE_CAPACITY'
    );
    assert.equal(gmailPosts, 0, 'capacity backpressure must happen before any Gmail mutation');
    assert.equal(memory.store.BOT_SNOOZE_V1_thread_repair_pressure_new, undefined);
  } finally {
    Object.assign(context, originals);
  }
});

test('callback reports Gmail success and failed card relocation without deleting the source', () => {
  const originals = {
    PropertiesService: context.PropertiesService,
    LockService: context.LockService,
    isOwnPrivateUpdate_: context.isOwnPrivateUpdate_,
    claimTelegramUpdate_: context.claimTelegramUpdate_,
    executeMailboxAction_: context.executeMailboxAction_,
    telegramTopicId_: context.telegramTopicId_,
    telegramRequest_: context.telegramRequest_,
    completeTelegramUpdate_: context.completeTelegramUpdate_,
    failTelegramUpdate_: context.failTelegramUpdate_,
    webhookOk_: context.webhookOk_,
  };
  const calls = [];
  try {
    const messageId = 'abcde12345';
    const replyMarkup = JSON.parse(context.buildMailKeyboard_(
      'https://mail.google.com/mail/u/0/#all/thread',
      'sender@example.com',
      [],
      messageId,
      { available: true, mode: 'one_click' }
    ));
    context.PropertiesService = memoryProperties({
      WEBHOOK_KEY: 'secret', CHAT_ID: '123',
    }).service;
    context.LockService = immediateScriptLock();
    context.isOwnPrivateUpdate_ = () => true;
    context.claimTelegramUpdate_ = () => 'new';
    context.executeMailboxAction_ = () => {
      calls.push({ method: 'gmailAction' });
      return { ok: true, message: 'Лист архівовано' };
    };
    context.telegramTopicId_ = () => 102;
    context.completeTelegramUpdate_ = () => 'd';
    context.failTelegramUpdate_ = () => 'f';
    context.telegramRequest_ = (method, payload) => {
      calls.push({ method, payload });
      if (method === 'copyMessage') throw new Error('temporary copy failure');
      return true;
    };
    context.webhookOk_ = () => 'ok';

    const result = context.doPost({
      parameter: { key: 'secret' },
      postData: { contents: JSON.stringify({
        update_id: 3,
        callback_query: {
          id: 'cb-partial',
          data: context.mailboxCallbackData_('archive', messageId),
          message: {
            chat: { id: 123, type: 'private' },
            message_id: 456,
            reply_markup: replyMarkup,
          },
        },
      }) },
    });

    assert.equal(result, 'ok');
    assert.deepEqual(calls.map(call => call.method), [
      'gmailAction',
      'copyMessage',
      'editMessageReplyMarkup',
      'answerCallbackQuery',
    ]);
    assert.ok(!calls.some(call => call.method === 'deleteMessage'));
    const acknowledgement = calls.find(call => call.method === 'answerCallbackQuery').payload;
    assert.match(acknowledgement.text, /^✅ Архівовано/);
    assert.match(acknowledgement.text, /⚠️ картку буде перенесено/);
    const changedMarkup = JSON.parse(
      calls.find(call => call.method === 'editMessageReplyMarkup').payload.reply_markup
    );
    assert.ok(changedMarkup.inline_keyboard.flat().some(button => button.text === '✅ Архівовано'));
  } finally {
    Object.assign(context, originals);
  }
});

test('.eml document and its failure stay inside the originating Telegram topic', () => {
  const originals = {
    getGmailMessage_: context.getGmailMessage_,
    gmailApi_: context.gmailApi_,
    Utilities: context.Utilities,
    sendTelegramDocument_: context.sendTelegramDocument_,
    sendTelegramText_: context.sendTelegramText_,
  };
  const sent = [];
  try {
    context.getGmailMessage_ = () => ({ subject: 'Original', threadId: 'thread_1' });
    context.gmailApi_ = () => ({ raw: 'cmF3' });
    context.Utilities = {
      base64DecodeWebSafe: () => [1, 2, 3],
      newBlob: (bytes, mime, name) => ({ bytes, mime, name }),
    };
    context.sendTelegramDocument_ = (blob, caption, options) => {
      sent.push({ kind: 'document', blob, caption, options });
    };
    context.sendTelegramText_ = (html, markup, options) => {
      sent.push({ kind: 'text', html, options });
    };

    context.sendEmlForMessage_('abcde12345', 456, 789);
    assert.equal(sent[0].kind, 'document');
    assert.equal(sent[0].options.replyTo, 456);
    assert.equal(sent[0].options.threadId, 789);

    context.getGmailMessage_ = () => { throw new Error('temporary'); };
    context.sendEmlForMessage_('abcde12345', 457, 790);
    assert.equal(sent[1].kind, 'text');
    assert.equal(sent[1].options.replyTo, 457);
    assert.equal(sent[1].options.threadId, 790);
  } finally {
    Object.assign(context, originals);
  }
});

test('restore actions reverse archive, trash, and spam with Gmail label operations', () => {
  const calls = [];
  const originals = {
    recordMailboxAction_: context.recordMailboxAction_,
    gmailApiRequest_: context.gmailApiRequest_,
    getMailboxActionMetadata_: context.getMailboxActionMetadata_,
  };
  try {
    context.recordMailboxAction_ = () => {};
    context.gmailApiRequest_ = (requestPath, options) => {
      calls.push({ requestPath, options });
      return {};
    };

    context.getMailboxActionMetadata_ = () => ({
      labelIds: ['TRASH', 'SPAM'],
      subject: 'Test',
      headers: [],
    });
    context.executeMailboxAction_('inbox', 'abcde12345');
    assert.deepEqual(calls.map(call => call.requestPath), [
      '/messages/abcde12345/untrash',
      '/messages/abcde12345/modify',
    ]);
    assert.deepEqual(JSON.parse(JSON.stringify(calls[1].options.body)), {
      addLabelIds: ['INBOX'],
      removeLabelIds: ['SPAM'],
    });

    calls.length = 0;
    context.getMailboxActionMetadata_ = () => ({
      labelIds: ['TRASH'],
      subject: 'Test',
      headers: [],
    });
    context.executeMailboxAction_('untrash', 'abcde12345');
    assert.deepEqual(calls.map(call => call.requestPath), [
      '/messages/abcde12345/untrash',
      '/messages/abcde12345/modify',
    ]);
    assert.deepEqual(JSON.parse(JSON.stringify(calls[1].options.body)), {
      addLabelIds: ['INBOX'],
    });

    calls.length = 0;
    context.getMailboxActionMetadata_ = () => ({
      labelIds: ['SPAM'],
      subject: 'Test',
      headers: [],
    });
    context.executeMailboxAction_('notSpam', 'abcde12345');
    assert.deepEqual(calls.map(call => call.requestPath), [
      '/messages/abcde12345/modify',
    ]);
    assert.deepEqual(JSON.parse(JSON.stringify(calls[0].options.body)), {
      addLabelIds: ['INBOX'],
      removeLabelIds: ['SPAM'],
    });
  } finally {
    Object.assign(context, originals);
  }
});

test('webhook secret is compared in constant time before parsing an update', () => {
  const doPost = code.match(/function doPost\(e\)\s*\{([\s\S]*?)\n\}/);
  assert.ok(doPost, 'doPost must exist');
  assert.match(doPost[1], /constantTimeEqual_\(expectedKey,/);
  assert.equal(context.constantTimeEqual_('same-secret', 'same-secret'), true);
  assert.equal(context.constantTimeEqual_('same-secret', 'other-secret'), false);
  assert.equal(context.constantTimeEqual_('short', 'longer'), false);
});

test('trash and spam turn the clicked button into a result and remove stale mail actions', () => {
  const original = context.telegramRequest_;
  const calls = [];
  try {
    context.telegramRequest_ = (method, payload) => {
      calls.push({ method, payload });
      return { ok: true };
    };
    const messageId = 'abcde12345';
    const replyMarkup = JSON.parse(context.buildMailKeyboard_(
      'https://mail.google.com/mail/u/0/#all/thread',
      'sender@example.com',
      [],
      messageId,
      { available: true, mode: 'web', openUrl: 'https://news.example.com/unsubscribe' }
    ));
    context.markMailboxCallbackDone_(
      { chat: { id: 123 }, message_id: 456, reply_markup: replyMarkup },
      context.mailboxCallbackData_('trash', messageId),
      'trash'
    );

    assert.equal(calls.length, 1);
    assert.equal(calls[0].method, 'editMessageReplyMarkup');
    const buttons = JSON.parse(calls[0].payload.reply_markup).inline_keyboard.flat();
    assert.ok(buttons.some(button => button.text === '📨 Відкрити в Gmail'));
    assert.ok(buttons.some(button => button.text === '📎 Оригінал .eml'));
    assert.ok(buttons.some(button => button.text === '✅ У кошику'));
    assert.ok(!buttons.some(button => /^🗄|^🗑|^🚫|^🔕/.test(button.text)));
    assert.ok(!buttons.some(button => context.parseMailboxCallback_(button.callback_data)));
  } finally {
    context.telegramRequest_ = original;
  }
});

test('folder menu exposes deep Gmail views and unread uses a canonical filter route', () => {
  const menu = JSON.parse(context.folderControlMenu_());
  const buttons = menu.inline_keyboard.flat();
  const texts = buttons.map(button => button.text);
  for (const expected of [
    '📥 Вхідні', '📩 Непрочитані', '📤 Надіслані', '📝 Чернетки',
    '🕘 Відкладені', '🗄 Архів', '🗑 Кошик', '🚫 Спам',
    '⭐ Із зірочкою', '❗ Важливі', '📚 Уся пошта',
  ]) assert.ok(texts.includes(expected), expected);
  const unread = buttons.find(button => button.text === '📩 Непрочитані');
  assert.match(unread.web_app.url, /#view=list&folder=inbox&filter=unread$/);
  assert.equal(
    context.normalizeMailboxLaunchRoute_('view=list&folder=inbox&filter=unread'),
    'view=list&folder=inbox&filter=unread'
  );
  assert.equal(
    context.normalizeMailboxLaunchRoute_('view=list&folder=inbox&filter=attachments'),
    'view=list&folder=inbox&filter=hasAttachment'
  );
  assert.equal(
    context.normalizeMailboxLaunchRoute_('view=list&folder=inbox&filter=hasAttachment'),
    'view=list&folder=inbox&filter=hasAttachment'
  );
  assert.equal(context.normalizeMailboxLaunchRoute_('view=list&folder=inbox&filter=read'), '');
  assert.equal(context.normalizeMailboxLaunchRoute_('view=list&folder=inbox&filter=x%26panel%3Dlabels'), '');
});

test('mail card exposes bounded attachment downloads, original view, labels, and safe action links', () => {
  const attachments = Array.from({ length: 6 }, (_, index) => ({
    attachment: { name: `invoice-${index + 1}.pdf`, size: 1024 + index }, inline: false,
  }));
  const keyboard = JSON.parse(context.buildMailKeyboard_(
    'https://mail.google.com/mail/u/0/#all/thread',
    'sender@example.com', [], 'abcde12345', { available: false, mode: 'none' },
    'thread_12345', ['INBOX'], attachments,
    [{ text: '↗ Відкрити кабінет · example.com', url: 'https://example.com/account' }]
  ));
  const buttons = keyboard.inline_keyboard.flat();
  assert.ok(buttons.some(button => button.text === '📄 Оригінал у чаті' && button.callback_data === 'mail.original:abcde12345'));
  assert.ok(buttons.some(button => button.text === '🏷 Мітки' && /panel=labels$/.test(button.web_app.url)));
  assert.ok(buttons.some(button => button.url === 'https://example.com/account'));
  const attachmentButtons = buttons.filter(button => String(button.callback_data || '').startsWith('mail.att:'));
  assert.equal(attachmentButtons.length, 4, 'card must cap native attachment buttons');
  attachmentButtons.forEach((button, index) => {
    assert.ok(Buffer.byteLength(button.callback_data, 'utf8') <= 64);
    assert.deepEqual(
      { ...context.parseAttachmentCallback_(button.callback_data) },
      { messageId: 'abcde12345', index }
    );
  });
  assert.ok(buttons.some(button => button.text === '📎 Ще 2 вкладень'));
});

test('retention deletes a scoped tenant card in its own Telegram chat before forgetting it', () => {
  const memory = memoryProperties({ CHAT_ID: '123' });
  const originals = {
    PropertiesService: context.PropertiesService,
    LockService: context.LockService,
    telegramRequest_: context.telegramRequest_,
    mailReminderFreshActivityAtLocked_: context.mailReminderFreshActivityAtLocked_,
  };
  try {
    context.PropertiesService = memory.service;
    context.LockService = immediateScriptLock();
    context.saveTelegramMailCard_({
      chatId: '999', userId: '999', connectionId: 'gmail-tenant-unit',
      gmailMessageId: 'tenant_oldest', gmailThreadId: 'tenant_thread',
      telegramMessageId: 9001, messageThreadId: 0, topic: 'inbox', replyMarkup: '{}',
    });
    for (let index = 0; index < 60; index += 1) {
      context.saveTelegramMailCard_({
        gmailMessageId: `owner_card_${String(index).padStart(3, '0')}`,
        gmailThreadId: `owner_thread_${String(index).padStart(3, '0')}`,
        telegramMessageId: 9100 + index, messageThreadId: 0,
        topic: 'inbox', replyMarkup: '{}',
      });
    }
    const calls = [];
    context.telegramRequest_ = (method, payload) => {
      calls.push({ method, payload });
      return true;
    };
    assert.deepEqual(
      JSON.parse(JSON.stringify(context.purgeOldTelegramMailCards_(5))),
      { attempted: 1, removed: 1 }
    );
    assert.deepEqual(JSON.parse(JSON.stringify(calls)), [{
      method: 'deleteMessage',
      payload: { chat_id: '999', message_id: 9001 },
    }]);
    assert.equal(memory.store[
      context.telegramMailCardPropertyKey_('tenant_oldest', 'gmail-tenant-unit', '999')
    ], undefined);
  } finally {
    Object.assign(context, originals);
  }
});

test('scoped mail checks isolate identical Gmail IDs by Telegram user and connection', () => {
  const now = Date.now();
  const memory = memoryProperties({ BOT_TOKEN: 'test-token', CHAT_ID: '999' });
  const originals = {
    PropertiesService: context.PropertiesService,
    LockService: context.LockService,
    Utilities: context.Utilities,
    listGmailNotificationPage_: context.listGmailNotificationPage_,
    getGmailMessage_: context.getGmailMessage_,
    notifyMessage_: context.notifyMessage_,
  };
  const delivered = [];
  try {
    context.PropertiesService = memory.service;
    context.LockService = { getUserLock: () => ({ tryLock: () => true, releaseLock: () => {} }) };
    context.Utilities = {
      DigestAlgorithm: { SHA_256: 'SHA_256' },
      Charset: { UTF_8: 'UTF_8' },
      computeDigest: (_algorithm, value) => Array.from(crypto.createHash('sha256').update(String(value)).digest()),
    };
    const firstScope = {
      userId: '111', chatId: '111', connectionId: 'gmail-first', notificationMode: 'all',
      account: { id: 'gmail-first', email: 'first@example.com' },
    };
    const secondScope = {
      userId: '222', chatId: '222', connectionId: 'gmail-second', notificationMode: 'all',
      account: { id: 'gmail-second', email: 'second@example.com' },
    };
    [firstScope, secondScope].forEach(scope => {
      const scoped = context.gmailNotificationProperties_(memory.service.getScriptProperties(), scope);
      scoped.setProperty('STARTED_AT', String(now - 10000));
      scoped.setProperty('SEEN_MESSAGE_IDS', '[]');
      scoped.setProperty('GMAIL_NOTIFICATION_WATERMARK_MS', String(now - 10000));
    });
    context.listGmailNotificationPage_ = () => ({ ids: ['same_message_123'], nextPageToken: '' });
    context.getGmailMessage_ = id => ({ id, timestamp: now - 5000, labelIds: ['INBOX'] });
    context.notifyMessage_ = (message, options) => {
      delivered.push({ id: message.id, chatId: options.chatId, connectionId: options.account.id });
      return { message_id: delivered.length };
    };

    assert.equal(context.runMailCheck_('timer', firstScope).delivered, 1);
    assert.equal(context.runMailCheck_('timer', secondScope).delivered, 1);
    assert.deepEqual(delivered, [
      { id: 'same_message_123', chatId: '111', connectionId: 'gmail-first' },
      { id: 'same_message_123', chatId: '222', connectionId: 'gmail-second' },
    ]);
    const seenKeys = Object.keys(memory.store)
      .filter(name => /^GMAIL_NOTIFICATION_SCOPE_V1_[a-f0-9]{20}_S$/.test(name));
    assert.equal(seenKeys.length, 2);
    assert.notEqual(seenKeys[0], seenKeys[1]);
    seenKeys.forEach(name => assert.deepEqual(JSON.parse(memory.store[name]), ['same_message_123']));
    assert.equal(memory.store.SEEN_MESSAGE_IDS, undefined);
  } finally {
    Object.assign(context, originals);
  }
});

test('multi-account card binds actions originals and attachments to one Gmail connection', () => {
  const connectionId = 'gmail-account-unit';
  const keyboard = JSON.parse(context.buildMailKeyboard_(
    'https://mail.google.com/mail/?authuser=account@example.com#all/thread',
    'sender@example.com', [], 'abcde12345', { available: false, mode: 'none' },
    'thread_12345', ['INBOX'], [{ attachment: { name: 'invoice.pdf', size: 1024 }, inline: false }],
    [], connectionId
  ));
  const buttons = keyboard.inline_keyboard.flat();
  const archive = buttons.find(button => button.text === '🗄 Архівувати');
  assert.deepEqual({ ...context.parseMailboxCallback_(archive.callback_data) }, {
    action: 'archive', connectionId, messageId: 'abcde12345',
  });
  const original = buttons.find(button => button.text === '📄 Оригінал у чаті');
  assert.deepEqual({ ...context.parseMailboxContentCallback_(original.callback_data) }, {
    kind: 'original', connectionId, messageId: 'abcde12345',
  });
  const eml = buttons.find(button => button.text === '📎 Оригінал .eml');
  assert.deepEqual({ ...context.parseMailboxContentCallback_(eml.callback_data) }, {
    kind: 'eml', connectionId, messageId: 'abcde12345',
  });
  const attachment = buttons.find(button => String(button.callback_data || '').startsWith('a2.'));
  assert.deepEqual({ ...context.parseAttachmentCallback_(attachment.callback_data) }, {
    connectionId, messageId: 'abcde12345', index: 0,
  });
  [archive, original, eml, attachment].forEach(button => {
    assert.ok(Buffer.byteLength(button.callback_data, 'utf8') <= 64);
  });
});

test('Telegram cards expose an account-bound ADHD priority menu without mutating Gmail', () => {
  const connectionId = 'gmail-account-unit';
  const messageId = 'abcde12345';
  const keyboard = JSON.parse(context.buildMailKeyboard_(
    'https://mail.google.com/mail/?authuser=account@example.com#all/thread',
    'worker@example.com', [], messageId, { available: false, mode: 'none' },
    'thread_12345', ['INBOX'], [], [], connectionId
  ));
  const priorityButton = keyboard.inline_keyboard.flat()
    .find(button => button.text === '🎯 Персональний пріоритет');
  assert.ok(priorityButton);
  assert.deepEqual({ ...context.parseTelegramFocusCallback_(priorityButton.callback_data) }, {
    action: 'menu', connectionId, messageId,
  });
  assert.ok(Buffer.byteLength(priorityButton.callback_data, 'utf8') <= 64);

  const expanded = context.telegramFocusKeyboard_(
    keyboard,
    context.parseTelegramFocusCallback_(priorityButton.callback_data),
    { priority: 'critical' },
    true
  );
  const buttons = expanded.inline_keyboard.flat();
  for (const action of ['critical', 'high', 'medium', 'low', 'none', 'back']) {
    const parsed = buttons.map(button => context.parseTelegramFocusCallback_(button.callback_data))
      .find(value => value && value.action === action);
    assert.deepEqual({ ...parsed }, { action, connectionId, messageId });
  }
  assert.ok(Buffer.byteLength(expanded.serialized, 'utf8') <= 6000);
  assert.match(JSON.stringify(buttons.map(button => button.text)), /🔴 Не пропустити/);
  assert.match(JSON.stringify(buttons.map(button => button.text)), /🟠 Високий/);
  assert.match(JSON.stringify(buttons.map(button => button.text)), /🟣 Важливо/);
  assert.match(JSON.stringify(buttons.map(button => button.text)), /🔵 До уваги/);
});

test('mail-card registry isolates identical Gmail IDs by chat and connection', () => {
  const originalPropertiesService = context.PropertiesService;
  const originalLockService = context.LockService;
  const memory = memoryProperties({ CHAT_ID: '427886279' });
  context.PropertiesService = memory.service;
  context.LockService = immediateScriptLock();
  const ownerChatId = '427886279';
  const sharedMessageId = 'same_message_12345';
  const sharedThreadId = 'same_thread_12345';
  try {
    const first = context.reserveTelegramMailCardDelivery_({
      chatId: ownerChatId,
      userId: ownerChatId,
      connectionId: 'gmail-first-unit',
      gmailMessageId: sharedMessageId,
      gmailThreadId: sharedThreadId,
      replyMarkup: { inline_keyboard: [] },
    });
    const second = context.reserveTelegramMailCardDelivery_({
      chatId: '999999999',
      userId: '999999999',
      connectionId: 'gmail-second-unit',
      gmailMessageId: sharedMessageId,
      gmailThreadId: sharedThreadId,
      replyMarkup: { inline_keyboard: [] },
    });
    assert.notEqual(first.propertyKey, second.propertyKey);
    context.finalizeTelegramMailCardDelivery_(first, { message_id: 501 });
    context.finalizeTelegramMailCardDelivery_(second, { message_id: 502 });
    const firstCards = context.readTelegramMailCards_({
      chatId: ownerChatId, connectionId: 'gmail-first-unit', gmailMessageId: sharedMessageId,
    });
    const secondCards = context.readTelegramMailCards_({
      chatId: '999999999', connectionId: 'gmail-second-unit', gmailMessageId: sharedMessageId,
    });
    assert.equal(firstCards.length, 1);
    assert.equal(firstCards[0].telegramMessageId, 501);
    assert.equal(secondCards.length, 1);
    assert.equal(secondCards[0].telegramMessageId, 502);
    assert.equal(context.readTelegramMailCards_({
      chatId: ownerChatId, connectionId: 'gmail-second-unit', gmailMessageId: sharedMessageId,
    }).length, 0);
  } finally {
    context.PropertiesService = originalPropertiesService;
    context.LockService = originalLockService;
  }
});

test('action link extraction is public-HTTPS-only, deduplicated, capped, and excludes unsubscribe', () => {
  const links = context.extractActionLinks_(
    '<a href="https://safe.example/account">Open account</a>' +
    '<a href="https://safe.example/account">duplicate</a>' +
    '<a href="javascript:alert(1)">bad</a>' +
    '<a href="https://news.example/unsubscribe">unsubscribe</a>' +
    '<a href="https://second.example/path">Click here</a>' +
    '<a href="https://third.example/path">Third action</a>' +
    '<a href="https://fourth.example/path">Fourth action</a>',
    { url: 'https://news.example/unsubscribe' }
  );
  assert.equal(links.length, 3);
  assert.deepEqual(Array.from(links, item => item.url), [
    'https://safe.example/account',
    'https://second.example/path',
    'https://third.example/path',
  ]);
  assert.match(links[0].text, /safe\.example/);
  assert.match(links[1].text, /second\.example/);

  const spoofed = context.extractActionLinks_(
    '<a href="https://news.example/unsubscribe?id=1">same unsubscribe</a>' +
    '<a href="https://safe.example/pay">Pay\u202E moc.elpmaxe.live</a>',
    { url: 'HTTPS://NEWS.EXAMPLE:443/%75nsubscribe?id=1' }
  );
  assert.equal(spoofed.length, 1, 'canonical variants of unsubscribe must stay blocked');
  assert.equal(spoofed[0].url, 'https://safe.example/pay');
  assert.doesNotMatch(spoofed[0].text, /[\u202A-\u202E\u2066-\u2069]/);
  assert.match(spoofed[0].text, /^↗ safe\.example · /, 'trusted domain must render before untrusted anchor text');
});

test('mail keyboard stays within the durable byte budget when every external URL is maximal', () => {
  const longUrl = host => ('https://' + host + '/' + 'a'.repeat(2048)).slice(0, 2048);
  const actionLinks = ['one.example', 'two.example', 'three.example'].map((host, index) => ({
    text: `↗ ${host} · action ${index + 1}`,
    url: longUrl(host),
  }));
  const replyMarkup = context.buildMailKeyboard_(
    'https://mail.google.com/mail/u/0/#all/thread',
    'sender@example.com',
    [],
    'maxurl12345',
    { available: true, mode: 'web', openUrl: longUrl('unsubscribe.example') },
    'thread_maxurl_12345',
    ['INBOX'],
    [],
    actionLinks
  );
  assert.ok(Buffer.byteLength(replyMarkup, 'utf8') <= 6000);
  const buttons = JSON.parse(replyMarkup).inline_keyboard.flat();
  assert.ok(buttons.some(button => button.text === '↗ Інші посилання в оригіналі'));
  assert.ok(buttons.some(button => /^🔕 Відписатися/.test(button.text)));

  const memory = memoryProperties({ CHAT_ID: '123' });
  const originals = { PropertiesService: context.PropertiesService, LockService: context.LockService };
  try {
    context.PropertiesService = memory.service;
    context.LockService = immediateScriptLock();
    assert.doesNotThrow(() => context.reserveTelegramMailCardDelivery_({
      gmailMessageId: 'maxurl12345',
      gmailThreadId: 'thread_maxurl_12345',
      messageThreadId: 0,
      topic: 'inbox',
      replyMarkup,
    }));
  } finally {
    Object.assign(context, originals);
  }
});

test('durable callback payload omits large markup and retry hydration uses the exact registered card', () => {
  const messageId = 'hydrate12345';
  const callbackData = context.mailboxCallbackData_('unstar', messageId);
  const markup = { inline_keyboard: [[{
    text: '⭐ Зняти зірочку',
    callback_data: callbackData,
  }]] };
  const update = {
    update_id: 991,
    callback_query: {
      id: 'callback-991',
      data: callbackData,
      from: { id: 123 },
      message: {
        message_id: 456,
        chat: { id: 123, type: 'private' },
        reply_markup: { inline_keyboard: [[{ text: 'huge', url: 'https://example.com/' + 'x'.repeat(3000) }]] },
      },
    },
  };
  const durable = context.durableTelegramUpdatePayload_(update);
  assert.equal(durable.callback_query.message.reply_markup, undefined);
  assert.ok(JSON.stringify(durable).length < 1000);

  const key = `TELEGRAM_MAIL_CARD_${messageId}`;
  const memory = memoryProperties({
    CHAT_ID: '123',
    TELEGRAM_MAIL_CARD_INDEX: JSON.stringify([key]),
    [key]: JSON.stringify({
      version: 1, chatId: '123', gmailMessageId: messageId, gmailThreadId: 'thread_hydrate_1',
      telegramMessageId: 456, state: 'active', replyMarkup: JSON.stringify(markup),
    }),
  });
  const original = context.PropertiesService;
  try {
    context.PropertiesService = memory.service;
    context.hydrateTelegramCallbackMarkup_(durable.callback_query);
    assert.deepEqual(
      JSON.parse(JSON.stringify(durable.callback_query.message.reply_markup)),
      markup
    );
  } finally {
    context.PropertiesService = original;
  }
});

test('attachment callback re-reads Gmail and selects only the verified ordinal', () => {
  const originals = {
    getGmailMessage_: context.getGmailMessage_,
    sendAttachmentSafely_: context.sendAttachmentSafely_,
  };
  const sent = [];
  try {
    context.getGmailMessage_ = id => ({
      id, subject: 'Invoice',
      attachments: [
        { name: 'one.pdf', size: 10 },
        { name: 'two.pdf', size: 20 },
      ],
      inlineAttachments: [{ name: 'logo.png', size: 30 }],
    });
    context.sendAttachmentSafely_ = (...args) => { sent.push(args); return { sent: true, via: 'document' }; };
    const result = context.sendAttachmentByIndex_('abcde12345', 1, 456, 789);
    assert.equal(result.message, 'Вкладення надіслано в чат');
    assert.equal(sent[0][1].name, 'two.pdf');
    assert.equal(sent[0][3], 456);
    assert.equal(sent[0][4], false);
    assert.equal(sent[0][5], 789);
    assert.throws(() => context.sendAttachmentByIndex_('abcde12345', 99, 456, 789), /більше не доступне/);
  } finally {
    Object.assign(context, originals);
  }
});

test('attachment callback never reports success after a read or upload failure', () => {
  const originals = {
    getGmailMessage_: context.getGmailMessage_,
    sendAttachmentSafely_: context.sendAttachmentSafely_,
  };
  try {
    context.getGmailMessage_ = id => ({
      id, subject: 'Invoice', attachments: [{ name: 'invoice.pdf', size: 20 }], inlineAttachments: [],
    });
    context.sendAttachmentSafely_ = () => { throw new Error('temporary attachment transport'); };
    assert.throws(
      () => context.sendAttachmentByIndex_('attachfail12345', 0, 456, 789),
      /temporary attachment transport/
    );
    context.sendAttachmentSafely_ = () => ({ sent: false, reason: 'too_large' });
    assert.match(
      context.sendAttachmentByIndex_('attachfail12345', 0, 456, 789).message,
      /завелике/
    );
  } finally {
    Object.assign(context, originals);
  }
});

test('external native Gmail Snooze is distinguished from ordinary archive read-only', () => {
  const messageId = 'native_snooze_12345';
  const originals = {
    gmailApi_: context.gmailApi_,
    botSnoozeReadRecord_: context.botSnoozeReadRecord_,
  };
  const calls = [];
  let native = true;
  try {
    context.botSnoozeReadRecord_ = () => null;
    context.gmailApi_ = path => {
      calls.push(path);
      if (path.startsWith(`/messages/${messageId}?format=metadata`)) {
        return {
          id: messageId,
          threadId: 'native_snooze_thread_12345',
          historyId: '77',
          labelIds: [],
          payload: { headers: [{ name: 'Message-ID', value: '<mail.77@example.com>' }] },
        };
      }
      assert.match(path, /maxResults=10/);
      assert.match(path, /q=in%3Asnoozed%20rfc822msgid%3A%3Cmail\.77%40example\.com%3E/);
      return { messages: native ? [{ id: messageId }] : [] };
    };
    const card = { gmailMessageId: messageId, gmailThreadId: 'native_snooze_thread_12345' };
    assert.equal(context.telegramMailStateFromGmail_(card).folder, 'snoozed');
    native = false;
    assert.equal(context.telegramMailStateFromGmail_(card).folder, 'archive');
    assert.equal(calls.filter(path => path.includes('in%3Asnoozed')).length, 2);
  } finally {
    Object.assign(context, originals);
  }
});

test('native Snooze accepts RFC 5322 CFWS and domain-literal Message-ID safely', () => {
  assert.equal(
    context.normalizeRfc822MessageIdForQuery_('(relay comment) <mail.77@[127.0.0.1]> (tail)'),
    'mail.77@[127.0.0.1]'
  );
  assert.equal(
    context.normalizeRfc822MessageIdForQuery_('<"quoted-id"@example.com>'),
    '"quoted-id"@example.com'
  );
  assert.equal(context.normalizeRfc822MessageIdForQuery_('<bad id@example.com>'), '');
  assert.equal(context.normalizeRfc822MessageIdForQuery_('<bad@example.com>\r\nInjected: x'), '');

  const originals = { gmailApi_: context.gmailApi_ };
  const paths = [];
  try {
    context.gmailApi_ = path => {
      paths.push(path);
      return { messages: [{ id: 'native_literal_12345' }] };
    };
    const matched = context.gmailMessageIsNativeSnoozed_({
      id: 'native_literal_12345',
      payload: {
        headers: [{
          name: 'Message-ID',
          value: '(relay comment) <mail.77@[127.0.0.1]> (tail)',
        }],
      },
    }, { gmailMessageId: 'native_literal_12345' });
    assert.equal(matched, true);
    assert.match(
      paths[0],
      /q=in%3Asnoozed%20rfc822msgid%3A%3Cmail\.77%40%5B127\.0\.0\.1%5D%3E/
    );
  } finally {
    Object.assign(context, originals);
  }
});

test('external Gmail flags rebuild a card and persist the authoritative markup', () => {
  const messageId = 'abcde12345';
  const initialMarkup = context.buildMailKeyboard_(
    'https://mail.google.com/mail/u/0/#all/thread', 'sender@example.com', [],
    messageId, { available: false, mode: 'none' }, 'thread_12345', ['INBOX']
  );
  const memory = memoryProperties({
    CHAT_ID: '123',
    TELEGRAM_MAIL_CARD_INDEX: JSON.stringify([`TELEGRAM_MAIL_CARD_${messageId}`]),
    [`TELEGRAM_MAIL_CARD_${messageId}`]: JSON.stringify({
      version: 1, chatId: '123', gmailMessageId: messageId, gmailThreadId: 'thread_12345',
      telegramMessageId: 456, messageThreadId: 0, topic: 'inbox', state: 'active',
      replyMarkup: initialMarkup,
    }),
  });
  const originals = {
    PropertiesService: context.PropertiesService,
    LockService: context.LockService,
    gmailApi_: context.gmailApi_,
    telegramRequest_: context.telegramRequest_,
    botSnoozeReadRecord_: context.botSnoozeReadRecord_,
  };
  const calls = [];
  try {
    context.PropertiesService = memory.service;
    context.LockService = immediateScriptLock();
    context.botSnoozeReadRecord_ = () => null;
    context.gmailApi_ = () => ({
      id: messageId, threadId: 'thread_12345', historyId: '90071992547409931234',
      labelIds: ['INBOX', 'UNREAD', 'STARRED', 'IMPORTANT', 'Label_42'],
    });
    context.telegramRequest_ = (method, payload) => { calls.push({ method, payload }); return true; };
    const result = context.syncTelegramMailCardFromGmail_(
      JSON.parse(memory.store[`TELEGRAM_MAIL_CARD_${messageId}`])
    );
    assert.equal(result.updated, true);
    assert.equal(calls[0].method, 'editMessageReplyMarkup');
    const buttons = JSON.parse(calls[0].payload.reply_markup).inline_keyboard.flat();
    assert.ok(buttons.some(button => button.text === '⭐ Зняти зірочку'));
    assert.ok(buttons.some(button => button.text === '✅ Прочитано'));
    assert.ok(buttons.some(button => button.text === '❕ Зняти важливість'));
    assert.ok(buttons.some(button => button.text === '🏷 Мітки (1)'));
    const stored = JSON.parse(memory.store[`TELEGRAM_MAIL_CARD_${messageId}`]);
    assert.equal(stored.gmailState.historyId, '90071992547409931234');
    assert.equal(stored.replyMarkup, calls[0].payload.reply_markup);
  } finally {
    Object.assign(context, originals);
  }
});

test('external Gmail archive hides a flat-chat card but keeps a tombstone for Inbox restoration', () => {
  const messageId = 'abcde12345';
  const key = `TELEGRAM_MAIL_CARD_${messageId}`;
  const memory = memoryProperties({
    CHAT_ID: '123',
    TELEGRAM_MAIL_CARD_INDEX: JSON.stringify([key]),
    [key]: JSON.stringify({
      version: 1, chatId: '123', gmailMessageId: messageId, gmailThreadId: 'thread_12345',
      telegramMessageId: 456, messageThreadId: 0, topic: 'inbox', state: 'active',
      replyMarkup: '{"inline_keyboard":[]}',
    }),
  });
  const originals = {
    PropertiesService: context.PropertiesService,
    LockService: context.LockService,
    gmailApi_: context.gmailApi_,
    telegramRequest_: context.telegramRequest_,
    telegramMailTopics_: context.telegramMailTopics_,
    botSnoozeReadRecord_: context.botSnoozeReadRecord_,
  };
  const calls = [];
  try {
    context.PropertiesService = memory.service;
    context.LockService = immediateScriptLock();
    context.botSnoozeReadRecord_ = () => null;
    context.gmailApi_ = () => ({ id: messageId, threadId: 'thread_12345', labelIds: [] });
    context.telegramMailTopics_ = () => ({});
    context.telegramRequest_ = (method, payload) => { calls.push({ method, payload }); return true; };
    const result = context.syncTelegramMailCardFromGmail_(JSON.parse(memory.store[key]));
    assert.equal(result.hidden, true);
    assert.equal(calls[0].method, 'deleteMessage');
    const hidden = JSON.parse(memory.store[key]);
    assert.equal(hidden.state, 'hidden');
    assert.equal(hidden.telegramMessageId, 0);
    assert.equal(hidden.topic, 'archive');
    assert.ok(JSON.parse(memory.store.TELEGRAM_MAIL_CARD_INDEX).includes(key));
  } finally {
    Object.assign(context, originals);
  }
});

test('Gmail History synchronization establishes a string baseline without replaying old changes', () => {
  const memory = memoryProperties({ CHAT_ID: '123', TELEGRAM_MAIL_CARD_INDEX: '[]' });
  const originals = {
    PropertiesService: context.PropertiesService,
    LockService: context.LockService,
    gmailApi_: context.gmailApi_,
    syncTelegramMailCardFromGmail_: context.syncTelegramMailCardFromGmail_,
  };
  let syncCalls = 0;
  try {
    context.PropertiesService = memory.service;
    context.LockService = immediateScriptLock();
    context.gmailApi_ = path => {
      assert.equal(path, '/profile');
      return { historyId: '900719925474099312345678' };
    };
    context.syncTelegramMailCardFromGmail_ = () => { syncCalls += 1; };
    const result = context.syncTelegramMailCardsFromGmailHistory_(20);
    assert.equal(result.baseline, true);
    assert.equal(syncCalls, 0);
    const state = JSON.parse(memory.store.GMAIL_TG_HISTORY_STATE_V1);
    assert.equal(state.historyId, '900719925474099312345678');
    assert.equal(typeof state.historyId, 'string');
    assert.equal(state.leaseToken, '');
  } finally {
    Object.assign(context, originals);
  }
});

test('Gmail History targets only registered changed cards and advances cursor after success', () => {
  const firstId = 'abcde12345';
  const ignoredId = 'ignored12345';
  const key = `TELEGRAM_MAIL_CARD_${firstId}`;
  const memory = memoryProperties({
    CHAT_ID: '123',
    TELEGRAM_MAIL_CARD_INDEX: JSON.stringify([key]),
    [key]: JSON.stringify({
      version: 1, chatId: '123', gmailMessageId: firstId, gmailThreadId: 'thread_1',
      telegramMessageId: 456, state: 'active', replyMarkup: '{"inline_keyboard":[]}',
    }),
    GMAIL_TG_HISTORY_STATE_V1: JSON.stringify({ version: 1, historyId: '10000000000000000001' }),
  });
  const originals = {
    PropertiesService: context.PropertiesService,
    LockService: context.LockService,
    gmailApi_: context.gmailApi_,
    syncTelegramMailCardFromGmail_: context.syncTelegramMailCardFromGmail_,
  };
  const synced = [];
  try {
    context.PropertiesService = memory.service;
    context.LockService = immediateScriptLock();
    context.gmailApi_ = path => {
      assert.match(path, /^\/history\?startHistoryId=10000000000000000001&maxResults=500$/);
      return {
        historyId: '10000000000000000099',
        history: [{
          id: '10000000000000000050',
          labelsAdded: [{ message: { id: firstId } }, { message: { id: ignoredId } }],
        }],
      };
    };
    context.syncTelegramMailCardFromGmail_ = card => { synced.push(card.gmailMessageId); return { updated: true }; };
    const result = context.syncTelegramMailCardsFromGmailHistory_(20);
    assert.equal(result.completed, true);
    assert.deepEqual(synced, [firstId]);
    const state = JSON.parse(memory.store.GMAIL_TG_HISTORY_STATE_V1);
    assert.equal(state.historyId, '10000000000000000099');
    assert.equal(state.pageToken, '');
    assert.equal(state.leaseToken, '');
  } finally {
    Object.assign(context, originals);
  }
});

test('scoped Gmail History updates only the matching Telegram chat and Gmail connection', () => {
  const messageId = 'shared_history_12345';
  const firstScope = { userId: '111111111', chatId: '111111111', connectionId: 'gmail-first-unit' };
  const secondScope = { userId: '222222222', chatId: '222222222', connectionId: 'gmail-second-unit' };
  const firstKey = `TELEGRAM_MAIL_CARD_V2_${firstScope.chatId}_${firstScope.connectionId}_${messageId}`;
  const secondKey = `TELEGRAM_MAIL_CARD_V2_${secondScope.chatId}_${secondScope.connectionId}_${messageId}`;
  const historyKey = `GMAIL_TG_HISTORY_STATE_V2_${firstScope.chatId}_${firstScope.connectionId}`;
  const memory = memoryProperties({
    CHAT_ID: '427886279',
    TELEGRAM_MAIL_CARD_INDEX: JSON.stringify([firstKey, secondKey]),
    [firstKey]: JSON.stringify({
      version: 1, userId: firstScope.userId, chatId: firstScope.chatId,
      connectionId: firstScope.connectionId, gmailMessageId: messageId,
      gmailThreadId: 'thread_first', telegramMessageId: 501, state: 'active',
      replyMarkup: '{"inline_keyboard":[]}',
    }),
    [secondKey]: JSON.stringify({
      version: 1, userId: secondScope.userId, chatId: secondScope.chatId,
      connectionId: secondScope.connectionId, gmailMessageId: messageId,
      gmailThreadId: 'thread_second', telegramMessageId: 502, state: 'active',
      replyMarkup: '{"inline_keyboard":[]}',
    }),
    [historyKey]: JSON.stringify({ version: 1, historyId: '81000000000000000001' }),
  });
  const originals = {
    PropertiesService: context.PropertiesService,
    LockService: context.LockService,
    gmailApi_: context.gmailApi_,
    syncTelegramMailCardFromGmail_: context.syncTelegramMailCardFromGmail_,
  };
  const synced = [];
  try {
    context.PropertiesService = memory.service;
    context.LockService = immediateScriptLock();
    context.gmailApi_ = () => ({
      historyId: '81000000000000000099',
      history: [{ labelsAdded: [{ message: { id: messageId } }] }],
    });
    context.syncTelegramMailCardFromGmail_ = card => {
      synced.push({ chatId: card.chatId, connectionId: card.connectionId, telegramMessageId: card.telegramMessageId });
      return { updated: true };
    };
    const result = context.syncTelegramMailCardsFromGmailHistory_(20, firstScope);
    assert.equal(result.completed, true);
    assert.deepEqual(synced, [{
      chatId: firstScope.chatId,
      connectionId: firstScope.connectionId,
      telegramMessageId: 501,
    }]);
    assert.equal(JSON.parse(memory.store[historyKey]).historyId, '81000000000000000099');
    assert.equal(memory.store.GMAIL_TG_HISTORY_STATE_V1, undefined);
  } finally {
    Object.assign(context, originals);
  }
});

test('transient native Snooze lookup failure keeps the Gmail History event pending', () => {
  const messageId = 'history_snooze_retry_12345';
  const key = `TELEGRAM_MAIL_CARD_${messageId}`;
  const memory = memoryProperties({
    CHAT_ID: '123',
    TELEGRAM_MAIL_CARD_INDEX: JSON.stringify([key]),
    [key]: JSON.stringify({
      version: 1,
      chatId: '123',
      gmailMessageId: messageId,
      gmailThreadId: 'history_snooze_thread_12345',
      telegramMessageId: 456,
      messageThreadId: 101,
      topic: 'inbox',
      state: 'active',
      replyMarkup: '{"inline_keyboard":[]}',
    }),
    GMAIL_TG_HISTORY_STATE_V1: JSON.stringify({ version: 1, historyId: '70000000000000000001' }),
  });
  const originals = {
    PropertiesService: context.PropertiesService,
    LockService: context.LockService,
    gmailApi_: context.gmailApi_,
    botSnoozeReadRecord_: context.botSnoozeReadRecord_,
    telegramRequest_: context.telegramRequest_,
  };
  const calls = [];
  try {
    context.PropertiesService = memory.service;
    context.LockService = immediateScriptLock();
    context.botSnoozeReadRecord_ = () => null;
    context.telegramRequest_ = method => { throw new Error(`unexpected Telegram call: ${method}`); };
    context.gmailApi_ = path => {
      calls.push(path);
      if (path.startsWith('/history?')) {
        return {
          historyId: '70000000000000000099',
          history: [{ labelsRemoved: [{ message: { id: messageId } }] }],
        };
      }
      if (path.startsWith(`/messages/${messageId}?format=metadata`)) {
        return {
          id: messageId,
          threadId: 'history_snooze_thread_12345',
          historyId: '70000000000000000050',
          labelIds: [],
          payload: { headers: [{ name: 'Message-ID', value: '<history.snooze@example.com>' }] },
        };
      }
      if (path.startsWith('/messages?maxResults=10')) {
        const error = new Error('native Snooze search temporarily unavailable');
        error.gmailHttpStatus = 503;
        throw error;
      }
      throw new Error(`Unexpected Gmail read: ${path}`);
    };

    assert.throws(
      () => context.syncTelegramMailCardsFromGmailHistory_(20),
      /native Snooze search temporarily unavailable/
    );
    const state = JSON.parse(memory.store.GMAIL_TG_HISTORY_STATE_V1);
    assert.equal(state.historyId, '70000000000000000001');
    assert.equal(state.pageLoaded, true);
    assert.deepEqual(state.pendingMessageIds, [messageId]);
    assert.equal(state.targetHistoryId, '70000000000000000099');
    assert.equal(state.attempts, 1);
    assert.ok(state.retryAt > Date.now());
    assert.equal(state.leaseToken, '');
    const callsBeforeDeferredRetry = calls.length;
    assert.equal(context.syncTelegramMailCardsFromGmailHistory_(20).deferred, true);
    assert.equal(calls.length, callsBeforeDeferredRetry, 'backoff must not re-read or commit the event');
  } finally {
    Object.assign(context, originals);
  }
});

test('Gmail History resumes a stable changed-message snapshot when the live card index reorders', () => {
  const ids = ['historyA12345', 'historyB12345', 'historyC12345'];
  const keys = ids.map(id => `TELEGRAM_MAIL_CARD_${id}`);
  const initial = {
    CHAT_ID: '123',
    TELEGRAM_MAIL_CARD_INDEX: JSON.stringify(keys),
    GMAIL_TG_HISTORY_STATE_V1: JSON.stringify({ version: 1, historyId: '50000000000000000001' }),
  };
  ids.forEach((id, index) => {
    initial[keys[index]] = JSON.stringify({
      version: 1,
      chatId: '123',
      gmailMessageId: id,
      gmailThreadId: `thread_${index}`,
      telegramMessageId: 700 + index,
      state: 'active',
      replyMarkup: '{"inline_keyboard":[]}',
    });
  });
  const memory = memoryProperties(initial);
  const originals = {
    PropertiesService: context.PropertiesService,
    LockService: context.LockService,
    gmailApi_: context.gmailApi_,
    syncTelegramMailCardFromGmail_: context.syncTelegramMailCardFromGmail_,
  };
  const synced = [];
  let historyReads = 0;
  try {
    context.PropertiesService = memory.service;
    context.LockService = immediateScriptLock();
    context.gmailApi_ = path => {
      historyReads += 1;
      assert.match(path, /^\/history\?startHistoryId=50000000000000000001&maxResults=500$/);
      return {
        historyId: '50000000000000000099',
        history: [{ labelsAdded: ids.map(id => ({ message: { id } })) }],
      };
    };
    context.syncTelegramMailCardFromGmail_ = card => {
      synced.push(card.gmailMessageId);
      // Simulate a successful flat-chat move removing the current key and a
      // concurrent delivery reordering every still-live registry entry.
      delete memory.store[`TELEGRAM_MAIL_CARD_${card.gmailMessageId}`];
      const remaining = JSON.parse(memory.store.TELEGRAM_MAIL_CARD_INDEX)
        .filter(key => memory.store[key])
        .reverse();
      memory.store.TELEGRAM_MAIL_CARD_INDEX = JSON.stringify(remaining);
      return { hidden: true };
    };

    const first = context.syncTelegramMailCardsFromGmailHistory_(1);
    const second = context.syncTelegramMailCardsFromGmailHistory_(1);
    const third = context.syncTelegramMailCardsFromGmailHistory_(1);
    assert.equal(first.pending, true);
    assert.equal(second.pending, true);
    assert.equal(third.completed, true);
    assert.deepEqual(synced, ids);
    assert.equal(historyReads, 1, 'a persisted snapshot must resume without rebuilding from a reordered index');
    const state = JSON.parse(memory.store.GMAIL_TG_HISTORY_STATE_V1);
    assert.equal(state.historyId, '50000000000000000099');
    assert.deepEqual(state.pendingMessageIds, []);
    assert.equal(state.pageLoaded, false);
  } finally {
    Object.assign(context, originals);
  }
});

test('stale Gmail History cursor resets to a new bounded baseline without mailbox mutation', () => {
  const memory = memoryProperties({
    CHAT_ID: '123', TELEGRAM_MAIL_CARD_INDEX: '[]',
    GMAIL_TG_HISTORY_STATE_V1: JSON.stringify({ version: 1, historyId: '123456789' }),
  });
  const originals = {
    PropertiesService: context.PropertiesService,
    LockService: context.LockService,
    gmailApi_: context.gmailApi_,
  };
  const calls = [];
  try {
    context.PropertiesService = memory.service;
    context.LockService = immediateScriptLock();
    context.gmailApi_ = path => {
      calls.push(path);
      if (path.startsWith('/history?')) {
        const error = new Error('stale');
        error.gmailHttpStatus = 404;
        throw error;
      }
      if (path === '/profile') return { historyId: '98765432101234567890' };
      throw new Error(`Unexpected Gmail read: ${path}`);
    };
    const result = context.syncTelegramMailCardsFromGmailHistory_(20);
    assert.equal(result.reset, true);
    assert.deepEqual(calls, [
      '/history?startHistoryId=123456789&maxResults=500',
      '/profile',
    ]);
    assert.equal(JSON.parse(memory.store.GMAIL_TG_HISTORY_STATE_V1).historyId, '98765432101234567890');
  } finally {
    Object.assign(context, originals);
  }
});

test('chat-native mail command accepts only bounded server-compiled filters', () => {
  const command = '/mail from:billing.example.com subject:"July invoice" text:"payment due" ' +
    'folder:unread period:30d size:100';
  const parsed = context.parseTelegramMailBrowseCommand_(command);
  assert.equal(parsed.pageSize, 100);
  assert.equal(parsed.filters.sender, 'billing.example.com');
  assert.equal(parsed.filters.subject, 'July invoice');
  assert.equal(parsed.filters.text, 'payment due');
  assert.equal(parsed.filters.folder, 'unread');
  assert.equal(parsed.filters.period, '30d');
  assert.equal(context.durableTelegramCommandText_(command), command);

  assert.throws(
    () => context.parseTelegramMailBrowseCommand_('/mail text:"invoice" OR in:anywhere'),
    /фільтр|розібрати|пробіли/i
  );
  assert.throws(
    () => context.parseTelegramMailBrowseCommand_('/mail q:"in:anywhere"'),
    /невідомий фільтр/i
  );
  assert.throws(
    () => context.parseTelegramMailBrowseCommand_('/mail from:"attacker@example.com) OR (in:spam"'),
    /email-адресою|відправник/i
  );
  assert.throws(
    () => context.parseTelegramMailBrowseCommand_('/mail size:80'),
    /розмір/i
  );
});

test('chat-native browse callback keeps the durable webhook result toast deferred and single', () => {
  const originals = {
    PropertiesService: context.PropertiesService,
    isOwnPrivateUpdate_: context.isOwnPrivateUpdate_,
    claimTelegramUpdate_: context.claimTelegramUpdate_,
    routeTelegramUpdate_: context.routeTelegramUpdate_,
    answerTelegramCallback_: context.answerTelegramCallback_,
    completeTelegramUpdate_: context.completeTelegramUpdate_,
    failTelegramUpdate_: context.failTelegramUpdate_,
    webhookOk_: context.webhookOk_,
  };
  const events = [];
  try {
    context.PropertiesService = memoryProperties({ WEBHOOK_KEY: 'secret', CHAT_ID: '123' }).service;
    context.isOwnPrivateUpdate_ = () => true;
    context.claimTelegramUpdate_ = () => 'new';
    context.routeTelegramUpdate_ = () => {
      events.push('route');
      return { message: 'Список оновлено' };
    };
    context.answerTelegramCallback_ = (id, message) => events.push(`toast:${id}:${message}`);
    context.completeTelegramUpdate_ = () => { events.push('complete'); return 'd'; };
    context.failTelegramUpdate_ = () => 'f';
    context.webhookOk_ = () => 'ok';

    const result = context.doPost({
      parameter: { key: 'secret' },
      postData: { contents: JSON.stringify({
        update_id: 991,
        callback_query: {
          id: 'browse-callback',
          data: context.telegramMailBrowseCallbackData_('d'.repeat(16), 1, 'n'),
        },
      }) },
    });
    assert.equal(result, 'ok');
    assert.deepEqual(events, [
      'route',
      'toast:browse-callback:Список оновлено',
      'complete',
    ]);
  } finally {
    Object.assign(context, originals);
  }
});

test('chat-native Gmail list uses exact labelIds and a sanitized bounded query', () => {
  const original = context.gmailApi_;
  const calls = [];
  try {
    context.gmailApi_ = requestPath => {
      calls.push(requestPath);
      if (requestPath === '/labels') {
        return {
          labels: [
            { id: 'INBOX', name: 'INBOX', type: 'system' },
            { id: 'Label_42', name: 'Рахунки 2026', type: 'user' },
          ],
        };
      }
      if (requestPath.startsWith('/messages?')) {
        return {
          messages: Array.from({ length: 100 }, (_, index) => ({
            id: `msg_${String(index).padStart(3, '0')}`,
          })),
          nextPageToken: 'safeNextPage42',
          resultSizeEstimate: 431,
        };
      }
      throw new Error(`Unexpected Gmail read: ${requestPath}`);
    };

    const parsed = context.parseTelegramMailBrowseCommand_(
      '/mail label:"Рахунки 2026" from:billing.example.com subject:"July invoice" ' +
      'text:"payment due" period:30d size:100'
    );
    const label = context.resolveTelegramMailBrowseLabel_(parsed.requestedLabel);
    parsed.filters.labelId = label.id;
    parsed.filters.labelName = label.name;
    parsed.filters.folder = 'all';
    const state = {
      pageSize: parsed.pageSize,
      filters: parsed.filters,
      ids: [], offset: 0, nextPageToken: '', pageToken: '', previousPageTokens: [],
    };
    context.loadTelegramMailBrowsePage_(state, '');

    assert.equal(state.ids.length, 100);
    assert.equal(state.nextPageToken, 'safeNextPage42');
    const listPath = calls.find(value => value.startsWith('/messages?'));
    const url = new URL(`https://gmail.invalid${listPath}`);
    assert.equal(url.searchParams.get('maxResults'), '100');
    assert.equal(url.searchParams.get('includeSpamTrash'), 'true');
    assert.deepEqual(url.searchParams.getAll('labelIds'), ['Label_42']);
    assert.equal(
      url.searchParams.get('q'),
      '-in:spam -in:trash newer_than:30d from:"billing.example.com" ' +
        'subject:"July invoice" "payment due"'
    );
    assert.equal(url.searchParams.get('q').includes('Рахунки 2026'), false);
  } finally {
    context.gmailApi_ = original;
  }
});

test('label callbacks stay exact if Gmail label ordering changes before the click', () => {
  const before = [
    { id: 'Label_alpha', name: 'Alpha' },
    { id: 'Label_billing', name: 'Billing' },
  ];
  const argument = '1_' + context.telegramMailBrowseLabelFingerprint_(before[1].id);
  const callbackData = context.telegramMailBrowseCallbackData_('e'.repeat(16), 7, 'y', argument);
  assert.ok(Buffer.byteLength(callbackData, 'utf8') <= 64);

  const after = [
    { id: 'Label_aaa', name: 'Aardvark' },
    ...before,
  ];
  const selected = context.telegramMailBrowseLabelSelection_(argument, after);
  assert.equal(selected.id, 'Label_billing');
  assert.equal(context.telegramMailBrowseLabelSelection_('1_deadbeef', after), null);
});

test('chat-native Gmail metadata uses one bounded authenticated batch and tolerates only exact 404 rows', () => {
  const batchSource = code.slice(
    code.indexOf('function telegramMailBrowseMetadataBatch_('),
    code.indexOf('function telegramMailBrowseShortDate_(')
  );
  assert.match(batchSource, /const maxBatch = 10;/, 'the helper cap must not depend on mutable or corrupt configuration');
  assert.doesNotMatch(batchSource, /console\.[a-z]+\([^;\n]*(?:Authorization|Bearer|responseText|getContentText)/i);
  const originals = {
    ScriptApp: context.ScriptApp,
    UrlFetchApp: context.UrlFetchApp,
    gmailApi_: context.gmailApi_,
  };
  const ids = Array.from({ length: 10 }, (_, index) => `msg_${String(index).padStart(3, '0')}`);
  const batches = [];
  let tokenReads = 0;
  let sequentialReads = 0;
  const response = (status, data) => ({
    getResponseCode: () => status,
    getContentText: () => data == null ? '' : JSON.stringify(data),
  });
  const metadata = id => ({
    id,
    threadId: `thread_${id}`,
    internalDate: String(Date.UTC(2026, 6, 17, 12, Number(id.slice(-3)) % 60)),
    labelIds: ['INBOX'],
    snippet: `Snippet ${id}`,
    payload: { headers: [
      { name: 'From', value: `${id} <${id}@example.com>` },
      { name: 'Subject', value: `Subject ${id}` },
      { name: 'Date', value: 'Fri, 17 Jul 2026 12:00:00 +0200' },
    ] },
  });
  try {
    context.ScriptApp = { getOAuthToken: () => { tokenReads += 1; return 'gmail-oauth-token'; } };
    context.gmailApi_ = () => { sequentialReads += 1; throw new Error('sequential Gmail read forbidden'); };
    context.UrlFetchApp = {
      fetch: () => { sequentialReads += 1; throw new Error('UrlFetchApp.fetch forbidden'); },
      fetchAll: requests => {
        batches.push(requests);
        return requests.map((request, index) => index === 4
          ? response(404, { error: { code: 404 } })
          : response(200, metadata(ids[index])));
      },
    };

    const rows = context.telegramMailBrowseMetadataBatch_(ids);
    assert.equal(tokenReads, 1);
    assert.equal(sequentialReads, 0);
    assert.equal(batches.length, 1, 'ten visible rows must use one UrlFetchApp.fetchAll call');
    assert.equal(batches[0].length, 10);
    batches[0].forEach((request, index) => {
      assert.equal(request.method, 'get');
      assert.equal(request.headers.Authorization, 'Bearer gmail-oauth-token');
      assert.equal(request.muteHttpExceptions, true);
      assert.equal(request.followRedirects, false);
      assert.match(request.url, new RegExp(`/messages/${ids[index]}\\?format=metadata&`));
    });
    assert.deepEqual(rows.map(row => row && row.id), ids.map((id, index) => index === 4 ? null : id));
    assert.equal(rows[0].subject, 'Subject msg_000');

    context.UrlFetchApp.fetchAll = requests => requests.map((request, index) =>
      index === 6 ? response(410, { error: { code: 410 } }) : response(200, metadata(ids[index]))
    );
    assert.throws(
      () => context.telegramMailBrowseMetadataBatch_(ids),
      error => error && error.gmailHttpStatus === 410,
      'only an exact 404 disappearance may be tolerated'
    );
    assert.throws(
      () => context.telegramMailBrowseMetadataBatch_(ids.concat(['msg_010'])),
      /безпечний розмір пакета/i
    );
  } finally {
    Object.assign(context, originals);
  }
});

test('a logical 100-message window renders ten safe Telegram rows from one metadata batch', () => {
  const original = context.telegramMailBrowseMetadataBatch_;
  const metadataBatches = [];
  try {
    context.telegramMailBrowseMetadataBatch_ = messageIds => {
      const ids = Array.from(messageIds || []);
      metadataBatches.push(ids);
      return ids.map(id => {
        const ordinal = Number(id.slice(-3));
        return {
          id,
          threadId: `thread_${ordinal}`,
          timestamp: Date.UTC(2026, 6, 17, 12, ordinal % 60),
          unread: ordinal % 2 === 0,
          from: `Sender ${ordinal} <sender${ordinal}@example.com>`,
          subject: `Subject ${ordinal}`,
          sentAt: 'Fri, 17 Jul 2026 12:00:00 +0200',
          snippet: `Snippet ${ordinal}`,
        };
      });
    };
    const state = {
      version: 1,
      token: 'a'.repeat(16),
      chatId: '123',
      pageSize: 100,
      filters: context.telegramMailBrowseDefaultFilters_(),
      pageToken: '', nextPageToken: 'next42', previousPageTokens: [],
      ids: Array.from({ length: 100 }, (_, index) => `msg_${String(index).padStart(3, '0')}`),
      offset: 0, resultSizeEstimate: 431, revision: 1,
      createdAt: Date.now(), updatedAt: Date.now(),
    };
    const view = context.renderTelegramMailBrowseList_(state);
    const markup = JSON.parse(view.markup);
    const buttons = markup.inline_keyboard.flat();
    const openButtons = buttons.filter(button => /^b\.[a-f0-9]{16}\.[0-9a-z]{1,6}\.o\./.test(button.callback_data || ''));
    assert.equal(metadataBatches.length, 1);
    assert.deepEqual(metadataBatches[0], state.ids.slice(0, 10));
    assert.equal(openButtons.length, 10);
    assert.match(view.text, /Показано <b>1–10<\/b> із вікна <b>100<\/b>/);
    assert.match(view.text, /🔵/);
    assert.match(view.text, /⚪/);
    buttons.filter(button => button.callback_data).forEach(button => {
      assert.ok(Buffer.byteLength(button.callback_data, 'utf8') <= 64);
    });
    assert.ok(Buffer.byteLength(view.text, 'utf8') <= 4096);
    assert.ok(Buffer.byteLength(view.markup, 'utf8') <= 6000);

    const filters = context.renderTelegramMailBrowseFilters_(state);
    const filterButtons = JSON.parse(filters.markup).inline_keyboard.flat();
    const sizeValues = filterButtons
      .map(button => context.parseTelegramMailBrowseCallback_(button.callback_data || ''))
      .filter(value => value && value.action === 'z')
      .map(value => Number(value.argument));
    assert.deepEqual(sizeValues, [10, 20, 30, 40, 50, 60, 70, 90, 100]);
    assert.ok(Buffer.byteLength(filters.markup, 'utf8') <= 6000);
  } finally {
    context.telegramMailBrowseMetadataBatch_ = original;
  }
});
test('chat-native browse session is owner-bound, short, and cursor navigation is retry-idempotent', () => {
  const memory = memoryProperties({ CHAT_ID: '123' });
  const originals = {
    PropertiesService: context.PropertiesService,
    LockService: context.LockService,
    telegramMailBrowseMetadataBatch_: context.telegramMailBrowseMetadataBatch_,
    telegramRequest_: context.telegramRequest_,
  };
  const telegramCalls = [];
  const metadataBatches = [];
  try {
    context.PropertiesService = memory.service;
    context.LockService = immediateScriptLock();
    context.telegramMailBrowseMetadataBatch_ = messageIds => {
      const ids = Array.from(messageIds || []);
      metadataBatches.push(ids);
      return ids.map(id => ({
        id,
        threadId: `thread_${id}`,
        timestamp: Date.now(),
        unread: true,
        from: 'Owner Test <owner@example.com>',
        subject: id,
        sentAt: 'Fri, 17 Jul 2026 12:00:00 +0200',
        snippet: '',
      }));
    };
    context.telegramRequest_ = (method, payload) => {
      telegramCalls.push({ method, payload });
      return { message_id: payload.message_id };
    };

    const persisted = context.persistTelegramMailBrowseState_({
      version: 1,
      token: 'b'.repeat(16),
      chatId: '123',
      pageSize: 20,
      filters: context.telegramMailBrowseDefaultFilters_(),
      pageToken: '', nextPageToken: '', previousPageTokens: [],
      ids: Array.from({ length: 20 }, (_, index) => `msg_${String(index).padStart(3, '0')}`),
      offset: 0, resultSizeEstimate: 20, revision: 1,
      createdAt: Date.now(), updatedAt: Date.now(),
    });
    const callback = { token: persisted.token, revision: persisted.revision, action: 'n', argument: '' };
    const query = { message: { message_id: 77, chat: { id: 123, type: 'private' } } };
    context.handleTelegramMailBrowseCallback_(5001, query, callback);
    assert.equal(context.readTelegramMailBrowseState_(persisted.token).offset, 10);
    context.handleTelegramMailBrowseCallback_(5001, query, callback);
    assert.equal(
      context.readTelegramMailBrowseState_(persisted.token).offset,
      10,
      'a durable retry of the same update_id must not advance twice'
    );
    assert.equal(metadataBatches.length, 2, 'each render must issue one bounded metadata batch');
    metadataBatches.forEach(batch => {
      assert.deepEqual(batch, Array.from({ length: 10 }, (_, index) => `msg_${String(index + 10).padStart(3, '0')}`));
    });
    assert.ok(telegramCalls.every(call => call.method === 'editMessageText'));
    assert.equal(memory.store.TELEGRAM_MAIL_BROWSE_INDEX_V1.includes(persisted.token), true);
    assert.ok(Buffer.byteLength(memory.store[`TELEGRAM_MAIL_BROWSE_V1_${persisted.token}`], 'utf8') < 8500);

    memory.store.CHAT_ID = '999';
    assert.throws(
      () => context.readTelegramMailBrowseState_(persisted.token),
      /не належить поточному власнику/i
    );
  } finally {
    Object.assign(context, originals);
  }
});

test('chat-native state CAS rejects a concurrent stale writer and stale buttons re-render current IDs', () => {
  const memory = memoryProperties({ CHAT_ID: '123' });
  const originals = {
    PropertiesService: context.PropertiesService,
    LockService: context.LockService,
    telegramMailBrowseMetadataBatch_: context.telegramMailBrowseMetadataBatch_,
    telegramRequest_: context.telegramRequest_,
  };
  const telegramCalls = [];
  const metadataBatches = [];
  try {
    context.PropertiesService = memory.service;
    context.LockService = immediateScriptLock();
    context.telegramMailBrowseMetadataBatch_ = messageIds => {
      const ids = Array.from(messageIds || []);
      metadataBatches.push(ids);
      return ids.map(id => ({
        id,
        threadId: `thread_${id}`,
        timestamp: Date.now(),
        unread: true,
        from: 'Current Sender <current@example.com>',
        subject: `Current ${id}`,
        sentAt: 'Fri, 17 Jul 2026 12:00:00 +0200',
        snippet: '',
      }));
    };
    context.telegramRequest_ = (method, payload) => {
      telegramCalls.push({ method, payload });
      return { message_id: payload.message_id };
    };

    const base = context.persistTelegramMailBrowseState_({
      version: 1,
      token: 'f'.repeat(16),
      chatId: '123',
      pageSize: 20,
      filters: context.telegramMailBrowseDefaultFilters_(),
      pageToken: '', nextPageToken: '', previousPageTokens: [],
      ids: Array.from({ length: 20 }, (_, index) => `msg_${String(index).padStart(3, '0')}`),
      offset: 0, resultSizeEstimate: 20, revision: 1,
      createdAt: Date.now(), updatedAt: Date.now(),
    });
    const firstWriter = context.readTelegramMailBrowseState_(base.token);
    const staleWriter = context.readTelegramMailBrowseState_(base.token);

    firstWriter.offset = 10;
    firstWriter.revision = 2;
    firstWriter.lastUpdateId = 'winner';
    context.persistTelegramMailBrowseState_(firstWriter, 1);

    staleWriter.filters.folder = 'sent';
    staleWriter.revision = 2;
    staleWriter.lastUpdateId = 'loser';
    assert.throws(
      () => context.persistTelegramMailBrowseState_(staleWriter, 1),
      error => Boolean(error && error.telegramMailBrowseStale)
    );
    let current = context.readTelegramMailBrowseState_(base.token);
    assert.equal(current.offset, 10);
    assert.equal(current.filters.folder, 'inbox');
    assert.equal(current.lastUpdateId, 'winner');

    const result = context.handleTelegramMailBrowseCallback_(8002, {
      message: { message_id: 91, chat: { id: 123, type: 'private' } },
    }, { token: base.token, revision: 1, action: 'd', argument: 'sent' });
    assert.match(result.message, /вже оновився/i);
    current = context.readTelegramMailBrowseState_(base.token);
    assert.equal(current.offset, 10);
    assert.equal(current.filters.folder, 'inbox');
    assert.equal(memory.store.TELEGRAM_UPDATE_OPERATION_8002, undefined);
    assert.equal(telegramCalls.length, 1);
    assert.equal(telegramCalls[0].method, 'editMessageText');
    assert.equal(metadataBatches.length, 1, 'a stale press must re-render via one metadata batch');
    assert.deepEqual(metadataBatches[0], Array.from({ length: 10 }, (_, index) => `msg_${String(index + 10).padStart(3, '0')}`));
    const buttons = JSON.parse(telegramCalls[0].payload.reply_markup).inline_keyboard.flat();
    const revised = buttons
      .map(button => context.parseTelegramMailBrowseCallback_(button.callback_data || ''))
      .filter(Boolean);
    assert.ok(revised.length > 0);
    assert.ok(revised.every(callback => callback.revision === 2));
  } finally {
    Object.assign(context, originals);
  }
});

test('an uncertain initial /mail send is durably at-most-once and never retried into duplicates', () => {
  const memory = memoryProperties({ CHAT_ID: '123' });
  const originals = {
    PropertiesService: context.PropertiesService,
    hashedMessageId_: context.hashedMessageId_,
    readTelegramMailBrowseState_: context.readTelegramMailBrowseState_,
    renderTelegramMailBrowseList_: context.renderTelegramMailBrowseList_,
    sendTelegramText_: context.sendTelegramText_,
    systemTopicOptions_: context.systemTopicOptions_,
  };
  let sendAttempts = 0;
  try {
    context.PropertiesService = memory.service;
    context.hashedMessageId_ = () => '1'.repeat(16);
    context.readTelegramMailBrowseState_ = () => ({
      version: 1,
      token: '1'.repeat(16),
      chatId: '123',
      pageSize: 10,
      filters: context.telegramMailBrowseDefaultFilters_(),
      pageToken: '', nextPageToken: '', previousPageTokens: [],
      ids: ['msg_001'], offset: 0, resultSizeEstimate: 1, revision: 1,
      createdAt: Date.now(), updatedAt: Date.now(),
    });
    context.renderTelegramMailBrowseList_ = () => ({
      text: '<b>One bounded list</b>',
      markup: JSON.stringify({ inline_keyboard: [] }),
      visibleCount: 1,
    });
    context.systemTopicOptions_ = value => value || {};
    context.sendTelegramText_ = () => {
      sendAttempts += 1;
      const error = new Error('transport lost after dispatch');
      error.telegramOutcomeUncertain = true;
      throw error;
    };

    const first = context.sendTelegramMailBrowse_(9001, '/mail', {
      message_id: 92, chat: { id: 123, type: 'private' },
    }, false);
    const second = context.sendTelegramMailBrowse_(9001, '/mail', {
      message_id: 92, chat: { id: 123, type: 'private' },
    }, false);
    assert.equal(sendAttempts, 1, 'the same durable update must never dispatch sendMessage twice');
    assert.match(first.message, /не повторено/i);
    assert.match(second.message, /не повторено/i);
    const operation = JSON.parse(memory.store.TELEGRAM_UPDATE_OPERATION_9001);
    assert.equal(operation.kind, 'mail_browse_initial_send');
    assert.equal(operation.phase, 'uncertain');
    assert.equal(operation.attempts, 1);
  } finally {
    Object.assign(context, originals);
  }
});

test('a lost sent-marker after accepted /mail delivery still suppresses every automatic resend', () => {
  const memory = memoryProperties({ CHAT_ID: '123' });
  const originals = {
    PropertiesService: context.PropertiesService,
    hashedMessageId_: context.hashedMessageId_,
    readTelegramMailBrowseState_: context.readTelegramMailBrowseState_,
    renderTelegramMailBrowseList_: context.renderTelegramMailBrowseList_,
    sendTelegramText_: context.sendTelegramText_,
    systemTopicOptions_: context.systemTopicOptions_,
    saveTelegramUpdateOperation_: context.saveTelegramUpdateOperation_,
  };
  let sendAttempts = 0;
  let operationWrites = 0;
  try {
    context.PropertiesService = memory.service;
    context.hashedMessageId_ = () => '2'.repeat(16);
    context.readTelegramMailBrowseState_ = () => ({
      version: 1,
      token: '2'.repeat(16),
      chatId: '123',
      pageSize: 10,
      filters: context.telegramMailBrowseDefaultFilters_(),
      pageToken: '', nextPageToken: '', previousPageTokens: [],
      ids: ['msg_002'], offset: 0, resultSizeEstimate: 1, revision: 1,
      createdAt: Date.now(), updatedAt: Date.now(),
    });
    context.renderTelegramMailBrowseList_ = () => ({
      text: '<b>Accepted list</b>',
      markup: JSON.stringify({ inline_keyboard: [] }),
      visibleCount: 1,
    });
    context.systemTopicOptions_ = value => value || {};
    context.sendTelegramText_ = () => { sendAttempts += 1; return { message_id: 777 }; };
    context.saveTelegramUpdateOperation_ = (updateId, operation) => {
      operationWrites += 1;
      if (operationWrites === 2) throw new Error('sent marker storage failed');
      return originals.saveTelegramUpdateOperation_(updateId, operation);
    };

    context.sendTelegramMailBrowse_(9002, '/mail', {
      message_id: 93, chat: { id: 123, type: 'private' },
    }, false);
    context.sendTelegramMailBrowse_(9002, '/mail', {
      message_id: 93, chat: { id: 123, type: 'private' },
    }, false);

    assert.equal(sendAttempts, 1);
    const operation = JSON.parse(memory.store.TELEGRAM_UPDATE_OPERATION_9002);
    assert.equal(operation.kind, 'mail_browse_initial_send');
    assert.equal(operation.phase, 'uncertain');
    assert.match(operation.lastError, /may have been accepted/i);
  } finally {
    Object.assign(context, originals);
  }
});

test('opening a chat-native mail detail is read-only and exposes Mini App and Gmail deep links', () => {
  const memory = memoryProperties({ CHAT_ID: '123' });
  const originals = {
    PropertiesService: context.PropertiesService,
    LockService: context.LockService,
    getGmailMessage_: context.getGmailMessage_,
    gmailApiRequest_: context.gmailApiRequest_,
    telegramRequest_: context.telegramRequest_,
    formatSentDate_: context.formatSentDate_,
  };
  const telegramCalls = [];
  let fullReads = 0;
  try {
    context.PropertiesService = memory.service;
    context.LockService = immediateScriptLock();
    context.gmailApiRequest_ = () => { throw new Error('mail detail must never mutate Gmail'); };
    context.getGmailMessage_ = messageId => {
      fullReads += 1;
      return {
        id: messageId,
        threadId: 'thread_007',
        labelIds: ['INBOX', 'UNREAD'],
        unread: true,
        timestamp: Date.now(),
        sentAt: 'Fri, 17 Jul 2026 12:00:00 +0200',
        from: 'Billing <billing@example.com>',
        subject: 'Invoice 007',
        snippet: 'Please review the invoice.',
        plain: 'Please review the complete invoice and payment date.',
        html: '',
        attachments: [{ name: 'invoice.pdf' }],
      };
    };
    context.formatSentDate_ = () => 'п’ятниця, 17 липня 2026 о 12:00';
    context.telegramRequest_ = (method, payload) => {
      telegramCalls.push({ method, payload });
      return { message_id: payload.message_id };
    };
    const state = context.persistTelegramMailBrowseState_({
      version: 1,
      token: 'c'.repeat(16),
      chatId: '123',
      pageSize: 10,
      filters: context.telegramMailBrowseDefaultFilters_(),
      pageToken: '', nextPageToken: '', previousPageTokens: [],
      ids: ['msg_007'], offset: 0, resultSizeEstimate: 1, revision: 1,
      createdAt: Date.now(), updatedAt: Date.now(),
    });
    context.handleTelegramMailBrowseCallback_(5002, {
      message: { message_id: 78, chat: { id: 123, type: 'private' } },
    }, { token: state.token, revision: state.revision, action: 'o', argument: '0' });

    assert.equal(fullReads, 1);
    assert.equal(telegramCalls.length, 1);
    assert.equal(telegramCalls[0].method, 'editMessageText');
    assert.match(telegramCalls[0].payload.text, /🔵 Непрочитаний лист/);
    assert.match(telegramCalls[0].payload.text, /Перегляд не змінює стан листа/);
    const buttons = JSON.parse(telegramCalls[0].payload.reply_markup).inline_keyboard.flat();
    assert.ok(buttons.some(button => button.web_app && /#view=thread/.test(button.web_app.url)));
    assert.ok(buttons.some(button => /^https:\/\/mail\.google\.com\/mail\//.test(button.url || '')));
    assert.ok(buttons.some(button => /^b\.[a-f0-9]{16}\.[0-9a-z]{1,6}\.l$/.test(button.callback_data || '')));
    assert.equal(buttons.some(button => /^m\./.test(button.callback_data || '')), false);
  } finally {
    Object.assign(context, originals);
  }
});

test('full Gmail DTO exposes the authoritative UNREAD label without mutation', () => {
  const originals = {
    gmailApi_: context.gmailApi_,
    gmailApiRequest_: context.gmailApiRequest_,
  };
  try {
    context.gmailApiRequest_ = () => { throw new Error('unexpected Gmail mutation'); };
    context.gmailApi_ = requestPath => {
      assert.match(requestPath, /^\/messages\/msg_900\?format=full$/);
      return {
        id: 'msg_900',
        threadId: 'thread_900',
        internalDate: String(Date.now()),
        labelIds: ['INBOX', 'UNREAD'],
        snippet: 'Unread preview',
        payload: { mimeType: 'text/plain', headers: [], body: {} },
      };
    };
    const message = context.getGmailMessage_('msg_900');
    assert.equal(message.unread, true);
    assert.deepEqual(Array.from(message.labelIds), ['INBOX', 'UNREAD']);
  } finally {
    Object.assign(context, originals);
  }
});

test('Box OAuth callback is an exact route before mailbox and forwards only its bounded DTO', () => {
  const doGetStart = code.indexOf('function doGet(e)');
  const boxRoute = code.indexOf("if (action === 'box_oauth_callback')", doGetStart);
  const mailboxRoute = code.indexOf("if (action === 'mailbox' || view === 'mailbox')", doGetStart);
  assert.ok(doGetStart >= 0 && boxRoute > doGetStart && mailboxRoute > boxRoute);

  const outputs = [];
  const originals = {
    HtmlService: context.HtmlService,
    mailboxHandleBoxOAuthCallback_: context.mailboxHandleBoxOAuthCallback_,
    serveMailboxApp_: context.serveMailboxApp_,
    handlePrivateWebAction_: context.handlePrivateWebAction_,
  };
  let forwarded;
  try {
    context.HtmlService = capturingHtmlService(outputs);
    context.serveMailboxApp_ = () => { throw new Error('mailbox route collision'); };
    context.handlePrivateWebAction_ = () => { throw new Error('legacy route collision'); };
    context.mailboxHandleBoxOAuthCallback_ = input => {
      forwarded = plainJsonValue(input);
      return { ok: true, title: 'Box підключено', message: 'Готово до роботи.' };
    };
    const secretCode = 'box-code-secret-ABC123';
    const secretState = 'S'.repeat(43);
    const output = context.doGet(boxOAuthEvent({ code: secretCode, state: secretState }));

    assert.deepEqual(forwarded, {
      code: secretCode, state: secretState, error: '', errorDescription: '',
    });
    assert.equal(output, outputs[0]);
    assert.equal(output.title, 'Box · Gmail → Telegram');
    assert.match(output.html, /Box підключено/);
    assert.match(output.html, /Cache-Control[^>]*no-store/i);
    assert.match(output.html, /name="referrer" content="no-referrer"/i);
    assert.match(output.html, /history\.replaceState/);
    assert.doesNotMatch(output.html, new RegExp(secretCode));
    assert.doesNotMatch(output.html, new RegExp(secretState));
  } finally {
    Object.assign(context, originals);
  }
});

test('Box OAuth callback rejects malformed, duplicate and oversized query envelopes before MailClient', () => {
  const outputs = [];
  const originals = {
    HtmlService: context.HtmlService,
    mailboxHandleBoxOAuthCallback_: context.mailboxHandleBoxOAuthCallback_,
  };
  let helperCalls = 0;
  try {
    context.HtmlService = capturingHtmlService(outputs);
    context.mailboxHandleBoxOAuthCallback_ = () => {
      helperCalls += 1;
      return { ok: true };
    };
    const state = 'V'.repeat(43);
    assert.equal(context.boxOAuthCallbackInput_(boxOAuthEvent({
      code: 'c'.repeat(2048), state,
    })).code.length, 2048);
    assert.equal(context.boxOAuthCallbackInput_(boxOAuthEvent({
      error: 'access_denied', error_description: 'd'.repeat(500), state,
    })).errorDescription.length, 500);
    const invalidEvents = [
      boxOAuthEvent({ code: 'ok', state: 'short' }),
      boxOAuthEvent({ code: 'x'.repeat(2049), state }),
      boxOAuthEvent({ code: 'ok', error: 'access_denied', state }),
      boxOAuthEvent({ state }),
      boxOAuthEvent({ code: 'ok', state, error_description: 'orphan description' }),
      boxOAuthEvent({ error: 'bad error', state }),
      boxOAuthEvent({ code: 'bad\ncode', state }),
      boxOAuthEvent({ code: 'ok', state }, { state: [state, state] }),
      boxOAuthEvent({ code: 'ok', state }, { action: ['box_oauth_callback', 'mailbox'] }),
      boxOAuthEvent({ error: 'access_denied', error_description: 'x'.repeat(501), state }),
    ];
    for (const event of invalidEvents) {
      const output = context.doGet(event);
      assert.match(output.html, /Посилання авторизації недійсне або застаріло/);
      assert.doesNotMatch(output.html, /bad\s*code|orphan description|access_denied/);
    }
    assert.equal(helperCalls, 0);
    assert.equal(outputs.length, invalidEvents.length);
  } finally {
    Object.assign(context, originals);
  }
});

test('Box provider denial is consumed once and raw provider text never reaches the page', () => {
  const outputs = [];
  const originals = {
    HtmlService: context.HtmlService,
    mailboxHandleBoxOAuthCallback_: context.mailboxHandleBoxOAuthCallback_,
  };
  let forwarded;
  try {
    context.HtmlService = capturingHtmlService(outputs);
    context.mailboxHandleBoxOAuthCallback_ = input => {
      forwarded = plainJsonValue(input);
      return { ok: false, title: 'Підключення скасовано', message: 'Box не надав доступ.' };
    };
    const state = 'D'.repeat(43);
    const rawDescription = 'RAW_PROVIDER_SECRET_987';
    const output = context.doGet(boxOAuthEvent({
      error: 'access_denied', error_description: rawDescription, state,
    }));

    assert.deepEqual(forwarded, {
      code: '', state, error: 'access_denied', errorDescription: rawDescription,
    });
    assert.match(output.html, /Підключення скасовано/);
    assert.match(output.html, /Box не надав доступ/);
    assert.doesNotMatch(output.html, /access_denied|RAW_PROVIDER_SECRET_987/);
    assert.doesNotMatch(output.html, new RegExp(state));
  } finally {
    Object.assign(context, originals);
  }
});

test('Box OAuth result text is escaped and bounded, and no helper path can echo callback secrets', () => {
  const outputs = [];
  const originals = {
    HtmlService: context.HtmlService,
    mailboxHandleBoxOAuthCallback_: context.mailboxHandleBoxOAuthCallback_,
  };
  try {
    context.HtmlService = capturingHtmlService(outputs);
    context.mailboxHandleBoxOAuthCallback_ = () => ({
      ok: false,
      title: '<img src=x onerror=alert(1)>',
      message: 'M'.repeat(501),
    });
    const first = context.doGet(boxOAuthEvent({
      code: 'first-secret-code', state: 'E'.repeat(43),
    }));
    assert.match(first.html, /&lt;img src=x onerror=alert\(1\)&gt;/);
    assert.doesNotMatch(first.html, /<img src=x|M{100}/);
    assert.match(first.html, /Поверніться до пошти та спробуйте ще раз/);

    context.mailboxHandleBoxOAuthCallback_ = input => ({
      ok: true,
      title: 'Echo ' + input.code,
      message: 'Echo ' + input.state,
    });
    const echoCode = 'ECHO_SECRET_CODE';
    const echoState = 'G'.repeat(43);
    const echoed = context.doGet(boxOAuthEvent({ code: echoCode, state: echoState }));
    assert.match(echoed.html, /Box підключено/);
    assert.match(echoed.html, /Можна закрити це вікно/);
    assert.doesNotMatch(echoed.html, new RegExp(echoCode));
    assert.doesNotMatch(echoed.html, new RegExp(echoState));

    context.mailboxHandleBoxOAuthCallback_ = () => {
      throw new Error('token=DO_NOT_RENDER code=SECOND_SECRET_CODE');
    };
    const second = context.doGet(boxOAuthEvent({
      code: 'SECOND_SECRET_CODE', state: 'F'.repeat(43),
    }));
    assert.match(second.html, /Посилання авторизації недійсне або застаріло/);
    assert.doesNotMatch(second.html, /DO_NOT_RENDER|SECOND_SECRET_CODE|token=/);
  } finally {
    Object.assign(context, originals);
  }
});

test('compassionate reminder callbacks are bounded opaque and round-trip exactly', () => {
  const reminderId = '0123456789abcdef';
  for (const action of ['later', 'suppress']) {
    const data = context.mailReminderCallbackData_(action, reminderId, 7);
    assert.ok(Buffer.byteLength(data, 'utf8') <= 64);
    assert.deepEqual({ ...context.parseMailReminderCallback_(data) }, { action, reminderId, revision: 7 });
  }
  assert.equal(context.parseMailReminderCallback_('rm2.l.not-a-record'), null);
  assert.throws(() => context.mailReminderCallbackData_('delete', reminderId), /Некоректна/);
});

test('reminder delivery ledger reserves before Telegram and quarantines an expired or uncertain create', () => {
  const memory = memoryProperties();
  const originals = {
    PropertiesService: context.PropertiesService,
    LockService: context.LockService,
  };
  try {
    context.PropertiesService = memory.service;
    context.LockService = immediateScriptLock();
    const candidate = {
      v: 1, reminderId: '1111111111111111', userId: '427886279', chatId: '427886279',
      connectionId: 'gmail-reminder-unit', threadId: 'thread_reminder_unit',
      messageId: 'message_reminder_unit', state: 'pending', mode: 'soft',
      revision: 1, nextEligibleAt: 1, attempts: 0, createdAt: 1, updatedAt: 1,
      subject: 'Не зберігати тему', accountEmail: 'account@example.com',
    };
    const now = Date.now();
    const first = context.reserveMailReminder_(candidate, now);
    assert.ok(first && first.leaseToken);
    assert.equal(context.reserveMailReminder_(candidate, now), null,
      'a live claim must suppress a concurrent Telegram create');
    const stored = context.mailReminderReadRecord_(null, candidate.reminderId);
    assert.equal(stored.state, 'reserved');
    assert.equal(JSON.stringify(stored).includes(candidate.subject), false,
      'durable reminder state must not retain mail content');
    assert.equal(JSON.stringify(stored).includes(candidate.accountEmail), false,
      'durable reminder state must not retain the account address');

    stored.updatedAt = now - 2 * 60 * 1000 - 1;
    memory.store[context.mailReminderPropertyKey_(candidate.reminderId)] = JSON.stringify(stored);
    const reclaimed = context.reserveMailReminder_(candidate, now);
    assert.ok(reclaimed && reclaimed.leaseToken !== first.leaseToken,
      'a crash before Telegram dispatch is safe to reclaim');
    context.markMailReminderDispatching_(reclaimed);
    const dispatching = context.mailReminderReadRecord_(null, candidate.reminderId);
    dispatching.updatedAt = now - 2 * 60 * 1000 - 1;
    memory.store[context.mailReminderPropertyKey_(candidate.reminderId)] = JSON.stringify(dispatching);
    assert.equal(context.reserveMailReminder_(candidate, now), null);
    assert.equal(context.mailReminderReadRecord_(null, candidate.reminderId).state, 'uncertain',
      'an expired dispatch boundary must never be replayed automatically');

    const secondCandidate = { ...candidate, reminderId: '2222222222222222' };
    const second = context.reserveMailReminder_(secondCandidate, now);
    context.markMailReminderDispatching_(second);
    const uncertainError = new Error('transport lost');
    uncertainError.telegramOutcomeUncertain = true;
    context.finishMailReminder_(second, null, uncertainError);
    assert.equal(context.mailReminderReadRecord_(null, secondCandidate.reminderId).state, 'uncertain');

    const evolving = { ...candidate, reminderId: '5555555555555555', messageId: 'message_old_unit' };
    const oldClaim = context.reserveMailReminder_(evolving, now);
    context.markMailReminderDispatching_(oldClaim);
    context.finishMailReminder_(oldClaim, { message_id: 81 }, null);
    assert.equal(context.reserveMailReminder_(evolving, now), null,
      'the same Gmail message receives at most one reminder');
    const oldDelivered = context.mailReminderReadRecord_(null, evolving.reminderId);
    const newer = { ...evolving, messageId: 'message_new_unit', updatedAt: now + 1 };
    const newerClaim = context.reserveMailReminder_(newer, now + 1);
    assert.ok(newerClaim,
      'a genuinely new message in the thread may receive a new reminder');
    context.markMailReminderDispatching_(newerClaim);
    context.finishMailReminder_(newerClaim, { message_id: 82 }, null);
    const newDelivered = context.mailReminderReadRecord_(null, evolving.reminderId);
    assert.ok(newDelivered.revision > oldDelivered.revision,
      'a new message cycle must never reuse an older callback revision');
    assert.throws(() => context.executeMailReminderCallback_(
      { from: { id: 427886279 }, message: { message_id: 81, chat: { id: 427886279, type: 'private' } } },
      { action: 'later', reminderId: evolving.reminderId, revision: newDelivered.revision },
      '427886279'
    ), /іншого циклу/,
    'even a forged current revision must be bound to the delivered Telegram message');

    const exhausted = { ...candidate, reminderId: '6666666666666666', attempts: 8, revision: 8 };
    context.mailReminderWriteLocked_(memory.service.getScriptProperties(), exhausted);
    assert.equal(context.reserveMailReminder_(exhausted, now + 2), null);
    assert.equal(context.mailReminderReadRecord_(null, exhausted.reminderId).state, 'uncertain',
      'definite Telegram failures must stop after the bounded retry limit');
  } finally {
    Object.assign(context, originals);
  }
});

test('soft reminders continue only through a later digest window until fresh user activity', () => {
  const memory = memoryProperties();
  const originals = {
    PropertiesService: context.PropertiesService,
    LockService: context.LockService,
    telegramRequest_: context.telegramRequest_,
  };
  const telegramCalls = [];
  let freshActivityOverride = 0;
  try {
    context.PropertiesService = memory.service;
    context.LockService = immediateScriptLock();
    context.telegramRequest_ = (method, payload) => { telegramCalls.push({ method, payload }); return true; };
    context.mailReminderFreshActivityAtLocked_ = (_props, value) => Math.max(
      Number(value.activityAt || 0), freshActivityOverride
    );
    const now = Date.now();
    const candidate = {
      v: 1, reminderId: 'abababababababab', userId: '427886279', chatId: '427886279',
      connectionId: 'gmail-soft-digest', threadId: 'thread_soft_digest',
      messageId: 'message_soft_digest', state: 'pending', mode: 'soft', revision: 1,
      nextEligibleAt: now, attempts: 0, createdAt: now, updatedAt: now,
      activityAt: now - 24 * 60 * 60 * 1000, digestWindowOpen: false,
      subject: 'М’яке продовження', accountEmail: 'owner@example.com',
    };
    const first = context.reserveMailReminder_(candidate, now);
    context.markMailReminderDispatching_(first);
    context.finishMailReminder_(first, { message_id: 81 }, null);
    const delivered = context.mailReminderReadRecord_(null, candidate.reminderId);
    const nextWindow = delivered.deliveredAt + 24 * 60 * 60 * 1000 + 1;

    assert.equal(context.reserveMailReminder_({ ...candidate, digestWindowOpen: false }, nextWindow), null,
      'soft mode must never create another standalone reminder outside a digest window');
    const digestClaim = context.reserveMailReminder_({ ...candidate, digestWindowOpen: true }, nextWindow);
    assert.equal(digestClaim.record.mode, 'soft_digest');
    assert.equal(digestClaim.previousTelegramMessageId, 81);
    assert.equal(context.mailReminderReadRecord_(null, candidate.reminderId).previousTelegramMessageId, 81,
      'the old standalone message retirement must survive a crash or definite retry');
    assert.equal('digestWindowOpen' in context.mailReminderReadRecord_(null, candidate.reminderId), false,
      'the transient scheduling decision must not be persisted');
    context.markMailReminderDispatching_(digestClaim);
    context.finishMailReminder_(digestClaim, { message_id: 82, mailReminderDigest: true }, null);
    assert.equal(context.retirePendingPreviousReminderMessages_(1), 1,
      'a later worker must finish durable retirement after the delivery execution exits');
    const digestDelivered = context.mailReminderReadRecord_(null, candidate.reminderId);
    assert.equal(digestDelivered.previousTelegramMessageId, undefined,
      'confirmed idempotent deletion clears the durable retirement marker');
    assert.equal(telegramCalls[0].method, 'deleteMessage');
    assert.equal(telegramCalls[0].payload.chat_id, '427886279');
    assert.equal(telegramCalls[0].payload.message_id, 81);

    const delayedDigest = { ...digestDelivered, state: 'pending', nextEligibleAt: 0, revision: digestDelivered.revision + 1 };
    context.mailReminderWriteLocked_(memory.service.getScriptProperties(), delayedDigest);
    assert.equal(context.reserveMailReminder_({ ...candidate, digestWindowOpen: false }, nextWindow + 1), null,
      'Later and definite retry paths must still wait for a configured digest window');
    context.mailReminderWriteLocked_(memory.service.getScriptProperties(), digestDelivered);

    const afterAction = nextWindow + 24 * 60 * 60 * 1000 + 1;
    freshActivityOverride = candidate.activityAt + 1;
    assert.equal(context.reserveMailReminder_({ ...candidate, digestWindowOpen: true }, afterAction), null,
      'fresh activity arriving after candidate creation must stop continuation inside the reservation lock');
  } finally {
    Object.assign(context, originals);
  }
});

test('accepted Telegram reminder becomes uncertain when its delivered marker cannot persist', () => {
  const original = context.finishMailReminder_;
  const calls = [];
  try {
    context.finishMailReminder_ = (_claim, result, error) => {
      calls.push({ result, error });
      if (calls.length === 1) throw new Error('synthetic delivered-marker failure');
      return { state: error && error.telegramOutcomeUncertain ? 'uncertain' : 'pending' };
    };
    assert.throws(() => context.finishAcceptedMailReminder_(
      { record: { reminderId: 'cdcdcdcdcdcdcdcd' }, leaseToken: 'lease' },
      { message_id: 91 }
    ), /synthetic delivered-marker failure/);
    assert.equal(calls.length, 2);
    assert.equal(calls[1].error.telegramOutcomeUncertain, true,
      'post-create persistence loss must never become a definite retry');
  } finally {
    context.finishMailReminder_ = original;
  }
});

test('under-lock activity verification invalidates removal through scoped registry revisions', () => {
  const helper = code.match(/function mailReminderFreshActivityAtLocked_\([\s\S]*?\r?\n}\r?\n/);
  assert.ok(helper, 'the under-lock activity helper must remain present');
  assert.match(helper[0], /attention\.revision[\s\S]*candidate\.attentionRevision/);
  assert.match(helper[0], /focusRegistry\.revision[\s\S]*candidate\.focusRevision/);
  assert.match(helper[0], /return Number\.MAX_SAFE_INTEGER/,
    'a removed entry has no timestamp, so a scoped revision change must invalidate the candidate');
});

test('fresh activity cancels every pending soft-digest retry and restores the prior reminder', () => {
  const memory = memoryProperties();
  const originals = {
    PropertiesService: context.PropertiesService,
    LockService: context.LockService,
    mailReminderFreshActivityAtLocked_: context.mailReminderFreshActivityAtLocked_,
  };
  try {
    context.PropertiesService = memory.service;
    context.LockService = immediateScriptLock();
    context.mailReminderFreshActivityAtLocked_ = () => 100;
    const reminderId = 'acacacacacacacac';
    context.mailReminderWriteLocked_(memory.service.getScriptProperties(), {
      v: 1, reminderId, userId: '427886279', chatId: '427886279',
      connectionId: 'gmail-soft-retry', threadId: 'thread_soft_retry', messageId: 'message_soft_retry',
      state: 'pending', mode: 'soft_digest', revision: 5, nextEligibleAt: 0, attempts: 1,
      createdAt: 1, updatedAt: 1, activityAt: 100,
      activityAttentionRevision: 1, activityFocusRevision: 1, previousTelegramMessageId: 81,
    });
    const candidate = {
      v: 1, reminderId, userId: '427886279', chatId: '427886279',
      connectionId: 'gmail-soft-retry', threadId: 'thread_soft_retry', messageId: 'message_soft_retry',
      state: 'pending', mode: 'soft', revision: 1, nextEligibleAt: 0, attempts: 0,
      createdAt: 1, updatedAt: 1, activityAt: 100, digestWindowOpen: true,
      attentionRevision: 2, focusRevision: 1,
    };
    assert.equal(context.reserveMailReminder_(candidate, Date.now()), null);
    const restored = context.mailReminderReadRecord_(null, reminderId);
    assert.equal(restored.state, 'delivered');
    assert.equal(restored.mode, 'soft');
    assert.equal(restored.telegramMessageId, 81);
    assert.equal(restored.previousTelegramMessageId, undefined);
  } finally {
    Object.assign(context, originals);
  }
});

test('Later and suppress callbacks update only the owning Telegram reminder and never touch Gmail', () => {
  const memory = memoryProperties();
  const telegramCalls = [];
  const originals = {
    PropertiesService: context.PropertiesService,
    LockService: context.LockService,
    telegramRequest_: context.telegramRequest_,
    getGmailMessage_: context.getGmailMessage_,
  };
  try {
    context.PropertiesService = memory.service;
    context.LockService = immediateScriptLock();
    context.telegramRequest_ = (method, payload) => {
      telegramCalls.push({ method, payload });
      return true;
    };
    context.getGmailMessage_ = () => { throw new Error('Gmail must not be read by reminder controls'); };
    const reminderId = '3333333333333333';
    context.mailReminderWriteLocked_(memory.service.getScriptProperties(), {
      v: 1, reminderId, userId: '427886279', chatId: '427886279',
      connectionId: 'gmail-reminder-owner', threadId: 'thread_reminder_owner',
      messageId: 'message_reminder_owner', state: 'delivered', mode: 'soft',
      revision: 1, nextEligibleAt: 0, attempts: 1, createdAt: 1, updatedAt: 1,
      telegramMessageId: 77, deliveryKind: 'single',
    });
    const query = {
      from: { id: 427886279 },
      message: { message_id: 77, chat: { id: 427886279, type: 'private' } },
    };
    const later = context.executeMailReminderCallback_(query, { action: 'later', reminderId, revision: 1 }, '427886279');
    assert.match(later.message, /завтра/);
    const delayed = context.mailReminderReadRecord_(null, reminderId);
    assert.equal(delayed.state, 'pending');
    assert.ok(delayed.nextEligibleAt > Date.now() + 23 * 60 * 60 * 1000);
    assert.equal(telegramCalls[0].method, 'deleteMessage');

    assert.throws(() => context.executeMailReminderCallback_(
      { ...query, from: { id: 999999999 } },
      { action: 'suppress', reminderId, revision: 2 },
      '999999999'
    ), /іншому чату|належить/);
    assert.throws(() => context.executeMailReminderCallback_(query,
      { action: 'suppress', reminderId, revision: 1 }, '427886279'), /застаріла/);
    delayed.state = 'delivered';
    delayed.revision = 3;
    delayed.deliveryKind = 'single';
    context.mailReminderWriteLocked_(memory.service.getScriptProperties(), delayed);
    context.executeMailReminderCallback_(query, { action: 'suppress', reminderId, revision: 3 }, '427886279');
    assert.equal(context.mailReminderReadRecord_(null, reminderId).state, 'suppressed');
  } finally {
    Object.assign(context, originals);
  }
});

test('reminder worker is bounded quiet-hour aware and reuses the existing minute trigger', () => {
  const timerStart = code.indexOf('function checkNewMail_()');
  const reminderWorker = code.indexOf('processCompassionateMailReminders_(2)', timerStart);
  const inboxPoll = code.indexOf("runMailCheck_('timer')", timerStart);
  assert.ok(reminderWorker > timerStart && reminderWorker < inboxPoll);
  assert.equal(context.mailReminderInQuietHours_(21 * 60 + 59), false);
  assert.equal(context.mailReminderInQuietHours_(22 * 60), true);
  assert.equal(context.mailReminderInQuietHours_(7 * 60 + 59), true);
  assert.equal(context.mailReminderInQuietHours_(8 * 60), false);
  assert.equal(context.mailReminderDigestWindowOpen_(9 * 60 + 4, [9 * 60]), true);
  assert.equal(context.mailReminderDigestWindowOpen_(9 * 60 + 9, [9 * 60]), true);
  assert.equal(context.mailReminderDigestWindowOpen_(9 * 60 + 10, [9 * 60]), false);
  assert.match(code, /Лист, до якого можна повернутися|М’яке нагадування/);
  assert.doesNotMatch(code, /ви знову не|ви пропустили|провалили інбокс|серія втрачена/i);
});

test('urgent-only reminders require explicit critical focus and every mode defers during quiet hours', () => {
  const originals = {
    withMailboxConnectionContext_: context.withMailboxConnectionContext_,
    mailboxAttentionScope_: context.mailboxAttentionScope_,
    mailboxAttentionReadRegistry_: context.mailboxAttentionReadRegistry_,
    mailboxAttentionPreferencesNormalize_: context.mailboxAttentionPreferencesNormalize_,
    getGmailMessage_: context.getGmailMessage_,
    mailboxFocusReadRegistry_: context.mailboxFocusReadRegistry_,
    mailboxFocusScope_: context.mailboxFocusScope_,
    mailboxFocusEvaluate_: context.mailboxFocusEvaluate_,
    mailboxMultiReadRegistry_: context.mailboxMultiReadRegistry_,
    mailReminderId_: context.mailReminderId_,
    Utilities: context.Utilities,
  };
  const preferences = {
    onboardingCompletedAt: 1,
    reminderMode: 'urgent_only',
    digestWindows: [540],
    timezone: 'Europe/Brussels',
  };
  let focus = { priority: 'high', rank: 3 };
  let hour = 9;
  let entryUpdatedAt = 0;
  try {
    vm.runInContext('var mailboxCurrentSessionContext_ = {};', context);
    context.withMailboxConnectionContext_ = (_user, _connection, _role, callback) => callback();
    context.mailboxAttentionScope_ = () => ({ userId: '427886279', connectionId: 'gmail-unit' });
    context.mailboxAttentionReadRegistry_ = () => ({
      preferences,
      entries: [{ threadId: 'thread_unit_123', triage: 'action', updatedAt: entryUpdatedAt }],
    });
    context.mailboxAttentionPreferencesNormalize_ = value => value;
    context.getGmailMessage_ = () => ({
      id: 'message_unit_123', threadId: 'thread_unit_123',
      from: 'Worker <worker@example.com>', subject: 'Важлива відповідь', labelIds: ['INBOX'],
    });
    context.mailboxFocusReadRegistry_ = () => ({});
    context.mailboxFocusScope_ = () => ({});
    context.mailboxFocusEvaluate_ = () => focus;
    context.mailboxMultiReadRegistry_ = () => ({ connections: [{ id: 'gmail-unit', email: 'unit@example.com' }] });
    context.mailReminderId_ = () => '4444444444444444';
    context.Utilities = { formatDate: (_date, _timezone, pattern) => pattern === 'H' ? String(hour) : '0' };
    const now = Date.now();
    const card = {
      userId: '427886279', chatId: '427886279', connectionId: 'gmail-unit',
      gmailThreadId: 'thread_unit_123', gmailMessageId: 'message_unit_123',
      createdAt: now - 3 * 60 * 60 * 1000,
    };
    assert.equal(context.mailReminderCandidate_(card, now), null,
      'high priority is not enough in urgent-only mode');
    focus = { priority: 'critical', rank: 4 };
    assert.equal(context.mailReminderCandidate_(card, now).mode, 'urgent_only');
    assert.equal(context.mailReminderCandidate_({ ...card, updatedAt: now - 30 * 60 * 1000 }, now), null,
      'a newer card update must restart the delay even when createdAt is populated');
    entryUpdatedAt = now - 30 * 60 * 1000;
    assert.equal(context.mailReminderCandidate_(card, now), null,
      'a newly assigned Action state must restart the compassionate delay');
    entryUpdatedAt = 0;
    hour = 23;
    assert.equal(context.mailReminderCandidate_(card, now), null,
      'even critical reminders must defer rather than merely become silent at night');
    assert.equal(context.mailReminderCandidate_({ ...card, chatId: '-1001234567890' }, now), null,
      'reminders are private-user only and can never fall back from a group chat to the owner chat');
  } finally {
    Object.assign(context, originals);
  }
});

test('digest mode groups bounded reminders into one Telegram create with per-thread controls', () => {
  const calls = [];
  const originals = {
    sendTelegramText_: context.sendTelegramText_,
    mailboxAppUrl_: context.mailboxAppUrl_,
  };
  try {
    context.mailboxAppUrl_ = (_view, threadId) => 'https://example.test/mail#' + threadId;
    context.sendTelegramText_ = (text, markup, options) => {
      calls.push({ text, markup: JSON.parse(markup), options });
      return { message_id: 91 };
    };
    const claims = ['a', 'b'].map((suffix, index) => ({
      subject: 'Лист ' + suffix,
      accountEmail: index ? 'work@example.com' : 'home@example.com',
      record: {
        chatId: '427886279', threadId: 'thread_digest_' + suffix,
        messageId: 'message_digest_' + suffix,
        reminderId: index ? 'bbbbbbbbbbbbbbbb' : 'aaaaaaaaaaaaaaaa',
      },
    }));
    assert.equal(context.sendClaimedMailReminderDigest_(claims).message_id, 91);
    assert.equal(calls.length, 1, 'one digest window must create one Telegram message');
    assert.match(calls[0].text, /Спокійний дайджест/);
    assert.match(calls[0].text, /Лист a[\s\S]*Лист b/);
    const buttons = calls[0].markup.inline_keyboard.flat();
    assert.equal(buttons.filter(button => button.web_app).length, 2);
    assert.equal(buttons.filter(button => context.parseMailReminderCallback_(button.callback_data)).length, 4);
  } finally {
    Object.assign(context, originals);
  }
});

test('handling one digest row preserves every other reminder control', () => {
  const memory = memoryProperties();
  const calls = [];
  const originals = {
    PropertiesService: context.PropertiesService,
    LockService: context.LockService,
    telegramRequest_: context.telegramRequest_,
  };
  try {
    context.PropertiesService = memory.service;
    context.LockService = immediateScriptLock();
    context.telegramRequest_ = (method, payload) => { calls.push({ method, payload }); return true; };
    const rows = [];
    for (const [index, reminderId] of ['7777777777777777', '8888888888888888'].entries()) {
      context.mailReminderWriteLocked_(memory.service.getScriptProperties(), {
        v: 1, reminderId, userId: '427886279', chatId: '427886279',
        connectionId: 'gmail-digest-owner', threadId: 'thread_digest_' + index,
        messageId: 'message_digest_' + index, state: 'delivered', mode: 'digest', revision: 2,
        nextEligibleAt: 0, attempts: 1, createdAt: 1, updatedAt: 1,
        telegramMessageId: 99, deliveryKind: 'digest',
      });
      rows.push([{ text: 'Open ' + index, web_app: { url: 'https://example.test/' + index } }]);
      rows.push([{ text: 'Later ' + index,
        callback_data: context.mailReminderCallbackData_('later', reminderId, 2) }]);
    }
    const query = {
      from: { id: 427886279 },
      message: { message_id: 99, chat: { id: 427886279, type: 'private' }, reply_markup: { inline_keyboard: rows } },
    };
    context.executeMailReminderCallback_(query,
      { action: 'later', reminderId: '7777777777777777', revision: 2 }, '427886279');
    assert.equal(calls.length, 1);
    assert.equal(calls[0].method, 'editMessageReplyMarkup');
    const remaining = JSON.parse(calls[0].payload.reply_markup).inline_keyboard.flat();
    assert.equal(remaining.some(button => String(button.callback_data || '').includes('7777777777777777')), false);
    assert.equal(remaining.some(button => String(button.callback_data || '').includes('8888888888888888')), true,
      'the sibling digest item must stay actionable');
  } finally {
    Object.assign(context, originals);
  }
});

test('capacity never evicts a delivered tombstone while its Gmail card is active', () => {
  const memory = memoryProperties();
  const originals = {
    PropertiesService: context.PropertiesService,
    LockService: context.LockService,
  };
  try {
    context.PropertiesService = memory.service;
    context.LockService = immediateScriptLock();
    const reminderKeys = [];
    const cardKeys = [];
    for (let index = 0; index < 72; index += 1) {
      const reminderId = index.toString(16).padStart(16, '0');
      const reminderKey = context.mailReminderPropertyKey_(reminderId);
      const messageId = 'message_capacity_' + String(index).padStart(2, '0');
      const cardKey = 'CARD_CAPACITY_' + index;
      reminderKeys.push(reminderKey);
      cardKeys.push(cardKey);
      const owner = index < 48 ? '427886279' : '527886279';
      memory.store[reminderKey] = JSON.stringify({
        v: 1, reminderId, userId: owner, chatId: owner,
        connectionId: index < 48 ? 'gmail-capacity-owner' : 'gmail-capacity-family', threadId: 'thread_capacity_' + String(index).padStart(2, '0'),
        messageId, state: 'delivered', mode: 'soft', revision: 2,
        nextEligibleAt: 0, attempts: 1, createdAt: 1, updatedAt: 1,
      });
      memory.store[cardKey] = JSON.stringify({ state: 'active', gmailMessageId: messageId });
    }
    memory.store.MAIL_REMINDER_INDEX_V1 = JSON.stringify(reminderKeys);
    memory.store.TELEGRAM_MAIL_CARD_INDEX = JSON.stringify(cardKeys);
    const next = {
      v: 1, reminderId: 'ffffffffffffffff', userId: '627886279', chatId: '627886279',
      connectionId: 'gmail-capacity-third', threadId: 'thread_capacity_new',
      messageId: 'message_capacity_new', state: 'pending', mode: 'soft', revision: 1,
      nextEligibleAt: 1, attempts: 0, createdAt: 1, updatedAt: 1,
    };
    assert.throws(() => context.mailReminderWriteLocked_(memory.service.getScriptProperties(), next), /заповнене/);
    assert.ok(memory.store[reminderKeys[0]], 'active dedupe evidence must remain intact');
    delete memory.store[cardKeys[0]];
    memory.store.TELEGRAM_MAIL_CARD_INDEX = JSON.stringify(cardKeys.slice(1));
    assert.equal(context.mailReminderWriteLocked_(memory.service.getScriptProperties(), next).reminderId,
      next.reminderId, 'an inactive delivered row may be compacted safely');
  } finally {
    Object.assign(context, originals);
  }
});

test('canonical reminder scan enforces a per-user reserve even when the cached index lost entries', () => {
  const memory = memoryProperties();
  const props = memory.service.getScriptProperties();
  for (let index = 0; index < 48; index += 1) {
    const reminderId = (index + 100).toString(16).padStart(16, '0');
    memory.store[context.mailReminderPropertyKey_(reminderId)] = JSON.stringify({
      v: 1, reminderId, userId: '427886279', chatId: '427886279',
      connectionId: 'gmail-orphan-owner', threadId: 'thread_orphan_' + index,
      messageId: 'message_orphan_' + index, state: 'delivered', mode: 'soft', revision: 2,
      nextEligibleAt: 0, attempts: 1, createdAt: 1, updatedAt: 1,
    });
  }
  memory.store.MAIL_REMINDER_INDEX_V1 = '[]';
  const extra = {
    v: 1, reminderId: 'eeeeeeeeeeeeeeee', userId: '427886279', chatId: '427886279',
    connectionId: 'gmail-orphan-owner', threadId: 'thread_orphan_extra',
    messageId: 'message_orphan_extra', state: 'pending', mode: 'soft', revision: 1,
    nextEligibleAt: 1, attempts: 0, createdAt: 1, updatedAt: 1,
  };
  assert.throws(() => context.mailReminderWriteLocked_(props, extra), /заповнене/,
    'orphaned prefixed records must still count toward the fair-use quota');
});

test('index-cache failure restores the prior reminder tombstone after an accepted delivery', () => {
  const memory = memoryProperties();
  const reminderId = 'dddddddddddddddd';
  const key = context.mailReminderPropertyKey_(reminderId);
  const previous = {
    v: 1, reminderId, userId: '427886279', chatId: '427886279',
    connectionId: 'gmail-index-owner', threadId: 'thread_index_owner',
    messageId: 'message_index_owner', state: 'dispatching', mode: 'soft', revision: 2,
    nextEligibleAt: 0, attempts: 1, createdAt: 1, updatedAt: 1,
  };
  memory.store[key] = JSON.stringify(previous);
  memory.store.MAIL_REMINDER_INDEX_V1 = JSON.stringify([key]);
  const base = memory.service.getScriptProperties();
  const failing = {
    ...base,
    setProperty(name, value) {
      if (name === 'MAIL_REMINDER_INDEX_V1') throw new Error('synthetic index failure');
      base.setProperty(name, value);
    },
  };
  const delivered = { ...previous, state: 'delivered', revision: 3, telegramMessageId: 88 };
  assert.throws(() => context.mailReminderWriteLocked_(failing, delivered), /synthetic index failure/);
  assert.deepEqual(JSON.parse(memory.store[key]), previous,
    'a cache write failure must not erase or replace the pre-dispatch authoritative row');
});

test('active reminder capacity is isolated per Telegram user and Gmail connection', () => {
  const memory = memoryProperties();
  const originals = { PropertiesService: context.PropertiesService, LockService: context.LockService };
  try {
    context.PropertiesService = memory.service;
    context.LockService = immediateScriptLock();
    const props = memory.service.getScriptProperties();
    const record = (index, connectionId) => ({
      v: 1, reminderId: index.toString(16).padStart(16, '0'),
      userId: '427886279', chatId: '427886279', connectionId,
      threadId: 'thread_active_' + String(index).padStart(2, '0'),
      messageId: 'message_active_' + String(index).padStart(2, '0'),
      state: 'pending', mode: 'soft', revision: 1,
      nextEligibleAt: 1, attempts: 0, createdAt: 1, updatedAt: 1,
    });
    for (let index = 1; index <= 24; index += 1) {
      context.mailReminderWriteLocked_(props, record(index, 'gmail-active-a'));
    }
    assert.throws(() => context.mailReminderWriteLocked_(props, record(25, 'gmail-active-a')),
      /забагато активних/);
    assert.equal(context.mailReminderWriteLocked_(props, record(26, 'gmail-active-b')).connectionId,
      'gmail-active-b');
  } finally {
    Object.assign(context, originals);
  }
});
