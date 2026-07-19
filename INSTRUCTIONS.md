# Інструкції власника / Owner instructions

<!-- lang:uk -->
## Українською

Ця гілка є канонічним журналом інтерпретованих запитів та постійних інструкцій власника для `Tarasevych/gmail-telegram-controls`.

## Обов'язковий порядок перед виконанням проєктного запиту

1. Оновити remote references для `main`, `Інструкції`, `Повноваження` й активної гілки Versie.
2. Прочитати цей файл, [політику журналу](instructions/REQUEST_POLICY.md), [індекс запитів](REQUESTS.md) і запис поточного запиту.
3. Прочитати актуальні `README`, `PROJECT`, `ROADMAP`, `ISSUES`, `VERSIONING` та останню кумулятивну release-статтю поточної Versie.
4. Прочитати `PERMISSIONS.md` гілки `Повноваження`, знайти в індексі й прочитати лише релевантний запис повноваження для routine-роботи.
5. До продуктових змін створити, перевірити, commit і push окремий очищений від секретів запис запиту в цій гілці.
6. Виконувати тільки зафіксовану інтерпретацію. Після виконання оновити запис статусом, доказами та commit-посиланнями.

## Заборона несанкціонованої наступної Versie

- Поточна робоча версія: **Versie 1**.
- Виправлення, функції та документація додаються до поточної Versie, доки власник прямо не накаже створити конкретну наступну Versie.
- Формулювання на кшталт «виправити», «додати», «продовжити», «опублікувати зміни» або «протестувати» не є дозволом створити нову Versie.
- Створення гілки, release article, tag, immutable deployment або production release для Versie 2+ дозволене лише якщо новий запис запиту містить `Next Versie authorization: yes, Versie N` і відтворює прямий наказ власника.

## Повний pre-version аудит

Перед створенням або випуском наступної Versie потрібно:

1. Прочитати всі tracked Markdown-сторінки актуальних `main`, `Інструкції`, `Повноваження` та активної Versie.
2. Прочитати всі записи інструкцій, повноважень, плану, проблем і кумулятивної історії.
3. Звірити git branches, commits, tags, remote, deployments, checkpoint, heartbeat і runtime-процеси.
4. Записати результат аудиту й точний дозвіл власника в request record до створення нової гілки або immutable release.

Routine-запити не вимагають повторного читання нерелевантних повноважень; повний перегляд усіх сторінок є окремим обов'язковим gate саме перед наступною Versie.

<!-- lang:en -->
## English

This branch is the canonical ledger of interpreted owner requests and standing instructions for `Tarasevych/gmail-telegram-controls`.

## Mandatory order before executing a project request

1. Refresh remote references for `main`, `Інструкції`, `Повноваження`, and the active Versie branch.
2. Read this file, the [request policy](instructions/REQUEST_POLICY.md), the [request index](REQUESTS.md), and the current request record.
3. Read the current `README`, `PROJECT`, `ROADMAP`, `ISSUES`, `VERSIONING`, and latest cumulative release article for the active Versie.
4. Read `PERMISSIONS.md` from `Повноваження`, then use its index to read only the relevant permission record for routine work.
5. Before product changes, create, validate, commit, and push a separate secret-free interpreted request record on this branch.
6. Execute only the recorded interpretation. After execution, update the record with status, evidence, and commit links.

## No unauthorized next Versie

- Current working release: **Versie 1**.
- Fixes, features, and documentation stay in the current Versie until the owner directly orders creation of a specific next Versie.
- Requests such as "fix", "add", "continue", "publish changes", or "test" do not authorize a new Versie.
- A branch, release article, tag, immutable deployment, or production release for Versie 2+ is allowed only when a new request record contains `Next Versie authorization: yes, Versie N` and records the owner's direct order.

## Full pre-version audit

Before creating or releasing the next Versie:

1. Read every tracked Markdown page from the current `main`, `Інструкції`, `Повноваження`, and active Versie.
2. Read every instruction, permission, plan, problem, and cumulative-history record.
3. Reconcile Git branches, commits, tags, remote, deployments, checkpoint, heartbeat, and runtime processes.
4. Record the audit result and exact owner authorization in the request record before creating a branch or immutable release.

Routine requests do not require bulk-reading unrelated permissions. The full all-page review is a separate mandatory gate specifically for the next Versie.
