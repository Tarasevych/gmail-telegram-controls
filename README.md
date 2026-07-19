# Gmail Telegram Controls

<!-- lang:uk -->
## Українською

Головний Telegram Mini App для `@TarasevychGmailNotifierBot`.

### Поточна лінія проєкту

- Активна версія в розробці: **Versie 1 · 2026-07-19**.
- Поточний public production залишається на раніше перевіреному Apps Script v37, доки Versie 1 не завершить acceptance.
- Продуктові випуски рухаються лише послідовно: Versie 1, Versie 2, Versie 3 тощо.
- Номери Apps Script immutable є технічними deployment ID, а не назвами продуктових версій.
- Одночасно використовується одна активна гілка розробки; завершені release-гілки й теги є незмінними доказами.

Путівник проєкту: [Українською](docs/uk/README.md) | [English](docs/en/README.md)

Прямі реєстри: [Проблеми](docs/uk/ISSUES.md) | [План](docs/uk/ROADMAP.md) | [Історія Versie 1](docs/uk/releases/VERSIE-001-2026-07-19.md) | [Правило двомовної документації](docs/uk/BILINGUAL_DOCUMENTATION.md)

Репозиторій зберігає очищені історичні Apps Script baseline у `apps-script/` та кумулятивного кандидата Versie 1. Напрям продукту й перевірені докази аудиту містяться в `docs/`. Runtime-облікові дані, OAuth-сесії, вміст поштових скриньок і deployment-local конфігурація навмисно виключені з Git.

Ця сторінка не містить Gmail-облікових даних, bot token, chat ID або постійних облікових даних поштової скриньки. Telegram передає підписаний `initData` під час виконання. Для mail client ця головна сторінка видаляє Telegram metadata з історії браузера й передає `initData` до Apps Script через same-window form POST; значення ніколи не потрапляє до backend URL або client storage. Apps Script перевіряє підпис, власника, актуальність і одноразову replay claim, після чого повертає лише одноразовий launch nonce на 60 секунд. MailApp обмінює nonce на абсолютну 20-хвилинну RPC-сесію, що зберігається лише в JavaScript memory.

Bridge має обмежувальну CSP, надсилає POST лише до `script.google.com` і відновлює deep-link state тільки з дозволених полів `view`, `folder`, `thread`, `message`, `filter` та `panel`. Telegram-поля `tgWebAppData`, platform і version fragment ніколи не копіюються до route. CSP також дозволяє JSONP-відповідь Google Apps Script з `script.google.com`/`script.googleusercontent.com` лише для тимчасового compatibility path старих карток.

Нові картки листів використовують native Telegram `callback_data` для `.eml`, archive, trash, spam і RFC 8058 one-click unsubscribe, тому ці дії не відкривають цю сторінку. Сторінка зберігає backward compatibility зі старими картками: їхня дія запускається одразу без confirmation screen, вимагає одночасно private key і свіжий owner-bound Telegram `initData`, після чого автоматично закривається. Delete завжди переміщує лист до Gmail Trash і ніколи не виконує permanent deletion.

<!-- lang:en -->
## English

Top-level Telegram Mini App for `@TarasevychGmailNotifierBot`.

## Current project line

- Active development version: **Versie 1 · 2026-07-19**.
- Current public production remains the previously verified Apps Script v37 until Versie 1 completes acceptance.
- Product builds now advance only sequentially: Versie 1, Versie 2, Versie 3, and so on.
- Apps Script immutable numbers are technical deployment IDs, not product version names.
- One active development branch is used at a time; completed release branches and tags are immutable evidence.

Project guide: [Українська](docs/uk/README.md) | [English](docs/en/README.md)

Direct registers: [Problems](docs/en/ISSUES.md) | [Roadmap](docs/en/ROADMAP.md) | [Versie 1 history](docs/en/releases/VERSIE-001-2026-07-19.md) | [Bilingual documentation rule](docs/en/BILINGUAL_DOCUMENTATION.md)

The repository preserves sanitized historical Apps Script baselines under `apps-script/` and the cumulative Versie 1 candidate. Product direction and verified audit evidence live under `docs/`. Runtime credentials, OAuth sessions, mailbox content, and deployment-local configuration are intentionally excluded from Git.

The page contains no Gmail credentials, bot token, chat ID, or permanent
mailbox credential. Telegram supplies signed `initData` at runtime. For the
mail client, this top-level page removes Telegram metadata from browser history
and sends `initData` in a same-window form POST to Apps Script; it never places
that value in the backend URL or client storage. Apps Script validates the
signature, owner, freshness, and one-use replay claim, then returns only a
60-second single-use launch nonce. MailApp redeems that nonce for an absolute
20-minute RPC session held only in JavaScript memory.

The bridge has a restrictive CSP, posts only to `script.google.com`, and
reconstructs deep-link state solely from allowlisted `view`, `folder`,
`thread`, `message`, `filter`, and `panel` fields. Telegram's `tgWebAppData`, platform, and version
fragment fields are never copied into the route. The CSP also permits Google
Apps Script's `script.google.com`/`script.googleusercontent.com` JSONP response
only for the temporary legacy-card compatibility path described below.

New mail cards use native Telegram `callback_data` for `.eml`, archive, trash,
spam, and RFC 8058 one-click unsubscribe, so these actions never open this page.
The page keeps backward compatibility with older cards: their action starts
immediately without a confirmation screen, requires both the private key and
fresh owner-bound Telegram `initData`, and closes automatically. Delete always
moves mail to Gmail Trash; it never performs permanent deletion.

## Structured project hub / Структурований хаб проєкту

Start with [KNOWLEDGE_HUB.md](KNOWLEDGE_HUB.md) for bilingual navigation, request history, instructions, permissions, and the active Versie roadmap.
