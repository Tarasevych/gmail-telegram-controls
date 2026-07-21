# Versie 1 delivery postmortem: v42-v55

[Українська](../uk/POSTMORTEM.md) | [Project guide](README.md) | [VR-002](verification-reports/reports/VR-002/README.md)

Source request: `REQ-0010`. Verification framework: `REQ-0004`.

## Evidence boundary

This postmortem is a structured reconstruction of the supplied v42-v55 agent-session log and its architectural overview. It does not promote source inspection or a local test to production proof. Claims not demonstrated by the supplied text are marked `unverified`. In particular, v55 contains local candidate changes but had not completed tests, preflight, immutable deployment, or production acceptance when the source log ended.

## Architecture by subsystem

### Realtime delivery lane

- v42 exposed the delivery failure: maintenance and the frozen backlog pass ran before delivery, while the frozen upper bound could not include mail created after that pass started.
- v43 introduced a bounded newest-first realtime lane, per-connection watermark/retry state, shared seen dedupe, and delivery-first scheduling. The frozen scanner remained a recovery mechanism.
- v44 corrected fast-lane scope/query alignment.
- v45-v46 preserved stage-specific failures instead of allowing later success or maintenance output to hide them.
- v48 isolated realtime work from a shared `UserLock` that could be held during slower I/O.
- v51 retained and aggregated every multi-account lane result and preserved `REAUTH` severity.
- v52-v54 extended controlled acceptance to Spam and recovered the exact Spam case described in the log.
- v55 excludes `SENT+INBOX` from notification eligibility to prevent one logical message from producing two cards. This v55 correction is `unverified`.

### Frozen backlog scanner

- v42 demonstrated that a frozen `upperBoundMs` is safe for deterministic backfill but unsuitable as the only realtime source.
- v43 placed the scanner behind the realtime lane and kept it for bounded recovery/backfill.
- v44 aligned its query scope with the delivery contract.
- v48 prevented scanner locking from blocking realtime delivery.
- v52-v54 aligned Spam recovery with the same canonical eligibility and dedupe expectations as realtime delivery.

### Telegram card index and capacity

- v47 added compaction, but the capacity guard still counted the raw index at a remaining call site.
- v49-v50 changed capacity accounting to valid live records rather than serialized entries and added terminal-record cleanup.
- The invariant is one physical Telegram card per logical Gmail message. Account roots are filtered views, not duplicate card stores.

### Retention and purge

- v47 introduced compaction as the first cleanup boundary.
- v49-v50 addressed the observed capacity exhaustion caused by stale or terminal records, including `delete_too_old` entries.
- Capacity must be calculated after validation and purge; a raw property/index length is not an admissible capacity metric.

### Multi-account fan-out

- v42 source inspection showed that notification fan-out used `notificationConnectionIds`; the active account was a UI selection, not the delivery boundary.
- v51 fixed discarded per-account results, preserved reauthorization failures, and made account-by-account outcomes observable.
- A shared seen ledger enforces at-most-once card creation, while callbacks and labels remain connection-scoped.
- Runtime acceptance with every intended real account is not proved by source inspection alone and remains `unverified` where the supplied log has no acceptance evidence.

### Immutable release, staging, and rollback

- v43 exposed preflight drift caused by whitespace-sensitive artifacts and stale rollback hashes/descriptions.
- Every immutable must be built from the exact tested source bundle, hash-pinned, read back after mutation, and accepted in staging before production promotion.
- Rollback means selecting a previously verified immutable artifact; it does not mean editing or rebuilding that historical release.
- v55 remained a local candidate at the end of the supplied log and therefore must not be described as deployed or accepted.

## Root cause analysis

| No. | Detected in | Symptom | Root cause | Correction | Future prevention |
|---:|---|---|---|---|---|
| 1 | v42 | New Gmail mail produced no Telegram card | Maintenance and frozen backlog work preceded realtime delivery; the frozen upper bound excluded newer mail | v43 | Run a bounded realtime lane first and keep frozen scans for recovery |
| 2 | v43 | Preflight rejected otherwise equivalent artifacts | Release comparison was whitespace-sensitive | v43 | Normalize deterministically and hash the exact release bundle |
| 3 | v43 | Rollback metadata did not match the candidate | Hashes/descriptions were copied from stale release state | v43 | Generate metadata from the pinned bundle and verify readback |
| 4 | v44 | Fast-lane coverage did not match its contract | Search scope/query boundaries diverged | v44 | Test the query boundary with messages inside and outside every lane |
| 5 | staging check | `/check` gave a false negative | The staging call omitted its required private key | Corrected invocation | Treat authenticated probe shape as a tested contract |
| 6 | v45-v46 | A stage failure was hidden by later output | Result aggregation overwrote or failed to preserve stage-specific errors | v45-v46 | Aggregate outcomes monotonically and retain the highest-severity failure |
| 7 | v47 | Card capacity was reported exhausted too early | A guard counted the raw serialized index | v49-v50 | Count only validated live records after compaction |
| 8 | v49-v50 | Capacity remained exhausted around 72 records | Terminal/stale records still consumed the limit | v50 | Purge terminal records before evaluating capacity |
| 9 | v48 | Realtime delivery waited behind unrelated work | A shared `UserLock` covered slow I/O | v48 | Keep locks account-scoped and never hold them across external I/O |
| 10 | v50 | `delete_too_old` records accumulated | Retention had no complete terminal-state purge | v50 | Define and test lifecycle transitions and terminal cleanup |
| 11 | v47 | Compaction existed but did not prevent the guard failure | A capacity call site still used the old raw index | v49-v50 | Test every caller of the invariant, not only the helper |
| 12 | v51 | Some account outcomes disappeared | Fan-out return values were discarded | v51 | Collect a typed result for every connection and assert result cardinality |
| 13 | v51 | `REAUTH` could appear as a lower-severity outcome | Aggregation did not preserve severity precedence | v51 | Define an explicit severity lattice and test mixed outcomes |
| 14 | v52-v54 | The controlled `kimnata` message was not delivered | The message was in Spam while the relevant path assumed Inbox | v52-v54 | Test canonical eligibility across Inbox, Spam, and excluded Sent combinations |
| 15 | v51 | Retry could duplicate or lose a create/journal transition | External creation and journal visibility were eventually consistent | v51 | Use idempotency keys and readback recovery around ambiguous mutations |
| 16 | unverified version | Runtime probe failed despite a valid endpoint | Probe used GET where the runtime contract required POST | Correct POST probe | Keep method, auth, and payload in one executable probe contract |
| 17 | unverified version | A structurally equal test object failed `deepStrictEqual` | Objects came from different VM realms | Realm-safe assertion | Compare serialized/domain fields rather than realm prototypes |
| 18 | v55 | One logical message could produce two Telegram cards | `SENT+INBOX` matched more than one notification path | v55 candidate, `unverified` | Enforce one canonical eligibility function and a shared at-most-once key |
| 19 | before v43 | Ukrainian and English issue references diverged | Paired pages used inconsistent `GT-*` identifiers | Corrected before v43 | Validate identifier parity as well as file parity |
| 20 | v55 | Candidate status was easy to overstate | Work stopped before tests, preflight, deployment, and acceptance | Pending verification | Make release status evidence-driven and never infer completion from edits |

## Durable invariants

1. The active Gmail account controls UI context only; delivery fans out to all enabled connections.
2. One logical Gmail message creates at most one Telegram card.
3. Realtime delivery is never blocked by frozen backlog work or a global lock held across I/O.
4. Capacity counts validated live records after purge.
5. A release is not accepted until tests, preflight, immutable readback, staging, and production acceptance are separately evidenced.

## Publication verification

GitHub Actions run [29788979153](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29788979153) proved that bilingual and knowledge-hub checks passed but the verification-report check failed because both VR-002 pages lacked the repository-wide `REQ-0004` framework marker. The paired VR-002 correction is part of this documentation phase; a new green run is required before publication is considered verified.
