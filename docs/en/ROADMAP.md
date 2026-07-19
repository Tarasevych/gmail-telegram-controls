# Roadmap

Updated: **2026-07-19**. Single active version: **Build 1**.

| ID | Status | Step | Completion evidence |
|---|---|---|---|
| B1-01 | Completed | Restore the v45 source of truth and inspect Git/production | correct remote; production v37 confirmed |
| B1-02 | Completed | Identify the cause of duplicate Telegram cards | legacy + OAuth double scan found; one trigger confirmed |
| B1-03 | Completed locally | Owner mailbox dedupe, avatar, direct OAuth start, stale account count | local contracts pass |
| B1-04 | Completed locally | OAuth callback relay without `authuser/prompt/scope` | relay live; contract passes |
| B1-05 | Awaiting confirmation | Save the new redirect URI in the Google OAuth client | console Save plus URI readback |
| B1-06 | Planned | Create immutable Apps Script v39 and Build 1 staging; remove exact v38 staging | one v39 staging, production still v37 |
| B1-07 | Manual gate | Add a controlled Gmail account through the new flow | owner completes account choice/consent; callback succeeds |
| B1-08 | Planned | Full real-time acceptance in `@TarasevychGmailNotifierBot` | functional log shows no duplication or zone mixing |
| B1-09 | Planned | Promote Build 1, clean up, restore production menu | stable v39, staging 0, menu `📬 Пошта · Build 1` |
| B1-10 | Planned | Update UK/EN docs, commit, tag, release branch | `build-001-2026-07-19` and `release/build-001-2026-07-19` |

## Movement rule

Build 2 is not opened until B1-05 through B1-10 are complete. New findings receive a `GT-*` record in [ISSUES.md](ISSUES.md); their fix is added to Build 1 while Build 1 is unreleased. After release, every new correction belongs only to Build 2.
