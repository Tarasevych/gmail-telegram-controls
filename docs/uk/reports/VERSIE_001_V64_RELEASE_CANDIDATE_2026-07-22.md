# Source candidate release-helper v64 у Versie 1

[English](../../en/reports/VERSIE_001_V64_RELEASE_CANDIDATE_2026-07-22.md)

- **Дата:** 2026-07-22
- **Статус:** PARTIAL
- **Source request:** `REQ-0033`
- **Атомарна verification:** [VR-013](../verification-reports/reports/VR-013/README.md)

## Межі

Цей звіт покриває лише helper source. Він не заявляє, що Apps Script immutable v64 або staging deployment уже існує.

## Exact boundaries

- source commit candidate: `da8b2768323db8fd8c1ba886b556bbfd2148d6de`;
- rollback: exact immutable v63;
- historical predecessor: exact immutable v63;
- candidate version number: v64;
- production лишається immutable v63 зі staging `0`.

## Candidate hashes

| Файл | Normalized SHA-256 |
|---|---|
| `Code.gs` | `b9d38bba7bc13de401ab016f8cccde869a9bc933803fc98afb5a427bb2a6ec51` |
| `MultiAccount.gs` | `8d07e8b9f0f524ed5cedccbb8bfecbb547c93a34eda8ef876e40776d6b470f10` |
| `MailClient.gs` | `a04b56d4955ba72d46a7fedb7e48b837cd0737da87a6c720281472aa724c5a06` |
| `MailApp.html` | `014a6789885bbc93a1401c5359594925d1518ec5b323c8dfed9772d33c3cd080` |
| `appsscript.json` | `354ad159bcd81637d9abf7711cfc675b192ac373317744cf90376f7b14f4edc9` |

## Correction GT-037

Promotion і rollback виконують один deployment PUT, після чого не більше п'яти read-only checks. Під час convergence приймається лише exact prior version; будь-яка unrelated observed version fail closed. Це не дозволяє stale readback спричинити duplicate mutation.

## Локальні докази

- focused v64 contracts: `2/2`;
- PowerShell parser: clean;
- cumulative Apps Script suite: `503/503`;
- immutable v63 helper і deployment не редагувалися.

## Наступний gate

Merged normal helper PR, `PreflightOnly`, а потім рівно один `StageOnly` лише якщо stable/HEAD, historical hashes, staging count і future-version checks пройдено.
