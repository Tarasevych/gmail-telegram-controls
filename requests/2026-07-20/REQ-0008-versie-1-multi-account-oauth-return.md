# REQ-0008: Versie 1 multi-account OAuth return / Versie 1 multi-account OAuth return

- ID: REQ-0008
- Received: 2026-07-20
- Status: in_progress
- Active Versie: Versie 1
- Next Versie authorization: no
- Sensitive data persisted: no plaintext OAuth tokens, client secrets, Telegram tokens, cookies, or session credentials in Git
- Routes: requests=record; instructions=update; permissions=reference; plan=update; product=update; release=no-change
- Permission basis: explicit

<!-- lang:uk -->
## Українською

Власник наказав продовжити роботу без створення нової версії та виправити зламане повернення Google OAuth у Telegram. Versie 1 має отримати повноцінну multi-account архітектуру, one-click перемикання вже прив'язаних Gmail-акаунтів і швидке додавання нового акаунта через Google OAuth 2.0.

## Архітектурний напрямок

- OAuth transaction є одноразовою state-machine з nonce, Telegram user/chat binding, TTL, replay protection і server-side code exchange.
- Callback завершує account binding і повертає користувача до Telegram через безпечний deep link або WebApp handoff, не втрачаючи session context.
- Account registry зберігає масив Gmail account records для одного Telegram ID та окремий `active_account_id`.
- One-click switch використовує Telegram callback data, перевіряє owner binding і атомарно змінює active account.
- Credential material залишається лише у захищеному runtime storage; Git містить схеми, код і templates без secrets.

## Критерії завершення

- Визначено й виправлено точну callback/session причину.
- Кілька Gmail-акаунтів можуть бути прив'язані до одного Telegram ID без змішування токенів або mailbox state.
- One-click account switch працює через Telegram UI та backend contract.
- Add-account OAuth flow повертає підтверджений результат у Telegram.
- Локальні contract/tests проходять; зміни розподілено між product, issues, roadmap, instructions і verification.
- Commit і звичайний push виконано лише до активної Versie 1 та відповідних governance branches.

<!-- lang:en -->
## English

The owner ordered continued work without creating a new release and requested repair of the broken Google OAuth return to Telegram. Versie 1 must gain a complete multi-account architecture, one-click switching between linked Gmail accounts, and fast addition of a new account through Google OAuth 2.0.

## Architecture direction

- The OAuth transaction is a one-time state machine with nonce, Telegram user/chat binding, TTL, replay protection, and server-side code exchange.
- The callback completes account binding and returns the user to Telegram through a safe deep link or WebApp handoff without losing session context.
- The account registry stores multiple Gmail account records for one Telegram ID and a separate `active_account_id`.
- One-click switch uses Telegram callback data, validates owner binding, and atomically changes the active account.
- Credential material remains only in protected runtime storage; Git contains schemas, code, and secret-free templates.

## Completion criteria

- The exact callback/session failure is identified and repaired.
- Multiple Gmail accounts can be linked to one Telegram ID without token or mailbox-state mixing.
- One-click account switching works through the Telegram UI and backend contract.
- The add-account OAuth flow returns a verified result to Telegram.
- Local contract/tests pass; changes are routed across product, issues, roadmap, instructions, and verification.
- Commits and normal pushes target only active Versie 1 and the relevant governance branches.
