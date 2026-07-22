# Обмежена release-автоматизація / Bounded release automation

Source request: `REQ-0030`.
Authority: active `P-009` on `Повноваження`.

<!-- lang:uk -->
## Українською

### Мета

Автоматизувати routine merge, cumulative immutable staging і conditional production promotion у межах Versie 1 без повторних очевидних погоджень, але fail-closed виключити нескінченні staging-релізи та promotion старого candidate.

### Release cycle

1. Зареєструвати причинний REQ і зв'язати його з fix PR, issue/problem evidence та candidate delta.
2. Повторно звірити `main`, exact PR head, mergeability, required checks, privacy scan і відсутність незавершеної Git operation.
3. Виконати normal merge без force/rebase та підтвердити exact merged `main` SHA.
4. Відкрити один release cycle і зафіксувати tuple: `source_main_sha`, `source_hash`, `immutable_version`, `staging_deployment_id`, `rollback_version`.
5. Якщо для цього `source_main_sha` вже існує immutable candidate, не створювати інший. Якщо active staging уже існує, не створювати паралельний.
6. Попередній failed staging можна прибрати тільки exact-ID fail-closed helper після збереження immutable history, failure classification і rollback evidence.
7. Виконати preflight, створити один immutable candidate та один owner-only staging deployment.
8. Провести всі чинні acceptance gates. Transient external failure дозволяє один повтор того самого staging лише після доказаного відновлення; повторний failure закриває cycle як blocked.
9. Перед promotion повторно прочитати locked tuple. Promotion відхиляється, якщо candidate не є exact active-cycle candidate або будь-який gate не `VERIFIED`.
10. Після promotion підтвердити production readback двома свіжими запусками, виконати post-release observation/duplicate gate та cleanup exact staging. Після promotion або rollback атомарно оновити `docs/release-state.json`, парні `docs/uk|en/CURRENT_STATE.md`, root README, актуальні roadmap/issues та cumulative release header; запустити release-state і bilingual checks. Лише після цього закрити evidence і cycle. За candidate-specific failure виконати exact rollback та вимагати нового causal fix для нового cycle.

### Незмінні інваріанти

- Один source SHA — максимум один immutable candidate.
- Один release cycle — максимум один active staging deployment.
- No code delta — no version increment.
- No full `VERIFIED` acceptance — no production promotion.
- No exact candidate identity — no promotion.
- Historical immutable versions не змінюються й не стають новим production target автоматично.
- Versie залишається Versie 1, доки власник прямо не дозволить конкретну наступну Versie.

<!-- lang:en -->
## English

### Purpose

Automate routine merge, cumulative immutable staging, and conditional production promotion within Versie 1 without repeated obvious approvals, while failing closed against endless staging releases and promotion of an old candidate.

### Release cycle

1. Record a causal REQ and link it to the fix PR, issue/problem evidence, and candidate delta.
2. Reconcile `main`, the exact PR head, mergeability, required checks, privacy scan, and absence of an unfinished Git operation.
3. Perform a normal merge without force/rebase and confirm the exact merged `main` SHA.
4. Open one release cycle and lock the tuple: `source_main_sha`, `source_hash`, `immutable_version`, `staging_deployment_id`, and `rollback_version`.
5. If an immutable candidate already exists for that `source_main_sha`, do not create another. If an active staging already exists, do not create a parallel one.
6. Remove a previous failed staging only through an exact-ID fail-closed helper after preserving immutable history, failure classification, and rollback evidence.
7. Run preflight, then create one immutable candidate and one owner-only staging deployment.
8. Run every current acceptance gate. A transient external failure permits one retry of the same staging only after proven recovery; a repeated failure closes the cycle as blocked.
9. Re-read the locked tuple before promotion. Reject promotion unless the candidate is the exact active-cycle candidate and every gate is `VERIFIED`.
10. After promotion, confirm production readback with two fresh launches, run post-release observation and duplicate gates, and clean up the exact staging. After promotion or rollback, atomically update `docs/release-state.json`, paired `docs/uk|en/CURRENT_STATE.md`, the root README, current roadmap/issues, and the cumulative release header; run release-state and bilingual checks. Only then close the evidence and cycle. On a candidate-specific failure, perform an exact rollback and require a new causal fix for a new cycle.

### Fixed invariants

- One source SHA means at most one immutable candidate.
- One release cycle means at most one active staging deployment.
- No code delta means no version increment.
- No complete `VERIFIED` acceptance means no production promotion.
- No exact candidate identity means no promotion.
- Historical immutable versions never change and never become a new production target automatically.
- The product remains Versie 1 until the owner explicitly authorizes a specific next Versie.
