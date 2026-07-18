# Crash and blocker report

No current production crash was detected during the v28 baseline audit.

## Frozen issue

- Formal Codex Security scans repeatedly triggered the platform cybersecurity-content filter. Those artifacts remain frozen and that workflow is not resumed. Ordinary functional authorization tests may assert only the expected denial.

## Manual gates

Work must stop for CAPTCHA, OTP, a new Google OAuth consent belonging to a specific user, or an unavoidable owner decision. A blocker entry must include timestamp, affected phase, exact non-secret error, one attempted alternative, preserved state, and next safe action.

## 2026-07-18 — v28 guarded deployment HTTP 500

- Phase: first and only v27→v28 guarded deployment attempt.
- Error: Google Apps Script API returned HTTP 500 before immutable version 28 could be verified.
- Automatic recovery: the release helper restored and verified HEAD from immutable v27 before returning failure.
- Read-only verification immediately afterward: stable version 27, release state `fresh`, deployment ID unchanged, no immutable v28 discovered, exact local v28 hashes still match the release pins.
- Preserved state: production v27 is healthy and unchanged; candidate source and release helper are pushed on `codex/neuroinclusive-v28`.
- Decision: do not repeat the mutation in the same run. Continue only isolated local product work. A later recovery run must start with `-PreflightOnly` and may make at most one guarded attempt after re-verifying live state.
- Resolution: a later recovery run re-audited live state and made its single permitted attempt. It succeeded, and post-deploy verification confirmed immutable production v28. The original HTTP 500 remains recorded as a transient provider failure, not an unresolved production crash.

## Known non-crash limitations

- The v28 P0 Focus View now has fresh localhost desktop and 390×844 rendered QA. Provider OAuth and real-message mutation paths were intentionally not exercised.
- The repository is public. Runtime secrets, sessions, message content, and private QA captures must never be committed.
- The energy/reminder preference slice is now immutable production v29. Scheduled reminder delivery, low-pressure reply templates, send-later, and onboarding remain later P1 phases; this is incomplete scope, not a production crash.
- The v31 send-later backend plus v32 Mini App controls are locally verified candidates only. Real Telegram WebView proof, immutable release helper, guarded deployment, and controlled post-deploy acceptance are intentionally pending; production v29 cannot schedule sends yet.
- The v33 onboarding functionality is now integrated into v36 and has passing desktop/mobile rendered QA. Real Telegram WebView proof is still required before any release helper or deployment. Historical release-pin fixtures remain immutable rollback evidence and are intentionally excluded from the ordinary mutable-candidate matrix.
- The v34 reminder-delivery candidate is local and undeployed. Its ordinary functional matrix passes 354/354 and the independent review is clear, but real Telegram delivery/callback acceptance is intentionally pending until a guarded combined release; this is a release gate, not a production outage.
- Codex Security scanning remains intentionally frozen after repeated policy-filter interruptions. The open v27 browser tab is static and must not be interpreted as a running or hung security process. Functional tests and positive expected-denial isolation checks continue without attack-path or exploit-style scans.
- v35 closes the previously documented soft-to-digest product gap locally. Durable retirement and retry recovery are covered by functional tests, but real Telegram WebView/delivery acceptance and a guarded release remain pending; production v29 is unchanged.
- Product v36 now has a fail-closed immutable-v30 staging helper and a clean live read-only preflight. This is not a production outage: stable production remains v29 until a fresh unique staging URL passes real Telegram WebView acceptance. If either Google create request has an ambiguous outcome, the durable release journal deliberately blocks replay and requires read-only reconciliation instead of another POST.

## 2026-07-18 — v30 staging deployment create HTTP 400

- Phase: first and only guarded product-v36 `-StageOnly` run after commit `b70f1057e85383a513a3d78df99cee48b5bfacea` was pushed and live preflight passed.
- Result: immutable v30 was created and its five exact hashes were verified. Staging deployment creation returned definite HTTP 400; stable production stayed v29 and no retry was issued.
- Read-only preserved state: stable v29; HEAD product v36; immutable v30 product v36; no matching staging deployment; journal `staging_create_reserved`.
- Root cause: `deployments.create` requires a top-level deployment configuration, while the helper used the nested update request shape. This is a helper defect, not an Apps Script runtime or Gmail production crash.
- Recovery: the body is corrected and tested. A one-time evidence file binds the captured HTTP 400 to the exact script, v30 hash, helper commit, reservation timestamp, and malformed request shape; acknowledgement fails without that evidence. After a fresh preserved-state check, make at most one corrected staging-create attempt. Never create another immutable version.

## 2026-07-18 — resolved v36 onboarding isolation defect

- Phase: standalone system-Chrome rendered QA of the integrated v30–v35 candidate at desktop and 390×844 mobile sizes.
- Runtime defect: `setOnboardingIsolation(true)` made the whole `#app` element inert even though the onboarding layer was its descendant. Inert propagated into the visible dialog, so onboarding buttons could not receive pointer or keyboard interaction.
- Resolution: keep `#app` active, make only its non-onboarding children inert, and restore every target's previous inert state on close. A source contract now rejects direct inerting of the app shell.
- Verification: MailApp contracts 73/73, ordinary functional matrix 360/360, and rendered Chrome checks 14/14 pass. The browser console contains no application errors; localhost-only Telegram SDK version warnings are expected.
- Preserved state: production v29 and all real Gmail, Telegram, OAuth, provider, browser-account, and phone state remained unchanged. Remaining gate is controlled real Telegram WebView proof followed by a separately pinned release helper and guarded deployment.

## 2026-07-18 — resolved v36 mobile Support reachability defect

- Phase: first Apps Script HEAD/`dev` run inside the real Telegram WebView on the connected Huawei phone.
- Runtime defect: the account panel rendered `Підтримка` and `Правила` in an unbounded inline toolbar. At phone width, `Правила` remained visible while `Підтримка` had no reachable on-screen geometry, blocking voluntary onboarding re-entry.
- Resolution: the Focus settings title owns a full row and its toolbar is a two-column `minmax(0, 1fr)` grid; both buttons receive bounded full-width cells.
- Verification before staging refresh: source/staging contracts 75/75, ordinary functional plus staging matrix 362/362, and rendered desktop/mobile checks 17/17. A second real WebView pass against a unique immutable staging deployment remains the immediate release gate.
- No Gmail message/draft, stored preference, OAuth grant, or provider object was mutated while finding this defect. Production `/exec` remained immutable v29.

## 2026-07-18 — v36 `/dev` WebView cache limitation

- Phase: second real Telegram WebView pass after updating Apps Script HEAD with the mobile Support fix.
- Limitation: Telegram reused the existing `/dev` document for the unchanged URL. Adding either `?v=...` or `#v=...` is incompatible with this mailbox bridge because those values enter its private-key launch route and are rejected as `Недійсний приватний ключ кнопки.`
- One non-destructive process-restart alternative was attempted but blocked by host policy before execution. It was not retried; app data/cache were not cleared.
- Recovery: owner chat menu button was restored exactly to its prior GitHub Pages URL, Apps Script HEAD was rolled back and read back as exact v29, and stable deployment remained immutable v29.
- Next safe action: create/adopt one exact immutable candidate version and a separate uniquely addressed staging deployment, test that URL in Telegram WebView, then promote the same immutable version only if acceptance passes.

## 2026-07-18 — v30 staging account-identity compatibility blocker

- Phase: real Telegram WebView acceptance of immutable v30 through a temporary top-level staging bridge.
- Initial false signal: bare staging `/exec` returned `Недійсний приватний ключ кнопки.` This was a test-route error, not a product failure. The canonical mailbox route rendered correctly, and the top-level bridge preserved Telegram `initData` as designed.
- Runtime blocker: the account avatar identified `tarasevych.pavlo@gmail.com`, Gmail folders and labels were readable, and the exact Telegram owner zone loaded, but the account panel simultaneously said that no Gmail accounts were connected. `Підтримка` was visible and focusable yet could not open onboarding; the adjacent read-only `Правила` action worked.
- Root cause: `mailboxBootstrap_` returned the active primary profile without `account.id`; its exact opaque identity existed only as `session.connectionId`. When the multi-account list was empty, the frontend fallback attempted to derive an ID from the email, which `safeId` correctly rejected. Onboarding then failed closed because `state.account.id` was empty.
- Local resolution: the server now emits the authorized session connection ID on the primary account DTO, and the client independently falls back to `bootstrap.session.connectionId`. Targeted tests pass 212/212 and the ordinary functional matrix passes 360/360.
- Preserved state: stable production is still v29. Immutable v30 and its staging deployment remain unpromoted evidence; no random Gmail mutation, OAuth consent, or preference write occurred. The temporary bridge and Telegram test messages were removed, and the production owner menu was verified exactly restored.
- Next safe action: commit and push the v37 compatibility fix, prepare a v31/product-v37 release helper that cannot promote v30, stage v31 once, and repeat the non-mutating phone test. Promotion remains forbidden until the account card and onboarding both pass on the same immutable version.
- Update: the compatibility fix is preserved at `45262d02df023bd08c5b410dd30fe1b5e378c705`. The v31/product-v37 helper now passes its static contract and GET-only live preflight with stable v29, prior-v30 HEAD, no v31, and no v37 staging. The blocker remains open until the same immutable v31 passes real-phone onboarding.

## 2026-07-18 — v31 staging HEAD upload HTTP 429

- Phase: first and only guarded v31/product-v37 `-StageOnly` attempt after helper commit `bb41e6e883fa8c95392ebfe56b3aa49febeecbe8` was pushed and a fresh GET-only preflight passed.
- Error: Google Apps Script API returned HTTP 429 `RESOURCE_EXHAUSTED` during the initial HEAD upload path.
- Reconciliation: stable remains v29; HEAD remains exact immutable-v30 product-v36 source; immutable v31 is absent; product-v37 staging is absent; v31 journal is absent. No release create or stable promotion was accepted.
- Recovery hardening: the helper no longer sends a blind rollback PUT after an upload error. It reads HEAD, accepts an exact prior state without writing, rolls back only an exact candidate state, and leaves an unreadable/unknown state unresolved for later GET-only reconciliation.
- Decision: do not repeat the provider write in this phase. Continue only isolated local work and retry at most once after a later clean preflight and quota cooldown. Production is healthy and unchanged.

## 2026-07-18 — immutable v31 account-panel controls buried by dynamic Gmail metadata

- Phase: controlled real-phone Telegram WebView acceptance of immutable v31/product v37 after exact staging verification. Stable production remained v29.
- Symptom: `Підтримка` and `Правила` existed and were enabled, but appeared after the complete dynamic account/access/Gmail-label content. On the real mailbox, ten repeated scroll gestures still remained inside the label list; the controls were not practically reachable.
- Scope: presentation/order defect only. The exact Gmail account identity was correct and no Gmail, preference, OAuth, role, attachment, provider, or Telegram-zone mutation occurred.
- Cleanup: the owner menu was restored to its exact production text/URL, the temporary GitHub Pages bridge was deleted and verified HTTP 404, and the phone exited the staging surface.
- Fix: product v38 places the support/rules section before every dynamic list. Source and rendered Chrome contracts prove zero-scroll visibility even with 80 synthetic labels; Support opens the exact three-screen onboarding.
- Release decision: immutable v31 is evidence only and must not be promoted. A separately pinned product-v38 immutable/staging release is required for the next phone acceptance.
- Resolution: exact immutable v32/product v38 passed the repeated real-phone acceptance. Both controls are visible without scrolling and Support opens onboarding for the exact Gmail connection. The temporary bridge and owner-menu override were fully removed/restored. Promotion remains conditional only on the final exact GET-only release reconciliation.
- Closed: final reconciliation passed, stable moved directly from v29 to v32, production phone acceptance passed, and the isolated staging deployment was removed. Final state is stable v32 with no staging deployment; v31 was never promoted.

## 2026-07-18 — resolved v32 rendered-QA defects

- Phase: local desktop and 390x844 Chrome preview of the send-later controls.
- Runtime defect: the preset handler referenced a nonexistent `formatFullDate`, producing a `ReferenceError` after the date input was populated. It was replaced with the existing tested Ukrainian date-time formatter and the post-fix browser run produced no new application error.
- Responsive defect: the panel was positioned relative to a narrow mobile grid cell and extended 125 px beyond the left viewport. Mobile CSS now anchors it to the viewport with 12 px side margins; measured bounds are left 12 px and right 378 px in a 390 px viewport.
- Preserved state: both defects existed only in the local v32 candidate. Production v29, Gmail, Telegram, OAuth, provider data, and the connected phone were unchanged.
- Remaining release gate: obtain real Telegram WebView proof without changing a real message, then create a separate immutable release helper. This limitation is not a production incident.
- v30 reply-starter bitmap capture did not include the fixed compose overlay although DOM state proved the dialog open and interactive. No application console error occurred; only localhost Telegram SDK compatibility warnings were present. Treat the capture as unusable evidence and repeat visual proof on a real Telegram WebView or another supported capture surface before release.

## 2026-07-18 — production Mini App refresh-family registry full

- Symptom: `Досягнуто ліміт активних сеансів пошти` while opening Telegram Mini App in parallel.
- Root cause: every fresh launch allocated a 24-hour refresh family in a global 24-row Script Property; WebView close did not revoke it, and the error incorrectly advised closing old windows.
- Live scope: 23 owner families plus one other user. No family had expired at inspection time.
- Immediate resolution: explicit owner-only cleanup retained three newest owner sessions and preserved the other user, leaving 20 free slots. Temporary HEAD code was removed and exact immutable v32 restored; stable production never changed.
- Preventive fix: a two-minute one-use recovery bearer permits only the same Telegram user to explicitly retire their older families. Cross-user eviction and silent active eviction remain forbidden.
- Status: immediate incident resolved; permanent hotfix tested locally and awaiting an exact product-v38 release lane.
# 2026-07-18 — repeated Mini App session-capacity failure after v33

- Symptom: a parallel manual Telegram launch showed `Не вдалося відкрити пошту` and only `Перезапустити Mini App`.
- Cause: refresh families survive WebView closure for 24 hours; the global 24-family registry can therefore represent abandoned launches rather than 24 live windows. The fallback page also lacked the v33 recovery token.
- Resolution candidate: v34 automatically compacts only the launching Telegram user's oldest families, keeps six parallel families, and preserves all foreign-user families.
- Gmail, OAuth, Telegram cards, account zones, and messages were not touched during diagnosis or local testing.
