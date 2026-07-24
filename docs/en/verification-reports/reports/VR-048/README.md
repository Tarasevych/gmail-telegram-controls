# VR-048 - P0-G conflict-safe Gmail Drafts update

Verification framework: REQ-0004

- **Status:** `PARTIAL`
- **Date:** 2026-07-24
- **Request:** `REQ-0037`
- **Implementation baseline:** `9b00a335c0016c439a463233b67a16e1499b7222`
- **Related records:** `GT-073`, `B1-53`, `RCA-029`
- **Українське дзеркало:** [VR-048](../../../../uk/verification-reports/reports/VR-048/README.md)

## Boundary

This report verifies only the P0-G source contour against a synthetic Gmail harness. No real Gmail draft, OAuth, Telegram runtime, Apps Script deployment, staging, or production state was changed. Source tests prove optimistic conflict detection, not atomic compare-and-swap on Gmail.

## Confirmed root cause

The existing model already had encrypted local recovery, a 1.8-second debounce, a stable operation ID, a durable journal, bounded retry, restart reconciliation, and a local/Gmail conflict UI on open. Updating an existing draft, however, carried only draft content and the stable operation ID. If another session changed the Gmail draft after canonical readback, the next `PUT` had no expected-server-state binding and could silently replace the newer version.

## Implemented source contour

- The canonical draft DTO carries a 43-character opaque `serverVersion` derived from canonical Gmail draft state.
- The token exposes no body, address, OAuth/session credential, or Telegram identifier.
- Encrypted recovery state retains `serverVersion`; the update payload sends it as `expectedVersion`.
- An existing-draft update fails closed with `DRAFT_VERSION_REQUIRED` when the exact token is absent.
- The server checks the version after canonical draft read and again immediately before `PUT`.
- A mismatch performs no Gmail mutation, terminalizes the exact journal reservation as failed, and returns the current canonical draft in a conflict DTO.
- The client retains local recovery, stops automatic retry, and presents two explicit actions: retain the local version or accept the Gmail version.
- Retaining the local version first adopts the latest server version as the new expected baseline; accepting the Gmail version replaces the local editor with canonical state.

## Source evidence

| Claim | Result | Status |
|---|---:|---|
| Focused draft/client contracts | `258/258` | `VERIFIED` in source scope |
| Complete Apps Script suite | `707/707` in `23.349s` | `VERIFIED` in source scope |
| Exact version propagation through DTO/recovery/payload | present | `VERIFIED` in source scope |
| Two version checks before `PUT` | present | `VERIFIED` in source scope |
| Conflict path performs no `PUT` and closes reservation | present | `VERIFIED` in source scope |
| Exact implementation baseline | `9b00a335c0016c439a463233b67a16e1499b7222` | recorded |
| Real Gmail/OAuth/Telegram/runtime mutation | none | not performed |

## Honest limitations

- Official `users.drafts.update` documentation specifies replacement through `PUT` but documents no `If-Match`, ETag, revision, or other atomic precondition.
- The second canonical read immediately before update materially narrows but cannot eliminate a race if another session changes the draft after that read and before Gmail `PUT`.
- Authenticated two-session acceptance must use only an explicitly created controlled draft; this source contour did not perform it.
- Shared Apps Script URL Fetch quota and `T-03` keep the release gate `BLOCKED`.
- No staging or production acceptance is claimed.

## Primary references

- [Gmail API: users.drafts.update](https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.drafts/update)
- [Gmail API: Draft resource](https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.drafts)
