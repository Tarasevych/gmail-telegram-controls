const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const crypto = require('node:crypto');

const root = path.resolve(__dirname, '..');
const helper = fs.readFileSync(path.join(root, 'tools', 'release_apps_script_build_001_20260719.ps1'), 'utf8');
const expected = {
  Code: 'a026265c4972578c626f0bc1e565708ce5d049daf282d87d76556f1a49d3ac2d',
  MultiAccount: '15946e5c889c4d7d94c6aa9414c11c57ebbe430dd050764203a54d426cbfc506',
  MailClient: 'f3ddbe75dfdae6a4f36a07f1c9eddd9ac556c21069efcffebb89a339680988c7',
  MailApp: '50b735ba7c50cb25cbd86038193de8366af0933f8c27f1153fd13c775f7df6d0',
  appsscript: '354ad159bcd81637d9abf7711cfc675b192ac373317744cf90376f7b14f4edc9',
};
function hash(name, extension) {
  const source = fs.readFileSync(path.join(root, `${name}.${extension}`), 'utf8').replace(/\r\n?/g, '\n');
  return crypto.createHash('sha256').update(source, 'utf8').digest('hex');
}

test('Build 1 helper pins stable v37 rollback, legacy v38 staging, and immutable v39 candidate', () => {
  assert.match(helper, /\$RollbackVersion = 37/);
  assert.match(helper, /\$LegacyStagingVersion = 38/);
  assert.match(helper, /\$CandidateVersion = 39/);
  assert.match(helper, /Build 1 \(2026-07-19\): single delivery and OAuth callback relay/);
  assert.match(helper, /Telegram Gmail product v46 guarded staging/);
  assert.match(helper, /build-001-20260719-release\.json/);
  assert.match(helper, /TarasevychGmailNotifierBuild00120260719Release/);
  assert.match(helper, /Invoke-GoogleJson DELETE .*legacyStaging/);
});

test('Build 1 candidate hashes match the current source bundle', () => {
  assert.equal(hash('Code', 'gs'), expected.Code);
  assert.equal(hash('MultiAccount', 'gs'), expected.MultiAccount);
  assert.equal(hash('MailClient', 'gs'), expected.MailClient);
  assert.equal(hash('MailApp', 'html'), expected.MailApp);
  assert.equal(hash('appsscript', 'json'), expected.appsscript);
  for (const value of Object.values(expected)) assert.match(helper, new RegExp(value));
});
