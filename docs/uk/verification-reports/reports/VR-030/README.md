# VR-030 — Box OAuth: мінімальні права та стабільна ідентичність

Verification framework: REQ-0004

- **Статус:** `PARTIAL`
- **Дата:** 2026-07-23
- **Запит:** `REQ-0035`
- **Пов’язані записи:** `GT-059`, `B1-39`, `RCA-012`
- **English mirror:** [VR-030](../../../../en/verification-reports/reports/VR-030/README.md)

## Атомарні твердження

| Твердження | Категорія | Статус | Походження |
|---|---|---|---|
| Box authorize endpoint підтримує `scope`, а без нього застосовуються всі scopes, налаштовані для application | Зовнішній контракт | `VERIFIED` | [Box authorize reference](https://developer.box.com/reference/get-authorize), [Box scopes guide](https://developer.box.com/guides/api-calls/permissions-and-errors/scopes) |
| `root_readonly` є documented read-only scope для files/folders | Зовнішній контракт | `VERIFIED` | [Box scopes guide](https://developer.box.com/guides/api-calls/permissions-and-errors/scopes) |
| Source contour додає explicit `scope=root_readonly` і не передає login hint | Реалізація | `VERIFIED` | `apps-script/MultiAccount.gs`, source-contract test |
| Provider callback відхиляє надмірний, керувальний або orphan `errorDescription` до споживання state | Реалізація | `VERIFIED` | `apps-script/MultiAccount.gs`, source-contract test |
| Reconnect використовує stable Box account ID; legacy record визначається за захищеним token record, а не email | Реалізація | `VERIFIED` | `apps-script/MultiAccount.gs`, source-contract test |
| Реальна Box авторизація, callback, refresh, revoke та picker працюють у deployment | Runtime | `UNVERIFIED` | Не запускалося у цьому source-only контурі |

## Перевірки

- Focused source contract: `3/3`.
- Повний Apps Script suite: `615/615`.
- Bilingual docs, knowledge hub, verification reports, release-state та `git diff --check`: мають пройти до публікації.
- Gmail, Telegram, Apps Script staging/production та live Box OAuth не змінювалися.

## Межі та чутливість

- Токени, authorization codes, callback state, приватні identifiers і secret properties не читаються та не публікуються.
- Статус залишається `PARTIAL`, доки authenticated owner-only acceptance не надасть runtime evidence.
- Новий Google або Box consent не запускається без підтвердженої необхідності.
