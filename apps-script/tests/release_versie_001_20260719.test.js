const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const crypto = require('node:crypto');

const root = path.resolve(__dirname, '..');
const helper = fs.readFileSync(path.join(root, 'tools', 'release_apps_script_versie_001_20260719.ps1'), 'utf8');
const code = fs.readFileSync(path.join(root, 'Code.gs'), 'utf8');
const expected = {
  Code: 'c5d9275e69c0aa49a1460d03412bd2f78dd3a886d67fc0c98dc665cd629e1d48',
  MultiAccount: '80eaa3e6b47832ade00788375b4825f12e3d0384de9515041543b1c1fa7576dc',
  MailClient: 'f3ddbe75dfdae6a4f36a07f1c9eddd9ac556c21069efcffebb89a339680988c7',
  MailApp: 'c190067de229100cb4bc0cf14855e5ab6e0d503d037db14f7d782030ee482c0b',
  appsscript: '354ad159bcd81637d9abf7711cfc675b192ac373317744cf90376f7b14f4edc9',
};
function hash(name, extension) {
  const source = fs.readFileSync(path.join(root, `${name}.${extension}`), 'utf8').replace(/\r\n?/g, '\n');
  return crypto.createHash('sha256').update(source, 'utf8').digest('hex');
}

test('Versie 1 helper pins stable v42 rollback and immutable v49 candidate', () => {
  assert.match(helper, /\$RollbackVersion = 42/);
  assert.match(helper, /\$LegacyStagingVersion = 48/);
  assert.match(helper, /\$CandidateVersion = 49/);
  assert.match(helper, /Versie 1 \(2026-07-20\): retention failure diagnostics/);
  assert.match(helper, /Telegram Gmail Versie 1 \(2026-07-20\) retention failure diagnostics staging/);
  assert.match(helper, /Telegram Gmail Versie 1 \(2026-07-20\) independent realtime lane lease staging/);
  assert.match(helper, /\$ExpectedRollbackHashes = @\{[\s\S]*Code='a23e4052264aeb70de54786aafe953d8d6c4f38133f857307b07190ff79df8c9'/);
  assert.match(helper, /\$ExpectedLegacyStagingHashes = @\{[\s\S]*Code='d6232875d45ce25522c0a1c694700cb2c9fbf584c722673bf23fbb05c378c6a2'/);
  assert.match(helper, /\$ExpectedRollbackHeadDriftHashes = @\{[\s\S]*Code='4703fae2d71c1959451f67a4fea49e46d84cc8f3be798b9d67995f5bb31bb84e'/);
  assert.match(helper, /stable_v\$\{RollbackVersion\}_whitespace_drift/);
  assert.match(helper, /Rollback to verified Telegram Gmail Versie 1 Apps Script v42/);
  assert.match(helper, /versie-001-20260720-v49-release\.json/);
  assert.match(helper, /TarasevychGmailNotifierVersie00120260720V49Release/);
  assert.match(helper, /Invoke-GoogleJson DELETE .*legacyStaging/);
});

test('Versie 1 v49 isolates realtime and exposes sanitized retention failure evidence', () => {
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
  assert.match(code, /GMAIL_NOTIFICATION_RUNTIME_CANDIDATE_ = 'v49'/);
  assert.match(code, /function gmailRealtimeClaimLease_\(rootProps, stateKey, nowValue\)/);
  assert.match(code, /gmailRealtimeCommitLease_\(rootProps, stateKey, state, lease\.token\)/);
  assert.match(code, /function telegramRetentionErrorCode_\(error\)/);
  assert.match(code, /lastErrorFingerprint: String\(retention\.lastErrorFingerprint \|\| ''\)/);
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
