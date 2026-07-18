# Work log

## 2026-07-18 — v32 explicit send-later Mini App controls

- Created `codex/neuroinclusive-v32-send-later-ui` from the exact verified v31 backend commit; the separate undeployed v30 reply-starter branch remains isolated.
- Added an explicit `Надіслати пізніше` panel with two user-chosen presets, a local date/time field, schedule, reschedule, cancellation, and authoritative schedule-state reload for existing Gmail drafts.
- A new schedule first validates the compose fields and obtains a confirmed canonical Gmail draft. The UI then calls only the account-bound v31 scheduling RPC; it never calls `sendDraft` while scheduling.
- Preserved the schedule operation ID across canonical Gmail draft redraws so a lost response can retry the exact operation. Reschedule and cancel use the server revision.
- Existing scheduled or sending drafts are edit-locked. Ordinary `Надіслати` cannot bypass an active schedule, and a failed schedule-state read locks editing/sending until an explicit successful recheck.
- Scheduling closes the editor only after the server returns authoritative `scheduled`. Cancellation unlocks the draft only after authoritative `cancelled`.
- Desktop and 390x844 Chrome rendered QA found and fixed an undefined date formatter and a mobile panel that overflowed 125 px beyond the left viewport. Final desktop and mobile panels stay within the viewport; mobile body width is exactly 390 px, the editor remains scrollable, and Escape closes only the schedule panel.
- Final targeted regression: 210/210 passed. Final ordinary functional regression: 343/343 passed. `git diff --check` passed and the bounded changed-file secret scan found zero matches.
- Private captures are outside Git under the thread visualization directory. Local QA port 8765 was stopped after verification.
- Production remains immutable Apps Script v29. No deployment, OAuth, migration, trigger mutation, real Gmail draft/message, Telegram card, attachment, provider object, browser account, or phone state was changed.

## 2026-07-18 — v31 durable send-later backend candidate

- Branched `codex/neuroinclusive-v31-send-later` from the exact verified production-v29 evidence commit; the undeployed v30 reply UI was not mixed into this backend phase.
- Added account-bound schedule, list, reschedule, and cancel RPCs with optimistic revision checks and explicit `viewer`/`responder` role boundaries.
- Added a bounded Script Properties journal containing only Telegram user ID, Gmail connection ID, draft ID, stable Message-ID, due time, timezone, state, revision, lease/retry metadata, and final Gmail IDs. No mail content or attachment metadata is persisted.
- Added the send-later worker to the existing one-minute trigger; no second trigger or migration was created. Each run processes at most three rows.
- Reused the existing draft-send operation journal for at-most-once Gmail delivery. After an uncertain POST, retries use Sent readback even when Gmail has already removed the draft, and never issue a second POST.
- Added two-minute lease fencing, bounded exponential retry, eight-attempt `needs_review`, exact-account access revalidation, draft Message-ID change detection, global/per-account caps, terminal retention, and fail-closed storage verification.
- Independent read-only review found and resolved overdue idempotency, terminal-quota starvation, corrupt-row tenant isolation, and real-timezone validation edges.
- Send-later targeted regression: 7/7 passed. Full ordinary functional regression: 342/342 passed. `git diff --check` passed.
- Production remains immutable Apps Script v29. No deployment, OAuth, migration, trigger mutation, real Gmail draft/message, Telegram card, attachment, provider object, browser account, or phone state was changed.

## 2026-07-18 — v28 start

- Verified production v27 release state and frozen source hashes read-only.
- Ran the current functional suite: 337/337 passed.
- Verified Telegram webhook health without exposing the bot token.
- Confirmed no active Gmail deploy, browser QA, or security scan process.
- Located the authoritative v27 source and distinguished it from the older notifier copy.
- Verified target Git branch and remote state; created `codex/neuroinclusive-v28`.
- Imported sanitized v27 source, tests, design reference, and v27 release helper.
- Excluded clasp sessions, OAuth material, rollback blobs, caches, screenshots, test attachments, and secret bridges.
- Corrected `.claspignore` to include `MultiAccount.gs`.
- Recorded audit, product roadmap, recovery checkpoint, and crash-report policy.
- Adapted the imported test harness to the repository layout (the Pages bridge is at repository root) and restored the immutable v26 helper required by its release-contract test.

## 2026-07-18 — v28 P0 Focus View

- Implemented an account-isolated attention registry keyed by Telegram user and Gmail connection.
- Added four explicit triage states: `Дія`, `Чекаю`, `Інфо`, and `Пізніше`.
- Added a bounded editable next action, reading progress, and Resume Rail without storing message bodies.
- Added a bounded Focus folder view and honest AI trust surface with a confidence label and original-message evidence.
- Limited the sticky quick-action bar to exactly `Зробити`, `Відповісти`, and `Відкласти`; secondary actions remain in the toolbar.
- Fixed a rendered race between triage and next-action saves with queued idempotent updates and input/blur autosave.
- Fixed preview RPC failure handling so a test exception rejects instead of leaving focus controls permanently disabled.
- Verified navigation persistence: triage and next action survive opening another thread and returning.
- Verified responsive rendering at desktop and 390×844 mobile sizes, including full reader scrolling and reachable original content.
- Browser console contained no application errors; only expected Telegram WebApp compatibility warnings in plain preview mode.
- Ordinary regression: 333/333 passed. Focus/MailClient targeted regression: 200/200 passed.
- Production version 27 was not changed. No real Gmail message, Telegram card, OAuth grant, attachment, or provider data was mutated.

## 2026-07-18 — v28 release freeze

- Added a separate `deploy_apps_script_v28.ps1`; immutable v27 rollback hashes and exact v28 candidate hashes are pinned independently from the older helpers.
- v28 release-contract tests pass 2/2 and confirm fail-closed future-version, mutex, parse, and no-embedded-secret guards.
- Read-only `-PreflightOnly` passed with stable version 27, release state `fresh`, and the expected deployment ID.
- No Apps Script POST or PUT was permitted during preflight; production remains v27 until the guarded release step.
- The first guarded v28 deployment received Google Apps Script HTTP 500 before immutable v28 verification. The helper completed HEAD rollback; immediate read-only preflight confirmed stable v27 and release state `fresh`. No automatic retry was made.
- While release was postponed, froze the independent P1 contract for low-energy/time presets, three low-pressure reply styles, durable send-later, soft/digest/urgent reminders, compassionate copy, privacy-preserving preferences, and three-screen onboarding. No frozen v28 source hash changed.

## 2026-07-18 — v28 production deployment

- Re-audited clean local/remote Git state, checkpoint, and process list; no duplicate v28 deployment was active.
- Fresh read-only preflight again confirmed stable v27, release state `fresh`, and exact five-file v28 hashes.
- The one permitted guarded retry succeeded: immutable Apps Script version 28 was created and the existing stable deployment was updated from v27 to v28.
- Immediate post-deploy preflight returned `preflight_already_deployed`, `idempotent: true`, and the same immutable hashes.
- Telegram webhook remained healthy: correct bot identity, `script.google.com` host, zero pending updates, no last error, and only `message`/`callback_query` updates.
- Post-deploy regression passed 335/335, including the two v28 release-helper contracts.
- A direct unauthenticated web-app GET returned HTTP 200. It intentionally exposed only the launch bridge, not mailbox or preview content; no account session or message was accessed.

## 2026-07-18 — v29 P1 energy-aware Focus sessions

- Created `codex/neuroinclusive-v29` from the verified production-v28 evidence commit; production was not changed.
- Added bounded `Мало сил`, `5 хвилин`, `3 листи`, and `Без таймера` presets plus `М’яко`, `Дайджест`, and `Лише термінове` reminder preferences.
- Persisted preferences in the existing attention registry, isolated by exact Telegram user ID and Gmail connection ID, with optimistic revision checks and idempotent updates.
- Reloaded the exact new Gmail account preferences during account switching instead of retaining the previous account's UI state.
- Extended Gmail disconnect cleanup to remove the disconnected account's private Focus and attention preference records.
- Limited the visible Focus queue to the selected preset budget; `Мало сил` renders exactly one working thread and compassionate copy.
- Targeted Focus/MailClient contracts passed 202/202. Full ordinary regression passed 335/335.
- Chrome preview QA passed at desktop and 390×844. The mobile body width remained exactly 390 px with no horizontal overflow; the one-thread queue and `Дайджест` selection rendered correctly.
- Browser logs contained no application errors. Two Telegram SDK compatibility warnings are expected because localhost preview is outside a current Telegram WebView.
- Private QA captures remain outside Git under the thread visualization directory. No real Gmail message, Telegram card, OAuth grant, attachment, provider object, browser account, or phone state was mutated.

## 2026-07-18 — v29 release freeze and preflight

- Added a separate `deploy_apps_script_v29.ps1` with immutable v28 rollback hashes and the exact five-file v29 candidate hashes.
- The v29 release-helper contract passed 2/2, including PowerShell parsing, single mutation points, future-version refusal, mutex, and embedded-secret guards.
- Read-only `-PreflightOnly` returned `ok: true`, stable production version 28, release state `fresh`, and the expected deployment ID and v29 hashes.
- Preflight permitted only Google Apps Script GET operations. No immutable version, deployment update, Gmail mutation, OAuth consent, migration, or Telegram change occurred.

## 2026-07-18 — v29 production deployment

- Ran the guarded helper once after confirming a clean synchronized remote branch, stable v28, release state `fresh`, and exact candidate hashes.
- Created immutable Apps Script version 29 and updated the existing deployment from v28 to v29 at `2026-07-18T03:18:37.431Z`.
- Immediate post-deploy preflight returned `preflight_already_deployed`, `idempotent: true`, the same deployment ID, and the exact immutable v29 hashes.
- Post-deploy regression passed 337/337, including all ordinary functional tests and both v29 release-helper contracts.
- Telegram webhook health remained exact: `@TarasevychGmailNotifierBot`, `script.google.com`, query keys `key`/`rev`, zero pending updates, no last error, one connection, and only `message`/`callback_query` updates.
- The protected bot token was read only inside the local keyring process and was never printed, copied, or committed.
- An unauthenticated web-app GET returned HTTP 200 and the expected launch bridge, with no mailbox address or mail content exposed.
- No OAuth/migration was repeated and no Gmail message, Telegram card, attachment, Drive/Box object, provider grant, browser account, or phone state was mutated during post-deploy verification.

## 2026-07-18 — v33 three-screen neuroinclusive onboarding candidate

- Created `codex/neuroinclusive-v33-reminders-onboarding` from the verified v32 send-later UI commit. Production remains immutable Apps Script v29; no release helper or deployment was created.
- Added exactly three progressive screens: a bounded energy pace, one reminder mode with optional digest window, and an exact-account review. Stable `Допомога` and explicit `Пропустити` actions remain available.
- The onboarding is keyboard trapped, does not close silently on Escape, and gates automatic thread opening only after the selected Gmail account's preference state has loaded.
- Completion, digest windows, and timezone are stored in the existing content-free attention record, isolated by exact Telegram user ID plus Gmail connection ID. Completion time is generated once by the server and exact retries are idempotent.
- Switching to another Gmail account reloads that account's preferences and opens onboarding only when that account has not completed it. A `Підтримка` control reopens the flow later without losing authorization.
- Targeted MailApp/MailClient contracts passed 211/211. The ordinary functional regression excluding immutable historical release-pin tests passed 344/344. Inline scripts remain syntactically valid; `git diff --check` passed and the bounded changed-file secret scan found 0 matches.
- The broad raw glob also ran historical v27–v29 deployment-pin tests against mutable working files: 351 functional tests passed and four release-fixture checks failed for expected historical hashes/path layout. Those fixtures were not edited because doing so would weaken immutable rollback evidence.
- No Gmail message/draft, Telegram card, OAuth grant, migration, trigger, attachment, provider object, browser account, or phone state was changed.

## 2026-07-18 — v34 compassionate reminder-delivery candidate

- Created `codex/neuroinclusive-v34-reminder-delivery` from the verified v33 onboarding commit. Production remains immutable Apps Script v29; no release helper or deployment was created.
- Added a bounded content-free reminder ledger and reused the existing minute worker. `М’яко`, `Дайджест`, and `Лише термінове` defer through 22:00–08:00 quiet hours; critical status never bypasses them.
- Reminder delivery is private-chat and exact Gmail-connection scoped. Telegram creates are reserved before dispatch; ambiguous transport becomes an at-most-once tombstone and is never automatically replayed.
- Every reminder exposes `Пізніше` and `Не нагадувати про цей лист`. Callbacks bind the Telegram user, private chat, exact Telegram message ID, monotonic cycle revision, and content-free reminder ID.
- Digest delivery groups only the same Telegram user/chat and removes only the handled row. A new Gmail message in the same thread can form a later cycle without reusing an old button.
- Capacity is bounded to 24 active rows per Gmail connection, 48 total rows per Telegram user, and 72 globally. Canonical prefix scans recover a missing index and preserve 24 global slots for other users without evicting live delivered/suppressed evidence.
- Independent read-only review found and verified fixes for callback ABA, cross-user capacity exhaustion, index partial-write recovery, recent-update timing, and accepted-delivery rollback.
- Verification: targeted reminder/mail actions 135/135 PASS; ordinary functional matrix 354/354 PASS; `git diff --check` and changed-file secret scan are release gates before commit.
- No Gmail message/draft, Telegram card, OAuth grant, migration, trigger, attachment, provider object, browser account, or phone state was changed.

## 2026-07-18 — v35 soft-to-digest continuation candidate

- Created `codex/neuroinclusive-v35-soft-digest-continuation` from the verified v34 commit. Production remains immutable Apps Script v29 and no live provider state was changed.
- Completed the research contract for `М’яко`: one standalone neutral reminder, then only grouped delivery in the selected digest windows while the thread remains untouched.
- Fresh attention, manual focus, matched-rule, or mail-card activity stops continuation. Candidate and scoped registry revisions are re-read under the same ScriptLock before every initial or retry reservation, including removal-only changes with no remaining timestamp.
- The previous standalone Telegram message ID is stored as content-free retirement metadata until idempotent deletion is confirmed. A crash or definite retry cannot lose it; a bounded worker finishes cleanup later.
- Every `soft_digest` retry rechecks the selected digest window. A Telegram create accepted before a local marker failure becomes uncertain and is never converted into an automatic duplicate.
- Targeted mail-action contracts pass 139/139 and the complete ordinary functional matrix passes 359/359. No subject, sender, body, summary, attachment name, OAuth secret, or token was added to the ledger.
