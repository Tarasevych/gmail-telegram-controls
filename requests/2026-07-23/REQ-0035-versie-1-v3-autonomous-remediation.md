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

## Оновлення доказів B-03: transfer-state для public HTTPS import

- Дата: 2026-07-23
- Статус інкремента: PARTIAL
- Source commit: `0a0f911`
- GitHub PR: `#79`
- Normal merge у `main`: `2df9aae9d7ab00163d55a481dd88aae36b817e3e`
- GitHub і GitLab `main`: синхронізовано на тому самому commit.
- Реалізовано: повний public-HTTPS metadata-and-attach submit працює як один bounded shared transfer-task; паралельний submit має один RPC та одне вкладення; URL не потрапляє до task label/ID/telemetry/evidence; retry account/session-bound і fail-closed.
- Security boundary: чинні server-side SSRF, DNS/IP, redirect, MIME і byte bounds не змінено.
- Перевірено: focused contracts `111/111`, повний Apps Script suite `584/584`, документаційні та privacy gates пройшли; live external URL не використовувався.
- GitHub Actions reconciliation: початковий Release state run `30014949722` мав conclusion success і всі успішні steps, але CheckRun `89232391443` лишився stale in-progress. Без нового push повторено лише цей workflow; replacement job `89233872636` завершився success, після чого PR став CLEAN. Branch protection не обходився.
- Залишається: server-resumable restart, справжній транспортний abort і native slow-network/minimize acceptance.

## B-03 evidence update: public HTTPS import transfer state

- Date: 2026-07-23
- Increment status: PARTIAL
- Source commit: `0a0f911`
- GitHub PR: `#79`
- Normal merge into `main`: `2df9aae9d7ab00163d55a481dd88aae36b817e3e`
- GitHub and GitLab `main`: synchronized at the same commit.
- Implemented: the complete public-HTTPS metadata-and-attach submit runs as one bounded shared transfer task; parallel submit has one RPC and one attachment; the URL never enters task labels, IDs, telemetry, or evidence; retry is account/session-bound and fail-closed.
- Security boundary: existing server-side SSRF, DNS/IP, redirect, MIME, and byte bounds remain unchanged.
- Verified: focused contracts `111/111`, full Apps Script suite `584/584`, and documentation/privacy gates passed; no live external URL was used.
- GitHub Actions reconciliation: initial Release state run `30014949722` had a success conclusion and all successful steps, but CheckRun `89232391443` remained stale in-progress. Only that workflow was rerun without a new push; replacement job `89233872636` completed successfully and the PR became CLEAN. Branch protection was not bypassed.
- Remaining: server-resumable restart, real transport abort, and native slow-network/minimize acceptance.

## Оновлення доказів B-03: відновлення збереження чернетки після restart

- Дата: 2026-07-23
- Статус інкремента: PARTIAL
- Source commit: `07954ee2e2184efa8548660105b6a7c4bef0cc86`
- GitHub PR: `#80`
- Normal merge у `main`: `dc5d98b87d35b66aa7d403b3c4d1442767f595ee`
- GitHub і GitLab `main`: синхронізовано на тому самому commit.
- Реалізовано: account-scoped content-free status RPC звіряє збереження Gmail-чернетки за тим самим operation ID після restart; клієнт не повторно надсилає MIME, вкладення, URL або токени, має не більше трьох автоматичних перевірок і fail-closed блокує відновлення, якщо тимчасові байти вкладення втрачено.
- Перевірена межа: чинний Apps Script transport підтримує ідемпотентне відновлення результату операції, але не byte-resumable або background upload. Capability flags `resumableUpload` і `backgroundUpload` залишено `false`; несправжній abort не додано.
- Перевірено: focused contracts `169/169`, повний Apps Script suite `590/590`, bilingual/knowledge/verification/release-state/diff checks пройшли, added-line sensitive-pattern scan `0`.
- Live Gmail mutation, OAuth, staging і production promotion не виконувалися.
- Залишається: справжній abort лише для транспорту, який його підтримує, та native slow-network/minimize acceptance; byte-resumable upload потребує окремого підтвердженого transport design.

## B-03 evidence update: draft-save recovery after restart

- Date: 2026-07-23
- Increment status: PARTIAL
- Source commit: `07954ee2e2184efa8548660105b6a7c4bef0cc86`
- GitHub PR: `#80`
- Normal merge into `main`: `dc5d98b87d35b66aa7d403b3c4d1442767f595ee`
- GitHub and GitLab `main`: synchronized at the same commit.
- Implemented: an account-scoped, content-free status RPC reconciles the Gmail draft save under the same operation ID after restart; the client never resends MIME, attachments, URLs, or tokens, performs at most three automatic checks, and fails closed when transient attachment bytes were lost.
- Verified boundary: the current Apps Script transport supports idempotent operation-outcome recovery, not byte-resumable or background upload. The `resumableUpload` and `backgroundUpload` capability flags remain `false`; no fake abort was added.
- Verified: focused contracts `169/169`, full Apps Script suite `590/590`, bilingual/knowledge/verification/release-state/diff checks passed, and the added-line sensitive-pattern scan found `0` matches.
- No live Gmail mutation, OAuth action, staging deployment, or production promotion was performed.
- Remaining: real abort only for a transport that supports it and native slow-network/minimize acceptance; byte-resumable upload requires a separate verified transport design.

## Оновлення доказів B-03: capability gate справжнього abort

- Дата: 2026-07-23
- Статус інкремента: PARTIAL
- Source commit: `4fe307e2992e1fe620eccb683d8d090bce7b3ed8`
- GitHub PR: `#81`
- Normal merge у `main`: `3a273310b5d1a2a52351a0c430de360a4d7b6f33`
- GitHub і GitLab `main`: синхронізовано на тому самому commit.
- Реалізовано: queued local read можна скасувати до старту; running transfer показує і приймає cancel лише після реєстрації конкретного abort callback транспортом. Це закриває race у фазі `preparing`.
- Перевірена межа: `FileReader.abort` працює як справжній abort; `google.script.run` не документує abort handle, тому Apps Script RPC не показує і не імітує cancel.
- Перевірено: focused suites `170/170`, повний Apps Script suite `591/591`, документаційні, release-state, diff і privacy gates пройшли.
- GitHub check reconciliation: terminal-success workflow мав stale in-progress CheckRun; повторено лише exact workflow без нового push, replacement CheckRun завершився `SUCCESS`, PR став `CLEAN`.
- Live Gmail mutation, OAuth, staging і production promotion не виконувалися.
- Залишається: native slow-network/minimize acceptance; майбутній справжній RPC abort потребує окремо перевіреної cancellable transport architecture.

## B-03 evidence update: real-abort capability gate

- Date: 2026-07-23
- Increment status: PARTIAL
- Source commit: `4fe307e2992e1fe620eccb683d8d090bce7b3ed8`
- GitHub PR: `#81`
- Normal merge into `main`: `3a273310b5d1a2a52351a0c430de360a4d7b6f33`
- GitHub and GitLab `main`: synchronized at the same commit.
- Implemented: a queued local read can be cancelled before execution; a running transfer exposes and accepts cancel only after its transport registers a concrete abort callback. This closes the `preparing`-phase race.
- Verified boundary: `FileReader.abort` is a real abort; `google.script.run` documents no abort handle, so Apps Script RPC exposes and simulates no cancel action.
- Verified: focused suites `170/170`, full Apps Script suite `591/591`, and documentation, release-state, diff, and privacy gates passed.
- GitHub check reconciliation: a terminal-success workflow had a stale in-progress CheckRun; only that exact workflow was rerun without a new push, its replacement CheckRun completed with `SUCCESS`, and the PR became `CLEAN`.
- No live Gmail mutation, OAuth action, staging deployment, or production promotion was performed.
- Remaining: native slow-network/minimize acceptance; future real RPC abort requires a separately verified cancellable transport architecture.

## Оновлення доказів B-03: readback blocker native acceptance

- Дата: 2026-07-23
- Статус інкремента: BLOCKED
- Documentation commit: `aa92958`
- GitHub PR: `#82`
- Normal merge у `main`: `0673e8e48be01ae4920a9070fda76ec0a9801d07`
- GitHub і GitLab `main`: синхронізовано на тому самому commit.
- Автентифікований read-only Apps Script Executions trace підтвердив, що невдалий `checkNewMail_` execution дійшов до `legacy_recovery` та завершився з `errorCode=urlfetch_quota`; сусідні content-free entries показали ту саму shared daily URL Fetch boundary для Telegram maintenance, Google OAuth token refresh і Gmail API transport.
- Ширший Apps Script Processes OAuth scope не запитувався; новий Google consent не запускався.
- Висновок: native slow-network/minimize acceptance зараз причинно недостовірний і лишається BLOCKED до clean quota window; candidate-specific regression не встановлено.
- Release boundary: production v65 незмінний, active staging `0`; menu, Gmail, OAuth, deployment і release journal не змінювалися.
- Перевірено: bilingual `80` pairs, knowledge hub `17` pairs / `295` source IDs / `245` canonical items, verification reports, release state і `git diff --check` пройшли; added-line sensitive-pattern matches `0`; усі PR checks успішні.

## B-03 evidence update: native-acceptance blocker readback

- Date: 2026-07-23
- Increment status: BLOCKED
- Documentation commit: `aa92958`
- GitHub PR: `#82`
- Normal merge into `main`: `0673e8e48be01ae4920a9070fda76ec0a9801d07`
- GitHub and GitLab `main`: synchronized at the same commit.
- An authenticated read-only Apps Script Executions trace confirmed that a failed `checkNewMail_` execution reached `legacy_recovery` and terminated with `errorCode=urlfetch_quota`; adjacent content-free entries showed the same shared daily URL Fetch boundary affecting Telegram maintenance, Google OAuth token refresh, and Gmail API transport.
- No broader Apps Script Processes OAuth scope was requested and no new Google consent was started.
- Conclusion: native slow-network/minimize acceptance is currently causally invalid and remains BLOCKED until a clean quota window; no candidate-specific regression was established.
- Release boundary: production v65 is unchanged and active staging is `0`; no menu, Gmail, OAuth, deployment, or release-journal mutation occurred.
- Verified: bilingual `80` pairs, knowledge hub `17` pairs / `295` source IDs / `245` canonical items, verification reports, release state, and `git diff --check` passed; added-line sensitive-pattern matches `0`; all PR checks passed.

## Оновлення доказів T-03: конфлікт політики `INBOX+SENT`

- Дата: 2026-07-23
- Статус контуру: BLOCKED; evidence classification `CONFLICTING`; `blocker_type=owner_decision`.
- Production v65 пропускає self/alias `INBOX+SENT`; current `main` доставляє його один раз і має focused source evidence `161/161`.
- `REQ-0009`/`REQ-0019` прямо підтримують skip self/alias copy, тоді як пізніший `GT-039` під `REQ-0033` змінив source без окремого прямого owner policy-рішення.
- `GT-039`, `B1-25`, paired current-state surfaces та verification index узгоджено; створено `VR-025`.
- Documentation commit: `98bc722f7cd364d67b21eae952de4612fc9cc245`.
- GitHub PR: `#84`; normal merge: `764720b9cb6d0f33b6dc4afe11e74b9d59c5cbb3`.
- GitHub і приватний GitLab `main` синхронізовані на exact merge commit.
- Bilingual, knowledge-hub, verification-report, release-state, diff і secret-pattern gates пройшли.
- Production v65, staging `0`, immutable v70, Telegram menu, Gmail, OAuth і release journal не змінювалися.
- Єдина owner action для цього контуру: обрати `(A)` skip self/alias `INBOX+SENT` або `(B)` exactly-once для кожного `INBOX`, включно із self/alias. Незалежні V3 workstreams продовжуються.

## T-03 evidence update: `INBOX+SENT` policy conflict

- Date: 2026-07-23
- Contour status: BLOCKED; evidence classification `CONFLICTING`; `blocker_type=owner_decision`.
- Production v65 skips self/alias `INBOX+SENT`; current `main` delivers it once and has focused `161/161` source evidence.
- `REQ-0009`/`REQ-0019` explicitly support skipping the self/alias copy, while the later `GT-039` under `REQ-0033` changed source without a separate direct owner policy decision.
- `GT-039`, `B1-25`, paired current-state surfaces, and the verification index were reconciled; `VR-025` was added.
- Documentation commit: `98bc722f7cd364d67b21eae952de4612fc9cc245`.
- GitHub PR: `#84`; normal merge: `764720b9cb6d0f33b6dc4afe11e74b9d59c5cbb3`.
- GitHub and private GitLab `main` are synchronized at the exact merge commit.
- Bilingual, knowledge-hub, verification-report, release-state, diff, and secret-pattern gates passed.
- Production v65, staging `0`, immutable v70, the Telegram menu, Gmail, OAuth, and the release journal were unchanged.
- The single owner action for this contour is to choose `(A)` skip self/alias `INBOX+SENT`, or `(B)` exactly-once for every `INBOX`, including self/alias. Independent V3 workstreams continue.

## 2026-07-23 — E-01 Telegram viewport events evidence / Доказ подій viewport Telegram

### Українською

- V3 contour `E-01` реалізовано як source-only `B1-35`, `GT-055`, `VR-026`.
- Ідемпотентний клієнтський bridge підписується на `viewportChanged`, `safeAreaChanged` та `contentSafeAreaChanged`, розділяє live/stable height і не запускає повторний bootstrap, RPC, reload, OAuth або Gmail mutation.
- Focused Mail App contracts: `89/89`; повний Apps Script suite: `594/594`.
- Bilingual, knowledge-hub, verification-report, release-state, diff і added-line sensitive-pattern gates пройшли.
- GitHub PR [#85](https://github.com/Tarasevych/gmail-telegram-controls/pull/85) пройшов `8/8` checks і був злитий normal merge як `d1b0f30110de22ba348dccba24fc3d1772e73728`.
- Той самий merge SHA fast-forward опубліковано в приватний GitLab `main`.
- Production лишається v65, staging `0`; immutable history, Telegram menu, OAuth і Gmail не змінювалися.
- Native Telegram Desktop/mobile acceptance для keyboard resize, safe-area і різних viewport heights лишається `UNVERIFIED`; загальний статус `PARTIAL`.

### English

- V3 contour `E-01` was implemented as source-only `B1-35`, `GT-055`, and `VR-026`.
- The idempotent client bridge subscribes to `viewportChanged`, `safeAreaChanged`, and `contentSafeAreaChanged`, separates live/stable height, and does not start another bootstrap, RPC, reload, OAuth, or Gmail mutation.
- Focused Mail App contracts: `89/89`; complete Apps Script suite: `594/594`.
- Bilingual, knowledge-hub, verification-report, release-state, diff, and added-line sensitive-pattern gates passed.
- GitHub PR [#85](https://github.com/Tarasevych/gmail-telegram-controls/pull/85) passed `8/8` checks and was normal-merged as `d1b0f30110de22ba348dccba24fc3d1772e73728`.
- The same merge SHA was fast-forwarded to private GitLab `main`.
- Production remains v65 and staging remains `0`; immutable history, Telegram menu, OAuth, and Gmail were unchanged.
- Native Telegram Desktop/mobile acceptance for keyboard resize, safe-area, and varying viewport heights remains `UNVERIFIED`; the overall status is `PARTIAL`.

## 2026-07-23 — E-02 desktop pane evidence / Доказ керованих desktop panes

### Українською

- V3 contour `E-02` реалізовано як source-only `B1-36`, `GT-056`, `VR-027`.
- Два desktop-only ARIA separators підтримують bounded pointer/keyboard resize; sidebar згортається до піктограм і відновлює попередню ширину.
- Layout зберігається через чинні `p0CurrentNamespace`, `p0ReadRecord` і `p0WriteRecord`; за відсутності scoped IndexedDB діє memory-only fallback.
- Не додано `localStorage`/`sessionStorage`, паралельної account model, RPC, reload, OAuth або Gmail mutation; mobile drawer не змінено.
- Focused Mail App contracts: `90/90`; повний Apps Script suite: `595/595`.
- Bilingual, knowledge-hub, verification-report, release-state, diff і added-line sensitive-pattern gates пройшли.
- GitHub PR [#86](https://github.com/Tarasevych/gmail-telegram-controls/pull/86) пройшов `8/8` checks і був злитий normal merge як `c1df786f23d120fbc3c790a20722c47330150608`.
- Той самий merge SHA fast-forward опубліковано в приватний GitLab `main`.
- Production лишається v65, staging `0`; immutable history, Telegram menu, OAuth і Gmail не змінювалися.
- Native Telegram Desktop/WebView drag, keyboard, visual layout та IndexedDB restore після restart лишаються `UNVERIFIED`; загальний статус `PARTIAL`.

### English

- V3 contour `E-02` was implemented as source-only `B1-36`, `GT-056`, and `VR-027`.
- Two desktop-only ARIA separators support bounded pointer/keyboard resizing; the sidebar collapses to icons and restores its prior width.
- Layout persists through the existing `p0CurrentNamespace`, `p0ReadRecord`, and `p0WriteRecord`; a memory-only fallback applies when scoped IndexedDB is unavailable.
- No `localStorage`/`sessionStorage`, parallel account model, RPC, reload, OAuth, or Gmail mutation was added; the mobile drawer is unchanged.
- Focused Mail App contracts: `90/90`; complete Apps Script suite: `595/595`.
- Bilingual, knowledge-hub, verification-report, release-state, diff, and added-line sensitive-pattern gates passed.
- GitHub PR [#86](https://github.com/Tarasevych/gmail-telegram-controls/pull/86) passed `8/8` checks and was normal-merged as `c1df786f23d120fbc3c790a20722c47330150608`.
- The same merge SHA was fast-forwarded to private GitLab `main`.
- Production remains v65 and staging remains `0`; immutable history, Telegram menu, OAuth, and Gmail were unchanged.
- Native Telegram Desktop/WebView drag, keyboard, visual layout, and IndexedDB restoration after restart remain `UNVERIFIED`; the overall status is `PARTIAL`.

## 2026-07-23 — B-01 access matrix evidence / Доказ матриці доступу

### Українською

- Існуючий V3 contour `B-01` продовжено в межах `B1-28`, `GT-048`, `VR-018`; нові registry IDs не створювалися.
- Повторна перевірка `mailboxMultiResolveAccess_` не підтвердила product source defect; `MultiAccount.gs` не змінено.
- Новий synthetic behavioral test перевіряє `25` role-threshold комбінацій для фактичних ролей `viewer`, `responder`, `manager`, `admin`, `owner`.
- Окремо перевірено owner/shared access, exact connection selection, zone mismatch, cross-user denial, pending/expired/revoked/replayed invites, усі підтримувані invite roles, revoked-member reactivation, revoked connection і `reauth_required`.
- Focused access matrix: `7/7`; повний Apps Script suite: `602/602`.
- Bilingual, knowledge-hub, verification-report, release-state, diff та tracked/untracked sensitive-pattern gates пройшли.
- GitHub PR [#87](https://github.com/Tarasevych/gmail-telegram-controls/pull/87) пройшов `8/8` checks і був злитий normal merge як `b5c55a2ba8b5185493f10c06f06b0deeb64b8cef`.
- Той самий merge SHA fast-forward опубліковано в приватний GitLab `main`.
- Live Gmail/OAuth/Telegram, permissions, production v65, staging `0`, menu та immutable history не змінювалися.
- Deployed/native access acceptance лишається `UNVERIFIED`; `B1-28/GT-048/VR-018` обґрунтовано лишаються `PARTIAL`.

### English

- The existing V3 `B-01` contour continued under `B1-28`, `GT-048`, and `VR-018`; no new registry IDs were created.
- Reinspection of `mailboxMultiResolveAccess_` did not confirm a product source defect; `MultiAccount.gs` is unchanged.
- A new synthetic behavioral test covers `25` role-threshold combinations for the actual `viewer`, `responder`, `manager`, `admin`, and `owner` roles.
- Separate cases cover owner/shared access, exact connection selection, zone mismatch, cross-user denial, pending/expired/revoked/replayed invites, every supported invite role, revoked-member reactivation, revoked connections, and `reauth_required`.
- Focused access matrix: `7/7`; complete Apps Script suite: `602/602`.
- Bilingual, knowledge-hub, verification-report, release-state, diff, and tracked/untracked sensitive-pattern gates passed.
- GitHub PR [#87](https://github.com/Tarasevych/gmail-telegram-controls/pull/87) passed `8/8` checks and was normal-merged as `b5c55a2ba8b5185493f10c06f06b0deeb64b8cef`.
- The same merge SHA was fast-forwarded to private GitLab `main`.
- Live Gmail/OAuth/Telegram, permissions, production v65, staging `0`, menu, and immutable history were unchanged.
- Deployed/native access acceptance remains `UNVERIFIED`; `B1-28/GT-048/VR-018` correctly remain `PARTIAL`.

## 2026-07-23 — D-01 Google Drive OAuth contract evidence / Доказ контракту Google Drive OAuth

### Українською

- V3 contour `D-01` реалізовано як source-only `B1-37`, `GT-057`, `VR-028`; першопричину зафіксовано в `RCA-011`.
- Підтверджена першопричина: Drive callback споживав одноразовий OAuth state, але не перевіряв, що state належить provider `drive`, до token exchange; error envelope також не мав повного fail-closed контролю description.
- Виправлено exact provider binding після одноразового consume і до token exchange; додано bounded/sanitized validation provider error envelope без публікації state, code, token або account identifiers.
- Synthetic contract suite перевіряє owner/session binding, exact callback/redirect, hash-only TTL/limit, expiry/replay, strict error envelope, wrong-provider denial без token exchange, token-free DTO, refresh/generation fail-closed і exact selected-account disconnect.
- Focused Drive OAuth contracts: `8/8`; повний Apps Script suite: `610/610`.
- Bilingual, knowledge-hub, verification-report, release-state, diff і sensitive-pattern gates пройшли.
- Source commit: `31bef9b126f898310214d82becedc47db8d8d544`; GitHub PR [#88](https://github.com/Tarasevych/gmail-telegram-controls/pull/88) пройшов `8/8` checks і був злитий normal merge як `10b1d99665a296ee4d6f69997b039d0dae9f59f3`.
- Той самий merge SHA fast-forward опубліковано в приватний GitLab `main`.
- Живий OAuth, Google consent, Gmail/Drive mutation, staging і production promotion не виконувалися. Production лишається v65, staging `0`.
- Native callback acceptance лишається `UNVERIFIED`; загальний статус контуру `PARTIAL`.

### English

- V3 contour `D-01` was implemented as source-only `B1-37`, `GT-057`, and `VR-028`; the root cause is recorded in `RCA-011`.
- Confirmed root cause: the Drive callback consumed a one-use OAuth state but did not verify that the state belonged to provider `drive` before token exchange; its error envelope also lacked complete fail-closed description validation.
- Exact provider binding now occurs after one-use consumption and before token exchange; bounded and sanitized provider error-envelope validation was added without publishing state, code, token, or account identifiers.
- The synthetic contract suite covers owner/session binding, exact callback/redirect, hash-only TTL/limit, expiry/replay, strict error envelopes, wrong-provider denial without token exchange, token-free DTOs, fail-closed refresh/generation behavior, and exact selected-account disconnect.
- Focused Drive OAuth contracts: `8/8`; complete Apps Script suite: `610/610`.
- Bilingual, knowledge-hub, verification-report, release-state, diff, and sensitive-pattern gates passed.
- Source commit: `31bef9b126f898310214d82becedc47db8d8d544`; GitHub PR [#88](https://github.com/Tarasevych/gmail-telegram-controls/pull/88) passed `8/8` checks and was normal-merged as `10b1d99665a296ee4d6f69997b039d0dae9f59f3`.
- The same merge SHA was fast-forwarded to private GitLab `main`.
- No live OAuth, Google consent, Gmail/Drive mutation, staging deployment, or production promotion occurred. Production remains v65 and staging remains `0`.
- Native callback acceptance remains `UNVERIFIED`; the overall contour status is `PARTIAL`.

## 2026-07-23 — G-01 Spam list policy evidence / Доказ політики Spam list

### Українською

- V3 contour `G-01` реалізовано як source-test/evidence-only `B1-38`, `GT-058`, `VR-029`.
- Повторна перевірка source не підтвердила product defect: explicit `/mail folder:spam` уже компілює exact system label `SPAM`, використовує `includeSpamTrash=true`, bounded page token і лише read-only Gmail list endpoint.
- Proactive notification worker лишається окремим time-slice path та через `gmailNotificationLabelsEligible_` приймає current `INBOX`, але відхиляє `SPAM`, `TRASH`, `INBOX+SPAM` і `INBOX+TRASH`.
- Новий synthetic contract фіксує parser, дві Spam pages, exact label, відсутність mutation endpoint і незалежний proactive eligibility gate; `Code.gs` не змінено.
- Focused contract: `2/2`; повний Apps Script suite: `612/612`.
- Bilingual, knowledge-hub, verification-report, release-state, diff і sensitive-pattern gates пройшли.
- Source-test commit: `53e64a68fe1291e274c1ec2b61995c60f1cf1544`; GitHub PR [#89](https://github.com/Tarasevych/gmail-telegram-controls/pull/89) пройшов `8/8` checks і був злитий normal merge як `d4e56943443332c34d381b8be22314aa9ce1cb73`.
- Той самий merge SHA fast-forward опубліковано в приватний GitLab `main`.
- Live Gmail, Telegram, OAuth, staging і production не змінювалися. Production лишається v65, staging `0`.
- Native owner acceptance для `/mail folder:spam`, next-page callback і empty/error states лишається `UNVERIFIED`; загальний статус `PARTIAL`.

### English

- V3 contour `G-01` was implemented as source-test/evidence-only `B1-38`, `GT-058`, and `VR-029`.
- Source reinspection confirmed no product defect: explicit `/mail folder:spam` already compiles the exact `SPAM` system label, uses `includeSpamTrash=true`, a bounded page token, and only the read-only Gmail list endpoint.
- The proactive notification worker remains a separate time-slice path and, through `gmailNotificationLabelsEligible_`, accepts current `INBOX` while rejecting `SPAM`, `TRASH`, `INBOX+SPAM`, and `INBOX+TRASH`.
- A new synthetic contract pins the parser, two Spam pages, exact label, absence of mutation endpoints, and the independent proactive eligibility gate; `Code.gs` is unchanged.
- Focused contract: `2/2`; complete Apps Script suite: `612/612`.
- Bilingual, knowledge-hub, verification-report, release-state, diff, and sensitive-pattern gates passed.
- Source-test commit: `53e64a68fe1291e274c1ec2b61995c60f1cf1544`; GitHub PR [#89](https://github.com/Tarasevych/gmail-telegram-controls/pull/89) passed `8/8` checks and was normal-merged as `d4e56943443332c34d381b8be22314aa9ce1cb73`.
- The same merge SHA was fast-forwarded to private GitLab `main`.
- Live Gmail, Telegram, OAuth, staging, and production were unchanged. Production remains v65 and staging remains `0`.
- Native owner acceptance for `/mail folder:spam`, the next-page callback, and empty/error states remains `UNVERIFIED`; the overall status is `PARTIAL`.
