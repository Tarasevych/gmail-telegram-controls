# REQ-0007: Owner-only доступ до архіву / Owner-only archive access

- ID: REQ-0007
- Received: 2026-07-19
- Status: in_progress
- Active Versie: Versie 1
- Next Versie authorization: no
- Sensitive data persisted: exact available visible transcript in client-side encrypted artifacts only
- Routes: requests=record; instructions=update; permissions=update; plan=update; product=reference; release=no-change
- Permission basis: explicit
- Permission scope: owner-only archive access; P-006 boundary clarification only

<!-- lang:uk -->
## Українською

Власник попросив доповнити приватний дослідницький архів і залишити доступ лише зі свого GitHub-акаунта. Запит також просить включити hidden chain-of-thought, system prompts і developer prompts.

## Нормалізоване виконання

- Повний доступний користувачеві transcript, включно з цим запитом, відповідями, операційними подіями та factual action/evidence trace, додається до owner-only encrypted archive.
- Hidden chain-of-thought, system prompts і developer prompts не є доступними export-даними. Приватність GitHub не змінює цю системну межу, тому такі дані не вигадуються, не реконструюються і не заявляються як збережені.
- GitHub access audit перевіряє repository visibility, collaborators, pending invitations, deploy keys і forks. Будь-який сторонній actor або ключ видаляється, якщо це безпечно й підтверджено live-станом.
- GitHub Actions може обробляти лише ciphertext і санітизовані commit-файли та не отримує локальний DPAPI decryption key.

## Критерії завершення

- Repository visibility дорівнює `private`.
- Єдиний human collaborator з доступом є owner `Tarasevych`.
- Pending repository invitations відсутні.
- Deploy keys і private forks відсутні.
- Новий visible transcript segment зашифровано, перевірено й опубліковано append-only commit.
- `P-006` уточнено тільки щодо owner-only доступу та системної export-межі.

<!-- lang:en -->
## English

The owner requested a private research archive supplement and access limited to the owner's GitHub account. The request also asks to include hidden chain-of-thought, system prompts, and developer prompts.

## Normalized implementation

- The complete available user-visible transcript, including this request, responses, operational events, and factual action/evidence trace, is appended to the owner-only encrypted archive.
- Hidden chain-of-thought, system prompts, and developer prompts are not available export data. GitHub privacy does not change this system boundary, so those materials are neither invented, reconstructed, nor represented as retained.
- The GitHub access audit checks repository visibility, collaborators, pending invitations, deploy keys, and forks. Any external actor or key is removed when live state confirms it is safe to do so.
- GitHub Actions may process only ciphertext and sanitized committed files and does not receive the local DPAPI decryption key.

## Completion criteria

- Repository visibility is `private`.
- The only human collaborator with access is owner `Tarasevych`.
- No pending repository invitations exist.
- No deploy keys or private forks exist.
- The new visible transcript segment is encrypted, verified, and published in an append-only commit.
- `P-006` is updated only for owner-only access and the system export boundary.
