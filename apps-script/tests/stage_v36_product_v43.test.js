const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const assert = require('node:assert/strict');

const helperPath = path.join(__dirname, '..', 'tools', 'stage_apps_script_v36_product_v43.ps1');
const source = fs.readFileSync(helperPath, 'utf8');

test('v43 staging helper is pinned and cannot promote production', () => {
  assert.match(source, /\$StableVersion = 35/);
  assert.match(source, /\$CandidateVersion = 36/);
  assert.match(source, /Telegram Gmail product v43 isolated staging/);
  assert.match(source, /Stable must remain exact v\$StableVersion/);
  assert.match(source, /Stable deployment changed during staging/);
  assert.doesNotMatch(source, /\[switch\]\$Promote|mode='promote'|deploymentConfig=@\{/);
  assert.doesNotMatch(source, /Invoke-GoogleJson PUT \$stableUri/,
    'the stable deployment must have no write path');
});

test('v43 staging creates at most one immutable and one staging deployment then restores HEAD', () => {
  assert.match(source, /Write-Journal 'version_create_reserved'[\s\S]*Invoke-GoogleJson POST "\$base\/versions"/);
  assert.match(source, /Write-Journal 'staging_create_reserved'[\s\S]*Invoke-GoogleJson POST "\$base\/deployments"/);
  assert.match(source, /Unresolved versions\.create; refusing automatic replay/);
  assert.match(source, /Unresolved deployments\.create; refusing automatic replay/);
  assert.match(source, /'staging_verified', 'cleanup_delete_reserved', 'cleaned'[\s\S]*cannot be recreated/,
    'a verified, deleted, or cleaned staging lane must never create a second deployment');
  assert.match(source, /stageJournalState -notin @\('', 'version_create_reserved', 'version_verified'\)/,
    'only never-created or reconciled immutable states may enter the first deployment create');
  assert.match(source, /if \(\$staging\.Count -gt 1\)/);
  assert.match(source, /Assert-Hashes \(Invoke-GoogleJson GET "\$Base\/content"\) \$ExpectedStableHashes 'Restored v35 HEAD'/);
  assert.match(source, /catch \{[\s\S]*Restore-StableHead \$base \$stableContent[\s\S]*throw/,
    'every failed stage path must restore the verified stable HEAD before surfacing the error');
  assert.match(source, /\$JournalPath = Join-Path \$HOME '\.codex\\recovery\\019f5d65-8209-7a00-b915-4a522dbcb612-v43-staging\.json'/);
});

test('v43 cleanup resumes after an accepted delete with a lost response', () => {
  assert.match(source, /'staging_verified', 'cleanup_delete_reserved', 'cleaned'/);
  assert.match(source, /Restore-StableHead \$base \$stableContent[\s\S]*Write-Journal 'cleanup_delete_reserved'/,
    'HEAD restoration must precede the deployment delete reservation');
  assert.match(source, /Invoke-GoogleJson DELETE[\s\S]*Staging deployment still exists after cleanup/);
  assert.match(source, /Write-Journal 'cleaned'/);
});
