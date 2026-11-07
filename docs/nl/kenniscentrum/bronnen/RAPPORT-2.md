# Brondossier RAPPORT-2

Oekraïense tegenhanger: [../../../uk/центр-знань/джерела/ЗВІТ-2.md](../../../uk/центр-знань/джерела/ЗВІТ-2.md).

[Startpagina](../OVERZICHT.md) | [Stappenplan](../HOOFDSTAPPENPLAN.md) | [Traceerbaarheid](../TRACEERBAARHEID.md) | [Oekraïens](../../../uk/центр-знань/ОГЛЯД.md)

> Concept-kenniscentrum. Elke bewering is uitsluitend afgeleid uit geschoonde rapportextracties, is niet onafhankelijk geverifieerd en vormt geen bewijs van actieve productie-inzet of de huidige staat.

Volledige tabelvertaling uit `catalog.json`. De brontekst is reeds geschoond; lokale bestandspaden, e-mailadressen, geheimen en account-identificatoren worden niet gereproduceerd.

## Artefactmetadata

| Veld | Waarde |
|---|---|
| Rapport | R2 |
| Extractie-artefact | deep-report2-extraction.md |
| Extractiegrootte in bytes | 42937 |
| Extractie-SHA-256 | 508b251d5947a010632eaf0251ca25f828a9dae97e1156e93f6dc98176f0cdde |
| Gerapporteerd origineel | deep-research-report2.md |
| Gerapporteerde originele bytes | 58865 |
| Gerapporteerde originele SHA-256 | 879a2e9de104dadc5d4dce23092ce55514d7420af804b355b106a185d2c24777 |
| Atomaire onderdelen | 79 |
| Onafhankelijke verificatie | niet uitgevoerd |

## Bevoegdheidsclassificatie

- Expliciet door de eigenaar verleend citaat: geen aangetroffen.
- Toestemmingskandidaat: R2-032.
- Elke aanbeveling en vaste regel vereist afstemming met de canonieke tak.

## Brononderdelen

| Bron-ID | Canonieke ID | Categorie | Levenscyclus | Implementatie | Prioriteit | Bronbereik | Ontdubbelingsgroep | Genormaliseerde tekst |
|---|---|---|---|---|---|---|---|---|
| R2-001 | KH-DEC-006 | besluit | voorgesteld | gepland | strategische aanbeveling | Context en strategische conclusie, 5 | afzonderlijk | Bouw het product op open standaarden en een bewezen openbron-e-mailkern; onderscheid het via een eigen gebruikersinterface, kunstmatige intelligentie en integratie-koppelvlakken. |
| R2-002 | KH-DEP-002 | afhankelijkheid | voorgesteld | gepland | basisminimum | Context en strategische conclusie, 5 | afzonderlijk | Het protocolcontract moet SMTP, IMAP, POP3, modern JMAP, CalDAV, CardDAV, WebDAV, OAuth 2.0, webhooks en pushmeldingen omvatten. |
| R2-003 | KH-PROD-022 | product | voorgesteld | gepland | — | Context en strategische conclusie, 7 | afzonderlijk | Modulair pad: Postfix plus Dovecot met afzonderlijke componenten voor antispam, DKIM/DMARC/ARC, webmail en DAV. |
| R2-004 | KH-PROD-023 | product | voorgesteld | gepland | — | Context en strategische conclusie, 7 | afzonderlijk | Geïntegreerd containerpad: Mailcow of Docker Mailserver voor een snellere start met minder koppelcode. |
| R2-005 | KH-PROD-024 | product | voorgesteld | gepland | — | Context en strategische conclusie, 7 | afzonderlijk | Alles-in-één-pad: Stalwart, en in geselecteerde scenario's Maddy of Apache James; Stalwart is de leidende moderne kandidaat. |
| R2-006 | KH-DEC-007 | besluit | voorgesteld | gepland | — | Context en strategische conclusie, 9 | afzonderlijk | Kies Stalwart met een eigen web- en mobiele gebruikerservaring voor moderne zakelijke en consumententoepassingen, of Mailcow met een eigen voorkant en toepassingslaag voor een snelle minimale werkende versie; behoud een eigen orkestratielaag. |
| R2-007 | KH-EVD-013 | bewijs | ongeverifieerd | onbekend | — | Open standaarden en interoperabiliteit, 13 | afzonderlijk | Het rapport koppelt SMTP, IMAP, POP3, JMAP en JMAP over WebSocket aan RFC 5321, 3501, 1939, 8620, 8621 en 8887. |
| R2-008 | KH-DEC-008 | besluit | voorgesteld | gepland | — | Open standaarden en interoperabiliteit, 15 | afzonderlijk | Vervang niet elk protocol door één enkele interface; gebruik spreiding en samenvoeging terwijl bestaande en moderne interfaces naast elkaar worden ondersteund. |
| R2-009 | KH-DEP-003 | afhankelijkheid | huidig | onbekend | — | Open standaarden en interoperabiliteit, 15 | afzonderlijk | Houd rekening met uiteenlopende aanbiederspaden: DAV bij Google en Apple, Microsoft Graph voor Microsoft 365 en het gecombineerde JMAP/IMAP/POP/DAV-model van Fastmail. |
| R2-010 | KH-DEP-004 | afhankelijkheid | voorgesteld | gepland | kritiek | Open standaarden en interoperabiliteit, 17 | afzonderlijk | Ondersteun wachtwoord-over-TLS voor zelfgehoste of oudere systemen en OAuth 2.0/XOAUTH2 voor moderne externe accounts. |
| R2-011 | KH-ISS-009 | probleem | huidig | onbekend | — | Open standaarden en interoperabiliteit, 19 | afzonderlijk | Basisauthenticatie mag niet worden beschouwd als een betrouwbare route voor Google of Microsoft; moderne authenticatie moet worden doorgevoerd in introductie, accountkoppeling en ondersteuning. |
| R2-012 | KH-PROD-025 | product | voorgesteld | gepland | — | Open standaarden en interoperabiliteit, 21 | afzonderlijk | Voeg Thunderbird-autoconfiguratie-XML toe en volg het IETF-werk rond automatische configuratie om drempels bij de ingebruikname te verlagen. |
| R2-013 | KH-INS-011 | instructie | voorgesteld | gepland | — | Serverplatformen en kant-en-klare bundels, 25 | afzonderlijk | Schrijf geen eigen mailtransport-, mailafleverings- of groepswerksysteem vanaf nul; stel het product samen uit bewezen servercomponenten. |
| R2-014 | KH-PROD-026 | product | huidig | onbekend | — | Serverplatformen en kant-en-klare bundels, 29 | afzonderlijk | Postfix plus Dovecot biedt een volwassen SMTP/IMAP/POP3-opzet; kanttekening: Dovecot CE wordt beschreven als een editie voor één server. |
| R2-015 | KH-PROD-027 | product | huidig | onbekend | — | Serverplatformen en kant-en-klare bundels, 30 | afzonderlijk | Mailcow integreert Postfix, Dovecot, Rspamd, Redis, MariaDB, SOGo, Nginx en ACME; kanttekening: het is een zwaar pakket met meerdere containers. |
| R2-016 | KH-PROD-028 | product | huidig | onbekend | — | Serverplatformen en kant-en-klare bundels, 31 | afzonderlijk | Stalwart combineert JMAP, IMAP, POP3, SMTP, CalDAV, CardDAV en WebDAV; kanttekening: het heeft een groot beheeroppervlak. |
| R2-017 | KH-PROD-029 | product | huidig | onbekend | — | Serverplatformen en kant-en-klare bundels, 32 | afzonderlijk | Docker Mailserver is een eenvoudigere, op containers gerichte mailserver zonder SQL, maar heeft minder geïntegreerde groepswerkfuncties. |
| R2-018 | KH-PROD-030 | product | huidig | onbekend | — | Serverplatformen en kant-en-klare bundels, 33 | afzonderlijk | Maddy is een lichtgewicht alles-in-één SMTP- en IMAP-server met minder koppelcode, maar een kleiner integratie-ecosysteem. |
| R2-019 | KH-PROD-031 | product | huidig | onbekend | — | Serverplatformen en kant-en-klare bundels, 34 | afzonderlijk | Cyrus IMAP en Apache James passen bij zakelijke, JMAP- en schaalscenario's, maar vereisen een strengere operationele discipline. |
| R2-020 | KH-DEC-009 | besluit | voorgesteld | gepland | minimale werkende versie | Basisaanbeveling voor selectie, 38 | afzonderlijk | Kies Mailcow voor de kortste doorlooptijd naar een werkende minimale versie. |
| R2-021 | KH-DEC-010 | besluit | voorgesteld | gepland | modern-eerst | Basisaanbeveling voor selectie, 40 | afzonderlijk | Kies Stalwart voor een modern opgezet product vanwege ingebouwde ondersteuning voor JMAP en DAV en op koppelvlakken gerichte configuratie en aansturing. |
| R2-022 | KH-DEC-011 | besluit | voorgesteld | gepland | zakelijke langetermijnroute | Basisaanbeveling voor selectie, 42 | afzonderlijk | Overweeg voor een zakelijke langetermijnroute met maximale controle Postfix plus Dovecot wanneer een ervaren beheerteam beschikbaar is. |
| R2-023 | KH-PLAN-006 | plan | voorgesteld | gepland | — | Praktisch recept voor Mailcow, 46 | afzonderlijk | Inzet van Mailcow: klonen, `generate_config.sh` uitvoeren, `mailcow.conf` bewerken en vervolgens `docker compose pull/up` draaien; de productiehost moet conflicten met pakketgrootte, poorten en hostdiensten vermijden. |
| R2-024 | KH-DEP-005 | afhankelijkheid | voorgesteld | gepland | — | Praktisch recept voor Mailcow, 48 | afzonderlijk | GitOps voor Mailcow moet `mailcow.conf`, `docker-compose.yml`, afgeschermde geheimen en opslagvolumes, inkomend verkeer, logboeken, eenmalige aanmelding, waarneembaarheid, reservekopieën en de integratiedienst omvatten. |
| R2-025 | KH-PROD-032 | product | huidig | onbekend | — | Praktisch recept voor Stalwart, 52 | afzonderlijk | Stalwart gebruikt een minimale `config.json`, opslagconfiguratie, webinterface en opdrachtregel, initiële opstart en herstelmodi; het model ondersteunt stapsgewijze, declaratieve en meer-organisatie-aansturing. |
| R2-026 | KH-PLAN-007 | plan | voorgesteld | gepland | — | Praktisch recept voor Stalwart, 54 | afzonderlijk | Voor Stalwart: persistente opslag toewijzen, een opslagmotor kiezen, de initiële opstart voltooien en domeinen, transportbeveiliging, snelheidslimieten, spambeleid en het beheer-koppelvlak configureren. |
| R2-027 | KH-PROD-033 | product | huidig | onbekend | — | Praktisch recept voor Google Apps Script en Gmail, 58 | afzonderlijk | Apps Script, GmailApp en de Gmail API bieden een laagdrempelige route voor automatisering en prototypebouw binnen Google Workspace. |
| R2-028 | KH-DEC-012 | besluit | voorgesteld | gepland | — | Praktisch recept voor Google Apps Script en Gmail, 60 | apps-script-grens | Gebruik `GmailApp` voor persoonlijk of zakelijk Gmail, de Gmail REST API voor een externe dienst en een Workspace-uitbreiding voor ingebedde interactie; houd Apps Script als zakelijke adapter en niet als de kern. |
| R2-029 | KH-ISS-010 | probleem | huidig | onbekend | — | Praktisch recept voor koppeling van Telegram en Gmail, 64 | afzonderlijk | Er bestaat geen enkel officieel koppelvlak tussen Telegram en Gmail; de brug moet onafhankelijke interfaces van Telegram en Google combineren. |
| R2-030 | KH-DEC-013 | besluit | voorgesteld | gepland | — | Praktisch recept voor koppeling van Telegram en Gmail, 64 | afzonderlijk | Bouw de standaardbrug met de Telegram Bot API, een minitoepassing, een eigen serverlaag en de Gmail API; zet TDLib of een gebruikersaccountstroom uitsluitend weloverwogen in. |
| R2-031 | KH-PLAN-008 | plan | voorgesteld | gepland | — | Praktisch recept voor koppeling van Telegram en Gmail, 66 | afzonderlijk | Telegram-stroom: BotFather, hoofd-minitoepassing, toegestane webadressen, gebruikersinterface, serverauthenticatie en koppeling tussen de Telegram-identiteit en een intern accountrecord. |
| R2-032 | KH-PERM-002 | toestemmingskandidaat | voorgesteld | gepland | — | Praktisch recept voor koppeling van Telegram en Gmail, 66 | afzonderlijk | Een toekomstige Telegram-omgeving mag uitsluitend expliciet geselecteerde acties toestaan: prioriteitsweergave, samenvatting, snel antwoord, taakbevestiging, sluimeren en triage; dit is een kandidaat voor de productomvang, geen toestemming van de eigenaar. |
| R2-033 | KH-INS-012 | instructie | voorgesteld | gepland | kritiek | Beveiliging en naleving, 70 | afzonderlijk | Scheid transportbeveiliging, domeinauthenticiteit, inhoudsbescherming en verdediging tegen misbruik en phishing; pas TLS, MTA-STS, TLS-RPT en, in combinatie met DNSSEC, DANE toe. |
| R2-034 | KH-DEP-006 | afhankelijkheid | voorgesteld | gepland | basisminimum | Beveiliging en naleving, 72 | afzonderlijk | Basisauthenticatie voor domeinen bestaat uit SPF, DKIM en DMARC, met ARC voor doorsturen of verzendlijsten; gebruik bewezen implementaties zoals OpenDKIM, OpenDMARC, OpenARC en Rspamd. |
| R2-035 | KH-PROD-034 | product | huidig | onbekend | — | Beveiliging en naleving, 74 | afzonderlijk | Postfix `postscreen` is de aanbevolen eerste buitenschil vóór inhoudsfiltering. |
| R2-036 | KH-DEC-014 | besluit | voorgesteld | gepland | — | Beveiliging en naleving, 76 | afzonderlijk | Gebruik Rspamd als primair filter voor nieuwe systemen; behoud SpamAssassin voor compatibiliteit of oudere omgevingen. |
| R2-037 | KH-DEP-007 | afhankelijkheid | huidig | gepland | — | Beveiliging en naleving, 78 | afzonderlijk | OpenPGP en S/MIME vereisen afzonderlijke operationele modellen; beschikbare componenten zijn onder meer OpenPGP.js, Mailvelope, OpenSSL CMS, Bouncy Castle en PKI.js. |
| R2-038 | KH-DEC-015 | besluit | voorgesteld | gepland | verplicht/aanvullend | Beveiliging en naleving, 80 | vervangbare-e2e | Stel transport- en domeinbeveiliging verplicht; voeg OpenPGP of S/MIME per doelgroep toe; modelleer eind-tot-eind-versleuteling als een afzonderlijke functielaag met sleutelbeheer in de gebruikersinterface. |
| R2-039 | KH-PRV-002 | gegevensbescherming | voorgesteld | gepland | basisfundament | Beveiliging en naleving, 82 | afzonderlijk | Maatregelen voor de AVG en ePrivacy moeten versleuteling, toegangscontrole, auditlogboeken, dataminimalisatie, verwerkersovereenkomsten, bewaartermijnen, export en verwijdering, melding van datalekken en opslaglocatie omvatten. |
| R2-040 | KH-EVD-014 | bewijs | ongeverifieerd | onbekend | — | Beveiliging en naleving, 84 | afzonderlijk | Het rapport stelt dat publicaties van CNIL en Garante uit 2026 bezwaren rond toestemming opwerpen voor volg-pixels in e-mail. |
| R2-041 | KH-PRV-003 | gegevensbescherming | voorgesteld | gepland | zeer belangrijk | Beveiliging en naleving, 84 | afzonderlijk | Schakel het volgen van geopende berichten niet standaard in voor toepassingen die gevoelig zijn binnen de Europese Unie; voeg juridische poorten, een voorkeurencentrum, gerichte toestemming en een scheiding tussen afleveringsgegevens en marketingtelemetrie toe. |
| R2-042 | KH-DEC-016 | besluit | voorgesteld | gepland | — | Functies, integraties en clientplatform, 88 | afzonderlijk | DAV-strategie: geïntegreerde DAV/JMAP in Stalwart of Cyrus, of afzonderlijk Radicale, Baikal of SabreDAV; in Mailcow vervult SOGo deze rol. |
| R2-043 | KH-PROD-035 | product | huidig | onbekend | — | Functies, integraties en clientplatform, 90 | afzonderlijk | Webmailkandidaten: Roundcube voor klassieke IMAP met uitbreidingen, SnappyMail voor een lichte gebruikersinterface, Nextcloud Mail voor pakketintegratie en Bulwark voor JMAP en Stalwart. |
| R2-044 | KH-DEC-017 | besluit | voorgesteld | gepland | — | Functies, integraties en clientplatform, 92 | afzonderlijk | Bouw één integratiefacade boven op de Gmail API, Microsoft Graph, Google People/Calendar en de Telegram-koppelvlakken in plaats van aanbiedersspecifieke logica in de gebruikersinterface te plaatsen. |
| R2-045 | KH-HIS-002 | historisch artefact | vervangen | onbekend | — | Functies, integraties en clientplatform, 92 | afzonderlijk | Classificeer EmailEngine niet als vrije openbronsoftware: het rapport beschrijft het als voormalige openbronsoftware en thans als een commercieel, met broncode inzichtelijk e-mailplatform. |
| R2-046 | KH-DEP-008 | afhankelijkheid | voorgesteld | gepland | — | Functies, integraties en clientplatform, 94 | afzonderlijk | Gebruik voor e-mailverwerking in Node ImapFlow, Nodemailer en PostalMime in plaats van zelfgeschreven IMAP-, SMTP- of MIME-implementaties. |
| R2-047 | KH-HIS-003 | historisch artefact | vervangen | onbekend | — | Functies, integraties en clientplatform, 94 | afzonderlijk | Mailparser is aangemerkt als in onderhoudsmodus of verouderd; voor nieuwe projecten wordt PostalMime aanbevolen. |
| R2-048 | KH-PROD-018 | product | voorgesteld | gepland | — | Functies, integraties en clientplatform, 96 | slimme-triage | Slim sorteren kent drie niveaus: deterministische Sieve- of filterregels, statistische of Rspamd-scores, en samenvattingen, actie-extractie, risicodetectie en antwoordherkenning met kunstmatige intelligentie. |
| R2-049 | KH-DEC-018 | les | huidig | gepland | — | Functies, integraties en clientplatform, 98 | verzenden-ongedaan-maken | Verzending ongedaan maken wordt geïmplementeerd als een wachtrij vóór verzending; SMTP kan een bericht na aflevering via het internet niet betrouwbaar intrekken. |
| R2-050 | KH-DEC-019 | besluit | voorgesteld | gepland | — | Functies, integraties en clientplatform, 100 | afzonderlijk | Bouw de integratiebus met REST voor opdrachten en webhooks, server-sent events of publicatie-abonnement voor gebeurtenissen. |
| R2-051 | KH-PROD-036 | product | voorgesteld | gepland | — | Functies, integraties en clientplatform, 102 | afzonderlijk | Gebruikerstoepassingen: web/PWA met achtergrondwerkers en VAPID, React Native of Flutter met APNs/FCM, en Tauri of Electron voor bureaubladsystemen. |
| R2-052 | KH-LES-005 | les | voorgesteld | gepland | — | Gegevens, zoeken en schaalbaarheid, 106 | afzonderlijk | Plaats metadata, binaire objecten, zoekindexen en wachtrijen niet in één enkele databank; het gegevensvlak moet gelaagd zijn opgebouwd. |
| R2-053 | KH-PLAN-009 | plan | voorgesteld | gepland | minimale werkende versie | Gegevens, zoeken en schaalbaarheid, 108 | afzonderlijk | Enkele server of minimale werkende versie: Stalwart met RocksDB of standaard Mailcow, bestands- of S3-objectopslag, vluchtige status in Redis en basiszoekfunctionaliteit. |
| R2-054 | KH-PLAN-010 | plan | voorgesteld | gepland | middelgrote schaal | Gegevens, zoeken en schaalbaarheid, 110 | afzonderlijk | Middelgrote schaal of meerdere organisaties: metadata in PostgreSQL, objectopslag in S3/MinIO, vergrendelingen, wachtrijen, snelheidslimieten, sessies en tussenopslag in Redis, plus een aparte zoekmotor wanneer nodig. |
| R2-055 | KH-ISS-011 | probleem | huidig | onbekend | — | Gegevens, zoeken en schaalbaarheid, 112 | afzonderlijk | Volledige tekstdoorzoeking in Postfix en Dovecot vereist vaak een afzonderlijk ontwerp met Solr of Flatcurve/Xapian; Stalwart modelleert zoeken als een eigen ingebouwde opslaglaag. |
| R2-056 | KH-DEP-009 | afhankelijkheid | voorgesteld | gepland | — | Gegevens, zoeken en schaalbaarheid, 114 | afzonderlijk | Gebruik Redis voor tussenopslag, coördinatie en kortlopende taken: vertraagd verzenden, sluimeren, classificatie, tekstherkenning, herhaalpogingen, AI-samenvattingen en pushverspreiding. |
| R2-057 | KH-ISS-012 | probleem | huidig | onbekend | — | Gegevens, zoeken en schaalbaarheid, 116 | afzonderlijk | Dovecot CE met `dsync` vormt geen kant-en-klaar clusterbesturingsvlak; een stappenplan voor hoge beschikbaarheid of meerdere regio's kan in het voordeel werken van Stalwart of een andere geïntegreerde opzet. |
| R2-058 | KH-EVD-002 | bewijs | ongeverifieerd | onbekend | — | Op ADHD gerichte gebruikerservaring en productlogica, 120 | adhd-executief-bewijs | Het rapport brengt ADHD in verband met executieve dysfunctie, problemen met tijdsbeleving, impulsiviteit en bijkomende depressie; het product moet de kloof tussen voornemen en handeling overbruggen. |
| R2-059 | KH-EVD-006 | bewijs | ongeverifieerd | onbekend | — | Op ADHD gerichte gebruikerservaring en productlogica, 122 | comorbiditeitsbewijs | Het rapport stelt dat ADHD in combinatie met depressie de belasting van het werkgeheugen en de executieve functies verhoogt, terwijl een overvol postvak leidt tot overprikkeling, vermijding en een spiraal van schuldgevoel. |
| R2-060 | KH-DEC-020 | besluit | voorgesteld | gepland | — | Op ADHD gerichte gebruikerservaring en productlogica, 124 | afzonderlijk | Een ADHD-vriendelijke gebruikersinterface betekent samenhang, lagere cognitieve belasting, duidelijke stappen, voorspelbare navigatie en beperking van afleiding, geen decoratieve felheid. |
| R2-061 | KH-LES-006 | les | ongeverifieerd | onbekend | — | Praktische patronen van neurodivergente gebruikers, 128 | afzonderlijk | Gerapporteerde gebruikerspatronen omvatten tijdgebonden triage, het archiveren of verwijderen van verouderde post, vaste controlevensters, één snelle e-mail en koppeling met agenda of sluimerfunctie. |
| R2-062 | KH-DEC-001 | besluit | voorgesteld | gepland | — | Praktische patronen van neurodivergente gebruikers, 130 | instapdrempel | Productsucces moet worden afgemeten aan het verlagen van de startdrempel en het mogelijk maken van een kleine volgende stap, niet aan het aantal berichten in een lijst. |
| R2-063 | KH-PROD-005 | product | voorgesteld | gepland | — | Beslissingskaart, 136 | kleinste-actie | De startmodus toont de drie tot vijf eenvoudigste acties en snelle handelingen in plaats van het volledige postvak. |
| R2-064 | KH-PROD-002 | product | voorgesteld | gepland | — | Beslissingskaart, 137 | tijdkadering | De op tijdkadering gerichte gebruikersinterface toont een inspanningsschatting, het verlooprisico en een bijbehorende agenda-actie. |
| R2-065 | KH-PROD-010 | product | voorgesteld | gepland | — | Beslissingskaart, 138 | zachte-herinneringen | Niet-veroordelende herinneringen formuleren haalbare korte acties zonder schuldopwekkend taalgebruik. |
| R2-066 | KH-PROD-007 | product | voorgesteld | gepland | — | Beslissingskaart, 139 | focusoppervlak | De focusmodus gebruikt één kolom, verborgen zijpanelen, minimale tellers, een optie voor platte tekst en een weergave waarin de samenvatting vooropstaat. |
| R2-067 | KH-PROD-004 | product | voorgesteld | gepland | — | Beslissingskaart, 140 | microvoortgang | Microvoortgang biedt korte sessiedoelen, een voortgangsbalk en een reeks voor regelmatige triage in plaats van berichtvolume. |
| R2-068 | KH-PROD-014 | product | voorgesteld | gepland | — | Beslissingskaart, 141 | antwoordhulp | De AI-antwoordstarter maakt één of twee korte antwoordsjablonen voor ontvangstbevestiging, verduidelijking of een uitgesteld antwoord. |
| R2-069 | KH-PROD-003 | product | voorgesteld | gepland | — | Beslissingskaart, 142 | gebundelde-sessies | De bundelmodus groepeert post in geplande controlemomenten en houdt noodsignalen op een afzonderlijk kanaal. |
| R2-070 | KH-PROD-020 | product | voorgesteld | gepland | — | Hoe de AI-assistent moet werken, 146 | energie-ai | De AI-assistent kent drie modi: energiebewust samenvatten, ondersteuning bij vervolgstappen en routine-automatisering; het is geen afzonderlijke drukke schermvullende chatbot. |
| R2-071 | KH-PLAN-011 | plan | voorgesteld | gepland | — | Aanbevolen doelarchitectuur, 152 | afzonderlijk | Beoogde gelaagde architectuur: Stalwart- of Mailcow-kern, een eigen integratiefacade, verwerkers voor kunstmatige intelligentie en achtergrondtaken, en slimme web- en mobiele toepassingen. |
| R2-072 | KH-PLAN-012 | plan | voorgesteld | gepland | fase 1 | Praktische werkvolgorde, 156 | afzonderlijk | Fase 1: het protocolcontract vastleggen, de kern kiezen, een referentie-inzet starten met SPF, DKIM, DMARC, MTA-STS, TLS-RPT, reservekopieën, logboeken en bewaking, en daarna de toepassingslaag en clients toevoegen. |
| R2-073 | KH-LES-007 | les | voorgesteld | gepland | — | Praktische werkvolgorde, 156 | afzonderlijk | Het bouwen van de gebruikersinterface vóór een stabiele e-mailkern veroorzaakt integratie-instabiliteit; keer de werkvolgorde niet om. |
| R2-074 | KH-PLAN-013 | plan | voorgesteld | gepland | fase 2 | Praktische werkvolgorde, 158 | afzonderlijk | Fase 2: Gmail API, Microsoft Graph, Telegram Bot en minitoepassing, opslagadapters en een module voor toestemming en gegevensbescherming; Apps Script of een uitbreiding is optioneel. |
| R2-075 | KH-PLAN-014 | plan | voorgesteld | gepland | fase 3 | Praktische werkvolgorde, 160 | afzonderlijk | Fase 3: een op ADHD afgestemde slimme werkomgeving met wachtrijen voor snelle acties, verlooprisico, wachten op antwoord, later, gefilterde post en benodigde energie. |
| R2-076 | KH-PLAN-015 | plan | voorgesteld | gepland | snelle minimale werkende versie | Wat nu direct in productie kan, 166–167 | afzonderlijk | Snelle opzet voor minimale werkende versie: Mailcow-kern, Roundcube of eigen webschil, meegeleverde Rspamd, integratiedienst, Redis-taken, ADHD-schil en slimme triage. |
| R2-077 | KH-PLAN-016 | plan | voorgesteld | gepland | langetermijnproduct | Wat nu direct in productie kan, 169–170 | afzonderlijk | Moderne langetermijnopzet: Stalwart-kern, Bulwark als referentie- of tijdelijke client, eigen orkestratie, PostgreSQL voor schaalbaarheid, S3/MinIO, Redis en maatwerkclients. |
| R2-078 | KH-PLAN-017 | plan | voorgesteld | gepland | maximale voorspelbaarheid | Wat nu direct in productie kan, 172–173 | afzonderlijk | Opzet voor maximale voorspelbaarheid: Postfix, Dovecot, Rspamd, OpenDKIM, OpenDMARC, OpenARC, Roundcube en optionele DAV-server; dit vereist het meeste integratiewerk. |
| R2-079 | KH-INS-013 | instructie | voorgesteld | gepland | eindaanbeveling | Invoeringsplan, 175 | afzonderlijk | Bouw geen eigen e-mailserver; investeer in gebruikerservaring, interoperabiliteit, gegevensbescherming, slimme triage en beheerde ecosysteemintegraties. |

## Dekkingsregister

| Categorie | Aantal |
|---|---:|
| besluit | 15 |
| afhankelijkheid | 8 |
| product | 24 |
| bewijs | 4 |
| probleem | 4 |
| instructie | 3 |
| plan | 12 |
| toestemmingskandidaat | 1 |
| gegevensbescherming | 2 |
| historisch artefact | 2 |
| les | 4 |

## Conflictverwijzingen

- CF-002: De Telegram Bot API en aanbiedersspecifieke OAuth zijn niet scherp genoeg van elkaar gescheiden; het daadwerkelijke authenticatiemodel is ongeverifieerd.
- CF-005: Een reeks voor regelmatige triage is niet afgestemd met de risico's van openbare reeksen, sancties en overmatige spelmechanieken.
- CF-006: Het stappenplan voor een zelfstandige open-e-mailkern en het op Gmail gerichte hybride stappenplan hebben een verschillende productomvang; rapport 3 is het primaire fundament, maar trekt de bredere reikwijdte van rapport 2 niet expliciet in.

---

Bronverzoek: `REQ-0003`. Uit rapporten afgeleide basislijn; uitspraken over de actuele omgeving vereisen verificatie van de huidige staat.
