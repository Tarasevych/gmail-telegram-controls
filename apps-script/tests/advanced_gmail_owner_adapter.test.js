'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const CODE_PATH = path.join(__dirname, '..', 'Code.gs');
const SOURCE = fs.readFileSync(CODE_PATH, 'utf8');
const ADAPTER_START = SOURCE.indexOf("const GMAIL_OWNER_ADVANCED_READ_FLAG_");
const ADAPTER_END = SOURCE.indexOf('function gmailApi_(path)', ADAPTER_START);

assert.ok(ADAPTER_START >= 0 && ADAPTER_END > ADAPTER_START, 'owner adapter source must be inspectable');
const ADAPTER_SOURCE = SOURCE.slice(ADAPTER_START, ADAPTER_END);

function plain(value) {
  return JSON.parse(JSON.stringify(value));
}

function makeHarness(options = {}) {
  const calls = [];
  let propertyReads = 0;
  const sandbox = {
    mailboxCurrentSessionContext_: options.session || null,
    mailboxMultiResolveAccess_: () => ({
      connection: { provider: options.provider || 'apps_script_owner' },
    }),
    PropertiesService: {
      getScriptProperties: () => ({
        getProperty: key => {
          propertyReads += 1;
          assert.equal(key, 'GMAIL_OWNER_ADVANCED_READ_V1');
          return options.flag || '';
        },
      }),
    },
    Gmail: {
      Users: {
        Messages: {
          list: (userId, params) => {
            calls.push({ method: 'messages.list', userId, params: plain(params) });
            if (options.advancedError) throw new Error('advanced failure');
            return { messages: [{ id: 'message_1' }] };
          },
          get: (userId, messageId, params) => {
            calls.push({ method: 'messages.get', userId, messageId, params: plain(params) });
            if (options.advancedError) throw new Error('advanced failure');
            return { id: messageId };
          },
        },
        History: {
          list: (userId, params) => {
            calls.push({ method: 'history.list', userId, params: plain(params) });
            if (options.advancedError) throw new Error('advanced failure');
            return { historyId: '9001' };
          },
        },
      },
    },
  };
  vm.createContext(sandbox);
  vm.runInContext(ADAPTER_SOURCE, sandbox);
  return { sandbox, calls, propertyReads: () => propertyReads };
}

test('owner messages.list uses Advanced Gmail only under the protected flag', () => {
  const harness = makeHarness({ flag: 'enabled' });
  const result = harness.sandbox.gmailOwnerAdvancedReadRequest_(
    '/messages?labelIds=INBOX&labelIds=UNREAD&maxResults=25&pageToken=p%2B1&q=is%3Aunread',
    { method: 'get' }
  );
  assert.equal(result.handled, true);
  assert.deepEqual(plain(result.value), { messages: [{ id: 'message_1' }] });
  assert.deepEqual(harness.calls, [{
    method: 'messages.list',
    userId: 'me',
    params: {
      labelIds: ['INBOX', 'UNREAD'],
      maxResults: 25,
      pageToken: 'p+1',
      q: 'is:unread',
    },
  }]);
});

test('an owner connection context can use messages.get without exposing a token', () => {
  const harness = makeHarness({ flag: 'enabled', session: { connectionId: 'owner_connection' } });
  const result = harness.sandbox.gmailOwnerAdvancedReadRequest_(
    '/messages/msg_123?format=metadata&metadataHeaders=Subject&metadataHeaders=From',
    { method: 'GET' }
  );
  assert.equal(result.handled, true);
  assert.deepEqual(harness.calls, [{
    method: 'messages.get', userId: 'me', messageId: 'msg_123',
    params: { format: 'metadata', metadataHeaders: ['Subject', 'From'] },
  }]);
});

test('external Gmail connections remain on connection-scoped direct HTTP', () => {
  const harness = makeHarness({
    flag: 'enabled', session: { connectionId: 'external_connection' }, provider: 'google_oauth',
  });
  const result = harness.sandbox.gmailOwnerAdvancedReadRequest_('/messages?maxResults=10', { method: 'get' });
  assert.equal(result.handled, false);
  assert.equal(harness.propertyReads(), 0);
  assert.deepEqual(harness.calls, []);
});

test('mutations and unsupported reads never enter Advanced Gmail', () => {
  const harness = makeHarness({ flag: 'enabled' });
  assert.equal(harness.sandbox.gmailOwnerAdvancedReadRequest_('/messages/msg_123/modify', { method: 'post' }).handled, false);
  assert.equal(harness.sandbox.gmailOwnerAdvancedReadRequest_('/labels', { method: 'get' }).handled, false);
  assert.deepEqual(harness.calls, []);
});

test('history reads preserve the opaque startHistoryId and repeated history types', () => {
  const harness = makeHarness({ flag: 'enabled' });
  const result = harness.sandbox.gmailOwnerAdvancedReadRequest_(
    '/history?startHistoryId=9007199254740993&historyTypes=messageAdded&historyTypes=labelAdded&maxResults=100',
    { method: 'get' }
  );
  assert.equal(result.handled, true);
  assert.deepEqual(harness.calls, [{
    method: 'history.list', userId: 'me',
    params: { startHistoryId: '9007199254740993', historyTypes: ['messageAdded', 'labelAdded'], maxResults: 100 },
  }]);
});

test('the adapter is disabled by default', () => {
  const harness = makeHarness();
  const result = harness.sandbox.gmailOwnerAdvancedReadRequest_('/messages?maxResults=10', { method: 'get' });
  assert.equal(result.handled, false);
  assert.equal(harness.propertyReads(), 1);
  assert.deepEqual(harness.calls, []);
});

test('Advanced Gmail errors propagate without hidden direct-HTTP fallback', () => {
  const harness = makeHarness({ flag: 'enabled', advancedError: true });
  assert.throws(
    () => harness.sandbox.gmailOwnerAdvancedReadRequest_('/messages?maxResults=10', { method: 'get' }),
    /advanced failure/
  );
  assert.equal(harness.calls.length, 1);
});

test('gmailApiRequest checks the adapter before selecting any bearer token', () => {
  const requestStart = SOURCE.indexOf('function gmailApiRequest_(path, options)');
  const adapterCall = SOURCE.indexOf('gmailOwnerAdvancedReadRequest_(path, opts)', requestStart);
  const tokenSelection = SOURCE.indexOf('const oauthToken = mailboxCurrentSessionContext_', requestStart);
  assert.ok(requestStart >= 0 && adapterCall > requestStart && adapterCall < tokenSelection);
  const directTransport = SOURCE.slice(tokenSelection, SOURCE.indexOf('const request =', tokenSelection));
  assert.match(directTransport, /mailboxMultiGmailAccessToken_\(mailboxCurrentSessionContext_\)/);
  assert.match(directTransport, /ScriptApp\.getOAuthToken\(\)/);
});
