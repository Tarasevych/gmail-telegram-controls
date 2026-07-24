# VR-046 - P0-E AES-GCM persistent-cache envelope

Verification framework: REQ-0004

- **Статус:** `PARTIAL`
- **Дата:** 2026-07-24
- **Запит:** `REQ-0037`
- **Implementation baseline:** `6f8a357e1a650639c3a16f9d6c7601d89817e3fe`
- **Пов’язані записи:** `GT-071`, `B1-51`, `RCA-027`
- **English mirror:** [VR-046](../../../../en/verification-reports/reports/VR-046/README.md)

## Межа

Звіт перевіряє лише P0-E source contour. Реальні Gmail records, OAuth, Telegram runtime, Apps Script deployment, staging і production не змінювалися. Node WebCrypto evidence не є доказом native Telegram target-device persistence або offline launch.

## Підтверджена першопричина

P0-D створив правильний explicit session lock, але schema 2 зберігала private `record.value` plaintext у IndexedDB. Namespace isolation не замінює encryption at rest: після закриття WebView persistent bytes лишалися незашифрованими.

## Реалізований source contour

- Cache schema піднято до `3`; upgrade transaction очищає несумісні schema-2 plaintext records.
- Кожний current-schema value шифрується AES-256-GCM з random 96-bit IV та 128-bit authentication tag.
- AAD містить schema, record key, kind, namespace і expiry, тому ciphertext не можна безпечно переставити між records.
- IndexedDB отримує metadata та cipher envelope без поля `value`.
- 32-byte content key імпортується як non-extractable runtime `CryptoKey`.
- Raw key зберігається лише в owner-scoped Telegram `SecureStorage` envelope; не використано `localStorage`, `sessionStorage`, `DeviceStorage` або IndexedDB.
- `RESTORABLE`, owner-scope mismatch, unsupported crypto, invalid envelope, encrypt/decrypt failure fail closed без автоматичного consent або plaintext fallback.
- Online mailbox може працювати без persistent cache, якщо secure crypto недоступна.

## Source evidence

| Claim | Результат | Статус |
|---|---:|---|
| Focused crypto/cache/launch contracts | `55/55` | `VERIFIED` у source scope |
| Повний Apps Script suite | `692/692` за `23.540s` | `VERIFIED` у source scope |
| AES-GCM roundtrip + AAD tamper rejection | успішно | `VERIFIED` у Node WebCrypto scope |
| Exact implementation baseline | `6f8a357e1a650639c3a16f9d6c7601d89817e3fe` | зафіксовано |
| Gmail/OAuth/Telegram/runtime mutation | немає | не виконувалося |

## Чесні обмеження

- Native Telegram `SecureStorage` get/set та Apps Script WebView WebCrypto ще не перевірено на target device.
- Offline launch ще не має encrypted bootstrap snapshot і не може показати mailbox без server-established context.
- Security schema upgrade навмисно очищає старий plaintext cache; server Gmail data та confirmed Gmail drafts не видаляються.
- Shared Apps Script URL Fetch quota та `T-03` лишають release gate `BLOCKED`.
- Production або staging acceptance не заявляється.

## Первинні джерела

- [Telegram Mini Apps SecureStorage](https://core.telegram.org/bots/webapps#securestorage)
- [Web Cryptography API: AES-GCM](https://www.w3.org/TR/WebCryptoAPI/#aes-gcm)
- [Indexed Database API 3.0](https://w3c.github.io/IndexedDB/)
- [Apps Script HTML service restrictions](https://developers.google.com/apps-script/guides/html/restrictions)
