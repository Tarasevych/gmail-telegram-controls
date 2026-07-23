const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const root = path.resolve(__dirname, '..');
const helperPath = path.join(root, 'tools', 'release_apps_script_versie_001_20260723_v65.ps1');
const helper = fs.readFileSync(helperPath, 'utf8');
const expectedCandidate = {
  Code: 'b9d38bba7bc13de401ab016f8cccde869a9bc933803fc98afb5a427bb2a6ec51',
  MultiAccount: '8d07e8b9f0f524ed5cedccbb8bfecbb547c93a34eda8ef876e40776d6b470f10',
  MailClient: 'a04b56d4955ba72d46a7fedb7e48b837cd0737da87a6c720281472aa724c5a06',
  MailApp: 'ff2c04e1fd4fa88a5da90e22b012c078e8fad7a31aa8ae447e57a6a8f5555565',
  appsscript: '354ad159bcd81637d9abf7711cfc675b192ac373317744cf90376f7b14f4edc9',
};
const expectedRollback = {
  Code: 'b9d38bba7bc13de401ab016f8cccde869a9bc933803fc98afb5a427bb2a6ec51',
  MultiAccount: '8d07e8b9f0f524ed5cedccbb8bfecbb547c93a34eda8ef876e40776d6b470f10',
  MailClient: 'a04b56d4955ba72d46a7fedb7e48b837cd0737da87a6c720281472aa724c5a06',
  MailApp: '014a6789885bbc93a1401c5359594925d1518ec5b323c8dfed9772d33c3cd080',
  appsscript: '354ad159bcd81637d9abf7711cfc675b192ac373317744cf90376f7b14f4edc9',
};
const extensions = {Code: 'gs', MultiAccount: 'gs', MailClient: 'gs', MailApp: 'html', appsscript: 'json'};

function normalizedFileHash(name) {
  const source = fs.readFileSync(path.join(root, name + '.' + extensions[name]), 'utf8').replace(/\r\n?/g, '\n');
  return crypto.createHash('sha256').update(source, 'utf8').digest('hex');
}

test('v65 helper pins exact v64 rollback and current merged source', () => {
  assert.match(helper, /\$SourceMainSha\s*=\s*'3373ca4aa403a28f3252ad72fbe65310b318c53c'/);
  assert.match(helper, /\$RollbackVersion\s*=\s*64\b/);
  assert.match(helper, /\$LegacyStagingVersion\s*=\s*64\b/);
  assert.match(helper, /\$CandidateVersion\s*=\s*65\b/);
  assert.match(helper, /\$LegacyStagingDescription\s*=\s*'Telegram Gmail Versie 1 \(2026-07-22\) expose full active Gmail address'/);
  for (const [name, hash] of Object.entries(expectedRollback)) {
    assert.ok(helper.includes(hash), 'missing immutable v64 rollback/history hash for ' + name);
  }
  for (const [name, hash] of Object.entries(expectedCandidate)) {
    assert.ok(helper.includes(hash), 'missing v65 candidate hash for ' + name);
    assert.equal(normalizedFileHash(name), hash);
  }
  const mailApp = fs.readFileSync(path.join(root, 'MailApp.html'), 'utf8');
  assert.match(mailApp, /P0_CLIENT_RELEASE_VERSION = 65/);
  assert.match(mailApp, /production\.appsScriptImmutable/);
});

test('v65 helper is fail closed and preserves at-most-once release mutations', () => {
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
  assert.match(helper, /for \(\$attempt = 0; \$attempt -lt 5 -and \$staging\.Count -ne 1; \$attempt\+\+\)/);
  assert.match(helper, /if \(\$attempt -gt 0\) \{ Start-Sleep -Seconds 1 \}/);
  const promote = helper.slice(helper.indexOf('  if ($Promote) {'), helper.indexOf('  if ($CleanupStaging) {'));
  assert.equal((promote.match(/Invoke-GoogleJson PUT \$stableUri/g) || []).length, 1);
  assert.match(helper, /sourceMainSha=\$SourceMainSha/);
});
