# REQ-0001: Гілка інструкцій і gate наступної Versie / Instruction branch and next-Versie gate

- ID: REQ-0001
- Received: 2026-07-19
- Status: recorded
- Active Versie: Versie 1
- Next Versie authorization: no
- Sensitive data persisted: no

<!-- lang:uk -->
## Українською

## Інтерпретація запиту власника

- Створити окрему GitHub-гілку `Інструкції` для постійних наказів, інструкцій та історії проєктних запитів.
- Перед виконанням кожного наступного проєктного запиту спочатку створювати й публікувати очищений двомовний request record.
- Перед routine-роботою читати інструкції, поточний план і релевантне повноваження.
- Перед створенням або випуском наступної Versie провести повний аудит усіх GitHub Markdown-сторінок, інструкцій, повноважень, планів, проблем і стану release/runtime.
- Не створювати Versie 2 або іншу наступну Versie без нового прямого наказу власника.
- До такого наказу всі виправлення й доповнення належать поточній Versie 1.
- Зберігати історію запитів як джерело рішень, не публікуючи конфіденційні значення.

## Критерії завершення

- Remote-гілка `Інструкції` існує.
- Цей запис опублікований до продуктових змін за запитом.
- Канонічний порядок читання й release gate описаний двома мовами.
- CI перевіряє структуру, індексацію, двомовність і базове secret hygiene request records.
- Bootstrap-правило перенесене до root `AGENTS.md` робочих гілок.

<!-- lang:en -->
## English

## Interpreted owner request

- Create a dedicated GitHub branch named `Інструкції` for standing instructions and project request history.
- Before executing each subsequent project request, first create and publish a sanitized bilingual request record.
- Before routine work, read the instructions, current plan, and relevant permission.
- Before creating or releasing the next Versie, perform a full audit of every GitHub Markdown page, instruction, permission, plan, problem, and release/runtime state.
- Do not create Versie 2 or another next Versie without a new direct owner order.
- Until that order, every correction and addition belongs to the current Versie 1.
- Preserve request history as decision evidence without publishing confidential values.

## Completion criteria

- The remote `Інструкції` branch exists.
- This record is published before related product changes.
- The canonical reading order and release gate are documented in both languages.
- CI validates structure, indexing, bilingual markers, and basic secret hygiene for request records.
- The bootstrap rule is propagated into root `AGENTS.md` on working branches.
