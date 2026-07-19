# REPORT-1 source dossier

[Home](../README.md) | [Roadmap](../MASTER_ROADMAP.md) | [Traceability](../TRACEABILITY.md) | [English](../../../en/knowledge-hub/README.md)

> Чернетка knowledge hub. Усі твердження походять лише із санітизованих екстракцій звітів, не перевірені незалежно й не доводять live deployment або поточний стан.

Comprehensive table translation із catalog.json. Source text уже санітизовано; local paths, emails, secrets і account identifiers не відтворюються.

## Artifact metadata

| Field | Value |
|---|---|
| Report | R1 |
| Extraction artifact | deep-report1-extraction.md |
| Extraction bytes | 37538 |
| Extraction SHA-256 | 43e0b534b2ecbddb5d91a33ae1d6cd028003bdcd94274a49ce0e0d2a633b7ea8 |
| Reported original | deep-research-report.md |
| Reported original bytes | 47060 |
| Reported original SHA-256 | 49f1c7bffde5d613ae4a5782581da5f4a2204e0075f324734a95bd75117efe06 |
| Atomic items | 74 |
| Independent verification | not performed |

## Authority classification

- Explicit owner-granted quote: не виявлено.
- Permission candidate: R1-034.
- Усі recommendations та standing rules вимагають canonical branch reconciliation.

## Source items

| Source ID | Canonical | Category | Lifecycle | Implementation | Priority | Source span | Dedup group | Нормалізований текст |
|---|---|---|---|---|---|---|---|---|
| R1-001 | KH-ISS-001 | issue | current | unknown | ключова проблема | H1, 3 | distinct | Пошта створює потік мікрорішень, перемикань, часових оцінок і соціального тиску; РДУГ та депресія можуть перетворити це на параліч запуску. |
| R1-002 | KH-DEC-001 | decision | proposed | planned | ключовий висновок | H1, 5 | entry-threshold | Продукт має оптимізувати поріг входу, утримання контексту, найближчу дію та безсоромну взаємодію, а не лише швидкість обробки. |
| R1-003 | KH-DEP-001 | dependency | current | unknown | не зазначено | H1, 5 | distinct | WCAG 2.2 є базовим рівнем; для когнітивної доступності потрібні також W3C COGA-настанови. |
| R1-004 | KH-DEC-002 | decision | superseded | planned | стратегічний | Висновок, 9 | inbox-functional | Модель `Inbox Zero` відкидається на користь `Inbox Functional`: керований і посильний фронт роботи без вимоги порожнього інбоксу. |
| R1-005 | KH-INS-001 | instruction | proposed | planned | не зазначено | Висновок, 11 | distinct | Інтерфейс повинен мати одну домінантну дію, стабільний контекст, низьку щільність, явний прогрес, зрозумілі пріоритети й точне повернення після переривання. |
| R1-006 | KH-PROD-001 | product | proposed | planned | не зазначено | Висновок, 11 | distinct | AI має перетворювати лист на наступний крок, чернетку, нагадування, задачу або відкладену дію. |
| R1-007 | KH-EVD-001 | evidence | current | implemented | не зазначено | Висновок, 11 | distinct | `[verified-in-report only]` Gmail і Outlook мають окремі AI-функції, але не дають описаної цілісної нейроінклюзивної моделі. |
| R1-008 | KH-EVD-002 | evidence | current | unknown | не зазначено | Наукове підґрунтя, 15 | adhd-executive-evidence | `[verified-in-report only]` РДУГ пов'язується з труднощами уваги, завершення, організації, часу, форм, дедлайнів і пам'яті; корисними названо декомпозицію та зовнішню структуру. |
| R1-009 | KH-LES-001 | lesson | current | unknown | не зазначено | Наукове підґрунтя, 17 | distinct | Основна проблема часто полягає не в читанні листа, а в утриманні плану його подальшої обробки. |
| R1-010 | KH-EVD-003 | evidence | current | unknown | не зазначено | Наукове підґрунтя, 19 | time-evidence | `[verified-in-report only]` Часове сприйняття при РДУГ неоднорідне; `time blindness` подано як корисний, але спрощений ярлик. |
| R1-011 | KH-PROD-002 | product | proposed | planned | не зазначено | Наукове підґрунтя, 19 | time-framing | Потрібні різні часові режими: таймер, прогрес, м'який дедлайн і робота без секундоміра. |
| R1-012 | KH-EVD-004 | evidence | current | unknown | не зазначено | Наукове підґрунтя, 21 | distinct | `[verified-in-report only]` Мотиваційно-винагородні моделі пояснюють перевагу близької негайної винагороди над відкладеною рутинною користю. |
| R1-013 | KH-ISS-002 | issue | current | unknown | не зазначено | Наукове підґрунтя, 23 | distinct | Пуші, бейджі, банери й інші переривання можуть погіршувати фокус і самі бути частиною проблеми. |
| R1-014 | KH-INS-002 | instruction | proposed | planned | не зазначено | Наукове підґрунтя, 27 | one-next-action | Кожен лист слід зводити до одного наступного кроку. |
| R1-015 | KH-PROD-003 | product | proposed | planned | не зазначено | Наукове підґрунтя, 28 | batch-sessions | Вхідний потік має підтримувати batching, контроль interrupt-режимів і пріоритетні черги. |
| R1-016 | KH-PROD-002 | product | proposed | planned | не зазначено | Наукове підґрунтя, 29 | time-framing | Часові режими мають включати таймерний, прогресивний, м'який дедлайн і режим без таймера. |
| R1-017 | KH-PROD-004 | product | proposed | planned | не зазначено | Наукове підґрунтя, 30 | microprogress | Обробка пошти має використовувати короткі цикли, малі цілі, швидкі завершення й неманіпулятивні мікронагороди. |
| R1-018 | KH-EVD-005 | evidence | current | unknown | не зазначено | РДУГ і депресія, 34 | distinct | `[verified-in-report only]` Депресивні симптоми можуть перетворювати інбокс на нагадування про невиконані зобов'язання. |
| R1-019 | KH-EVD-006 | evidence | current | unknown | не зазначено | РДУГ і депресія, 36 | comorbidity-evidence | `[verified-in-report only]` Коморбідність РДУГ і депресії описана як підсилення організаційних, мотиваційних, емоційних і діагностичних труднощів. |
| R1-020 | KH-ISS-003 | issue | current | unknown | високий ризик | РДУГ і депресія, 38 | distinct | Червоні лічильники, агресивні нагадування, публічні streaks і осудлива мова можуть посилювати уникання та шкодити adoption і retention. |
| R1-021 | KH-PROD-005 | product | proposed | planned | не зазначено | РДУГ і депресія, 44 | smallest-action | За низької енергії сервіс має показувати найменшу можливу дію замість усього листа. |
| R1-022 | KH-INS-003 | instruction | proposed | planned | не зазначено | РДУГ і депресія, 45 | compassionate-rule | Осудливі формулювання слід замінити нейтральною та підтримувальною мовою. |
| R1-023 | KH-PROD-006 | product | proposed | planned | не зазначено | РДУГ і депресія, 46 | distinct | Для нерішучості потрібні готові рішення: `Reply later`, `Convert to task`, `Ask AI for draft`, `Archive with reminder`. |
| R1-024 | KH-INS-004 | instruction | proposed | planned | не зазначено | РДУГ і депресія, 47 | distinct | У фокус-режимі має бути не більше 3-4 первинних дій. |
| R1-025 | KH-DEC-003 | decision | proposed | planned | безпековий | РДУГ і депресія, 49 | distinct | Цифровий сервіс слід позиціонувати як допоміжний інструмент, а не заміну лікуванню або клінічну систему. |
| R1-026 | KH-INS-007 | instruction | proposed | planned | принцип 3 | Принципи, 73 | distinct | Система має мінімізувати втрату контексту та зберігати позицію, чернетку, тимчасову класифікацію, останню розмову й проміжні рішення. |
| R1-027 | KH-INS-003 | instruction | proposed | planned | принцип 4 | Принципи, 75 | compassionate-rule | Нагадування мають використовувати підтримувальну, неосудливу мову. |
| R1-028 | KH-INS-008 | instruction | proposed | planned | принцип 5 | Принципи, 77 | distinct | Персоналізація повинна бути адаптивною, сценарною та поступовою, з простими пресетами замість довгого налаштування. |
| R1-029 | KH-DEC-004 | decision | proposed | planned | принцип 6 | Принципи, 79 | distinct | AI має оркеструвати тертя, енергію, час, сором і незавершений контекст, а не бути лише summarizer. |
| R1-030 | KH-EVD-011 | evidence | current | implemented | не зазначено | Принципи, 79 | distinct | `[verified-in-report only]` Gmail має `AI Overview` і нагадування про дедлайни. |
| R1-031 | KH-EVD-012 | evidence | current | implemented | не зазначено | Принципи, 79 | distinct | `[verified-in-report only]` Outlook/Copilot має summary з цитатами, аналіз вкладень, пріоритизацію, створення правил та automatic replies. |
| R1-032 | KH-ISS-004 | issue | current | unknown | високий ризик | Принципи, 81 | distinct | AI-summary може бути неточним або зазнавати prompt injection через поштовий контент. |
| R1-033 | KH-INS-009 | instruction | proposed | planned | принцип 7 | Принципи, 81 | distinct | AI-summary має містити джерельні посилання, confidence indication і швидкий перехід до оригіналу. |
| R1-034 | KH-PERM-001 | permission-candidate | proposed | planned | критичний | Принципи, 81 | distinct | Високоризикові дії допускаються лише після explicit user confirmation; це запропонований permission gate, а не наданий дозвіл. |
| R1-035 | KH-PROD-007 | product | proposed | planned | реліз 1 | Специфікація, 89 | focus-surface | `Focus View`: один лист, прихований sidebar, максимум три дії: `Відповісти`, `Перетворити на задачу`, `Відкласти`. |
| R1-036 | KH-PROD-008 | product | proposed | planned | не зазначено | Специфікація, 90 | distinct | `Resume Rail`: остання розмова, точка зупинки та автозбереження position/state/partial triage. |
| R1-037 | KH-PROD-002 | product | proposed | planned | реліз 2 | Специфікація, 91 | time-framing | `Energy-aware time modes`: `5-хв sweep`, `3 листи`, `до наступної зустрічі`, `без таймера`. |
| R1-038 | KH-PROD-009 | product | proposed | planned | не зазначено | Специфікація, 92 | distinct | `Start Button`: почати з одного речення, summary, рішення або перенесення дати. |
| R1-039 | KH-PROD-010 | product | proposed | planned | реліз 1 | Специфікація, 93 | soft-reminders | `Compassionate copy system`: нейтральні й підтримувальні тексти без червоних осудливих сигналів. |
| R1-040 | KH-PROD-011 | product | proposed | planned | реліз 1 | Специфікація, 94 | task-triage | `Action Triage Pipeline`: `Дія`, `Чекаю`, `Інфо`, `Пізніше`, плюс автофільтри newsletters, receipts і system mail. |
| R1-041 | KH-PROD-012 | product | proposed | planned | реліз 1 | Специфікація, 95 | distinct | `Cited Summary`: summary, три ключові джерельні речення та блок `who/what/when/next-action`. |
| R1-042 | KH-PROD-013 | product | proposed | planned | безпековий | Специфікація, 96 | distinct | `Trust Layer`: AI-label, confidence band, показ джерел і підтвердження high-risk claims. |
| R1-043 | KH-PROD-014 | product | proposed | planned | реліз 1 | Специфікація, 97 | reply-assistance | `Low-pressure reply mode`: три стилі чернетки, `send later` увечері за замовчуванням і редаговане hold window. |
| R1-044 | KH-PROD-004 | product | proposed | planned | не зазначено | Специфікація, 98 | microprogress | `Micro-achievements`: малі завершення без азартних механік і streak penalties. |
| R1-045 | KH-PROD-010 | product | proposed | planned | реліз 1 | Специфікація, 99 | soft-reminders | `Soft reminder scheduler`: режими `м'яко`, `стандартно`, `лише digest` і групування в digest windows. |
| R1-046 | KH-PROD-015 | product | proposed | planned | реліз 2 | Специфікація, 100 | co-processing | `Co-processing mode`: 10-25-хвилинні сесії, shared room або AI-presence timer з gentle check-ins. |
| R1-047 | KH-PROD-016 | product | proposed | planned | не зазначено | Специфікація, 101 | distinct | `Neuroinclusive onboarding`: три кроки, прогрес, sticky summary, magic link/passkeys і стабільне розташування help. |
| R1-048 | KH-INS-010 | instruction | proposed | planned | не зазначено | Специфікація, 105 | distinct | Візуальний режим має використовувати мало кольорів, один акцент, великі targets, видимий focus state і регульовану щільність. |
| R1-049 | KH-PROD-017 | product | proposed | planned | не зазначено | Специфікація, 105 | distinct | Візуальні якорі: timeline треду, статус-стікери, прогрес сесії та pinned next step. |
| R1-050 | KH-PROD-018 | product | proposed | planned | критичний | Специфікація, 107 | smart-triage | Triage engine має послідовно відсікати шум, створювати cited summary і класифікувати лист у 4-5 широких категорій. |
| R1-051 | KH-PROD-019 | product | proposed | planned | реліз 2 | Специфікація, 107 | distinct | Календарні й task-based листи мають пропонувати подію, нагадування або чекліст. |
| R1-052 | KH-PROD-020 | product | proposed | planned | стратегічний | Специфікація, 109 | energy-ai | AI-асистент має змінювати кількість тексту, рішень і функцій відповідно до low/medium/high-energy режиму. |
| R1-053 | KH-PLAN-001 | plan | proposed | planned | стратегічний | Впровадження, 113 | distinct | Впровадження має бути еволюційним, а не `big bang`. |
| R1-054 | KH-PLAN-002 | plan | proposed | planned | реліз 1 | Впровадження, 113 | distinct | Реліз 1: Focus View, чотирикласовий triage, batching, soft reminders, compassionate copy, cited summary, low-pressure reply. |
| R1-055 | KH-PLAN-003 | plan | proposed | planned | реліз 2 | Впровадження, 113 | distinct | Реліз 2: energy modes, backlog rescue, calendar/task extraction, co-processing. |
| R1-056 | KH-PLAN-004 | plan | proposed | planned | реліз 3 | Впровадження, 113 | distinct | Реліз 3: персоналізоване навчання за часом доби, униканням, reminder style, triage speed та інформаційною щільністю. |
| R1-057 | KH-PLAN-005 | plan | proposed | planned | продуктово-дослідницький | Впровадження, 115 | distinct | Метрики мають охоплювати time-to-first-action, завершення без повторного відкриття, backlog recovery, resume time, reminder dismissals, overwhelm, guilt, adoption і retention. |
| R1-058 | KH-DEC-005 | decision | proposed | planned | стратегічний | Впровадження, 115 | distinct | Функціональне полегшення важливіше за vanity KPI на кшталт кількості прочитаних листів. |
| R1-059 | KH-ISS-005 | issue | proposed | unknown | найважливіший ризик | Впровадження, 117 | distinct | Перегейміфікація може стимулювати імпульсивне використання без довгострокової користі. |
| R1-060 | KH-ISS-006 | issue | proposed | unknown | найважливіший ризик | Впровадження, 117 | distinct | `AI overreach`: summary без цитат, непрозора логіка й автоматичні дії без підтвердження. |
| R1-061 | KH-ISS-007 | issue | proposed | unknown | найважливіший ризик | Впровадження, 117 | distinct | Low-energy mode провалиться, якщо не деградує до справді простого режиму. |
| R1-062 | KH-ISS-008 | issue | proposed | unknown | найважливіший ризик | Впровадження, 117 | distinct | Складна автентифікація, довгий onboarding і повторне введення даних створюють приховані бар'єри. |
| R1-063 | KH-PROD-021 | product | proposed | planned | підсумкова концепція | Впровадження, 119 | distinct | Цільова концепція: пошта бере на себе частину виконавчої функції, зменшує шум, пояснює пріоритет, зберігає контекст і декомпонує роботу. |
| R1-064 | KH-HIS-001 | historical-artifact | historical | unknown | міграційний | 3-119 | distinct | Вбудовані маркери виду `turn...view/search` є технічними provenance-посиланнями, які потрібно окремо розв'язати під час міграції. |
| R1-065 | KH-PRV-001 | privacy | unverified | unknown | не зазначено | 81, 95-96, 107-109 | distinct | Звіт описує AI-обробку поштового контенту, але не специфікує retention, data minimization, encryption, provider boundaries або видалення даних. |
| R1-066 | KH-EVD-007 | evidence | current | unknown | не зазначено | Реальні практики, 53 | distinct | `[verified-in-report only]` Нейровідмінні автори й користувачі описують `Inbox Functional` як практичнішу модель, ніж порожній інбокс. |
| R1-067 | KH-EVD-008 | evidence | current | unknown | не зазначено | Реальні практики, 55 | batching-evidence | `[verified-in-report only]` Користувачі описують batching і 1-4 короткі часові блоки як спосіб уникнути безперервного реагування. |
| R1-068 | KH-LES-002 | lesson | current | unknown | не зазначено | Реальні практики, 57 | distinct | `Action-only inbox` має залишати в inbox/unread лише те, що потребує дії; папки повинні бути широкими, а фільтри прибирати навіть невеликий регулярний шум. |
| R1-069 | KH-LES-003 | lesson | current | unknown | не зазначено | Реальні практики, 59 | distinct | Plain UI з текстом листа та трьома базовими діями корисніший за додаткові affordances і складні меню. |
| R1-070 | KH-EVD-009 | evidence | current | unknown | не зазначено | Реальні практики, 61 | distinct | `[verified-in-report only]` `Send later` та редагований проміжок перед надсиланням описані як засоби зниження тривоги й perfectionism-driven avoidance. |
| R1-071 | KH-EVD-010 | evidence | current | unknown | не зазначено | Реальні практики, 63 | distinct | `[verified-in-report only]` Body doubling, virtual co-working і легка присутність описані як практичний спосіб подолання бар'єра старту; email-specific evidence у звіті названо слабшим. |
| R1-072 | KH-LES-004 | lesson | current | unknown | не зазначено | Реальні практики, 65 | distinct | Техніки мікростарту мають зменшувати невизначеність і вимагати лише одного мінімального руху. |
| R1-073 | KH-INS-005 | instruction | proposed | planned | принцип 1 | Принципи, 69 | distinct | WCAG 2.2 слід трактувати як мінімум, а COGA як стандарт якості для структури, фокусу, пам'яті, summaries, персоналізації, human help і контролю переривань. |
| R1-074 | KH-INS-006 | instruction | proposed | planned | принцип 2 | Принципи, 71 | distinct | Focus mode має бути окремою інформаційною архітектурою з однією екранною задачею, а не косметичною темою. |

## Coverage register

| Category | Count |
|---|---:|
| issue | 8 |
| decision | 5 |
| dependency | 1 |
| instruction | 11 |
| product | 25 |
| evidence | 12 |
| lesson | 4 |
| permission-candidate | 1 |
| plan | 5 |
| historical-artifact | 1 |
| privacy | 1 |

## Unresolved source-count discrepancy

R1 manifest: evidence=11, lesson=5. Atomic rows: evidence=12, lesson=4. Total=74 in both. No row was invented or reclassified.

## Conflict references

- CF-001: Кількість CTA не узгоджена: одна домінантна/primary дія проти трьох contextual або 3-4 primary дій.
- CF-004: Evening send-later за замовчуванням не узгоджено з принципом короткої поступової персоналізації.
- CF-005: Streak за регулярний triage не узгоджено з ризиками публічних streaks, penalties та over-gamification.
- CF-007: Маніфест R1 заявляє evidence=11 і lesson=5, тоді як атомарна таблиця містить evidence=12 і lesson=4; total=74 збігається.
- CF-008: Lifecycle `superseded` у R1-004 прикріплено до твердження на користь Inbox Functional, яке пізніші матеріали підтримують; об'єкт supersession неоднозначний.

---

Source request / Джерело запиту: `REQ-0003`. Report-derived baseline; live claims require current-state verification.
