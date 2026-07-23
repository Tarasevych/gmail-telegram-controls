# Versie 1 v65 release and acceptance report

[Українською](../../uk/reports/VERSIE_001_V65_RELEASE_CANDIDATE_2026-07-23.md)

- **Date:** 2026-07-23
- **Status:** PARTIAL
- **Source request:** `REQ-0033`
- **Atomic verification:** [VR-014](../verification-reports/reports/VR-014/README.md)

## Scope

Immutable v65 is production and HEAD, staging is `0`, the journal is `cleaned`, and exact immutable v64 remains rollback.

## Exact boundaries

- merged candidate source: `3373ca4aa403a28f3252ad72fbe65310b318c53c`;
- rollback and historical staging version: exact immutable v64;
- candidate version: v65;
- change: canonical production-release discovery and exact `Versie-1-v65-p0` client marker;
- no OAuth, Gmail mutation, Telegram-zone change or deployment mutation is part of this source artifact.

## Candidate hashes

| File | Normalized SHA-256 |
|---|---|
| `Code.gs` | `b9d38bba7bc13de401ab016f8cccde869a9bc933803fc98afb5a427bb2a6ec51` |
| `MultiAccount.gs` | `8d07e8b9f0f524ed5cedccbb8bfecbb547c93a34eda8ef876e40776d6b470f10` |
| `MailClient.gs` | `a04b56d4955ba72d46a7fedb7e48b837cd0737da87a6c720281472aa724c5a06` |
| `MailApp.html` | `ff2c04e1fd4fa88a5da90e22b012c078e8fad7a31aa8ae447e57a6a8f5555565` |
| `appsscript.json` | `354ad159bcd81637d9abf7711cfc675b192ac373317744cf90376f7b14f4edc9` |

## Release and live acceptance

- Source contracts passed `14/14` and the cumulative source suite passed `505/505`.
- Helper contracts passed `2/2` and the cumulative release suite passed `507/507`; bridge contracts passed `4/4` and `509/509`.
- One bounded `StageOnly` created immutable v65 and one staging deployment. The propagation recovery adopted that exact deployment without repeating a create.
- Native Telegram Desktop staging loaded the mailbox, avatar and exactly three roots, then switched to a secondary Gmail connection and back without OAuth.
- One promotion advanced v64 to v65; two fresh production launches passed; cleanup removed staging; final preflight confirmed stable/HEAD v65 and journal `cleaned`.

## Follow-up: deployment visibility delay

- **Status:** `VERIFIED`
- The first `StageOnly` created immutable v65 and exactly one staging deployment, but the immediate Apps Script Deployments API read did not yet expose the newly created deployment.
- Production and HEAD remained on exact v64; the journal stopped at `staging_create_reserved`, so another create was prohibited.
- The helper now performs bounded polling: at most five read-back attempts with a one-second delay. It does not repeat `deployments.create` and accepts only exactly one deployment with the exact version and description.
- The bounded recovery was used successfully and did not create a second immutable version or deployment.

## Staging bridge

- **Status:** `VERIFIED`
- Immutable v65 and exactly one staging deployment are confirmed by helper read-back.
- A separate noindex bridge submits only signed Telegram `initData` by form POST to the exact v65 staging deployment; the URL contains no token or private key.
- The current owner-menu updater separates v65 staging from the unchanged production URL; the historical v64 bridge is not rewritten.
- Native staging acceptance passed and the owner menu was restored to production before promotion.

## Post-release delivery blocker

- **Status:** `PARTIAL`
- Consecutive production worker traces completed with `errorCode=none`; an overlapping process shell was rejected with `gmail_timer_worker_skip: lease_active`.
- One controlled owner self-message had the Gmail labels `UNREAD+SENT+INBOX`, but automatic processing and two manual `/check` runs produced no Telegram card.
- Root cause: the production v65 eligibility guard rejects every `SENT` message even when the same Gmail message is also in `INBOX`.
- The source correction keeps the `INBOX`, `SPAM`, `TRASH` and important-mode boundaries while using durable Gmail message-ID dedupe. Focused tests passed `161/161`; deployment requires a separately pinned cumulative v66 candidate.
- Evidence: [VR-015](../verification-reports/reports/VR-015/README.md).
