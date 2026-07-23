# VR-027 — Adjustable desktop panes

- **Overall status:** PARTIAL
- **Date:** 2026-07-23
- **Source request:** `REQ-0035`
- **Verification framework:** `REQ-0004`
- **Workstream:** V3 `E-02`
- **Product task:** `B1-36`
- **Issue:** `GT-056`
- **Українське дзеркало:** [Український звіт](../../../../uk/verification-reports/reports/VR-027/README.md)

## Atomic claim

Before this increment, the desktop grid used fixed `--rail-w` and `--list-w` values. The current source exposed no resize handles, collapse-to-icons behavior, or account-scoped width restoration after restart.

## Implementation

One desktop-pane layout controller was added:

- two desktop-only `role="separator"` controls;
- pointer drag plus `ArrowLeft`, `ArrowRight`, `Home`, `End`, `Space`, and `Enter`;
- deterministic min/max bounds that preserve a minimum reader width;
- sidebar collapse to icons and restoration of the prior expanded width;
- `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, `aria-valuetext`, visible focus, and a labelled collapse button;
- persistence through the existing `p0CurrentNamespace`, `p0ReadRecord`, and `p0WriteRecord`;
- a bounded memory-only fallback when scoped IndexedDB is unavailable.

The contour does not use `localStorage`/`sessionStorage`, create a parallel account model, or start an RPC, reload, OAuth flow, or Gmail mutation. Mobile drawer behavior is unchanged.

## Evidence

The focused Mail App suite passed `90/90` after implementation. The behavioral contract verifies bounds, collapse/restore, keyboard semantics, the ARIA contract, account-scoped persistence helpers, the mobile breakpoint, and the absence of unsafe storage/RPC/reload behavior.

The complete Apps Script suite plus bilingual, knowledge-hub, verification-report, release-state, diff, and sensitive-pattern gates are mandatory before publication.

## Verification boundary

The source implementation and focused behavioral contract are evidenced. Native Telegram Desktop/WebView pointer drag, keyboard navigation, visual layout, and IndexedDB restoration after restart remain `UNVERIFIED`; the overall status is therefore `PARTIAL`.

Production v65, staging, immutable history, Telegram menu, OAuth, and Gmail are unchanged by this increment.
