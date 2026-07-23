# VR-036 — F-02 Узгоджені дії листа та account-correct Gmail handoff

Verification framework: REQ-0004

- **Статус:** `PARTIAL`
- **Дата:** 2026-07-23
- **Запит:** `REQ-0035`
- **Пов’язані записи:** `GT-064`, `B1-44`, `RCA-017`
- **English mirror:** [VR-036](../../../../en/verification-reports/reports/VR-036/README.md)

## Першопричина

Desktop toolbar, conversation footer і mobile action bar незалежно створювали primary Reply/Forward actions, а `.reader-actionbar` був видимий поза mobile breakpoint. Зовнішні переходи відкривали `state.thread.gmailUrl` напряму, тому позиційний Gmail `/u/0` не був надійно зв’язаний із фактично вибраним connection. Панель Gmail metadata перелічувала дані, але не пояснювала, що підтримує Mini App/API, що потребує native Gmail, а що не має безпечного API contract.

## Атомарні твердження

| Твердження | Категорія | Статус | Походження |
|---|---|---|---|
| Desktop показує компактний Reply/Forward/More toolbar, а mobile — одну нижню primary action surface | UX | `VERIFIED` | focused executable source contract |
| Legacy conversation footer не бере участі у layout або accessibility tree | Accessibility | `VERIFIED` | CSS/source contract |
| Gmail handoff спочатку знаходить exact stable connection і лише потім формує `authuser=<email>` | Multi-account isolation | `VERIFIED` | VM behavior test |
| Неоднозначний account context зупиняє handoff замість відкриття довільного Gmail account | Safety | `VERIFIED` | VM fail-closed test |
| More menu не видає print, translate, raw MIME або phishing report за Gmail API mutation | API honesty | `VERIFIED` | focused source contract |
| Settings hub покриває одинадцять requested sections і класифікує Mini App/API та Gmail handoff | Capability UX | `VERIFIED` | focused source contract |
| Gmail browser settings fragments стабільно відкривають правильні native sections у Telegram Desktop/mobile | Runtime | `UNVERIFIED` | browser UI contract може змінюватися; staging `0` |

## Первинні межі API

- [Gmail users.settings](https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.settings) документує підтримані settings resources, але не весь Gmail web UI.
- [Gmail users.messages.get](https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.messages/get) документує `raw` format; цей contour навмисно не додає raw MIME transfer або новий scope.
- [Gmail users.threads.modify](https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.threads/modify) покриває label mutations, але не native phishing/legal-report, translation або print UI.
- Gmail settings fragments використовуються лише як account-correct best-effort handoff і не заявляються як стабільний API.

## Перевірки

- Focused message-capability contract: `6/6`.
- Focused Mail App group: `98/98`.
- Повний Apps Script suite: `635/635`.
- Production v65, staging `0`, immutable v70, Gmail, OAuth і Telegram runtime state не змінювалися.

## Висновок і межі

Source-level action ownership, exact-account handoff і capability honesty доказові. Загальний статус `PARTIAL`, бо native Telegram WebView popup/deep-link acceptance, account switching readback і settings-fragment behavior не виконувалися під час shared Apps Script URL Fetch quota blocker. Новий immutable candidate цим source-контуром не створювався.
