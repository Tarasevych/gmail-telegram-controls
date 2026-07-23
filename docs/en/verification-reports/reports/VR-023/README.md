# VR-023 — Persistent app session after reload

[Українською](../../../../uk/verification-reports/reports/VR-023/README.md)

- **Date:** 2026-07-23
- **Overall status:** PARTIAL
- **Source request:** `REQ-0036`
- **Verification framework:** `REQ-0004`
- **Product task:** `B1-33` / P0 session continuity
- **Issue:** `GT-053`
- **Source commit:** `975785a`
- **Release boundary:** source only; no immutable, staging, production, OAuth, Gmail, or Telegram mutation

## Confirmed root cause

The server already issued a six-hour bearer session and a 24-hour rotating app refresh family, but `MailApp.html` kept both only in JavaScript RAM. F5, a hard reload, or a new WebView destroyed that state. The client then resubmitted either a one-time Telegram `initData` claim or a launch nonce that the server had already consumed and deleted. Fail-closed replay protection worked correctly, but the client had no separate safe recovery route.

Gmail OAuth refresh is stored and handled by the separate multi-account model and is not the root cause of this defect.

## Old and new launch pipeline

**Before:** reload → empty `state.session` and `state.refreshToken` → repeated launch proof → replay or expired error → repeated connection screen.

**After:** reload → bounded Telegram `SecureStorage.getItem` → `mailboxRenewSession` → atomic refresh-family rotation → persist the new app refresh credential → normal mailbox bootstrap. If the secure credential is absent or terminal-invalid, the client uses the existing fail-closed launch flow. A transient network failure neither removes the credential nor claims OAuth is required.

## Security boundaries

1. Telegram `SecureStorage` receives only the opaque app refresh credential; Gmail access or refresh tokens, Telegram `initData`, mail content, and the session bearer are never written there.
2. The bearer session remains memory-only.
3. `getItem`, `setItem`, and `removeItem` use bounded `750 ms` wrappers; `restoreItem` is not called automatically because it may require user confirmation.
4. The server-side `60 s` replay cache applies only to exact old claims and only while the current family and session match the rotation result.
5. Explicit revocation or a family change invalidates the cached replay.
6. Diagnostics contain only a reason code and counter, with no identifiers or credentials.

## Atomic claims

| ID | Claim | Status | Evidence |
|---|---|---|---|
| VR-023-01 | Hard reload lost the RAM-only app refresh credential and forced the client to reuse a one-time launch proof. | VERIFIED | source trace and RCA |
| VR-023-02 | Boot now performs single-flight secure recovery before handling an embedded launch error or launch nonce. | VERIFIED | source and contract tests |
| VR-023-03 | Ten concurrent renewal requests carrying the same refresh token receive one exact rotation result inside the bounded replay window. | VERIFIED | behavioral test |
| VR-023-04 | The old refresh token is rejected after the replay window; explicit revocation also blocks replay. | VERIFIED | behavioral and source contract |
| VR-023-05 | Focused auth/session suites and the complete Apps Script suite `561/561` pass; the diff is clean; credential signatures are `0`. | VERIFIED | local test and static traces |
| VR-023-06 | Telegram Desktop/mobile survives F5 or WebView reopen without another connection screen or OAuth. | UNVERIFIED | native acceptance has not run |
| VR-023-07 | Two real concurrent native launches safely receive one rotation family without a user-visible race. | UNVERIFIED | native concurrency acceptance has not run |

## Official platform boundaries

- [Telegram Mini Apps](https://core.telegram.org/bots/webapps) documents `SecureStorage` as per-user, per-bot device storage for tokens and authentication state, with `getItem`, `setItem`, `removeItem`, and at most ten items.
- [Apps Script HTML Service restrictions](https://developers.google.com/apps-script/guides/html/restrictions) confirm the IFRAME sandbox deployment model.
- [Apps Script Content Service](https://developers.google.com/apps-script/guides/content) redirects through a one-time `googleusercontent.com` URL; the verified current architecture has no documented custom HttpOnly response-cookie contract, so this source fix does not claim one.

The source correction is ready for a controlled staging contour, but native behavior and deployment are not marked VERIFIED without authenticated readback.
