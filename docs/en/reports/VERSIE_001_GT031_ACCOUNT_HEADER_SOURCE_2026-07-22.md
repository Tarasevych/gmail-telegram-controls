# Versie 1 GT-031 active-account header source correction

[Українською](../../uk/reports/VERSIE_001_GT031_ACCOUNT_HEADER_SOURCE_2026-07-22.md)

- **Date:** 2026-07-22
- **Status:** PARTIAL
- **Source request:** `REQ-0033`
- **Atomic verification:** [VR-012](../verification-reports/reports/VR-012/README.md)

## Observed defect

Native v63 acceptance showed that a controlled alternate account could lose the end of its email in the narrow active-context header. The dynamic name, stable account selection and profile image behavior otherwise remained correct.

## Root cause

The desktop subtitle already allowed wrapping, but the narrow fixed-height topbar reduced it to a cropped line. The only complete single-account value remained in announcement/title metadata; unlike shared mode, there was no visible tappable disclosure for touch users.

## Source correction

- reuse the existing `mailContextDetails` and account map for single and shared contexts;
- keep wider-view wrapping with explicit normal whitespace and word breaking;
- use a compact one-line subtitle plus visible `Адреса повністю` disclosure on narrow views;
- preserve the full name/email mapping inside a native `<details>` surface;
- derive all values from the existing stable connection-ID model;
- preserve keyboard operation, focus outline, ARIA announcement and hidden-state precedence.

No Gmail, OAuth, account-selection or shared-membership contract changed.

## Test evidence

- focused `mail_app_contract.test.js`: `88/88`;
- full Apps Script suite: `501/501`;
- the first full run correctly failed only because the immutable-v63 test still compared current working source to its frozen hash;
- the v63 test was aligned with the existing historical-v62 pattern: it still proves every frozen helper hash, but no longer requires future source to equal immutable v63;
- immutable v63 helper, deployment, source pins and rollback target were not edited.

## Release boundary

Production and HEAD runtime remain immutable v63 with staging `0`. The source correction is not presented as live. It requires a normal source PR, a new cumulative immutable v64 helper, owner-only staging visual acceptance, then production promotion only if that acceptance passes.

## Required live acceptance

- narrow native Telegram Desktop view shows a visible full-address disclosure;
- opening it exposes the complete selected email without overlap;
- switching among existing accounts updates both the visible line and disclosure without OAuth;
- shared mode still shows every name/address pair;
- loading, missing-name/photo and error states remain readable;
- no full-page reload or account-zone leak occurs.
