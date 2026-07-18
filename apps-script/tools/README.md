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

# Product v36 immutable staging and release

`release_apps_script_v30_product_v36.ps1` creates one immutable Apps Script v30
and a separate unique staging deployment while keeping the stable deployment on
v29 until explicit acceptance. Run each mode from the repository root and never
repeat a failed create blindly:

```powershell
# Always first; GET-only and safe to repeat.
pwsh -NoProfile -File .\apps-script\tools\release_apps_script_v30_product_v36.ps1 -PreflightOnly

# One guarded immutable version plus one unique staging /exec URL; stable stays v29.
pwsh -NoProfile -File .\apps-script\tools\release_apps_script_v30_product_v36.ps1 -StageOnly

# Only after real Telegram WebView acceptance of the returned staging URL.
pwsh -NoProfile -File .\apps-script\tools\release_apps_script_v30_product_v36.ps1 -Promote

# Only after stable v30 post-deploy verification.
pwsh -NoProfile -File .\apps-script\tools\release_apps_script_v30_product_v36.ps1 -CleanupStaging
```

The helper stores only release state and deployment identity in the protected
thread recovery directory. It reads OAuth material from the existing protected
`clasp` store, never emits it, and refuses automatic replay after an ambiguous
Google create response.

The migration converts legacy inline buttons as follows:

| Old action | New button |
| --- | --- |
| mailbox/thread | GitHub bridge Web App with only the canonical route |
| archive/trash/spam/unsubscribe | `m.a` / `m.t` / `m.s` / `m.u` native callback |
| `.eml` | `mail.eml:<gmail-id>` native callback |
| check/status/settings/help | native `mail.*` callback |
| legacy menu Web App | secure mailbox bridge (there is no deployed `mail.menu` callback) |
