# REQ-0033 — P0 миттєва навігація, кеш, чернетки й типографіка / P0 instant navigation, cache, drafts, and typography

- ID: REQ-0033
- Date: 2026-07-22
- Status: recorded
- Next Versie authorization: no
- Routes: requests=record; instructions=reference; permissions=reference; plan=update; product=update; release=update
- Permission basis: explicit

<!-- lang:uk -->
## Українською

### Нормалізований запит

- Після mandatory recovery-аудиту й безпечного terminal state попереднього release/rollback cycle виконати це оновлення Versie 1 раніше за некритичні product improvements.
- Не домішувати P0 до стороннього PR або historical immutable. Створити окремий cause-linked source, verification і bounded release cycle відповідно до P-009.
- Встановити factual root causes повторних завантажень: document reload, remount, дубльовані `google.script.run`/API calls, очищення client state, навігація, draft persistence і відсутні cache layers.
- Зафіксувати sanitized baseline для cold start, warm reopen, `A -> B -> A`, usable UI time, request count і repeated loads; не вигадувати цифри без trace.
- Узгодити типографіку списку, листа, редактора, меню, кнопок і заголовків із доступним Gmail-подібним system stack без зовнішнього font blocking, layout shifts або механічного копіювання.
- Побудувати підтверджену модель `app shell + cached state + background revalidation`: внутрішня навігація без document reload, immediate cached render, entity-level reconciliation і збереження scroll, filters, account context, focus та unfinished reply.
- Додати bounded account-isolated memory/persistent cache, normalized entities за стабільними Gmail IDs, LRU/quota handling, versioned schema й очищення лише відповідного account namespace після logout/permission loss. Не зберігати tokens або credentials у browser storage.
- Перевірити security boundary перед persistent storage повного mail body. Не публікувати кешований вміст, приватні адреси або mail data як evidence.
- Реалізувати incremental updates, in-flight request dedupe, stale-response protection, bounded retries, optimistic label/move/delete reconciliation і safe rollback без мутації випадкових листів.
- Використовувати Gmail History API лише в межах підтвердженого contract; full resync дозволяти при втраченій history boundary, пошкодженому cache або API requirement. Не вигадувати Gmail push без потрібної Pub/Sub infrastructure.
- Реалізувати two-stage draft autosave: immediate local recovery checkpoint і debounced account-scoped Gmail Draft save/update зі stable draft ID, out-of-order protection, offline recovery, lifecycle flush attempts і явною conflict strategy.
- Реалізувати version-aware production activation із exact release ID/content hash, versioned cache migration та рівно одним контрольованим reload після safe draft save. Якщо Service Worker недоступний у Apps Script origin, застосувати лише підтверджений manifest/version-storage fallback.
- Зберегти accessibility й ADHD-friendly UX: без глобального loading overlay за наявності cache, без flicker/continuous motion, із visible focus, keyboard flow, bounded live announcements і чітким active/shared account context.
- Створити окремі problem records щонайменше для typography, reload/navigation, cache/background sync, draft persistence і post-release client update; оновити парні UK/EN plan, issues, navigation і factual verification report.

### Критерії завершення

- Official Google Apps Script/Gmail та primary browser standards підтверджують фактичні origin, Service Worker, Cache Storage, IndexedDB, Background Sync, Gmail History/Drafts і release-update boundaries.
- Автоматичні й візуальні тести покривають cold/warm navigation, `A -> B -> A`, scroll/focus/filter/account restoration, incremental mail changes, cache isolation/LRU/quota, stale requests, optimistic rollback, draft recovery/conflict, one-time client update, no reload loop, mobile/zoom/keyboard і typography.
- Slow/offline/server-unavailable cases мають bounded behavior без втрати тексту, cross-account leakage, duplicate drafts, infinite retry або hidden unsafe success.
- Performance comparison містить traceable before/after times і request counts; claims отримують лише доказаний status та відповідний evidence grade.
- Green local source/tests/docs/privacy gates і normal PR передують одному новому cumulative immutable candidate. Staging acceptance обов'язковий; production promotion дозволений лише після повного `VERIFIED` acceptance і exact rollback readiness.
- Після promotion або rollback canonical release-state, paired UK/EN evidence, request status, checkpoint і cleanup оновлені атомарно.
- Stop gates: CAPTCHA, OTP/2FA, passkey/biometric/hardware key, новий user-specific Google consent, unresolved account/zone identity або materially unsafe irreversible choice.

<!-- lang:en -->
## English

### Normalized request

- After the mandatory recovery audit and a safe terminal state for the prior release/rollback cycle, execute this Versie 1 update before noncritical product improvements.
- Do not fold the P0 work into an unrelated PR or historical immutable. Use a separate cause-linked source, verification, and bounded release cycle under P-009.
- Establish factual root causes for repeated loading: document reload, remount, duplicated `google.script.run`/API calls, client-state clearing, navigation, draft persistence, and missing cache layers.
- Capture a sanitized baseline for cold start, warm reopen, `A -> B -> A`, usable-UI time, request count, and repeated loads; never invent measurements without a trace.
- Align list, message, editor, menu, button, and heading typography with an accessible Gmail-like system stack without external font blocking, layout shifts, or mechanical copying.
- Build a proven `app shell + cached state + background revalidation` model: internal navigation without document reload, immediate cached rendering, entity-level reconciliation, and restoration of scroll, filters, account context, focus, and unfinished replies.
- Add bounded account-isolated memory/persistent caches, normalized entities keyed by stable Gmail IDs, LRU/quota handling, versioned schemas, and per-account clearing after logout or permission loss. Never store tokens or credentials in browser storage.
- Verify the security boundary before persisting complete mail bodies. Never publish cached content, private addresses, or mail data as evidence.
- Implement incremental updates, in-flight request deduplication, stale-response protection, bounded retries, optimistic label/move/delete reconciliation, and safe rollback without mutating arbitrary mail.
- Use Gmail History API only within a verified contract; permit full resync when the history boundary is lost, cache is corrupt, or the API requires it. Do not invent Gmail push without the required Pub/Sub infrastructure.
- Implement two-stage draft autosave: an immediate local recovery checkpoint and debounced account-scoped Gmail Draft save/update with a stable draft ID, out-of-order protection, offline recovery, lifecycle flush attempts, and an explicit conflict strategy.
- Implement version-aware production activation with an exact release ID/content hash, versioned cache migration, and exactly one controlled reload after safe draft persistence. If Service Worker is unavailable on the Apps Script origin, use only a verified manifest/version-storage fallback.
- Preserve accessible ADHD-friendly UX: no global loading overlay when cache exists, no flicker or continuous motion, visible focus, keyboard flow, bounded live announcements, and a clear active/shared account context.
- Create separate problem records at minimum for typography, reload/navigation, cache/background sync, draft persistence, and post-release client update; update paired UK/EN plan, issues, navigation, and factual verification evidence.

### Completion criteria

- Official Google Apps Script/Gmail sources and primary browser standards confirm actual origin, Service Worker, Cache Storage, IndexedDB, Background Sync, Gmail History/Drafts, and release-update boundaries.
- Automated and visual tests cover cold/warm navigation, `A -> B -> A`, scroll/focus/filter/account restoration, incremental mail changes, cache isolation/LRU/quota, stale requests, optimistic rollback, draft recovery/conflict, one-time client update, no reload loop, mobile/zoom/keyboard, and typography.
- Slow/offline/server-unavailable cases have bounded behavior without lost text, cross-account leakage, duplicate drafts, infinite retry, or hidden unsafe success.
- Performance comparison contains traceable before/after timings and request counts; claims receive only proven statuses and appropriate evidence grades.
- Green local source/tests/docs/privacy gates and a normal PR precede one new cumulative immutable candidate. Staging acceptance is mandatory; production promotion is allowed only after complete `VERIFIED` acceptance and exact rollback readiness.
- After promotion or rollback, canonical release state, paired UK/EN evidence, request status, checkpoint, and cleanup are updated atomically.
- Stop gates: CAPTCHA, OTP/2FA, passkey/biometric/hardware key, new user-specific Google consent, unresolved account/zone identity, or a materially unsafe irreversible choice.

## Closure evidence — 2026-07-22

### Українською

- Product-код злитий normal merge через PR #29 і PR #30; cumulative target commit: `42dfbd76d1e904fe065094010f61418da8896978`.
- Локальні product/release tests пройшли `494/494`, bridge tests `3/3`; required GitHub checks пройшли.
- Immutable v62 пройшов owner-only staging acceptance: mailbox, profile image, три Gmail roots, shared view, account switching і exact account-list isolation без OAuth або Gmail mutation.
- Два production v62 UI launches пройшли, але Apps Script execution/no-overlap gate лишився недоведеним: process API повернув 403, `clasp logs` не мав configured GCP project ID, а default project не мігрувався.
- Exact rollback v62 -> v57 завершено. Post-rollback preflight: stable/HEAD v57, immutable v62 ready, staging `0`, journal `rolled_back`; два свіжі production v57 launches пройшли без network error.
- PR #31 опублікував парні VR-010, release report і canonical state; merge commit `67a8ba7073e3bcf42a4cb73fb9f59aa0d4a4ee01`. GitHub і private GitLab `main` ідентичні.
- Статус лишається `blocked`, бо GT-030 не має causal fix/content-free execution trace, а повний Definition of Done REQ-0033 не доведено в production.

### English

- Product code merged normally through PR #29 and PR #30; cumulative target commit: `42dfbd76d1e904fe065094010f61418da8896978`.
- Local product/release tests passed `494/494`, bridge tests passed `3/3`, and required GitHub checks passed.
- Immutable v62 passed owner-only staging acceptance for mailbox, profile image, three Gmail roots, shared view, account switching, and exact account-list isolation without OAuth or Gmail mutation.
- Two production v62 UI launches passed, but the Apps Script execution/no-overlap gate remained unproven: the process API returned 403, `clasp logs` had no configured GCP project ID, and the default project was not migrated.
- Exact v62 -> v57 rollback completed. Post-rollback preflight reported stable/HEAD v57, immutable v62 ready, staging `0`, and journal `rolled_back`; two fresh production v57 launches passed without network error.
- PR #31 published paired VR-010, release evidence, and canonical state; merge commit `67a8ba7073e3bcf42a4cb73fb9f59aa0d4a4ee01`. GitHub and private GitLab `main` are identical.
- Status remains `blocked` because GT-030 has no causal fix/content-free execution trace and the complete REQ-0033 Definition of Done is not production-proven.

## Continuation evidence — immutable v63 — 2026-07-22

### Українською

- PR #32 злив causal GT-030 worker-lease fix; PR #33 додав exact immutable v63 helper; PR #34 додав signed staging bridge. GitHub і private GitLab `main` досягли `ce46143b7270ca7776a91b01783490e1d08aa1ca`.
- Focused worker contracts пройшли `17/17`; source suite `497/497`; release-helper cumulative suite `499/499`; final signed-bridge cumulative suite `501/501`. Required GitHub checks пройшли.
- Owner-only native Telegram Desktop staging підтвердив mailbox, dynamic account context, avatar behavior, рівно три isolated Gmail roots і controlled switching із поверненням без OAuth.
- Після promotion два свіжі native production launches завантажили mailbox v63. Сім послідовних one-minute `checkNewMail_` executions завершилися до наступного старту без overlap.
- Final preflight підтвердив stable/HEAD exact v63, staging `0`, journal `cleaned`; exact v57 лишається rollback target. Immutable v56, v59, v62 і v63 не переписувалися.
- PR #35 опублікував canonical paired UK/EN current state, GT-030–GT-038, release report і VR-011; merge commit `3abbf31619aa3380a83638adcda2efad8b3043f6`. [VR-011 українською](https://github.com/Tarasevych/gmail-telegram-controls/blob/main/docs/uk/verification-reports/reports/VR-011/README.md) · [детальний звіт](https://github.com/Tarasevych/gmail-telegram-controls/blob/main/docs/uk/reports/VERSIE_001_V63_RELEASE_AND_GT030_CLOSURE_2026-07-22.md).
- GT-030 тепер `VERIFIED`. GT-031–GT-036 лишаються `PARTIAL`; GT-037 фіксує promotion read-after-write false negative, GT-038 — Telegram Web K/A blank embed при успішному native Desktop.
- External automatic INBOX після v63, dedicated History runtime substage, measured cold/warm і `A -> B -> A`, cache quota/LRU, offline/cross-session draft та one-reload/no-loop acceptance лишаються недоведеними.
- Отже запит повернуто зі статусу `blocked` до активного `recorded`, а не позначено `completed`. Next Versie authorization лишається `no`.

### English

- PR #32 merged the causal GT-030 worker-lease fix; PR #33 added the exact immutable v63 helper; PR #34 added the signed staging bridge. GitHub and private GitLab `main` reached `ce46143b7270ca7776a91b01783490e1d08aa1ca`.
- Focused worker contracts passed `17/17`; the source suite passed `497/497`; the release-helper cumulative suite passed `499/499`; the final signed-bridge cumulative suite passed `501/501`. Required GitHub checks passed.
- Owner-only native Telegram Desktop staging verified the mailbox, dynamic account context, avatar behavior, exactly three isolated Gmail roots, and controlled switching away and back without OAuth.
- After promotion, two fresh native production launches loaded the v63 mailbox. Seven successive one-minute `checkNewMail_` executions completed before the next start without overlap.
- Final preflight confirmed exact stable/HEAD v63, staging `0`, and journal `cleaned`; exact v57 remains the rollback target. Immutable v56, v59, v62, and v63 were not rewritten.
- PR #35 published canonical paired UK/EN current state, GT-030 through GT-038, the release report, and VR-011; merge commit `3abbf31619aa3380a83638adcda2efad8b3043f6`. [VR-011 in English](https://github.com/Tarasevych/gmail-telegram-controls/blob/main/docs/en/verification-reports/reports/VR-011/README.md) · [detailed report](https://github.com/Tarasevych/gmail-telegram-controls/blob/main/docs/en/reports/VERSIE_001_V63_RELEASE_AND_GT030_CLOSURE_2026-07-22.md).
- GT-030 is now `VERIFIED`. GT-031 through GT-036 remain `PARTIAL`; GT-037 tracks the promotion read-after-write false negative, and GT-038 tracks the blank Telegram Web K/A embed while native Desktop succeeds.
- External automatic INBOX after v63, a dedicated History runtime substage, measured cold/warm and `A -> B -> A`, cache quota/LRU, offline/cross-session draft, and one-reload/no-loop acceptance remain unproven.
- The request therefore returns from `blocked` to active `recorded`, rather than being marked `completed`. Next Versie authorization remains `no`.

## Continuation evidence — immutable v64 — 2026-07-22

### Українською

- PR #37 merged cumulative source correction GT-031; PR #38 merged exact helper v64 із direct rollback v63 і bounded reconciliation GT-037; PR #39 merged signed staging bridge v64.
- Local gates пройшли послідовно: focused GT-031 `88/88`, source `501/501`, release `503/503` і final bridge/cumulative `505/505`. Required GitHub checks пройшли.
- Рівно один `StageOnly` після read-only preflight створив immutable v64 і один owner-only staging deployment. Native Telegram Desktop підтвердив narrow full-address disclosure, avatar/fallback behavior, три isolated Gmail roots, фактичний shared view та controlled switching без OAuth.
- Одна bounded promotion просунула exact v63 до v64. Два fresh native production launches пройшли; cleanup видалив staging; final preflight підтвердив stable/HEAD v64, staging `0` і journal `cleaned`.
- Шість post-cleanup `checkNewMail_` executions завершилися. Один короткий process shell формально наклався на попередній приблизно на 5.7 секунди; lease-rejection explanation лишається inference, бо content-free substage telemetry була недоступна.
- PR #40 опублікував paired UK/EN canonical state, final release report і VR-013; merge commit `5af0fc1fec6d8adcccc5d2834fca4867e69f45ee`. GitHub і private GitLab `main` ідентичні.
- GT-031 і GT-037 тепер `VERIFIED`. GT-032–GT-036 і GT-038, measured cold/warm та `A -> B -> A`, cache quota/LRU, offline/cross-session draft, conflict handling і stale-open-client one-reload/no-loop acceptance лишаються `PARTIAL` або `UNVERIFIED`.
- Запит лишається активним `recorded`, а не `completed`. Next Versie authorization лишається `no`; candidate v65 не створено.

### English

- PR #37 merged the cumulative GT-031 source correction; PR #38 merged the exact v64 helper with direct v63 rollback and bounded GT-037 reconciliation; PR #39 merged the signed v64 staging bridge.
- Local gates passed in sequence: focused GT-031 `88/88`, source `501/501`, release `503/503`, and final bridge/cumulative `505/505`. Required GitHub checks passed.
- Exactly one `StageOnly` after read-only preflight created immutable v64 and one owner-only staging deployment. Native Telegram Desktop verified the narrow full-address disclosure, avatar/fallback behavior, three isolated Gmail roots, the actual shared view, and controlled switching without OAuth.
- One bounded promotion advanced exact v63 to v64. Two fresh native production launches passed; cleanup removed staging; final preflight confirmed stable/HEAD v64, staging `0`, and journal `cleaned`.
- Six post-cleanup `checkNewMail_` executions completed. One short process shell formally overlapped its predecessor by about 5.7 seconds; the lease-rejection explanation remains an inference because content-free substage telemetry was unavailable.
- PR #40 published paired UK/EN canonical state, the final release report, and VR-013; merge commit `5af0fc1fec6d8adcccc5d2834fca4867e69f45ee`. GitHub and private GitLab `main` are identical.
- GT-031 and GT-037 are now `VERIFIED`. GT-032 through GT-036 and GT-038, measured cold/warm and `A -> B -> A`, cache quota/LRU, offline/cross-session drafts, conflict handling, and stale-open-client one-reload/no-loop acceptance remain `PARTIAL` or `UNVERIFIED`.
- The request remains active `recorded`, not `completed`. Next Versie authorization remains `no`, and no v65 candidate was created.
