# VR-010 — v62 cumulative release attempt and exact rollback

[Verification index](../../INDEX.md) | [Release evidence](../../../reports/VERSIE_001_V62_RELEASE_ATTEMPT_AND_ROLLBACK_2026-07-22.md) | [Українська](../../../../uk/verification-reports/reports/VR-010/README.md)

- **Date:** 2026-07-22
- **Source request:** `REQ-0033`
- **Verification framework:** `REQ-0004`
- **Target commit:** `42dfbd76d1e904fe065094010f61418da8896978`
- **Overall status:** `BLOCKED`
- **Sensitivity:** sanitized; no email content, addresses, tokens, init data, deployment IDs, cookies, or secret properties

## Atomic findings

| Claim | Category | Status | Evidence / dependency |
|---|---|---|---|
| GitHub `main` and the private GitLab mirror pointed to the same target commit before closure | release | VERIFIED | authenticated Git readback |
| The cumulative product/release suite passed 494/494 and bridge tests passed 3/3 | tests | VERIFIED | local command outputs before release |
| Immutable v62 was exact and owner-only staging passed mailbox, profile, three roots, shared view and account switching | staging | VERIFIED | release helper readback and signed Telegram Desktop acceptance |
| The v62 per-account list remained scoped to the requested connection | multi-account | VERIFIED | controlled secondary-account staging and production UI readback |
| Two fresh production v62 launches loaded a usable mailbox | production UI | VERIFIED | signed Telegram Desktop launches |
| The owner self-copy control created no card and two `/check` runs created no duplicate | dedupe | VERIFIED | expected SENT exclusion and Telegram readback |
| External automatic INBOX delivery after v62 worked | delivery | UNVERIFIED | self-copy control is intentionally ineligible and cannot prove inbound delivery |
| Post-v62 worker execution stayed inside the 150-second slot without overlap | runtime | BLOCKED | Apps Script process API returned 403; `clasp logs` lacked configured project identity |
| v62 retained the same worker code as the line implicated by GT-030 | provenance | VERIFIED | exact source hash comparison |
| v62 caused a new runtime regression | root cause | UNVERIFIED | no candidate-specific execution trace |
| Exact v62 -> v57 rollback restored stable/HEAD v57 with staging 0 and journal `rolled_back` | rollback | VERIFIED | release helper output and post-rollback preflight |
| Two fresh production v57 launches loaded the mailbox without network error | rollback acceptance | VERIFIED | signed Telegram Desktop readback |

## Conclusion

The v62 client candidate is valuable historical evidence and its UI/account-isolation acceptance passed. It is not an accepted production release because the inherited GT-030 runtime gate could not be verified. Exact v57 production was restored without OAuth, migration, Gmail mutation, or secret access. The next immutable is permitted only after a causal worker fix and content-free execution evidence.

The shared machine-readable registry remains on VR-003 because later narrative reports do not change that validator contract.
