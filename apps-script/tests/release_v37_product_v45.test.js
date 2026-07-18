'use strict';

const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const test = require('node:test');

const root = path.resolve(__dirname, '..');
const releasePath = path.join(root, 'tools', 'release_apps_script_v37_product_v45.ps1');
const release = fs.readFileSync(releasePath, 'utf8').replace(/\r\n?/g, '\n');
const files = { Code: 'Code.gs', MultiAccount: 'MultiAccount.gs', MailClient: 'MailClient.gs', MailApp: 'MailApp.html', appsscript: 'appsscript.json' };

function hashTable(name) {
  const match = release.match(new RegExp(`\\$${name}\\s*=\\s*@\\{([\\s\\S]*?)\\n\\}`));
  assert.ok(match, `missing ${name}`);
  return Object.fromEntries([...match[1].matchAll(/^\s*(Code|MultiAccount|MailClient|MailApp|appsscript)\s*=\s*'([a-f0-9]{64})'\s*$/gm)]
    .map(row => [row[1], row[2]]));
}

function localHashes() {
  return Object.fromEntries(Object.entries(files).map(([name, file]) => {
    const source = fs.readFileSync(path.join(root, file), 'utf8').replace(/\r\n?/g, '\n');
    return [name, crypto.createHash('sha256').update(source).digest('hex')];
  }));
}

test('v37 product-v45 gate pins production v35, legacy v36, and exact local candidate', () => {
  assert.match(release, /\$RollbackVersion = 35\b/);
  assert.match(release, /\$LegacyStagingVersion = 36\b/);
  assert.match(release, /\$CandidateVersion = 37\b/);
  assert.deepEqual(hashTable('ExpectedCandidateHashes'), localHashes());
  assert.match(release, /product v45: gentle milestones and exact-session logout/);
  assert.match(release, /product v43 isolated staging/);
  assert.match(release, /019f5d65-8209-7a00-b915-4a522dbcb612-v37-product-v45-release\.json/);
});

test('v37 gate is fail-closed, at-most-once, rollback-capable, and parses cleanly', () => {
  assert.match(release, /if \(\$PreflightOnly -and \$Method -ne 'GET'\)/);
  assert.equal(release.split('Invoke-GoogleJson POST "$base/versions"').length - 1, 1);
  assert.equal(release.split('Invoke-GoogleJson POST "$base/deployments"').length - 1, 1);
  assert.match(release, /version_create_reserved/);
  assert.match(release, /staging_create_reserved/);
  assert.match(release, /Clean the exact product-v43 staging deployment/);
  assert.match(release, /mode='rollback'/);
  assert.doesNotMatch(release, /(?:ya29\.|1\\\/\\\/)[A-Za-z0-9._-]{20,}|\b\d{8,12}:AA[A-Za-z0-9_-]{30,}\b/);
  assert.doesNotMatch(release, /client_secret\s*=\s*'[^']+'/i);
  const command = `$e=$null;$t=$null;[System.Management.Automation.Language.Parser]::ParseFile('${releasePath.replace(/'/g, "''")}',[ref]$t,[ref]$e)|Out-Null;if($e.Count){$e|% Message;exit 1}`;
  const parsed = spawnSync('pwsh', ['-NoProfile', '-Command', command], { encoding: 'utf8' });
  assert.equal(parsed.status, 0, parsed.stdout + parsed.stderr);
});
