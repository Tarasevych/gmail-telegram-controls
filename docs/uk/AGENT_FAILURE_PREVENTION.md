# Запобігання помилкам агента

[English](../en/AGENT_FAILURE_PREVENTION.md)

Цей playbook є процедурою якості, а не джерелом повноважень. Перед дією агент читає чинні `AGENTS.md`, `Інструкції`, релевантний запис `Повноваження`, source request і [реєстр RCA](ERROR_RCA_REGISTRY.md). Якщо між ними є конфлікт, перемагає джерело з вищим пріоритетом; цей файл не розширює дозволи.

## 1. Recovery-first

- Перевірити worktree, local/remote commits, open PR, checkpoint, runtime і активну atomic operation.
- Checkpoint є підказкою, а не доказом завершення.
- Не повторювати OAuth, migration, release, test або process, якщо live state доводить завершення.
- Перед перемиканням task встановити `paused_with_checkpoint`; після terminal state звільнити lease.

## 2. Один власник ресурсу

- Один lease-owner на Git worktree/index, browser/Mini App, Telegram, телефон, live Gmail mutations і Apps Script release state.
- Не завершувати generic Chrome, Node, PowerShell, Codex, RustDesk, Tailscale або невідомі PID.
- Cleanup лише exact task-owned process/session/worktree/branch після перевірки належності.
- Shared code, особливо `MailApp.html`, редагувати послідовно або спочатку modularize без зміни поведінки.

## 3. Ідентичність і дедуплікація

- Використовувати stable Gmail message/thread/attachment IDs або opaque похідний token, не ordinal, name чи UI position.
- Один canonical eligibility function для realtime, frozen backlog і manual check.
- At-most-once reservation створюється до зовнішньої доставки й reconciles uncertain result.
- Cross-account keys завжди містять owner scope та stable connection ID.

## 4. Locks і зовнішній I/O

- Lock охоплює лише bounded claim/commit/release.
- Gmail, Telegram, Drive, Box та HTTP I/O не виконується під shared user lock.
- Lease має token, expiry, crash recovery і тест overlap.
- Slow maintenance не блокує realtime lane.

## 5. Schema, ID і двомовність

- Перед `REQ/GT/B1/VR` allocation: fetch authoritative main, перевірити open PR і maxima, зарезервувати ID в одному contour.
- Machine metadata парситься за schema, не за крихким monolithic regex.
- Unknown, missing, duplicate key і invalid value мають різні diagnostics.
- Кожна UK-сторінка має окреме EN-дзеркало з взаємним посиланням.
- Hashes canonicalize line endings; LF/CRLF fixtures обов’язкові.

## 6. Immutable release discipline

- Historical immutable version, helper і hashes не переписуються.
- Mutable HEAD може рухатися після release; historical test перевіряє pinned artifact/helper, а не вічну рівність HEAD.
- Новий code fix отримує новий cumulative immutable лише за exact owner authority.
- Staging створюється один раз після clean preflight; promotion лише після acceptance.
- Shared stable/candidate failure зупиняє release switching і відкриває external/runtime blocker.
- Rollback, abandon і cleanup перевіряють exact deployment ID, version, journal state і production boundary.

## 7. Evidence discipline

- `VERIFIED` вимагає доказ на тому самому рівні: source, integration, native staging або production.
- Regex/source test не доводить Telegram WebView, provider OAuth, transfer або device behavior.
- HTTP 200 не доводить правильний файл, callback або UI state.
- Не вигадувати performance, progress, cache hit або transfer percentages.
- Sensitive evidence лишається приватним; Git містить тільки content-free/sanitized trace.

## 8. Bounded failure handling

- Одна bounded спроба для зовнішнього blocker; далі checkpoint і незалежна робота.
- Hard stop: CAPTCHA, OTP/2FA, passkey/biometric/hardware key, новий або ширший OAuth scope, payment, ambiguous Gmail/Telegram zone.
- Не маскувати shared quota/network failure повторним promotion/rollback.
- Якщо fix не доведено native, status залишається `PARTIAL` або `UNVERIFIED`.

## 9. Обов’язковий pre-merge gate

1. Робоче дерево містить лише task-owned зміни.
2. Targeted behavioral tests покривають root cause і negative/fail-closed path.
3. Cumulative suite, bilingual, knowledge-hub, verification і release-state checks проходять.
4. Added lines проскановані на credentials і private content без публікації matches.
5. Двомовні `ISSUES`, `ROADMAP`, `VR` та навігація оновлені.
6. Normal PR має cause, evidence, release boundary і explicit residual status.
7. Merge та обидва mirrors підтверджено authenticated readback.

## 10. Post-task gate

- Оновити приватний ledger і sanitized checkpoint.
- Вказати source/staging/production статуси окремо.
- Звільнити leases; прибрати лише task-owned temporary artifacts.
- Залишити одну точну owner action для кожного справді ручного blocker.
- Не позначати goal complete, доки кожна вимога не має terminal status та доказ.
