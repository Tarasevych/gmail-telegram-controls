# VR-041 — C-02 Safe composer close and minimize

Verification framework: REQ-0004

- **Status:** `PARTIAL`
- **Date:** 2026-07-23
- **Request:** `REQ-0035`
- **Related records:** `GT-051`, `GT-066`, `B1-46`, `RCA-022`
- **Українське дзеркало:** [VR-041](../../../../uk/verification-reports/reports/VR-041/README.md)

## Boundary

This source-only contour continues Versie 1 V3 `C-02`. It changes no Gmail/OAuth scope, server draft RPC, Telegram identity, message, label, deployment, staging candidate, production state, or immutable release history.

## Confirmed root cause

Header `X` used the shared close guard: a pending save/send retained a blocking editor, while final close unconditionally cancelled every local attachment job. Minimize retained the compose object but erased the saved Range. The separate compose chip had no drag contract and occupied the same lower-right desktop area as the global transfer manager.

## Source correction

- Header `X` creates one `composeCloseRequested` intent, immediately hides the editor, and returns the mail view.
- Every local job retains its stable transfer operation ID and an association with the exact compose session, Gmail connection, and canonical draft ID when known.
- Close settlement waits for jobs and canonical Gmail draft readback; only then does disposal clear editor state.
- Explicit discard is the only path that cancels local jobs.
- Restore reuses the same compose object/job promise, never restarts upload, and restores the latest edit focus/selection.
- Compose and global-transfer chips are movable, bounded, accessibly named, and initially separated; a transfer row can reopen the exact associated draft.
- Persistent recovery counts unfinished local jobs as missing attachments. Local bytes are not represented as resumable after full WebView closure.

## Atomic claims

| Claim | Category | Status | Evidence |
|---|---|---|---|
| Header `X` does not cancel an active local attachment job | Data integrity | `VERIFIED` | executable source contract |
| Final disposal does not run before transfer settlement and canonical Gmail save | Lifecycle | `VERIFIED` | ordered close-state contract |
| Restore reuses the same job promise/ID without a duplicate attachment start | Idempotency | `VERIFIED` | transfer/restore source contract |
| Minimize/restore preserves edit focus and Range | Accessibility | `VERIFIED` | synthetic focus/selection contract |
| Compose and transfer chips are movable and do not start at the same position | UX | `VERIFIED` | CSS, pointer, and synthetic browser evidence |
| App restart truthfully requires reselection of an unfinished device file | Recovery truth | `VERIFIED` | persistent missing-job contract |
| Transfer continues after Telegram/WebView fully closes | Platform runtime | `UNVERIFIED` | this capability is not claimed |
| Current production contains the C-02 correction | Production | `UNVERIFIED` | release state is unchanged |

## Validation

Focused C-02 contracts pass `5/5`; the complete Apps Script suite passes `656/656`. Synthetic browser acceptance covers header close, manual minimize/restore, focus/selection, and simultaneous-chip layout without a real Gmail mutation; a separate executable pointer contract covers drag bounds. Native slow-network, WebView-restart, and production acceptance remain separate gates.

## Conclusion

C-02 source now separates safe close intent, reversible minimize, explicit discard, and final disposal. A stable same-session transfer is neither duplicated nor cancelled by `X`; closed-WebView continuation is not simulated. Status remains `PARTIAL` pending native acceptance and an authorized release contour.
