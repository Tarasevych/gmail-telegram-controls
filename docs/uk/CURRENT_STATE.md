# Поточний стан

[English](../en/CURRENT_STATE.md)

<!-- release-state: production=v64; candidate=v64; staging=0; status=VERIFIED; as-of=2026-07-22 -->

## Канонічний стан випуску

- **Versie:** Versie 1.
- **Production:** Apps Script immutable v64, `VERIFIED`.
- **HEAD:** точний cumulative v64.
- **Активні staging deployments:** `0`.
- **Release journal:** `cleaned`.
- **Release source boundary:** cumulative source `da8b2768323db8fd8c1ba886b556bbfd2148d6de`; helper merge `bbb6fa39a550c623f1507ccc4791d20bfb150b57`; bridge merge `8b65d7e7653aadac4344e5ad2d4d86f56bb40f4d`.
- **Rollback:** exact immutable v63 лишається доступним; historical immutable v56, v57, v59 і v62 збережені та не переписані.
- **Telegram menu:** production `📬 Пошта · Versie 1`.

## Перевірений acceptance v64

- Source-контракти GT-031 пройшли `88/88`, а pre-release source suite пройшов `501/501`.
- Release-helper contracts v64 пройшли `2/2`, а cumulative release suite пройшов `503/503`.
- Виправлений signed bridge contract і cumulative suite пройшли `505/505`; required checks для PR #38 і PR #39 пройшли.
- Read-only preflight пройшов, рівно один `StageOnly` створив immutable v64 і один owner-only staging deployment, а post-stage preflight повідомив `staging_verified`.
- Native Telegram Desktop staging показав responsive disclosure повної адреси, avatar/fallback behavior, рівно три isolated Gmail roots, контрольоване перемикання на інший акаунт і назад без OAuth та фактичний shared view трьох акаунтів.
- Promotion використав одну bounded deployment mutation, два свіжі native production launches завантажили mailbox v64, cleanup видалив staging, а фінальний preflight підтвердив stable/HEAD v64 і journal `cleaned`.
- Шість post-cleanup рядків `checkNewMail_` завершилися. Один короткий process shell тривалістю 3.164 секунди формально наклався на попередній 65.734-секундний рядок приблизно на 5.7 секунди; lease rejection узгоджується з реалізацією, але лишається inference, бо content-free substage telemetry була недоступна.

## Відкриті межі доказів

- `GT-031` і `GT-037` мають статус `VERIFIED` у production v64.
- `GT-032`–`GT-036` лишаються `PARTIAL` до їхнього scenario-specific P0 acceptance.
- Direct Apps Script Processes API повернув `403 ACCESS_TOKEN_SCOPE_INSUFFICIENT`; scope expansion, OAuth cycle або migration default GCP project не виконувалися.
- External automatic INBOX delivery після v64 лишається `UNVERIFIED`; для цього випуску не надсилали й не змінювали додаткових реальних листів.
- `GT-038` лишається `PARTIAL` для Telegram Web; той самий signed release пройшов у native Telegram Desktop.

## Докази й навігація

- [Детальний звіт про v64 і закриття GT-031/GT-037](reports/VERSIE_001_V64_RELEASE_AND_GT031_GT037_CLOSURE_2026-07-22.md)
- [Атомарна verification VR-013](verification-reports/reports/VR-013/README.md)
- [Історичний звіт про v63 і закриття GT-030](reports/VERSIE_001_V63_RELEASE_AND_GT030_CLOSURE_2026-07-22.md)
- [Cumulative історія випуску Versie 1](releases/VERSIE-001-2026-07-19.md)
- [Machine-readable release state](../release-state.json)