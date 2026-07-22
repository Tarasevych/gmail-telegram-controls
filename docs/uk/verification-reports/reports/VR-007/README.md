# VR-007 — Factual verification спроби release v59 та exact rollback

[English mirror](../../../../en/verification-reports/reports/VR-007/README.md)

- **Дата:** 2026-07-22
- **Verification framework:** REQ-0004
- **Продукт:** Versie 1
- **Запити:** `REQ-0030`, `REQ-0031`
- **Повноваження:** `P-009`
- **Проблеми:** [GT-027, GT-028, GT-029, GT-030](../../../ISSUES.md)
- **Roadmap:** B1-20, B1-21, B1-22, B1-23
- **Загальний статус:** PARTIAL

## Межа й метод

Звіт містить лише sanitized content-free evidence. Gmail addresses, deployment identifiers, листи, OAuth tokens, cookies, `initData` і secret properties не публікуються. Immutable v59 не переписувався. Fresh OAuth, consent, OTP, CAPTCHA і passkey не виникали. Випадкові листи та Gmail labels не мутувалися.

## Атомарні твердження

| ID | Категорія | Актуальність | Статус | Залежності | Конфлікти | Чутливість | Точне походження |
|---|---|---|---|---|---|---|---|
| V59-A01 | Governance | current | VERIFIED | REQ-0030, P-009 | Versie 2 не дозволена | public | Standing authority обмежує один immutable на causal delta, один staging, exact-candidate promotion і fail-closed rollback |
| V59-A02 | Integration | current | VERIFIED | clean main | none | public | PR #16 `a9f3e29`, PR #11 `1e07e9a`, PR #20 `3b4c58b`, PR #21 `8611af8`, PR #22 `3a114ff` merged normal merge |
| V59-A03 | Tests | current | VERIFIED | cumulative v59 source | none | public | Release `12/12`, full Apps Script `464/464`, tooling `6/6`, docs validators і required checks пройшли |
| V59-A04 | Staging | historical | VERIFIED | exact v57 rollback | none | sanitized | v59 staged один раз; exact v59 deployment verified; historical v58 staging removed only after replacement; journal `staging_verified` |
| V59-A05 | Multi-account UI | historical | VERIFIED | signed owner Telegram session | none | sanitized | Mailbox і Google avatar завантажилися; три isolated roots видимі; controlled second-account switch і повернення пройшли без OAuth |
| V59-A06 | Labels | historical | PARTIAL | GT-027 | mutating operations omitted | sanitized | Live panel мав create/manage controls, USER/SYSTEM separation, bounded scroll і long nested names без overlap; create/rename/delete не запускалися |
| V59-A07 | Route recovery | historical | VERIFIED | GT-028 | Telegram session retained stale route | sanitized | Automatic stale route повертав до loaded list із content-free notice замість reader/network failure; manual retry semantics не тестувалися |
| V59-A08 | Promotion | historical | VERIFIED | A03-A07 | none | sanitized | Stable alias просунуто v57 -> v59; два fresh production mailbox launches пройшли |
| V59-A09 | Cleanup | historical | VERIFIED | A08 | none | sanitized | Staging removed; post-cleanup preflight тимчасово показав stable/HEAD v59, staging `0`, journal `cleaned` |
| V59-A10 | Runtime gate | current | BLOCKED | 150-second slot contract | simultaneous Gmail work unproven | sanitized | Один execution завершився за `214.96 с`; наступний execution window почався раніше. Обидва завершилися, але no-overlap gate не пройдено |
| V59-A11 | Rollback | current | VERIFIED | exact v57 hashes | none | sanitized | Exact v59 -> v57 rollback; stable/HEAD v57, staging `0`, journal `rolled_back`; fresh rollback mailbox launch пройшов |
| V59-A12 | Current state | current | VERIFIED | A11 | none | public | Production v57 VERIFIED; immutable v59 historical candidate; active staging `0`; v60 не створено |
| V59-A13 | Documentation | current | VERIFIED | REQ-0031 | stale dated pages | public | Runtime audit не знайшов читання GitHub Markdown ботом; manifest/CURRENT_STATE/README є canonical mutable current-state layer |

## Висновок

v59 не є accepted production release. UI, account isolation, labels presentation і stale-route recovery дали сильний live evidence, але post-cleanup runtime acceptance fail-closed через worker-slot overrun та execution-window overlap. Root cause GT-030 не визначено. Exact rollback відновив перевірений v57 без нового immutable або повторного staging-loop.

## Безпечний поточний стан

- Production і HEAD: immutable v57.
- Candidate history: immutable v59 preserved.
- Active staging: `0`.
- Journal: `rolled_back`.
- Telegram menu: production.
- Next Versie: не дозволена.
- Наступний immutable: не створювати без нового causal code delta і повного acceptance plan.

## Джерела

- [Current state](../../../CURRENT_STATE.md)
- [Versie 1 release article](../../../releases/VERSIE-001-2026-07-19.md)
- [Issues](../../../ISSUES.md)
- [Roadmap](../../../ROADMAP.md)
- [PR #20](https://github.com/Tarasevych/gmail-telegram-controls/pull/20)
- [PR #21](https://github.com/Tarasevych/gmail-telegram-controls/pull/21)
- [PR #22](https://github.com/Tarasevych/gmail-telegram-controls/pull/22)
