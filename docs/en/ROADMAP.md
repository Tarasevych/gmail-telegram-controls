# Roadmap

Updated: **2026-07-21**. Single active version: **Versie 1**.

| ID | Status | Step | Completion evidence |
|---|---|---|---|
| B1-01 | Completed | Restore the v45 source of truth and inspect Git/production | correct remote; production v37 confirmed |
| B1-02 | Completed | Identify the cause of duplicate Telegram cards | legacy + OAuth double scan found; one trigger confirmed |
| B1-03 | Completed locally | Owner mailbox dedupe, avatar, direct OAuth start, stale account count | local contracts pass |
| B1-04 | Completed locally | Neutral GitHub OAuth callback with a credentialless POST to Apps Script | query cleared before transfer; one-use user/chat/zone state; Google multi-login cookies omitted |
| B1-05 | Completed | Save the new redirect URI in the Google OAuth client | `OAuth client saved`; exact URI read back |
| B1-06 | Completed | Credentialless OAuth relay and sequential immutable v41/v42 | stable v42, staging 0, exact v41 rollback |
| B1-07 | Unverified | Add a new controlled Gmail account through a fresh OAuth flow | existing connections work; no new account choice/consent/callback was performed during E4/E5 |
| B1-08 | Completed in production for the owner lane | Full real-time acceptance in @TarasevychGmailNotifierBot | stable v55 automatically delivered one card; two `/check` runs created no duplicate; exact-marker count remained 1 |
| B1-09 | Completed | Promote, clean up, and install the production Web App menu | stable v55, staging 0, legacy staging 0, journal `cleaned`; menu opens the neutral GitHub Pages bridge |
| B1-10 | Completed | Update UK/EN docs, commit, and push | postmortem and lessons published at c98e69e; three documentation Actions passed; release tag remains gated by B1-07/B1-08 |

| B1-11 | Completed in production | Separate realtime delivery from the frozen backlog and run it before maintenance | the bounded recent-window lane in stable v55 delivered the controlled message before backlog maintenance |
| B1-12 | Partially staging verified | Aggregate every notification account into one physical Telegram feed with account identity and account-scoped actions | three isolated account roots and one-click switching passed; independent live fan-out from a second account remains unverified |

## Movement rule

Versie 2 is not opened without the exact owner instruction `Next Versie authorization: yes, Versie 2`. Until that instruction, every authorized change remains on the active Versie 1 line, but no existing immutable Apps Script artifact is rewritten. New findings receive a `GT-*` record in [ISSUES.md](ISSUES.md).

## B1-20–B1-22 superseding update after v59 — 2026-07-22

- **B1-20:** the owner-only Advanced Gmail adapter is integrated into immutable v59, but the protected flag remained disabled; mailbox acceptance does not prove quota reduction. Status: `PARTIAL`.
- **B1-21:** the label UI was live-verified on v59 staging: create/manage controls, USER/SYSTEM separation, bounded scrolling, and long nested names worked without overlap. Mutating label operations were not run; production is v57 again after GT-030. Status: `PARTIAL`.
- **B1-22:** stale automatic-route recovery was live-verified on v59 staging and two production launches. The fix is not part of current v63 after the exact rollback. Status: `PARTIAL`.

## B1-23 — v59 runtime gate and exact rollback

- **Status:** BLOCKED; safe state restored.
- **Completed:** immutable v59 was staged once, UI acceptance passed, promotion and two production launches passed, and cleanup removed staging.
- **Blocker:** a post-cleanup `214.96 s` execution exceeded the 150-second target and overlapped the next execution window; root cause is `UNVERIFIED`.
- **Protection:** exact rollback to v63; stable and HEAD v63, staging `0`, journal `rolled_back`; a fresh rollback mailbox launch passed.
- **Next:** investigate GT-030 without creating a repeat immutable. The next cumulative candidate is allowed only for a new causal code delta, not an endless staging loop.
- **Evidence:** [VR-007](verification-reports/reports/VR-007/README.md). Source requests: `REQ-0030`, `REQ-0031`.

## Cumulative research roadmap

Long-term report-derived phases, dependencies, and evidence gates are in the [Master Roadmap](knowledge-hub/MASTER_ROADMAP.md). The current `B1-*` release gates above remain authoritative for Versie 1.

## Verification gate

`VR-001` completed repository/test classification for 245/245 `KH-*` claims: [report](verification-reports/reports/VR-001/README.md). E4/E5 for the existing owner connection and the v55 promotion are now evidenced; they do not close B1-07 fresh OAuth or B1-12 second-account fan-out. Current continuation: `REQ-0018`.

### B1-13 — Concurrent Gmail OAuth refresh isolation

- **Status:** deployed in stable v55; concurrency verified by deterministic local tests.
- **Result:** each Gmail connection now uses a short ScriptLock only for claim/commit/release plus a lease in protected Script Properties; HTTP refresh runs outside the lock.
- **Invariants:** an active lease prevents a second provider fetch; connection ID, email, token generation, and the current token record are rechecked before commit; a failure releases its owned lease without changing the protected token.
- **Evidence:** deterministic local tests and the candidate hash pin for the current Versie 1.
- **Source request:** REQ-0015.
- **Production evidence:** immutable v55, E4/E5, and cleanup passed; no forced live token refresh or fresh OAuth cycle was performed.

### B1-14 — Conflict-free bridge and product integration

- **Status:** completed.
- **Result:** bridge-only PR #2 (`a7df53c`) and product PR #1 (`ee9286e`) merged normally; the `delete/modify` conflict kept the verified bridge from `main`.
- **No loss:** product fixes, immutable history, and rollback v50 remain; the obsolete bridge deletion was not carried forward.

### B1-15 — Cold start and production observability

- **Status:** in progress.
- **GT-021:** the first Web App open can require a refresh after a prolonged skeleton.
- **GT-022:** `clasp logs` requires the exact verified GCP project ID; do not guess identity.

### B1-16 — Close the delivery-worker overlap gate

- **Status:** VERIFIED
- **Release:** immutable v64 is production and HEAD; staging is `0`. The worker code accepted in v63 is unchanged in v64.
- **Completed:** deterministic reproduction, tokenized seven-minute crash lease, 150-second soft stage deadline, token-matched release, focused `17/17`, cumulative `501/501`, v63 owner acceptance and seven successive no-overlap runtime executions.
- **v64 observation:** six post-cleanup executions completed. One 3.164-second process shell overlapped the preceding row by about 5.7 seconds; no concurrent long-running worker body was observed, while the exact lease-rejection substage remains UNVERIFIED.
- **Evidence:** [VR-011](verification-reports/reports/VR-011/README.md), [v63 release report](reports/VERSIE_001_V63_RELEASE_AND_GT030_CLOSURE_2026-07-22.md), and [VR-013](verification-reports/reports/VR-013/README.md).
- **Residual boundary:** History-substage telemetry and external automatic INBOX after v64 remain separate evidence items, not a rewrite of the verified GT-030 source/runtime gate.
### B1-17 — Google primary-source gate and publication surfaces

- Review the canonical Advanced Gmail Service and Advanced Google services pages before Gmail/Apps Script changes, and record the access date and decision.
- GitHub remains the canonical code/history repository; Apps Script is runtime; Developer Profile is a discovery index, not a Git mirror.
- CI must test LF/CRLF-stable evidence hashing before factual verification report validation.
- **Status:** tooling/docs candidate; Gmail runtime and Versie are unchanged.
- **Source:** `REQ-0021`.

### B1-18 — Connection-scoped metadata transport

- **GT-025:** remove the hardcoded Apps Script owner token from parallel `threads.get` metadata.
- Keep direct Gmail API transport for external OAuth connections; evaluate Advanced Gmail Service only as a separate owner-lane adapter.
- Next quota-reduction spike: one Gmail HTTP batch with a fail-closed multipart/Content-ID parser and no connection-token mixing.
- **Status:** source candidate; live staging/production is `unverified`.
- **Source:** `REQ-0021`.

### B1-19 — Shared bootstrap A/B after the v56 rollback

- **Status:** completed and verified on 2026-07-22.
- **Safe state:** stable production v63; immutable v56 is historical; exact v55 rollback is preserved; staging is `0`; the Telegram menu points to production.
- **A/B evidence:** two fresh v55 mailbox launches passed; signed v57 staging showed the avatar, three roots, and switching to the controlled second account and back without OAuth; after promotion two v57 production launches passed.
- **Delivery gate:** an independent owner-controlled external `INBOX` automatically created one Telegram card with the correct account marker; two `/check` runs created no duplicate. Self/alias `INBOX+SENT` probes were correctly skipped.
- **Release rule:** do not rewrite immutable v56/v57; do not create Versie 2 or the next immutable without a new exact owner instruction.
- **Source requests:** REQ-0019, REQ-0021.

### B1-20 — Owner-only Advanced Gmail read adapter

- **Status:** PARTIAL — integrated into immutable v58/v59, the protected flag is not enabled, and live evidence awaits v59 acceptance.
- Keep an allowlisted `messages.list`, `messages.get`, and `history.list` adapter behind protected property `GMAIL_OWNER_ADVANCED_READ_V1=enabled`.
- Resolve the current connection through the registry and fail closed unless its provider is `apps_script_owner`; every external OAuth connection keeps its own direct HTTP token path.
- Keep mutations and unsupported reads on direct HTTP, and propagate Advanced Service failures without an automatic fallback.
- **Evidence boundary:** pre-sync deterministic adapter tests passed 8/8. Current `main` evidence is preserved, while the candidate still intentionally differs from immutable v57, so the exact release-hash gate remains expected until a separately authorized next immutable. The flag remains unset, production remains exact v57, staging is `0`, and live quota reduction is `unverified`.
- **Source requests:** `REQ-0024`, `REQ-0027`.

## Roadmap update — 2026-07-22

- [x] Verify automatic delivery for the primary Gmail root.
- [x] Verify automatic delivery for root-2 with the correct account marker.
- [x] Verify automatic delivery for root-3 with the correct account marker.
- [x] Verify deduplication for each secondary root with two repeated /check operations.
- [x] Separate Gmail Spam classification from a product delivery failure.
- [x] Close the secondary-root portion of B1-16 and B1-19 production evidence.
- [ ] New Google OAuth consent remains a separate manual gate and is not initiated without demonstrated technical need.
- [ ] The next Versie is not authorized; all further fixes remain within Versie 1.

## B1-21 — Unified accessible Gmail label management

- **Status:** PARTIAL — integrated into immutable v58/v59; v59 staging acceptance is pending.
- **Date:** 2026-07-22
- **Scope:** one USER/SYSTEM label model for the sidebar and profile panel; create, rename, guarded delete, full-path nesting, accessibility, responsive layout, loading/error/retry, and account isolation.
- **Implemented:** VERIFIED locally in [4ac0b90](https://github.com/Tarasevych/gmail-telegram-controls/commit/4ac0b90fbdbe7c9032789da1734bb986795fab91).
- **Evidence:** [GT-027](ISSUES.md), [VR-005](verification-reports/reports/VR-005/README.md).
- **Remaining:** BLOCKED until GT-028 is cleared and staging acceptance is repeated; production verification follows only after a pass.
- **Українське дзеркало:** [docs/uk/ROADMAP.md](../uk/ROADMAP.md)

## B1-22 — Recovery from a stale automatic thread route

- **Status:** PARTIAL — root cause and source fix VERIFIED; immutable v59 staged; live acceptance UNVERIFIED.
- **Completed:** direct production v57 inspection proved that mailbox/bootstrap, avatar, Inbox, and delivery work; the failure is localized to replayed automatic thread routing and reader recovery.
- **Source candidate:** the launcher consumes the route once; automatic initial/hash/resume failures return to the list; manual opens retain retry semantics. Targeted `238/238`, non-release `440/440`, and docs validators are green; two release hash guards correctly prevent changed source from masquerading as immutable v57/v58. Source request: `REQ-0029`.
- **Boundary:** production exact v57 is unchanged; immutable v59 and one owner-only staging deployment exist, the historical v58 staging was removed after exact replacement verification, and promotion is forbidden until acceptance passes.
- **Next evidence:** targeted/full/docs tests, a normal PR, and required checks; after separate release authority, run a new immutable staging acceptance with two fresh launches before any promotion.
- **Evidence:** [GT-028](ISSUES.md), [VR-006](verification-reports/reports/VR-006/README.md).
- **Українське дзеркало:** [docs/uk/ROADMAP.md](../uk/ROADMAP.md)

## B1-24 — Dynamic active-mail context

- **Status:** VERIFIED — source, native staging and production acceptance passed in immutable v64.
- **Date:** 2026-07-22.
- **Scope:** replace the static owner heading with a block derived from an opaque connection ID for one account or the actual shared view, without a second state model.
- **Implementation:** full name/email, Ukrainian genitive with a safe fallback, `Спільна пошта` only for two or more included accounts, accessible name-to-email disclosure, loading/empty/error states, responsive wrapping and a narrow-screen full-address disclosure.
- **Acceptance:** three isolated roots, real avatar plus fallback, alternate-account switch and return without OAuth, actual shared mapping, and two fresh production launches.
- **Tests:** focused `88/88`; final cumulative suite `505/505`.
- **Evidence:** [GT-031](ISSUES.md), [VR-013](verification-reports/reports/VR-013/README.md). Source requests: `REQ-0032` and `REQ-0033`.
- **Українське дзеркало:** [docs/uk/ROADMAP.md](../uk/ROADMAP.md).
## B1-25 — P0 fast navigation, bounded cache, drafts, typography and client updates

- **Status:** PARTIAL
- **Production boundary:** cumulative source is deployed as immutable v65; staging is `0`, journal is `cleaned`, and exact v64 is rollback.
- **Verified:** dynamic active context and narrow full-address disclosure, three isolated roots, switching without OAuth, shared mapping, production app-shell load, GT-030 worker gate, GT-037 bounded promotion and exact release cleanup.
- **Current source step:** v65 staging, two production launches and cleanup passed. GT-039 exposed the inherited `SENT+INBOX` exclusion; its message-ID dedupe correction is merged and the next cumulative source marker is v66.
- **Still required:** hash-pinned v66 staging/production acceptance for GT-039 and future one-reload/no-loop evidence for GT-036; measured cold/warm and `A -> B -> A` traces; scroll/focus restoration; incremental arrival evidence; quota/LRU eviction; offline/restart/cross-session draft recovery; conflict handling; and same-scale production typography comparison.
- **Related issues:** GT-032 through GT-036, GT-038 and GT-039 remain open/partial; GT-031 and GT-037 are verified.
- **Rule:** continue within Versie 1. Create another immutable only for a separately tested cumulative code change after a clean preflight boundary.
- **Evidence:** [VR-009](verification-reports/reports/VR-009/README.md), [VR-013](verification-reports/reports/VR-013/README.md), [VR-014](verification-reports/reports/VR-014/README.md), and [VR-015](verification-reports/reports/VR-015/README.md).

## B1-26 — P0 ONE-SECOND launch

- **Status:** PARTIAL
- **Recovery boundary:** v66 ended fail-closed; stable/HEAD v65, staging `0`, production menu restored.
- **Source candidate:** cumulative v67 removes duplicate launch presentation, single-flights bridge/boot and warms IndexedDB without reading private records before bootstrap.
- **Local gates:** launch `5/5`, P0 cache/navigation `14/14`, MailApp contract `88/88`.
- **Blocked evidence:** production p95 `≤1000 ms`, ten native launches, offline private Inbox, arrival prefetch and bidirectional account switching.
- **Release gate:** one hash-pinned v67 staging only after full suite/CI; promotion only when every native acceptance criterion is VERIFIED.
- **Evidence:** [VR-016](verification-reports/reports/VR-016/README.md), issues [GT-040–GT-047](ISSUES.md), source request `REQ-0034`.

- **Final local gate 2026-07-23:** cumulative `518/518`; bilingual `71` pairs; knowledge hub `17` pairs/`295` source IDs; verification checker passed.

## P0 continuation gate after v67

- [x] Remove the duplicate visible bridge and bootstrap loading sequence.
- [x] Preserve one bootstrap/auth single-flight and keep private cache locked until server account validation.
- [x] Preserve immutable v67, restore the production menu, and remove only the exact temporary v67 staging deployment after incomplete acceptance.
- [ ] Add a reproducible in-app time-to-interactive measurement that excludes desktop-control and screenshot overhead.
- [ ] Approve and implement a device-bound unlock or single-origin architecture before claiming offline private-mail startup.
- [ ] Verify ten native warm launches, offline cached-mail access, draft recovery, and bidirectional multi-account switching before any later promotion.

## B1-27 — V3 cache-first launch hardening

- **Status:** PARTIAL.
- **Source request:** `REQ-0035`.
- **Release candidate:** cumulative Versie 1 is recorded as a separate immutable v68 based on preserved immutable v67.
- **Locally VERIFIED:** duplicate boot copy removed; settled single-flight, correct IndexedDB warmup, cache-first list/thread paths, an opaque owner/account namespace, bounded schema v2, advisory persistent storage, unread-first prefetch without `markRead`, and a non-blocking account-attention flow.
- **Gates:** targeted `25/25`, release `3/3`, MailApp contract `88/88`, final cumulative `531/531`, documentation validators, and required PR checks passed.
- **Native staging:** two launches had no repeated connection overlay/OAuth; three roots, primary-secondary-primary, and the shared context are verified. A real cached Inbox within `≤1000 ms`, ten launches, offline/cache locking, prefetch, and drafts remain `UNVERIFIED` or `BLOCKED`.
- **Terminal state:** no promotion ran; the owner menu returned to production; merged fail-closed helper PR #62 removed the exact staging deployment; production/HEAD v65, staging `0`, immutable v68 retained, journal `abandoned`.
- **Next step:** do not repeat v68 staging without a new measurable acceptance contour or a separate cumulative fix. Prepare an in-app TTI trace and an architecture decision for a device-bound unlock/single-origin offline shell.
- **Evidence:** [VR-017](verification-reports/reports/VR-017/README.md), issues [GT-040–GT-047](ISSUES.md).
- **Українське дзеркало:** [docs/uk/ROADMAP.md](../uk/ROADMAP.md).

## B1-28 — Exact Gmail attachment identity in Telegram

- **Status:** PARTIAL.
- **Source request:** `REQ-0035`; V3 task `B-01`.
- **Locally VERIFIED:** new Telegram cards use an opaque exact-identity callback; the repeated read requires exactly one match; ambiguity fails closed; historical callbacks retain legacy compatibility.
- **Gates:** targeted attachment tests `154/154`, final cumulative suite `532/532`, clean `git diff --check`, and `0` added-line secret-pattern matches.
- **Still required:** a normal PR and required CI, owner-only native Telegram download acceptance, and only then a separately authorized cumulative immutable release contour.
- **Release boundary:** production/HEAD v65, staging `0`, immutable v68 historical; this source correction is not deployed and does not change Versie 1.
- **Evidence:** [GT-048](ISSUES.md), [VR-018](verification-reports/reports/VR-018/README.md).
- **Українське дзеркало:** [docs/uk/ROADMAP.md](../uk/ROADMAP.md).

## B1-29 — Active error/RCA registry and agent failure prevention

- **Status:** VERIFIED.
- **Source request:** `REQ-0035`; V3 task `T-04`.
- **Implementation:** standalone bilingual error/RCA registry and prevention playbook, linked from primary navigation and connected to `ISSUES`, `ROADMAP`, and a verification report.
- **Controls:** causal-only records, explicit applicability/status, serialized IDs, one-owner leases, stable identity, lock/I/O isolation, immutable release boundaries, evidence grading, and exact cleanup.
- **Authority boundary:** the documentation creates or expands no permission.
- **Evidence:** [GT-049](ISSUES.md), [VR-019](verification-reports/reports/VR-019/README.md).
- **Українське дзеркало:** [docs/uk/ROADMAP.md](../uk/ROADMAP.md).

## B1-30 — Stable reader position and focus during background updates

- **Status:** PARTIAL.
- **Source request:** `REQ-0035`; V3 task `A-03`.
- **Locally VERIFIED:** no-op state skips root replacement; necessary renders preserve a stable content anchor, viewport offset, bottom pin, and memory-only focus identity; delayed layout changes are reconciled without a reading-progress loop.
- **Gates:** focused reader contracts `8/8`, related contracts `101/101`, complete Apps Script suite `540/540`, clean diff check, and `0` secret-signature matches.
- **Still required:** native desktop and mobile acceptance, long real HTML and remote-image layout verification, return-navigation scroll readback, and separately authorized cumulative staging/production acceptance.
- **Release boundary:** source commit `1d7c6c1`; no immutable, staging, production, OAuth, Gmail, or Telegram state changed in this contour.
- **Evidence:** [GT-050](ISSUES.md), [VR-020](verification-reports/reports/VR-020/README.md).
- **Українське дзеркало:** [docs/uk/ROADMAP.md](../uk/ROADMAP.md).
