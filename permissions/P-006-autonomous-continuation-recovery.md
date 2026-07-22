# P-006: Автономне продовження і recovery / Autonomous continuation and recovery

Source request: `REQ-0011`
Amended by: `REQ-0030` (release-only exception governed by `P-009`)
Status: `active`
Granted by: project owner on `2026-07-21`

## Українською

### Надані повноваження

- Автономно продовжувати поточне завдання Versie 1 до доказового `COMPLETED` або справжнього manual blocker без повторного погодження стандартних технічних кроків.
- Використовувати фактично доступні засоби цього ПК, підключений кабелем пристрій, браузер, інтернет, shell, локальні програми, Git/GitHub, Gmail та дозволені конектори для проєктної роботи.
- Читати й змінювати релевантні проєктні файли, запускати тести та діагностику, створювати worktrees/branches, commits, pushes і PR у межах чинного request routing.
- Використовувати наявні авторизовані сесії та офіційні OAuth/device flows; викликати штатний password-manager autofill на перевіреному офіційному домені без читання, експорту або журналювання секрету.
- Створювати checkpoints, heartbeat де підтримується, безпечні тимчасові процеси та після збою/оновлення/перезапуску відновлювати саме це завдання з останнього перевіреного стану.
- Використовувати адміністративні права лише для конкретної необхідної дії, у мінімальному обсязі, з фіксацією причини.
- Показувати в чаті й project-safe log короткий прогрес, рішення, команди/результати та blockers без прихованих міркувань, system prompts або секретів.

### Незмінні межі

- Не обходити CAPTCHA, 2FA/OTP, passkey, біометрію або апаратний ключ. Завершити незалежну роботу, зберегти checkpoint і попросити одну мінімальну дію.
- Не створювати платні ресурси, покупки, billing changes або фінансові/юридичні зобов’язання.
- Не вимикати 2FA, SSO, branch protection, required checks, push protection, secret scanning, antivirus або firewall.
- Не виконувати force-push, rewrite history, видалення історичних branches/tags/repos або незворотні системні зміни без нової прямої вказівки й окремої safety-перевірки.
- Не експортувати й не публікувати passwords, tokens, cookies, OAuth codes, private keys, recovery values, приватні листи або session data.
- Цей дозвіл сам по собі не є дозволом на Versie 2, immutable release або production promotion. Release-дія потребує окремого active explicit authority; для bounded Versie 1 automation таким записом є `P-009`.

## English

### Granted authority

- Autonomously continue the current Versie 1 task to evidence-backed `COMPLETED` or a genuine manual blocker without repeated approval for routine technical steps.
- Use the actually available facilities of this PC, a cable-connected device, browser, internet, shell, local applications, Git/GitHub, Gmail, and permitted connectors for project work.
- Read and change relevant project files, run tests and diagnostics, and create worktrees/branches, commits, pushes, and PRs within the current request-routing rules.
- Use existing authorized sessions and official OAuth/device flows; invoke normal password-manager autofill on a verified official domain without reading, exporting, or logging the secret.
- Maintain checkpoints, a heartbeat where supported, and safe temporary processes; after interruption/update/restart, resume this same task from the last verified state.
- Use administrative privileges only for a concrete necessary action, at minimum scope, with the reason logged.
- Show concise progress, decisions, commands/results, and blockers in chat and a project-safe log without hidden reasoning, system prompts, or secrets.

### Fixed boundaries

- Do not bypass CAPTCHA, 2FA/OTP, passkeys, biometrics, or hardware keys. Finish independent work, save a checkpoint, and request one minimal action.
- Do not create paid resources, purchases, billing changes, or financial/legal commitments.
- Do not disable 2FA, SSO, branch protection, required checks, push protection, secret scanning, antivirus, or firewall.
- Do not force-push, rewrite history, delete historical branches/tags/repositories, or make irreversible system changes without a new direct instruction and separate safety verification.
- Do not export or publish passwords, tokens, cookies, OAuth codes, private keys, recovery values, private mail, or session data.
- This authority by itself does not authorize Versie 2, an immutable release, or production promotion. A release action requires separate active explicit authority; `P-009` provides that record for bounded Versie 1 automation.
