'use strict';

const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const test = require('node:test');

const root = path.resolve(__dirname, '..');
const deployPath = path.join(root, 'tools', 'deploy_apps_script_v28.ps1');
const deploy = fs.readFileSync(deployPath, 'utf8').replace(/\r\n?/g, '\n');

const V27 = Object.freeze({
  Code: 'a767e717d17a1d50a3ecd373078bef59782f8fa7293d0b61787dae0aeac70b3e',
  MultiAccount: '524cd5f5e7e57ff2313036da77afc3a57bd03d397e56232e32c2cbf34debaf13',
  MailClient: 'b777e9b13fcf2a46472cfa0c9da0530ef91ae11f7bef28237c8468d116f68884',
  MailApp: '29b5c7883706be9cc77625367dfb8ca3aa99e58c635f47fba048be633ebded70',
  appsscript: '354ad159bcd81637d9abf7711cfc675b192ac373317744cf90376f7b14f4edc9',
});
const V28 = Object.freeze({
  Code: 'a767e717d17a1d50a3ecd373078bef59782f8fa7293d0b61787dae0aeac70b3e',
  MultiAccount: '524cd5f5e7e57ff2313036da77afc3a57bd03d397e56232e32c2cbf34debaf13',
  MailClient: 'b777e9b13fcf2a46472cfa0c9da0530ef91ae11f7bef28237c8468d116f68884',
  MailApp: '29b5c7883706be9cc77625367dfb8ca3aa99e58c635f47fba048be633ebded70',
  appsscript: '354ad159bcd81637d9abf7711cfc675b192ac373317744cf90376f7b14f4edc9',
});
const FILES = Object.freeze({
  Code: 'Code.gs', MultiAccount: 'MultiAccount.gs', MailClient: 'MailClient.gs',
  MailApp: 'MailApp.html', appsscript: 'appsscript.json',
});

function normalizedHash(file) {
  const value = fs.readFileSync(path.join(root, file), 'utf8').replace(/\r\n?/g, '\n');
  return crypto.createHash('sha256').update(value).digest('hex');
}

function hashTable(source, name) {
  const match = source.match(new RegExp(`\\$${name}\\s*=\\s*@\\{([\\s\\S]*?)\\n\\}`));
  assert.ok(match, `missing ${name}`);
  return Object.fromEntries([...match[1].matchAll(/^\s*(Code|MultiAccount|MailClient|MailApp|appsscript)\s*=\s*'([a-f0-9]{64})'\s*$/gm)]
    .map(row => [row[1], row[2]]));
}

function occurrences(source, needle) {
  return source.split(needle).length - 1;
}

test('v28 helper pins immutable v27 rollback and exact five-file v28 candidate', () => {
  assert.match(deploy, /\$ExpectedOldVersion = 27\b/);
  assert.match(deploy, /\$ExpectedNewVersion = 28\b/);
  assert.deepEqual(hashTable(deploy, 'ExpectedOldHashes'), V27);
  assert.deepEqual(hashTable(deploy, 'ExpectedCandidateHashes'), V28);
  assert.deepEqual(Object.fromEntries(Object.entries(FILES).map(([name, file]) => [name, normalizedHash(file)])), V28);
  assert.match(deploy, /candidate_v28/);
  assert.match(deploy, /resume_existing_v28/);
  assert.match(deploy, /Local\\TarasevychGmailNotifierAppsScriptV28Release/);
});

test('v28 helper retains fail-closed release guards and parses cleanly', () => {
  assert.match(deploy, /if \(\$PreflightOnly -and \$Method -ne 'GET'\)/);
  assert.equal(occurrences(deploy, 'Invoke-GoogleJson POST "$base/versions"'), 1);
  assert.equal(occurrences(deploy, 'Invoke-GoogleJson PUT "$BaseUri/content" $Body'), 1);
  assert.equal(occurrences(deploy, 'Invoke-GoogleJson PUT $stableUri @{'), 1);
  assert.match(deploy, /Where-Object \{ \$_ -gt \$ExpectedNewVersion \}/);
  assert.match(deploy, /Refusing all v\$ExpectedNewVersion release mutations/);
  const command = `$e=$null;$t=$null;[System.Management.Automation.Language.Parser]::ParseFile('${deployPath.replace(/'/g, "''")}',[ref]$t,[ref]$e)|Out-Null;if($e.Count){$e|% Message;exit 1}`;
  const parsed = spawnSync('pwsh', ['-NoProfile', '-Command', command], { encoding: 'utf8' });
  assert.equal(parsed.status, 0, parsed.stdout + parsed.stderr);
  assert.doesNotMatch(deploy, /(?:ya29\.|1\/\/)[A-Za-z0-9._-]{20,}|\b\d{8,12}:AA[A-Za-z0-9_-]{30,}\b/);
  assert.doesNotMatch(deploy, /client_secret\s*=\s*'[^']+'/i);
});
