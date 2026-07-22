# Versie 1: immutable v57 production acceptance — 2026-07-22

[Release article](../releases/VERSIE-001-2026-07-19.md) | [Problems](../ISSUES.md) | [Roadmap](../ROADMAP.md) | [Українська](../../uk/reports/VERSIE_001_V57_PRODUCTION_ACCEPTANCE_2026-07-22.md)

## Report boundary

This is a sanitized factual verification of the `REQ-0019` continuation. It contains no addresses, message/deployment identifiers, mail content, tokens, cookies, `initData`, or secret properties. Historical immutable v56/v57 artifacts were not rewritten; the product remains `Versie 1`.

## Atomic claims

| ID | Category | Currency | Status | Dependencies | Conflicts | Sensitivity | Exact provenance |
|---|---|---|---|---|---|---|---|
| V57-A01 | Release | current | verified | hash-pinned v57 helper | stale v55 checkpoint | sanitized | Post-cleanup `PreflightOnly`: stable v57, staging 0, legacy staging 0, journal `cleaned` |
| V57-A02 | Staging | current | verified | existing signed Telegram session | none | sanitized | Owner-only v57: mailbox, avatar, three Gmail roots, switch to controlled connection and return without OAuth |
| V57-A03 | Production | current | verified | A02, exact v55 rollback | none | sanitized | Standard promotion; two fresh v57 launches loaded mailbox, avatar, and reader without a network error |
| V57-A04 | Runtime | current | verified with telemetry limit | 150-second worker slot; 15-minute History slot | dashboard duration includes queue time | sanitized | Completed full/slot-skip trigger cadence with no failed worker; source and regression tests prove both slot contracts |
| V57-A05 | Dedupe | current | verified | Gmail labels | earlier self-message acceptance wording | sanitized | Same-account and linked-alias probes received `INBOX+SENT` and correctly produced no card because the Sent copy is persisted as seen |
| V57-A06 | Delivery | current | verified | independent owner-controlled sender absent from primary `Send mail as` | none | sanitized | One marker arrived as `INBOX+UNREAD` without `SENT` and automatically created one Telegram card with the correct account marker |
| V57-A07 | Dedupe | current | verified | A06 | none | sanitized | Exact Telegram search found one result; two subsequent `/check` runs returned no new mail and the accessibility tree retained one marker list item |
| V57-A08 | Tests | current | verified | main-based source | none | public | Local product suite `444/444`; request-ledger, bilingual, knowledge-hub, and verification-report gates passed before publication |
| V57-A09 | Recovery | current | verified | immutable history | none | sanitized | Immutable v56 and exact rollback v55 remain preserved; no staging deployment remains |

## Corrected evidence conflict

Earlier release evidence treated an `SENT+INBOX` self-message as a valid one-card acceptance probe. Actual v57 labels and the regression contract prove otherwise: such a probe must be skipped entirely. One-card acceptance is instead proven by an external `INBOX` without `SENT`; the dedupe code was not weakened.

## Still unverified

- Fresh Google account choice/consent/callback for a new Gmail connection.
- A separate inbound marker addressed to each secondary connected Gmail root rather than the primary root.
- Direct content-free production telemetry naming every actual 15-minute Gmail History pass; runtime cadence is currently combined with source/test proof.
- The draft owner-only Advanced Gmail adapter PR is not part of v57 and remains unmerged.

## Evidence links

- [Release helper](../../../apps-script/tools/release_apps_script_versie_001_20260721_v57.ps1)
- [Runtime budget tests](../../../apps-script/tests/runtime_budget.test.js)
- [Mail action and dedupe tests](../../../apps-script/tests/mail_actions.test.js)
- [Versie 1 release article](../releases/VERSIE-001-2026-07-19.md)
- [Problems](../ISSUES.md)
- [Roadmap](../ROADMAP.md)
- [Official Apps Script quotas](https://developers.google.com/apps-script/guides/services/quotas)
- [Official Gmail labels reference](https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.labels)

## Release boundary

Production-accepted Apps Script version: immutable v57. The next immutable or `Versie 2` requires a new exact owner instruction. Fresh OAuth was not started; no CAPTCHA, OTP/2FA, passkey, or other manual gate occurred.

## Follow-up evidence: secondary Gmail roots — 2026-07-22

| Requirement | Verified evidence | Status |
|---|---|---|
| Root-2 inbound fan-out | A new content-free owner self-test reached Inbox and automatically produced one card | verified |
| Root-2 account identity | The card carried the correct second Gmail-zone marker | verified |
| Root-2 deduplication | Two repeated /check operations reported no new mail; accessibility count remained 1 | verified |
| Root-3 inbound fan-out | A separate content-free owner self-test automatically produced one card | verified |
| Root-3 account identity | The card carried the correct third Gmail-zone marker | verified |
| Root-3 deduplication | Two repeated /check operations reported no new mail; accessibility count remained 1 | verified |
| Spam exclusion | A controlled root-2 message in Spam produced no card | verified |
| Safety boundary | OAuth, scopes, deployment, triggers, and product code were unchanged | verified |

### Observation correction

An intermediate visible Telegram viewport did not show the root-3 card and was not sufficient evidence that delivery was absent. After restoring the correct scroll position, the card was found and the accessibility index atomically confirmed exactly one marker match. Future absence claims must not rely on viewport evidence alone.

### Tooling incident

Read-only Chrome inspection timed out twice, and the Windows browser fallback failed closed because it could not determine the current URL reliably. Production state was unchanged. Independent evidence came from the already-authorized Gmail connector and Telegram accessibility tree; OAuth was not repeated.
