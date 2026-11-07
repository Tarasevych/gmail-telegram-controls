# VR-003 architecture characteristics

**Verification framework:** REQ-0004

## Realtime delivery lane

The minute trigger executes bounded realtime fan-out before maintenance and frozen recovery (`VR3-002`). The current lane stores per-connection state and uses a 15-minute bounded window, overlap, lag, a 25-message cap, and bounded retries (`VR3-003`). Since v48, claim/commit/release uses a short `ScriptLock` with a per-lane lease; Gmail and Telegram I/O does not hold the legacy `UserLock` (`VR3-009`, `VR3-010`).

Versions touched: v48 introduced verified lock isolation; the invariant is present in the current v55 candidate. The exact first version of every realtime-window constant is unverified.

## Frozen backlog scanner

The frozen scanner is a bounded, crash-resumable backfill mechanism and is not the realtime lane (`VR3-004`). It runs after the realtime path and retains separate recovery semantics.

Versions touched: the scanner exists in the current v55 candidate and in the v42-v54 historical lineage. Its exact introduction version is unverified by VR-003.

## Telegram card index and capacity

The card index is compacted before capacity checks: duplicate keys and keys without records are removed while live records are retained (`VR3-007`). v47 fixed the raw-index capacity defect and the missed reservation-path read (`VR3-008`). One Gmail event reserves one physical card rather than one card per view (`VR3-006`).

Versions touched: v47 fixed capacity accounting; the invariant remains in v55.

## Retention and purge

Retention work is bounded. A local record is detached only for Telegram's definitive `delete_too_old` result; other failures remain fail-closed (`VR3-011`). The transcript's reported live `72 to 60` result was not independently reverified and remains unverified (`VR3-012`).

Versions touched: v50 implemented the verified retention behavior. Runtime effectiveness in the current production state is unverified.

## Multi-account fan-out

`activeConnectionId` selects the UI context. `notificationConnectionIds` selects the accounts participating in automatic fan-out (`VR3-005`). Account identity and connection-scoped callbacks preserve context while the physical-card invariant prevents duplicate cards per view (`VR3-006`).

Versions touched: this separation is verified in the current v55 candidate. The transcript does not provide sufficient primary evidence to assign its first introduction to one exact earlier version.

## Release process

The release helper pins rollback v50, legacy staging v54, and candidate v55 by exact SHA-256 bundle (`VR3-020`). Hash checks happen before StageOnly or Promote; ordinary preflight does not mutate the stable rollback (`VR3-023`). `PreflightOnly` passed for v55 without mutation (`VR3-017`). No v55 release operation occurred (`VR3-018`).

Versions touched: v50 is the report-backed stable baseline, v54 the report-backed legacy staging immutable, and v55 the tested candidate. Their live deployment state was not re-read by VR-003.
