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
$ExpectedOldVersion = 32
$ExpectedPreviousVersion = 31
$ExpectedNewVersion = 33
$ReleaseDescription = 'Telegram Gmail product v38.1: owner-only session capacity recovery'
$StagingDescription = 'Telegram Gmail product v38.1 session hotfix staging'
$ProjectRoot = Split-Path -Parent $PSScriptRoot
$JournalPath = Join-Path $HOME '.codex\recovery\019f5d65-8209-7a00-b915-4a522dbcb612-v33-product-v38-session-hotfix-release.json'

$ExpectedOldHashes = @{
  Code='9d11455cab5686b44827da830cf19e2c2acbf1070f66ffc13cb704a1cc40e7e7'
  MultiAccount='524cd5f5e7e57ff2313036da77afc3a57bd03d397e56232e32c2cbf34debaf13'
  MailClient='6a46e71d06bb9072c7281d0c830f5ce0c0f482fce7584fc48aa9ddfdc54e5d6c'
  MailApp='c7039062544132c67f555c1b07627dbe9fb2fe636d338e239d102eb3def7212c'
  appsscript='354ad159bcd81637d9abf7711cfc675b192ac373317744cf90376f7b14f4edc9'
}
$ExpectedPreviousHashes = @{
  Code='9d11455cab5686b44827da830cf19e2c2acbf1070f66ffc13cb704a1cc40e7e7'
  MultiAccount='524cd5f5e7e57ff2313036da77afc3a57bd03d397e56232e32c2cbf34debaf13'
  MailClient='6a46e71d06bb9072c7281d0c830f5ce0c0f482fce7584fc48aa9ddfdc54e5d6c'
  MailApp='96a92d849b41e93904932d113ed13c1e7c6670c9b2c624631720709726d3bd81'
  appsscript='354ad159bcd81637d9abf7711cfc675b192ac373317744cf90376f7b14f4edc9'
}
$ExpectedCandidateHashes = @{
  Code='8f0136d0531ce7be3dc789a5c154db3e76da6c38f754708f05dc61ae250365ad'
  MultiAccount='524cd5f5e7e57ff2313036da77afc3a57bd03d397e56232e32c2cbf34debaf13'
  MailClient='097c5698886400bfc8b6e59edc9a11d5b011494887243668b07a132b40ad013f'
  MailApp='d6d64a860392a4932ab7691dad81c0fbd667fd1251de457355b553334f458f67'
  appsscript='354ad159bcd81637d9abf7711cfc675b192ac373317744cf90376f7b14f4edc9'
}

function Get-Hash([string]$Source) {
  $normalized = $Source.Replace("`r`n", "`n").Replace("`r", "`n")
  $bytes = [Text.Encoding]::UTF8.GetBytes($normalized)
  return [Convert]::ToHexString([Security.Cryptography.SHA256]::HashData($bytes)).ToLowerInvariant()
}

function Assert-Hashes($Content, [hashtable]$Expected, [string]$Label) {
  $names = @($Content.files | ForEach-Object name | Sort-Object)
  if (($names -join ',') -ne (@($Expected.Keys | Sort-Object) -join ',')) {
    throw "$Label file set mismatch."
  }
  foreach ($file in $Content.files) {
    $actual = Get-Hash ([string]$file.source)
    if ($actual -ne $Expected[[string]$file.name]) { throw "$Label hash mismatch for $($file.name)." }
  }
}

function Invoke-GoogleJson([string]$Method, [string]$Uri, [object]$Body = $null) {
  if ($PreflightOnly -and $Method -ne 'GET') { throw "Preflight forbids $Method." }
  $params = @{ Method=$Method; Uri=$Uri; Headers=@{Authorization="Bearer $script:AccessToken"} }
  if ($null -ne $Body) {
    $params.ContentType = 'application/json; charset=utf-8'
    $params.Body = $Body | ConvertTo-Json -Depth 30 -Compress
  }
  return Invoke-RestMethod @params
}

function Get-All([string]$Uri, [string]$Field) {
  $items = @(); $token = ''
  do {
    $pageUri = $Uri + $(if ($token) { '?pageToken=' + [Uri]::EscapeDataString($token) } else { '' })
    $page = Invoke-GoogleJson GET $pageUri
    $items += @($page.$Field)
    $token = [string]$page.nextPageToken
  } while ($token)
  return $items
}

function Get-Immutable([string]$Base, [int]$Version) {
  try { return Invoke-GoogleJson GET "$Base/content?versionNumber=$Version" }
  catch { if ([int]$_.Exception.Response.StatusCode -eq 404) { return $null }; throw }
}

function Get-Candidate {
  $files = @(
    @{name='Code';type='SERVER_JS';path='Code.gs'},
    @{name='MultiAccount';type='SERVER_JS';path='MultiAccount.gs'},
    @{name='MailClient';type='SERVER_JS';path='MailClient.gs'},
    @{name='MailApp';type='HTML';path='MailApp.html'},
    @{name='appsscript';type='JSON';path='appsscript.json'}
  ) | ForEach-Object { [pscustomobject]@{ name=$_.name; type=$_.type; source=Get-Content -Raw -LiteralPath (Join-Path $ProjectRoot $_.path) } }
  return [pscustomobject]@{ files=$files }
}

function Read-Journal {
  if (-not (Test-Path -LiteralPath $JournalPath)) { return $null }
  $j = Get-Content -Raw -LiteralPath $JournalPath | ConvertFrom-Json
  if ([string]$j.scriptId -ne $ScriptId -or [int]$j.version -ne $ExpectedNewVersion -or
      [string]$j.candidateMailAppHash -ne $ExpectedCandidateHashes.MailApp) { throw 'Release journal mismatch.' }
  return $j
}

function Write-Journal([string]$State, [string]$StagingId = '') {
  [ordered]@{scriptId=$ScriptId;version=$ExpectedNewVersion;candidateMailAppHash=$ExpectedCandidateHashes.MailApp;
    state=$State;stagingDeploymentId=$StagingId;updatedAt=(Get-Date).ToString('o')} |
    ConvertTo-Json | Set-Content -LiteralPath $JournalPath -Encoding utf8
}

$mutex = [Threading.Mutex]::new($false, 'Local\TarasevychGmailNotifierAppsScriptV33ProductV38SessionHotfixRelease')
$mutexHeld = $false
$script:AccessToken = $null
try {
  $mutexHeld = $mutex.WaitOne(0)
  if (-not $mutexHeld) { throw 'Another v33 release process is active.' }
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
  $stable = Invoke-GoogleJson GET $stableUri
  $stableVersion = [int]$stable.deploymentConfig.versionNumber
  if ($stableVersion -notin @($ExpectedOldVersion, $ExpectedNewVersion)) { throw "Unsupported stable v$stableVersion." }
  Assert-Hashes (Invoke-GoogleJson GET "$base/content?versionNumber=$ExpectedOldVersion") $ExpectedOldHashes 'Immutable v32'
  Assert-Hashes (Invoke-GoogleJson GET "$base/content?versionNumber=$ExpectedPreviousVersion") $ExpectedPreviousHashes 'Immutable v31'
  $versions = @(Get-All "$base/versions" 'versions')
  if (@($versions | Where-Object {[int]$_.versionNumber -gt $ExpectedNewVersion}).Count) { throw 'Future immutable version exists.' }
  $immutable = Get-Immutable $base $ExpectedNewVersion
  if ($immutable) { Assert-Hashes $immutable $ExpectedCandidateHashes 'Immutable v33' }
  $head = Invoke-GoogleJson GET "$base/content"
  $headState = 'unknown'
  try { Assert-Hashes $head $ExpectedOldHashes 'HEAD'; $headState='stable_v32' }
  catch { Assert-Hashes $head $ExpectedCandidateHashes 'HEAD'; $headState='candidate_v33' }
  $deployments = @(Get-All "$base/deployments" 'deployments')
  $staging = @($deployments | Where-Object {
    [string]$_.deploymentId -ne $StableDeploymentId -and [int]$_.deploymentConfig.versionNumber -eq 33 -and
    [string]$_.deploymentConfig.description -eq $StagingDescription
  })
  if ($staging.Count -gt 1) { throw 'Multiple v33 staging deployments exist.' }
  $journal = Read-Journal

  if ($PreflightOnly) {
    [ordered]@{ok=$true;stableVersion=$stableVersion;headState=$headState;immutableReady=[bool]$immutable;
      stagingCount=$staging.Count;journalState=if($journal){$journal.state}else{''};candidateHashes=$ExpectedCandidateHashes} |
      ConvertTo-Json -Depth 5
    return
  }

  if ($StageOnly) {
    if ($stableVersion -ne 32) { throw 'StageOnly requires stable v32.' }
    if (-not $immutable) {
      if ($journal -and [string]$journal.state -eq 'version_create_reserved') {
        throw 'Prior immutable create outcome is unresolved; refusing another versions.create.'
      }
      if ($headState -ne 'candidate_v33') {
        Invoke-GoogleJson PUT "$base/content" @{files=@($candidate.files)} | Out-Null
        Assert-Hashes (Invoke-GoogleJson GET "$base/content") $ExpectedCandidateHashes 'Uploaded HEAD'
      }
      Write-Journal 'version_create_reserved'
      Invoke-GoogleJson POST "$base/versions" @{description=$ReleaseDescription} | Out-Null
      $immutable = Get-Immutable $base 33
      if (-not $immutable) { throw 'Immutable v33 was not observed after create.' }
      Assert-Hashes $immutable $ExpectedCandidateHashes 'Created immutable v33'
      Write-Journal 'version_verified'
    }
    if (-not $staging.Count) {
      $journal = Read-Journal
      if ($journal -and [string]$journal.state -eq 'staging_create_reserved') {
        throw 'Prior staging create outcome is unresolved; refusing another deployments.create.'
      }
      Write-Journal 'staging_create_reserved'
      Invoke-GoogleJson POST "$base/deployments" @{versionNumber=33;manifestFileName='appsscript';description=$StagingDescription} | Out-Null
      $deployments = @(Get-All "$base/deployments" 'deployments')
      $staging = @($deployments | Where-Object {[int]$_.deploymentConfig.versionNumber -eq 33 -and [string]$_.deploymentConfig.description -eq $StagingDescription})
    }
    if ($staging.Count -ne 1) { throw 'Staging v33 was not verified exactly once.' }
    if ([int](Invoke-GoogleJson GET $stableUri).deploymentConfig.versionNumber -ne 32) { throw 'Stable changed during staging.' }
    Write-Journal 'staging_verified' ([string]$staging[0].deploymentId)
    [ordered]@{ok=$true;mode='stage';stableVersion=32;immutableVersion=33;stagingDeploymentId=[string]$staging[0].deploymentId;
      stagingUrl="https://script.google.com/macros/s/$($staging[0].deploymentId)/exec"} | ConvertTo-Json
    return
  }

  if ($Promote) {
    if (-not $immutable -or $staging.Count -ne 1 -or -not $journal -or [string]$journal.state -ne 'staging_verified') {
      throw 'Cannot promote without exact immutable v33, one staging deployment, and acceptance journal.'
    }
    if ($stableVersion -eq 32) {
      Invoke-GoogleJson PUT $stableUri @{deploymentConfig=@{scriptId=$ScriptId;versionNumber=33;manifestFileName='appsscript';description=$ReleaseDescription}} | Out-Null
    }
    $stable = Invoke-GoogleJson GET $stableUri
    if ([int]$stable.deploymentConfig.versionNumber -ne 33) { throw 'Stable did not advance to v33.' }
    Write-Journal 'promoted' ([string]$staging[0].deploymentId)
    [ordered]@{ok=$true;mode='promote';oldVersion=32;newVersion=33;deploymentId=$StableDeploymentId} | ConvertTo-Json
    return
  }

  if ($stableVersion -ne 33 -or $staging.Count -ne 1) { throw 'Cleanup requires stable v33 and one staging deployment.' }
  Invoke-GoogleJson DELETE "$base/deployments/$($staging[0].deploymentId)" | Out-Null
  Write-Journal 'cleaned'
  [ordered]@{ok=$true;mode='cleanup';stableVersion=33;stagingRemoved=$true} | ConvertTo-Json
} finally {
  $script:AccessToken=$null;$refresh=$null;$token=$null;$clasp=$null
  if ($mutexHeld) { $mutex.ReleaseMutex() }
  $mutex.Dispose()
}
