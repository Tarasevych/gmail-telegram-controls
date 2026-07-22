#Requires -Version 7.0

[CmdletBinding()]
param(
  [switch]$PreflightOnly,
  [switch]$StageOnly,
  [switch]$Promote,
  [switch]$CleanupStaging,
  [switch]$Rollback
)

$ErrorActionPreference = 'Stop'
$ProgressPreference = 'SilentlyContinue'
if (@($PreflightOnly, $StageOnly, $Promote, $CleanupStaging, $Rollback | Where-Object { $_ }).Count -ne 1) {
  throw 'Choose exactly one mode.'
}

$ScriptId = '1Lxm-LJsGCRAz_LO0EjSlXnikx0oDioX6CdmiMhyLRmAAJ1fCk63S_1mS'
$StableDeploymentId = 'AKfycbwQkmQIIsboUayMhWdv_DzGj_gbERMKdWEpUVUpIjvwTaIjyjyLaBWUmw1g3lFWFV3Z'
$RollbackVersion = 57
$LegacyStagingVersion = 58
$CandidateVersion = 59
$ReleaseDescription = 'Telegram Gmail Versie 1 (2026-07-22): recover stale Mini App thread routes'
$StagingDescription = 'Telegram Gmail Versie 1 (2026-07-22) recover stale Mini App thread routes'
$LegacyStagingDescription = 'Telegram Gmail Versie 1 (2026-07-22) cumulative label manager and owner Gmail adapter'
$ProjectRoot = Split-Path -Parent $PSScriptRoot
$SourceMainSha = '3b4c58b65cef0bb438c5763b94c76ea730cec494'
$JournalPath = Join-Path $HOME '.codex\recovery\019f7620-bb25-7bd0-a9ea-9034d55103ac-versie-001-20260722-v59-release.json'

$ExpectedRollbackHashes = @{
  Code='5c6097544cfbc78fc118d851b17fe746f0cde230489d97fb3bab7f3c1fecd1a5'
  MultiAccount='8d07e8b9f0f524ed5cedccbb8bfecbb547c93a34eda8ef876e40776d6b470f10'
  MailClient='ce29a007aa90a4ac367fc0ba930f1ef8ef5dc6fadd1f31ff3201a0d72182ed95'
  MailApp='c190067de229100cb4bc0cf14855e5ab6e0d503d037db14f7d782030ee482c0b'
  appsscript='354ad159bcd81637d9abf7711cfc675b192ac373317744cf90376f7b14f4edc9'
}
$ExpectedRollbackHeadDriftHashes = $ExpectedRollbackHashes.Clone()
$ExpectedLegacyStagingHashes = @{
  Code='0bc1391729c19c7a21f5eb5311b44ab8d1bcad2f4b8955cbe21df6717a270a7d'
  MultiAccount='8d07e8b9f0f524ed5cedccbb8bfecbb547c93a34eda8ef876e40776d6b470f10'
  MailClient='a04b56d4955ba72d46a7fedb7e48b837cd0737da87a6c720281472aa724c5a06'
  MailApp='81562d1bed335aeb1954c09e8e57b96e315b2db3353c16fa1579645ec0d78c4d'
  appsscript='354ad159bcd81637d9abf7711cfc675b192ac373317744cf90376f7b14f4edc9'
}
$ExpectedBaselineHashes = @{
  Code='1dfbad4569d110b97b01fc8d98bb51cb0069e0683daac2a0bbc12a67abd31cb5'
  MultiAccount='524cd5f5e7e57ff2313036da77afc3a57bd03d397e56232e32c2cbf34debaf13'
  MailClient='f3ddbe75dfdae6a4f36a07f1c9eddd9ac556c21069efcffebb89a339680988c7'
  MailApp='3c68f97507461d0ca1c4a11ff9ba55e7b80a421940f415a9a42286c3f33a855f'
  appsscript='354ad159bcd81637d9abf7711cfc675b192ac373317744cf90376f7b14f4edc9'
}
$ExpectedCandidateHashes = @{
  Code='f1476e3e707348737022611c080176a6b8ec69ff088bd8e7c92657328278f5a1'
  MultiAccount='8d07e8b9f0f524ed5cedccbb8bfecbb547c93a34eda8ef876e40776d6b470f10'
  MailClient='a04b56d4955ba72d46a7fedb7e48b837cd0737da87a6c720281472aa724c5a06'
  MailApp='de9bc2b1d7893fd995a4043f945054c8d07a4999bc92074c171ab680a8cc57c7'
  appsscript='354ad159bcd81637d9abf7711cfc675b192ac373317744cf90376f7b14f4edc9'
}
function Get-NormalizedHash([string]$Source) {
  $normalized = $Source.Replace("`r`n", "`n").Replace("`r", "`n")
  [Convert]::ToHexString([Security.Cryptography.SHA256]::HashData(
    [Text.Encoding]::UTF8.GetBytes($normalized)
  )).ToLowerInvariant()
}

function Assert-Hashes($Content, [hashtable]$Expected, [string]$Label) {
  $names = @($Content.files | ForEach-Object name | Sort-Object)
  if (($names -join ',') -ne (@($Expected.Keys | Sort-Object) -join ',')) {
    throw "$Label file set mismatch."
  }
  foreach ($file in $Content.files) {
    if ((Get-NormalizedHash ([string]$file.source)) -ne $Expected[[string]$file.name]) {
      throw "$Label hash mismatch for $($file.name)."
    }
  }
}

function Invoke-GoogleJson {
  param(
    [ValidateSet('GET', 'POST', 'PUT', 'DELETE')][string]$Method,
    [string]$Uri,
    [object]$Body = $null
  )
  if ($PreflightOnly -and $Method -ne 'GET') { throw "Preflight forbids $Method." }
  $params = @{Method=$Method;Uri=$Uri;Headers=@{Authorization="Bearer $script:AccessToken"}}
  if ($null -ne $Body) {
    $params.ContentType = 'application/json; charset=utf-8'
    $params.Body = $Body | ConvertTo-Json -Depth 30 -Compress
  }
  Invoke-RestMethod @params
}

function Get-All([string]$Uri, [string]$Field) {
  $items = @(); $pageToken = ''
  do {
    $suffix = if ($pageToken) { '?pageToken=' + [Uri]::EscapeDataString($pageToken) } else { '' }
    $page = Invoke-GoogleJson GET ($Uri + $suffix)
    $items += @($page.$Field)
    $pageToken = [string]$page.nextPageToken
  } while ($pageToken)
  $items
}

function Get-Immutable([string]$Base, [int]$Version) {
  try { Invoke-GoogleJson GET "$Base/content?versionNumber=$Version" }
  catch { if ([int]$_.Exception.Response.StatusCode -eq 404) { return $null }; throw }
}

function Get-Candidate {
  $files = @(
    @{name='Code';type='SERVER_JS';path='Code.gs'},
    @{name='MultiAccount';type='SERVER_JS';path='MultiAccount.gs'},
    @{name='MailClient';type='SERVER_JS';path='MailClient.gs'},
    @{name='MailApp';type='HTML';path='MailApp.html'},
    @{name='appsscript';type='JSON';path='appsscript.json'}
  ) | ForEach-Object {
    [pscustomobject]@{name=$_.name;type=$_.type;source=Get-Content -Raw -LiteralPath (Join-Path $ProjectRoot $_.path)}
  }
  [pscustomobject]@{files=$files}
}

function Read-Journal {
  if (-not (Test-Path -LiteralPath $JournalPath)) { return $null }
  $journal = Get-Content -Raw -LiteralPath $JournalPath | ConvertFrom-Json
  if ([string]$journal.scriptId -ne $ScriptId -or [string]$journal.sourceMainSha -ne $SourceMainSha -or
      [int]$journal.version -ne $CandidateVersion -or
      [string]$journal.mailAppHash -ne $ExpectedCandidateHashes.MailApp -or
      [string]$journal.mailClientHash -ne $ExpectedCandidateHashes.MailClient) {
    throw 'Release journal mismatch.'
  }
  $journal
}

function Write-Journal([string]$State, [string]$StagingId = '') {
  [ordered]@{scriptId=$ScriptId;sourceMainSha=$SourceMainSha;version=$CandidateVersion;mailAppHash=$ExpectedCandidateHashes.MailApp;
    mailClientHash=$ExpectedCandidateHashes.MailClient;state=$State;stagingDeploymentId=$StagingId;
    updatedAt=(Get-Date).ToString('o')} | ConvertTo-Json | Set-Content -LiteralPath $JournalPath -Encoding utf8
}

function Set-Head([string]$Base, $Content, [hashtable]$Expected, [string]$Label) {
  Invoke-GoogleJson PUT "$Base/content" @{files=@($Content.files)} | Out-Null
  Assert-Hashes (Invoke-GoogleJson GET "$Base/content") $Expected $Label
}

$candidate = Get-Candidate
Assert-Hashes $candidate $ExpectedCandidateHashes 'Local Versie-001 candidate'

$mutex = [Threading.Mutex]::new($false, 'Local\TarasevychGmailNotifierVersie00120260722V59Release')
$held = $false; $script:AccessToken = $null
try {
  $held = $mutex.WaitOne(0)
  if (-not $held) { throw 'Another Versie-001 release process is active.' }
  $clasp = Get-Content -Raw -LiteralPath (Join-Path $HOME '.clasprc.json') | ConvertFrom-Json
  $token = $clasp.tokens.default
  if (-not $token.refresh_token -or -not $token.client_id -or -not $token.client_secret) {
    throw 'Local clasp refresh credentials are incomplete.'
  }
  $refresh = Invoke-RestMethod -Method Post -Uri 'https://oauth2.googleapis.com/token' `
    -ContentType 'application/x-www-form-urlencoded' -Body @{
      client_id=[string]$token.client_id;client_secret=[string]$token.client_secret;
      refresh_token=[string]$token.refresh_token;grant_type='refresh_token'
    }
  $script:AccessToken = [string]$refresh.access_token
  if (-not $script:AccessToken) { throw 'Google access token missing.' }

  $base = "https://script.googleapis.com/v1/projects/$ScriptId"
  $stableUri = "$base/deployments/$StableDeploymentId"
  $stableVersion = [int](Invoke-GoogleJson GET $stableUri).deploymentConfig.versionNumber
  if ($stableVersion -notin @($RollbackVersion, $CandidateVersion)) { throw "Unsupported stable v$stableVersion." }

  $rollbackContent = Get-Immutable $base $RollbackVersion
  if (-not $rollbackContent) { throw "Immutable rollback v$RollbackVersion is missing." }
  Assert-Hashes $rollbackContent $ExpectedRollbackHashes "Immutable v$RollbackVersion"
  $legacyContent = Get-Immutable $base $LegacyStagingVersion
  if (-not $legacyContent) { throw "Required immutable v$LegacyStagingVersion is missing." }
  Assert-Hashes $legacyContent $ExpectedLegacyStagingHashes "Immutable v$LegacyStagingVersion"

  $versions = @(Get-All "$base/versions" 'versions')
  if (@($versions | Where-Object { [int]$_.versionNumber -gt $CandidateVersion }).Count) {
    throw "Future immutable version exists after v$CandidateVersion."
  }
  $immutable = Get-Immutable $base $CandidateVersion
  if ($immutable) { Assert-Hashes $immutable $ExpectedCandidateHashes "Immutable v$CandidateVersion" }

  $head = Invoke-GoogleJson GET "$base/content"
  $headState = 'unknown'
  try { Assert-Hashes $head $ExpectedRollbackHashes 'HEAD'; $headState = "stable_v$RollbackVersion" }
  catch {
    try {
      Assert-Hashes $head $ExpectedRollbackHeadDriftHashes 'HEAD'
      $headState = "stable_v${RollbackVersion}_whitespace_drift"
    } catch {
      try { Assert-Hashes $head $ExpectedBaselineHashes 'HEAD'; $headState = 'baseline_v37' }
      catch { Assert-Hashes $head $ExpectedCandidateHashes 'HEAD'; $headState = "candidate_v$CandidateVersion" }
    }
  }

  $deployments = @(Get-All "$base/deployments" 'deployments')
  $legacyStaging = @($deployments | Where-Object {
    [string]$_.deploymentId -ne $StableDeploymentId -and
    [int]$_.deploymentConfig.versionNumber -eq $LegacyStagingVersion -and
    [string]$_.deploymentConfig.description -eq $LegacyStagingDescription
  })
  $staging = @($deployments | Where-Object {
    [string]$_.deploymentId -ne $StableDeploymentId -and
    [int]$_.deploymentConfig.versionNumber -eq $CandidateVersion -and
    [string]$_.deploymentConfig.description -eq $StagingDescription
  })
  if ($legacyStaging.Count -gt 1 -or $staging.Count -gt 1) { throw 'Multiple guarded staging deployments exist.' }
  $journal = Read-Journal

  if ($PreflightOnly) {
    [ordered]@{ok=$true;stableVersion=$stableVersion;headState=$headState;immutableReady=[bool]$immutable;
      legacyStagingCount=$legacyStaging.Count;stagingCount=$staging.Count;
      readyToStage=($stableVersion -eq $RollbackVersion -and $legacyStaging.Count -le 1 -and $staging.Count -eq 0);
      journalState=if($journal){[string]$journal.state}else{''};candidateHashes=$ExpectedCandidateHashes} |
      ConvertTo-Json -Depth 5
    return
  }

  if ($StageOnly) {
    if ($stableVersion -ne $RollbackVersion) { throw "StageOnly requires stable v$RollbackVersion." }
    # Keep any guarded prior staging until its verified replacement exists.
    try {
      if (-not $immutable) {
        if ($journal -and [string]$journal.state -eq 'version_create_reserved') {
          throw 'Unresolved versions.create; refusing automatic replay.'
        }
        if ($headState -ne "candidate_v$CandidateVersion") {
          Set-Head $base $candidate $ExpectedCandidateHashes 'Uploaded Versie-001 HEAD'
          $headState = "candidate_v$CandidateVersion"
        }
        Write-Journal 'version_create_reserved'
        Invoke-GoogleJson POST "$base/versions" @{description=$ReleaseDescription} | Out-Null
        $immutable = Get-Immutable $base $CandidateVersion
        if (-not $immutable) { throw "Immutable v$CandidateVersion was not observed." }
        Assert-Hashes $immutable $ExpectedCandidateHashes "Created immutable v$CandidateVersion"
        Write-Journal 'version_verified'
      }
      if (-not $staging.Count) {
        $journal = Read-Journal
        if ($journal -and [string]$journal.state -eq 'staging_create_reserved') {
          throw 'Unresolved deployments.create; refusing automatic replay.'
        }
        Write-Journal 'staging_create_reserved'
        Invoke-GoogleJson POST "$base/deployments" @{
          versionNumber=$CandidateVersion;manifestFileName='appsscript';description=$StagingDescription
        } | Out-Null
        $deployments = @(Get-All "$base/deployments" 'deployments')
        $staging = @($deployments | Where-Object {
          [int]$_.deploymentConfig.versionNumber -eq $CandidateVersion -and
          [string]$_.deploymentConfig.description -eq $StagingDescription
        })
      }
      if ($staging.Count -ne 1) { throw 'Versie 1 staging was not verified exactly once.' }
      if ($legacyStaging.Count -eq 1) {
        Invoke-GoogleJson DELETE "$base/deployments/$([string]$legacyStaging[0].deploymentId)" | Out-Null
        $legacyStaging = @()
      }
    } finally {
      Set-Head $base $rollbackContent $ExpectedRollbackHashes "Restored v$RollbackVersion HEAD"
    }
    if ([int](Invoke-GoogleJson GET $stableUri).deploymentConfig.versionNumber -ne $RollbackVersion) {
      throw 'Stable deployment changed during staging.'
    }
    Write-Journal 'staging_verified' ([string]$staging[0].deploymentId)
    [ordered]@{ok=$true;mode='stage';stableVersion=$RollbackVersion;immutableVersion=$CandidateVersion;
      stagingDeploymentId=[string]$staging[0].deploymentId;
      stagingUrl="https://script.google.com/macros/s/$($staging[0].deploymentId)/exec"} | ConvertTo-Json
    return
  }

  if ($Promote) {
    if ($stableVersion -eq $CandidateVersion) {
      [ordered]@{ok=$true;mode='promote';oldVersion=$RollbackVersion;newVersion=$CandidateVersion;alreadyPromoted=$true} | ConvertTo-Json
      return
    }
    if (-not $immutable -or $staging.Count -ne 1 -or -not $journal -or [string]$journal.state -ne 'staging_verified') {
      throw 'Promotion requires exact immutable candidate, one staging deployment, and staging_verified journal.'
    }
    Invoke-GoogleJson PUT $stableUri @{deploymentConfig=@{scriptId=$ScriptId;versionNumber=$CandidateVersion;
      manifestFileName='appsscript';description=$ReleaseDescription}} | Out-Null
    if ([int](Invoke-GoogleJson GET $stableUri).deploymentConfig.versionNumber -ne $CandidateVersion) {
      throw 'Stable deployment did not advance to the candidate.'
    }
    Write-Journal 'promoted' ([string]$staging[0].deploymentId)
    [ordered]@{ok=$true;mode='promote';oldVersion=$RollbackVersion;newVersion=$CandidateVersion;deploymentId=$StableDeploymentId} | ConvertTo-Json
    return
  }

  if ($CleanupStaging) {
    if ($stableVersion -ne $CandidateVersion -or -not $immutable) { throw 'Cleanup requires stable exact Versie-001.' }
    if ($staging.Count -eq 1) {
      Write-Journal 'cleanup_delete_reserved' ([string]$staging[0].deploymentId)
      Invoke-GoogleJson DELETE "$base/deployments/$($staging[0].deploymentId)" | Out-Null
    }
    Set-Head $base $candidate $ExpectedCandidateHashes "Final v$CandidateVersion HEAD"
    Write-Journal 'cleaned'
    [ordered]@{ok=$true;mode='cleanup';stableVersion=$CandidateVersion;stagingRemoved=$true} | ConvertTo-Json
    return
  }

  if ($stableVersion -ne $CandidateVersion -or -not $immutable) { throw 'Rollback requires stable exact Versie-001.' }
  Invoke-GoogleJson PUT $stableUri @{deploymentConfig=@{scriptId=$ScriptId;versionNumber=$RollbackVersion;
    manifestFileName='appsscript';description='Rollback to verified Telegram Gmail Versie 1 Apps Script v57'}} | Out-Null
  Set-Head $base $rollbackContent $ExpectedRollbackHashes "Rolled back v$RollbackVersion HEAD"
  if ([int](Invoke-GoogleJson GET $stableUri).deploymentConfig.versionNumber -ne $RollbackVersion) {
    throw 'Rollback deployment did not verify.'
  }
  Write-Journal 'rolled_back' $(if($staging.Count){[string]$staging[0].deploymentId}else{''})
  [ordered]@{ok=$true;mode='rollback';fromVersion=$CandidateVersion;toVersion=$RollbackVersion;stagingPreserved=($staging.Count -eq 1)} | ConvertTo-Json
} finally {
  $script:AccessToken=$null; $refresh=$null; $token=$null; $clasp=$null
  if ($held) { $mutex.ReleaseMutex() }
  $mutex.Dispose()
}


