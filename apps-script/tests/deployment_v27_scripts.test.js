'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const test = require('node:test');
const { localSourceHashes, parseHashTable, parseInteger, APP_FILES } = require('./_release_test_helpers');

const root = path.resolve(__dirname, '..');
const deployPath = path.join(root, 'tools', 'deploy_apps_script_v27.ps1');
const deploy = fs.readFileSync(deployPath, 'utf8').replace(/\r\n?/g, '\n');
const FILES = APP_FILES;
const LOCAL_SOURCE_HASHES = localSourceHashes(root);

function hashTable(source, name) {
  const match = source.match(new RegExp(`\\$${name}\\s*=\\s*@\\{([\\s\\S]*?)\\n\\}`));
  assert.ok(match, `missing ${name}`);
  return Object.fromEntries([...match[1].matchAll(/^\s*(Code|MultiAccount|MailClient|MailApp|appsscript)\s*=\s*'([a-f0-9]{64})'\s*$/gm)]
    .map(row => [row[1], row[2]]));
}

function occurrences(source, needle) {
  return source.split(needle).length - 1;
}

test('v27 helper pins immutable v26 rollback and exact five-file v27 candidate', () => {
  const oldVersion = parseInteger(deploy, 'ExpectedOldVersion');
  const newVersion = parseInteger(deploy, 'ExpectedNewVersion');
  const expectedOld = parseHashTable(deploy, 'ExpectedOldHashes');
  const expectedNew = parseHashTable(deploy, 'ExpectedCandidateHashes');

  assert.equal(oldVersion + 1, newVersion);
  assert.deepEqual(hashTable(deploy, 'ExpectedOldHashes'), expectedOld);
  assert.deepEqual(hashTable(deploy, 'ExpectedCandidateHashes'), expectedNew);
  assert.deepEqual(Object.fromEntries(Object.entries(FILES).map(([name, file]) => [name, LOCAL_SOURCE_HASHES[name] || ''])), expectedNew);
  assert.deepEqual(expectedOld, parseHashTable(deploy, 'ExpectedOldHashes'));
  assert.equal(oldVersion, 26);
  assert.equal(newVersion, 27);
  assert.match(deploy, /candidate_v27/);
  assert.match(deploy, /resume_existing_v27/);
  assert.match(deploy, /Local\\TarasevychGmailNotifierAppsScriptV27Release/);
});

test('v27 helper retains fail-closed release guards and parses cleanly', () => {
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
