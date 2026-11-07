# Register voor sessiebewijs

Oekraïense tegenhanger: [../../uk/центр-знань/ДОКАЗИ-СЕАНСІВ.md](../../uk/центр-знань/ДОКАЗИ-СЕАНСІВ.md).

- **Bronverzoek kenniscentrum:** REQ-0003
- **Bewijsverzoek:** REQ-0012

In het kader van REQ-0012 zijn twee besloten sessie-exporten verwerkt als bewijsbronnen voor VR-003.

## Reproduceerbare grens

- 2 UTF-8-bronnen, 167.176 logische regels.
- 231 deterministische besloten tekstblokken met een overlap van vijf regels en nul dekkingshiaten.
- Eén bovenmatig lange bronregel is opgesplitst in twee aaneensluitende tekenbereiken.
- Kandidaatextractie leverde 6.483 geschoonde treffers op; de ruwe tekst bleef privé.
- De openbare uitvoer bevat uitsluitend geaggregeerde metadata, cryptografische hashes, geschoonde atomaire beweringen en onveranderlijke bewijskoppelingen.

## Interpretatieregel

Een vermelding in een sessieverslag vormt een herkomstspoor, geen bewijs. Herhaling verhoogt een uitspraak niet boven niveau E0. De staat van de broncodeopslagplaats is E2, lokale testen en voorafgaande controles zijn E3, de testomgeving is E4 en productie-acceptatie is E5.

## Openbare artefacten

- [VR-003-rapport](../verificatierapporten/rapporten/VR-003/OVERZICHT.md)
- [Atomaire beweringen](../../verification-reports/VR-003/claims.json)
- [Bronnenmanifest](../../verification-reports/VR-003/source-manifest.json)
- [Rapportmanifest](../../verification-reports/VR-003/manifest.json)

Ruwe sessieverslagen, genormaliseerde corpusblokken, kandidaatfragmenten, e-mailadressen, toegangssleutels, OAuth-materiaal, besloten webadressen, lokale bestandspaden en postvakinhoud zijn uitgesloten van Git.
