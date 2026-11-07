# VR-049 - V3 C-03 bounded scalable folder upload

Verification framework: REQ-0004

- **Status:** `PARTIAL`
- **Date:** 2026-07-24
- **Request:** `REQ-0035`
- **Implementation baseline:** `a33242df9689f6d483825940632df3030663d1a6`
- **Related records:** `GT-074`, `B1-54`, `RCA-030`
- **Українське дзеркало:** [VR-049](../../../../uk/verification-reports/reports/VR-049/README.md)

## Boundary

This report verifies only the V3 C-03 source contour in a synthetic browser/Node harness. No real Gmail message, OAuth, Telegram runtime, Apps Script deployment, staging, or production state was changed. Source tests prove bounded planning and UI contracts, not native picker/WebView acceptance.

## Confirmed root cause

The previous native directory scan stopped recursion at the current attachment-count limit, while the `webkitdirectory` fallback passed the full selection into per-item `addOutgoingFiles`. Admission checked each file independently, so there was no single snapshot containing recursive paths, aggregate bytes, exact duplicates, rejected entries, and a whole-batch gate. A large selection could appear truncated or partially accepted without a complete explanation.

## Implemented source contour

- Both picker paths pass selection to one `planComposeUploadSelection`.
- Scanning is bounded to `1000` entries; overflow/truncation is explicit.
- Relative paths are normalized; traversal, absolute/service, hidden, empty, and exact-duplicate entries fail closed.
- Equal basenames in different folders remain distinct path-aware entries and are marked for the user.
- Count and aggregate-byte gates are checked before attachment jobs and FileReader work are created.
- No partial upload starts after aggregate failure; the UI offers the existing Drive path.
- The progressive batch card initially expands small selections, exposes up to `40` additional rows per step, and provides total/status, per-file retry/cancel, and cancel-all.
- Accepted entries use the existing bounded transfer manager; no parallel scheduler was introduced.

## Source evidence

| Claim | Result | Status |
|---|---:|---|
| Focused folder-upload contracts | `9/9` | `VERIFIED` in source scope |
| Mail App contract | `93/93` | `VERIFIED` in source scope |
| Complete Apps Script suite | `716/716` in `25.980s` | `VERIFIED` in source scope |
| `1/10/100/1000`, overflow, empty, nested Unicode, duplicate, and unsafe-path fixtures | passed | `VERIFIED` in synthetic scope |
| Progressive/accessibility controls and bounded visible rows | present | `VERIFIED` in source scope |
| Exact implementation baseline | `a33242df9689f6d483825940632df3030663d1a6` | recorded |
| Real Gmail/OAuth/Telegram/runtime mutation | none | not performed |

## Honest limitations

- The current application attachment policy does not accept `100/1000` files as ordinary Gmail attachments; this contour honestly blocks the selection before reads and offers Drive.
- `showDirectoryPicker()` and `webkitdirectory` have different platform support; native Telegram WebView/mobile/desktop acceptance was not performed.
- Folder selection does not guarantee access to hidden or platform-service entries; such entries fail closed if the browser returns them.
- Visual verification of scrolling, focus, and touch targets on target devices is still required.
- Shared Apps Script URL Fetch quota and `T-03` keep the release gate `BLOCKED`.
- No staging or production acceptance is claimed.

## Primary references

- [File System Access: `showDirectoryPicker`](https://wicg.github.io/file-system-access/#api-showdirectorypicker)
- [File and Directory Entries API: `webkitdirectory`](https://wicg.github.io/entries-api/#dom-htmlinputelement-webkitdirectory)
- [File and Directory Entries API: relative paths](https://wicg.github.io/entries-api/#dom-file-webkitrelativepath)
