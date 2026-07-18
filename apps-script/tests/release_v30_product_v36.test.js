'use strict';

const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const test = require('node:test');

const root = path.resolve(__dirname, '..');
const releasePath = path.join(root, 'tools', 'release_apps_script_v30_product_v36.ps1');
const release = fs.readFileSync(releasePath, 'utf8').replace(/\r\n?/g, '\n');
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

test('v30 product-v36 release pins exact source and separate stable/staging identities', () => {
  assert.match(release, /\$ExpectedOldVersion = 29\b/);
  assert.match(release, /\$ExpectedNewVersion = 30\b/);
  assert.deepEqual(hashTable(release, 'ExpectedCandidateHashes'), V36);
  assert.deepEqual(Object.fromEntries(Object.entries(FILES).map(([name, file]) => [name, normalizedHash(file)])), V36);
  assert.match(release, /\$StableDeploymentId = 'AKfycb/);
  assert.match(release, /Telegram Gmail product v36 immutable WebView staging/);
  assert.match(release, /Local\\TarasevychGmailNotifierAppsScriptV30ProductV36Release/);
  assert.match(release, /019f5d65-8209-7a00-b915-4a522dbcb612-v30-product-v36-release\.json/);
  assert.match(release, /019f5d65-8209-7a00-b915-4a522dbcb612-v30-staging-create-http400\.json/);
});

test('v30 product-v36 release creates one immutable and one staging deployment before promotion', () => {
  assert.match(release, /if \(\$PreflightOnly -and \$Method -ne 'GET'\)/);
  assert.equal(release.split('Invoke-GoogleJson POST "$base/versions"').length - 1, 1);
  assert.equal(release.split('Invoke-GoogleJson POST "$base/deployments"').length - 1, 1);
  assert.equal(release.split('Invoke-GoogleJson PUT $stableUri').length - 1, 1);
  assert.equal(release.split('Invoke-GoogleJson DELETE "$base/deployments/').length - 1, 1);
  assert.match(release, /if \(\$StageOnly\)[\s\S]*stableDeploymentUnchanged = \$true/);
  assert.match(release, /if \(\$Promote\)[\s\S]*Cannot promote without exactly one verified staging deployment/);
  assert.match(release, /if \(\$CleanupStaging\)[\s\S]*requires the stable deployment to be verified on v30/);
  assert.match(release, /if \(\$AcknowledgeDefiniteStagingRejection\)[\s\S]*requires a staging_create_reserved journal/);
  assert.match(release, /Read-LegacyDefiniteStagingRejectionEvidence \$journal/);
  assert.match(release, /journalReservationUpdatedAt -ne \[string\]\$Journal\.updatedAt/);
  assert.ok(release.indexOf("Write-ReleaseJournal 'version_create_reserved'") < release.indexOf('Invoke-GoogleJson POST "$base/versions"'));
  assert.ok(release.indexOf("Write-ReleaseJournal 'staging_create_reserved'") < release.indexOf('Invoke-GoogleJson POST "$base/deployments"'));
  assert.match(release, /prior immutable v30 create has an unresolved outcome; refusing another versions\.create/);
  assert.match(release, /prior staging deployment create has an unresolved outcome; refusing another deployments\.create/);
  assert.match(release, /\$createdStaging = Invoke-GoogleJson POST "\$base\/deployments"/);
  assert.match(release, /\$createdStaging = Invoke-GoogleJson POST "\$base\/deployments" @\{\s*versionNumber = \$ExpectedNewVersion\s*manifestFileName = 'appsscript'\s*description = \$StagingDescription\s*\}/);
  assert.match(release, /Test-DefiniteClientRejection \$_[\s\S]*Write-ReleaseJournal 'staging_create_rejected'/);
  assert.match(release, /if \(\$stagingJournalState -eq 'staging_create_rejected'\)[\s\S]*lacks an allowlisted definite HTTP status/);
  assert.match(release, /elseif \(\$stagingJournalState -ne 'version_verified'\)/);
  assert.match(release, /if \(\$staging\.Count -gt 1 -and -not \$CleanupStaging\)/);
  assert.match(release, /foreach \(\$stagingDeployment in \$staging\)/);
  const command = `$e=$null;$t=$null;[System.Management.Automation.Language.Parser]::ParseFile('${releasePath.replace(/'/g, "''")}',[ref]$t,[ref]$e)|Out-Null;if($e.Count){$e|% Message;exit 1}`;
  const parsed = spawnSync('pwsh', ['-NoProfile', '-Command', command], { encoding: 'utf8' });
  assert.equal(parsed.status, 0, parsed.stdout + parsed.stderr);
  assert.doesNotMatch(release, /(?:ya29\.|1\/\/)[A-Za-z0-9._-]{20,}|\b\d{8,12}:AA[A-Za-z0-9_-]{30,}\b/);
  assert.doesNotMatch(release, /client_secret\s*=\s*'[^']+'/i);
});
