# Автономне виконання і recovery / Autonomous execution and recovery

Source requests: `REQ-0011`, `REQ-0035`

## Українською

### Робочий цикл

1. Продовжувати тільки незавершену дію з останнього перевіреного checkpoint; checkpoint є підказкою, а не доказом завершення.
2. Перед зміною звірити фактичні worktree, HEAD/remote, незакомічені файли, активні процеси, auth state і зовнішній runtime, що стосується наступної дії.
3. Не дублювати активний process, agent, deployment, OAuth flow або recovery worker.
4. Після кожної матеріальної фази оновлювати `C:\Users\t\.codex\recovery\<thread-id>.md` атомарно.
5. Для recovery-sensitive task підтримувати same-thread goal і heartbeat кожні п’ять хвилин, якщо платформа це підтримує.
6. Перед restart завершити або безпечно зупинити writes, зберегти checkpoint, commit перевірені артефакти й push у відповідну remote branch.
7. Після restart спочатку перевірити live state й продовжити наступний незавершений крок; не повторювати auth, analysis, migrations або releases без доказової потреби.

### Resource leases і приватний ledger

- Перед browser, Telegram, phone, Gmail, release або Git write отримати task-scoped lease для точно визначеного ресурсу. Lease містить task/thread, resource, scope, acquired/renewed/expires timestamps і terminal release state без credentials.
- Один ресурс не може мати два активні mutation leases. За конфлікту зупинити mutation, перевірити live owner/process і не вважати прострочений запис доказом, що процес завершився.
- Перед reclaim stale lease звірити exact process/task/worktree/runtime identity. Не зупиняти процеси за загальною назвою та не застосовувати generic kill.
- Продовжувати lease лише під час фактичної роботи; після commit/push, runtime terminal state або blocker звільнити його й записати результат.
- Приватний recovery ledger зберігає hashes, coverage, resource leases, точні verified state transitions і next safe action. Публічні GitHub-артефакти містять лише sanitized висновки та evidence links.
- Git write lease не замінює branch rules: кожна logical change використовує окремий чистий worktree/branch, exact file allowlist, normal PR і remote SHA readback.

### Progress і evidence log

- У чаті повідомляти короткий статус перед material action і після отримання нового доказу.
- У checkpoint зберігати objective, verification criteria, workspace, verified progress, current/next action, blockers, modified state, process/task IDs, auth state без secret values, commit/push state і timestamp.
- Для команд фіксувати command purpose, exit code, стислий результат і час; не називати `PASS` те, що не запускалося.
- Не публікувати hidden reasoning, system/developer prompts, tokens, passwords, cookies, private mail або session material. Публікувати перевірюваний action/evidence trace.

### Manual gates

За CAPTCHA, OTP/2FA, passkey/біометрії, апаратного ключа, платежу, фізичної дії або істотного небезпечного незворотного вибору завершити всю незалежну роботу, оновити checkpoint і попросити одну мінімальну дію. Після втручання повторно перевірити фактичний стан і продовжити без повторення завершених кроків.

## English

### Work cycle

1. Continue only the unfinished action after the last verified checkpoint; a checkpoint is guidance, not proof of completion.
2. Before mutation, reconcile the relevant worktree, HEAD/remote, uncommitted files, active processes, authentication state, and external runtime for the next action.
3. Do not duplicate an active process, agent, deployment, OAuth flow, or recovery worker.
4. After every material phase, atomically update `C:\Users\t\.codex\recovery\<thread-id>.md`.
5. For recovery-sensitive work, maintain the same-thread goal and a five-minute heartbeat where the platform supports it.
6. Before restart, finish or safely stop writes, save the checkpoint, commit verified artifacts, and push the appropriate remote branch.
7. After restart, inspect live state first and continue the next unfinished step; do not repeat authentication, analysis, migrations, or releases without evidence that repetition is required.

### Resource leases and private ledger

- Before a browser, Telegram, phone, Gmail, release, or Git write, acquire a task-scoped lease for the exact resource. The lease records task/thread, resource, scope, acquired/renewed/expires timestamps, and terminal release state without credentials.
- A resource cannot have two active mutation leases. On conflict, stop the mutation, inspect the live owner/process, and never treat an expired record as proof that the process ended.
- Before reclaiming a stale lease, reconcile the exact process/task/worktree/runtime identity. Never stop processes by a generic name or use a generic kill.
- Renew a lease only while work is active; release it after commit/push, runtime terminal state, or a blocker, and record the result.
- The private recovery ledger stores hashes, coverage, resource leases, exact verified state transitions, and the next safe action. Public GitHub artifacts contain sanitized findings and evidence links only.
- A Git write lease does not replace branch rules: every logical change uses a separate clean worktree/branch, an exact file allowlist, a normal pull request, and remote SHA readback.

### Progress and evidence log

- Report concise status in chat before a material action and after obtaining new evidence.
- Record objective, verification criteria, workspace, verified progress, current/next action, blockers, modified state, process/task IDs, auth state without secret values, commit/push state, and timestamp in the checkpoint.
- For commands, record purpose, exit code, concise result, and time; never call an unrun check `PASS`.
- Do not publish hidden reasoning, system/developer prompts, tokens, passwords, cookies, private mail, or session material. Publish a verifiable action/evidence trace.

### Manual gates

At CAPTCHA, OTP/2FA, passkey/biometric, hardware key, payment, physical action, or a material unsafe irreversible choice, finish all independent work, update the checkpoint, and request one minimal action. After intervention, re-check actual state and continue without repeating completed steps.
