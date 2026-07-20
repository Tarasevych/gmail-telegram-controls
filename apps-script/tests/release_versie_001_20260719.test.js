const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const crypto = require('node:crypto');

const root = path.resolve(__dirname, '..');
const helper = fs.readFileSync(path.join(root, 'tools', 'release_apps_script_versie_001_20260719.ps1'), 'utf8');
const code = fs.readFileSync(path.join(root, 'Code.gs'), 'utf8');
const expected = {
  Code: '55042fcf036073673709720b121bf184506768de1d2356d0e4aff10a294d27b2',
  MultiAccount: '80eaa3e6b47832ade00788375b4825f12e3d0384de9515041543b1c1fa7576dc',
  MailClient: 'f3ddbe75dfdae6a4f36a07f1c9eddd9ac556c21069efcffebb89a339680988c7',
  MailApp: 'c190067de229100cb4bc0cf14855e5ab6e0d503d037db14f7d782030ee482c0b',
  appsscript: '354ad159bcd81637d9abf7711cfc675b192ac373317744cf90376f7b14f4edc9',
};
function hash(name, extension) {
  const source = fs.readFileSync(path.join(root, `${name}.${extension}`), 'utf8').replace(/\r\n?/g, '\n');
  return crypto.createHash('sha256').update(source, 'utf8').digest('hex');
}

test('Versie 1 helper pins stable v50 rollback and immutable v53 candidate', () => {
  assert.match(helper, /\$RollbackVersion = 50/);
  assert.match(helper, /\$LegacyStagingVersion = 52/);
  assert.match(helper, /\$CandidateVersion = 53/);
  assert.match(helper, /Versie 1 \(2026-07-20\): protected per-account Gmail trace/);
  assert.match(helper, /Telegram Gmail Versie 1 \(2026-07-20\) protected per-account Gmail trace staging/);
  assert.match(helper, /Telegram Gmail Versie 1 \(2026-07-20\) per-account Gmail scan telemetry staging/);
  assert.match(helper, /\$ExpectedRollbackHashes = @\{[\s\S]*Code='1cf96a95ef65d0a59e71ddd171377439bfba59de142a9455b09477b6cde6ba24'/);
  assert.match(helper, /\$ExpectedLegacyStagingHashes = @\{[\s\S]*Code='4a0f2beee5005a18ea31f420ed0463f73abbfe00c928cfa6c6db1224092907cb'/);
  assert.match(helper, /\$ExpectedRollbackHeadDriftHashes = @\{[\s\S]*Code='1cf96a95ef65d0a59e71ddd171377439bfba59de142a9455b09477b6cde6ba24'/);
  assert.match(helper, /stable_v\$\{RollbackVersion\}_whitespace_drift/);
  assert.match(helper, /Rollback to verified Telegram Gmail Versie 1 Apps Script v50/);
  assert.match(helper, /versie-001-20260720-v53-release\.json/);
  assert.match(helper, /TarasevychGmailNotifierVersie00120260720V53Release/);
  assert.match(helper, /Invoke-GoogleJson DELETE .*legacyStaging/);
});

test('Versie 1 v53 keeps retention safety and adds a protected content-free Gmail trace', () => {
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
  assert.match(code, /GMAIL_NOTIFICATION_RUNTIME_CANDIDATE_ = 'v53'/);
  assert.match(code, /function gmailRealtimeLaneSnapshots_\(propsValue, includeAccounts\)/);
  assert.match(code, /lanes: gmailRealtimeLaneSnapshots_\(props, false\)/);
  assert.match(code, /declared === 'REAUTH_REQUIRED'/);
  assert.match(code, /lastScanSeenSkipped/);
  assert.match(code, /lastScanWindowSkipped/);
  assert.match(code, /lastScanEligible/);
  assert.match(code, /function gmailRuntimeTraceCurrentMailbox_\(traceToken\)/);
  assert.match(code, /requested: Boolean\(traceToken\)/);
  assert.doesNotMatch(code, /traceToken:\s*traceToken/);
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
  for (const value of Object.values(expected)) assert.match(helper, new RegExp(value));
});
