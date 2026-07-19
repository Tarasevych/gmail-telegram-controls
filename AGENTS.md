# Project instructions / Інструкції проєкту

<!-- lang:uk -->
## Українською

### Обов'язковий журнал запитів перед виконанням

- Перед будь-якою продуктовою зміною оновити remote references і прочитати `INSTRUCTIONS.md`, `REQUESTS.md`, `instructions/REQUEST_POLICY.md` та запис поточного запиту з `origin/Інструкції`.
- До редагування product files, runtime, deployment або release state створити, перевірити, commit і push окремий двомовний очищений request record у гілці `Інструкції`.
- Записувати нормалізовану інтерпретацію, критерії та докази; ніколи не переносити до публічного журналу secrets, приватні листи, конкретні credential values, OTP або recovery values.
- Перед routine-роботою прочитати поточні `PROJECT`, `ROADMAP`, `ISSUES`, `VERSIONING`, останню release-статтю та індекс `PERMISSIONS.md`; з повноважень читати лише релевантний запис.
- Поточна робоча версія є Versie 1. Усі виправлення й доповнення належать їй, доки власник прямо не накаже створити конкретну наступну Versie.
- Не створювати наступну Versie, branch, release article, tag або immutable deployment за непрямим формулюванням. Потрібен новий request record із `Next Versie authorization: yes, Versie N`.
- Перед дозволеною наступною Versie прочитати всі tracked Markdown-сторінки `main`, `Інструкції`, `Повноваження` й активної Versie та зафіксувати повний pre-version audit.

### Двомовна документація є обов'язковою

- Кожна сторінка в `docs/uk/` має парну сторінку з тим самим відносним шляхом у `docs/en/`, і навпаки.
- Нову сторінку створювати тільки як дві мовні версії через `python tools/create_bilingual_page.py <relative-path> --uk-title "..." --en-title "..."`.
- Зміна змісту однієї версії вимагає змістовно еквівалентної зміни другої версії в тому самому commit range.
- Не копіювати український текст до англійського файлу або англійський до українського як заміну перекладу.
- Перед commit запускати `python tools/check_bilingual_docs.py`; для перевірки змін використовувати `--base <sha> --head <sha>`.
- Одностороння сторінка або зміна не є завершеною й не публікується.
- Кореневі спільні Markdown-файли мають містити повні секції `Українською` та `English`.
- Продуктові версії називаються лише Versie 1, Versie 2, Versie 3 тощо; термін Build не використовується як назва випуску.

<!-- lang:en -->
## English

### Mandatory request ledger before execution

- Before any product change, refresh remote references and read `INSTRUCTIONS.md`, `REQUESTS.md`, `instructions/REQUEST_POLICY.md`, and the current request record from `origin/Інструкції`.
- Before editing product files, runtime, deployment, or release state, create, validate, commit, and push a separate sanitized bilingual request record on the `Інструкції` branch.
- Record normalized interpretation, acceptance criteria, and evidence; never copy secrets, private mail, concrete credential values, OTP values, or recovery values into the public ledger.
- Before routine work, read the current `PROJECT`, `ROADMAP`, `ISSUES`, `VERSIONING`, latest release article, and the `PERMISSIONS.md` index; read only the relevant permission entry.
- The current working release is Versie 1. Every fix and addition belongs to it until the owner directly orders creation of a specific next Versie.
- Do not create a next Versie, branch, release article, tag, or immutable deployment from an indirect request. A new request record with `Next Versie authorization: yes, Versie N` is required.
- Before an authorized next Versie, read every tracked Markdown page from `main`, `Інструкції`, `Повноваження`, and the active Versie and record a full pre-version audit.

### Bilingual documentation is mandatory

- Every page under `docs/uk/` has a counterpart at the same relative path under `docs/en/`, and vice versa.
- Create a new page only as a language pair through `python tools/create_bilingual_page.py <relative-path> --uk-title "..." --en-title "..."`.
- A content change in one language requires a semantically equivalent change in the other language in the same commit range.
- Never copy Ukrainian text into the English file or English text into the Ukrainian file as a substitute for translation.
- Run `python tools/check_bilingual_docs.py` before commit; use `--base <sha> --head <sha>` to validate a change range.
- A one-sided page or update is incomplete and must not be published.
- Shared root Markdown files contain complete `Українською` and `English` sections.
- Product releases are named only Versie 1, Versie 2, Versie 3, and so on; Build is not a release name.
