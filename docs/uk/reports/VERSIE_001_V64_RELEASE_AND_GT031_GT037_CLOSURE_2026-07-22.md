# Production acceptance Apps Script v64 у Versie 1 і закриття GT-031/GT-037

[English](../../en/reports/VERSIE_001_V64_RELEASE_AND_GT031_GT037_CLOSURE_2026-07-22.md)

- **Дата:** 2026-07-22
- **Статус:** VERIFIED
- **Source request:** `REQ-0033`
- **Атомарна verification:** [VR-013](../verification-reports/reports/VR-013/README.md)

## Release boundary

- Versie лишається **Versie 1**.
- Cumulative source boundary: `da8b2768323db8fd8c1ba886b556bbfd2148d6de`.
- Helper PR #38 merged normally як `bbb6fa39a550c623f1507ccc4791d20bfb150b57`.
- Signed bridge PR #39 merged normally як `8b65d7e7653aadac4344e5ad2d4d86f56bb40f4d`.
- Фінальний deployment state: stable і HEAD immutable v64, staging `0`, journal `cleaned`.
- Direct rollback — exact immutable v63. Historical immutables не переписувалися.

## Source і release gates

- Focused UI contracts GT-031: `88/88`; pre-release source suite: `501/501`.
- Release-helper contracts v64: `2/2`; cumulative release suite: `503/503`.
- Перший bridge pass виявив stale historical assertion, що поєднував preserved evidence v63 із mutable current menu pointer. Assertion виправлено так, щоб зберегти v63 і заборонити його повторну активацію.
- Final bridge/cumulative suite: `505/505`.
- Required GitHub checks пройшли для PR #38 і PR #39; GitHub та private GitLab mirror синхронізовано на кожній merged boundary.
- Read-only `PreflightOnly` прийняв stable/HEAD v63 без staging. Рівно один `StageOnly` створив immutable v64 і один staging deployment; post-stage preflight повідомив `staging_verified`.

## Native staging acceptance

- Single-account header показав active name, повну email-адресу і tappable narrow-screen disclosure `Адреса повністю`.
- Відобразилися і real profile avatar, і навмисний letter fallback.
- Були наявні рівно три isolated Gmail roots.
- Контрольоване switching `alternate -> primary -> alternate` завершилося без OAuth.
- `Спільна пошта` показала фактичну name-to-address mapping трьох акаунтів, після чого initial mode відновлено.
- Один incidental shared-membership toggle через UI automation негайно повернуто назад; authoritative readback знову показав три включені Gmail roots.
- OTP, CAPTCHA, passkey або Google consent screen не з'являлися.

## Promotion і production acceptance

- Owner menu повернуто на `📬 Пошта · Versie 1` до promotion.
- `Promote` просунув exact v63 до v64 однією bounded mutation і converged без false negative.
- Два незалежні fresh native Telegram Desktop production launches завантажили mailbox v64 і responsive account context.
- `CleanupStaging` видалив exact staging deployment.
- Фінальний `PreflightOnly` повідомив stable/HEAD v64, immutable-ready hashes, staging `0` і journal `cleaned`.

## Runtime observation і межі

- Direct Apps Script Processes API повернув `403 ACCESS_TOKEN_SCOPE_INSUFFICIENT`. Scope expansion, OAuth cycle або migration default GCP project не виконувалися.
- Authenticated owner Apps Script UI показав шість completed post-cleanup рядків `checkNewMail_` із тривалістю `30.765 с`, `65.734 с`, `3.164 с`, `39.805 с`, `45.915 с` і `19.764 с`.
- 3.164-секундний shell формально наклався на попередній рядок приблизно на 5.7 секунди й завершився раніше. Це узгоджується з tokenized lease rejection, але exact substage reason має статус `UNVERIFIED`, бо content-free telemetry була недоступна.
- Додатковий реальний лист не надсилали й не змінювали. Тому external automatic INBOX delivery після v64 лишається `UNVERIFIED`.

## Результат

- `GT-031`: `VERIFIED` у production v64.
- `GT-037`: `VERIFIED` у production v64.
- `GT-032`–`GT-036`: `PARTIAL` до їхніх окремих P0 scenarios.
- Immutable v64 є єдиним поточним production/HEAD target; exact v63 є rollback target.