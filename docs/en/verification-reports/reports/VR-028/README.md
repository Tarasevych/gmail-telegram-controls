# VR-028 — Direct Google Drive OAuth contracts

- **Overall status:** PARTIAL
- **Date:** 2026-07-23
- **Source request:** `REQ-0035`
- **Verification framework:** `REQ-0004`
- **Workstream:** V3 `D-01`
- **Product task:** `B1-37`
- **Issue:** `GT-057`
- **Українське дзеркало:** [Український звіт](../../../../uk/verification-reports/reports/VR-028/README.md)

## Atomic claim

The current Drive OAuth contour had owner-bound, hash-only, bounded, one-use state, but the Drive callback did not verify the stored `provider` after consumption. State issued to another source provider in the shared registry was therefore not rejected before Google token exchange. The Drive provider-error envelope also lacked the bounded allowlist already present in the Box contour.

## Minimal correction

`mailboxDriveHandleOAuthCallback_` now:

- accepts only a bounded provider error using a safe character set;
- limits the description to 500 characters, rejects control characters, and rejects a description without a provider error;
- requires exact `stateRecord.provider === "drive"` after one-use consumption;
- does not change the redirect URI, scopes, token storage, owner model, refresh generation, or disconnect semantics.

## Synthetic behavioral matrix

The focused offline Node/VM contract verifies:

1. the exact Apps Script `action=drive_oauth_callback` route and exact configured redirect URI;
2. session user ID in state, hash-only storage, ten-minute TTL, limit 24, and replacement of the same user's prior Drive state;
3. one-use consumption, expiry, and replay rejection;
4. strict callback keys, mutually exclusive code/error, and sanitized provider denial;
5. fail-closed wrong-provider state without token exchange;
6. owner-bound connection, wrong-user denial, and token-free public account DTOs;
7. access-token reuse, reconnect generation rotation, refresh success, and an unchanged protected record after refresh failure;
8. revocation of only the exact selected Drive source, preservation of another account, and no local revoke after provider failure.

Every identity uses the reserved `.invalid` domain; provider responses and Script Properties are in-memory synthetic doubles.

## Verification boundary

Source behavior and the focused contract may become `VERIFIED` only after the actual test run. The real Google authorization endpoint, account selection, consent, deployed callback, provider refresh/revoke, Telegram Mini App UX, staging, and production are not exercised by this contour and remain `UNVERIFIED`.

The overall status is therefore `PARTIAL`. Gmail, Telegram, OAuth grants, secrets, production v65, staging, immutable history, and release helpers are unchanged.
