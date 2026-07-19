# Project instructions / Інструкції проєкту

<!-- lang:uk -->
## Українською

### Структурована маршрутизація запитів до виконання

- Канонічна історія звернень міститься тільки в гілці `Запити`. `Інструкції` містить нормативні правила, а `Повноваження` лише прямо надані дозволи.
- Перед зміною коду, документації, плану, проблем, runtime, deployment, інструкції або повноваження оновити remote references і прочитати `REQUESTS.md`, `REQUEST_ROUTING.md`, `requests/REQUEST_POLICY.md` та запис поточного `REQ-ID` з `origin/Запити`.
- До виконання створити, перевірити, commit і push окремий двомовний очищений запис у `Запити`. Одне повідомлення розділити на логічні частини й для кожної вказати маршрут.
- Кожен запит завжди йде в `Запити`. До `Інструкції` вносити лише постійні правила процесу. До `Повноваження` вносити лише явно наданий, змінений, обмежений або відкликаний власником дозвіл; дозволи не припускати.
- План, реєстр проблем, документацію або код активної Versie змінювати лише за відповідною частиною запиту. Нерелевантні гілки й записи не читати та не змінювати.
- Для routine-роботи після request record починати з `docs/uk/knowledge-hub/README.md` активної Versie та читати лише потрібний тематичний реєстр; source dossiers і великі deep-research reports відкривати лише для provenance gap або конфлікту.
- Перед використанням report-derived твердження прочитати його запис в актуальному `docs/uk/verification-reports/INDEX.md`; repository-доказ не прирівнювати до test, runtime або production acceptance.
- Кожна похідна зміна має посилатися на `REQ-ID`. Після виконання оновити канонічний запис статусом і commit, test або deployment evidence.
- Ніколи не переносити до публічного журналу secrets, приватні листи, конкретні credential values, OTP, recovery values або приватний вміст повідомлень.
- Поточна робоча версія є Versie 1. Наступну Versie, branch, article, tag чи immutable deployment не створювати без прямого наказу й поля `Next Versie authorization: yes, Versie N`.
- Перед дозволеною наступною Versie прочитати всі tracked Markdown-сторінки `main`, `Запити`, `Інструкції`, `Повноваження` та активної Versie й зафіксувати повний аудит.

### Двомовна документація є обов'язковою

- Кожна сторінка в `docs/uk/` має парну сторінку з тим самим відносним шляхом у `docs/en/`, і навпаки.
- Нову сторінку створювати тільки як дві мовні версії через `python tools/create_bilingual_page.py <relative-path> --uk-title "..." --en-title "..."`.
- Зміна змісту однієї версії вимагає змістовно еквівалентної зміни другої версії в тому самому commit range.
- Перед commit запускати `python tools/check_bilingual_docs.py`.
- Кореневі спільні Markdown-файли мають містити повні секції `Українською` та `English`.
- Продуктові версії називаються лише Versie 1, Versie 2, Versie 3 тощо; термін Build не використовується як назва випуску.

<!-- lang:en -->
## English

### Structured request routing before execution

- Canonical request history exists only on `Запити`. `Інструкції` contains normative rules, while `Повноваження` contains only explicitly granted authority.
- Before changing code, documentation, plans, issues, runtime, deployment, instructions, or permissions, refresh remote references and read `REQUESTS.md`, `REQUEST_ROUTING.md`, `requests/REQUEST_POLICY.md`, and the current `REQ-ID` record from `origin/Запити`.
- Before execution, create, validate, commit, and push a separate sanitized bilingual record on `Запити`. Split one message into logical parts and declare the route for each part.
- Every request always goes to `Запити`. Update `Інструкції` only for standing process rules. Update `Повноваження` only when the owner explicitly grants, changes, narrows, or revokes authority; never infer authority.
- Change the active Versie's plan, issue register, documentation, or code only for the applicable request part. Do not read or change unrelated branches or records.
- For routine work after the request record, start from the active Versie's `docs/en/knowledge-hub/README.md` and read only the relevant thematic register; open source dossiers or large deep-research reports only for a provenance gap or conflict.
- Before relying on a report-derived claim, read its record through the current `docs/en/verification-reports/INDEX.md`; repository evidence is not equivalent to test, runtime, or production acceptance.
- Every derived change references its `REQ-ID`. After execution, update the canonical record with status and commit, test, or deployment evidence.
- Never copy secrets, private mail, concrete credential values, OTP values, recovery values, or private message content into the public ledger.
- The current working release is Versie 1. Do not create a next Versie, branch, article, tag, or immutable deployment without a direct order and `Next Versie authorization: yes, Versie N`.
- Before an authorized next Versie, read every tracked Markdown page from `main`, `Запити`, `Інструкції`, `Повноваження`, and the active Versie and record a full audit.

### Bilingual documentation is mandatory

- Every page under `docs/uk/` has a counterpart at the same relative path under `docs/en/`, and vice versa.
- Create a new page only as a language pair through `python tools/create_bilingual_page.py <relative-path> --uk-title "..." --en-title "..."`.
- A content change in one language requires a semantically equivalent change in the other language in the same commit range.
- Run `python tools/check_bilingual_docs.py` before commit.
- Shared root Markdown files contain complete `Українською` and `English` sections.
- Product releases are named only Versie 1, Versie 2, Versie 3, and so on; Build is not a release name.
