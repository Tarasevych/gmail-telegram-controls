const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const root = path.resolve(__dirname, '..');
const helperPath = path.join(root, 'tools', 'release_apps_script_versie_001_20260722_v61.ps1');
const helper = fs.readFileSync(helperPath, 'utf8');
const expectedCandidate = {
  Code: 'f1476e3e707348737022611c080176a6b8ec69ff088bd8e7c92657328278f5a1',
  MultiAccount: '8d07e8b9f0f524ed5cedccbb8bfecbb547c93a34eda8ef876e40776d6b470f10',
  MailClient: 'a04b56d4955ba72d46a7fedb7e48b837cd0737da87a6c720281472aa724c5a06',
  MailApp: '4d8bde40bd7f63c9be982f076f860e79e2edff170b13909bef49582f7caab020',
  appsscript: '354ad159bcd81637d9abf7711cfc675b192ac373317744cf90376f7b14f4edc9',
};
const expectedRollback = {
  Code: '5c6097544cfbc78fc118d851b17fe746f0cde230489d97fb3bab7f3c1fecd1a5',
  MultiAccount: '8d07e8b9f0f524ed5cedccbb8bfecbb547c93a34eda8ef876e40776d6b470f10',
  MailClient: 'ce29a007aa90a4ac367fc0ba930f1ef8ef5dc6fadd1f31ff3201a0d72182ed95',
  MailApp: 'c190067de229100cb4bc0cf14855e5ab6e0d503d037db14f7d782030ee482c0b',
  appsscript: '354ad159bcd81637d9abf7711cfc675b192ac373317744cf90376f7b14f4edc9',
};
const expectedLegacy = {
  Code: 'f1476e3e707348737022611c080176a6b8ec69ff088bd8e7c92657328278f5a1',
  MultiAccount: '8d07e8b9f0f524ed5cedccbb8bfecbb547c93a34eda8ef876e40776d6b470f10',
  MailClient: 'a04b56d4955ba72d46a7fedb7e48b837cd0737da87a6c720281472aa724c5a06',
  MailApp: '4fbd5f2a2b731833c2087fd4fc8a263268a8f9329d2f3f0b0483f9a67e81b677',
  appsscript: '354ad159bcd81637d9abf7711cfc675b192ac373317744cf90376f7b14f4edc9',
};
const extensions = {Code: 'gs', MultiAccount: 'gs', MailClient: 'gs', MailApp: 'html', appsscript: 'json'};

function normalizedFileHash(name) {
  const source = fs.readFileSync(path.join(root, name + '.' + extensions[name]), 'utf8').replace(/\r\n?/g, '\n');
  return crypto.createHash('sha256').update(source, 'utf8').digest('hex');
}

test('v61 helper pins exact v57 rollback, v60 history, and current source', () => {
  assert.match(helper, /\$SourceMainSha\s*=\s*'14fe3ddc66500f98d57e32d0a3c2fab99813cd8e'/);
  assert.match(helper, /\$RollbackVersion\s*=\s*57\b/);
  assert.match(helper, /\$LegacyStagingVersion\s*=\s*60\b/);
  assert.match(helper, /\$CandidateVersion\s*=\s*61\b/);
  for (const [name, hash] of Object.entries(expectedRollback)) {
    assert.ok(helper.includes(hash), 'missing immutable v57 rollback hash for ' + name);
  }
  for (const [name, hash] of Object.entries(expectedLegacy)) {
    assert.ok(helper.includes(hash), 'missing immutable v60 historical hash for ' + name);
  }
  for (const [name, hash] of Object.entries(expectedCandidate)) {
    assert.ok(helper.includes(hash), 'missing v61 candidate hash for ' + name);
    assert.equal(normalizedFileHash(name), hash);
  }
});

test('v61 helper fails closed against replay, parallel staging, and stale promotion', () => {
  for (const mode of ['PreflightOnly', 'StageOnly', 'Promote', 'CleanupStaging', 'Rollback']) {
    assert.ok(helper.includes(mode), 'missing release mode ' + mode);
  }
  assert.match(helper, /Future immutable version exists after v\$CandidateVersion/);
  assert.match(helper, /Unresolved versions\.create; refusing automatic replay/);
  assert.match(helper, /Multiple guarded staging deployments exist/);
  assert.match(helper, /Promotion requires exact immutable candidate, one staging deployment, and staging_verified journal/);
  assert.match(helper, /sourceMainSha=\$SourceMainSha/);
});