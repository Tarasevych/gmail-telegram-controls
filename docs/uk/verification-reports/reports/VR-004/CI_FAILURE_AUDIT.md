# CI failure audit за 20-21 липня 2026

[English](../../../../en/verification-reports/reports/VR-004/CI_FAILURE_AUDIT.md) | [VR-004](README.md)

- **Запит:** REQ-0021
- **Методика:** REQ-0004
- **Scope:** GitHub Actions `Request ledger` і `Verification reports`
- **Результат:** 26 історичних failure runs підтверджено через GitHub Actions API: 12 `Request ledger`, 14 `Verification reports`
- **Release/runtime зміна:** ні

## Висновок

Це не 26 незалежних product failures і не збій GitHub runner. Це дві серії детермінованих відмов власних Python-валідаторів через розсинхронізацію між документами та їхнім machine contract. Checkout, `GITHUB_TOKEN`, Ubuntu runner і попередні workflow steps завершувалися успішно; failure виникав у validation step.

Старий failed run лишається failed після follow-up fix за дизайном GitHub. Тому історичне email-сповіщення не доводить, що помилка активна на поточному commit. Apps Script `URLFetch` quota є окремою runtime-проблемою продукту й не спричинила ці GitHub Actions failures.

## Повний реєстр 26 runs

### Request ledger: 12

| Commit | Run | Запис |
|---|---|---|
| `c321fb6` | [29776921161](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29776921161) | Versie 1 multi-account delivery |
| `d9f73c9` | [29808855654](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29808855654) | Versie 1 postmortem work |
| `bcd2509` | [29810331526](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29810331526) | autonomous continuation authority |
| `1c3415f` | [29810851695](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29810851695) | complete postmortem evidence |
| `3cac9ca` | [29810854523](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29810854523) | close autonomous recovery record |
| `b70313b` | [29811347360](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29811347360) | v55 local verification |
| `4dd669d` | [29811406123](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29811406123) | full corpus reconstruction |
| `ee41aa0` | [29815209525](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29815209525) | complete REQ-0012 evidence workflow |
| `e22fdbe` | [29815591929](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29815591929) | clean REQ-0012 pull request |
| `ccab14a` | [29831261905](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29831261905) | verified PR merge continuation |
| `2cbe470` | [29831410031](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29831410031) | block main merge pending acceptance |
| `f4fc31f` | [29845937072](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29845937072) | shared bootstrap A/B recovery |

### Verification reports: 14

| Commit | Run | Запис |
|---|---|---|
| `873b26e` | [29780967546](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29780967546) | restore realtime multi-account delivery |
| `e7a8175` | [29781772299](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29781772299) | preserve legacy realtime context |
| `b86f8e0` | [29783271304](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29783271304) | isolate Gmail runtime failures |
| `0266332` | [29783815410](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29783815410) | preserve realtime diagnostics |
| `fcb9012` | [29784272297](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29784272297) | compact stale card indexes |
| `1da4715` | [29785077028](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29785077028) | isolate realtime lane locking |
| `41b8a09` | [29785459013](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29785459013) | expose card retention failures |
| `11995fe` | [29785747404](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29785747404) | detach expired card records |
| `2db3f9a` | [29787916706](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29787916706) | expose isolated lane failures |
| `4c5ecec` | [29788199329](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29788199329) | trace per-account scan filters |
| `e5bd6fb` | [29788592606](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29788592606) | add protected trace evidence |
| `184184c` | [29788979153](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29788979153) | recover exact spam acceptance |
| `d5d34f2` | [29814943117](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29814943117) | publish VR-003 session report |
| `347e6d3` | [29814994252](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29814994252) | normalize VR-003 whitespace |

## Root cause matrix

Кількості нижче не додаються до 26: один workflow run перевіряв усі наявні records, тому той самий дефект REQ міг повторно з'явитися у кількох наступних runs.

| Об'єкт | Появи у failed runs | Root cause |
|---|---:|---|
| REQ-0009 | 11 | Розширений `Routes` не відповідав монолітному regex; `Permission basis` не був `explicit`/`none` |
| REQ-0010 | 10 | Та сама невідповідність schema contract |
| REQ-0011 | 9 | Людські headings замість точних machine fields і language markers |
| REQ-0012 | 5 | Та сама причина |
| REQ-0013 | 2 | Та сама причина |
| REQ-0019 | 1 | Невідомий route key `problems` і недозволене value `conditional` |
| VR-002 | 12 | В обох README не було обов'язкового marker `REQ-0004` verification framework |
| VR-003 | 2 | SHA-256 залежав від CRLF/LF фізичних bytes |

Representative logs підтверджують класифікацію: [f4fc31f](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29845937072) завершився `Missing or invalid routes`; [347e6d3](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29814994252) завершився `VR-003 manifest totals or no-release boundary are invalid`.

## Перевірені виправлення

- REQ-0019 отримав canonical routes у commit [`fc1d0a6`](https://github.com/Tarasevych/gmail-telegram-controls/commit/fc1d0a6a7600f78e72d04b10eeb9f0bbc7c9b3ef); follow-up [Request ledger run 29846015250](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29846015250) пройшов.
- VR-003 hashing canonicalized to LF у commit [`b9cc4d2`](https://github.com/Tarasevych/gmail-telegram-controls/commit/b9cc4d2a5df9d9990106e821e521f2c9249e6225); [Verification reports run 29815102339](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29815102339) пройшов разом із bilingual/knowledge checks.
- Branch `Запити` отримав canonical template, order-independent set parser, точні unknown/missing/value diagnostics і 10 regression tests у commit [`ac7785d`](https://github.com/Tarasevych/gmail-telegram-controls/commit/ac7785d92877c16125c8340aee173ba2c94627d5); [run 29857732665](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29857732665) пройшов.
- Verification validator має canonical-LF hash tests і field-specific diagnostics; PR #7/#8 та їхні merge runs завершилися успішно.

## Запобігання повторенню

1. Новий REQ створюється лише з `requests/TEMPLATE.md` і шістьма canonical route keys.
2. Routes парсяться як unordered set `key=value`; unknown, missing, duplicate key і invalid value мають окремі errors.
3. Невідоме значення лишається fail-closed.
4. `Permission basis` приймає лише canonical value.
5. UK/EN language markers є обов'язковими.
6. Verification source hashes рахуються після canonical LF normalization.
7. LF і CRLF fixtures повинні давати однаковий canonical hash.
8. Перед push запускаються request, bilingual, knowledge-hub і verification validators.
9. Після push перевіряються лише нові runs; старі failed runs не переписуються й не перезапускаються масово.

## Обмеження

- Точні 26 runs, їхні workflow/status/commit/URL перевірені live через GitHub CLI.
- Детальна матриця повторів REQ/VR походить із owner audit усіх jobs/steps/logs; у цьому потоці додатково spot-checked два representative logs.
- Звіт не змінює історичні commits і не стверджує, що failed run став successful заднім числом.
