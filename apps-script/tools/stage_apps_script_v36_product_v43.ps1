#Requires -Version 7.0

[CmdletBinding()]
param(
  [switch]$PreflightOnly,
  [switch]$StageOnly,
  [switch]$CleanupStaging
)

$ErrorActionPreference = 'Stop'
$ProgressPreference = 'SilentlyContinue'
if (@($PreflightOnly, $StageOnly, $CleanupStaging | Where-Object { $_ }).Count -ne 1) {
  throw 'Choose exactly one mode.'
}

$ScriptId = '1Lxm-LJsGCRAz_LO0EjSlXnikx0oDioX6CdmiMhyLRmAAJ1fCk63S_1mS'
$StableDeploymentId = 'AKfycbwQkmQIIsboUayMhWdv_DzGj_gbERMKdWEpUVUpIjvwTaIjyjyLaBWUmw1g3lFWFV3Z'
$StableVersion = 35
$CandidateVersion = 36
$VersionDescription = 'Telegram Gmail product v43: adaptive information density test'
$StagingDescription = 'Telegram Gmail product v43 isolated staging'
$ProjectRoot = Split-Path -Parent $PSScriptRoot
$JournalPath = Join-Path $HOME '.codex\recovery\019f5d65-8209-7a00-b915-4a522dbcb612-v43-staging.json'

$ExpectedStableHashes = @{
  Code='8f0136d0531ce7be3dc789a5c154db3e76da6c38f754708f05dc61ae250365ad'
  MultiAccount='524cd5f5e7e57ff2313036da77afc3a57bd03d397e56232e32c2cbf34debaf13'
  MailClient='2a1b05ebe80d8c0b8c732e0a8960fc08fa3e973f14c95ff57d81f49510633eb9'
  MailApp='adec7fa4604c52300b6264a32205b3f13604263537fd38e9d9c23919a26e41c1'
  appsscript='354ad159bcd81637d9abf7711cfc675b192ac373317744cf90376f7b14f4edc9'
}
$ExpectedCandidateHashes = @{
  Code='a767e717d17a1d50a3ecd373078bef59782f8fa7293d0b61787dae0aeac70b3e'
  MultiAccount='524cd5f5e7e57ff2313036da77afc3a57bd03d397e56232e32c2cbf34debaf13'
  MailClient='e07d5af2354b243631b5218aa4582379ccb87ff0966c56d52cd772be6e29c0fc'
  MailApp='705080e90db5b3ad5c050a8a77964957335456eff18df43d194efe146c115f14'
  appsscript='354ad159bcd81637d9abf7711cfc675b192ac373317744cf90376f7b14f4edc9'
}

function Get-NormalizedHash([string]$Source) {
  $normalized = $Source.Replace("`r`n", "`n").Replace("`r", "`n")
  [Convert]::ToHexString(
    [Security.Cryptography.SHA256]::HashData([Text.Encoding]::UTF8.GetBytes($normalized))
  ).ToLowerInvariant()
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

function Invoke-GoogleJson([string]$Method, [string]$Uri, [object]$Body = $null) {
  if ($PreflightOnly -and $Method -ne 'GET') { throw "Preflight forbids $Method." }
  $params = @{ Method=$Method; Uri=$Uri; Headers=@{ Authorization="Bearer $script:AccessToken" } }
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
  catch {
    if ([int]$_.Exception.Response.StatusCode -eq 404) { return $null }
    throw
  }
}

function Get-Candidate {
  $files = @(
    @{name='Code';type='SERVER_JS';path='Code.gs'},
    @{name='MultiAccount';type='SERVER_JS';path='MultiAccount.gs'},
    @{name='MailClient';type='SERVER_JS';path='MailClient.gs'},
    @{name='MailApp';type='HTML';path='MailApp.html'},
    @{name='appsscript';type='JSON';path='appsscript.json'}
  ) | ForEach-Object {
    [pscustomobject]@{
      name=$_.name
      type=$_.type
      source=Get-Content -Raw -LiteralPath (Join-Path $ProjectRoot $_.path)
    }
  }
  [pscustomobject]@{files=$files}
}

function Read-Journal {
  if (-not (Test-Path -LiteralPath $JournalPath)) { return $null }
  $journal = Get-Content -Raw -LiteralPath $JournalPath | ConvertFrom-Json
  if ([string]$journal.scriptId -ne $ScriptId -or [int]$journal.version -ne $CandidateVersion -or
      [string]$journal.mailAppHash -ne $ExpectedCandidateHashes.MailApp -or
      [string]$journal.mailClientHash -ne $ExpectedCandidateHashes.MailClient) {
    throw 'Staging journal mismatch.'
  }
  $journal
}

function Write-Journal([string]$State, [string]$StagingId = '') {
  [ordered]@{
    scriptId=$ScriptId
    version=$CandidateVersion
    mailAppHash=$ExpectedCandidateHashes.MailApp
    mailClientHash=$ExpectedCandidateHashes.MailClient
    state=$State
    stagingDeploymentId=$StagingId
    updatedAt=(Get-Date).ToString('o')
  } | ConvertTo-Json | Set-Content -LiteralPath $JournalPath -Encoding utf8
}

function Restore-StableHead([string]$Base, $StableContent) {
  $current = Invoke-GoogleJson GET "$Base/content"
  try {
    Assert-Hashes $current $ExpectedStableHashes 'HEAD restore check'
    return
  } catch {
    Assert-Hashes $current $ExpectedCandidateHashes 'HEAD restore candidate check'
  }
  Invoke-GoogleJson PUT "$Base/content" @{files=@($StableContent.files)} | Out-Null
  Assert-Hashes (Invoke-GoogleJson GET "$Base/content") $ExpectedStableHashes 'Restored v35 HEAD'
}

$mutex = [Threading.Mutex]::new($false, 'Local\TarasevychGmailNotifierAppsScriptV43Staging')
$held = $false
$script:AccessToken = $null
try {
  $held = $mutex.WaitOne(0)
  if (-not $held) { throw 'Another v43 staging process is active.' }

  $clasp = Get-Content -Raw -LiteralPath (Join-Path $HOME '.clasprc.json') | ConvertFrom-Json
  $token = $clasp.tokens.default
  $refresh = Invoke-RestMethod -Method Post -Uri 'https://oauth2.googleapis.com/token' `
    -ContentType 'application/x-www-form-urlencoded' -Body @{
      client_id=[string]$token.client_id
      client_secret=[string]$token.client_secret
      refresh_token=[string]$token.refresh_token
      grant_type='refresh_token'
    }
  $script:AccessToken = [string]$refresh.access_token
  if (-not $script:AccessToken) { throw 'Google access token missing.' }

  $base = "https://script.googleapis.com/v1/projects/$ScriptId"
  $stableUri = "$base/deployments/$StableDeploymentId"
  $candidate = Get-Candidate
  Assert-Hashes $candidate $ExpectedCandidateHashes 'Local v43 candidate'

  $stableDeployment = Invoke-GoogleJson GET $stableUri
  $stableVersion = [int]$stableDeployment.deploymentConfig.versionNumber
  if ($stableVersion -ne $StableVersion) { throw "Stable must remain exact v$StableVersion, found v$stableVersion." }

  $stableContent = Get-Immutable $base $StableVersion
  if (-not $stableContent) { throw "Immutable v$StableVersion is missing." }
  Assert-Hashes $stableContent $ExpectedStableHashes "Immutable v$StableVersion"

  $versions = @(Get-All "$base/versions" 'versions')
  if (@($versions | Where-Object { [int]$_.versionNumber -gt $CandidateVersion }).Count) {
    throw 'A future immutable version exists; refusing this staging lane.'
  }

  $immutable = Get-Immutable $base $CandidateVersion
  if ($immutable) { Assert-Hashes $immutable $ExpectedCandidateHashes "Immutable v$CandidateVersion" }

  $head = Invoke-GoogleJson GET "$base/content"
  $headState = 'unknown'
  try { Assert-Hashes $head $ExpectedStableHashes 'HEAD'; $headState = "stable_v$StableVersion" }
  catch { Assert-Hashes $head $ExpectedCandidateHashes 'HEAD'; $headState = "candidate_v$CandidateVersion" }

  $deployments = @(Get-All "$base/deployments" 'deployments')
  $staging = @($deployments | Where-Object {
    [string]$_.deploymentId -ne $StableDeploymentId -and
    [int]$_.deploymentConfig.versionNumber -eq $CandidateVersion -and
    [string]$_.deploymentConfig.description -eq $StagingDescription
  })
  if ($staging.Count -gt 1) { throw 'Multiple v43 staging deployments exist.' }
  $journal = Read-Journal

  if ($PreflightOnly) {
    [ordered]@{
      ok=$true
      stableVersion=$stableVersion
      stableDeploymentId=$StableDeploymentId
      headState=$headState
      immutableReady=[bool]$immutable
      stagingCount=$staging.Count
      stagingDeploymentId=if($staging.Count){[string]$staging[0].deploymentId}else{''}
      journalState=if($journal){[string]$journal.state}else{''}
      candidateHashes=$ExpectedCandidateHashes
    } | ConvertTo-Json -Depth 5
    return
  }

  if ($StageOnly) {
    try {
      if (-not $immutable) {
        if ($journal -and [string]$journal.state -eq 'version_create_reserved') {
          throw 'Unresolved versions.create; refusing automatic replay.'
        }
        if ($headState -ne "candidate_v$CandidateVersion") {
          Invoke-GoogleJson PUT "$base/content" @{files=@($candidate.files)} | Out-Null
          Assert-Hashes (Invoke-GoogleJson GET "$base/content") $ExpectedCandidateHashes 'Uploaded v43 HEAD'
          $headState = "candidate_v$CandidateVersion"
        }
        Write-Journal 'version_create_reserved'
        Invoke-GoogleJson POST "$base/versions" @{description=$VersionDescription} | Out-Null
        $immutable = Get-Immutable $base $CandidateVersion
        if (-not $immutable) { throw "Immutable v$CandidateVersion was not observed." }
        Assert-Hashes $immutable $ExpectedCandidateHashes "Created immutable v$CandidateVersion"
        Write-Journal 'version_verified'
      }

      if (-not $staging.Count) {
        $journal = Read-Journal
        $stageJournalState = if ($journal) { [string]$journal.state } else { '' }
        if ($stageJournalState -eq 'staging_create_reserved') {
          throw 'Unresolved deployments.create; refusing automatic replay.'
        }
        if ($stageJournalState -in @('staging_verified', 'cleanup_delete_reserved', 'cleaned')) {
          throw 'This v43 staging lane was already created or cleaned and cannot be recreated.'
        }
        if ($stageJournalState -notin @('', 'version_create_reserved', 'version_verified')) {
          throw 'Unexpected staging journal state.'
        }
        Write-Journal 'staging_create_reserved'
        Invoke-GoogleJson POST "$base/deployments" @{
          versionNumber=$CandidateVersion
          manifestFileName='appsscript'
          description=$StagingDescription
        } | Out-Null
        $deployments = @(Get-All "$base/deployments" 'deployments')
        $staging = @($deployments | Where-Object {
          [string]$_.deploymentId -ne $StableDeploymentId -and
          [int]$_.deploymentConfig.versionNumber -eq $CandidateVersion -and
          [string]$_.deploymentConfig.description -eq $StagingDescription
        })
      }
      if ($staging.Count -ne 1) { throw 'Staging v43 was not verified exactly once.' }
    } catch {
      Restore-StableHead $base $stableContent
      $headState = "stable_v$StableVersion"
      throw
    }

    Restore-StableHead $base $stableContent
    $headState = "stable_v$StableVersion"
    if ([int](Invoke-GoogleJson GET $stableUri).deploymentConfig.versionNumber -ne $StableVersion) {
      throw 'Stable deployment changed during staging.'
    }

    Write-Journal 'staging_verified' ([string]$staging[0].deploymentId)
    [ordered]@{
      ok=$true
      mode='stage'
      stableVersion=$StableVersion
      immutableVersion=$CandidateVersion
      headState=$headState
      stagingDeploymentId=[string]$staging[0].deploymentId
      stagingUrl="https://script.google.com/macros/s/$($staging[0].deploymentId)/exec"
    } | ConvertTo-Json
    return
  }

  if (-not $immutable) { throw 'Cleanup requires exact immutable v36.' }
  $journalState = if ($journal) { [string]$journal.state } else { '' }
  if ($staging.Count -eq 0 -and $journalState -notin @('staging_verified', 'cleanup_delete_reserved', 'cleaned')) {
    throw 'No matching staging deployment or resumable cleanup journal exists.'
  }
  Restore-StableHead $base $stableContent
  $headState = "stable_v$StableVersion"
  if ($staging.Count -eq 1) {
    Write-Journal 'cleanup_delete_reserved' ([string]$staging[0].deploymentId)
    Invoke-GoogleJson DELETE "$base/deployments/$($staging[0].deploymentId)" | Out-Null
    $deployments = @(Get-All "$base/deployments" 'deployments')
    $remaining = @($deployments | Where-Object {
      [string]$_.deploymentId -eq [string]$staging[0].deploymentId
    })
    if ($remaining.Count) { throw 'Staging deployment still exists after cleanup.' }
  }
  if ([int](Invoke-GoogleJson GET $stableUri).deploymentConfig.versionNumber -ne $StableVersion) {
    throw 'Stable deployment changed during cleanup.'
  }
  Write-Journal 'cleaned'
  [ordered]@{ok=$true;mode='cleanup';stableVersion=$StableVersion;stagingRemoved=$true} |
    ConvertTo-Json
} finally {
  $script:AccessToken = $null
  $refresh = $null
  $token = $null
  $clasp = $null
  if ($held) { $mutex.ReleaseMutex() }
  $mutex.Dispose()
}
