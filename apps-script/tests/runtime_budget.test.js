const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '..', 'Code.gs'), 'utf8');

test('minute worker claims a tokenized lease before realtime work and releases it in finally', () => {
  const workerStart = source.indexOf('function checkNewMail_()');
  const claim = source.indexOf('claimGmailTimerWorkerLease_()', workerStart);
  const realtime = source.indexOf("runRealtimeMailChecks_('timer', 5)", workerStart);
  const finallyBlock = source.indexOf('finally {', realtime);
  const release = source.indexOf('finishGmailTimerWorkerLease_(', finallyBlock);

  assert.notEqual(workerStart, -1);
  assert.ok(claim > workerStart);
  assert.ok(realtime > claim);
  assert.ok(finallyBlock > realtime);
  assert.ok(release > finallyBlock);
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

function createWorkerLeaseHarness() {
  const helperStart = source.indexOf('function gmailTimerWorkerPropertyKey_(');
  const helperEnd = source.indexOf('\n/** Timer entry point. */', helperStart);
  assert.ok(helperStart >= 0 && helperEnd > helperStart);
  let now = 1000;
  const store = {};
  const properties = {
    getProperty: key => store[key] ?? null,
    setProperty: (key, value) => { store[key] = String(value); },
    deleteProperty: key => { delete store[key]; },
  };
  const context = {
    Date: { now: () => now },
    LockService: { getScriptLock: () => ({ tryLock: () => true, releaseLock: () => {} }) },
    PropertiesService: { getScriptProperties: () => properties },
    console: { log: () => {}, error: () => {} },
    GMAIL_TIMER_SLOT_PROPERTY_PREFIX_: 'gmail_timer_slot_v1_',
    GMAIL_TIMER_WORKER_SLOT_MS_: 150 * 1000,
    GMAIL_TIMER_WORKER_LEASE_MS_: 7 * 60 * 1000,
    GMAIL_TIMER_WORKER_TELEMETRY_KEY_: 'GMAIL_TIMER_WORKER_TELEMETRY_V1',
    GMAIL_URLFETCH_QUOTA_CIRCUIT_KEY_: 'GMAIL_URLFETCH_QUOTA_CIRCUIT_V1',
    GMAIL_URLFETCH_QUOTA_PROBE_MS_: 15 * 60 * 1000,
    gmailRuntimeFailureCode_: error => /urlfetch|service invoked too many times for one day/i
      .test(String(error && error.message || error || '')) ? 'urlfetch_quota' : 'runtime_error',
  };
  vm.runInNewContext(source.slice(helperStart, helperEnd), context);
  return { context, store, setNow: value => { now = value; } };
}

test('URLFetch quota circuit is content-free and permits one bounded probe after expiry', () => {
  const harness = createWorkerLeaseHarness();
  assert.equal(harness.context.gmailUrlFetchQuotaCircuitActive_(), false);
  assert.equal(harness.context.gmailUrlFetchQuotaCircuitTrip_(
    new Error('Service invoked too many times for one day: urlfetch.')
  ), true);
  assert.equal(harness.context.gmailUrlFetchQuotaCircuitActive_(), true);

  const record = JSON.parse(harness.store.GMAIL_URLFETCH_QUOTA_CIRCUIT_V1);
  assert.deepEqual(Object.keys(record).sort(), ['u', 'v']);
  assert.equal(record.v, 1);
  assert.equal(record.u, 1000 + 15 * 60 * 1000);
  assert.doesNotMatch(JSON.stringify(record), /email|message|thread|token|initData|account/i);

  harness.setNow(record.u + 1);
  assert.equal(harness.context.gmailUrlFetchQuotaCircuitActive_(), false);
  assert.equal(harness.store.GMAIL_URLFETCH_QUOTA_CIRCUIT_V1, undefined);
});

test('open URLFetch quota circuit skips the complete timer pipeline and releases its lease', () => {
  const workerStart = source.indexOf('function checkNewMail_()');
  const workerEnd = source.indexOf('\nvar GMAIL_NOTIFICATION_REALTIME_STATE_PREFIX_', workerStart);
  const workerSource = source.slice(workerStart, workerEnd);
  let realtimeCalls = 0;
  let finish = null;
  const context = {
    claimGmailTimerWorkerLease_: () => ({
      token: 'lease_token', startedAt: 1, deadlineAt: 150001, leaseUntil: 420001, stage: 'claimed',
    }),
    gmailUrlFetchQuotaCircuitActive_: () => true,
    gmailUrlFetchQuotaCircuitTrip_: () => true,
    gmailTimerWorkerStartStage_: () => true,
    gmailRuntimeFailureCode_: () => 'runtime_error',
    runRealtimeMailChecks_: () => { realtimeCalls += 1; },
    emptyMailCheckResult_: () => ({ delivered: 0 }),
    finishGmailTimerWorkerLease_: (lease, status, errorCode) => {
      finish = { stage: lease.stage, status, errorCode };
    },
    console: { error: () => {} },
  };
  vm.runInNewContext(workerSource, context);
  assert.deepEqual(context.checkNewMail_(), { delivered: 0 });
  assert.equal(realtimeCalls, 0);
  assert.deepEqual(finish, {
    stage: 'quota_circuit', status: 'quota_blocked', errorCode: 'urlfetch_quota',
  });
  assert.match(workerSource, /function runBestEffort\(/);
  assert.ok((workerSource.match(/runBestEffort\(/g) || []).length >= 10);
});

test('worker lease prevents re-entry after the 150-second target and releases after completion', () => {
  const harness = createWorkerLeaseHarness();
  const first = harness.context.claimGmailTimerWorkerLease_();
  assert.ok(first && first.token);

  harness.setNow(151001);
  assert.equal(harness.context.claimGmailTimerWorkerLease_(), null,
    'a still-running worker must remain exclusive after the soft budget expires');

  harness.setNow(215001);
  assert.equal(harness.context.finishGmailTimerWorkerLease_(first, 'completed', 'none'), true);
  assert.ok(harness.context.claimGmailTimerWorkerLease_(),
    'normal completion must release the crash lease before seven minutes');
});

test('crashed worker lease covers the official six-minute runtime plus one trigger interval', () => {
  const harness = createWorkerLeaseHarness();
  assert.ok(harness.context.claimGmailTimerWorkerLease_());
  harness.setNow(7 * 60 * 1000);
  assert.equal(harness.context.claimGmailTimerWorkerLease_(), null);
  harness.setNow(7 * 60 * 1000 + 1001);
  assert.ok(harness.context.claimGmailTimerWorkerLease_());
});

test('worker uses a 150-second soft deadline and content-free stage telemetry', () => {
  assert.match(source, /var GMAIL_TIMER_WORKER_SLOT_MS_ = 150 \* 1000;/);
  assert.match(source, /var GMAIL_TIMER_WORKER_LEASE_MS_ = 7 \* 60 \* 1000;/);
  for (const stage of [
    'realtime', 'telegram_maintenance', 'gmail_history',
    'retention_scheduling', 'legacy_recovery', 'multi_account',
  ]) {
    assert.match(source, new RegExp("startStage\\('" + stage + "'\\)"));
  }
  const telemetryStart = source.indexOf('function gmailTimerWorkerTelemetry_(');
  const telemetryEnd = source.indexOf('\nfunction claimGmailTimerWorkerLease_(', telemetryStart);
  const telemetry = source.slice(telemetryStart, telemetryEnd);
  assert.match(telemetry, /status:/);
  assert.match(telemetry, /stage:/);
  assert.match(telemetry, /durationMs:/);
  assert.match(telemetry, /errorCode:/);
  assert.doesNotMatch(telemetry, /email|messageId|threadId|initData|accessToken|refreshToken/i);
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
  assert.match(source, /var GMAIL_URLFETCH_QUOTA_PROBE_MS_ = 15 \* 60 \* 1000;/);
  assert.match(source, /gmailUrlFetchQuotaCircuitTrip_\(fetchError\)/);
  assert.match(source, /gmailUrlFetchQuotaCircuitTrip_\(transportError\)/);
});
