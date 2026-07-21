#Requires -Version 7.0

[CmdletBinding()]
param(
  [switch]$PreflightOnly
)

$ErrorActionPreference = 'Stop'
$ProgressPreference = 'SilentlyContinue'

$ScriptId = '1Lxm-LJsGCRAz_LO0EjSlXnikx0oDioX6CdmiMhyLRmAAJ1fCk63S_1mS'
$DeploymentId = 'AKfycbwQkmQIIsboUayMhWdv_DzGj_gbERMKdWEpUVUpIjvwTaIjyjyLaBWUmw1g3lFWFV3Z'
$ExpectedOldVersion = 26
$ExpectedNewVersion = 27
$Description = 'Telegram Gmail client v27: ADHD focus priorities, chat-native rules and synchronized priority cards'
$ProjectRoot = Split-Path -Parent $PSScriptRoot

$ExpectedOldHashes = @{
  Code         = '5a643e1c434689d416a1cbc372d596a484316afcfa52a1f758d0671c9306d144'
  MultiAccount = 'ed910c8fedf07b5f9e1361bbae343062ee5677fcae2f68c0d2700fbc1d6f41df'
  MailClient   = '065e0dfdc04023067168d28605b79f5bc12bdae9fb91769c618036f46050975b'
  MailApp      = 'a7aa10a4d008003afbb7aa494cb416a5b5b5f73d5d65b82163d94830937e72fb'
  appsscript   = '354ad159bcd81637d9abf7711cfc675b192ac373317744cf90376f7b14f4edc9'
}
$ExpectedCandidateHashes = @{
  Code         = 'a767e717d17a1d50a3ecd373078bef59782f8fa7293d0b61787dae0aeac70b3e'
  MultiAccount = '524cd5f5e7e57ff2313036da77afc3a57bd03d397e56232e32c2cbf34debaf13'
  MailClient   = 'b777e9b13fcf2a46472cfa0c9da0530ef91ae11f7bef28237c8468d116f68884'
  MailApp      = '29b5c7883706be9cc77625367dfb8ca3aa99e58c635f47fba048be633ebded70'
  appsscript   = '354ad159bcd81637d9abf7711cfc675b192ac373317744cf90376f7b14f4edc9'
}

function ConvertTo-NormalizedSource([string]$Source) {
  if ($null -eq $Source) { throw 'Apps Script returned a file without source text.' }
  return $Source.Replace("`r`n", "`n").Replace("`r", "`n")
}

function Get-NormalizedHash([string]$Source) {
  $normalized = ConvertTo-NormalizedSource $Source
  $bytes = [Text.Encoding]::UTF8.GetBytes($normalized)
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
    [ValidateSet('GET', 'POST', 'PUT')][string]$Method,
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

function Test-HttpNotFound($ErrorRecord) {
  $response = $ErrorRecord.Exception.Response
  if ($null -eq $response) { return $false }
  try { return [int]$response.StatusCode -eq 404 } catch { return $false }
}

function Get-ImmutableVersionOrNull {
  param(
    [string]$BaseUri,
    [int]$VersionNumber,
    [int]$Attempts = 1
  )
  for ($attempt = 1; $attempt -le $Attempts; $attempt++) {
    try {
      return Invoke-GoogleJson GET "$BaseUri/content?versionNumber=$VersionNumber"
    } catch {
      if (-not (Test-HttpNotFound $_)) { throw }
      if ($attempt -lt $Attempts) { Start-Sleep -Milliseconds 400 }
    }
  }
  return $null
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

function Get-PreCreateDisposition([int[]]$VersionNumbers) {
  $atOrAfterExpected = @($VersionNumbers | Where-Object { $_ -ge $ExpectedNewVersion } | Sort-Object -Unique)
  $futureVersions = @($atOrAfterExpected | Where-Object { $_ -gt $ExpectedNewVersion })
  if ($futureVersions.Count) {
    throw "Immediate pre-create guard found unsupported future immutable version(s): v$($futureVersions -join ', v')."
  }
  if ($atOrAfterExpected -contains $ExpectedNewVersion) {
    return 'adopt_expected'
  }
  return 'create_expected'
}

function Assert-NoFutureVersions([string]$BaseUri, [string]$Label) {
  $futureVersions = @(Get-AllVersionNumbers $BaseUri | Where-Object { $_ -gt $ExpectedNewVersion } | Sort-Object -Unique)
  if ($futureVersions.Count) {
    throw "$Label found unsupported future immutable version(s): v$($futureVersions -join ', v'). Refusing all v$ExpectedNewVersion release mutations."
  }
}

function Assert-DeploymentVersion($Deployment, [int]$VersionNumber, [string]$Label) {
  if ([string]$Deployment.deploymentId -ne $DeploymentId) {
    throw "$Label returned deployment $($Deployment.deploymentId), expected $DeploymentId."
  }
  if ([string]$Deployment.deploymentConfig.scriptId -ne $ScriptId) {
    throw "$Label belongs to an unexpected script project."
  }
  if ([int]$Deployment.deploymentConfig.versionNumber -ne $VersionNumber) {
    throw "$Label is v$($Deployment.deploymentConfig.versionNumber), expected v$VersionNumber."
  }
  if ([string]$Deployment.deploymentConfig.manifestFileName -ne 'appsscript') {
    throw "$Label uses an unexpected manifest file."
  }
}

function Set-HeadAndAssertHashes {
  param(
    [string]$BaseUri,
    [object]$Body,
    [hashtable]$Expected,
    [string]$Label
  )
  $writeError = $null
  try {
    $null = Invoke-GoogleJson PUT "$BaseUri/content" $Body
  } catch {
    # updateContent may have committed even if its HTTP response was lost.
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
    Assert-FileSetAndHashes $observed $Expected $Label
  } catch {
    if ($null -ne $writeError) { throw $writeError }
    throw
  }
  return $observed
}

# Validate the exact local payload before reading OAuth credentials or making
# any Google request. The temporary migration wrapper can never satisfy these
# hashes, so this deployment path cannot publish it.
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
Assert-FileSetAndHashes $candidate $ExpectedCandidateHashes 'Local candidate'

$script:AccessToken = $null
$clasp = $null
$token = $null
$refresh = $null
$releaseMutex = [Threading.Mutex]::new($false, 'Local\TarasevychGmailNotifierAppsScriptV27Release')
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
  $deployment = Invoke-GoogleJson GET $stableUri
  $stableVersion = [int]$deployment.deploymentConfig.versionNumber
  if ($stableVersion -gt $ExpectedNewVersion) {
    throw "Stable deployment is unsupported future v$stableVersion; refusing all v$ExpectedNewVersion release actions."
  }
  Assert-NoFutureVersions $base 'Initial release guard'

  # Lost-response recovery after a completed deployment: verify every durable
  # invariant and return success without creating another immutable version.
  if ($stableVersion -eq $ExpectedNewVersion) {
    Assert-DeploymentVersion $deployment $ExpectedNewVersion 'Stable deployment'
    $immutable = Invoke-GoogleJson GET "$base/content?versionNumber=$ExpectedNewVersion"
    Assert-FileSetAndHashes $immutable $ExpectedCandidateHashes "Immutable version $ExpectedNewVersion"
    $head = Invoke-GoogleJson GET "$base/content"
    Assert-FileSetAndHashes $head $ExpectedCandidateHashes 'Current HEAD'
    [pscustomobject]@{
      ok = $true
      mode = if ($PreflightOnly) { 'preflight_already_deployed' } else { 'already_deployed' }
      oldVersion = $ExpectedOldVersion
      newVersion = $ExpectedNewVersion
      deploymentId = $DeploymentId
      idempotent = $true
      candidateHashes = $ExpectedCandidateHashes
    } | ConvertTo-Json -Depth 6
    return
  }

  if ($stableVersion -ne $ExpectedOldVersion) {
    throw "Stable deployment drifted from v$ExpectedOldVersion to v$stableVersion."
  }
  Assert-DeploymentVersion $deployment $ExpectedOldVersion 'Stable deployment'

  $oldVersion = Invoke-GoogleJson GET "$base/content?versionNumber=$ExpectedOldVersion"
  Assert-FileSetAndHashes $oldVersion $ExpectedOldHashes "Version $ExpectedOldVersion"
  $head = Invoke-GoogleJson GET "$base/content"
  $headState = $null
  try {
    Assert-FileSetAndHashes $head $ExpectedOldHashes 'Current HEAD'
    $headState = 'old_v25'
  } catch {
    try {
      Assert-FileSetAndHashes $head $ExpectedCandidateHashes 'Current HEAD'
      $headState = 'candidate_v27'
    } catch {
      throw 'Current HEAD is neither the exact v26 rollback source nor the exact v27 candidate.'
    }
  }

  # Probe repeatedly before POST. If an earlier process created v27 but lost its
  # response, adopt that immutable snapshot; never create a later version on retry.
  $immutableV26 = Get-ImmutableVersionOrNull $base $ExpectedNewVersion 4
  $candidateVersionReady = $null -ne $immutableV26
  if ($candidateVersionReady) {
    Assert-FileSetAndHashes $immutableV26 $ExpectedCandidateHashes "Existing immutable version $ExpectedNewVersion"
  }
  $releaseState = if ($candidateVersionReady) {
    'resume_existing_v27'
  } elseif ($headState -eq 'candidate_v27') {
    'resume_uploaded_head'
  } else {
    'fresh'
  }

  if ($PreflightOnly) {
    [pscustomobject]@{
      ok = $true
      mode = 'preflight'
      stableVersion = $stableVersion
      deploymentId = $DeploymentId
      releaseState = $releaseState
      candidateHashes = $ExpectedCandidateHashes
    } | ConvertTo-Json -Depth 6
    return
  }

  $headMutationAttempted = $false
  $adoptedExistingVersion = $candidateVersionReady
  try {
    if ($headState -eq 'old_v25') {
      $headMutationAttempted = $true
      $null = Set-HeadAndAssertHashes $base $candidate $ExpectedCandidateHashes 'Uploaded HEAD'
      $headState = 'candidate_v27'
    } else {
      Assert-FileSetAndHashes $head $ExpectedCandidateHashes 'Uploaded HEAD'
    }

    if (-not $candidateVersionReady) {
      # One last no-mutation probe closes the normal restart window immediately
      # before the irreversible versions.create call.
      $immutableV26 = Get-ImmutableVersionOrNull $base $ExpectedNewVersion 4
      if ($null -ne $immutableV26) {
        Assert-FileSetAndHashes $immutableV26 $ExpectedCandidateHashes "Existing immutable version $ExpectedNewVersion"
        $candidateVersionReady = $true
        $adoptedExistingVersion = $true
      }
    }

    if (-not $candidateVersionReady) {
      # A second authoritative surface prevents a stale 404 from turning a
      # previous ambiguous v27 create into an accidental later version. With one recovery
      # worker, the remaining check-to-POST interval has no competing writer.
      $blockingVersions = @(Get-AllVersionNumbers $base | Where-Object { $_ -ge $ExpectedNewVersion })
      if ($blockingVersions.Count) {
        $immutableV26 = Get-ImmutableVersionOrNull $base $ExpectedNewVersion 6
        if ($null -eq $immutableV26) {
          throw "Version inventory already contains v$($blockingVersions -join ', v'), but exact v$ExpectedNewVersion content is unavailable. Refusing to create another version."
        }
        Assert-FileSetAndHashes $immutableV26 $ExpectedCandidateHashes "Existing immutable version $ExpectedNewVersion"
        $candidateVersionReady = $true
        $adoptedExistingVersion = $true
      }
    }

    if (-not $candidateVersionReady) {
      $createError = $null
      $createdVersion = $null
      # This is the last inventory read before the irreversible POST. Its
      # disposition is deliberately outside the POST recovery catch: future
      # version drift is a hard failure, never an ambiguous-create response.
      $immediateVersions = @(Get-AllVersionNumbers $base)
      $preCreateDisposition = Get-PreCreateDisposition $immediateVersions
      if ($preCreateDisposition -eq 'adopt_expected') {
        $immutableV26 = Get-ImmutableVersionOrNull $base $ExpectedNewVersion 6
        if ($null -eq $immutableV26) {
          throw "Immediate pre-create inventory contains v$ExpectedNewVersion, but its exact content is unavailable. Refusing versions.create."
        }
        Assert-FileSetAndHashes $immutableV26 $ExpectedCandidateHashes "Existing immutable version $ExpectedNewVersion"
        $candidateVersionReady = $true
        $adoptedExistingVersion = $true
      }
      if ($preCreateDisposition -eq 'create_expected' -and -not $candidateVersionReady) {
        try {
          $createdVersion = Invoke-GoogleJson POST "$base/versions" @{ description = $Description }
        } catch {
          # The POST may have committed. Resolve that uncertainty by reading
          # the only acceptable immutable version rather than issuing another POST.
          $createError = $_
        }
      }

      if ($null -ne $createdVersion -and [int]$createdVersion.versionNumber -ne $ExpectedNewVersion) {
        throw "Unexpected new version number: $($createdVersion.versionNumber) (expected $ExpectedNewVersion)."
      }

      $immutableV26 = Get-ImmutableVersionOrNull $base $ExpectedNewVersion 6
      if ($null -eq $immutableV26) {
        if ($null -ne $createError) { throw $createError }
        throw "Apps Script did not expose immutable version $ExpectedNewVersion after creating it."
      }
      Assert-FileSetAndHashes $immutableV26 $ExpectedCandidateHashes "Immutable version $ExpectedNewVersion"
      $candidateVersionReady = $true
    }

    # Once exact immutable v27 exists, never roll it or HEAD back. Any later
    # uncertainty is resumable and the next invocation adopts v27.
    $beforeUpdate = Invoke-GoogleJson GET $stableUri
    $beforeUpdateVersion = [int]$beforeUpdate.deploymentConfig.versionNumber
    if ($beforeUpdateVersion -eq $ExpectedNewVersion) {
      Assert-DeploymentVersion $beforeUpdate $ExpectedNewVersion 'Pre-update stable deployment'
    } elseif ($beforeUpdateVersion -eq $ExpectedOldVersion) {
      Assert-DeploymentVersion $beforeUpdate $ExpectedOldVersion 'Pre-update stable deployment'
    } else {
      throw "Stable deployment changed to v$beforeUpdateVersion before the guarded update; refusing to overwrite it."
    }

    $updateError = $null
    $verified = $null
    if ($beforeUpdateVersion -eq $ExpectedNewVersion) {
      $verified = $beforeUpdate
    } else {
      try {
        Assert-NoFutureVersions $base 'Immediate pre-deployment-update guard'
        $null = Invoke-GoogleJson PUT $stableUri @{
          deploymentConfig = @{
            scriptId = $ScriptId
            versionNumber = $ExpectedNewVersion
            manifestFileName = 'appsscript'
            description = $Description
          }
        }
      } catch {
        $updateError = $_
      }

      try {
        $verified = Invoke-GoogleJson GET $stableUri
      } catch {
        if ($null -ne $updateError) { throw $updateError }
        throw
      }
    }
    if ([int]$verified.deploymentConfig.versionNumber -ne $ExpectedNewVersion) {
      if ($null -ne $updateError) { throw $updateError }
      throw "Stable deployment remains v$($verified.deploymentConfig.versionNumber), expected v$ExpectedNewVersion."
    }
    Assert-DeploymentVersion $verified $ExpectedNewVersion 'Verified stable deployment'

    $verifiedImmutable = Invoke-GoogleJson GET "$base/content?versionNumber=$ExpectedNewVersion"
    Assert-FileSetAndHashes $verifiedImmutable $ExpectedCandidateHashes "Verified immutable version $ExpectedNewVersion"
    $verifiedHead = Invoke-GoogleJson GET "$base/content"
    Assert-FileSetAndHashes $verifiedHead $ExpectedCandidateHashes 'Verified HEAD'

    [pscustomobject]@{
      ok = $true
      mode = if ($adoptedExistingVersion) { 'resume_existing_v27' } else { 'deploy' }
      oldVersion = $ExpectedOldVersion
      newVersion = $ExpectedNewVersion
      deploymentId = $DeploymentId
      deploymentUpdateTime = $verified.updateTime
      idempotent = $false
      candidateHashes = $ExpectedCandidateHashes
    } | ConvertTo-Json -Depth 6
  }
  catch {
    $original = $_
    if ($candidateVersionReady) {
      throw "Deployment paused in a safe resumable state after exact immutable v$ExpectedNewVersion was verified. Stable and HEAD were not rolled back; re-run this script to verify or finish the same v$ExpectedNewVersion. Original error: $($original.Exception.Message)"
    }

    if ($headMutationAttempted) {
      try {
        $null = Set-HeadAndAssertHashes $base @{ scriptId = $ScriptId; files = $oldVersion.files } $ExpectedOldHashes 'Rolled-back HEAD'
      } catch {
        throw "Deployment failed before immutable v$ExpectedNewVersion was verified: $($original.Exception.Message). HEAD rollback also failed: $($_.Exception.Message)"
      }
      throw "Deployment failed before immutable v$ExpectedNewVersion was verified and HEAD rollback completed: $($original.Exception.Message)"
    }
    throw
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
