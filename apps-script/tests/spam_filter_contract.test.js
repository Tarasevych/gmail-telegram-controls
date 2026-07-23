'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const CODE_PATH = path.join(__dirname, '..', 'Code.gs');
const CODE_SOURCE = fs.readFileSync(CODE_PATH, 'utf8');

function extractFunction(name) {
  const marker = `function ${name}(`;
  const start = CODE_SOURCE.indexOf(marker);
  assert.notEqual(start, -1, `${name} must exist in Code.gs`);
  const next = CODE_SOURCE.indexOf('\nfunction ', start + marker.length);
  return CODE_SOURCE.slice(start, next === -1 ? CODE_SOURCE.length : next);
}

function extractFrozenObject(name) {
  const marker = `const ${name} = Object.freeze({`;
  const start = CODE_SOURCE.indexOf(marker);
  assert.notEqual(start, -1, `${name} must exist in Code.gs`);
  const end = CODE_SOURCE.indexOf('\n});', start);
  assert.notEqual(end, -1, `${name} must have a bounded frozen-object declaration`);
  return CODE_SOURCE.slice(start, end + 4);
}

function makeHarness() {
  const sandbox = {
    console,
    BOT_UI: { BROWSE_TEXT: 'Пошта' },
    TELEGRAM_MAIL_BROWSE_PAGE_SIZES: [10, 20, 30, 40, 50, 60, 70, 90, 100],
    CONFIG: {
      TELEGRAM_MAIL_BROWSE_VISIBLE_ROWS: 5,
      GMAIL_NOTIFICATION_PAGE_SIZE: 100,
    },
    gmailApi_: () => {
      throw new Error('Unexpected Gmail read');
    },
  };
  vm.createContext(sandbox);
  vm.runInContext([
    extractFrozenObject('TELEGRAM_MAIL_BROWSE_PERIODS'),
    extractFrozenObject('TELEGRAM_MAIL_BROWSE_FOLDERS'),
    extractFunction('telegramMailBrowseInputError_'),
    extractFunction('telegramMailBrowseDefaultFilters_'),
    extractFunction('telegramMailBrowseSafePhrase_'),
    extractFunction('parseTelegramMailBrowseCommand_'),
    extractFunction('telegramMailBrowsePageToken_'),
    extractFunction('telegramMailBrowseQuery_'),
    extractFunction('loadTelegramMailBrowsePage_'),
    extractFunction('listGmailNotificationPage_'),
    extractFunction('gmailNotificationLabelsEligible_'),
  ].join('\n\n'), sandbox);
  return sandbox;
}

test('explicit Spam browse uses the exact system label, paginates, and stays read-only', () => {
  const context = makeHarness();
  const calls = [];
  context.gmailApi_ = requestPath => {
    calls.push(requestPath);
    const url = new URL(`https://gmail.invalid${requestPath}`);
    if (url.searchParams.get('pageToken') === 'spam_page_2') {
      return {
        messages: [{ id: 'spam_message_003' }],
        nextPageToken: '',
        resultSizeEstimate: 3,
      };
    }
    return {
      messages: [
        { id: 'spam_message_001' },
        { id: 'spam_message_002' },
      ],
      nextPageToken: 'spam_page_2',
      resultSizeEstimate: 3,
    };
  };

  const parsed = context.parseTelegramMailBrowseCommand_('/mail folder:spam period:all size:20');
  assert.equal(parsed.filters.folder, 'spam');
  assert.equal(parsed.pageSize, 20);

  const state = {
    pageSize: parsed.pageSize,
    filters: parsed.filters,
    ids: [],
    offset: 0,
    nextPageToken: '',
    pageToken: '',
    previousPageTokens: [],
  };
  context.loadTelegramMailBrowsePage_(state, '');
  assert.deepEqual(Array.from(state.ids), ['spam_message_001', 'spam_message_002']);
  assert.equal(state.nextPageToken, 'spam_page_2');

  const first = new URL(`https://gmail.invalid${calls[0]}`);
  assert.equal(first.pathname, '/messages');
  assert.equal(first.searchParams.get('includeSpamTrash'), 'true');
  assert.deepEqual(first.searchParams.getAll('labelIds'), ['SPAM']);
  assert.equal(first.searchParams.has('q'), false);

  context.loadTelegramMailBrowsePage_(state, state.nextPageToken);
  const second = new URL(`https://gmail.invalid${calls[1]}`);
  assert.equal(second.searchParams.get('pageToken'), 'spam_page_2');
  assert.deepEqual(second.searchParams.getAll('labelIds'), ['SPAM']);
  assert.deepEqual(Array.from(state.ids), ['spam_message_003']);

  assert.equal(
    calls.some(value => /\/(?:modify|trash|untrash|send)(?:\?|\/|$)/i.test(value)),
    false,
    'an explicit Spam list must not mutate Gmail'
  );
});

test('proactive notification scan remains a separate current-INBOX policy', () => {
  const context = makeHarness();
  const calls = [];
  context.gmailApi_ = requestPath => {
    calls.push(requestPath);
    return {
      messages: [
        { id: 'timeslice_inbox_001' },
        { id: 'timeslice_spam_001' },
      ],
      nextPageToken: '',
    };
  };

  const page = context.listGmailNotificationPage_({
    lowerBoundMs: 1000,
    upperBoundMs: 5000,
    pageToken: '',
  });
  assert.deepEqual(Array.from(page.ids), ['timeslice_inbox_001', 'timeslice_spam_001']);

  const scan = new URL(`https://gmail.invalid${calls[0]}`);
  assert.equal(scan.pathname, '/messages');
  assert.equal(scan.searchParams.get('includeSpamTrash'), 'true');
  assert.deepEqual(scan.searchParams.getAll('labelIds'), []);
  assert.match(scan.searchParams.get('q'), /^after:\d+ before:\d+$/);

  assert.equal(context.gmailNotificationLabelsEligible_(['SPAM'], 'all'), false);
  assert.equal(context.gmailNotificationLabelsEligible_(['INBOX', 'SPAM'], 'all'), false);
  assert.equal(context.gmailNotificationLabelsEligible_(['INBOX', 'TRASH'], 'all'), false);
  assert.equal(context.gmailNotificationLabelsEligible_(['INBOX'], 'all'), true);
  assert.equal(context.gmailNotificationLabelsEligible_(['INBOX'], 'important'), false);
  assert.equal(context.gmailNotificationLabelsEligible_(['INBOX', 'IMPORTANT'], 'important'), true);

  const proactiveSource = extractFunction('runMailCheck_');
  assert.match(proactiveSource, /gmailNotificationLabelsEligible_/);
  assert.doesNotMatch(proactiveSource, /TELEGRAM_MAIL_BROWSE_FOLDERS|filters\.folder/);
  assert.notEqual(
    extractFunction('loadTelegramMailBrowsePage_'),
    extractFunction('listGmailNotificationPage_'),
    'explicit browse and proactive scan must remain separate code paths'
  );
});
