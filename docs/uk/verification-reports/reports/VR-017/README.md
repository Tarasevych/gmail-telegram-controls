# VR-017 — V3 cache-first launch hardening

[English](../../../../en/verification-reports/reports/VR-017/README.md)

- **Дата:** 2026-07-23
- **Загальний статус:** PARTIAL
- **Source request:** `REQ-0035`
- **Verification framework:** `REQ-0004`
- **Product task:** `B1-27`
- **Issues:** `GT-040–GT-047`
- **Release boundary:** production/HEAD v65, staging `0`; immutable v67 збережено; source marker v68 ще не є immutable release

## Recovery boundary

- Атомарна v67 acceptance-операція завершилася до цієї роботи: production menu відновлено, exact staging видалено, immutable v67 збережено, promotion не виконувався.
- V3 product work виконується в окремому worktree/branch і не змінює Gmail OAuth, Telegram zone, листи або protected properties.
- `REQ-0035` зареєстровано до product change; relevant instructions і authority index були виправлені окремими normal PR.

## Підтверджені першопричини

1. `MailApp.html` містив статичний boot copy і runtime copy того самого connection message.
2. Storage warmup викликав неіснуючий `p0OpenDatabase`; реальна функція має ім’я `p0OpenDb`. Попередній тест помилково закріпив неправильний symbol.
3. `boot()` дедуплікував лише активну Promise, але після settle дозволяв повторний повний pipeline.
4. Persistent namespaces були account-scoped, але не містили окремого opaque Telegram-owner scope.
5. Account attention/onboarding path міг затримувати або помилково змінювати normal launch decision.
6. Thread-body background prefetch до user click не був реалізований.

## Реалізація у source candidate v68

- hidden boot host більше не містить дубльованого повноекранного тексту;
- launch має in-flight і settled single-flight, а explicit preview restart використовує `force`;
- warmup викликає `p0OpenDb`, не читаючи приватні records до server bootstrap;
- server видає 43-символьний opaque HMAC cache scope без raw Telegram ID;
- cache keys мають `owner scope + Gmail connection ID`; cross-owner/cross-account records не читаються;
- schema v2 обмежена `480 records`, `16 MiB`, `45 days` і `1.5 MiB` на record із LRU eviction;
- persistent-storage request є advisory і не блокує app shell;
- list/thread показуються cache-first, а network revalidation виконується у фоні;
- account attention/onboarding decision виконується після авторитетної відповіді без блокування вже придатного UI;
- unread-first prefetch обмежено трьома thread bodies і не виконує `markRead` або mail mutation;
- historical v67 release helper лишився immutable і не прив’язує пізніший source до v67.

## Атомарні твердження

| ID | Твердження | Статус | Доказ |
|---|---|---|---|
| VR-017-01 | Recovery state перед V3 work був safe: production v65, staging `0`, immutable v67 historical. | VERIFIED | private recovery ledger і authenticated release readback |
| VR-017-02 | Duplicate launch copy і неправильний IndexedDB helper існували у cumulative source. | VERIFIED | source inspection та regression tests |
| VR-017-03 | v68 source має один ordinary boot presentation і settled single-flight. | VERIFIED | `mail_launch_p0.test.js` |
| VR-017-04 | Cache namespace ізольовано opaque Telegram-owner scope та stable Gmail connection ID. | VERIFIED | `MailClient.gs`, namespace VM contracts |
| VR-017-05 | Cache bounded/versioned і не зберігає token/signature у новому delta. | VERIFIED | source contracts і added-lines scan `0` high-risk signatures |
| VR-017-06 | Prefetch не змінює read state. | VERIFIED | source contract: відсутні `markRead`/mutation у prefetch |
| VR-017-07 | Existing drafts, labels, navigation, multi-account і version-update contracts не регресували локально. | VERIFIED | cumulative suite `526/526` |
| VR-017-08 | Targeted P0/release tests проходять. | VERIFIED | `25/25` |
| VR-017-09 | MailApp contract проходить. | VERIFIED | `88/88` |
| VR-017-10 | Bilingual, knowledge-hub, verification-report і release-state validators проходять. | VERIFIED | local validator output |
| VR-017-11 | Native warm-launch p95 `≤1000 ms` і десять послідовних запусків доведені. | UNVERIFIED | staging v68 ще не створено |
| VR-017-12 | Приватний offline Inbox до server bootstrap доступний без device-bound secret. | BLOCKED | чинна security/origin boundary |
| VR-017-13 | Native prefetch, drafts, bidirectional switching і shared-mode isolation доведені. | UNVERIFIED | owner-only staging acceptance очікується |
| VR-017-14 | Production one-reload/no-loop transition v67/v68 доведений. | UNVERIFIED | v68 не promoted |
| VR-017-15 | Immutable v67 лишився незмінним; новий cumulative source має marker v68. | VERIFIED | v67 helper/history не змінено |

## Платформна межа

- Telegram `initData` перевіряється server-side; client `initDataUnsafe` не є trust source.
- Apps Script HtmlService працює у sandboxed iframe і не гарантує Service Worker/offline app-shell contract.
- IndexedDB та Storage persistence є origin-scoped best effort; eviction і user-cleared site data можливі.
- Background Sync залежить від Service Worker і не заявляється для закритого Telegram WebView.
- Чинний bridge-to-Apps-Script route не дає доказу button-to-private-Inbox `≤1000 ms` до native trace і окремого device-bound unlock або single-origin рішення.

## Офіційні джерела

- [Telegram Mini Apps](https://core.telegram.org/bots/webapps)
- [Apps Script HTML restrictions](https://developers.google.com/apps-script/guides/html/restrictions)
- [Apps Script web apps](https://developers.google.com/apps-script/guides/web)
- [Gmail synchronization](https://developers.google.com/workspace/gmail/api/guides/sync)
- [Gmail drafts](https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.drafts)
- [IndexedDB](https://w3c.github.io/IndexedDB/)
- [Storage](https://storage.spec.whatwg.org/)
- [Service Workers](https://w3c.github.io/ServiceWorker/)
- [Background Sync](https://wicg.github.io/background-sync/spec/)

## Release decision

Локальний source/test gate пройдено, але native acceptance відсутній. Після merge необхідно окремо створити exact hash-pinned immutable v68 helper, пройти `PreflightOnly` і один owner-only staging. Production promotion заборонений до VERIFIED critical native gates; v65 лишається rollback-safe production.
