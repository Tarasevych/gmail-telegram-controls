# VR-023 — Persistent app session after reload

[Українською](../../../../uk/verification-reports/reports/VR-023/README.md)

- **Date:** 2026-07-23
- **Overall status:** PARTIAL
- **Source request:** `REQ-0036`
- **Verification framework:** `REQ-0004`
- **Product task:** `B1-33` / P0 session continuity
- **Issue:** `GT-053`
- **Source commit:** `975785a`
- **Immutable candidate:** Apps Script v69
- **Release boundary:** v69 was staged, tested, and abandoned fail closed; the exact staging deployment was removed, the journal is terminal `abandoned`, the owner menu is production, active staging is `0`, and verified production v65 is unchanged; OAuth and Gmail state were not changed

## Confirmed root cause

The server already issued a six-hour bearer session and a 24-hour rotating app refresh family, but `MailApp.html` kept both only in JavaScript RAM. F5, a hard reload, or a new WebView destroyed that state. The client then resubmitted either a one-time Telegram `initData` claim or a launch nonce that the server had already consumed and deleted. Fail-closed replay protection worked correctly, but the client had no separate safe recovery route.

Gmail OAuth refresh is stored and handled by the separate multi-account model and is not the root cause of this defect.

## Old and new launch pipeline

**Before:** reload → empty `state.session` and `state.refreshToken` → repeated launch proof → replay or expired error → repeated connection screen.

**Source candidate:** reload → bounded Telegram `SecureStorage.getItem` → `mailboxRenewSession` → atomic refresh-family rotation → persist the new app refresh credential → normal mailbox bootstrap. If the secure credential is absent or terminal-invalid, the client uses the existing fail-closed launch flow. A transient network failure neither removes the credential nor claims OAuth is required.

**Observed native Desktop pipeline:** v69 hard reload → native form-resubmission prompt → repeated POST Apps Script document → reuse of an already-consumed Telegram launch proof → `UNTRUSTED_NONCE_REPLAY`. On the tested Windows Telegram Desktop, `SecureStorage` did not return a usable recovery credential before the embedded launch error was handled. The wrapper did not retain the platform error code, so the exact storage rejection is not proven.

## Native A/B and release disposition

1. The owner menu was first restored to production.
2. Two fresh production v65 launches loaded the profile, avatar, and mailbox.
3. After one controlled switch to staging, the first v69 launch showed a generic mail-operation error; a bounded repeat loaded the mailbox in approximately `20 s`. This manual observation is enough to reject the one-second SLO, but it is not a formal p95 benchmark.
4. A v69 hard reload reproduced POST resubmission and `UNTRUSTED_NONCE_REPLAY`; no new OAuth consent was started.
5. Production promotion was not performed. The owner menu was restored to production, v69 was abandoned with the exact journal-bound helper, staging was removed, and active staging is `0`.
6. The exact stage of the first generic server error remains `UNVERIFIED`: the existing protected CLI token lacked the Apps Script Processes read scope, and no new authorization scope was requested.

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
| VR-023-06 | Telegram Desktop survives a hard reload without another connection screen or OAuth. | CONFLICTING | native v69 reload ended in form resubmission and `UNTRUSTED_NONCE_REPLAY`; OAuth did not start |
| VR-023-07 | Two real concurrent native launches safely receive one rotation family without a user-visible race. | UNVERIFIED | native concurrency acceptance has not run |
| VR-023-08 | Production v65 remained the working baseline and v69 was not promoted after failed acceptance. | VERIFIED | two production launches, menu readback, and release journal |
| VR-023-09 | Immutable v69 remains historical, the exact staging deployment was removed, active staging is `0`, and the journal is terminal `abandoned`. | VERIFIED | release helper and repeated preflight |
| VR-023-10 | The tested Windows Desktop supplied a usable `SecureStorage` recovery credential. | CONFLICTING | native reload did not restore the session; the exact platform error code was not retained |
| VR-023-11 | Staging v69 meets the warm-launch SLO of `≤1000 ms`. | CONFLICTING | approximately `20 s` in manual native observation; formal p95 is not yet measured |

## Official platform boundaries

- [Telegram Mini Apps](https://core.telegram.org/bots/webapps) documents `SecureStorage` as per-user, per-bot device storage for tokens and authentication state, with `getItem`, `setItem`, `removeItem`, and at most ten items. This describes a capability, not guaranteed support by every client.
- [Telegram's low-level Mini App storage API](https://core.telegram.org/api/bots/webapps#secure-storage) separately defines an unsupported-platform result. The current wrapper must preserve a content-free error code before the Windows Desktop result can be classified exactly.
- [Apps Script HTML Service restrictions](https://developers.google.com/apps-script/guides/html/restrictions) confirm the IFRAME sandbox deployment model.
- [Apps Script Content Service](https://developers.google.com/apps-script/guides/content) redirects through a one-time `googleusercontent.com` URL; the verified current architecture has no documented custom HttpOnly response-cookie contract, so this source fix does not claim one.

The source correction is locally VERIFIED, but v69 native acceptance failed. The next contour must first add content-free storage telemetry and produce a safe Desktop recovery architecture decision; storing the credential in unprotected JavaScript storage is not an acceptable fix.

## Follow-up source decision v70

- **Date:** 2026-07-23
- **Status:** PARTIAL
- v69 remains unchanged historical immutable evidence and is not rewritten.
- Local cumulative source v70 preserves replay protection and adds a content-free SecureStorage status, cross-document launch timing, and a fail-closed locked state without a restart loop.
- Local gates: P0 `113/113`, full suite `567/567`, privacy scan `0`, and clean `git diff --check`.
- v70 is not merged and has no immutable version or staging deployment; production v65 and active staging `0` are unchanged.
- Native hard reload, exact SecureStorage result, and one-second p95 remain `UNVERIFIED`; browser-level POST resubmission is not claimed fixed.
