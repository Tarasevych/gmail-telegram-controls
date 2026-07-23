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
