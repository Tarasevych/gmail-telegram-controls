# Versie 1 v64 release-helper source candidate

[Українською](../../uk/reports/VERSIE_001_V64_RELEASE_CANDIDATE_2026-07-22.md)

- **Date:** 2026-07-22
- **Status:** PARTIAL
- **Source request:** `REQ-0033`
- **Atomic verification:** [VR-013](../verification-reports/reports/VR-013/README.md)

## Scope

This report covers helper source only. It does not claim that Apps Script immutable v64 or a staging deployment exists.

## Exact boundaries

- source commit pinned for the candidate: `da8b2768323db8fd8c1ba886b556bbfd2148d6de`;
- rollback: exact immutable v63;
- historical predecessor: exact immutable v63;
- candidate version number: v64;
- production remains immutable v63 with staging `0`.

## Candidate hashes

| File | Normalized SHA-256 |
|---|---|
| `Code.gs` | `b9d38bba7bc13de401ab016f8cccde869a9bc933803fc98afb5a427bb2a6ec51` |
| `MultiAccount.gs` | `8d07e8b9f0f524ed5cedccbb8bfecbb547c93a34eda8ef876e40776d6b470f10` |
| `MailClient.gs` | `a04b56d4955ba72d46a7fedb7e48b837cd0737da87a6c720281472aa724c5a06` |
| `MailApp.html` | `014a6789885bbc93a1401c5359594925d1518ec5b323c8dfed9772d33c3cd080` |
| `appsscript.json` | `354ad159bcd81637d9abf7711cfc675b192ac373317744cf90376f7b14f4edc9` |

## GT-037 correction

Promotion and rollback perform one deployment PUT, followed by at most five read-only checks. Only the exact prior version is accepted while the target converges; any unrelated observed version fails closed. This prevents stale readback from producing a duplicate mutation.

## Local evidence

- focused v64 contracts: `2/2`;
- PowerShell parser: clean;
- cumulative Apps Script suite: `503/503`;
- immutable v63 helper and deployment were not edited.

## Next gate

Merge the normal helper PR, run `PreflightOnly`, then run exactly one `StageOnly` only if stable/HEAD, historical hashes, staging count and future-version checks all pass.
