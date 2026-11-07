# Afhankelijkheden

Oekraïense tegenhanger: [../../uk/центр-знань/ЗАЛЕЖНОСТІ.md](../../uk/центр-знань/ЗАЛЕЖНОСТІ.md).

[Startpagina](OVERZICHT.md) | [Stappenplan](HOOFDSTAPPENPLAN.md) | [Traceerbaarheid](TRACEERBAARHEID.md) | [Oekraïens](../../uk/центр-знань/ОГЛЯД.md)

> Concept-kenniscentrum. Elke bewering is uitsluitend afgeleid uit geschoonde rapportextracties, is niet onafhankelijk geverifieerd en vormt geen bewijs van actieve productie-inzet of de huidige staat.

Elke uitspraak over een platform of bibliotheek vereist verificatie van de huidige mogelijkheden, versie, licentie en limieten.

## Afhankelijkhedenoverzicht

| Domein | Canonieke ID's | Toegangspoort |
|---|---|---|
| Toegankelijkheid | KH-DEP-001 | Verifieer huidige mogelijkheden, versie, licentie, limieten en integratiecontract. |
| E-mailstandaarden en aanbieders | KH-DEP-002, KH-DEP-003, KH-DEP-004, KH-DEP-006, KH-DEP-007 | Verifieer huidige mogelijkheden, versie, licentie, limieten en integratiecontract. |
| E-mailbibliotheken | KH-DEP-008, KH-DEP-009 | Verifieer huidige mogelijkheden, versie, licentie, limieten en integratiecontract. |
| Google- en Gmail-uitvoeringsomgeving | KH-DEP-010, KH-DEP-011, KH-DEP-016, KH-DEP-019, KH-DEP-017, KH-DEP-013, KH-DEP-014, KH-DEP-015, KH-DEP-018 | Verifieer huidige mogelijkheden, versie, licentie, limieten en integratiecontract. |
| MIME en eind-tot-eind-versleuteling | KH-DEP-020 | Verifieer huidige mogelijkheden, versie, licentie, limieten en integratiecontract. |
| Bronvermelding | KH-DEP-012 | Verifieer huidige mogelijkheden, versie, licentie, limieten en integratiecontract. |

## Canoniek afhankelijkhedenregister

| Canonieke ID | Genormaliseerde bewering | Bron-ID's | Levenscyclus | Implementatie | Conflicten | Toegangspoort |
|---|---|---|---|---|---|---|
| KH-DEP-001 | WCAG 2.2 vormt de basislijn; daarnaast zijn de W3C COGA-richtlijnen nodig voor cognitieve toegankelijkheid. | [R1-003](bronnen/RAPPORT-1.md#brononderdelen) | huidig | onbekend | geen | Verifieer huidige mogelijkheden, versie, licentie, limieten en integratiecontract. |
| KH-DEP-002 | Het protocolcontract moet SMTP, IMAP, POP3, modern JMAP, CalDAV, CardDAV, WebDAV, OAuth 2.0, webhooks en pushmeldingen omvatten. | [R2-002](bronnen/RAPPORT-2.md#brononderdelen) | voorgesteld | gepland | geen | Verifieer huidige mogelijkheden, versie, licentie, limieten en integratiecontract. |
| KH-DEP-003 | Houd rekening met uiteenlopende aanbiederspaden: DAV bij Google en Apple, Microsoft Graph voor Microsoft 365 en het gecombineerde JMAP/IMAP/POP/DAV-model van Fastmail. | [R2-009](bronnen/RAPPORT-2.md#brononderdelen) | huidig | onbekend | geen | Verifieer huidige mogelijkheden, versie, licentie, limieten en integratiecontract. |
| KH-DEP-004 | Ondersteun wachtwoord-over-TLS voor zelfgehoste of oudere systemen en OAuth 2.0/XOAUTH2 voor moderne externe accounts. | [R2-010](bronnen/RAPPORT-2.md#brononderdelen) | voorgesteld | gepland | geen | Verifieer huidige mogelijkheden, versie, licentie, limieten en integratiecontract. |
| KH-DEP-005 | GitOps voor Mailcow moet `mailcow.conf`, `docker-compose.yml`, afgeschermde geheimen en opslagvolumes, inkomend verkeer, logboeken, eenmalige aanmelding, waarneembaarheid, reservekopieën en de integratiedienst omvatten. | [R2-024](bronnen/RAPPORT-2.md#brononderdelen) | voorgesteld | gepland | geen | Verifieer huidige mogelijkheden, versie, licentie, limieten en integratiecontract. |
| KH-DEP-006 | Basisauthenticatie voor domeinen bestaat uit SPF, DKIM en DMARC, met ARC voor doorsturen of verzendlijsten; gebruik bewezen implementaties zoals OpenDKIM, OpenDMARC, OpenARC en Rspamd. | [R2-034](bronnen/RAPPORT-2.md#brononderdelen) | voorgesteld | gepland | geen | Verifieer huidige mogelijkheden, versie, licentie, limieten en integratiecontract. |
| KH-DEP-007 | OpenPGP en S/MIME vereisen afzonderlijke operationele modellen; beschikbare componenten zijn onder meer OpenPGP.js, Mailvelope, OpenSSL CMS, Bouncy Castle en PKI.js. | [R2-037](bronnen/RAPPORT-2.md#brononderdelen) | huidig | gepland | geen | Verifieer huidige mogelijkheden, versie, licentie, limieten en integratiecontract. |
| KH-DEP-008 | Gebruik voor e-mailverwerking in Node ImapFlow, Nodemailer en PostalMime in plaats van zelfgeschreven IMAP-, SMTP- of MIME-implementaties. | [R2-046](bronnen/RAPPORT-2.md#brononderdelen) | voorgesteld | gepland | geen | Verifieer huidige mogelijkheden, versie, licentie, limieten en integratiecontract. |
| KH-DEP-009 | Gebruik Redis voor tussenopslag, coördinatie en kortlopende taken: vertraagd verzenden, sluimeren, classificatie, tekstherkenning, herhaalpogingen, AI-samenvattingen en pushverspreiding. | [R2-056](bronnen/RAPPORT-2.md#brononderdelen) | voorgesteld | gepland | geen | Verifieer huidige mogelijkheden, versie, licentie, limieten en integratiecontract. |
| KH-DEP-010 | Zware en langdurige bewerkingen moeten buiten Apps Script worden uitgevoerd. | [R3-021](bronnen/RAPPORT-3.md#brononderdelen) | voorgesteld | gepland | geen | Verifieer huidige mogelijkheden, versie, licentie, limieten en integratiecontract. |
| KH-DEP-011 | Het ontwerp voorziet in een Gmail-uitbreiding, webtoepassing, installeerbare starters, `PropertiesService`, `CacheService`, `LockService`, `UrlFetchApp` en geavanceerde Google-diensten. | [R3-025](bronnen/RAPPORT-3.md#brononderdelen) | voorgesteld | gepland | geen | Verifieer huidige mogelijkheden, versie, licentie, limieten en integratiecontract. |
| KH-DEP-016 | Gevoelige of beperkte Gmail-toegangsbereiken kunnen een standaard Cloud-project, verificatie en aanvullende waarborgen vereisen. | [R3-043](bronnen/RAPPORT-3.md#brononderdelen), [R3-103](bronnen/RAPPORT-3.md#brononderdelen) | huidig | onbekend | geen | Verifieer huidige mogelijkheden, versie, licentie, limieten en integratiecontract. |
| KH-DEP-019 | Gebruik voor verkeer tussen Google-diensten onderling de toegangsbereiken uit het manifest en `ScriptApp.getOAuthToken()`. | [R3-044](bronnen/RAPPORT-3.md#brononderdelen) | voorgesteld | gepland | geen | Verifieer huidige mogelijkheden, versie, licentie, limieten en integratiecontract. |
| KH-DEP-017 | Gebruik voor externe OAuth-aanbieders `apps-script-oauth2` in combinatie met eigenschappenopslag, tussenopslag en vergrendeling. | [R3-045](bronnen/RAPPORT-3.md#brononderdelen), [R3-106](bronnen/RAPPORT-3.md#brononderdelen) | voorgesteld | gepland | CF-002 | Verifieer huidige mogelijkheden, versie, licentie, limieten en integratiecontract. |
| KH-DEP-020 | Voorgestelde componenten zijn `postal-mime`, `OpenPGP.js`, `Mailvelope`, `PKI.js` en RFC 8551. | [R3-049](bronnen/RAPPORT-3.md#brononderdelen) | voorgesteld | gepland | geen | Verifieer huidige mogelijkheden, versie, licentie, limieten en integratiecontract. |
| KH-DEP-012 | Vermeld voor externe of openbroncomponenten de exacte broncodeopslagplaats, bibliotheek of documentatiebron. | [R3-084](bronnen/RAPPORT-3.md#brononderdelen) | voorgesteld | gepland | geen | Verifieer huidige mogelijkheden, versie, licentie, limieten en integratiecontract. |
| KH-DEP-013 | De Gmail API is nodig voor geschiedenis, concepten, vertraagd verzenden en bijlagen. | [R3-094](bronnen/RAPPORT-3.md#brononderdelen) | voorgesteld | gepland | geen | Verifieer huidige mogelijkheden, versie, licentie, limieten en integratiecontract. |
| KH-DEP-014 | Pub/Sub en Cloud Run zijn nodig voor `watch`, inkomende webhooks, zware taken, herhaalpogingen en idempotentie. | [R3-095](bronnen/RAPPORT-3.md#brononderdelen) | voorgesteld | gepland | geen | Verifieer huidige mogelijkheden, versie, licentie, limieten en integratiecontract. |
| KH-DEP-015 | `PropertiesService`, `CacheService` en `LockService` zijn nodig voor statusbeheer, tussenopslag, vergrendeling bij sleutelvernieuwing en taakvoortzetting. | [R3-096](bronnen/RAPPORT-3.md#brononderdelen) | voorgesteld | gepland | geen | Verifieer huidige mogelijkheden, versie, licentie, limieten en integratiecontract. |
| KH-DEP-018 | Voortzetting van gebeurtenisverwerking steunt op `startHistoryId`, de controlepuntstatus, `PropertiesService` en starters. | [R3-115](bronnen/RAPPORT-3.md#brononderdelen) | voorgesteld | gepland | geen | Verifieer huidige mogelijkheden, versie, licentie, limieten en integratiecontract. |

---

Bronverzoek: `REQ-0003`. Uit rapporten afgeleide basislijn; uitspraken over de actuele omgeving vereisen verificatie van de huidige staat.

## Huidige geverifieerde bronnen voor Google en Gmail

Bronverzoek: `REQ-0021`.

- [Geavanceerde Gmail-dienst](https://developers.google.com/apps-script/advanced/gmail) is de verplichte primaire bron voordat wijzigingen aan de integratie met de geavanceerde Gmail-dienst worden aangebracht.
- [Geavanceerde Google-diensten](https://developers.google.com/apps-script/guides/services/advanced) definieert automatische autorisatie van geavanceerde diensten en rechtstreekse `UrlFetch`-aanroepen als afzonderlijke integratiepaden.
- [Autorisatie voor Google-diensten](https://developers.google.com/apps-script/guides/services/authorization) definieert de uitvoeringsidentiteit en de grens waarop mogelijk nieuwe toestemming nodig is.
- [Quota voor Apps Script](https://developers.google.com/apps-script/guides/services/quotas) is de primaire bron voor dagelijkse limieten van externe aanroepen, looptijd van starters en Gmail-dienstlimieten.
- [Gmail users.messages.list](https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.messages/list) definieert `me` als de geauthenticeerde gebruiker, niet als een willekeurig gekoppeld postvak.
- Projectspecifiek compatibiliteitsresultaat: [VR-004 bijlage over geavanceerde e-mailcompatibiliteit](../verificatierapporten/rapporten/VR-004/GEAVANCEERDE-E-MAILCOMPATIBILITEIT.md).
