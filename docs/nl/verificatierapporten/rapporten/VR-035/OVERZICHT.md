# VR-035 — F-01 reader fidelity, RTL, and remote-image privacy

Verification framework: REQ-0004

- **Status:** `PARTIAL`
- **Date:** 2026-07-23
- **Request:** `REQ-0035`
- **Related records:** `GT-063`, `B1-43`, `RCA-016`
- **Українське дзеркало:** [VR-035](../../../../uk/verification-reports/reports/VR-035/README.md)

## Root cause

The server sanitizer retained text, bounded inline styles, tables, and attachment-token images but discarded valid `dir/lang`. The secondary client sanitizer removed active content yet had a broader fallback for `https:` images and a CSP of `img-src https: data: blob:`. The normal DTO path already removed remote images server-side, but the independent defense-in-depth boundary was incomplete.

## Atomic claims

| Claim | Category | Status | Origin |
|---|---|---|---|
| The sanitizer preserves only `dir=ltr|rtl|auto` and bounded BCP47-like `lang` | Fidelity/security | `VERIFIED` | synthetic sanitizer corpus |
| Newsletter, invoice/table, RTL/Unicode, quote/signature, and malformed HTML retain readable allowed content without scripts/events | Fidelity | `VERIFIED` | focused F-01 corpus |
| The reader iframe removes every image without an authenticated attachment token | Privacy | `VERIFIED` | executable source contract |
| CSP permits mail images only as short-lived `blob:` values after exact-token and MIME validation | Security | `VERIFIED` | source contract and the existing CID hydration path |
| Plain fallback and sandboxed HTML use content-derived direction and logical quote styling | Accessibility | `VERIFIED` | focused source contract |
| MIME alternative/plain fallback, CID boundary, quoted-thread boundary, and scroll/focus anchors remain pinned | Regression | `VERIFIED` | focused F-01 source contracts |
| Representative real-mail fixtures passed Telegram Desktop/mobile visual acceptance | Runtime | `UNVERIFIED` | shared Apps Script URL Fetch quota; staging `0` |

## Checks

- Focused F-01 contracts: `6/6`.
- Full Apps Script suite: `629/629`.
- Synthetic fixtures contain no real addresses, messages, tokens, or identifiers.
- Production v65, staging `0`, immutable v70, Gmail, OAuth, and Telegram runtime state were unchanged.

## Conclusion and boundaries

Source-level reader fidelity and the independent remote-image boundary are evidenced. Overall status is `PARTIAL` because native WebView rendering, dark/light visual comparison, and owner-approved real-fixture acceptance have not run. This source contour did not create a new immutable candidate.
