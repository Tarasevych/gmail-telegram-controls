const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const root = path.resolve(__dirname, '..');
const deploy = fs.readFileSync(path.join(root, 'tools', 'deploy_apps_script.ps1'), 'utf8').replace(/\r\n?/g, '\n');
const migrate = fs.readFileSync(path.join(root, 'tools', 'migrate_apps_script_head.ps1'), 'utf8').replace(/\r\n?/g, '\n');

const SCRIPT_ID = '1Lxm-LJsGCRAz_LO0EjSlXnikx0oDioX6CdmiMhyLRmAAJ1fCk63S_1mS';
const DEPLOYMENT_ID = 'AKfycbwQkmQIIsboUayMhWdv_DzGj_gbERMKdWEpUVUpIjvwTaIjyjyLaBWUmw1g3lFWFV3Z';
const ROLLBACK_HASHES = Object.freeze({
  Code: 'a06a30fa7a8d7b55e78d472be224d9714611dff20b5e9d01791a0a0dd0e1679f',
  MailClient: '823061860ce10e012fcd6df0bbf1a57843922fd2a58145f135d54542cd03a389',
  MailApp: '70ceff63f0faa2c891c23fb7a98efb584dae4c24ad557a154a283aec969cd07f',
  appsscript: '354ad159bcd81637d9abf7711cfc675b192ac373317744cf90376f7b14f4edc9',
});
const CANDIDATE_HASHES = Object.freeze({
  Code: '23bcff69c2b937534b49a26a65a25badead9102fbd93fb7bd00e8236c5ef84fd',
  MailClient: 'deebcc32d4af2c5b9b4a6a26a3fbfd4a42df1212253b9a51d71be953990f6d8b',
  MailApp: 'a1277e6fd8030bb0f63023f3df25cd549e55e879f01d31680dbe3c5d915a512a',
  appsscript: '354ad159bcd81637d9abf7711cfc675b192ac373317744cf90376f7b14f4edc9',
});
const APP_FILES = Object.freeze({
  Code: 'Code.gs',
  MailClient: 'MailClient.gs',
  MailApp: 'MailApp.html',
  appsscript: 'appsscript.json',
});

function normalizedHash(filePath) {
  const normalized = fs.readFileSync(filePath, 'utf8').replace(/\r\n?/g, '\n');
  return crypto.createHash('sha256').update(normalized, 'utf8').digest('hex');
}

function parseHashTable(source, variableName) {
  const match = source.match(new RegExp(`\\$${variableName}\\s*=\\s*@\\{([\\s\\S]*?)\\r?\\n\\}`));
  assert.ok(match, `missing PowerShell hash table $${variableName}`);
  const parsed = {};
  for (const entry of match[1].matchAll(/^\s*(Code|MailClient|MailApp|appsscript)\s*=\s*'([a-f0-9]{64})'\s*$/gm)) {
    parsed[entry[1]] = entry[2];
  }
  assert.deepEqual(Object.keys(parsed).sort(), Object.keys(APP_FILES).sort());
  return parsed;
}

function parseInteger(source, variableName) {
  const match = source.match(new RegExp(`\\$${variableName}\\s*=\\s*(\\d+)`));
  assert.ok(match, `missing integer assignment $${variableName}`);
  return Number(match[1]);
}

function parseString(source, variableName) {
  const match = source.match(new RegExp(`\\$${variableName}\\s*=\\s*'([^']+)'`));
  assert.ok(match, `missing string assignment $${variableName}`);
  return match[1];
}

function occurrenceCount(source, literal) {
  return source.split(literal).length - 1;
}

function extractFunction(source, name) {
  const start = source.indexOf(`function ${name}`);
  assert.ok(start >= 0, `missing PowerShell function ${name}`);
  const next = source.indexOf('\nfunction ', start + 1);
  return source.slice(start, next >= 0 ? next : source.length);
}

function mutationCalls(source) {
  return [...source.matchAll(/\bInvoke-GoogleJson\s+(POST|PUT)\s+([^\n]+)/g)]
    .map((match) => `${match[1]} ${match[2].trim()}`);
}

function directRestCalls(source) {
  return source.split('\n')
    .map((line) => line.trim())
    .filter((line) => /\bInvoke-RestMethod\b/.test(line));
}

function replaceOnce(source, needle, replacement) {
  assert.equal(occurrenceCount(source, needle), 1, 'expected one mutation marker: ' + needle);
  return source.replace(needle, replacement);
}

function insertBeforeOnce(source, marker, insertion) {
  return replaceOnce(source, marker, insertion + marker);
}

function assertPreCreateContract(deploySource, migrateSource) {
  const decision = extractFunction(deploySource, 'Get-PreCreateDisposition');
  assert.match(
    decision,
    /\$atOrAfterExpected = @\(\$VersionNumbers \| Where-Object \{ \$_ -ge \$ExpectedNewVersion \} \| Sort-Object -Unique\)/,
  );
  assert.match(
    decision,
    /\$futureVersions = @\(\$atOrAfterExpected \| Where-Object \{ \$_ -gt \$ExpectedNewVersion \}\)/,
  );
  const futureFailure = decision.indexOf('if ($futureVersions.Count)');
  const exactAdoption = decision.indexOf('if ($atOrAfterExpected -contains $ExpectedNewVersion)');
  assert.ok(futureFailure >= 0 && exactAdoption > futureFailure);
  assert.match(decision, /return 'adopt_expected'/);
  assert.match(decision, /return 'create_expected'/);

  const createLiteral = 'Invoke-GoogleJson POST "$base/versions"';
  assert.equal(occurrenceCount(deploySource, createLiteral), 1);
  assert.equal(occurrenceCount(migrateSource, createLiteral), 0);

  const createStart = deploySource.indexOf('$createError = $null');
  const createEnd = deploySource.indexOf('if ($null -ne $createdVersion', createStart);
  assert.ok(createStart >= 0 && createEnd > createStart);
  const createBlock = deploySource.slice(createStart, createEnd);
  const disposition = createBlock.indexOf('$preCreateDisposition = Get-PreCreateDisposition $immediateVersions');
  const adoption = createBlock.indexOf("if ($preCreateDisposition -eq 'adopt_expected')", disposition);
  const recoveryTry = createBlock.indexOf('try {');
  const post = createBlock.indexOf(createLiteral);
  const recoveryCatch = createBlock.indexOf('} catch {', post);
  assert.ok(disposition >= 0);
  assert.ok(adoption > disposition);
  assert.ok(recoveryTry > adoption, 'future-version disposition must execute outside the POST recovery catch');
  assert.ok(post > recoveryTry && recoveryCatch > post);
  assert.match(createBlock, /\$candidateVersionReady = \$true/);
  assert.match(createBlock, /Refusing versions\.create/);
}

function assertReleaseHelperSecurityContracts(deploySource, migrateSource) {
  const invokeStart = deploySource.indexOf('function Invoke-GoogleJson');
  const invokeEnd = deploySource.indexOf('function Test-HttpNotFound');
  const invoke = deploySource.slice(invokeStart, invokeEnd);
  assert.match(invoke, /if \(\$PreflightOnly -and \$Method -ne 'GET'\)/);
  assert.match(invoke, /PreflightOnly forbids Apps Script mutation/);

  const oauthRefresh = deploySource.indexOf('  $refresh = Invoke-RestMethod', invokeEnd);
  assert.ok(oauthRefresh > invokeEnd);
  assert.doesNotMatch(deploySource.slice(invokeEnd, oauthRefresh), /\$PreflightOnly/);
  assert.equal(occurrenceCount(deploySource, '$PreflightOnly'), 4);

  assert.deepEqual(mutationCalls(deploySource), [
    'PUT "$BaseUri/content" $Body',
    'POST "$base/versions" @{ description = $Description }',
    'PUT $stableUri @{',
  ]);
  assert.deepEqual(mutationCalls(migrateSource), [
    'PUT "$BaseUri/content" $Body',
  ]);

  const expectedDirect = [
    'return Invoke-RestMethod @params',
    "$refresh = Invoke-RestMethod -Method Post -Uri 'https://oauth2.googleapis.com/token' -ContentType 'application/x-www-form-urlencoded' -Body @{",
  ];
  assert.deepEqual(directRestCalls(deploySource), expectedDirect);
  assert.deepEqual(directRestCalls(migrateSource), expectedDirect);
  for (const source of [deploySource, migrateSource]) {
    assert.doesNotMatch(source, /\bInvoke-WebRequest\b/);
  }

  const immutableVerifier = extractFunction(migrateSource, 'Get-VerifiedImmutableV25');
  assert.doesNotMatch(
    immutableVerifier,
    /Assert-NoFutureVersions|Get-FutureVersionNumbers|Get-AllVersionNumbers/,
  );

  assertPreCreateContract(deploySource, migrateSource);
}
test('deployment helpers require PowerShell 7 and pin the exact Apps Script identities', () => {
  for (const source of [deploy, migrate]) {
    assert.match(source, /^#Requires -Version 7\.0/m);
    assert.equal(parseString(source, 'ScriptId'), SCRIPT_ID);
    assert.equal(parseString(source, 'DeploymentId'), DEPLOYMENT_ID);
    assert.equal(occurrenceCount(source, SCRIPT_ID), 1);
    assert.equal(occurrenceCount(source, DEPLOYMENT_ID), 1);
  }
});

test('v25 release version, mutex, and state names are exact and contain no future release state', () => {
  assert.equal(parseInteger(deploy, 'ExpectedOldVersion'), 24);
  assert.equal(parseInteger(deploy, 'ExpectedNewVersion'), 25);
  assert.equal(parseInteger(migrate, 'ExpectedVersion'), 25);

  const mutexName = 'Local\\TarasevychGmailNotifierAppsScriptV25Release';
  for (const source of [deploy, migrate]) {
    assert.match(source, new RegExp(mutexName.replace(/\\/g, '\\\\')));
    assert.match(source, /WaitOne\(0\)/);
    assert.match(source, /AbandonedMutexException/);
    assert.match(source, /ReleaseMutex\(\)/);
    assert.doesNotMatch(source, /\bv26\b|candidate_v26|resume_existing_v26|clean_v26|immutableV26/i);
    assert.doesNotMatch(source, /\$Expected(?:Old|New)?Version\s*=\s*26\b/);
  }

  assert.match(deploy, /'old_v24'/);
  assert.match(deploy, /'candidate_v25'/);
  assert.match(deploy, /'resume_existing_v25'/);
  assert.match(deploy, /\$immutableV25\b/);
  assert.doesNotMatch(deploy, /old_v23|candidate_v24|resume_existing_v24|immutableV24/);
  assert.match(migrate, /'clean_v25'/);
  assert.match(migrate, /Get-VerifiedImmutableV25/);
  assert.doesNotMatch(migrate, /clean_v24|Get-VerifiedImmutableV24/);
});

test('rollback and candidate hashes are pinned, and candidate hashes independently match local normalized sources', () => {
  assert.deepEqual(parseHashTable(deploy, 'ExpectedOldHashes'), ROLLBACK_HASHES);
  assert.deepEqual(parseHashTable(deploy, 'ExpectedCandidateHashes'), CANDIDATE_HASHES);
  assert.deepEqual(parseHashTable(migrate, 'ExpectedHashes'), CANDIDATE_HASHES);

  const independentlyComputed = Object.fromEntries(
    Object.entries(APP_FILES).map(([name, file]) => [name, normalizedHash(path.join(root, file))]),
  );
  assert.deepEqual(independentlyComputed, CANDIDATE_HASHES);
});

test('deploy validates the exact local candidate before reading OAuth credentials', () => {
  const localGuard = deploy.indexOf("Assert-FileSetAndHashes $candidate $ExpectedCandidateHashes 'Local candidate'");
  const credentialRead = deploy.indexOf("Get-Content -Raw (Join-Path $HOME '.clasprc.json')");
  assert.ok(localGuard >= 0);
  assert.ok(credentialRead > localGuard);
});

test('PreflightOnly has a runtime fail-closed Apps Script mutation guard while OAuth refresh remains available', () => {
  const invokeStart = deploy.indexOf('function Invoke-GoogleJson');
  const invokeEnd = deploy.indexOf('function Test-HttpNotFound');
  const invoke = deploy.slice(invokeStart, invokeEnd);
  assert.match(invoke, /if \(\$PreflightOnly -and \$Method -ne 'GET'\)/);
  assert.match(invoke, /PreflightOnly forbids Apps Script mutation/);
  const oauthRefresh = deploy.indexOf('  $refresh = Invoke-RestMethod', invokeEnd);
  assert.ok(oauthRefresh > invokeEnd);
  assert.doesNotMatch(deploy.slice(invokeEnd, oauthRefresh), /\$PreflightOnly/);
  assert.equal(occurrenceCount(deploy, '$PreflightOnly'), 4);
  assert.match(deploy, /Invoke-RestMethod -Method Post -Uri 'https:\/\/oauth2\.googleapis\.com\/token'/);
});
test('deploy rejects any future immutable version before idempotent or preflight return', () => {
  const stableRead = deploy.indexOf('$stableVersion = [int]$deployment.deploymentConfig.versionNumber');
  const stableFutureGuard = deploy.indexOf('if ($stableVersion -gt $ExpectedNewVersion)', stableRead);
  const inventoryGuard = deploy.indexOf("Assert-NoFutureVersions $base 'Initial release guard'", stableFutureGuard);
  const idempotentBranch = deploy.indexOf('if ($stableVersion -eq $ExpectedNewVersion)', inventoryGuard);
  const preflightBranch = deploy.indexOf('if ($PreflightOnly)', idempotentBranch);
  assert.ok(stableRead >= 0);
  assert.ok(stableFutureGuard > stableRead);
  assert.ok(inventoryGuard > stableFutureGuard);
  assert.ok(idempotentBranch > inventoryGuard);
  assert.ok(preflightBranch > inventoryGuard);
  assert.match(deploy, /Where-Object \{ \$_ -gt \$ExpectedNewVersion \}/);
  assert.equal(occurrenceCount(deploy, 'Assert-NoFutureVersions $base'), 2);
});

test('pre-create decision adopts exact v25, rejects future versions, and gates the only versions.create site', () => {
  assertPreCreateContract(deploy, migrate);
  assert.match(deploy, /Refusing to create another version/);
  assert.match(deploy, /The POST may have committed[\s\S]+Get-ImmutableVersionOrNull \$base \$ExpectedNewVersion 6/);
});

test('all Apps Script mutations use the guarded wrapper and direct HTTP calls are exactly allowlisted', () => {
  assertReleaseHelperSecurityContracts(deploy, migrate);
});

test('known dangerous release-helper mutants are rejected in memory', () => {
  const mutants = [
    {
      name: 'preflight_oauth_disabled',
      deploy: insertBeforeOnce(
        deploy,
        "  $clasp = Get-Content -Raw (Join-Path $HOME '.clasprc.json') | ConvertFrom-Json",
        "  if ($PreflightOnly) { throw 'OAuth disabled in preflight' }\n",
      ),
    },
    {
      name: 'direct_apps_script_post',
      deploy: insertBeforeOnce(
        deploy,
        '  $base = "https://script.googleapis.com/v1/projects/$ScriptId"',
        '  $null = Invoke-RestMethod -Method Post -Uri "$base/content"\n',
      ),
    },
    {
      name: 'second_versions_post',
      deploy: insertBeforeOnce(
        deploy,
        '          $createdVersion = Invoke-GoogleJson POST "$base/versions" @{ description = $Description }',
        '          $null = Invoke-RestMethod -Method Post -Uri "$base/versions"\n',
      ),
    },
    {
      name: 'status_head_put',
      migrate: insertBeforeOnce(
        migrate,
        '  $immutable = Get-VerifiedImmutableV25 $base',
        '  $null = Invoke-GoogleJson PUT "$base/content" @{ scriptId = $ScriptId; files = @() }\n',
      ),
    },
    {
      name: 'restore_future_blocked',
      migrate: insertBeforeOnce(
        migrate,
        '  $immutable = Invoke-GoogleJson GET "$BaseUri/content?versionNumber=$ExpectedVersion"',
        "  Assert-NoFutureVersions $BaseUri 'Injected future guard'\n",
      ),
    },
    {
      name: 'precreate_ignores_exact_v25',
      deploy: replaceOnce(
        deploy,
        '$atOrAfterExpected = @($VersionNumbers | Where-Object { $_ -ge $ExpectedNewVersion } | Sort-Object -Unique)',
        '$atOrAfterExpected = @($VersionNumbers | Where-Object { $_ -gt $ExpectedNewVersion } | Sort-Object -Unique)',
      ),
    },
  ];

  for (const mutant of mutants) {
    assert.throws(
      () => assertReleaseHelperSecurityContracts(mutant.deploy || deploy, mutant.migrate || migrate),
      undefined,
      'mutant ' + mutant.name + ' was accepted',
    );
  }
});
test('deploy guards stable PUT immediately and preserves exact v25 as a resumable state', () => {
  assert.equal(occurrenceCount(deploy, 'Invoke-GoogleJson PUT $stableUri'), 1);
  assert.match(
    deploy,
    /Assert-NoFutureVersions \$base 'Immediate pre-deployment-update guard'\r?\n\s*\$null = Invoke-GoogleJson PUT \$stableUri/,
  );
  assert.match(deploy, /if \(\$candidateVersionReady\) \{[\s\S]+safe resumable state[\s\S]+were not rolled back/);
  const recoveryCatch = deploy.slice(deploy.indexOf('catch {\n    $original = $_'));
  assert.doesNotMatch(recoveryCatch, /Invoke-GoogleJson PUT \$stableUri/);
  assert.match(recoveryCatch, /Set-HeadAndAssertHashes[\s\S]+\$oldVersion\.files/);
});

test('deploy idempotent branch verifies stable, immutable v25, and HEAD before returning', () => {
  const branch = deploy.match(/if \(\$stableVersion -eq \$ExpectedNewVersion\) \{([\s\S]+?)\n  \}/);
  assert.ok(branch, 'stable-v25 branch must exist');
  assert.match(branch[1], /Assert-DeploymentVersion/);
  assert.match(branch[1], /Immutable version \$ExpectedNewVersion/);
  assert.match(branch[1], /Assert-FileSetAndHashes \$head \$ExpectedCandidateHashes 'Current HEAD'/);
  assert.match(branch[1], /'already_deployed'/);
  assert.match(branch[1], /return/);
});

test('migration helper never creates a version or changes stable deployment', () => {
  assert.doesNotMatch(migrate, /Invoke-GoogleJson POST "\$base\/versions"/);
  assert.doesNotMatch(migrate, /Invoke-GoogleJson PUT \$stableUri/);
});

test('Status is read-only and reports both stable and future-version drift', () => {
  const statusStart = migrate.indexOf("if ($Mode -eq 'Status')");
  const prepareStart = migrate.indexOf("if ($Mode -eq 'Prepare')", statusStart);
  assert.ok(statusStart >= 0 && prepareStart > statusStart);
  const status = migrate.slice(statusStart, prepareStart);
  assert.doesNotMatch(status, /Set-HeadAndVerify|Invoke-GoogleJson\s+(?:POST|PUT)/);
  assert.match(status, /Get-FutureVersionNumbers \$base/);
  assert.match(status, /futureVersionDrift/);
  assert.match(status, /futureVersions/);
});

test('Restore cleans an exact v25 wrapper before stable inspection and is not blocked by future versions', () => {
  const restoreStart = migrate.indexOf("if ($Mode -eq 'Restore')");
  const restoreEnd = migrate.indexOf('\n  $deployment = Invoke-GoogleJson GET $stableUri', restoreStart);
  assert.ok(restoreStart >= 0 && restoreEnd > restoreStart);
  const restore = migrate.slice(restoreStart, restoreEnd);
  const cleanup = restore.indexOf("Set-HeadAndVerify $base @{ scriptId = $ScriptId; files = $immutable.files } 'clean_v25'");
  const stableRead = restore.indexOf('Invoke-GoogleJson GET $stableUri');
  assert.ok(cleanup >= 0);
  assert.ok(stableRead > cleanup);
  assert.doesNotMatch(restore, /Assert-NoFutureVersions|Get-FutureVersionNumbers/);
  assert.match(restore, /stableDrift/);
  assert.match(restore, /without changing stable/);
});

test('Prepare refuses future versions before writing and removes only its exact wrapper on verification failure', () => {
  const prepare = migrate.slice(migrate.indexOf("if ($Mode -eq 'Prepare')"));
  const futureGuard = prepare.indexOf("Assert-NoFutureVersions $base 'Prepare guard'");
  const wrapperWrite = prepare.indexOf("Set-HeadAndVerify $base @{ scriptId = $ScriptId; files = $temporaryFiles } 'temporary_wrapper'");
  const postWriteGuard = prepare.indexOf("Assert-NoFutureVersions $base 'Post-write Prepare guard'", wrapperWrite);
  const immutableVerification = prepare.indexOf('Get-VerifiedImmutableV25 $base', postWriteGuard);
  assert.ok(futureGuard >= 0 && wrapperWrite > futureGuard);
  assert.ok(postWriteGuard > wrapperWrite && immutableVerification > postWriteGuard);
  assert.equal(occurrenceCount(prepare, 'Assert-NoFutureVersions $base'), 2);
  assert.match(prepare, /catch \{[\s\S]+Set-HeadAndVerify \$base \@\{ scriptId = \$ScriptId; files = \$immutable\.files \} 'clean_v25'/);
  assert.match(prepare, /Prepare aborted and removed the exact wrapper/);
});

test('wrapper matching is newline-normalized and secrets are never written to output', () => {
  assert.match(migrate, /Use explicit LF/);
  assert.match(migrate, /ConvertTo-NormalizedSource/);
  for (const source of [deploy, migrate]) {
    assert.doesNotMatch(source, /Write-(?:Host|Output|Verbose|Debug|Information|Warning)/i);
    assert.doesNotMatch(source, /ConvertTo-Json[^\n]*(?:refresh_token|client_secret|AccessToken)/i);
  }
});
