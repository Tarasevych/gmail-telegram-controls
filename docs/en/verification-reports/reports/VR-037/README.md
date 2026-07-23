# VR-037 — F-03 Computed typography and narrow account-label regression

Verification framework: REQ-0004

- **Status:** `PARTIAL`
- **Date:** 2026-07-23
- **Request:** `REQ-0035`
- **Related records:** `GT-032`, `B1-25`, `RCA-018`
- **Українське дзеркало:** [VR-037](../../../../uk/verification-reports/reports/VR-037/README.md)

## Boundary and method

The contour used the cumulative Versie 1 source at the exact accepted F-02 baseline and a local synthetic preview. It read rendered DOM geometry and computed CSS on desktop and 390 px mobile viewports, visually inspected screenshots, and exercised a synthetic Ukrainian/English/Arabic compose sample. It did not open or mutate a Gmail message or label, run OAuth, change Telegram runtime state, create staging, or publish account identifiers. Screenshots remain owner-private because the preview displays account identifiers; this public report contains content-free measurements only.

## Root cause

The original Gmail-compatible typography correction fixed the primary list and reader scale but did not reach late legacy selectors. Computed styles still returned 10 px for compose account/save status and 11 px for settings metadata, account controls, and identity details. Account-card names and addresses retained `nowrap` plus hidden overflow on a narrow viewport. This was a selector-coverage regression, not a missing root font variable or blanket-bold rule.

## Computed evidence before correction

| Surface | Desktop/mobile readback | Status |
|---|---|---|
| Body/app shell | 14 px, weight 400, about 20 px line height | `VERIFIED` |
| Compose editor | 14 px, weight 400, 21 px line height, local reading stack | `VERIFIED` |
| Compose account | 10 px, about 14.3 px line height | `VERIFIED` defect |
| Compose save status | 10 px, 12.5 px line height | `VERIFIED` defect |
| Settings metadata | 11 px, about 15.4–15.95 px line height | `VERIFIED` defect |
| Account controls/details | 11 px; narrow identity rows used hidden nowrap overflow | `VERIFIED` defect |
| Remote font dependency | none | `VERIFIED` |
| Blanket bold | absent; body 400, ordinary navigation 500, headings scoped | `VERIFIED` |

The toolbar intentionally uses bounded horizontal scrolling for its optional formatting controls; that condition is not classified as clipped text. The narrow topbar email uses the existing explicit full-address disclosure and is not the account-card defect corrected here.

## Source correction

- Compose account and save status use a 12 px/16 px secondary scale.
- Settings notes and metadata use 12 px/18 px.
- Account details, status, and compact controls use 12 px/16 px.
- Account names and addresses can wrap with `overflow-wrap:anywhere`; hidden nowrap clipping is removed.
- The 14 px/1.5 reading and compose rhythm remains unchanged.
- The local-first UI/text stacks remain unchanged and no external font request is added.
- Header flex children receive `min-width:0` so larger metadata can shrink or wrap without forcing horizontal page overflow.

## Atomic claims

| Claim | Category | Status | Origin |
|---|---|---|---|
| The late cascade no longer leaves compose metadata at 10 px | Typography | `VERIFIED` | executable source contract plus computed-style correction |
| Settings/account secondary text has a minimum 12 px source scale | Typography | `VERIFIED` | executable source contract |
| Narrow account names and addresses wrap instead of using hidden nowrap clipping | Responsive UX | `VERIFIED` | source contract; mobile computed-style recheck |
| Ukrainian, English, and Arabic synthetic text remains visible in the compose editor | Glyph coverage | `VERIFIED` | local mobile visual inspection |
| Production renders the corrected cascade at the same browser scale as Gmail | Runtime | `UNVERIFIED` | no staging/production change in this contour |
| A populated real-message list and reader have no downstream typography regression | Runtime | `UNVERIFIED` | fail-closed synthetic account mismatch prevented a safe populated fixture |
| Native browser zoom behavior is accepted | Accessibility | `UNVERIFIED` | browser-control binding exposed viewport override but no browser-zoom control |

## Checks and safety

- Focused typography contract and the full Apps Script suite are required to pass before publication.
- Desktop, 390 px mobile, and an effective narrow responsive viewport are checked for page overflow and clipped visible text.
- Synthetic screenshots were visually inspected but not committed because they include account identifiers.
- Production v65, staging `0`, immutable history, Gmail, OAuth, and Telegram runtime state remain unchanged.

## Conclusion

The source-level F-03 regression is corrected and locally evidenced. Overall status remains `PARTIAL` until current-production same-scale comparison, populated real-thread/list acceptance, and native zoom evidence pass after the shared release blocker clears. This contour does not create an immutable candidate.
