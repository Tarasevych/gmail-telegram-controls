# VR-046 - P0-E AES-GCM persistent-cache envelope

Verification framework: REQ-0004

- **Status:** `PARTIAL`
- **Date:** 2026-07-24
- **Request:** `REQ-0037`
- **Implementation baseline:** `6f8a357e1a650639c3a16f9d6c7601d89817e3fe`
- **Related records:** `GT-071`, `B1-51`, `RCA-027`
- **Українське дзеркало:** [VR-046](../../../../uk/verification-reports/reports/VR-046/README.md)

## Boundary

This report verifies the P0-E source contour only. No real Gmail record, OAuth, Telegram runtime, Apps Script deployment, staging, or production state was changed. Node WebCrypto evidence is not proof of native Telegram target-device persistence or offline launch.

## Confirmed root cause

P0-D established the correct explicit session lock, but schema 2 stored private `record.value` plaintext in IndexedDB. Namespace isolation does not replace encryption at rest: persistent bytes remained unencrypted after WebView close.

## Implemented source contour

- Cache schema is raised to `3`; the upgrade transaction clears incompatible schema-2 plaintext records.
- Every current-schema value is encrypted with AES-256-GCM, a random 96-bit IV, and a 128-bit authentication tag.
- AAD includes schema, record key, kind, namespace, and expiry, preventing safe ciphertext swaps between records.
- IndexedDB receives metadata and a cipher envelope with no `value` field.
- The 32-byte content key is imported as a non-extractable runtime `CryptoKey`.
- The raw key is stored only in an owner-scoped Telegram `SecureStorage` envelope; `localStorage`, `sessionStorage`, `DeviceStorage`, and IndexedDB are not used for it.
- `RESTORABLE`, owner-scope mismatch, unsupported crypto, invalid envelope, and encrypt/decrypt failure fail closed without automatic consent or plaintext fallback.
- The online mailbox can continue without persistent cache when secure crypto is unavailable.

## Source evidence

| Claim | Result | Status |
|---|---:|---|
| Focused crypto/cache/launch contracts | `55/55` | `VERIFIED` in source scope |
| Complete Apps Script suite | `692/692` in `23.540s` | `VERIFIED` in source scope |
| AES-GCM roundtrip + AAD tamper rejection | passed | `VERIFIED` in Node WebCrypto scope |
| Exact implementation baseline | `6f8a357e1a650639c3a16f9d6c7601d89817e3fe` | recorded |
| Gmail/OAuth/Telegram/runtime mutation | none | not performed |

## Honest limitations

- Native Telegram `SecureStorage` get/set and Apps Script WebView WebCrypto have not yet been tested on the target device.
- Offline launch has no encrypted bootstrap snapshot yet and cannot expose mailbox state without a server-established context.
- The security schema upgrade intentionally clears the old plaintext cache; server Gmail data and confirmed Gmail drafts are not deleted.
- Shared Apps Script URL Fetch quota and `T-03` keep the release gate `BLOCKED`.
- No production or staging acceptance is claimed.

## Primary references

- [Telegram Mini Apps SecureStorage](https://core.telegram.org/bots/webapps#securestorage)
- [Web Cryptography API: AES-GCM](https://www.w3.org/TR/WebCryptoAPI/#aes-gcm)
- [Indexed Database API 3.0](https://w3c.github.io/IndexedDB/)
- [Apps Script HTML service restrictions](https://developers.google.com/apps-script/guides/html/restrictions)
