# REQ-0035: Versie 1 V3 autonomous remediation

- ID: REQ-0035
- Date: 2026-07-23
- Status: recorded
- Next Versie authorization: no
- Routes: requests=record; instructions=update; permissions=update; plan=update; product=update; release=reference
- Permission basis: explicit

<!-- lang:uk -->

## Українська

### Джерело та межа

Власник доручив продовжити **Versie 1** за програмою `OWNER-AUTH-V3-2026-07-23`, версія документа `1.1`. Точний SHA-256 локального V3-плану:

`3c4bc0a3ecadb527cbe1d2e1fd07fba46dfdbc2ca3c541a4808a5ed5492bc3ca`

Цей запис є sanitized-маршрутизацією вимог. Він не містить адрес Gmail, Telegram ID, текстів листів, токенів, URL deployment, параметрів запуску або інших приватних даних.

### Перевірений початковий стан

- `VERIFIED`: GitHub є канонічним репозиторієм; приватне GitLab-дзеркало узгоджене з канонічними гілками на момент аудиту.
- `VERIFIED`: production і HEAD використовують immutable `v65`.
- `VERIFIED`: immutable `v67` збережений як історичний непросунутий артефакт.
- `VERIFIED`: активних staging deployment немає; release journal має terminal state `acceptance_incomplete_cleaned`; Telegram menu повернуто на production.
- `VERIFIED`: активної merge, release або rollback-операції немає; перевірені worktree чисті й не мають sequencer.
- `PARTIAL`: попередня доказова база підтверджує `522/522` автоматичних тестів, але native p95, device-bound offline private cache, Gmail Drafts і двонапрямне перемикання акаунтів залишаються непідтвердженими.
- `CONFLICTING`: два файли, надані як історії чатів, є byte-identical старішими копіями V3-плану, а не transcript. Тому з них не приймаються історичні твердження про дії власника або агента.

### Маршрутизація директив

| Контур | Дія | Ціль |
| --- | --- | --- |
| Recovery і corpus | update | Зберегти приватний checkpoint, manifest покриття, точне походження, прогалини й конфлікти без публікації приватного корпусу. |
| Instructions | update | Закріпити recovery-first порядок, resource leases, fail-closed release gates, доказові статуси та заборону повторення завершених дій. |
| Permissions | update | Додати до індексу лише вже чинний `P-009`; зміст `P-009` не змінювати й нових standing permissions не створювати. |
| Plan | update | Розкласти V3 на атомарні task/workstream із залежностями, acceptance criteria та terminal states. |
| Product | update | Виконувати cumulative виправлення Versie 1: launch/session, offline cache, incremental sync, drafts, labels, multi-account isolation, client update, accessibility і performance. |
| Release | reference | Використовувати лише чинний `P-009`; один immutable candidate і один staging за цикл, staging acceptance перед production, exact rollback при candidate-specific regression. |

### Пріоритетний продуктовий порядок

1. Усунути подвійний bootstrap і повторні повноекранні екрани підключення через ідемпотентний single-flight launch pipeline.
2. Побудувати `app shell + cached state + background revalidation` без повного reload під час звичайної навігації.
3. Ізолювати persistent cache за Telegram-користувачем, Gmail connection ID і поштовим контекстом; не зберігати OAuth/Telegram secrets у browser storage.
4. Реалізувати нормалізований cache, incremental Gmail History reconciliation, контрольований full resync, LRU/quota handling і безпечний background prefetch.
5. Реалізувати локальний recovery-checkpoint та debounced Gmail Drafts synchronization зі стабільним draft ID і явною conflict strategy.
6. Узгодити labels, dynamic active-mail context, account switching, common-mail mode, accessibility і Gmail-aligned typography без паралельної моделі стану.
7. Додати version-aware client activation з одним контрольованим reload лише після нового production release.

### Доказові та release-gates

- Baseline і after-metrics мають вимірювати реальний time-to-interactive, cache-hit ratio, API request count, duplicate bootstrap count і reload count.
- Статус `VERIFIED` дозволений лише за trace, автоматичним тестом, authenticated readback або зафіксованою native acceptance.
- OAuth, CAPTCHA, OTP/2FA, passkey/biometric/hardware key, нова або ширша Google consent і неоднозначність Gmail/Telegram identity є hard stop.
- Не змінювати випадкові листи. Runtime mutation дозволена лише для чітко маркованих owner-controlled synthetic fixtures після identity і lease gate.
- Immutable release не переписувати. Production promotion можливий лише після успішного staging acceptance і всіх критичних gates.
- Якщо blocker однаковий на stable і candidate, не перемикати release повторно; зафіксувати shared blocker.

### Очікувані артефакти

- Парні одномовні UK/EN сторінки для релевантних інструкцій, issues, roadmap/tasks, verification reports і release evidence.
- Оновлений індекс `P-009` без зміни його authority.
- Наступні фактичні `GT`, `B1` і `VR` визначаються лише з live registry, без вгадування.
- Окремі normal PR, green checks, merge evidence і remote SHA для кожної governance та product-фази.

<!-- lang:en -->

## English

### Source and boundary

The owner instructed continued work on **Versie 1** under `OWNER-AUTH-V3-2026-07-23`, document version `1.1`. The exact SHA-256 of the local V3 plan is:

`3c4bc0a3ecadb527cbe1d2e1fd07fba46dfdbc2ca3c541a4808a5ed5492bc3ca`

This record is a sanitized routing artifact. It contains no Gmail addresses, Telegram IDs, message content, tokens, deployment URLs, launch parameters, or other private data.

### Verified starting state

- `VERIFIED`: GitHub is the canonical repository; the private GitLab mirror matched the canonical branches at audit time.
- `VERIFIED`: production and HEAD use immutable `v65`.
- `VERIFIED`: immutable `v67` is retained as a historical, unpromoted artifact.
- `VERIFIED`: there are no active staging deployments; the release journal is in terminal state `acceptance_incomplete_cleaned`; the Telegram menu points to production.
- `VERIFIED`: no merge, release, or rollback operation is active; checked worktrees are clean and contain no sequencer.
- `PARTIAL`: prior evidence records `522/522` automated tests, while native p95, device-bound offline private cache, Gmail Drafts, and bidirectional account switching remain unverified.
- `CONFLICTING`: the two files supplied as chat histories are byte-identical older copies of the V3 plan, not transcripts. No historical owner or agent action claims are accepted from them.

### Directive routing

| Stream | Action | Target |
| --- | --- | --- |
| Recovery and corpus | update | Preserve a private checkpoint, coverage manifest, exact provenance, gaps, and conflicts without publishing the private corpus. |
| Instructions | update | Establish recovery-first ordering, resource leases, fail-closed release gates, evidence statuses, and non-repetition of completed actions. |
| Permissions | update | Add only the already-active `P-009` to the index; do not alter `P-009` content or create new standing permissions. |
| Plan | update | Decompose V3 into atomic tasks/workstreams with dependencies, acceptance criteria, and terminal states. |
| Product | update | Deliver cumulative Versie 1 fixes for launch/session, offline cache, incremental sync, drafts, labels, multi-account isolation, client update, accessibility, and performance. |
| Release | reference | Use existing `P-009` only; one immutable candidate and one staging deployment per cycle, staging acceptance before production, and exact rollback for a candidate-specific regression. |

### Priority product order

1. Remove duplicate bootstrap and repeated full-screen connection views through an idempotent single-flight launch pipeline.
2. Build `app shell + cached state + background revalidation` without full reload during normal navigation.
3. Isolate persistent cache by Telegram user, Gmail connection ID, and mailbox context; never store OAuth or Telegram secrets in browser storage.
4. Implement a normalized cache, incremental Gmail History reconciliation, controlled full resync, LRU/quota handling, and safe background prefetch.
5. Implement a local recovery checkpoint and debounced Gmail Drafts synchronization with a stable draft ID and an explicit conflict strategy.
6. Align labels, dynamic active-mail context, account switching, common-mail mode, accessibility, and Gmail-aligned typography without a parallel state model.
7. Add version-aware client activation with exactly one controlled reload only after a new production release.

### Evidence and release gates

- Baseline and after metrics must measure real time-to-interactive, cache-hit ratio, API request count, duplicate bootstrap count, and reload count.
- `VERIFIED` is allowed only with a trace, automated test, authenticated readback, or recorded native acceptance.
- OAuth, CAPTCHA, OTP/2FA, passkey/biometric/hardware key, new or broader Google consent, and ambiguous Gmail/Telegram identity are hard stops.
- Do not mutate arbitrary messages. Runtime mutation is limited to clearly marked owner-controlled synthetic fixtures after identity and lease gates.
- Never rewrite an immutable release. Production promotion requires successful staging acceptance and every critical gate.
- If the same blocker occurs on stable and candidate, do not switch releases repeatedly; record a shared blocker.

### Expected artifacts

- Paired monolingual UK/EN pages for relevant instructions, issues, roadmap/tasks, verification reports, and release evidence.
- An updated `P-009` index entry without changing its authority.
- The next actual `GT`, `B1`, and `VR` identifiers are derived only from the live registry and are never guessed.
- Separate normal pull requests, green checks, merge evidence, and remote SHA for each governance and product phase.

## Оновлення доказів B-03: отримання деталей ланцюжка

- Дата: 2026-07-23
- Статус інкремента: PARTIAL
- Source commit: `24e8c19`
- GitHub PR: `#77`
- Normal merge у `main`: `726a5757a8e22a3d2686ccc84703cf304bdab0cd`
- GitHub і GitLab `main`: синхронізовано на тому самому commit.
- Реалізовано: account-bound single-flight для отримання деталей ланцюжка, спільний bounded transfer manager, чесний indeterminate progress, відсутність несправжнього RPC cancel, стабільний task ID для retry та fail-closed generation guard.
- Перевірено: focused contracts `104/104`, повний Apps Script suite `577/577`, bilingual/knowledge/verification/release-state/diff checks пройшли, added-line secret scan `0`.
- Залишається: draft persistence, URL import, server-resumable restart, справжній abort лише для транспортів із підтримкою та native slow-network/minimize acceptance.

## B-03 evidence update: thread-detail retrieval

- Date: 2026-07-23
- Increment status: PARTIAL
- Source commit: `24e8c19`
- GitHub PR: `#77`
- Normal merge into `main`: `726a5757a8e22a3d2686ccc84703cf304bdab0cd`
- GitHub and GitLab `main`: synchronized at the same commit.
- Implemented: account-bound single-flight thread-detail retrieval, the bounded shared transfer manager, honest indeterminate progress, no fake RPC cancellation, stable retry task identity, and a fail-closed generation guard.
- Verified: focused contracts `104/104`, full Apps Script suite `577/577`, bilingual/knowledge/verification/release-state/diff checks passed, and added-line secret scan `0`.
- Remaining: draft persistence, URL import, server-resumable restart, real abort only for transports that support it, and native slow-network/minimize acceptance.

## Оновлення доказів B-03: transfer-state для Gmail-чернеток

- Дата: 2026-07-23
- Статус інкремента: PARTIAL
- Source commit: `cb398c7`
- GitHub PR: `#78`
- Normal merge у `main`: `c198dece03a85b6b59af6387a8ae4042046c921f`
- GitHub і GitLab `main`: синхронізовано на тому самому commit.
- Реалізовано: чинний serialized Gmail draft-save RPC включено до bounded shared transfer-state без зміни snapshot, idempotency, revision merge, canonical readback, local recovery або conflict semantics; retry використовує той самий operation/task ID і працює fail-closed після зміни compose/account context.
- Перевірено: focused contracts `102/102`, CRLF regression `5/5`, повний Apps Script suite `580/580`, документаційні та privacy gates пройшли.
- Live Gmail mutation, OAuth, staging і production promotion не виконувалися.
- Залишається: URL import, server-resumable restart, справжній транспортний abort і native slow-network/minimize acceptance.

## B-03 evidence update: Gmail draft transfer state

- Date: 2026-07-23
- Increment status: PARTIAL
- Source commit: `cb398c7`
- GitHub PR: `#78`
- Normal merge into `main`: `c198dece03a85b6b59af6387a8ae4042046c921f`
- GitHub and GitLab `main`: synchronized at the same commit.
- Implemented: the existing serialized Gmail draft-save RPC now participates in the bounded shared transfer state without changing snapshot, idempotency, revision merge, canonical readback, local recovery, or conflict semantics; retry reuses the same operation/task ID and fails closed after compose/account context changes.
- Verified: focused contracts `102/102`, CRLF regression `5/5`, full Apps Script suite `580/580`, and documentation/privacy gates passed.
- No live Gmail mutation, OAuth action, staging deployment, or production promotion was performed.
- Remaining: URL import, server-resumable restart, real transport abort, and native slow-network/minimize acceptance.
