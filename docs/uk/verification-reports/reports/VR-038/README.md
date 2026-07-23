# VR-038 — F-04 Достовірний автоматичний аналіз і один реальний наступний крок

Verification framework: REQ-0004

- **Статус:** `PARTIAL`
- **Дата:** 2026-07-23
- **Запит:** `REQ-0035`
- **Пов’язані записи:** `GT-065`, `B1-45`, `RCA-019`
- **English mirror:** [VR-038](../../../../en/verification-reports/reports/VR-038/README.md)

## Межа та primary sources

Цей source-only contour використовує cumulative Versie 1 baseline. Він спирається на чинну local heuristic і [Apps Script Language service](https://developers.google.com/apps-script/reference/language). Чинний [Gmail API REST reference](https://developers.google.com/workspace/gmail/api/reference/rest) надає mail resources, але не Gmail Gemini summary endpoint, який використовував би цей застосунок. Зовнішній AI provider, новий OAuth scope, Gmail mutation, Telegram runtime change, staging candidate або production promotion не додаються.

## Підтверджена першопричина

Попередній reader завжди помітно показував automated analysis і не мав незалежного per-account вимикача. Boilerplate rule відкидав усі речення коротші за вісім символів, але не відсікав поширені mobile-client signatures. Normalization міг лишати дати, суми, дії або urgency, коли жоден exact source fragment не підтримував claim. Запропонований next action також безпосередньо потрапляв до persisted-action input, приховуючи межу між generated suggestion і рішенням користувача.

## Source correction

- `analysisMode` зберігається в чинному account-scoped attention preference record із default `collapsed` та explicit choices `expanded` або `hidden`.
- Аналіз використовує доступний disclosure і лишається secondary до original message.
- Signature-only, empty та attachment-only text повертає `Немає змістовного підсумку` без виклику machine translation.
- Короткі substantive replies більше не відкидаються лише за length threshold.
- Actions, dates, sums та urgency переживають normalization лише коли їх підтримує exact bounded source fragment.
- Generated next action видимо є пропозицією і потрапляє до persisted field лише після explicit acceptance.
- Persisted triage має явне доступне undo та лишається ізольованим до exact Gmail connection.

## Атомарні твердження

| Твердження | Категорія | Статус | Доказ |
|---|---|---|---|
| Automated analysis згорнутий за замовчуванням і може бути прихований per Gmail connection | UX/state | `VERIFIED` | server/client contract tests |
| Trivial та відомий mobile-signature content не створює substantive summary і translation call | Analysis/privacy | `VERIFIED` | executable synthetic corpus |
| Короткий meaningful content не відкидається лише через довжину | Analysis | `VERIFIED` | executable synthetic corpus |
| Action, date, amount і risk claims потребують exact source-fragment support | Grounding | `VERIFIED` | normalization contract та чинний whole-thread evidence test |
| Generated next action відокремлений від persisted user decision | UX/state | `VERIFIED` | UI source contract |
| Triage undo явний, доступний, persisted та account-scoped | Accessibility/state | `VERIFIED` | UI/server contracts |
| Native populated-reader behavior прийнято в Telegram WebView | Runtime | `UNVERIFIED` | shared quota blocker не дозволяє safe staging |
| Current production має corrected behavior | Production | `UNVERIFIED` | release-state у цьому контурі не змінюється |

## Безпека та limitations

Tests використовують synthetic content і `.invalid`-style identities, де це застосовно. Вони не читають і не змінюють real mail. Machine translation лишається чинним Apps Script service і може fail closed повернути source text. Звіт не заявляє semantic equivalence до generative model, production behavior або native WebView acceptance.

## Висновок

Підтверджені source defects виправлено в межах чинної architecture та evidence boundary. Статус лишається `PARTIAL`, доки native populated-reader і production acceptance не зможуть пройти після зняття shared Apps Script quota blocker.
