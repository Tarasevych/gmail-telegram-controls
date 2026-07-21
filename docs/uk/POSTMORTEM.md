# Postmortem доставки Versie 1: v42-v55

[English](../en/POSTMORTEM.md) | [Путівник проєкту](README.md) | [VR-002](verification-reports/reports/VR-002/README.md)

Джерело запиту: `REQ-0010`. Схема перевірки: `REQ-0004`.

## Межі доказів

Цей postmortem є структурованою реконструкцією наданого логу агентської сесії v42-v55 та архітектурного огляду. Він не підміняє production-доказ аналізом source або локальним тестом. Твердження, яких наданий текст не доводить, позначено `unverified`. Зокрема, v55 містив локальні кандидатні зміни, але до завершення вихідного логу не пройшов тести, preflight, immutable deployment або production acceptance.

## Архітектура за підсистемами

### Realtime-смуга доставки

- v42 виявив збій доставки: maintenance і frozen backlog pass виконувалися перед delivery, тоді як frozen upper bound не міг включити лист, створений після початку цього проходу.
- v43 додав bounded newest-first realtime lane, per-connection watermark/retry state, shared seen dedupe та delivery-first scheduling. Frozen scanner залишився recovery-механізмом.
- v44 виправив узгодження scope/query швидкої смуги.
- v45-v46 зберігали помилки кожного етапу, щоб пізніший success або maintenance output їх не приховував.
- v48 ізолював realtime від спільного `UserLock`, який міг утримуватися під час повільного I/O.
- v51 зберіг та агрегував результат кожної multi-account смуги й пріоритет `REAUTH`.
- v52-v54 розширили контрольне acceptance на Spam і відновили точний Spam-кейс із логу.
- v55 виключає `SENT+INBOX` із notification eligibility, щоб один логічний лист не створював дві картки. Це виправлення v55 має статус `unverified`.

### Frozen backlog scanner

- v42 довів, що frozen `upperBoundMs` безпечний для детермінованого backfill, але непридатний як єдине realtime-джерело.
- v43 поставив scanner після realtime lane і зберіг його для bounded recovery/backfill.
- v44 узгодив query scope із контрактом доставки.
- v48 не дозволив scanner locking блокувати realtime delivery.
- v52-v54 узгодили Spam recovery з тією самою canonical eligibility та dedupe-логікою, що й realtime delivery.

### Telegram card index і capacity

- v47 додав compaction, але один capacity guard і далі рахував raw index.
- v49-v50 перевели capacity accounting на валідні live records замість serialized entries і додали очищення terminal records.
- Інваріант: одна фізична Telegram-картка на один логічний Gmail-лист. Account roots є фільтрованими views, а не окремими сховищами дублікатів.

### Retention і purge

- v47 запровадив compaction як першу межу очищення.
- v49-v50 усунули спостережене вичерпання capacity через stale або terminal records, включно з `delete_too_old`.
- Capacity треба рахувати після validation і purge; raw довжина property/index не є допустимою метрикою.

### Multi-account fan-out

- Аналіз source v42 показав, що notification fan-out використовував `notificationConnectionIds`; active account був UI-вибором, а не межею доставки.
- v51 виправив втрату per-account результатів, зберіг reauthorization failures і зробив outcomes кожного акаунта спостережуваними.
- Shared seen ledger гарантує at-most-once створення картки, тоді як callbacks і labels залишаються connection-scoped.
- Runtime acceptance з усіма потрібними реальними акаунтами не доводиться лише source inspection і має статус `unverified`, якщо в наданому логу немає acceptance-доказу.

### Immutable release, staging і rollback

- v43 виявив preflight drift через whitespace-sensitive artifacts і застарілі rollback hashes/descriptions.
- Кожний immutable треба будувати з точного протестованого source bundle, закріплювати hash, читати назад після mutation і приймати у staging до production promotion.
- Rollback означає вибір раніше перевіреного immutable artifact, а не редагування чи повторне збирання історичного випуску.
- v55 залишався локальним кандидатом наприкінці наданого логу, тому його не можна називати deployed або accepted.

## Root cause analysis

| № | Виявлено у | Симптом | Root cause | Виправлення | Як запобігти |
|---:|---|---|---|---|---|
| 1 | v42 | Новий Gmail-лист не створив Telegram-картку | Maintenance і frozen backlog передували realtime delivery; frozen upper bound виключав новіший лист | v43 | Спочатку запускати bounded realtime lane, frozen scan лишати для recovery |
| 2 | v43 | Preflight відхиляв функціонально рівні artifacts | Release comparison залежав від whitespace | v43 | Детерміновано нормалізувати та hash-pin точний release bundle |
| 3 | v43 | Rollback metadata не відповідали кандидату | Hashes/descriptions були взяті із застарілого release state | v43 | Генерувати metadata з pinned bundle і перевіряти readback |
| 4 | v44 | Покриття fast lane не відповідало контракту | Межі search scope/query розійшлися | v44 | Тестувати query boundary листами всередині й поза кожною lane |
| 5 | staging check | `/check` дав false negative | Staging-виклик не містив обов’язкового private key | Виправлено invocation | Вважати форму authenticated probe тестованим контрактом |
| 6 | v45-v46 | Помилку етапу приховував пізніший output | Result aggregation перезаписував або не зберігав stage-specific errors | v45-v46 | Агрегувати outcomes монотонно й зберігати найвищу severity |
| 7 | v47 | Card capacity вичерпувалася завчасно | Guard рахував raw serialized index | v49-v50 | Рахувати лише validated live records після compaction |
| 8 | v49-v50 | Capacity лишалася вичерпаною приблизно на 72 records | Terminal/stale records і далі займали limit | v50 | Purge terminal records до capacity evaluation |
| 9 | v48 | Realtime delivery чекала на сторонню роботу | Shared `UserLock` охоплював повільний I/O | v48 | Використовувати account-scoped locks і не тримати lock під час external I/O |
| 10 | v50 | Накопичувалися `delete_too_old` records | Retention не мав повного purge terminal state | v50 | Визначити й тестувати lifecycle transitions і terminal cleanup |
| 11 | v47 | Compaction існував, але не запобіг guard failure | Capacity call site і далі використовував старий raw index | v49-v50 | Тестувати кожного caller інваріанта, не лише helper |
| 12 | v51 | Результати частини акаунтів зникали | Fan-out return values відкидалися | v51 | Збирати typed result кожного connection і перевіряти cardinality |
| 13 | v51 | `REAUTH` міг виглядати як outcome нижчої severity | Aggregation не зберігав severity precedence | v51 | Визначити explicit severity lattice і тестувати mixed outcomes |
| 14 | v52-v54 | Контрольний лист `kimnata` не доставлявся | Лист був у Spam, а відповідний шлях припускав Inbox | v52-v54 | Тестувати canonical eligibility для Inbox, Spam та виключених Sent-комбінацій |
| 15 | v51 | Retry міг дублювати або втрачати create/journal transition | External creation і journal visibility були eventually consistent | v51 | Використовувати idempotency keys і readback recovery для ambiguous mutations |
| 16 | unverified version | Runtime probe падав за валідного endpoint | Probe використовував GET замість required POST | Правильний POST probe | Зберігати method, auth і payload в одному executable probe contract |
| 17 | unverified version | Структурно рівний test object не проходив `deepStrictEqual` | Objects походили з різних VM realms | Realm-safe assertion | Порівнювати serialized/domain fields, а не realm prototypes |
| 18 | v55 | Один логічний лист міг створити дві Telegram-картки | `SENT+INBOX` відповідав більш ніж одному notification path | v55 candidate, `unverified` | Єдина canonical eligibility function і shared at-most-once key |
| 19 | до v43 | Українські й англійські issue references розійшлися | Paired pages мали різні `GT-*` identifiers | Виправлено до v43 | Перевіряти identifier parity разом із file parity |
| 20 | v55 | Статус кандидата було легко перебільшити | Робота зупинилася до tests, preflight, deployment та acceptance | Перевірка ще потрібна | Статус release має походити з доказів, а не з наявності edits |

## Стійкі інваріанти

1. Active Gmail account керує лише UI context; delivery виконує fan-out до всіх enabled connections.
2. Один логічний Gmail-лист створює не більше однієї Telegram-картки.
3. Realtime delivery не блокується frozen backlog work або global lock, що утримується під час I/O.
4. Capacity рахує validated live records після purge.
5. Release не прийнятий, доки tests, preflight, immutable readback, staging і production acceptance не мають окремих доказів.

## Перевірка публікації

GitHub Actions run [29788979153](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29788979153) довів, що bilingual і knowledge-hub checks пройшли, але verification-report check упав, бо обидві сторінки VR-002 не містили repository-wide framework marker `REQ-0004`. Парне виправлення VR-002 входить до цього документаційного етапу; до нового green run публікація не вважається перевіреною.
