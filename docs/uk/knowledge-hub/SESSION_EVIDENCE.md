# Реєстр доказів із сесій

- **Базовий запит knowledge hub:** REQ-0003
- **Запит evidence:** REQ-0012

REQ-0012 опрацював два приватні експорти сесій як evidence sources для VR-003.

## Відтворювана межа

- 2 UTF-8 джерела, 167 176 логічних рядків.
- 231 deterministic private chunks із п'ятьма overlap lines і без coverage gaps.
- Один наддовгий рядок джерела розділено на два суміжні character ranges.
- Candidate extraction створив 6 483 sanitized hits; raw text залишився приватним.
- Public output містить лише aggregate metadata, hashes, sanitized atomic claims та immutable evidence links.

## Правило інтерпретації

Згадка у transcript є provenance, а не доказом. Повторення не підвищує assertion вище E0. Repository state є E2, local tests і preflight є E3, staging є E4, production acceptance є E5.

## Публічні артефакти

- [Звіт VR-003](../verification-reports/reports/VR-003/README.md)
- [Атомарні твердження](../../verification-reports/VR-003/claims.json)
- [Маніфест джерел](../../verification-reports/VR-003/source-manifest.json)
- [Маніфест звіту](../../verification-reports/VR-003/manifest.json)

Raw transcripts, normalized corpus chunks, candidate excerpts, email addresses, tokens, OAuth material, private URLs, local paths і mailbox content виключені з Git.
