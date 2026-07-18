#Requires -Version 7.0

[CmdletBinding()]
param(
  [switch]$PreflightOnly,
  [switch]$Rollback
)

$ErrorActionPreference = 'Stop'
$ProgressPreference = 'SilentlyContinue'

if ($PreflightOnly -and $Rollback) {
  throw 'PreflightOnly and Rollback are mutually exclusive.'
}

$ScriptId = '1Lxm-LJsGCRAz_LO0EjSlXnikx0oDioX6CdmiMhyLRmAAJ1fCk63S_1mS'
$DeploymentId = 'AKfycbwQkmQIIsboUayMhWdv_DzGj_gbERMKdWEpUVUpIjvwTaIjyjyLaBWUmw1g3lFWFV3Z'
$ExpectedStableVersion = 29
$ProjectRoot = Split-Path -Parent $PSScriptRoot
$DevUrl = "https://script.google.com/macros/s/$DeploymentId/dev"

$ExpectedStableHashes = @{
  Code         = 'ceb4db221b9c17aa2eeac4b0b3f88fa7c9e5a4389822f7e61f149fe798a1cad4'
  MultiAccount = '524cd5f5e7e57ff2313036da77afc3a57bd03d397e56232e32c2cbf34debaf13'
  MailClient   = '0b9df097b75bf63a0201a9fbb1871f6bc3490509a3121907c5a44ac4b4bae28b'
  MailApp      = '543b1104252580a2d0d9a4435a26da19bad899265daf0872aed98a6d335be225'
  appsscript   = '354ad159bcd81637d9abf7711cfc675b192ac373317744cf90376f7b14f4edc9'
}
$ExpectedCandidateHashes = @{
  Code         = '9d11455cab5686b44827da830cf19e2c2acbf1070f66ffc13cb704a1cc40e7e7'
  MultiAccount = '524cd5f5e7e57ff2313036da77afc3a57bd03d397e56232e32c2cbf34debaf13'
  MailClient   = 'e0b8ba5ff92eea446733e56d401e6a2d38e3cae9f7e9510594a72b66783f80a6'
  MailApp      = '3b17e4e144f152d01019274364c487ae652ab39d12b48b8a41ec2aced285700a'
  appsscript   = '354ad159bcd81637d9abf7711cfc675b192ac373317744cf90376f7b14f4edc9'
}
$ExpectedPriorCandidateHashes = @{
  Code         = '9d11455cab5686b44827da830cf19e2c2acbf1070f66ffc13cb704a1cc40e7e7'
  MultiAccount = '524cd5f5e7e57ff2313036da77afc3a57bd03d397e56232e32c2cbf34debaf13'
  MailClient   = 'e0b8ba5ff92eea446733e56d401e6a2d38e3cae9f7e9510594a72b66783f80a6'
  MailApp      = 'f0d91bca5effaf5b5e3262fac389346766ab3e581cb098fcfb7f96074c3ba2d2'
  appsscript   = '354ad159bcd81637d9abf7711cfc675b192ac373317744cf90376f7b14f4edc9'
}

function ConvertTo-NormalizedSource([string]$Source) {
  if ($null -eq $Source) { throw 'Apps Script returned a file without source text.' }
  return $Source.Replace("`r`n", "`n").Replace("`r", "`n")
}

function Get-NormalizedHash([string]$Source) {
  $bytes = [Text.Encoding]::UTF8.GetBytes((ConvertTo-NormalizedSource $Source))
  return [Convert]::ToHexString([Security.Cryptography.SHA256]::HashData($bytes)).ToLowerInvariant()
}

function Assert-FileSetAndHashes($Content, [hashtable]$Expected, [string]$Label) {
  $names = @($Content.files | ForEach-Object { $_.name } | Sort-Object)
  $wanted = @($Expected.Keys | Sort-Object)
  if (($names -join ',') -ne ($wanted -join ',')) {
    throw "$Label has an unexpected Apps Script file set: $($names -join ', ')"
  }
  foreach ($file in $Content.files) {
    $actual = Get-NormalizedHash ([string]$file.source)
    if ($actual -ne $Expected[$file.name]) {
      throw "$Label hash mismatch for $($file.name): $actual"
    }
  }
}

function Invoke-GoogleJson {
  param(
    [ValidateSet('GET', 'PUT')][string]$Method,
    [string]$Uri,
    [object]$Body = $null
  )
  if ($PreflightOnly -and $Method -ne 'GET') {
    throw "PreflightOnly forbids Apps Script mutation: $Method $Uri"
  }
  $params = @{
    Method = $Method
    Uri = $Uri
    Headers = @{ Authorization = "Bearer $script:AccessToken" }
  }
  if ($null -ne $Body) {
    $params.ContentType = 'application/json; charset=utf-8'
    $params.Body = $Body | ConvertTo-Json -Depth 30 -Compress
  }
  return Invoke-RestMethod @params
}

function Set-HeadAndAssertHashes {
  param([string]$BaseUri, [object]$Body, [hashtable]$Expected, [string]$Label)
  $writeError = $null
  try {
    $null = Invoke-GoogleJson PUT "$BaseUri/content" $Body
  } catch {
    $writeError = $_
  }
  $observed = $null
  for ($attempt = 1; $attempt -le 3; $attempt++) {
    try {
      $observed = Invoke-GoogleJson GET "$BaseUri/content"
      break
    } catch {
      if ($attempt -eq 3) {
        if ($null -ne $writeError) { throw $writeError }
        throw
      }
      Start-Sleep -Milliseconds 350
    }
  }
  try {
    Assert-FileSetAndHashes $observed $Expected $Label
  } catch {
    if ($null -ne $writeError) { throw $writeError }
    throw
  }
  return $observed
}

$candidate = [pscustomobject]@{
  scriptId = $ScriptId
  files = @(
    [pscustomobject]@{ name = 'Code'; type = 'SERVER_JS'; source = [IO.File]::ReadAllText((Join-Path $ProjectRoot 'Code.gs')) },
    [pscustomobject]@{ name = 'MultiAccount'; type = 'SERVER_JS'; source = [IO.File]::ReadAllText((Join-Path $ProjectRoot 'MultiAccount.gs')) },
    [pscustomobject]@{ name = 'MailClient'; type = 'SERVER_JS'; source = [IO.File]::ReadAllText((Join-Path $ProjectRoot 'MailClient.gs')) },
    [pscustomobject]@{ name = 'MailApp'; type = 'HTML'; source = [IO.File]::ReadAllText((Join-Path $ProjectRoot 'MailApp.html')) },
    [pscustomobject]@{ name = 'appsscript'; type = 'JSON'; source = [IO.File]::ReadAllText((Join-Path $ProjectRoot 'appsscript.json')) }
  )
}
Assert-FileSetAndHashes $candidate $ExpectedCandidateHashes 'Local v36 candidate'

$script:AccessToken = $null
$clasp = $null
$token = $null
$refresh = $null
$mutex = [Threading.Mutex]::new($false, 'Local\TarasevychGmailNotifierAppsScriptV36Staging')
$mutexHeld = $false
try {
  try {
    $mutexHeld = $mutex.WaitOne(0)
  } catch [Threading.AbandonedMutexException] {
    $mutexHeld = $true
  }
  if (-not $mutexHeld) { throw 'Another local v36 staging operation is already running.' }

  $clasp = Get-Content -Raw (Join-Path $HOME '.clasprc.json') | ConvertFrom-Json
  $token = $clasp.tokens.default
  if (-not $token.refresh_token -or -not $token.client_id -or -not $token.client_secret) {
    throw 'The local clasp refresh credentials are incomplete.'
  }
  $refresh = Invoke-RestMethod -Method Post -Uri 'https://oauth2.googleapis.com/token' -ContentType 'application/x-www-form-urlencoded' -Body @{
    client_id = [string]$token.client_id
    client_secret = [string]$token.client_secret
    refresh_token = [string]$token.refresh_token
    grant_type = 'refresh_token'
  }
  $script:AccessToken = [string]$refresh.access_token
  if (-not $script:AccessToken) { throw 'Google did not return an access token.' }

  $base = "https://script.googleapis.com/v1/projects/$ScriptId"
  $deployment = Invoke-GoogleJson GET "$base/deployments/$DeploymentId"
  if ([int]$deployment.deploymentConfig.versionNumber -ne $ExpectedStableVersion) {
    throw "Stable deployment is v$($deployment.deploymentConfig.versionNumber), expected immutable v$ExpectedStableVersion."
  }
  if ([string]$deployment.deploymentConfig.scriptId -ne $ScriptId) {
    throw 'Stable deployment belongs to an unexpected script project.'
  }
  $stable = Invoke-GoogleJson GET "$base/content?versionNumber=$ExpectedStableVersion"
  Assert-FileSetAndHashes $stable $ExpectedStableHashes "Immutable version $ExpectedStableVersion"

  $versions = Invoke-GoogleJson GET "$base/versions?pageSize=50"
  $future = @($versions.versions | Where-Object { [int]$_.versionNumber -gt $ExpectedStableVersion })
  if ($future.Count) {
    throw "Unsupported immutable version exists after v$ExpectedStableVersion; refusing staging HEAD mutation."
  }

  $head = Invoke-GoogleJson GET "$base/content"
  $headState = $null
  try {
    Assert-FileSetAndHashes $head $ExpectedStableHashes 'Current HEAD'
    $headState = 'stable_v29'
  } catch {
    try {
      Assert-FileSetAndHashes $head $ExpectedCandidateHashes 'Current HEAD'
      $headState = 'candidate_v36'
    } catch {
      Assert-FileSetAndHashes $head $ExpectedPriorCandidateHashes 'Current HEAD'
      $headState = 'prior_candidate_v36'
    }
  }

  if ($PreflightOnly) {
    [pscustomobject]@{
      ok = $true
      mode = 'preflight'
      stableVersion = $ExpectedStableVersion
      stableDeploymentUnchanged = $true
      headState = $headState
      devUrl = $DevUrl
      candidateHashes = $ExpectedCandidateHashes
    } | ConvertTo-Json -Depth 6
    return
  }

  if ($Rollback) {
    if ($headState -ne 'stable_v29') {
      $null = Set-HeadAndAssertHashes $base @{ scriptId = $ScriptId; files = $stable.files } $ExpectedStableHashes 'Rolled-back HEAD'
    }
    [pscustomobject]@{
      ok = $true
      mode = 'rollback'
      stableVersion = $ExpectedStableVersion
      stableDeploymentUnchanged = $true
      headState = 'stable_v29'
    } | ConvertTo-Json -Depth 5
    return
  }

  if ($headState -ne 'candidate_v36') {
    try {
      $null = Set-HeadAndAssertHashes $base $candidate $ExpectedCandidateHashes 'Staged v36 HEAD'
    } catch {
      $original = $_
      try {
        $observed = Invoke-GoogleJson GET "$base/content"
        Assert-FileSetAndHashes $observed $ExpectedCandidateHashes 'Recovered staged v36 HEAD'
      } catch {
        $null = Set-HeadAndAssertHashes $base @{ scriptId = $ScriptId; files = $stable.files } $ExpectedStableHashes 'Rolled-back HEAD'
        throw "v36 staging failed and HEAD rollback completed: $($original.Exception.Message)"
      }
    }
  }

  $stableAfter = Invoke-GoogleJson GET "$base/deployments/$DeploymentId"
  if ([int]$stableAfter.deploymentConfig.versionNumber -ne $ExpectedStableVersion) {
    throw 'Stable deployment changed during staging; stop and inspect provider state.'
  }
  [pscustomobject]@{
    ok = $true
    mode = 'stage'
    stableVersion = $ExpectedStableVersion
    stableDeploymentUnchanged = $true
    headState = 'candidate_v36'
    devUrl = $DevUrl
    candidateHashes = $ExpectedCandidateHashes
  } | ConvertTo-Json -Depth 6
}
finally {
  $script:AccessToken = $null
  $refresh = $null
  $token = $null
  $clasp = $null
  if ($mutexHeld) { $mutex.ReleaseMutex() }
  $mutex.Dispose()
}
