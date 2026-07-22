# REQ-0030 — Обмежене постійне release-повноваження Versie 1 / Bounded standing Versie 1 release authority

- ID: REQ-0030
- Date: 2026-07-22
- Status: recorded
- Next Versie authorization: no
- Routes: requests=record; instructions=update; permissions=update; plan=update; product=update; release=update
- Permission basis: explicit

<!-- lang:uk -->
## Українською

### Нормалізований запит

- Не повторювати вже завершені merge PR #16, інтеграцію PR #11 або створення immutable v58.
- Замінити зайві одноразові погодження обмеженим постійним повноваженням для Versie 1: автономно виконувати normal merge причинно пов'язаного виправлення після зелених required checks, створювати один cumulative immutable staging candidate для нового перевіреного code delta та проводити його acceptance.
- Не створювати нескінченні staging-релізи: один причинний code delta утворює не більше одного нового immutable candidate та одного active staging deployment. Зовнішній тимчасовий збій дозволяє максимум один контрольований повтор acceptance того самого candidate після доказаного відновлення, але не новий immutable без нового code delta.
- Не просувати старий candidate: production promotion дозволене без нового рутинного погодження лише для exact candidate поточного release cycle після повного `VERIFIED` staging acceptance, точного source SHA/hash і deployment readback, green checks, rollback readiness та відсутності unresolved privacy/security failure.
- Якщо acceptance неуспішне, promotion заборонене. Наступний immutable потребує нового причинного fix commit, пов'язаного REQ/issue evidence та нового release cycle; одночасно може існувати не більше одного active staging candidate.
- Повноваження діє лише в межах Versie 1 і може бути звужене або відкликане новим прямим повідомленням власника. Воно не дозволяє Versie 2, обхід захистів, новий OAuth scope/consent або випадкові Gmail mutations.
- Поточне виконання продовжити з актуального PR #20; завершені PR #16 і PR #11 використовувати лише як історичний evidence.

### Критерії завершення

- У `Повноваження` опубліковано active bounded standing authority, а в `Інструкції` — fail-closed release automation contract із source `REQ-0030`.
- PR #20 merged лише після повторної перевірки exact head, required checks, mergeability і відсутності нового конфлікту.
- Створено не більше одного нового cumulative immutable staging candidate з актуального merged `main`; старий candidate не може бути випадково promoted.
- Production promotion виконано тільки якщо кожний staging gate має доказовий статус `VERIFIED`; інакше runtime лишається на production-accepted version.
- Request, permission, instruction, product і release evidence опубліковані без secrets, а релевантні checks успішні.

<!-- lang:en -->
## English

### Normalized request

- Do not repeat the already completed PR #16 merge, PR #11 integration, or immutable v58 creation.
- Replace unnecessary one-off approvals with bounded standing authority for Versie 1: autonomously perform a normal merge of a causally linked fix after green required checks, create one cumulative immutable staging candidate for a new verified code delta, and run its acceptance.
- Do not create endless staging releases: one causal code delta produces at most one new immutable candidate and one active staging deployment. A transient external failure permits at most one controlled acceptance retry of the same candidate after proven recovery, but not a new immutable without a new code delta.
- Never promote a stale candidate: production promotion needs no additional routine approval only for the exact candidate of the current release cycle after complete `VERIFIED` staging acceptance, exact source SHA/hash and deployment readback, green checks, rollback readiness, and no unresolved privacy/security failure.
- If acceptance fails, promotion is forbidden. A next immutable requires a new causal fix commit, linked REQ/issue evidence, and a new release cycle; no more than one active staging candidate may exist at a time.
- The authority applies only within Versie 1 and may be narrowed or revoked by a new direct owner message. It does not authorize Versie 2, bypassing safeguards, a new OAuth scope/consent, or arbitrary Gmail mutations.
- Continue the current execution from the actual PR #20; treat completed PR #16 and PR #11 only as historical evidence.

### Completion criteria

- `Повноваження` contains an active bounded standing authority and `Інструкції` contains a fail-closed release automation contract sourced from `REQ-0030`.
- PR #20 is merged only after rechecking the exact head, required checks, mergeability, and absence of a new conflict.
- No more than one new cumulative immutable staging candidate is created from current merged `main`; a stale candidate cannot be promoted accidentally.
- Production promotion occurs only when every staging gate has evidence-backed `VERIFIED` status; otherwise runtime remains on the production-accepted version.
- Request, permission, instruction, product, and release evidence are published without secrets and relevant checks pass.
