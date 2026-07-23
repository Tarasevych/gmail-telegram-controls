# VR-028 — Прямі контракти Google Drive OAuth

- **Загальний статус:** PARTIAL
- **Дата:** 2026-07-23
- **Source request:** `REQ-0035`
- **Verification framework:** `REQ-0004`
- **Workstream:** V3 `D-01`
- **Product task:** `B1-37`
- **Issue:** `GT-057`
- **English mirror:** [English report](../../../../en/verification-reports/reports/VR-028/README.md)

## Атомарне твердження

Чинний Drive OAuth мав owner-bound, hash-only, bounded та one-use state, але Drive callback не перевіряв збережене поле `provider` після consume. Отже state, виданий іншому source provider у спільному registry, не відсікався до Google token exchange. Drive provider-error envelope також не мав bounded allowlist, наявного в Box-контурі.

## Мінімальна корекція

`mailboxDriveHandleOAuthCallback_` тепер:

- приймає лише provider error з безпечного bounded набору символів;
- обмежує description до 500 символів, відхиляє control characters і description без provider error;
- після one-use consume вимагає exact `stateRecord.provider === "drive"`;
- не змінює redirect URI, scopes, token storage, owner model, refresh generation або disconnect semantics.

## Синтетична поведінкова матриця

Focused Node/VM contract без мережі перевіряє:

1. exact Apps Script route `action=drive_oauth_callback` і exact configured redirect URI;
2. session user ID у state, hash-only storage, 10-хвилинний TTL, limit 24 і replacement попереднього Drive state того самого користувача;
3. one-use consume, expiry та replay rejection;
4. strict callback keys, взаємовиключні code/error і sanitized provider denial;
5. fail-closed wrong-provider state без token exchange;
6. owner-bound connection, wrong-user denial і token-free public account DTO;
7. access-token reuse, reconnect generation rotation, refresh success та незмінений protected record після refresh failure;
8. revoke лише exact selected Drive source, збереження іншого акаунта і відсутність локального revoke при provider failure.

Усі identities використовують зарезервований домен `.invalid`; provider responses та Script Properties є in-memory synthetic doubles.

## Межа перевірки

Source behavior і focused contract можуть бути `VERIFIED` лише після фактичного test run. Реальний Google authorization endpoint, account selection, consent, deployed callback, provider refresh/revoke, Telegram Mini App UX, staging і production у цьому контурі не виконуються та лишаються `UNVERIFIED`.

Тому загальний статус `PARTIAL`. Gmail, Telegram, OAuth grants, secrets, production v65, staging, immutable history і release helpers не змінюються.
