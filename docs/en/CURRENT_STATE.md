# Current state

[Українською](../uk/CURRENT_STATE.md)

<!-- release-state: production=v64; candidate=v64; staging=0; status=VERIFIED; as-of=2026-07-22 -->

## Canonical release state

- **Versie:** Versie 1.
- **Production:** Apps Script immutable v64, `VERIFIED`.
- **HEAD:** exact cumulative v64.
- **Active staging deployments:** `0`.
- **Release journal:** `cleaned`.
- **Release source boundary:** cumulative source `da8b2768323db8fd8c1ba886b556bbfd2148d6de`; helper merge `bbb6fa39a550c623f1507ccc4791d20bfb150b57`; bridge merge `8b65d7e7653aadac4344e5ad2d4d86f56bb40f4d`.
- **Rollback:** exact immutable v63 remains available; historical immutable v56, v57, v59 and v62 are preserved and were not rewritten.
- **Telegram menu:** production `📬 Пошта · Versie 1`.

## Verified v64 acceptance

- GT-031 source contracts passed `88/88` and the pre-release source suite passed `501/501`.
- v64 release-helper contracts passed `2/2` and the cumulative release suite passed `503/503`.
- The corrected signed bridge contract and cumulative suite passed `505/505`; required checks passed for PR #38 and PR #39.
- Read-only preflight passed, exactly one `StageOnly` created immutable v64 and one owner-only staging deployment, and post-stage preflight reported `staging_verified`.
- Native Telegram Desktop staging showed the responsive full-address disclosure, avatar/fallback behavior, exactly three isolated Gmail roots, controlled account switching away and back without OAuth, and the actual three-account shared view.
- Promotion used one bounded deployment mutation, two fresh native production launches loaded the v64 mailbox, cleanup removed staging, and final preflight confirmed stable/HEAD v64 with journal `cleaned`.
- Six post-cleanup `checkNewMail_` rows completed. One short 3.164-second process shell formally overlapped the preceding 65.734-second row by about 5.7 seconds; lease rejection is consistent with the implementation but remains an inference because content-free substage telemetry was unavailable.

## Open evidence boundaries

- `GT-031` and `GT-037` are `VERIFIED` in production v64.
- `GT-032` through `GT-036` remain `PARTIAL` pending their scenario-specific P0 acceptance.
- The direct Apps Script Processes API returned `403 ACCESS_TOKEN_SCOPE_INSUFFICIENT`; no scope expansion, OAuth cycle or default-GCP-project migration was attempted.
- External automatic INBOX delivery after v64 remains `UNVERIFIED`; no additional real email was sent or changed for this release.
- `GT-038` remains `PARTIAL` for Telegram Web; the same signed release passed in native Telegram Desktop.

## Evidence and navigation

- [Detailed v64 release and GT-031/GT-037 closure report](reports/VERSIE_001_V64_RELEASE_AND_GT031_GT037_CLOSURE_2026-07-22.md)
- [VR-013 atomic verification](verification-reports/reports/VR-013/README.md)
- [Historical v63 release and GT-030 closure report](reports/VERSIE_001_V63_RELEASE_AND_GT030_CLOSURE_2026-07-22.md)
- [Cumulative Versie 1 release history](releases/VERSIE-001-2026-07-19.md)
- [Machine-readable release state](../release-state.json)