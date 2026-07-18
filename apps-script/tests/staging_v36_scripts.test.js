'use strict';

const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const test = require('node:test');

const root = path.resolve(__dirname, '..');
const stagePath = path.join(root, 'tools', 'stage_apps_script_v36.ps1');
const stage = fs.readFileSync(stagePath, 'utf8').replace(/\r\n?/g, '\n');
const FILES = Object.freeze({
  Code: 'Code.gs', MultiAccount: 'MultiAccount.gs', MailClient: 'MailClient.gs',
  MailApp: 'MailApp.html', appsscript: 'appsscript.json',
});
const V36 = Object.freeze({
  Code: 'a767e717d17a1d50a3ecd373078bef59782f8fa7293d0b61787dae0aeac70b3e',
  MultiAccount: '524cd5f5e7e57ff2313036da77afc3a57bd03d397e56232e32c2cbf34debaf13',
  MailClient: 'b777e9b13fcf2a46472cfa0c9da0530ef91ae11f7bef28237c8468d116f68884',
  MailApp: '29b5c7883706be9cc77625367dfb8ca3aa99e58c635f47fba048be633ebded70',
  appsscript: '354ad159bcd81637d9abf7711cfc675b192ac373317744cf90376f7b14f4edc9',
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

test('v36 staging helper pins the exact local candidate and immutable v29 baseline', () => {
  assert.deepEqual(hashTable(stage, 'ExpectedCandidateHashes'), V36);
  assert.match(stage, /\$ExpectedStableVersion = 29\b/);
  assert.match(stage, /candidate_v36/);
  assert.match(stage, /prior_candidate_v36/);
  assert.match(stage, /stable_v29/);
  assert.match(stage, /Local\\TarasevychGmailNotifierAppsScriptV36Staging/);
});

test('v36 staging helper can mutate HEAD only and cannot create or update a deployment', () => {
  assert.match(stage, /if \(\$PreflightOnly -and \$Method -ne 'GET'\)/);
  assert.match(stage, /\[ValidateSet\('GET', 'PUT'\)\]/);
  assert.doesNotMatch(stage, /Invoke-GoogleJson POST|\/versions"\s*@\{|deploymentConfig\s*=\s*@\{/);
  assert.doesNotMatch(stage, /Invoke-GoogleJson PUT \$stableUri/);
  assert.equal(stage.split('Invoke-GoogleJson PUT "$BaseUri/content" $Body').length - 1, 1);
  assert.match(stage, /stableDeploymentUnchanged = \$true/);
  const command = `$e=$null;$t=$null;[System.Management.Automation.Language.Parser]::ParseFile('${stagePath.replace(/'/g, "''")}',[ref]$t,[ref]$e)|Out-Null;if($e.Count){$e|% Message;exit 1}`;
  const parsed = spawnSync('pwsh', ['-NoProfile', '-Command', command], { encoding: 'utf8' });
  assert.equal(parsed.status, 0, parsed.stdout + parsed.stderr);
  assert.doesNotMatch(stage, /(?:ya29\.|1\\\/\\\/)[A-Za-z0-9._-]{20,}|\b\d{8,12}:AA[A-Za-z0-9_-]{30,}\b/);
  assert.doesNotMatch(stage, /client_secret\s*=\s*'[^']+'/i);
});
