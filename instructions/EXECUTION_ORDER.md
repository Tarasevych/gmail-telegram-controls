# Порядок трактування і виконання / Interpretation and execution order

Source request: `REQ-0002`.

<!-- lang:uk -->
## Українською

1. Зареєструвати очищене звернення в `Запити`.
2. Виділити окремі логічні частини.
3. Класифікувати кожну частину як instruction, permission, plan, issue, product, documentation або release.
4. Для instruction оновити `Інструкції`; для permission потрібне пряме формулювання власника; для plan, issue, documentation чи product змінити лише активну Versie.
5. Не торкатися контуру зі значенням `no-change`.
6. У похідному файлі вказати `Source request: REQ-NNNN`.
7. Після виконання повернутися до `Запити` і зафіксувати результат.

Одне повідомлення може змінити кілька контурів, але лише через окремо класифіковані частини. Воно не дає необмеженого права змінювати всі повноваження або всі файли.

<!-- lang:en -->
## English

1. Register the sanitized request on `Запити`.
2. Extract separate logical parts.
3. Classify each part as instruction, permission, plan, issue, product, documentation, or release.
4. For instruction, update `Інструкції`; permission requires explicit owner wording; plan, issue, documentation, or product changes only the active Versie.
5. Do not touch an area routed as `no-change`.
6. Add `Source request: REQ-NNNN` to every derived file.
7. Return to `Запити` after execution and record the result.

One message may change several areas, but only through separately classified parts. It never grants unrestricted authority to change all permissions or all files.