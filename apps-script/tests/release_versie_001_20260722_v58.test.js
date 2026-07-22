const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const root = path.resolve(__dirname, '..');
const helperPath = path.join(root, 'tools', 'release_apps_script_versie_001_20260722_v58.ps1');
const helper = fs.readFileSync(helperPath, 'utf8');
const expectedCandidate = {
  "Code": "0bc1391729c19c7a21f5eb5311b44ab8d1bcad2f4b8955cbe21df6717a270a7d",
  "MultiAccount": "8d07e8b9f0f524ed5cedccbb8bfecbb547c93a34eda8ef876e40776d6b470f10",
  "MailClient": "a04b56d4955ba72d46a7fedb7e48b837cd0737da87a6c720281472aa724c5a06",
  "MailApp": "81562d1bed335aeb1954c09e8e57b96e315b2db3353c16fa1579645ec0d78c4d",
  "appsscript": "354ad159bcd81637d9abf7711cfc675b192ac373317744cf90376f7b14f4edc9"
};
const expectedRollback = {
  "Code": "5c6097544cfbc78fc118d851b17fe746f0cde230489d97fb3bab7f3c1fecd1a5",
  "MultiAccount": "8d07e8b9f0f524ed5cedccbb8bfecbb547c93a34eda8ef876e40776d6b470f10",
  "MailClient": "ce29a007aa90a4ac367fc0ba930f1ef8ef5dc6fadd1f31ff3201a0d72182ed95",
  "MailApp": "c190067de229100cb4bc0cf14855e5ab6e0d503d037db14f7d782030ee482c0b",
  "appsscript": "354ad159bcd81637d9abf7711cfc675b192ac373317744cf90376f7b14f4edc9"
};
test('historical v58 helper keeps exact immutable v57 rollback and v58 pins', () => {
  assert.match(helper, /\$RollbackVersion\s*=\s*57\b/);
  assert.match(helper, /\$CandidateVersion\s*=\s*58\b/);
  assert.match(helper, /\$LegacyStagingVersion\s*=\s*56\b/);
  assert.match(helper, /\$ExpectedRollbackHashes = \$ExpectedCandidateHashes\.Clone\(\)/);
  assert.match(helper, /\$ExpectedRollbackHeadDriftHashes = \$ExpectedCandidateHashes\.Clone\(\)/);
  for (const [name, hash] of Object.entries(expectedRollback)) {
    assert.ok(helper.includes(hash), 'missing immutable v57 rollback hash for ' + name);
  }
  for (const [name, hash] of Object.entries(expectedCandidate)) {
    assert.ok(helper.includes(hash), 'missing v58 candidate hash for ' + name);
  }
});

test('v58 helper preserves guarded staging, promotion, cleanup, and rollback modes', () => {
  for (const mode of ['PreflightOnly', 'StageOnly', 'Promote', 'CleanupStaging', 'Rollback']) {
    assert.ok(helper.includes(mode), 'missing release mode ' + mode);
  }
  assert.ok(helper.includes('staging_verified'));
  assert.ok(helper.includes('Get-NormalizedHash'));
  assert.ok(helper.includes('Rollback to verified Telegram Gmail Versie 1 Apps Script v57'));
});
