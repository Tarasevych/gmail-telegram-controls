# VR-038 — F-04 Trustworthy automated analysis and one real next action

Verification framework: REQ-0004

- **Status:** `PARTIAL`
- **Date:** 2026-07-23
- **Request:** `REQ-0035`
- **Related records:** `GT-065`, `B1-45`, `RCA-019`
- **Українське дзеркало:** [VR-038](../../../../uk/verification-reports/reports/VR-038/README.md)

## Boundary and primary sources

This source-only contour uses the cumulative Versie 1 baseline. It relies on the existing local heuristic and [Apps Script Language service](https://developers.google.com/apps-script/reference/language). The current [Gmail API REST reference](https://developers.google.com/workspace/gmail/api/reference/rest) exposes mail resources but no Gmail Gemini summary endpoint used by this application. No external AI provider, new OAuth scope, Gmail mutation, Telegram runtime change, staging candidate, or production promotion is introduced.

## Confirmed root cause

The prior reader always rendered automated analysis prominently and did not offer an independent per-account off switch. Its boilerplate rule rejected all sentences shorter than eight characters but failed to reject common mobile-client signatures. Normalization could retain dates, amounts, actions, or urgency even when no exact source fragment supported the claim. The proposed next action was also placed directly into the persisted-action input, obscuring the boundary between generated suggestion and user decision.

## Source correction

- `analysisMode` is stored in the existing account-scoped attention preference record with `collapsed` as the default and explicit `expanded` or `hidden` choices.
- The analysis uses an accessible disclosure and remains secondary to the original message.
- Signature-only, empty, and attachment-only text returns `Немає змістовного підсумку` without invoking machine translation.
- Short substantive replies are no longer discarded by a length-only threshold.
- Actions, dates, sums, and urgency survive normalization only when an exact bounded source fragment supports them.
- A generated next action is visibly a proposal and enters the persisted field only after explicit acceptance.
- Persisted triage has an explicit accessible undo and remains isolated to the exact Gmail connection.

## Atomic claims

| Claim | Category | Status | Evidence |
|---|---|---|---|
| Automated analysis is collapsed by default and can be hidden per Gmail connection | UX/state | `VERIFIED` | server/client contract tests |
| Trivial and known mobile-signature content produces no substantive summary and no translation call | Analysis/privacy | `VERIFIED` | executable synthetic corpus |
| Short meaningful content is not rejected solely because of length | Analysis | `VERIFIED` | executable synthetic corpus |
| Action, date, amount, and risk claims require exact source-fragment support | Grounding | `VERIFIED` | normalization contract plus existing whole-thread evidence test |
| Generated next action is distinct from a persisted user decision | UX/state | `VERIFIED` | UI source contract |
| Triage undo is explicit, accessible, persisted, and account-scoped | Accessibility/state | `VERIFIED` | UI/server contracts |
| Native populated-reader behavior is accepted in Telegram WebView | Runtime | `UNVERIFIED` | shared quota blocker prevents safe staging |
| Current production exhibits the corrected behavior | Production | `UNVERIFIED` | no release-state change in this contour |

## Safety and limitations

Tests use synthetic content and `.invalid`-style identities where applicable. They do not read or mutate real mail. Machine translation remains the existing Apps Script service and can fail closed to source text. The report does not claim semantic equivalence to a generative model, production behavior, or native WebView acceptance.

## Conclusion

The confirmed source defects are corrected within the existing architecture and evidence boundary. Status remains `PARTIAL` until native populated-reader and production acceptance can run after the shared Apps Script quota blocker clears.
