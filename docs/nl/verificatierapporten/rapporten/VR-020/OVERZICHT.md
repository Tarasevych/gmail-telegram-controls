# VR-020 — Reader scroll and focus stability

[Українською](../../../../uk/verification-reports/reports/VR-020/README.md)

- **Date:** 2026-07-23
- **Overall status:** PARTIAL
- **Source request:** `REQ-0035`
- **Verification framework:** `REQ-0004`
- **Product task:** `B1-30` / V3 `A-03`
- **Issue:** `GT-050`
- **Source commit:** `1d7c6c1`
- **Release boundary:** source only; the inherited recorded state remains Apps Script production/HEAD v65, staging `0`, and immutable v68 historical

## Confirmed root cause

`renderThread()` cleared and rebuilt the reader root for every render request. Background attention, reconciliation, draft, attachment, or layout updates could therefore replace the active DOM. The previous raw `scrollTop` restore used competing asynchronous paths and had no stable content anchor, so layout growth could move the reading position and replacement could discard keyboard focus.

## Implemented source correction

1. A deterministic reader signature skips root replacement when visible thread state is unchanged.
2. Before a necessary replacement, the client captures the active thread/message/body anchor, its viewport offset, the bottom-pinned state, and a memory-only focus identity.
3. A generation-guarded restore applies one current position and ignores stale restore work.
4. `ResizeObserver` and image-load listeners preserve the anchor across delayed layout growth.
5. Programmatic restoration does not schedule reading-progress updates, while user Home, End, Page Up, and Page Down behavior remains available.
6. Persisted view state stores scroll anchors per account/thread; focus identity is intentionally memory-only.

## Atomic claims

| ID | Claim | Status | Evidence |
|---|---|---|---|
| VR-020-01 | Unconditional reader-root replacement and competing raw-scroll restoration were present in the source. | VERIFIED | source inspection |
| VR-020-02 | Identical reader state now skips root replacement. | VERIFIED | focused contract |
| VR-020-03 | Necessary rendering preserves stable content anchors, bottom pinning, and focus without forcing scroll. | VERIFIED | focused contracts `8/8` |
| VR-020-04 | Layout observation does not create a reading-progress render loop, and keyboard navigation remains available. | VERIFIED | focused contracts |
| VR-020-05 | Related MailApp/launch/reader contracts pass `101/101`; the complete Apps Script suite passes `540/540`. | VERIFIED | local Node test traces |
| VR-020-06 | Diff formatting is clean and the changed files contain no recognized secret signature. | VERIFIED | `git diff --check`; signature scan `0` |
| VR-020-07 | Desktop/mobile reading, long real HTML, remote-image layout shifts, return navigation, and production behavior pass natively. | UNVERIFIED | no native acceptance or release in this contour |

## Boundary and next evidence

This report proves the source behavior and automated contracts, not native WebView or production behavior. A separately authorized cumulative candidate must preserve immutable history and pass desktop/mobile reading with long real HTML, delayed remote-image layout, background updates, keyboard focus, and return navigation before `GT-050` can become `VERIFIED`.
