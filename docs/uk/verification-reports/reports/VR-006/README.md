# VR-006 — Factual verification cumulative v58 staging A/B

[English mirror](../../../../en/verification-reports/reports/VR-006/README.md)

- **Дата:** 2026-07-22
- **Verification framework:** REQ-0004
- **Продукт:** Versie 1
- **Запит:** `REQ-0028` ([governance commit](https://github.com/Tarasevych/gmail-telegram-controls/commit/b56812c22ab78fbb2749c798ea9ad92e14e25fc2))
- **Повноваження:** `P-008` ([authority commit](https://github.com/Tarasevych/gmail-telegram-controls/commit/1ec34cff91d8a4b6f188e0c8eb860816f6609bbb))
- **Проблеми:** [GT-027, GT-028](../../../ISSUES.md)
- **Roadmap:** B1-21, B1-22
- **Загальний статус:** BLOCKED

## Межа й метод

Цей звіт містить лише sanitized content-free evidence. Адреси Gmail, deployment identifiers, mail content, OAuth tokens, cookies, `initData` і secret properties не публікуються. Історичні immutable v56/v57/v58 не переписувалися. Production promotion дозволявся лише після staging acceptance і тому не виконувався.

## Атомарні твердження

| ID | Категорія | Актуальність | Статус | Залежності | Конфлікти | Чутливість | Точне походження |
|---|---|---|---|---|---|---|---|
| V58-A01 | Governance | current | VERIFIED | REQ-0028, P-008 | Versie 2 не дозволена | public | Owner дозволив normal merges PR #16/#11, cumulative immutable staging і conditional promotion після acceptance |
| V58-A02 | Integration | current | VERIFIED | clean main | semantic ID collision у документації | public | PR #16 merged як `a9f3e29`; PR #11 merged як `1e07e9a`; v58 bundle/launcher merged через PR #17/#18 |
| V58-A03 | Tests | current | VERIFIED | merged cumulative source | none | public | Release/bridge suite `11/11`; full product suite `460/460`; bilingual, knowledge-hub, verification і main CI gates пройшли |
| V58-A04 | Release | current | VERIFIED | exact v57 rollback | journal wording | sanitized | Read-only preflight: stable v57, immutable v58 ready, staging `1`, legacy staging `0`, journal `staging_verified` |
| V58-A05 | Staging UI | current | PARTIAL | existing signed Telegram session | mailbox bootstrap failure | sanitized | Два fresh v58 launches показали Apps Script shell і profile photo; chat-native account list підтвердив три roots, але mailbox operation не відкрилася |
| V58-A06 | Controlled A/B | current | VERIFIED | production menu restoration | none | sanitized | Два fresh production v57 launches відтворили ту саму content-free mailbox-operation error, що й v58 |
| V58-A07 | Failure stage | current | VERIFIED | correct owner Apps Script dashboard | cached client shell possible | sanitized | Execution dashboard filter `Web app` не містив execution у жодному staging/production test window; direct owner-browser staging probe також не ввійшов у handler |
| V58-A08 | Root cause | current | UNVERIFIED | external transport/deployment access | офіційний status dashboard не доводить відсутність partial incident | sanitized | Доказ локалізує збій до pre-handler шару, але не відрізняє Telegram WebView transport, Google multi-login/access routing і partial Apps Script incident |
| V58-A09 | Candidate regression | current | UNVERIFIED | A06, A07 | shared failure on v57 | sanitized | Однаковий failure на stable і candidate не підтверджує v58-specific regression |
| V58-A10 | Promotion | current | BLOCKED | successful staging acceptance | none | sanitized | Acceptance не пройдено; Promote і CleanupStaging не запускалися |
| V58-A11 | Safety | current | VERIFIED | production v57 | none | sanitized | Telegram menu повернуто на production; v58 staging збережено; OAuth, scopes, Gmail data і random mail не змінювалися |
| V58-A12 | Label management | current | UNVERIFIED | GT-028 | local/visual tests only | public | GT-027 є у immutable v58, але live label UI не перевірено і production не змінено |

## Виправлена колізія реєстрів

Після об’єднання двох незалежних branches owner Advanced Gmail adapter і label management мали дубльовані IDs `GT-026/B1-20`. Follow-up залишає adapter на `GT-026/B1-20`, маршрутизує label management на `GT-027/B1-21`, а shared bootstrap blocker на `GT-028/B1-22`. Git history і merge commits не переписуються.

## Безпечний поточний стан

- Stable production: immutable v57.
- Candidate: immutable v58, один owner-only staging preserved.
- Telegram menu: production.
- Promotion: BLOCKED.
- CleanupStaging: не виконано.
- Fresh OAuth/consent, OTP, CAPTCHA або passkey: не виникали.

## Наступний доказовий крок

1. Не перемикати релізи повторно, поки shared pre-handler failure відтворюється на v57 і v58.
2. Після відновлення endpoint transport виконати два fresh v57 launches; лише після pass повторити signed v58 staging launch.
3. Promotion дозволений тільки після mailbox, avatar, three roots і account switch acceptance без OAuth.
4. Якщо v57 pass, а v58 fail, immutable v58 не змінювати; окремо авторизувати наступний cumulative candidate з exact rollback.

## Джерела

- [Versie 1 release article](../../../releases/VERSIE-001-2026-07-19.md)
- [Issues](../../../ISSUES.md)
- [Roadmap](../../../ROADMAP.md)
- [Official Apps Script executions dashboard guide](https://developers.google.com/apps-script/guides/dashboard)
- [Google Workspace Status Dashboard](https://www.google.com/appsstatus/dashboard/)
