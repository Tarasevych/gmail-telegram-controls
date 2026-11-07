# VR-024 — Fail-fast URL Fetch quota circuit

[Українською](../../../../uk/verification-reports/reports/VR-024/README.md)

- **Date:** 2026-07-23
- **Overall status:** PARTIAL
- **Source request:** `REQ-0034`
- **Verification framework:** `REQ-0004`
- **Product task:** `B1-34`
- **Issue:** `GT-054`
- **Release boundary:** source only; production v65, staging `0`, immutable v70 unchanged; no OAuth, Gmail, Telegram, menu, deployment, or release-journal mutation

## Confirmed root cause

Authenticated Apps Script execution evidence showed that the timer worker did not stop at the first daily URL Fetch quota signal. It continued through quota-dependent retention, reminder, OAuth-refresh, and legacy-recovery paths before terminating. The source confirmed that best-effort stage catches logged failures and continued. The prior `GT-024` conclusion that the quota itself is shared and external remains valid; `GT-054` is the separate fail-fast defect that amplified retries and runtime pressure after exhaustion.

## Source correction

1. A Script Properties circuit stores only `{v, u}`: schema version and expiry.
2. The first classified daily URL Fetch exception opens a 15-minute probe window.
3. Gmail, Telegram, and Google token-refresh transport catches propagate the quota signal before wrapping or swallowing their domain error.
4. The timer stops the current pipeline, releases its tokenized lease, and writes content-free `quota_blocked` / `quota_circuit` telemetry.
5. Minute invocations inside the open window perform no mail or transport work.
6. After expiry, one execution probes recovery; another quota exception reopens the window.
7. The circuit does not claim Google's exact reset time and does not alter OAuth or mailbox state.

## Atomic claims

| ID | Claim | Status | Evidence |
|---|---|---|---|
| VR-024-01 | The worker continued quota-dependent stages after the first daily URL Fetch signal. | VERIFIED | authenticated execution stages and content-free error sequence |
| VR-024-02 | Apps Script daily quotas are per user and reset 24 hours after the first request; exceeding them throws an exception. | VERIFIED | official Apps Script quota documentation |
| VR-024-03 | The circuit record contains no user, account, message, token, URL, or mail identifier. | VERIFIED | deterministic content-free record contract and added-line scan |
| VR-024-04 | An open circuit skips the full timer pipeline and releases its lease with quota telemetry. | VERIFIED | runtime-budget VM contract |
| VR-024-05 | Gmail, Telegram, and Google refresh transport exceptions can trip the same circuit before domain wrapping. | VERIFIED | source contracts |
| VR-024-06 | Focused runtime-budget contracts pass `9/9`; the complete Apps Script suite passes `593/593`. | VERIFIED | local Node test traces |
| VR-024-07 | The circuit restores live delivery after quota reset and satisfies native acceptance. | UNVERIFIED | no staging or production runtime mutation |

## Platform and recovery boundary

[Official Apps Script quotas](https://developers.google.com/apps-script/guides/services/quotas) document per-user daily limits, a 24-hour reset after the first request, and exceptions on exhaustion. They do not expose the exact reset timestamp to this project. A 15-minute probe is therefore a bounded backoff, not a claim about reset timing. Gmail History and durable notification state remain responsible for catching up after recovery.

This correction cannot replenish an exhausted quota. It prevents repeated minute-scale pressure and preserves a causal acceptance window. A new immutable candidate is not created by this source contour. Staging and production remain gated by clean quota readback and the normal owner-authorized release process.
