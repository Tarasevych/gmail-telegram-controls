# Product v43 isolated staging

This lane deploys the exact preserved product-v43 source as immutable Apps Script v36 for testing while keeping the stable deployment pinned to immutable v35.

## Guardrails

- `stage_apps_script_v36_product_v43.ps1` has only `PreflightOnly`, `StageOnly`, and `CleanupStaging`; it has no production-promotion path.
- Stable v35 and candidate v43 source hashes are pinned independently.
- Version and deployment creation are journal-reserved before the provider request and cannot be replayed after an unresolved outcome.
- A verified, deleted, or cleaned staging lane cannot create a second deployment.
- Apps Script HEAD is restored to exact v35 after staging and on every handled failure path.
- Cleanup is resumable after a successful DELETE whose response was lost.

## Verification before provider mutation

- PowerShell parser: passed.
- Staging-helper contracts: 3/3 passed.
- Complete ordinary product plus staging matrix: 371/371 passed.
- Independent read-only review found and drove fixes for failure-safe HEAD restoration, idempotent cleanup, and duplicate-staging prevention. Final rereview reported no findings.

The staging deployment must not be promoted. It is intended for read-only desktop and Telegram WebView acceptance before any separate production-release decision.
