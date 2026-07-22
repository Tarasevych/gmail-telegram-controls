# Current state

[Українською](../uk/CURRENT_STATE.md)

<!-- release-state: production=v63; candidate=v63; staging=0; status=VERIFIED; as-of=2026-07-22 -->

## Canonical release state

- **Versie:** Versie 1.
- **Production:** Apps Script immutable v63, `VERIFIED`.
- **HEAD:** exact cumulative v63.
- **Active staging deployments:** `0`.
- **Release journal:** `cleaned`.
- **Canonical source:** GitHub and the private GitLab mirror both reached `ce46143b7270ca7776a91b01783490e1d08aa1ca`.
- **Rollback:** exact v57 remains available; historical immutable v56, v59 and v62 are preserved and were not rewritten.
- **Telegram menu:** production `📬 Пошта · Versie 1`.

## Verified v63 acceptance

- Focused worker contracts passed `17/17`; the source suite passed `497/497`.
- Release-helper contracts passed `2/2`, then the full suite passed `499/499`.
- Signed bridge contracts passed `4/4`, then the cumulative suite passed `501/501`.
- Owner-only staging loaded in native Telegram Desktop, showed the dynamic account context, avatar behavior and exactly three isolated Gmail roots, and switched to a controlled existing root and back without OAuth.
- Two fresh native Telegram Desktop production launches loaded the v63 mailbox.
- Seven successive `checkNewMail_` executions completed one minute apart without overlap; observed durations were between `1.82 s` and `23.542 s`.
- Final preflight confirmed stable/HEAD v63, immutable-ready hashes, staging `0`, and journal `cleaned`.

## Open evidence boundaries

- `GT-031` remains `PARTIAL`: the dynamic identity is live, but a narrow alternate-account header clipped part of the email.
- `GT-032` through `GT-036` are cumulative in production v63, but their scenario-specific P0 acceptance remains `PARTIAL`.
- The 15-minute History slot is covered by an automated contract; a separate runtime substage trace remains `UNVERIFIED`.
- The content-free worker telemetry payload was not available in Cloud logs during the observation window.
- External automatic INBOX delivery after v63 is `UNVERIFIED`; no additional real email was sent or changed for this release.
- `GT-037` tracks the promotion helper's read-after-write false negative. The deployed state was reconciled safely; bounded helper hardening remains `RECOMMENDED`.
- `GT-038` tracks a blank Telegram Web K/A embed while the same signed release passed in native Telegram Desktop. Its web-only root cause is `UNVERIFIED`.

## Evidence and navigation

- [Detailed v63 release and GT-030 closure report](reports/VERSIE_001_V63_RELEASE_AND_GT030_CLOSURE_2026-07-22.md)
- [VR-011 atomic verification](verification-reports/reports/VR-011/README.md)
- [VR-010 historical v62 rollback record](verification-reports/reports/VR-010/README.md)
- [Cumulative Versie 1 release history](releases/VERSIE-001-2026-07-19.md)
- [Machine-readable release state](../release-state.json)
