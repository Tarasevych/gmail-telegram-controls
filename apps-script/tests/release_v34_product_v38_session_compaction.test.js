'use strict';
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const test = require('node:test');

const root = path.resolve(__dirname, '..');
const releasePath = path.join(root, 'tools',
  'release_apps_script_v34_product_v38_session_compaction.ps1');
const release = fs.readFileSync(releasePath, 'utf8').replace(/\r\n?/g, '\n');
const files = {
  Code: 'Code.gs', MultiAccount: 'MultiAccount.gs', MailClient: 'MailClient.gs',
  MailApp: 'MailApp.html', appsscript: 'appsscript.json',
};
const expected = {
  Code: '8f0136d0531ce7be3dc789a5c154db3e76da6c38f754708f05dc61ae250365ad',
  MultiAccount: '524cd5f5e7e57ff2313036da77afc3a57bd03d397e56232e32c2cbf34debaf13',
  MailClient: '6114e89601899ca0c83f017354302569885af78078e9bb5e63d088ca09f5e6a5',
  MailApp: 'd6d64a860392a4932ab7691dad81c0fbd667fd1251de457355b553334f458f67',
  appsscript: '354ad159bcd81637d9abf7711cfc675b192ac373317744cf90376f7b14f4edc9',
};

function hash(file) {
  return crypto.createHash('sha256')
    .update(fs.readFileSync(path.join(root, file), 'utf8').replace(/\r\n?/g, '\n'))
    .digest('hex');
}

function table(name) {
  const match = release.match(new RegExp(`\\$${name}\\s*=\\s*@\\{([\\s\\S]*?)\\n\\}`));
  assert.ok(match);
  return Object.fromEntries([...match[1].matchAll(
    /^\s*(Code|MultiAccount|MailClient|MailApp|appsscript)\s*=\s*'([a-f0-9]{64})'/gm
  )].map(row => [row[1], row[2]]));
}

test('v34 release pins the exact automatic same-user session compaction candidate', () => {
  assert.match(release, /\$ExpectedOldVersion = 33\b/);
  assert.match(release, /\$ExpectedPreviousVersion = 32\b/);
  assert.match(release, /\$ExpectedNewVersion = 34\b/);
  assert.deepEqual(table('ExpectedCandidateHashes'), expected);
  assert.deepEqual(Object.fromEntries(Object.entries(files).map(([key, file]) => [key, hash(file)])), expected);
  assert.match(release, /automatic same-user session compaction/);
  assert.match(release,
    /019f5d65-8209-7a00-b915-4a522dbcb612-v34-product-v38-session-compaction-release\.json/);
});

test('v34 release is GET-only in preflight and binds acceptance to server and UI hashes', () => {
  assert.match(release, /if \(\$PreflightOnly -and \$Method -ne 'GET'\)/);
  assert.equal(release.split('POST "$base/versions"').length - 1, 1);
  assert.equal(release.split('POST "$base/deployments"').length - 1, 1);
  assert.ok(release.indexOf("Write-Journal 'version_create_reserved'") <
    release.indexOf('POST "$base/versions"'));
  assert.ok(release.indexOf("Write-Journal 'staging_create_reserved'") <
    release.indexOf('POST "$base/deployments"'));
  assert.match(release, /candidateMailClientHash=\$ExpectedCandidateHashes\.MailClient/);
  assert.match(release, /Cannot promote without exact immutable v34, one staging deployment, and acceptance journal/);
  assert.match(release, /versionNumber=\$ExpectedNewVersion/g);
  const command = `$e=$null;$t=$null;[Management.Automation.Language.Parser]::ParseFile('${releasePath.replace(/'/g, "''")}',[ref]$t,[ref]$e)|Out-Null;if($e.Count){$e|% Message;exit 1}`;
  const parsed = spawnSync('pwsh', ['-NoProfile', '-Command', command], { encoding: 'utf8' });
  assert.equal(parsed.status, 0, parsed.stdout + parsed.stderr);
  assert.doesNotMatch(release,
    /(?:ya29\.|1\\\/\\\/)[A-Za-z0-9._-]{20,}|\b\d{8,12}:AA[A-Za-z0-9_-]{30,}\b/);
});
