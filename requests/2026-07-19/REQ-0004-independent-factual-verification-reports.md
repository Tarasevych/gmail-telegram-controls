# REQ-0004: Незалежні factual verification reports / Independent factual verification reports

- ID: REQ-0004
- Received: 2026-07-19
- Status: completed
- Active Versie: Versie 1
- Next Versie authorization: no
- Sensitive data persisted: no
- Routes: requests=record; instructions=update; permissions=reference; plan=update; product=update; release=no-change
- Permission basis: none

<!-- lang:uk -->
## Українською

## Інтерпретація запиту власника

- Створити окрему двомовну зону незалежних factual verification reports, відокремлену від summary, плану, журналу запитів і knowledge hub.
- Перевіряти реалізацію цільового проєкту, його частин і явно наданих власником повноважень за першоджерелами, а не успадковувати довіру від попередніх звітів.
- Подавати результат як атомарні твердження з категорією, актуальністю, статусом, залежностями, конфліктами, чутливістю, точним походженням, методом перевірки та обмеженнями.
- Для доказових тверджень наводити посилання на незмінний Git commit, файл реалізації або керування та сам verification report. Посилання на файл саме по собі підтверджує наявність, але не роботу функції в runtime.
- Використовувати стани `verified`, `contradicted`, `partial`, `unverified`, `blocked` і `recommendation`; окремо фіксувати рівень доказу від документального до production acceptance.
- Верифікувати permission-твердження лише проти канонічної гілки `Повноваження` та відповідного owner request. Рекомендації, припущення і report-derived candidates не стають повноваженнями.
- Перший звіт `VR-001` має незалежно перевірити 245 канонічних `KH-*` тверджень, сформованих у `REQ-0003`, проти Git-історії, коду, тестів, release-артефактів і канонічних governance-гілок.
- Після перевірки переносити у knowledge hub, план, проблеми й продукт лише явно промаркований результат, зберігаючи спростування, прогалини та конфлікти історично.
- Не читати повторно повні приватні deep-research reports без provenance gap, конфлікту або окремого передверсійного аудиту.
- Не змінювати runtime, Gmail, Telegram, Apps Script чи production; не створювати `Versie 2` без окремого прямого наказу власника.

## Критерії завершення

- `REQ-0004` опубліковано до основної перевірки.
- Є двомовні index, schema та evidence policy для verification reports.
- Є machine-readable claim ledger з рівно одним результатом для кожного з 245 `KH-*` ID.
- Кожен висновок містить provenance, verification status, scope, evidence grade, dependencies, conflicts, sensitivity і limitations.
- `verified` не присвоюється лише на підставі попереднього звіту; поведінкове твердження потребує тестового або runtime-доказу.
- `VR-001` містить окремі результати щодо реалізації, governance/permissions, проблем, релізів, конфліктів і рекомендацій.
- Внутрішні та GitHub-посилання машинно перевіряються; чутливі дані й приватні локальні шляхи не публікуються.
- Standing instruction, knowledge hub, project, roadmap та issues посилаються на актуальний verification result.
- Локальні checks і GitHub Actions проходять; `REQ-0004` отримує фінальний статус та commit evidence.
- `Повноваження`, runtime і поточна `Versie 1` release identity не змінені.

## Результат і докази виконання

- П'ять неперетинних read-only потоків дали рівно 245/245 унікальних `KH-*` результатів; приватні deep-research reports повторно не читалися.
- Підсумок: 17 `verified`, 13 `contradicted`, 82 `partial`, 35 `unverified`, 7 `blocked`, 91 `recommendation`.
- Рівні доказу: E0 24, E1 60, E2 145, E3 16, E4 0, E5 0.
- Безпечний локальний test suite завершився `399/399`; OAuth, network, staging, Telegram і production не викликалися.
- `91f7223585edce9ea7da341c33c843126a37d0d6`: двомовний `VR-001`, atomic ledger, machine JSON, evidence policy, validator/CI та інтеграція у `PROJECT`, `ROADMAP`, `ISSUES`, knowledge hub і `AGENTS.md` активної Versie 1.
- `a4601f84d1224657acdb388c9e99c0db671c224f`: standing factual-verification instruction у `Інструкції`.
- `0ffb133c33d9e4dca89b072bd8d41a1b2819c813`: стабільний двомовний entrypoint у `main`.
- `Повноваження` не змінювалися; report-derived permissions не стали owner authority.
- Поточний статично підтверджений ризик token-refresh concurrency зафіксовано як `GT-010`; решта historical/recommendation claims не перетворена на поточні defects автоматично.
- Local checks пройшли: 34 UK/EN пари, 295 source IDs, 245 exact-once claims, 8 явних baseline conflicts і перевірені immutable Git-object links.
- GitHub Actions успішні: [Verification reports](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29689619371), [Knowledge hub](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29689619369), [Bilingual active Versie](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29689619379), [Bilingual Instructions](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29689655943), [Bilingual main](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29689687112), [Pages](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29689686779).
- [Український VR-001](https://github.com/Tarasevych/gmail-telegram-controls/blob/codex/versie-001-2026-07-19/docs/uk/verification-reports/reports/VR-001/README.md) і [atomic ledger](https://github.com/Tarasevych/gmail-telegram-controls/blob/codex/versie-001-2026-07-19/docs/uk/verification-reports/reports/VR-001/CLAIMS.md) опубліковано.
- Runtime, Gmail, Telegram, Apps Script, deployment, secret state і release identity не змінено. Versie 2 не створена. B1-07-B1-09 та E4/E5 acceptance залишаються окремою незавершеною продуктовою роботою.

<!-- lang:en -->
## English

## Interpreted owner request

- Create a separate bilingual area for independent factual verification reports, distinct from summaries, plans, the request ledger, and the knowledge hub.
- Verify implementation of the target project, its parts, and explicitly owner-granted permissions against primary evidence rather than inheriting trust from prior reports.
- Represent results as atomic claims with category, relevance, status, dependencies, conflicts, sensitivity, exact provenance, verification method, and limitations.
- Evidence claims must link to an immutable Git commit, the implementation or governance file, and the verification report itself. A file link proves presence, not runtime behavior.
- Use the statuses `verified`, `contradicted`, `partial`, `unverified`, `blocked`, and `recommendation`, with a separate evidence grade from documentary evidence through production acceptance.
- Verify permission claims only against the canonical `Повноваження` branch and the corresponding owner request. Recommendations, assumptions, and report-derived candidates do not become authority.
- The first report, `VR-001`, must independently verify all 245 canonical `KH-*` claims produced by `REQ-0003` against Git history, code, tests, release artifacts, and canonical governance branches.
- Feed only explicitly classified results into the knowledge hub, plan, issues, and product areas while preserving contradictions, gaps, and conflicts historically.
- Do not reread the full private deep-research reports unless a provenance gap, conflict, or explicit pre-version audit requires it.
- Do not change runtime, Gmail, Telegram, Apps Script, or production, and do not create `Versie 2` without a separate explicit owner order.

## Completion criteria

- `REQ-0004` is published before the main verification work.
- Bilingual verification-report indexes, schema, and evidence policy exist.
- A machine-readable claim ledger contains exactly one result for each of the 245 `KH-*` IDs.
- Every result includes provenance, verification status, scope, evidence grade, dependencies, conflicts, sensitivity, and limitations.
- `verified` is never assigned solely from a prior report; behavioral claims require test or runtime evidence.
- `VR-001` has separate results for implementation, governance/permissions, issues, releases, conflicts, and recommendations.
- Internal and GitHub links are machine-checked; sensitive values and private local paths are not published.
- The standing instruction, knowledge hub, project, roadmap, and issues link to the current verification result.
- Local checks and GitHub Actions pass, and `REQ-0004` receives final status and commit evidence.
- `Повноваження`, runtime, and the current `Versie 1` release identity remain unchanged.

## Result and implementation evidence

- Five disjoint read-only streams produced exactly 245/245 unique `KH-*` results; the private deep-research reports were not reread.
- Totals: 17 `verified`, 13 `contradicted`, 82 `partial`, 35 `unverified`, 7 `blocked`, and 91 `recommendation`.
- Evidence grades: E0 24, E1 60, E2 145, E3 16, E4 0, and E5 0.
- The safe local test suite completed `399/399`; OAuth, network, staging, Telegram, and production were not invoked.
- `91f7223585edce9ea7da341c33c843126a37d0d6`: bilingual `VR-001`, atomic ledger, machine JSON, evidence policy, validator/CI, and integration into the active Versie 1 `PROJECT`, `ROADMAP`, `ISSUES`, knowledge hub, and `AGENTS.md`.
- `a4601f84d1224657acdb388c9e99c0db671c224f`: standing factual-verification instruction on `Інструкції`.
- `0ffb133c33d9e4dca89b072bd8d41a1b2819c813`: stable bilingual entrypoint on `main`.
- `Повноваження` was not changed; report-derived permissions did not become owner authority.
- The current statically confirmed token-refresh concurrency risk was recorded as `GT-010`; other historical/recommendation claims were not converted into current defects automatically.
- Local checks passed: 34 UK/EN pairs, 295 source IDs, 245 exact-once claims, eight explicit baseline conflicts, and verified immutable Git-object links.
- GitHub Actions succeeded: [Verification reports](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29689619371), [Knowledge hub](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29689619369), [Bilingual active Versie](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29689619379), [Bilingual Instructions](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29689655943), [Bilingual main](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29689687112), and [Pages](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29689686779).
- The [English VR-001](https://github.com/Tarasevych/gmail-telegram-controls/blob/codex/versie-001-2026-07-19/docs/en/verification-reports/reports/VR-001/README.md) and [atomic ledger](https://github.com/Tarasevych/gmail-telegram-controls/blob/codex/versie-001-2026-07-19/docs/en/verification-reports/reports/VR-001/CLAIMS.md) are published.
- Runtime, Gmail, Telegram, Apps Script, deployment, secret state, and release identity were not changed. Versie 2 was not created. B1-07 through B1-09 and E4/E5 acceptance remain separate unfinished product work.
