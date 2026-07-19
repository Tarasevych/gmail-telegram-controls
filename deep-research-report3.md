# deep-research-report3 (Build 1 continuation)

## Ціль цього проходу
Відновити та продовжити v28-ініціативу на базі `C:\Users\t\Documents\Telegram\gmail-telegram-v45-gentle-milestones` без змішування з іншими робочими лініями, з перевіркою реального стану git/branch/remote, checkpoint/heartbeat, preflight і локальних інструментів.

> З 2026-07-19 продуктова нумерація перезапущена як послідовні Build 1, Build 2, ... . Позначення v27-v47 нижче збережені лише як історичні назви та технічні Apps Script докази; вони більше не визначають назву нового продуктового випуску.

## База і джерела
- Основна робоча директорія: `C:\Users\t\Documents\Telegram\gmail-telegram-v45-gentle-milestones`.
- `gmail-telegram-v44-co-processing` і `gmail-telegram-notifier` враховані лише як референсний досвід.
- `deep-research-report3` у `C:\Users\t\Documents\Codex` вже фіксує глобальну постановку; це розширення продовжує його у локальній v45-лінеї.

## Перевірки відновлення, виконані в цьому проході
- `git status --short --branch` показав робочу гілку: `codex/neuroinclusive-v45-gentle-milestones`, зміни є в tracked/untracked файлах.
- `git log --oneline --decorate -n 20` показав HEAD `7413454` (`Add private co-processing presence`) на локальній gіth b.
- `git remote -v` коректно вказує на `https://github.com/Tarasevych/gmail-telegram-controls`.
- `git branch -vv` показав, що локальна гілка `codex/neuroinclusive-v45-gentle-milestones` ще не має upstream на origin (потрібен одноразовий `git push -u ...`).
- `git branch --all`/remote-refs: відсутня віддалена гілка `origin/codex/neuroinclusive-v45-gentle-milestones`.

## Checkpoint / heartbeat стан
- Реконструйовано стан checkpoint `019f5d65-8209-7a00-b915-4a522dbcb612.md`:
  - є запис про попереднє позначення `checkpoint ... marked complete` для відповідного вінішного thread-pass;
  - є запис, що `Heartbeat action gmail-telegram-adhd-v28` було знято в завершеному pass;
  - у поточний момент для цього workflow **активної конфігурації heartbeat `gmail-telegram-adhd-v28` не виявлено** як робочого запису.
- Окремих live Telegram/Gmail/Box змішаних сесій не ідентифіковано в цьому проході; робочі зміни обмежені локальними змінами коду/тестів/документації в v45.

## Preflight результат
- `pwsh -NoProfile -File .\apps-script\tools\deploy_apps_script.ps1 -PreflightOnly` — блокер: `Stable deployment is unsupported future v35; refusing all v29 release actions.`
- `pwsh -NoProfile -File .\apps-script\tools\release_apps_script_v30_product_v36.ps1 -PreflightOnly` — падає на hash mismatch для локального `Code`.
- `pwsh -NoProfile -File .\apps-script\tools\release_apps_script_v31_product_v37.ps1 -PreflightOnly` — падає на hash mismatch для локального `Code`.
- `pwsh -NoProfile -File .\apps-script\tools\release_apps_script_v32_product_v38.ps1 -PreflightOnly` — падає на hash mismatch для локального `Code`.
- Висновок: на `v45` є зміна production baseline (stable v35), через що v28/v29 release helper-лінія не може бути виведена в pass без перегляду артефакту/цільового бандлу.

## Локальні тести
- `apps-script/tests/deployment_v29_scripts.test.js` до правки мав застарілі expected-хеші під v29; локально оновлено expected-таблицю до фактичних `Code`, `MailClient`, `MailApp` для поточного вмісту.
- `deployment_v27_scripts.test.js` та інші тести на цьому проході зміни не вносили нових регресійних вимог, зміни в основному зосереджені на v45 release-інструментах.

## Безпекові/процесуальні обмеження
- Без змін/викликів Gmail/Telegram/Google OAuth.
- Без нових CAPTCHa/OTP/нових consent циклів.
- Без випадкових змін у реальному поштовому/чатовому трафіку.

## Наступні безпечні кроки
1. Застосувати зміни в git (включно з оновленням deployment v29 expected-хешів), перевірити `git diff --check` та `git status --short`.
2. Одноразово вирівняти `codex/neuroinclusive-v45-gentle-milestones` з origin через `git push -u origin HEAD:codex/neuroinclusive-v45-gentle-milestones`.
3. Після підтвердженого локального/релізного блоку: зафіксувати checkpoint-ноту як завершену для цього проходу та прибрати підтверджені тимчасові процеси (ті, що були створені цим проходом, якщо такі з’являться).

## Факт стану на 2026-07-18

- Продовжено з бази `gmail-telegram-v45-gentle-milestones` з урахуванням попереднього досвіду `v44`/`v43`/`v42`/`v41`/`v40` без змішування конфігурацій Gmail та Telegram-архівних потоків.
- Локально виконано `node --test apps-script/tests/*.test.js` — 405 passed, 0 failed.
- `PreflightOnly` для v27/v30/v31/v32 та v36 відтворювано не проходить через production baseline `stableVersion = v35`:
  - `deploy_apps_script_v27.ps1` → `Stable deployment is unsupported future v35; refusing all v27 release actions.`
  - `release_apps_script_v30_product_v36.ps1` → `Stable deployment is unsupported v35.`
  - `release_apps_script_v31_product_v37.ps1` → `Stable deployment is unsupported v35.`
  - `release_apps_script_v32_product_v38.ps1` → `Stable deployment is unsupported v35.`
  - `stage_apps_script_v36.ps1` → `Stable deployment is v35, expected immutable v29.`
- `Checkpoint 019f5d65-8209-7a00-b915-4a522dbcb612` у recovery-артефактах залишається відмічений як завершений по v28-pass, heartbeat `gmail-telegram-adhd-v28` не знайдено як активний, тимчасові процеси від цього проходу не ідентифіковано.
- Зафіксовано, що далі без ручних Google-циклів/OTP/CAPTCHA виконувати production go-live на v28-нульовій лінії неможливо; наступний безпечний крок — узгоджений release-бандл для поточного production baseline (v35) або окремий контрольний v28-branch.
- Набір змін поки не розгортено в продакшн, збережено в git-артефактах для відкотів і ревізії.

### Фактична run-фіксація (2026-07-18T19:56Z)

- `git status --short --branch`: відхилень локально немає, збережено зчитаний артефакт `docs/audit/v45-nonworking-functions-fix-list.md` у статусі untracked; віддалений шлях відсутній від ризикованих налаштувань.
- `git remote -v`: `origin https://github.com/Tarasevych/gmail-telegram-controls.git` (read/write).
- `git log --oneline --decorate -n 5`:
  - HEAD `ca0a38a` (`chore(v45): sync v29-v32 preflight hash fixtures and complete v28 continuation log`)
  - гілка `origin/codex/neuroinclusive-v45-gentle-milestones` збігається.
- `PreflightOnly` перевірки:
  - `deploy_apps_script_v28.ps1`/`deploy_apps_script_v29.ps1` → `Stable deployment is unsupported future v35; refusing all v28/v29 release actions.`
  - `release_apps_script_v30_product_v36.ps1`/`release_apps_script_v31_product_v37.ps1`/`release_apps_script_v32_product_v38.ps1` → `Stable deployment is unsupported v35.`
  - `stage_apps_script_v36.ps1` → `Stable deployment is v35, expected immutable v29.`
- Локальні тести:
  - `node --test apps-script/tests/*.test.js` → 405 PASS, 0 FAIL (12.6 c).
- Реальна перевірка бот-інтерфейсу (read-only):
  - `python update_bot_menu.py --inspect` → menu button `🧪 Пошта v43` для `chat_id=427886279`, `@TarasevychGmailNotifierBot` (це `v43` staging-маршрут `https://tarasevych.github.io/gmail-telegram-controls/v43-staging-acceptance-20260718.html`).
  - `getMe` + `getMyCommands` через захищений Telegram token: бот валідний, список команд порожній.
- Логи/проблеми:
  - Всі production-релізні helper-и v27/v30/v31/v32/v36 блокує `stable v35` без ручного перетягування відповідного helper bundle.
  - `migrate_telegram_markup.py` у read-only середовищі не виконано з причин відсутнього Python-пакету `telethon`.

## Факт стану на 2026-07-18T20:20Z
- Відновлення продовжено в v45-лінії на базі `C:\Users\t\Documents\Telegram\gmail-telegram-v45-gentle-milestones`; робоче дерево було синхронізоване з `origin/codex/neuroinclusive-v45-gentle-milestones`.
- `git status --short --branch` в момент проходу: чисте.
- `node --test apps-script/tests/*.test.js`: 405 passed, 0 failed, 0 skipped, 0 todo.
- `PreflightOnly` виконано для v28/v29 deploy + v30/v31/v32 release + v36 stage helper-ів, але всі завершилися блокером через production `stable=35` та застарілі pinned baseline-константи в helper-пакеті.
- Read-only Telegram/WebApp перевірка: menu `🧪 Пошта v43` для `@TarasevychGmailNotifierBot`, `chat_id=427886279`, веб-роут `https://tarasevych.github.io/gmail-telegram-controls/v43-staging-acceptance-20260718.html`, GitHub Pages 200 OK.
- Чекпоінт `019f5d65-8209-7a00-b915-4a522dbcb612` у цій гілці залишається завершеним для останнього зафіксованого v28-pass; активного `gmail-telegram-adhd-v28` heartbeat у цій сесії не ідентифіковано.
- Безпечно: не виконувалися Gmail mutations, OAuth/consent/OTP/CAPTCHA потоки, нові Telegram зміни або прод-замінювання користувацьких даних.


## Product v45 / Apps Script v37 production release — 2026-07-18

- Source of truth: `gmail-telegram-v45-gentle-milestones`, branch `codex/neuroinclusive-v45-gentle-milestones`.
- Consolidated exact-session logout from the stable v35 lineage, v44 co-processing/presence, and v45 gentle-milestone work without re-running OAuth or changing Gmail messages.
- Local contracts: 407/407 passed; current release-helper tests: 2/2; `git diff --check`: passed.
- Immutable Apps Script v37 promoted to stable deployment `AKfycbwQkmQIIsboUayMhWdv_DzGj_gbERMKdWEpUVUpIjvwTaIjyjyLaBWUmw1g3lFWFV3Z`; previous production v35 remains the documented rollback target.
- Final PreflightOnly: stableVersion 37, headState candidate_v37, immutableReady true, legacyStagingCount 0, stagingCount 0, journalState cleaned.
- Telegram owner menu restored to `📬 Пошта` and the production Pages bridge; live Telegram Desktop verification confirmed inbox loading, the exact account `tarasevych.pavlo@gmail.com`, folders, separated Gmail zones, and `Вийти з цього сеансу`.
- Gmail-mutating controls were not clicked against arbitrary real mail. Their behavior is covered by the passing contract suite.
- UX finding: Telegram may refocus an already-open Mini App WebView after menu URL changes. Close the old Mini App before acceptance to avoid visually auditing stale HTML.
- Non-blocking platform warning: GitHub Pages Actions currently reports Node 20 actions being forced onto Node 24.

## Build 1 foundation — 2026-07-19

- Єдина активна гілка: `codex/build-001-2026-07-19`.
- Майбутня незмінна release-гілка створюється лише після production acceptance: `release/build-001-2026-07-19`.
- `main` представляє останній підтверджений публічний стан і GitHub Pages.
- Технічне зіставлення: production Apps Script v37; історичний staging v38; запланований immutable Build 1 — Apps Script v39.
- Новий двомовний публічний контур: `docs/uk` і `docs/en` з однаковими фактами, статусами та ID проблем.
- Запроваджено постійні путівники `PROJECT.md`, `ROADMAP.md`, `ISSUES.md`, `VERSIONING.md` та кумулятивну статтю Build 1.
- Поточні Build 1 виправлення: захист від подвійної доставки одного Gmail-повідомлення, реальне фото профілю, прямий Google OAuth старт, очищення stale account IDs, OAuth callback relay і правильна однина accessibility label.
- Локальна перевірка Build 1: 417/417 тестів пройшли; preflight підтвердив stable v37, HEAD v37, один точний legacy staging v38 і відсутність immutable v39.
- Google OAuth redirect URI підготовлений у консолі, але `Save` не натиснуто без окремого підтвердження власника.
- Жодного нового OAuth consent, Gmail mutation, випадкової зміни листа або змішування Gmail/Telegram зон не виконано.

