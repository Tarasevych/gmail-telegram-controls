#Requires -Version 7.0

[CmdletBinding()]
param(
  [switch]$PreflightOnly,
  [switch]$StageOnly,
  [switch]$Promote,
  [switch]$CleanupStaging
)

$ErrorActionPreference = 'Stop'
$ProgressPreference = 'SilentlyContinue'
if (@($PreflightOnly, $StageOnly, $Promote, $CleanupStaging | Where-Object { $_ }).Count -ne 1) {
  throw 'Choose exactly one mode.'
}

$ScriptId = '1Lxm-LJsGCRAz_LO0EjSlXnikx0oDioX6CdmiMhyLRmAAJ1fCk63S_1mS'
$StableDeploymentId = 'AKfycbwQkmQIIsboUayMhWdv_DzGj_gbERMKdWEpUVUpIjvwTaIjyjyLaBWUmw1g3lFWFV3Z'
$ExpectedOldVersion = 34
$ExpectedNewVersion = 35
$ReleaseDescription = 'Telegram Gmail product v38.3: exact current-session logout'
$StagingDescription = 'Telegram Gmail product v38.3 session logout staging'
$ProjectRoot = Split-Path -Parent $PSScriptRoot
$JournalPath = Join-Path $HOME '.codex\recovery\019f5d65-8209-7a00-b915-4a522dbcb612-v35-session-logout-release.json'

$ExpectedOldHashes = @{
  Code='8f0136d0531ce7be3dc789a5c154db3e76da6c38f754708f05dc61ae250365ad'
  MultiAccount='524cd5f5e7e57ff2313036da77afc3a57bd03d397e56232e32c2cbf34debaf13'
  MailClient='6114e89601899ca0c83f017354302569885af78078e9bb5e63d088ca09f5e6a5'
  MailApp='d6d64a860392a4932ab7691dad81c0fbd667fd1251de457355b553334f458f67'
  appsscript='354ad159bcd81637d9abf7711cfc675b192ac373317744cf90376f7b14f4edc9'
}
$ExpectedCandidateHashes = @{
  Code='8f0136d0531ce7be3dc789a5c154db3e76da6c38f754708f05dc61ae250365ad'
  MultiAccount='524cd5f5e7e57ff2313036da77afc3a57bd03d397e56232e32c2cbf34debaf13'
  MailClient='2a1b05ebe80d8c0b8c732e0a8960fc08fa3e973f14c95ff57d81f49510633eb9'
  MailApp='adec7fa4604c52300b6264a32205b3f13604263537fd38e9d9c23919a26e41c1'
  appsscript='354ad159bcd81637d9abf7711cfc675b192ac373317744cf90376f7b14f4edc9'
}

function Get-Hash([string]$Source) {
  $normalized = $Source.Replace("`r`n", "`n").Replace("`r", "`n")
  return [Convert]::ToHexString([Security.Cryptography.SHA256]::HashData([Text.Encoding]::UTF8.GetBytes($normalized))).ToLowerInvariant()
}

function Assert-Hashes($Content, [hashtable]$Expected, [string]$Label) {
  $names = @($Content.files | ForEach-Object name | Sort-Object)
  if (($names -join ',') -ne (@($Expected.Keys | Sort-Object) -join ',')) { throw "$Label file set mismatch." }
  foreach ($file in $Content.files) {
    if ((Get-Hash ([string]$file.source)) -ne $Expected[[string]$file.name]) {
      throw "$Label hash mismatch for $($file.name)."
    }
  }
}

function Invoke-GoogleJson([string]$Method, [string]$Uri, [object]$Body = $null) {
  if ($PreflightOnly -and $Method -ne 'GET') { throw "Preflight forbids $Method." }
  $params = @{Method=$Method;Uri=$Uri;Headers=@{Authorization="Bearer $script:AccessToken"}}
  if ($null -ne $Body) {
    $params.ContentType = 'application/json; charset=utf-8'
    $params.Body = $Body | ConvertTo-Json -Depth 30 -Compress
  }
  Invoke-RestMethod @params
}

function Get-All([string]$Uri, [string]$Field) {
  $items = @(); $token = ''
  do {
    $page = Invoke-GoogleJson GET ($Uri + $(if ($token) {'?pageToken=' + [Uri]::EscapeDataString($token)} else {''}))
    $items += @($page.$Field); $token = [string]$page.nextPageToken
  } while ($token)
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
  $j = Get-Content -Raw -LiteralPath $JournalPath | ConvertFrom-Json
  if ([string]$j.scriptId -ne $ScriptId -or [int]$j.version -ne $ExpectedNewVersion -or
      [string]$j.mailAppHash -ne $ExpectedCandidateHashes.MailApp -or
      [string]$j.mailClientHash -ne $ExpectedCandidateHashes.MailClient) { throw 'Release journal mismatch.' }
  $j
}

function Write-Journal([string]$State, [string]$StagingId = '') {
  [ordered]@{scriptId=$ScriptId;version=$ExpectedNewVersion;mailAppHash=$ExpectedCandidateHashes.MailApp;
    mailClientHash=$ExpectedCandidateHashes.MailClient;state=$State;stagingDeploymentId=$StagingId;
    updatedAt=(Get-Date).ToString('o')} | ConvertTo-Json | Set-Content -LiteralPath $JournalPath -Encoding utf8
}

$mutex = [Threading.Mutex]::new($false, 'Local\TarasevychGmailNotifierAppsScriptV35SessionLogoutRelease')
$held = $false; $script:AccessToken = $null
try {
  $held = $mutex.WaitOne(0)
  if (-not $held) { throw 'Another v35 release process is active.' }
  $clasp = Get-Content -Raw -LiteralPath (Join-Path $HOME '.clasprc.json') | ConvertFrom-Json
  $token = $clasp.tokens.default
  $refresh = Invoke-RestMethod -Method Post -Uri 'https://oauth2.googleapis.com/token' -ContentType 'application/x-www-form-urlencoded' -Body @{
    client_id=[string]$token.client_id;client_secret=[string]$token.client_secret;
    refresh_token=[string]$token.refresh_token;grant_type='refresh_token'
  }
  $script:AccessToken = [string]$refresh.access_token
  if (-not $script:AccessToken) { throw 'Google access token missing.' }

  $base = "https://script.googleapis.com/v1/projects/$ScriptId"
  $stableUri = "$base/deployments/$StableDeploymentId"
  $candidate = Get-Candidate
  Assert-Hashes $candidate $ExpectedCandidateHashes 'Local candidate'
  $stableVersion = [int](Invoke-GoogleJson GET $stableUri).deploymentConfig.versionNumber
  if ($stableVersion -notin @($ExpectedOldVersion, $ExpectedNewVersion)) { throw "Unsupported stable v$stableVersion." }
  Assert-Hashes (Invoke-GoogleJson GET "$base/content?versionNumber=$ExpectedOldVersion") $ExpectedOldHashes 'Immutable v34'
  $versions = @(Get-All "$base/versions" 'versions')
  if (@($versions | Where-Object {[int]$_.versionNumber -gt $ExpectedNewVersion}).Count) { throw 'Future immutable version exists.' }
  $immutable = Get-Immutable $base $ExpectedNewVersion
  if ($immutable) { Assert-Hashes $immutable $ExpectedCandidateHashes 'Immutable v35' }
  $head = Invoke-GoogleJson GET "$base/content"
  $headState = 'unknown'
  try { Assert-Hashes $head $ExpectedOldHashes 'HEAD'; $headState='stable_v34' }
  catch { Assert-Hashes $head $ExpectedCandidateHashes 'HEAD'; $headState='candidate_v35' }
  $deployments = @(Get-All "$base/deployments" 'deployments')
  $staging = @($deployments | Where-Object {
    [string]$_.deploymentId -ne $StableDeploymentId -and [int]$_.deploymentConfig.versionNumber -eq $ExpectedNewVersion -and
    [string]$_.deploymentConfig.description -eq $StagingDescription
  })
  if ($staging.Count -gt 1) { throw 'Multiple v35 staging deployments exist.' }
  $journal = Read-Journal

  if ($PreflightOnly) {
    [ordered]@{ok=$true;stableVersion=$stableVersion;headState=$headState;immutableReady=[bool]$immutable;
      stagingCount=$staging.Count;journalState=if($journal){$journal.state}else{''};candidateHashes=$ExpectedCandidateHashes} |
      ConvertTo-Json -Depth 5
    return
  }

  if ($StageOnly) {
    if ($stableVersion -ne $ExpectedOldVersion) { throw 'StageOnly requires stable v34.' }
    if (-not $immutable) {
      if ($journal -and [string]$journal.state -eq 'version_create_reserved') { throw 'Unresolved versions.create; refusing retry.' }
      if ($headState -ne 'candidate_v35') {
        Invoke-GoogleJson PUT "$base/content" @{files=@($candidate.files)} | Out-Null
        Assert-Hashes (Invoke-GoogleJson GET "$base/content") $ExpectedCandidateHashes 'Uploaded HEAD'
      }
      Write-Journal 'version_create_reserved'
      Invoke-GoogleJson POST "$base/versions" @{description=$ReleaseDescription} | Out-Null
      $immutable = Get-Immutable $base $ExpectedNewVersion
      if (-not $immutable) { throw 'Immutable v35 not observed.' }
      Assert-Hashes $immutable $ExpectedCandidateHashes 'Created immutable v35'
      Write-Journal 'version_verified'
    }
    if (-not $staging.Count) {
      $journal = Read-Journal
      if ($journal -and [string]$journal.state -eq 'staging_create_reserved') { throw 'Unresolved deployments.create; refusing retry.' }
      Write-Journal 'staging_create_reserved'
      Invoke-GoogleJson POST "$base/deployments" @{versionNumber=$ExpectedNewVersion;manifestFileName='appsscript';description=$StagingDescription} | Out-Null
      $deployments = @(Get-All "$base/deployments" 'deployments')
      $staging = @($deployments | Where-Object {[int]$_.deploymentConfig.versionNumber -eq $ExpectedNewVersion -and
        [string]$_.deploymentConfig.description -eq $StagingDescription})
    }
    if ($staging.Count -ne 1) { throw 'Staging v35 not verified exactly once.' }
    if ([int](Invoke-GoogleJson GET $stableUri).deploymentConfig.versionNumber -ne $ExpectedOldVersion) { throw 'Stable changed during staging.' }
    Write-Journal 'staging_verified' ([string]$staging[0].deploymentId)
    [ordered]@{ok=$true;mode='stage';stableVersion=$ExpectedOldVersion;immutableVersion=$ExpectedNewVersion;
      stagingDeploymentId=[string]$staging[0].deploymentId;stagingUrl="https://script.google.com/macros/s/$($staging[0].deploymentId)/exec"} |
      ConvertTo-Json
    return
  }

  if ($Promote) {
    if (-not $immutable -or $staging.Count -ne 1 -or -not $journal -or [string]$journal.state -ne 'staging_verified') {
      throw 'Cannot promote without exact immutable v35, one staging deployment, and verified journal.'
    }
    if ($stableVersion -eq $ExpectedOldVersion) {
      Invoke-GoogleJson PUT $stableUri @{deploymentConfig=@{scriptId=$ScriptId;versionNumber=$ExpectedNewVersion;
        manifestFileName='appsscript';description=$ReleaseDescription}} | Out-Null
    }
    if ([int](Invoke-GoogleJson GET $stableUri).deploymentConfig.versionNumber -ne $ExpectedNewVersion) { throw 'Stable did not advance to v35.' }
    Write-Journal 'promoted' ([string]$staging[0].deploymentId)
    [ordered]@{ok=$true;mode='promote';oldVersion=$ExpectedOldVersion;newVersion=$ExpectedNewVersion;deploymentId=$StableDeploymentId} |
      ConvertTo-Json
    return
  }

  if ($stableVersion -ne $ExpectedNewVersion -or $staging.Count -ne 1) { throw 'Cleanup requires stable v35 and one staging deployment.' }
  Invoke-GoogleJson DELETE "$base/deployments/$($staging[0].deploymentId)" | Out-Null
  Write-Journal 'cleaned'
  [ordered]@{ok=$true;mode='cleanup';stableVersion=$ExpectedNewVersion;stagingRemoved=$true} | ConvertTo-Json
} finally {
  $script:AccessToken=$null; $refresh=$null; $token=$null; $clasp=$null
  if ($held) { $mutex.ReleaseMutex() }
  $mutex.Dispose()
}
