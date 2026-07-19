# REQ-0006: Межі confidential transcript archive / Confidential transcript archive boundaries

- ID: REQ-0006
- Received: 2026-07-19
- Status: completed
- Active Versie: Versie 1
- Next Versie authorization: no
- Sensitive data persisted: complete visible transcript in client-side encrypted artifacts only
- Routes: requests=record; instructions=update; permissions=reference; plan=update; product=reference; release=no-change
- Permission basis: explicit
- Completion evidence / Доказ завершення: private archive commit [`2abde8e0d18926c80d439f80a31c72386e7cb0c2`](https://github.com/Tarasevych/gmail-telegram-onderzoeksarchief/commit/2abde8e0d18926c80d439f80a31c72386e7cb0c2); exact retained visible transcript and confidential sources are AES-256-GCM encrypted; the key remains DPAPI-protected outside Git; 45 payloads passed readback/hash verification without plaintext output; hidden reasoning, system prompts, and developer prompts remain outside the export boundary.

<!-- lang:uk -->
## Українською

## Уточнення власника

Власник уточнив, що саме непублічний характер Onderzoeksarchief має дозволити зберегти confidential data, а не виключити її з дослідницького джерела.

## Виконувана інтерпретація

- Повний доступний user-visible transcript двох названих tasks зберігається exact у client-side encrypted artifacts, включно з чутливими фрагментами, які були видимі в чаті або tool output.
- Decryption key/password залишається в protected local storage поза Git. Git містить ciphertext, hashes, manifests і санітизовану навігацію, але не plaintext credentials.
- Hidden chain-of-thought, system/developer prompts та внутрішні недоступні model states не є доступним user transcript і не можуть бути експортовані verbatim.
- Замість hidden reasoning створюється детальний decision/action/evidence trace: owner question, assistant-visible answer, visible rationale, command/tool event, result, error, correction, commit, verification і remaining work.
- Sanitized summaries можуть бути прочитані без decrypt; exact confidential transcript потребує protected local key.

## Причина межі

- Private Git repository обмежує доступ, але Git history не є належним plaintext secret store: видалене значення залишається в історії й може поширитися через clone, cache, backup або collaborator access.
- Client-side encryption зберігає оригінальні дані без втрати, одночасно не перетворюючи Git history на credential vault.
- Обмеження на hidden instructions і chain-of-thought діє незалежно від repository visibility; доступний результат зберігається через visible transcript і factual decision trace.

## Критерії завершення

- `REQ-0006` опубліковано до transcript extraction.
- Encrypted originals проходять decrypt/readback/hash verification без plaintext logging.
- Sanitized indexes містять достатній decision/action/evidence trace для повторного використання роботи.
- Manifest прямо позначає, що включено exact, що reconstructed і що недоступне за системною межею.
- Жодний plaintext secret або decryption key не потрапляє до Git чи публічного repository.

<!-- lang:en -->
## English

## Owner clarification

The owner clarified that the non-public nature of the Onderzoeksarchief is intended to preserve confidential data rather than exclude it from the research source.

## Executable interpretation

- The complete available user-visible transcript of the two named tasks is preserved exactly in client-side encrypted artifacts, including sensitive fragments that were visible in chat or tool output.
- The decryption key/password remains in protected local storage outside Git. Git stores ciphertext, hashes, manifests, and sanitized navigation, but not plaintext credentials.
- Hidden chain-of-thought, system/developer prompts, and inaccessible internal model states are not available user transcript and cannot be exported verbatim.
- A detailed decision/action/evidence trace replaces hidden reasoning: owner question, assistant-visible answer, visible rationale, command/tool event, result, error, correction, commit, verification, and remaining work.
- Sanitized summaries can be read without decryption; exact confidential transcripts require the protected local key.

## Boundary rationale

- A private Git repository restricts access, but Git history is not a suitable plaintext secret store: deleted values remain in history and may spread through clones, caches, backups, or collaborator access.
- Client-side encryption preserves the original data without loss while avoiding conversion of Git history into a credential vault.
- The boundary on hidden instructions and chain-of-thought applies regardless of repository visibility; available results are preserved through the visible transcript and factual decision trace.

## Completion criteria

- `REQ-0006` is published before transcript extraction.
- Encrypted originals pass decrypt/readback/hash verification without plaintext logging.
- Sanitized indexes contain a sufficient decision/action/evidence trace for reuse of completed work.
- The manifest explicitly identifies what is exact, reconstructed, and unavailable because of the system boundary.
- No plaintext secret or decryption key enters Git or the public repository.
