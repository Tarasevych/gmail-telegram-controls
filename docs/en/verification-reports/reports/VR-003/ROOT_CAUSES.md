# VR-003 root-cause analysis

**Verification framework:** REQ-0004

Only defects matched to primary Git or test evidence are listed as confirmed.

| # | Version found | Symptom | Root cause | Fix | Prevention |
|---:|---|---|---|---|---|
| 1 | before v47 | Telegram card capacity could appear exhausted despite stale slots | The guard counted the raw index, including duplicate, stale, and missing-record keys; the first patch also missed the reservation-path read | v47 compacts the index before both capacity reads and preserves live records (`VR3-007`, `VR3-008`) | Test every capacity read path with duplicate, ghost, and live keys |
| 2 | before v48 | Realtime delivery could wait behind slower work | The realtime path held the shared legacy `UserLock`, allowing contention to block the fast lane | v48 uses short `ScriptLock` claim/commit/release sections and a per-lane lease (`VR3-009`, `VR3-010`) | Never hold a shared lock across Gmail or Telegram I/O; assert zero realtime `UserLock` calls |
| 3 | before v55 | A single Gmail item could produce a duplicate notification | A message could carry both `INBOX` and `SENT`; delivery lanes did not share one eligibility invariant | v55 rejects the SENT copy at the shared eligibility boundary and durably marks it seen in realtime (`VR3-013`, `VR3-014`) | Run the same dedupe contract against realtime, retry, and frozen backlog paths |

The reported OAuth callback diagnosis, earlier stale hash pins, and the historical live retention result remain unverified because VR-003 did not reproduce them against primary runtime evidence (`VR3-012`, `VR3-022`, `VR3-024`).
