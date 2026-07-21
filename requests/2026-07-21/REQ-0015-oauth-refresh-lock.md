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
