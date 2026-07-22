# Versie 1: production acceptance immutable v57 — 2026-07-22

[Release article](../releases/VERSIE-001-2026-07-19.md) | [Problems](../ISSUES.md) | [Roadmap](../ROADMAP.md) | [English](../../en/reports/VERSIE_001_V57_PRODUCTION_ACCEPTANCE_2026-07-22.md)

## Межі звіту

Це sanitized factual verification продовження `REQ-0019`. Звіт не містить адрес, message/deployment identifiers, mail content, tokens, cookies, `initData` або secret properties. Історичні immutable v56/v57 не переписувалися; Versie лишається `Versie 1`.

## Атомарні твердження

| ID | Категорія | Актуальність | Статус | Залежності | Конфлікти | Чутливість | Точне походження |
|---|---|---|---|---|---|---|---|
| V57-A01 | Release | current | verified | hash-pinned v57 helper | stale v55 checkpoint | sanitized | Post-cleanup `PreflightOnly`: stable v57, staging 0, legacy staging 0, journal `cleaned` |
| V57-A02 | Staging | current | verified | existing signed Telegram session | none | sanitized | Owner-only v57: mailbox, avatar, three Gmail roots, switch to controlled connection and return without OAuth |
| V57-A03 | Production | current | verified | A02, exact v55 rollback | none | sanitized | Standard promotion; two fresh v57 launches loaded mailbox, avatar and reader without network error |
| V57-A04 | Runtime | current | verified with telemetry limit | 150-second worker slot; 15-minute History slot | dashboard duration includes queue time | sanitized | Completed full/slot-skip trigger cadence with no failed worker; source and regression tests prove both slot contracts |
| V57-A05 | Dedupe | current | verified | Gmail labels | earlier self-message acceptance wording | sanitized | Same-account and linked-alias probes received `INBOX+SENT` and correctly produced no card because the Sent copy is persisted as seen |
| V57-A06 | Delivery | current | verified | independent owner-controlled sender absent from primary `Send mail as` | none | sanitized | One marker arrived as `INBOX+UNREAD` without `SENT` and automatically created one Telegram card with the correct account marker |
| V57-A07 | Dedupe | current | verified | A06 | none | sanitized | Exact Telegram search found one result; two subsequent `/check` runs returned no new mail and the accessibility tree retained one marker list item |
| V57-A08 | Tests | current | verified | main-based source | none | public | Local product suite `444/444`; request-ledger, bilingual, knowledge-hub and verification-report gates passed before publication |
| V57-A09 | Recovery | current | verified | immutable history | none | sanitized | Immutable v56 and exact rollback v55 remain preserved; no staging deployment remains |

## Виправлений конфлікт доказів

Попереднє формулювання в release evidence трактувало `SENT+INBOX` self-message як валідний one-card acceptance probe. Фактичні v57 labels і regression contract показали інше: такий probe має бути повністю пропущений. One-card acceptance доведено окремим external `INBOX` без `SENT`; dedupe-код не послаблювався.

## Що лишається unverified

- Fresh Google account choice/consent/callback для нового Gmail connection.
- Окремий inbound marker, адресований кожному другому connected Gmail root, а не primary root.
- Пряма content-free production telemetry, яка називає кожний фактичний 15-хвилинний Gmail History pass; наразі runtime cadence поєднано з source/test proof.
- Draft owner-only Advanced Gmail adapter PR не входить до v57 і лишається unmerged.

## Доказові посилання

- [Release helper](../../../apps-script/tools/release_apps_script_versie_001_20260721_v57.ps1)
- [Runtime budget tests](../../../apps-script/tests/runtime_budget.test.js)
- [Mail action and dedupe tests](../../../apps-script/tests/mail_actions.test.js)
- [Versie 1 release article](../releases/VERSIE-001-2026-07-19.md)
- [Problems](../ISSUES.md)
- [Roadmap](../ROADMAP.md)
- [Official Apps Script quotas](https://developers.google.com/apps-script/guides/services/quotas)
- [Official Gmail labels reference](https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.labels)

## Release boundary

Production-accepted Apps Script version: immutable v57. Наступний immutable або `Versie 2` потребує нового точного owner-наказу. Fresh OAuth не запускався; CAPTCHA, OTP/2FA, passkey та інші manual gates не виникали.
