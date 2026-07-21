# REQ-0012: full two-corpus knowledge-base reconstruction

Date: `2026-07-21`
Status: `completed`
Active product: `Versie 1`
Next Versie authorization: `no`

## Українською

Власник наказав автономно виконати повний доказовий workflow із `Master_Prompt_Gmail_Telegram_KB_UA.md` та в межах `Agent_Permissions_Gmail_Telegram_UA.md`: Stage 0 inventory; потокове опрацювання двох історичних сесій; coverage manifest та evidence ledger; перевірка/доповнення архітектури; підтверджений RCA; 8–12 enforcement rules; двомовні postmortem/contributing/navigation artifacts; tests, privacy scan, Git commits, push/PR і reboot-safe recovery.

Вхідні назви, версії та твердження не є фактами без locator/evidence. Не змінювати код без відтворюваного доказу. Не повторювати завершені GitHub authorization, email diagnosis, Stage 4 publication або v55 local verification; повторно використовувати їхні commit/run IDs.

## English

The owner ordered autonomous execution of the complete evidence workflow defined by `Master_Prompt_Gmail_Telegram_KB_UA.md` within `Agent_Permissions_Gmail_Telegram_UA.md`: Stage 0 inventory; streaming analysis of two historical sessions; coverage manifest and evidence ledger; architecture validation; confirmed RCA; 8–12 enforceable rules; bilingual postmortem/contributing/navigation artifacts; tests, privacy scan, Git commits, push/PR, and reboot-safe recovery.

Input names, versions, and claims are not facts without a locator/evidence. Do not change code without reproducible evidence. Do not repeat completed GitHub authorization, email diagnosis, Stage 4 publication, or v55 local verification; reuse their commit/run IDs.

## Routing

- `Запити`: canonical request and completion evidence.
- `Інструкції`: no new rule unless corpus evidence requires a distinct standing process change.
- `Повноваження`: no change; `P-006` applies.
- Active Versie documentation/knowledge hub: update from verified evidence only.
- Product code/runtime/release: no change unless a reproducible finding and an existing authorized request require it.

## Completion gates

- Both named source files are identified, strictly decoded, hashed, and covered without gaps.
- Machine-readable manifest/evidence ledger and bilingual human navigation are present.
- Stage 1–4 outputs distinguish verified, partial, unverified, conflicting, blocked, and recommended claims.
- Existing Stage 4 and v55 evidence is reused, not recomputed without need.
- Relevant checks, staged-diff privacy scan, commits, remote state, and CI/PR evidence are recorded.
- A same-thread checkpoint permits exact continuation after interruption.

## Completion evidence

- Source coverage: `SESSION-CURRENT` 32,569 logical lines in 49 chunks; `SESSION-PREVIOUS` 134,607 logical lines in 182 chunks; total 167,176 lines in 231 chunks, zero gaps.
- Original source SHA-256: `05380a2833e7b35f0cd8492efab2ac3e889d2add426f9ccebfc9557a69e61249` and `1091a6f740588bf5148a8c9eb8653c4c36c86112e3bb47ec45d96f16887e0e48`.
- Published report: VR-003 with 32 atomic claims: 19 verified, 3 partial, 3 unverified, 2 blocked, and 5 recommendations.
- Product commits: [`d5d34f2`](https://github.com/Tarasevych/gmail-telegram-controls/commit/d5d34f27110e0628df88e9b1653e56ebe5f79103), [`347e6d3`](https://github.com/Tarasevych/gmail-telegram-controls/commit/347e6d305696cf8dc838acc4242d523048ab74fb), [`b9cc4d2`](https://github.com/Tarasevych/gmail-telegram-controls/commit/b9cc4d2a5df9d9990106e821e521f2c9249e6225), and history-reconciliation merge [`df493b7`](https://github.com/Tarasevych/gmail-telegram-controls/commit/df493b7ac4a2a040967bcfd7c610c7ba26362354).
- Local checks: Python syntax passed; bilingual documentation 44/44 pairs; knowledge hub 17 pairs; VR-001 245 claims and VR-003 32 claims passed; privacy scan passed for all 35 changed files; `git diff --check` passed after an immutable cleanup commit.
- History reconciliation retained the current v55 tree, added only the sanitized `KNOWLEDGE_HUB.md` and `VERIFICATION_REPORTS.md` root entrypoints, and excluded the obsolete legacy staging HTML from the final tree. Targeted public-docs tests passed 2/2 and release-helper tests passed 3/3.
- GitHub Actions on final HEAD `df493b7`: [Bilingual documentation](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29815511928), [Knowledge hub](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29815511919), and [Verification reports](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29815511972) all succeeded.
- Pull request: [#1 Versie 1: v55 delivery hardening and VR-003 evidence](https://github.com/Tarasevych/gmail-telegram-controls/pull/1), state `OPEN`, `CLEAN`, and `MERGEABLE` at final verification.
- Raw transcripts, normalized chunks, candidate excerpts, credentials, mailbox content, private URLs, and local paths were not published.
- Release boundary retained: no immutable v55 creation, staging deployment, production promotion, Gmail mutation, OAuth acceptance, Telegram production acceptance, or next-Versie authorization occurred in REQ-0012.
