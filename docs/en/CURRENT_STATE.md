# Current state

[Українською](../uk/CURRENT_STATE.md)

<!-- release-state: production=v65; candidate=v65; staging=0; status=VERIFIED; as-of=2026-07-23 -->

## Canonical release state

- **Versie:** Versie 1.
- **Production:** Apps Script immutable v65, `VERIFIED`.
- **Accepted release HEAD:** exact cumulative v65.
- **Active staging deployments:** `0`.
- **Latest release journal:** v70 is terminal `abandoned`; the accepted v65 production journal remains historical `cleaned`.
- **Release source boundary:** accepted cumulative v65 source `3373ca4aa403a28f3252ad72fbe65310b318c53c`; v70 source merge `0666165b614f430103530728aa45349083db5e78`; v70 release-asset merge `70cc87ebf2a9c06b000e042e1e676838cf27d6b2`.
- **Rollback:** exact immutable v64 remains available; historical immutable v56, v57, v59, v62, v66-v70 are preserved and were not rewritten.
- **Telegram menu:** production `📬 Пошта · Versie 1`.

## Verified v65 acceptance

- Source and release-marker contracts passed `14/14`; the pre-release cumulative suite passed `505/505`.
- v65 helper contracts passed `2/2` and the cumulative release suite passed `507/507`; the signed bridge phase passed `4/4` and `509/509`.
- One `StageOnly` created immutable v65 and one owner-only staging deployment. A bounded read-after-create propagation fix adopted that exact deployment without repeating `deployments.create`.
- Native Telegram Desktop staging loaded the mailbox and avatar, exposed exactly three isolated Gmail roots, and switched to a secondary account and back without OAuth.
- One promotion advanced v64 to v65. Two fresh production launches loaded the primary mailbox, cleanup removed staging, and final preflight confirmed stable/HEAD v65 with journal `cleaned`.
- Post-cleanup worker telemetry showed full successful stage traces with `errorCode=none`. A 64.611-second process shell overlapped the next trigger by about five seconds, while the next execution logged only `gmail_timer_worker_skip: lease_active`; simultaneous worker work was therefore rejected.

## Open evidence boundaries

- `GT-031` and `GT-037` remain `VERIFIED`; v65 production and release cleanup are `VERIFIED`.
- `GT-032` through `GT-036` remain `PARTIAL`. The v64-to-v65 automatic reload transition cannot be proven because the v64 parser itself omitted the canonical manifest field.
- The direct Apps Script Processes API returned `403 ACCESS_TOKEN_SCOPE_INSUFFICIENT`; no scope expansion, OAuth cycle or default-GCP-project migration was attempted.
- `GT-039` is `BLOCKED`: production v65 skips `INBOX+SENT`, while current source delivers it once. `REQ-0009`/`REQ-0019` and the later `GT-039` define conflicting self/alias semantics; this source delta cannot enter a production candidate before a direct owner decision. Evidence: `VR-025`.
- The 15-minute History gate remains verified by automated contract; the live stage trace does not expose a due-versus-skip decision, so dedicated runtime cadence remains `UNVERIFIED`.
- `GT-038` remains `PARTIAL` for Telegram Web; the same signed release passed in native Telegram Desktop.

## Evidence and navigation

- [Detailed v65 release report](reports/VERSIE_001_V65_RELEASE_CANDIDATE_2026-07-23.md)
- [VR-014 production-client verification](verification-reports/reports/VR-014/README.md)
- [VR-015 SENT+INBOX delivery verification](verification-reports/reports/VR-015/README.md)
- [Historical v63 release and GT-030 closure report](reports/VERSIE_001_V63_RELEASE_AND_GT030_CLOSURE_2026-07-22.md)
- [Cumulative Versie 1 release history](releases/VERSIE-001-2026-07-19.md)
- [Machine-readable release state](../release-state.json)

## P0 ONE-SECOND boundary — 2026-07-23

- Production and release-state stable remain immutable v65; the owner menu remains on production.
- Immutable v66–v69 are preserved historically; v69 ended fail closed as `abandoned` after the native hard-reload/session conflict and was not promoted.
- Source v70 was merged by normal PR at SHA `0666165b614f430103530728aa45349083db5e78`; immutable v70 was created exactly once, tested once, and retained historically.
- Local gates after release assets: helper `3/3`, bridge contracts `4/4`, cumulative suite `572/572`, Python menu syntax and `git diff --check` pass.
- Source v70 adds content-free SecureStorage classification, a fail-closed locked state without a restart loop, and validated bridge-to-usable timing; nonce replay protection is not weakened.
- Native v70 opened the mailbox without another OAuth cycle or a repeated connection screen, restored a cached thread, and exposed the avatar plus three isolated Gmail roots. Switching to a secondary root returned the generic mail-operation error.
- A fresh production v65 launch returned the same generic error before the mailbox. Its `doPost`, `mailboxRedeemLaunch`, and `mailboxRpc` executions completed, while the adjacent timer trace failed in `legacy_recovery` with `errorCode=urlfetch_quota` and the Apps Script daily `urlfetch` quota exception. A candidate-specific v70 regression is therefore not established.
- Production promotion was not performed. The menu was restored to production, the exact v70 staging deployment was removed by the journal-bound helper, active staging is `0`, and the v70 journal is terminal `abandoned`.
- Native button-to-interactive p95, ten launches, hard reload, offline private Inbox, exact Windows SecureStorage recovery, and bidirectional account switching remain `UNVERIFIED`/`BLOCKED`; repeat A/B is deferred until the external daily quota recovers.
- Canonical evidence: [VR-016](verification-reports/reports/VR-016/README.md), [VR-023](verification-reports/reports/VR-023/README.md).

## 2026-07-23 P0 v67 acceptance boundary

- Production and HEAD remain on immutable v65.
- Immutable v67 is preserved as historical evidence; its exact temporary staging deployment has been removed.
- The duplicate visible launch/connection sequence is fixed in v67 and was qualitatively confirmed in correct Telegram Desktop launches.
- The one-second p95, offline private-mail unlock, draft recovery, and bidirectional multi-account switch are not VERIFIED; v67 was therefore not promoted.
- VR-016 is the authoritative evidence record for this acceptance boundary.

## REQ-0037 P0-A source contour - 2026-07-24

- **Status:** `PARTIAL`; source evidence only.
- Cross-document launch ownership now uses `navigator.locks` and an expiring content-free IndexedDB lease fallback. Ordinary validated launch remains overlay-free; release reload waits for mutation quiescence and uses only `p0-release-reload` in `sessionStorage`.
- Server issuance/redemption now share one `ScriptLock`-backed canonical claim ledger with HMAC owner/route scopes, a deterministic 60-second nonce lifetime, 11-minute tombstones, a maximum of 100 records, and no secrets or identifiers.
- Confirmed historical root cause: issuance and redemption were split across state paths.
- Source evidence: focused `37/37`; full Apps Script suite `668/668` in `24.229s`; baseline `1d5fb8352ea62f7b25d6980312f277060ce4d0ae`.
- Production and staging were not changed; no mailbox mutation occurred. Native p95, ten-launch acceptance, offline private device-bound unlock, POST-Redirect-GET, incremental Gmail History, Service Worker/Background Sync, staging, and production remain unverified or blocked by shared URL Fetch quota and `T-03`.
- Records: existing `GT-040-GT-047`, `GT-051`, `GT-053`, `GT-054`; new `GT-067`, `B1-47`, `RCA-023`, `VR-042`.

## REQ-0037 P0-B History contour - 2026-07-24

- **Status:** `PARTIAL`; source evidence only.
- The unconditional full-list background poll is replaced by an exact-connection Gmail History delta. A no-change cycle performs no repeat list/thread RPC.
- The History cursor is stored as an opaque decimal string in the existing Telegram-owner + Gmail-connection IndexedDB namespace; secrets, OAuth tokens, and Telegram signatures are not stored there.
- A missing/stale cursor, 404, or bounded page overflow fails closed to full reconciliation. A complex query/shared view also uses one bounded full list after a real change.
- Source evidence: focused `30/30`; complete Apps Script suite `673/673` in `25.763s`; baseline `28b438e68e1b327308761c246e074558b7ccd53d`.
- Runtime, staging, and production were unchanged; no Gmail/Telegram mutation or OAuth occurred. Live request metrics, native multi-account acceptance, and entity-level query membership remain `UNVERIFIED`; the release gate remains `BLOCKED` by shared URL Fetch quota and `T-03`.
- Records: `GT-068`, `B1-48`, `RCA-024`, `VR-043`.

## REQ-0037 P0-C entity contour - 2026-07-24

- **Status:** `PARTIAL`; source evidence only.
- A simple single-account Inbox now applies History delta through bounded metadata-only `threadSummaries`: new/relabeled/missing rows change without a full list RPC or replacement of cached body.
- History event type distinguishes a message change from a label-only change; the selected body is reread only for a message event.
- Safety boundary: at most 20 exact IDs, viewer-only account access, an explicit missing set, stable timestamp order, a page-capacity bound, and foreign-account isolation.
- Focused evidence `35/35`; complete Apps Script suite `678/678` in `25.414s`; baseline `7bd8270b2e14525dc8e99bd95387a1ef977dde1a`.
- Shared/query/filter/custom-label/oversized/incomplete paths retain the full-list fallback. Live Gmail, native Telegram, staging, and production were not verified; release blockers are unchanged.
- Records: `GT-069`, `B1-49`, `RCA-025`, `VR-044`.

## REQ-0037 P0-D cache-lock contour - 2026-07-24

- **Status:** `PARTIAL`; source evidence only.
- Persistent mail records now have an explicit locked/unlocked lifecycle; low-level IndexedDB reads and writes are rejected until a verified session bootstrap.
- The exact owner scope and connected-account set are checked at every one of five bootstrap paths; account reset and confirmed sign-out clear private memory and DOM without deleting retained records.
- Focused evidence `48/48`; complete Apps Script suite `685/685` in `26.020s`; baseline `8c01143411e20f96b7ec4fc885dd1898ac2e4bbb`.
- IndexedDB records are not yet encrypted at rest and offline device-bound unlock is not implemented; native Telegram, staging, and production were not verified, and release blockers are unchanged.
- Records: `GT-070`, `B1-50`, `RCA-026`, `VR-045`.

## REQ-0037 P0-E encrypted-cache contour - 2026-07-24

- **Status:** `PARTIAL`; source evidence only.
- Persistent cache schema 3 encrypts private values with AES-256-GCM; metadata AAD prevents ciphertext swapping between records.
- The content key is stored only in Telegram `SecureStorage`; browser storage receives no key, OAuth token, refresh token, or `initData`.
- Upgrade clears incompatible schema-2 plaintext cache. Focused evidence `55/55`; complete Apps Script suite `692/692` in `23.540s`; baseline `6f8a357e1a650639c3a16f9d6c7601d89817e3fe`.
- Native target-device key persistence, encrypted offline bootstrap, staging, and production were not verified; release blockers are unchanged.
- Records: `GT-071`, `B1-51`, `RCA-027`, `VR-046`.

## P0-F encrypted offline bootstrap

- **Status:** `PARTIAL`; source evidence only.
- A verified online session stores an encrypted 35-day bootstrap snapshot without session or OAuth secrets; the Telegram SecureStorage owner key and AES-GCM AAD bind it to the exact owner namespace.
- Only a transient network failure may expose the read-only retained cache; RPC and mutations remain blocked until verified online recovery.
- Focused evidence `33/33`; complete Apps Script suite `701/701` in `25.944s`; baseline `2bd7eb52d2f3297929c24c12d8ccbb4611699b84`.
- Fresh offline document navigation, native target-device acceptance, staging, and production were not verified; shared URL Fetch quota and `T-03` release blockers are unchanged.
- Records: `GT-072`, `B1-52`, `RCA-028`, `VR-047`.

## P0-G conflict-safe Gmail Drafts update

- **Status:** `PARTIAL`; source evidence only.
- The canonical Gmail draft DTO now carries an opaque `serverVersion`; encrypted recovery and the save payload retain the exact expected version for the account-bound draft.
- An existing-draft update fails closed without a 43-character version, checks canonical server state twice before `PUT`, and returns a read-only conflict on mismatch. The UI stops retrying and requires an explicit local-versus-Gmail choice.
- Focused evidence `258/258`; complete Apps Script suite `707/707` in `23.349s`; baseline `9b00a335c0016c439a463233b67a16e1499b7222`.
- Gmail API documents no atomic revision/ETag precondition, so a narrow TOCTOU race remains between the second read and update. Authenticated multi-session, staging, and production were not verified; release blockers are unchanged.
- Records: `GT-073`, `B1-53`, `RCA-029`, `VR-048`.

## V3 C-03 bounded scalable folder upload

- **Status:** `PARTIAL`; source evidence only.
- Folder selection now passes through one bounded `1000`-entry planner with recursive relative paths, an aggregate count/byte gate, and exact-duplicate/unsafe-path rejection before local reads begin.
- A progressive batch card shows total/status, bounded rows, a Drive fallback, per-file retry/cancel, and cancel-all; accepted entries reuse the existing transfer manager.
- Focused evidence `9/9`; Mail App contract `93/93`; complete Apps Script suite `716/716` in `25.980s`; baseline `a33242df9689f6d483825940632df3030663d1a6`.
- Native picker/fallback, visual mobile/desktop, staging, and production were not verified; shared URL Fetch quota and `T-03` release blockers are unchanged.
- Records: `GT-074`, `B1-54`, `RCA-030`, `VR-049`.
