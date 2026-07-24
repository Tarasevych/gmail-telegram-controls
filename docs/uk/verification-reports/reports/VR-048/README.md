# VR-048 - P0-G conflict-safe Gmail Drafts update

Verification framework: REQ-0004

- **Статус:** `PARTIAL`
- **Дата:** 2026-07-24
- **Запит:** `REQ-0037`
- **Implementation baseline:** `9b00a335c0016c439a463233b67a16e1499b7222`
- **Пов’язані записи:** `GT-073`, `B1-53`, `RCA-029`
- **English mirror:** [VR-048](../../../../en/verification-reports/reports/VR-048/README.md)

## Межа

Звіт перевіряє лише P0-G source contour на synthetic Gmail harness. Реальні Gmail-чернетки, OAuth, Telegram runtime, Apps Script deployment, staging і production не змінювалися. Source tests доводять optimistic conflict detection, але не atomic compare-and-swap на стороні Gmail.

## Підтверджена першопричина

Чинна модель уже мала encrypted local recovery, 1.8-second debounce, stable operation ID, durable journal, bounded retry, restart reconciliation та local/Gmail conflict UI під час відкриття. Проте update наявної чернетки передавав лише draft content і stable operation ID. Якщо інша сесія змінювала Gmail draft після canonical readback, наступний `PUT` не мав expected server-state binding і міг мовчки замінити новішу версію.

## Реалізований source contour

- Canonical draft DTO містить 43-символьний opaque `serverVersion`, отриманий із canonical Gmail draft state.
- Token не розкриває body, адреси, OAuth/session credentials або Telegram identifiers.
- Encrypted recovery-state зберігає `serverVersion`; update payload передає його як `expectedVersion`.
- Existing-draft update fail closed з `DRAFT_VERSION_REQUIRED`, якщо exact token відсутній.
- Сервер звіряє version після canonical draft read і вдруге безпосередньо перед `PUT`.
- Mismatch не виконує Gmail mutation, terminalizes exact journal reservation як failed і повертає current canonical draft у conflict DTO.
- Client зберігає local recovery, припиняє automatic retry і показує дві явні дії: залишити локальну версію або прийняти Gmail-версію.
- Вибір локальної версії спочатку приймає latest server version як новий expected baseline; вибір Gmail-версії замінює локальний editor canonical state.

## Source evidence

| Claim | Результат | Статус |
|---|---:|---|
| Focused draft/client contracts | `258/258` | `VERIFIED` у source scope |
| Повний Apps Script suite | `707/707` за `23.349s` | `VERIFIED` у source scope |
| Exact version propagation через DTO/recovery/payload | присутня | `VERIFIED` у source scope |
| Два version checks до `PUT` | присутні | `VERIFIED` у source scope |
| Conflict path не виконує `PUT` і закриває reservation | присутній | `VERIFIED` у source scope |
| Exact implementation baseline | `9b00a335c0016c439a463233b67a16e1499b7222` | зафіксовано |
| Реальна Gmail/OAuth/Telegram/runtime mutation | немає | не виконувалася |

## Чесні обмеження

- Офіційний `users.drafts.update` документує replacement через `PUT`, але не документує `If-Match`, ETag, revision або інший atomic precondition.
- Другий canonical read безпосередньо перед update істотно звужує, але не усуває гонку, якщо інша сесія змінить draft після цього read і до Gmail `PUT`.
- Authenticated two-session acceptance має використовувати лише явно створену контрольну чернетку; цей source contour її не виконував.
- Shared Apps Script URL Fetch quota та `T-03` лишають release gate `BLOCKED`.
- Staging або production acceptance не заявляється.

## Первинні джерела

- [Gmail API: users.drafts.update](https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.drafts/update)
- [Gmail API: Draft resource](https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.drafts)
