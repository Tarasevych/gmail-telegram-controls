# Bilingual GitHub documentation

Українське дзеркало: [docs/uk/BILINGUAL_DOCUMENTATION.md](../uk/BILINGUAL_DOCUMENTATION.md).

## Mandatory rule

Every published documentation page has Ukrainian and English versions at the same relative path:

- `docs/uk/<path>.md`;
- `docs/en/<path>.md`.

When a new page is created, both files are created together through `tools/create_bilingual_page.py`. When one language version changes, its counterpart must receive the semantically equivalent update in the same commit range.

Root or operational Markdown pages that do not use language directories must contain complete `Українською` and `English` sections in one file.

## Automated enforcement

`tools/check_bilingual_docs.py` verifies:

- identical Markdown path sets under `docs/uk` and `docs/en`;
- no empty language pages;
- both languages changed for every modified relative path;
- bilingual markers in shared root pages.

The `.github/workflows/bilingual-docs.yml` workflow runs this check for pushes and pull requests. A one-sided page or update fails the workflow and is not ready for publication.

Automated enforcement never substitutes a copied foreign-language page for a real translation. Both versions must convey equivalent meaning in natural language.
