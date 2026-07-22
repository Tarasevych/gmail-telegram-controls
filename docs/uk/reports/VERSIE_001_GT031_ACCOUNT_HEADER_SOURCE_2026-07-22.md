# Source correction active-account header GT-031 у Versie 1

[English](../../en/reports/VERSIE_001_GT031_ACCOUNT_HEADER_SOURCE_2026-07-22.md)

- **Дата:** 2026-07-22
- **Статус:** PARTIAL
- **Source request:** `REQ-0033`
- **Атомарна verification:** [VR-012](../verification-reports/reports/VR-012/README.md)

## Спостережений defect

Native acceptance v63 показав, що контрольований альтернативний account міг втрачати завершення email у вузькому active-context header. Dynamic name, stable account selection і profile image behavior в іншому лишалися коректними.

## Першопричина

Desktop subtitle вже дозволяв wrapping, але narrow fixed-height topbar зводив його до cropped line. Єдине повне single-account value лишалося в announcement/title metadata; на відміну від shared mode, видимого tappable disclosure для touch users не було.

## Source correction

- повторно використати чинні `mailContextDetails` і account map для single та shared contexts;
- зберегти wider-view wrapping з explicit normal whitespace і word breaking;
- на narrow views застосувати compact one-line subtitle плюс видиме `Адреса повністю` disclosure;
- зберегти full name/email mapping у native `<details>` surface;
- отримувати всі values із чинної stable connection-ID model;
- зберегти keyboard operation, focus outline, ARIA announcement і hidden-state precedence.

Gmail, OAuth, account-selection або shared-membership contract не змінювалися.

## Докази тестів

- focused `mail_app_contract.test.js`: `88/88`;
- full Apps Script suite: `501/501`;
- перший full run коректно впав лише тому, що immutable-v63 test ще порівнював current working source зі своїм frozen hash;
- v63 test узгоджено з чинним historical-v62 pattern: він і далі доводить кожний frozen helper hash, але більше не вимагає, щоб future source дорівнював immutable v63;
- immutable v63 helper, deployment, source pins і rollback target не редагувалися.

## Release boundary

Production і HEAD runtime лишаються immutable v63 зі staging `0`. Source correction не подається як live. Потрібні normal source PR, новий cumulative immutable v64 helper, owner-only staging visual acceptance, а production promotion дозволений лише після успішного acceptance.

## Required live acceptance

- narrow native Telegram Desktop view показує visible full-address disclosure;
- після відкриття доступний complete selected email без overlap;
- switching між existing accounts оновлює visible line і disclosure без OAuth;
- shared mode і далі показує кожну name/address pair;
- loading, missing-name/photo та error states лишаються читабельними;
- немає full-page reload або account-zone leak.
