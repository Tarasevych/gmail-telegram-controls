#Requires -Version 7.0

[CmdletBinding()]
param(
  [Parameter(Mandatory = $true)]
  [ValidateSet('Prepare', 'Restore', 'Status')]
  [string]$Mode
)

$ErrorActionPreference = 'Stop'
$ProgressPreference = 'SilentlyContinue'

$ScriptId = '1Lxm-LJsGCRAz_LO0EjSlXnikx0oDioX6CdmiMhyLRmAAJ1fCk63S_1mS'
$DeploymentId = 'AKfycbwQkmQIIsboUayMhWdv_DzGj_gbERMKdWEpUVUpIjvwTaIjyjyLaBWUmw1g3lFWFV3Z'
$ExpectedVersion = 26
$ExpectedHashes = @{
  Code         = 'a767e717d17a1d50a3ecd373078bef59782f8fa7293d0b61787dae0aeac70b3e'
  MultiAccount = '524cd5f5e7e57ff2313036da77afc3a57bd03d397e56232e32c2cbf34debaf13'
  MailClient   = 'b777e9b13fcf2a46472cfa0c9da0530ef91ae11f7bef28237c8468d116f68884'
  MailApp      = '29b5c7883706be9cc77625367dfb8ca3aa99e58c635f47fba048be633ebded70'
  appsscript   = '354ad159bcd81637d9abf7711cfc675b192ac373317744cf90376f7b14f4edc9'
}

# Use explicit LF so a Windows checkout cannot make wrapper recognition depend
# on CRLF preservation by the Apps Script API.
$Wrapper = (@(
  ''
  ''
  '// TEMPORARY HEAD-ONLY MIGRATION ENTRYPOINT. NEVER DEPLOY THIS WRAPPER.'
  'function migrateDeployment() {'
  '  return migrateDeployment_();'
  '}'
  ''
) -join "`n")

function ConvertTo-NormalizedSource([string]$Source) {
  if ($null -eq $Source) { throw 'Apps Script returned a file without source text.' }
  return $Source.Replace("`r`n", "`n").Replace("`r", "`n")
}

function Get-NormalizedHash([string]$Source) {
  $normalized = ConvertTo-NormalizedSource $Source
  $bytes = [Text.Encoding]::UTF8.GetBytes($normalized)
  return [Convert]::ToHexString([Security.Cryptography.SHA256]::HashData($bytes)).ToLowerInvariant()
}

function Assert-CleanContent($Content, [string]$Label) {
  $names = @($Content.files | ForEach-Object { $_.name } | Sort-Object)
  $wanted = @($ExpectedHashes.Keys) | Sort-Object
  if (($names -join ',') -ne ($wanted -join ',')) {
    throw "$Label has an unexpected Apps Script file set: $($names -join ', ')"
  }
  foreach ($file in $Content.files) {
    $actual = Get-NormalizedHash ([string]$file.source)
    if ($actual -ne $ExpectedHashes[$file.name]) {
      throw "$Label hash mismatch for $($file.name): $actual"
    }
  }
}

function Assert-TemporaryHead($Content) {
  $names = @($Content.files | ForEach-Object { $_.name } | Sort-Object)
  $wanted = @($ExpectedHashes.Keys) | Sort-Object
  if (($names -join ',') -ne ($wanted -join ',')) {
    throw "Temporary HEAD has an unexpected Apps Script file set: $($names -join ', ')"
  }
  foreach ($file in $Content.files) {
    if ($file.name -eq 'Code') {
      $source = ConvertTo-NormalizedSource ([string]$file.source)
      if (-not $source.EndsWith($Wrapper, [StringComparison]::Ordinal)) {
        throw 'Temporary HEAD does not end with the exact reviewed wrapper.'
      }
      $cleanSource = $source.Substring(0, $source.Length - $Wrapper.Length)
      $actual = Get-NormalizedHash $cleanSource
    } else {
      $actual = Get-NormalizedHash ([string]$file.source)
    }
    if ($actual -ne $ExpectedHashes[$file.name]) {
      throw "Temporary HEAD base hash mismatch for $($file.name): $actual"
    }
  }
}

function Invoke-GoogleJson {
  param(
    [ValidateSet('GET', 'POST', 'PUT')][string]$Method,
    [string]$Uri,
    [object]$Body = $null
  )
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

function Get-AllVersionNumbers([string]$BaseUri) {
  $numbers = [Collections.Generic.List[int]]::new()
  $pageToken = $null
  do {
    $uri = "$BaseUri/versions?pageSize=50"
    if ($pageToken) { $uri += "&pageToken=$([Uri]::EscapeDataString([string]$pageToken))" }
    $page = Invoke-GoogleJson GET $uri
    foreach ($version in @($page.versions)) {
      $numbers.Add([int]$version.versionNumber)
    }
    $pageToken = [string]$page.nextPageToken
  } while ($pageToken)
  return @($numbers)
}

function Get-FutureVersionNumbers([string]$BaseUri) {
  return @(Get-AllVersionNumbers $BaseUri | Where-Object { $_ -gt $ExpectedVersion } | Sort-Object -Unique)
}

function Assert-NoFutureVersions([string]$BaseUri, [string]$Label) {
  $futureVersions = @(Get-FutureVersionNumbers $BaseUri)
  if ($futureVersions.Count) {
    throw "$Label found unsupported future immutable version(s): v$($futureVersions -join ', v')."
  }
}

function Get-VerifiedImmutableV26([string]$BaseUri) {
  $immutable = Invoke-GoogleJson GET "$BaseUri/content?versionNumber=$ExpectedVersion"
  Assert-CleanContent $immutable "Immutable version $ExpectedVersion"
  return $immutable
}

function Get-HeadState($Content) {
  try {
    Assert-CleanContent $Content 'Current HEAD'
    return [pscustomobject]@{ state = 'clean_v26'; error = $null }
  } catch {
    try {
      Assert-TemporaryHead $Content
      return [pscustomobject]@{ state = 'temporary_wrapper'; error = $null }
    } catch {
      return [pscustomobject]@{ state = 'unexpected'; error = $_.Exception.Message }
    }
  }
}

function Set-HeadAndVerify {
  param(
    [string]$BaseUri,
    [object]$Body,
    [ValidateSet('clean_v26', 'temporary_wrapper')][string]$ExpectedState
  )
  $writeError = $null
  try {
    $null = Invoke-GoogleJson PUT "$BaseUri/content" $Body
  } catch {
    # A lost HTTP response is not proof that updateContent failed. Verify HEAD
    # before deciding whether the operation failed or should be retried.
    $writeError = $_
  }

  $observed = $null
  $readError = $null
  for ($attempt = 1; $attempt -le 3; $attempt++) {
    try {
      $observed = Invoke-GoogleJson GET "$BaseUri/content"
      $readError = $null
      break
    } catch {
      $readError = $_
      if ($attempt -lt 3) { Start-Sleep -Milliseconds 350 }
    }
  }
  if ($null -eq $observed) {
    if ($null -ne $writeError) { throw $writeError }
    throw $readError
  }

  try {
    if ($ExpectedState -eq 'clean_v26') {
      Assert-CleanContent $observed 'Verified HEAD'
    } else {
      Assert-TemporaryHead $observed
    }
  } catch {
    if ($null -ne $writeError) { throw $writeError }
    throw
  }
  return $observed
}

$script:AccessToken = $null
$clasp = $null
$token = $null
$refresh = $null
$releaseMutex = [Threading.Mutex]::new($false, 'Local\TarasevychGmailNotifierAppsScriptV26Release')
$releaseMutexHeld = $false
try {
  try {
    $releaseMutexHeld = $releaseMutex.WaitOne(0)
  } catch [Threading.AbandonedMutexException] {
    $releaseMutexHeld = $true
  }
  if (-not $releaseMutexHeld) {
    throw 'Another local v26 deployment or migration guard is already running.'
  }

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
  $stableUri = "$base/deployments/$DeploymentId"

  # Immutable v26 is the only allowed source for Prepare and Restore. Stable is
  # intentionally checked separately so Restore can remove the exact wrapper
  # even if another actor has moved the deployment meanwhile.
  $immutable = Get-VerifiedImmutableV26 $base

  if ($Mode -eq 'Restore') {
    $head = Invoke-GoogleJson GET "$base/content"
    $headState = Get-HeadState $head
    if ($headState.state -eq 'unexpected') {
      throw "Restore refused an unexpected HEAD: $($headState.error)"
    }
    if ($headState.state -eq 'temporary_wrapper') {
      $null = Set-HeadAndVerify $base @{ scriptId = $ScriptId; files = $immutable.files } 'clean_v26'
    }
    $restored = Invoke-GoogleJson GET "$base/content"
    Assert-CleanContent $restored 'Restored HEAD'

    $stableVersion = $null
    $stableError = $null
    try {
      $deployment = Invoke-GoogleJson GET $stableUri
      $stableVersion = [int]$deployment.deploymentConfig.versionNumber
    } catch {
      # HEAD cleanup has already succeeded. Report an unknown deployment state
      # without undoing or repeating the cleanup.
      $stableError = $_.Exception.Message
    }
    $stableDrift = ($null -eq $stableVersion -or $stableVersion -ne $ExpectedVersion)
    $result = [ordered]@{
      ok = $true
      mode = 'restore'
      stableVersion = $stableVersion
      stableDrift = $stableDrift
      headState = 'clean_v26'
    }
    if ($stableDrift) {
      $result.warning = if ($null -ne $stableError) {
        "HEAD restored, but stable deployment status could not be read: $stableError"
      } else {
        "HEAD restored without changing stable, which is v$stableVersion instead of v$ExpectedVersion."
      }
    }
    [pscustomobject]$result | ConvertTo-Json
    return
  }

  $deployment = Invoke-GoogleJson GET $stableUri
  $stableVersion = [int]$deployment.deploymentConfig.versionNumber
  $stableDrift = $stableVersion -ne $ExpectedVersion
  $head = Invoke-GoogleJson GET "$base/content"
  $headState = Get-HeadState $head

  if ($Mode -eq 'Status') {
    $futureVersions = @(Get-FutureVersionNumbers $base)
    $futureVersionDrift = $futureVersions.Count -gt 0
    $result = [ordered]@{
      ok = (-not $stableDrift -and -not $futureVersionDrift -and $headState.state -ne 'unexpected')
      mode = 'status'
      stableVersion = $stableVersion
      stableDrift = $stableDrift
      futureVersionDrift = $futureVersionDrift
      futureVersions = $futureVersions
      headState = $headState.state
    }
    if ($headState.error) { $result.headError = $headState.error }
    [pscustomobject]$result | ConvertTo-Json
    return
  }

  if ($Mode -eq 'Prepare') {
    if ($stableDrift) {
      throw "Prepare requires stable v$ExpectedVersion, but stable is v$stableVersion."
    }
    Assert-NoFutureVersions $base 'Prepare guard'
    Assert-CleanContent $head 'Current HEAD'
    $temporaryFiles = @($immutable.files | ForEach-Object {
      if ($_.name -eq 'Code') {
        [pscustomobject]@{ name = $_.name; type = $_.type; source = (ConvertTo-NormalizedSource ([string]$_.source)) + $Wrapper }
      } else {
        [pscustomobject]@{ name = $_.name; type = $_.type; source = [string]$_.source }
      }
    })
    $null = Set-HeadAndVerify $base @{ scriptId = $ScriptId; files = $temporaryFiles } 'temporary_wrapper'

    try {
      $stableAfter = Invoke-GoogleJson GET $stableUri
      $stableAfterVersion = [int]$stableAfter.deploymentConfig.versionNumber
      if ($stableAfterVersion -ne $ExpectedVersion) {
        throw "Stable drifted to v$stableAfterVersion during Prepare."
      }
      Assert-NoFutureVersions $base 'Post-write Prepare guard'
      $null = Get-VerifiedImmutableV26 $base
    } catch {
      $verificationError = $_
      try {
        $null = Set-HeadAndVerify $base @{ scriptId = $ScriptId; files = $immutable.files } 'clean_v26'
      } catch {
        throw "Prepare could not confirm stable v$ExpectedVersion and wrapper cleanup also failed: $($_.Exception.Message). Verification error: $($verificationError.Exception.Message)"
      }
      throw "Prepare aborted and removed the exact wrapper because stable v$ExpectedVersion could not be confirmed: $($verificationError.Exception.Message)"
    }

    [pscustomobject]@{
      ok = $true
      mode = 'prepare'
      stableVersion = $ExpectedVersion
      stableDrift = $false
      headState = 'temporary_wrapper'
    } | ConvertTo-Json
    return
  }
}
finally {
  $script:AccessToken = $null
  $refresh = $null
  $token = $null
  $clasp = $null
  if ($releaseMutexHeld) { $releaseMutex.ReleaseMutex() }
  $releaseMutex.Dispose()
}
