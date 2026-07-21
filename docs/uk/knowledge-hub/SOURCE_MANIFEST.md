# Маніфест джерел

[Home](README.md) | [Roadmap](MASTER_ROADMAP.md) | [Traceability](TRACEABILITY.md) | [English](../../en/knowledge-hub/README.md)

> Чернетка knowledge hub. Усі твердження походять лише із санітизованих екстракцій звітів, не перевірені незалежно й не доводять live deployment або поточний стан.

Extraction hashes обчислено з recovery buffers; original-source metadata є лише report-derived.

| Report | Dossier | Extraction artifact | Bytes | SHA-256 | Reported source | Reported bytes | Reported SHA-256 | Items |
|---|---|---|---:|---|---|---:|---|---:|
| R1 | [REPORT-1](sources/REPORT-1.md) | deep-report1-extraction.md | 37538 | 43e0b534b2ecbddb5d91a33ae1d6cd028003bdcd94274a49ce0e0d2a633b7ea8 | deep-research-report.md | 47060 | 49f1c7bffde5d613ae4a5782581da5f4a2204e0075f324734a95bd75117efe06 | 74 |
| R2 | [REPORT-2](sources/REPORT-2.md) | deep-report2-extraction.md | 42937 | 508b251d5947a010632eaf0251ca25f828a9dae97e1156e93f6dc98176f0cdde | deep-research-report2.md | 58865 | 879a2e9de104dadc5d4dce23092ce55514d7420af804b355b106a185d2c24777 | 79 |
| R3 | [REPORT-3](sources/REPORT-3.md) | deep-report3-extraction.md | 45529 | 207f9d6dfa67d6289c3d21287657c5f7939e3b2e8e23aad1124eda579bf117a1 | deep-research-report3.md | 48401 | 9c72d21ec4682beddef23e4b6b7d6f44b38f3ed5f53263834464a3fb44437cb2 | 142 |

## Count discrepancy

R1 повідомляє evidence=11 і lesson=5, але атомарні rows дають evidence=12 і lesson=4. Total=74 збігається; жодного entry не додано й не перекласифіковано.

[catalog.json](../../knowledge-hub/catalog.json)

---

Source request / Джерело запиту: `REQ-0003`. Report-derived baseline; live claims require current-state verification.

## Приватні session sources REQ-0012

`SESSION-CURRENT` і `SESSION-PREVIOUS` зареєстровані cryptographic hashes та logical-line coverage у [VR-003 source-manifest.json](../../verification-reports/VR-003/source-manifest.json). Їхній raw text і normalized chunks є приватними; публічною є лише очищена claim provenance.
