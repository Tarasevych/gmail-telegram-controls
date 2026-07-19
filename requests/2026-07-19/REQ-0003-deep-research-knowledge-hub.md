# REQ-0003: Маршрутизація deep-research reports у knowledge hub / Route deep-research reports into a knowledge hub

- ID: REQ-0003
- Received: 2026-07-19
- Status: completed
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

## Результат і докази виконання

- Джерела: `deep-research-report.md` (47 060 bytes, SHA-256 `49f1c7bffde5d613ae4a5782581da5f4a2204e0075f324734a95bd75117efe06`), `deep-research-report2.md` (58 865 bytes, `879a2e9de104dadc5d4dce23092ce55514d7420af804b355b106a185d2c24777`), `deep-research-report3.md` (48 401 bytes, `9c72d21ec4682beddef23e4b6b7d6f44b38f3ed5f53263834464a3fb44437cb2`).
- Покриття: `R1 74/74`, `R2 79/79`, `R3 142/142`, разом `295/295` source IDs.
- 295 source items дедупліковано у 245 canonical `KH-*` items; 8 конфліктів залишено явними.
- `2b3b9e2`: hub, catalog, manifest, validator і CI в активній Versie 1.
- `10630a5`: routine reading/update order у `Інструкції`.
- `4bd94b5`: стабільний двомовний entrypoint у `main` без product release.
- Knowledge-hub, bilingual і diff checks пройдені локально.
- `Повноваження` не змінювалися; report-derived candidates не стали дозволами.
- Runtime, Gmail, Telegram, Apps Script і production не змінювалися. Versie 2 не створена й не авторизована.

[Український routine entrypoint](https://github.com/Tarasevych/gmail-telegram-controls/blob/codex/versie-001-2026-07-19/docs/uk/knowledge-hub/README.md).
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

## Result and implementation evidence

- Sources: `deep-research-report.md` (47,060 bytes, SHA-256 `49f1c7bffde5d613ae4a5782581da5f4a2204e0075f324734a95bd75117efe06`), `deep-research-report2.md` (58,865 bytes, `879a2e9de104dadc5d4dce23092ce55514d7420af804b355b106a185d2c24777`), and `deep-research-report3.md` (48,401 bytes, `9c72d21ec4682beddef23e4b6b7d6f44b38f3ed5f53263834464a3fb44437cb2`).
- Coverage: `R1 74/74`, `R2 79/79`, `R3 142/142`, total `295/295` source IDs.
- The 295 source items were deduplicated into 245 canonical `KH-*` items; eight conflicts remain explicit.
- `2b3b9e2`: hub, catalog, manifest, validator, and CI on active Versie 1.
- `10630a5`: routine reading and update order on `Інструкції`.
- `4bd94b5`: stable bilingual entrypoint on `main` without a product release.
- Knowledge-hub, bilingual, and diff checks passed locally.
- `Повноваження` was not changed; report-derived candidates did not become authority.
- Runtime, Gmail, Telegram, Apps Script, and production were not changed. Versie 2 was neither created nor authorized.

[English routine entrypoint](https://github.com/Tarasevych/gmail-telegram-controls/blob/codex/versie-001-2026-07-19/docs/en/knowledge-hub/README.md).