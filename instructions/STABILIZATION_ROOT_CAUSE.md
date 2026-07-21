# Стабілізація та аналіз першопричини / Stabilization and root-cause analysis

Source request: `REQ-0020`.

<!-- lang:uk -->
## Українською

### Коли застосовується

Цей протокол обов'язковий, коли нові спроби виправлення можуть пошкодити вже production-verified функції, коли Git candidate і runtime production мають різні стани або коли одна помилка відтворюється після exact rollback.

### Порядок

1. Заборонити code/runtime/release mutations до завершення factual audit.
2. Оновити remote references і звірити local Git log, GitHub PR/checks, active documentation, deployments, trigger state та recovery checkpoint.
3. Визначити останній production-verified commit і окремо перелічити candidate delta. Усі файли поза candidate delta вважати frozen, доки доказ не вкаже на них прямо.
4. Перевірити кожний worktree. `git add .` і checkpoint commit дозволені лише у factual dirty worktree; чистий стан зберігається точним commit/branch pointer без порожнього commit.
5. Зупинити лише підтверджені development, watch, test або autofix процеси. Не зупиняти production service лише через схожу назву.
6. Створити окремий diagnostic worktree/branch без reset, rebase, force-push або перемикання основної робочої гілки.
7. Запускати diagnostic-only tests і read-only logs. Synthetic error fixtures не класифікувати як runtime failures, якщо test exit і assertions успішні.
8. Визначити максимум дві першопричини, пов'язати кожну з точним commit/file/runtime evidence та відокремити cause від symptom.
9. Оновити доступні GitHub status surfaces. Якщо Issues вимкнені або Project scope відсутній, зафіксувати це як `unavailable` і використати PR comments/labels без вигадування ticket state.
10. Code fix дозволений лише новим owner request після звіту; stable blocks не переписувати, а candidate змінювати cumulative follow-up commit.

### Stable freeze contract

- Production acceptance є сильнішим доказом за green unit tests або merged candidate PR.
- Exact rollback не стирає candidate history, але повертає runtime boundary до rollback immutable.
- Candidate code у `main` не стає production-verified автоматично.
- Однакова помилка на stable і candidate є shared blocker, а не candidate regression без додаткового доказу.
- OAuth, Gmail records, Telegram zones, листи, protected properties і secrets не використовуються для exploratory mutation.

### Обов'язковий звіт

- stable commit і frozen blocks;
- candidate/problem boundary;
- зупинені або відсутні dev processes;
- checkpoint/branch evidence;
- diagnostic test totals і private error-log reference;
- одна-дві root causes;
- функції під ризиком;
- покроковий safe remediation plan;
- GitHub Done/Stable/Blocked status та unavailable surfaces.

<!-- lang:en -->
## English

### When it applies

This protocol is mandatory when new repair attempts can damage production-verified features, when a Git candidate and production runtime have different states, or when the same failure reproduces after an exact rollback.

### Order

1. Prohibit code, runtime, and release mutations until the factual audit is complete.
2. Refresh remote references and reconcile local Git history, GitHub PR/checks, active documentation, deployments, trigger state, and the recovery checkpoint.
3. Identify the last production-verified commit and list the candidate delta separately. Treat every file outside the candidate delta as frozen unless direct evidence implicates it.
4. Inspect every worktree. `git add .` and a checkpoint commit are allowed only in a factually dirty worktree; preserve a clean state through an exact commit/branch pointer without an empty commit.
5. Stop only confirmed development, watch, test, or autofix processes. Do not stop a production service merely because its name looks similar.
6. Create a separate diagnostic worktree/branch without reset, rebase, force-push, or switching the primary working branch.
7. Run diagnostic-only tests and read-only logs. Do not classify synthetic error fixtures as runtime failures when test exit and assertions pass.
8. Identify at most two root causes, bind each to exact commit/file/runtime evidence, and separate cause from symptom.
9. Update available GitHub status surfaces. If Issues are disabled or Project scope is missing, record the surface as `unavailable` and use PR comments/labels without inventing ticket state.
10. A code fix requires a new owner request after the report; do not rewrite stable blocks, and change a candidate only through a cumulative follow-up commit.

### Stable freeze contract

- Production acceptance is stronger evidence than green unit tests or a merged candidate PR.
- An exact rollback preserves candidate history but restores the runtime boundary to the rollback immutable.
- Candidate code in `main` does not become production-verified automatically.
- The same failure on stable and candidate is a shared blocker, not a candidate regression without additional evidence.
- OAuth, Gmail records, Telegram zones, mail, protected properties, and secrets are not used for exploratory mutation.

### Required report

- stable commit and frozen blocks;
- candidate/problem boundary;
- stopped or absent development processes;
- checkpoint/branch evidence;
- diagnostic test totals and private error-log reference;
- one or two root causes;
- functions at risk;
- step-by-step safe remediation plan;
- GitHub Done/Stable/Blocked status and unavailable surfaces.
