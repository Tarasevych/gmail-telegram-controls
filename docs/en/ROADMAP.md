# Roadmap

Updated: **2026-07-20**. Single active version: **Versie 1**.

| ID | Status | Step | Completion evidence |
|---|---|---|---|
| B1-01 | Completed | Restore the v45 source of truth and inspect Git/production | correct remote; production v37 confirmed |
| B1-02 | Completed | Identify the cause of duplicate Telegram cards | legacy + OAuth double scan found; one trigger confirmed |
| B1-03 | Completed locally | Owner mailbox dedupe, avatar, direct OAuth start, stale account count | local contracts pass |
| B1-04 | Completed locally | Neutral GitHub OAuth callback with a credentialless POST to Apps Script | query cleared before transfer; one-use user/chat/zone state; Google multi-login cookies omitted |
| B1-05 | Completed | Save the new redirect URI in the Google OAuth client | `OAuth client saved`; exact URI read back |
| B1-06 | Completed | Credentialless OAuth relay and sequential immutable v41/v42 | stable v42, staging 0, exact v41 rollback |
| B1-07 | Manual gate active | Add a controlled Gmail account through the new flow | production reached Google “app not verified”; owner confirms consent for the intended account |
| B1-08 | In progress | Full real-time acceptance in @TarasevychGmailNotifierBot | v55 Sent-copy guard passed 432/432 and PreflightOnly; staging and a controlled one-card live acceptance are not yet evidenced |
| B1-09 | Completed | Promote, clean up, and install the production command menu | stable v42, staging 0, setup execution completed |
| B1-10 | Completed | Update UK/EN docs, commit, and push | postmortem and lessons published at c98e69e; three documentation Actions passed; release tag remains gated by B1-07/B1-08 |

| B1-11 | Completed locally | Separate realtime delivery from the frozen backlog and run it before maintenance | bounded recent-window lane, per-connection watermark/retry, shared seen ledger; E3/E5 still required |
| B1-12 | Completed locally | Aggregate every notification account into one physical Telegram feed with account identity and account-scoped actions | the main chat is “All messages”; account roots switch context without duplicating a card; second-account E5 is consent-blocked |

## Movement rule

Versie 2 is not opened until B1-05 through B1-10 are complete. New findings receive a `GT-*` record in [ISSUES.md](ISSUES.md); their fix is added to Versie 1 while Versie 1 is unreleased. After release, every new correction belongs only to Versie 2.

## Cumulative research roadmap

Long-term report-derived phases, dependencies, and evidence gates are in the [Master Roadmap](knowledge-hub/MASTER_ROADMAP.md). The current `B1-*` release gates above remain authoritative for Versie 1.

## Verification gate

`VR-001` completed repository/test classification for 245/245 `KH-*` claims: [report](verification-reports/reports/VR-001/README.md). It does not close B1-07 through B1-09: staging OAuth callback, real-time Telegram acceptance, and production promotion remain separate E4/E5 evidence. Current continuation: `REQ-0009`.

### B1-13 — Concurrent Gmail OAuth refresh isolation

- **Status:** completed locally; E4/E5 have not passed yet.
- **Result:** each Gmail connection now uses a short ScriptLock only for claim/commit/release plus a lease in protected Script Properties; HTTP refresh runs outside the lock.
- **Invariants:** an active lease prevents a second provider fetch; connection ID, email, token generation, and the current token record are rechecked before commit; a failure releases its owned lease without changing the protected token.
- **Evidence:** deterministic local tests and the candidate hash pin for the current Versie 1.
- **Source request:** REQ-0015.
- **Not performed:** immutable deployment, staging/production rollout, or a real OAuth cycle.