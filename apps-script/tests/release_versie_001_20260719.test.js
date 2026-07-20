const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const crypto = require('node:crypto');

const root = path.resolve(__dirname, '..');
const helper = fs.readFileSync(path.join(root, 'tools', 'release_apps_script_versie_001_20260719.ps1'), 'utf8');
const expected = {
  Code: '9ff46675241b92c66a9f0c623f384b1aee59f2720384d993cf8d8fa58a447402',
  MultiAccount: '80eaa3e6b47832ade00788375b4825f12e3d0384de9515041543b1c1fa7576dc',
  MailClient: 'f3ddbe75dfdae6a4f36a07f1c9eddd9ac556c21069efcffebb89a339680988c7',
  MailApp: 'c190067de229100cb4bc0cf14855e5ab6e0d503d037db14f7d782030ee482c0b',
  appsscript: '354ad159bcd81637d9abf7711cfc675b192ac373317744cf90376f7b14f4edc9',
};
function hash(name, extension) {
  const source = fs.readFileSync(path.join(root, `${name}.${extension}`), 'utf8').replace(/\r\n?/g, '\n');
  return crypto.createHash('sha256').update(source, 'utf8').digest('hex');
}

test('Versie 1 helper pins stable v37 rollback, legacy v40 staging, and immutable v41 candidate', () => {
  assert.match(helper, /\$RollbackVersion = 37/);
  assert.match(helper, /\$LegacyStagingVersion = 40/);
  assert.match(helper, /\$CandidateVersion = 41/);
  assert.match(helper, /Versie 1 \(2026-07-20\): credentialless OAuth relay and account switching/);
  assert.match(helper, /Telegram Gmail Versie 1 \(2026-07-20\) guarded staging/);
  assert.match(helper, /versie-001-20260720-v41-release\.json/);
  assert.match(helper, /TarasevychGmailNotifierVersie00120260720V41Release/);
  assert.match(helper, /Invoke-GoogleJson DELETE .*legacyStaging/);
});

test('Versie 1 candidate hashes match the current source bundle', () => {
  assert.equal(hash('Code', 'gs'), expected.Code);
  assert.equal(hash('MultiAccount', 'gs'), expected.MultiAccount);
  assert.equal(hash('MailClient', 'gs'), expected.MailClient);
  assert.equal(hash('MailApp', 'html'), expected.MailApp);
  assert.equal(hash('appsscript', 'json'), expected.appsscript);
  for (const value of Object.values(expected)) assert.match(helper, new RegExp(value));
});
