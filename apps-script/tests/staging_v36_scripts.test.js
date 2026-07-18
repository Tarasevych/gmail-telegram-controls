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
  Code: '9d11455cab5686b44827da830cf19e2c2acbf1070f66ffc13cb704a1cc40e7e7',
  MultiAccount: '524cd5f5e7e57ff2313036da77afc3a57bd03d397e56232e32c2cbf34debaf13',
  MailClient: 'e0b8ba5ff92eea446733e56d401e6a2d38e3cae9f7e9510594a72b66783f80a6',
  MailApp: '3b17e4e144f152d01019274364c487ae652ab39d12b48b8a41ec2aced285700a',
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
  assert.deepEqual(Object.fromEntries(Object.entries(FILES).map(([name, file]) => [name, normalizedHash(file)])), V36);
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
