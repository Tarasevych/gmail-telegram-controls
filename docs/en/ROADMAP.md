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

### B1-16 — Timer runtime budget and URLFetch quota isolation

- **Status:** completed and production verified on v57; immutable v56 is preserved as history, exact v55 rollback is preserved, staging is `0`, and the journal is `cleaned`.
- **GT-023:** one minute trigger started a new worker before the previous 80–106-second invocation completed; the per-minute all-account Gmail History fan-out exhausted the daily `URLFETCH` quota.
- **Change:** content-free timer slots in Script Properties, atomic only under a short ScriptLock; 150-second worker cadence, realtime remains first, and full History backfill runs no more than once per 15 minutes.
- **Unchanged:** the trigger remains single and minute-based; Gmail records, OAuth tokens, Telegram zones, and messages are not mutated.
- **Gates:** the complete suite passed `444/444`; hash-pinned v57 staging A/B, two production launches, cleanup, and post-cleanup `PreflightOnly` passed. The production trigger window showed completed full/slot-skip cadence with no failed worker.
- **Source requests:** REQ-0018, REQ-0019, REQ-0021.

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
- **Safe state:** stable production v57; immutable v56 is historical; exact v55 rollback is preserved; staging is `0`; the Telegram menu points to production.
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
