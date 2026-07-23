# Current state

[Українською](../uk/CURRENT_STATE.md)

<!-- release-state: production=v65; candidate=v65; staging=0; status=VERIFIED; as-of=2026-07-23 -->

## Canonical release state

- **Versie:** Versie 1.
- **Production:** Apps Script immutable v65, `VERIFIED`.
- **HEAD:** exact cumulative v65.
- **Active staging deployments:** `0`.
- **Release journal:** `cleaned`.
- **Release source boundary:** cumulative source `3373ca4aa403a28f3252ad72fbe65310b318c53c`; helper merge `eb19dc0822c97f86ebd458c379bde1db3794f800`; propagation fix `8201bc25bc12c470276bd14a0bfef6cde46fbd60`; bridge merge `759d9b9f5001e62e2c3a5cbcc1169077e641493b`.
- **Rollback:** exact immutable v64 remains available; historical immutable v56, v57, v59 and v62 are preserved and were not rewritten.
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
- `GT-039` is `PARTIAL`: one controlled owner self-message had `UNREAD+SENT+INBOX`, but automatic processing and two `/check` runs produced zero Telegram cards. Source inspection found the `!labels.SENT` guard; its exactly-once source correction passed `161/161` focused tests and is merged, but is not deployed.
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

- Production and HEAD remain immutable v65; staging is `0`.
- Immutable v66 is preserved historically but was not promoted because bidirectional account-switch acceptance failed.
- The active source delta carries marker v67; no deployment exists yet.
- Duplicate-launch root cause and local source correction are VERIFIED; native latency/offline acceptance is PARTIAL/UNVERIFIED.
- Canonical evidence: [VR-016](verification-reports/reports/VR-016/README.md).
