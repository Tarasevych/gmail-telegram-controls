# Gmail Telegram Controls

Top-level Telegram Mini App for `@TarasevychGmailNotifierBot`.

## Current project line

- Active development version: **Versie 1 · 2026-07-19**.
- Current public production remains the previously verified Apps Script v37 until Versie 1 completes acceptance.
- Product builds now advance only sequentially: Versie 1, Versie 2, Versie 3, and so on.
- Apps Script immutable numbers are technical deployment IDs, not product version names.
- One active development branch is used at a time; completed release branches and tags are immutable evidence.

Project guide: [Українська](docs/uk/README.md) | [English](docs/en/README.md)

Direct registers: [Problems / Проблеми](docs/uk/ISSUES.md) | [Roadmap / План](docs/uk/ROADMAP.md) | [Versie 1 history](docs/uk/releases/VERSIE-001-2026-07-19.md)

The repository preserves sanitized historical Apps Script baselines under `apps-script/` and the cumulative Versie 1 candidate. Product direction and verified audit evidence live under `docs/`. Runtime credentials, OAuth sessions, mailbox content, and deployment-local configuration are intentionally excluded from Git.

The page contains no Gmail credentials, bot token, chat ID, or permanent
mailbox credential. Telegram supplies signed `initData` at runtime. For the
mail client, this top-level page removes Telegram metadata from browser history
and sends `initData` in a same-window form POST to Apps Script; it never places
that value in the backend URL or client storage. Apps Script validates the
signature, owner, freshness, and one-use replay claim, then returns only a
60-second single-use launch nonce. MailApp redeems that nonce for an absolute
20-minute RPC session held only in JavaScript memory.

The bridge has a restrictive CSP, posts only to `script.google.com`, and
reconstructs deep-link state solely from allowlisted `view`, `folder`,
`thread`, `message`, `filter`, and `panel` fields. Telegram's `tgWebAppData`, platform, and version
fragment fields are never copied into the route. The CSP also permits Google
Apps Script's `script.google.com`/`script.googleusercontent.com` JSONP response
only for the temporary legacy-card compatibility path described below.

New mail cards use native Telegram `callback_data` for `.eml`, archive, trash,
spam, and RFC 8058 one-click unsubscribe, so these actions never open this page.
The page keeps backward compatibility with older cards: their action starts
immediately without a confirmation screen, requires both the private key and
fresh owner-bound Telegram `initData`, and closes automatically. Delete always
moves mail to Gmail Trash; it never performs permanent deletion.
