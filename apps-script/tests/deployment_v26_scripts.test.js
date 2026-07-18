'use strict';

const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const test = require('node:test');

const root = path.resolve(__dirname, '..');
const deployPath = path.join(root, 'tools', 'deploy_apps_script_v26.ps1');
const migratePath = path.join(root, 'tools', 'migrate_apps_script_head_v26.ps1');
const deploy = fs.readFileSync(deployPath, 'utf8').replace(/\r\n?/g, '\n');
const migrate = fs.readFileSync(migratePath, 'utf8').replace(/\r\n?/g, '\n');

const V25 = Object.freeze({
  Code: '23bcff69c2b937534b49a26a65a25badead9102fbd93fb7bd00e8236c5ef84fd',
  MailClient: 'deebcc32d4af2c5b9b4a6a26a3fbfd4a42df1212253b9a51d71be953990f6d8b',
  MailApp: 'a1277e6fd8030bb0f63023f3df25cd549e55e879f01d31680dbe3c5d915a512a',
  appsscript: '354ad159bcd81637d9abf7711cfc675b192ac373317744cf90376f7b14f4edc9',
});
const V26 = Object.freeze({
  Code: '5a643e1c434689d416a1cbc372d596a484316afcfa52a1f758d0671c9306d144',
  MultiAccount: 'ed910c8fedf07b5f9e1361bbae343062ee5677fcae2f68c0d2700fbc1d6f41df',
  MailClient: '065e0dfdc04023067168d28605b79f5bc12bdae9fb91769c618036f46050975b',
  MailApp: 'a7aa10a4d008003afbb7aa494cb416a5b5b5f73d5d65b82163d94830937e72fb',
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

test('v26 release helper pins exact v25 rollback and five-file v26 candidate', () => {
  assert.match(deploy, /\$ExpectedOldVersion = 25\b/);
  assert.match(deploy, /\$ExpectedNewVersion = 26\b/);
  assert.deepEqual(hashTable(deploy, 'ExpectedOldHashes'), V25);
  assert.deepEqual(hashTable(deploy, 'ExpectedCandidateHashes'), V26);
  // v26 is immutable release evidence. Later release worktrees intentionally
  // contain newer local sources, so only the helper's pinned payload is checked.
  assert.match(deploy, /name = 'MultiAccount'; type = 'SERVER_JS'; source = \[IO\.File\]::ReadAllText\(\(Join-Path \$ProjectRoot 'MultiAccount\.gs'\)\)/);
  assert.match(deploy, /\$wanted = @\(\$Expected\.Keys \| Sort-Object\)/);
  assert.match(deploy, /old_v25/);
  assert.match(deploy, /candidate_v26/);
  assert.match(deploy, /resume_existing_v26/);
});

test('v26 release helper retains fail-closed mutation and future-version guards', () => {
  assert.match(deploy, /if \(\$PreflightOnly -and \$Method -ne 'GET'\)/);
  assert.equal(occurrences(deploy, 'Invoke-GoogleJson POST "$base/versions"'), 1);
  assert.equal(occurrences(deploy, 'Invoke-GoogleJson PUT "$BaseUri/content" $Body'), 1);
  assert.equal(occurrences(deploy, 'Invoke-GoogleJson PUT $stableUri @{'), 1);
  assert.match(deploy, /Where-Object \{ \$_ -gt \$ExpectedNewVersion \}/);
  assert.match(deploy, /Refusing all v\$ExpectedNewVersion release mutations/);
  assert.match(deploy, /Local\\TarasevychGmailNotifierAppsScriptV26Release/);
  assert.doesNotMatch(deploy, /\$Expected(?:Old|New)Version\s*=\s*27\b|candidate_v27|resume_existing_v27/);
});

test('v26 migration restores only exact immutable v26 and never creates or deploys a version', () => {
  assert.match(migrate, /\$ExpectedVersion = 26\b/);
  assert.deepEqual(hashTable(migrate, 'ExpectedHashes'), V26);
  assert.match(migrate, /Get-VerifiedImmutableV26/);
  assert.match(migrate, /clean_v26/);
  assert.match(migrate, /Local\\TarasevychGmailNotifierAppsScriptV26Release/);
  assert.equal(occurrences(migrate, 'Invoke-GoogleJson POST "$base/versions"'), 0);
  assert.doesNotMatch(migrate, /Invoke-GoogleJson\s+PUT\s+\$stableUri|Invoke-GoogleJson\s+POST\s+[^\n]*\/deployments/);
  assert.match(migrate, /Where-Object \{ \$_ -gt \$ExpectedVersion \}/);
});

test('v26 PowerShell helpers parse cleanly and contain no embedded OAuth or Telegram secret', () => {
  for (const file of [deployPath, migratePath]) {
    const command = `$e=$null;$t=$null;[System.Management.Automation.Language.Parser]::ParseFile('${file.replace(/'/g, "''")}',[ref]$t,[ref]$e)|Out-Null;if($e.Count){$e|% Message;exit 1}`;
    const parsed = spawnSync('pwsh', ['-NoProfile', '-Command', command], { encoding: 'utf8' });
    assert.equal(parsed.status, 0, parsed.stdout + parsed.stderr);
  }
  const joined = deploy + '\n' + migrate;
  assert.doesNotMatch(joined, /(?:ya29\.|1\/\/)[A-Za-z0-9._-]{20,}|\b\d{8,12}:AA[A-Za-z0-9_-]{30,}\b/);
  assert.doesNotMatch(joined, /client_secret\s*=\s*'[^']+'/i);
});
