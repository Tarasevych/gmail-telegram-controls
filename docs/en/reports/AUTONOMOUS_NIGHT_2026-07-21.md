# Autonomous night completion report - 2026-07-21

Source request: `REQ-0025`  
Checkpoint status: **complete_with_blockers**  
Evidence cutoff: **2026-07-21 23:10 +02:00 (Europe/Brussels)**  
Canonical repository: `Tarasevych/gmail-telegram-controls`

## Executive result

All independent work that remained safe without changing production, repeating OAuth, consuming the exhausted Apps Script quota, or creating an unauthorized immutable was completed and preserved. GitHub remains canonical. Verified refs were mirrored to the private GitLab project by ordinary non-force pushes.

Two independent gates remain:

1. The Apps Script daily `URLFETCH` quota must recover before controlled live A/B acceptance can resume.
2. The owner must explicitly authorize the next immutable before the isolated Advanced Gmail source candidate can receive a new hash-pinned release helper, pass the complete release suite, merge, or deploy.

Production was not left on an unverified candidate.

## Requirement-by-requirement audit

| Requirement | Status | Evidence and limitation |
|---|---|---|
| Read-only Git/worktree audit | verified | Canonical `main` is `660bc6a52e949925f1855dcaaf79ac5de9b2d188`; the request and source-candidate worktrees are clean; no unfinished Git operation was found in the Stage 1 audit. |
| GitHub PR and Actions audit | verified | Only draft PR [#11](https://github.com/Tarasevych/gmail-telegram-controls/pull/11) remains open. Main knowledge-hub, bilingual, verification-report, and Pages runs are green. |
| Private recovery mirror | verified | GitHub and private GitLab hashes match for `main`, `Запити`, and `fix/versie-001-owner-gmail-read-adapter`; GitHub remains the sole source of truth. |
| Process cleanup | verified | No temporary Git, Node, Python, verification, watcher, or browser diagnostic process created by this work remained. Unrelated TCK jobs and production controls were not touched. |
| Research corpus audit | verified | The three deep-research reports were hashed and classified during Stage 1; the sanitized result is in the [Stage 1 continuation audit](../verification-reports/reports/VR-004/STAGE_1_CONTINUATION_AUDIT.md). |
| Clean baseline | verified | The clean main Apps Script/product suite passed `444/444`; paired documentation and factual-report validators passed; tracked secret-signature scan found no files. |
| Request/schema failures | verified complete | Canonical template/parser, route diagnostics, regression fixtures, bilingual checks, and LF/CRLF-stable report hashing are already green. Historical failed runs were not misclassified as current failures. |
| Gmail primary-source compatibility | verified within static scope | Official Google documentation and project token boundaries show that wholesale Advanced Gmail migration would break external connection isolation; only an owner-lane adapter is safe to test. Runtime quota reduction remains unverified. |
| Owner-only Advanced Gmail adapter | partial | Commit [`0b0c361a7edf0cdca2099090fe0d5c25185e63f8`](https://github.com/Tarasevych/gmail-telegram-controls/commit/0b0c361a7edf0cdca2099090fe0d5c25185e63f8) adds a protected allowlisted adapter. Targeted tests pass `8/8`; the complete suite is intentionally blocked at `451/452` by the immutable v57 hash gate. Draft PR #11 is not mergeable or deployable. |
| Production/staging A/B | blocked | A fresh execution still ended with the daily `urlfetch` quota exception. No further quota-consuming launch or retry loop was performed. |
| OAuth/fresh account acceptance | unverified | No repeated OAuth, new Google consent, CAPTCHA, OTP, passkey, or Gmail mutation was attempted. Existing sessions do not prove fresh consent or second-account fan-out. |

## State differences from the initial handoff

| Handoff claim | Verified current state |
|---|---|
| Main was approximately `23927148...` | Main advanced through normal PRs to `660bc6a52e949925f1855dcaaf79ac5de9b2d188`. |
| Request branch was at least `ed21a2d...` | `Запити` is `c5683e5f6a17918cfc308837213fc5c33537d823` after `REQ-0025`. |
| PR #5 and #6 could be open | They are no longer open; only draft PR #11 is open. |
| Local baseline was `441/441` | The clean-main baseline is `444/444`; the isolated candidate adds eight tests and is `451/452` because the release hash gate correctly blocks it. |
| Safe runtime was v55 with preserved v56 staging | Runtime later preserved immutable v56 as history and one owner-only v57 staging deployment while stable production remained v55. |

## Commits and branches

| Purpose | Ref | Result |
|---|---|---|
| Stage 1 factual continuation evidence | PR #9 / `fcbceb63e61da2e94e189743959654bffd6098b3` | merged normally |
| Official Advanced Gmail compatibility evidence | PR #10 / `660bc6a52e949925f1855dcaaf79ac5de9b2d188` | merged normally; current main |
| Owner-only adapter request | `REQ-0024`, request commits `c7dfdb6` and `82e3d24` | recorded, then blocked with evidence |
| Owner-only adapter source | branch `fix/versie-001-owner-gmail-read-adapter`, commit `0b0c361a7edf0cdca2099090fe0d5c25185e63f8` | preserved in draft PR #11; not merged |
| Completion report request | `REQ-0025`, commit `c5683e5f6a17918cfc308837213fc5c33537d823` | recorded; request workflows green |

## Test and CI evidence

| Gate | Result |
|---|---|
| Clean main Apps Script/product tests | `444/444` passed |
| Advanced Gmail adapter targeted tests | `8/8` passed |
| Advanced Gmail candidate full suite | `451/452`; only the exact immutable v57 source-hash contract failed |
| Bilingual validator | `50/50` UK/EN page pairs before this report; this report adds one paired path |
| Knowledge hub validator | 17 language pairs, 295 source IDs, 245 canonical items, 8 explicit conflicts |
| Verification-report validator | passed: VR-001 245 claims and VR-003 32 claims |
| Request ledger | 25 indexed requests passed before this report implementation |
| Privacy checks | `diff --check` and secret-signature scans passed; no protected values were published |

Relevant successful main runs:

- [Knowledge hub 29866782044](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29866782044)
- [Bilingual documentation 29866782042](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29866782042)
- [Verification reports 29866782162](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29866782162)
- [Pages 29866781002](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29866781002)

## Runtime and release boundary

| Surface | Verified state |
|---|---|
| Product | Versie 1 |
| Stable production | Apps Script immutable v55 |
| Immutable history | v56 preserved |
| Owner-only staging | one v57 deployment preserved |
| Telegram menu | production target |
| Trigger | one minute `checkNewMail_`; not changed |
| Release journal | staging-verified state preserved; no promotion performed in this phase |
| Advanced Gmail flag | unset; runtime behavior unchanged |

The latest inspected failed execution at 22:49:14 ended in `gmailApiRequest_` through the notification scan path with the exact daily `urlfetch` quota exception. This proves a shared external blocker, not a v57-specific regression.

## Crash Report 1 - Apps Script quota

| Field | Value |
|---|---|
| Timestamp | 2026-07-21 22:49:14 +02:00 |
| Subsystem | Apps Script minute worker / Gmail API transport |
| Sanitized error | `Exception: Service invoked too many times for one day: urlfetch` |
| Attempted action | Read-only inspection of the latest failed worker execution after preserving production v55 |
| One alternative | Stopped live retries and continued with official-source compatibility analysis plus an isolated local adapter |
| Evidence locator | Apps Script Executions; `REQ-0024`; local recovery checkpoint |
| Preserved state | production v55, historical v56, one owner-only staging v57, Telegram menu on production |
| Retry condition | Daily quota recovery confirmed by two clean production v55 launches |
| Manual action required | No immediate account action; wait for external recovery |
| Safe next action | Do not consume quota; keep the blocker open and continue local/documentation work |

## Crash Report 2 - immutable release contract

| Field | Value |
|---|---|
| Timestamp | 2026-07-21 23:00 +02:00 |
| Subsystem | Versie 1 release hash-pinning test |
| Sanitized error | Current `Code.gs` hash `685aa67...` differs from immutable v57 pinned hash `5c609754...` |
| Attempted action | Full local suite after adding the feature-flagged owner-only adapter |
| One alternative | Preserved v57 unchanged, documented the gate, and pushed the source only to an isolated branch and draft PR |
| Evidence locator | `apps-script/tests/release_versie_001_20260719.test.js`; draft PR #11 |
| Preserved state | v57 helper and immutable history unchanged; source commit preserved at `0b0c361...` |
| Retry condition | Direct owner authorization for the next immutable and a new exact hash-pinned helper |
| Manual action required | Yes, an explicit next-immutable authorization |
| Safe next action | Keep PR #11 draft and unmerged |

## Manual gates

- No CAPTCHA, OTP/2FA, passkey, biometric, hardware-key, payment, or new Google consent gate was entered during this continuation.
- No account identity or Gmail/Telegram zone was guessed.
- The remaining manual decision is release governance, not authentication.

## Unfinished blockers

- `GT-023/GT-024`: external daily `URLFETCH` recovery and controlled v55-to-staging A/B.
- `GT-026`: source adapter is locally isolated but cannot merge or deploy under the immutable v57 hash contract.
- Fresh Google account consent/callback and independent second-account realtime fan-out remain unverified.

## One recommended next action

The owner should explicitly authorize the next immutable within Versie 1. After that authorization, create a new cumulative hash-pinned helper without rewriting v56/v57, restore a fully green local suite, and only after quota recovery run the existing staging A/B gate before any production promotion.

## Privacy boundary

This report contains no mail content, private email address, OAuth token, authorization code, cookie, Telegram `initData`, chat/user identifier, deployment identifier, or secret property value.
