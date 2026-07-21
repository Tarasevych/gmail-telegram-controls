# REPORT-3 source dossier

[Home](../README.md) | [Roadmap](../MASTER_ROADMAP.md) | [Traceability](../TRACEABILITY.md) | [English](../../../en/knowledge-hub/README.md)

> Чернетка knowledge hub. Усі твердження походять лише із санітизованих екстракцій звітів, не перевірені незалежно й не доводять live deployment або поточний стан.

Comprehensive table translation із catalog.json. Source text уже санітизовано; local paths, emails, secrets і account identifiers не відтворюються.

## Artifact metadata

| Field | Value |
|---|---|
| Report | R3 |
| Extraction artifact | deep-report3-extraction.md |
| Extraction bytes | 45529 |
| Extraction SHA-256 | 207f9d6dfa67d6289c3d21287657c5f7939e3b2e8e23aad1124eda579bf117a1 |
| Reported original | deep-research-report3.md |
| Reported original bytes | 48401 |
| Reported original SHA-256 | 9c72d21ec4682beddef23e4b6b7d6f44b38f3ed5f53263834464a3fb44437cb2 |
| Atomic items | 142 |
| Independent verification | not performed |

## Authority classification

- Explicit owner-granted quote: не виявлено.
- Permission candidate: R3-030.
- Усі recommendations та standing rules вимагають canonical branch reconciliation.

## Source items

| Source ID | Canonical | Category | Lifecycle | Implementation | Priority | Source span | Dedup group | Нормалізований текст |
|---|---|---|---|---|---|---|---|---|
| R3-001 | KH-HIS-004 | historical-artifact | current | implemented | - | H02, 5 | distinct | Робота продовжується з наявного ядра в `[PRIVATE]`, а не з порожнього стану. |
| R3-002 | KH-HIS-005 | historical-artifact | current | implemented | - | H02, 6 | distinct | `gmail-telegram-v45-gentle-milestones` визначено поточним базовим артефактом. |
| R3-003 | KH-HIS-006 | historical-artifact | historical | implemented | - | H02, 7-10 | distinct | `gmail-telegram-v44-co-processing`, `gmail-telegram-notifier` та інші release lines збережено як попередній досвід. |
| R3-004 | KH-INS-014 | instruction | current | unknown | - | H02, 11 | distinct | Використовувати logs, checkpoints, audit notes, test trails і lessons learned; не повторювати пройдені стадії без огляду. |
| R3-005 | KH-DEC-021 | decision | superseded | implemented | - | H02, 12 | distinct | Попередні два звіти залишаються фоном, а report3 є новим головним технічним фундаментом. |
| R3-006 | KH-DEC-022 | decision | proposed | planned | - | H03, 16 | distinct | Цільова архітектура має бути гібридною: Gmail add-on, web app і зовнішній event/worker layer. |
| R3-007 | KH-LES-008 | lesson | current | unknown | - | H03, 18 | distinct | Time blindness, мотивацію та дофамін слід використовувати як design models, а не як єдине пояснення ADHD. |
| R3-008 | KH-PROD-005 | product | proposed | planned | - | H03, 20 | smallest-action | Сервіс не повинен соромити за backlog; він має показувати найменшу можливу наступну дію. |
| R3-009 | KH-INS-015 | instruction | current | unknown | - | H03, 22 | distinct | Послідовність роботи: product core, master prompt, implementation recipe, audit, operational cycle; capabilities перевіряти фактично. |
| R3-010 | KH-DEC-002 | product | proposed | planned | - | H05, 28 | inbox-functional | Продуктова мета не Inbox Zero, а зменшення executive cost і кількості рішень на один лист. |
| R3-011 | KH-PROD-002 | product | proposed | planned | - | H06, 34 | time-framing | Показувати вік листа, overdue risk, nearest deadline, `Suggested Next Slot` і п’ятихвилинний режим. |
| R3-012 | KH-INS-002 | product | proposed | planned | - | H06, 35 | one-next-action | Для листа показувати одну primary CTA: коротка відповідь, мотивоване відкладення або task conversion. |
| R3-013 | KH-PROD-010 | product | proposed | planned | - | H06, 36 | soft-reminders | Quiet inbox має прибирати звук і red counters та використовувати м’який digest. |
| R3-014 | KH-PROD-011 | product | proposed | planned | - | H06, 37 | task-triage | Листи мають маршрутизуватися у `Task / Waiting / Reference`, залишаючи в Gmail лише label/snooze trace. |
| R3-015 | KH-PROD-003 | product | proposed | planned | - | H06, 38 | batch-sessions | За замовчуванням пропонувати email sessions замість постійної уваги користувача до inbox. |
| R3-016 | KH-PROD-010 | product | proposed | planned | - | H06, 39 | soft-reminders | Нагадування мають показувати кілька найвпливовіших листів без звинувачувального формулювання. |
| R3-017 | KH-PROD-004 | product | proposed | planned | - | H06, 40 | microprogress | Мікровинагороди прив’язувати до завершеної дії, делегування або ясної відповіді, а не до нульового inbox. |
| R3-018 | KH-PROD-037 | product | proposed | planned | - | H07, 44 | gmail-context-surface | `Context Layer`: Gmail add-on cards із трьома зрозумілими contextual actions. |
| R3-019 | KH-PROD-038 | product | proposed | planned | - | H07, 44 | web-flow-surface | `Flow Layer`: web app для довших сценаріїв, rules, focus modes, backlog dashboard і Telegram control. |
| R3-020 | KH-PROD-039 | product | proposed | planned | - | H07, 44 | distinct | `Automation Layer`: `watch`, `history.list`, queue/worker та Apps Script orchestration. |
| R3-021 | KH-DEP-010 | dependency | proposed | planned | - | H07, 44 | distinct | Важкі та довготривалі операції мають виконуватися поза Apps Script. |
| R3-022 | KH-INS-016 | instruction | current | unknown | - | H08, 48-55 | distinct | Агент має діяти як product architect, Workspace engineer, accessibility researcher, security reviewer і release engineer та створювати technical delivery program. |
| R3-023 | KH-PROD-040 | product | proposed | planned | основна ціль | H08, 57-58 | distinct | Цільова аудиторія включає користувачів з ADHD, executive dysfunction і частою коморбідною депресією. |
| R3-024 | KH-PROD-041 | product | proposed | planned | основна ціль | H08, 59 | distinct | Мінімізувати cognitive load, decision fatigue, notification overwhelm і task paralysis. |
| R3-025 | KH-DEP-011 | dependency | proposed | planned | - | H08, 60-66 | distinct | Передбачені Gmail add-on, web app, installable triggers, `PropertiesService`, `CacheService`, `LockService`, `UrlFetchApp` і advanced Google services. |
| R3-026 | KH-DEC-012 | decision | proposed | planned | критична вимога | H08, 67 | apps-script-boundary | Не використовувати Apps Script для всього; Pub/Sub, Cloud Run, MIME parser, webhook relay, queue worker та OAuth backend можна виносити назовні за обґрунтуванням. |
| R3-027 | KH-PROD-042 | product | proposed | planned | - | H08, 68-71 | distinct | Gmail integration повинна підтримувати UI triage, near-real-time `watch/history` і подальше Telegram/dashboard expansion. |
| R3-028 | KH-PLAN-018 | plan | proposed | planned | - | H08, 72-76 | repository-audit | Провести аудит `gmail-telegram-controls` щодо security, OAuth, runtime state, locking, token storage, webhooks, MIME, logging і secret exposure та підготувати patch plan. |
| R3-029 | KH-PLAN-019 | plan | proposed | planned | - | H08, 77-85 | distinct | Побудувати release flow із `clasp`, Git branching, GitHub Actions, versioning, deployment, rollback, smoke tests і security scanning. |
| R3-030 | KH-PERM-003 | permission-candidate | proposed | unknown | - | H08, 86-93 | distinct | Browser/CDP/runtime tools можна розглядати лише після перевірки capability та permissions; це не наданий owner permission. |
| R3-031 | KH-INS-017 | instruction | current | unknown | P0/P1/P2 taxonomy без призначень | H08, 95-121 | distinct | Агент повинен видати секції A-R: architecture, UX, modules, scopes, OAuth, integrations, audit, build/debug/release plans, tests, backlog, patches і fallback paths. |
| R3-032 | KH-INS-018 | instruction | current | unknown | критична | H08, 123-125 | distinct | Для рекомендацій пояснювати problem, rationale і pitfalls; platform limits називати прямо та давати workaround. |
| R3-033 | KH-PROD-048 | product | proposed | planned | MVP | H16, 245 | distinct | MVP delayed send: створити draft, зберегти `draftId`, `sendAt`, `messageIntent`, а trigger або worker викликає send. |
| R3-034 | KH-DEC-018 | decision | proposed | planned | MVP | H16, 245 | undo-send | Власний `undo send` означає grace window до фактичного send, а не recall уже надісланого повідомлення. |
| R3-035 | KH-PROD-014 | product | proposed | planned | - | H16, 247-253 | reply-assistance | Reply templates мають бути energy-graded: low, normal і high energy, без відтворення приватного message content. |
| R3-036 | KH-PROD-049 | product | proposed | planned | - | H17, 257 | distinct | Telegram має бути low-friction control plane, а не копією Gmail. |
| R3-037 | KH-PROD-050 | product | proposed | planned | - | H17, 259 | distinct | Telegram digest має показувати невелику кількість листів із найбільшим впливом. |
| R3-038 | KH-PROD-051 | product | proposed | planned | - | H17, 260 | distinct | Telegram control має підтримувати `done`, `later`, `nudge tomorrow`, `show summary`. |
| R3-039 | KH-PROD-052 | product | proposed | planned | - | H17, 261 | distinct | Передбачено emergency relay лише для справді термінових листів. |
| R3-040 | KH-PROD-015 | product | proposed | planned | - | H17, 262 | co-processing | Body-doubling mode має давати короткий поштовх до однієї дії, не дублюючи приватний вміст листа. |
| R3-041 | KH-DEC-024 | decision | proposed | planned | - | H17, 264 | distinct | Не переносити весь inbox у Telegram; Mini Apps використовувати як dashboard/control, а не заміну Gmail UX. |
| R3-042 | KH-PRV-004 | privacy | proposed | planned | найвища | H19, 270 | least-privilege | Архітектура має дотримуватися least privilege, clear data boundaries і мінімального вилучення body з Gmail. |
| R3-043 | KH-DEP-016 | dependency | current | unknown | - | H19, 270 | gmail-scope-verification | Restricted Gmail scopes можуть вимагати production verification і додаткових заходів для external infrastructure. |
| R3-044 | KH-DEP-019 | dependency | proposed | planned | - | H20, 274 | distinct | Для Google-to-Google flow передбачено manifest scopes і `ScriptApp.getOAuthToken()`. |
| R3-045 | KH-DEP-017 | dependency | proposed | planned | - | H20, 274 | external-oauth-library | Для external OAuth providers рекомендовано `googleworkspace/apps-script-oauth2` з `PropertiesService`, `CacheService`, `LockService`. |
| R3-046 | KH-ISS-013 | issue | current | unknown | обов’язкова серіалізація | H20, 274-280 | distinct | Паралельний token refresh може спричинити race condition без lock. |
| R3-047 | KH-PRV-005 | privacy | proposed | planned | - | H20, 276-281 | distinct | Credentials не зберігати в коді; secrets тримати у properties або external vault; logs редагувати щодо addresses, headers і token fragments. |
| R3-048 | KH-DEC-015 | decision | proposed | planned | post-MVP | H21, 285 | replaceable-e2e | Повний MIME/PGP/S/MIME layer винести в replaceable worker і не включати без потреби до MVP. |
| R3-049 | KH-DEP-020 | dependency | proposed | planned | post-MVP | H21, 285 | distinct | Запропоновані `postal-mime`, `OpenPGP.js`, `Mailvelope`, `PKI.js` і RFC 8551. |
| R3-050 | KH-PLAN-031 | plan | proposed | planned | мінімальний контур | H22, 289-293 | distinct | Використовувати `clasp` та immutable versions/deployments для release і rollback. |
| R3-051 | KH-PLAN-032 | plan | proposed | planned | мінімальний контур | H22, 294 | distinct | Додати GitHub CodeQL. |
| R3-052 | KH-PLAN-033 | plan | proposed | planned | мінімальний контур | H22, 295-298 | distinct | Увімкнути secret scanning із першого дня. |
| R3-053 | KH-PLAN-034 | plan | proposed | planned | мінімальний контур | H22, 296 | distinct | Додати Dependabot для dependency alerts та updates. |
| R3-054 | KH-PLAN-035 | plan | proposed | planned | - | H22, 298 | distinct | CI має включати lint, manifest validation, dry-run push, staging smoke test і separate security lane. |
| R3-055 | KH-PLAN-036 | plan | unverified | blocked | - | H23, 302 | distinct | Фактичний audit репозиторію не виконано через непідтверджену доступність/індексацію; наведено лише audit plan. |
| R3-056 | KH-PLAN-037 | plan | proposed | planned | перша черга | H25, 308-314 | distinct | Першим перевірити `appsscript.json`: Gmail scopes, `script.external_request`, triggers, capability boundaries і separation add-on/web app. |
| R3-057 | KH-ISS-014 | issue | unverified | unknown | - | H25, 316 | distinct | Overbroad Gmail scope створює risk verification failure і збільшує blast radius; фактичний defect не підтверджено. |
| R3-058 | KH-PLAN-038 | plan | proposed | planned | - | H26, 320-327 | distinct | Перевірити code і Git history на hardcoded secret classes, direct webhook URLs, private identifiers у fixtures і full request/response logging. |
| R3-059 | KH-ISS-015 | issue | unverified | unknown | - | H26, 327 | distinct | Необроблене logging зовнішніх responses може розкрити token або private mail content; фактичний випадок не підтверджено. |
| R3-060 | KH-PLAN-039 | plan | proposed | planned | висока, словесно | H27, 331-339 | distinct | Перевірити lock discipline для state, queues, checkpoints, send operations, Telegram calls і token refresh. |
| R3-061 | KH-PLAN-040 | plan | proposed | planned | - | H28, 343-349 | distinct | Для webhook ingress перевірити signature/token validation, allowed methods, idempotency, dedupe і відсутність production debug output. |
| R3-062 | KH-LES-010 | lesson | current | planned | - | H28, 351 | distinct | Apps Script web app має бути thin ingress; heavy synchronous work треба дробити або виносити назовні. |
| R3-063 | KH-ISS-016 | issue | unverified | unknown | - | H29, 357 | distinct | Очікуваний risk: external URL без whitelist/validation. |
| R3-064 | KH-ISS-017 | issue | unverified | unknown | - | H29, 358 | distinct | Очікуваний risk: unescaped HTML або user-generated strings. |
| R3-065 | KH-ISS-018 | issue | unverified | unknown | - | H29, 359 | distinct | Очікуваний risk: весь task state в одному large JSON blob у `PropertiesService`. |
| R3-066 | KH-ISS-019 | issue | unverified | unknown | - | H29, 360 | distinct | Очікуваний risk: inbox labels як єдине source of truth. |
| R3-067 | KH-ISS-020 | issue | unverified | unknown | - | H29, 361 | distinct | Очікуваний risk: secrets у `Logger.log()` або `console.log()`. |
| R3-068 | KH-ISS-021 | issue | unverified | unknown | - | H29, 362 | distinct | Очікуваний risk: one-shot polling loop, який мовчки завершується через execution limit. |
| R3-069 | KH-ISS-022 | issue | unverified | unknown | - | H29, 363 | distinct | Очікуваний risk: overly broad OAuth consent surface. |
| R3-070 | KH-ISS-023 | issue | unverified | unknown | - | H29, 364 | distinct | Очікуваний risk: webhook без replay protection. |
| R3-071 | KH-DEC-025 | decision | proposed | planned | - | H29, 366 | distinct | Hardening має розділити secret management, state machine, ingress, Gmail operations і notifications. |
| R3-072 | KH-INS-021 | instruction | current | unknown | обов’язкова перевірка | H31, 372 | distinct | Codex має бути керованим technical reviewer і executor verification protocol; browser/CDP/runtime capability підтверджувати перед use. |
| R3-073 | KH-PLAN-041 | plan | proposed | planned | крок 1 | H32, 378-380 | distinct | `Repo discovery`: manifest, scopes, deployment config, workflows, README, release notes, secrets usage. |
| R3-074 | KH-PLAN-042 | plan | proposed | planned | крок 2 | H32, 381-382 | distinct | `OAuth trace`: redirect URI, consent screen, scopes, token errors і races. |
| R3-075 | KH-PLAN-043 | plan | proposed | planned | крок 3 | H32, 384-385 | distinct | `Gmail UI trace`: homepage, context cards, compose, empty states і error cards. |
| R3-076 | KH-PLAN-044 | plan | proposed | planned | крок 4 | H32, 387-388 | distinct | `Network trace`: external calls, response codes, retries, duplicates і latency. |
| R3-077 | KH-PLAN-045 | plan | proposed | planned | крок 5 | H32, 390-391 | distinct | `Runtime trace`: execution logs, disabled triggers, retry loops, continuation state і `historyId`. |
| R3-078 | KH-PLAN-046 | plan | proposed | planned | крок 6 | H32, 393-394 | distinct | `Release trace`: staging/prod separation, rollback, log privacy, CodeQL і secret scanning. |
| R3-079 | KH-PLAN-047 | plan | proposed | planned | крок 7 | H32, 396-397 | distinct | `UX trace`: primary CTA count, digest tone, quiet mode і non-shaming backlog. |
| R3-080 | KH-INS-022 | instruction | current | unknown | обов’язкова | H32, 399 | distinct | Operational loop має бути mandatory і охоплювати actual UI, runtime та network behavior, а не лише code reading. |
| R3-081 | KH-PLAN-048 | plan | proposed | planned | acceptance criteria | H33, 403-412 | distinct | Acceptance artifacts: scopes, endpoint map, state diagram, concurrency hotspots, privacy-exposure locations, OAuth reproduction, UI evidence і before/after patch plan. |
| R3-082 | KH-LES-011 | lesson | current | unknown | - | H33, 414 | distinct | Принцип роботи: minimum theory, maximum controlled verification, clear next actions і controlled progress. |
| R3-083 | KH-INS-019 | instruction | current | unknown | - | H08, 126 | distinct | Якщо потрібна hybrid architecture з Apps Script, Cloud Run, Pub/Sub і Storage, її слід спроєктувати явно. |
| R3-084 | KH-DEP-012 | dependency | proposed | planned | - | H08, 127 | distinct | Для сторонніх або open-source components слід вказувати точний repository, library або documentation source. |
| R3-085 | KH-INS-020 | instruction | current | unknown | - | H08, 128-130 | distinct | Не приховувати tradeoffs, уникати vague advice і писати як delivery document для implementation team. |
| R3-086 | KH-PLAN-020 | plan | proposed | planned | deliverable 1 | H08, 132-133 | distinct | Підготувати architecture v1. |
| R3-087 | KH-PLAN-021 | plan | proposed | planned | deliverable 2 | H08, 134 | distinct | Підготувати architecture v2 expansion path. |
| R3-088 | KH-PLAN-018 | plan | proposed | planned | deliverable 3 | H08, 135 | repository-audit | Підготувати repository audit plan. |
| R3-089 | KH-PLAN-022 | plan | proposed | planned | deliverable 4 | H08, 136 | distinct | Підготувати security hardening plan. |
| R3-090 | KH-PLAN-023 | plan | proposed | planned | 7-14 днів | H08, 137 | distinct | Підготувати конкретний checklist запуску MVP за 7-14 днів. |
| R3-091 | KH-PLAN-024 | plan | proposed | planned | deliverable 6 | H08, 138 | distinct | Підготувати concrete production-hardening checklist. |
| R3-092 | KH-PROD-037 | product | proposed | planned | MVP | H10, 147-151 | gmail-context-surface | Gmail Add-on на Apps Script є contextual surface для швидкого triage у desktop/mobile Gmail. |
| R3-093 | KH-PROD-038 | product | proposed | planned | MVP | H10, 152 | web-flow-surface | Apps Script Web App є surface для dashboard, backlog, rules і energy modes. |
| R3-094 | KH-DEP-013 | dependency | proposed | planned | MVP | H10, 153 | distinct | Gmail API потрібен для history, drafts/delayed send і attachments. |
| R3-095 | KH-DEP-014 | dependency | proposed | planned | MVP/hybrid | H10, 154 | distinct | Pub/Sub і Cloud Run потрібні для `watch`, webhook ingress, heavy jobs, retries та idempotency. |
| R3-096 | KH-DEP-015 | dependency | proposed | planned | MVP | H10, 155 | distinct | `PropertiesService`, `CacheService`, `LockService` потрібні для state, cache, refresh locking і continuation. |
| R3-097 | KH-PROD-043 | product | proposed | planned | expansion | H10, 156 | distinct | Telegram Bot API є зовнішнім short-command і digest control surface. |
| R3-098 | KH-PLAN-025 | plan | proposed | planned | перший deployment step | H12, 162 | distinct | Local setup: створити окремий Cloud project, увімкнути Apps Script API, виконати `clasp login`, потім `clasp create` або `clasp clone`, після чого вести код у Git. |
| R3-099 | KH-PLAN-026 | plan | proposed | planned | - | H12, 162 | distinct | CI/CD має використовувати protected `CLASPRC_JSON` і `.clasp.json` у GitHub Actions без включення credential value в repository. |
| R3-100 | KH-PLAN-027 | plan | proposed | planned | MVP structure | H12, 164-200 | distinct | Proposed tree розділяє `appsscript.json`, `src/addon`, `src/core`, `src/integrations`, `src/web`, `src/jobs`, `src/security`, `tests` і `.github/workflows/deploy.yml`. |
| R3-101 | KH-LES-009 | lesson | current | unknown | - | H12, 202 | distinct | Repository tree є architectural recommendation, а не Google canonical structure; її мета - відокремити UI, business logic, integrations, background jobs і security. |
| R3-102 | KH-PRV-004 | privacy | proposed | planned | критична | H13, 206 | least-privilege | Scope hygiene є частиною architecture: застосовувати least privilege і планувати verification boundary від початку. |
| R3-103 | KH-DEP-016 | dependency | current | unknown | - | H13, 206 | gmail-scope-verification | Gmail add-on потребує `addOns.gmail`; production із sensitive/restricted scopes може потребувати standard Cloud project і verification. |
| R3-104 | KH-PLAN-028 | plan | proposed | planned | - | H13, 208-211 | distinct | Розділити scope strategy на internal/private/workspace-only MVP і public production з мінімізованими scopes та verification package. |
| R3-105 | KH-PLAN-029 | plan | proposed | planned | least privilege | H13, 213 | distinct | Починати з вузьких context/label/draft/send scopes; для `UrlFetchApp` додати explicit external-request scope лише коли він потрібен. |
| R3-106 | KH-DEP-017 | dependency | proposed | planned | - | H13, 213 | external-oauth-library | Для external OAuth provider використовувати `googleworkspace/apps-script-oauth2` із documented storage/cache/lock practices. |
| R3-107 | KH-PROD-007 | product | proposed | planned | - | H14, 217-221 | focus-surface | Gmail add-on має використовувати трирівневу triage card, а не намагатися бути повним mail client. |
| R3-108 | KH-PROD-044 | product | proposed | planned | level 1 | H14, 219 | distinct | Перший card level: one-line AI summary, type icon і estimated effort. |
| R3-109 | KH-PROD-045 | product | proposed | planned | level 2 | H14, 220 | distinct | Другий card level: три actions - quick reply, defer, convert to task. |
| R3-110 | KH-PROD-046 | product | proposed | planned | level 3 | H14, 221 | distinct | Третій card level: collapsed metadata, thread details, attachments і labels. |
| R3-111 | KH-PROD-047 | product | proposed | planned | - | H14, 223 | distinct | Gmail homepage має показувати невеликий prioritized set: priority mail, quick win, short work block і waiting follow-up. |
| R3-112 | KH-DEC-023 | decision | proposed | planned | reliability | H15, 227 | distinct | Не використовувати постійний Apps Script polling; застосувати `watch()` і `history.list` із checkpoint. |
| R3-113 | KH-PLAN-030 | plan | proposed | planned | target flow | H15, 229-239 | distinct | Event flow: mailbox change -> `watch` -> Pub/Sub -> Cloud Run consumer -> normalize/dedupe -> enqueue/call Apps Script -> update labels, digest, task state і Telegram output. |
| R3-114 | KH-DEC-012 | decision | proposed | planned | architecture boundary | H15, 241 | apps-script-boundary | Apps Script має бути control plane, а не повним data plane; timeout-prone tasks розбивати та продовжувати через state/triggers. |
| R3-115 | KH-DEP-018 | dependency | proposed | planned | - | H15, 227-241 | distinct | Event continuation залежить від `startHistoryId`, checkpoint state, `PropertiesService` і triggers. |
| R3-E01 | KH-EVD-015 | evidence | current | implemented | - | H02, 5-10, verified-in-report only; not independently verified | distinct | Existing project core and v45 are the current working base. |
| R3-E02 | KH-EVD-016 | evidence | current | unknown | - | H03, 16, verified-in-report only; not independently verified | distinct | Gmail add-ons use card UI; contextual triggers run for opened messages and are unconditional in the manifest. |
| R3-E03 | KH-EVD-002 | evidence | current | unknown | - | H03, 18, verified-in-report only; not independently verified | adhd-executive-evidence | ADHD is associated with working-memory, planning, attention, switching, organization and time-perception difficulties. |
| R3-E04 | KH-EVD-017 | evidence | current | unknown | - | H03, 18, verified-in-report only; not independently verified | distinct | Dopaminergic systems are relevant, but a simple dopamine-deficit model is described as reductive. |
| R3-E05 | KH-EVD-006 | evidence | current | unknown | - | H03, 20, verified-in-report only; not independently verified | comorbidity-evidence | Comorbid depression is associated with stronger self-regulation, rumination and executive-function problems. |
| R3-E06 | KH-EVD-008 | evidence | current | unknown | - | H05, 28, verified-in-report only; not independently verified | batching-evidence | Practical sources support batching, limited notifications, templates, snooze and separating tasks from inbox. |
| R3-E07 | KH-EVD-003 | evidence | current | unknown | - | H06, 34, verified-in-report only; not independently verified | time-evidence | Time-perception and temporal-foresight deficits support time-oriented UI. |
| R3-E08 | KH-EVD-002 | evidence | current | unknown | - | H06, 35, verified-in-report only; not independently verified | adhd-executive-evidence | Executive dysfunction is cited as support for constrained action choice. |
| R3-E09 | KH-EVD-018 | evidence | current | unknown | - | H06, 36, verified-in-report only; not independently verified | cognitive-accessibility-evidence | W3C is cited as recommending limited interruptions for cognitive accessibility. |
| R3-E10 | KH-EVD-008 | evidence | current | unknown | - | H06, 38, verified-in-report only; not independently verified | batching-evidence | Longer email time is linked to stress; batching is linked to productivity. |
| R3-E11 | KH-EVD-019 | evidence | current | unknown | - | H16, 245, verified-in-report only; not independently verified | gmail-draft-evidence | Gmail API exposes drafts and `drafts.send`. |
| R3-E12 | KH-EVD-020 | evidence | current | unknown | - | H17, 264, verified-in-report only; not independently verified | distinct | Telegram Bot API is HTTP-based and suitable for short-command control. |
| R3-E13 | KH-EVD-021 | evidence | current | unknown | - | H19, 270, verified-in-report only; not independently verified | scope-evidence | Gmail message/mailbox scopes can be restricted and require verification. |
| R3-E14 | KH-EVD-022 | evidence | current | unknown | - | H20, 274, verified-in-report only; not independently verified | distinct | `apps-script-oauth2` recommends Properties/Cache/Lock and warns about refresh races. |
| R3-E15 | KH-EVD-019 | evidence | current | unknown | - | H21, 285, verified-in-report only; not independently verified | gmail-draft-evidence | Gmail API supports attachment retrieval and raw message/draft send. |
| R3-E16 | KH-EVD-023 | evidence | current | unknown | - | H22, 293-298, verified-in-report only; not independently verified | distinct | `clasp`, CodeQL, secret scanning and Dependabot are described as release/security controls. |
| R3-E17 | KH-EVD-024 | evidence | current | unknown | - | H28, 351, verified-in-report only; not independently verified | runtime-limits-evidence | Apps Script web apps are HTTP entrypoints; long work should use continuation or an external worker. |
| R3-E18 | KH-EVD-025 | evidence | current | unknown | - | H31, 372; H33, 414, verified-in-report only; not independently verified | distinct | Codex documentation is cited in support of context/tool/environment-aware workflows. |
| R3-E19 | KH-EVD-026 | evidence | unverified | blocked | - | H23, 302, verified-in-report only; not independently verified | distinct | Public indexing of `github.com/[PRIVATE]/gmail-telegram-controls` could not be confirmed. |
| R3-E20 | KH-EVD-027 | evidence | current | unknown | - | H08, 141, verified-in-report only; not independently verified | distinct | Gmail cards, `doGet`/`doPost`, Gmail API resources, `watch`, OAuth storage/locks and scope verification are cited as platform constraints. |
| R3-E21 | KH-EVD-028 | evidence | current | unknown | - | H10, 151-156, verified-in-report only; not independently verified | distinct | The report attributes contextual UI to add-ons, richer UX to web apps, automation to Gmail API, event reliability to Pub/Sub/Cloud Run and state control to Properties/Cache/Lock. |
| R3-E22 | KH-EVD-029 | evidence | current | unknown | - | H12, 162, verified-in-report only; not independently verified | clasp-evidence | `clasp` is described as Google's open-source local development/version/deployment route, with documented GitHub Actions use. |
| R3-E23 | KH-EVD-029 | evidence | current | unknown | - | H12, 202, verified-in-report only; not independently verified | clasp-evidence | `clasp` is described as supporting directory-based development. |
| R3-E24 | KH-EVD-021 | evidence | current | unknown | - | H13, 206, verified-in-report only; not independently verified | scope-evidence | Google is cited as requiring minimal permissions; add-ons need `addOns.gmail`; public sensitive/restricted-scope apps may need a standard Cloud project and verification. |
| R3-E25 | KH-EVD-018 | evidence | current | unknown | - | H14, 223, verified-in-report only; not independently verified | cognitive-accessibility-evidence | W3C cognitive-accessibility guidance and ADHD/depression research are cited for focus, fewer interruptions and reduced content. |
| R3-E26 | KH-EVD-030 | evidence | current | unknown | - | H15, 227, verified-in-report only; not independently verified | distinct | Gmail `watch()` uses Pub/Sub and `history.list`/`startHistoryId` for change synchronization. |
| R3-E27 | KH-EVD-024 | evidence | current | unknown | - | H15, 241, verified-in-report only; not independently verified | runtime-limits-evidence | Apps Script has execution limits; timeout-prone work is described as requiring state persistence and trigger continuation. |

## Coverage register

| Category | Count |
|---|---:|
| historical-artifact | 3 |
| instruction | 9 |
| decision | 9 |
| lesson | 4 |
| product | 30 |
| dependency | 13 |
| plan | 32 |
| permission-candidate | 1 |
| privacy | 3 |
| issue | 11 |
| evidence | 27 |

## Conflict references

- CF-001: Кількість CTA не узгоджена: одна домінантна/primary дія проти трьох contextual або 3-4 primary дій.
- CF-002: Telegram Bot API та provider-specific OAuth описані недостатньо розділено; фактична auth model не перевірена.
- CF-003: Кілька homepage-груп можуть суперечити цілі constrained choice; допустима щільність не визначена.
- CF-005: Streak за регулярний triage не узгоджено з ризиками публічних streaks, penalties та over-gamification.
- CF-006: Standalone/open mail-core roadmap і Gmail-centric hybrid roadmap мають різний product scope; report3 є primary foundation, але явно не скасовує ширший scope report2.
- CF-008: Lifecycle `superseded` у R1-004 прикріплено до твердження на користь Inbox Functional, яке пізніші матеріали підтримують; об'єкт supersession неоднозначний.

---

Source request / Джерело запиту: `REQ-0003`. Report-derived baseline; live claims require current-state verification.
