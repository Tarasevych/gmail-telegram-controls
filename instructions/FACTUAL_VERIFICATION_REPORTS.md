# Незалежні factual verification reports / Independent factual verification reports

Source request: `REQ-0004`.

<!-- lang:uk -->
## Українською

## Призначення

Verification report є окремим доказовим шаром між source report, knowledge hub і поточними `PROJECT`, `ROADMAP`, `ISSUES` та product files. Він не успадковує довіру від summary: кожне твердження перевіряється атомарно за первинним доказом.

## Обов'язкова схема

- Кожен report отримує стабільний ID `VR-NNN`, дату, target branch і повний target commit.
- Кожен claim має ID, source IDs, категорію, актуальність, status, scope, evidence grade, implementation status, залежності, конфлікти, sensitivity, provenance, evidence links, limitations, дату й analysis stream.
- Дозволені statuses: `verified`, `contradicted`, `partial`, `unverified`, `blocked`, `recommendation`.
- Рівні доказу: `E0` report-only, `E1` Git/file presence, `E2` static implementation, `E3` local automated test, `E4` read-only staging/runtime, `E5` production acceptance.
- Наявність файла не доводить поведінку. `verified` test claim потребує E3+, runtime claim E4+, production claim E5.
- Git evidence URL містить повний immutable commit і реальний path. Доказ відсутності посилається на audited commit tree та описує метод пошуку.

## Незалежність і маршрутизація

- Великі набори claims розділяються на неперетинні аналітичні потоки; один claim має рівно один зведений результат у report ledger.
- Попередній report, knowledge-hub item або повторене формулювання є лише твердженням для перевірки, а не незалежним доказом.
- `verified`, `contradicted`, gaps і limitations переносяться до релевантного plan/problem/product розділу лише з посиланням на `VR-ID` і claim ID.
- Рекомендація не стає standing instruction без канонічної зміни в `Інструкції`.
- Permission claim не стає owner authority без прямого запису в `Повноваження` та traceable owner request у `Запити`.
- Нова Versie, release, deployment або runtime mutation потребує окремого прямого наказу; verification report сам цього не дозволяє.

## Історія і виправлення

- Опублікований report не видаляють і не переписують для приховування суперечності.
- Новий сильніший доказ створює новий report або явно трасовану correction-зміну з посиланням на попередній report і claim.
- Спростовані, часткові, заблоковані та невирішені записи зберігаються історично.
- Усі людські сторінки мають еквівалентні UK/EN пари; machine ledger проходить exact-count, evidence-link, Git-object і secret-hygiene validation.
- OTP, CAPTCHA, новий user-specific consent і небезпечна mailbox mutation не обходяться заради evidence grade.

<!-- lang:en -->
## English

## Purpose

A verification report is a separate evidence layer between a source report, the knowledge hub, and current `PROJECT`, `ROADMAP`, `ISSUES`, and product files. It does not inherit trust from a summary: every claim is verified atomically against primary evidence.

## Required schema

- Every report receives a stable `VR-NNN` ID, date, target branch, and full target commit.
- Every claim has an ID, source IDs, category, relevance, status, scope, evidence grade, implementation status, dependencies, conflicts, sensitivity, provenance, evidence links, limitations, date, and analysis stream.
- Allowed statuses are `verified`, `contradicted`, `partial`, `unverified`, `blocked`, and `recommendation`.
- Evidence grades are `E0` report-only, `E1` Git/file presence, `E2` static implementation, `E3` local automated test, `E4` read-only staging/runtime, and `E5` production acceptance.
- File presence does not prove behavior. A `verified` test claim requires E3+, a runtime claim E4+, and a production claim E5.
- A Git evidence URL contains a full immutable commit and real path. Absence evidence links to the audited commit tree and describes the search method.

## Independence and routing

- Large claim sets are split into disjoint analytical streams; one claim has exactly one consolidated result in the report ledger.
- A prior report, knowledge-hub item, or repeated statement is only a claim to test, not independent evidence.
- `verified`, `contradicted`, gaps, and limitations enter the relevant plan/problem/product area only with a `VR-ID` and claim-ID link.
- A recommendation does not become a standing instruction without a canonical change on `Інструкції`.
- A permission claim does not become owner authority without a direct `Повноваження` record and a traceable owner request on `Запити`.
- A new Versie, release, deployment, or runtime mutation requires a separate explicit order; a verification report does not authorize it.

## History and corrections

- A published report is not deleted or rewritten to hide a contradiction.
- New stronger evidence creates a new report or an explicitly traced correction linked to the prior report and claim.
- Contradicted, partial, blocked, and unresolved records remain in history.
- Every human page has an equivalent UK/EN pair; the machine ledger passes exact-count, evidence-link, Git-object, and secret-hygiene validation.
- OTP, CAPTCHA, new user-specific consent, and unsafe mailbox mutation are never bypassed to obtain an evidence grade.
