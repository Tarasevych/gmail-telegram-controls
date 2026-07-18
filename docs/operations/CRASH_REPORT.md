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

## 2026-07-18 — resolved v32 rendered-QA defects

- Phase: local desktop and 390x844 Chrome preview of the send-later controls.
- Runtime defect: the preset handler referenced a nonexistent `formatFullDate`, producing a `ReferenceError` after the date input was populated. It was replaced with the existing tested Ukrainian date-time formatter and the post-fix browser run produced no new application error.
- Responsive defect: the panel was positioned relative to a narrow mobile grid cell and extended 125 px beyond the left viewport. Mobile CSS now anchors it to the viewport with 12 px side margins; measured bounds are left 12 px and right 378 px in a 390 px viewport.
- Preserved state: both defects existed only in the local v32 candidate. Production v29, Gmail, Telegram, OAuth, provider data, and the connected phone were unchanged.
- Remaining release gate: obtain real Telegram WebView proof without changing a real message, then create a separate immutable release helper. This limitation is not a production incident.
