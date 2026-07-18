const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const {
  APP_FILES,
  localSourceHashes,
  occurrences,
  parseHashTable,
  parseInteger,
} = require('./_release_test_helpers');

const root = path.resolve(__dirname, '..');
const deploy = fs.readFileSync(path.join(root, 'tools', 'deploy_apps_script.ps1'), 'utf8').replace(/\r\n?/g, '\n');
const migrate = fs.readFileSync(path.join(root, 'tools', 'migrate_apps_script_head.ps1'), 'utf8').replace(/\r\n?/g, '\n');

const SCRIPT_ID = '1Lxm-LJsGCRAz_LO0EjSlXnikx0oDioX6CdmiMhyLRmAAJ1fCk63S_1mS';
const DEPLOYMENT_ID = 'AKfycbwQkmQIIsboUayMhWdv_DzGj_gbERMKdWEpUVUpIjvwTaIjyjyLaBWUmw1g3lFWFV3Z';
const LOCAL_SOURCE_HASHES = localSourceHashes(root);

function parseString(source, variableName) {
  const match = source.match(new RegExp(`\\$${variableName}\\s*=\\s*'([^']+)'`));
  assert.ok(match, `missing string assignment $${variableName}`);
  return match[1];
}

function occurrenceCount(source, literal) {
  return occurrences(source, literal);
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

  const expectedVersion = parseInteger(migrateSource, 'ExpectedVersion');
  const immutableVerifier = extractFunction(migrateSource, `Get-VerifiedImmutableV${expectedVersion}`);
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

test('current release and migration version, mutex, and state names are exact and contain no future release state', () => {
  const expectedOldVersion = parseInteger(deploy, 'ExpectedOldVersion');
  const expectedNewVersion = parseInteger(deploy, 'ExpectedNewVersion');
  const expectedMigrationVersion = parseInteger(migrate, 'ExpectedVersion');

  assert.equal(expectedOldVersion + 1, expectedNewVersion);
  assert.equal(expectedNewVersion - 3, expectedMigrationVersion);

  const deployMutexName = `Local\\TarasevychGmailNotifierAppsScriptV${expectedNewVersion}Release`;
  const migrateMutexName = `Local\\TarasevychGmailNotifierAppsScriptV${expectedMigrationVersion}Release`;

  assert.match(deploy, new RegExp(deployMutexName.replace(/\\/g, '\\\\')));
  assert.match(migrate, new RegExp(migrateMutexName.replace(/\\/g, '\\\\')));
  for (const source of [deploy, migrate]) {
    assert.match(source, /WaitOne\(0\)/);
    assert.match(source, /AbandonedMutexException/);
    assert.match(source, /ReleaseMutex\(\)/);
  }

  assert.doesNotMatch(deploy, new RegExp(`\\bv${expectedNewVersion + 1}\\b|candidate_v${expectedNewVersion + 1}|resume_existing_v${expectedNewVersion + 1}|clean_v${expectedNewVersion + 1}|immutableV${expectedNewVersion + 1}`, 'i'));
  assert.doesNotMatch(deploy, new RegExp(`\\$Expected(?:Old|New)?Version\\s*=\\s*${expectedNewVersion + 1}\\b`));
  assert.doesNotMatch(migrate, new RegExp(`\\bv${expectedMigrationVersion + 1}\\b|candidate_v${expectedMigrationVersion + 1}|clean_v${expectedMigrationVersion + 1}|immutableV${expectedMigrationVersion + 1}`, 'i'));
  assert.doesNotMatch(migrate, new RegExp(`\\$Expected(?:Version\\b|Version\\s*=\\s*)${expectedMigrationVersion + 1}\\b`));

  assert.match(deploy, new RegExp(`'old_v${expectedOldVersion}'`));
  assert.match(deploy, new RegExp(`'candidate_v${expectedNewVersion}'`));
  assert.match(deploy, new RegExp(`'resume_existing_v${expectedNewVersion}'`));
  assert.match(deploy, new RegExp(`\\$immutableV${expectedNewVersion}\\b`));
  assert.doesNotMatch(deploy, new RegExp(`old_v${expectedOldVersion - 1}|candidate_v${expectedNewVersion - 1}|resume_existing_v${expectedNewVersion - 1}|immutableV${expectedNewVersion - 1}`));
  assert.match(migrate, new RegExp(`'clean_v${expectedMigrationVersion}'`));
  assert.match(migrate, new RegExp(`Get-VerifiedImmutableV${expectedMigrationVersion}`));
  assert.doesNotMatch(migrate, new RegExp(`clean_v${expectedMigrationVersion - 1}|Get-VerifiedImmutableV${expectedMigrationVersion - 1}`));
});

test('historical rollback and candidate hashes remain internally pinned', () => {
  const expectedRollbackHashes = parseHashTable(deploy, 'ExpectedOldHashes');
  const expectedCandidateHashes = parseHashTable(deploy, 'ExpectedCandidateHashes');
  const migrateHashes = parseHashTable(migrate, 'ExpectedHashes');
  assert.deepEqual(expectedRollbackHashes, parseHashTable(deploy, 'ExpectedOldHashes'));
  assert.deepEqual(expectedCandidateHashes, parseHashTable(deploy, 'ExpectedCandidateHashes'));
  assert.deepEqual(migrateHashes, expectedCandidateHashes);

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

test('pre-create decision adopts exact candidate, rejects future versions, and gates the only versions.create site', () => {
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
        `  $immutable = Get-VerifiedImmutableV${parseInteger(migrate, 'ExpectedVersion')} $base`,
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

test('deploy idempotent branch verifies stable immutable candidate and HEAD before returning', () => {
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

test('Restore cleans an exact wrapper before stable inspection and is not blocked by future versions', () => {
  const restoreStart = migrate.indexOf("if ($Mode -eq 'Restore')");
  const restoreEnd = migrate.indexOf('\n  $deployment = Invoke-GoogleJson GET $stableUri', restoreStart);
  assert.ok(restoreStart >= 0 && restoreEnd > restoreStart);
  const restore = migrate.slice(restoreStart, restoreEnd);
  const migrationVersion = parseInteger(migrate, 'ExpectedVersion');
  const cleanup = restore.indexOf(`Set-HeadAndVerify $base @{ scriptId = $ScriptId; files = $immutable.files } 'clean_v${migrationVersion}'`);
  const stableRead = restore.indexOf('Invoke-GoogleJson GET $stableUri');
  assert.ok(cleanup >= 0);
  assert.ok(stableRead > cleanup);
  assert.doesNotMatch(restore, /Assert-NoFutureVersions|Get-FutureVersionNumbers/);
  assert.match(restore, /stableDrift/);
  assert.match(restore, /without changing stable/);
});

test('Prepare refuses future versions before writing and removes only its exact wrapper on verification failure', () => {
  const migrationVersion = parseInteger(migrate, 'ExpectedVersion');
  const prepare = migrate.slice(migrate.indexOf("if ($Mode -eq 'Prepare')"));
  const futureGuard = prepare.indexOf("Assert-NoFutureVersions $base 'Prepare guard'");
  const wrapperWrite = prepare.indexOf("Set-HeadAndVerify $base @{ scriptId = $ScriptId; files = $temporaryFiles } 'temporary_wrapper'");
  const postWriteGuard = prepare.indexOf("Assert-NoFutureVersions $base 'Post-write Prepare guard'", wrapperWrite);
  const immutableVerification = prepare.indexOf(`Get-VerifiedImmutableV${migrationVersion} $base`, postWriteGuard);
  assert.ok(futureGuard >= 0 && wrapperWrite > futureGuard);
  assert.ok(postWriteGuard > wrapperWrite && immutableVerification > postWriteGuard);
  assert.equal(occurrenceCount(prepare, 'Assert-NoFutureVersions $base'), 2);
  assert.match(
    prepare,
    new RegExp(`catch \\{[\\s\\S]+Set-HeadAndVerify \\$base \\@\\{ scriptId = \\$ScriptId; files = \\$immutable\\.files \\} 'clean_v${migrationVersion}'`),
  );
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
