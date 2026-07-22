# P-009: Обмежена постійна release-автоматизація Versie 1 / Bounded standing Versie 1 release automation

Source request: `REQ-0030`
Status: `active`
Granted by: project owner on `2026-07-22`
Scope: cause-linked release cycles within Versie 1

## Українською

### Надані повноваження

- Автономно виконувати normal merge актуального причинно пов'язаного Versie 1 fix PR у `main`, якщо exact head повторно звірений, PR mergeable, required checks успішні й немає невирішеного конфлікту або privacy/security failure.
- Для нового merged code delta створювати один cumulative immutable Apps Script candidate і один owner-only staging deployment у межах окремого release cycle.
- Оновлювати пов'язані branches, commits, normal pushes, PR metadata, release journal, checkpoints та двомовний evidence без окремого рутинного погодження.
- Виконувати preflight і повний staging acceptance за чинним release contract.
- Виконувати production promotion без нового рутинного запиту лише для exact locked candidate поточного cycle після повного доказового `VERIFIED` acceptance, точного source/version/deployment readback, green checks, rollback readiness і відсутності unresolved privacy/security failure.
- Виконувати fail-closed cleanup точного попереднього failed staging deployment перед створенням наступного staging лише після збереження immutable history та failure evidence.

### Anti-loop і stale-candidate gates

- Один причинний code delta та один source SHA можуть створити не більше одного нового immutable candidate. Повторний запуск не створює нову version.
- Одночасно дозволений лише один active staging candidate. Паралельні або каскадні staging-релізи заборонені.
- На початку cycle зафіксувати source `main` SHA, source hash, immutable Apps Script version, staging deployment ID і rollback version. Будь-яка невідповідність закриває gate.
- Promotion дозволене лише для exact candidate поточного active cycle. Historical, rolled-back, superseded, failed або mismatched candidate не може бути promoted.
- За transient external failure дозволений максимум один контрольований повтор acceptance того самого staging після доказаного відновлення зовнішнього стану. Повторна помилка блокує cycle; новий immutable не створюється.
- Candidate-specific defect потребує нового причинного fix commit, окремого REQ/issue evidence і нового release cycle. Відсутність code delta забороняє increment версії.
- Якщо будь-який gate має статус `PARTIAL`, `UNVERIFIED`, `CONFLICTING`, `BLOCKED` або failed, production promotion заборонене.

### Незмінні межі

- Це повноваження не дозволяє Versie 2 або іншу наступну продуктову Versie.
- Не дозволяється rebase опублікованої історії, force-push, bypass branch protection/required checks, зміна historical immutable version або випадкове видалення deployments.
- Новий OAuth scope, user-specific Google consent, CAPTCHA, OTP/2FA, passkey, біометрія або hardware key залишаються manual gates.
- Не змінювати випадкові Gmail records, не змішувати Gmail accounts, Telegram zones або owner/external OAuth paths і не публікувати secrets чи приватні identifiers.
- `P-008` залишається `consumed` історичним записом і не відновлюється цим дозволом.
- Власник може звузити, призупинити або відкликати `P-009` прямим наступним повідомленням.

## English

### Granted authority

- Autonomously perform a normal merge of the current causally linked Versie 1 fix PR into `main` when its exact head is rechecked, the PR is mergeable, required checks pass, and no unresolved conflict or privacy/security failure exists.
- For a new merged code delta, create one cumulative immutable Apps Script candidate and one owner-only staging deployment within a distinct release cycle.
- Update related branches, commits, normal pushes, PR metadata, the release journal, checkpoints, and bilingual evidence without separate routine approval.
- Run preflight and full staging acceptance under the current release contract.
- Promote to production without a new routine request only for the exact locked candidate of the current cycle after complete evidence-backed `VERIFIED` acceptance, exact source/version/deployment readback, green checks, rollback readiness, and no unresolved privacy/security failure.
- Perform fail-closed cleanup of the exact previous failed staging deployment before creating the next staging only after preserving immutable history and failure evidence.

### Anti-loop and stale-candidate gates

- One causal code delta and one source SHA may create no more than one new immutable candidate. A repeated run does not create another version.
- Only one active staging candidate is allowed at a time. Parallel or cascading staging releases are forbidden.
- At cycle start, lock the source `main` SHA, source hash, immutable Apps Script version, staging deployment ID, and rollback version. Any mismatch closes the gate.
- Promotion is allowed only for the exact candidate of the current active cycle. A historical, rolled-back, superseded, failed, or mismatched candidate cannot be promoted.
- For a transient external failure, at most one controlled acceptance retry of the same staging is allowed after proven external recovery. A repeated failure blocks the cycle; no new immutable is created.
- A candidate-specific defect requires a new causal fix commit, separate REQ/issue evidence, and a new release cycle. No code delta means no version increment.
- If any gate is `PARTIAL`, `UNVERIFIED`, `CONFLICTING`, `BLOCKED`, or failed, production promotion is forbidden.

### Fixed boundaries

- This authority does not authorize Versie 2 or another next product Versie.
- Do not rebase published history, force-push, bypass branch protection/required checks, change a historical immutable version, or delete deployments arbitrarily.
- A new OAuth scope, user-specific Google consent, CAPTCHA, OTP/2FA, passkey, biometric, or hardware key remains a manual gate.
- Do not mutate arbitrary Gmail records, mix Gmail accounts, Telegram zones, or owner/external OAuth paths, or publish secrets or private identifiers.
- `P-008` remains a `consumed` historical record and is not reopened by this authority.
- The owner may narrow, suspend, or revoke `P-009` through a direct later message.
