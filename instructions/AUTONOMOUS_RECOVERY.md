# Автономне виконання і recovery / Autonomous execution and recovery

Source request: `REQ-0011`

## Українською

### Робочий цикл

1. Продовжувати тільки незавершену дію з останнього перевіреного checkpoint; checkpoint є підказкою, а не доказом завершення.
2. Перед зміною звірити фактичні worktree, HEAD/remote, незакомічені файли, активні процеси, auth state і зовнішній runtime, що стосується наступної дії.
3. Не дублювати активний process, agent, deployment, OAuth flow або recovery worker.
4. Після кожної матеріальної фази оновлювати `C:\Users\t\.codex\recovery\<thread-id>.md` атомарно.
5. Для recovery-sensitive task підтримувати same-thread goal і heartbeat кожні п’ять хвилин, якщо платформа це підтримує.
6. Перед restart завершити або безпечно зупинити writes, зберегти checkpoint, commit перевірені артефакти й push у відповідну remote branch.
7. Після restart спочатку перевірити live state й продовжити наступний незавершений крок; не повторювати auth, analysis, migrations або releases без доказової потреби.

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

### Progress and evidence log

- Report concise status in chat before a material action and after obtaining new evidence.
- Record objective, verification criteria, workspace, verified progress, current/next action, blockers, modified state, process/task IDs, auth state without secret values, commit/push state, and timestamp in the checkpoint.
- For commands, record purpose, exit code, concise result, and time; never call an unrun check `PASS`.
- Do not publish hidden reasoning, system/developer prompts, tokens, passwords, cookies, private mail, or session material. Publish a verifiable action/evidence trace.

### Manual gates

At CAPTCHA, OTP/2FA, passkey/biometric, hardware key, payment, physical action, or a material unsafe irreversible choice, finish all independent work, update the checkpoint, and request one minimal action. After intervention, re-check actual state and continue without repeating completed steps.
