# VR-047 - P0-F encrypted offline bootstrap та read-only unlock

Verification framework: REQ-0004

- **Статус:** `PARTIAL`
- **Дата:** 2026-07-24
- **Запит:** `REQ-0037`
- **Implementation baseline:** `2bd7eb52d2f3297929c24c12d8ccbb4611699b84`
- **Пов’язані записи:** `GT-072`, `B1-52`, `RCA-028`
- **English mirror:** [VR-047](../../../../en/verification-reports/reports/VR-047/README.md)

## Межа

Звіт перевіряє лише P0-F source contour. Реальні Gmail records, OAuth, Telegram runtime, Apps Script deployment, staging і production не змінювалися. Source evidence відновлює private cache у вже завантаженому document; це не доказ fresh offline navigation або native target-device acceptance.

## Підтверджена першопричина

P0-E зашифрував persistent records, але їх unlock усе ще вимагав live `state.session`. Exact owner scope, connected-account allowlist, active account, folders і labels надходили лише із server bootstrap. Під час transient outage клієнт не міг доказово відновити цей context і показував blocking launch error.

## Реалізований source contour

- Після verified online bootstrap записується окремий encrypted `bootstrap` record з 35-day expiry.
- Snapshot містить лише потрібний mailbox context; session token, refresh/access token, Telegram `initData` та signed launch data не зберігаються.
- Record key, kind, owner/bootstrap namespace, schema та expiry входять до AES-GCM AAD.
- Offline restore починається лише після `TRANSIENT_NETWORK_FAILURE` і бере content key тільки з exact Telegram SecureStorage envelope.
- Snapshot проходить schema, owner scope, issue/expiry, unique-account-set та active-account validation до unlock.
- Offline cache є read-only: `rpc()` fail closed з `OFFLINE_CACHE_ONLY`; prefetch і ordinary revalidation не запускаються.
- Online/visibility retry повторює verified boot pipeline; успішний online bootstrap вимикає offline mode та оновлює encrypted snapshot.
- `RESTORABLE`, malformed envelope, decrypt failure, expired snapshot, revoked auth або account mismatch не обходяться.

## Source evidence

| Claim | Результат | Статус |
|---|---:|---|
| Focused offline/cache/security contracts | `33/33` | `VERIFIED` у source scope |
| Повний Apps Script suite | `701/701` за `25.944s` | `VERIFIED` у source scope |
| Exact owner/bootstrap record + AAD gate | присутній | `VERIFIED` у source scope |
| Offline RPC/mutation blocking | присутній | `VERIFIED` у source scope |
| Exact implementation baseline | `2bd7eb52d2f3297929c24c12d8ccbb4611699b84` | зафіксовано |
| Gmail/OAuth/Telegram/runtime mutation | немає | не виконувалося |

## Чесні обмеження

- Apps Script HTML document повинен уже бути завантажений; fresh offline navigation чинного deployment не має підтвердженого Service Worker або same-origin offline shell.
- Native Telegram SecureStorage/WebCrypto та target-device 10-launch performance ще не перевірено.
- Snapshot expiry дорівнює 35 дням; browser eviction, manual site-data clear або incompatible schema закономірно вимагають cold start.
- Shared Apps Script URL Fetch quota та `T-03` лишають release gate `BLOCKED`.
- Production або staging acceptance не заявляється.

## Первинні джерела

- [Telegram Mini Apps SecureStorage](https://core.telegram.org/bots/webapps#securestorage)
- [Web Cryptography API: AES-GCM](https://www.w3.org/TR/WebCryptoAPI/#aes-gcm)
- [Indexed Database API 3.0](https://w3c.github.io/IndexedDB/)
- [Apps Script HTML service restrictions](https://developers.google.com/apps-script/guides/html/restrictions)
