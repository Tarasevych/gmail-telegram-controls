# REQ-0023: Reaffirm optional private GitLab mirror use

- ID: REQ-0023
- Date: 2026-07-21
- Status: completed
- Next Versie authorization: no
- Routes: requests=record; instructions=reference; permissions=reference; plan=reference; product=no-change; release=no-change
- Permission basis: explicit

<!-- lang:uk -->
## Українською

### Нормалізований запит

- Власник повторно дозволив використовувати вже створене приватне GitLab-дзеркало, якщо воно практично допомагає проєкту.
- Чинний дозвіл `P-007` лишається повною межею повноважень; це повідомлення не розширює його.
- GitHub лишається єдиним канонічним source-of-truth, а GitLab використовується лише як приватне recovery-дзеркало перевірених Git refs.

### Критерії завершення

- Запис опубліковано й перевірено валідаторами гілки `Запити`.
- Після зеленого GitHub baseline виконано лише звичайний non-force push перевірених refs до приватного GitLab project.
- Синхронізацію підтверджено порівнянням commit hashes без публікації credentials, приватного вмісту або protected local state.
- За OTP/2FA, CAPTCHA, passkey, біометрії, апаратного ключа або неоднозначного вибору GitLab-підзадача зупиняється, а незалежна локальна робота продовжується.

### Межа

Немає дозволу на нову Versie, immutable release, production promotion, Gmail mutation, повторний OAuth або зміну Telegram zone. Shared Apps Script daily `URLFetch` quota blocker лишається окремим runtime-фактом.

<!-- lang:en -->
## English

### Normalized request

- The owner reaffirmed that the existing private GitLab mirror may be used when it is practically useful to the project.
- Existing authority `P-007` remains the complete permission boundary; this message does not expand it.
- GitHub remains the sole canonical source of truth, while GitLab is used only as a private recovery mirror of verified Git refs.

### Completion criteria

- The record is published and passes the `Запити` branch validators.
- After a green GitHub baseline, only ordinary non-force pushes of verified refs are made to the private GitLab project.
- Synchronization is proven by commit-hash comparison without publishing credentials, private content, or protected local state.
- At OTP/2FA, CAPTCHA, passkey, biometric, hardware-key, or ambiguous GitLab choice, the GitLab subtask stops while independent local work continues.

### Boundary

There is no authority for a new Versie, immutable release, production promotion, Gmail mutation, repeated OAuth, or Telegram-zone change. The shared Apps Script daily `URLFetch` quota blocker remains a separate runtime fact.

## Evidence / Докази

- Private mirror URL: `https://gitlab.com/tarasevych.pavlo/gmail-telegram-controls`.
- Anonymous GitLab API access returned `404`.
- Exact GitHub/GitLab hashes matched for `main`, `Запити`, `Інструкції`, and `Повноваження` after an ordinary non-force push.
- Canonical GitHub `main`: `fcbceb63e61da2e94e189743959654bffd6098b3`.
- No product, release, Apps Script, Gmail, OAuth, Telegram-zone, or protected-state mutation was part of mirror synchronization.
