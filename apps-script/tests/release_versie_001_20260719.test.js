const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const crypto = require('node:crypto');

const root = path.resolve(__dirname, '..');
const helper = fs.readFileSync(path.join(root, 'tools', 'release_apps_script_versie_001_20260719.ps1'), 'utf8');
const v56Helper = fs.readFileSync(path.join(root, 'tools', 'release_apps_script_versie_001_20260721_v56.ps1'), 'utf8');
const currentHelper = fs.readFileSync(path.join(root, 'tools', 'release_apps_script_versie_001_20260721_v57.ps1'), 'utf8');
const v58Helper = fs.readFileSync(path.join(root, 'tools', 'release_apps_script_versie_001_20260722_v58.ps1'), 'utf8');
const v59Helper = fs.readFileSync(path.join(root, 'tools', 'release_apps_script_versie_001_20260722_v59.ps1'), 'utf8');
const v56StagingBridge = fs.readFileSync(path.join(root, '..', 'versie-001-staging-acceptance-20260721-v56.html'), 'utf8');
const stagingBridge = fs.readFileSync(path.join(root, '..', 'versie-001-staging-acceptance-20260721-v57.html'), 'utf8');
const menuUpdater = fs.readFileSync(path.join(root, '..', 'tools', 'update_bot_menu_versie_001.py'), 'utf8');
const code = fs.readFileSync(path.join(root, 'Code.gs'), 'utf8');
const expectedV57 = {
  Code: '5c6097544cfbc78fc118d851b17fe746f0cde230489d97fb3bab7f3c1fecd1a5',
  MultiAccount: '8d07e8b9f0f524ed5cedccbb8bfecbb547c93a34eda8ef876e40776d6b470f10',
  MailClient: 'ce29a007aa90a4ac367fc0ba930f1ef8ef5dc6fadd1f31ff3201a0d72182ed95',
  MailApp: 'c190067de229100cb4bc0cf14855e5ab6e0d503d037db14f7d782030ee482c0b',
  appsscript: '354ad159bcd81637d9abf7711cfc675b192ac373317744cf90376f7b14f4edc9',
};
const expectedV58 = {
  Code: '0bc1391729c19c7a21f5eb5311b44ab8d1bcad2f4b8955cbe21df6717a270a7d',
  MultiAccount: '8d07e8b9f0f524ed5cedccbb8bfecbb547c93a34eda8ef876e40776d6b470f10',
  MailClient: 'a04b56d4955ba72d46a7fedb7e48b837cd0737da87a6c720281472aa724c5a06',
  MailApp: '81562d1bed335aeb1954c09e8e57b96e315b2db3353c16fa1579645ec0d78c4d',
  appsscript: '354ad159bcd81637d9abf7711cfc675b192ac373317744cf90376f7b14f4edc9',
};
const expectedV59 = {
  Code: 'f1476e3e707348737022611c080176a6b8ec69ff088bd8e7c92657328278f5a1',
  MultiAccount: '8d07e8b9f0f524ed5cedccbb8bfecbb547c93a34eda8ef876e40776d6b470f10',
  MailClient: 'a04b56d4955ba72d46a7fedb7e48b837cd0737da87a6c720281472aa724c5a06',
  MailApp: 'de9bc2b1d7893fd995a4043f945054c8d07a4999bc92074c171ab680a8cc57c7',
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
  assert.match(v56Helper, /\$RollbackVersion = 55/);
  assert.match(v56Helper, /\$LegacyStagingVersion = 54/);
  assert.match(v56Helper, /\$CandidateVersion = 56/);
  assert.match(v56Helper, /Versie 1 \(2026-07-21\): isolate timer overlap and URLFetch quota/);
  assert.match(v56Helper, /\$ExpectedRollbackHashes = @\{[\s\S]*Code='7216a34067309cfb98db25deccddd1b4d759f8923d66851209165351b7c512cd'/);
  assert.match(v56Helper, /\$ExpectedLegacyStagingHashes = @\{[\s\S]*MultiAccount='80eaa3e6b47832ade00788375b4825f12e3d0384de9515041543b1c1fa7576dc'/);
  assert.match(v56Helper, /versie-001-20260721-v56-release\.json/);
  assert.match(v56Helper, /TarasevychGmailNotifierVersie00120260721V56Release/);
  assert.match(v56Helper, /Rollback to verified Telegram Gmail Versie 1 Apps Script v55/);
});

test('v57 helper preserves v56 staging history and exact v55 rollback', () => {
  assert.match(currentHelper, /\$RollbackVersion = 55/);
  assert.match(currentHelper, /\$LegacyStagingVersion = 56/);
  assert.match(currentHelper, /\$CandidateVersion = 57/);
  assert.match(currentHelper, /Versie 1 \(2026-07-21\): preserve connection-scoped Gmail metadata identity/);
  assert.match(currentHelper, /\$ExpectedLegacyStagingHashes = @\{[\s\S]*Code='34515ca570d1d869ca096eb837e8523bdb8f889259b2272b0d1a79d914245a53'[\s\S]*MailClient='f3ddbe75dfdae6a4f36a07f1c9eddd9ac556c21069efcffebb89a339680988c7'/);
  assert.match(currentHelper, /\$ExpectedCandidateHashes = @\{[\s\S]*Code='5c6097544cfbc78fc118d851b17fe746f0cde230489d97fb3bab7f3c1fecd1a5'[\s\S]*MailClient='ce29a007aa90a4ac367fc0ba930f1ef8ef5dc6fadd1f31ff3201a0d72182ed95'/);
  assert.match(currentHelper, /versie-001-20260721-v57-release\.json/);
  assert.match(currentHelper, /TarasevychGmailNotifierVersie00120260721V57Release/);
  assert.match(currentHelper, /Rollback to verified Telegram Gmail Versie 1 Apps Script v55/);
});

test('immutable v56 staging launcher remains exact historical evidence', () => {
  assert.match(v56StagingBridge, /AKfycby76_MRDK8YJyPdI5gl_leGCmDJSJRlUoGZPA6FSgjlMm9ltvfhZo2e-ascD06wXl1m/);
  assert.match(v56StagingBridge, /staging v56/);
});

test('historical v57 staging launcher stays immutable after the active menu advances', () => {
  assert.doesNotMatch(menuUpdater, /versie-001-staging-acceptance-20260721-v57\.html/);
  assert.match(stagingBridge, /AKfycbxrSlQT6NKQooVkyKZE4LaDVO7lHUUChE2ih2Q7oprHHoUHY0YKLEkhT8Ojcon2qr7h/);
  assert.match(stagingBridge, /form\.method\s*=\s*'post'/);
  assert.match(stagingBridge, /addField\('init_data',\s*tg\.initData\)/);
  assert.match(stagingBridge, /noindex,nofollow,noarchive/);
  assert.doesNotMatch(stagingBridge, /(?:refresh_token|client_secret|bot_token)\s*[:=]/i);
});

test('Versie 1 v57 keeps v56 safety and adds connection-scoped metadata identity', () => {
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
  assert.match(code, /GMAIL_NOTIFICATION_RUNTIME_CANDIDATE_ = 'v59'/);
  assert.match(code, /mailboxMultiGmailAccessToken_\(mailboxCurrentSessionContext_\)/);
  assert.match(code, /claimGmailTimerWorkerLease_\(\)/);
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

test('historical v58 helper retains the immutable v58 source pins', () => {
  for (const value of Object.values(expectedV58)) assert.match(v58Helper, new RegExp(value));
});

test('Versie 1 v59 helper retains its frozen historical source hashes', () => {
  for (const value of Object.values(expectedV59)) assert.match(v59Helper, new RegExp(value));
});
