# Project and expectations

Updated: **2026-07-19**. Current version in development: **Versie 1**.

## Mission

Build a safe, neuroinclusive Gmail client in Telegram for one owner and explicitly connected Gmail accounts: surface mail quickly, reduce cognitive load, support controlled actions, and never mix accounts, zones, or sessions.

## Product expectations

- One Gmail message does not create two Telegram cards.
- Every Gmail operation runs only for the explicitly selected account/connection.
- Adding Gmail opens Google immediately, and the callback returns to Telegram without a Drive error page.
- The Google profile photo is shown where available; an initial is fallback only.
- Desktop and mobile behavior are verified separately.
- Real Gmail mutations are not performed on arbitrary mail; acceptance uses an owner-controlled test message or a read-only check.
- OTP, CAPTCHA, new user-specific consent, and material manual choices remain owner intervention points.
- Every Versie has local tests, staging acceptance, production verification, a Git commit/tag, and rollback mapping.

## Source of truth

- Active code: the current Versie branch.
- Latest verified public release: `main` plus its release branch/tag.
- Current work: [ROADMAP.md](ROADMAP.md).
- Current defects: [ISSUES.md](ISSUES.md).
- Cumulative history: [Versie 1](releases/VERSIE-001-2026-07-19.md).

## Privacy and secrets

Public Git excludes bot tokens, OAuth client secrets, refresh/access tokens, authorization codes, cookies, Telegram `initData`, private chat IDs, email content, private attachments, and protected runtime properties. Git contains code, configuration templates, sanitized evidence, decisions, and the retrieval method for protected configuration without its values.

## Definition of Done for a Versie

- all claimed contracts pass;
- staging matches the exact commit;
- manual OAuth gates are completed by the owner;
- production points to this Versie's immutable;
- the Telegram menu opens the production Versie;
- no obsolete staging deployment or temporary process remains;
- UK/EN articles, the problem register, and roadmap are updated;
- the release branch/tag is created after verification, not before it.

## Cumulative knowledge base

The [knowledge hub](knowledge-hub/README.md) preserves sanitized, traceable context from the three deep-research reports. This file remains the current mission source; the hub is long-term context and never replaces live verification.

## Independent factual verification

[Verification reports](verification-reports/INDEX.md) are a separate evidence layer. `VR-001` classifies all 245 `KH-*` claims against primary Git artifacts and safe local tests. A `verified` status applies only within its declared scope; `E1/E2` does not prove runtime or production behavior. Source request: `REQ-0004`.
