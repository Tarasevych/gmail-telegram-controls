# REQ-0021 — Gmail primary source, CI hardening, and publication surfaces

- ID: REQ-0021
- Date: 2026-07-21
- Status: completed
- Next Versie authorization: no
- Routes: requests=record; instructions=update; permissions=reference; plan=update; product=update; release=no-change
- Permission basis: explicit

<!-- lang:uk -->
## Українською

### Запит власника

1. Продовжити виправлення підтверджених проблем проєкту, зокрема повторюваних `Request ledger` і `Verification reports` failures, не переписуючи історичні commits.
2. На всіх релевантних рівнях закріпити Google Advanced Gmail Service як обов'язкове первинне джерело перед роботою над Gmail/Apps Script інтеграціями.
3. Запровадити подвійну публікацію GitHub + Google Developer Program Profile.

### Канонічні джерела

- Owner-provided session-qualified URL: <https://developers.google.com/apps-script/advanced/gmail?authuser=0>
- Stable canonical URL: <https://developers.google.com/apps-script/advanced/gmail>
- Advanced services guidance: <https://developers.google.com/apps-script/guides/services/advanced>
- Google Developer Program Profile FAQ: <https://developers.google.com/profile/help/faq>

### Factual resolution

- Advanced Gmail Service є офіційним первинним джерелом і має перевірятися до Gmail/Apps Script design або implementation work.
- Google Developer Program Profile не є Git repository, package registry або source-hosting service. Він підтримує профіль, social links (включно з GitHub/GitLab) і Saved Pages/collections.
- Тому буквальне дзеркало repository на `me.developers.google.com/u/me` неможливе і не повинно позначатися як виконане.
- Допустима альтернатива потребує окремого owner choice: Developer Profile як discovery/index surface із GitHub link і Saved Pages; фактичний source залишається в GitHub, а executable Apps Script — у versioned Apps Script project/deployments.

### Acceptance

- Додано fail-closed primary-source gate до канонічних Інструкцій.
- Додано двомовну source/publication policy у product docs.
- REQ schema отримує canonical template, parser diagnostics і regression tests.
- Verification validator зберігає LF-normalized hashing і надає field-specific diagnostics.
- Усі локальні та GitHub checks проходять.
- Жодної хибної заяви про repository mirror у Developer Profile немає.

<!-- lang:en -->
## English

### Owner request

1. Continue fixing confirmed project problems, including repeated `Request ledger` and `Verification reports` failures, without rewriting historical commits.
2. Establish Google Advanced Gmail Service at every relevant layer as a mandatory primary source before Gmail/Apps Script integration work.
3. Introduce dual publication across GitHub and Google Developer Program Profile.

### Canonical sources

- Owner-provided session-qualified URL: <https://developers.google.com/apps-script/advanced/gmail?authuser=0>
- Stable canonical URL: <https://developers.google.com/apps-script/advanced/gmail>
- Advanced services guidance: <https://developers.google.com/apps-script/guides/services/advanced>
- Google Developer Program Profile FAQ: <https://developers.google.com/profile/help/faq>

### Factual resolution

- Advanced Gmail Service is an official primary source and must be consulted before Gmail/Apps Script design or implementation work.
- Google Developer Program Profile is not a Git repository, package registry, or source-hosting service. It supports a profile, social links (including GitHub/GitLab), and Saved Pages/collections.
- A literal repository mirror at `me.developers.google.com/u/me` is therefore impossible and must not be reported as completed.
- The supported alternative requires a separate owner choice: use Developer Profile as a discovery/index surface with a GitHub link and Saved Pages; keep actual source in GitHub and executable Apps Script in versioned Apps Script projects/deployments.

### Acceptance

- Add a fail-closed primary-source gate to canonical Instructions.
- Add a bilingual source/publication policy to product documentation.
- Add a canonical REQ template, parser diagnostics, and regression tests.
- Preserve LF-normalized verification hashing and add field-specific diagnostics.
- Pass all local and GitHub checks.
- Make no false repository-mirror claim for Developer Profile.

## Evidence / Докази

- Canonical Instructions contain the fail-closed Gmail primary-source and publication policy; current `Інструкції` ref is `9079c19f4f4e04537f519c896607604331ca78b1`.
- Product documentation now registers the official Advanced Gmail, advanced-services, authorization, quota, and Gmail API sources in both languages.
- VR-004 publishes the project-specific multi-account compatibility boundary: owner-lane hybrid is a recommendation; external connections retain connection-scoped direct HTTP; quota reduction is `unverified`.
- Request-ledger schema/parser diagnostics and verification LF-normalized hashing/field diagnostics were merged through normal GitHub history; historical failed runs were not rewritten.
- Clean baseline passed 444/444 Node tests; current paired documentation reached 50 UK/EN pages; knowledge-hub and verification validators passed locally and in GitHub Actions.
- GitHub PR #10 merged normally as `660bc6a52e949925f1855dcaaf79ac5de9b2d188`; private GitLab `main` matches the same hash.
- No repository-mirror claim was made for Google Developer Program Profile, because it is not a source-hosting service. No Developer Profile mutation was performed without a separate owner choice.
- No new Versie, immutable release, production promotion, OAuth, Gmail, Telegram-zone, or Apps Script runtime mutation was authorized or performed by this request.
