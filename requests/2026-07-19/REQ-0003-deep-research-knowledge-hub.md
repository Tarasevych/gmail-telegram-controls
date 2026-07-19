# REQ-0003: Маршрутизація deep-research reports у knowledge hub / Route deep-research reports into a knowledge hub

- ID: REQ-0003
- Received: 2026-07-19
- Status: recorded
- Active Versie: Versie 1
- Next Versie authorization: no
- Sensitive data persisted: no
- Routes: requests=record; instructions=update; permissions=reference; plan=update; product=update; release=no-change
- Permission basis: none

<!-- lang:uk -->
## Українською

## Джерела

Три локальні дослідницькі звіти з приватної робочої директорії: `deep-research-report.md`, `deep-research-report2.md`, `deep-research-report3.md`. Повні локальні шляхи та можливі приватні значення не публікуються. Хеші й очищений source manifest будуть додані після одноразового читання.

## Інтерпретація запиту власника

- Одноразово розібрати весь зміст трьох звітів і не змушувати наступних виконавців перечитувати їх повністю для routine-роботи.
- Розділити інформацію за окремими контурами: інструкції, повноваження, план, проблеми, продукт, рішення, досвід, докази та інші потрібні категорії.
- Створити відсутні двомовні GitHub-директорії й сторінки.
- Побудувати єдину навігацію та кумулятивну дорожню карту, яка вказує, що впроваджено, що виконується, що заблоковано і що заплановано.
- Зберегти походження кожного перенесеного пункту до конкретного source report без копіювання секретів або приватного вмісту.
- Надалі оновлювати лише релевантний структурований розділ і request record, а не повертатися до великих локальних звітів без окремої потреби.
- Не створювати Versie 2, не змінювати runtime, Gmail, Telegram, Apps Script або production цим запитом.

## Критерії завершення

- `REQ-0003` опубліковано до читання і маршрутизації змісту.
- Є двомовний source manifest із хешами та правилами приватності.
- Усі відтворювані вимоги, рішення, проблеми, функції, плани, уроки й докази зі звітів мають структуроване місце та source reference.
- Конфлікти й застарілі твердження не видаються за поточну істину: вони маркуються як historical, superseded, unverified або open.
- Є один двомовний hub index і одна зведена roadmap для routine-продовження.
- Відповідне standing instruction посилається на `REQ-0003`; `P-005` лише використано, а не розширено.
- GitHub checks проходять, а запис отримує фінальний статус і commit evidence.

<!-- lang:en -->
## English

## Sources

Three local research reports from a private working directory: `deep-research-report.md`, `deep-research-report2.md`, and `deep-research-report3.md`. Full local paths and possible private values are not published. Hashes and a sanitized source manifest will be added after the one-time read.

## Interpreted owner request

- Analyze all three reports once so routine future work does not require rereading them in full.
- Separate information into distinct areas: instructions, permissions, plan, issues, product, decisions, lessons, evidence, and any other required categories.
- Create missing bilingual GitHub directories and pages.
- Build one navigation layer and a cumulative roadmap showing implemented, in-progress, blocked, and planned work.
- Preserve provenance for every routed item to a specific source report without copying secrets or private content.
- In future, update only the relevant structured area and request record rather than returning to the large local reports without a specific need.
- Do not create Versie 2 or change runtime, Gmail, Telegram, Apps Script, or production through this request.

## Completion criteria

- `REQ-0003` is published before content reading and routing.
- A bilingual source manifest records hashes and privacy rules.
- Every reproducible requirement, decision, issue, feature, plan, lesson, and evidence item from the reports has a structured location and source reference.
- Conflicts and stale claims are not presented as current truth; they are marked historical, superseded, unverified, or open.
- One bilingual hub index and one cumulative roadmap support routine continuation.
- The relevant standing instruction links to `REQ-0003`; `P-005` is referenced but not expanded.
- GitHub checks pass and the record receives final status and commit evidence.