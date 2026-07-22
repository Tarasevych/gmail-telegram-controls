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
