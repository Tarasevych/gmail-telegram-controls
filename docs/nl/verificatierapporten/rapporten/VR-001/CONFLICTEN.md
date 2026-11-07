# VR-001: conflicten tussen rapporten en broncodeopslagplaats

[Rapport](OVERZICHT.md) | [Alle beweringen](BEWERINGEN.md) | [Oekraïens](../../../../uk/звіти-перевірки/звіти/ЗП-001/КОНФЛІКТИ.md)

Bronverzoek: `REQ-0004`. Beweringen met geregistreerde conflicten: 37.

Conflicten worden niet verborgen of gladgestreken: de huidige actieve versie en directe artefacten in de broncodeopslagplaats zijn leidend voor de beschrijving van de huidige toestand, terwijl eerdere onderzoeksopties behouden blijven als geschiedenis of aanbeveling.

| Bewering | Status | Niveau | Inhoud van de bewering |
|---|---|---|---|
| [KH-DEC-002](BEWERINGEN.md#kh-dec-002) | `aanbeveling` | `E1` | Het doel is een functioneel postvak met lage executieve kosten, geen leeg postvak. |
| [KH-DEC-006](BEWERINGEN.md#kh-dec-006) | `aanbeveling` | `E2` | Bouw het product op open standaarden en een bewezen openbron-e-mailkern; onderscheid het via een eigen gebruikersinterface, kunstmatige intelligentie en integratie-koppelvlakken. |
| [KH-DEC-007](BEWERINGEN.md#kh-dec-007) | `aanbeveling` | `E2` | Kies Stalwart met een eigen web- en mobiele gebruikerservaring voor moderne zakelijke en consumententoepassingen, of Mailcow met een eigen voorkant en toepassingslaag voor een snelle minimale werkende versie; behoud een eigen orkestratielaag. |
| [KH-DEC-013](BEWERINGEN.md#kh-dec-013) | `aanbeveling` | `E2` | Bouw de standaardbrug met de Telegram Bot API, een minitoepassing, een eigen serverlaag en de Gmail API; zet TDLib of een gebruikersaccountstroom uitsluitend weloverwogen in. |
| [KH-DEC-021](BEWERINGEN.md#kh-dec-021) | `gedeeltelijk` | `E2` | De eerste twee rapporten blijven achtergrondcontext, terwijl rapport 3 het nieuwe primaire technische fundament wordt. |
| [KH-DEC-022](BEWERINGEN.md#kh-dec-022) | `aanbeveling` | `E2` | De doelarchitectuur moet hybride zijn: een Gmail-uitbreiding, een webtoepassing en een externe laag voor gebeurtenissen en achtergrondwerkers. |
| [KH-DEP-017](BEWERINGEN.md#kh-dep-017) | `weerlegd` | `E2` | Gebruik voor externe OAuth-aanbieders `apps-script-oauth2` in combinatie met eigenschappenopslag, tussenopslag en vergrendeling. |
| [KH-EVD-007](BEWERINGEN.md#kh-evd-007) | `gedeeltelijk` | `E3` | [alleen in rapport geverifieerd] Neurodivergente auteurs en gebruikers omschrijven een `functioneel postvak` als praktischer dan een leeg postvak. |
| [KH-EVD-016](BEWERINGEN.md#kh-evd-016) | `weerlegd` | `E2` | Gmail-uitbreidingen maken gebruik van een kaartinterface; contextuele starters worden uitgevoerd bij geopende berichten en zijn onvoorwaardelijk in het manifest. |
| [KH-EVD-020](BEWERINGEN.md#kh-evd-020) | `gedeeltelijk` | `E3` | De Telegram Bot API is gebaseerd op HTTP en geschikt voor bediening met korte opdrachten. |
| [KH-HIS-005](BEWERINGEN.md#kh-his-005) | `weerlegd` | `E2` | `gmail-telegram-v45-gentle-milestones` is aangewezen als het huidige basisartefact. |
| [KH-INS-001](BEWERINGEN.md#kh-ins-001) | `aanbeveling` | `E2` | De gebruikersinterface moet één dominante actie, stabiele context, lage informatiedichtheid, duidelijke voortgang, heldere prioriteiten en exacte hervatting na een onderbreking bieden. |
| [KH-INS-002](BEWERINGEN.md#kh-ins-002) | `aanbeveling` | `E2` | Definieer voor elk bericht één visueel primaire vervolgactie. |
| [KH-INS-004](BEWERINGEN.md#kh-ins-004) | `aanbeveling` | `E2` | De focusmodus mag niet meer dan drie of vier primaire acties tonen. |
| [KH-INS-008](BEWERINGEN.md#kh-ins-008) | `aanbeveling` | `E2` | Personalisatie moet adaptief, scenariogericht en geleidelijk zijn, met eenvoudige voorinstellingen in plaats van langdurige configuratie. |
| [KH-ISS-003](BEWERINGEN.md#kh-iss-003) | `ongeverifieerd` | `E0` | Rode tellers, opdringerige herinneringen, openbare reeksen en veroordelend taalgebruik kunnen vermijdingsgedrag versterken en zowel adoptie als behoud schaden. |
| [KH-ISS-005](BEWERINGEN.md#kh-iss-005) | `ongeverifieerd` | `E0` | Overmatige spelmechanieken kunnen impulsief gebruik aanwakkeren zonder blijvend voordeel op lange termijn. |
| [KH-ISS-016](BEWERINGEN.md#kh-iss-016) | `weerlegd` | `E2` | Verwacht risico: een extern webadres zonder toestemmingslijst of validatie. |
| [KH-ISS-017](BEWERINGEN.md#kh-iss-017) | `weerlegd` | `E2` | Verwacht risico: niet-ontsnapte HTML of door gebruikers gegenereerde tekenreeksen. |
| [KH-ISS-018](BEWERINGEN.md#kh-iss-018) | `weerlegd` | `E2` | Verwacht risico: alle taakstatus opgeslagen in één groot JSON-object binnen `PropertiesService`. |
| [KH-ISS-019](BEWERINGEN.md#kh-iss-019) | `weerlegd` | `E2` | Verwacht risico: postvaklabels gebruikt als enige bron van waarheid. |
| [KH-ISS-021](BEWERINGEN.md#kh-iss-021) | `weerlegd` | `E2` | Verwacht risico: een eenmalige peillussen-uitvoering die stilzwijgend stopt bij de uitvoeringslimiet. |
| [KH-ISS-023](BEWERINGEN.md#kh-iss-023) | `weerlegd` | `E2` | Verwacht risico: een webhaak zonder bescherming tegen herhaalaanvallen. |
| [KH-PLAN-008](BEWERINGEN.md#kh-plan-008) | `gedeeltelijk` | `E2` | Telegram-stroom: BotFather, hoofd-minitoepassing, toegestane webadressen, gebruikersinterface, serverauthenticatie en koppeling tussen de Telegram-identiteit en een intern accountrecord. |
| [KH-PLAN-011](BEWERINGEN.md#kh-plan-011) | `weerlegd` | `E2` | Beoogde gelaagde architectuur: Stalwart- of Mailcow-kern, een eigen integratiefacade, verwerkers voor kunstmatige intelligentie en achtergrondtaken, en slimme web- en mobiele toepassingen. |
| [KH-PLAN-027](BEWERINGEN.md#kh-plan-027) | `weerlegd` | `E1` | De voorgestelde mappenstructuur scheidt `appsscript.json`, `src/addon`, `src/core`, `src/integrations`, `src/web`, `src/jobs`, `src/security`, `tests` en `.github/workflows/deploy.yml`. |
| [KH-PLAN-030](BEWERINGEN.md#kh-plan-030) | `weerlegd` | `E2` | Gebeurtenisstroom: postvakwijziging naar `watch`, Pub/Sub, verwerker op Cloud Run, normaliseren en ontdubbelen, in de wachtrij plaatsen of Apps Script aanroepen, en vervolgens labels, overzicht, taakstatus en Telegram-uitvoer bijwerken. |
| [KH-PLAN-036](BEWERINGEN.md#kh-plan-036) | `weerlegd` | `E2` | De controle van de broncodeopslagplaats is niet uitgevoerd omdat beschikbaarheid of indexering onbevestigd was; er is uitsluitend een controleplan opgesteld. |
| [KH-PLAN-047](BEWERINGEN.md#kh-plan-047) | `gedeeltelijk` | `E2` | Spoorcontrole van de gebruikerservaring: aantal primaire actieknoppen, toon van het overzicht, stille modus en schuldvrije achterstand. |
| [KH-PROD-004](BEWERINGEN.md#kh-prod-004) | `gedeeltelijk` | `E2` | Beloon concrete kleine afrondingen zonder gokmechanismen, volumedoelen of sancties bij onderbroken reeksen. |
| [KH-PROD-007](BEWERINGEN.md#kh-prod-007) | `gedeeltelijk` | `E2` | Het focusoppervlak moet een lage informatiedichtheid hebben, uit één kolom of kaarten bestaan en geen volledige e-mailclient nabootsen. |
| [KH-PROD-014](BEWERINGEN.md#kh-prod-014) | `geverifieerd` | `E2` | Bied korte, op het energieniveau afgestemde antwoordsjablonen en gecontroleerd vertraagd verzenden zonder privé-inhoud te reproduceren. |
| [KH-PROD-037](BEWERINGEN.md#kh-prod-037) | `ongeverifieerd` | `E2` | De Gmail-uitbreiding is een contextueel kaartoppervlak voor snelle triage. |
| [KH-PROD-041](BEWERINGEN.md#kh-prod-041) | `geblokkeerd` | `E2` | Minimaliseer cognitieve belasting, beslissingsmoeheid, meldingsdruk en taakverlamming. |
| [KH-PROD-043](BEWERINGEN.md#kh-prod-043) | `geverifieerd` | `E2` | De Telegram Bot API is een extern bedieningsvlak voor korte opdrachten en overzichten. |
| [KH-PROD-045](BEWERINGEN.md#kh-prod-045) | `geverifieerd` | `E2` | Tweede kaartniveau: drie acties: snel antwoorden, uitstellen en omzetten naar taak. |
| [KH-PROD-047](BEWERINGEN.md#kh-prod-047) | `gedeeltelijk` | `E2` | De startpagina van Gmail moet een kleine geprioriteerde selectie tonen: prioriteitspost, snelle winst, kort werkblok en wachtende opvolging. |
