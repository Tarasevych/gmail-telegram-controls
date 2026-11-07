# VR-040 — C-01 Gmail-style autosave state machine

Verification framework: REQ-0004

- **Status:** `PARTIAL`
- **Date:** 2026-07-23
- **Request:** `REQ-0035`
- **Related records:** `GT-035`, `GT-045`, `B1-25`, `RCA-021`
- **Українське дзеркало:** [VR-040](../../../../uk/verification-reports/reports/VR-040/README.md)

## Boundary

This source-only contour extends the existing Versie 1 compose state. It changes no Gmail/OAuth scope, server draft RPC, stable-operation journal, Telegram identity, message, label, deployment, staging candidate, or production state.

## Confirmed root cause

The server already returned a canonical Gmail draft and safely reconciled an uncertain operation by stable ID. The client UI nevertheless defaulted to “Saved in Gmail,” mixed dirty, in-flight, and pending states, and offered a manual “Check saving” action during normal autosave. Same-session pending and terminal failures had no single bounded terminal presentation contract.

## Source correction

- One derived presentation model shows `Changed`, `Saving…`, `Saved ✓ <time>`, `Offline — queued`, `Conflict`, or `Not saved — retry`.
- `Saved` and its timestamp are assigned only after canonical Gmail draft readback.
- Pending and terminal automatic retries are limited to three attempts; one explicit retry action is then available.
- Manual retry reuses the same pending operation ID and creates no parallel Gmail operation.
- An offline edit remains in persistent local recovery and starts no transport until the browser reports restored connectivity.
- The existing local/Gmail conflict retains both versions and requires an explicit choice.
- Status has a non-colour `✓`, live-region text, and a keyboard action only when an action is actually available.

## Atomic claims

| Claim | Category | Status | Evidence |
|---|---|---|---|
| Normal autosave never asks the user to “Check saving” | UX | `VERIFIED` | executable source contract |
| Saved state appears only after canonical Gmail draft readback | Integrity | `VERIFIED` | ordered source contract |
| Pending and terminal automatic retry have a bounded terminal state | Reliability | `VERIFIED` | synthetic state/retry contracts |
| Manual retry does not change the stable pending operation ID | Idempotency | `VERIFIED` | retry source contract |
| Offline state is never represented as Gmail acknowledgement | Offline safety | `VERIFIED` | state precedence and transport-gate contracts |
| A local/server conflict cannot overwrite either version without an explicit choice | Conflict safety | `VERIFIED` | existing recovery conflict control plus status contract |
| A real Gmail draft survives native restart, offline recovery, and cross-session continuation | Runtime | `UNVERIFIED` | the shared Apps Script blocker prevents safe staging |
| Current production has the corrected autosave UX | Production | `UNVERIFIED` | release state is unchanged |

## Validation

Focused autosave contracts and the complete Apps Script suite must pass before merge; GitHub checks are the authoritative publication gate. Tests are synthetic and do not create, change, or delete a real Gmail draft.

## Conclusion

Client source now distinguishes local recovery from canonical Gmail acknowledgement and ends automatic retry at an honest bounded boundary. Status remains `PARTIAL` pending native offline/restart/cross-session acceptance and production verification after the shared release blocker clears.
