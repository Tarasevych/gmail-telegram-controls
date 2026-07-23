# Source candidate release-helper v65 у Versie 1

[English](../../en/reports/VERSIE_001_V65_RELEASE_CANDIDATE_2026-07-23.md)

- **Дата:** 2026-07-23
- **Статус:** PARTIAL
- **Source request:** `REQ-0033`
- **Атомарна verification:** [VR-014](../verification-reports/reports/VR-014/README.md)

## Межі

Це лише helper source. Production лишається immutable v64 зі staging `0`; immutable v65 не існує.

## Exact boundaries

- merged candidate source: `3373ca4aa403a28f3252ad72fbe65310b318c53c`;
- rollback і historical staging version: exact immutable v64;
- candidate version: v65;
- зміна: canonical production-release discovery та exact client marker `Versie-1-v65-p0`;
- OAuth, Gmail mutation, Telegram-zone change або deployment mutation не входять до цього source artifact.

## Candidate hashes

| Файл | Normalized SHA-256 |
|---|---|
| `Code.gs` | `b9d38bba7bc13de401ab016f8cccde869a9bc933803fc98afb5a427bb2a6ec51` |
| `MultiAccount.gs` | `8d07e8b9f0f524ed5cedccbb8bfecbb547c93a34eda8ef876e40776d6b470f10` |
| `MailClient.gs` | `a04b56d4955ba72d46a7fedb7e48b837cd0737da87a6c720281472aa724c5a06` |
| `MailApp.html` | `ff2c04e1fd4fa88a5da90e22b012c078e8fad7a31aa8ae447e57a6a8f5555565` |
| `appsscript.json` | `354ad159bcd81637d9abf7711cfc675b192ac373317744cf90376f7b14f4edc9` |

## Наступний gate

Після focused/full tests, documentation і required PR checks виконати normal merge та read-only `PreflightOnly`. Рівно один `StageOnly` дозволено лише якщо stable/HEAD v64, rollback hashes, future-version guard, staging count і journal boundary пройшли.

## Follow-up: затримка видимості deployment

- **Статус:** `PARTIAL`
- Перший `StageOnly` створив immutable v65 і рівно один staging, але негайне читання Apps Script Deployments API ще не побачило щойно створений deployment.
- Production і HEAD залишилися на exact v64; journal зупинився на `staging_create_reserved`, тому повторне створення було заборонене.
- Helper доповнено обмеженим polling: не більше п'яти read-back спроб з паузою одну секунду. Він не повторює `deployments.create` і приймає лише рівно один deployment з exact version та description.
- Staging acceptance і production promotion залишаються непідтвердженими до окремої перевірки.
