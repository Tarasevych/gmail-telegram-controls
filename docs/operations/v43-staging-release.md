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

## Live staging created for owner testing

- Immutable Apps Script version `36` was created from the exact preserved product-v43 hashes.
- The isolated staging deployment is `AKfycbwsvrzCSnypeI8MASLeiev0Km8t0f2MXNKv7hApCSdvwEb3eftZ1k2ITDtMXiX5HWuE`.
- The stable deployment remains pinned to immutable version `35`; a post-stage GET-only preflight reports `stableVersion: 35`, `headState: stable_v35`, `stagingCount: 1`, and journal state `staging_verified`.
- Direct `?action=mailbox` staging rendering returned HTTP 200. A temporary `noindex` GitHub Pages bridge is live at `https://tarasevych.github.io/gmail-telegram-controls/v43-staging-acceptance-20260718.html` so Telegram can pass fresh signed `initData` across the Apps Script redirect boundary.
- Only the owner chat menu was temporarily changed, from the preserved production button to `🧪 Пошта v43`; an exact restore helper is preserved outside Git. Production code, production deployment, Gmail data, OAuth grants, and unrelated Telegram zones were not changed.
- Telegram Desktop opened the v43 Mini App successfully through the owner button with valid Telegram launch data. Automated interaction stopped immediately when concurrent user input was detected; the test surface remains active for manual acceptance. ADB reported no connected device, so no phone automation was attempted.

When owner testing is complete: restore the exact production menu first, remove and 404-verify the temporary bridge, then run the guarded `CleanupStaging` mode and confirm stable v35, exact v35 HEAD, zero staging deployments, and journal state `cleaned`.
