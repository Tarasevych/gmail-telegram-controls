# VR-005 — Factual verification of Gmail label management

[Українське дзеркало](../../../../uk/verification-reports/reports/VR-005/README.md)

- **Date:** 2026-07-22
- **Verification framework:** REQ-0004
- **Product:** Versie 1
- **Request:** [REQ-0026](https://github.com/Tarasevych/gmail-telegram-controls/blob/%D0%97%D0%B0%D0%BF%D0%B8%D1%82%D0%B8/requests/2026-07-22/REQ-0026-unified-gmail-label-management.md)
- **Issue:** [GT-026](../../../ISSUES.md)
- **Roadmap:** B1-20
- **Code evidence:** [4ac0b90fbdbe7c9032789da1734bb986795fab91](https://github.com/Tarasevych/gmail-telegram-controls/commit/4ac0b90fbdbe7c9032789da1734bb986795fab91)
- **Overall status:** PARTIAL

## Atomic claims

| Claim | Category | Status | Origin / evidence | Dependencies or conflicts | Sensitivity |
|---|---|---|---|---|---|
| A Gmail label has type `SYSTEM` or `USER`; SYSTEM labels cannot be arbitrarily created, modified, or deleted through label management. | API | VERIFIED | [Gmail API label guide](https://developers.google.com/workspace/gmail/api/guides/labels), [`users.labels` resource](https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.labels) | None | Public |
| The Gmail API label resource has no `parent` field; this project represents nesting with a normalized full name such as `Parent/Child`. | API | VERIFIED | [`users.labels` resource](https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.labels), [Gmail Help](https://support.google.com/mail/answer/118708) | Gmail UI supports nested labels; no separate parent API exists | Public |
| The production baseline had several permanent actions in a narrow profile grid and no create/manage controls in the sidebar. | UI baseline | VERIFIED | Mutation-free visual inspection before changes | No live labels or mail were changed | Owner-only runtime |
| Both label surfaces now use `renderGmailLabelSurfaces()` and reject a late response for another Gmail connection. | State / isolation | VERIFIED | [MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/4ac0b90fbdbe7c9032789da1734bb986795fab91/apps-script/MailApp.html), automated contracts | Production deployment is required for live proof | Public source |
| Create/rename normalize the full path; delete preserves owner/admin, expected-version, and exact-confirmation guards; provider 403 becomes a content-free permission error. | Backend | VERIFIED | [MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/4ac0b90fbdbe7c9032789da1734bb986795fab91/apps-script/MailClient.gs), [tests](https://github.com/Tarasevych/gmail-telegram-controls/blob/4ac0b90fbdbe7c9032789da1734bb986795fab91/apps-script/tests/mail_client.test.js) | Gmail API permissions must remain valid | Public source |
| Forty-eight synthetic labels at 390×760 and 1280×820 have bounded scrolling, separate 38 px actions, and no overlap with controls or adjacent rows. | Visual acceptance | VERIFIED | Playwright + system Chrome, content-free stress fixture | Captures containing runtime identifiers were not published | Local evidence |
| The candidate is ready for a new immutable release. | Release | BLOCKED | Full suite `447/448`; the exact v57 source-hash gate correctly rejects the changed bundle | Separate owner authorization is required | Public summary |
| The behavior works in production. | Production | UNVERIFIED | No deployment was performed | Staging and production acceptance are required | Owner-only runtime |

## Root cause

1. The profile manager used an action-heavy grid that left too little width for long names.
2. The sidebar rendered navigation only and had no create/manage affordances.
3. The sidebar and profile manager consumed different state slices, so atomic refresh was not guaranteed.
4. Acceptance exposed two additional defects: the `+` click bubbled into the global close handler, and the constrained CSS Grid shrank implicit rows to 44 px, allowing wrapped content to paint into adjacent rows.

## Implemented behavior

- One shared renderer synchronously updates the sidebar and profile manager.
- `+` opens the create form; every USER label has one accessible pencil action with `aria-label` and `aria-controls`.
- Secondary rename/delete actions use progressive disclosure; delete explains that messages are not deleted.
- SYSTEM labels are visually separated and receive no forbidden controls.
- Full-path names wrap, expose a title, use bounded vertical scrolling, and never use marquee or flashing effects.
- Loading, empty, success, permission-error, and retry states are inline; account switching clears transient label UI state.

## Verification

- `node --test apps-script/tests/mail_app_contract.test.js`: VERIFIED, `84/84` after the final UI fix.
- `node --test apps-script/tests/*.test.js`: PARTIAL, `447/448`; the only failure is the expected immutable v57 hash mismatch.
- `git diff --check`: VERIFIED; only informational Windows CRLF warnings.
- Responsive visual acceptance: VERIFIED at 390×760 and 1280×820, 48 labels, horizontal overlap `false`, vertical overlap `false`, bounded scrolling `true`, create-input focus `true`.
- Build/lint: UNVERIFIED as separate commands because the repository has no root or `apps-script/package.json`; inline-script syntax is covered by the Node suite.

## Release boundary and residual risks

- Immutable v57 was not rewritten.
- No new immutable candidate, staging deployment, production promotion, or live label mutation was performed: REQ-0026 has `Next Versie authorization: no`.
- One blocker remains: separate explicit owner authorization for the next cumulative immutable candidate and a controlled staging/rollback gate.
- Until production proof exists, GT-026 remains PARTIAL and the production claim remains UNVERIFIED.
