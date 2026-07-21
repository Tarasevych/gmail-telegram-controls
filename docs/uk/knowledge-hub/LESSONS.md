# Уроки

[Home](README.md) | [Roadmap](MASTER_ROADMAP.md) | [Traceability](TRACEABILITY.md) | [English](../../en/knowledge-hub/README.md)

> Чернетка knowledge hub. Усі твердження походять лише із санітизованих екстракцій звітів, не перевірені незалежно й не доводять live deployment або поточний стан.

Уроки зберігають provenance і не замінюють перевірку застосовності.

| Canonical ID | Нормалізоване твердження | Source IDs | Lifecycle | Implementation | Конфлікти | Gate |
|---|---|---|---|---|---|---|
| KH-LES-001 | Основна проблема часто полягає не в читанні листа, а в утриманні плану його подальшої обробки. | [R1-009](sources/REPORT-1.md#source-items) | current | unknown | none | Перевірити застосовність до обраного scope й зафіксувати рішення. |
| KH-LES-002 | `Action-only inbox` має залишати в inbox/unread лише те, що потребує дії; папки повинні бути широкими, а фільтри прибирати навіть невеликий регулярний шум. | [R1-068](sources/REPORT-1.md#source-items) | current | unknown | none | Перевірити застосовність до обраного scope й зафіксувати рішення. |
| KH-LES-003 | Plain UI з текстом листа та трьома базовими діями корисніший за додаткові affordances і складні меню. | [R1-069](sources/REPORT-1.md#source-items) | current | unknown | none | Перевірити застосовність до обраного scope й зафіксувати рішення. |
| KH-LES-004 | Техніки мікростарту мають зменшувати невизначеність і вимагати лише одного мінімального руху. | [R1-072](sources/REPORT-1.md#source-items) | current | unknown | none | Перевірити застосовність до обраного scope й зафіксувати рішення. |
| KH-LES-005 | Не складати metadata, blobs, search і queues в одну БД; data plane має бути багатошаровим. | [R2-052](sources/REPORT-2.md#source-items) | proposed | planned | none | Перевірити застосовність до обраного scope й зафіксувати рішення. |
| KH-LES-006 | Описані user patterns: timed triage, archive/delete stale mail, fixed check windows, one quick email, calendar/snooze linkage. | [R2-061](sources/REPORT-2.md#source-items) | unverified | unknown | none | Перевірити застосовність до обраного scope й зафіксувати рішення. |
| KH-LES-007 | Frontend до стабільного mail core створює інтеграційну нестабільність; порядок робіт не слід інвертувати. | [R2-073](sources/REPORT-2.md#source-items) | proposed | planned | none | Перевірити застосовність до обраного scope й зафіксувати рішення. |
| KH-LES-008 | Time blindness, мотивацію та дофамін слід використовувати як design models, а не як єдине пояснення ADHD. | [R3-007](sources/REPORT-3.md#source-items) | current | unknown | none | Перевірити застосовність до обраного scope й зафіксувати рішення. |
| KH-LES-010 | Apps Script web app має бути thin ingress; heavy synchronous work треба дробити або виносити назовні. | [R3-062](sources/REPORT-3.md#source-items) | current | planned | none | Перевірити застосовність до обраного scope й зафіксувати рішення. |
| KH-LES-011 | Принцип роботи: minimum theory, maximum controlled verification, clear next actions і controlled progress. | [R3-082](sources/REPORT-3.md#source-items) | current | unknown | none | Перевірити застосовність до обраного scope й зафіксувати рішення. |
| KH-LES-009 | Repository tree є architectural recommendation, а не Google canonical structure; її мета - відокремити UI, business logic, integrations, background jobs і security. | [R3-101](sources/REPORT-3.md#source-items) | current | unknown | none | Перевірити застосовність до обраного scope й зафіксувати рішення. |

---

Source request / Джерело запиту: `REQ-0003`. Report-derived baseline; live claims require current-state verification.
