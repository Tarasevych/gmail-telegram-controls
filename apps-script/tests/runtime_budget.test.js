const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const source = fs.readFileSync(path.join(__dirname, '..', 'Code.gs'), 'utf8');

test('minute worker claims a non-blocking timer slot before realtime work', () => {
  const workerStart = source.indexOf('function checkNewMail_()');
  const claim = source.indexOf("claimGmailTimerSlot_('worker', GMAIL_TIMER_WORKER_SLOT_MS_)", workerStart);
  const realtime = source.indexOf("runRealtimeMailChecks_('timer', 5)", workerStart);

  assert.notEqual(workerStart, -1);
  assert.ok(claim > workerStart);
  assert.ok(realtime > claim);
});

test('timer slot claim uses a short ScriptLock and content-free Script Properties', () => {
  const helperStart = source.indexOf('function claimGmailTimerSlot_(');
  const helperEnd = source.indexOf('\n/** Timer entry point. */', helperStart);
  const helper = source.slice(helperStart, helperEnd);

  assert.match(helper, /getScriptLock\(\)/);
  assert.match(helper, /tryLock\(250\)/);
  assert.match(helper, /getScriptProperties\(\)/);
  assert.doesNotMatch(helper, /getUserLock\(\)/);
});

test('expensive Gmail History maintenance is guarded by a fifteen-minute slot', () => {
  const workerStart = source.indexOf('function checkNewMail_()');
  const guard = source.indexOf("claimGmailTimerSlot_('history_sync', GMAIL_HISTORY_SYNC_SLOT_MS_)", workerStart);
  const history = source.indexOf('syncTelegramMailCardsFromAllGmailHistory_(', workerStart);

  assert.ok(guard > workerStart);
  assert.ok(history > guard);
  assert.match(source, /var GMAIL_HISTORY_SYNC_SLOT_MS_ = 15 \* 60 \* 1000;/);
});

test('URLFetch daily quota has a distinct runtime error code', () => {
  const classifierStart = source.indexOf('function gmailRuntimeFailureCode_(');
  const quotaCode = source.indexOf("return 'urlfetch_quota';", classifierStart);
  const storageCode = source.indexOf("return 'storage_capacity';", classifierStart);

  assert.notEqual(classifierStart, -1);
  assert.ok(quotaCode > classifierStart);
  assert.ok(storageCode > quotaCode);
});
