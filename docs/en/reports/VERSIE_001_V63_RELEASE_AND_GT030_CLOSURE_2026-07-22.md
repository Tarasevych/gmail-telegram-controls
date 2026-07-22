# Versie 1 v63 release and GT-030 closure

[Українською](../../uk/reports/VERSIE_001_V63_RELEASE_AND_GT030_CLOSURE_2026-07-22.md)

- **Date:** 2026-07-22
- **Status:** VERIFIED for the v63 release and GT-030 no-overlap gate
- **Request:** `REQ-0033`
- **Atomic verification:** [VR-011](../verification-reports/reports/VR-011/README.md)
- **Current state:** [CURRENT_STATE](../CURRENT_STATE.md)

## Scope

This report records the cumulative immutable v63 release within Versie 1, the causal correction for `GT-030`, controlled staging and production acceptance, and the exact remaining evidence boundaries. It does not rewrite the historical v59 or v62 rollback reports.

## Root cause

The prior worker property treated a 150-second admission TTL as if it were a full execution lock. Google Apps Script permits a legal execution to continue for substantially longer. Once the property expired, a later minute trigger could enter while the previous worker was still alive. The deterministic contract reproduced that re-entry condition.

## Implemented correction

- a tokenized seven-minute crash lease covers the legal execution window;
- the 150-second value remains a soft stage deadline rather than the exclusion lifetime;
- only the matching lease token can release the property in `finally`;
- content-free telemetry records stage/runtime outcomes without message text, tokens, identifiers or account data;
- immutable v63 is cumulative and preserves every accepted Versie 1 client and multi-account change from the previous candidates.

## Source and test evidence

| Claim | Result | Status |
|---|---:|---|
| Focused worker contracts | `17/17` | VERIFIED |
| Source suite | `497/497` | VERIFIED |
| Release-helper contracts | `2/2` | VERIFIED |
| Source plus release-helper suite | `499/499` | VERIFIED |
| Signed bridge contracts | `4/4` | VERIFIED |
| Final cumulative suite | `501/501` | VERIFIED |
| GitHub required checks for PR #32, #33 and #34 | passed | VERIFIED |
| GitHub/private GitLab `main` parity | `ce46143b7270ca7776a91b01783490e1d08aa1ca` | VERIFIED |
| Staged privacy scans | `0` findings | VERIFIED |

## Release trace

1. PR #32 merged the worker-lease correction as `cd4c32c5af2a61161c0fc6e1b25cffa04e22f724`.
2. PR #33 merged the immutable v63 release helper as `fce30f96597f7706f8aa0d3a8bbb21e51d9b9360`.
3. PR #34 merged the signed staging bridge as `ce46143b7270ca7776a91b01783490e1d08aa1ca`.
4. Immutable v63 was created once and staged once for owner-only acceptance.
5. Native Telegram Desktop staging loaded the mailbox, dynamic account context, avatar behavior and exactly three isolated roots. Switching to a controlled existing root and back required no OAuth.
6. Promotion changed stable v57 to v63. The helper's immediate read returned stale state and raised a false negative; a read-only preflight reconciled stable v63 before any further mutation.
7. Two fresh native Telegram Desktop production launches loaded the v63 mailbox.
8. Cleanup removed the exact staging deployment, set HEAD to exact v63 and left the release journal `cleaned`.
9. Final preflight confirmed stable/HEAD v63, staging `0` and immutable-ready source hashes.

## Runtime acceptance

The authenticated Apps Script Executions view showed seven successive completed `checkNewMail_` runs at one-minute intervals. Their observed durations were `5.066 s`, `20.125 s`, `4.062 s`, `1.82 s`, `23.542 s`, `2.235 s` and `2.742 s`. Every run completed before the next start. No overlapping worker execution was observed.

The 15-minute History slot remains verified by automated contract, not by a separate runtime substage trace. Cloud logs did not expose the new content-free telemetry row during the observation window.

## Safety boundaries

- No OAuth consent, GCP migration, secret-property read, account-zone change or random mail mutation was performed.
- No additional real email was sent. External automatic INBOX delivery after v63 remains `UNVERIFIED`.
- Immutable v56, v59, v62 and v63 were not rewritten. Exact v57 remains the rollback target.
- Telegram Web K/A displayed a blank embedded page for the exact signed route while native Telegram Desktop passed. The web-only root cause remains `UNVERIFIED`; signed bootstrap checks were not weakened.

## Residual work

- `GT-031`: correct the narrow-account header clipping without losing full accessible email.
- `GT-032`–`GT-036`: complete the scenario-specific performance, cache, draft, typography and one-reload production evidence.
- `GT-037`: add bounded read-after-write reconciliation to the next release helper.
- `GT-038`: isolate the Telegram Web K/A embed failure without weakening signature or session controls.
- Confirm one external automatic INBOX delivery after v63 using a separately authorized controlled message.
