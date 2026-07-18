'use strict';

const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const test = require('node:test');

const root = path.resolve(__dirname, '..');
const releasePath = path.join(root, 'tools', 'release_apps_script_v31_product_v37.ps1');
const release = fs.readFileSync(releasePath, 'utf8').replace(/\r\n?/g, '\n');
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
const V37 = Object.freeze({
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

test('v31 product-v37 release pins v30 evidence and exact source with separate staging identity', () => {
  assert.match(release, /\$ExpectedOldVersion = 29\b/);
  assert.match(release, /\$ExpectedPreviousVersion = 30\b/);
  assert.match(release, /\$ExpectedNewVersion = 31\b/);
  assert.deepEqual(hashTable(release, 'ExpectedPreviousCandidateHashes'), V36);
  assert.deepEqual(hashTable(release, 'ExpectedCandidateHashes'), V37);
  assert.deepEqual(Object.fromEntries(Object.entries(FILES).map(([name, file]) => [name, normalizedHash(file)])), V37);
  assert.match(release, /\$StableDeploymentId = 'AKfycb/);
  assert.match(release, /Telegram Gmail product v37 immutable WebView staging/);
  assert.match(release, /Local\\TarasevychGmailNotifierAppsScriptV31ProductV37Release/);
  assert.match(release, /019f5d65-8209-7a00-b915-4a522dbcb612-v31-product-v37-release\.json/);
  assert.doesNotMatch(release, /AcknowledgeDefiniteStagingRejection|LegacyRejectionEvidence/);
});

test('v31 product-v37 release creates one immutable and one staging deployment before promotion', () => {
  assert.match(release, /if \(\$PreflightOnly -and \$Method -ne 'GET'\)/);
  assert.equal(release.split('Invoke-GoogleJson POST "$base/versions"').length - 1, 1);
  assert.equal(release.split('Invoke-GoogleJson POST "$base/deployments"').length - 1, 1);
  assert.equal(release.split('Invoke-GoogleJson PUT $stableUri').length - 1, 1);
  assert.equal(release.split('Invoke-GoogleJson DELETE "$base/deployments/').length - 1, 1);
  assert.match(release, /if \(\$StageOnly\)[\s\S]*stableDeploymentUnchanged = \$true/);
  assert.match(release, /if \(\$Promote\)[\s\S]*Cannot promote without exactly one verified staging deployment/);
  assert.match(release, /if \(\$CleanupStaging\)[\s\S]*requires the stable deployment to be verified on v31/);
  assert.match(release, /Get-ImmutableOrNull \$base \$ExpectedPreviousVersion 2[\s\S]*ExpectedPreviousCandidateHashes/);
  assert.match(release, /previous_candidate_v30/);
  assert.match(release, /candidate_product_v37/);
  assert.match(release, /Prior HEAD after failed staging upload/);
  assert.match(release, /Candidate HEAD before rollback[\s\S]*if \(-not \$priorHeadIntact\)[\s\S]*Rolled-back prior HEAD/,
    'a failed upload must read back exact prior or candidate HEAD before any rollback PUT');
  assert.match(release, /Staging HEAD outcome is unresolved; no rollback PUT was attempted/);
  assert.match(release, /Rolled-back prior HEAD/);
  assert.match(release, /if \(\$stableVersion -notin @\(\$ExpectedOldVersion, \$ExpectedNewVersion\)\)/,
    'stable v30 must never be accepted as a promotion target for this helper');
  assert.ok(release.indexOf("Write-ReleaseJournal 'version_create_reserved'") < release.indexOf('Invoke-GoogleJson POST "$base/versions"'));
  assert.ok(release.indexOf("Write-ReleaseJournal 'staging_create_reserved'") < release.indexOf('Invoke-GoogleJson POST "$base/deployments"'));
  assert.match(release, /prior immutable v31 create has an unresolved outcome; refusing another versions\.create/);
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
