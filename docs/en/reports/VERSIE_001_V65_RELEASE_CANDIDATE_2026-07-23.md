# Versie 1 v65 release-helper source candidate

[Українською](../../uk/reports/VERSIE_001_V65_RELEASE_CANDIDATE_2026-07-23.md)

- **Date:** 2026-07-23
- **Status:** PARTIAL
- **Source request:** `REQ-0033`
- **Atomic verification:** [VR-014](../verification-reports/reports/VR-014/README.md)

## Scope

This is helper source only. Production remains immutable v64 with staging `0`; immutable v65 does not exist.

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

## Next gate

After focused/full tests, documentation and required PR checks pass, merge normally and run read-only `PreflightOnly`. Run exactly one `StageOnly` only if stable/HEAD v64, rollback hashes, future-version guard, staging count and journal boundary all pass.