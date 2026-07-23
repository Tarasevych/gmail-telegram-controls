const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const root = path.resolve(__dirname, '..');
const helperPath = path.join(root, 'tools', 'release_apps_script_versie_001_20260723_v67.ps1');
const helper = fs.readFileSync(helperPath, 'utf8');
const expectedCandidate = {
  Code: '12aa579e7659f6e0bdc8407d8f7fffb9bce00fc9d439662beced08bb6908f7b1',
  MultiAccount: '8d07e8b9f0f524ed5cedccbb8bfecbb547c93a34eda8ef876e40776d6b470f10',
  MailClient: 'a04b56d4955ba72d46a7fedb7e48b837cd0737da87a6c720281472aa724c5a06',
  MailApp: '42a4d185ba013e2b3567ba8c0cfa01d194d990c9470172a7248cbf7badeb9178',
  appsscript: '354ad159bcd81637d9abf7711cfc675b192ac373317744cf90376f7b14f4edc9',
};
const expectedV66 = {
  Code: '12aa579e7659f6e0bdc8407d8f7fffb9bce00fc9d439662beced08bb6908f7b1',
  MultiAccount: '8d07e8b9f0f524ed5cedccbb8bfecbb547c93a34eda8ef876e40776d6b470f10',
  MailClient: 'a04b56d4955ba72d46a7fedb7e48b837cd0737da87a6c720281472aa724c5a06',
  MailApp: 'dca3b0a8f97d7ed3b4747043e9592b9c331f5f60611687d6e8ffda8823debb43',
  appsscript: '354ad159bcd81637d9abf7711cfc675b192ac373317744cf90376f7b14f4edc9',
};
const expectedRollback = {
  Code: 'b9d38bba7bc13de401ab016f8cccde869a9bc933803fc98afb5a427bb2a6ec51',
  MultiAccount: '8d07e8b9f0f524ed5cedccbb8bfecbb547c93a34eda8ef876e40776d6b470f10',
  MailClient: 'a04b56d4955ba72d46a7fedb7e48b837cd0737da87a6c720281472aa724c5a06',
  MailApp: 'ff2c04e1fd4fa88a5da90e22b012c078e8fad7a31aa8ae447e57a6a8f5555565',
  appsscript: '354ad159bcd81637d9abf7711cfc675b192ac373317744cf90376f7b14f4edc9',
};
const extensions = { Code: 'gs', MultiAccount: 'gs', MailClient: 'gs', MailApp: 'html', appsscript: 'json' };

function normalizedFileHash(name) {
  const source = fs.readFileSync(path.join(root, name + '.' + extensions[name]), 'utf8').replace(/\r\n?/g, '\n');
  return crypto.createHash('sha256').update(source, 'utf8').digest('hex');
}

test('v67 helper pins merged P0 source, v65 rollback and v66 history', () => {
  assert.match(helper, /\$SourceMainSha\s*=\s*'308fd6081ed6bbb56ae2dd6e423c1db17bb9e4d2'/);
  assert.match(helper, /\$RollbackVersion\s*=\s*65\b/);
  assert.match(helper, /\$LegacyStagingVersion\s*=\s*66\b/);
  assert.match(helper, /\$CandidateVersion\s*=\s*67\b/);
  assert.match(helper, /P0 one-second single-flight launch/);
  assert.match(helper, /restore SENT\+INBOX exactly-once delivery/);
  for (const [name, hash] of Object.entries(expectedRollback)) {
    assert.ok(helper.includes(hash), 'missing immutable v65 rollback hash for ' + name);
  }
  for (const [name, hash] of Object.entries(expectedV66)) {
    assert.ok(helper.includes(hash), 'missing immutable v66 history hash for ' + name);
  }
  for (const [name, hash] of Object.entries(expectedCandidate)) {
    assert.ok(helper.includes(hash), 'missing v67 candidate hash for ' + name);
    assert.equal(normalizedFileHash(name), hash, 'current source mismatch for ' + name);
  }
  assert.match(fs.readFileSync(path.join(root, 'MailApp.html'), 'utf8'), /Versie-1-v67-p0/);
});

test('v67 helper remains fail closed and at-most-once', () => {
  for (const mode of ['PreflightOnly', 'StageOnly', 'Promote', 'CleanupStaging', 'Rollback']) {
    assert.ok(helper.includes(mode), 'missing release mode ' + mode);
  }
  assert.match(helper, /Future immutable version exists after v\$CandidateVersion/);
  assert.match(helper, /Unresolved versions\.create; refusing automatic replay/);
  assert.match(helper, /Unresolved deployments\.create; refusing automatic replay/);
  assert.match(helper, /Multiple guarded staging deployments exist/);
  assert.match(helper, /Promotion requires exact immutable candidate, one staging deployment, and staging_verified journal/);
  assert.match(helper, /Local\\TarasevychGmailNotifierVersie00120260723V67Release/);
  assert.match(helper, /20260723-v67-release\.json/);
  const promote = helper.slice(helper.indexOf('  if ($Promote) {'), helper.indexOf('  if ($CleanupStaging) {'));
  assert.equal((promote.match(/Invoke-GoogleJson PUT \$stableUri/g) || []).length, 1);
});
