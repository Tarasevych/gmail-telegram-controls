# Project instructions / Інструкції проєкту

<!-- lang:uk -->
## Українською

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

### Bilingual documentation is mandatory

- Every page under `docs/uk/` has a counterpart at the same relative path under `docs/en/`, and vice versa.
- Create a new page only as a language pair through `python tools/create_bilingual_page.py <relative-path> --uk-title "..." --en-title "..."`.
- A content change in one language requires a semantically equivalent change in the other language in the same commit range.
- Never copy Ukrainian text into the English file or English text into the Ukrainian file as a substitute for translation.
- Run `python tools/check_bilingual_docs.py` before commit; use `--base <sha> --head <sha>` to validate a change range.
- A one-sided page or update is incomplete and must not be published.
- Shared root Markdown files contain complete `Українською` and `English` sections.
- Product releases are named only Versie 1, Versie 2, Versie 3, and so on; Build is not a release name.
