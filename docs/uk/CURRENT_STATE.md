# Поточний стан

[English](../en/CURRENT_STATE.md)

<!-- release-state: production=v63; candidate=v63; staging=0; status=VERIFIED; as-of=2026-07-22 -->

## Канонічний стан випуску

- **Versie:** Versie 1.
- **Production:** Apps Script immutable v63, `VERIFIED`.
- **HEAD:** точний cumulative v63.
- **Активні staging deployments:** `0`.
- **Release journal:** `cleaned`.
- **Канонічне джерело:** GitHub і приватне GitLab-дзеркало досягли `ce46143b7270ca7776a91b01783490e1d08aa1ca`.
- **Rollback:** exact v57 лишається доступним; historical immutable v56, v59 і v62 збережені та не переписані.
- **Telegram menu:** production `📬 Пошта · Versie 1`.

## Перевірений acceptance v63

- Focused worker contracts пройшли `17/17`; source suite пройшов `497/497`.
- Release-helper contracts пройшли `2/2`, після чого full suite пройшов `499/499`.
- Signed bridge contracts пройшли `4/4`, після чого cumulative suite пройшов `501/501`.
- Owner-only staging завантажився в native Telegram Desktop, показав dynamic account context, avatar behavior і рівно три isolated Gmail roots; перемикання на контрольований наявний root і назад пройшло без OAuth.
- Два свіжі native Telegram Desktop production launches завантажили mailbox v63.
- Сім послідовних виконань `checkNewMail_` завершилися з інтервалом в одну хвилину без overlap; спостережені тривалості були від `1.82 с` до `23.542 с`.
- Фінальний preflight підтвердив stable/HEAD v63, immutable-ready hashes, staging `0` і journal `cleaned`.

## Відкриті межі доказів

- `GT-031` лишається `PARTIAL`: dynamic identity працює, але вузький header альтернативного акаунта обрізав частину email.
- `GT-032`–`GT-036` cumulative увійшли до production v63, але їхній scenario-specific P0 acceptance лишається `PARTIAL`.
- 15-хвилинний History slot покритий automated contract; окремий runtime substage trace лишається `UNVERIFIED`.
- Content-free worker telemetry payload не був доступний у Cloud logs під час observation window.
- External automatic INBOX delivery після v63 має статус `UNVERIFIED`; для цього випуску не надсилали й не змінювали додаткових реальних листів.
- `GT-037` відстежує read-after-write false negative promotion helper. Deployment state безпечно reconciled; bounded helper hardening лишається `RECOMMENDED`.
- `GT-038` відстежує blank Telegram Web K/A embed, тоді як той самий signed release пройшов у native Telegram Desktop. Web-only root cause має статус `UNVERIFIED`.

## Докази й навігація

- [Детальний звіт про випуск v63 і закриття GT-030](reports/VERSIE_001_V63_RELEASE_AND_GT030_CLOSURE_2026-07-22.md)
- [Атомарна verification VR-011](verification-reports/reports/VR-011/README.md)
- [Історичний запис VR-010 про rollback v62](verification-reports/reports/VR-010/README.md)
- [Cumulative історія випуску Versie 1](releases/VERSIE-001-2026-07-19.md)
- [Machine-readable release state](../release-state.json)
