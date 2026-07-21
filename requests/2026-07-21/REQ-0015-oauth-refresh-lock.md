# REQ-0015: OAuth refresh concurrency lock / Lock для конкурентного OAuth refresh

- ID: REQ-0015
- Received: 2026-07-21
- Status: recorded
- Active Versie: Versie 1
- Next Versie authorization: no
- Routes: requests=record; instructions=reference; permissions=reference; plan=update; product=update; release=no-change
- Permission basis: explicit

<!-- lang:uk -->
## Українською

Власник наказав продовжити роботу над активною Versie 1. Наступний безпечний незавершений пункт реєстру проблем: `GT-010`, де OAuth token refresh path не має доведеного function-local lock і може виконувати конкурентні refresh-запити для одного connection.

Робота обмежується статичним аналізом, локальним виправленням concurrency contract, тестами та двомовним оновленням problem/roadmap evidence. Заборонені OAuth consent, реальні token operations, Gmail mutation, Apps Script deployment, production promotion, merge `main` або наступна Versie.

## Критерії завершення

- Точний refresh path і shared-state boundary встановлено з коду.
- Для одного Gmail connection одночасно працює не більше одного refresh owner; очікувачі повторно читають актуальний protected token state.
- Lock не утримується під час довгого Gmail/Telegram I/O, якщо це не потрібно для атомарності refresh contract.
- Додано deterministic concurrency/reuse/failure tests без реальних credentials або мережі.
- Релевантні локальні tests, privacy та diff checks проходять.
- Зміни й доказ оновлення `GT-010` committed і pushed лише до активної Versie 1.

<!-- lang:en -->
## English

The owner ordered continued work on active Versie 1. The next safe unresolved issue is `GT-010`: the OAuth token refresh path lacks a proven function-local lock and may execute concurrent refresh requests for one connection.

Work is limited to static analysis, a local concurrency-contract fix, tests, and paired problem/roadmap evidence updates. OAuth consent, real token operations, Gmail mutation, Apps Script deployment, production promotion, `main` merge, and a next Versie are prohibited.

## Completion criteria

- The exact refresh path and shared-state boundary are established from code.
- At most one refresh owner operates per Gmail connection; waiters reread current protected token state.
- The lock is not held during long Gmail/Telegram I/O unless required by refresh atomicity.
- Deterministic concurrency/reuse/failure tests are added without real credentials or network access.
- Relevant local tests, privacy, and diff checks pass.
- Changes and `GT-010` evidence are committed and pushed only to active Versie 1.
## Completion evidence / Доказ завершення

### Українська

- **Статус:** завершено локально та опубліковано у поточній `Versie 1`; E4/E5 не виконувалися.
- **Product commit:** `ae8fa827784296062c1f5cfe65334824d0fcb2c2` (`fix(versie-1): serialize Gmail token refresh`).
- **Локальні докази:** `mail_client.test.js` — 148/148; release test — 3/3; bilingual parity — 44/44; `git diff --check` — pass.
- **GitHub Actions:** успішні runs `29833104122`, `29833104134`, `29833104138`, `29833108424`, `29833108448`, `29833108519`.
- **PR:** #1 — `OPEN`, `CLEAN`, `MERGEABLE`, head `ae8fa827784296062c1f5cfe65334824d0fcb2c2`.
- **Межа:** immutable deployment, staging/production rollout, реальний OAuth і Gmail mutation не виконувалися.

### English

- **Status:** completed locally and published to the current `Versie 1`; E4/E5 were not performed.
- **Product commit:** `ae8fa827784296062c1f5cfe65334824d0fcb2c2` (`fix(versie-1): serialize Gmail token refresh`).
- **Local evidence:** `mail_client.test.js` — 148/148; release test — 3/3; bilingual parity — 44/44; `git diff --check` — pass.
- **GitHub Actions:** successful runs `29833104122`, `29833104134`, `29833104138`, `29833108424`, `29833108448`, `29833108519`.
- **PR:** #1 — `OPEN`, `CLEAN`, `MERGEABLE`, head `ae8fa827784296062c1f5cfe65334824d0fcb2c2`.
- **Boundary:** immutable deployment, staging/production rollout, real OAuth, and Gmail mutation were not performed.
