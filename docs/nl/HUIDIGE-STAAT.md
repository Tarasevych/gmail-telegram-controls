# Huidige staat

[Oekraïens](../uk/ПОТОЧНИЙ-СТАН.md)

<!-- release-state: production=v65; candidate=v65; staging=0; status=VERIFIED; as-of=2026-07-23 -->

## Canonieke uitgavestaat

- **Versie:** Versie 1.
- **Productieomgeving:** onveranderlijke Apps Script v65, `VERIFIED`.
- **Geaccepteerde uitgave-HEAD:** exacte cumulatieve v65.
- **Actieve testomgevingsimplementaties:** `0`.
- **Laatste uitgavelogboek:** v70 is definitief `abandoned`; het geaccepteerde v65-productielogboek blijft historisch `cleaned`.
- **Broncodegrens van de uitgave:** geaccepteerde cumulatieve v65-bron `3373ca4aa403a28f3252ad72fbe65310b318c53c`; v70-bronsamenvoeging `0666165b614f430103530728aa45349083db5e78`; v70-uitgavemiddelensamenvoeging `70cc87ebf2a9c06b000e042e1e676838cf27d6b2`.
- **Terugdraaiing:** exacte onveranderlijke v64 blijft beschikbaar; historische onveranderlijke v56, v57, v59, v62 en v66-v70 zijn bewaard en niet herschreven.
- **Telegram-menu:** productie `📬 E-mail · Versie 1`.

## Geverifieerde acceptatie van v65

- Broncode- en uitgavemarkeringscontracten zijn geslaagd (`14/14`); de cumulatieve testreeks voorafgaand aan de uitgave is geslaagd (`505/505`).
- De v65-hulpcontracten zijn geslaagd (`2/2`) en de cumulatieve uitgavereeks is geslaagd (`507/507`); de ondertekende brugfase is geslaagd (`4/4` en `509/509`).
- Eén `StageOnly`-uitvoering heeft de onveranderlijke v65 en één testomgevingsimplementatie uitsluitend voor de eigenaar aangemaakt. Een begrensde propagatiecorrectie voor lezen-na-aanmaken heeft exact die implementatie overgenomen zonder `deployments.create` te herhalen.
- De oorspronkelijke Telegram Desktop-testomgeving heeft het postvak en de profielafbeelding geladen, exact drie geïsoleerde Gmail-hoofdmappen getoond en zonder OAuth naar een secundair account en terug geschakeld.
- Eén promotie heeft v64 naar v65 bevorderd. Twee nieuwe productiestarts hebben het primaire postvak geladen, de opschoning heeft de testomgeving verwijderd en de laatste voorcontrole bevestigde stabiele/HEAD v65 met logboekstatus `cleaned`.
- Telemetrie van de achtergrondwerker na opschoning toonde volledige geslaagde fasesporen met `errorCode=none`. Een processchil van 64,611 seconden overlapte de volgende tijdstarter met ongeveer vijf seconden, terwijl de daaropvolgende uitvoering enkel `gmail_timer_worker_skip: lease_active` registreerde; gelijktijdig achtergrondwerk werd dus afgewezen.

## Open bewijsgrenzen

- `GT-031` en `GT-037` blijven `VERIFIED`; de v65-productieomgeving en uitgaveopschoning zijn `VERIFIED`.
- `GT-032` tot en met `GT-036` blijven `PARTIAL`. De automatische herlaadovergang van v64 naar v65 kan niet worden bewezen omdat de v64-ontleder zelf het canonieke manifestveld wegliet.
- De rechtstreekse Apps Script Processes API gaf `403 ACCESS_TOKEN_SCOPE_INSUFFICIENT` terug; er is geen uitbreiding van het machtigingsbereik, OAuth-cyclus of migratie van het standaard-GCP-project geprobeerd.
- `GT-039` is `BLOCKED`: productie v65 slaat `INBOX+SENT` over, terwijl de huidige broncode dit eenmaal aflevert. `REQ-0009`/`REQ-0019` en het latere `GT-039` definiëren tegenstrijdige semantiek voor eigen berichten en aliassen; dit broncodeverschil mag niet in een productiekandidaat worden opgenomen vóór een rechtstreeks besluit van de eigenaar. Bewijs: `VR-025`.
- De History-drempel van 15 minuten blijft geverifieerd via een geautomatiseerd contract; het actieve fasespoor toont geen beslissing tussen uitvoeren en overslaan, waardoor het specifieke uitvoeringsritme `UNVERIFIED` blijft.
- `GT-038` blijft `PARTIAL` voor Telegram Web; dezelfde ondertekende uitgave slaagde in de oorspronkelijke Telegram Desktop-toepassing.

## Bewijs en navigatie

- [Gedetailleerd v65-uitgaverapport](rapporten/VERSIE-001-V65-UITGAVEKANDIDAAT-2026-07-23.md)
- [VR-014 verificatie van productieclient](verificatierapporten/rapporten/VR-014/OVERZICHT.md)
- [VR-015 verificatie van SENT+INBOX-aflevering](verificatierapporten/rapporten/VR-015/OVERZICHT.md)
- [Historisch rapport van v63-uitgave en GT-030-sluiting](rapporten/VERSIE-001-V63-UITGAVE-EN-SLUITING-GT030-2026-07-22.md)
- [Cumulatieve uitgavegeschiedenis van Versie 1](uitgaven/UITGAVE-001-2026-07-19.md)
- [Machineleesbare uitgavestaat](../release-state.json)

## P0 ÉÉN-SECONDE-grens — 2026-07-23

- De productieomgeving en de stabiele uitgavestaat blijven op de onveranderlijke v65; het eigenaarsmenu blijft op de productieomgeving staan.
- De onveranderlijke versies v66–v69 blijven historisch bewaard; v69 eindigde foutveilig gesloten als `abandoned` na het oorspronkelijke conflict bij geforceerd herladen en sessiebeheer, en werd niet bevorderd.
- Broncode v70 is via een normale PR samengevoegd op SHA `0666165b614f430103530728aa45349083db5e78`; de onveranderlijke v70 is exact eenmaal aangemaakt, eenmaal getest en historisch bewaard.
- Lokale controles na de uitgavemiddelen: hulpscript `3/3`, brugcontracten `4/4`, cumulatieve testreeks `572/572`, Python-menusyntaxis en `git diff --check` zijn geslaagd.
- Broncode v70 voegt inhoudsloze `SecureStorage`-classificatie, een foutveilig vergrendelde staat zonder herstartlus en gevalideerde tijdsmeting van brug tot bruikbare weergave toe; de bescherming tegen hergebruik van eenmalige nummers is niet verzwakt.
- De oorspronkelijke v70 opende het postvak zonder een nieuwe OAuth-cyclus of herhaald verbindingsscherm, herstelde een opgeslagen berichtenreeks en toonde de profielafbeelding plus drie geïsoleerde Gmail-hoofdmappen. Overschakelen naar een secundaire hoofdmap gaf de algemene foutmelding voor postbewerkingen terug.
- Een nieuwe productiestart van v65 gaf dezelfde algemene foutmelding vóór het postvak terug. De uitvoeringen `doPost`, `mailboxRedeemLaunch` en `mailboxRpc` werden voltooid, terwijl het aangrenzende tijdspoor faalde in `legacy_recovery` met `errorCode=urlfetch_quota` en de dagelijkse Apps Script-quotumuitzondering voor `urlfetch`. Een kandidaatspecifieke v70-regressie is daarmee niet vastgesteld.
- Promotie naar productie is niet uitgevoerd. Het menu is teruggezet naar productie, de exacte v70-testomgevingsimplementatie is verwijderd door het logboekgebonden hulpscript, het aantal actieve testomgevingen is `0` en het v70-logboek heeft de eindstatus `abandoned`.
- De oorspronkelijke p95-tijd van knop tot interactieve weergave, tien starts, geforceerd herladen, offline privé-Postvak IN, exact herstel van Windows `SecureStorage` en tweerichtingsschakeling tussen accounts blijven `UNVERIFIED`/`BLOCKED`; een herhaalde A/B-vergelijking wordt uitgesteld totdat het externe dagquotum is hersteld.
- Canoniek bewijs: [VR-016](verificatierapporten/rapporten/VR-016/OVERZICHT.md), [VR-023](verificatierapporten/rapporten/VR-023/OVERZICHT.md).

## 2026-07-23 P0 v67-acceptatiegrens

- Productie en HEAD blijven op de onveranderlijke v65.
- De onveranderlijke v67 blijft bewaard als historisch bewijs; de bijbehorende tijdelijke testomgevingsimplementatie is verwijderd.
- De dubbele zichtbare start- en verbindingsreeks is verholpen in v67 en kwalitatief bevestigd tijdens correcte starts in Telegram Desktop.
- De p95 van één seconde, offline ontgrendeling van privépost, conceptherstel en tweerichtingsschakeling tussen meerdere accounts zijn niet `VERIFIED`; v67 is daarom niet bevorderd.
- VR-016 is het gezaghebbende bewijsdocument voor deze acceptatiegrens.

## REQ-0037 P0-A broncodecontour — 2026-07-24

- **Status:** `PARTIAL`; uitsluitend broncodebewijs.
- Documentoverschrijdend starteigenaarschap gebruikt nu `navigator.locks` en een verlopende inhoudsloze `IndexedDB`-huurterugval. Een gewone gevalideerde start blijft vrij van overlappende schermen; herladen bij een nieuwe uitgave wacht op mutatiestilte en gebruikt uitsluitend `p0-release-reload` in `sessionStorage`.
- Serveruitgifte en -inwisseling delen nu één door `ScriptLock` ondersteund canoniek claimregister met HMAC-eigenaars- en routebereiken, een deterministische levensduur van 60 seconden voor eenmalige nummers, grafsteenmarkeringen van 11 minuten, een maximum van 100 records en geen geheimen of identificatiegegevens.
- Bevestigde historische grondoorzaak: uitgifte en inwisseling waren verdeeld over afzonderlijke statuspaden.
- Broncodebewijs: gerichte tests `37/37`; volledige Apps Script-reeks `668/668` in `24.229s`; basislijn `1d5fb8352ea62f7b25d6980312f277060ce4d0ae`.
- Productie- en testomgeving zijn niet gewijzigd; er heeft geen postvakmutatie plaatsgevonden. Oorspronkelijke p95, acceptatie over tien starts, offline privé-ontgrendeling gebonden aan het apparaat, POST-Redirect-GET, incrementele Gmail History, Service Worker/Background Sync, testomgeving en productie blijven ongeverifieerd of geblokkeerd door het gedeelde URL Fetch-quotum en `T-03`.
- Dossiers: bestaande `GT-040-GT-047`, `GT-051`, `GT-053`, `GT-054`; nieuwe `GT-067`, `B1-47`, `RCA-023`, `VR-042`.

## REQ-0037 P0-B History-contour — 2026-07-24

- **Status:** `PARTIAL`; uitsluitend broncodebewijs.
- De onvoorwaardelijke achtergrondbevraging van de volledige lijst is vervangen door een verbindingsgebonden Gmail History-verschilmeting. Een cyclus zonder wijzigingen voert geen herhaalde lijst- of berichtenreeks-RPC uit.
- De History-aanwijzer wordt opgeslagen als een ondoorzichtige decimale tekenreeks binnen de bestaande `IndexedDB`-naamruimte van Telegram-eigenaar + Gmail-verbinding; geheimen, OAuth-toegangsbewijzen en Telegram-handtekeningen worden daar niet opgeslagen.
- Een ontbrekende of verouderde aanwijzer, een 404-status of een begrensde pagina-overschrijding valt foutveilig terug op volledige afstemming. Een complexe zoekopdracht of gedeelde weergave gebruikt na een echte wijziging eveneens één begrensde volledige lijst.
- Broncodebewijs: gerichte tests `30/30`; volledige Apps Script-reeks `673/673` in `25.763s`; basislijn `28b438e68e1b327308761c246e074558b7ccd53d`.
- Uitvoeringsomgeving, testomgeving en productie bleven ongewijzigd; er vonden geen Gmail-/Telegram-mutaties of OAuth-handelingen plaats. Actieve aanvraagmetingen, oorspronkelijke acceptatie met meerdere accounts en lidmaatschap van zoekopdrachten op entiteitsniveau blijven `UNVERIFIED`; de uitgavedrempel blijft `BLOCKED` door het gedeelde URL Fetch-quotum en `T-03`.
- Dossiers: `GT-068`, `B1-48`, `RCA-024`, `VR-043`.

## REQ-0037 P0-C entiteitscontour — 2026-07-24

- **Status:** `PARTIAL`; uitsluitend broncodebewijs.
- Een eenvoudig Postvak IN voor één account past het History-verschil nu toe via begrensde `threadSummaries` met enkel metagegevens: nieuwe, herlabelde of ontbrekende rijen wijzigen zonder een volledige lijst-RPC of vervanging van de opgeslagen berichtinhoud.
- Het type History-gebeurtenis maakt onderscheid tussen een berichtwijziging en een wijziging van uitsluitend labels; de geselecteerde berichtinhoud wordt alleen bij een berichtgebeurtenis opnieuw gelezen.
- Veiligheidsgrens: ten hoogste 20 exacte ID's, accounttoegang uitsluitend voor de lezer, een expliciete verzameling ontbrekende items, stabiele tijdstempelvolgorde, een paginacapaciteitsgrens en isolatie van vreemde accounts.
- Gericht bewijs `35/35`; volledige Apps Script-reeks `678/678` in `25.414s`; basislijn `7bd8270b2e14525dc8e99bd95387a1ef977dde1a`.
- Gedeelde weergaven, zoekopdrachten, filters, aangepaste labels en te grote of onvolledige paden behouden de terugval op de volledige lijst. Actieve Gmail, oorspronkelijke Telegram, testomgeving en productie zijn niet geverifieerd; de uitgaveblokkades zijn ongewijzigd.
- Dossiers: `GT-069`, `B1-49`, `RCA-025`, `VR-044`.

## REQ-0037 P0-D cachevergrendelingscontour — 2026-07-24

- **Status:** `PARTIAL`; uitsluitend broncodebewijs.
- Blijvende postrecords hebben nu een expliciete vergrendelde/ontgrendelde levenscyclus; lees- en schrijfbewerkingen op laag niveau in `IndexedDB` worden geweigerd totdat een geverifieerde sessieopstart heeft plaatsgevonden.
- Het exacte eigenaarsbereik en de verzameling gekoppelde accounts worden gecontroleerd op elk van de vijf opstartpaden; accountherstel en bevestigd afmelden wissen het privégeheugen en het DOM zonder bewaarde records te verwijderen.
- Gericht bewijs `48/48`; volledige Apps Script-reeks `685/685` in `26.020s`; basislijn `8c01143411e20f96b7ec4fc885dd1898ac2e4bbb`.
- `IndexedDB`-records zijn in rust nog niet versleuteld en apparaatgebonden offline ontgrendeling is nog niet geïmplementeerd; oorspronkelijke Telegram, testomgeving en productie zijn niet geverifieerd en de uitgaveblokkades zijn ongewijzigd.
- Dossiers: `GT-070`, `B1-50`, `RCA-026`, `VR-045`.

## REQ-0037 P0-E contour voor versleutelde cache — 2026-07-24

- **Status:** `PARTIAL`; uitsluitend broncodebewijs.
- Blijvend cacheschema 3 versleutelt privéwaarden met AES-256-GCM; AAD-metagegevens voorkomen het onderling verwisselen van cijferteksten tussen records.
- De inhoudssleutel wordt uitsluitend opgeslagen in Telegram `SecureStorage`; de browseropslag ontvangt geen sleutel, OAuth-toegangsbewijs, vernieuwingsbewijs of `initData`.
- De opwaardering wist de onverenigbare onversleutelde cache van schema 2. Gericht bewijs `55/55`; volledige Apps Script-reeks `692/692` in `23.540s`; basislijn `6f8a357e1a650639c3a16f9d6c7601d89817e3fe`.
- Oorspronkelijke sleutelpersistentie op het doelapparaat, versleutelde offline opstart, testomgeving en productie zijn niet geverifieerd; de uitgaveblokkades zijn ongewijzigd.
- Dossiers: `GT-071`, `B1-51`, `RCA-027`, `VR-046`.

## P0-F versleutelde offline opstart

- **Status:** `PARTIAL`; uitsluitend broncodebewijs.
- Een geverifieerde onlinesessie slaat een versleutelde opstartmomentopname van 35 dagen op zonder sessie- of OAuth-geheimen; de eigenaarssleutel in Telegram `SecureStorage` en de AES-GCM AAD koppelen deze aan de exacte eigenaarsnaamruimte.
- Enkel een tijdelijke netwerkstoring mag de alleen-lezen bewaarde cache blootstellen; RPC en mutaties blijven geblokkeerd tot een geverifieerd onlineherstel.
- Gericht bewijs `33/33`; volledige Apps Script-reeks `701/701` in `25.944s`; basislijn `2bd7eb52d2f3297929c24c12d8ccbb4611699b84`.
- Nieuwe offline documentnavigatie, oorspronkelijke acceptatie op het doelapparaat, testomgeving en productie zijn niet geverifieerd; de uitgaveblokkades door het gedeelde URL Fetch-quotum en `T-03` zijn ongewijzigd.
- Dossiers: `GT-072`, `B1-52`, `RCA-028`, `VR-047`.

## P0-G conflictvrije bijwerking van Gmail-concepten

- **Status:** `PARTIAL`; uitsluitend broncodebewijs.
- Het canonieke Gmail-concept-DTO bevat nu een ondoorzichtige `serverVersion`; het versleutelde herstel en de opslaglading behouden de exact verwachte versie voor het accountgebonden concept.
- Het bijwerken van een bestaand concept sluit foutveilig zonder een versie van 43 tekens, controleert de canonieke serverstaat tweemaal vóór `PUT` en geeft bij een afwijking een alleen-lezen conflict terug. De gebruikersinterface stopt met opnieuw proberen en vereist een expliciete keuze tussen de lokale versie en die van Gmail.
- Gericht bewijs `258/258`; volledige Apps Script-reeks `707/707` in `23.349s`; basislijn `9b00a335c0016c439a463233b67a16e1499b7222`.
- De Gmail API documenteert geen atomaire revisie- of ETag-voorwaarde, waardoor een smalle TOCTOU-raceconditie tussen de tweede lezing en de bijwerking blijft bestaan. Geauthenticeerde sessies met meerdere vensters, testomgeving en productie zijn niet geverifieerd; de uitgaveblokkades zijn ongewijzigd.
- Dossiers: `GT-073`, `B1-53`, `RCA-029`, `VR-048`.

## V3 C-03 begrensde schaalbare mapupload

- **Status:** `PARTIAL`; uitsluitend broncodebewijs.
- Mapselec­tie doorloopt nu één begrensde planner van `1000` items met recursieve relatieve paden, een gezamenlijke aantal- en bytegrens en afwijzing van exacte duplicaten of onveilige paden voordat lokale leesbewerkingen starten.
- Een stapsgewijze reekskaart toont het totaal en de status, begrensde rijen, een Drive-terugvaloptie, opnieuw proberen of annuleren per bestand en alles annuleren; geaccepteerde items hergebruiken de bestaande overdrachtsbeheerder.
- Gericht bewijs `9/9`; Mail App-contract `93/93`; volledige Apps Script-reeks `716/716` in `25.980s`; basislijn `a33242df9689f6d483825940632df3030663d1a6`.
- Oorspronkelijke kiezer/terugvaloptie, visuele mobiele en bureaubladweergave, testomgeving en productie zijn niet geverifieerd; de uitgaveblokkades door het gedeelde URL Fetch-quotum en `T-03` zijn ongewijzigd.
- Dossiers: `GT-074`, `B1-54`, `RCA-030`, `VR-049`.

## V3 C-04 rijke conceptbewerking en ontvangersindeling

- **Status:** `PARTIAL`; uitsluitend broncodebewijs.
- De ontvangersinterface splitst en valideert `To/CC/BCC` nu in begrensde toegankelijke adreslabels en synchroniseert deze terug naar de bestaande tekenreeksvelden van het concept zonder een parallel opstelmodel.
- Plakken met opmaak gebruikt de bestaande opschoner; de opmaakwerkbalk heeft expliciete stapsgewijze onthulling; de tabelverwerker genereert nu opnieuw ARIA-coördinaten, ondersteunt toetsenbordnavigatie en verwijdert een volledige tabel.
- Gericht bewijs `5/5`; betrokken opstelmatrix `116/116`; `MailClient` `153/153`; volledige Apps Script-reeks `721/721` in `25.457s`; basislijn `f790897e8dec4a83e8ab8c7114618109b99b436a`.
- Het browserautomatiseringscontract was niet beschikbaar; visuele/oorspronkelijke weergave, echt Gmail-concept, testomgeving en productie zijn niet geverifieerd. De uitgaveblokkades door het gedeelde URL Fetch-quotum en `T-03` zijn ongewijzigd.
- Dossiers: `GT-075`, `B1-55`, `RCA-031`, `VR-050`.

## V3 afstemming van taakcodedekking

- **Status:** `VERIFIED` voor navigatie; de algehele V3-status blijft `PARTIAL`.
- De basislijn voor exacte ID's was `26/31`: expliciete aliassen ontbraken voor `A-04`, `A-05`, `D-02`, `E-01` en `E-02`, hoewel hun broncode- en testcontouren al bestonden.
- `B1-56` verwijst nu alle `31/31` taak-ID's door naar bestaand `B1/GT/VR`-bewijs en creëert geen parallelle implementatie.
- Open oorspronkelijke en uitvoeringsgrenzen zijn ongewijzigd: apparaatgebonden offline/nieuwe schil, versieovergang, acceptatie van de Box-aanbieder, de schermformatenmatrix en paneelacceptatie blijven `PARTIAL`, `UNVERIFIED` of `BLOCKED`.
- Productie blijft v65, de testomgeving is `0` en de onveranderlijke v70 is historisch; het gedeelde URL Fetch-quotum en `T-03` verbieden voortzetting van de uitgave.
- Dossiers: `GT-076`, `B1-56`, `RCA-032`, `VR-051`.
