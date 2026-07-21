# Gmail primary sources and publication surfaces / Первинні джерела Gmail і поверхні публікації

Source request: `REQ-0021`.

<!-- lang:uk -->
## Українською

### Обов'язкові первинні джерела

Перед аналізом, планом, кодом, тестом або release-рішенням щодо Gmail/Apps Script відкрити й перевірити:

1. [Advanced Gmail Service](https://developers.google.com/apps-script/advanced/gmail) — стабільний канонічний URL.
2. Owner-provided session-qualified URL: <https://developers.google.com/apps-script/advanced/gmail?authuser=0>.
3. [Advanced Google services](https://developers.google.com/apps-script/guides/services/advanced) — enablement, authorization model і порівняння з `UrlFetch`.
4. [Gmail API reference](https://developers.google.com/gmail/api/reference/rest) — точні methods, parameters, paging і errors.
5. [Apps Script release notes](https://developers.google.com/apps-script/release-notes) — актуальні зміни перед implementation/release.

У request evidence записати дату доступу, релевантні methods/scopes/quotas, висновок і точні URL. `authuser=0` є browser-session selector; у документації та коді канонічним посиланням лишається URL без цього query.

### Fail-closed design gate

1. Спочатку перевірити, чи Advanced Gmail Service покриває потрібні Gmail API methods.
2. Окремо довести, яка Google identity виконує кожний call і чи зберігається connection/zone isolation.
3. Порівняти required scopes, refresh/re-auth behavior, History pagination, retries, quota class і sanitized errors.
4. Advanced Service використовувати переважно, коли він повністю покриває контракт і Apps Script-managed identity є правильною identity.
5. Direct `UrlFetch` дозволений лише для задокументованої функціональної або identity gap.
6. Не вважати заміну `UrlFetch` автоматичним quota fix: спочатку потрібні isolated tests і healthy stable/candidate A/B.
7. Не запускати новий OAuth consent, не змішувати Gmail accounts/Telegram zones і не змінювати випадкові листи для exploratory proof.

### Поверхні публікації

| Поверхня | Роль | Дозволене твердження |
|---|---|---|
| GitHub | канонічний source, docs, issues/PR evidence та immutable Git history | repository опубліковано і versioned |
| Google Apps Script | executable script project, immutable deployments і production/staging readback | точний hash candidate розгорнуто після release gates |
| Google Developer Program Profile | profile/discovery, GitHub/GitLab social links, Saved Pages/collections | профіль посилається на source і зберігає official docs |

Google Developer Program Profile не є Git repository, package registry або code-hosting service. Туди неможливо продублювати repository. Заборонено позначати profile link, bio або Saved Page як code mirror чи другу незалежну копію source.

Якщо власник обирає supported profile integration, перед зміною профілю окремо зафіксувати:

- який GitHub URL додати як social/discovery link;
- які Google documentation pages зберегти до collection;
- чи має профіль бути public або private;
- що GitHub залишається canonical source, а Apps Script — executable deployment surface.

<!-- lang:en -->
## English

### Mandatory primary sources

Before Gmail/Apps Script analysis, planning, coding, testing, or release decisions, open and verify:

1. [Advanced Gmail Service](https://developers.google.com/apps-script/advanced/gmail) — stable canonical URL.
2. Owner-provided session-qualified URL: <https://developers.google.com/apps-script/advanced/gmail?authuser=0>.
3. [Advanced Google services](https://developers.google.com/apps-script/guides/services/advanced) — enablement, authorization model, and comparison with `UrlFetch`.
4. [Gmail API reference](https://developers.google.com/gmail/api/reference/rest) — exact methods, parameters, paging, and errors.
5. [Apps Script release notes](https://developers.google.com/apps-script/release-notes) — current changes before implementation or release.

Record the access date, relevant methods/scopes/quotas, conclusion, and exact URLs in request evidence. `authuser=0` is a browser-session selector; documentation and code use the query-free URL as the canonical reference.

### Fail-closed design gate

1. First verify whether the Advanced Gmail Service covers every required Gmail API method.
2. Separately prove which Google identity executes each call and whether connection/zone isolation is preserved.
3. Compare required scopes, refresh/re-auth behavior, History pagination, retries, quota class, and sanitized errors.
4. Prefer the Advanced Service when it fully covers the contract and its Apps Script-managed identity is the correct identity.
5. Direct `UrlFetch` is allowed only for a documented functional or identity gap.
6. Never treat replacing `UrlFetch` as an automatic quota fix; isolated tests and a healthy stable/candidate A/B are required first.
7. Do not start new OAuth consent, mix Gmail accounts/Telegram zones, or mutate arbitrary mail for exploratory proof.

### Publication surfaces

| Surface | Role | Allowed claim |
|---|---|---|
| GitHub | canonical source, docs, issue/PR evidence, and immutable Git history | the repository is published and versioned |
| Google Apps Script | executable script project, immutable deployments, and production/staging readback | the exact-hash candidate was deployed after release gates |
| Google Developer Program Profile | profile/discovery, GitHub/GitLab social links, Saved Pages/collections | the profile links to source and saves official documentation |

Google Developer Program Profile is not a Git repository, package registry, or code-hosting service. A repository cannot be duplicated there. Never describe a profile link, bio, or Saved Page as a code mirror or an independent second source copy.

If the owner selects the supported profile integration, record before changing the profile:

- which GitHub URL is added as a social/discovery link;
- which Google documentation pages are saved into a collection;
- whether the profile is public or private;
- that GitHub remains the canonical source and Apps Script remains the executable deployment surface.
