# VR-039 — F-05 Honest and stable reading progress

Verification framework: REQ-0004

- **Status:** `PARTIAL`
- **Date:** 2026-07-23
- **Request:** `REQ-0035`
- **Related records:** `GT-050`, `B1-30`, `RCA-020`
- **Українське дзеркало:** [VR-039](../../../../uk/verification-reports/reports/VR-039/README.md)

## Boundary

This source-only contour extends the cumulative Versie 1 reader state. It introduces no parallel state model, timer-derived progress, external API, OAuth scope, Gmail mutation, Telegram runtime change, staging candidate, or production promotion.

## Confirmed root cause

The reader already preserved a stable content anchor during rerender and delayed layout changes, but its progress edge cases remained ambiguous. A non-scrollable short message produced `100%`; the copy said content was read even though the value represented scroll position; a `0%` resume control could remain visible; manual resume always used smooth motion; and a delayed callback retained no exact thread or Gmail-connection identity.

## Source correction

- A normalized geometry snapshot declares progress measurable only when the reader has real scrollable range.
- The visible and accessible copy says that the value is scroll position in the open conversation, not a comprehension score.
- The compact resume control is omitted when there is neither a saved draft nor a meaningful position.
- Delayed persistence captures and rechecks the exact thread and Gmail connection before writing.
- Exact local anchors remain the primary same-device restoration path; the percentage remains a bounded fallback.
- Resize and image-load restoration never writes progress and does not create an auto-scroll loop.
- User-initiated resume honours `prefers-reduced-motion`.

## Atomic claims

| Claim | Category | Status | Evidence |
|---|---|---|---|
| Long-content progress is calculated from actual scroll geometry | State | `VERIFIED` | executable synthetic geometry test |
| Non-scrollable short content does not claim `100%` read | Semantics | `VERIFIED` | executable short-content test |
| A delayed save cannot cross thread or Gmail-connection identity | Isolation | `VERIFIED` | exact source contract |
| Background resize and image-load restoration do not save progress | Stability | `VERIFIED` | reader layout contract |
| The resume control explains scroll-position semantics and is omitted at an empty position | UX/accessibility | `VERIFIED` | source contract |
| User resume honours reduced-motion preference | Accessibility | `VERIFIED` | source contract |
| Real long/short/quoted/collapsed messages pass in native Telegram Desktop and mobile | Runtime | `UNVERIFIED` | shared quota blocker prevents safe cumulative staging |
| Current production exhibits the corrected behavior | Production | `UNVERIFIED` | no release-state change in this contour |

## Validation

Focused reader contracts pass `12/12`; the complete Apps Script suite passes `646/646`; the diff check and paired documentation validators pass. Tests use synthetic geometry and do not read or mutate real mail.

## Conclusion

The confirmed source defects are corrected without replacing the existing reader state or release line. Status remains `PARTIAL` until native return-position, real delayed-layout, mobile/desktop, and production acceptance can run after the shared Apps Script blocker clears.
