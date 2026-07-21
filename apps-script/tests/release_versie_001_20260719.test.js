const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const crypto = require('node:crypto');

const root = path.resolve(__dirname, '..');
const helper = fs.readFileSync(path.join(root, 'tools', 'release_apps_script_versie_001_20260719.ps1'), 'utf8');
const candidateHelper = fs.readFileSync(path.join(root, 'tools', 'release_apps_script_versie_001_20260721_v56.ps1'), 'utf8');
const stagingBridge = fs.readFileSync(path.join(root, '..', 'versie-001-staging-acceptance-20260721-v56.html'), 'utf8');
const menuUpdater = fs.readFileSync(path.join(root, '..', 'tools', 'update_bot_menu_versie_001.py'), 'utf8');
const code = fs.readFileSync(path.join(root, 'Code.gs'), 'utf8');
const expected = {
  Code: '34515ca570d1d869ca096eb837e8523bdb8f889259b2272b0d1a79d914245a53',
  MultiAccount: '8d07e8b9f0f524ed5cedccbb8bfecbb547c93a34eda8ef876e40776d6b470f10',
  MailClient: 'f3ddbe75dfdae6a4f36a07f1c9eddd9ac556c21069efcffebb89a339680988c7',
  MailApp: 'c190067de229100cb4bc0cf14855e5ab6e0d503d037db14f7d782030ee482c0b',
  appsscript: '354ad159bcd81637d9abf7711cfc675b192ac373317744cf90376f7b14f4edc9',
};
function hash(name, extension) {
  const source = fs.readFileSync(path.join(root, `${name}.${extension}`), 'utf8').replace(/\r\n?/g, '\n');
  return crypto.createHash('sha256').update(source, 'utf8').digest('hex');
}

test('Versie 1 helper pins stable v50 rollback and immutable v55 Sent-copy candidate', () => {
  assert.match(helper, /\$RollbackVersion = 50/);
  assert.match(helper, /\$LegacyStagingVersion = 54/);
  assert.match(helper, /\$CandidateVersion = 55/);
  assert.match(helper, /Versie 1 \(2026-07-20\): exclude Gmail Sent copies from incoming notifications/);
  assert.match(helper, /Telegram Gmail Versie 1 \(2026-07-20\) exclude Gmail Sent copies from incoming notifications/);
  assert.match(helper, /Telegram Gmail Versie 1 \(2026-07-20\) staging-only exact Spam trace maintenance/);
  assert.match(helper, /\$ExpectedRollbackHashes = @\{[\s\S]*Code='1cf96a95ef65d0a59e71ddd171377439bfba59de142a9455b09477b6cde6ba24'/);
  assert.match(helper, /\$ExpectedLegacyStagingHashes = @\{[\s\S]*Code='274d293e6d99421206e55737f46dbb57e333ec22eb3729dba32e9e8d49ea2755'/);
  assert.match(helper, /\$ExpectedRollbackHeadDriftHashes = @\{[\s\S]*Code='1cf96a95ef65d0a59e71ddd171377439bfba59de142a9455b09477b6cde6ba24'/);
  assert.match(helper, /stable_v\$\{RollbackVersion\}_whitespace_drift/);
  assert.match(helper, /Rollback to verified Telegram Gmail Versie 1 Apps Script v50/);
  assert.match(helper, /versie-001-20260720-v55-release\.json/);
  assert.match(helper, /TarasevychGmailNotifierVersie00120260720V55Release/);
  assert.match(helper, /Invoke-GoogleJson DELETE .*legacyStaging/);
});

test('current Versie 1 helper pins immutable v55 rollback and v56 runtime-budget candidate', () => {
  assert.match(candidateHelper, /\$RollbackVersion = 55/);
  assert.match(candidateHelper, /\$LegacyStagingVersion = 54/);
  assert.match(candidateHelper, /\$CandidateVersion = 56/);
  assert.match(candidateHelper, /Versie 1 \(2026-07-21\): isolate timer overlap and URLFetch quota/);
  assert.match(candidateHelper, /\$ExpectedRollbackHashes = @\{[\s\S]*Code='7216a34067309cfb98db25deccddd1b4d759f8923d66851209165351b7c512cd'/);
  assert.match(candidateHelper, /\$ExpectedLegacyStagingHashes = @\{[\s\S]*MultiAccount='80eaa3e6b47832ade00788375b4825f12e3d0384de9515041543b1c1fa7576dc'/);
  assert.match(candidateHelper, /versie-001-20260721-v56-release\.json/);
  assert.match(candidateHelper, /TarasevychGmailNotifierVersie00120260721V56Release/);
  assert.match(candidateHelper, /Rollback to verified Telegram Gmail Versie 1 Apps Script v55/);
});

test('v56 staging launcher is isolated from the production Web App menu', () => {
  assert.match(menuUpdater, /versie-001-staging-acceptance-20260721-v56\.html/);
  assert.match(stagingBridge, /AKfycby76_MRDK8YJyPdI5gl_leGCmDJSJRlUoGZPA6FSgjlMm9ltvfhZo2e-ascD06wXl1m/);
  assert.match(stagingBridge, /form\.method\s*=\s*'post'/);
  assert.match(stagingBridge, /addField\('init_data',\s*tg\.initData\)/);
  assert.match(stagingBridge, /noindex,nofollow,noarchive/);
  assert.doesNotMatch(stagingBridge, /(?:refresh_token|client_secret|bot_token)\s*[:=]/i);
});

test('Versie 1 v56 keeps v55 safety and adds bounded timer maintenance', () => {
  assert.match(code, /function runSafeLegacyMailCheck_\(source\)/);
  assert.match(code, /recordGmailRuntimeFailure_\('legacy_scan', error\)/);
  assert.match(code, /runSafeLegacyMailCheck_\('manual'\)/);
  assert.match(code, /var failureStage = 'gmail_get'/);
  assert.match(code, /failureStage = 'telegram_notify'/);
  assert.match(code, /action === 'runtime_status'/);
  assert.match(code, /constantTimeEqual_\(expected, supplied\)/);
  assert.match(code, /lastFailureFingerprint/);
  assert.match(code, /lastMailFailureFingerprint/);
  assert.match(code, /function serveGmailRuntimeProbe_\(e\)/);
  assert.match(code, /runRealtimeMailChecks_\('probe', 5\)/);
  assert.match(code, /postedParams\.action \|\| ''\) === 'runtime_probe'/);
  assert.match(code, /function compactTelegramMailCardIndexLocked_\(props\)/);
  assert.match(code, /if \(!props\.getProperty\(propertyKey\)\)/);
  assert.match(code, /GMAIL_NOTIFICATION_RUNTIME_CANDIDATE_ = 'v56'/);
  assert.match(code, /claimGmailTimerSlot_\('worker', GMAIL_TIMER_WORKER_SLOT_MS_\)/);
  assert.match(code, /claimGmailTimerSlot_\('history_sync', GMAIL_HISTORY_SYNC_SLOT_MS_\)/);
  assert.match(code, /function gmailRealtimeLaneSnapshots_\(propsValue, includeAccounts\)/);
  assert.match(code, /lanes: gmailRealtimeLaneSnapshots_\(props, false\)/);
  assert.match(code, /declared === 'REAUTH_REQUIRED'/);
  assert.match(code, /lastScanSeenSkipped/);
  assert.match(code, /lastScanWindowSkipped/);
  assert.match(code, /lastScanEligible/);
  assert.match(code, /function gmailRuntimeTraceCurrentMailbox_\(traceToken\)/);
  assert.match(code, /requested: Boolean\(traceToken\)/);
  assert.doesNotMatch(code, /traceToken:\s*traceToken/);
  assert.match(code, /function gmailNotificationLabelsEligible_\(labelIds, notificationMode\)/);
  assert.match(code, /!labels\.SENT/);
  assert.doesNotMatch(code, /gmailRuntimeMoveCurrentTraceSpamToInbox_/);
  assert.doesNotMatch(code, /gmailRuntimeTraceSpamToInbox_/);
  assert.doesNotMatch(code, /trace_action/);
  assert.doesNotMatch(code, /spam_to_inbox/);
  assert.match(code, /function gmailRealtimeClaimLease_\(rootProps, stateKey, nowValue\)/);
  assert.match(code, /gmailRealtimeCommitLease_\(rootProps, stateKey, state, lease\.token\)/);
  assert.match(code, /function telegramRetentionErrorCode_\(error\)/);
  assert.match(code, /lastErrorFingerprint: String\(retention\.lastErrorFingerprint \|\| ''\)/);
  assert.match(code, /retentionCode === 'telegram_delete_too_old'/);
  assert.match(code, /detachedTooOld \+= 1/);
  assert.doesNotMatch(code, /lastFailureMessage/);
});

test('Versie 1 candidate hashes match the current source bundle', () => {
  assert.equal(hash('Code', 'gs'), expected.Code);
  assert.equal(hash('MultiAccount', 'gs'), expected.MultiAccount);
  assert.equal(hash('MailClient', 'gs'), expected.MailClient);
  assert.equal(hash('MailApp', 'html'), expected.MailApp);
  assert.equal(hash('appsscript', 'json'), expected.appsscript);
  for (const value of Object.values(expected)) assert.match(candidateHelper, new RegExp(value));
});
