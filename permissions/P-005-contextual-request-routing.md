# P-005: Контекстна маршрутизація запитів / Contextual request routing

- Status / Статус: active / чинне
- Source request / Джерело: `REQ-0002` on `Запити`

<!-- lang:uk -->
## Українською

Власник прямо дозволяє:

- до виконання створювати й публікувати очищений двомовний запис кожного проєктного звернення в `Запити`;
- розділяти повідомлення на логічні частини та контекстуально визначати їх належність;
- оновлювати `Інструкції`, коли частина прямо встановлює постійне правило;
- оновлювати `Повноваження` лише коли власник прямо надає, змінює, обмежує або відкликає конкретний дозвіл;
- оновлювати план, проблеми, документацію чи код активної Versie лише коли відповідна частина прямо їх стосується;
- commit і push таких релевантних змін із посиланням на `REQ-ID`.

## Межі

- Не перетворювати звичайне доручення на нове загальне повноваження.
- Не читати й не змінювати нерелевантні permission records.
- Не розширювати дозвіл за аналогією або припущенням.
- Це повноваження не дозволяє створювати наступну Versie, release, OAuth consent, витрачати кошти, обходити CAPTCHA або публікувати секрети.
- Захищені дані залишаються лише у приватному checkpoint або protected storage.

<!-- lang:en -->
## English

The owner explicitly authorizes:

- creating and publishing a sanitized bilingual record of each project request on `Запити` before execution;
- splitting a message into logical parts and contextually determining where each belongs;
- updating `Інструкції` when a part explicitly establishes a standing rule;
- updating `Повноваження` only when the owner explicitly grants, changes, narrows, or revokes specific authority;
- updating the active Versie's plan, issues, documentation, or code only when the applicable part directly concerns it;
- committing and pushing those relevant changes with a `REQ-ID` reference.

## Boundaries

- Do not convert a normal task instruction into broad new authority.
- Do not read or change unrelated permission records.
- Do not extend authority by analogy or assumption.
- This permission does not authorize a next Versie, release, OAuth consent, spending, CAPTCHA bypass, or secret publication.
- Protected data remains only in a private checkpoint or protected storage.