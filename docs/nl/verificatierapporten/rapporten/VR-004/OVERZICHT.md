# VR-004: Stabilization and root-cause audit after the v56 rollback

[Українська](../../../../uk/verification-reports/reports/VR-004/README.md) | [Index](../../INDEX.md)

- **Date:** 2026-07-21
- **Request:** REQ-0020
- **Framework:** REQ-0004
- **Product line:** Versie 1
- **Audit branch:** `audit/diagnostic-fix`
- **Target commit:** `55964930e2585ff634bddd0be8d0345d7ba964d2`
- **Code/release/runtime change:** no

## Decision

The last fully production-accepted Git boundary is PR #3 merge commit `0b739ad0671d24cc337724817953d821c29cc52d`, which documents v55 acceptance. `main` already contains the cumulative v56 candidate through PR #4 merge commit `23927148cfa616dbd1504e81768d013b01a9ed37`, but production was rolled back exactly to v55. A green v56 merge therefore does not equal production acceptance.

The current network failure is not proven to be a v56 regression: the same symptom repeated after the exact rollback to v55. Apps Script executions localized the active blocker to `gmailApiRequest_`: the daily `URLFetch` quota is exhausted. Re-promotion, OAuth, or changes to stable modules are prohibited until a healthy v55 baseline exists.

## Frozen stable area

The following blocks have production/test evidence through v55 and are not targets of the current repair:

| Block | Verified contract | Status |
|---|---|---|
| Multi-account registry | UI active account is separate from notification fan-out; connection/zone scope is preserved | frozen |
| Signed Telegram bootstrap | signature, TTL, replay guard, owner/session binding | frozen |
| Account UI | avatar, three account roots, existing-session one-click switch | frozen |
| Delivery ordering | realtime lane runs before maintenance/frozen backlog | frozen |
| Dedupe | SENT+INBOX eligibility produces at most one physical Telegram card | frozen |
| Card index/capacity/retention | compaction before capacity guard, active-card safety, bounded purge | frozen |
| Lock isolation | short lane-specific leases; no shared lock during Gmail/Telegram I/O | frozen |
| Mail actions/callbacks | account-bound Telegram card actions and Gmail mutation scope | frozen |
| OAuth/session model | current token/session contracts; no new consent was started by this audit | frozen |

Any future fix must begin in timer scheduling/error classification. `MailClient.gs`, `MultiAccount.gs`, OAuth, session, card-index, dedupe, and Gmail action paths remain unchanged unless new direct evidence places the root cause there.

## Stable/candidate boundary

| Surface | Actual state | Interpretation |
|---|---|---|
| Production-accepted Git boundary | `0b739ad...` / PR #3 | stable v55 evidence |
| `origin/main` | `2392714...` / PR #4 | cumulative v56 candidate code |
| Runtime production/HEAD | exact rollback v55 | safe runtime fallback |
| Immutable staging | v56 retained | historical A/B candidate, not stable |
| Documentation blocker | PR #5, commit `5596493...` | open, clean, blocked on shared baseline |
| Audit branch | `audit/diagnostic-fix` from `5596493...` | diagnostics/docs only |

## Diagnostic evidence

- All 14 existing worktrees were clean; there were no unpreserved changes. An empty checkpoint commit was intentionally not created because commit `5596493...` already preserves the actual state.
- No development, autofix, release-helper, or test-watch process was found. The production `TelegramBeheer` task was not stopped because it is not a temporary diagnostic process.
- The full tracked Node suite on `audit/diagnostic-fix` passed: **20 files, 441/441 tests, 0 failures**.
- v56 and rollback v55 completed `doPost`, session redemption/renewal, and `mailboxRpc`; repeated `checkNewMail_` executions failed in `gmailApiRequest_` with the content-free error `Service invoked too many times for one day: urlfetch`.
- The same network symptom on the candidate and stable rollback disproves a proven candidate-specific regression. It does not prove that v56 is production-ready.

Follow-up verification with cumulative v57 confirmed the same shared boundary: staging v57 and two fresh production v55 launches showed the same mailbox error; v57 `doPost`, `mailboxRedeemLaunch`, and `mailboxRpc` completed, while the worker logged OAuth refresh failure and the exact daily `urlfetch` quota error. Production remains v55, immutable v56 is historical, one v57 staging deployment is preserved, and the menu points to production.

Separate evidence appendices:

- [CI failure audit: all 26 runs](CI_FAILURE_AUDIT.md)
- [Runtime quota evidence: v55/v57](RUNTIME_QUOTA_EVIDENCE.md)
- [Stage 1 continuation audit: Git/runtime/process baseline](STAGE_1_CONTINUATION_AUDIT.md)
- [Advanced Gmail service: multi-account compatibility](ADVANCED_GMAIL_COMPATIBILITY.md)

## Atomic findings

| ID | Category | Status | Evidence | Statement |
|---|---|---|---|---|
| VR4-001 | release | verified | E5 | PR #3 / `0b739ad...` is the last production-accepted v55 Git boundary. |
| VR4-002 | release | verified | E4 | `main` contains the v56 candidate, but production runtime was rolled back exactly to v55. |
| VR4-003 | recovery | verified | E3 | 14/14 worktrees were clean; no empty checkpoint was needed; the audit branch is isolated. |
| VR4-004 | tests | verified | E3 | The complete tracked suite passed 441/441. |
| VR4-005 | root-cause | verified | E4 | The same network symptom on v56 and rollback v55 does not prove a candidate regression. |
| VR4-006 | root-cause | verified | E4 | The active blocker is exhausted daily `URLFetch` quota in `gmailApiRequest_`. |
| VR4-007 | root-cause | partial | E4 | Overlap and all-account History are a pressure pattern; exact per-path total is not enumerated. |
| VR4-008 | release | verified | E2 | Merge/checks/tests do not replace production acceptance evidence. |
| VR4-009 | safety | recommendation | E0 | Freeze stable account/session/card/OAuth paths until new direct evidence exists. |
| VR4-010 | release | recommendation | E0 | Continue only through a healthy v55 baseline and controlled owner-only A/B. |
| VR4-011 | CI | verified | E4 | The GitHub Actions API confirmed exactly 26 historical failures: 12 Request ledger and 14 Verification reports. |
| VR4-012 | CI | verified | E4 | Follow-up commits fixed the schema/hash defects; historical failed runs remain immutable evidence. |
| VR4-013 | root-cause | verified | E4 | The same v55/v57 UI symptom and exact worker error confirm a shared quota blocker, not a proven v57 regression. |

## Root-cause analysis

### RC-1 — shared Apps Script URLFetch daily quota exhaustion

The current operational failure is caused by the exhausted shared daily `URLFetch` quota. It blocks Gmail API calls in the worker and can surface as a generic network error in the mailbox UI. Switching between v55 and v56 does not restore the shared quota, so repeated rollout/rollback cycles only consume more resources and confound diagnosis.

Repeated minute `checkNewMail_` runs, all-account History fan-out, and executions longer than the trigger interval form a confirmed pressure pattern. The exact contribution of each call path to the daily total has not been enumerated, so this mechanism is `partial`, not a second fully proven quota cause.

### RC-2 — split release authority

Git `main`, immutable staging, and production runtime represented different acceptance levels: a merged v56 candidate versus a production rollback to v55. Under the shared quota failure, the same symptom could be misclassified as a candidate regression. Production acceptance evidence, not a merge, green checks, or local tests alone, is the sole stable authority.

## What is at risk

- realtime Gmail-to-Telegram delivery;
- frozen/history recovery and manual `/check`;
- mailbox list/bootstrap after it reaches Gmail API calls;
- A/B validity if it is run while quota is already exhausted.

There is no evidence of a new failure in account registry, avatar/roots, one-click switch, signed session, card index, retention, dedupe, or callbacks. They remain frozen.

## Safe repair plan

1. Do not change code or switch releases until quota recovers.
2. On v55, complete two fresh production mailbox launches without a network error; this is the mandatory baseline.
3. Only after that baseline, run an owner-only signed v57 staging launch and verify avatar, three roots, and switching to the second Gmail account and back without OAuth.
4. If v57 passes A/B, run the standard Promote, two production launches, and `CleanupStaging`.
5. After promotion, observe at least four trigger opportunities; confirm no overlap, the 150-second worker slot, and the 15-minute History slot.
6. Send one owner self-message with a unique marker; expect exactly one Telegram card and no duplicate after two `/check` runs.
7. If a new failure is candidate-only, do not change immutable v56/v57: create cumulative v58 and limit the patch to the proven block. Exact rollback remains v55.
8. If failure is identical on v55 and the candidate, do not switch releases; keep the shared blocker open and continue quota telemetry.

## GitHub status map

| PR | Status | Audit decision |
|---|---|---|
| #1 | merged | Done; v55 delivery hardening and VR-003 evidence |
| #2 | merged | Done; v55 staging bridge |
| #3 | merged | Done; last production-accepted evidence boundary |
| #4 | merged | Candidate; code/tests merged, production acceptance blocked |
| #5 | open, clean | Blocked; shared quota baseline and controlled A/B pending |
| #6 | open, clean | VR-004 and evidence appendices; merge after #5 |
| #7 | merged | Connection-scoped Gmail metadata identity fix |
| #8 | merged | Isolated immutable v57 staging launcher |

Repository Issues are disabled. Until GitHub Projects scope is confirmed, PR comments and this report are the authoritative task-status surface.

## Limitations

- The audit started no new Gmail/OAuth flow and changed no mail, Telegram state, Apps Script deployment, triggers, or Script Properties.
- 441/441 proves local regression contracts, not production health.
- Quota did not recover during the audit; A/B acceptance remains pending.
- Private execution identifiers, mailbox content, tokens, `initData`, and secret properties are not published.
