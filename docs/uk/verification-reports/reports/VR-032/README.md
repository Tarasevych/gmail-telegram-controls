# VR-032 — Навігація та фактичний поштовий контекст

Verification framework: REQ-0004

- **Статус:** `PARTIAL`
- **Дата:** 2026-07-23
- **Запит:** `REQ-0035`
- **Пов’язані записи:** `GT-061`, `B1-41`, `RCA-014`
- **English mirror:** [VR-032](../../../../en/verification-reports/reports/VR-032/README.md)

## Атомарні твердження

| Твердження | Категорія | Статус | Походження |
|---|---|---|---|
| Header single/shared context і повні email mappings будуються з чинного account state та stable connection IDs | Ідентичність | `VERIFIED` | `apps-script/MailApp.html`; dynamic-context contracts |
| Context banner є доступним click/keyboard action і повертає до Inbox поточного поштового контексту | UX/доступність | `VERIFIED` | source contract і focused test |
| User list/thread transitions записують canonical hash route через History API; `hashchange` і `popstate` проходять через один deduplicated scheduler | Навігація | `VERIFIED` | `apps-script/MailApp.html`; E-03 contract |
| Небезпечний або порожній user-label route не може непомітно перетворитися на Inbox route | Безпека стану | `VERIFIED` | behavioral route-serializer assertion |
| Reader account chip прихований у звичайному single-account context і показаний для unified mode або реальної thread/account невідповідності | UX/ізоляція | `VERIFIED` | behavioral `readerNeedsAccountIdentity_` matrix |
| Rules setup hint не додається до кожного reader view | UX | `VERIFIED` | focused source contract |
| Native Telegram Desktop/WebView Back/Forward та `A → B → A` відновлюють list/thread/scroll/focus на реальному deployment | Runtime | `UNVERIFIED` | staging і native acceptance не запускалися |
| Цей контур застосовано до production | Release | `UNVERIFIED` | production лишається v65, staging `0`; immutable history не змінювалася |

## Перевірки

- Focused navigation/context contracts: `5/5`.
- Повний Apps Script suite: `617/617`.
- Тести не виконували Gmail mutation, OAuth, Telegram send, staging або production release.
- Bilingual, knowledge-hub, verification-report, release-state, privacy та diff checks є publication gates.

## Межі

- Source behavior перевірено, але загальний статус `PARTIAL`, доки native browser-history acceptance не дасть authenticated readback.
- Route зберігає лише bounded view/folder/filter/thread/connection identifiers, а не email, текст листа, token або Telegram `initData`.
- Existing account-scoped cache, draft і stale-response guards не замінювалися паралельною моделлю стану.
