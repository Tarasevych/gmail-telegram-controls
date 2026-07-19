# REQ-0004: Незалежні factual verification reports / Independent factual verification reports

- ID: REQ-0004
- Received: 2026-07-19
- Status: recorded
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
