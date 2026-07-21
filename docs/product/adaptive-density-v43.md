# Product v43 — adaptive information density

Product v43 adds an account-scoped reading-density preference for people whose available attention and energy change during the day.

## Modes

- `auto` selects the view from the current energy preset: low energy becomes minimal, untimed becomes analytical, and the other presets remain standard.
- `minimal` keeps the summary and exactly three primary actions: reply, create a task, and snooze. Mail-management actions remain available under one secondary menu.
- `standard` preserves the ordinary complete reader.
- `analytical` expands grounded evidence and conversation history when present.

The setting is available both in Focus preferences and directly inside every open message. It is stored only for the exact Telegram user and Gmail connection with the existing revision check. The preference record contains no subject, sender, body, summary, attachment, or message identifier.

## Trust and accessibility boundaries

- Minimal mode never removes the original: the full message and conversation are one disclosure away.
- AI evidence is inside the same disclosure and remains visibly tied to the summary.
- Desktop and 390×844 mobile layouts keep a real vertical reader viewport without horizontal overflow.
- Explicit modes always override automatic energy mapping and can be changed from an ordinary Inbox message.

## Verification

- Targeted MailApp/MailClient contracts: 220/220 passed.
- Complete ordinary functional matrix: 368/368 passed.
- Rendered preview at desktop and 390×844: selector present exactly once, minimal mode has three primary actions, original opens in one click, analytical evidence opens automatically, and reader width equals scroll width.
- Independent read-only review drove four concurrency/visibility fixes; the final rereview reported no findings.
- QA artifacts are private and outside Git: `v43-adaptive-density-desktop.png` and `v43-adaptive-density-mobile.png` in the thread visualization directory.

This candidate is intentionally not deployed. Production remains immutable Apps Script v35/product v38.3 until a separately pinned release helper and fresh Telegram WebView acceptance exist.
