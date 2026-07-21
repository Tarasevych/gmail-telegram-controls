# Gmail → Telegram v26: multi-account / multi-user contract

## Identity and ownership

Every request is resolved through this tuple:

`bot identity → Telegram user ID → workspace/zone → role → Gmail connection ID`

- A valid Telegram HMAC proves the caller's Telegram identity; it does not by itself grant access to another person's mailbox.
- First launch creates an isolated personal workspace owned by that Telegram user.
- A user can connect any number of Gmail accounts to their personal workspace, choose one as active, and choose a subset for an aggregated inbox and notifications.
- Shared/family workspaces are optional and require a one-use invitation. Group membership alone never grants mail access.
- Existing `tarasevych.pavlo@gmail.com` remains the legacy owner connection during migration.

## Google authorization

The **Add Gmail account** button opens only Google's HTTPS authorization endpoint. Google handles account selection, login, password, MFA, CAPTCHA and consent. The bot and Mini App never accept or store a Gmail password.

The server uses authorization-code flow with:

- exact registered HTTPS redirect URI;
- one-use, ten-minute `state` bound to Telegram user ID and zone;
- `access_type=offline` for background synchronization;
- `prompt=select_account consent` so the user explicitly chooses the mailbox;
- Gmail `modify` plus OpenID email/profile identity;
- refresh tokens kept only in protected server storage, never in URLs, Telegram messages, browser storage or client DTOs.

Revocation, expired refresh tokens and partial scopes must become an explicit `reauth_required` connection state without affecting the other Gmail accounts.

For durable background access, the Google OAuth app cannot remain indefinitely in **Testing**: external test-user authorizations that include Gmail scopes expire after seven days. A family pilot can use an explicit test-user list, but a broadly available service must use an **In production** OAuth app; unapproved sensitive scopes show an unverified-app warning and are subject to Google's lifetime new-user cap, so public scale requires Google verification, a public homepage/privacy policy and scope justification.

## Account-safe UI and actions

- The account panel lists only connections visible to the authenticated Telegram user.
- Every list row and opened thread carries an opaque connection ID and visible Gmail address/avatar.
- Compose shows the exact sending account. Changing the global selection must not retarget an already opened thread or in-flight action.
- Telegram mail cards show the Gmail address when more than one account is enabled.
- Callback payloads contain or resolve a short opaque connection reference; the backend checks it against the Telegram user before touching Gmail.
- Message IDs are scoped by connection. A Gmail ID from one account is never sufficient to authorize an action in another account.

## Independent attachment-source accounts

The sending Gmail connection and the file-storage connection are separate selections. A user can send from Gmail A while attaching a file from Google Drive B or Box C.

- Every Drive/Box authorization belongs to exactly one verified Telegram user and is listed only in that user's source picker.
- Each source reference contains an opaque `sourceConnectionId`; file metadata, preview, download and draft-save all re-authorize that ID server-side.
- Switching the active Drive/Box account affects only future picker searches. Files already staged in a draft keep their original source connection.
- Google Drive uses its own OAuth grant with `drive.readonly`, offline refresh access, account chooser and a one-use state. It does not silently reuse the active Gmail account.
- Provider passwords are entered only on the provider's official page and are never accepted by the bot or Mini App.
- The legacy single-owner Box connection must remain a compatibility path until its token store is migrated to the same per-user, multi-connection registry; it must not be presented as multi-account before that migration passes isolation tests.

## Roles

- `viewer`: read mail and attachments;
- `responder`: viewer plus drafts/replies/sending;
- `manager`: responder plus labels, archive/trash/spam, account notification settings;
- `admin`: manager plus connect/disconnect accounts and manage members;
- `owner`: full workspace lifecycle and role administration.

Permissions are checked server-side for every operation. UI hiding is only a convenience.

## Storage and scaling

The Apps Script `ScriptProperties` adapter is a migration/pilot store for the current owner and a small family. It has hard Google quotas and therefore cannot honestly provide an unlimited service.

Before public or large-family rollout, the same registry interface must use a partitioned durable backend:

- Firestore documents partitioned by bot, Telegram user, zone and connection;
- refresh credentials encrypted at rest, with access limited to the backend service identity; Cloud KMS/Secret Manager where available;
- per-user/account cursors for Gmail History and notification delivery;
- audit records containing opaque IDs and outcomes, never tokens or message bodies;
- quotas/rate limits reported explicitly, with no fixed UI limit such as 2/5/10 accounts.

Logical account count is therefore unbounded by product code, but real Google, Telegram and infrastructure quotas always apply and must be surfaced honestly.

## Release boundary

v25 production remains owner-only until all v26 isolation, OAuth replay, revocation, callback-account binding, per-user webhook and multi-account synchronization tests pass. Connecting the first additional Gmail account requires the actual account holder to select the exact Google account and complete any consent/MFA/CAPTCHA on Google's page.
