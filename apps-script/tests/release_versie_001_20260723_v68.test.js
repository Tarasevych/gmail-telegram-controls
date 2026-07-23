const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const root = path.resolve(__dirname, '..');
const helperPath = path.join(root, 'tools', 'release_apps_script_versie_001_20260723_v68.ps1');
const helper = fs.readFileSync(helperPath, 'utf8');
const v67Helper = fs.readFileSync(
  path.join(root, 'tools', 'release_apps_script_versie_001_20260723_v67.ps1'),
  'utf8',
);
const expectedCandidate = {
  Code: '12aa579e7659f6e0bdc8407d8f7fffb9bce00fc9d439662beced08bb6908f7b1',
  MultiAccount: '8d07e8b9f0f524ed5cedccbb8bfecbb547c93a34eda8ef876e40776d6b470f10',
  MailClient: 'd6fef1ee4a3fa53d0439815c72376b7fcd00afe55ea389041ca20036aefc49e7',
  MailApp: 'c7f39deb2cc32e8c5be84b482d374aaa03764dd7a78ecc99f4459df53d83e06c',
  appsscript: '354ad159bcd81637d9abf7711cfc675b192ac373317744cf90376f7b14f4edc9',
};
const expectedV67 = {
  Code: '12aa579e7659f6e0bdc8407d8f7fffb9bce00fc9d439662beced08bb6908f7b1',
  MultiAccount: '8d07e8b9f0f524ed5cedccbb8bfecbb547c93a34eda8ef876e40776d6b470f10',
  MailClient: 'a04b56d4955ba72d46a7fedb7e48b837cd0737da87a6c720281472aa724c5a06',
  MailApp: '42a4d185ba013e2b3567ba8c0cfa01d194d990c9470172a7248cbf7badeb9178',
  appsscript: '354ad159bcd81637d9abf7711cfc675b192ac373317744cf90376f7b14f4edc9',
};
const expectedRollback = {
  Code: 'b9d38bba7bc13de401ab016f8cccde869a9bc933803fc98afb5a427bb2a6ec51',
  MultiAccount: '8d07e8b9f0f524ed5cedccbb8bfecbb547c93a34eda8ef876e40776d6b470f10',
  MailClient: 'a04b56d4955ba72d46a7fedb7e48b837cd0737da87a6c720281472aa724c5a06',
  MailApp: 'ff2c04e1fd4fa88a5da90e22b012c078e8fad7a31aa8ae447e57a6a8f5555565',
  appsscript: '354ad159bcd81637d9abf7711cfc675b192ac373317744cf90376f7b14f4edc9',
};
const extensions = {
  Code: 'gs',
  MultiAccount: 'gs',
  MailClient: 'gs',
  MailApp: 'html',
  appsscript: 'json',
};

function normalizedFileHash(name) {
  const source = fs.readFileSync(path.join(root, name + '.' + extensions[name]), 'utf8')
    .replace(/\r\n?/g, '\n');
  return crypto.createHash('sha256').update(source, 'utf8').digest('hex');
}

test('v68 helper pins merged V3 source, v65 rollback and immutable v67 history', () => {
  assert.match(helper, /\$SourceMainSha\s*=\s*'3f6b23b6ff1cf9d0e2b2eb512ba3416f201eb6d3'/);
  assert.match(helper, /\$RollbackVersion\s*=\s*65\b/);
  assert.match(helper, /\$LegacyStagingVersion\s*=\s*67\b/);
  assert.match(helper, /\$CandidateVersion\s*=\s*68\b/);
  assert.match(helper, /V3 cache-first owner-bound launch/);
  assert.match(helper, /P0 one-second single-flight launch/);
  for (const [name, hash] of Object.entries(expectedRollback)) {
    assert.ok(helper.includes(hash), 'missing immutable v65 rollback hash for ' + name);
  }
  for (const [name, hash] of Object.entries(expectedV67)) {
    assert.ok(helper.includes(hash), 'missing immutable v67 history hash for ' + name);
  }
  for (const [name, hash] of Object.entries(expectedCandidate)) {
    assert.ok(helper.includes(hash), 'missing v68 candidate hash for ' + name);
    assert.equal(normalizedFileHash(name), hash, 'merged source hash drift for ' + name);
  }
});

test('v67 history remains immutable while v68 owns the cumulative source', () => {
  assert.match(v67Helper, /\$CandidateVersion\s*=\s*67\b/);
  assert.match(v67Helper, /20260723-v67-release\.json/);
  assert.doesNotMatch(v67Helper, /\$CandidateVersion\s*=\s*68\b/);
  assert.match(helper, /\$CandidateVersion\s*=\s*68\b/);
  assert.doesNotMatch(helper, /\$CandidateVersion\s*=\s*69\b/);
});

test('v68 helper remains fail closed and at-most-once', () => {
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
  assert.match(helper, /Local\\TarasevychGmailNotifierVersie00120260723V68Release/);
  assert.match(helper, /20260723-v68-release\.json/);
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
