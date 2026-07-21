# REQ-0011: autonomous continuation and recovery authority

- ID: REQ-0011
- Received: 2026-07-21
- Status: completed
- Active Versie: Versie 1
- Next Versie authorization: no
- Routes: requests=record; instructions=update; permissions=update; plan=no-change; product=no-change; release=no-change
- Permission basis: explicit

<!-- lang:uk -->
## Українською

Власник дозволив агенту в межах фактично доступних засобів автономно використовувати проєктний ПК, підключені пристрої, браузер, мережу, Git/GitHub, Gmail та інші дозволені конектори; виконувати стандартні дії без повторного погодження; вести checkpoints і журнали; після збою відновлювати саме це завдання з останнього перевіреного стану; показувати короткий прогрес у чаті.

Джерела: повідомлення власника від `2026-07-21`, `Master_Prompt_Gmail_Telegram_KB_UA.md`, `Agent_Permissions_Gmail_Telegram_UA.md`. До Git вноситься лише очищена нормативна суть, без локальних секретів або приватних session artifacts.

Межі: не обходити CAPTCHA, 2FA/OTP, passkey/біометрію; не створювати оплату; не вимикати захисти; не виконувати force-push, переписування історії чи незворотні системні зміни; не публікувати credentials, приватні листи або session data. За неминучого ручного gate завершити незалежну роботу, зберегти checkpoint і попросити одну мінімальну дію.

<!-- lang:en -->
## English

The owner authorized the agent, within actually available tools, to autonomously use the project PC, connected devices, browser, network, Git/GitHub, Gmail, and other permitted connectors; perform routine actions without repeated approval; maintain checkpoints and logs; recover this same task from the last verified state after interruption; and provide concise progress in chat.

Sources: owner message dated `2026-07-21`, `Master_Prompt_Gmail_Telegram_KB_UA.md`, and `Agent_Permissions_Gmail_Telegram_UA.md`. Only the sanitized normative meaning is recorded in Git, without local secrets or private session artifacts.

Boundaries: do not bypass CAPTCHA, 2FA/OTP, passkeys/biometrics; do not create charges; do not disable safeguards; do not force-push, rewrite history, or make irreversible system changes; do not publish credentials, private mail, or session data. At an unavoidable manual gate, finish independent work, save a checkpoint, and request one minimal action.

## Routing

- `Запити`: record and completion evidence.
- `Інструкції`: add the durable autonomous recovery/logging rule.
- `Повноваження`: add only this owner-granted authority and its limits.
- Active Versie: continue `REQ-0010`; no new product version or release is authorized.

## Completion criteria

- This record is pushed before the authority/instruction edits.
- The relevant permission and instruction records are bilingual and sanitized.
- A same-thread recovery checkpoint records the exact resume state.
- Work resumes from the unfinished Stage 4 step without repeating completed authentication or analysis.

## Completion evidence: 9653434 / 976cba0

Status: `completed`
Completed: `2026-07-21`

- Sanitized owner request was published before derived changes in commit `bcd2509` on `Запити`.
- Explicit autonomous continuation authority was published as `P-006` in commit `9653434` on `Повноваження`.
- Standing autonomous recovery/logging protocol was published in commit `976cba0` on `Інструкції`.
- Same-thread local recovery checkpoint and an allowed ad-hoc memory note were created without secrets.
- Work resumed from the unfinished Stage 4 step; GitHub authentication and CI diagnosis were not repeated.
- The resumed documentation work reached green GitHub Actions at product commit `c98e69e`.
- No next Versie, immutable deployment, production promotion, or broader permission was created.
