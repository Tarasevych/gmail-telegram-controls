# VR-004 Appendix: Stage 1 continuation audit

[Українська](../../../../uk/verification-reports/reports/VR-004/STAGE_1_CONTINUATION_AUDIT.md) | [VR-004](README.md) | [Index](../../INDEX.md)

- **Date:** 2026-07-21
- **Source requests:** `REQ-0004`, `REQ-0019`, `REQ-0020`
- **Product line:** Versie 1
- **Verified Git target:** `535a77d1461a2b87e9039485da489ff8a418e878`
- **Method:** read-only Git/runtime/process audit, local baseline, and sanitized evidence
- **Product/release/runtime mutation:** none

## Stage 1 result

| ID | Category | Status | Grade | Atomic claim |
|---|---|---|---|---|
| VR4-A14 | Git | verified | E3 | `origin/main` pointed to `535a77d...`; all 16 worktrees were clean, with no stashes or unfinished Git operations; no PR was open and the latest main checks were green. |
| VR4-A15 | release | verified | E4 | GET-only `PreflightOnly` passed: stable production v55, one preserved v57 staging deployment, journal `staging_verified`, and 0 legacy staging deployments. Immutable v56 was not rewritten. |
| VR4-A16 | runtime | verified | E4 | Exactly one time-driven `checkNewMail_` existed. Recent executions lasted about 45-149 seconds and had overlapping windows; a failed execution ended with the daily `urlfetch` quota exception in `gmailApiRequest_`. |
| VR4-A17 | Telegram | verified | E4 | The owner menu remained on production `Mail - Versie 1`; the webhook had 0 pending updates, no last error, max connections 1, and the `message`/`callback_query` allowlist. |
| VR4-A18 | tests | verified | E3 | The clean `origin/main` baseline passed 444/444 Node tests, 48 bilingual pairs, the knowledge-hub gate, 3/3 verification-tool tests, and the verification-report validator; the secret-signature scan found 0 tracked files. |
| VR4-A19 | acceptance | unverified | E0 | Current live account roots, account switching, Gmail delivery, one-card dedupe, and signed Mini App bootstrap were not repeated, to avoid consuming an exhausted quota. |
| VR4-A20 | recovery | partial | E2 | A private GitLab remote is configured as an additional recovery mirror, but its first verified-ref sync is not yet confirmed; GitHub remains canonical. |

## Root-cause boundary

The confirmed cause of the current runtime outage remains shared by stable and candidate: the Apps Script daily `URLFetch` quota is exhausted during a Gmail API request. There is only one trigger, so a duplicate immutable deployment does not explain the per-minute invocations. Overlapping 45-149-second execution windows are a confirmed pressure pattern, but not a separate second trigger.

This evidence does not make v57 production-ready and does not invalidate historical v55 production acceptance. No Mini App/Gmail A/B may be repeated before quota recovery is evidenced.

## Telegram and process safety

- No Telegram command or controlled email was sent.
- Menu, webhook, trigger, deployment, OAuth, Gmail records, and account zones were unchanged.
- Audit browser tabs were closed.
- The independent recovery-sensitive Telegram archive process was not stopped or restarted.
- No unfinished Git/GitLab process remained after the audit.

## Deep-research source inventory

| Source | Format | SHA-256 |
|---|---|---|
| `Architectonische_kenmerken_Gmail_Telegram_Versie_1_21072026.txt` | UTF-8, Markdown-like, 32,570 lines | `05380a2833e7b35f0cd8492efab2ac3e889d2add426f9ccebfc9557a69e61249` |
| `deep-research-report.md` | Markdown | `49f1c7bffde5d613ae4a5782581da5f4a2204e0075f324734a95bd75117efe06` |
| `deep-research-report2.md` | Markdown | `879a2e9de104dadc5d4dce23092ce55514d7420af804b355b106a185d2c24777` |
| `deep-research-report3.md` | Markdown | `9c72d21ec4682beddef23e4b6b7d6f44b38f3ed5f53263834464a3fb44437cb2` |

These sources are suitable for provenance and claim extraction. Report-derived claims without independent evidence remain `unverified`.

## Next gate

1. Continue only quota-independent source analysis and documentation/validator work.
2. After quota recovery is evidenced, first obtain two healthy fresh v55 bootstrap results.
3. Only then run the owner-only v57 A/B without OAuth or zone mixing.
4. Promotion or cleanup is prohibited before full acceptance; a candidate-specific failure retains the exact v55 rollback boundary.
