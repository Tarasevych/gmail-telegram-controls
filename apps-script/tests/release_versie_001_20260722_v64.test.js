const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const root = path.resolve(__dirname, '..');
const helperPath = path.join(root, 'tools', 'release_apps_script_versie_001_20260722_v64.ps1');
const helper = fs.readFileSync(helperPath, 'utf8');
const expectedCandidate = {
  Code: 'b9d38bba7bc13de401ab016f8cccde869a9bc933803fc98afb5a427bb2a6ec51',
  MultiAccount: '8d07e8b9f0f524ed5cedccbb8bfecbb547c93a34eda8ef876e40776d6b470f10',
  MailClient: 'a04b56d4955ba72d46a7fedb7e48b837cd0737da87a6c720281472aa724c5a06',
  MailApp: '014a6789885bbc93a1401c5359594925d1518ec5b323c8dfed9772d33c3cd080',
  appsscript: '354ad159bcd81637d9abf7711cfc675b192ac373317744cf90376f7b14f4edc9',
};
const expectedRollback = {
  Code: 'b9d38bba7bc13de401ab016f8cccde869a9bc933803fc98afb5a427bb2a6ec51',
  MultiAccount: '8d07e8b9f0f524ed5cedccbb8bfecbb547c93a34eda8ef876e40776d6b470f10',
  MailClient: 'a04b56d4955ba72d46a7fedb7e48b837cd0737da87a6c720281472aa724c5a06',
  MailApp: '4e6902935d4e6e5b56245f10d6a6bb94897e46728175f4c8daefad663bf47487',
  appsscript: '354ad159bcd81637d9abf7711cfc675b192ac373317744cf90376f7b14f4edc9',
};
const expectedLegacy = {
  Code: 'b9d38bba7bc13de401ab016f8cccde869a9bc933803fc98afb5a427bb2a6ec51',
  MultiAccount: '8d07e8b9f0f524ed5cedccbb8bfecbb547c93a34eda8ef876e40776d6b470f10',
  MailClient: 'a04b56d4955ba72d46a7fedb7e48b837cd0737da87a6c720281472aa724c5a06',
  MailApp: '4e6902935d4e6e5b56245f10d6a6bb94897e46728175f4c8daefad663bf47487',
  appsscript: '354ad159bcd81637d9abf7711cfc675b192ac373317744cf90376f7b14f4edc9',
};
const extensions = {Code: 'gs', MultiAccount: 'gs', MailClient: 'gs', MailApp: 'html', appsscript: 'json'};

function normalizedFileHash(name) {
  const source = fs.readFileSync(path.join(root, name + '.' + extensions[name]), 'utf8').replace(/\r\n?/g, '\n');
  return crypto.createHash('sha256').update(source, 'utf8').digest('hex');
}
test('v64 helper pins exact v63 rollback, v63 history, and frozen v64 source', () => {
  assert.match(helper, /\$SourceMainSha\s*=\s*'da8b2768323db8fd8c1ba886b556bbfd2148d6de'/);
  assert.match(helper, /\$RollbackVersion\s*=\s*63\b/);
  assert.match(helper, /\$LegacyStagingVersion\s*=\s*63\b/);
  assert.match(helper, /\$CandidateVersion\s*=\s*64\b/);
  assert.match(helper, /\$LegacyStagingDescription\s*=\s*'Telegram Gmail Versie 1 \(2026-07-22\) prevent minute worker overlap'/);
  for (const [name, hash] of Object.entries(expectedRollback)) {
    assert.ok(helper.includes(hash), 'missing immutable v63 rollback hash for ' + name);
  }
  for (const [name, hash] of Object.entries(expectedLegacy)) {
    assert.ok(helper.includes(hash), 'missing immutable v63 historical hash for ' + name);
  }
  for (const [name, hash] of Object.entries(expectedCandidate)) {
    assert.ok(helper.includes(hash), 'missing v64 candidate hash for ' + name);
  }
  assert.notEqual(normalizedFileHash('MailApp'), expectedCandidate.MailApp,
    'mutable source must be allowed to advance without rewriting immutable v64');
  const currentMailApp = fs.readFileSync(path.join(root, 'MailApp.html'), 'utf8');
  assert.match(currentMailApp, /P0_CLIENT_RELEASE_VERSION = 65/);
  assert.match(currentMailApp, /production\.appsScriptImmutable/);
});

test('v64 helper is fail closed and reconciles deployment propagation without duplicate mutation', () => {
  for (const mode of ['PreflightOnly', 'StageOnly', 'Promote', 'CleanupStaging', 'Rollback']) {
    assert.ok(helper.includes(mode), 'missing release mode ' + mode);
  }
  assert.match(helper, /Future immutable version exists after v\$CandidateVersion/);
  assert.match(helper, /Unresolved versions\.create; refusing automatic replay/);
  assert.match(helper, /Multiple guarded staging deployments exist/);
  assert.match(helper, /Promotion requires exact immutable candidate, one staging deployment, and staging_verified journal/);
  assert.match(helper, /function Wait-DeploymentVersion[\s\S]*\$maxAttempts = 5[\s\S]*Start-Sleep -Seconds 1/);
  assert.match(helper, /Wait-DeploymentVersion \$stableUri \$CandidateVersion @\(\$RollbackVersion\)/);
  assert.match(helper, /Wait-DeploymentVersion \$stableUri \$RollbackVersion @\(\$CandidateVersion\)/);
  const promote = helper.slice(helper.indexOf('  if ($Promote) {'), helper.indexOf('  if ($CleanupStaging) {'));
  assert.equal((promote.match(/Invoke-GoogleJson PUT \$stableUri/g) || []).length, 1);
  assert.match(helper, /sourceMainSha=\$SourceMainSha/);
});
