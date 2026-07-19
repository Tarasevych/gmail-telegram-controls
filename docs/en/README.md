# Gmail Telegram Controls: project guide

Current product version in development: **Versie 1 · 2026-07-19**.

This directory is the short entry point into the project. The latest release article is cumulative: it explains the full journey, current state, known problems, and verified solutions, so recovery does not require reading every historical document.

## Persistent files

- [Versioning](VERSIONING.md): sequential Versie numbers, immutable releases, branches, and tags.
- [Project and expectations](PROJECT.md): mission, boundaries, quality criteria, and data protection.
- [Roadmap](ROADMAP.md): completed, in progress, blocked, and next.
- [Problem register](ISSUES.md): concise `GT-*` records with status and target Versie.
- [Bilingual documentation](BILINGUAL_DOCUMENTATION.md): mandatory Ukrainian and English pairs with CI enforcement.
- [Versie 1 · 2026-07-19](releases/VERSIE-001-2026-07-19.md): complete cumulative history and release gates.

Українське дзеркало: [docs/uk/README.md](../uk/README.md).

## Evidence sources

- Code and local contracts: `apps-script/`.
- Historical audits: `docs/audit/`.
- Historical product decisions: `docs/product/`.
- Operational records: `docs/operations/`.
- Active research journal: `deep-research-report3.md`.

Secrets, OAuth codes, tokens, cookies, private mail, refresh tokens, and deployment-local configuration do not belong in Git.

Every page under `docs/en/` has a paired page at the same relative path under `docs/uk/`. Creating or changing only one language is blocked by an automated check.

## Structured knowledge hub

- [Start with the index](knowledge-hub/README.md)
- [Cumulative master roadmap](knowledge-hub/MASTER_ROADMAP.md)
- [Traceability for 295 source items](knowledge-hub/TRACEABILITY.md)

For routine continuation, do not reread the three large deep-research reports. Open the index and only the relevant thematic register.
