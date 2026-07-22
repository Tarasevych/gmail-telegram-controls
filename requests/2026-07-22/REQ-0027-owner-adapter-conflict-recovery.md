# REQ-0027: Owner adapter conflict recovery

- ID: REQ-0027
- Date: 2026-07-22
- Status: completed
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

<!-- REQ-0027-COMPLETION-EVIDENCE -->
## Доказ завершення / Completion evidence

- Scope status / Статус обсягу: `completed` for conflict recovery and verification only; source integration remains an open draft and is not deployed.
- Feature HEAD: `a6648ccb25b0f0d8cfc2384625ab5fc8f66ad91a`; normal merge of current `main`, with no force, reset, rebase, or history rewrite.
- Pull request: `#11`, `OPEN`, `DRAFT`, `CLEAN`.
- Tests: owner adapter `8/8`; full Apps Script suite `451/452` with the sole expected immutable-v57 source-hash guard mismatch because the candidate intentionally changes `Code.gs`.
- Documentation/tooling: bilingual docs `52` pairs; knowledge hub `17` pairs, `295` source IDs, `245` canonical items, `8` recorded conflicts; verification reports passed; tooling `3/3`; privacy scan `208` tracked text files and `0` high-confidence findings.
- GitHub checks passed: `29916165072`, `29916167216`, `29916164896`, `29916167227`, `29916164948`, `29916167209`.
- GitHub/GitLab feature-branch parity: exact HEAD `a6648ccb25b0f0d8cfc2384625ab5fc8f66ad91a`.
- Runtime boundary: production remains exact Apps Script `v57`; staging count remains `0`; protected adapter flag was not activated; no OAuth, Gmail, trigger, Telegram-menu, account, zone, immutable, staging, promotion, or deployment operation was performed.
- Source records / Джерела: `REQ-0024`, `REQ-0027`; PR `https://github.com/Tarasevych/gmail-telegram-controls/pull/11`.
