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

- **Status:** production remains exact v55; immutable v56 is preserved as history; immutable v57 has one owner-only staging deployment; the A/B gate is blocked by the shared external `URLFETCH` quota.
- **GT-023:** one minute trigger started a new worker before the previous 80–106-second invocation completed; the per-minute all-account Gmail History fan-out exhausted the daily `URLFETCH` quota.
- **Change:** content-free timer slots in Script Properties, atomic only under a short ScriptLock; 150-second worker cadence, realtime remains first, and full History backfill runs no more than once per 15 minutes.
- **Unchanged:** the trigger remains single and minute-based; Gmail records, OAuth tokens, Telegram zones, and messages are not mutated.
- **Gates:** the `440/440` full suite and `5/5` release tests passed; staging v56 confirmed mailbox/avatar/three roots, but switching remains `unverified`; two clean v55 launches and the complete v56/v57 A/B await external quota recovery.
- **Source request:** REQ-0018; continuation: REQ-0019.

### B1-17 — Shared bootstrap A/B after the v56 rollback

- **Status:** blocked by external quota; no code fix is created without evidence.
- **Safe state:** stable and HEAD v55; immutable v56 is historical; one owner-only v57 staging deployment is preserved; the Telegram menu points to production.
- **Diagnosis:** v56 and v55 completed callback/session/`mailboxRpc`; in the same windows the Gmail API worker exhausted daily `URLFETCH`, so no v56 regression is confirmed.
- **Next gate:** after daily quota recovery, two fresh production v55 mailbox launches without a network error, then signed staging v57 with avatar, three roots, switching to the controlled second account and back without OAuth.
- **Release rule:** if the error is shared, do not switch releases again; if a new candidate-only defect is proven, create cumulative immutable v58 without rewriting v56/v57 and preserve the exact v55 rollback.
- **Source request:** REQ-0019.
