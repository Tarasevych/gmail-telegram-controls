# REQ-0005: Приватний Onderzoeksarchief / Private Onderzoeksarchief

- ID: REQ-0005
- Received: 2026-07-19
- Status: recorded
- Active Versie: Versie 1
- Next Versie authorization: no
- Sensitive data persisted: encrypted archive only; no plaintext secrets in Git
- Routes: requests=record; instructions=update; permissions=update; plan=update; product=reference; release=no-change
- Permission basis: explicit

<!-- lang:uk -->
## Українською

## Інтерпретація запиту власника

- Зберегти як дослідницьке першоджерело повну доступну видиму історію поточного task і попереднього task `Налаштувати email-сповіщення в Телег`: owner messages, assistant responses, visible progress updates, tool calls/results, attachments і створені project artifacts.
- Не втратити зв'язок `питання -> відповідь -> дія -> результат -> доказ`, хронологію, невдалі команди, помилки, виправлення, рішення, конфлікти й незавершені кроки.
- Створити логічну навігацію, manifests, hashes, provenance та тематичні покажчики, щоб інший task міг використовувати вже виконану роботу без повторного аналізу.
- Назвати приватний контур нідерландською: `Onderzoeksarchief`; цільовий repository: `Tarasevych/gmail-telegram-onderzoeksarchief`.
- Уся супровідна документація й навігація мають бути еквівалентними українською та англійською.
- У публічному `Tarasevych/gmail-telegram-controls` зберігати лише санітизований покажчик, правила і secure retrieval reference, без transcript contents.
- Продовжувати архівацію майбутніх Gmail/Telegram project tasks після material phases, зберігаючи request/task identity й exact provenance.

## Безпечна технічна інтерпретація

- GitHub visibility задається на рівні repository, а branch protection керує write/merge rules, не приховує branch contents. Тому private branch у публічному repository не може виконати вимогу конфіденційності; використовується окремий private repository. Джерела: [repository visibility](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/setting-repository-visibility), [protected branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches).
- Повний оригінальний видимий transcript зберігається client-side encrypted. Ключ/пароль не потрапляє в Git, Markdown, request records, terminal output або chat response.
- Санітизовані indexes і research summaries не містять token values, passwords, cookies, OAuth codes, private keys, recovery values, mailbox contents або інших secrets.
- Hidden chain-of-thought, system/developer prompts і внутрішні недоступні моделі даних не є user-visible chat history та не експортуються. Зберігаються лише доступні owner/assistant/tool події.
- Якщо повне джерело недоступне, reconstruction не видається за exact transcript: manifest фіксує coverage, gaps, source files і hashes.

## Явно надане повноваження

Власник прямо дозволяє Codex знаходити, читати, структурувати, шифрувати й передавати до окремого private repository доступні історії двох названих Gmail/Telegram tasks та їхні project artifacts для дослідницького й recovery-використання. Це повноваження не дозволяє публікувати transcript contents, plaintext secrets або unrelated chats і не змінює Gmail, Telegram, Apps Script чи production.

## Критерії завершення

- `REQ-0005` опубліковано до читання transcript sources.
- Окремий repository створено з visibility `private`, а не як branch публічного repository.
- Обидва task визначені стабільними IDs; збережено source manifests, hashes, event counts і completeness status.
- Доступна оригінальна історія збережена в encrypted artifacts; розшифрування можливе лише через protected local key reference поза Git.
- Є двомовні README, navigation, chronology, decisions, failures, artifacts, unresolved work і retrieval procedure.
- Публічний repository містить лише санітизований двомовний locator та standing instructions/permissions.
- Secret scan plaintext tree проходить; archive decryption/readback і hash verification проходять без логування sensitive values.
- Git commits/push і private visibility перевірені; temporary plaintext exports і processes видалені.
- Runtime, deployment і Versie identity не змінені; Versie 2 не створена.

<!-- lang:en -->
## English

## Interpreted owner request

- Preserve as a research primary source the complete available visible history of the current task and the prior `Налаштувати email-сповіщення в Телег` task: owner messages, assistant responses, visible progress updates, tool calls/results, attachments, and created project artifacts.
- Preserve the `question -> answer -> action -> result -> evidence` relationship, chronology, failed commands, errors, corrections, decisions, conflicts, and unfinished steps.
- Create logical navigation, manifests, hashes, provenance, and thematic indexes so another task can reuse completed work without repeated analysis.
- Give the private area a Dutch name, `Onderzoeksarchief`; target repository: `Tarasevych/gmail-telegram-onderzoeksarchief`.
- All supporting documentation and navigation must have equivalent Ukrainian and English versions.
- Keep only a sanitized locator, rules, and secure retrieval reference in the public `Tarasevych/gmail-telegram-controls`; do not place transcript contents there.
- Continue archiving future Gmail/Telegram project tasks after material phases while preserving request/task identity and exact provenance.

## Safe technical interpretation

- GitHub visibility is repository-wide, while branch protection controls write and merge rules rather than hiding branch contents. A private branch inside a public repository cannot meet the confidentiality requirement, so a separate private repository is used. Sources: [repository visibility](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/setting-repository-visibility), [protected branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches).
- The complete original visible transcript is stored client-side encrypted. The key/password never enters Git, Markdown, request records, terminal output, or a chat response.
- Sanitized indexes and research summaries contain no token values, passwords, cookies, OAuth codes, private keys, recovery values, mailbox contents, or other secrets.
- Hidden chain-of-thought, system/developer prompts, and inaccessible internal model data are not user-visible chat history and are not exported. Only available owner/assistant/tool events are retained.
- If a complete source is unavailable, a reconstruction is not presented as an exact transcript: the manifest records coverage, gaps, source files, and hashes.

## Explicitly granted authority

The owner explicitly authorizes Codex to locate, read, structure, encrypt, and transfer to a separate private repository the available histories of the two named Gmail/Telegram tasks and their project artifacts for research and recovery use. This authority does not permit publishing transcript contents, plaintext secrets, or unrelated chats and does not change Gmail, Telegram, Apps Script, or production.

## Completion criteria

- `REQ-0005` is published before transcript sources are read.
- A separate repository is created with `private` visibility, not as a branch of the public repository.
- Both tasks have stable IDs; source manifests, hashes, event counts, and completeness status are retained.
- Available original history is stored in encrypted artifacts; decryption is possible only through a protected local key reference outside Git.
- Bilingual README, navigation, chronology, decisions, failures, artifacts, unresolved-work, and retrieval procedure pages exist.
- The public repository contains only a sanitized bilingual locator and standing instructions/permissions.
- Plaintext-tree secret scanning passes; archive decryption/readback and hash verification pass without logging sensitive values.
- Git commits/push and private visibility are verified; temporary plaintext exports and processes are removed.
- Runtime, deployment, and Versie identity remain unchanged; Versie 2 is not created.
