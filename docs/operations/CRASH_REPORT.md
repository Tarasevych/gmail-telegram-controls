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

## 2026-07-18 — resolved v32 rendered-QA defects

- Phase: local desktop and 390x844 Chrome preview of the send-later controls.
- Runtime defect: the preset handler referenced a nonexistent `formatFullDate`, producing a `ReferenceError` after the date input was populated. It was replaced with the existing tested Ukrainian date-time formatter and the post-fix browser run produced no new application error.
- Responsive defect: the panel was positioned relative to a narrow mobile grid cell and extended 125 px beyond the left viewport. Mobile CSS now anchors it to the viewport with 12 px side margins; measured bounds are left 12 px and right 378 px in a 390 px viewport.
- Preserved state: both defects existed only in the local v32 candidate. Production v29, Gmail, Telegram, OAuth, provider data, and the connected phone were unchanged.
- Remaining release gate: obtain real Telegram WebView proof without changing a real message, then create a separate immutable release helper. This limitation is not a production incident.
- v30 reply-starter bitmap capture did not include the fixed compose overlay although DOM state proved the dialog open and interactive. No application console error occurred; only localhost Telegram SDK compatibility warnings were present. Treat the capture as unusable evidence and repeat visual proof on a real Telegram WebView or another supported capture surface before release.
