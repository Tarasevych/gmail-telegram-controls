# REQ-0020 — Stabilization and root-cause audit

- ID: REQ-0020
- Date: 2026-07-21
- Status: in_progress
- Next Versie authorization: no
- Routes: requests=record; instructions=update; permissions=reference; plan=update; product=no-change; release=no-change
- Permission basis: explicit
- Authority reference: REQ-0011 / P-006

<!-- lang:uk -->
## Українською

### Санітизоване трактування

Власник наказав припинити хаотичні виправлення, не змінювати код і провести повний stabilization/root-cause audit. Потрібно відокремити production-verified blocks від останнього candidate delta, зупинити лише dev/autofix процеси, зберегти фактичні незавершені зміни без змішування worktrees, створити ізольовану diagnostic branch, виконати diagnostic-only тести та оновити доступні GitHub status surfaces.

### Маршрутизація

- `Запити`: цей sanitized request, фактичний прогрес і завершальний evidence.
- `Інструкції`: додати постійний stabilization protocol із stable freeze, checkpoint discipline, isolated diagnostics і root-cause gate.
- `Повноваження`: лише reference на чинні `REQ-0011`/`P-006`; нового класу доступу не створювати.
- `План`: зафіксувати stable/problem boundary, diagnostic evidence і safe remediation sequence.
- `Продукт`: `no-change`; жодних code edits.
- `Release`: `no-change`; жодних deployment/promotion/rollback/trigger mutations.

### Критерії

- GitHub API та local Git history визначають останній production-verified commit і candidate boundary.
- Кожний worktree перевірено; checkpoint commit створюється лише якщо існує factual dirty state.
- Dev/autofix процеси зупинено; production Telegram service не плутається з development automation.
- Diagnostic branch ізольована без reset, rebase, force-push або зміни основних branches.
- Diagnostic-only tests/logs дають одну-дві доказові root causes і список stable blocks, яких не можна торкатися.
- Доступні GitHub Projects/Issues/PR surfaces отримують factual Done/Stable/Blocked status; недоступні surfaces позначаються `unavailable`, а не вигадуються.

### Межі

- Не змінювати code files, production runtime, deployment, trigger, OAuth state, Gmail records, Telegram zones або випадкові листи.
- Не виконувати `git add .` або checkpoint commit у чистому worktree.
- Не переносити dirty state між worktrees і не видаляти historical branches/tags/deployments.
- Не публікувати credentials, tokens, cookies, `initData`, identifiers, secret properties або private mail.

<!-- lang:en -->
## English

### Sanitized interpretation

The owner ordered an end to chaotic fixes, prohibited code changes, and requested a complete stabilization/root-cause audit. The work must separate production-verified blocks from the latest candidate delta, stop only development/autofix processes, preserve factual unfinished changes without mixing worktrees, create an isolated diagnostic branch, run diagnostic-only tests, and update available GitHub status surfaces.

### Routing

- `Запити`: this sanitized request, factual progress, and final evidence.
- `Інструкції`: add a standing stabilization protocol covering stable freeze, checkpoint discipline, isolated diagnostics, and the root-cause gate.
- `Повноваження`: reference current `REQ-0011`/`P-006` only; create no new authority class.
- Plan: record the stable/problem boundary, diagnostic evidence, and safe remediation sequence.
- Product: `no-change`; no code edits.
- Release: `no-change`; no deployment, promotion, rollback, or trigger mutations.

### Criteria

- GitHub API and local Git history identify the last production-verified commit and candidate boundary.
- Every worktree is inspected; a checkpoint commit is created only when factual dirty state exists.
- Development/autofix processes are stopped; the production Telegram service is not confused with development automation.
- The diagnostic branch is isolated without reset, rebase, force-push, or changing primary branches.
- Diagnostic-only tests/logs establish one or two evidence-backed root causes and the stable blocks that must not be touched.
- Available GitHub Projects/Issues/PR surfaces receive factual Done/Stable/Blocked status; unavailable surfaces are marked `unavailable`, never invented.

### Boundaries

- Do not change code files, production runtime, deployment, trigger, OAuth state, Gmail records, Telegram zones, or arbitrary mail.
- Do not run `git add .` or create a checkpoint commit in a clean worktree.
- Do not transfer dirty state between worktrees or delete historical branches/tags/deployments.
- Do not publish credentials, tokens, cookies, `initData`, identifiers, secret properties, or private mail.
