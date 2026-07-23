const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const root = path.resolve(__dirname, '..');
const helperPath = path.join(root, 'tools', 'release_apps_script_versie_001_20260723_v70.ps1');
const helper = fs.readFileSync(helperPath, 'utf8');
const v69Helper = fs.readFileSync(
  path.join(root, 'tools', 'release_apps_script_versie_001_20260723_v69.ps1'),
  'utf8',
);
const expectedCandidate = {
  Code: '97455b1876a231232c17c1b394afffa30c8a8a67e943b114bef1a7f3a2c994be',
  MultiAccount: '8d07e8b9f0f524ed5cedccbb8bfecbb547c93a34eda8ef876e40776d6b470f10',
  MailClient: '7f1a046a2e605ca09d8624689389e24900f5baa54deed479cec2495a2d90fe56',
  MailApp: 'fd4af73c56dada029bc687606aec9d0602d2c0c545752bc72f43d1edfbe48303',
  appsscript: '354ad159bcd81637d9abf7711cfc675b192ac373317744cf90376f7b14f4edc9',
};
const expectedV69 = {
  Code: 'd9c11deb44536f3eba1c5cd3fb30da30403a520501023cfc298dd7b59b31de01',
  MultiAccount: '8d07e8b9f0f524ed5cedccbb8bfecbb547c93a34eda8ef876e40776d6b470f10',
  MailClient: '7f1a046a2e605ca09d8624689389e24900f5baa54deed479cec2495a2d90fe56',
  MailApp: '1a95c5acd47febe66a1cd46a5c67cb0db1bf30abad6edc38a8d50e2c15420831',
  appsscript: '354ad159bcd81637d9abf7711cfc675b192ac373317744cf90376f7b14f4edc9',
};
const expectedRollback = {
  Code: 'b9d38bba7bc13de401ab016f8cccde869a9bc933803fc98afb5a427bb2a6ec51',
  MultiAccount: '8d07e8b9f0f524ed5cedccbb8bfecbb547c93a34eda8ef876e40776d6b470f10',
  MailClient: 'a04b56d4955ba72d46a7fedb7e48b837cd0737da87a6c720281472aa724c5a06',
  MailApp: 'ff2c04e1fd4fa88a5da90e22b012c078e8fad7a31aa8ae447e57a6a8f5555565',
  appsscript: '354ad159bcd81637d9abf7711cfc675b192ac373317744cf90376f7b14f4edc9',
};

test('v70 helper pins P0 launch source, v65 rollback and immutable v69 history', () => {
  assert.match(helper, /\$SourceMainSha\s*=\s*'0666165b614f430103530728aa45349083db5e78'/);
  assert.match(helper, /\$RollbackVersion\s*=\s*65\b/);
  assert.match(helper, /\$LegacyStagingVersion\s*=\s*69\b/);
  assert.match(helper, /\$CandidateVersion\s*=\s*70\b/);
  assert.match(helper, /P0 ONE-SECOND session diagnostics/);
  assert.match(helper, /V3 persistent app session recovery/);
  for (const [name, hash] of Object.entries(expectedRollback)) assert.ok(helper.includes(hash), 'missing immutable v65 rollback hash for ' + name);
  for (const [name, hash] of Object.entries(expectedV69)) assert.ok(helper.includes(hash), 'missing immutable v69 history hash for ' + name);
  for (const [name, hash] of Object.entries(expectedCandidate)) assert.ok(helper.includes(hash), 'missing v70 candidate hash for ' + name);
});

test('v69 history remains immutable while v70 owns the cumulative source', () => {
  assert.match(v69Helper, /\$CandidateVersion\s*=\s*69\b/);
  assert.match(v69Helper, /20260723-v69-release\.json/);
  assert.doesNotMatch(v69Helper, /\$CandidateVersion\s*=\s*70\b/);
  assert.match(helper, /\$CandidateVersion\s*=\s*70\b/);
  assert.doesNotMatch(helper, /\$CandidateVersion\s*=\s*71\b/);
});

test('v70 helper remains fail closed and at-most-once', () => {
  for (const mode of [
    'PreflightOnly',
    'StageOnly',
    'Promote',
    'CleanupStaging',
    'AbandonStaging',
    'Rollback',
  ]) {
    assert.ok(helper.includes(mode), 'missing release mode ' + mode);
  }
  assert.match(helper, /Future immutable version exists after v\$CandidateVersion/);
  assert.match(helper, /Unresolved versions\.create; refusing automatic replay/);
  assert.match(helper, /Unresolved deployments\.create; refusing automatic replay/);
  assert.match(helper, /Multiple guarded staging deployments exist/);
  assert.match(helper, /Promotion requires exact immutable candidate, one staging deployment, and staging_verified journal/);
  assert.match(helper, /Local\\TarasevychGmailNotifierVersie00120260723V70Release/);
  assert.match(helper, /20260723-v70-release\.json/);
  const promote = helper.slice(helper.indexOf('  if ($Promote) {'), helper.indexOf('  if ($CleanupStaging) {'));
  assert.equal((promote.match(/Invoke-GoogleJson PUT \$stableUri/g) || []).length, 1);
  const abandon = helper.slice(
    helper.indexOf('  if ($AbandonStaging) {'),
    helper.indexOf('  if ($CleanupStaging) {'),
  );
  assert.match(abandon, /\$stableVersion -ne \$RollbackVersion/);
  assert.match(abandon, /\$staging\.Count -ne 1/);
  assert.match(abandon, /\$journal\.state -ne 'staging_verified'/);
  assert.match(abandon, /\$journalDeploymentId -ne \$guardedDeploymentId/);
  assert.match(abandon, /\$staging\[0\]\.deploymentConfig\.versionNumber -ne \$CandidateVersion/);
  assert.equal((abandon.match(/Invoke-GoogleJson DELETE/g) || []).length, 1);
});
