# Telegram markup migration

`migrate_telegram_markup.py` upgrades buttons on historical messages from
`@TarasevychGmailNotifierBot` after the new Apps Script version is deployed.
It does not touch Gmail or message text.

Safety properties:

- default mode is a read-only dry run and does not load the Bot API token;
- the durable Telethon SQLite session is opened with SQLite `mode=ro`; named
  authorization columns are copied into an in-memory session, so schema-order
  differences cannot corrupt or modify the durable session file;
- only messages sent by the exact allowlisted bot to the exact allowlisted
  owner are eligible;
- only the stable Apps Script deployment and the exact GitHub Pages bridge are
  recognized as migration sources;
- unknown buttons, malformed routes, or invalid Gmail IDs skip the complete
  message instead of producing a partial keyboard;
- URL, callback, copy-text, inline-query, game, and payment buttons are
  preserved when Telegram's Bot API can represent them exactly;
- a rollback snapshot is written before the first mutation and encrypted with
  Windows DPAPI for the current user; no plaintext file containing the old
  private Web App keys is created;
- the Bot API token is read from Windows Credential Manager only for apply or
  rollback and is never printed.

From `C:\Users\t\Documents\Telegram`:

```powershell
# Read-only inventory. This is always the first command.
.\.venv\Scripts\python.exe .\gmail-telegram-notifier\tools\migrate_telegram_markup.py --limit 500

# Add --verbose only when the complete list of message IDs is useful.
.\.venv\Scripts\python.exe .\gmail-telegram-notifier\tools\migrate_telegram_markup.py --limit 500 --verbose

# Apply only after reviewing the dry run and deploying the compatible server.
.\.venv\Scripts\python.exe .\gmail-telegram-notifier\tools\migrate_telegram_markup.py --limit 500 --apply --confirm "MIGRATE TarasevychGmailNotifierBot"

# Restore every original inline keyboard from a generated snapshot.
.\.venv\Scripts\python.exe .\gmail-telegram-notifier\tools\migrate_telegram_markup.py --apply --confirm "ROLLBACK TarasevychGmailNotifierBot" --rollback .\gmail-telegram-notifier\tools\rollback\telegram-markup-YYYYMMDDTHHMMSSZ.json.dpapi
```

Historical persistent reply keyboards (`KeyboardButtonSimpleWebView`) are
reported but intentionally not edited: `editMessageReplyMarkup` can only
change inline keyboards. Telegram already shows the most recent persistent
reply keyboard, which the current bot publishes as native text commands.

The migration converts legacy inline buttons as follows:

| Old action | New button |
| --- | --- |
| mailbox/thread | GitHub bridge Web App with only the canonical route |
| archive/trash/spam/unsubscribe | `m.a` / `m.t` / `m.s` / `m.u` native callback |
| `.eml` | `mail.eml:<gmail-id>` native callback |
| check/status/settings/help | native `mail.*` callback |
| legacy menu Web App | secure mailbox bridge (there is no deployed `mail.menu` callback) |
