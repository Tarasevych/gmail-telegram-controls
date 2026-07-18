#Requires -Version 7.0

[CmdletBinding()]
param(
  [switch]$Preflight,
  [switch]$StageHelper,
  [switch]$RestoreHead
)

$ErrorActionPreference = 'Stop'
$ProgressPreference = 'SilentlyContinue'

$selected = @($Preflight, $StageHelper, $RestoreHead | Where-Object { $_ }).Count
if ($selected -ne 1) {
  throw 'Choose exactly one mode: Preflight, StageHelper, or RestoreHead.'
}

$ScriptId = '1Lxm-LJsGCRAz_LO0EjSlXnikx0oDioX6CdmiMhyLRmAAJ1fCk63S_1mS'
$StableVersion = 32
$HelperName = 'codexRecoverOwnerMailboxSessionCapacityOnce'
$JournalPath = Join-Path $HOME '.codex\recovery\019f5d65-8209-7a00-b915-4a522dbcb612-session-capacity.json'

$HelperSource = @'

/**
 * One-time owner-only recovery helper staged in Apps Script HEAD.
 * It never touches Gmail, OAuth grants, Telegram messages, or another user.
 */
function codexRecoverOwnerMailboxSessionCapacityOnce() {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(10000)) throw new Error('SESSION_RECOVERY_BUSY');
  try {
    const properties = PropertiesService.getScriptProperties();
    const ownerId = String(properties.getProperty('CHAT_ID') || '').trim();
    if (!/^\d+$/.test(ownerId)) throw new Error('SESSION_RECOVERY_OWNER_MISSING');
    const key = 'MAILBOX_REFRESH_FAMILIES_V1';
    const raw = String(properties.getProperty(key) || '');
    const rows = JSON.parse(raw || '[]');
    if (!Array.isArray(rows)) throw new Error('SESSION_RECOVERY_REGISTRY_INVALID');

    const ownerRows = rows.filter(row => row && String(row.sub || '') === ownerId);
    ownerRows.forEach(row => {
      if (!Number.isFinite(Number(row.iat)) || !Number.isFinite(Number(row.exp))) {
        throw new Error('SESSION_RECOVERY_OWNER_RECORD_INVALID');
      }
    });
    const keepIds = Object.create(null);
    ownerRows
      .slice()
      .sort((left, right) => Number(right.iat) - Number(left.iat))
      .slice(0, 3)
      .forEach(row => { keepIds[String(row.fid || '')] = true; });

    const next = rows.filter(row => {
      if (!row || String(row.sub || '') !== ownerId) return true;
      return Boolean(keepIds[String(row.fid || '')]);
    });
    const removed = rows.length - next.length;
    if (removed > 0) properties.setProperty(key, JSON.stringify(next));
    const verified = JSON.parse(String(properties.getProperty(key) || '[]'));
    if (!Array.isArray(verified) || verified.length !== next.length) {
      throw new Error('SESSION_RECOVERY_VERIFY_FAILED');
    }
    return {
      before: rows.length,
      after: verified.length,
      removed: removed,
      ownerKept: Math.min(ownerRows.length, 3),
      otherPreserved: rows.length - ownerRows.length
    };
  } finally {
    lock.releaseLock();
  }
}
'@

function Get-Hash([string]$Text) {
  $normalized = $Text.Replace("`r`n", "`n").Replace("`r", "`n")
  $bytes = [Text.Encoding]::UTF8.GetBytes($normalized)
  return [Convert]::ToHexString([Security.Cryptography.SHA256]::HashData($bytes)).ToLowerInvariant()
}

function Get-ContentHashes($Content) {
  $hashes = [ordered]@{}
  foreach ($file in @($Content.files | Sort-Object name)) {
    $hashes[[string]$file.name] = Get-Hash ([string]$file.source)
  }
  return $hashes
}

function Test-SameHashes($Left, $Right) {
  return (($Left | ConvertTo-Json -Compress) -eq ($Right | ConvertTo-Json -Compress))
}

$clasp = $null
$token = $null
$refresh = $null
$accessToken = $null
try {
  $clasp = Get-Content -LiteralPath (Join-Path $HOME '.clasprc.json') -Raw | ConvertFrom-Json
  $token = $clasp.tokens.default
  if (-not $token.refresh_token -or -not $token.client_id -or -not $token.client_secret) {
    throw 'The protected local clasp refresh credentials are incomplete.'
  }
  $refresh = Invoke-RestMethod -Method Post -Uri 'https://oauth2.googleapis.com/token' -ContentType 'application/x-www-form-urlencoded' -Body @{
    client_id = [string]$token.client_id
    client_secret = [string]$token.client_secret
    refresh_token = [string]$token.refresh_token
    grant_type = 'refresh_token'
  }
  $accessToken = [string]$refresh.access_token
  if (-not $accessToken) { throw 'Google did not return an access token.' }
  $headers = @{ Authorization = "Bearer $accessToken" }
  $base = "https://script.googleapis.com/v1/projects/$ScriptId"
  $stable = Invoke-RestMethod -Method Get -Uri "$base/content?versionNumber=$StableVersion" -Headers $headers
  $head = Invoke-RestMethod -Method Get -Uri "$base/content" -Headers $headers
  $stableHashes = Get-ContentHashes $stable
  $headHashes = Get-ContentHashes $head

  $headCode = @($head.files | Where-Object name -eq 'Code')[0]
  $stableCode = @($stable.files | Where-Object name -eq 'Code')[0]
  if ($null -eq $headCode -or $null -eq $stableCode) { throw 'Code.gs is missing.' }
  $helperPresent = ([string]$headCode.source).Contains("function $HelperName(")
  $headWithoutHelper = $null
  if ($helperPresent) {
    $headWithoutHelper = [string]$headCode.source
    $marker = $headWithoutHelper.IndexOf("`n/**`n * One-time owner-only recovery helper staged in Apps Script HEAD.")
    if ($marker -lt 0) { throw 'A helper with this name exists but its exact marker is unknown.' }
    $headWithoutHelper = $headWithoutHelper.Substring(0, $marker)
  }
  $headBaseMatchesStable = if ($helperPresent) {
    (Get-Hash $headWithoutHelper) -eq (Get-Hash ([string]$stableCode.source)) -and
      (@($head.files | Where-Object name -ne 'Code' | ForEach-Object { Get-Hash ([string]$_.source) }) -join ',') -eq
      (@($stable.files | Where-Object name -ne 'Code' | ForEach-Object { Get-Hash ([string]$_.source) }) -join ',')
  } else {
    Test-SameHashes $headHashes $stableHashes
  }

  if (-not $headBaseMatchesStable) {
    throw 'Apps Script HEAD is not exact immutable v32 (with or without the known helper). Refusing mutation.'
  }

  $summary = [ordered]@{
    timestamp = (Get-Date).ToString('o')
    scriptId = $ScriptId
    stableVersion = $StableVersion
    helperPresent = $helperPresent
    stableHashes = $stableHashes
    headHashes = $headHashes
    status = if ($helperPresent) { 'helper_staged' } else { 'stable_head' }
  }

  if ($Preflight) {
    $summary | ConvertTo-Json -Depth 5
    return
  }

  if ($StageHelper) {
    if ($helperPresent) { throw 'The one-time helper is already staged.' }
    $candidate = $stable | ConvertTo-Json -Depth 30 | ConvertFrom-Json
    $candidateCode = @($candidate.files | Where-Object name -eq 'Code')[0]
    $candidateCode.source = [string]$candidateCode.source + $HelperSource
    $summary.status = 'stage_started'
    $summary | ConvertTo-Json -Depth 5 | Set-Content -LiteralPath $JournalPath -Encoding utf8
    $body = @{ files = @($candidate.files) } | ConvertTo-Json -Depth 30 -Compress
    Invoke-RestMethod -Method Put -Uri "$base/content" -Headers $headers -ContentType 'application/json; charset=utf-8' -Body $body | Out-Null
    $verify = Invoke-RestMethod -Method Get -Uri "$base/content" -Headers $headers
    $verifyCode = @($verify.files | Where-Object name -eq 'Code')[0]
    if (-not ([string]$verifyCode.source).Contains("function $HelperName(")) {
      throw 'The recovery helper was not verified in HEAD.'
    }
    $summary.status = 'helper_staged_verified'
    $summary.candidateHashes = Get-ContentHashes $verify
    $summary | ConvertTo-Json -Depth 5 | Set-Content -LiteralPath $JournalPath -Encoding utf8
    [pscustomobject]@{status=$summary.status;helper=$HelperName;journal=$JournalPath} | ConvertTo-Json -Compress
    return
  }

  if ($RestoreHead) {
    if (-not $helperPresent) {
      [pscustomobject]@{status='already_stable';journal=$JournalPath} | ConvertTo-Json -Compress
      return
    }
    $body = @{ files = @($stable.files) } | ConvertTo-Json -Depth 30 -Compress
    Invoke-RestMethod -Method Put -Uri "$base/content" -Headers $headers -ContentType 'application/json; charset=utf-8' -Body $body | Out-Null
    $verify = Invoke-RestMethod -Method Get -Uri "$base/content" -Headers $headers
    if (-not (Test-SameHashes (Get-ContentHashes $verify) $stableHashes)) {
      throw 'Immutable v32 HEAD restoration did not verify.'
    }
    $summary.status = 'head_restored_verified'
    $summary.restoredHashes = Get-ContentHashes $verify
    $summary | ConvertTo-Json -Depth 5 | Set-Content -LiteralPath $JournalPath -Encoding utf8
    [pscustomobject]@{status=$summary.status;journal=$JournalPath} | ConvertTo-Json -Compress
  }
} finally {
  $accessToken = $null
  $refresh = $null
  $token = $null
  $clasp = $null
}
