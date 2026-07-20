# Roadmap

Updated: **2026-07-20**. Single active version: **Versie 1**.

| ID | Status | Step | Completion evidence |
|---|---|---|---|
| B1-01 | Completed | Restore the v45 source of truth and inspect Git/production | correct remote; production v37 confirmed |
| B1-02 | Completed | Identify the cause of duplicate Telegram cards | legacy + OAuth double scan found; one trigger confirmed |
| B1-03 | Completed locally | Owner mailbox dedupe, avatar, direct OAuth start, stale account count | local contracts pass |
| B1-04 | Completed locally | Direct Apps Script OAuth callback without the historical GitHub relay | configured redirect, short Telegram launcher, one-use user/chat/zone state, and contract evidence |
| B1-05 | Completed | Save the new redirect URI in the Google OAuth client | `OAuth client saved`; exact URI read back |
| B1-06 | In progress | Create Apps Script immutable v40 with direct OAuth return and one-click account switching; replace only the exact v39 staging | one exact v40 staging; stable v37 unchanged before acceptance |
| B1-07 | Manual gate | Add a controlled Gmail account through the new flow | owner completes account choice/consent; callback succeeds |
| B1-08 | Planned | Full real-time acceptance in `@TarasevychGmailNotifierBot` | functional log shows no duplication or zone mixing |
| B1-09 | Planned | Promote Versie 1, clean up, restore production menu | stable v39, staging 0, menu `📬 Пошта · Versie 1` |
| B1-10 | Planned | Update UK/EN docs, commit, tag, release branch | `versie-001-2026-07-19` and `release/versie-001-2026-07-19` |

## Movement rule

Versie 2 is not opened until B1-05 through B1-10 are complete. New findings receive a `GT-*` record in [ISSUES.md](ISSUES.md); their fix is added to Versie 1 while Versie 1 is unreleased. After release, every new correction belongs only to Versie 2.

## Cumulative research roadmap

Long-term report-derived phases, dependencies, and evidence gates are in the [Master Roadmap](knowledge-hub/MASTER_ROADMAP.md). The current `B1-*` release gates above remain authoritative for Versie 1.

## Verification gate

`VR-001` completed repository/test classification for 245/245 `KH-*` claims: [report](verification-reports/reports/VR-001/README.md). It does not close B1-07 through B1-09: staging OAuth callback, real-time Telegram acceptance, and production promotion remain separate E4/E5 evidence. Current continuation: `REQ-0008`.
