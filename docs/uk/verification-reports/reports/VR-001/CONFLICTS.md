# VR-001: конфлікти і спростування

[Звіт](README.md) | [Усі claims](CLAIMS.md) | [English](../../../../en/verification-reports/reports/VR-001/CONFLICTS.md)

Source request: `REQ-0004`.

Тут збережено всі claims зі статусом contradicted або явним conflict ID. Вони не видаляються після зміни фокусу; сильніший майбутній доказ створює трасоване оновлення або новий report.

| Claim | Статус | Рівень | Твердження |
|---|---|---|---|
| [KH-DEC-002](CLAIMS.md#kh-dec-002) | `recommendation` | `E1` | Мета - функціональний інбокс із низькою виконавчою вартістю, а не Inbox Zero. |
| [KH-DEC-006](CLAIMS.md#kh-dec-006) | `recommendation` | `E2` | Будувати продукт на відкритих стандартах і готовому open-source mail core; диференціюватися власними UI, AI та integration API. |
| [KH-DEC-007](CLAIMS.md#kh-dec-007) | `recommendation` | `E2` | Обирати Stalwart + власний web/mobile UX для modern-first B2C/B2B, Mailcow + custom frontend/BFF для швидкого MVP; orchestration layer лишати власним. |
| [KH-DEC-013](CLAIMS.md#kh-dec-013) | `recommendation` | `E2` | Базовий bridge будувати як Telegram Bot API + Mini App + власний backend + Gmail API; TDLib/user-account flow використовувати лише свідомо. |
| [KH-DEC-021](CLAIMS.md#kh-dec-021) | `partial` | `E2` | Попередні два звіти залишаються фоном, а report3 є новим головним технічним фундаментом. |
| [KH-DEC-022](CLAIMS.md#kh-dec-022) | `recommendation` | `E2` | Цільова архітектура має бути гібридною: Gmail add-on, web app і зовнішній event/worker layer. |
| [KH-DEP-017](CLAIMS.md#kh-dep-017) | `contradicted` | `E2` | Для зовнішніх OAuth providers використовувати apps-script-oauth2 з Properties, Cache і Lock practices. |
| [KH-EVD-007](CLAIMS.md#kh-evd-007) | `partial` | `E3` | [verified-in-report only] Нейровідмінні автори й користувачі описують `Inbox Functional` як практичнішу модель, ніж порожній інбокс. |
| [KH-EVD-016](CLAIMS.md#kh-evd-016) | `contradicted` | `E2` | Gmail add-ons use card UI; contextual triggers run for opened messages and are unconditional in the manifest. |
| [KH-EVD-020](CLAIMS.md#kh-evd-020) | `partial` | `E3` | Telegram Bot API is HTTP-based and suitable for short-command control. |
| [KH-HIS-005](CLAIMS.md#kh-his-005) | `contradicted` | `E2` | `gmail-telegram-v45-gentle-milestones` визначено поточним базовим артефактом. |
| [KH-INS-001](CLAIMS.md#kh-ins-001) | `recommendation` | `E2` | Інтерфейс повинен мати одну домінантну дію, стабільний контекст, низьку щільність, явний прогрес, зрозумілі пріоритети й точне повернення після переривання. |
| [KH-INS-002](CLAIMS.md#kh-ins-002) | `recommendation` | `E2` | Для кожного листа визначати одну візуально головну наступну дію. |
| [KH-INS-004](CLAIMS.md#kh-ins-004) | `recommendation` | `E2` | У фокус-режимі має бути не більше 3-4 первинних дій. |
| [KH-INS-008](CLAIMS.md#kh-ins-008) | `recommendation` | `E2` | Персоналізація повинна бути адаптивною, сценарною та поступовою, з простими пресетами замість довгого налаштування. |
| [KH-ISS-003](CLAIMS.md#kh-iss-003) | `unverified` | `E0` | Червоні лічильники, агресивні нагадування, публічні streaks і осудлива мова можуть посилювати уникання та шкодити adoption і retention. |
| [KH-ISS-005](CLAIMS.md#kh-iss-005) | `unverified` | `E0` | Перегейміфікація може стимулювати імпульсивне використання без довгострокової користі. |
| [KH-ISS-016](CLAIMS.md#kh-iss-016) | `contradicted` | `E2` | Очікуваний risk: external URL без whitelist/validation. |
| [KH-ISS-017](CLAIMS.md#kh-iss-017) | `contradicted` | `E2` | Очікуваний risk: unescaped HTML або user-generated strings. |
| [KH-ISS-018](CLAIMS.md#kh-iss-018) | `contradicted` | `E2` | Очікуваний risk: весь task state в одному large JSON blob у `PropertiesService`. |
| [KH-ISS-019](CLAIMS.md#kh-iss-019) | `contradicted` | `E2` | Очікуваний risk: inbox labels як єдине source of truth. |
| [KH-ISS-021](CLAIMS.md#kh-iss-021) | `contradicted` | `E2` | Очікуваний risk: one-shot polling loop, який мовчки завершується через execution limit. |
| [KH-ISS-023](CLAIMS.md#kh-iss-023) | `contradicted` | `E2` | Очікуваний risk: webhook без replay protection. |
| [KH-PLAN-008](CLAIMS.md#kh-plan-008) | `partial` | `E2` | Telegram flow: BotFather, Main Mini App, Allowed URLs, frontend, backend authentication та linkage між Telegram identity і internal account record. |
| [KH-PLAN-011](CLAIMS.md#kh-plan-011) | `contradicted` | `E2` | Цільова layered architecture: Stalwart/Mailcow core, власний integration facade, AI/task workers та smart web/mobile clients. |
| [KH-PLAN-027](CLAIMS.md#kh-plan-027) | `contradicted` | `E1` | Proposed tree розділяє `appsscript.json`, `src/addon`, `src/core`, `src/integrations`, `src/web`, `src/jobs`, `src/security`, `tests` і `.github/workflows/deploy.yml`. |
| [KH-PLAN-030](CLAIMS.md#kh-plan-030) | `contradicted` | `E2` | Event flow: mailbox change -> `watch` -> Pub/Sub -> Cloud Run consumer -> normalize/dedupe -> enqueue/call Apps Script -> update labels, digest, task state і Telegram output. |
| [KH-PLAN-036](CLAIMS.md#kh-plan-036) | `contradicted` | `E2` | Фактичний audit репозиторію не виконано через непідтверджену доступність/індексацію; наведено лише audit plan. |
| [KH-PLAN-047](CLAIMS.md#kh-plan-047) | `partial` | `E2` | `UX trace`: primary CTA count, digest tone, quiet mode і non-shaming backlog. |
| [KH-PROD-004](CLAIMS.md#kh-prod-004) | `partial` | `E2` | Винагороджувати конкретні малі завершення без азартних механік, об'ємних цілей або штрафів за streak. |
| [KH-PROD-007](CLAIMS.md#kh-prod-007) | `partial` | `E2` | Фокус-поверхня має бути низькощільною, одно-колонковою або картковою й не імітувати повний поштовий клієнт. |
| [KH-PROD-014](CLAIMS.md#kh-prod-014) | `verified` | `E2` | Надавати короткі, енерго-залежні шаблони відповіді та кероване відкладене надсилання без копіювання приватного вмісту. |
| [KH-PROD-037](CLAIMS.md#kh-prod-037) | `unverified` | `E2` | Gmail add-on є контекстною картковою поверхнею для швидкого triage. |
| [KH-PROD-041](CLAIMS.md#kh-prod-041) | `blocked` | `E2` | Мінімізувати cognitive load, decision fatigue, notification overwhelm і task paralysis. |
| [KH-PROD-043](CLAIMS.md#kh-prod-043) | `verified` | `E2` | Telegram Bot API є зовнішнім short-command і digest control surface. |
| [KH-PROD-045](CLAIMS.md#kh-prod-045) | `verified` | `E2` | Другий card level: три actions - quick reply, defer, convert to task. |
| [KH-PROD-047](CLAIMS.md#kh-prod-047) | `partial` | `E2` | Gmail homepage має показувати невеликий prioritized set: priority mail, quick win, short work block і waiting follow-up. |
