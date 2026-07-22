# REQ-0027: Owner adapter conflict recovery

- ID: REQ-0027
- Date: 2026-07-22
- Status: recorded
- Next Versie authorization: no
- Routes: requests=record; instructions=reference; permissions=reference; plan=update; product=update; release=no-change
- Permission basis: explicit

<!-- lang:uk -->
## Українською

### Нормалізований запит

- Продовжити незалежну роботу чинної `Versie 1`, не змінюючи заблокований release-контур Gmail-міток.
- Усунути документаційний merge conflict draft PR #11 нормальним merge актуального `main` у feature branch без rebase, force-push або переписування історії.
- Зберегти ізольований owner-only Advanced Gmail read adapter, external connection-scoped HTTP transport і fail-closed feature flag, але замінити застарілий release state лише актуальними перевіреними фактами.
- Перевірити adapter, повний product suite, двомовність, knowledge hub, verification reports, privacy hygiene та exact GitHub/GitLab branch parity.

### Критерії завершення

- PR #11 більше не має merge conflict і не втрачає новіші `main`-докази.
- Adapter лишається вимкненим за замовчуванням, не торкається external Gmail connections, mutations або unsupported reads і не робить hidden fallback після Advanced Service error.
- Targeted і повний локальні suites, документаційні валідатори, diff check та privacy scan мають точні результати.
- Перевірений commit публікується звичайним push у GitHub feature branch і приватний GitLab mirror; PR evidence оновлюється без merge у `main`.

### Межа

Немає дозволу активувати protected property, створювати immutable, staging чи production deployment, виконувати promotion, повторювати OAuth, змінювати Gmail records, trigger, Telegram menu, account mapping або zone. Поточний production exact v57 і staging count 0 мають бути збережені.

<!-- lang:en -->
## English

### Normalized request

- Continue independent work on the current `Versie 1` without changing the blocked Gmail-label release path.
- Resolve the documentation merge conflict in draft PR #11 by normally merging current `main` into the feature branch, without rebasing, force-pushing, or rewriting history.
- Preserve the isolated owner-only Advanced Gmail read adapter, external connection-scoped HTTP transport, and fail-closed feature flag while replacing stale release state only with current verified facts.
- Verify the adapter, full product suite, bilingual parity, knowledge hub, verification reports, privacy hygiene, and exact GitHub/GitLab branch parity.

### Completion criteria

- PR #11 no longer has a merge conflict and retains all newer `main` evidence.
- The adapter remains disabled by default, never affects external Gmail connections, mutations, or unsupported reads, and performs no hidden fallback after an Advanced Service error.
- Targeted and full local suites, documentation validators, diff check, and privacy scan have exact recorded results.
- The verified commit is published by ordinary push to the GitHub feature branch and private GitLab mirror; PR evidence is updated without merging into `main`.

### Boundary

There is no authority to activate the protected property, create an immutable, staging or production deployment, promote production, repeat OAuth, mutate Gmail records, change a trigger, Telegram menu, account mapping, or zone. Current production exact v57 and staging count 0 must be preserved.
