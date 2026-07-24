# VR-045 - P0-D verified-session private-cache lock

Verification framework: REQ-0004

- **Статус:** `PARTIAL`
- **Дата:** 2026-07-24
- **Запит:** `REQ-0037`
- **Implementation baseline:** `8c01143411e20f96b7ec4fc885dd1898ac2e4bbb`
- **Пов’язані записи:** `GT-070`, `B1-50`, `RCA-026`
- **English mirror:** [VR-045](../../../../en/verification-reports/reports/VR-045/README.md)

## Межа

Звіт перевіряє лише P0-D source contour. Реальні Gmail records, OAuth, Telegram runtime, Apps Script deployment, staging і production не змінювалися. Source tests не доводять native Telegram SecureStorage behavior, encrypted-at-rest IndexedDB або offline unlock.

## Підтверджена першопричина

Namespace isolation вже вимагала opaque owner scope і точний Gmail connection, але hydration сама встановлювала allowlist із mutable client state. Low-level IndexedDB reads/writes не мали окремого unlocked bit, а account-changing bootstrap, disconnect і sign-out не використовували один обов’язковий lock/rebind lifecycle.

## Реалізований source contour

- Cache стартує fail closed і розблоковується лише за наявності чинної app session, exact 43-character owner `cacheScope` та непорожнього exact connected-account set.
- `p0HydratePersistentState()` більше не може self-authorize; denied hydration повторно блокує cache.
- Low-level `get`, `getAll`, `put`, memory peek, record read і record write перевіряють central unlock gate.
- Усі п’ять фактичних bootstrap paths rebind exact allowlist.
- Account switch, disconnect і confirmed sign-out очищають private memory, drafts, restored views, scroll maps та mail DOM.
- Lock не видаляє persistent IndexedDB records, тому майбутній безпечний same-account unlock може повторно використати їх.
- Browser `localStorage`, `DeviceStorage`, OAuth tokens або Telegram `initData` для unlock не додані.

## Source evidence

| Claim | Результат | Статус |
|---|---:|---|
| Focused cache/launch/history contracts | `48/48` | `VERIFIED` у source scope |
| Повний Apps Script suite | `685/685` за `26.020s` | `VERIFIED` у source scope |
| Exact implementation baseline | `8c01143411e20f96b7ec4fc885dd1898ac2e4bbb` | зафіксовано |
| Gmail/OAuth/Telegram/runtime mutation | немає | не виконувалося |

## Чесні обмеження

- Persistent mail records ще не encrypted at rest; цей contour запобігає application-level читанню до unlock, але не заявляє cryptographic storage protection.
- Поточний offline launch не має server-verified bootstrap, тому device-bound offline unlock лишається `UNVERIFIED`.
- Telegram документує `SecureStorage` як Keychain/Keystore-backed user-specific storage до 10 items, але native behavior цього застосунку ще не перевірено на target device.
- Shared Apps Script URL Fetch quota та `T-03` лишають release gate `BLOCKED`.
- Production або staging acceptance не заявляється.

## Первинні джерела

- [Telegram Mini Apps SecureStorage](https://core.telegram.org/bots/webapps#securestorage)
- [Apps Script HTML service restrictions](https://developers.google.com/apps-script/guides/html/restrictions)
- [Indexed Database API 3.0](https://w3c.github.io/IndexedDB/)
