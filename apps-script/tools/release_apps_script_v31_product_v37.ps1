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

$selectedModes = @($PreflightOnly, $StageOnly, $Promote, $CleanupStaging | Where-Object { $_ }).Count
if ($selectedModes -ne 1) {
  throw 'Choose exactly one mode: PreflightOnly, StageOnly, Promote, or CleanupStaging.'
}

$ScriptId = '1Lxm-LJsGCRAz_LO0EjSlXnikx0oDioX6CdmiMhyLRmAAJ1fCk63S_1mS'
$StableDeploymentId = 'AKfycbwQkmQIIsboUayMhWdv_DzGj_gbERMKdWEpUVUpIjvwTaIjyjyLaBWUmw1g3lFWFV3Z'
$ExpectedOldVersion = 29
$ExpectedPreviousVersion = 30
$ExpectedNewVersion = 31
$ReleaseDescription = 'Telegram Gmail product v37: account identity compatibility'
$StagingDescription = 'Telegram Gmail product v37 immutable WebView staging'
$ProjectRoot = Split-Path -Parent $PSScriptRoot
$JournalPath = Join-Path $HOME '.codex\recovery\019f5d65-8209-7a00-b915-4a522dbcb612-v31-product-v37-release.json'

$ExpectedOldHashes = @{
  Code         = 'ceb4db221b9c17aa2eeac4b0b3f88fa7c9e5a4389822f7e61f149fe798a1cad4'
  MultiAccount = '524cd5f5e7e57ff2313036da77afc3a57bd03d397e56232e32c2cbf34debaf13'
  MailClient   = '0b9df097b75bf63a0201a9fbb1871f6bc3490509a3121907c5a44ac4b4bae28b'
  MailApp      = '543b1104252580a2d0d9a4435a26da19bad899265daf0872aed98a6d335be225'
  appsscript   = '354ad159bcd81637d9abf7711cfc675b192ac373317744cf90376f7b14f4edc9'
}
$ExpectedCandidateHashes = @{
  Code         = 'a767e717d17a1d50a3ecd373078bef59782f8fa7293d0b61787dae0aeac70b3e'
  MultiAccount = '524cd5f5e7e57ff2313036da77afc3a57bd03d397e56232e32c2cbf34debaf13'
  MailClient   = 'b777e9b13fcf2a46472cfa0c9da0530ef91ae11f7bef28237c8468d116f68884'
  MailApp      = '29b5c7883706be9cc77625367dfb8ca3aa99e58c635f47fba048be633ebded70'
  appsscript   = '354ad159bcd81637d9abf7711cfc675b192ac373317744cf90376f7b14f4edc9'
}
$ExpectedPreviousCandidateHashes = @{
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
    [ValidateSet('GET', 'POST', 'PUT', 'DELETE')][string]$Method,
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

function Get-HttpStatusCode($ErrorRecord) {
  $response = $ErrorRecord.Exception.Response
  if ($null -eq $response) { return 0 }
  try { return [int]$response.StatusCode } catch { return 0 }
}

function Test-DefiniteClientRejection($ErrorRecord) {
  $status = Get-HttpStatusCode $ErrorRecord
  return $status -ge 400 -and $status -lt 500 -and $status -notin @(408, 409, 425, 429)
}

function Get-ImmutableOrNull([string]$BaseUri, [int]$VersionNumber, [int]$Attempts = 1) {
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

function Get-AllVersions([string]$BaseUri) {
  $rows = [Collections.Generic.List[object]]::new()
  $pageToken = $null
  do {
    $uri = "$BaseUri/versions?pageSize=50"
    if ($pageToken) { $uri += "&pageToken=$([Uri]::EscapeDataString([string]$pageToken))" }
    $page = Invoke-GoogleJson GET $uri
    foreach ($row in @($page.versions)) { $rows.Add($row) }
    $pageToken = [string]$page.nextPageToken
  } while ($pageToken)
  return @($rows)
}

function Get-AllDeployments([string]$BaseUri) {
  $rows = [Collections.Generic.List[object]]::new()
  $pageToken = $null
  do {
    $uri = "$BaseUri/deployments?pageSize=50"
    if ($pageToken) { $uri += "&pageToken=$([Uri]::EscapeDataString([string]$pageToken))" }
    $page = Invoke-GoogleJson GET $uri
    foreach ($row in @($page.deployments)) { $rows.Add($row) }
    $pageToken = [string]$page.nextPageToken
  } while ($pageToken)
  return @($rows)
}

function Assert-Deployment($Deployment, [int]$VersionNumber, [string]$Label) {
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

function Get-ExactStagingDeployments([string]$BaseUri) {
  return @(Get-AllDeployments $BaseUri | Where-Object {
    [string]$_.deploymentId -ne $StableDeploymentId -and
    [int]$_.deploymentConfig.versionNumber -eq $ExpectedNewVersion -and
    [string]$_.deploymentConfig.description -eq $StagingDescription
  })
}

function Read-ReleaseJournal {
  if (-not (Test-Path -LiteralPath $JournalPath)) { return $null }
  try {
    $journal = Get-Content -Raw -LiteralPath $JournalPath | ConvertFrom-Json
  } catch {
    throw 'The local v31/product-v37 release journal is corrupt; refusing mutations.'
  }
  if ([string]$journal.scriptId -ne $ScriptId -or [int]$journal.version -ne $ExpectedNewVersion -or
      [string]$journal.candidateMailAppHash -ne $ExpectedCandidateHashes.MailApp) {
    throw 'The local release journal belongs to a different candidate; refusing mutations.'
  }
  return $journal
}

function Write-ReleaseJournal(
  [string]$State,
  [string]$StagingDeploymentId = '',
  [int]$DefiniteHttpStatus = 0,
  [string]$EvidenceId = ''
) {
  $directory = Split-Path -Parent $JournalPath
  [IO.Directory]::CreateDirectory($directory) | Out-Null
  $payload = [ordered]@{
    schema = 1
    scriptId = $ScriptId
    version = $ExpectedNewVersion
    candidateMailAppHash = $ExpectedCandidateHashes.MailApp
    state = $State
    stagingDeploymentId = $StagingDeploymentId
    definiteHttpStatus = $DefiniteHttpStatus
    evidenceId = $EvidenceId
    updatedAt = [DateTimeOffset]::UtcNow.ToString('o')
  } | ConvertTo-Json -Depth 4
  $temporary = "$JournalPath.tmp"
  [IO.File]::WriteAllText($temporary, $payload, [Text.UTF8Encoding]::new($false))
  Move-Item -LiteralPath $temporary -Destination $JournalPath -Force
}

function Get-JournalState($Journal) {
  if ($null -eq $Journal) { return '' }
  return [string]$Journal.state
}

function Set-HeadAndAssertHashes {
  param([string]$BaseUri, [object]$Body, [hashtable]$Expected, [string]$Label)
  $writeError = $null
  try { $null = Invoke-GoogleJson PUT "$BaseUri/content" $Body } catch { $writeError = $_ }
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
  try { Assert-FileSetAndHashes $observed $Expected $Label } catch {
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
Assert-FileSetAndHashes $candidate $ExpectedCandidateHashes 'Local product-v37 candidate'

$script:AccessToken = $null
$clasp = $null
$token = $null
$refresh = $null
$mutex = [Threading.Mutex]::new($false, 'Local\TarasevychGmailNotifierAppsScriptV31ProductV37Release')
$mutexHeld = $false
try {
  try { $mutexHeld = $mutex.WaitOne(0) } catch [Threading.AbandonedMutexException] { $mutexHeld = $true }
  if (-not $mutexHeld) { throw 'Another local Apps Script v31/product-v37 release operation is running.' }

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
  $stableUri = "$base/deployments/$StableDeploymentId"
  $stableDeployment = Invoke-GoogleJson GET $stableUri
  $stableVersion = [int]$stableDeployment.deploymentConfig.versionNumber
  if ($stableVersion -notin @($ExpectedOldVersion, $ExpectedNewVersion)) {
    throw "Stable deployment is unsupported v$stableVersion."
  }
  Assert-Deployment $stableDeployment $stableVersion 'Stable deployment'

  $oldImmutable = Invoke-GoogleJson GET "$base/content?versionNumber=$ExpectedOldVersion"
  Assert-FileSetAndHashes $oldImmutable $ExpectedOldHashes "Immutable version $ExpectedOldVersion"

  $previousImmutable = Get-ImmutableOrNull $base $ExpectedPreviousVersion 2
  if ($null -eq $previousImmutable) {
    throw "Required immutable product-v36 version $ExpectedPreviousVersion is absent."
  }
  Assert-FileSetAndHashes $previousImmutable $ExpectedPreviousCandidateHashes "Immutable version $ExpectedPreviousVersion"

  $allVersions = @(Get-AllVersions $base)
  $future = @($allVersions | Where-Object { [int]$_.versionNumber -gt $ExpectedNewVersion })
  if ($future.Count) { throw "Unsupported immutable version exists after v$ExpectedNewVersion." }
  $immutable = Get-ImmutableOrNull $base $ExpectedNewVersion 2
  if ($null -ne $immutable) {
    Assert-FileSetAndHashes $immutable $ExpectedCandidateHashes "Immutable version $ExpectedNewVersion"
  }

  $head = Invoke-GoogleJson GET "$base/content"
  $headState = $null
  try {
    Assert-FileSetAndHashes $head $ExpectedOldHashes 'Current HEAD'
    $headState = 'stable_v29'
  } catch {
    try {
      Assert-FileSetAndHashes $head $ExpectedPreviousCandidateHashes 'Current HEAD'
      $headState = 'previous_candidate_v30'
    } catch {
      Assert-FileSetAndHashes $head $ExpectedCandidateHashes 'Current HEAD'
      $headState = 'candidate_product_v37'
    }
  }

  $staging = @(Get-ExactStagingDeployments $base)
  if ($staging.Count -gt 1 -and -not $CleanupStaging) {
    throw 'More than one exact product-v37 staging deployment exists.'
  }
  if ($staging.Count -eq 1) { Assert-Deployment $staging[0] $ExpectedNewVersion 'Staging deployment' }
  $journal = Read-ReleaseJournal

  if ($PreflightOnly) {
    [pscustomobject]@{
      ok = $true
      mode = 'preflight'
      stableVersion = $stableVersion
      headState = $headState
      immutableCandidate = $null -ne $immutable
      journalState = Get-JournalState $journal
      stagingDeploymentId = if ($staging.Count) { [string]$staging[0].deploymentId } else { '' }
      stagingUrl = if ($staging.Count) { "https://script.google.com/macros/s/$($staging[0].deploymentId)/exec" } else { '' }
      candidateHashes = $ExpectedCandidateHashes
    } | ConvertTo-Json -Depth 6
    return
  }

  if ($StageOnly) {
    if ($stableVersion -ne $ExpectedOldVersion) {
      throw "StageOnly requires stable v$ExpectedOldVersion; it is already v$stableVersion."
    }
    $headWasMutated = $false
    $immutableReady = $null -ne $immutable
    try {
      $rollbackHashes = if ($headState -eq 'previous_candidate_v30') { $ExpectedPreviousCandidateHashes } else { $ExpectedOldHashes }
      if ($headState -ne 'candidate_product_v37') {
        $headWasMutated = $true
        $null = Set-HeadAndAssertHashes $base $candidate $ExpectedCandidateHashes 'Uploaded product-v37 HEAD'
      }

      if (-not $immutableReady) {
        $inventory = @(Get-AllVersions $base | Where-Object { [int]$_.versionNumber -ge $ExpectedNewVersion })
        if ($inventory.Count) {
          $immutable = Get-ImmutableOrNull $base $ExpectedNewVersion 6
          if ($null -eq $immutable) { throw 'Version inventory contains v31 but its content is unavailable.' }
        } else {
          if ((Get-JournalState $journal) -eq 'version_create_reserved') {
            throw 'A prior immutable v31 create has an unresolved outcome; refusing another versions.create.'
          }
          Write-ReleaseJournal 'version_create_reserved'
          $journal = Read-ReleaseJournal
          $createError = $null
          try {
            $created = Invoke-GoogleJson POST "$base/versions" @{ description = $ReleaseDescription }
            if ([int]$created.versionNumber -ne $ExpectedNewVersion) {
              throw "Unexpected immutable version $($created.versionNumber), expected v$ExpectedNewVersion."
            }
          } catch {
            $createError = $_
          }
          $immutable = Get-ImmutableOrNull $base $ExpectedNewVersion 6
          if ($null -eq $immutable) {
            if ($null -ne $createError) { throw $createError }
            throw 'Apps Script did not expose immutable v31 after create.'
          }
        }
        Assert-FileSetAndHashes $immutable $ExpectedCandidateHashes "Immutable version $ExpectedNewVersion"
        $immutableReady = $true
        Write-ReleaseJournal 'version_verified'
        $journal = Read-ReleaseJournal
      } elseif ((Get-JournalState $journal) -in @('', 'version_create_reserved')) {
        Write-ReleaseJournal 'version_verified'
        $journal = Read-ReleaseJournal
      }

      $staging = @(Get-ExactStagingDeployments $base)
      if ($staging.Count -gt 1) { throw 'Multiple exact staging deployments exist; refusing another create.' }
      if (-not $staging.Count) {
        $stagingJournalState = Get-JournalState $journal
        if ($stagingJournalState -eq 'staging_create_reserved') {
          throw 'A prior staging deployment create has an unresolved outcome; refusing another deployments.create.'
        }
        if ($stagingJournalState -eq 'staging_create_rejected') {
          $recordedStatus = [int]$journal.definiteHttpStatus
          if ($recordedStatus -lt 400 -or $recordedStatus -ge 500 -or $recordedStatus -in @(408, 409, 425, 429)) {
            throw 'The staging rejection journal lacks an allowlisted definite HTTP status.'
          }
        } elseif ($stagingJournalState -ne 'version_verified') {
          throw "Staging create is not permitted from journal state '$stagingJournalState'."
        }
        Write-ReleaseJournal 'staging_create_reserved'
        $journal = Read-ReleaseJournal
        $createDeploymentError = $null
        $createdStaging = $null
        try {
          $createdStaging = Invoke-GoogleJson POST "$base/deployments" @{
            versionNumber = $ExpectedNewVersion
            manifestFileName = 'appsscript'
            description = $StagingDescription
          }
          if (-not [string]$createdStaging.deploymentId) {
            throw 'Apps Script returned a staging deployment without an ID.'
          }
          Assert-Deployment $createdStaging $ExpectedNewVersion 'Created staging deployment'
          if ([string]$createdStaging.deploymentConfig.description -ne $StagingDescription) {
            throw 'Created staging deployment has an unexpected description.'
          }
        } catch {
          $createDeploymentError = $_
          if (Test-DefiniteClientRejection $_) {
            Write-ReleaseJournal 'staging_create_rejected' '' (Get-HttpStatusCode $_) 'provider-response'
            $journal = Read-ReleaseJournal
          }
        }
        if ($null -ne $createdStaging -and [string]$createdStaging.deploymentId) {
          $staging = @($createdStaging)
        } else {
          for ($attempt = 1; $attempt -le 6; $attempt++) {
            $staging = @(Get-ExactStagingDeployments $base)
            if ($staging.Count) { break }
            if ($attempt -lt 6) { Start-Sleep -Milliseconds 500 }
          }
        }
        if ($staging.Count -ne 1) {
          if ($null -ne $createDeploymentError) { throw $createDeploymentError }
          throw 'Apps Script did not expose exactly one staging deployment after create.'
        }
      }
      Assert-Deployment $staging[0] $ExpectedNewVersion 'Verified staging deployment'
      Write-ReleaseJournal 'staging_verified' ([string]$staging[0].deploymentId)
      $stableAfter = Invoke-GoogleJson GET $stableUri
      Assert-Deployment $stableAfter $ExpectedOldVersion 'Unchanged stable deployment'

      [pscustomobject]@{
        ok = $true
        mode = 'stage'
        stableVersion = $ExpectedOldVersion
        immutableVersion = $ExpectedNewVersion
        stableDeploymentUnchanged = $true
        stagingDeploymentId = [string]$staging[0].deploymentId
        stagingUrl = "https://script.google.com/macros/s/$($staging[0].deploymentId)/exec"
        candidateHashes = $ExpectedCandidateHashes
      } | ConvertTo-Json -Depth 6
      return
    } catch {
      $original = $_
      if (-not $immutableReady -and $headWasMutated) {
        $observedHead = $null
        try {
          $observedHead = Invoke-GoogleJson GET "$base/content"
        } catch {
          throw "Staging HEAD outcome is unresolved; no rollback PUT was attempted. Original error: $($original.Exception.Message)"
        }
        $priorHeadIntact = $false
        try {
          Assert-FileSetAndHashes $observedHead $rollbackHashes 'Prior HEAD after failed staging upload'
          $priorHeadIntact = $true
        } catch {
          Assert-FileSetAndHashes $observedHead $ExpectedCandidateHashes 'Candidate HEAD before rollback'
        }
        if (-not $priorHeadIntact) {
          $null = Set-HeadAndAssertHashes $base @{ scriptId = $ScriptId; files = $head.files } $rollbackHashes 'Rolled-back prior HEAD'
        }
        throw "Staging failed before immutable v31 verification and HEAD rollback completed: $($original.Exception.Message)"
      }
      throw "Staging paused after immutable v31 was verified; never create another version automatically. Original error: $($original.Exception.Message)"
    }
  }

  if ($Promote) {
    if ($null -eq $immutable) { throw 'Cannot promote: immutable v31 is absent.' }
    if ($staging.Count -ne 1) { throw 'Cannot promote without exactly one verified staging deployment.' }
    Assert-FileSetAndHashes $immutable $ExpectedCandidateHashes "Immutable version $ExpectedNewVersion"
    Assert-Deployment $staging[0] $ExpectedNewVersion 'Accepted staging deployment'
    if ($stableVersion -eq $ExpectedOldVersion) {
      $updateError = $null
      try {
        $null = Invoke-GoogleJson PUT $stableUri @{
          deploymentConfig = @{
            scriptId = $ScriptId
            versionNumber = $ExpectedNewVersion
            manifestFileName = 'appsscript'
            description = $ReleaseDescription
          }
        }
      } catch { $updateError = $_ }
      $stableDeployment = Invoke-GoogleJson GET $stableUri
      if ([int]$stableDeployment.deploymentConfig.versionNumber -ne $ExpectedNewVersion) {
        if ($null -ne $updateError) { throw $updateError }
        throw 'Stable deployment did not advance to v31.'
      }
    }
    Assert-Deployment $stableDeployment $ExpectedNewVersion 'Promoted stable deployment'
    Write-ReleaseJournal 'promoted' ([string]$staging[0].deploymentId)
    [pscustomobject]@{
      ok = $true
      mode = 'promote'
      oldVersion = $ExpectedOldVersion
      newVersion = $ExpectedNewVersion
      deploymentId = $StableDeploymentId
      candidateHashes = $ExpectedCandidateHashes
    } | ConvertTo-Json -Depth 6
    return
  }

  if ($CleanupStaging) {
    if ($stableVersion -ne $ExpectedNewVersion) {
      throw 'CleanupStaging requires the stable deployment to be verified on v31.'
    }
    foreach ($stagingDeployment in $staging) {
      try {
        $null = Invoke-GoogleJson DELETE "$base/deployments/$($stagingDeployment.deploymentId)"
      } catch {
        if (-not (Test-HttpNotFound $_)) { throw }
      }
    }
    $remaining = @(Get-ExactStagingDeployments $base)
    if ($remaining.Count) { throw 'Staging deployment cleanup was not confirmed.' }
    Write-ReleaseJournal 'cleaned'
    [pscustomobject]@{ ok = $true; mode = 'cleanup'; stableVersion = $ExpectedNewVersion; stagingRemoved = $true } |
      ConvertTo-Json -Depth 4
    return
  }
}
finally {
  $script:AccessToken = $null
  $refresh = $null
  $token = $null
  $clasp = $null
  if ($mutexHeld) { $mutex.ReleaseMutex() }
  $mutex.Dispose()
}
