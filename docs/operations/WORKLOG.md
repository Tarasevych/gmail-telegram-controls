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

## 2026-07-18 — v30 low-pressure reply starters

- Created `codex/neuroinclusive-v30` from the verified production-v29 evidence commit; production remains v29.
- Added exactly three Ukrainian reply starters: `Коротко`, `Професійно`, and `Тепло`.
- Starters are deterministic editable templates with explicit placeholders. They do not claim AI generation, do not invent facts or commitments, and say that nothing is sent automatically.
- A starter can populate only an empty reply/reply-all editor. Existing text disables all starter buttons and cannot be overwritten.
- Choosing a starter enters the existing revision-aware Gmail draft autosave lifecycle; the starter code has no direct `saveDraft` or `sendDraft` path.
- Targeted regression passed 203/203; ordinary full regression passed 336/336.
- Chrome preview DOM QA opened the reply editor, verified all three unique buttons, inserted the `Тепло` template, confirmed exact editable text and overwrite protection, and verified 390 px body/panel width with no horizontal overflow.
- Chrome's captured bitmap showed the underlying fixed reader despite `dialog open`, a visible 390 px panel, and valid DOM geometry. This screenshot inconsistency is not used as visual proof; the DOM and functional evidence remain recorded, and production was not changed.
- No real Gmail draft/message, Telegram card, OAuth grant, attachment, provider object, browser account, or phone state was mutated.

## 2026-07-18 — v36 integrated P1 candidate and rendered QA

- Created `codex/neuroinclusive-v36-integrated-p1` from the verified v35 continuation candidate and integrated the independent v30 low-pressure reply starters. The resulting branch contains v30–v35 P1 work together while production remains immutable Apps Script v29.
- The first standalone Chrome run found a real interaction defect: the onboarding dialog was nested inside `#app`, but isolation made the entire app shell inert, so the visible dialog intercepted no pointer or keyboard interaction.
- Changed isolation to keep the app shell itself active and make only its non-onboarding children inert. Added a regression contract that rejects making `#app` inert and requires explicit exclusion of the onboarding layer.
- Targeted MailApp contracts pass 73/73. The complete ordinary functional matrix excluding immutable historical deployment fixtures passes 360/360.
- Standalone system-Chrome rendered QA passes 14/14 at 1440×900 and 390×844: all three onboarding screens, completion, reply panel, warm/professional starter insertion, overwrite protection, desktop/mobile horizontal bounds, mobile editor scrolling, page identity, blank/overlay checks, and console health.
- Expected Telegram WebApp compatibility warnings occur in localhost preview because it is not a current Telegram WebView; there are no application errors or failed resources. Private screenshots and the JSON report remain outside Git in the thread visualization directory.
- Closed the temporary preview servers after QA. No Gmail message/draft, Telegram card, OAuth grant, migration, trigger, attachment, provider object, browser account, or phone state was changed.

## 2026-07-18 — v36 isolated Apps Script staging preflight

- Added `stage_apps_script_v36.ps1` for real Telegram WebView proof against Apps Script HEAD/`dev` while keeping the stable `/exec` deployment pinned to immutable v29.
- The helper pins exact immutable-v29 rollback hashes and exact v36 candidate hashes, accepts only GET/PUT, has no versions.create or deployment-update operation, refuses unexpected future immutable versions, serializes staging with a named mutex, and provides a verified rollback path.
- Contract tests pass 2/2. Read-only preflight returned stable version 29, `headState: stable_v29`, `stableDeploymentUnchanged: true`, and exact v36 candidate hashes.
- No Apps Script write occurred during preflight. No Gmail, Telegram, OAuth, provider, browser-account, or phone state was changed.

## 2026-07-18 — v36 first real Telegram WebView pass

- Uploaded exact v36 to Apps Script HEAD/`dev`; readback confirmed `headState: candidate_v36` while stable production `/exec` remained immutable v29.
- Temporarily changed only the owner chat's Telegram menu button to the staging `/dev` URL. The prior GitHub Pages mailbox URL was read first and retained for exact restoration.
- On the connected Huawei Telegram WebView, staging loaded under `tarasevych.pavlo@gmail.com`; one explicit read-only refresh populated the real Inbox with account badges, sender images, Ukrainian summaries, unread styling, and no random Gmail mutation.
- The phone pass found a responsive defect: `Підтримка` existed beside `Правила` but became geometrically unreachable in the narrow account panel. The Focus settings header now gives the two controls an explicit two-column full-width grid.
- Added a source regression contract and extended rendered QA to verify that mobile Support has non-zero in-panel bounds and opens onboarding. Targeted MailApp plus staging contracts pass 75/75; ordinary functional plus staging matrix passes 362/362; rendered QA passes 17/17 with no application errors.
- No reply starter was applied to a real message, so no Gmail draft or message was created or changed. The real WebView was closed before refreshing staging.
- The refreshed HEAD retained the same `/dev` URL and Telegram reused the prior WebView document. Query and fragment cache-bust attempts were rejected fail-closed by the mailbox launch router as invalid private keys; neither reached mailbox data. Device-process restart was blocked by host policy before execution and was not retried.
- Restored the exact prior owner menu button (`📬 Пошта` → GitHub Pages mailbox bridge), rolled Apps Script HEAD back to exact v29, and verified stable deployment v29 plus `headState: stable_v29`.
- The updated mobile Support fix therefore has local 17/17 rendered proof but not yet a fresh real-WebView document. The next safe route is a unique immutable staging deployment URL, not cache clearing or another `/dev` retry.

## 2026-07-18 — v30/product-v36 immutable staging release gate

- Added `release_apps_script_v30_product_v36.ps1` plus a static contract test. The helper pins immutable v29 rollback hashes, exact product-v36 hashes, the stable deployment identity, and a separate staging description.
- Release modes are deliberately separate: read-only `-PreflightOnly`, one-time immutable v30 plus unique staging `-StageOnly`, stable promotion `-Promote`, and post-promotion `-CleanupStaging`. Stage mode cannot move stable production from v29.
- A protected recovery journal is written before either irreversible Google `versions.create` or staging `deployments.create`. An unresolved reserved state refuses an automatic replay; returned objects, immutable content, deployment identity, description, and hashes are all read back or asserted before progress is recorded.
- Duplicate exact staging deployments fail closed outside cleanup. Cleanup is reachable only after stable v30 verification and treats an already-absent deployment as an idempotent success.
- Independent read-only review identified ambiguous-create replay, unreachable duplicate cleanup, and an over-escaped secret signature; all were fixed before release use.
- Verification: release contracts 2/2 PASS; complete ordinary plus staging plus release matrix 364/364 PASS; PowerShell parse and `git diff --check` PASS; bounded changed-file secret/trailing-whitespace scan 0 hits.
- Live read-only preflight at `2026-07-18T08:13:05+02:00` confirmed stable v29, HEAD exact v29, no immutable v30, no matching staging deployment, empty release journal, and exact candidate hashes. No Google, Gmail, Telegram, OAuth, browser-account, or phone mutation occurred.

## 2026-07-18 — v30 created; staging create rejected before acceptance

- The single guarded `-StageOnly` invocation created and hash-verified immutable v30, then Google returned a definite HTTP 400 for staging deployment creation. Stable production remained v29; no second POST was issued.
- Read-only reconciliation confirmed stable v29, HEAD exact product v36, immutable v30 exact product v36, no matching staging deployment, and journal state `staging_create_reserved`.
- Root cause is the request shape: Google documents a top-level `versionNumber`, `manifestFileName`, and `description` body for `deployments.create`; the helper sent the nested `deploymentConfig` shape that is valid for deployment update, not create.
- The corrected helper uses the documented create body and records allowlisted definite 4xx responses plus their HTTP status as `staging_create_rejected`. The one-time legacy acknowledgement additionally requires an external recovery artifact bound to the exact script, v30 candidate hash, helper commit, original reservation timestamp, HTTP 400, failed request shape, and evidence ID.
- Follow-up read-only review confirmed that an ambiguous staging outcome remains non-retryable, the legacy evidence cannot acknowledge a later reservation, and no remaining path can create immutable v30 twice. No concrete defect remained in this release slice.

## 2026-07-18 — immutable v30 staging created and real-phone acceptance blocked

- The evidence-bound HTTP 400 acknowledgement was consumed once, and the corrected helper created one separate staging deployment for the already-existing exact immutable v30. Stable production remained immutable v29 throughout.
- The first direct staging URL test proved two distinct launch contracts: bare `/exec` enters the legacy private-key route, while `/exec?action=mailbox` renders the mailbox application. Direct Apps Script navigation still loses Telegram `initData` across Google's frame/redirect boundary, so it is not a valid Mini App acceptance path.
- Published a temporary, no-index GitHub Pages bridge that accepted Telegram `initData` at the top level and POSTed it only to the pinned v30 staging deployment. The bridge was committed, used once, deleted in a follow-up commit, pushed, and verified HTTP 404 after cleanup; production `index.html` was never changed.
- Real Huawei Telegram WebView proof succeeded through that bridge. The v36 mailbox loaded, Gmail folders and real labels were readable, and the Focus view rendered at phone width. No message, draft, label, focus preference, account role, OAuth grant, attachment, or provider object was changed.
- The corrected mobile toolbar rendered both `Підтримка` and `Правила` with non-zero, in-panel accessibility bounds. `Правила` performed its read-only load, but `Підтримка` could not open onboarding because the fallback primary account had an email but no `id` in client state.
- Root cause: the backend primary profile omitted its opaque connection ID, while the frontend ignored the exact `session.connectionId` when `accounts` was empty. `normalizeAccounts` consequently rejected the fallback email as an unsafe ID and `setOnboardingOpen` correctly failed closed on missing `state.account.id`.
- Product-v37 candidate fix now returns `account.id` from the exact authorized session and also falls back to `bootstrap.session.connectionId` in the client. A focused runtime contract proves the fallback produces one current account with the exact opaque ID.
- Verification after the fix: MailApp plus MailClient targeted matrix 212/212 PASS; ordinary functional matrix 360/360 PASS; `git diff --check` PASS. The broad historical glob additionally reported expected immutable hash-fixture failures and one absent legacy helper; those old release pins were not rewritten.
- Temporary Telegram messages `554`, `556`, and `557` are absent/confirmed deleted; the owner menu exactly equals the production GitHub Pages mailbox URL. The phone was returned from the staging WebView, and no new Google consent was requested.
- Release decision: do not promote v30. Preserve this fix as product v37, then create a separately pinned v31 release/staging path and repeat the same non-mutating phone acceptance before any stable promotion.

## 2026-07-18 — v31/product-v37 guarded release preflight

- Added a new release helper and contract instead of altering the immutable v30/product-v36 evidence. It pins exact v29 rollback, exact v30 product-v36 history, and exact product-v37 source separately.
- Stable deployment states are allowlisted to v29 or v31 only. The helper cannot accept or promote stable v30; `-Promote` requires exactly one product-v37 staging deployment bound to immutable v31.
- HEAD may be exact v29, prior v30, or v37. If v37 upload fails before v31 is verified, the helper restores the exact prior HEAD rather than assuming v29. Version and deployment creates remain journal-reserved before POST, and ambiguous create outcomes remain non-replayable.
- Static release contracts pass 2/2. GET-only live preflight returned stable v29, HEAD exact prior v30, exact immutable v30 present, no v31, no product-v37 staging deployment, and an empty v31 journal.
- Candidate hashes: Code `9d11455cab5686b44827da830cf19e2c2acbf1070f66ffc13cb704a1cc40e7e7`; MultiAccount `524cd5f5e7e57ff2313036da77afc3a57bd03d397e56232e32c2cbf34debaf13`; MailClient `6a46e71d06bb9072c7281d0c830f5ce0c0f482fce7584fc48aa9ddfdc54e5d6c`; MailApp `96a92d849b41e93904932d113ed13c1e7c6670c9b2c624631720709726d3bd81`; manifest `354ad159bcd81637d9abf7711cfc675b192ac373317744cf90376f7b14f4edc9`.
- No Apps Script write, stable deployment update, Gmail/Telegram mutation, OAuth action, or phone action occurred during this preflight.
- The first and only `-StageOnly` attempt returned Google Apps Script API HTTP 429 `RESOURCE_EXHAUSTED` during the initial HEAD upload phase. Immediate GET-only reconciliation proved stable v29, HEAD still exact prior v30, no immutable v31, no v37 staging deployment, and no v31 release journal.
- Hardened failure recovery so a failed HEAD upload first reads back the provider state. It skips rollback when the exact prior HEAD is already intact, rolls back only from exact candidate v37, and performs no rollback PUT when readback is unavailable or unknown. The release contract remains 2/2 PASS.
- The 429 is not retried in the same phase. All verified local work remains available while provider write quota cools down.

## 2026-07-18 — immutable v31 phone acceptance and product-v38 mobile settings order

- After quota cooldown, a fresh GET-only preflight again proved stable v29, HEAD exact prior v30, no v31, no product-v37 staging deployment, and an empty v31 journal. The one permitted later `-StageOnly` attempt succeeded: immutable v31 and its separate staging deployment were created from the exact product-v37 hashes while stable production remained v29.
- A temporary noindex GitHub Pages bridge passed fresh Telegram `initData` to the isolated staging deployment. The owner menu was changed only after exact prior-state verification and was restored to `📬 Пошта` with the exact production URL after the test. The bridge was removed and its public URL was verified HTTP 404.
- Real Huawei Telegram WebView loaded immutable v31 with the exact `tarasevych.pavlo@gmail.com` identity, proving the product-v37 account-ID fix. The account panel also exposed a release-blocking usability defect: `Підтримка` and `Правила` followed every dynamic account/access/Gmail-label row, so a mailbox with many labels required an impractical number of scroll gestures before those controls became reachable.
- Promotion of v31 remains forbidden. Product v38 moves the neuroinclusive support/rules block immediately after the account-panel heading, before every dynamic account, access, and Gmail-label list. A source contract fixes that ordering.
- Verification: MailApp 73/73 PASS; ordinary functional matrix 360/360 PASS; rendered system-Chrome mobile QA 6/6 PASS after injecting 80 synthetic label rows. Both controls are visible with zero panel scroll, Support opens the three-screen onboarding, page width stays bounded, and there are no application console errors. Product-v38 normalized MailApp SHA-256 is `c7039062544132c67f555c1b07627dbe9fb2fe636d338e239d102eb3def7212c`.
- No Gmail message/draft/label, focus preference, role, OAuth grant, attachment, provider object, or unrelated Telegram zone was changed. Production remains immutable v29.
- Added a separate v32/product-v38 release helper and static contract. It requires exact immutable v31 as prior evidence, accepts stable v29 or v32 only, rejects stable v31, pins the normalized product-v38 source hashes, and preserves the readback-before-rollback and at-most-once create boundaries. Static release contracts pass 2/2; no v32 preflight or provider mutation has occurred yet.
- v32 GET-only preflight passed and the single guarded StageOnly attempt created exact immutable v32 plus its separate staging deployment while stable stayed v29. Real Huawei Telegram WebView then showed the exact Gmail identity and zero-scroll controls: Support `[229,891][619,985]`, Rules `[634,891][1022,985]`; Support opened `Крок 1 із 3` without saving or completing onboarding.
- Temporary v38 acceptance bridge commits on `main` are `5c16b77` add and `4e29470` remove; the path returns HTTP 404. The owner menu is restored exactly to `📬 Пошта` with the production GitHub Pages URL. Phone WebView was closed without a preference write. The v32 promotion gate is cleared pending one final exact GET-only reconciliation.
- Final reconciliation passed and the guarded helper promoted stable directly from v29 to exact immutable v32/product v38. A production phone-pass through the ordinary `📬 Пошта` menu repeated exact-account, zero-scroll Support/Rules, and onboarding-open checks without saving preferences. The separate staging deployment was then deleted; final preflight reports stable v32, exact candidate HEAD/immutable, journal `cleaned`, and no staging deployment.
