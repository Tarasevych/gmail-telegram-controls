# Versioning and release immutability

Effective date: **2026-07-19**.

## Why numbering restarts at Versie 1

The history used parallel product and technical numbers v27-v47, so folder, product, web app, and Apps Script names could diverge. Starting with Versie 1, the product has one sequential line: **Versie 1, Versie 2, Versie 3, ...**. Gaps, returning to an old number, and parallel product releases are prohibited.

## Rules

1. New work is made only in the single active branch for the next Build.
2. After acceptance, immutable `release/build-NNN-YYYY-MM-DD` and tag `build-NNN-YYYY-MM-DD` are created.
3. A previous release is not edited. A correction belongs to the next Build and references the earlier problem.
4. `main` contains the latest verified public Build and its GitHub Pages.
5. The web app, Telegram menu label, release article, Git commit/tag, and production deployment must reference one Build.
6. The internal Apps Script immutable number cannot restart. It remains technical evidence in a mapping table but is not the product number.
7. Every Build article repeats the cumulative history, current capabilities, open problems, and test results, and links to the preceding article.
8. A hotfix also receives the next sequential Build instead of changing an old release.
9. A Build must not be marked `Released` until production, Telegram, and control functions have passed acceptance.

## Branches

- `codex/versie-001-2026-07-19`: the single active Versie 1 working branch.
- `release/versie-001-2026-07-19`: created only after successful production acceptance.
- `main`: latest verified public state.
- Old `codex/neuroinclusive-*` and technical branches remain read-only history.

## Versie 1 technical mapping

| Entity | Value |
|---|---|
| Product | Versie 1 · 2026-07-19 |
| Production at Versie 1 start | Apps Script immutable v37 |
| Historical staging | Apps Script immutable v38 |
| Planned Versie 1 immutable | Apps Script v39 |
| Stable deployment | unchanged deployment ID that must point to v39 after acceptance |

The release after Versie 1 can only be named **Versie 2**.
