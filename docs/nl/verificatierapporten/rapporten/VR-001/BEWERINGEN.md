# VR-001: atomair beweringenregister

[Rapport](OVERZICHT.md) | [Rapportschema](../../RAPPORTSCHEMA.md) | [Bewijsbeleid](../../BEWIJSBELEID.md) | [Oekraïens](../../../../uk/звіти-перевірки/звіти/ЗП-001/ТВЕРДЖЕННЯ.md)

Bronverzoek: `REQ-0004`. Elke registratie verwijst naar rapport VR-001, het huidige project, de exacte uit rapporten afgeleide herkomst en het primaire Git-bewijs.

## KH-DEC-001

- Status: `aanbeveling`
- Categorie: `KH-DEC`; type: `besluit`
- Relevantie: hoog
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: Optimaliseer de startdrempel en een kleine vervolgactie in plaats van het aantal verwerkte berichten.
- Implementatiestatus: uitsluitend statisch geïmplementeerd in gevolgde focuskandidaat
- Afhankelijkheden: Door de eigenaar gedefinieerde resultaatcriteria; Alleen-lezen bruikbaarheids- of resultaatbewijs
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R1-002](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md), [R2-062](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Bewijs 1: [docs/design/focus-view-v28-spec.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/design/focus-view-v28-spec.md); Statische specificatie-inspectie, gecorreleerd met gevolgde implementatie- en testcontractbestanden. Resultaat: De focusweergave behoudt het geraamte van Gmail, toont een bewerkbare volgende stap en specificeert exact drie primaire acties.
- Bewijs 2: [docs/design/focus-view-v28-spec.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/d88388ee9ac67dcfc537369014f36f7ad4b11a9a/docs/design/focus-view-v28-spec.md); Inspectie van vastleggingsmetadata en gewijzigde paden; de vastlegging is een voorouder van de vastgepinde vastlegging. Resultaat: De onveranderlijke vastlegging introduceerde de focusweergave in de gebruikersinterface, serverlaag, testen en specificatie-artefacten.
- Bewijs 3: [docs/product/p1-gentle-action-contract.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/968826da8b9f13c27e6eef65033ead10c7797a11/docs/product/p1-gentle-action-contract.md); Inspectie van vastleggingsmetadata en gewijzigde paden; de vastlegging is een voorouder van de vastgepinde vastlegging. Resultaat: De onveranderlijke vastlegging voegde energiebewuste focussessies toe in de implementatie, testen en het productcontract.
- Beperkingen: Statische artefacten verifiëren de ontwerp- en implementatie-intentie, niet een verlaagde startdrempel in het gebruik of het huidige gedrag in de uitvoeringsomgeving.

## KH-DEC-002

- Status: `aanbeveling`
- Categorie: `KH-DEC`; type: `besluit`
- Relevantie: hoog
- Bereik en niveau: `broncodeopslagplaats` / `E1`
- Bewering: Het doel is een functioneel postvak met lage executieve kosten, geen leeg postvak.
- Implementatiestatus: implementatie-artefacten uitsluitend statisch aanwezig
- Afhankelijkheden: Oplossing van conflict CF-008; Vastlegging van overname door de eigenaar; Resultaatvalidatie
- Conflicten: CF-008
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R1-004](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md), [R3-010](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [docs/product/functional-relief-metrics-v41.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/385f1dc5b2a04091d2bc9c471e52595570c6ee3c/docs/product/functional-relief-metrics-v41.md); Inspectie van vastleggingsmetadata en gewijzigde paden; de vastlegging is een voorouder van de vastgepinde vastlegging. Resultaat: De onveranderlijke vastlegging voegde artefacten toe voor meetwaarden van functionele verlichting en wijzigde de Apps Script-implementatie en statische testcontracten.
- Beperkingen: De onveranderlijke vastlegging bevestigt het plaatsvinden van een fase met meetwaarden voor functionele verlichting, niet het gebruikersvoordeel, vervanging in de levenscyclus of de status in de uitvoeringsomgeving.

## KH-DEC-003

- Status: `aanbeveling`
- Categorie: `KH-DEC`; type: `besluit`
- Relevantie: hoog
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: De digitale dienst moet worden gepositioneerd als een ondersteunend hulpmiddel, niet als vervanging voor een behandeling of een klinisch systeem.
- Implementatiestatus: geen expliciet beleid voor klinische positionering aangetroffen
- Afhankelijkheden: Door de eigenaar goedgekeurde productpositionering; Juridische of klinische beoordeling indien gezondheidsclaims worden geïntroduceerd
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R1-025](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Bewijs 1: [README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/README.md); Statische inspectie bij de vastgepinde vastlegging. Resultaat: Versie 1 is de actieve ontwikkellijn; de openbare productieomgeving wordt beschreven als nog draaiend op Apps Script v37 in afwachting van de acceptatie van Versie 1. De broncodeopslagplaats sluit uitvoeringsstatus en inloggegevens uit.
- Beperkingen: De geïnspecteerde vrijgave- en implementatie-artefacten definiëren een e-mailclient maar stellen geen expliciete klinische vrijwaring vast; afwezigheid in Git bewijst niet hoe de externe positionering luidt.

## KH-DEC-004

- Status: `aanbeveling`
- Categorie: `KH-DEC`; type: `besluit`
- Relevantie: gemiddeld
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: Kunstmatige intelligentie moet drempels, energie, tijd, schuldgevoel en onafgeronde context orkestreren in plaats van enkel als samenvatter te fungeren.
- Implementatiestatus: gedeeltelijk afgestemd zonder orkestratie door kunstmatige intelligentie
- Afhankelijkheden: Expliciet besluit over de architectuur voor kunstmatige intelligentie; Beoordeling van gegevensbescherming en veiligheid; Validatie van gebruikersresultaten
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R1-029](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Bewijs 1: [apps-script/README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/README.md); Statische inspectie bij de vastgepinde vastlegging. Resultaat: Het gevolgde product is een Gmail-client in Telegram, met een volledige minitoepassing, ingebouwde Telegram-terugkoppelingen, Gmail-mappen, concepten, e-mailacties en een serverlaag in Apps Script.
- Bewijs 2: [docs/product/p1-gentle-action-contract.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/968826da8b9f13c27e6eef65033ead10c7797a11/docs/product/p1-gentle-action-contract.md); Inspectie van vastleggingsmetadata en gewijzigde paden; de vastlegging is een voorouder van de vastgepinde vastlegging. Resultaat: De onveranderlijke vastlegging voegde energiebewuste focussessies toe in de implementatie, testen en het productcontract.
- Bewijs 3: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Statische inspectie van symbolen en besturingsstroom; er is geen code uitgevoerd. Resultaat: De serverlaag bevat begrensde werkstromen voor aandacht en e-mail, maar er is geen algemene orkestratielaag voor kunstmatige intelligentie aangetroffen.
- Beperkingen: De gevolgde samenvatting is gedocumenteerd als lokale heuristische verwerking in plaats van een generatief model; bewijs uit de uitvoeringsomgeving of van gebruikersresultaten was niet toegestaan.

## KH-DEC-005

- Status: `aanbeveling`
- Categorie: `KH-DEC`; type: `besluit`
- Relevantie: hoog
- Bereik en niveau: `broncodeopslagplaats` / `E1`
- Bewering: Functionele verlichting weegt zwaarder dan oppervlakkige prestatie-indicatoren zoals het aantal gelezen berichten.
- Implementatiestatus: artefacten voor meetwaarden van functionele verlichting aanwezig
- Afhankelijkheden: Door de eigenaar goedgekeurde meetwaardendefinities; Resultaatvalidatie met behoud van gegevensbescherming
- Conflicten: geen
- Gevoeligheid: `intern`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R1-058](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Bewijs 1: [docs/product/functional-relief-metrics-v41.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/385f1dc5b2a04091d2bc9c471e52595570c6ee3c/docs/product/functional-relief-metrics-v41.md); Inspectie van vastleggingsmetadata en gewijzigde paden; de vastlegging is een voorouder van de vastgepinde vastlegging. Resultaat: De onveranderlijke vastlegging voegde artefacten toe voor meetwaarden van functionele verlichting en wijzigde de Apps Script-implementatie en statische testcontracten.
- Beperkingen: Vastleggingsbewijs bevestigt dat meetwaardenartefacten zijn toegevoegd, niet de geldigheid, verzameling of het productiegebruik van de meetwaarden.

## KH-DEC-006

- Status: `aanbeveling`
- Categorie: `KH-DEC`; type: `besluit`
- Relevantie: gemiddeld
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: Bouw het product op open standaarden en een bewezen openbron-e-mailkern; onderscheid het via een eigen gebruikersinterface, kunstmatige intelligentie en integratie-koppelvlakken.
- Implementatiestatus: niet geïmplementeerd binnen het huidige bereik van Gmail en Apps Script
- Afhankelijkheden: Oplossing van conflict CF-006; Architectuurbesluit van de eigenaar; Selectie- en migratieplan voor de e-mailkern
- Conflicten: CF-006
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R2-001](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Bewijs 1: [README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/README.md); Statische inspectie bij de vastgepinde vastlegging. Resultaat: Versie 1 is de actieve ontwikkellijn; de openbare productieomgeving wordt beschreven als nog draaiend op Apps Script v37 in afwachting van de acceptatie van Versie 1. De broncodeopslagplaats sluit uitvoeringsstatus en inloggegevens uit.
- Bewijs 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Statische inspectie van symbolen en besturingsstroom; er is geen code uitgevoerd. Resultaat: De primaire serverlaag bestaat uit Gmail, Apps Script en Telegram. Statische inspectie heeft geen implementatiesymbolen voor Mailcow, Stalwart, Postfix of Dovecot aangetroffen in het geïnspecteerde broncodepakket.
- Beperkingen: De omvang van de broncodeopslagplaats kan de gevolgde architectuur vaststellen, maar niet de afwezigheid van een niet-gevolgde externe dienst in de uitvoeringsomgeving.

## KH-DEC-007

- Status: `aanbeveling`
- Categorie: `KH-DEC`; type: `besluit`
- Relevantie: gemiddeld
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: Kies Stalwart met een eigen web- en mobiele gebruikerservaring voor moderne zakelijke en consumententoepassingen, of Mailcow met een eigen voorkant en toepassingslaag voor een snelle minimale werkende versie; behoud een eigen orkestratielaag.
- Implementatiestatus: niet geïmplementeerd binnen het huidige bereik van Gmail en Apps Script
- Afhankelijkheden: Oplossing van conflict CF-006; Platformkeuze van de eigenaar; Beoordeling van operationele capaciteit
- Conflicten: CF-006
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R2-006](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Bewijs 1: [apps-script/README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/README.md); Statische inspectie bij de vastgepinde vastlegging. Resultaat: Het gevolgde product is een Gmail-client in Telegram, met een volledige minitoepassing, ingebouwde Telegram-terugkoppelingen, Gmail-mappen, concepten, e-mailacties en een serverlaag in Apps Script.
- Bewijs 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Statische inspectie van symbolen en besturingsstroom; er is geen code uitgevoerd. Resultaat: Er is geen implementatie van Stalwart, Mailcow of een eigen tussenlaag voor de gebruikersinterface aangetroffen in de geïnspecteerde gevolgde serverlaag.
- Beperkingen: Dit verifieert uitsluitend de implementatieomvang in de broncodeopslagplaats, niet de externe infrastructuur.

## KH-DEC-008

- Status: `aanbeveling`
- Categorie: `KH-DEC`; type: `besluit`
- Relevantie: gemiddeld
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: Vervang niet elk protocol door één enkele interface; gebruik spreiding en samenvoeging terwijl bestaande en moderne interfaces naast elkaar worden ondersteund.
- Implementatiestatus: gedeeltelijk geïmplementeerd op het niveau van interfacecompatibiliteit
- Afhankelijkheden: Gedefinieerde protocolomvang; Vastlegging van architectuurbesluit
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R2-008](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Bewijs 1: [README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/README.md); Statische inspectie bij de vastgepinde vastlegging. Resultaat: Versie 1 is de actieve ontwikkellijn; de openbare productieomgeving wordt beschreven als nog draaiend op Apps Script v37 in afwachting van de acceptatie van Versie 1. De broncodeopslagplaats sluit uitvoeringsstatus en inloggegevens uit.
- Bewijs 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Statische inspectie van symbolen en besturingsstroom; er is geen code uitgevoerd. Resultaat: De gevolgde serverlaag ondersteunt ingebouwde Telegram-terugkoppelingen, een minitoepassing en compatibiliteit met oudere kaarten, maar er is geen algemene laag voor spreiding en samenvoeging van e-mailprotocollen aangetroffen.
- Beperkingen: Interfacecompatibiliteit is niet gelijkwaardig aan spreiding en samenvoeging op protocolniveau, en compatibiliteit in de uitvoeringsomgeving is niet getest.

## KH-DEC-009

- Status: `aanbeveling`
- Categorie: `KH-DEC`; type: `besluit`
- Relevantie: laag
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: Kies Mailcow voor de kortste doorlooptijd naar een werkende minimale versie.
- Implementatiestatus: niet geïmplementeerd
- Afhankelijkheden: Vergelijkende platformevaluatie; Platformbesluit van de eigenaar
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R2-020](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Bewijs 1: [README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/README.md); Statische inspectie bij de vastgepinde vastlegging. Resultaat: Versie 1 is de actieve ontwikkellijn; de openbare productieomgeving wordt beschreven als nog draaiend op Apps Script v37 in afwachting van de acceptatie van Versie 1. De broncodeopslagplaats sluit uitvoeringsstatus en inloggegevens uit.
- Bewijs 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Statische inspectie van symbolen en besturingsstroom; er is geen code uitgevoerd. Resultaat: Er is geen implementatieverwijzing naar Mailcow aangetroffen in de geïnspecteerde gevolgde implementatie; de actieve lijn bestaat uit Gmail en Apps Script.
- Beperkingen: De vergelijkende bewering over doorlooptijd tot waarde vereist een primaire vergelijkingsmeting; inspectie van de broncodeopslagplaats kan dit niet verifiëren.

## KH-DEC-010

- Status: `aanbeveling`
- Categorie: `KH-DEC`; type: `besluit`
- Relevantie: laag
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: Kies Stalwart voor een modern opgezet product vanwege ingebouwde ondersteuning voor JMAP en DAV en op koppelvlakken gerichte configuratie en aansturing.
- Implementatiestatus: niet geïmplementeerd
- Afhankelijkheden: Verificatie van mogelijkheden in het bronproject; Platformbesluit van de eigenaar
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R2-021](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Bewijs 1: [README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/README.md); Statische inspectie bij de vastgepinde vastlegging. Resultaat: Versie 1 is de actieve ontwikkellijn; de openbare productieomgeving wordt beschreven als nog draaiend op Apps Script v37 in afwachting van de acceptatie van Versie 1. De broncodeopslagplaats sluit uitvoeringsstatus en inloggegevens uit.
- Bewijs 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Statische inspectie van symbolen en besturingsstroom; er is geen code uitgevoerd. Resultaat: Er is geen implementatieverwijzing naar Stalwart of JMAP en DAV aangetroffen in de geïnspecteerde gevolgde implementatie.
- Beperkingen: Er is geen verificatie bij externe bronprojecten uitgevoerd; de aanbeveling valt buiten de huidige op Gmail gerichte implementatie.

## KH-DEC-011

- Status: `aanbeveling`
- Categorie: `KH-DEC`; type: `besluit`
- Relevantie: laag
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: Overweeg voor een zakelijke langetermijnroute met maximale controle Postfix plus Dovecot wanneer een ervaren beheerteam beschikbaar is.
- Implementatiestatus: niet geïmplementeerd
- Afhankelijkheden: Besluit over de zakelijke omvang; Beoordeling van operationele bezetting
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R2-022](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Bewijs 1: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Statische inspectie van symbolen en besturingsstroom; er is geen code uitgevoerd. Resultaat: Er is geen implementatieverwijzing naar Postfix of Dovecot aangetroffen in de geïnspecteerde gevolgde implementatie.
- Beperkingen: De operationele afweging is niet testbaar vanuit deze broncodeopslagplaats en er is geen externe vergelijkingsmeting geïnspecteerd.

## KH-DEC-012

- Status: `aanbeveling`
- Categorie: `KH-DEC`; type: `besluit`
- Relevantie: hoog
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: Gebruik Apps Script als adapter en besturingsvlak, niet als het volledige gegevensvlak; verplaats zware bewerkingen naar buiten.
- Implementatiestatus: weerlegd door de gevolgde architectuur
- Afhankelijkheden: Architectuurbesluit van de eigenaar; Ontwerp van externe achtergrondwerker en gegevensvlak
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R2-028](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md), [R3-026](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md), [R3-114](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Statische inspectie van symbolen en besturingsstroom; er is geen code uitgevoerd. Resultaat: Apps Script beheert periodiek peilen, de inrichting van Telegram-webhaken, de meldingsstatus, Telegram-aflevering en Gmail-bewerkingen.
- Bewijs 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Statische inspectie van symbolen en besturingsstroom; er is geen code uitgevoerd. Resultaat: Het bestand MailClient.gs vormt uitdrukkelijk de geauthenticeerde Gmail-serverlaag voor aanroepen op afstand en beheert sessies, aanbiedersverbindingen, concepten, postvakacties en bijlagenwerkstromen.
- Bewijs 3: [docs/audit/neuroinclusive-roadmap-status-v45.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/audit/neuroinclusive-roadmap-status-v45.md); Uitsluitend statische inspectie van controleverslagen; beweringen over de uitvoeringsomgeving in het verslag zijn niet zonder onafhankelijk bewijs geaccepteerd. Resultaat: De controle bestempelt de scheiding tussen besturings- en gegevensvlak als gedeeltelijk en stelt dat er geen actieve duurzame laag voor achtergrondwerkers bestaat.
- Beperkingen: Statische broncode stelt uitsluitend de gevolgde architectuur vast; er is geen uitrol in de uitvoeringsomgeving geïnspecteerd.

## KH-DEC-013

- Status: `aanbeveling`
- Categorie: `KH-DEC`; type: `besluit`
- Relevantie: hoog
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: Bouw de standaardbrug met de Telegram Bot API, een minitoepassing, een eigen serverlaag en de Gmail API; zet TDLib of een gebruikersaccountstroom uitsluitend weloverwogen in.
- Implementatiestatus: gedeeltelijk geïmplementeerd met een serverlaag in Apps Script
- Afhankelijkheden: Oplossing van conflict CF-002; Besluit over de authenticatie-architectuur
- Conflicten: CF-002
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R2-030](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Bewijs 1: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Statische inspectie van symbolen en besturingsstroom; er is geen code uitgevoerd. Resultaat: Statische broncode implementeert webhaak- en menubewerkingen van de Telegram Bot API en Gmail-bewerkingen in Apps Script.
- Bewijs 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Statische inspectie van symbolen en besturingsstroom; er is geen code uitgevoerd. Resultaat: Statische broncode implementeert de geauthenticeerde postvak-serverlaag voor de Telegram-minitoepassing; er is geen TDLib-stroom aangetroffen.
- Bewijs 3: [apps-script/README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/README.md); Statische inspectie bij de vastgepinde vastlegging. Resultaat: Het gevolgde product is een Gmail-client in Telegram, met een volledige minitoepassing, ingebouwde Telegram-terugkoppelingen, Gmail-mappen, concepten, e-mailacties en een serverlaag in Apps Script.
- Beperkingen: De broncodeopslagplaats ondersteunt de onderdelen voor de Bot API en minitoepassing, maar levert geen bewijs voor een afzonderlijke externe eigen serverlaag of authenticatiestatus in de uitvoeringsomgeving.

## KH-DEC-014

- Status: `aanbeveling`
- Categorie: `KH-DEC`; type: `besluit`
- Relevantie: laag
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: Gebruik Rspamd als primair filter voor nieuwe systemen; behoud SpamAssassin voor compatibiliteit of oudere omgevingen.
- Implementatiestatus: niet van toepassing op het huidige door Gmail beheerde filterbereik
- Afhankelijkheden: Besluit over zelfgehoste e-mailkern; Evaluatie van spamfilter
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R2-036](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Bewijs 1: [apps-script/README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/README.md); Statische inspectie bij de vastgepinde vastlegging. Resultaat: Het gevolgde product is een Gmail-client in Telegram, met een volledige minitoepassing, ingebouwde Telegram-terugkoppelingen, Gmail-mappen, concepten, e-mailacties en een serverlaag in Apps Script.
- Bewijs 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Statische inspectie van symbolen en besturingsstroom; er is geen code uitgevoerd. Resultaat: Er is geen implementatieverwijzing naar Rspamd of SpamAssassin aangetroffen in de geïnspecteerde gevolgde serverlaag.
- Beperkingen: Door Gmail beheerde spamfiltering en eventuele externe filterdiensten zijn niet in de uitvoeringsomgeving geïnspecteerd.

## KH-DEC-015

- Status: `aanbeveling`
- Categorie: `KH-DEC`; type: `besluit`
- Relevantie: gemiddeld
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: Houd MIME, PGP, S/MIME en eind-tot-eind-versleuteling in een afzonderlijke vervangbare functielaag en buiten de minimale werkende versie tenzij dit noodzakelijk is.
- Implementatiestatus: gedeeltelijk afgestemd door uitsluiting zonder afzonderlijke functielaag
- Afhankelijkheden: Besluit over de versleutelingsomvang; Dreigingsmodel en interoperabiliteitseisen
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R2-038](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md), [R3-048](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Statische inspectie van symbolen en besturingsstroom; er is geen code uitgevoerd. Resultaat: De gevolgde clienttoepassing bevat afhandeling van MIME-bijlagen, maar er is geen afzonderlijke functielaag voor PGP, S/MIME of eind-tot-eind-versleuteling aangetroffen.
- Beperkingen: Statische afwezigheid ondersteunt uitsluitend dat deze mogelijkheden niet worden gevolgd in de geïnspecteerde implementatie; het verifieert geen externe mogelijkheden of mogelijkheden in de uitvoeringsomgeving.

## KH-DEC-016

- Status: `aanbeveling`
- Categorie: `KH-DEC`; type: `besluit`
- Relevantie: laag
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: DAV-strategie: geïntegreerde DAV/JMAP in Stalwart of Cyrus, of afzonderlijk Radicale, Baikal of SabreDAV; in Mailcow vervult SOGo deze rol.
- Implementatiestatus: niet geïmplementeerd
- Afhankelijkheden: Toegangsbereik voor agenda en contacten; Platformkeuze
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R2-042](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Bewijs 1: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Statische inspectie van symbolen en besturingsstroom; er is geen code uitgevoerd. Resultaat: Er is geen implementatieverwijzing naar DAV, JMAP, Radicale, Baikal, SabreDAV of SOGo aangetroffen in de geïnspecteerde gevolgde serverlaag.
- Beperkingen: Er is geen productverificatie bij bronprojecten of inspectie van externe infrastructuur uitgevoerd.

## KH-DEC-017

- Status: `aanbeveling`
- Categorie: `KH-DEC`; type: `besluit`
- Relevantie: gemiddeld
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: Bouw één integratiefacade boven op de Gmail API, Microsoft Graph, Google People/Calendar en de Telegram-koppelvlakken in plaats van aanbiedersspecifieke logica in de gebruikersinterface te plaatsen.
- Implementatiestatus: gedeeltelijk geïmplementeerd als serverlaagspecifieke integraties
- Afhankelijkheden: Besluit over het aanbiedersbereik; Contract voor integratiefacade
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R2-044](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Bewijs 1: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Statische inspectie van symbolen en besturingsstroom; er is geen code uitgevoerd. Resultaat: Bewerkingen voor Gmail en Telegram vinden plaats aan de serverzijde in Apps Script.
- Bewijs 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Statische inspectie van symbolen en besturingsstroom; er is geen code uitgevoerd. Resultaat: De serverlaag bevat aanbiedersspecifieke logica voor Gmail en Box; er is geen integratiefacade voor Microsoft Graph of Google People aangetroffen.
- Bewijs 3: [apps-script/tests/mail_app_contract.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_app_contract.test.js); Testbroncode is geïnspecteerd maar niet uitgevoerd; dit is niveau E2, niet E3. Resultaat: Het statische testcontract controleert uitdrukkelijk dat overdracht naar Agenda vrij blijft van agendatoegangsbereiken.
- Beperkingen: Het gedrag van aanbieders in de uitvoeringsomgeving is niet geïnspecteerd; statische testen zijn in deze stroom niet uitgevoerd.

## KH-DEC-018

- Status: `aanbeveling`
- Categorie: `KH-DEC`; type: `besluit`
- Relevantie: hoog
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: Implementeer verzending ongedaan maken als een bedenktijdvenster vóór de daadwerkelijke verzending, niet als het terugtrekken na aflevering.
- Implementatiestatus: vertraagd verzenden aanwezig maar contract voor verzending ongedaan maken niet aangetroffen
- Afhankelijkheden: Expliciete toestandsmachine voor het ongedaan maken van verzending; Acceptatiecriteria voor annulering en idempotentie
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R2-049](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md), [R3-034](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [docs/product/p1-gentle-action-contract.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/f4764dfb89de41374ae97bdeb1a65d5a8764bd7a/docs/product/p1-gentle-action-contract.md); Inspectie van vastleggingsmetadata en gewijzigde paden; de vastlegging is een voorouder van de vastgepinde vastlegging. Resultaat: De onveranderlijke vastlegging voegde een duurzame accountgebonden implementatie voor vertraagd verzenden en bijbehorende testwijzigingen toe.
- Bewijs 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Statische inspectie van symbolen en besturingsstroom; er is geen code uitgevoerd. Resultaat: Statische inspectie stelt ondersteuning voor vertraagd verzenden en verzending via een concept vast, maar geen expliciet contract voor een bedenktijdvenster om verzending ongedaan te maken.
- Beperkingen: Vertraagd verzenden is niet gelijkwaardig aan verzending ongedaan maken; er is geen gedragstest of acceptatie in de uitvoeringsomgeving uitgevoerd.

## KH-DEC-019

- Status: `aanbeveling`
- Categorie: `KH-DEC`; type: `besluit`
- Relevantie: gemiddeld
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: Bouw de integratiebus met REST voor opdrachten en webhaken, door de server verzonden gebeurtenissen of publicatie-abonnement voor gebeurtenissen.
- Implementatiestatus: gedeeltelijk geïmplementeerd met uitsluitend opdrachten via webhaken
- Afhankelijkheden: Architectuur voor gebeurtenisaflevering; Externe achtergrondwerker of publicatie-abonnementsdienst
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R2-050](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Bewijs 1: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Statische inspectie van symbolen en besturingsstroom; er is geen code uitgevoerd. Resultaat: Apps Script implementeert inkomende Telegram-webhaken en opdrachtverwerking; er is geen duurzame gebeurtenisbus met door de server verzonden gebeurtenissen of publicatie-abonnement aangetroffen.
- Bewijs 2: [docs/audit/neuroinclusive-roadmap-status-v45.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/audit/neuroinclusive-roadmap-status-v45.md); Uitsluitend statische inspectie van controleverslagen; beweringen over de uitvoeringsomgeving in het verslag zijn niet zonder onafhankelijk bewijs geaccepteerd. Resultaat: De controle registreert de duurzame laag voor gebeurteniswerkers als afwezig.
- Beperkingen: Statische inspectie kan het gedrag van uitgerolde webhaken of externe niet-gevolgde gebeurtenisinfrastructuur niet vaststellen.

## KH-DEC-020

- Status: `aanbeveling`
- Categorie: `KH-DEC`; type: `besluit`
- Relevantie: hoog
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: Een ADHD-vriendelijke gebruikersinterface betekent samenhang, lagere cognitieve belasting, duidelijke stappen, voorspelbare navigatie en beperking van afleiding, geen decoratieve felheid.
- Implementatiestatus: uitsluitend statisch geïmplementeerd in gevolgde focus- en interfacecontracten
- Afhankelijkheden: Acceptatie voor toegankelijkheid en bruikbaarheid; Door de eigenaar goedgekeurde ontwerpcriteria
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R2-060](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Bewijs 1: [docs/design/focus-view-v28-spec.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/design/focus-view-v28-spec.md); Statische specificatie-inspectie, gecorreleerd met gevolgde implementatie- en testcontractbestanden. Resultaat: De focusweergave behoudt het geraamte van Gmail, toont een bewerkbare volgende stap en specificeert exact drie primaire acties.
- Bewijs 2: [docs/design/focus-view-v28-spec.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/d88388ee9ac67dcfc537369014f36f7ad4b11a9a/docs/design/focus-view-v28-spec.md); Inspectie van vastleggingsmetadata en gewijzigde paden; de vastlegging is een voorouder van de vastgepinde vastlegging. Resultaat: De onveranderlijke vastlegging introduceerde de focusweergave in de gebruikersinterface, serverlaag, testen en specificatie-artefacten.
- Bewijs 3: [apps-script/tests/mail_app_contract.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_app_contract.test.js); Testbroncode is geïnspecteerd maar niet uitgevoerd; dit is niveau E2, niet E3. Resultaat: Statische contracten dekken begrensde focusacties, toetsenbordnavigatie, focusbeheer, verminderde overbelasting en expliciete labels.
- Beperkingen: Bewijs uit de broncodeopslagplaats verifieert ontwerp- en codecontracten, geen toegankelijkheidsresultaten bij gebruikers of weergave in de uitvoeringsomgeving.

## KH-DEC-021

- Status: `gedeeltelijk`
- Categorie: `KH-DEC`; type: `besluit`
- Relevantie: hoog
- Bereik en niveau: `bestuur` / `E2`
- Bewering: De eerste twee rapporten blijven achtergrondcontext, terwijl rapport 3 het nieuwe primaire technische fundament wordt.
- Implementatiestatus: architectonisch afgestemd maar niet overgenomen als vast bestuur
- Afhankelijkheden: Oplossing van conflict CF-006; Expliciete vastlegging van overname door eigenaar of architectuur
- Conflicten: CF-006
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-005](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [requests/2026-07-19/REQ-0003-deep-research-knowledge-hub.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/c0ee79987b7d5637b35bb1462f1696fffcc4a828/requests/2026-07-19/REQ-0003-deep-research-knowledge-hub.md); Statische inspectie op het uiteinde van de canonieke verzoekenvertakking. Resultaat: Verzoek REQ-0003 registreert de opname van rapporten zonder wijzigingen in de uitvoeringsomgeving, Gmail, Telegram, Apps Script of productie en vermeldt dat uit rapporten afgeleide beweringen geen bevoegdheid zijn geworden.
- Bewijs 2: [instructions/KNOWLEDGE_HUB_MAINTENANCE.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/10630a566e81ff92542cea173d9021c764a7ec1a/instructions/KNOWLEDGE_HUB_MAINTENANCE.md); Statische inspectie op het uiteinde van de canonieke instructievertakking. Resultaat: Het vaste bestuur vereist afstemming vóór uitspraken over de live status en bepaalt dat uit rapporten afgeleide beweringen niet zonder nieuw bewijs als live geverifieerd gelden.
- Bewijs 3: [README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/README.md); Statische inspectie bij de vastgepinde vastlegging. Resultaat: Versie 1 is de actieve ontwikkellijn; de openbare productieomgeving wordt beschreven als nog draaiend op Apps Script v37 in afwachting van de acceptatie van Versie 1. De broncodeopslagplaats sluit uitvoeringsstatus en inloggegevens uit.
- Beperkingen: De actieve architectuur met Gmail, Apps Script en Telegram sluit aan op de reikwijdte van rapport 3, maar volgens het canonieke bestuur zijn uit rapporten afgeleide beweringen gerouteerd als kandidaten en niet als gezaghebbend overgenomen.

## KH-DEC-022

- Status: `aanbeveling`
- Categorie: `KH-DEC`; type: `besluit`
- Relevantie: hoog
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: De doelarchitectuur moet hybride zijn: een Gmail-uitbreiding, een webtoepassing en een externe laag voor gebeurtenissen en achtergrondwerkers.
- Implementatiestatus: gedeeltelijk geïmplementeerd als webtoepassing zonder uitbreiding of externe achtergrondwerker
- Afhankelijkheden: Oplossing van conflict CF-006; Besluit over Gmail-uitbreiding; Ontwerp van externe achtergrondwerker
- Conflicten: CF-006
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-006](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Statische manifestinspectie. Resultaat: Het Apps Script-manifest declareert een webtoepassing.
- Bewijs 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Statische inspectie van symbolen en besturingsstroom; er is geen code uitgevoerd. Resultaat: Apps Script bevat de actieve serverlaag en het peilpad; er is geen implementatie van een Gmail-uitbreiding of externe achtergrondwerker aangetroffen.
- Bewijs 3: [docs/audit/neuroinclusive-roadmap-status-v45.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/audit/neuroinclusive-roadmap-status-v45.md); Uitsluitend statische inspectie van controleverslagen; beweringen over de uitvoeringsomgeving in het verslag zijn niet zonder onafhankelijk bewijs geaccepteerd. Resultaat: De controle noemt de hybride splitsing gedeeltelijk en de duurzame laag voor achtergrondwerkers afwezig.
- Beperkingen: Statisch bewijs uit de broncodeopslagplaats sluit niet-gevolgde externe diensten niet uit, en er is geen uitrol in de uitvoeringsomgeving geïnspecteerd.

## KH-DEC-023

- Status: `aanbeveling`
- Categorie: `KH-DEC`; type: `besluit`
- Relevantie: hoog
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: Gebruik geen doorlopende peillussen in Apps Script; gebruik `watch()` en `history.list` met een controlepunt.
- Implementatiestatus: weerlegd door implementatie met tijdgestuurd peilen
- Afhankelijkheden: Infrastructuur voor directe meldingen van Gmail; Duurzaam geschiedeniscontrolepunt en ontdubbeling
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-112](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Statische inspectie van symbolen en besturingsstroom; er is geen code uitgevoerd. Resultaat: De functie replaceMailCheckTrigger_ maakt een tijdgestuurde starter checkNewMail_ aan met everyMinutes(CONFIG.POLL_MINUTES); er is geen actief pad voor een achtergrondwerker op basis van watch en geschiedenis vastgesteld.
- Bewijs 2: [docs/audit/neuroinclusive-roadmap-status-v45.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/audit/neuroinclusive-roadmap-status-v45.md); Uitsluitend statische inspectie van controleverslagen; beweringen over de uitvoeringsomgeving in het verslag zijn niet zonder onafhankelijk bewijs geaccepteerd. Resultaat: De controle van de broncodeopslagplaats registreert Gmail watch plus controlepunten als afwezig.
- Beperkingen: Dit is een statische weerlegging in de gevolgde broncode, geen bewijs van de momenteel uitgerolde starterstatus.

## KH-DEC-024

- Status: `aanbeveling`
- Categorie: `KH-DEC`; type: `besluit`
- Relevantie: hoog
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: Verplaats niet het volledige postvak naar Telegram; gebruik minitoepassingen als overzichtsscherm en bedieningspaneel, niet als vervanging voor de gebruikerservaring van Gmail.
- Implementatiestatus: weerlegd door de omvang van een volledige e-mailclient
- Afhankelijkheden: Besluit van de eigenaar over de productomvang; Gedefinieerde grens tussen bedieningsoppervlak en e-mailclient
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-041](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [apps-script/README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/README.md); Statische inspectie bij de vastgepinde vastlegging. Resultaat: Het gevolgde product is een Gmail-client in Telegram, met een volledige minitoepassing, ingebouwde Telegram-terugkoppelingen, Gmail-mappen, concepten, e-mailacties en een serverlaag in Apps Script.
- Bewijs 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Statische inspectie van symbolen en besturingsstroom; er is geen code uitgevoerd. Resultaat: Het bestand MailClient.gs identificeert zichzelf als de geauthenticeerde Gmail-serverlaag voor aanroepen op afstand voor de Telegram-minitoepassing en implementeert volledige postvakmappen, gesprekken, concepten, acties, bijlagen en aanbiedersverbindingen.
- Bewijs 3: [docs/design/focus-view-v28-spec.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/design/focus-view-v28-spec.md); Statische specificatie-inspectie, gecorreleerd met gevolgde implementatie- en testcontractbestanden. Resultaat: De focusweergave behoudt het geraamte van Gmail, toont een bewerkbare volgende stap en specificeert exact drie primaire acties.
- Beperkingen: De toepassing verwijst nog steeds naar Gmail en begrenst de kaartuitvoer in Telegram, maar de gevolgde minitoepassing is uitdrukkelijk een e-mailclient en niet slechts een overzichtsscherm.

## KH-DEC-025

- Status: `aanbeveling`
- Categorie: `KH-DEC`; type: `besluit`
- Relevantie: hoog
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: Beveiligingsverharding moet geheimenbeheer, toestandsmachine, inkomend verkeer, Gmail-bewerkingen en meldingen van elkaar scheiden.
- Implementatiestatus: gedeeltelijk gescheiden maar hoofdverantwoordelijkheden blijven samengevoegd
- Afhankelijkheden: Dreigingsmodel; Besluit over modulegrenzen; Acceptatiecriteria voor beveiliging
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-071](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Statische inspectie van symbolen en besturingsstroom; er is geen code uitgevoerd. Resultaat: Het bestand Code.gs voegt inkomende webhaken, meldingsstatus, periodiek peilen, Telegram-transport en Gmail-bewerkingen samen.
- Bewijs 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Statische inspectie van symbolen en besturingsstroom; er is geen code uitgevoerd. Resultaat: Het bestand MailClient.gs scheidt het geauthenticeerde oppervlak voor postvakaanroepen op afstand af, maar beheert tevens sessies, aanbiedersstatus, postvakbewerkingen, concepten en bijlagen.
- Bewijs 3: [apps-script/V26_MULTI_ACCOUNT_ARCHITECTURE.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/V26_MULTI_ACCOUNT_ARCHITECTURE.md); Statische architectuurinspectie. Resultaat: De broncodeopslagplaats heeft gedocumenteerde isolatie en modulegrenzen, maar niet de volledige vijfdelige scheiding die door de aanbeveling wordt gesteld.
- Beperkingen: Statische modulegrenzen bewijzen geen afhandeling van geheimen of isolatie in de uitgerolde uitvoeringsomgeving.

## KH-DEP-001

- Status: `geblokkeerd`
- Categorie: `KH-DEP`; type: `afhankelijkheid`
- Relevantie: hoog
- Bereik en niveau: `gemengd` / `E2`
- Bewering: WCAG 2.2 vormt de basislijn; daarnaast zijn de W3C COGA-richtlijnen nodig voor cognitieve toegankelijkheid.
- Implementatiestatus: gedeeltelijk geïmplementeerd
- Afhankelijkheden: geen
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R1-003](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Bewijs 1: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Stijlen voor zichtbare focus, focusbegrenzing in dialoogvensters, isolatiehulpfuncties, toegankelijke bedieningselementen en de interfacestructuur met verlaagde dichtheid geïnspecteerd. Resultaat: Statische toegankelijkheidsprimitieven bestaan, maar naleving en resultaten voor cognitieve toegankelijkheid vereisen een controle en acceptatiebewijs.
- Beperkingen: Veilig ontbrekend bewijs: actuele primaire referenties van WCAG 2.2 en W3C COGA plus een controle op toegankelijkheid en cognitieve bruikbaarheid gekoppeld aan de vastgepinde vastlegging.

## KH-DEP-002

- Status: `aanbeveling`
- Categorie: `KH-DEP`; type: `afhankelijkheid`
- Relevantie: gemiddeld
- Bereik en niveau: `gemengd` / `E1`
- Bewering: Het protocolcontract moet SMTP, IMAP, POP3, modern JMAP, CalDAV, CardDAV, WebDAV, OAuth 2.0, webhaken en directe meldingen omvatten.
- Implementatiestatus: niet geïmplementeerd
- Afhankelijkheden: SMTP; IMAP; POP3; JMAP; CalDAV; CardDAV; WebDAV; OAuth 2.0
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R2-002](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Bewijs 1: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); De volledige vastgepinde Git-boomstructuur vergeleken met de expliciete toestemmingslijst voor Apps Script-uitrol en het manifest. Resultaat: De uitrolbare reeks bestaat uit vier Apps Script- en HTML-bronbestanden plus het manifest. De actieve boomstructuur bevat geen Node-pakketmanifest, Redis, Mailcow, Postfix of Dovecot, Pub/Sub of Cloud Run, OpenPGP, S/MIME of declaraties van de genoemde e-mailbibliotheken.
- Beperkingen: Dit is een normatieve architectuuraanbeveling. Aanwezigheid of afwezigheid in de broncodeopslagplaats vormt geen verificatie van de externe waarde, compatibiliteit, licentievoorwaarden of actuele limieten.

## KH-DEP-003

- Status: `ongeverifieerd`
- Categorie: `KH-DEP`; type: `afhankelijkheid`
- Relevantie: gemiddeld
- Bereik en niveau: `extern` / `E1`
- Bewering: Houd rekening met uiteenlopende aanbiederspaden: DAV bij Google en Apple, Microsoft Graph voor Microsoft 365 en het gecombineerde JMAP/IMAP/POP/DAV-model van Fastmail.
- Implementatiestatus: niet geïmplementeerd
- Afhankelijkheden: Google DAV; Apple DAV; Microsoft Graph; Fastmail
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R2-009](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Bewijs 1: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); De volledige vastgepinde Git-boomstructuur vergeleken met de expliciete toestemmingslijst voor Apps Script-uitrol en het manifest. Resultaat: De uitrolbare reeks bestaat uit vier Apps Script- en HTML-bronbestanden plus het manifest. De actieve boomstructuur bevat geen Node-pakketmanifest, Redis, Mailcow, Postfix of Dovecot, Pub/Sub of Cloud Run, OpenPGP, S/MIME of declaraties van de genoemde e-mailbibliotheken.
- Beperkingen: De broncodeopslagplaats kan huidige externe mogelijkheden, versies, licenties, limieten of aanbiedersgedrag niet vaststellen; er is geen actuele primaire externe bron geraadpleegd.

## KH-DEP-004

- Status: `gedeeltelijk`
- Categorie: `KH-DEP`; type: `afhankelijkheid`
- Relevantie: gemiddeld
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: Ondersteun wachtwoord-over-TLS voor zelfgehoste of oudere systemen en OAuth 2.0/XOAUTH2 voor moderne externe accounts.
- Implementatiestatus: gedeeltelijk geïmplementeerd
- Afhankelijkheden: OAuth 2.0; TLS
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R2-010](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Bewijs 1: [apps-script/MultiAccount.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MultiAccount.gs); In de broncodeopslagplaats opgenomen OAuth-status- en terugkeerverwerkers voor Google, Drive en Box geïnspecteerd. Resultaat: OAuth-status, sleuteluitwisseling, vernieuwing en vergrendeling voor externe aanbieders zijn geïmplementeerd in de projectbroncode in plaats van via een gedeclareerde bibliotheek apps-script-oauth2.
- Bewijs 2: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Afhankelijkheidsdeclaraties geïnspecteerd. Resultaat: Er is geen afhankelijkheid van de bibliotheek apps-script-oauth2 gedeclareerd.
- Bewijs 3: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Ingeschakelde geavanceerde diensten, OAuth-toegangsbereiken, uitvoeringsomgeving en declaratie van de webtoepassing geïnspecteerd. Resultaat: Het manifest schakelt Gmail API v1 in, declareert toegangsbereiken voor Gmail-wijziging, alleen-lezen toegang tot Drive, externe verzoeken en scriptbeheer, en declareert een webtoepassing; het bevat geen declaratie voor een Gmail-uitbreiding of bibliotheek van derden.
- Beperkingen: Op OAuth gebaseerde accountstromen voor Google, Drive en Box bestaan; er is geen route voor wachtwoord-over-TLS voor zelfgehoste of oudere systemen aangetroffen.

## KH-DEP-005

- Status: `aanbeveling`
- Categorie: `KH-DEP`; type: `afhankelijkheid`
- Relevantie: laag
- Bereik en niveau: `broncodeopslagplaats` / `E1`
- Bewering: GitOps voor Mailcow moet `mailcow.conf`, `docker-compose.yml`, afgeschermde geheimen en opslagvolumes, inkomend verkeer, logboeken, eenmalige aanmelding, waarneembaarheid, reservekopieën en de integratiedienst omvatten.
- Implementatiestatus: niet geïmplementeerd
- Afhankelijkheden: Mailcow; Docker Compose
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R2-024](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Bewijs 1: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); De volledige vastgepinde Git-boomstructuur vergeleken met de expliciete toestemmingslijst voor Apps Script-uitrol en het manifest. Resultaat: De uitrolbare reeks bestaat uit vier Apps Script- en HTML-bronbestanden plus het manifest. De actieve boomstructuur bevat geen Node-pakketmanifest, Redis, Mailcow, Postfix of Dovecot, Pub/Sub of Cloud Run, OpenPGP, S/MIME of declaraties van de genoemde e-mailbibliotheken.
- Beperkingen: Dit is een normatieve architectuuraanbeveling. Aanwezigheid of afwezigheid in de broncodeopslagplaats vormt geen verificatie van de externe waarde, compatibiliteit, licentievoorwaarden of actuele limieten.

## KH-DEP-006

- Status: `aanbeveling`
- Categorie: `KH-DEP`; type: `afhankelijkheid`
- Relevantie: laag
- Bereik en niveau: `gemengd` / `E1`
- Bewering: Basisauthenticatie voor domeinen bestaat uit SPF, DKIM en DMARC, met ARC voor doorsturen of verzendlijsten; gebruik bewezen implementaties zoals OpenDKIM, OpenDMARC, OpenARC en Rspamd.
- Implementatiestatus: niet geïmplementeerd
- Afhankelijkheden: SPF; DKIM; DMARC; ARC
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R2-034](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Bewijs 1: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); De volledige vastgepinde Git-boomstructuur vergeleken met de expliciete toestemmingslijst voor Apps Script-uitrol en het manifest. Resultaat: De uitrolbare reeks bestaat uit vier Apps Script- en HTML-bronbestanden plus het manifest. De actieve boomstructuur bevat geen Node-pakketmanifest, Redis, Mailcow, Postfix of Dovecot, Pub/Sub of Cloud Run, OpenPGP, S/MIME of declaraties van de genoemde e-mailbibliotheken.
- Beperkingen: Dit is een normatieve architectuuraanbeveling. Aanwezigheid of afwezigheid in de broncodeopslagplaats vormt geen verificatie van de externe waarde, compatibiliteit, licentievoorwaarden of actuele limieten.

## KH-DEP-007

- Status: `ongeverifieerd`
- Categorie: `KH-DEP`; type: `afhankelijkheid`
- Relevantie: laag
- Bereik en niveau: `extern` / `E1`
- Bewering: OpenPGP en S/MIME vereisen afzonderlijke operationele modellen; beschikbare componenten zijn onder meer OpenPGP.js, Mailvelope, OpenSSL CMS, Bouncy Castle en PKI.js.
- Implementatiestatus: niet geïmplementeerd
- Afhankelijkheden: OpenPGP; S/MIME
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R2-037](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Bewijs 1: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); De volledige vastgepinde Git-boomstructuur vergeleken met de expliciete toestemmingslijst voor Apps Script-uitrol en het manifest. Resultaat: De uitrolbare reeks bestaat uit vier Apps Script- en HTML-bronbestanden plus het manifest. De actieve boomstructuur bevat geen Node-pakketmanifest, Redis, Mailcow, Postfix of Dovecot, Pub/Sub of Cloud Run, OpenPGP, S/MIME of declaraties van de genoemde e-mailbibliotheken.
- Beperkingen: De broncodeopslagplaats kan huidige externe mogelijkheden, versies, licenties, limieten of aanbiedersgedrag niet vaststellen; er is geen actuele primaire externe bron geraadpleegd.

## KH-DEP-008

- Status: `aanbeveling`
- Categorie: `KH-DEP`; type: `afhankelijkheid`
- Relevantie: laag
- Bereik en niveau: `broncodeopslagplaats` / `E1`
- Bewering: Gebruik voor e-mailverwerking in Node ImapFlow, Nodemailer en PostalMime in plaats van zelfgeschreven IMAP-, SMTP- of MIME-implementaties.
- Implementatiestatus: niet van toepassing
- Afhankelijkheden: ImapFlow; Nodemailer; PostalMime
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R2-046](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Bewijs 1: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); De volledige vastgepinde Git-boomstructuur vergeleken met de expliciete toestemmingslijst voor Apps Script-uitrol en het manifest. Resultaat: De uitrolbare reeks bestaat uit vier Apps Script- en HTML-bronbestanden plus het manifest. De actieve boomstructuur bevat geen Node-pakketmanifest, Redis, Mailcow, Postfix of Dovecot, Pub/Sub of Cloud Run, OpenPGP, S/MIME of declaraties van de genoemde e-mailbibliotheken.
- Beperkingen: De broncodeopslagplaats is opgebouwd in Apps Script in plaats van als een Node-mailimplementatie en declareert geen van deze pakketten; de technologiekeuze blijft een aanbeveling.

## KH-DEP-009

- Status: `aanbeveling`
- Categorie: `KH-DEP`; type: `afhankelijkheid`
- Relevantie: gemiddeld
- Bereik en niveau: `broncodeopslagplaats` / `E1`
- Bewering: Gebruik Redis voor tussenopslag, coördinatie en kortlopende taken: vertraagd verzenden, sluimeren, classificatie, tekstherkenning, herhaalpogingen, AI-samenvattingen en directe meldingverspreiding.
- Implementatiestatus: niet geïmplementeerd
- Afhankelijkheden: Redis
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R2-056](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Bewijs 1: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); De volledige vastgepinde Git-boomstructuur vergeleken met de expliciete toestemmingslijst voor Apps Script-uitrol en het manifest. Resultaat: De uitrolbare reeks bestaat uit vier Apps Script- en HTML-bronbestanden plus het manifest. De actieve boomstructuur bevat geen Node-pakketmanifest, Redis, Mailcow, Postfix of Dovecot, Pub/Sub of Cloud Run, OpenPGP, S/MIME of declaraties van de genoemde e-mailbibliotheken.
- Bewijs 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Aanroeplocaties van PropertiesService, CacheService, LockService, ScriptApp-starters, UrlFetchApp en OAuth-toegangssleutels geïnspecteerd. Resultaat: Primitieven van Apps Script voor status, tussenopslag, vergrendeling, externe ophaalverzoeken, installeerbare starters en Google OAuth-toegangssleutels worden gebruikt.
- Bewijs 3: [apps-script/MultiAccount.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MultiAccount.gs); Gebruik van accountregisters, OAuth-status, PropertiesService en LockService geïnspecteerd. Resultaat: OAuth- en autorisatiestatus voor meerdere accounts worden opgeslagen en afgeschermd met eigenschappen en vergrendelingen van Apps Script.
- Beperkingen: De broncodeopslagplaats gebruikt eigenschappen, tussenopslag, vergrendelingen en starters van Apps Script in plaats van Redis; de geschiktheid en actuele limieten van Redis zijn niet extern geverifieerd.

## KH-DEP-010

- Status: `aanbeveling`
- Categorie: `KH-DEP`; type: `afhankelijkheid`
- Relevantie: hoog
- Bereik en niveau: `broncodeopslagplaats` / `E1`
- Bewering: Zware en langdurige bewerkingen moeten buiten Apps Script worden uitgevoerd.
- Implementatiestatus: niet geïmplementeerd
- Afhankelijkheden: externe achtergrondwerker
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-021](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); De volledige vastgepinde Git-boomstructuur vergeleken met de expliciete toestemmingslijst voor Apps Script-uitrol en het manifest. Resultaat: De uitrolbare reeks bestaat uit vier Apps Script- en HTML-bronbestanden plus het manifest. De actieve boomstructuur bevat geen Node-pakketmanifest, Redis, Mailcow, Postfix of Dovecot, Pub/Sub of Cloud Run, OpenPGP, S/MIME of declaraties van de genoemde e-mailbibliotheken.
- Bewijs 2: [apps-script/tools/release_apps_script_versie_001_20260719.ps1](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tools/release_apps_script_versie_001_20260719.ps1); Ophalen van onveranderlijke versies, genormaliseerde SHA-256-controles, toestemmingslijst voor vijf kandidaatbestanden, poorten voor voorbereiden, promoveren en terugdraaien, en logboekovergangen geïnspecteerd. Resultaat: Het vrijgavescript verifieert via hashes onveranderlijke kandidaten van vijf bestanden en scheidt testopstelling, promotie, opschoning en terugdraaien; de aanwezigheid van het script bewijst niet dat het is uitgevoerd.
- Beperkingen: De vastgepinde uitrolbare reeks bestaat uitsluitend uit Apps Script en bevat geen declaratie voor een externe achtergrondwerker. Of specifieke bewerkingen de limieten van Apps Script overschrijden, vereist profilering in de uitvoeringsomgeving en actueel quotabewijs.

## KH-DEP-011

- Status: `gedeeltelijk`
- Categorie: `KH-DEP`; type: `afhankelijkheid`
- Relevantie: hoog
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: Het ontwerp voorziet in een Gmail-uitbreiding, webtoepassing, installeerbare starters, `PropertiesService`, `CacheService`, `LockService`, `UrlFetchApp` en geavanceerde Google-diensten.
- Implementatiestatus: gedeeltelijk geïmplementeerd
- Afhankelijkheden: Apps Script; Gmail API
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-025](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Ingeschakelde geavanceerde diensten, OAuth-toegangsbereiken, uitvoeringsomgeving en declaratie van de webtoepassing geïnspecteerd. Resultaat: Het manifest schakelt Gmail API v1 in, declareert toegangsbereiken voor Gmail-wijziging, alleen-lezen toegang tot Drive, externe verzoeken en scriptbeheer, en declareert een webtoepassing; het bevat geen declaratie voor een Gmail-uitbreiding of bibliotheek van derden.
- Bewijs 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Aanroeplocaties van PropertiesService, CacheService, LockService, ScriptApp-starters, UrlFetchApp en OAuth-toegangssleutels geïnspecteerd. Resultaat: Primitieven van Apps Script voor status, tussenopslag, vergrendeling, externe ophaalverzoeken, installeerbare starters en Google OAuth-toegangssleutels worden gebruikt.
- Bewijs 3: [apps-script/MultiAccount.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MultiAccount.gs); Gebruik van accountregisters, OAuth-status, PropertiesService en LockService geïnspecteerd. Resultaat: OAuth- en autorisatiestatus voor meerdere accounts worden opgeslagen en afgeschermd met eigenschappen en vergrendelingen van Apps Script.
- Beperkingen: Webtoepassing, starters, eigenschappen-, tussenopslag- en vergrendelingsdiensten, UrlFetchApp en de geavanceerde Gmail-dienst zijn aanwezig; het manifest bevat geen declaratie voor een Gmail-uitbreiding.

## KH-DEP-012

- Status: `aanbeveling`
- Categorie: `KH-DEP`; type: `afhankelijkheid`
- Relevantie: gemiddeld
- Bereik en niveau: `bestuur` / `E1`
- Bewering: Vermeld voor externe of openbroncomponenten de exacte broncodeopslagplaats, bibliotheek of documentatiebron.
- Implementatiestatus: gedeeltelijk geïmplementeerd
- Afhankelijkheden: geen
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-084](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Ingeschakelde geavanceerde diensten, OAuth-toegangsbereiken, uitvoeringsomgeving en declaratie van de webtoepassing geïnspecteerd. Resultaat: Het manifest schakelt Gmail API v1 in, declareert toegangsbereiken voor Gmail-wijziging, alleen-lezen toegang tot Drive, externe verzoeken en scriptbeheer, en declareert een webtoepassing; het bevat geen declaratie voor een Gmail-uitbreiding of bibliotheek van derden.
- Bewijs 2: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); De volledige vastgepinde Git-boomstructuur vergeleken met de expliciete toestemmingslijst voor Apps Script-uitrol en het manifest. Resultaat: De uitrolbare reeks bestaat uit vier Apps Script- en HTML-bronbestanden plus het manifest. De actieve boomstructuur bevat geen Node-pakketmanifest, Redis, Mailcow, Postfix of Dovecot, Pub/Sub of Cloud Run, OpenPGP, S/MIME of declaraties van de genoemde e-mailbibliotheken.
- Beperkingen: Het manifest noemt nauwkeurig Gmail API v1, maar de broncodeopslagplaats declareert geen pakketreeks van derden om te controleren; dit blijft een bestuurlijke aanbeveling.

## KH-DEP-013

- Status: `geverifieerd`
- Categorie: `KH-DEP`; type: `afhankelijkheid`
- Relevantie: hoog
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: De Gmail API is nodig voor geschiedenis, concepten, vertraagd verzenden en bijlagen.
- Implementatiestatus: geïmplementeerd
- Afhankelijkheden: Gmail API v1
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-094](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Ingeschakelde geavanceerde diensten, OAuth-toegangsbereiken, uitvoeringsomgeving en declaratie van de webtoepassing geïnspecteerd. Resultaat: Het manifest schakelt Gmail API v1 in, declareert toegangsbereiken voor Gmail-wijziging, alleen-lezen toegang tot Drive, externe verzoeken en scriptbeheer, en declareert een webtoepassing; het bevat geen declaratie voor een Gmail-uitbreiding of bibliotheek van derden.
- Bewijs 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Functies voor Gmail-geschiedenisstatus, huidige geschiedenis-ID, opzoeken van gewijzigde berichten, opslag van controlepunten en voortzetting via starters geïnspecteerd. Resultaat: Synchronisatie van Gmail-geschiedenis, begrensde voortzetting, herhaalpogingen en afstemming van Telegram-kaarten zijn geïmplementeerd in Apps Script.
- Bewijs 3: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Functies voor validatie, opslag, reservering, herhaalpogingen, annulering en verwerking van geplande verzendingen geïnspecteerd. Resultaat: Duurzame accountgebonden conceptplanning en door starters aangestuurde verwerking zijn in de broncode aanwezig.
- Bewijs 4: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Functies voor de status van vertraagd verzenden, bedieningselementen, conceptopslag en verzending vanuit het opstelscherm geïnspecteerd. Resultaat: De opstelinterface kan vertraagde conceptverzendingen plannen, verplaatsen, annuleren en weergeven.
- Bewijs 5: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Voorbereiding en toepassing van acties, sluimeren, labels, antwoordsjablonen en afstemming van verplaatsingen in Telegram geïnspecteerd. Resultaat: De serverlaag implementeert archief en postvak, sluimeren en uitstellen, labels, antwoordsjablonen en afgestemde actiestatus.
- Bewijs 6: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Routering van Telegram-terugkoppelingen, kaartacties, herinneringsterugkoppelingen en Gmail-afstemming geïnspecteerd. Resultaat: Korte acties in Telegram en de bijbehorende statusafstemming met Gmail zijn aanwezig.
- Beperkingen: Statische implementatie-inspectie bewijst uitsluitend de aanwezigheid van broncode; er is geen geautomatiseerde test, teruglezing uit de testomgeving of productie-acceptatie uitgevoerd.

## KH-DEP-014

- Status: `aanbeveling`
- Categorie: `KH-DEP`; type: `afhankelijkheid`
- Relevantie: gemiddeld
- Bereik en niveau: `broncodeopslagplaats` / `E1`
- Bewering: Pub/Sub en Cloud Run zijn nodig voor `watch`, inkomende webhaken, zware taken, herhaalpogingen en idempotentie.
- Implementatiestatus: niet geïmplementeerd
- Afhankelijkheden: Pub/Sub; Cloud Run
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-095](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); De volledige vastgepinde Git-boomstructuur vergeleken met de expliciete toestemmingslijst voor Apps Script-uitrol en het manifest. Resultaat: De uitrolbare reeks bestaat uit vier Apps Script- en HTML-bronbestanden plus het manifest. De actieve boomstructuur bevat geen Node-pakketmanifest, Redis, Mailcow, Postfix of Dovecot, Pub/Sub of Cloud Run, OpenPGP, S/MIME of declaraties van de genoemde e-mailbibliotheken.
- Bewijs 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Functies voor Gmail-geschiedenisstatus, huidige geschiedenis-ID, opzoeken van gewijzigde berichten, opslag van controlepunten en voortzetting via starters geïnspecteerd. Resultaat: Synchronisatie van Gmail-geschiedenis, begrensde voortzetting, herhaalpogingen en afstemming van Telegram-kaarten zijn geïmplementeerd in Apps Script.
- Beperkingen: Er bestaat geen declaratie van Pub/Sub of Cloud Run. De huidige broncode implementeert periodiek peilen, geschiedenisvoortzetting, herhaalpogingen en idempotentie in Apps Script, terwijl `watch` en inkomende webhaken afwezig blijven.

## KH-DEP-015

- Status: `geverifieerd`
- Categorie: `KH-DEP`; type: `afhankelijkheid`
- Relevantie: hoog
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: `PropertiesService`, `CacheService` en `LockService` zijn nodig voor statusbeheer, tussenopslag, vergrendeling bij sleutelvernieuwing en taakvoortzetting.
- Implementatiestatus: geïmplementeerd
- Afhankelijkheden: Apps Script
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-096](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Aanroeplocaties van PropertiesService, CacheService, LockService, ScriptApp-starters, UrlFetchApp en OAuth-toegangssleutels geïnspecteerd. Resultaat: Primitieven van Apps Script voor status, tussenopslag, vergrendeling, externe ophaalverzoeken, installeerbare starters en Google OAuth-toegangssleutels worden gebruikt.
- Bewijs 2: [apps-script/MultiAccount.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MultiAccount.gs); Gebruik van accountregisters, OAuth-status, PropertiesService en LockService geïnspecteerd. Resultaat: OAuth- en autorisatiestatus voor meerdere accounts worden opgeslagen en afgeschermd met eigenschappen en vergrendelingen van Apps Script.
- Bewijs 3: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Functies voor Gmail-geschiedenisstatus, huidige geschiedenis-ID, opzoeken van gewijzigde berichten, opslag van controlepunten en voortzetting via starters geïnspecteerd. Resultaat: Synchronisatie van Gmail-geschiedenis, begrensde voortzetting, herhaalpogingen en afstemming van Telegram-kaarten zijn geïmplementeerd in Apps Script.
- Beperkingen: Statische implementatie-inspectie bewijst uitsluitend de aanwezigheid van broncode; er is geen geautomatiseerde test, teruglezing uit de testomgeving of productie-acceptatie uitgevoerd.

## KH-DEP-016

- Status: `gedeeltelijk`
- Categorie: `KH-DEP`; type: `afhankelijkheid`
- Relevantie: hoog
- Bereik en niveau: `gemengd` / `E2`
- Bewering: Gevoelige of beperkte Gmail-toegangsbereiken kunnen een standaard Cloud-project, verificatie en aanvullende waarborgen vereisen.
- Implementatiestatus: gedeeltelijk geïmplementeerd
- Afhankelijkheden: Google OAuth-beleid
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-043](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md), [R3-103](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Ingeschakelde geavanceerde diensten, OAuth-toegangsbereiken, uitvoeringsomgeving en declaratie van de webtoepassing geïnspecteerd. Resultaat: Het manifest schakelt Gmail API v1 in, declareert toegangsbereiken voor Gmail-wijziging, alleen-lezen toegang tot Drive, externe verzoeken en scriptbeheer, en declareert een webtoepassing; het bevat geen declaratie voor een Gmail-uitbreiding of bibliotheek van derden.
- Bewijs 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Schoningsfuncties voor HTML, stijlen, labels en bijlagen en grenzen voor bronfragmenten geïnspecteerd. Resultaat: De serverlaag bevat expliciete gegevensschoning, begrensde bewijsfragmenten en autorisatiecontroles voor eigenaar en sessie.
- Bewijs 3: [gmail-oauth-callback.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/gmail-oauth-callback.html); Inhoudsbeveiligingsbeleid (CSP), verwijzersbeleid, status- en codevalidatie en verwijdering van zoekparameters geïnspecteerd. Resultaat: Het terugkeer-doorgiftebestand minimaliseert bewaarde OAuth-antwoordgegevens en wijst ongeldige invoer af.
- Beperkingen: Het manifest bewijst de toegangsbereiken voor Gmail en Drive en waarborgen in de broncode, maar de huidige classificatie van toegangsbereiken, de status van het Cloud-project, verificatie-eisen en beleidsnaleving vereisen primair Google-beleid en alleen-lezen projectbewijs.

## KH-DEP-017

- Status: `weerlegd`
- Categorie: `KH-DEP`; type: `afhankelijkheid`
- Relevantie: hoog
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: Gebruik voor externe OAuth-aanbieders `apps-script-oauth2` in combinatie met eigenschappenopslag, tussenopslag en vergrendeling.
- Implementatiestatus: anders geïmplementeerd
- Afhankelijkheden: apps-script-oauth2
- Conflicten: CF-002
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-045](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md), [R3-106](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [apps-script/MultiAccount.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MultiAccount.gs); In de broncodeopslagplaats opgenomen OAuth-status- en terugkeerverwerkers voor Google, Drive en Box geïnspecteerd. Resultaat: OAuth-status, sleuteluitwisseling, vernieuwing en vergrendeling voor externe aanbieders zijn geïmplementeerd in de projectbroncode in plaats van via een gedeclareerde bibliotheek apps-script-oauth2.
- Bewijs 2: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Afhankelijkheidsdeclaraties geïnspecteerd. Resultaat: Er is geen afhankelijkheid van de bibliotheek apps-script-oauth2 gedeclareerd.
- Bewijs 3: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Aanroeplocaties van PropertiesService, CacheService, LockService, ScriptApp-starters, UrlFetchApp en OAuth-toegangssleutels geïnspecteerd. Resultaat: Primitieven van Apps Script voor status, tussenopslag, vergrendeling, externe ophaalverzoeken, installeerbare starters en Google OAuth-toegangssleutels worden gebruikt.
- Bewijs 4: [apps-script/MultiAccount.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MultiAccount.gs); Gebruik van accountregisters, OAuth-status, PropertiesService en LockService geïnspecteerd. Resultaat: OAuth- en autorisatiestatus voor meerdere accounts worden opgeslagen en afgeschermd met eigenschappen en vergrendelingen van Apps Script.
- Beperkingen: De vastgepinde implementatie gebruikt eigen OAuth-verwerkers in de broncodeopslagplaats en eigenschappen en vergrendelingen van Apps Script, terwijl het manifest geen bibliotheek apps-script-oauth2 declareert. Statische broncode beoordeelt niet of dit alternatief de voorkeur verdient.

## KH-DEP-018

- Status: `gedeeltelijk`
- Categorie: `KH-DEP`; type: `afhankelijkheid`
- Relevantie: hoog
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: Voortzetting van gebeurtenisverwerking steunt op `startHistoryId`, de controlepuntstatus, `PropertiesService` en starters.
- Implementatiestatus: geïmplementeerd
- Afhankelijkheden: Gmail API v1; Apps Script
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-115](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Functies voor Gmail-geschiedenisstatus, huidige geschiedenis-ID, opzoeken van gewijzigde berichten, opslag van controlepunten en voortzetting via starters geïnspecteerd. Resultaat: Synchronisatie van Gmail-geschiedenis, begrensde voortzetting, herhaalpogingen en afstemming van Telegram-kaarten zijn geïmplementeerd in Apps Script.
- Bewijs 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Aanroeplocaties van PropertiesService, CacheService, LockService, ScriptApp-starters, UrlFetchApp en OAuth-toegangssleutels geïnspecteerd. Resultaat: Primitieven van Apps Script voor status, tussenopslag, vergrendeling, externe ophaalverzoeken, installeerbare starters en Google OAuth-toegangssleutels worden gebruikt.
- Bewijs 3: [apps-script/MultiAccount.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MultiAccount.gs); Gebruik van accountregisters, OAuth-status, PropertiesService en LockService geïnspecteerd. Resultaat: OAuth- en autorisatiestatus voor meerdere accounts worden opgeslagen en afgeschermd met eigenschappen en vergrendelingen van Apps Script.
- Beperkingen: Geschiedenis-ID's, opgeslagen controlepunten en status, PropertiesService en starters zijn aanwezig; de exacte naamgeving `startHistoryId` en een vrijwel directe gebeurtenisbron zijn niet vastgesteld.

## KH-DEP-019

- Status: `geverifieerd`
- Categorie: `KH-DEP`; type: `afhankelijkheid`
- Relevantie: hoog
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: Gebruik voor verkeer tussen Google-diensten onderling de toegangsbereiken uit het manifest en `ScriptApp.getOAuthToken()`.
- Implementatiestatus: geïmplementeerd
- Afhankelijkheden: Apps Script; Google OAuth
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-044](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Ingeschakelde geavanceerde diensten, OAuth-toegangsbereiken, uitvoeringsomgeving en declaratie van de webtoepassing geïnspecteerd. Resultaat: Het manifest schakelt Gmail API v1 in, declareert toegangsbereiken voor Gmail-wijziging, alleen-lezen toegang tot Drive, externe verzoeken en scriptbeheer, en declareert een webtoepassing; het bevat geen declaratie voor een Gmail-uitbreiding of bibliotheek van derden.
- Bewijs 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Aanroeplocaties van PropertiesService, CacheService, LockService, ScriptApp-starters, UrlFetchApp en OAuth-toegangssleutels geïnspecteerd. Resultaat: Primitieven van Apps Script voor status, tussenopslag, vergrendeling, externe ophaalverzoeken, installeerbare starters en Google OAuth-toegangssleutels worden gebruikt.
- Bewijs 3: [apps-script/MultiAccount.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MultiAccount.gs); Gebruik van accountregisters, OAuth-status, PropertiesService en LockService geïnspecteerd. Resultaat: OAuth- en autorisatiestatus voor meerdere accounts worden opgeslagen en afgeschermd met eigenschappen en vergrendelingen van Apps Script.
- Beperkingen: Statische implementatie-inspectie bewijst uitsluitend de aanwezigheid van broncode; er is geen geautomatiseerde test, teruglezing uit de testomgeving of productie-acceptatie uitgevoerd.

## KH-DEP-020

- Status: `aanbeveling`
- Categorie: `KH-DEP`; type: `afhankelijkheid`
- Relevantie: laag
- Bereik en niveau: `gemengd` / `E1`
- Bewering: Voorgestelde componenten zijn `postal-mime`, `OpenPGP.js`, `Mailvelope`, `PKI.js` en RFC 8551.
- Implementatiestatus: niet geïmplementeerd
- Afhankelijkheden: postal-mime; OpenPGP.js; Mailvelope; PKI.js; RFC 8551
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-049](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); De volledige vastgepinde Git-boomstructuur vergeleken met de expliciete toestemmingslijst voor Apps Script-uitrol en het manifest. Resultaat: De uitrolbare reeks bestaat uit vier Apps Script- en HTML-bronbestanden plus het manifest. De actieve boomstructuur bevat geen Node-pakketmanifest, Redis, Mailcow, Postfix of Dovecot, Pub/Sub of Cloud Run, OpenPGP, S/MIME of declaraties van de genoemde e-mailbibliotheken.
- Beperkingen: Dit is een normatieve architectuuraanbeveling. Aanwezigheid of afwezigheid in de broncodeopslagplaats vormt geen verificatie van de externe waarde, compatibiliteit, licentievoorwaarden of actuele limieten.

## KH-EVD-001

- Status: `ongeverifieerd`
- Categorie: `KH-EVD`; type: `bewijs`
- Relevantie: Bepaalt het uitgangspunt voor productonderscheid.
- Bereik en niveau: `extern` / `E0`
- Bewering: [alleen in rapport geverifieerd] Gmail en Outlook bieden afzonderlijke functies voor kunstmatige intelligentie, maar niet het beschreven samenhangende neuro-inclusieve model.
- Implementatiestatus: onbekend
- Afhankelijkheden: Actueel officieel bewijs van de mogelijkheden van Gmail en Outlook; Een reproduceerbare vergelijking met een gedefinieerd neuro-inclusief model
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R1-007](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Beperkingen: De broncodeopslagplaats bevat geen primair bewijs voor huidige mogelijkheden van Gmail of Outlook of voor de gestelde afwezigheid.

## KH-EVD-002

- Status: `gedeeltelijk`
- Categorie: `KH-EVD`; type: `bewijs`
- Relevantie: Ondersteunt taakopdeling in de focusweergave en begrensde keuzes.
- Bereik en niveau: `gemengd` / `E3`
- Bewering: De rapporten brengen ADHD in verband met problemen in de executieve functies en gebruiken dit ter onderbouwing van taakopdeling en beperkte keuzevrijheid.
- Implementatiestatus: uitsluitend de mechaniek geïmplementeerd
- Afhankelijkheden: Primair klinisch bewijs voor het verband met ADHD; Bewijs van gebruikersresultaten voor de ontwerpfilosofie
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R1-008](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md), [R2-058](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md), [R3-E03](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md), [R3-E08](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Eenmalige volledige conceptuele bestandscontrole bij de onveranderlijke vastlegging. Resultaat: Bediening voor focus en triage en een gebruikersinterface voor adaptieve dichtheid zijn aanwezig; de broncode biedt een begrensde reeks primaire acties.
- Bewijs 2: [apps-script/tests/mail_app_contract.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_app_contract.test.js); Opgenomen in TR-001 met de testuitvoerder van Node op gelijktijdigheid 1; geen toegang tot OAuth, Gmail, Telegram, Apps Script, productie, netwerk of geheimen. Resultaat: Testronde TR-001 slaagde voor de test van de focusweergave voor begrensde triage, de hervattingsbalk en exact drie primaire acties, plus het gedrag voor adaptieve dichtheid.
- Beperkingen: Niveau E3 verifieert de lokale mechaniek, niet het klinische verband of het therapeutische of gebruikersresultaat.

## KH-EVD-003

- Status: `gedeeltelijk`
- Categorie: `KH-EVD`; type: `bewijs`
- Relevantie: Ondersteunt expliciete planning, herinneringen en tijdgebonden sessies.
- Bereik en niveau: `gemengd` / `E3`
- Bewering: De rapporten beschrijven uiteenlopende problemen met tijdsbeleving als onderbouwing voor een op tijd gerichte gebruikersinterface.
- Implementatiestatus: uitsluitend de mechaniek geïmplementeerd
- Afhankelijkheden: Primair bewijs voor uiteenlopende problemen met tijdsbeleving; Bruikbaarheidsbewijs uit de uitvoeringsomgeving voor de tijdgerichte gebruikersinterface
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R1-010](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md), [R3-E07](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Eenmalige volledige conceptuele bestandscontrole bij de onveranderlijke vastlegging. Resultaat: De gebruikersinterface bevat expliciete bedieningselementen voor vertraagd verzenden en begrensde sessies voor gezamenlijke verwerking van 10 of 25 minuten.
- Bewijs 2: [apps-script/tests/mail_app_contract.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_app_contract.test.js); Opgenomen in TR-001 met de testuitvoerder van Node op gelijktijdigheid 1; geen toegang tot OAuth, Gmail, Telegram, Apps Script, productie, netwerk of geheimen. Resultaat: Testronde TR-001 slaagde voor testen van interfacecontracten voor expliciet, accountgebonden en herstelbaar vertraagd verzenden en begrensde gezamenlijke verwerking.
- Beperkingen: De wetenschappelijke onderbouwing en het gebruikerseffect zijn niet onafhankelijk geverifieerd.

## KH-EVD-004

- Status: `gedeeltelijk`
- Categorie: `KH-EVD`; type: `bewijs`
- Relevantie: Heeft betrekking op milde terugkoppeling bij mijlpalen.
- Bereik en niveau: `gemengd` / `E3`
- Bewering: [alleen in rapport geverifieerd] Motivatie- en beloningsmodellen verklaren de voorkeur voor directe nabije beloningen boven uitgestelde voordelen van routinewerk.
- Implementatiestatus: uitsluitend de mechaniek geïmplementeerd
- Afhankelijkheden: Primair onderzoek naar motivatie en beloning; Resultaatbewijs dat terugkoppeling bij mijlpalen het gestelde effect heeft
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R1-012](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Bewijs 1: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Eenmalige volledige conceptuele bestandscontrole bij de onveranderlijke vastlegging. Resultaat: Status voor milde mijlpalen en begrensde voortgangsbevestigingen zijn geïmplementeerd.
- Bewijs 2: [apps-script/tests/mail_app_contract.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_app_contract.test.js); Opgenomen in TR-001 met de testuitvoerder van Node op gelijktijdigheid 1; geen toegang tot OAuth, Gmail, Telegram, Apps Script, productie, netwerk of geheimen. Resultaat: Testronde TR-001 slaagde voor de test dat milde mijlpalen begrensde sessievoortgang erkennen zonder spelmechanismen of langdurige registratie.
- Beperkingen: De aanwezigheid van een implementatie vormt geen verificatie van het motivatie- en beloningsmodel of de effectiviteit ervan.

## KH-EVD-005

- Status: `ongeverifieerd`
- Categorie: `KH-EVD`; type: `bewijs`
- Relevantie: Onderbouwt taalgebruik en interacties zonder druk in het postvak.
- Bereik en niveau: `extern` / `E0`
- Bewering: [alleen in rapport geverifieerd] Depressieve klachten kunnen het postvak veranderen in een herinnering aan niet-nagekomen verplichtingen.
- Implementatiestatus: onbekend
- Afhankelijkheden: Primair klinisch of kwalitatief bewijs
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R1-018](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Beperkingen: Er bestaat geen primair wetenschappelijk bewijs of gebruikersonderzoek in de uitvoeringsomgeving binnen het geïnspecteerde Git-bewijs.

## KH-EVD-006

- Status: `ongeverifieerd`
- Categorie: `KH-EVD`; type: `bewijs`
- Relevantie: Onderbouwt de gecombineerde neuro-inclusieve ontwerpfilosofie.
- Bereik en niveau: `extern` / `E0`
- Bewering: De rapporten verbinden het gelijktijdig voorkomen van ADHD en depressie met een zwaardere executieve, motivationele en emotionele belasting.
- Implementatiestatus: onbekend
- Afhankelijkheden: Primair klinisch bewijs voor de bewering over gelijktijdig voorkomen
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R1-019](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md), [R2-059](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md), [R3-E05](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Beperkingen: Implementatie en testen in de broncodeopslagplaats kunnen geen klinisch verband vaststellen.

## KH-EVD-007

- Status: `gedeeltelijk`
- Categorie: `KH-EVD`; type: `bewijs`
- Relevantie: Ondersteunt meetwaarden voor functionele verlichting en begrensd achterstandsherstel.
- Bereik en niveau: `gemengd` / `E3`
- Bewering: [alleen in rapport geverifieerd] Neurodivergente auteurs en gebruikers omschrijven een `functioneel postvak` als praktischer dan een leeg postvak.
- Implementatiestatus: uitsluitend de mechaniek geïmplementeerd
- Afhankelijkheden: Primair auteurs- en gebruikersbewijs; Oplossing van conflict CF-008; Resultaatbewijs uit de uitvoeringsomgeving
- Conflicten: CF-008
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R1-066](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Bewijs 1: [apps-script/tests/mail_client.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_client.test.js); Opgenomen in TR-001 met de testuitvoerder van Node op gelijktijdigheid 1; geen toegang tot OAuth, Gmail, Telegram, Apps Script, productie, netwerk of geheimen. Resultaat: Testronde TR-001 slaagde voor testen van inhoudsvrije meetwaarden voor functionele verlichting, stabiel herstelpercentage en begrensd achterstandsherstel.
- Bewijs 2: [apps-script/tests/mail_app_contract.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_app_contract.test.js); Opgenomen in TR-001 met de testuitvoerder van Node op gelijktijdigheid 1; geen toegang tot OAuth, Gmail, Telegram, Apps Script, productie, netwerk of geheimen. Resultaat: Testronde TR-001 slaagde voor interfacetesten van optionele functionele meetwaarden en begrensd, herstelbaar achterstandsherstel.
- Beperkingen: Testen verifiëren het geïmplementeerde model, niet gebruikersvoorkeuren of vergelijkbare praktische bruikbaarheid; conflict CF-008 blijft onopgelost op basis van bewijs uit de broncodeopslagplaats.

## KH-EVD-008

- Status: `gedeeltelijk`
- Categorie: `KH-EVD`; type: `bewijs`
- Relevantie: Ondersteunt de overzichtmodus, stille uren en begrensde achtergrondwerkers.
- Bereik en niveau: `gemengd` / `E3`
- Bewering: De rapporten beschrijven bundeling en beperkte controlevensters als manieren om voortdurend reageren en stress te verminderen.
- Implementatiestatus: uitsluitend de mechaniek geïmplementeerd
- Afhankelijkheden: Primair gedragsbewijs; Bewijs uit de uitvoeringsomgeving dat stress of voortdurend reageren afneemt
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R1-067](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md), [R3-E06](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md), [R3-E10](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Eenmalige volledige conceptuele bestandscontrole bij de onveranderlijke vastlegging. Resultaat: Begrensde deelreeksen, vertragingsstatus voor overzichten, gedrag voor stille uren en limieten voor minuutwerkers zijn aanwezig.
- Bewijs 2: [apps-script/tests/mail_actions.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_actions.test.js); Opgenomen in TR-001 met de testuitvoerder van Node op gelijktijdigheid 1; geen toegang tot OAuth, Gmail, Telegram, Apps Script, productie, netwerk of geheimen. Resultaat: Testronde TR-001 slaagde voor testen van overzichtsgroepering, uitstel tijdens stille uren, begrensde herinneringswerkers en begrensde metadata-deelreeksen.
- Beperkingen: Geen enkele lokale test kan verminderde stress of minder voortdurend reageren bij gebruikers verifiëren.

## KH-EVD-009

- Status: `gedeeltelijk`
- Categorie: `KH-EVD`; type: `bewijs`
- Relevantie: Ondersteunt de duurzame functie voor vertraagd verzenden.
- Bereik en niveau: `gemengd` / `E3`
- Bewering: [alleen in rapport geverifieerd] `Later verzenden` en een aanpasbare bedenktijd vóór verzending worden beschreven als middelen om spanning en door perfectionisme gedreven vermijdingsgedrag te verlagen.
- Implementatiestatus: geïmplementeerd
- Afhankelijkheden: Primair bewijs voor vermindering van spanning en vermijdingsgedrag; Productie-acceptatie van geplande aflevering
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R1-070](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Bewijs 1: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Eenmalige volledige conceptuele bestandscontrole bij de onveranderlijke vastlegging. Resultaat: Bewerkingen voor plannen, verplaatsen, annuleren, status, lease en achtergrondwerkers zijn geïmplementeerd voor accountgebonden concepten.
- Bewijs 2: [apps-script/tests/mail_client.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_client.test.js); Opgenomen in TR-001 met de testuitvoerder van Node op gelijktijdigheid 1; geen toegang tot OAuth, Gmail, Telegram, Apps Script, productie, netwerk of geheimen. Resultaat: Testronde TR-001 slaagde voor zeven testen van vertraagd verzenden rond duurzaamheid, isolatie, onzekerheid, quota, tijdzones en hoogstens-eenmalige verwerking door achtergrondwerkers.
- Bewijs 3: [apps-script/tests/mail_app_contract.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_app_contract.test.js); Opgenomen in TR-001 met de testuitvoerder van Node op gelijktijdigheid 1; geen toegang tot OAuth, Gmail, Telegram, Apps Script, productie, netwerk of geheimen. Resultaat: Testronde TR-001 slaagde voor het interfacecontract voor expliciet, herstelbaar en accountgebonden vertraagd verzenden.
- Beperkingen: Niveau E3 bewijst geen productie-aflevering of het gestelde effect op het mentale welzijn.

## KH-EVD-010

- Status: `gedeeltelijk`
- Categorie: `KH-EVD`; type: `bewijs`
- Relevantie: Ondersteunt besloten sessies voor gezamenlijke verwerking.
- Bereik en niveau: `gemengd` / `E3`
- Bewering: [alleen in rapport geverifieerd] Aanwezigheidsondersteuning, virtueel samenwerken en lichte nabijheid worden beschreven als praktische manieren om de startdrempel te doorbreken; het rapport noemt het e-mailspecifieke bewijs hiervoor zwakker.
- Implementatiestatus: geïmplementeerd
- Afhankelijkheden: Primair bewijs voor aanwezigheidsondersteuning en gezamenlijk werken; E-mailspecifiek bewijs van gebruikersresultaten
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R1-071](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Bewijs 1: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Eenmalige volledige conceptuele bestandscontrole bij de onveranderlijke vastlegging. Resultaat: Besloten accountgebonden sessies voor gezamenlijke verwerking met een begrensde duur van 10 of 25 minuten zijn geïmplementeerd.
- Bewijs 2: [apps-script/tests/mail_client.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_client.test.js); Opgenomen in TR-001 met de testuitvoerder van Node op gelijktijdigheid 1; geen toegang tot OAuth, Gmail, Telegram, Apps Script, productie, netwerk of geheimen. Resultaat: Testronde TR-001 slaagde voor testen van expliciete, inhoudsvrije, idempotente en accountgebonden sessies voor gezamenlijke verwerking.
- Bewijs 3: [apps-script/tests/mail_app_contract.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_app_contract.test.js); Opgenomen in TR-001 met de testuitvoerder van Node op gelijktijdigheid 1; geen toegang tot OAuth, Gmail, Telegram, Apps Script, productie, netwerk of geheimen. Resultaat: Testronde TR-001 slaagde voor de interfacetest van besloten, herstelbare aanwezigheidsondersteuning bij gezamenlijke verwerking en bevestigde dat deze geen e-mail wijzigt.
- Beperkingen: Bewijs uit de broncodeopslagplaats verifieert uitsluitend de mechaniek; het bewijst geen verlaging van de startdrempel of e-mailspecifieke effectiviteit.

## KH-EVD-011

- Status: `ongeverifieerd`
- Categorie: `KH-EVD`; type: `bewijs`
- Relevantie: Bepaalt de vergelijkingsbasis voor Gmail.
- Bereik en niveau: `extern` / `E0`
- Bewering: [alleen in rapport geverifieerd] Gmail biedt `AI-overzicht` en herinneringen voor vervaldatums.
- Implementatiestatus: niet van toepassing
- Afhankelijkheden: Actuele officiële Gmail-documentatie of veilige live teruglezing
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R1-030](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Beperkingen: Het toegewezen lokale Git-bewijs kan een huidige externe productfunctie van Gmail niet verifiëren.

## KH-EVD-012

- Status: `ongeverifieerd`
- Categorie: `KH-EVD`; type: `bewijs`
- Relevantie: Bepaalt de vergelijkingsbasis voor Outlook en Copilot.
- Bereik en niveau: `extern` / `E0`
- Bewering: [alleen in rapport geverifieerd] Outlook/Copilot biedt samenvattingen met bronverwijzingen, bijlage-analyse, prioritering, het aanmaken van regels en automatische antwoorden.
- Implementatiestatus: niet van toepassing
- Afhankelijkheden: Actuele officiële Microsoft-documentatie of veilige live teruglezing
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R1-031](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Beperkingen: Het toegewezen lokale Git-bewijs kan huidige mogelijkheden van Outlook en Copilot niet verifiëren.

## KH-EVD-013

- Status: `ongeverifieerd`
- Categorie: `KH-EVD`; type: `bewijs`
- Relevantie: Biedt context voor de protocolarchitectuur.
- Bereik en niveau: `extern` / `E0`
- Bewering: Het rapport koppelt SMTP, IMAP, POP3, JMAP en JMAP over WebSocket aan RFC 5321, 3501, 1939, 8620, 8621 en 8887.
- Implementatiestatus: niet van toepassing
- Afhankelijkheden: Primaire RFC-teksten en een exacte vergelijking tussen protocol en RFC
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R2-007](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Beperkingen: Er waren geen primaire RFC-teksten aanwezig of geraadpleegd in het toegewezen bewijs uit de broncodeopslagplaats.

## KH-EVD-014

- Status: `ongeverifieerd`
- Categorie: `KH-EVD`; type: `bewijs`
- Relevantie: Beïnvloedt de gegevensbeschermingsbehandeling van volg-pixels.
- Bereik en niveau: `extern` / `E0`
- Bewering: Het rapport stelt dat publicaties van CNIL en Garante uit 2026 bezwaren rond toestemming opwerpen voor volg-pixels in e-mail.
- Implementatiestatus: niet van toepassing
- Afhankelijkheden: Primaire documenten van CNIL en Garante uit 2026; Rechtsgebiedspecifieke juridische interpretatie
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R2-040](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Beperkingen: Er waren geen primaire documenten van toezichthouders aanwezig of geraadpleegd in het toegewezen Git-bewijs.

## KH-EVD-015

- Status: `gedeeltelijk`
- Categorie: `KH-EVD`; type: `bewijs`
- Relevantie: Stelt vast welke implementatie- en vrijgavelijn als actueel moet worden beschouwd.
- Bereik en niveau: `gemengd` / `E3`
- Bewering: De bestaande projectkern en versie v45 vormen de huidige werkbasis.
- Implementatiestatus: historische basis gewijzigd
- Afhankelijkheden: Een nauwkeurige definitie van de huidige werkbasis; Alleen-lezen teruglezing van productie-uitrol en versie-hash voor elke interpretatie van de live status
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-E01](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [apps-script/tools/release_apps_script_v37_product_v45.ps1](https://github.com/Tarasevych/gmail-telegram-controls/blob/fa15f11987c1435ca8975594780c8a1d1c91508d/apps-script/tools/release_apps_script_v37_product_v45.ps1); Controle van voorouderrelatie via git merge-base --is-ancestor fa15f11987c1435ca8975594780c8a1d1c91508d 2b3b9e2f678f9fa0c787247f92d7827f81e95c9a. Resultaat: Afsluitcode 0: de vrijgavevastlegging van v45 is een voorouder van de toegewezen actieve vastlegging.
- Bewijs 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Vergelijking via git diff --name-status en git rev-parse van broncodeobjecten tussen v45 en de toegewezen vastlegging. Resultaat: De bestanden Code.gs, MailApp.html, MultiAccount.gs en bijbehorende testen zijn na v45 gewijzigd; MailClient.gs en appsscript.json hebben hun broncodeobjecten uit v45 behouden.
- Bewijs 3: [apps-script/tests/release_v37_product_v45.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/release_v37_product_v45.test.js); Opgenomen in TR-001 met de testuitvoerder van Node op gelijktijdigheid 1; geen toegang tot OAuth, Gmail, Telegram, Apps Script, productie, netwerk of geheimen. Resultaat: Testronde TR-001 slaagde voor beide testen van de historische onveranderlijke v45-kandidaat en de bijbehorende veilig-gesloten, hoogstens-eenmalige vrijgavepoort met terugdraaimogelijkheid.
- Bewijs 4: [docs/en/releases/VERSIE-001-2026-07-19.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/releases/VERSIE-001-2026-07-19.md); Eenmalige inspectie van het onveranderlijke vrijgave-artefact. Resultaat: Het artefact vermeldt dat Versie 1 niet is gepromoveerd, gelabeld of vertegenwoordigd door een vrijgavevertakking en nog steeds poorten voor testomgeving en handmatige acceptatie moet doorlopen.
- Beperkingen: Versie v45 is geverifieerd als afstammingslijn, niet als een ongewijzigde huidige boomstructuur.; Exact veilig ontbrekend productiebewijs: alleen-lezen teruglezing van Apps Script-uitrol en -versie gekoppeld aan onveranderlijke broncode-hashes plus productie-acceptatie; verboden in deze stroom.

## KH-EVD-016

- Status: `weerlegd`
- Categorie: `KH-EVD`; type: `bewijs`
- Relevantie: Stelt het daadwerkelijke Gmail-integratieoppervlak vast.
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: Gmail-uitbreidingen maken gebruik van een kaartinterface; contextuele starters worden uitgevoerd bij geopende berichten en zijn onvoorwaardelijk in het manifest.
- Implementatiestatus: niet geïmplementeerd zoals gesteld
- Afhankelijkheden: Officiële documentatie over Gmail-uitbreidingen is nog vereist voor de algemene eerste bepaling
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-E02](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Volledige inspectie van het onveranderlijke manifest. Resultaat: Het manifest configureert een anonieme Apps Script-webtoepassing en de geavanceerde Gmail-dienst; het bevat geen declaratie voor addOns, gmail.contextualTriggers of onvoorwaardelijke contextuele starters.
- Bewijs 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Eenmalige volledige conceptuele bestandscontrole bij de onveranderlijke vastlegging. Resultaat: Er is geen implementatie van CardService aangetroffen; de enige contextuele overeenkomsten betreffen het ontleden van eenmalige verificatiecodes, niet starters voor een Gmail-uitbreiding.
- Beperkingen: De broncodeopslagplaats weerlegt rechtstreeks de projectspecifieke bewering over het manifest; de algemene uitspraak over Gmail-uitbreidingen is niet extern opnieuw geverifieerd.

## KH-EVD-017

- Status: `ongeverifieerd`
- Categorie: `KH-EVD`; type: `bewijs`
- Relevantie: Begrenst hoe het product ADHD moet toelichten.
- Bereik en niveau: `extern` / `E0`
- Bewering: Dopaminerge systemen zijn relevant, maar een eenvoudig dopaminetekortmodel wordt als te simplistisch beschreven.
- Implementatiestatus: onbekend
- Afhankelijkheden: Primair neurowetenschappelijk bewijs en overzichtsliteratuur
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-E04](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Beperkingen: Broncode en testen in de opslagplaats kunnen geen neurowetenschappelijk model verifiëren.

## KH-EVD-018

- Status: `gedeeltelijk`
- Categorie: `KH-EVD`; type: `bewijs`
- Relevantie: Ondersteunt de focusweergave met beperkte inhoud en adaptieve informatiedichtheid.
- Bereik en niveau: `gemengd` / `E3`
- Bewering: Het rapport haalt W3C en wetenschappelijk onderzoek aan ter ondersteuning van minder onderbrekingen, betere focus en beperkte hoeveelheid inhoud.
- Implementatiestatus: uitsluitend de mechaniek geïmplementeerd
- Afhankelijkheden: Primaire W3C- en onderzoeksbronnen; Resultaten voor toegankelijkheid en onderbrekingen in de uitvoeringsomgeving
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-E09](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md), [R3-E25](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [apps-script/tests/mail_app_contract.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_app_contract.test.js); Opgenomen in TR-001 met de testuitvoerder van Node op gelijktijdigheid 1; geen toegang tot OAuth, Gmail, Telegram, Apps Script, productie, netwerk of geheimen. Resultaat: Testronde TR-001 slaagde voor de focusweergave met exact drie primaire acties en adaptieve dichtheid die de minimale modus beperkt tot drie primaire acties.
- Bewijs 2: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Eenmalige volledige conceptuele bestandscontrole bij de onveranderlijke vastlegging. Resultaat: Bedieningselementen in de gebruikersinterface voor focus, triage, adaptieve dichtheid en begrensde inhoud zijn aanwezig.
- Beperkingen: De geciteerde W3C- en onderzoeksbasis en daadwerkelijke gebruikersresultaten blijven ongeverifieerd.

## KH-EVD-019

- Status: `gedeeltelijk`
- Categorie: `KH-EVD`; type: `bewijs`
- Relevantie: Dekt de kernbewerkingen voor opstellen, verzenden, bijlagen en MIME.
- Bereik en niveau: `gemengd` / `E3`
- Bewering: Het rapport stelt dat de Gmail API concepten, verzending, het ophalen van bijlagen en bewerkingen op ruwe berichten ondersteunt.
- Implementatiestatus: geïmplementeerd
- Afhankelijkheden: Actuele officiële referentie van de Gmail API of veilig alleen-lezen bewijs uit de uitvoeringsomgeving
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-E11](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md), [R3-E15](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Volledige inspectie van het onveranderlijke manifest. Resultaat: Geavanceerde Gmail v1 is ingeschakeld met het toegangsbereik gmail.modify.
- Bewijs 2: [apps-script/tests/mail_client.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_client.test.js); Opgenomen in TR-001 met de testuitvoerder van Node op gelijktijdigheid 1; geen toegang tot OAuth, Gmail, Telegram, Apps Script, productie, netwerk of geheimen. Resultaat: Testronde TR-001 slaagde voor nagebootste lokale testen van opgemaakte ruwe MIME-concepten, base64url-codering, ophalen van bijlagen, aanmaken en bijwerken van concepten, verzenden op concept-ID en hoogstens-eenmalige verzendafstemming.
- Beperkingen: Niveau E3 verifieert de logica in de broncodeopslagplaats tegen nabootsobjecten, niet het actuele externe koppelvlakcontract of het live gedrag van Gmail.

## KH-EVD-020

- Status: `gedeeltelijk`
- Categorie: `KH-EVD`; type: `bewijs`
- Relevantie: Ondersteunt de opdracht- en besturingsarchitectuur in Telegram.
- Bereik en niveau: `gemengd` / `E3`
- Bewering: De Telegram Bot API is gebaseerd op HTTP en geschikt voor bediening met korte opdrachten.
- Implementatiestatus: geïmplementeerd
- Afhankelijkheden: Actuele officiële referentie van de Telegram Bot API; Bruikbaarheidsbewijs uit de uitvoeringsomgeving voor geschiktheid; Oplossing van conflict CF-002
- Conflicten: CF-002
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-E12](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Eenmalige volledige conceptuele bestandscontrole bij de onveranderlijke vastlegging. Resultaat: Telegram-methoden worden via UrlFetchApp.fetch verzonden naar het beveiligde HTTPS-eindpunt van de Bot API.
- Bewijs 2: [apps-script/tests/mail_actions.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_actions.test.js); Opgenomen in TR-001 met de testuitvoerder van Node op gelijktijdigheid 1; geen toegang tot OAuth, Gmail, Telegram, Apps Script, productie, netwerk of geheimen. Resultaat: Testronde TR-001 slaagde voor testen van begrensde chatopdrachten, terugkoppelingen, herhaalpogingen, ontdubbeling en korte besturingsstromen.
- Beperkingen: De implementatie bewijst lokaal een HTTP-transport en begrensde opdrachten, niet de beschikbaarheid van het externe koppelvlak of de kwalitatieve geschiktheid; conflict CF-002 blijft onopgelost.

## KH-EVD-021

- Status: `gedeeltelijk`
- Categorie: `KH-EVD`; type: `bewijs`
- Relevantie: Beïnvloedt de selectie van OAuth-toegangsbereiken en het vrijgavebestuur.
- Bereik en niveau: `gemengd` / `E3`
- Bewering: Het rapport stelt dat Gmail-uitbreidingen en beperkte toegangsbereiken onderworpen zijn aan eisen voor dataminimalisatie en verificatie.
- Implementatiestatus: gedeeltelijk
- Afhankelijkheden: Actueel officieel Google-beleid voor verificatie van beperkte toegangsbereiken en uitbreidingen; Serverzijdige OAuth-verificatiestatus
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-E13](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md), [R3-E24](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Volledige inspectie van het onveranderlijke manifest. Resultaat: Het project vraagt gmail.modify, drive.readonly, script.external_request en script.scriptapp aan; het vraagt geen volledige e-mailtoegang of gmail.send aan.
- Bewijs 2: [apps-script/tests/mail_actions.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_actions.test.js); Opgenomen in TR-001 met de testuitvoerder van Node op gelijktijdigheid 1; geen toegang tot OAuth, Gmail, Telegram, Apps Script, productie, netwerk of geheimen. Resultaat: Testronde TR-001 slaagde voor de manifesttest die gmail.modify bevestigt zonder bereik voor volledige e-mail of direct verzenden.
- Beperkingen: De inhoud van de toegangsbereiken is geverifieerd, maar de actuele minimalisatie- en verificatie-eisen van Google en de verificatiestatus van dit project zijn dat niet.

## KH-EVD-022

- Status: `ongeverifieerd`
- Categorie: `KH-EVD`; type: `bewijs`
- Relevantie: Richtsnoer voor opslag van OAuth-status en gelijktijdigheid bij sleutelvernieuwing.
- Bereik en niveau: `extern` / `E0`
- Bewering: `apps-script-oauth2` adviseert het gebruik van eigenschappenopslag, tussenopslag en vergrendeling, en waarschuwt voor gelijktijdigheidsconflicten bij het vernieuwen van toegangssleutels.
- Implementatiestatus: onbekend
- Afhankelijkheden: Onveranderlijke primaire revisie van documentatie of broncode van apps-script-oauth2
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-E14](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Beperkingen: De broncodeopslagplaats gebruikt PropertiesService en vergrendelingen in eigen OAuth-code, maar stelt niet vast wat apps-script-oauth2 aanbeveelt of dat die bibliotheek wordt gebruikt.

## KH-EVD-023

- Status: `gedeeltelijk`
- Categorie: `KH-EVD`; type: `bewijs`
- Relevantie: Bepaalt de verwachte broncode-uitrol en beveiligingsmaatregelen voor de broncodeopslagplaats.
- Bereik en niveau: `bestuur` / `E2`
- Bewering: `clasp`, CodeQL, geheimenscans en Dependabot worden beschreven als vrijgave- en beveiligingsmaatregelen.
- Implementatiestatus: gedeeltelijk
- Afhankelijkheden: Alleen-lezen bewijs van beveiligingsinstellingen van de GitHub-broncodeopslagplaats voor serverzijdige geheimenscans; Primaire gereedschapsdocumentatie voor de algemene mogelijkhedenbewering
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-E16](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); Volledige inspectie van de onveranderlijke configuratie. Resultaat: Een negeerbestand voor clasp staat uitsluitend de vijf broncode- en manifestbestanden van Apps Script toe.
- Bewijs 2: [](https://github.com/Tarasevych/gmail-telegram-controls/tree/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a); Inventarisatie via git ls-tree plus volledige inspectie van beide gevolgde werkstromen. Resultaat: Uitsluitend werkstromen voor validatie van tweetalige documentatie en het kenniscentrum worden gevolgd; bij deze vastlegging is geen CodeQL-werkstroom of Dependabot-configuratie aanwezig.
- Beperkingen: Lokale Git-gegevens kunnen serverzijdige instellingen voor geheimenscans op GitHub niet bewijzen.; De broncodeopslagplaats toont gedeeltelijke clasp-pakketvorming, maar niet alle vier gestelde beheersmaatregelen.

## KH-EVD-024

- Status: `gedeeltelijk`
- Categorie: `KH-EVD`; type: `bewijs`
- Relevantie: Verklaart begrensde achtergrondwerkers, cursors, leases en hervatbare status.
- Bereik en niveau: `gemengd` / `E3`
- Bewering: Het rapport beschrijft de uitvoeringslimieten van Apps Script en de noodzaak van een voortzettingsstatus of een externe verwerker voor langdurige bewerkingen.
- Implementatiestatus: voortzettingsstatus geïmplementeerd
- Afhankelijkheden: Actuele officiële documentatie over quota en limieten van Apps Script; Acceptatie van uitvoeringsduur en voortzetting in de uitvoeringsomgeving
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-E17](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md), [R3-E27](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Eenmalige volledige conceptuele bestandscontrole bij de onveranderlijke vastlegging. Resultaat: De implementatie bevat duurzame cursors, paginasleutels, leases, begrensde deelreeksen en voortzettingspaden voor minuutwerkers.
- Bewijs 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Eenmalige volledige conceptuele bestandscontrole bij de onveranderlijke vastlegging. Resultaat: Postvakbewerkingen maken gebruik van begrensde cursors, leases, logboeken en geplande achtergrondwerkers.
- Bewijs 3: [apps-script/tests/mail_actions.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_actions.test.js); Opgenomen in TR-001 met de testuitvoerder van Node op gelijktijdigheid 1; geen toegang tot OAuth, Gmail, Telegram, Apps Script, productie, netwerk of geheimen. Resultaat: Testronde TR-001 slaagde voor testen van duurzame paginering over meer dan 500 berichten, cursorherstart, herhaalpogingen, leases, begrensde achtergrondwerkers en voortzetting.
- Beperkingen: Officiële uitvoeringslimieten en productiegedrag zijn niet geverifieerd; er is geen bewijs gevonden voor de uitrol van een externe achtergrondwerker.

## KH-EVD-025

- Status: `ongeverifieerd`
- Categorie: `KH-EVD`; type: `bewijs`
- Relevantie: Ondersteunt de voorgestelde ontwikkelwerkstroom.
- Bereik en niveau: `extern` / `E0`
- Bewering: Documentatie van Codex wordt aangehaald ter ondersteuning van werkstromen die rekening houden met context, hulpmiddelen en uitvoeringsomgeving.
- Implementatiestatus: niet van toepassing
- Afhankelijkheden: Actuele officiële Codex-documentatie en exact geciteerde passages
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-E18](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Beperkingen: Binnen de toegewezen bewijsomvang is geen externe Codex-documentatie geraadpleegd; werkstroominstructies in de broncodeopslagplaats vormen geen bewijs van de geciteerde documentatie.

## KH-EVD-026

- Status: `geblokkeerd`
- Categorie: `KH-EVD`; type: `bewijs`
- Relevantie: Beïnvloedt de vindbaarheid en beweringen over openbaar bewijs.
- Bereik en niveau: `extern` / `E0`
- Bewering: Openbare indexering van `github.com/[PRIVATE]/gmail-telegram-controls` kon niet worden bevestigd.
- Implementatiestatus: geblokkeerd
- Afhankelijkheden: Actuele anonieme zichtbaarheidscontrole op GitHub; Onafhankelijke actuele zoekopdracht in zoekindex
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-E19](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Beperkingen: De lokale onveranderlijke Git-geschiedenis kan openbare indexering door zoekmachines niet bewijzen.; Exact veilig ontbrekend bewijs: een anoniem alleen-lezen zichtbaarheidsantwoord van GitHub plus actuele onafhankelijke zoekindexresultaten voor het canonieke openbare webadres; externe en netwerkcontroles vielen buiten deze stroom.

## KH-EVD-027

- Status: `gedeeltelijk`
- Categorie: `KH-EVD`; type: `bewijs`
- Relevantie: Brengt de feitelijke oppervlakken voor web, Gmail, synchronisatie, OAuth en toegangsbereiken in kaart.
- Bereik en niveau: `gemengd` / `E3`
- Bewering: Gmail-kaarten, `doGet`/`doPost`, Gmail API-onderdelen, `watch`, OAuth-opslag en -vergrendeling en verificatie van toegangsbereiken worden aangehaald als platformbeperkingen.
- Implementatiestatus: gedeeltelijk
- Afhankelijkheden: Actuele officiële platformdocumentatie; Verificatie in de uitvoeringsomgeving voor OAuth, toegangsbereiken en Gmail-synchronisatie
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-E20](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Eenmalige volledige conceptuele bestandscontrole bij de onveranderlijke vastlegging. Resultaat: De functies doPost en doGet zijn geïmplementeerd; Gmail-geschiedenis gebruikt startHistoryId; PropertiesService en vergrendelingen worden gebruikt; er is geen aanroep van Gmail CardService of watch aangetroffen.
- Bewijs 2: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Volledige inspectie van het onveranderlijke manifest. Resultaat: Geavanceerde Gmail v1 en expliciete toegangsbereiken zijn geconfigureerd, maar er bestaat geen manifest voor kaarten of starters van een Gmail-uitbreiding.
- Bewijs 3: [apps-script/tests/mail_actions.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_actions.test.js); Opgenomen in TR-001 met de testuitvoerder van Node op gelijktijdigheid 1; geen toegang tot OAuth, Gmail, Telegram, Apps Script, productie, netwerk of geheimen. Resultaat: Testronde TR-001 slaagde voor testen van de basislijn, wijzigingen en cursor van de Gmail-geschiedenis en voor controles op minimalisatie van toegangsbereiken.
- Beperkingen: Uitbreidingskaarten en watch zijn niet geïmplementeerd in de gecontroleerde boomstructuur; huidige platformbeperkingen en de OAuth-verificatiestatus blijven extern en in de uitvoeringsomgeving ongeverifieerd.

## KH-EVD-028

- Status: `gedeeltelijk`
- Categorie: `KH-EVD`; type: `bewijs`
- Relevantie: Bepaalt de beoogde verantwoordelijkheidsgrenzen tussen platformcomponenten.
- Bereik en niveau: `gemengd` / `E3`
- Bewering: Het rapport wijst de contextuele gebruikersinterface toe aan uitbreidingen, rijkere interactie aan webtoepassingen, automatisering aan de Gmail API, betrouwbare gebeurtenisverwerking aan Pub/Sub en Cloud Run, en statusbeheer aan eigenschappenopslag, tussenopslag en vergrendeling.
- Implementatiestatus: gedeeltelijk
- Afhankelijkheden: Primaire platformdocumentatie; Bewijs van uitgerolde architectuur voor Pub/Sub, Cloud Run en uitbreidingen
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-E21](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Volledige inspectie van het onveranderlijke manifest. Resultaat: Het project is een Apps Script-webtoepassing met geavanceerde Gmail; er is geen configuratie voor een uitbreiding, Pub/Sub of Cloud Run aanwezig.
- Bewijs 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Eenmalige volledige conceptuele bestandscontrole bij de onveranderlijke vastlegging. Resultaat: De serverlaag van de uitgebreidere webinterface gebruikt Gmail REST-bewerkingen plus PropertiesService en vergrendelingen met duurzame cursors en leases.
- Bewijs 3: [apps-script/tests/mail_client.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_client.test.js); Opgenomen in TR-001 met de testuitvoerder van Node op gelijktijdigheid 1; geen toegang tot OAuth, Gmail, Telegram, Apps Script, productie, netwerk of geheimen. Resultaat: Testronde TR-001 slaagde voor nagebootste contracttesten van de webtoepassing, Gmail-automatisering, statusisolatie, cursors, vergrendelingen en achtergrondwerkers.
- Beperkingen: Onderdelen voor webtoepassing, Gmail en statusbeheer zijn met bewijs gestaafd; onderdelen voor uitbreiding, Pub/Sub en Cloud Run ontbreken, en betrouwbaarheid op platformniveau is ongeverifieerd.

## KH-EVD-029

- Status: `gedeeltelijk`
- Categorie: `KH-EVD`; type: `bewijs`
- Relevantie: Beïnvloedt de lokale broncode-indeling en het vrijgavegereedschap voor Apps Script.
- Bereik en niveau: `gemengd` / `E2`
- Bewering: Het rapport beschrijft `clasp` als een openbronroute voor lokale mapgerichte ontwikkeling, versiebeheer en uitrol.
- Implementatiestatus: gedeeltelijk
- Afhankelijkheden: Primaire documentatie of broncode van clasp; Een gevolgde of veilig verwezen clasp-projectconfiguratie voor volledig lokaal uitrolgebruik
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-E22](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md), [R3-E23](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); Volledige inspectie van de onveranderlijke configuratie. Resultaat: De broncodeopslagplaats bevat regels voor clasp-broncodepakketvorming voor een Apps Script-pakket van vijf bestanden.
- Bewijs 2: [apps-script/tools/release_apps_script_v37_product_v45.ps1](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tools/release_apps_script_v37_product_v45.ps1); Eenmalige inspectie van het onveranderlijke vrijgavehulpscript. Resultaat: Het v45-hulpscript voert afgeschermde REST-vrijgavebewerkingen voor Apps Script rechtstreeks uit; er is geen aanroep van clasp aangetroffen.
- Beperkingen: Een .claspignore-bestand bewijst uitsluitend gedeeltelijk gebruik van de lokale indeling; de algemene mogelijkheden voor openbroncode, versiebeheer en uitrol en een actieve clasp-uitrolconfiguratie zijn niet onafhankelijk geverifieerd.

## KH-EVD-030

- Status: `gedeeltelijk`
- Categorie: `KH-EVD`; type: `bewijs`
- Relevantie: Bepaalt de verwachte architectuur voor wijzigingssynchronisatie met Gmail.
- Bereik en niveau: `gemengd` / `E3`
- Bewering: Gmail `watch()` gebruikt Pub/Sub en `history.list`/`startHistoryId` voor wijzigingssynchronisatie.
- Implementatiestatus: gedeeltelijk, uitsluitend via wijzigingsgeschiedenis
- Afhankelijkheden: Actuele officiële documentatie van de Gmail API voor watch en geschiedenis; Alleen-lezen bewijs van uitgerolde configuratie van Pub/Sub en watch
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-E26](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Eenmalige volledige conceptuele bestandscontrole bij de onveranderlijke vastlegging. Resultaat: De broncodeopslagplaats implementeert een verzoek voor Gmail-geschiedenis met startHistoryId en cursorvoortgang; er is geen watch-aanroep of Pub/Sub-configuratie aangetroffen.
- Bewijs 2: [apps-script/tests/mail_actions.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_actions.test.js); Opgenomen in TR-001 met de testuitvoerder van Node op gelijktijdigheid 1; geen toegang tot OAuth, Gmail, Telegram, Apps Script, productie, netwerk of geheimen. Resultaat: Testronde TR-001 slaagde voor testen van de Gmail-geschiedenisbasislijn, gerichte wijzigingen, afgebakende bijwerkingen, herhaalpogingen, hervatting vanaf een momentopname en het herstellen van een verouderde cursor.
- Beperkingen: Alleen geschiedenissynchronisatie is lokaal geverifieerd; het gedrag van watch en Pub/Sub en het actuele externe koppelvlakcontract blijven ongeverifieerd.

## KH-HIS-001

- Status: `ongeverifieerd`
- Categorie: `KH-HIS`; type: `geschiedenis`
- Relevantie: gemiddeld
- Bereik en niveau: `broncodeopslagplaats` / `E1`
- Bewering: Ingesloten markeringen zoals `turn...view/search` zijn technische herkomstverwijzingen die tijdens de migratie afzonderlijk moeten worden opgelost.
- Implementatiestatus: geen concreet voorkomen van markering aangetroffen in de actieve boomstructuur
- Afhankelijkheden: Onveranderlijk origineel artefact met concrete markeringen; Koppelingstabel voor markeringsafhandeling
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R1-064](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Bewijs 1: [README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/README.md); Vastleggingsbrede Git-zoekopdracht naar concrete beurtnummers en weergave- of zoekmarkeringen, met uitzondering van de zes toegewezen beweringspagina's. Resultaat: Er zijn bij de vastgepinde vastlegging nul overeenkomende gevolgde voorkomens aangetroffen.
- Beperkingen: Een zoekopdracht zonder treffers in de actieve boomstructuur weerlegt niet dat de markering voorkwam in een niet-beschikbaar eerder besloten artefact. Veilig ontbrekend bewijs: een onveranderlijk origineel bronartefact met de concrete markering en het bijbehorende oplossingsdoel.

## KH-HIS-002

- Status: `ongeverifieerd`
- Categorie: `KH-HIS`; type: `geschiedenis`
- Relevantie: laag
- Bereik en niveau: `extern` / `E0`
- Bewering: Classificeer EmailEngine niet als vrije openbronsoftware: het rapport beschrijft het als voormalige openbronsoftware en thans als een commercieel, met broncode inzichtelijk e-mailplatform.
- Implementatiestatus: niet gebruikt in de geïnspecteerde broncodeopslagplaats
- Afhankelijkheden: Onveranderlijke licentiegeschiedenis van het bronproject; Gedateerde vrijgave- of licentieregistratie uit het bronproject
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R2-045](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Beperkingen: Projectrapporten vormen geen onafhankelijke bevestiging en er is geen primair artefact uit het bronproject geïnspecteerd. Veilig ontbrekend bewijs: een onveranderlijke vastlegging of vrijgave-artefact van EmailEngine waaruit de licentieovergang blijkt.

## KH-HIS-003

- Status: `ongeverifieerd`
- Categorie: `KH-HIS`; type: `geschiedenis`
- Relevantie: laag
- Bereik en niveau: `extern` / `E0`
- Bewering: Mailparser is aangemerkt als in onderhoudsmodus of verouderd; voor nieuwe projecten wordt PostalMime aanbevolen.
- Implementatiestatus: geen van beide afhankelijkheden aangetroffen in de geïnspecteerde broncodeopslagplaats
- Afhankelijkheden: Onveranderlijke onderhoudsverklaring van het bronproject; Gedateerde aanbeveling of migratieregistratie uit het bronproject
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R2-047](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Beperkingen: Projectrapporten vormen geen onafhankelijke bevestiging en er is geen primair artefact uit de bronprojecten geïnspecteerd. Veilig ontbrekend bewijs: onveranderlijke beheerdersdocumentatie of vrijgavedossiers uit het bronproject voor beide pakketten.

## KH-HIS-004

- Status: `gedeeltelijk`
- Categorie: `KH-HIS`; type: `geschiedenis`
- Relevantie: hoog
- Bereik en niveau: `gemengd` / `E1`
- Bewering: Het werk bouwt voort op de bestaande kern op `[PRIVATE]`, niet vanaf een lege begintoestand.
- Implementatiestatus: niet-lege kernafstamming geverifieerd, besloten oorsprong niet geïnspecteerd
- Afhankelijkheden: Geautoriseerd bewijs voor de geschoonde oorsprong, indien de locatie zelf geverifieerd moet worden
- Conflicten: geen
- Gevoeligheid: `geheimen-geschoond`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-001](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/b73327e2927cd812e032167e5662b2a3c4bcd100/apps-script/Code.gs); Inspectie van vastleggingsmetadata, afstamming en gewijzigde paden. Resultaat: De onveranderlijke voorouder behield een niet-lege basislijn op Apps Script v27 met serverlaag, minitoepassing, architectuur, testen, hulpmiddelen en controle-artefacten.
- Bewijs 2: [README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/README.md); Statische inspectie bij de vastgepinde vastlegging. Resultaat: Versie 1 is de actieve ontwikkellijn; de openbare productieomgeving wordt beschreven als nog draaiend op Apps Script v37 in afwachting van de acceptatie van Versie 1. De broncodeopslagplaats sluit uitvoeringsstatus en inloggegevens uit.
- Beperkingen: Onveranderlijke Git-afstamming bevestigt voortzetting vanuit een omvangrijke bestaande Apps Script-kern. De geschoonde besloten oorsprong is opzettelijk niet benaderd, zodat die locatie ongeverifieerd blijft.

## KH-HIS-005

- Status: `weerlegd`
- Categorie: `KH-HIS`; type: `geschiedenis`
- Relevantie: hoog
- Bereik en niveau: `bestuur` / `E2`
- Bewering: `gmail-telegram-v45-gentle-milestones` is aangewezen als het huidige basisartefact.
- Implementatiestatus: vervangen door het bestuur van Versie 1
- Afhankelijkheden: geen
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-002](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/README.md); Statische inspectie bij de vastgepinde vastlegging. Resultaat: Versie 1 is de actieve ontwikkellijn; de openbare productieomgeving wordt beschreven als nog draaiend op Apps Script v37 in afwachting van de acceptatie van Versie 1. De broncodeopslagplaats sluit uitvoeringsstatus en inloggegevens uit.
- Bewijs 2: [docs/en/releases/VERSIE-001-2026-07-19.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/releases/VERSIE-001-2026-07-19.md); Statische inspectie van vrijgave-artefacten bij de vastgepinde vastlegging. Resultaat: Het actieve vrijgave-artefact is Versie 1, terwijl de eerdere productiebasislijn op Apps Script v37 afzonderlijk beschreven blijft.
- Bewijs 3: [instructions/KNOWLEDGE_HUB_MAINTENANCE.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/10630a566e81ff92542cea173d9021c764a7ec1a/instructions/KNOWLEDGE_HUB_MAINTENANCE.md); Statische inspectie op het uiteinde van de canonieke instructievertakking. Resultaat: Het vaste bestuur vereist afstemming vóór uitspraken over de live status en bepaalt dat uit rapporten afgeleide beweringen niet zonder nieuw bewijs als live geverifieerd gelden.
- Beperkingen: De mapnaam en v45-artefacten blijven historische afstamming, maar de vastgepinde broncodeopslagplaats en het vaste bestuur wijzen Versie 1 aan als de actieve werklijn. Dit houdt geen uitspraak in over de huidige uitrol in de uitvoeringsomgeving.

## KH-HIS-006

- Status: `gedeeltelijk`
- Categorie: `KH-HIS`; type: `geschiedenis`
- Relevantie: gemiddeld
- Bereik en niveau: `broncodeopslagplaats` / `E1`
- Bewering: `gmail-telegram-v44-co-processing`, `gmail-telegram-notifier` en andere uitgavelijnen blijven behouden als eerdere ervaring.
- Implementatiestatus: afstamming van v44, v45 en eerdere vastleggingen behouden, afzonderlijk melder-artefact niet geïdentificeerd
- Afhankelijkheden: Onveranderlijk artefact dat de genoemde lijn gmail-telegram-notifier identificeert
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-003](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [docs/operations/v44-co-processing-presence.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/7413454aa03581dbedaf75eab0e1c38b12e8bf8b/docs/operations/v44-co-processing-presence.md); Inspectie van vastleggingsmetadata, afstamming en gewijzigde paden. Resultaat: De onveranderlijke voorouder voegde de v44-lijn voor gezamenlijke verwerking toe en behield de bijbehorende implementatie- en documentatie-artefacten.
- Bewijs 2: [docs/product/gentle-milestones-v45.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/fa15f11987c1435ca8975594780c8a1d1c91508d/docs/product/gentle-milestones-v45.md); Inspectie van vastleggingsmetadata, afstamming en de gevolgde bestandsboom. Resultaat: De onveranderlijke voorouder consolideerde product v45 op Apps Script v37; de naar v45 genoemde artefacten voor vrijgave, controle, product en menu blijven gevolgd.
- Bewijs 3: [README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/README.md); Statische inspectie bij de vastgepinde vastlegging. Resultaat: Versie 1 is de actieve ontwikkellijn; de openbare productieomgeving wordt beschreven als nog draaiend op Apps Script v37 in afwachting van de acceptatie van Versie 1. De broncodeopslagplaats sluit uitvoeringsstatus en inloggegevens uit.
- Beperkingen: Git-verwijzingen, vooroudervastleggingen en gevolgde v44- en v45-artefacten bevestigen het behoud van eerdere vrijgavelijnen. Er is tijdens de bewijsronde in de actieve boomstructuur geen afzonderlijk genoemd artefact voor gmail-telegram-notifier aangetroffen.

## KH-INS-001

- Status: `aanbeveling`
- Categorie: `KH-INS`; type: `instructie`
- Relevantie: actueel
- Bereik en niveau: `gemengd` / `E2`
- Bewering: De gebruikersinterface moet één dominante actie, stabiele context, lage informatiedichtheid, duidelijke voortgang, heldere prioriteiten en exacte hervatting na een onderbreking bieden.
- Implementatiestatus: gedeeltelijk geïmplementeerd maar niet canoniek overgenomen
- Afhankelijkheden: REQ-0003; expliciete overname door de eigenaar in het canonieke onderdeel instructies
- Conflicten: CF-001
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R1-005](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Bewijs 1: [docs/en/knowledge-hub/INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/INSTRUCTIONS.md); Eenmalige lezing van het toegewezen paginapaar bij de onveranderlijke actieve vastlegging. Resultaat: Tweetalige ID's, bron-ID's, conflicten en formuleringen komen overeen; de pagina bestempelt het item als uit rapporten afgeleid en niet-gezaghebbend.
- Bewijs 2: [INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/10630a566e81ff92542cea173d9021c764a7ec1a/INSTRUCTIONS.md); Het uiteinde van de canonieke instructievertakking, het bijbehorende AGENTS.md-bestand en beide bestanden in instructions/ eenmalig gelezen. Resultaat: Er bestaat geen expliciete of via ID gekoppelde overname van KH-INS-001; volgens het canonieke beheer van het kenniscentrum worden kandidaten pas vast in het onderdeel instructies.
- Bewijs 3: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Enkelvoudige alleen-lezen lexicale en identificatorinspectie van zes gevolgde implementatiebestanden; geen code uitgevoerd. Resultaat: Markeringen voor primaire actie (30), dichtheid (18) en voortgang (25) plus identificatoren voor focus en sessie bestaan; één dominante actie en exacte hervatting zijn niet bewezen.
- Beperkingen: Acceptatie van de weergegeven status en onderbrekingsafhandeling ontbreekt.

## KH-INS-002

- Status: `aanbeveling`
- Categorie: `KH-INS`; type: `instructie`
- Relevantie: actueel
- Bereik en niveau: `gemengd` / `E2`
- Bewering: Definieer voor elk bericht één visueel primaire vervolgactie.
- Implementatiestatus: gedeeltelijk geïmplementeerd maar niet canoniek overgenomen
- Afhankelijkheden: REQ-0003; expliciete overname door de eigenaar in het canonieke onderdeel instructies
- Conflicten: CF-001, CF-003
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R1-014](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md), [R3-012](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [docs/en/knowledge-hub/INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/INSTRUCTIONS.md); Eenmalige lezing van het toegewezen paginapaar bij de onveranderlijke actieve vastlegging. Resultaat: Tweetalige ID's, bron-ID's, conflicten en formuleringen komen overeen; de pagina bestempelt het item als uit rapporten afgeleid en niet-gezaghebbend.
- Bewijs 2: [INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/10630a566e81ff92542cea173d9021c764a7ec1a/INSTRUCTIONS.md); Het uiteinde van de canonieke instructievertakking, het bijbehorende AGENTS.md-bestand en beide bestanden in instructions/ eenmalig gelezen. Resultaat: Er bestaat geen expliciete of via ID gekoppelde overname van KH-INS-002; volgens het canonieke beheer van het kenniscentrum worden kandidaten pas vast in het onderdeel instructies.
- Bewijs 3: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Enkelvoudige alleen-lezen lexicale en identificatorinspectie van zes gevolgde implementatiebestanden; geen code uitgevoerd. Resultaat: Markeringen voor primaire acties bestaan in MailApp.html (30) en MailClient.gs (12), maar exact één primaire actie per berichtstatus is niet vastgesteld.
- Beperkingen: Een inventarisatie van weergegeven acties per bericht ontbreekt.

## KH-INS-003

- Status: `aanbeveling`
- Categorie: `KH-INS`; type: `instructie`
- Relevantie: actueel
- Bereik en niveau: `gemengd` / `E2`
- Bewering: Gebruik neutrale, ondersteunende en niet-veroordelende taal.
- Implementatiestatus: niet vastgesteld en niet canoniek overgenomen
- Afhankelijkheden: REQ-0003; expliciete overname door de eigenaar in het canonieke onderdeel instructies
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R1-022](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md), [R1-027](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Bewijs 1: [docs/en/knowledge-hub/INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/INSTRUCTIONS.md); Eenmalige lezing van het toegewezen paginapaar bij de onveranderlijke actieve vastlegging. Resultaat: Tweetalige ID's, bron-ID's, conflicten en formuleringen komen overeen; de pagina bestempelt het item als uit rapporten afgeleid en niet-gezaghebbend.
- Bewijs 2: [INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/10630a566e81ff92542cea173d9021c764a7ec1a/INSTRUCTIONS.md); Het uiteinde van de canonieke instructievertakking, het bijbehorende AGENTS.md-bestand en beide bestanden in instructions/ eenmalig gelezen. Resultaat: Er bestaat geen expliciete of via ID gekoppelde overname van KH-INS-003; volgens het canonieke beheer van het kenniscentrum worden kandidaten pas vast in het onderdeel instructies.
- Bewijs 3: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Enkelvoudige alleen-lezen lexicale en identificatorinspectie van zes gevolgde implementatiebestanden; geen code uitgevoerd. Resultaat: Er is geen expliciete beleidsmarkering voor neutraal, ondersteunend en niet-veroordelend taalgebruik aangetroffen; de afwezigheid van een letterlijk trefwoord kan de kwaliteit van de formulering niet beoordelen.
- Beperkingen: Een volledige tweetalige controle van interfaceteksten en acceptatie door de eigenaar ontbreken.

## KH-INS-004

- Status: `aanbeveling`
- Categorie: `KH-INS`; type: `instructie`
- Relevantie: actueel
- Bereik en niveau: `gemengd` / `E2`
- Bewering: De focusmodus mag niet meer dan drie of vier primaire acties tonen.
- Implementatiestatus: gedeeltelijk geïmplementeerd maar niet canoniek overgenomen
- Afhankelijkheden: REQ-0003; expliciete overname door de eigenaar in het canonieke onderdeel instructies
- Conflicten: CF-001
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R1-024](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Bewijs 1: [docs/en/knowledge-hub/INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/INSTRUCTIONS.md); Eenmalige lezing van het toegewezen paginapaar bij de onveranderlijke actieve vastlegging. Resultaat: Tweetalige ID's, bron-ID's, conflicten en formuleringen komen overeen; de pagina bestempelt het item als uit rapporten afgeleid en niet-gezaghebbend.
- Bewijs 2: [INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/10630a566e81ff92542cea173d9021c764a7ec1a/INSTRUCTIONS.md); Het uiteinde van de canonieke instructievertakking, het bijbehorende AGENTS.md-bestand en beide bestanden in instructions/ eenmalig gelezen. Resultaat: Er bestaat geen expliciete of via ID gekoppelde overname van KH-INS-004; volgens het canonieke beheer van het kenniscentrum worden kandidaten pas vast in het onderdeel instructies.
- Bewijs 3: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Enkelvoudige alleen-lezen lexicale en identificatorinspectie van zes gevolgde implementatiebestanden; geen code uitgevoerd. Resultaat: Markeringen voor focusmodus (11) en primaire acties (30) bestaan, maar het weergegeven aantal primaire acties is niet geteld.
- Beperkingen: De grens van drie tot vier acties vereist een deterministisch interfacecontract of inspectie van de weergegeven interface.

## KH-INS-005

- Status: `aanbeveling`
- Categorie: `KH-INS`; type: `instructie`
- Relevantie: actueel
- Bereik en niveau: `gemengd` / `E2`
- Bewering: WCAG 2.2 moet worden behandeld als het minimum en COGA als de kwaliteitsnorm voor structuur, focus, geheugenondersteuning, samenvattingen, personalisatie, menselijke hulp en onderbrekingsbeheer.
- Implementatiestatus: niet vastgesteld en niet canoniek overgenomen
- Afhankelijkheden: REQ-0003; expliciete overname door de eigenaar in het canonieke onderdeel instructies
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R1-073](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Bewijs 1: [docs/en/knowledge-hub/INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/INSTRUCTIONS.md); Eenmalige lezing van het toegewezen paginapaar bij de onveranderlijke actieve vastlegging. Resultaat: Tweetalige ID's, bron-ID's, conflicten en formuleringen komen overeen; de pagina bestempelt het item als uit rapporten afgeleid en niet-gezaghebbend.
- Bewijs 2: [INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/10630a566e81ff92542cea173d9021c764a7ec1a/INSTRUCTIONS.md); Het uiteinde van de canonieke instructievertakking, het bijbehorende AGENTS.md-bestand en beide bestanden in instructions/ eenmalig gelezen. Resultaat: Er bestaat geen expliciete of via ID gekoppelde overname van KH-INS-005; volgens het canonieke beheer van het kenniscentrum worden kandidaten pas vast in het onderdeel instructies.
- Bewijs 3: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Enkelvoudige alleen-lezen lexicale en identificatorinspectie van zes gevolgde implementatiebestanden; geen code uitgevoerd. Resultaat: Er is geen markering voor WCAG of COGA aangetroffen; focusgerelateerde broncode stelt op zichzelf geen naleving vast.
- Beperkingen: Er is geen criteriumkoppeling, toegankelijkheidscontrole of bewijs met ondersteunende technologie beoordeeld.

## KH-INS-006

- Status: `aanbeveling`
- Categorie: `KH-INS`; type: `instructie`
- Relevantie: actueel
- Bereik en niveau: `gemengd` / `E2`
- Bewering: De focusmodus moet een afzonderlijke informatiearchitectuur zijn met één taak op het scherm, geen cosmetisch thema.
- Implementatiestatus: gedeeltelijk geïmplementeerd maar niet canoniek overgenomen
- Afhankelijkheden: REQ-0003; expliciete overname door de eigenaar in het canonieke onderdeel instructies
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R1-074](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Bewijs 1: [docs/en/knowledge-hub/INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/INSTRUCTIONS.md); Eenmalige lezing van het toegewezen paginapaar bij de onveranderlijke actieve vastlegging. Resultaat: Tweetalige ID's, bron-ID's, conflicten en formuleringen komen overeen; de pagina bestempelt het item als uit rapporten afgeleid en niet-gezaghebbend.
- Bewijs 2: [INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/10630a566e81ff92542cea173d9021c764a7ec1a/INSTRUCTIONS.md); Het uiteinde van de canonieke instructievertakking, het bijbehorende AGENTS.md-bestand en beide bestanden in instructions/ eenmalig gelezen. Resultaat: Er bestaat geen expliciete of via ID gekoppelde overname van KH-INS-006; volgens het canonieke beheer van het kenniscentrum worden kandidaten pas vast in het onderdeel instructies.
- Bewijs 3: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Enkelvoudige alleen-lezen lexicale en identificatorinspectie van zes gevolgde implementatiebestanden; geen code uitgevoerd. Resultaat: Afzonderlijke functies voor weergeven, laden en schakelen van de focusmodus bestaan; een informatiearchitectuur met één taak is niet vastgesteld.
- Beperkingen: Statische aanwezigheid van functies bewijst niet de weergegeven informatiearchitectuur.

## KH-INS-007

- Status: `aanbeveling`
- Categorie: `KH-INS`; type: `instructie`
- Relevantie: actueel
- Bereik en niveau: `gemengd` / `E2`
- Bewering: Het systeem moet contextverlies minimaliseren en positie, concept, tijdelijke classificatie, laatste gesprek en tussenliggende beslissingen bewaren.
- Implementatiestatus: gedeeltelijk geïmplementeerd maar niet canoniek overgenomen
- Afhankelijkheden: REQ-0003; expliciete overname door de eigenaar in het canonieke onderdeel instructies
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R1-026](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Bewijs 1: [docs/en/knowledge-hub/INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/INSTRUCTIONS.md); Eenmalige lezing van het toegewezen paginapaar bij de onveranderlijke actieve vastlegging. Resultaat: Tweetalige ID's, bron-ID's, conflicten en formuleringen komen overeen; de pagina bestempelt het item als uit rapporten afgeleid en niet-gezaghebbend.
- Bewijs 2: [INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/10630a566e81ff92542cea173d9021c764a7ec1a/INSTRUCTIONS.md); Het uiteinde van de canonieke instructievertakking, het bijbehorende AGENTS.md-bestand en beide bestanden in instructions/ eenmalig gelezen. Resultaat: Er bestaat geen expliciete of via ID gekoppelde overname van KH-INS-007; volgens het canonieke beheer van het kenniscentrum worden kandidaten pas vast in het onderdeel instructies.
- Bewijs 3: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Enkelvoudige alleen-lezen lexicale en identificatorinspectie van zes gevolgde implementatiebestanden; geen code uitgevoerd. Resultaat: Identificatoren voor concepten, classificatie, sessie, herstel en focusstatus bestaan, maar het behoud van elk genoemd onderdeel is niet bewezen.
- Beperkingen: Testen voor toestandsovergangen of alleen-lezen acceptatie in de uitvoeringsomgeving ontbreken.

## KH-INS-008

- Status: `aanbeveling`
- Categorie: `KH-INS`; type: `instructie`
- Relevantie: actueel
- Bereik en niveau: `gemengd` / `E2`
- Bewering: Personalisatie moet adaptief, scenariogericht en geleidelijk zijn, met eenvoudige voorinstellingen in plaats van langdurige configuratie.
- Implementatiestatus: gedeeltelijk geïmplementeerd maar niet canoniek overgenomen
- Afhankelijkheden: REQ-0003; expliciete overname door de eigenaar in het canonieke onderdeel instructies
- Conflicten: CF-004
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R1-028](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Bewijs 1: [docs/en/knowledge-hub/INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/INSTRUCTIONS.md); Eenmalige lezing van het toegewezen paginapaar bij de onveranderlijke actieve vastlegging. Resultaat: Tweetalige ID's, bron-ID's, conflicten en formuleringen komen overeen; de pagina bestempelt het item als uit rapporten afgeleid en niet-gezaghebbend.
- Bewijs 2: [INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/10630a566e81ff92542cea173d9021c764a7ec1a/INSTRUCTIONS.md); Het uiteinde van de canonieke instructievertakking, het bijbehorende AGENTS.md-bestand en beide bestanden in instructions/ eenmalig gelezen. Resultaat: Er bestaat geen expliciete of via ID gekoppelde overname van KH-INS-008; volgens het canonieke beheer van het kenniscentrum worden kandidaten pas vast in het onderdeel instructies.
- Bewijs 3: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Enkelvoudige alleen-lezen lexicale en identificatorinspectie van zes gevolgde implementatiebestanden; geen code uitgevoerd. Resultaat: Dichtheidsmarkeringen (18) en functies voor focusconfiguratie en voorinstellingen bestaan; geleidelijke scenariogebaseerde aanpassing is niet vastgesteld.
- Beperkingen: Er is geen gedragsbewijs dat adaptieve voortgang of een lagere instellingsbelasting aantoont.

## KH-INS-009

- Status: `aanbeveling`
- Categorie: `KH-INS`; type: `instructie`
- Relevantie: actueel
- Bereik en niveau: `gemengd` / `E2`
- Bewering: Een door kunstmatige intelligentie gegenereerde samenvatting moet bronverwijzingen, een betrouwbaarheidsindicatie en snelle toegang tot het origineel bevatten.
- Implementatiestatus: gedeeltelijk geïmplementeerd maar niet canoniek overgenomen
- Afhankelijkheden: REQ-0003; expliciete overname door de eigenaar in het canonieke onderdeel instructies
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R1-033](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Bewijs 1: [docs/en/knowledge-hub/INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/INSTRUCTIONS.md); Eenmalige lezing van het toegewezen paginapaar bij de onveranderlijke actieve vastlegging. Resultaat: Tweetalige ID's, bron-ID's, conflicten en formuleringen komen overeen; de pagina bestempelt het item als uit rapporten afgeleid en niet-gezaghebbend.
- Bewijs 2: [INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/10630a566e81ff92542cea173d9021c764a7ec1a/INSTRUCTIONS.md); Het uiteinde van de canonieke instructievertakking, het bijbehorende AGENTS.md-bestand en beide bestanden in instructions/ eenmalig gelezen. Resultaat: Er bestaat geen expliciete of via ID gekoppelde overname van KH-INS-009; volgens het canonieke beheer van het kenniscentrum worden kandidaten pas vast in het onderdeel instructies.
- Bewijs 3: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Enkelvoudige alleen-lezen lexicale en identificatorinspectie van zes gevolgde implementatiebestanden; geen code uitgevoerd. Resultaat: Markeringen voor samenvatting (55), betrouwbaarheid (13) en bron- of origineelkoppeling (9) bestaan, naast aanvullende serverzijdige markeringen voor samenvatting en betrouwbaarheid.
- Beperkingen: Geen enkele test verifieert de nauwkeurigheid van bronverwijzingen, de betekenis van de betrouwbaarheidsscore of de navigatie naar het origineel.

## KH-INS-010

- Status: `aanbeveling`
- Categorie: `KH-INS`; type: `instructie`
- Relevantie: actueel
- Bereik en niveau: `gemengd` / `E2`
- Bewering: De visuele weergave moet weinig kleuren, één accentkleur, grote klikdoelen, een zichtbare focusstatus en instelbare informatiedichtheid gebruiken.
- Implementatiestatus: gedeeltelijk geïmplementeerd maar niet canoniek overgenomen
- Afhankelijkheden: REQ-0003; expliciete overname door de eigenaar in het canonieke onderdeel instructies
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R1-048](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Bewijs 1: [docs/en/knowledge-hub/INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/INSTRUCTIONS.md); Eenmalige lezing van het toegewezen paginapaar bij de onveranderlijke actieve vastlegging. Resultaat: Tweetalige ID's, bron-ID's, conflicten en formuleringen komen overeen; de pagina bestempelt het item als uit rapporten afgeleid en niet-gezaghebbend.
- Bewijs 2: [INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/10630a566e81ff92542cea173d9021c764a7ec1a/INSTRUCTIONS.md); Het uiteinde van de canonieke instructievertakking, het bijbehorende AGENTS.md-bestand en beide bestanden in instructions/ eenmalig gelezen. Resultaat: Er bestaat geen expliciete of via ID gekoppelde overname van KH-INS-010; volgens het canonieke beheer van het kenniscentrum worden kandidaten pas vast in het onderdeel instructies.
- Bewijs 3: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Enkelvoudige alleen-lezen lexicale en identificatorinspectie van zes gevolgde implementatiebestanden; geen code uitgevoerd. Resultaat: Broncode voor focusstatus en dichtheid bestaat; het aantal paletkleuren, de uniciteit van de accentkleur en de afmetingen van klikdoelen zijn niet gemeten.
- Beperkingen: Een controle van stijlbladen en weergegeven toegankelijkheid ontbreekt.

## KH-INS-011

- Status: `aanbeveling`
- Categorie: `KH-INS`; type: `instructie`
- Relevantie: architectuur
- Bereik en niveau: `gemengd` / `E2`
- Bewering: Schrijf geen eigen mailtransport-, mailafleverings- of groepswerksysteem vanaf nul; stel het product samen uit bewezen servercomponenten.
- Implementatiestatus: in overeenstemming met de huidige architectuur maar niet canoniek overgenomen
- Afhankelijkheden: REQ-0003; expliciete overname door de eigenaar in het canonieke onderdeel instructies
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R2-013](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Bewijs 1: [docs/en/knowledge-hub/INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/INSTRUCTIONS.md); Eenmalige lezing van het toegewezen paginapaar bij de onveranderlijke actieve vastlegging. Resultaat: Tweetalige ID's, bron-ID's, conflicten en formuleringen komen overeen; de pagina bestempelt het item als uit rapporten afgeleid en niet-gezaghebbend.
- Bewijs 2: [INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/10630a566e81ff92542cea173d9021c764a7ec1a/INSTRUCTIONS.md); Het uiteinde van de canonieke instructievertakking, het bijbehorende AGENTS.md-bestand en beide bestanden in instructions/ eenmalig gelezen. Resultaat: Er bestaat geen expliciete of via ID gekoppelde overname van KH-INS-011; volgens het canonieke beheer van het kenniscentrum worden kandidaten pas vast in het onderdeel instructies.
- Bewijs 3: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Enkelvoudige alleen-lezen lexicale en identificatorinspectie van zes gevolgde implementatiebestanden; geen code uitgevoerd. Resultaat: Het gevolgde product is een client op basis van Apps Script en de Gmail API met beheerde Google- en Box-eindpunten; er is geen afzonderlijk pad met eigen mailservercomponenten aangetroffen.
- Beperkingen: De architectuur van de broncodeopslagplaats bewijst niet de volledige externe infrastructuur.

## KH-INS-012

- Status: `aanbeveling`
- Categorie: `KH-INS`; type: `instructie`
- Relevantie: architectuur
- Bereik en niveau: `gemengd` / `E2`
- Bewering: Scheid transportbeveiliging, domeinauthenticiteit, inhoudsbescherming en verdediging tegen misbruik en phishing; pas TLS, MTA-STS, TLS-RPT en, in combinatie met DNSSEC, DANE toe.
- Implementatiestatus: niet geïmplementeerd in de gevolgde clienttoepassing
- Afhankelijkheden: REQ-0003; expliciete overname door de eigenaar in het canonieke onderdeel instructies
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R2-033](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Bewijs 1: [docs/en/knowledge-hub/INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/INSTRUCTIONS.md); Eenmalige lezing van het toegewezen paginapaar bij de onveranderlijke actieve vastlegging. Resultaat: Tweetalige ID's, bron-ID's, conflicten en formuleringen komen overeen; de pagina bestempelt het item als uit rapporten afgeleid en niet-gezaghebbend.
- Bewijs 2: [INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/10630a566e81ff92542cea173d9021c764a7ec1a/INSTRUCTIONS.md); Het uiteinde van de canonieke instructievertakking, het bijbehorende AGENTS.md-bestand en beide bestanden in instructions/ eenmalig gelezen. Resultaat: Er bestaat geen expliciete of via ID gekoppelde overname van KH-INS-012; volgens het canonieke beheer van het kenniscentrum worden kandidaten pas vast in het onderdeel instructies.
- Bewijs 3: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Enkelvoudige alleen-lezen lexicale en identificatorinspectie van zes gevolgde implementatiebestanden; geen code uitgevoerd. Resultaat: Er is geen markering voor MTA-STS, TLS-RPT, DANE of DNSSEC aangetroffen; deze broncodeopslagplaats is een Gmail-client, geen domein-mailinfrastructuur.
- Beperkingen: Externe DNS- en e-maildomeinconfiguraties zijn niet geïnspecteerd.

## KH-INS-013

- Status: `aanbeveling`
- Categorie: `KH-INS`; type: `instructie`
- Relevantie: architectuur
- Bereik en niveau: `gemengd` / `E2`
- Bewering: Bouw geen eigen e-mailserver; investeer in gebruikerservaring, interoperabiliteit, gegevensbescherming, slimme triage en beheerde ecosysteemintegraties.
- Implementatiestatus: gedeeltelijk geïmplementeerd maar niet canoniek overgenomen
- Afhankelijkheden: REQ-0003; expliciete overname door de eigenaar in het canonieke onderdeel instructies
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R2-079](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Bewijs 1: [docs/en/knowledge-hub/INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/INSTRUCTIONS.md); Eenmalige lezing van het toegewezen paginapaar bij de onveranderlijke actieve vastlegging. Resultaat: Tweetalige ID's, bron-ID's, conflicten en formuleringen komen overeen; de pagina bestempelt het item als uit rapporten afgeleid en niet-gezaghebbend.
- Bewijs 2: [INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/10630a566e81ff92542cea173d9021c764a7ec1a/INSTRUCTIONS.md); Het uiteinde van de canonieke instructievertakking, het bijbehorende AGENTS.md-bestand en beide bestanden in instructions/ eenmalig gelezen. Resultaat: Er bestaat geen expliciete of via ID gekoppelde overname van KH-INS-013; volgens het canonieke beheer van het kenniscentrum worden kandidaten pas vast in het onderdeel instructies.
- Bewijs 3: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Enkelvoudige alleen-lezen lexicale en identificatorinspectie van zes gevolgde implementatiebestanden; geen code uitgevoerd. Resultaat: Beheerde integratie met Gmail, Telegram en Box en omvangrijke code voor gebruikerservaring en triage bestaan; er is geen pad met eigen mailservercomponenten aangetroffen.
- Beperkingen: Investeringsprioriteit is niet objectief verifieerbaar; de volledigheid van de gegevensbescherming staat nog open.

## KH-INS-014

- Status: `aanbeveling`
- Categorie: `KH-INS`; type: `instructie`
- Relevantie: actueel
- Bereik en niveau: `bestuur` / `E1`
- Bewering: Gebruik logboeken, controlepunten, auditaantekeningen, testsporen en geleerde lessen; herhaal afgeronde fasen niet zonder beoordeling.
- Implementatiestatus: gedeeltelijk weerspiegeld maar niet canoniek overgenomen
- Afhankelijkheden: REQ-0003; expliciete overname door de eigenaar in het canonieke onderdeel instructies
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-004](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [docs/en/knowledge-hub/INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/INSTRUCTIONS.md); Eenmalige lezing van het toegewezen paginapaar bij de onveranderlijke actieve vastlegging. Resultaat: Tweetalige ID's, bron-ID's, conflicten en formuleringen komen overeen; de pagina bestempelt het item als uit rapporten afgeleid en niet-gezaghebbend.
- Bewijs 2: [INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/10630a566e81ff92542cea173d9021c764a7ec1a/INSTRUCTIONS.md); Het uiteinde van de canonieke instructievertakking, het bijbehorende AGENTS.md-bestand en beide bestanden in instructions/ eenmalig gelezen. Resultaat: Er bestaat geen expliciete of via ID gekoppelde overname van KH-INS-014; volgens het canonieke beheer van het kenniscentrum worden kandidaten pas vast in het onderdeel instructies.
- Bewijs 3: [AGENTS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/AGENTS.md); Eenmalig gelezen bij de toegewezen vastlegging. Resultaat: Regelt de routering van verzoeken, bewijsvoering, omgang met geheimen en vrijgavepoorten; neemt geen enkele KH-INS-ID over.
- Beperkingen: Er bestaat geen canonieke overname van KH-INS-014.

## KH-INS-015

- Status: `aanbeveling`
- Categorie: `KH-INS`; type: `instructie`
- Relevantie: actueel
- Bereik en niveau: `bestuur` / `E1`
- Bewering: Werkvolgorde: productkern, hoofdprompt, implementatierecept, controle en operationele cyclus; verifieer mogelijkheden in de daadwerkelijke omgeving.
- Implementatiestatus: gedeeltelijk weerspiegeld maar niet canoniek overgenomen
- Afhankelijkheden: REQ-0003; expliciete overname door de eigenaar in het canonieke onderdeel instructies
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-009](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [docs/en/knowledge-hub/INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/INSTRUCTIONS.md); Eenmalige lezing van het toegewezen paginapaar bij de onveranderlijke actieve vastlegging. Resultaat: Tweetalige ID's, bron-ID's, conflicten en formuleringen komen overeen; de pagina bestempelt het item als uit rapporten afgeleid en niet-gezaghebbend.
- Bewijs 2: [INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/10630a566e81ff92542cea173d9021c764a7ec1a/INSTRUCTIONS.md); Het uiteinde van de canonieke instructievertakking, het bijbehorende AGENTS.md-bestand en beide bestanden in instructions/ eenmalig gelezen. Resultaat: Er bestaat geen expliciete of via ID gekoppelde overname van KH-INS-015; volgens het canonieke beheer van het kenniscentrum worden kandidaten pas vast in het onderdeel instructies.
- Beperkingen: De canonieke volgorde is gericht op verzoeken en vrijgaven, niet op deze reeks; verificatie van mogelijkheden in de uitvoeringsomgeving was verboden.

## KH-INS-016

- Status: `aanbeveling`
- Categorie: `KH-INS`; type: `instructie`
- Relevantie: actueel
- Bereik en niveau: `bestuur` / `E1`
- Bewering: De agent moet optreden als productarchitect, Workspace-ingenieur, toegankelijkheidsonderzoeker, beveiligingsbeoordelaar en vrijgave-ingenieur, en een technisch opleveringsprogramma opstellen.
- Implementatiestatus: niet van toepassing op de uitvoeringsomgeving van het product en niet canoniek overgenomen
- Afhankelijkheden: REQ-0003; expliciete overname door de eigenaar in het canonieke onderdeel instructies
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-022](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [docs/en/knowledge-hub/INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/INSTRUCTIONS.md); Eenmalige lezing van het toegewezen paginapaar bij de onveranderlijke actieve vastlegging. Resultaat: Tweetalige ID's, bron-ID's, conflicten en formuleringen komen overeen; de pagina bestempelt het item als uit rapporten afgeleid en niet-gezaghebbend.
- Bewijs 2: [INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/10630a566e81ff92542cea173d9021c764a7ec1a/INSTRUCTIONS.md); Het uiteinde van de canonieke instructievertakking, het bijbehorende AGENTS.md-bestand en beide bestanden in instructions/ eenmalig gelezen. Resultaat: Er bestaat geen expliciete of via ID gekoppelde overname van KH-INS-016; volgens het canonieke beheer van het kenniscentrum worden kandidaten pas vast in het onderdeel instructies.
- Beperkingen: Deze rolaanbeveling heeft geen expliciete overname door de eigenaar.

## KH-INS-017

- Status: `aanbeveling`
- Categorie: `KH-INS`; type: `instructie`
- Relevantie: actueel
- Bereik en niveau: `bestuur` / `E1`
- Bewering: De agent moet de onderdelen A tot en met R opleveren over architectuur, gebruikerservaring, modules, toegangsbereiken, OAuth, integraties, controle, bouw-, foutopsporings- en vrijgaveplannen, testen, werkvoorraad, herstelwijzigingen en terugvalroutes.
- Implementatiestatus: niet van toepassing op de uitvoeringsomgeving van het product en niet canoniek overgenomen
- Afhankelijkheden: REQ-0003; expliciete overname door de eigenaar in het canonieke onderdeel instructies
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-031](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [docs/en/knowledge-hub/INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/INSTRUCTIONS.md); Eenmalige lezing van het toegewezen paginapaar bij de onveranderlijke actieve vastlegging. Resultaat: Tweetalige ID's, bron-ID's, conflicten en formuleringen komen overeen; de pagina bestempelt het item als uit rapporten afgeleid en niet-gezaghebbend.
- Bewijs 2: [INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/10630a566e81ff92542cea173d9021c764a7ec1a/INSTRUCTIONS.md); Het uiteinde van de canonieke instructievertakking, het bijbehorende AGENTS.md-bestand en beide bestanden in instructions/ eenmalig gelezen. Resultaat: Er bestaat geen expliciete of via ID gekoppelde overname van KH-INS-017; volgens het canonieke beheer van het kenniscentrum worden kandidaten pas vast in het onderdeel instructies.
- Beperkingen: Er bestaat geen canoniek A-tot-R-sjabloon of overname door de eigenaar.

## KH-INS-018

- Status: `aanbeveling`
- Categorie: `KH-INS`; type: `instructie`
- Relevantie: actueel
- Bereik en niveau: `bestuur` / `E1`
- Bewering: Licht bij aanbevelingen het probleem, de onderbouwing en de valkuilen toe; benoem platformbeperkingen rechtstreeks en geef een werkbare omweg.
- Implementatiestatus: niet van toepassing op de uitvoeringsomgeving van het product en niet canoniek overgenomen
- Afhankelijkheden: REQ-0003; expliciete overname door de eigenaar in het canonieke onderdeel instructies
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-032](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [docs/en/knowledge-hub/INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/INSTRUCTIONS.md); Eenmalige lezing van het toegewezen paginapaar bij de onveranderlijke actieve vastlegging. Resultaat: Tweetalige ID's, bron-ID's, conflicten en formuleringen komen overeen; de pagina bestempelt het item als uit rapporten afgeleid en niet-gezaghebbend.
- Bewijs 2: [INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/10630a566e81ff92542cea173d9021c764a7ec1a/INSTRUCTIONS.md); Het uiteinde van de canonieke instructievertakking, het bijbehorende AGENTS.md-bestand en beide bestanden in instructions/ eenmalig gelezen. Resultaat: Er bestaat geen expliciete of via ID gekoppelde overname van KH-INS-018; volgens het canonieke beheer van het kenniscentrum worden kandidaten pas vast in het onderdeel instructies.
- Beperkingen: De kwaliteit van het document wordt niet bewezen door de aanwezigheid ervan; overname door de eigenaar ontbreekt.

## KH-INS-019

- Status: `aanbeveling`
- Categorie: `KH-INS`; type: `instructie`
- Relevantie: architectuur
- Bereik en niveau: `gemengd` / `E2`
- Bewering: Wanneer een hybride architectuur met Apps Script, Cloud Run, Pub/Sub en opslag nodig is, ontwerp deze dan expliciet.
- Implementatiestatus: niet geïmplementeerd in de gevolgde broncodeopslagplaats
- Afhankelijkheden: REQ-0003; expliciete overname door de eigenaar in het canonieke onderdeel instructies
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-083](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [docs/en/knowledge-hub/INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/INSTRUCTIONS.md); Eenmalige lezing van het toegewezen paginapaar bij de onveranderlijke actieve vastlegging. Resultaat: Tweetalige ID's, bron-ID's, conflicten en formuleringen komen overeen; de pagina bestempelt het item als uit rapporten afgeleid en niet-gezaghebbend.
- Bewijs 2: [INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/10630a566e81ff92542cea173d9021c764a7ec1a/INSTRUCTIONS.md); Het uiteinde van de canonieke instructievertakking, het bijbehorende AGENTS.md-bestand en beide bestanden in instructions/ eenmalig gelezen. Resultaat: Er bestaat geen expliciete of via ID gekoppelde overname van KH-INS-019; volgens het canonieke beheer van het kenniscentrum worden kandidaten pas vast in het onderdeel instructies.
- Bewijs 3: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Enkelvoudige alleen-lezen lexicale en identificatorinspectie van zes gevolgde implementatiebestanden; geen code uitgevoerd. Resultaat: Er is geen architectuurmarkering voor Cloud Run, Pub/Sub of Cloud Storage aangetroffen.
- Beperkingen: Deze voorwaardelijke aanbeveling kan irrelevant blijven totdat een dergelijke architectuur vereist is.

## KH-INS-020

- Status: `aanbeveling`
- Categorie: `KH-INS`; type: `instructie`
- Relevantie: actueel
- Bereik en niveau: `bestuur` / `E1`
- Bewering: Verberg geen afwegingen en geef geen vaag advies; schrijf het materiaal als een uitvoeringsdocument voor het ontwikkelteam.
- Implementatiestatus: niet van toepassing op de uitvoeringsomgeving van het product en niet canoniek overgenomen
- Afhankelijkheden: REQ-0003; expliciete overname door de eigenaar in het canonieke onderdeel instructies
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-085](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [docs/en/knowledge-hub/INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/INSTRUCTIONS.md); Eenmalige lezing van het toegewezen paginapaar bij de onveranderlijke actieve vastlegging. Resultaat: Tweetalige ID's, bron-ID's, conflicten en formuleringen komen overeen; de pagina bestempelt het item als uit rapporten afgeleid en niet-gezaghebbend.
- Bewijs 2: [INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/10630a566e81ff92542cea173d9021c764a7ec1a/INSTRUCTIONS.md); Het uiteinde van de canonieke instructievertakking, het bijbehorende AGENTS.md-bestand en beide bestanden in instructions/ eenmalig gelezen. Resultaat: Er bestaat geen expliciete of via ID gekoppelde overname van KH-INS-020; volgens het canonieke beheer van het kenniscentrum worden kandidaten pas vast in het onderdeel instructies.
- Beperkingen: Deze kwalitatieve aanbeveling mist expliciete overname door de eigenaar.

## KH-INS-021

- Status: `aanbeveling`
- Categorie: `KH-INS`; type: `instructie`
- Relevantie: actueel
- Bereik en niveau: `bestuur` / `E1`
- Bewering: Codex moet optreden als gecontroleerde technische beoordelaar en uitvoerder van het verificatieprotocol; bevestig de mogelijkheden van browser, ontwikkelprotocol en uitvoeringsomgeving vóór gebruik.
- Implementatiestatus: gedeeltelijk weerspiegeld maar niet canoniek overgenomen
- Afhankelijkheden: REQ-0003; expliciete overname door de eigenaar in het canonieke onderdeel instructies
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-072](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [docs/en/knowledge-hub/INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/INSTRUCTIONS.md); Eenmalige lezing van het toegewezen paginapaar bij de onveranderlijke actieve vastlegging. Resultaat: Tweetalige ID's, bron-ID's, conflicten en formuleringen komen overeen; de pagina bestempelt het item als uit rapporten afgeleid en niet-gezaghebbend.
- Bewijs 2: [INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/10630a566e81ff92542cea173d9021c764a7ec1a/INSTRUCTIONS.md); Het uiteinde van de canonieke instructievertakking, het bijbehorende AGENTS.md-bestand en beide bestanden in instructions/ eenmalig gelezen. Resultaat: Er bestaat geen expliciete of via ID gekoppelde overname van KH-INS-021; volgens het canonieke beheer van het kenniscentrum worden kandidaten pas vast in het onderdeel instructies.
- Bewijs 3: [AGENTS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/AGENTS.md); Eenmalig gelezen bij de toegewezen vastlegging. Resultaat: Regelt de routering van verzoeken, bewijsvoering, omgang met geheimen en vrijgavepoorten; neemt geen enkele KH-INS-ID over.
- Beperkingen: Er was geen controle van mogelijkheden in de uitvoeringsomgeving toegestaan en deze is ook niet uitgevoerd.

## KH-INS-022

- Status: `aanbeveling`
- Categorie: `KH-INS`; type: `instructie`
- Relevantie: actueel
- Bereik en niveau: `bestuur` / `E1`
- Bewering: De operationele controlelus moet verplicht zijn en het daadwerkelijke gedrag van gebruikersinterface, uitvoeringsomgeving en netwerkverkeer dekken, niet alleen het lezen van broncode.
- Implementatiestatus: gedeeltelijk weerspiegeld maar niet canoniek overgenomen
- Afhankelijkheden: REQ-0003; expliciete overname door de eigenaar in het canonieke onderdeel instructies
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-080](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [docs/en/knowledge-hub/INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/INSTRUCTIONS.md); Eenmalige lezing van het toegewezen paginapaar bij de onveranderlijke actieve vastlegging. Resultaat: Tweetalige ID's, bron-ID's, conflicten en formuleringen komen overeen; de pagina bestempelt het item als uit rapporten afgeleid en niet-gezaghebbend.
- Bewijs 2: [INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/10630a566e81ff92542cea173d9021c764a7ec1a/INSTRUCTIONS.md); Het uiteinde van de canonieke instructievertakking, het bijbehorende AGENTS.md-bestand en beide bestanden in instructions/ eenmalig gelezen. Resultaat: Er bestaat geen expliciete of via ID gekoppelde overname van KH-INS-022; volgens het canonieke beheer van het kenniscentrum worden kandidaten pas vast in het onderdeel instructies.
- Bewijs 3: [docs/en/releases/VERSIE-001-2026-07-19.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/releases/VERSIE-001-2026-07-19.md); Eenmalig gelezen bij de toegewezen vastlegging. Resultaat: Versie 1 is in uitvoering en niet gepromoveerd; realtime acceptatie met gecontroleerde e-mail en visuele controle en teruglezing in de testomgeving blijven onbewezen.
- Beperkingen: Deze analysestroom sloot gebruikersinterface, uitvoeringsomgeving, netwerk en testuitvoering uit.

## KH-ISS-001

- Status: `ongeverifieerd`
- Categorie: `KH-ISS`; type: `probleem`
- Relevantie: productonderbouwing
- Bereik en niveau: `extern` / `E0`
- Bewering: E-mail veroorzaakt een stroom van microbeslissingen, contextwisselingen, tijdschattingen en sociale druk; bij ADHD en depressie kan dit leiden tot startverlamming.
- Implementatiestatus: niet vastgesteld op basis van de broncodeopslagplaats
- Afhankelijkheden: geen
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R1-001](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Bewijs 1: [docs/en/knowledge-hub/PROBLEMS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PROBLEMS.md); De bronpagina's zijn eenmalig gelezen en op canonieke ID met elkaar afgestemd. Resultaat: Dit legt de toegewezen uit rapporten afgeleide bewering vast en vormt geen onafhankelijk bewijs van implementatie of gedrag in de uitvoeringsomgeving.
- Bewijs 2: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Enkelvoudige statische inspectie van functies, documentmodel en patronen met schoning van gevoelige letterlijke waarden. Resultaat: Focusweergave, triage, instellingen voor energie, herinneringen en dichtheid, stille uren, gezamenlijke verwerking, milde mijlpalen, achterstandsherstel, bewijsweergave, profielafbeeldingen van accounts, directe OAuth-navigatie met terugvalroute, lege toestanden en foutkaarten, opstelscherm, schoning van het documentmodel en idempotente bewerkings-ID's aan clientzijde aangetroffen.
- Beperkingen: De bron in het kenniscentrum is uit rapporten afgeleide herkomst en vormt geen onafhankelijk bewijs.; Er is geen verificatie van externe primaire bronnen uitgevoerd; Git-bewijs kan deze algemene bewering niet vaststellen.; Er is geen gebruikersonderzoek, acceptatie van de weergegeven interface of meting van gedragsresultaten uitgevoerd.

## KH-ISS-002

- Status: `ongeverifieerd`
- Categorie: `KH-ISS`; type: `probleem`
- Relevantie: meldingsontwerp
- Bereik en niveau: `extern` / `E0`
- Bewering: Directe meldingen, tellers, stroken en andere onderbrekingen kunnen de concentratie verstoren en zelf onderdeel van het probleem worden.
- Implementatiestatus: beperkende maatregelen aanwezig maar oorzakelijke bewering onbewezen
- Afhankelijkheden: geen
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R1-013](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Bewijs 1: [docs/en/knowledge-hub/PROBLEMS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PROBLEMS.md); De bronpagina's zijn eenmalig gelezen en op canonieke ID met elkaar afgestemd. Resultaat: Dit legt de toegewezen uit rapporten afgeleide bewering vast en vormt geen onafhankelijk bewijs van implementatie of gedrag in de uitvoeringsomgeving.
- Bewijs 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Enkelvoudige statische inspectie van functies, koppelvlakken en patronen met schoning van gevoelige letterlijke waarden. Resultaat: Ontdubbeling van meldingen voor eigenaar en gelijke e-mailberichten, begrensde afleverregisters, status voor peilen en voortzetting, vergrendelingen op script- en gebruikersniveau, eenmalige startgetallen, validatie van webhaaksleutels, herinneringen, synchronisatie van Gmail-geschiedenis en Telegram-terugkoppelingen aangetroffen.
- Bewijs 3: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Enkelvoudige statische inspectie van functies, documentmodel en patronen met schoning van gevoelige letterlijke waarden. Resultaat: Focusweergave, triage, instellingen voor energie, herinneringen en dichtheid, stille uren, gezamenlijke verwerking, milde mijlpalen, achterstandsherstel, bewijsweergave, profielafbeeldingen van accounts, directe OAuth-navigatie met terugvalroute, lege toestanden en foutkaarten, opstelscherm, schoning van het documentmodel en idempotente bewerkings-ID's aan clientzijde aangetroffen.
- Beperkingen: De bron in het kenniscentrum is uit rapporten afgeleide herkomst en vormt geen onafhankelijk bewijs.; Er is geen verificatie van externe primaire bronnen uitgevoerd; Git-bewijs kan deze algemene bewering niet vaststellen.; Er is geen gebruikersonderzoek, acceptatie van de weergegeven interface of meting van gedragsresultaten uitgevoerd.

## KH-ISS-003

- Status: `ongeverifieerd`
- Categorie: `KH-ISS`; type: `probleem`
- Relevantie: neuro-inclusieve gebruikerservaring
- Bereik en niveau: `extern` / `E0`
- Bewering: Rode tellers, opdringerige herinneringen, openbare reeksen en veroordelend taalgebruik kunnen vermijdingsgedrag versterken en zowel adoptie als behoud schaden.
- Implementatiestatus: milde besloten alternatieven geïmplementeerd, oorzakelijke bewering onbewezen
- Afhankelijkheden: geen
- Conflicten: CF-005
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R1-020](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Bewijs 1: [docs/en/knowledge-hub/PROBLEMS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PROBLEMS.md); De bronpagina's zijn eenmalig gelezen en op canonieke ID met elkaar afgestemd. Resultaat: Dit legt de toegewezen uit rapporten afgeleide bewering vast en vormt geen onafhankelijk bewijs van implementatie of gedrag in de uitvoeringsomgeving.
- Bewijs 2: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Enkelvoudige statische inspectie van functies, documentmodel en patronen met schoning van gevoelige letterlijke waarden. Resultaat: Focusweergave, triage, instellingen voor energie, herinneringen en dichtheid, stille uren, gezamenlijke verwerking, milde mijlpalen, achterstandsherstel, bewijsweergave, profielafbeeldingen van accounts, directe OAuth-navigatie met terugvalroute, lege toestanden en foutkaarten, opstelscherm, schoning van het documentmodel en idempotente bewerkings-ID's aan clientzijde aangetroffen.
- Bewijs 3: [apps-script/tests/mail_app_contract.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_app_contract.test.js); Uitsluitend statische inspectie van testnamen en relevante contracten; testen zijn niet uitgevoerd. Resultaat: Testdefinities dekken routering van profielafbeeldingen, exact accountbehoud, drie primaire focusacties, ondersteunende instellingen voor energie en herinneringen, adaptieve dichtheid, gezamenlijke verwerking, milde mijlpalen, achterstandsherstel, inhoudsvrije meetwaarden, toegankelijke introductie en idempotent opstellen.
- Beperkingen: De bron in het kenniscentrum is uit rapporten afgeleide herkomst en vormt geen onafhankelijk bewijs.; Er is geen verificatie van externe primaire bronnen uitgevoerd; Git-bewijs kan deze algemene bewering niet vaststellen.; Er is geen gebruikersonderzoek, acceptatie van de weergegeven interface of meting van gedragsresultaten uitgevoerd.; Er zijn geen testen uitgevoerd; geïnspecteerde testdefinities bewijzen niet dat een test is geslaagd.

## KH-ISS-004

- Status: `ongeverifieerd`
- Categorie: `KH-ISS`; type: `probleem`
- Relevantie: samenvattingsfunctie
- Bereik en niveau: `extern` / `E0`
- Bewering: Door kunstmatige intelligentie gemaakte samenvattingen kunnen onnauwkeurig zijn of kwetsbaar blijken voor promptinjectie via de inhoud van e-mailberichten.
- Implementatiestatus: bewijscontract en schoning aanwezig, geen reproductie van opdrachtinjectie uitgevoerd
- Afhankelijkheden: geen
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R1-032](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Bewijs 1: [docs/en/knowledge-hub/PROBLEMS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PROBLEMS.md); De bronpagina's zijn eenmalig gelezen en op canonieke ID met elkaar afgestemd. Resultaat: Dit legt de toegewezen uit rapporten afgeleide bewering vast en vormt geen onafhankelijk bewijs van implementatie of gedrag in de uitvoeringsomgeving.
- Bewijs 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Enkelvoudige statische inspectie van functies, koppelvlakken en patronen met schoning van gevoelige letterlijke waarden. Resultaat: Accountgebonden aanroepen op afstand, focusregels, vierdelige aandachtstriage, achterstandsherstel, gezamenlijke verwerking, functionele meetwaarden, op bewijs gebaseerde overdracht, schoningsfuncties, controles van webadressen en DNS, bewerkingslogboeken, gepland verzenden, sessies en door vergrendeling beschermde statuspaden aangetroffen.
- Bewijs 3: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Enkelvoudige statische inspectie van functies, documentmodel en patronen met schoning van gevoelige letterlijke waarden. Resultaat: Focusweergave, triage, instellingen voor energie, herinneringen en dichtheid, stille uren, gezamenlijke verwerking, milde mijlpalen, achterstandsherstel, bewijsweergave, profielafbeeldingen van accounts, directe OAuth-navigatie met terugvalroute, lege toestanden en foutkaarten, opstelscherm, schoning van het documentmodel en idempotente bewerkings-ID's aan clientzijde aangetroffen.
- Bewijs 4: [apps-script/tests/mail_sanitizer.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_sanitizer.test.js); Uitsluitend exacte statische inspectie van testdefinities; testen zijn niet uitgevoerd. Resultaat: Testdefinities weigeren actieve en versluierde HTML en onveilige attributen, met behoud van een begrensde veilige opmaak en koppelingen.
- Bewijs 5: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/5e7c1f70b01814d0cd14a45abcbe6dfa8d2f3efb/apps-script/MailClient.gs); Inspectie van Git-vastleggingsmetadata en gewijzigde paden, bevestigd door actieve statische broncode. Resultaat: De vastlegging voegt het contract voor betrouwbaar samenvattingsbewijs toe.
- Beperkingen: De bron in het kenniscentrum is uit rapporten afgeleide herkomst en vormt geen onafhankelijk bewijs.; Er is geen verificatie van externe primaire bronnen uitgevoerd; Git-bewijs kan deze algemene bewering niet vaststellen.; Statische inspectie stelt de implementatiestructuur vast, maar niet een geslaagde uitvoering.; Er zijn geen testen uitgevoerd; geïnspecteerde testdefinities bewijzen niet dat een test is geslaagd.; Er is geen status van Gmail, Telegram, Apps Script, testomgeving of productieomgeving geraadpleegd.

## KH-ISS-005

- Status: `ongeverifieerd`
- Categorie: `KH-ISS`; type: `probleem`
- Relevantie: ontwerp van mijlpalen
- Bereik en niveau: `extern` / `E0`
- Bewering: Overmatige spelmechanieken kunnen impulsief gebruik aanwakkeren zonder blijvend voordeel op lange termijn.
- Implementatiestatus: begrensde besloten mijlpalen vermijden langdurige registratie
- Afhankelijkheden: geen
- Conflicten: CF-005
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R1-059](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Bewijs 1: [docs/en/knowledge-hub/PROBLEMS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PROBLEMS.md); De bronpagina's zijn eenmalig gelezen en op canonieke ID met elkaar afgestemd. Resultaat: Dit legt de toegewezen uit rapporten afgeleide bewering vast en vormt geen onafhankelijk bewijs van implementatie of gedrag in de uitvoeringsomgeving.
- Bewijs 2: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Enkelvoudige statische inspectie van functies, documentmodel en patronen met schoning van gevoelige letterlijke waarden. Resultaat: Focusweergave, triage, instellingen voor energie, herinneringen en dichtheid, stille uren, gezamenlijke verwerking, milde mijlpalen, achterstandsherstel, bewijsweergave, profielafbeeldingen van accounts, directe OAuth-navigatie met terugvalroute, lege toestanden en foutkaarten, opstelscherm, schoning van het documentmodel en idempotente bewerkings-ID's aan clientzijde aangetroffen.
- Bewijs 3: [apps-script/tests/mail_app_contract.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_app_contract.test.js); Uitsluitend statische inspectie van testnamen en relevante contracten; testen zijn niet uitgevoerd. Resultaat: Testdefinities dekken routering van profielafbeeldingen, exact accountbehoud, drie primaire focusacties, ondersteunende instellingen voor energie en herinneringen, adaptieve dichtheid, gezamenlijke verwerking, milde mijlpalen, achterstandsherstel, inhoudsvrije meetwaarden, toegankelijke introductie en idempotent opstellen.
- Beperkingen: De bron in het kenniscentrum is uit rapporten afgeleide herkomst en vormt geen onafhankelijk bewijs.; Er is geen verificatie van externe primaire bronnen uitgevoerd; Git-bewijs kan deze algemene bewering niet vaststellen.; Er is geen gebruikersonderzoek, acceptatie van de weergegeven interface of meting van gedragsresultaten uitgevoerd.; Er zijn geen testen uitgevoerd; geïnspecteerde testdefinities bewijzen niet dat een test is geslaagd.

## KH-ISS-006

- Status: `gedeeltelijk`
- Categorie: `KH-ISS`; type: `probleem`
- Relevantie: actueel ontwerp voor samenvattingen en acties
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: `Overschrijding door kunstmatige intelligentie`: samenvattingen zonder broncitaten, ondoorzichtige logica en automatische acties zonder bevestiging.
- Implementatiestatus: bewijsvoering en expliciete actiecontroles beperken het risico statisch
- Afhankelijkheden: geen
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R1-060](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Bewijs 1: [docs/en/knowledge-hub/PROBLEMS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PROBLEMS.md); De bronpagina's zijn eenmalig gelezen en op canonieke ID met elkaar afgestemd. Resultaat: Dit legt de toegewezen uit rapporten afgeleide bewering vast en vormt geen onafhankelijk bewijs van implementatie of gedrag in de uitvoeringsomgeving.
- Bewijs 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Enkelvoudige statische inspectie van functies, koppelvlakken en patronen met schoning van gevoelige letterlijke waarden. Resultaat: Accountgebonden aanroepen op afstand, focusregels, vierdelige aandachtstriage, achterstandsherstel, gezamenlijke verwerking, functionele meetwaarden, op bewijs gebaseerde overdracht, schoningsfuncties, controles van webadressen en DNS, bewerkingslogboeken, gepland verzenden, sessies en door vergrendeling beschermde statuspaden aangetroffen.
- Bewijs 3: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Enkelvoudige statische inspectie van functies, documentmodel en patronen met schoning van gevoelige letterlijke waarden. Resultaat: Focusweergave, triage, instellingen voor energie, herinneringen en dichtheid, stille uren, gezamenlijke verwerking, milde mijlpalen, achterstandsherstel, bewijsweergave, profielafbeeldingen van accounts, directe OAuth-navigatie met terugvalroute, lege toestanden en foutkaarten, opstelscherm, schoning van het documentmodel en idempotente bewerkings-ID's aan clientzijde aangetroffen.
- Bewijs 4: [apps-script/tests/mail_app_contract.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_app_contract.test.js); Uitsluitend statische inspectie van testnamen en relevante contracten; testen zijn niet uitgevoerd. Resultaat: Testdefinities dekken routering van profielafbeeldingen, exact accountbehoud, drie primaire focusacties, ondersteunende instellingen voor energie en herinneringen, adaptieve dichtheid, gezamenlijke verwerking, milde mijlpalen, achterstandsherstel, inhoudsvrije meetwaarden, toegankelijke introductie en idempotent opstellen.
- Bewijs 5: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/5e7c1f70b01814d0cd14a45abcbe6dfa8d2f3efb/apps-script/MailClient.gs); Inspectie van Git-vastleggingsmetadata en gewijzigde paden, bevestigd door actieve statische broncode. Resultaat: De vastlegging voegt het contract voor betrouwbaar samenvattingsbewijs toe.
- Beperkingen: De bron in het kenniscentrum is uit rapporten afgeleide herkomst en vormt geen onafhankelijk bewijs.; Statische inspectie stelt de implementatiestructuur vast, maar niet een geslaagde uitvoering.; Er zijn geen testen uitgevoerd; geïnspecteerde testdefinities bewijzen niet dat een test is geslaagd.; Er is geen status van Gmail, Telegram, Apps Script, testomgeving of productieomgeving geraadpleegd.

## KH-ISS-007

- Status: `gedeeltelijk`
- Categorie: `KH-ISS`; type: `probleem`
- Relevantie: actuele energie- en dichtheidsmodi
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: De lage-energiemodus schiet tekort als deze niet terugschakelt naar een daadwerkelijk eenvoudige weergave.
- Implementatiestatus: minimale modus met drie primaire acties statisch geïmplementeerd
- Afhankelijkheden: geen
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R1-061](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Bewijs 1: [docs/en/knowledge-hub/PROBLEMS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PROBLEMS.md); De bronpagina's zijn eenmalig gelezen en op canonieke ID met elkaar afgestemd. Resultaat: Dit legt de toegewezen uit rapporten afgeleide bewering vast en vormt geen onafhankelijk bewijs van implementatie of gedrag in de uitvoeringsomgeving.
- Bewijs 2: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Enkelvoudige statische inspectie van functies, documentmodel en patronen met schoning van gevoelige letterlijke waarden. Resultaat: Focusweergave, triage, instellingen voor energie, herinneringen en dichtheid, stille uren, gezamenlijke verwerking, milde mijlpalen, achterstandsherstel, bewijsweergave, profielafbeeldingen van accounts, directe OAuth-navigatie met terugvalroute, lege toestanden en foutkaarten, opstelscherm, schoning van het documentmodel en idempotente bewerkings-ID's aan clientzijde aangetroffen.
- Bewijs 3: [apps-script/tests/mail_app_contract.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_app_contract.test.js); Uitsluitend statische inspectie van testnamen en relevante contracten; testen zijn niet uitgevoerd. Resultaat: Testdefinities dekken routering van profielafbeeldingen, exact accountbehoud, drie primaire focusacties, ondersteunende instellingen voor energie en herinneringen, adaptieve dichtheid, gezamenlijke verwerking, milde mijlpalen, achterstandsherstel, inhoudsvrije meetwaarden, toegankelijke introductie en idempotent opstellen.
- Bewijs 4: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/968826da8b9f13c27e6eef65033ead10c7797a11/apps-script/MailClient.gs); Inspectie van Git-vastleggingsmetadata en gewijzigde paden, bevestigd door actieve statische broncode. Resultaat: De vastlegging voegt energiebewuste focussessies toe.
- Bewijs 5: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/359b8cba5cdcaee9ec022ccd659538a4dd108455/apps-script/MailApp.html); Inspectie van Git-vastleggingsmetadata en gewijzigde paden, bevestigd door actieve statische broncode. Resultaat: De vastlegging voegt adaptieve informatiedichtheid toe.
- Beperkingen: De bron in het kenniscentrum is uit rapporten afgeleide herkomst en vormt geen onafhankelijk bewijs.; Statische inspectie stelt de implementatiestructuur vast, maar niet een geslaagde uitvoering.; Er zijn geen testen uitgevoerd; geïnspecteerde testdefinities bewijzen niet dat een test is geslaagd.; Er is geen status van Gmail, Telegram, Apps Script, testomgeving of productieomgeving geraadpleegd.; Er is geen gebruikersonderzoek, acceptatie van de weergegeven interface of meting van gedragsresultaten uitgevoerd.

## KH-ISS-008

- Status: `gedeeltelijk`
- Categorie: `KH-ISS`; type: `probleem`
- Relevantie: actuele OAuth-introductie
- Bereik en niveau: `gemengd` / `E2`
- Bewering: Ingewikkelde authenticatie, langdurige introductiestappen en herhaalde gegevensinvoer vormen verborgen drempels.
- Implementatiestatus: herstelwijzigingen voor directe OAuth en terugkeerpad aanwezig, acceptatie in testomgeving ontbreekt
- Afhankelijkheden: geen
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R1-062](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Bewijs 1: [docs/en/knowledge-hub/PROBLEMS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PROBLEMS.md); De bronpagina's zijn eenmalig gelezen en op canonieke ID met elkaar afgestemd. Resultaat: Dit legt de toegewezen uit rapporten afgeleide bewering vast en vormt geen onafhankelijk bewijs van implementatie of gedrag in de uitvoeringsomgeving.
- Bewijs 2: [docs/en/ISSUES.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/ISSUES.md); Inspectie van het onveranderlijke tweetalige problemenregister. Resultaat: Actuele gebreken worden gevolgd als GT-001 tot en met GT-009; lokaal opgeloste punten vereisen nog steeds acceptatie in de testomgeving of in realtime waar dat is vermeld.
- Bewijs 3: [apps-script/MultiAccount.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MultiAccount.gs); Enkelvoudige statische inspectie van OAuth, identiteit, status en vergrendelingen met schoning van gevoelige letterlijke waarden. Resultaat: Autorisatie van Telegram-gebruiker, zone en verbinding, eenmalige OAuth-status, afzonderlijke afgeschermde sleutelregistraties, vastlegging van profielafbeeldingen, accountgebonden registers en talrijke vergrendelingen aangetroffen; de functie voor het vernieuwen van de Gmail-toegangssleutel heeft geen lokale vergrendeling binnen die functie.
- Bewijs 4: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Enkelvoudige statische inspectie van functies, documentmodel en patronen met schoning van gevoelige letterlijke waarden. Resultaat: Focusweergave, triage, instellingen voor energie, herinneringen en dichtheid, stille uren, gezamenlijke verwerking, milde mijlpalen, achterstandsherstel, bewijsweergave, profielafbeeldingen van accounts, directe OAuth-navigatie met terugvalroute, lege toestanden en foutkaarten, opstelscherm, schoning van het documentmodel en idempotente bewerkings-ID's aan clientzijde aangetroffen.
- Bewijs 5: [gmail-oauth-callback.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/gmail-oauth-callback.html); Exacte inspectie van het onveranderlijke terugkeer-doorgiftebestand; omgevingsspecifieke eindpuntwaarde weggelaten. Resultaat: Het doorgiftebestand wist de zoekparameters uit de browsergeschiedenis, valideert begrensde status en code, stuurt uitsluitend actie, status en code door en sluit veilig af bij ongeldige invoer.
- Bewijs 6: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/f67af598369a710c93af91772ee25d5364095a1e/apps-script/Code.gs); Inspectie van Git-vastleggingsmetadata en gewijzigde paden, bevestigd door actieve statische broncode. Resultaat: De vastlegging consolideert de implementatie voor het voorkomen van dubbele aflevering en het herstel van OAuth.
- Beperkingen: De bron in het kenniscentrum is uit rapporten afgeleide herkomst en vormt geen onafhankelijk bewijs.; Statische inspectie stelt de implementatiestructuur vast, maar niet een geslaagde uitvoering.; Er is geen status van Gmail, Telegram, Apps Script, testomgeving of productieomgeving geraadpleegd.; Er is geen gebruikersonderzoek, acceptatie van de weergegeven interface of meting van gedragsresultaten uitgevoerd.

## KH-ISS-009

- Status: `aanbeveling`
- Categorie: `KH-ISS`; type: `probleem`
- Relevantie: actuele Google-integratie
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: Basisauthenticatie mag niet worden beschouwd als een betrouwbare route voor Google of Microsoft; moderne authenticatie moet worden doorgevoerd in introductie, accountkoppeling en ondersteuning.
- Implementatiestatus: Google OAuth geïmplementeerd, Microsoft valt buiten het huidige bereik
- Afhankelijkheden: geen
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R2-011](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Bewijs 1: [docs/en/knowledge-hub/PROBLEMS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PROBLEMS.md); De bronpagina's zijn eenmalig gelezen en op canonieke ID met elkaar afgestemd. Resultaat: Dit legt de toegewezen uit rapporten afgeleide bewering vast en vormt geen onafhankelijk bewijs van implementatie of gedrag in de uitvoeringsomgeving.
- Bewijs 2: [apps-script/MultiAccount.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MultiAccount.gs); Enkelvoudige statische inspectie van OAuth, identiteit, status en vergrendelingen met schoning van gevoelige letterlijke waarden. Resultaat: Autorisatie van Telegram-gebruiker, zone en verbinding, eenmalige OAuth-status, afzonderlijke afgeschermde sleutelregistraties, vastlegging van profielafbeeldingen, accountgebonden registers en talrijke vergrendelingen aangetroffen; de functie voor het vernieuwen van de Gmail-toegangssleutel heeft geen lokale vergrendeling binnen die functie.
- Bewijs 3: [apps-script/V26_MULTI_ACCOUNT_ARCHITECTURE.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/V26_MULTI_ACCOUNT_ARCHITECTURE.md); Inspectie van het onveranderlijke architectuurcontract, waar mogelijk bevestigd door huidige broncode. Resultaat: Een contract voor de koppeling van Gmail- en Telegram-identiteit naar zone, rol en verbinding en een toekomstig gepartitioneerd opslagpad zijn gedocumenteerd; Mailcow, Stalwart en Microsoft Graph vormen niet de huidige implementatie.
- Bewijs 4: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Exacte inspectie van het onveranderlijke manifest. Resultaat: Het project schakelt Gmail v1 in en vraagt de toegangsbereiken gmail.modify, drive.readonly, script.external_request en script.scriptapp aan; de webtoepassing wordt uitgevoerd namens de uitroller en staat anoniem inkomend verkeer toe dat door de toepassingscode moet worden geauthenticeerd.
- Beperkingen: De bron in het kenniscentrum is uit rapporten afgeleide herkomst en vormt geen onafhankelijk bewijs.; Statische inspectie stelt de implementatiestructuur vast, maar niet een geslaagde uitvoering.; Er is geen verificatie van externe primaire bronnen uitgevoerd; Git-bewijs kan deze algemene bewering niet vaststellen.; Er is geen status van Gmail, Telegram, Apps Script, testomgeving of productieomgeving geraadpleegd.

## KH-ISS-010

- Status: `gedeeltelijk`
- Categorie: `KH-ISS`; type: `probleem`
- Relevantie: actuele brugarchitectuur
- Bereik en niveau: `gemengd` / `E2`
- Bewering: Er bestaat geen enkel officieel koppelvlak tussen Telegram en Gmail; de brug moet onafhankelijke interfaces van Telegram en Google combineren.
- Implementatiestatus: onafhankelijke interfaces van Telegram en Google statisch gecombineerd
- Afhankelijkheden: geen
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R2-029](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Bewijs 1: [docs/en/knowledge-hub/PROBLEMS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PROBLEMS.md); De bronpagina's zijn eenmalig gelezen en op canonieke ID met elkaar afgestemd. Resultaat: Dit legt de toegewezen uit rapporten afgeleide bewering vast en vormt geen onafhankelijk bewijs van implementatie of gedrag in de uitvoeringsomgeving.
- Bewijs 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Enkelvoudige statische inspectie van functies, koppelvlakken en patronen met schoning van gevoelige letterlijke waarden. Resultaat: Ontdubbeling van meldingen voor eigenaar en gelijke e-mailberichten, begrensde afleverregisters, status voor peilen en voortzetting, vergrendelingen op script- en gebruikersniveau, eenmalige startgetallen, validatie van webhaaksleutels, herinneringen, synchronisatie van Gmail-geschiedenis en Telegram-terugkoppelingen aangetroffen.
- Bewijs 3: [apps-script/MultiAccount.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MultiAccount.gs); Enkelvoudige statische inspectie van OAuth, identiteit, status en vergrendelingen met schoning van gevoelige letterlijke waarden. Resultaat: Autorisatie van Telegram-gebruiker, zone en verbinding, eenmalige OAuth-status, afzonderlijke afgeschermde sleutelregistraties, vastlegging van profielafbeeldingen, accountgebonden registers en talrijke vergrendelingen aangetroffen; de functie voor het vernieuwen van de Gmail-toegangssleutel heeft geen lokale vergrendeling binnen die functie.
- Bewijs 4: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Exacte inspectie van het onveranderlijke manifest. Resultaat: Het project schakelt Gmail v1 in en vraagt de toegangsbereiken gmail.modify, drive.readonly, script.external_request en script.scriptapp aan; de webtoepassing wordt uitgevoerd namens de uitroller en staat anoniem inkomend verkeer toe dat door de toepassingscode moet worden geauthenticeerd.
- Beperkingen: De bron in het kenniscentrum is uit rapporten afgeleide herkomst en vormt geen onafhankelijk bewijs.; Statische inspectie stelt de implementatiestructuur vast, maar niet een geslaagde uitvoering.; Er is geen verificatie van externe primaire bronnen uitgevoerd; Git-bewijs kan deze algemene bewering niet vaststellen.; Er is geen status van Gmail, Telegram, Apps Script, testomgeving of productieomgeving geraadpleegd.

## KH-ISS-011

- Status: `ongeverifieerd`
- Categorie: `KH-ISS`; type: `probleem`
- Relevantie: buiten het huidige bereik
- Bereik en niveau: `extern` / `E0`
- Bewering: Volledige tekstdoorzoeking in Postfix en Dovecot vereist vaak een afzonderlijk ontwerp met Solr of Flatcurve/Xapian; Stalwart modelleert zoeken als een eigen ingebouwde opslaglaag.
- Implementatiestatus: niet van toepassing op de huidige broncodeopslagplaats
- Afhankelijkheden: geen
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R2-055](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Bewijs 1: [docs/en/knowledge-hub/PROBLEMS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PROBLEMS.md); De bronpagina's zijn eenmalig gelezen en op canonieke ID met elkaar afgestemd. Resultaat: Dit legt de toegewezen uit rapporten afgeleide bewering vast en vormt geen onafhankelijk bewijs van implementatie of gedrag in de uitvoeringsomgeving.
- Bewijs 2: [docs/en/PROJECT.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/PROJECT.md); Inspectie van het onveranderlijke bestand, afgestemd met de Oekraïense tegenhanger. Resultaat: De huidige missie is een veilige Gmail-client in Telegram voor één eigenaar en expliciet gekoppelde accounts; de actieve vertakking Versie en het huidige stappenplan en problemenregister zijn gezaghebbend.
- Bewijs 3: [README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/README.md); Volledige onveranderlijke inventarisatie via git ls-tree plus gerichte statische inspectie. Resultaat: De broncodeopslagplaats bestaat uit Apps Script, een statische terugkeerpagina, documentatie, testen en vrijgavegereedschap; er bestaat geen implementatie van Mailcow, Stalwart, Dovecot, Postfix, Redis, PostgreSQL, Pub/Sub, Cloud Run of Microsoft Graph.
- Beperkingen: De bron in het kenniscentrum is uit rapporten afgeleide herkomst en vormt geen onafhankelijk bewijs.; Er is geen verificatie van externe primaire bronnen uitgevoerd; Git-bewijs kan deze algemene bewering niet vaststellen.; Aanwezigheid of afwezigheid is uitsluitend vastgesteld voor de toegewezen onveranderlijke vastlegging.

## KH-ISS-012

- Status: `ongeverifieerd`
- Categorie: `KH-ISS`; type: `probleem`
- Relevantie: buiten het huidige bereik
- Bereik en niveau: `extern` / `E0`
- Bewering: Dovecot CE met `dsync` vormt geen kant-en-klaar clusterbesturingsvlak; een stappenplan voor hoge beschikbaarheid of meerdere regio's kan in het voordeel werken van Stalwart of een andere geïntegreerde opzet.
- Implementatiestatus: niet van toepassing op de huidige broncodeopslagplaats
- Afhankelijkheden: geen
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R2-057](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Bewijs 1: [docs/en/knowledge-hub/PROBLEMS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PROBLEMS.md); De bronpagina's zijn eenmalig gelezen en op canonieke ID met elkaar afgestemd. Resultaat: Dit legt de toegewezen uit rapporten afgeleide bewering vast en vormt geen onafhankelijk bewijs van implementatie of gedrag in de uitvoeringsomgeving.
- Bewijs 2: [docs/en/PROJECT.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/PROJECT.md); Inspectie van het onveranderlijke bestand, afgestemd met de Oekraïense tegenhanger. Resultaat: De huidige missie is een veilige Gmail-client in Telegram voor één eigenaar en expliciet gekoppelde accounts; de actieve vertakking Versie en het huidige stappenplan en problemenregister zijn gezaghebbend.
- Bewijs 3: [README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/README.md); Volledige onveranderlijke inventarisatie via git ls-tree plus gerichte statische inspectie. Resultaat: De broncodeopslagplaats bestaat uit Apps Script, een statische terugkeerpagina, documentatie, testen en vrijgavegereedschap; er bestaat geen implementatie van Mailcow, Stalwart, Dovecot, Postfix, Redis, PostgreSQL, Pub/Sub, Cloud Run of Microsoft Graph.
- Beperkingen: De bron in het kenniscentrum is uit rapporten afgeleide herkomst en vormt geen onafhankelijk bewijs.; Er is geen verificatie van externe primaire bronnen uitgevoerd; Git-bewijs kan deze algemene bewering niet vaststellen.; Aanwezigheid of afwezigheid is uitsluitend vastgesteld voor de toegewezen onveranderlijke vastlegging.

## KH-ISS-013

- Status: `gedeeltelijk`
- Categorie: `KH-ISS`; type: `probleem`
- Relevantie: actuele OAuth-implementatie
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: Gelijktijdig vernieuwen van toegangssleutels kan zonder vergrendeling leiden tot een gelijktijdigheidsconflict.
- Implementatiestatus: gemengde vergrendelingsdekking: vernieuwen van Gmail-sleutel heeft geen lokale vergrendeling
- Afhankelijkheden: geen
- Conflicten: geen
- Gevoeligheid: `intern`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-046](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [docs/en/knowledge-hub/PROBLEMS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PROBLEMS.md); De bronpagina's zijn eenmalig gelezen en op canonieke ID met elkaar afgestemd. Resultaat: Dit legt de toegewezen uit rapporten afgeleide bewering vast en vormt geen onafhankelijk bewijs van implementatie of gedrag in de uitvoeringsomgeving.
- Bewijs 2: [apps-script/MultiAccount.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MultiAccount.gs); Enkelvoudige statische inspectie van OAuth, identiteit, status en vergrendelingen met schoning van gevoelige letterlijke waarden. Resultaat: Autorisatie van Telegram-gebruiker, zone en verbinding, eenmalige OAuth-status, afzonderlijke afgeschermde sleutelregistraties, vastlegging van profielafbeeldingen, accountgebonden registers en talrijke vergrendelingen aangetroffen; de functie voor het vernieuwen van de Gmail-toegangssleutel heeft geen lokale vergrendeling binnen die functie.
- Bewijs 3: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Enkelvoudige statische inspectie van functies, koppelvlakken en patronen met schoning van gevoelige letterlijke waarden. Resultaat: Accountgebonden aanroepen op afstand, focusregels, vierdelige aandachtstriage, achterstandsherstel, gezamenlijke verwerking, functionele meetwaarden, op bewijs gebaseerde overdracht, schoningsfuncties, controles van webadressen en DNS, bewerkingslogboeken, gepland verzenden, sessies en door vergrendeling beschermde statuspaden aangetroffen.
- Bewijs 4: [apps-script/tests/mail_client.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_client.test.js); Uitsluitend statische inspectie van testnamen en relevante contracten; testen zijn niet uitgevoerd. Resultaat: Testdefinities dekken tegen herhaling bestand zijnde sessies, sleutel- en statusvergrendelingen, accountisolatie, focusmodus, triage, energie en herinneringen, gezamenlijke verwerking, achterstandsherstel, inhoudsvrije meetwaarden, veiligheid van webadressen, idempotent verzenden en gepland verzenden.
- Beperkingen: De bron in het kenniscentrum is uit rapporten afgeleide herkomst en vormt geen onafhankelijk bewijs.; Statische inspectie stelt de implementatiestructuur vast, maar niet een geslaagde uitvoering.; Er zijn geen testen uitgevoerd; geïnspecteerde testdefinities bewijzen niet dat een test is geslaagd.; Er is geen gelijktijdige uitvoering of reproductie van gelijktijdigheidsconflicten uitgevoerd.; Er is geen status van Gmail, Telegram, Apps Script, testomgeving of productieomgeving geraadpleegd.

## KH-ISS-014

- Status: `gedeeltelijk`
- Categorie: `KH-ISS`; type: `probleem`
- Relevantie: actueel manifest
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: Een te breed Gmail-toegangsbereik vergroot het risico op afwijzing bij verificatie en verhoogt de mogelijke schadeomvang; er is geen daadwerkelijk defect bevestigd.
- Implementatiestatus: gmail.modify is smaller dan volledige e-mailtoegang, maar het toestemmingsoppervlak bevat aanvullende vereiste toegangsbereiken
- Afhankelijkheden: geen
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-057](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [docs/en/knowledge-hub/PROBLEMS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PROBLEMS.md); De bronpagina's zijn eenmalig gelezen en op canonieke ID met elkaar afgestemd. Resultaat: Dit legt de toegewezen uit rapporten afgeleide bewering vast en vormt geen onafhankelijk bewijs van implementatie of gedrag in de uitvoeringsomgeving.
- Bewijs 2: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Exacte inspectie van het onveranderlijke manifest. Resultaat: Het project schakelt Gmail v1 in en vraagt de toegangsbereiken gmail.modify, drive.readonly, script.external_request en script.scriptapp aan; de webtoepassing wordt uitgevoerd namens de uitroller en staat anoniem inkomend verkeer toe dat door de toepassingscode moet worden geauthenticeerd.
- Bewijs 3: [apps-script/tests/mail_actions.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_actions.test.js); Uitsluitend statische inspectie van testnamen en relevante contracten; testen zijn niet uitgevoerd. Resultaat: Testdefinities dekken gmail.modify zonder volledig e-mail- of verzendbereik, tijdconstante geheimcontrole voor webhaken, ontdubbeling van terugkoppelingen, begrensd peilen en herhalen, accountisolatie, veiligheid van webadressen en DNS, Gmail-geschiedenis en herinneringen tijdens stille uren.
- Beperkingen: De bron in het kenniscentrum is uit rapporten afgeleide herkomst en vormt geen onafhankelijk bewijs.; Statische inspectie stelt de implementatiestructuur vast, maar niet een geslaagde uitvoering.; Er zijn geen testen uitgevoerd; geïnspecteerde testdefinities bewijzen niet dat een test is geslaagd.; Er is geen verificatie van externe primaire bronnen uitgevoerd; Git-bewijs kan deze algemene bewering niet vaststellen.; Er is geen status van Gmail, Telegram, Apps Script, testomgeving of productieomgeving geraadpleegd.

## KH-ISS-015

- Status: `gedeeltelijk`
- Categorie: `KH-ISS`; type: `probleem`
- Relevantie: actuele logregistratie
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: Ongeschoonde logregistratie van externe antwoorden kan een toegangssleutel of privé-inhoud van e-mail blootleggen; er is geen daadwerkelijk geval bevestigd.
- Implementatiestatus: geen directe logregistratie van toegangssleutels of e-mailantwoorden aangetroffen, foutlogboeken vereisen gegevensstroombeoordeling
- Afhankelijkheden: geen
- Conflicten: geen
- Gevoeligheid: `geheimen-geschoond`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-059](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [docs/en/knowledge-hub/PROBLEMS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PROBLEMS.md); De bronpagina's zijn eenmalig gelezen en op canonieke ID met elkaar afgestemd. Resultaat: Dit legt de toegewezen uit rapporten afgeleide bewering vast en vormt geen onafhankelijk bewijs van implementatie of gedrag in de uitvoeringsomgeving.
- Bewijs 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Enkelvoudige statische inspectie van functies, koppelvlakken en patronen met schoning van gevoelige letterlijke waarden. Resultaat: Ontdubbeling van meldingen voor eigenaar en gelijke e-mailberichten, begrensde afleverregisters, status voor peilen en voortzetting, vergrendelingen op script- en gebruikersniveau, eenmalige startgetallen, validatie van webhaaksleutels, herinneringen, synchronisatie van Gmail-geschiedenis en Telegram-terugkoppelingen aangetroffen.
- Bewijs 3: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Enkelvoudige statische inspectie van functies, koppelvlakken en patronen met schoning van gevoelige letterlijke waarden. Resultaat: Accountgebonden aanroepen op afstand, focusregels, vierdelige aandachtstriage, achterstandsherstel, gezamenlijke verwerking, functionele meetwaarden, op bewijs gebaseerde overdracht, schoningsfuncties, controles van webadressen en DNS, bewerkingslogboeken, gepland verzenden, sessies en door vergrendeling beschermde statuspaden aangetroffen.
- Bewijs 4: [](https://github.com/Tarasevych/gmail-telegram-controls/tree/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a); Exacte inspectie van het negeerbeleid. Resultaat: Op inloggegevens lijkende bestanden, toegangssleutels, sleutels, logboeken, tussenopslag en lokale artefacten worden op patroon uitgesloten; dit bewijst geen serverzijdige geheimenscans op GitHub.
- Beperkingen: De bron in het kenniscentrum is uit rapporten afgeleide herkomst en vormt geen onafhankelijk bewijs.; Statische inspectie stelt de implementatiestructuur vast, maar niet een geslaagde uitvoering.; Er is geen geheimenscan op waardeniveau uitgevoerd op afgeschermde opslagplaatsen of alle historische broncodeobjecten.; Er is geen status van Gmail, Telegram, Apps Script, testomgeving of productieomgeving geraadpleegd.

## KH-ISS-016

- Status: `weerlegd`
- Categorie: `KH-ISS`; type: `probleem`
- Relevantie: actuele verwerking van externe webadressen
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: Verwacht risico: een extern webadres zonder toestemmingslijst of validatie.
- Implementatiestatus: toestemmingslijsten, schemavalidatie en openbare DNS-controles aanwezig
- Afhankelijkheden: geen
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-063](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [docs/en/knowledge-hub/PROBLEMS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PROBLEMS.md); De bronpagina's zijn eenmalig gelezen en op canonieke ID met elkaar afgestemd. Resultaat: Dit legt de toegewezen uit rapporten afgeleide bewering vast en vormt geen onafhankelijk bewijs van implementatie of gedrag in de uitvoeringsomgeving.
- Bewijs 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Enkelvoudige statische inspectie van functies, koppelvlakken en patronen met schoning van gevoelige letterlijke waarden. Resultaat: Accountgebonden aanroepen op afstand, focusregels, vierdelige aandachtstriage, achterstandsherstel, gezamenlijke verwerking, functionele meetwaarden, op bewijs gebaseerde overdracht, schoningsfuncties, controles van webadressen en DNS, bewerkingslogboeken, gepland verzenden, sessies en door vergrendeling beschermde statuspaden aangetroffen.
- Bewijs 3: [apps-script/tests/mail_actions.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_actions.test.js); Uitsluitend statische inspectie van testnamen en relevante contracten; testen zijn niet uitgevoerd. Resultaat: Testdefinities dekken gmail.modify zonder volledig e-mail- of verzendbereik, tijdconstante geheimcontrole voor webhaken, ontdubbeling van terugkoppelingen, begrensd peilen en herhalen, accountisolatie, veiligheid van webadressen en DNS, Gmail-geschiedenis en herinneringen tijdens stille uren.
- Beperkingen: De bron in het kenniscentrum is uit rapporten afgeleide herkomst en vormt geen onafhankelijk bewijs.; Statische inspectie stelt de implementatiestructuur vast, maar niet een geslaagde uitvoering.; Er zijn geen testen uitgevoerd; geïnspecteerde testdefinities bewijzen niet dat een test is geslaagd.; Aanwezigheid of afwezigheid is uitsluitend vastgesteld voor de toegewezen onveranderlijke vastlegging.; Er is geen status van Gmail, Telegram, Apps Script, testomgeving of productieomgeving geraadpleegd.

## KH-ISS-017

- Status: `weerlegd`
- Categorie: `KH-ISS`; type: `probleem`
- Relevantie: actuele e-mail- en interfaceweergave
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: Verwacht risico: niet-ontsnapte HTML of door gebruikers gegenereerde tekenreeksen.
- Implementatiestatus: schoning op server en client en veilige tekstpaden voor het documentmodel aanwezig
- Afhankelijkheden: geen
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-064](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [docs/en/knowledge-hub/PROBLEMS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PROBLEMS.md); De bronpagina's zijn eenmalig gelezen en op canonieke ID met elkaar afgestemd. Resultaat: Dit legt de toegewezen uit rapporten afgeleide bewering vast en vormt geen onafhankelijk bewijs van implementatie of gedrag in de uitvoeringsomgeving.
- Bewijs 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Enkelvoudige statische inspectie van functies, koppelvlakken en patronen met schoning van gevoelige letterlijke waarden. Resultaat: Accountgebonden aanroepen op afstand, focusregels, vierdelige aandachtstriage, achterstandsherstel, gezamenlijke verwerking, functionele meetwaarden, op bewijs gebaseerde overdracht, schoningsfuncties, controles van webadressen en DNS, bewerkingslogboeken, gepland verzenden, sessies en door vergrendeling beschermde statuspaden aangetroffen.
- Bewijs 3: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Enkelvoudige statische inspectie van functies, documentmodel en patronen met schoning van gevoelige letterlijke waarden. Resultaat: Focusweergave, triage, instellingen voor energie, herinneringen en dichtheid, stille uren, gezamenlijke verwerking, milde mijlpalen, achterstandsherstel, bewijsweergave, profielafbeeldingen van accounts, directe OAuth-navigatie met terugvalroute, lege toestanden en foutkaarten, opstelscherm, schoning van het documentmodel en idempotente bewerkings-ID's aan clientzijde aangetroffen.
- Bewijs 4: [apps-script/tests/mail_sanitizer.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_sanitizer.test.js); Uitsluitend exacte statische inspectie van testdefinities; testen zijn niet uitgevoerd. Resultaat: Testdefinities weigeren actieve en versluierde HTML en onveilige attributen, met behoud van een begrensde veilige opmaak en koppelingen.
- Beperkingen: De bron in het kenniscentrum is uit rapporten afgeleide herkomst en vormt geen onafhankelijk bewijs.; Statische inspectie stelt de implementatiestructuur vast, maar niet een geslaagde uitvoering.; Er zijn geen testen uitgevoerd; geïnspecteerde testdefinities bewijzen niet dat een test is geslaagd.; Aanwezigheid of afwezigheid is uitsluitend vastgesteld voor de toegewezen onveranderlijke vastlegging.; Er is geen status van Gmail, Telegram, Apps Script, testomgeving of productieomgeving geraadpleegd.

## KH-ISS-018

- Status: `weerlegd`
- Categorie: `KH-ISS`; type: `probleem`
- Relevantie: actueel statusmodel
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: Verwacht risico: alle taakstatus opgeslagen in één groot JSON-object binnen `PropertiesService`.
- Implementatiestatus: status is gepartitioneerd over afgebakende registers, logboeken en sleutels
- Afhankelijkheden: geen
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-065](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [docs/en/knowledge-hub/PROBLEMS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PROBLEMS.md); De bronpagina's zijn eenmalig gelezen en op canonieke ID met elkaar afgestemd. Resultaat: Dit legt de toegewezen uit rapporten afgeleide bewering vast en vormt geen onafhankelijk bewijs van implementatie of gedrag in de uitvoeringsomgeving.
- Bewijs 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Enkelvoudige statische inspectie van functies, koppelvlakken en patronen met schoning van gevoelige letterlijke waarden. Resultaat: Ontdubbeling van meldingen voor eigenaar en gelijke e-mailberichten, begrensde afleverregisters, status voor peilen en voortzetting, vergrendelingen op script- en gebruikersniveau, eenmalige startgetallen, validatie van webhaaksleutels, herinneringen, synchronisatie van Gmail-geschiedenis en Telegram-terugkoppelingen aangetroffen.
- Bewijs 3: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Enkelvoudige statische inspectie van functies, koppelvlakken en patronen met schoning van gevoelige letterlijke waarden. Resultaat: Accountgebonden aanroepen op afstand, focusregels, vierdelige aandachtstriage, achterstandsherstel, gezamenlijke verwerking, functionele meetwaarden, op bewijs gebaseerde overdracht, schoningsfuncties, controles van webadressen en DNS, bewerkingslogboeken, gepland verzenden, sessies en door vergrendeling beschermde statuspaden aangetroffen.
- Bewijs 4: [apps-script/MultiAccount.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MultiAccount.gs); Enkelvoudige statische inspectie van OAuth, identiteit, status en vergrendelingen met schoning van gevoelige letterlijke waarden. Resultaat: Autorisatie van Telegram-gebruiker, zone en verbinding, eenmalige OAuth-status, afzonderlijke afgeschermde sleutelregistraties, vastlegging van profielafbeeldingen, accountgebonden registers en talrijke vergrendelingen aangetroffen; de functie voor het vernieuwen van de Gmail-toegangssleutel heeft geen lokale vergrendeling binnen die functie.
- Beperkingen: De bron in het kenniscentrum is uit rapporten afgeleide herkomst en vormt geen onafhankelijk bewijs.; Statische inspectie stelt de implementatiestructuur vast, maar niet een geslaagde uitvoering.; Aanwezigheid of afwezigheid is uitsluitend vastgesteld voor de toegewezen onveranderlijke vastlegging.; Er is geen status van Gmail, Telegram, Apps Script, testomgeving of productieomgeving geraadpleegd.

## KH-ISS-019

- Status: `weerlegd`
- Categorie: `KH-ISS`; type: `probleem`
- Relevantie: actueel statusmodel
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: Verwacht risico: postvaklabels gebruikt als enige bron van waarheid.
- Implementatiestatus: eigenschappen, sessies, geschiedenis en bewerkingsregisters vullen Gmail-labels aan
- Afhankelijkheden: geen
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-066](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [docs/en/knowledge-hub/PROBLEMS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PROBLEMS.md); De bronpagina's zijn eenmalig gelezen en op canonieke ID met elkaar afgestemd. Resultaat: Dit legt de toegewezen uit rapporten afgeleide bewering vast en vormt geen onafhankelijk bewijs van implementatie of gedrag in de uitvoeringsomgeving.
- Bewijs 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Enkelvoudige statische inspectie van functies, koppelvlakken en patronen met schoning van gevoelige letterlijke waarden. Resultaat: Ontdubbeling van meldingen voor eigenaar en gelijke e-mailberichten, begrensde afleverregisters, status voor peilen en voortzetting, vergrendelingen op script- en gebruikersniveau, eenmalige startgetallen, validatie van webhaaksleutels, herinneringen, synchronisatie van Gmail-geschiedenis en Telegram-terugkoppelingen aangetroffen.
- Bewijs 3: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Enkelvoudige statische inspectie van functies, koppelvlakken en patronen met schoning van gevoelige letterlijke waarden. Resultaat: Accountgebonden aanroepen op afstand, focusregels, vierdelige aandachtstriage, achterstandsherstel, gezamenlijke verwerking, functionele meetwaarden, op bewijs gebaseerde overdracht, schoningsfuncties, controles van webadressen en DNS, bewerkingslogboeken, gepland verzenden, sessies en door vergrendeling beschermde statuspaden aangetroffen.
- Beperkingen: De bron in het kenniscentrum is uit rapporten afgeleide herkomst en vormt geen onafhankelijk bewijs.; Statische inspectie stelt de implementatiestructuur vast, maar niet een geslaagde uitvoering.; Aanwezigheid of afwezigheid is uitsluitend vastgesteld voor de toegewezen onveranderlijke vastlegging.; Er is geen status van Gmail, Telegram, Apps Script, testomgeving of productieomgeving geraadpleegd.

## KH-ISS-020

- Status: `gedeeltelijk`
- Categorie: `KH-ISS`; type: `probleem`
- Relevantie: actuele logregistratie
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: Verwacht risico: geheimen weggeschreven naar `Logger.log()` of `console.log()`.
- Implementatiestatus: geen directe logregistratie van geheimen aangetroffen, maar foutlogboeken zijn niet uitputtend via gegevensstroomanalyse bewezen
- Afhankelijkheden: geen
- Conflicten: geen
- Gevoeligheid: `geheimen-geschoond`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-067](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [docs/en/knowledge-hub/PROBLEMS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PROBLEMS.md); De bronpagina's zijn eenmalig gelezen en op canonieke ID met elkaar afgestemd. Resultaat: Dit legt de toegewezen uit rapporten afgeleide bewering vast en vormt geen onafhankelijk bewijs van implementatie of gedrag in de uitvoeringsomgeving.
- Bewijs 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Enkelvoudige statische inspectie van functies, koppelvlakken en patronen met schoning van gevoelige letterlijke waarden. Resultaat: Ontdubbeling van meldingen voor eigenaar en gelijke e-mailberichten, begrensde afleverregisters, status voor peilen en voortzetting, vergrendelingen op script- en gebruikersniveau, eenmalige startgetallen, validatie van webhaaksleutels, herinneringen, synchronisatie van Gmail-geschiedenis en Telegram-terugkoppelingen aangetroffen.
- Bewijs 3: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Enkelvoudige statische inspectie van functies, koppelvlakken en patronen met schoning van gevoelige letterlijke waarden. Resultaat: Accountgebonden aanroepen op afstand, focusregels, vierdelige aandachtstriage, achterstandsherstel, gezamenlijke verwerking, functionele meetwaarden, op bewijs gebaseerde overdracht, schoningsfuncties, controles van webadressen en DNS, bewerkingslogboeken, gepland verzenden, sessies en door vergrendeling beschermde statuspaden aangetroffen.
- Bewijs 4: [](https://github.com/Tarasevych/gmail-telegram-controls/tree/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a); Exacte inspectie van het negeerbeleid. Resultaat: Op inloggegevens lijkende bestanden, toegangssleutels, sleutels, logboeken, tussenopslag en lokale artefacten worden op patroon uitgesloten; dit bewijst geen serverzijdige geheimenscans op GitHub.
- Beperkingen: De bron in het kenniscentrum is uit rapporten afgeleide herkomst en vormt geen onafhankelijk bewijs.; Statische inspectie stelt de implementatiestructuur vast, maar niet een geslaagde uitvoering.; Er is geen geheimenscan op waardeniveau uitgevoerd op afgeschermde opslagplaatsen of alle historische broncodeobjecten.; Er is geen status van Gmail, Telegram, Apps Script, testomgeving of productieomgeving geraadpleegd.

## KH-ISS-021

- Status: `weerlegd`
- Categorie: `KH-ISS`; type: `probleem`
- Relevantie: actuele implementatie van periodiek peilen
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: Verwacht risico: een eenmalige peillussen-uitvoering die stilzwijgend stopt bij de uitvoeringslimiet.
- Implementatiestatus: begrensde controles, voortzettingsstatus, herhaalregisters en minuutstarter aanwezig
- Afhankelijkheden: geen
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-068](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [docs/en/knowledge-hub/PROBLEMS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PROBLEMS.md); De bronpagina's zijn eenmalig gelezen en op canonieke ID met elkaar afgestemd. Resultaat: Dit legt de toegewezen uit rapporten afgeleide bewering vast en vormt geen onafhankelijk bewijs van implementatie of gedrag in de uitvoeringsomgeving.
- Bewijs 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Enkelvoudige statische inspectie van functies, koppelvlakken en patronen met schoning van gevoelige letterlijke waarden. Resultaat: Ontdubbeling van meldingen voor eigenaar en gelijke e-mailberichten, begrensde afleverregisters, status voor peilen en voortzetting, vergrendelingen op script- en gebruikersniveau, eenmalige startgetallen, validatie van webhaaksleutels, herinneringen, synchronisatie van Gmail-geschiedenis en Telegram-terugkoppelingen aangetroffen.
- Bewijs 3: [apps-script/tests/mail_actions.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_actions.test.js); Uitsluitend statische inspectie van testnamen en relevante contracten; testen zijn niet uitgevoerd. Resultaat: Testdefinities dekken gmail.modify zonder volledig e-mail- of verzendbereik, tijdconstante geheimcontrole voor webhaken, ontdubbeling van terugkoppelingen, begrensd peilen en herhalen, accountisolatie, veiligheid van webadressen en DNS, Gmail-geschiedenis en herinneringen tijdens stille uren.
- Beperkingen: De bron in het kenniscentrum is uit rapporten afgeleide herkomst en vormt geen onafhankelijk bewijs.; Statische inspectie stelt de implementatiestructuur vast, maar niet een geslaagde uitvoering.; Er zijn geen testen uitgevoerd; geïnspecteerde testdefinities bewijzen niet dat een test is geslaagd.; Er is geen status van Gmail, Telegram, Apps Script, testomgeving of productieomgeving geraadpleegd.

## KH-ISS-022

- Status: `gedeeltelijk`
- Categorie: `KH-ISS`; type: `probleem`
- Relevantie: actuele OAuth-toestemming
- Bereik en niveau: `gemengd` / `E2`
- Bewering: Verwacht risico: een te breed OAuth-toestemmingsoppervlak.
- Implementatiestatus: toegangsbereiken zijn functioneel en begrensd, maar het externe verificatieoppervlak is niet beoordeeld
- Afhankelijkheden: geen
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-069](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [docs/en/knowledge-hub/PROBLEMS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PROBLEMS.md); De bronpagina's zijn eenmalig gelezen en op canonieke ID met elkaar afgestemd. Resultaat: Dit legt de toegewezen uit rapporten afgeleide bewering vast en vormt geen onafhankelijk bewijs van implementatie of gedrag in de uitvoeringsomgeving.
- Bewijs 2: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Exacte inspectie van het onveranderlijke manifest. Resultaat: Het project schakelt Gmail v1 in en vraagt de toegangsbereiken gmail.modify, drive.readonly, script.external_request en script.scriptapp aan; de webtoepassing wordt uitgevoerd namens de uitroller en staat anoniem inkomend verkeer toe dat door de toepassingscode moet worden geauthenticeerd.
- Bewijs 3: [apps-script/V26_MULTI_ACCOUNT_ARCHITECTURE.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/V26_MULTI_ACCOUNT_ARCHITECTURE.md); Inspectie van het onveranderlijke architectuurcontract, waar mogelijk bevestigd door huidige broncode. Resultaat: Een contract voor de koppeling van Gmail- en Telegram-identiteit naar zone, rol en verbinding en een toekomstig gepartitioneerd opslagpad zijn gedocumenteerd; Mailcow, Stalwart en Microsoft Graph vormen niet de huidige implementatie.
- Beperkingen: De bron in het kenniscentrum is uit rapporten afgeleide herkomst en vormt geen onafhankelijk bewijs.; Statische inspectie stelt de implementatiestructuur vast, maar niet een geslaagde uitvoering.; Er is geen verificatie van externe primaire bronnen uitgevoerd; Git-bewijs kan deze algemene bewering niet vaststellen.; Er is geen status van Gmail, Telegram, Apps Script, testomgeving of productieomgeving geraadpleegd.; Serverzijdige beveiligingsinstellingen van GitHub zijn niet uitgelezen.

## KH-ISS-023

- Status: `weerlegd`
- Categorie: `KH-ISS`; type: `probleem`
- Relevantie: actuele inkomende verwerking van webhaken en sessies
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: Verwacht risico: een webhaak zonder bescherming tegen herhaalaanvallen.
- Implementatiestatus: tijdconstante controle van webhaaksleutel, ontdubbeling van bijwerkingen, eenmalige statuswaarden en bescherming tegen sessieherhaling aanwezig
- Afhankelijkheden: geen
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-070](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [docs/en/knowledge-hub/PROBLEMS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PROBLEMS.md); De bronpagina's zijn eenmalig gelezen en op canonieke ID met elkaar afgestemd. Resultaat: Dit legt de toegewezen uit rapporten afgeleide bewering vast en vormt geen onafhankelijk bewijs van implementatie of gedrag in de uitvoeringsomgeving.
- Bewijs 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Enkelvoudige statische inspectie van functies, koppelvlakken en patronen met schoning van gevoelige letterlijke waarden. Resultaat: Ontdubbeling van meldingen voor eigenaar en gelijke e-mailberichten, begrensde afleverregisters, status voor peilen en voortzetting, vergrendelingen op script- en gebruikersniveau, eenmalige startgetallen, validatie van webhaaksleutels, herinneringen, synchronisatie van Gmail-geschiedenis en Telegram-terugkoppelingen aangetroffen.
- Bewijs 3: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Enkelvoudige statische inspectie van functies, koppelvlakken en patronen met schoning van gevoelige letterlijke waarden. Resultaat: Accountgebonden aanroepen op afstand, focusregels, vierdelige aandachtstriage, achterstandsherstel, gezamenlijke verwerking, functionele meetwaarden, op bewijs gebaseerde overdracht, schoningsfuncties, controles van webadressen en DNS, bewerkingslogboeken, gepland verzenden, sessies en door vergrendeling beschermde statuspaden aangetroffen.
- Bewijs 4: [apps-script/tests/mail_actions.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_actions.test.js); Uitsluitend statische inspectie van testnamen en relevante contracten; testen zijn niet uitgevoerd. Resultaat: Testdefinities dekken gmail.modify zonder volledig e-mail- of verzendbereik, tijdconstante geheimcontrole voor webhaken, ontdubbeling van terugkoppelingen, begrensd peilen en herhalen, accountisolatie, veiligheid van webadressen en DNS, Gmail-geschiedenis en herinneringen tijdens stille uren.
- Bewijs 5: [apps-script/tests/mail_client.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_client.test.js); Uitsluitend statische inspectie van testnamen en relevante contracten; testen zijn niet uitgevoerd. Resultaat: Testdefinities dekken tegen herhaling bestand zijnde sessies, sleutel- en statusvergrendelingen, accountisolatie, focusmodus, triage, energie en herinneringen, gezamenlijke verwerking, achterstandsherstel, inhoudsvrije meetwaarden, veiligheid van webadressen, idempotent verzenden en gepland verzenden.
- Bewijs 6: [apps-script/tests/oauth_callback_bridge.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/oauth_callback_bridge.test.js); Uitsluitend exacte statische inspectie van testdefinities; testen zijn niet uitgevoerd. Resultaat: Het contract staat uitsluitend eenmalige doorgifte van status en code toe en sluit authuser, prompt, scope, iss, browseropslag en consolelogboeken uit.
- Beperkingen: De bron in het kenniscentrum is uit rapporten afgeleide herkomst en vormt geen onafhankelijk bewijs.; Statische inspectie stelt de implementatiestructuur vast, maar niet een geslaagde uitvoering.; Er zijn geen testen uitgevoerd; geïnspecteerde testdefinities bewijzen niet dat een test is geslaagd.; Er is geen status van Gmail, Telegram, Apps Script, testomgeving of productieomgeving geraadpleegd.

## KH-LES-001

- Status: `ongeverifieerd`
- Categorie: `KH-LES`; type: `les`
- Relevantie: hoog
- Bereik en niveau: `extern` / `E0`
- Bewering: Het grootste probleem is vaak niet het lezen van een bericht, maar het vasthouden van het plan voor wat er vervolgens mee moet gebeuren.
- Implementatiestatus: productfuncties sluiten aan op de hypothese maar verifiëren deze niet
- Afhankelijkheden: Primair protocol en gegevens van gebruikersonderzoek; Toepasbaarheidsonderzoek voor de doelgroep
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R1-009](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Beperkingen: Functies in de broncodeopslagplaats en herhaling in rapporten kunnen deze gedragsveralgemening niet verifiëren. Veilig ontbrekend bewijs: een primaire, controleerbare gegevensverzameling uit gebruikersonderzoek of een gepubliceerd onderzoek voor de genoemde doelgroep en context.

## KH-LES-002

- Status: `aanbeveling`
- Categorie: `KH-LES`; type: `les`
- Relevantie: gemiddeld
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: Een `actiegericht postvak` moet uitsluitend berichten die een handeling vereisen in het postvak of als ongelezen laten staan; mappen moeten breed zijn opgezet en filters moeten zelfs kleine terugkerende ruis verwijderen.
- Implementatiestatus: niet geïmplementeerd als uitsluitend actiegericht postvak
- Afhankelijkheden: Postvakbeleid van de eigenaar; Veilige stroom voor regelsuggesties en bevestiging
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R1-068](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Bewijs 1: [apps-script/README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/README.md); Statische inspectie bij de vastgepinde vastlegging. Resultaat: Het gevolgde product is een Gmail-client in Telegram, met een volledige minitoepassing, ingebouwde Telegram-terugkoppelingen, Gmail-mappen, concepten, e-mailacties en een serverlaag in Apps Script.
- Bewijs 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Statische inspectie van symbolen en besturingsstroom; er is geen code uitgevoerd. Resultaat: De gevolgde clienttoepassing toont Postvak IN, Ongelezen, Alle e-mail, categorieën, labels en serverbrede Gmail-filters in plaats van een uitsluitend actiegericht postvak af te dwingen.
- Beperkingen: De statische onderzoeksomvang stelt niet vast hoe een afzonderlijk postvak in de uitvoeringsomgeving is geconfigureerd.

## KH-LES-003

- Status: `aanbeveling`
- Categorie: `KH-LES`; type: `les`
- Relevantie: hoog
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: Een sobere gebruikersinterface met de berichttekst en drie basisacties is nuttiger dan extra bedieningselementen en ingewikkelde menu's.
- Implementatiestatus: gedeeltelijk geïmplementeerd, uitsluitend in de focusweergave
- Afhankelijkheden: Vergelijkend bruikbaarheidsbewijs
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R1-069](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Bewijs 1: [docs/design/focus-view-v28-spec.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/design/focus-view-v28-spec.md); Statische specificatie-inspectie, gecorreleerd met gevolgde implementatie- en testcontractbestanden. Resultaat: De focusweergave behoudt het geraamte van Gmail, toont een bewerkbare volgende stap en specificeert exact drie primaire acties.
- Bewijs 2: [apps-script/README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/README.md); Statische inspectie bij de vastgepinde vastlegging. Resultaat: Het gevolgde product is een Gmail-client in Telegram, met een volledige minitoepassing, ingebouwde Telegram-terugkoppelingen, Gmail-mappen, concepten, e-mailacties en een serverlaag in Apps Script.
- Bewijs 3: [apps-script/tests/mail_app_contract.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_app_contract.test.js); Testbroncode is geïnspecteerd maar niet uitgevoerd; dit is niveau E2, niet E3. Resultaat: Statische contracten toetsen begrensde focusacties, maar dekken tevens een uitgebreide e-mailclient met mappen, opstellen, bijlagen, labels en instellingen.
- Beperkingen: De vergelijkende bruikbaarheidsbewering vereist bruikbaarheidsbewijs; inspectie van de broncodeopslagplaats verifieert uitsluitend de omvang van beide gebruikersinterfaces.

## KH-LES-004

- Status: `aanbeveling`
- Categorie: `KH-LES`; type: `les`
- Relevantie: hoog
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: Microstarttechnieken moeten onzekerheid verminderen en slechts één minimale handeling vragen.
- Implementatiestatus: gedeeltelijk geïmplementeerd in stromen voor focus en milde acties
- Afhankelijkheden: Bruikbaarheidsvalidatie; Resultaatdefinitie voor verminderde onzekerheid
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R1-072](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Bewijs 1: [docs/design/focus-view-v28-spec.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/design/focus-view-v28-spec.md); Statische specificatie-inspectie, gecorreleerd met gevolgde implementatie- en testcontractbestanden. Resultaat: De focusweergave behoudt het geraamte van Gmail, toont een bewerkbare volgende stap en specificeert exact drie primaire acties.
- Bewijs 2: [docs/product/p1-gentle-action-contract.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/968826da8b9f13c27e6eef65033ead10c7797a11/docs/product/p1-gentle-action-contract.md); Inspectie van vastleggingsmetadata en gewijzigde paden; de vastlegging is een voorouder van de vastgepinde vastlegging. Resultaat: De onveranderlijke vastlegging voegde energiebewuste focussessies toe in de implementatie, testen en het productcontract.
- Bewijs 3: [docs/product/p1-gentle-action-contract.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/product/p1-gentle-action-contract.md); Statische contractinspectie en koppeling met de onveranderlijke vastlegging. Resultaat: Het gevolgde contract voor milde acties definieert begrensde, energiebewuste interacties en bijbehorend productgedrag.
- Beperkingen: Statische stromen kunnen verminderde onzekerheid of afronding in één handeling tijdens daadwerkelijk gebruik niet verifiëren.

## KH-LES-005

- Status: `aanbeveling`
- Categorie: `KH-LES`; type: `les`
- Relevantie: gemiddeld
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: Plaats metadata, binaire objecten, zoekindexen en wachtrijen niet in één enkele databank; het gegevensvlak moet gelaagd zijn opgebouwd.
- Implementatiestatus: niet van toepassing op het huidige opslagmodel in Apps Script
- Afhankelijkheden: Besluit over het externe gegevensvlak; Architectuur voor opslag en bewaartermijnen
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R2-052](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Bewijs 1: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Statische inspectie van symbolen en besturingsstroom; er is geen code uitgevoerd. Resultaat: De gevolgde implementatie gebruikt Gmail plus eigenschappen en dienstkoppelvlakken van Apps Script; er is geen uniforme toepassingsdatabank of gelaagd extern gegevensvlak aangetroffen.
- Beperkingen: Er is geen externe infrastructuur of opslagconfiguratie in de uitvoeringsomgeving geïnspecteerd.

## KH-LES-006

- Status: `ongeverifieerd`
- Categorie: `KH-LES`; type: `les`
- Relevantie: gemiddeld
- Bereik en niveau: `extern` / `E0`
- Bewering: Gerapporteerde gebruikerspatronen omvatten tijdgebonden triage, het archiveren of verwijderen van verouderde post, vaste controlevensters, één snelle e-mail en koppeling met agenda of sluimerfunctie.
- Implementatiestatus: enkele verwante functies aanwezig maar gebruikerspatroon ongeverifieerd
- Afhankelijkheden: Primaire verslagen van gebruikersonderzoek; Details over steekproef en methodologie
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R2-061](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Beperkingen: Implementatie van tijdklokken, e-mailacties, sluimeren of taakoverdracht bewijst niet dat gebruikers deze patronen vertonen. Veilig ontbrekend bewijs: primaire onderzoeksnotities of een controleerbare gegevensverzameling met methodologie.

## KH-LES-007

- Status: `aanbeveling`
- Categorie: `KH-LES`; type: `les`
- Relevantie: gemiddeld
- Bereik en niveau: `broncodeopslagplaats` / `E0`
- Bewering: Het bouwen van de gebruikersinterface vóór een stabiele e-mailkern veroorzaakt integratie-instabiliteit; keer de werkvolgorde niet om.
- Implementatiestatus: niet van toepassing op de huidige door Gmail beheerde kern
- Afhankelijkheden: Gedefinieerd programma voor een zelfgehoste e-mailkern; Vergelijkend afleverbewijs
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R2-073](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Beperkingen: Git-chronologie kan de werkvolgorde tonen maar kan de gestelde oorzakelijke instabiliteit niet vaststellen; het huidige product steunt op Gmail in plaats van op een nieuw gebouwde e-mailkern.

## KH-LES-008

- Status: `aanbeveling`
- Categorie: `KH-LES`; type: `les`
- Relevantie: hoog
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: Gebruik tijdblindheid, motivatie en dopamine als ontwerpmodellen, niet als één enkele verklaring voor ADHD.
- Implementatiestatus: gedeeltelijk weerspiegeld in het ontwerp voor energie en aandacht
- Afhankelijkheden: Beoordeling op klinisch veilig taalgebruik; Gebruikersonderzoek
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-007](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [docs/product/p1-gentle-action-contract.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/968826da8b9f13c27e6eef65033ead10c7797a11/docs/product/p1-gentle-action-contract.md); Inspectie van vastleggingsmetadata en gewijzigde paden; de vastlegging is een voorouder van de vastgepinde vastlegging. Resultaat: De onveranderlijke vastlegging voegde energiebewuste focussessies toe in de implementatie, testen en het productcontract.
- Bewijs 2: [docs/product/p1-gentle-action-contract.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/product/p1-gentle-action-contract.md); Statische contractinspectie en koppeling met de onveranderlijke vastlegging. Resultaat: Het gevolgde contract voor milde acties definieert begrensde, energiebewuste interacties en bijbehorend productgedrag.
- Bewijs 3: [docs/design/focus-view-v28-spec.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/design/focus-view-v28-spec.md); Statische specificatie-inspectie, gecorreleerd met gevolgde implementatie- en testcontractbestanden. Resultaat: De focusweergave behoudt het geraamte van Gmail, toont een bewerkbare volgende stap en specificeert exact drie primaire acties.
- Beperkingen: Ontwerpartefacten in de broncodeopslagplaats behandelen energie en aandacht, maar verifiëren het wetenschappelijke kader niet en bewijzen niet dat ADHD in externe communicatie niet tot één model wordt gereduceerd.

## KH-LES-009

- Status: `gedeeltelijk`
- Categorie: `KH-LES`; type: `les`
- Relevantie: gemiddeld
- Bereik en niveau: `gemengd` / `E2`
- Bewering: De mappenstructuur van de broncodeopslagplaats is een architectonische aanbeveling en geen canonieke Google-structuur; zij scheidt gebruikersinterface, bedrijfslogica, integraties, achtergrondtaken en beveiliging.
- Implementatiestatus: scheiding in de broncodeopslagplaats aanwezig maar niet volledig
- Afhankelijkheden: Vergelijking met de officiële Google-structuur voor de bepaling over canoniciteit
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-101](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [apps-script/V26_MULTI_ACCOUNT_ARCHITECTURE.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/V26_MULTI_ACCOUNT_ARCHITECTURE.md); Statische architectuurinspectie. Resultaat: De broncodeopslagplaats documenteert een projectspecifieke module-indeling.
- Bewijs 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Statische inspectie van symbolen en besturingsstroom; er is geen code uitgevoerd. Resultaat: Inkomend verkeer van de serverlaag, meldingen, periodiek peilen, Telegram-transport en Gmail-bewerkingen blijven grotendeels samengevoegd.
- Bewijs 3: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Statische inspectie van symbolen en besturingsstroom; er is geen code uitgevoerd. Resultaat: De geauthenticeerde postvak-serverlaag is gescheiden van het interfacebestand, maar combineert nog steeds verschillende verantwoordelijkheden voor aanbieders en statusbeheer.
- Beperkingen: Het scheidingsdoel is gedeeltelijk zichtbaar. De uitspraak dat dit geen canonieke Google-structuur is, is niet getoetst aan officiële externe documentatie.

## KH-LES-010

- Status: `aanbeveling`
- Categorie: `KH-LES`; type: `les`
- Relevantie: hoog
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: Een webtoepassing in Apps Script moet dienen als een dunne toegangspoort; splits zwaar synchroon werk op of verplaats het naar buiten.
- Implementatiestatus: weerlegd door volledige serverlaag in Apps Script
- Afhankelijkheden: Architectuur van externe achtergrondwerker; Acceptatiecriteria voor vertraging en quota
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-062](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Statische inspectie van symbolen en besturingsstroom; er is geen code uitgevoerd. Resultaat: Apps Script verwerkt inkomend verkeer, periodiek peilen, meldingscontroles, Telegram-transport en Gmail-acties.
- Bewijs 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Statische inspectie van symbolen en besturingsstroom; er is geen code uitgevoerd. Resultaat: Apps Script huisvest de geauthenticeerde serverlaag voor aanroepen op afstand van het postvak, sessies, concepten, aanbiedersintegraties en bijlagenwerkstromen.
- Beperkingen: Statische broncode toont een niet-dunne gevolgde serverlaag, maar meet geen synchrone vertraging of quotagedrag in een uitgerolde omgeving.

## KH-LES-011

- Status: `gedeeltelijk`
- Categorie: `KH-LES`; type: `les`
- Relevantie: hoog
- Bereik en niveau: `bestuur` / `E2`
- Bewering: Werkprincipe: minimale theorie, maximale gecontroleerde verificatie, duidelijke vervolgstappen en beheerste voortgang.
- Implementatiestatus: gecontroleerd bewijsbestuur aanwezig
- Afhankelijkheden: Expliciete vaste overname van de volledige formulering
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-082](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [instructions/KNOWLEDGE_HUB_MAINTENANCE.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/10630a566e81ff92542cea173d9021c764a7ec1a/instructions/KNOWLEDGE_HUB_MAINTENANCE.md); Statische inspectie op het uiteinde van de canonieke instructievertakking. Resultaat: Het vaste bestuur vereist afstemming vóór uitspraken over de live status en bepaalt dat uit rapporten afgeleide beweringen niet zonder nieuw bewijs als live geverifieerd gelden.
- Bewijs 2: [requests/2026-07-19/REQ-0003-deep-research-knowledge-hub.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/c0ee79987b7d5637b35bb1462f1696fffcc4a828/requests/2026-07-19/REQ-0003-deep-research-knowledge-hub.md); Statische inspectie op het uiteinde van de canonieke verzoekenvertakking. Resultaat: Verzoek REQ-0003 registreert de opname van rapporten zonder wijzigingen in de uitvoeringsomgeving, Gmail, Telegram, Apps Script of productie en vermeldt dat uit rapporten afgeleide beweringen geen bevoegdheid zijn geworden.
- Beperkingen: Canoniek bestuur vereist bewijs, afstemming, begrensde routering en statusbijwerkingen, maar neemt deze volledige formulering niet over als vaste regel.

## KH-PERM-001

- Status: `gedeeltelijk`
- Categorie: `KH-PERM`; type: `toestemming`
- Relevantie: toestemmingsbestuur
- Bereik en niveau: `bestuur` / `E1`
- Bewering: Acties met een hoog risico zijn uitsluitend toegestaan na expliciete bevestiging door de gebruiker; dit is een voorgestelde toestemmingspoort, geen verleende bevoegdheid.
- Implementatiestatus: canonieke overlap aanwezig maar herleidbaar verzoek van eigenaar ontbreekt
- Afhankelijkheden: canonieke registratie in het onderdeel toestemmingen; herleidbaar bijbehorend verzoek van de eigenaar
- Conflicten: geen
- Gevoeligheid: `intern`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R1-034](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Bewijs 1: [docs/en/knowledge-hub/PERMISSIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PERMISSIONS.md); Eenmalige lezing van het toegewezen paginapaar bij de onveranderlijke actieve vastlegging. Resultaat: Tweetalige ID's, bron-ID's, conflicten en formuleringen komen overeen; de pagina bestempelt het item als uit rapporten afgeleid en niet-gezaghebbend.
- Bewijs 2: [permissions/P-004-owner-intervention-boundaries.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/37ef923a0629da4cfd83b9f218561ead73386223/permissions/P-004-owner-intervention-boundaries.md); Eenmalig vergeleken met het canonieke actieve dossier. Resultaat: Item P-004 heeft engere stopvoorwaarden en geen herleidbare verzoek-ID.
- Bewijs 3: [PERMISSIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/c32075367a0f8b5f0705f46835f28d74c3e0ff41/PERMISSIONS.md); Onveranderlijke afstamming van de toestemmingsvertakking en vastleggingsmetadata geïnspecteerd. Resultaat: De items P-001 tot en met P-004 zijn in de geschiedenis opgenomen bij c320753 zonder herleidbare verzoek-ID; P-005 is later toegevoegd vanuit REQ-0002.
- Bewijs 4: [requests/2026-07-19/REQ-0003-deep-research-knowledge-hub.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/c0ee79987b7d5637b35bb1462f1696fffcc4a828/requests/2026-07-19/REQ-0003-deep-research-knowledge-hub.md); Eenmalig gelezen op het uiteinde van het onveranderlijke REQ-0004-register. Resultaat: Verzoek REQ-0003 registreert toestemmingen als referentie en toestemmingsgrondslag als geen; rapportkandidaten zijn geen bevoegdheid geworden.
- Bewijs 5: [requests/2026-07-19/REQ-0004-independent-factual-verification-reports.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/c0ee79987b7d5637b35bb1462f1696fffcc4a828/requests/2026-07-19/REQ-0004-independent-factual-verification-reports.md); Eenmalig gelezen bij de onveranderlijke vastlegging c0ee799. Resultaat: Vereist primair bewijs en een registratie in het canonieke onderdeel toestemmingen plus een bijbehorend verzoek van de eigenaar voor toestemmingsverificatie.
- Beperkingen: Exact veilig ontbrekend bewijs: een canoniek verzoekdossier met de expliciete bevestigingsregel en reikwijdte van de eigenaar voor hoog risico, gekoppeld vanuit P-004 of een opvolger.

## KH-PERM-002

- Status: `aanbeveling`
- Categorie: `KH-PERM`; type: `toestemming`
- Relevantie: toekomstige productomvang
- Bereik en niveau: `gemengd` / `E2`
- Bewering: Een toekomstige Telegram-omgeving mag uitsluitend expliciet geselecteerde acties toestaan: prioriteitsweergave, samenvatting, snel antwoord, taakbevestiging, sluimeren en triage; dit is een kandidaat voor de productomvang, geen toestemming van de eigenaar.
- Implementatiestatus: gedeeltelijk geïmplementeerd als niet-exclusieve actiereeks
- Afhankelijkheden: expliciet besluit over de productomvang; gebruikerservaringscontract op actieniveau
- Conflicten: geen
- Gevoeligheid: `intern`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R2-032](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Bewijs 1: [docs/en/knowledge-hub/PERMISSIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PERMISSIONS.md); Eenmalige lezing van het toegewezen paginapaar bij de onveranderlijke actieve vastlegging. Resultaat: Tweetalige ID's, bron-ID's, conflicten en formuleringen komen overeen; de pagina bestempelt het item als uit rapporten afgeleid en niet-gezaghebbend.
- Bewijs 2: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Enkelvoudige alleen-lezen lexicale en identificatorinspectie van zes gevolgde implementatiebestanden; geen code uitgevoerd. Resultaat: Markeringen voor prioriteit, samenvatting, sluimeren en triage bestaan; markeringen voor snel antwoord en taakbevestiging zijn niet aangetroffen, terwijl acties voor archiveren, prullenbak en spam wel bestaan.
- Bewijs 3: [requests/2026-07-19/REQ-0003-deep-research-knowledge-hub.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/c0ee79987b7d5637b35bb1462f1696fffcc4a828/requests/2026-07-19/REQ-0003-deep-research-knowledge-hub.md); Eenmalig gelezen op het uiteinde van het onveranderlijke REQ-0004-register. Resultaat: Verzoek REQ-0003 registreert toestemmingen als referentie en toestemmingsgrondslag als geen; rapportkandidaten zijn geen bevoegdheid geworden.
- Beperkingen: Toekomstige omvang vormt geen bevoegdheid; er is geen inventarisatie van de weergegeven interface of acties in de uitvoeringsomgeving uitgevoerd.

## KH-PERM-003

- Status: `gedeeltelijk`
- Categorie: `KH-PERM`; type: `toestemming`
- Relevantie: toestemmingsbestuur
- Bereik en niveau: `bestuur` / `E1`
- Bewering: Hulpmiddelen voor browser, ontwikkelprotocol en uitvoeringsomgeving mogen pas worden overwogen na controle van mogelijkheden en rechten; dit is geen door de eigenaar verleende toestemming.
- Implementatiestatus: canonieke browsertoestemming gesteld maar herleidbaar verzoek van eigenaar ontbreekt
- Afhankelijkheden: canonieke registratie in het onderdeel toestemmingen; herleidbaar bijbehorend verzoek van de eigenaar; mogelijkhedenbewijs
- Conflicten: geen
- Gevoeligheid: `intern`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-030](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [docs/en/knowledge-hub/PERMISSIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PERMISSIONS.md); Eenmalige lezing van het toegewezen paginapaar bij de onveranderlijke actieve vastlegging. Resultaat: Tweetalige ID's, bron-ID's, conflicten en formuleringen komen overeen; de pagina bestempelt het item als uit rapporten afgeleid en niet-gezaghebbend.
- Bewijs 2: [permissions/P-001-browser-pc-control.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/37ef923a0629da4cfd83b9f218561ead73386223/permissions/P-001-browser-pc-control.md); Eenmalig vergeleken met het canonieke actieve dossier. Resultaat: Item P-001 stelt bevoegdheid voor browser en computer, maar heeft geen verzoek-ID en geen vereiste voor een mogelijkhedencontrole van ontwikkelprotocol en uitvoeringsomgeving.
- Bewijs 3: [PERMISSIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/c32075367a0f8b5f0705f46835f28d74c3e0ff41/PERMISSIONS.md); Onveranderlijke afstamming van de toestemmingsvertakking en vastleggingsmetadata geïnspecteerd. Resultaat: De items P-001 tot en met P-004 zijn in de geschiedenis opgenomen bij c320753 zonder herleidbare verzoek-ID; P-005 is later toegevoegd vanuit REQ-0002.
- Bewijs 4: [requests/2026-07-19/REQ-0003-deep-research-knowledge-hub.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/c0ee79987b7d5637b35bb1462f1696fffcc4a828/requests/2026-07-19/REQ-0003-deep-research-knowledge-hub.md); Eenmalig gelezen op het uiteinde van het onveranderlijke REQ-0004-register. Resultaat: Verzoek REQ-0003 registreert toestemmingen als referentie en toestemmingsgrondslag als geen; rapportkandidaten zijn geen bevoegdheid geworden.
- Bewijs 5: [requests/2026-07-19/REQ-0004-independent-factual-verification-reports.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/c0ee79987b7d5637b35bb1462f1696fffcc4a828/requests/2026-07-19/REQ-0004-independent-factual-verification-reports.md); Eenmalig gelezen bij de onveranderlijke vastlegging c0ee799. Resultaat: Vereist primair bewijs en een registratie in het canonieke onderdeel toestemmingen plus een bijbehorend verzoek van de eigenaar voor toestemmingsverificatie.
- Beperkingen: Exact veilig ontbrekend bewijs: het canonieke verzoek van de eigenaar waarbij P-001 is verleend plus een expliciet bereik voor ontwikkelprotocol en uitvoeringsomgeving en een mogelijkhedenpoort.

## KH-PLAN-001

- Status: `aanbeveling`
- Categorie: `KH-PLAN`; type: `plan`
- Relevantie: actuele aflevermethode
- Bereik en niveau: `broncodeopslagplaats` / `E1`
- Bewering: De implementatie moet evolutionair plaatsvinden in plaats van als één grote omslag.
- Implementatiestatus: stapsgewijs overgenomen
- Afhankelijkheden: geen
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R1-053](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Bewijs 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); De bronpagina's zijn eenmalig gelezen en op canonieke ID met elkaar afgestemd. Resultaat: Dit legt de toegewezen uit rapporten afgeleide bewering vast en vormt geen onafhankelijk bewijs van implementatie of gedrag in de uitvoeringsomgeving.
- Bewijs 2: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/d88388ee9ac67dcfc537369014f36f7ad4b11a9a/apps-script/MailApp.html); Inspectie van Git-vastleggingsmetadata en gewijzigde paden, bevestigd door actieve statische broncode. Resultaat: De vastlegging voegt de neuro-inclusieve focusweergave toe in client, server, testen en ontwerpartefacten.
- Bewijs 3: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/fa15f11987c1435ca8975594780c8a1d1c91508d/apps-script/Code.gs); Inspectie van Git-vastleggingsmetadata en gewijzigde paden. Resultaat: De vastlegging consolideert product v45 op een onveranderlijke vrijgavelijn van Apps Script.
- Bewijs 4: [docs/en/ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/ROADMAP.md); Inspectie van het onveranderlijke tweetalige stappenplan. Resultaat: Versie 1 is de enige actieve versie; lokale herstelwijzigingen, handmatige OAuth-acceptatie, onveranderlijke testopstelling, promotie, opschoning, label en vrijgavevertakking vormen afzonderlijke poorten.
- Beperkingen: De bron in het kenniscentrum is uit rapporten afgeleide herkomst en vormt geen onafhankelijk bewijs.; Er is geen status van Gmail, Telegram, Apps Script, testomgeving of productieomgeving geraadpleegd.

## KH-PLAN-002

- Status: `gedeeltelijk`
- Categorie: `KH-PLAN`; type: `plan`
- Relevantie: geïmplementeerde functiereeks
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: Uitgave 1: focusweergave, triage in vier klassen, bundeling, zachte herinneringen, ondersteunende teksten, samenvatting met broncitaten en antwoorden met lage drempel.
- Implementatiestatus: statisch geïmplementeerd met ongeverifieerde uitvoeringsomgeving
- Afhankelijkheden: afstemming van bevoegdheden in fase 0; controle van bewijs en fundament in fase 1
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R1-054](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Bewijs 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); De bronpagina's zijn eenmalig gelezen en op canonieke ID met elkaar afgestemd. Resultaat: Dit legt de toegewezen uit rapporten afgeleide bewering vast en vormt geen onafhankelijk bewijs van implementatie of gedrag in de uitvoeringsomgeving.
- Bewijs 2: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Enkelvoudige statische inspectie van functies, documentmodel en patronen met schoning van gevoelige letterlijke waarden. Resultaat: Focusweergave, triage, instellingen voor energie, herinneringen en dichtheid, stille uren, gezamenlijke verwerking, milde mijlpalen, achterstandsherstel, bewijsweergave, profielafbeeldingen van accounts, directe OAuth-navigatie met terugvalroute, lege toestanden en foutkaarten, opstelscherm, schoning van het documentmodel en idempotente bewerkings-ID's aan clientzijde aangetroffen.
- Bewijs 3: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Enkelvoudige statische inspectie van functies, koppelvlakken en patronen met schoning van gevoelige letterlijke waarden. Resultaat: Accountgebonden aanroepen op afstand, focusregels, vierdelige aandachtstriage, achterstandsherstel, gezamenlijke verwerking, functionele meetwaarden, op bewijs gebaseerde overdracht, schoningsfuncties, controles van webadressen en DNS, bewerkingslogboeken, gepland verzenden, sessies en door vergrendeling beschermde statuspaden aangetroffen.
- Bewijs 4: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Enkelvoudige statische inspectie van functies, koppelvlakken en patronen met schoning van gevoelige letterlijke waarden. Resultaat: Ontdubbeling van meldingen voor eigenaar en gelijke e-mailberichten, begrensde afleverregisters, status voor peilen en voortzetting, vergrendelingen op script- en gebruikersniveau, eenmalige startgetallen, validatie van webhaaksleutels, herinneringen, synchronisatie van Gmail-geschiedenis en Telegram-terugkoppelingen aangetroffen.
- Bewijs 5: [apps-script/tests/mail_app_contract.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_app_contract.test.js); Uitsluitend statische inspectie van testnamen en relevante contracten; testen zijn niet uitgevoerd. Resultaat: Testdefinities dekken routering van profielafbeeldingen, exact accountbehoud, drie primaire focusacties, ondersteunende instellingen voor energie en herinneringen, adaptieve dichtheid, gezamenlijke verwerking, milde mijlpalen, achterstandsherstel, inhoudsvrije meetwaarden, toegankelijke introductie en idempotent opstellen.
- Bewijs 6: [apps-script/tests/mail_actions.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_actions.test.js); Uitsluitend statische inspectie van testnamen en relevante contracten; testen zijn niet uitgevoerd. Resultaat: Testdefinities dekken gmail.modify zonder volledig e-mail- of verzendbereik, tijdconstante geheimcontrole voor webhaken, ontdubbeling van terugkoppelingen, begrensd peilen en herhalen, accountisolatie, veiligheid van webadressen en DNS, Gmail-geschiedenis en herinneringen tijdens stille uren.
- Bewijs 7: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/d88388ee9ac67dcfc537369014f36f7ad4b11a9a/apps-script/MailApp.html); Inspectie van Git-vastleggingsmetadata en gewijzigde paden, bevestigd door actieve statische broncode. Resultaat: De vastlegging voegt de neuro-inclusieve focusweergave toe in client, server, testen en ontwerpartefacten.
- Bewijs 8: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/5e7c1f70b01814d0cd14a45abcbe6dfa8d2f3efb/apps-script/MailClient.gs); Inspectie van Git-vastleggingsmetadata en gewijzigde paden, bevestigd door actieve statische broncode. Resultaat: De vastlegging voegt het contract voor betrouwbaar samenvattingsbewijs toe.
- Bewijs 9: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/d6d105c3140d74888f89d77572f155d1eec941c0/apps-script/Code.gs); Inspectie van Git-vastleggingsmetadata en gewijzigde paden, bevestigd door actieve statische broncode. Resultaat: De vastlegging voegt ondersteunende accountgebonden herinneringen toe; een latere onveranderlijke vastlegging zet deze voort via overzichtsvensters.
- Beperkingen: De bron in het kenniscentrum is uit rapporten afgeleide herkomst en vormt geen onafhankelijk bewijs.; Statische inspectie stelt de implementatiestructuur vast, maar niet een geslaagde uitvoering.; Er zijn geen testen uitgevoerd; geïnspecteerde testdefinities bewijzen niet dat een test is geslaagd.; Er is geen status van Gmail, Telegram, Apps Script, testomgeving of productieomgeving geraadpleegd.

## KH-PLAN-003

- Status: `geverifieerd`
- Categorie: `KH-PLAN`; type: `plan`
- Relevantie: geïmplementeerde functiereeks
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: Uitgave 2: energiemodi, achterstandsherstel, extractie van agenda- en taakpunten en gezamenlijke verwerking.
- Implementatiestatus: statisch geïmplementeerd
- Afhankelijkheden: afstemming van bevoegdheden in fase 0; controle van bewijs en fundament in fase 1
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R1-055](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Bewijs 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); De bronpagina's zijn eenmalig gelezen en op canonieke ID met elkaar afgestemd. Resultaat: Dit legt de toegewezen uit rapporten afgeleide bewering vast en vormt geen onafhankelijk bewijs van implementatie of gedrag in de uitvoeringsomgeving.
- Bewijs 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Enkelvoudige statische inspectie van functies, koppelvlakken en patronen met schoning van gevoelige letterlijke waarden. Resultaat: Accountgebonden aanroepen op afstand, focusregels, vierdelige aandachtstriage, achterstandsherstel, gezamenlijke verwerking, functionele meetwaarden, op bewijs gebaseerde overdracht, schoningsfuncties, controles van webadressen en DNS, bewerkingslogboeken, gepland verzenden, sessies en door vergrendeling beschermde statuspaden aangetroffen.
- Bewijs 3: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Enkelvoudige statische inspectie van functies, documentmodel en patronen met schoning van gevoelige letterlijke waarden. Resultaat: Focusweergave, triage, instellingen voor energie, herinneringen en dichtheid, stille uren, gezamenlijke verwerking, milde mijlpalen, achterstandsherstel, bewijsweergave, profielafbeeldingen van accounts, directe OAuth-navigatie met terugvalroute, lege toestanden en foutkaarten, opstelscherm, schoning van het documentmodel en idempotente bewerkings-ID's aan clientzijde aangetroffen.
- Bewijs 4: [apps-script/tests/mail_client.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_client.test.js); Uitsluitend statische inspectie van testnamen en relevante contracten; testen zijn niet uitgevoerd. Resultaat: Testdefinities dekken tegen herhaling bestand zijnde sessies, sleutel- en statusvergrendelingen, accountisolatie, focusmodus, triage, energie en herinneringen, gezamenlijke verwerking, achterstandsherstel, inhoudsvrije meetwaarden, veiligheid van webadressen, idempotent verzenden en gepland verzenden.
- Bewijs 5: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/968826da8b9f13c27e6eef65033ead10c7797a11/apps-script/MailClient.gs); Inspectie van Git-vastleggingsmetadata en gewijzigde paden, bevestigd door actieve statische broncode. Resultaat: De vastlegging voegt energiebewuste focussessies toe.
- Bewijs 6: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/a41242cc608d1c94edb336eeb4f4c8b00ac1ec67/apps-script/MailClient.gs); Inspectie van Git-vastleggingsmetadata en gewijzigde paden, bevestigd door actieve statische broncode. Resultaat: De vastlegging voegt begrensde sessies voor achterstandsherstel toe.
- Bewijs 7: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/eadcd818f8ce008823aabfd6992efef53ff87572/apps-script/MailClient.gs); Inspectie van Git-vastleggingsmetadata en gewijzigde paden, bevestigd door actieve statische broncode. Resultaat: De vastlegging voegt op bewijs gebaseerde overdracht naar taken en Agenda toe.
- Bewijs 8: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/7413454aa03581dbedaf75eab0e1c38b12e8bf8b/apps-script/MailClient.gs); Inspectie van Git-vastleggingsmetadata en gewijzigde paden, bevestigd door actieve statische broncode. Resultaat: De vastlegging voegt besloten aanwezigheidsondersteuning voor gezamenlijke verwerking toe.
- Beperkingen: De bron in het kenniscentrum is uit rapporten afgeleide herkomst en vormt geen onafhankelijk bewijs.; Statische inspectie stelt de implementatiestructuur vast, maar niet een geslaagde uitvoering.; Er zijn geen testen uitgevoerd; geïnspecteerde testdefinities bewijzen niet dat een test is geslaagd.; Er is geen status van Gmail, Telegram, Apps Script, testomgeving of productieomgeving geraadpleegd.

## KH-PLAN-004

- Status: `gedeeltelijk`
- Categorie: `KH-PLAN`; type: `plan`
- Relevantie: toekomstige personalisatie
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: Uitgave 3: gepersonaliseerd leren op basis van tijdstip, vermijdingsgedrag, herinneringsstijl, triagesnelheid en informatiedichtheid.
- Implementatiestatus: adaptieve informatiedichtheid en voorkeuren geïmplementeerd zonder leermodel
- Afhankelijkheden: afstemming van bevoegdheden in fase 0; controle van bewijs en fundament in fase 1
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R1-056](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Bewijs 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); De bronpagina's zijn eenmalig gelezen en op canonieke ID met elkaar afgestemd. Resultaat: Dit legt de toegewezen uit rapporten afgeleide bewering vast en vormt geen onafhankelijk bewijs van implementatie of gedrag in de uitvoeringsomgeving.
- Bewijs 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Enkelvoudige statische inspectie van functies, koppelvlakken en patronen met schoning van gevoelige letterlijke waarden. Resultaat: Accountgebonden aanroepen op afstand, focusregels, vierdelige aandachtstriage, achterstandsherstel, gezamenlijke verwerking, functionele meetwaarden, op bewijs gebaseerde overdracht, schoningsfuncties, controles van webadressen en DNS, bewerkingslogboeken, gepland verzenden, sessies en door vergrendeling beschermde statuspaden aangetroffen.
- Bewijs 3: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Enkelvoudige statische inspectie van functies, documentmodel en patronen met schoning van gevoelige letterlijke waarden. Resultaat: Focusweergave, triage, instellingen voor energie, herinneringen en dichtheid, stille uren, gezamenlijke verwerking, milde mijlpalen, achterstandsherstel, bewijsweergave, profielafbeeldingen van accounts, directe OAuth-navigatie met terugvalroute, lege toestanden en foutkaarten, opstelscherm, schoning van het documentmodel en idempotente bewerkings-ID's aan clientzijde aangetroffen.
- Bewijs 4: [apps-script/tests/mail_app_contract.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_app_contract.test.js); Uitsluitend statische inspectie van testnamen en relevante contracten; testen zijn niet uitgevoerd. Resultaat: Testdefinities dekken routering van profielafbeeldingen, exact accountbehoud, drie primaire focusacties, ondersteunende instellingen voor energie en herinneringen, adaptieve dichtheid, gezamenlijke verwerking, milde mijlpalen, achterstandsherstel, inhoudsvrije meetwaarden, toegankelijke introductie en idempotent opstellen.
- Bewijs 5: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/359b8cba5cdcaee9ec022ccd659538a4dd108455/apps-script/MailApp.html); Inspectie van Git-vastleggingsmetadata en gewijzigde paden, bevestigd door actieve statische broncode. Resultaat: De vastlegging voegt adaptieve informatiedichtheid toe.
- Beperkingen: De bron in het kenniscentrum is uit rapporten afgeleide herkomst en vormt geen onafhankelijk bewijs.; Statische inspectie stelt de implementatiestructuur vast, maar niet een geslaagde uitvoering.; Er zijn geen testen uitgevoerd; geïnspecteerde testdefinities bewijzen niet dat een test is geslaagd.; Er is geen status van Gmail, Telegram, Apps Script, testomgeving of productieomgeving geraadpleegd.

## KH-PLAN-005

- Status: `gedeeltelijk`
- Categorie: `KH-PLAN`; type: `plan`
- Relevantie: actueel meetwaardenontwerp
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: Meetwaarden moeten tijd tot eerste actie, afronding zonder heropenen, achterstandsherstel, hervattingstijd, weggeklikte herinneringen, overprikkeling, schuldgevoel, adoptie en behoud omvatten.
- Implementatiestatus: inhoudsvrije meetwaarden geïmplementeerd voor een deelverzameling
- Afhankelijkheden: geen
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R1-057](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Bewijs 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); De bronpagina's zijn eenmalig gelezen en op canonieke ID met elkaar afgestemd. Resultaat: Dit legt de toegewezen uit rapporten afgeleide bewering vast en vormt geen onafhankelijk bewijs van implementatie of gedrag in de uitvoeringsomgeving.
- Bewijs 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Enkelvoudige statische inspectie van functies, koppelvlakken en patronen met schoning van gevoelige letterlijke waarden. Resultaat: Accountgebonden aanroepen op afstand, focusregels, vierdelige aandachtstriage, achterstandsherstel, gezamenlijke verwerking, functionele meetwaarden, op bewijs gebaseerde overdracht, schoningsfuncties, controles van webadressen en DNS, bewerkingslogboeken, gepland verzenden, sessies en door vergrendeling beschermde statuspaden aangetroffen.
- Bewijs 3: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Enkelvoudige statische inspectie van functies, documentmodel en patronen met schoning van gevoelige letterlijke waarden. Resultaat: Focusweergave, triage, instellingen voor energie, herinneringen en dichtheid, stille uren, gezamenlijke verwerking, milde mijlpalen, achterstandsherstel, bewijsweergave, profielafbeeldingen van accounts, directe OAuth-navigatie met terugvalroute, lege toestanden en foutkaarten, opstelscherm, schoning van het documentmodel en idempotente bewerkings-ID's aan clientzijde aangetroffen.
- Bewijs 4: [apps-script/tests/mail_app_contract.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_app_contract.test.js); Uitsluitend statische inspectie van testnamen en relevante contracten; testen zijn niet uitgevoerd. Resultaat: Testdefinities dekken routering van profielafbeeldingen, exact accountbehoud, drie primaire focusacties, ondersteunende instellingen voor energie en herinneringen, adaptieve dichtheid, gezamenlijke verwerking, milde mijlpalen, achterstandsherstel, inhoudsvrije meetwaarden, toegankelijke introductie en idempotent opstellen.
- Bewijs 5: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/385f1dc5b2a04091d2bc9c471e52595570c6ee3c/apps-script/MailClient.gs); Inspectie van Git-vastleggingsmetadata en gewijzigde paden, bevestigd door actieve statische broncode. Resultaat: De vastlegging voegt besloten meetwaarden voor functionele verlichting toe.
- Beperkingen: De bron in het kenniscentrum is uit rapporten afgeleide herkomst en vormt geen onafhankelijk bewijs.; Statische inspectie stelt de implementatiestructuur vast, maar niet een geslaagde uitvoering.; Er zijn geen testen uitgevoerd; geïnspecteerde testdefinities bewijzen niet dat een test is geslaagd.; Er is geen status van Gmail, Telegram, Apps Script, testomgeving of productieomgeving geraadpleegd.; Er is geen gebruikersonderzoek, acceptatie van de weergegeven interface of meting van gedragsresultaten uitgevoerd.

## KH-PLAN-006

- Status: `aanbeveling`
- Categorie: `KH-PLAN`; type: `plan`
- Relevantie: buiten het huidige bereik
- Bereik en niveau: `broncodeopslagplaats` / `E1`
- Bewering: Inzet van Mailcow: klonen, `generate_config.sh` uitvoeren, `mailcow.conf` bewerken en vervolgens `docker compose pull/up` draaien; de productieserver moet conflicten met pakketgrootte, poorten en systeemdiensten vermijden.
- Implementatiestatus: niet geïmplementeerd
- Afhankelijkheden: geen
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R2-023](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Bewijs 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); De bronpagina's zijn eenmalig gelezen en op canonieke ID met elkaar afgestemd. Resultaat: Dit legt de toegewezen uit rapporten afgeleide bewering vast en vormt geen onafhankelijk bewijs van implementatie of gedrag in de uitvoeringsomgeving.
- Bewijs 2: [docs/en/PROJECT.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/PROJECT.md); Inspectie van het onveranderlijke bestand, afgestemd met de Oekraïense tegenhanger. Resultaat: De huidige missie is een veilige Gmail-client in Telegram voor één eigenaar en expliciet gekoppelde accounts; de actieve vertakking Versie en het huidige stappenplan en problemenregister zijn gezaghebbend.
- Bewijs 3: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Exacte inspectie van het onveranderlijke manifest. Resultaat: Het project schakelt Gmail v1 in en vraagt de toegangsbereiken gmail.modify, drive.readonly, script.external_request en script.scriptapp aan; de webtoepassing wordt uitgevoerd namens de uitroller en staat anoniem inkomend verkeer toe dat door de toepassingscode moet worden geauthenticeerd.
- Bewijs 4: [README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/README.md); Volledige onveranderlijke inventarisatie via git ls-tree plus gerichte statische inspectie. Resultaat: De broncodeopslagplaats bestaat uit Apps Script, een statische terugkeerpagina, documentatie, testen en vrijgavegereedschap; er bestaat geen implementatie van Mailcow, Stalwart, Dovecot, Postfix, Redis, PostgreSQL, Pub/Sub, Cloud Run of Microsoft Graph.
- Beperkingen: De bron in het kenniscentrum is uit rapporten afgeleide herkomst en vormt geen onafhankelijk bewijs.; Aanwezigheid of afwezigheid is uitsluitend vastgesteld voor de toegewezen onveranderlijke vastlegging.; Er is geen verificatie van externe primaire bronnen uitgevoerd; Git-bewijs kan deze algemene bewering niet vaststellen.

## KH-PLAN-007

- Status: `aanbeveling`
- Categorie: `KH-PLAN`; type: `plan`
- Relevantie: buiten het huidige bereik
- Bereik en niveau: `broncodeopslagplaats` / `E1`
- Bewering: Voor Stalwart: persistente opslag toewijzen, een opslagmotor kiezen, de initiële opstart voltooien en domeinen, transportbeveiliging, snelheidslimieten, spambeleid en het beheer-koppelvlak configureren.
- Implementatiestatus: niet geïmplementeerd
- Afhankelijkheden: geen
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R2-026](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Bewijs 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); De bronpagina's zijn eenmalig gelezen en op canonieke ID met elkaar afgestemd. Resultaat: Dit legt de toegewezen uit rapporten afgeleide bewering vast en vormt geen onafhankelijk bewijs van implementatie of gedrag in de uitvoeringsomgeving.
- Bewijs 2: [docs/en/PROJECT.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/PROJECT.md); Inspectie van het onveranderlijke bestand, afgestemd met de Oekraïense tegenhanger. Resultaat: De huidige missie is een veilige Gmail-client in Telegram voor één eigenaar en expliciet gekoppelde accounts; de actieve vertakking Versie en het huidige stappenplan en problemenregister zijn gezaghebbend.
- Bewijs 3: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Exacte inspectie van het onveranderlijke manifest. Resultaat: Het project schakelt Gmail v1 in en vraagt de toegangsbereiken gmail.modify, drive.readonly, script.external_request en script.scriptapp aan; de webtoepassing wordt uitgevoerd namens de uitroller en staat anoniem inkomend verkeer toe dat door de toepassingscode moet worden geauthenticeerd.
- Bewijs 4: [README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/README.md); Volledige onveranderlijke inventarisatie via git ls-tree plus gerichte statische inspectie. Resultaat: De broncodeopslagplaats bestaat uit Apps Script, een statische terugkeerpagina, documentatie, testen en vrijgavegereedschap; er bestaat geen implementatie van Mailcow, Stalwart, Dovecot, Postfix, Redis, PostgreSQL, Pub/Sub, Cloud Run of Microsoft Graph.
- Beperkingen: De bron in het kenniscentrum is uit rapporten afgeleide herkomst en vormt geen onafhankelijk bewijs.; Aanwezigheid of afwezigheid is uitsluitend vastgesteld voor de toegewezen onveranderlijke vastlegging.; Er is geen verificatie van externe primaire bronnen uitgevoerd; Git-bewijs kan deze algemene bewering niet vaststellen.

## KH-PLAN-008

- Status: `gedeeltelijk`
- Categorie: `KH-PLAN`; type: `plan`
- Relevantie: actuele Telegram-architectuur
- Bereik en niveau: `gemengd` / `E2`
- Bewering: Telegram-stroom: BotFather, hoofd-minitoepassing, toegestane webadressen, gebruikersinterface, serverauthenticatie en koppeling tussen de Telegram-identiteit en een intern accountrecord.
- Implementatiestatus: identiteitskoppeling tussen gebruikersinterface en serverlaag geïmplementeerd, uitvoeringsconfiguratie ongeverifieerd
- Afhankelijkheden: geen
- Conflicten: CF-002
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R2-031](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Bewijs 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); De bronpagina's zijn eenmalig gelezen en op canonieke ID met elkaar afgestemd. Resultaat: Dit legt de toegewezen uit rapporten afgeleide bewering vast en vormt geen onafhankelijk bewijs van implementatie of gedrag in de uitvoeringsomgeving.
- Bewijs 2: [apps-script/V26_MULTI_ACCOUNT_ARCHITECTURE.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/V26_MULTI_ACCOUNT_ARCHITECTURE.md); Inspectie van het onveranderlijke architectuurcontract, waar mogelijk bevestigd door huidige broncode. Resultaat: Een contract voor de koppeling van Gmail- en Telegram-identiteit naar zone, rol en verbinding en een toekomstig gepartitioneerd opslagpad zijn gedocumenteerd; Mailcow, Stalwart en Microsoft Graph vormen niet de huidige implementatie.
- Bewijs 3: [apps-script/MultiAccount.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MultiAccount.gs); Enkelvoudige statische inspectie van OAuth, identiteit, status en vergrendelingen met schoning van gevoelige letterlijke waarden. Resultaat: Autorisatie van Telegram-gebruiker, zone en verbinding, eenmalige OAuth-status, afzonderlijke afgeschermde sleutelregistraties, vastlegging van profielafbeeldingen, accountgebonden registers en talrijke vergrendelingen aangetroffen; de functie voor het vernieuwen van de Gmail-toegangssleutel heeft geen lokale vergrendeling binnen die functie.
- Bewijs 4: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Enkelvoudige statische inspectie van functies, documentmodel en patronen met schoning van gevoelige letterlijke waarden. Resultaat: Focusweergave, triage, instellingen voor energie, herinneringen en dichtheid, stille uren, gezamenlijke verwerking, milde mijlpalen, achterstandsherstel, bewijsweergave, profielafbeeldingen van accounts, directe OAuth-navigatie met terugvalroute, lege toestanden en foutkaarten, opstelscherm, schoning van het documentmodel en idempotente bewerkings-ID's aan clientzijde aangetroffen.
- Bewijs 5: [apps-script/tests/mail_client.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_client.test.js); Uitsluitend statische inspectie van testnamen en relevante contracten; testen zijn niet uitgevoerd. Resultaat: Testdefinities dekken tegen herhaling bestand zijnde sessies, sleutel- en statusvergrendelingen, accountisolatie, focusmodus, triage, energie en herinneringen, gezamenlijke verwerking, achterstandsherstel, inhoudsvrije meetwaarden, veiligheid van webadressen, idempotent verzenden en gepland verzenden.
- Beperkingen: De bron in het kenniscentrum is uit rapporten afgeleide herkomst en vormt geen onafhankelijk bewijs.; Statische inspectie stelt de implementatiestructuur vast, maar niet een geslaagde uitvoering.; Er zijn geen testen uitgevoerd; geïnspecteerde testdefinities bewijzen niet dat een test is geslaagd.; Er is geen status van Gmail, Telegram, Apps Script, testomgeving of productieomgeving geraadpleegd.

## KH-PLAN-009

- Status: `aanbeveling`
- Categorie: `KH-PLAN`; type: `plan`
- Relevantie: buiten het huidige bereik
- Bereik en niveau: `broncodeopslagplaats` / `E1`
- Bewering: Enkele server of minimale werkende versie: Stalwart met RocksDB of standaard Mailcow, bestands- of S3-objectopslag, vluchtige status in Redis en basiszoekfunctionaliteit.
- Implementatiestatus: niet geïmplementeerd
- Afhankelijkheden: geen
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R2-053](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Bewijs 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); De bronpagina's zijn eenmalig gelezen en op canonieke ID met elkaar afgestemd. Resultaat: Dit legt de toegewezen uit rapporten afgeleide bewering vast en vormt geen onafhankelijk bewijs van implementatie of gedrag in de uitvoeringsomgeving.
- Bewijs 2: [docs/en/PROJECT.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/PROJECT.md); Inspectie van het onveranderlijke bestand, afgestemd met de Oekraïense tegenhanger. Resultaat: De huidige missie is een veilige Gmail-client in Telegram voor één eigenaar en expliciet gekoppelde accounts; de actieve vertakking Versie en het huidige stappenplan en problemenregister zijn gezaghebbend.
- Bewijs 3: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Exacte inspectie van het onveranderlijke manifest. Resultaat: Het project schakelt Gmail v1 in en vraagt de toegangsbereiken gmail.modify, drive.readonly, script.external_request en script.scriptapp aan; de webtoepassing wordt uitgevoerd namens de uitroller en staat anoniem inkomend verkeer toe dat door de toepassingscode moet worden geauthenticeerd.
- Bewijs 4: [README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/README.md); Volledige onveranderlijke inventarisatie via git ls-tree plus gerichte statische inspectie. Resultaat: De broncodeopslagplaats bestaat uit Apps Script, een statische terugkeerpagina, documentatie, testen en vrijgavegereedschap; er bestaat geen implementatie van Mailcow, Stalwart, Dovecot, Postfix, Redis, PostgreSQL, Pub/Sub, Cloud Run of Microsoft Graph.
- Beperkingen: De bron in het kenniscentrum is uit rapporten afgeleide herkomst en vormt geen onafhankelijk bewijs.; Aanwezigheid of afwezigheid is uitsluitend vastgesteld voor de toegewezen onveranderlijke vastlegging.; Er is geen verificatie van externe primaire bronnen uitgevoerd; Git-bewijs kan deze algemene bewering niet vaststellen.

## KH-PLAN-010

- Status: `aanbeveling`
- Categorie: `KH-PLAN`; type: `plan`
- Relevantie: toekomstige schaalvergroting buiten het huidige bereik
- Bereik en niveau: `broncodeopslagplaats` / `E1`
- Bewering: Middelgrote schaal of meerdere organisaties: metadata in PostgreSQL, objectopslag in S3/MinIO, vergrendelingen, wachtrijen, snelheidslimieten, sessies en tussenopslag in Redis, plus een aparte zoekmotor wanneer nodig.
- Implementatiestatus: niet geïmplementeerd
- Afhankelijkheden: geen
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R2-054](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Bewijs 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); De bronpagina's zijn eenmalig gelezen en op canonieke ID met elkaar afgestemd. Resultaat: Dit legt de toegewezen uit rapporten afgeleide bewering vast en vormt geen onafhankelijk bewijs van implementatie of gedrag in de uitvoeringsomgeving.
- Bewijs 2: [docs/en/PROJECT.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/PROJECT.md); Inspectie van het onveranderlijke bestand, afgestemd met de Oekraïense tegenhanger. Resultaat: De huidige missie is een veilige Gmail-client in Telegram voor één eigenaar en expliciet gekoppelde accounts; de actieve vertakking Versie en het huidige stappenplan en problemenregister zijn gezaghebbend.
- Bewijs 3: [apps-script/V26_MULTI_ACCOUNT_ARCHITECTURE.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/V26_MULTI_ACCOUNT_ARCHITECTURE.md); Inspectie van het onveranderlijke architectuurcontract, waar mogelijk bevestigd door huidige broncode. Resultaat: Een contract voor de koppeling van Gmail- en Telegram-identiteit naar zone, rol en verbinding en een toekomstig gepartitioneerd opslagpad zijn gedocumenteerd; Mailcow, Stalwart en Microsoft Graph vormen niet de huidige implementatie.
- Bewijs 4: [README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/README.md); Volledige onveranderlijke inventarisatie via git ls-tree plus gerichte statische inspectie. Resultaat: De broncodeopslagplaats bestaat uit Apps Script, een statische terugkeerpagina, documentatie, testen en vrijgavegereedschap; er bestaat geen implementatie van Mailcow, Stalwart, Dovecot, Postfix, Redis, PostgreSQL, Pub/Sub, Cloud Run of Microsoft Graph.
- Beperkingen: De bron in het kenniscentrum is uit rapporten afgeleide herkomst en vormt geen onafhankelijk bewijs.; Aanwezigheid of afwezigheid is uitsluitend vastgesteld voor de toegewezen onveranderlijke vastlegging.; Er is geen verificatie van externe primaire bronnen uitgevoerd; Git-bewijs kan deze algemene bewering niet vaststellen.

## KH-PLAN-011

- Status: `weerlegd`
- Categorie: `KH-PLAN`; type: `plan`
- Relevantie: vervangen door de huidige op Gmail gerichte missie
- Bereik en niveau: `gemengd` / `E2`
- Bewering: Beoogde gelaagde architectuur: Stalwart- of Mailcow-kern, een eigen integratiefacade, verwerkers voor kunstmatige intelligentie en achtergrondtaken, en slimme web- en mobiele toepassingen.
- Implementatiestatus: geen huidige architectuur
- Afhankelijkheden: afstemming van bevoegdheden in fase 0; controle van bewijs en fundament in fase 1
- Conflicten: CF-006
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R2-071](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Bewijs 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); De bronpagina's zijn eenmalig gelezen en op canonieke ID met elkaar afgestemd. Resultaat: Dit legt de toegewezen uit rapporten afgeleide bewering vast en vormt geen onafhankelijk bewijs van implementatie of gedrag in de uitvoeringsomgeving.
- Bewijs 2: [docs/en/PROJECT.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/PROJECT.md); Inspectie van het onveranderlijke bestand, afgestemd met de Oekraïense tegenhanger. Resultaat: De huidige missie is een veilige Gmail-client in Telegram voor één eigenaar en expliciet gekoppelde accounts; de actieve vertakking Versie en het huidige stappenplan en problemenregister zijn gezaghebbend.
- Bewijs 3: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Exacte inspectie van het onveranderlijke manifest. Resultaat: Het project schakelt Gmail v1 in en vraagt de toegangsbereiken gmail.modify, drive.readonly, script.external_request en script.scriptapp aan; de webtoepassing wordt uitgevoerd namens de uitroller en staat anoniem inkomend verkeer toe dat door de toepassingscode moet worden geauthenticeerd.
- Bewijs 4: [apps-script/V26_MULTI_ACCOUNT_ARCHITECTURE.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/V26_MULTI_ACCOUNT_ARCHITECTURE.md); Inspectie van het onveranderlijke architectuurcontract, waar mogelijk bevestigd door huidige broncode. Resultaat: Een contract voor de koppeling van Gmail- en Telegram-identiteit naar zone, rol en verbinding en een toekomstig gepartitioneerd opslagpad zijn gedocumenteerd; Mailcow, Stalwart en Microsoft Graph vormen niet de huidige implementatie.
- Bewijs 5: [README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/README.md); Volledige onveranderlijke inventarisatie via git ls-tree plus gerichte statische inspectie. Resultaat: De broncodeopslagplaats bestaat uit Apps Script, een statische terugkeerpagina, documentatie, testen en vrijgavegereedschap; er bestaat geen implementatie van Mailcow, Stalwart, Dovecot, Postfix, Redis, PostgreSQL, Pub/Sub, Cloud Run of Microsoft Graph.
- Beperkingen: De bron in het kenniscentrum is uit rapporten afgeleide herkomst en vormt geen onafhankelijk bewijs.; Aanwezigheid of afwezigheid is uitsluitend vastgesteld voor de toegewezen onveranderlijke vastlegging.; Er is geen status van Gmail, Telegram, Apps Script, testomgeving of productieomgeving geraadpleegd.

## KH-PLAN-012

- Status: `aanbeveling`
- Categorie: `KH-PLAN`; type: `plan`
- Relevantie: buiten het huidige op Gmail gerichte bereik
- Bereik en niveau: `broncodeopslagplaats` / `E1`
- Bewering: Fase 1: het protocolcontract vastleggen, de kern kiezen, een referentie-inzet starten met SPF, DKIM, DMARC, MTA-STS, TLS-RPT, reservekopieën, logboeken en bewaking, en daarna de toepassingslaag en gebruikerstoepassingen toevoegen.
- Implementatiestatus: niet geïmplementeerd
- Afhankelijkheden: afstemming van bevoegdheden in fase 0; controle van bewijs en fundament in fase 1
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R2-072](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Bewijs 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); De bronpagina's zijn eenmalig gelezen en op canonieke ID met elkaar afgestemd. Resultaat: Dit legt de toegewezen uit rapporten afgeleide bewering vast en vormt geen onafhankelijk bewijs van implementatie of gedrag in de uitvoeringsomgeving.
- Bewijs 2: [docs/en/PROJECT.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/PROJECT.md); Inspectie van het onveranderlijke bestand, afgestemd met de Oekraïense tegenhanger. Resultaat: De huidige missie is een veilige Gmail-client in Telegram voor één eigenaar en expliciet gekoppelde accounts; de actieve vertakking Versie en het huidige stappenplan en problemenregister zijn gezaghebbend.
- Bewijs 3: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Exacte inspectie van het onveranderlijke manifest. Resultaat: Het project schakelt Gmail v1 in en vraagt de toegangsbereiken gmail.modify, drive.readonly, script.external_request en script.scriptapp aan; de webtoepassing wordt uitgevoerd namens de uitroller en staat anoniem inkomend verkeer toe dat door de toepassingscode moet worden geauthenticeerd.
- Bewijs 4: [README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/README.md); Volledige onveranderlijke inventarisatie via git ls-tree plus gerichte statische inspectie. Resultaat: De broncodeopslagplaats bestaat uit Apps Script, een statische terugkeerpagina, documentatie, testen en vrijgavegereedschap; er bestaat geen implementatie van Mailcow, Stalwart, Dovecot, Postfix, Redis, PostgreSQL, Pub/Sub, Cloud Run of Microsoft Graph.
- Beperkingen: De bron in het kenniscentrum is uit rapporten afgeleide herkomst en vormt geen onafhankelijk bewijs.; Aanwezigheid of afwezigheid is uitsluitend vastgesteld voor de toegewezen onveranderlijke vastlegging.; Er is geen verificatie van externe primaire bronnen uitgevoerd; Git-bewijs kan deze algemene bewering niet vaststellen.

## KH-PLAN-013

- Status: `gedeeltelijk`
- Categorie: `KH-PLAN`; type: `plan`
- Relevantie: gedeeltelijk actueel
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: Fase 2: Gmail API, Microsoft Graph, Telegram Bot en minitoepassing, opslagadapters en een module voor toestemming en gegevensbescherming; Apps Script of een uitbreiding is optioneel.
- Implementatiestatus: opslag voor Gmail en Telegram geïmplementeerd, Microsoft Graph en zelfstandige toestemmingsmodule afwezig
- Afhankelijkheden: contextuele minimale werkende versie voor Gmail in fase 4
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R2-074](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Bewijs 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); De bronpagina's zijn eenmalig gelezen en op canonieke ID met elkaar afgestemd. Resultaat: Dit legt de toegewezen uit rapporten afgeleide bewering vast en vormt geen onafhankelijk bewijs van implementatie of gedrag in de uitvoeringsomgeving.
- Bewijs 2: [apps-script/MultiAccount.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MultiAccount.gs); Enkelvoudige statische inspectie van OAuth, identiteit, status en vergrendelingen met schoning van gevoelige letterlijke waarden. Resultaat: Autorisatie van Telegram-gebruiker, zone en verbinding, eenmalige OAuth-status, afzonderlijke afgeschermde sleutelregistraties, vastlegging van profielafbeeldingen, accountgebonden registers en talrijke vergrendelingen aangetroffen; de functie voor het vernieuwen van de Gmail-toegangssleutel heeft geen lokale vergrendeling binnen die functie.
- Bewijs 3: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Enkelvoudige statische inspectie van functies, koppelvlakken en patronen met schoning van gevoelige letterlijke waarden. Resultaat: Accountgebonden aanroepen op afstand, focusregels, vierdelige aandachtstriage, achterstandsherstel, gezamenlijke verwerking, functionele meetwaarden, op bewijs gebaseerde overdracht, schoningsfuncties, controles van webadressen en DNS, bewerkingslogboeken, gepland verzenden, sessies en door vergrendeling beschermde statuspaden aangetroffen.
- Bewijs 4: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Enkelvoudige statische inspectie van functies, documentmodel en patronen met schoning van gevoelige letterlijke waarden. Resultaat: Focusweergave, triage, instellingen voor energie, herinneringen en dichtheid, stille uren, gezamenlijke verwerking, milde mijlpalen, achterstandsherstel, bewijsweergave, profielafbeeldingen van accounts, directe OAuth-navigatie met terugvalroute, lege toestanden en foutkaarten, opstelscherm, schoning van het documentmodel en idempotente bewerkings-ID's aan clientzijde aangetroffen.
- Bewijs 5: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Exacte inspectie van het onveranderlijke manifest. Resultaat: Het project schakelt Gmail v1 in en vraagt de toegangsbereiken gmail.modify, drive.readonly, script.external_request en script.scriptapp aan; de webtoepassing wordt uitgevoerd namens de uitroller en staat anoniem inkomend verkeer toe dat door de toepassingscode moet worden geauthenticeerd.
- Bewijs 6: [docs/en/PROJECT.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/PROJECT.md); Inspectie van het onveranderlijke bestand, afgestemd met de Oekraïense tegenhanger. Resultaat: De huidige missie is een veilige Gmail-client in Telegram voor één eigenaar en expliciet gekoppelde accounts; de actieve vertakking Versie en het huidige stappenplan en problemenregister zijn gezaghebbend.
- Beperkingen: De bron in het kenniscentrum is uit rapporten afgeleide herkomst en vormt geen onafhankelijk bewijs.; Statische inspectie stelt de implementatiestructuur vast, maar niet een geslaagde uitvoering.; Er is geen status van Gmail, Telegram, Apps Script, testomgeving of productieomgeving geraadpleegd.; Aanwezigheid of afwezigheid is uitsluitend vastgesteld voor de toegewezen onveranderlijke vastlegging.

## KH-PLAN-014

- Status: `gedeeltelijk`
- Categorie: `KH-PLAN`; type: `plan`
- Relevantie: gedeeltelijk actueel
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: Fase 3: een op ADHD afgestemde slimme werkomgeving met wachtrijen voor snelle acties, verlooprisico, wachten op antwoord, later, gefilterde post en benodigde energie.
- Implementatiestatus: snelle acties in focusmodus en triage geïmplementeerd, volledige wachtrijreeks niet bewezen
- Afhankelijkheden: afstemming van bevoegdheden in fase 0; controle van bewijs en fundament in fase 1
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R2-075](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Bewijs 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); De bronpagina's zijn eenmalig gelezen en op canonieke ID met elkaar afgestemd. Resultaat: Dit legt de toegewezen uit rapporten afgeleide bewering vast en vormt geen onafhankelijk bewijs van implementatie of gedrag in de uitvoeringsomgeving.
- Bewijs 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Enkelvoudige statische inspectie van functies, koppelvlakken en patronen met schoning van gevoelige letterlijke waarden. Resultaat: Accountgebonden aanroepen op afstand, focusregels, vierdelige aandachtstriage, achterstandsherstel, gezamenlijke verwerking, functionele meetwaarden, op bewijs gebaseerde overdracht, schoningsfuncties, controles van webadressen en DNS, bewerkingslogboeken, gepland verzenden, sessies en door vergrendeling beschermde statuspaden aangetroffen.
- Bewijs 3: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Enkelvoudige statische inspectie van functies, documentmodel en patronen met schoning van gevoelige letterlijke waarden. Resultaat: Focusweergave, triage, instellingen voor energie, herinneringen en dichtheid, stille uren, gezamenlijke verwerking, milde mijlpalen, achterstandsherstel, bewijsweergave, profielafbeeldingen van accounts, directe OAuth-navigatie met terugvalroute, lege toestanden en foutkaarten, opstelscherm, schoning van het documentmodel en idempotente bewerkings-ID's aan clientzijde aangetroffen.
- Bewijs 4: [apps-script/tests/mail_app_contract.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_app_contract.test.js); Uitsluitend statische inspectie van testnamen en relevante contracten; testen zijn niet uitgevoerd. Resultaat: Testdefinities dekken routering van profielafbeeldingen, exact accountbehoud, drie primaire focusacties, ondersteunende instellingen voor energie en herinneringen, adaptieve dichtheid, gezamenlijke verwerking, milde mijlpalen, achterstandsherstel, inhoudsvrije meetwaarden, toegankelijke introductie en idempotent opstellen.
- Beperkingen: De bron in het kenniscentrum is uit rapporten afgeleide herkomst en vormt geen onafhankelijk bewijs.; Statische inspectie stelt de implementatiestructuur vast, maar niet een geslaagde uitvoering.; Er zijn geen testen uitgevoerd; geïnspecteerde testdefinities bewijzen niet dat een test is geslaagd.; Er is geen status van Gmail, Telegram, Apps Script, testomgeving of productieomgeving geraadpleegd.

## KH-PLAN-015

- Status: `aanbeveling`
- Categorie: `KH-PLAN`; type: `plan`
- Relevantie: buiten het huidige bereik
- Bereik en niveau: `broncodeopslagplaats` / `E1`
- Bewering: Snelle opzet voor minimale werkende versie: Mailcow-kern, Roundcube of eigen webschil, meegeleverde Rspamd, integratiedienst, Redis-taken, ADHD-schil en slimme triage.
- Implementatiestatus: niet geïmplementeerd
- Afhankelijkheden: afstemming van bevoegdheden in fase 0; controle van bewijs en fundament in fase 1
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R2-076](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Bewijs 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); De bronpagina's zijn eenmalig gelezen en op canonieke ID met elkaar afgestemd. Resultaat: Dit legt de toegewezen uit rapporten afgeleide bewering vast en vormt geen onafhankelijk bewijs van implementatie of gedrag in de uitvoeringsomgeving.
- Bewijs 2: [docs/en/PROJECT.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/PROJECT.md); Inspectie van het onveranderlijke bestand, afgestemd met de Oekraïense tegenhanger. Resultaat: De huidige missie is een veilige Gmail-client in Telegram voor één eigenaar en expliciet gekoppelde accounts; de actieve vertakking Versie en het huidige stappenplan en problemenregister zijn gezaghebbend.
- Bewijs 3: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Exacte inspectie van het onveranderlijke manifest. Resultaat: Het project schakelt Gmail v1 in en vraagt de toegangsbereiken gmail.modify, drive.readonly, script.external_request en script.scriptapp aan; de webtoepassing wordt uitgevoerd namens de uitroller en staat anoniem inkomend verkeer toe dat door de toepassingscode moet worden geauthenticeerd.
- Bewijs 4: [README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/README.md); Volledige onveranderlijke inventarisatie via git ls-tree plus gerichte statische inspectie. Resultaat: De broncodeopslagplaats bestaat uit Apps Script, een statische terugkeerpagina, documentatie, testen en vrijgavegereedschap; er bestaat geen implementatie van Mailcow, Stalwart, Dovecot, Postfix, Redis, PostgreSQL, Pub/Sub, Cloud Run of Microsoft Graph.
- Beperkingen: De bron in het kenniscentrum is uit rapporten afgeleide herkomst en vormt geen onafhankelijk bewijs.; Aanwezigheid of afwezigheid is uitsluitend vastgesteld voor de toegewezen onveranderlijke vastlegging.; Er is geen verificatie van externe primaire bronnen uitgevoerd; Git-bewijs kan deze algemene bewering niet vaststellen.

## KH-PLAN-016

- Status: `aanbeveling`
- Categorie: `KH-PLAN`; type: `plan`
- Relevantie: buiten het huidige bereik
- Bereik en niveau: `broncodeopslagplaats` / `E1`
- Bewering: Moderne langetermijnopzet: Stalwart-kern, Bulwark als referentie- of tijdelijke gebruikerstoepassing, eigen orkestratie, PostgreSQL voor schaalbaarheid, S3/MinIO, Redis en maatwerktoepassingen.
- Implementatiestatus: niet geïmplementeerd
- Afhankelijkheden: afstemming van bevoegdheden in fase 0; controle van bewijs en fundament in fase 1
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R2-077](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Bewijs 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); De bronpagina's zijn eenmalig gelezen en op canonieke ID met elkaar afgestemd. Resultaat: Dit legt de toegewezen uit rapporten afgeleide bewering vast en vormt geen onafhankelijk bewijs van implementatie of gedrag in de uitvoeringsomgeving.
- Bewijs 2: [docs/en/PROJECT.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/PROJECT.md); Inspectie van het onveranderlijke bestand, afgestemd met de Oekraïense tegenhanger. Resultaat: De huidige missie is een veilige Gmail-client in Telegram voor één eigenaar en expliciet gekoppelde accounts; de actieve vertakking Versie en het huidige stappenplan en problemenregister zijn gezaghebbend.
- Bewijs 3: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Exacte inspectie van het onveranderlijke manifest. Resultaat: Het project schakelt Gmail v1 in en vraagt de toegangsbereiken gmail.modify, drive.readonly, script.external_request en script.scriptapp aan; de webtoepassing wordt uitgevoerd namens de uitroller en staat anoniem inkomend verkeer toe dat door de toepassingscode moet worden geauthenticeerd.
- Bewijs 4: [README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/README.md); Volledige onveranderlijke inventarisatie via git ls-tree plus gerichte statische inspectie. Resultaat: De broncodeopslagplaats bestaat uit Apps Script, een statische terugkeerpagina, documentatie, testen en vrijgavegereedschap; er bestaat geen implementatie van Mailcow, Stalwart, Dovecot, Postfix, Redis, PostgreSQL, Pub/Sub, Cloud Run of Microsoft Graph.
- Beperkingen: De bron in het kenniscentrum is uit rapporten afgeleide herkomst en vormt geen onafhankelijk bewijs.; Aanwezigheid of afwezigheid is uitsluitend vastgesteld voor de toegewezen onveranderlijke vastlegging.; Er is geen verificatie van externe primaire bronnen uitgevoerd; Git-bewijs kan deze algemene bewering niet vaststellen.

## KH-PLAN-017

- Status: `aanbeveling`
- Categorie: `KH-PLAN`; type: `plan`
- Relevantie: buiten het huidige bereik
- Bereik en niveau: `broncodeopslagplaats` / `E1`
- Bewering: Opzet voor maximale voorspelbaarheid: Postfix, Dovecot, Rspamd, OpenDKIM, OpenDMARC, OpenARC, Roundcube en optionele DAV-server; dit vereist het meeste integratiewerk.
- Implementatiestatus: niet geïmplementeerd
- Afhankelijkheden: afstemming van bevoegdheden in fase 0; controle van bewijs en fundament in fase 1
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R2-078](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Bewijs 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); De bronpagina's zijn eenmalig gelezen en op canonieke ID met elkaar afgestemd. Resultaat: Dit legt de toegewezen uit rapporten afgeleide bewering vast en vormt geen onafhankelijk bewijs van implementatie of gedrag in de uitvoeringsomgeving.
- Bewijs 2: [docs/en/PROJECT.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/PROJECT.md); Inspectie van het onveranderlijke bestand, afgestemd met de Oekraïense tegenhanger. Resultaat: De huidige missie is een veilige Gmail-client in Telegram voor één eigenaar en expliciet gekoppelde accounts; de actieve vertakking Versie en het huidige stappenplan en problemenregister zijn gezaghebbend.
- Bewijs 3: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Exacte inspectie van het onveranderlijke manifest. Resultaat: Het project schakelt Gmail v1 in en vraagt de toegangsbereiken gmail.modify, drive.readonly, script.external_request en script.scriptapp aan; de webtoepassing wordt uitgevoerd namens de uitroller en staat anoniem inkomend verkeer toe dat door de toepassingscode moet worden geauthenticeerd.
- Bewijs 4: [README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/README.md); Volledige onveranderlijke inventarisatie via git ls-tree plus gerichte statische inspectie. Resultaat: De broncodeopslagplaats bestaat uit Apps Script, een statische terugkeerpagina, documentatie, testen en vrijgavegereedschap; er bestaat geen implementatie van Mailcow, Stalwart, Dovecot, Postfix, Redis, PostgreSQL, Pub/Sub, Cloud Run of Microsoft Graph.
- Beperkingen: De bron in het kenniscentrum is uit rapporten afgeleide herkomst en vormt geen onafhankelijk bewijs.; Aanwezigheid of afwezigheid is uitsluitend vastgesteld voor de toegewezen onveranderlijke vastlegging.; Er is geen verificatie van externe primaire bronnen uitgevoerd; Git-bewijs kan deze algemene bewering niet vaststellen.

## KH-PLAN-018

- Status: `gedeeltelijk`
- Categorie: `KH-PLAN`; type: `plan`
- Relevantie: actuele controle
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: Een controle van de broncodeopslagplaats voorbereiden en uitvoeren voor beveiliging, OAuth, statusbeheer, vergrendeling, webhaken, MIME, logregistratie en geheimen, afgesloten met een herstelplan.
- Implementatiestatus: meerdere statische controles en herstelwijzigingen bestaan, volledig herstelplan niet bewezen
- Afhankelijkheden: geen
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-028](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md), [R3-088](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); De bronpagina's zijn eenmalig gelezen en op canonieke ID met elkaar afgestemd. Resultaat: Dit legt de toegewezen uit rapporten afgeleide bewering vast en vormt geen onafhankelijk bewijs van implementatie of gedrag in de uitvoeringsomgeving.
- Bewijs 2: [docs/audit/v45-nonworking-functions-fix-list.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/audit/v45-nonworking-functions-fix-list.md); Uitsluitend inspectie van onveranderlijke boomstructuur en geschiedenis; controleproza werd niet door herhaling als bewijs geaccepteerd. Resultaat: Er bestaan meerdere controle-artefacten, wat onbeschikbaarheid van de broncodeopslagplaats weerlegt maar geen volledige controle van de uitvoeringsomgeving bewijst.
- Bewijs 3: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Enkelvoudige statische inspectie van functies, koppelvlakken en patronen met schoning van gevoelige letterlijke waarden. Resultaat: Ontdubbeling van meldingen voor eigenaar en gelijke e-mailberichten, begrensde afleverregisters, status voor peilen en voortzetting, vergrendelingen op script- en gebruikersniveau, eenmalige startgetallen, validatie van webhaaksleutels, herinneringen, synchronisatie van Gmail-geschiedenis en Telegram-terugkoppelingen aangetroffen.
- Bewijs 4: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Enkelvoudige statische inspectie van functies, koppelvlakken en patronen met schoning van gevoelige letterlijke waarden. Resultaat: Accountgebonden aanroepen op afstand, focusregels, vierdelige aandachtstriage, achterstandsherstel, gezamenlijke verwerking, functionele meetwaarden, op bewijs gebaseerde overdracht, schoningsfuncties, controles van webadressen en DNS, bewerkingslogboeken, gepland verzenden, sessies en door vergrendeling beschermde statuspaden aangetroffen.
- Bewijs 5: [apps-script/MultiAccount.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MultiAccount.gs); Enkelvoudige statische inspectie van OAuth, identiteit, status en vergrendelingen met schoning van gevoelige letterlijke waarden. Resultaat: Autorisatie van Telegram-gebruiker, zone en verbinding, eenmalige OAuth-status, afzonderlijke afgeschermde sleutelregistraties, vastlegging van profielafbeeldingen, accountgebonden registers en talrijke vergrendelingen aangetroffen; de functie voor het vernieuwen van de Gmail-toegangssleutel heeft geen lokale vergrendeling binnen die functie.
- Beperkingen: De bron in het kenniscentrum is uit rapporten afgeleide herkomst en vormt geen onafhankelijk bewijs.; Statische inspectie stelt de implementatiestructuur vast, maar niet een geslaagde uitvoering.; Er is geen status van Gmail, Telegram, Apps Script, testomgeving of productieomgeving geraadpleegd.; Er is geen geheimenscan op waardeniveau uitgevoerd op afgeschermde opslagplaatsen of alle historische broncodeobjecten.

## KH-PLAN-019

- Status: `gedeeltelijk`
- Categorie: `KH-PLAN`; type: `plan`
- Relevantie: actuele vrijgavetechniek
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: Een vrijgavestroom opzetten met `clasp`, Git-vertakkingen, GitHub Actions, versiebeheer, uitrol, terugdraaien, rooktesten en beveiligingscontroles.
- Implementatiestatus: lokale vrijgave en terugdraaien geïmplementeerd, rooktest- en beveiligingspijplijnen in continue integratie afwezig
- Afhankelijkheden: geen
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-029](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); De bronpagina's zijn eenmalig gelezen en op canonieke ID met elkaar afgestemd. Resultaat: Dit legt de toegewezen uit rapporten afgeleide bewering vast en vormt geen onafhankelijk bewijs van implementatie of gedrag in de uitvoeringsomgeving.
- Bewijs 2: [apps-script/tools/release_apps_script_versie_001_20260719.ps1](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tools/release_apps_script_versie_001_20260719.ps1); Exacte statische inspectie van het vrijgavehulpscript met weglating van inloggegevens, omgevingsidentificatoren en lokale padwaarden. Resultaat: Het hulpscript pint hashes vast voor pakketten voor terugdraaien, eerdere testomgeving en kandidaat; scheidt voorcontrole, voorbereiding, promotie, opschoning en terugdraaien; registreert hoogstens-eenmalige aanmaakacties; en verifieert onveranderlijke inhoud.
- Bewijs 3: [docs/en/releases/VERSIE-001-2026-07-19.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/releases/VERSIE-001-2026-07-19.md); Lokale inspectie van git show-ref, labels, vertakkingen, gemeenschappelijke voorouder (merge-base) en divergentie bij de toegewezen vastlegging. Resultaat: De actieve lokale en externe vertakking Versie kwamen overeen met de toegewezen vastlegging; er bestond geen label of verwijzing release/versie-001, en de hoofdvertakking main bevond zich op een afwijkende publicatielijn.
- Bewijs 4: [](https://github.com/Tarasevych/gmail-telegram-controls/tree/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a); Exacte inspectie van werkstromen plus inventarisatie van de onveranderlijke .github-boomstructuur. Resultaat: Deze werkstroom controleert uitsluitend tweetalige documentatie met alleen-lezen toegangsrechten voor de inhoud.
- Bewijs 5: [](https://github.com/Tarasevych/gmail-telegram-controls/tree/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a); Exacte inspectie van werkstromen plus inventarisatie van de onveranderlijke .github-boomstructuur. Resultaat: Deze werkstroom valideert uitsluitend de consistentie van het tweetalige kenniscentrum; er bestaat bij deze vastlegging geen CodeQL, Dependabot-configuratie, uitrolwerkstroom, rooktestpijplijn voor de testomgeving of afzonderlijke beveiligingspijplijn.
- Beperkingen: De bron in het kenniscentrum is uit rapporten afgeleide herkomst en vormt geen onafhankelijk bewijs.; Statische inspectie stelt de implementatiestructuur vast, maar niet een geslaagde uitvoering.; Er zijn geen testen uitgevoerd; geïnspecteerde testdefinities bewijzen niet dat een test is geslaagd.; Er is geen status van Gmail, Telegram, Apps Script, testomgeving of productieomgeving geraadpleegd.; Serverzijdige beveiligingsinstellingen van GitHub zijn niet uitgelezen.

## KH-PLAN-020

- Status: `geverifieerd`
- Categorie: `KH-PLAN`; type: `plan`
- Relevantie: actuele architectuur
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: Architectuur versie 1 voorbereiden.
- Implementatiestatus: architectuurcontract aanwezig en weerspiegeld in de broncode
- Afhankelijkheden: afstemming van bevoegdheden in fase 0; controle van bewijs en fundament in fase 1
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-086](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); De bronpagina's zijn eenmalig gelezen en op canonieke ID met elkaar afgestemd. Resultaat: Dit legt de toegewezen uit rapporten afgeleide bewering vast en vormt geen onafhankelijk bewijs van implementatie of gedrag in de uitvoeringsomgeving.
- Bewijs 2: [apps-script/V26_MULTI_ACCOUNT_ARCHITECTURE.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/V26_MULTI_ACCOUNT_ARCHITECTURE.md); Inspectie van het onveranderlijke architectuurcontract, waar mogelijk bevestigd door huidige broncode. Resultaat: Een contract voor de koppeling van Gmail- en Telegram-identiteit naar zone, rol en verbinding en een toekomstig gepartitioneerd opslagpad zijn gedocumenteerd; Mailcow, Stalwart en Microsoft Graph vormen niet de huidige implementatie.
- Bewijs 3: [apps-script/MultiAccount.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MultiAccount.gs); Enkelvoudige statische inspectie van OAuth, identiteit, status en vergrendelingen met schoning van gevoelige letterlijke waarden. Resultaat: Autorisatie van Telegram-gebruiker, zone en verbinding, eenmalige OAuth-status, afzonderlijke afgeschermde sleutelregistraties, vastlegging van profielafbeeldingen, accountgebonden registers en talrijke vergrendelingen aangetroffen; de functie voor het vernieuwen van de Gmail-toegangssleutel heeft geen lokale vergrendeling binnen die functie.
- Bewijs 4: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Enkelvoudige statische inspectie van functies, koppelvlakken en patronen met schoning van gevoelige letterlijke waarden. Resultaat: Accountgebonden aanroepen op afstand, focusregels, vierdelige aandachtstriage, achterstandsherstel, gezamenlijke verwerking, functionele meetwaarden, op bewijs gebaseerde overdracht, schoningsfuncties, controles van webadressen en DNS, bewerkingslogboeken, gepland verzenden, sessies en door vergrendeling beschermde statuspaden aangetroffen.
- Beperkingen: De bron in het kenniscentrum is uit rapporten afgeleide herkomst en vormt geen onafhankelijk bewijs.; Statische inspectie stelt de implementatiestructuur vast, maar niet een geslaagde uitvoering.; Er is geen status van Gmail, Telegram, Apps Script, testomgeving of productieomgeving geraadpleegd.

## KH-PLAN-021

- Status: `gedeeltelijk`
- Categorie: `KH-PLAN`; type: `plan`
- Relevantie: toekomstige schaalvergroting
- Bereik en niveau: `broncodeopslagplaats` / `E1`
- Bewering: Het uitbreidingspad voor architectuur versie 2 voorbereiden.
- Implementatiestatus: toekomstig gepartitioneerd opslagpad gedocumenteerd zonder afzonderlijk versie-2-artefact
- Afhankelijkheden: afstemming van bevoegdheden in fase 0; controle van bewijs en fundament in fase 1
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-087](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); De bronpagina's zijn eenmalig gelezen en op canonieke ID met elkaar afgestemd. Resultaat: Dit legt de toegewezen uit rapporten afgeleide bewering vast en vormt geen onafhankelijk bewijs van implementatie of gedrag in de uitvoeringsomgeving.
- Bewijs 2: [apps-script/V26_MULTI_ACCOUNT_ARCHITECTURE.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/V26_MULTI_ACCOUNT_ARCHITECTURE.md); Inspectie van het onveranderlijke architectuurcontract, waar mogelijk bevestigd door huidige broncode. Resultaat: Een contract voor de koppeling van Gmail- en Telegram-identiteit naar zone, rol en verbinding en een toekomstig gepartitioneerd opslagpad zijn gedocumenteerd; Mailcow, Stalwart en Microsoft Graph vormen niet de huidige implementatie.
- Beperkingen: De bron in het kenniscentrum is uit rapporten afgeleide herkomst en vormt geen onafhankelijk bewijs.; Aanwezigheid of afwezigheid is uitsluitend vastgesteld voor de toegewezen onveranderlijke vastlegging.; Er is geen status van Gmail, Telegram, Apps Script, testomgeving of productieomgeving geraadpleegd.

## KH-PLAN-022

- Status: `gedeeltelijk`
- Categorie: `KH-PLAN`; type: `plan`
- Relevantie: actuele beveiliging
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: Het plan voor beveiligingsverharding voorbereiden.
- Implementatiestatus: maatregelen en controle-artefacten bestaan, maar één volledig plan is niet bewezen
- Afhankelijkheden: referentieplatformpad in fase 3; contextuele minimale werkende versie voor Gmail in fase 4; automatisering en Telegram in fase 5
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-089](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); De bronpagina's zijn eenmalig gelezen en op canonieke ID met elkaar afgestemd. Resultaat: Dit legt de toegewezen uit rapporten afgeleide bewering vast en vormt geen onafhankelijk bewijs van implementatie of gedrag in de uitvoeringsomgeving.
- Bewijs 2: [](https://github.com/Tarasevych/gmail-telegram-controls/tree/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a); Exacte inspectie van het negeerbeleid. Resultaat: Op inloggegevens lijkende bestanden, toegangssleutels, sleutels, logboeken, tussenopslag en lokale artefacten worden op patroon uitgesloten; dit bewijst geen serverzijdige geheimenscans op GitHub.
- Bewijs 3: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Exacte inspectie van het onveranderlijke manifest. Resultaat: Het project schakelt Gmail v1 in en vraagt de toegangsbereiken gmail.modify, drive.readonly, script.external_request en script.scriptapp aan; de webtoepassing wordt uitgevoerd namens de uitroller en staat anoniem inkomend verkeer toe dat door de toepassingscode moet worden geauthenticeerd.
- Bewijs 4: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Enkelvoudige statische inspectie van functies, koppelvlakken en patronen met schoning van gevoelige letterlijke waarden. Resultaat: Ontdubbeling van meldingen voor eigenaar en gelijke e-mailberichten, begrensde afleverregisters, status voor peilen en voortzetting, vergrendelingen op script- en gebruikersniveau, eenmalige startgetallen, validatie van webhaaksleutels, herinneringen, synchronisatie van Gmail-geschiedenis en Telegram-terugkoppelingen aangetroffen.
- Bewijs 5: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Enkelvoudige statische inspectie van functies, koppelvlakken en patronen met schoning van gevoelige letterlijke waarden. Resultaat: Accountgebonden aanroepen op afstand, focusregels, vierdelige aandachtstriage, achterstandsherstel, gezamenlijke verwerking, functionele meetwaarden, op bewijs gebaseerde overdracht, schoningsfuncties, controles van webadressen en DNS, bewerkingslogboeken, gepland verzenden, sessies en door vergrendeling beschermde statuspaden aangetroffen.
- Bewijs 6: [docs/audit/v45-nonworking-functions-fix-list.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/audit/v45-nonworking-functions-fix-list.md); Uitsluitend inspectie van onveranderlijke boomstructuur en geschiedenis; controleproza werd niet door herhaling als bewijs geaccepteerd. Resultaat: Er bestaan meerdere controle-artefacten, wat onbeschikbaarheid van de broncodeopslagplaats weerlegt maar geen volledige controle van de uitvoeringsomgeving bewijst.
- Beperkingen: De bron in het kenniscentrum is uit rapporten afgeleide herkomst en vormt geen onafhankelijk bewijs.; Statische inspectie stelt de implementatiestructuur vast, maar niet een geslaagde uitvoering.; Er zijn geen testen uitgevoerd; geïnspecteerde testdefinities bewijzen niet dat een test is geslaagd.; Er is geen status van Gmail, Telegram, Apps Script, testomgeving of productieomgeving geraadpleegd.; Er is geen geheimenscan op waardeniveau uitgevoerd op afgeschermde opslagplaatsen of alle historische broncodeobjecten.

## KH-PLAN-023

- Status: `gedeeltelijk`
- Categorie: `KH-PLAN`; type: `plan`
- Relevantie: actuele vrijgavepoorten
- Bereik en niveau: `broncodeopslagplaats` / `E1`
- Bewering: Een concrete controlelijst opstellen voor de lancering van de minimale werkende versie binnen 7 tot 14 dagen.
- Implementatiestatus: concrete poorten voor Versie 1 bestaan zonder vastlegging op 7 tot 14 dagen
- Afhankelijkheden: neuro-inclusief contract in fase 2; referentieplatformpad in fase 3
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-090](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); De bronpagina's zijn eenmalig gelezen en op canonieke ID met elkaar afgestemd. Resultaat: Dit legt de toegewezen uit rapporten afgeleide bewering vast en vormt geen onafhankelijk bewijs van implementatie of gedrag in de uitvoeringsomgeving.
- Bewijs 2: [docs/en/ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/ROADMAP.md); Inspectie van het onveranderlijke tweetalige stappenplan. Resultaat: Versie 1 is de enige actieve versie; lokale herstelwijzigingen, handmatige OAuth-acceptatie, onveranderlijke testopstelling, promotie, opschoning, label en vrijgavevertakking vormen afzonderlijke poorten.
- Bewijs 3: [docs/en/releases/VERSIE-001-2026-07-19.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/releases/VERSIE-001-2026-07-19.md); Inspectie van het onveranderlijke vrijgave-artikel; lopende tekst werd behandeld als bewering tenzij bevestigd door broncode of Git-metadata. Resultaat: Versie 1 is uitdrukkelijk in uitvoering en niet gepromoveerd, gelabeld of vertegenwoordigd door een vrijgavevertakking; productie-acceptatie blijft onvolledig.
- Beperkingen: De bron in het kenniscentrum is uit rapporten afgeleide herkomst en vormt geen onafhankelijk bewijs.; Aanwezigheid of afwezigheid is uitsluitend vastgesteld voor de toegewezen onveranderlijke vastlegging.; Er is geen status van Gmail, Telegram, Apps Script, testomgeving of productieomgeving geraadpleegd.

## KH-PLAN-024

- Status: `gedeeltelijk`
- Categorie: `KH-PLAN`; type: `plan`
- Relevantie: actuele vrijgavepoorten
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: Een concrete controlelijst voor productieverharding opstellen.
- Implementatiestatus: afgeschermde vrijgavestappen bestaan zonder volledige controlelijst voor productieverharding
- Afhankelijkheden: contextuele minimale werkende versie voor Gmail in fase 4; automatisering en Telegram in fase 5; beveiligings- en vrijgaveverharding in fase 6
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-091](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); De bronpagina's zijn eenmalig gelezen en op canonieke ID met elkaar afgestemd. Resultaat: Dit legt de toegewezen uit rapporten afgeleide bewering vast en vormt geen onafhankelijk bewijs van implementatie of gedrag in de uitvoeringsomgeving.
- Bewijs 2: [apps-script/tools/release_apps_script_versie_001_20260719.ps1](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tools/release_apps_script_versie_001_20260719.ps1); Exacte statische inspectie van het vrijgavehulpscript met weglating van inloggegevens, omgevingsidentificatoren en lokale padwaarden. Resultaat: Het hulpscript pint hashes vast voor pakketten voor terugdraaien, eerdere testomgeving en kandidaat; scheidt voorcontrole, voorbereiding, promotie, opschoning en terugdraaien; registreert hoogstens-eenmalige aanmaakacties; en verifieert onveranderlijke inhoud.
- Bewijs 3: [apps-script/tests/release_versie_001_20260719.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/release_versie_001_20260719.test.js); Uitsluitend exacte statische inspectie van testdefinities; testen zijn niet uitgevoerd. Resultaat: Testdefinities pinnen versies voor terugdraaien, testomgeving en kandidaat vast en toetsen de huidige pakket-hashes aan het vrijgavehulpscript.
- Bewijs 4: [docs/en/releases/VERSIE-001-2026-07-19.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/releases/VERSIE-001-2026-07-19.md); Inspectie van het onveranderlijke vrijgave-artikel; lopende tekst werd behandeld als bewering tenzij bevestigd door broncode of Git-metadata. Resultaat: Versie 1 is uitdrukkelijk in uitvoering en niet gepromoveerd, gelabeld of vertegenwoordigd door een vrijgavevertakking; productie-acceptatie blijft onvolledig.
- Beperkingen: De bron in het kenniscentrum is uit rapporten afgeleide herkomst en vormt geen onafhankelijk bewijs.; Statische inspectie stelt de implementatiestructuur vast, maar niet een geslaagde uitvoering.; Er zijn geen testen uitgevoerd; geïnspecteerde testdefinities bewijzen niet dat een test is geslaagd.; Er is geen status van Gmail, Telegram, Apps Script, testomgeving of productieomgeving geraadpleegd.

## KH-PLAN-025

- Status: `gedeeltelijk`
- Categorie: `KH-PLAN`; type: `plan`
- Relevantie: actueel gereedschap
- Bereik en niveau: `broncodeopslagplaats` / `E1`
- Bewering: Lokale inrichting: een afzonderlijk Cloud-project aanmaken, de Apps Script API inschakelen, `clasp login` uitvoeren, daarna `clasp create` of `clasp clone` starten en de broncode in Git beheren.
- Implementatiestatus: vrijgave-artefacten voor Git en clasp aanwezig, inrichting van het Cloud-project niet bewezen
- Afhankelijkheden: neuro-inclusief contract in fase 2; referentieplatformpad in fase 3
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-098](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); De bronpagina's zijn eenmalig gelezen en op canonieke ID met elkaar afgestemd. Resultaat: Dit legt de toegewezen uit rapporten afgeleide bewering vast en vormt geen onafhankelijk bewijs van implementatie of gedrag in de uitvoeringsomgeving.
- Bewijs 2: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); Exacte inspectie van het uitrolfilter. Resultaat: Alleen het manifest en vier Apps Script-implementatiebestanden zijn opgenomen in het clasp-broncodepakket.
- Bewijs 3: [apps-script/tools/release_apps_script_versie_001_20260719.ps1](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tools/release_apps_script_versie_001_20260719.ps1); Exacte statische inspectie van het vrijgavehulpscript met weglating van inloggegevens, omgevingsidentificatoren en lokale padwaarden. Resultaat: Het hulpscript pint hashes vast voor pakketten voor terugdraaien, eerdere testomgeving en kandidaat; scheidt voorcontrole, voorbereiding, promotie, opschoning en terugdraaien; registreert hoogstens-eenmalige aanmaakacties; en verifieert onveranderlijke inhoud.
- Bewijs 4: [](https://github.com/Tarasevych/gmail-telegram-controls/tree/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a); Exacte inspectie van het negeerbeleid. Resultaat: Op inloggegevens lijkende bestanden, toegangssleutels, sleutels, logboeken, tussenopslag en lokale artefacten worden op patroon uitgesloten; dit bewijst geen serverzijdige geheimenscans op GitHub.
- Beperkingen: De bron in het kenniscentrum is uit rapporten afgeleide herkomst en vormt geen onafhankelijk bewijs.; Aanwezigheid of afwezigheid is uitsluitend vastgesteld voor de toegewezen onveranderlijke vastlegging.; Er is geen status van Gmail, Telegram, Apps Script, testomgeving of productieomgeving geraadpleegd.

## KH-PLAN-026

- Status: `aanbeveling`
- Categorie: `KH-PLAN`; type: `plan`
- Relevantie: actuele leemte in continue integratie
- Bereik en niveau: `broncodeopslagplaats` / `E1`
- Bewering: Continue integratie en uitrol moeten gebruikmaken van afgeschermde `CLASPRC_JSON` en `.clasp.json` in GitHub Actions zonder inloggegevens in de broncodeopslagplaats vast te leggen.
- Implementatiestatus: niet geïmplementeerd in de werkstromen
- Afhankelijkheden: geen
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-099](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); De bronpagina's zijn eenmalig gelezen en op canonieke ID met elkaar afgestemd. Resultaat: Dit legt de toegewezen uit rapporten afgeleide bewering vast en vormt geen onafhankelijk bewijs van implementatie of gedrag in de uitvoeringsomgeving.
- Bewijs 2: [](https://github.com/Tarasevych/gmail-telegram-controls/tree/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a); Exacte inspectie van werkstromen plus inventarisatie van de onveranderlijke .github-boomstructuur. Resultaat: Deze werkstroom controleert uitsluitend tweetalige documentatie met alleen-lezen toegangsrechten voor de inhoud.
- Bewijs 3: [](https://github.com/Tarasevych/gmail-telegram-controls/tree/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a); Exacte inspectie van werkstromen plus inventarisatie van de onveranderlijke .github-boomstructuur. Resultaat: Deze werkstroom valideert uitsluitend de consistentie van het tweetalige kenniscentrum; er bestaat bij deze vastlegging geen CodeQL, Dependabot-configuratie, uitrolwerkstroom, rooktestpijplijn voor de testomgeving of afzonderlijke beveiligingspijplijn.
- Bewijs 4: [](https://github.com/Tarasevych/gmail-telegram-controls/tree/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a); Exacte inspectie van het negeerbeleid. Resultaat: Op inloggegevens lijkende bestanden, toegangssleutels, sleutels, logboeken, tussenopslag en lokale artefacten worden op patroon uitgesloten; dit bewijst geen serverzijdige geheimenscans op GitHub.
- Beperkingen: De bron in het kenniscentrum is uit rapporten afgeleide herkomst en vormt geen onafhankelijk bewijs.; Aanwezigheid of afwezigheid is uitsluitend vastgesteld voor de toegewezen onveranderlijke vastlegging.; Serverzijdige beveiligingsinstellingen van GitHub zijn niet uitgelezen.

## KH-PLAN-027

- Status: `weerlegd`
- Categorie: `KH-PLAN`; type: `plan`
- Relevantie: actuele indeling van de broncodeopslagplaats
- Bereik en niveau: `broncodeopslagplaats` / `E1`
- Bewering: De voorgestelde mappenstructuur scheidt `appsscript.json`, `src/addon`, `src/core`, `src/integrations`, `src/web`, `src/jobs`, `src/security`, `tests` en `.github/workflows/deploy.yml`.
- Implementatiestatus: broncodeopslagplaats gebruikt een plat Apps Script-pakket en heeft geen uitrolwerkstroom
- Afhankelijkheden: neuro-inclusief contract in fase 2; referentieplatformpad in fase 3
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-100](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); De bronpagina's zijn eenmalig gelezen en op canonieke ID met elkaar afgestemd. Resultaat: Dit legt de toegewezen uit rapporten afgeleide bewering vast en vormt geen onafhankelijk bewijs van implementatie of gedrag in de uitvoeringsomgeving.
- Bewijs 2: [README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/README.md); Volledige onveranderlijke inventarisatie via git ls-tree plus gerichte statische inspectie. Resultaat: De broncodeopslagplaats bestaat uit Apps Script, een statische terugkeerpagina, documentatie, testen en vrijgavegereedschap; er bestaat geen implementatie van Mailcow, Stalwart, Dovecot, Postfix, Redis, PostgreSQL, Pub/Sub, Cloud Run of Microsoft Graph.
- Bewijs 3: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); Exacte inspectie van het uitrolfilter. Resultaat: Alleen het manifest en vier Apps Script-implementatiebestanden zijn opgenomen in het clasp-broncodepakket.
- Beperkingen: De bron in het kenniscentrum is uit rapporten afgeleide herkomst en vormt geen onafhankelijk bewijs.; Aanwezigheid of afwezigheid is uitsluitend vastgesteld voor de toegewezen onveranderlijke vastlegging.

## KH-PLAN-028

- Status: `gedeeltelijk`
- Categorie: `KH-PLAN`; type: `plan`
- Relevantie: actuele besloten proef en toekomstige openbare uitgave
- Bereik en niveau: `gemengd` / `E2`
- Bewering: De strategie voor toegangsbereiken opsplitsen in een interne, besloten of op Workspace beperkte minimale werkende versie en een openbare productie-uitgave met geminimaliseerde toegangsbereiken en een verificatiepakket.
- Implementatiestatus: besloten eigenaarsbereik vastgesteld, openbaar verificatiepakket niet bewezen
- Afhankelijkheden: expliciet bereikbesluit van de eigenaar; afstemming van canonieke toestemmingen en instructies
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-104](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); De bronpagina's zijn eenmalig gelezen en op canonieke ID met elkaar afgestemd. Resultaat: Dit legt de toegewezen uit rapporten afgeleide bewering vast en vormt geen onafhankelijk bewijs van implementatie of gedrag in de uitvoeringsomgeving.
- Bewijs 2: [docs/en/PROJECT.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/PROJECT.md); Inspectie van het onveranderlijke bestand, afgestemd met de Oekraïense tegenhanger. Resultaat: De huidige missie is een veilige Gmail-client in Telegram voor één eigenaar en expliciet gekoppelde accounts; de actieve vertakking Versie en het huidige stappenplan en problemenregister zijn gezaghebbend.
- Bewijs 3: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Exacte inspectie van het onveranderlijke manifest. Resultaat: Het project schakelt Gmail v1 in en vraagt de toegangsbereiken gmail.modify, drive.readonly, script.external_request en script.scriptapp aan; de webtoepassing wordt uitgevoerd namens de uitroller en staat anoniem inkomend verkeer toe dat door de toepassingscode moet worden geauthenticeerd.
- Bewijs 4: [apps-script/V26_MULTI_ACCOUNT_ARCHITECTURE.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/V26_MULTI_ACCOUNT_ARCHITECTURE.md); Inspectie van het onveranderlijke architectuurcontract, waar mogelijk bevestigd door huidige broncode. Resultaat: Een contract voor de koppeling van Gmail- en Telegram-identiteit naar zone, rol en verbinding en een toekomstig gepartitioneerd opslagpad zijn gedocumenteerd; Mailcow, Stalwart en Microsoft Graph vormen niet de huidige implementatie.
- Beperkingen: De bron in het kenniscentrum is uit rapporten afgeleide herkomst en vormt geen onafhankelijk bewijs.; Statische inspectie stelt de implementatiestructuur vast, maar niet een geslaagde uitvoering.; Er is geen status van Gmail, Telegram, Apps Script, testomgeving of productieomgeving geraadpleegd.; Serverzijdige beveiligingsinstellingen van GitHub zijn niet uitgelezen.

## KH-PLAN-029

- Status: `gedeeltelijk`
- Categorie: `KH-PLAN`; type: `plan`
- Relevantie: actueel manifest
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: Beginnen met smalle toegangsbereiken voor context, labels, concepten en verzending; een expliciet bereik voor externe verzoeken via `UrlFetchApp` alleen toevoegen wanneer dat noodzakelijk is.
- Implementatiestatus: gmail.modify zonder volledige e-mailtoegang en met vereist extern verzoekbereik aanwezig
- Afhankelijkheden: neuro-inclusief contract in fase 2; referentieplatformpad in fase 3
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-105](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); De bronpagina's zijn eenmalig gelezen en op canonieke ID met elkaar afgestemd. Resultaat: Dit legt de toegewezen uit rapporten afgeleide bewering vast en vormt geen onafhankelijk bewijs van implementatie of gedrag in de uitvoeringsomgeving.
- Bewijs 2: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Exacte inspectie van het onveranderlijke manifest. Resultaat: Het project schakelt Gmail v1 in en vraagt de toegangsbereiken gmail.modify, drive.readonly, script.external_request en script.scriptapp aan; de webtoepassing wordt uitgevoerd namens de uitroller en staat anoniem inkomend verkeer toe dat door de toepassingscode moet worden geauthenticeerd.
- Bewijs 3: [apps-script/tests/mail_actions.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_actions.test.js); Uitsluitend statische inspectie van testnamen en relevante contracten; testen zijn niet uitgevoerd. Resultaat: Testdefinities dekken gmail.modify zonder volledig e-mail- of verzendbereik, tijdconstante geheimcontrole voor webhaken, ontdubbeling van terugkoppelingen, begrensd peilen en herhalen, accountisolatie, veiligheid van webadressen en DNS, Gmail-geschiedenis en herinneringen tijdens stille uren.
- Bewijs 4: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Enkelvoudige statische inspectie van functies, koppelvlakken en patronen met schoning van gevoelige letterlijke waarden. Resultaat: Ontdubbeling van meldingen voor eigenaar en gelijke e-mailberichten, begrensde afleverregisters, status voor peilen en voortzetting, vergrendelingen op script- en gebruikersniveau, eenmalige startgetallen, validatie van webhaaksleutels, herinneringen, synchronisatie van Gmail-geschiedenis en Telegram-terugkoppelingen aangetroffen.
- Beperkingen: De bron in het kenniscentrum is uit rapporten afgeleide herkomst en vormt geen onafhankelijk bewijs.; Statische inspectie stelt de implementatiestructuur vast, maar niet een geslaagde uitvoering.; Er zijn geen testen uitgevoerd; geïnspecteerde testdefinities bewijzen niet dat een test is geslaagd.; Er is geen status van Gmail, Telegram, Apps Script, testomgeving of productieomgeving geraadpleegd.

## KH-PLAN-030

- Status: `weerlegd`
- Categorie: `KH-PLAN`; type: `plan`
- Relevantie: actuele gebeurtenisarchitectuur
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: Gebeurtenisstroom: postvakwijziging naar `watch`, Pub/Sub, verwerker op Cloud Run, normaliseren en ontdubbelen, in de wachtrij plaatsen of Apps Script aanroepen, en vervolgens labels, overzicht, taakstatus en Telegram-uitvoer bijwerken.
- Implementatiestatus: periodiek peilen in Apps Script, webhaak en Gmail-geschiedenis worden in plaats daarvan gebruikt
- Afhankelijkheden: contextuele minimale werkende versie voor Gmail in fase 4
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-113](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); De bronpagina's zijn eenmalig gelezen en op canonieke ID met elkaar afgestemd. Resultaat: Dit legt de toegewezen uit rapporten afgeleide bewering vast en vormt geen onafhankelijk bewijs van implementatie of gedrag in de uitvoeringsomgeving.
- Bewijs 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Enkelvoudige statische inspectie van functies, koppelvlakken en patronen met schoning van gevoelige letterlijke waarden. Resultaat: Ontdubbeling van meldingen voor eigenaar en gelijke e-mailberichten, begrensde afleverregisters, status voor peilen en voortzetting, vergrendelingen op script- en gebruikersniveau, eenmalige startgetallen, validatie van webhaaksleutels, herinneringen, synchronisatie van Gmail-geschiedenis en Telegram-terugkoppelingen aangetroffen.
- Bewijs 3: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Exacte inspectie van het onveranderlijke manifest. Resultaat: Het project schakelt Gmail v1 in en vraagt de toegangsbereiken gmail.modify, drive.readonly, script.external_request en script.scriptapp aan; de webtoepassing wordt uitgevoerd namens de uitroller en staat anoniem inkomend verkeer toe dat door de toepassingscode moet worden geauthenticeerd.
- Bewijs 4: [README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/README.md); Volledige onveranderlijke inventarisatie via git ls-tree plus gerichte statische inspectie. Resultaat: De broncodeopslagplaats bestaat uit Apps Script, een statische terugkeerpagina, documentatie, testen en vrijgavegereedschap; er bestaat geen implementatie van Mailcow, Stalwart, Dovecot, Postfix, Redis, PostgreSQL, Pub/Sub, Cloud Run of Microsoft Graph.
- Beperkingen: De bron in het kenniscentrum is uit rapporten afgeleide herkomst en vormt geen onafhankelijk bewijs.; Statische inspectie stelt de implementatiestructuur vast, maar niet een geslaagde uitvoering.; Er is geen status van Gmail, Telegram, Apps Script, testomgeving of productieomgeving geraadpleegd.; Aanwezigheid of afwezigheid is uitsluitend vastgesteld voor de toegewezen onveranderlijke vastlegging.

## KH-PLAN-031

- Status: `geverifieerd`
- Categorie: `KH-PLAN`; type: `plan`
- Relevantie: actueel vrijgavegereedschap
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: `clasp` en onveranderlijke versies en uitrollen gebruiken voor vrijgave en terugdraaien.
- Implementatiestatus: statisch geïmplementeerd
- Afhankelijkheden: referentieplatformpad in fase 3; contextuele minimale werkende versie voor Gmail in fase 4; automatisering en Telegram in fase 5
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-050](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); De bronpagina's zijn eenmalig gelezen en op canonieke ID met elkaar afgestemd. Resultaat: Dit legt de toegewezen uit rapporten afgeleide bewering vast en vormt geen onafhankelijk bewijs van implementatie of gedrag in de uitvoeringsomgeving.
- Bewijs 2: [apps-script/tools/release_apps_script_versie_001_20260719.ps1](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tools/release_apps_script_versie_001_20260719.ps1); Exacte statische inspectie van het vrijgavehulpscript met weglating van inloggegevens, omgevingsidentificatoren en lokale padwaarden. Resultaat: Het hulpscript pint hashes vast voor pakketten voor terugdraaien, eerdere testomgeving en kandidaat; scheidt voorcontrole, voorbereiding, promotie, opschoning en terugdraaien; registreert hoogstens-eenmalige aanmaakacties; en verifieert onveranderlijke inhoud.
- Bewijs 3: [apps-script/tests/release_versie_001_20260719.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/release_versie_001_20260719.test.js); Uitsluitend exacte statische inspectie van testdefinities; testen zijn niet uitgevoerd. Resultaat: Testdefinities pinnen versies voor terugdraaien, testomgeving en kandidaat vast en toetsen de huidige pakket-hashes aan het vrijgavehulpscript.
- Beperkingen: De bron in het kenniscentrum is uit rapporten afgeleide herkomst en vormt geen onafhankelijk bewijs.; Statische inspectie stelt de implementatiestructuur vast, maar niet een geslaagde uitvoering.; Er zijn geen testen uitgevoerd; geïnspecteerde testdefinities bewijzen niet dat een test is geslaagd.; Er is geen status van Gmail, Telegram, Apps Script, testomgeving of productieomgeving geraadpleegd.

## KH-PLAN-032

- Status: `aanbeveling`
- Categorie: `KH-PLAN`; type: `plan`
- Relevantie: actuele leemte in continue integratie
- Bereik en niveau: `broncodeopslagplaats` / `E1`
- Bewering: GitHub CodeQL toevoegen.
- Implementatiestatus: niet geïmplementeerd bij deze vastlegging
- Afhankelijkheden: referentieplatformpad in fase 3; contextuele minimale werkende versie voor Gmail in fase 4; automatisering en Telegram in fase 5
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-051](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); De bronpagina's zijn eenmalig gelezen en op canonieke ID met elkaar afgestemd. Resultaat: Dit legt de toegewezen uit rapporten afgeleide bewering vast en vormt geen onafhankelijk bewijs van implementatie of gedrag in de uitvoeringsomgeving.
- Bewijs 2: [](https://github.com/Tarasevych/gmail-telegram-controls/tree/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a); Exacte inspectie van werkstromen plus inventarisatie van de onveranderlijke .github-boomstructuur. Resultaat: Deze werkstroom controleert uitsluitend tweetalige documentatie met alleen-lezen toegangsrechten voor de inhoud.
- Bewijs 3: [](https://github.com/Tarasevych/gmail-telegram-controls/tree/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a); Exacte inspectie van werkstromen plus inventarisatie van de onveranderlijke .github-boomstructuur. Resultaat: Deze werkstroom valideert uitsluitend de consistentie van het tweetalige kenniscentrum; er bestaat bij deze vastlegging geen CodeQL, Dependabot-configuratie, uitrolwerkstroom, rooktestpijplijn voor de testomgeving of afzonderlijke beveiligingspijplijn.
- Bewijs 4: [README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/README.md); Volledige onveranderlijke inventarisatie via git ls-tree plus gerichte statische inspectie. Resultaat: De broncodeopslagplaats bestaat uit Apps Script, een statische terugkeerpagina, documentatie, testen en vrijgavegereedschap; er bestaat geen implementatie van Mailcow, Stalwart, Dovecot, Postfix, Redis, PostgreSQL, Pub/Sub, Cloud Run of Microsoft Graph.
- Beperkingen: De bron in het kenniscentrum is uit rapporten afgeleide herkomst en vormt geen onafhankelijk bewijs.; Aanwezigheid of afwezigheid is uitsluitend vastgesteld voor de toegewezen onveranderlijke vastlegging.; Serverzijdige beveiligingsinstellingen van GitHub zijn niet uitgelezen.

## KH-PLAN-033

- Status: `aanbeveling`
- Categorie: `KH-PLAN`; type: `plan`
- Relevantie: actuele leemte in externe instellingen
- Bereik en niveau: `gemengd` / `E1`
- Bewering: Geheimenscans vanaf de eerste dag inschakelen.
- Implementatiestatus: niet bewezen
- Afhankelijkheden: referentieplatformpad in fase 3; contextuele minimale werkende versie voor Gmail in fase 4; automatisering en Telegram in fase 5
- Conflicten: geen
- Gevoeligheid: `intern`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-052](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); De bronpagina's zijn eenmalig gelezen en op canonieke ID met elkaar afgestemd. Resultaat: Dit legt de toegewezen uit rapporten afgeleide bewering vast en vormt geen onafhankelijk bewijs van implementatie of gedrag in de uitvoeringsomgeving.
- Bewijs 2: [](https://github.com/Tarasevych/gmail-telegram-controls/tree/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a); Exacte inspectie van het negeerbeleid. Resultaat: Op inloggegevens lijkende bestanden, toegangssleutels, sleutels, logboeken, tussenopslag en lokale artefacten worden op patroon uitgesloten; dit bewijst geen serverzijdige geheimenscans op GitHub.
- Bewijs 3: [](https://github.com/Tarasevych/gmail-telegram-controls/tree/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a); Exacte inspectie van werkstromen plus inventarisatie van de onveranderlijke .github-boomstructuur. Resultaat: Deze werkstroom valideert uitsluitend de consistentie van het tweetalige kenniscentrum; er bestaat bij deze vastlegging geen CodeQL, Dependabot-configuratie, uitrolwerkstroom, rooktestpijplijn voor de testomgeving of afzonderlijke beveiligingspijplijn.
- Beperkingen: De bron in het kenniscentrum is uit rapporten afgeleide herkomst en vormt geen onafhankelijk bewijs.; Serverzijdige beveiligingsinstellingen van GitHub zijn niet uitgelezen.; Er is geen geheimenscan op waardeniveau uitgevoerd op afgeschermde opslagplaatsen of alle historische broncodeobjecten.; Het exacte veilige ontbrekende bewijs is een alleen-lezen teruglezing van de beveiligingsinstellingen op GitHub waaruit blijkt dat geheimenscans voor deze broncodeopslagplaats zijn ingeschakelen.

## KH-PLAN-034

- Status: `aanbeveling`
- Categorie: `KH-PLAN`; type: `plan`
- Relevantie: actuele leemte in continue integratie
- Bereik en niveau: `broncodeopslagplaats` / `E1`
- Bewering: Dependabot toevoegen voor meldingen en bijwerkingen van afhankelijkheden.
- Implementatiestatus: geen Dependabot-configuratie bij deze vastlegging
- Afhankelijkheden: referentieplatformpad in fase 3; contextuele minimale werkende versie voor Gmail in fase 4; automatisering en Telegram in fase 5
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-053](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); De bronpagina's zijn eenmalig gelezen en op canonieke ID met elkaar afgestemd. Resultaat: Dit legt de toegewezen uit rapporten afgeleide bewering vast en vormt geen onafhankelijk bewijs van implementatie of gedrag in de uitvoeringsomgeving.
- Bewijs 2: [](https://github.com/Tarasevych/gmail-telegram-controls/tree/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a); Exacte inspectie van werkstromen plus inventarisatie van de onveranderlijke .github-boomstructuur. Resultaat: Deze werkstroom controleert uitsluitend tweetalige documentatie met alleen-lezen toegangsrechten voor de inhoud.
- Bewijs 3: [](https://github.com/Tarasevych/gmail-telegram-controls/tree/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a); Exacte inspectie van werkstromen plus inventarisatie van de onveranderlijke .github-boomstructuur. Resultaat: Deze werkstroom valideert uitsluitend de consistentie van het tweetalige kenniscentrum; er bestaat bij deze vastlegging geen CodeQL, Dependabot-configuratie, uitrolwerkstroom, rooktestpijplijn voor de testomgeving of afzonderlijke beveiligingspijplijn.
- Bewijs 4: [README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/README.md); Volledige onveranderlijke inventarisatie via git ls-tree plus gerichte statische inspectie. Resultaat: De broncodeopslagplaats bestaat uit Apps Script, een statische terugkeerpagina, documentatie, testen en vrijgavegereedschap; er bestaat geen implementatie van Mailcow, Stalwart, Dovecot, Postfix, Redis, PostgreSQL, Pub/Sub, Cloud Run of Microsoft Graph.
- Beperkingen: De bron in het kenniscentrum is uit rapporten afgeleide herkomst en vormt geen onafhankelijk bewijs.; Aanwezigheid of afwezigheid is uitsluitend vastgesteld voor de toegewezen onveranderlijke vastlegging.; Serverzijdige beveiligingsinstellingen van GitHub zijn niet uitgelezen.

## KH-PLAN-035

- Status: `aanbeveling`
- Categorie: `KH-PLAN`; type: `plan`
- Relevantie: actuele leemte in continue integratie
- Bereik en niveau: `broncodeopslagplaats` / `E1`
- Bewering: Continue integratie moet codecontrole, manifestvalidatie, proefuitrol, een rooktest in de testomgeving en een afzonderlijke beveiligingspijplijn omvatten.
- Implementatiestatus: niet geïmplementeerd in de huidige werkstromen
- Afhankelijkheden: referentieplatformpad in fase 3; contextuele minimale werkende versie voor Gmail in fase 4; automatisering en Telegram in fase 5
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-054](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); De bronpagina's zijn eenmalig gelezen en op canonieke ID met elkaar afgestemd. Resultaat: Dit legt de toegewezen uit rapporten afgeleide bewering vast en vormt geen onafhankelijk bewijs van implementatie of gedrag in de uitvoeringsomgeving.
- Bewijs 2: [](https://github.com/Tarasevych/gmail-telegram-controls/tree/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a); Exacte inspectie van werkstromen plus inventarisatie van de onveranderlijke .github-boomstructuur. Resultaat: Deze werkstroom controleert uitsluitend tweetalige documentatie met alleen-lezen toegangsrechten voor de inhoud.
- Bewijs 3: [](https://github.com/Tarasevych/gmail-telegram-controls/tree/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a); Exacte inspectie van werkstromen plus inventarisatie van de onveranderlijke .github-boomstructuur. Resultaat: Deze werkstroom valideert uitsluitend de consistentie van het tweetalige kenniscentrum; er bestaat bij deze vastlegging geen CodeQL, Dependabot-configuratie, uitrolwerkstroom, rooktestpijplijn voor de testomgeving of afzonderlijke beveiligingspijplijn.
- Bewijs 4: [README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/README.md); Volledige onveranderlijke inventarisatie via git ls-tree plus gerichte statische inspectie. Resultaat: De broncodeopslagplaats bestaat uit Apps Script, een statische terugkeerpagina, documentatie, testen en vrijgavegereedschap; er bestaat geen implementatie van Mailcow, Stalwart, Dovecot, Postfix, Redis, PostgreSQL, Pub/Sub, Cloud Run of Microsoft Graph.
- Beperkingen: De bron in het kenniscentrum is uit rapporten afgeleide herkomst en vormt geen onafhankelijk bewijs.; Aanwezigheid of afwezigheid is uitsluitend vastgesteld voor de toegewezen onveranderlijke vastlegging.; Er zijn geen testen uitgevoerd; geïnspecteerde testdefinities bewijzen niet dat een test is geslaagd.; Er is geen status van Gmail, Telegram, Apps Script, testomgeving of productieomgeving geraadpleegd.

## KH-PLAN-036

- Status: `weerlegd`
- Categorie: `KH-PLAN`; type: `plan`
- Relevantie: achterhaalde bewering over de huidige status
- Bereik en niveau: `gemengd` / `E2`
- Bewering: De controle van de broncodeopslagplaats is niet uitgevoerd omdat beschikbaarheid of indexering onbevestigd was; er is uitsluitend een controleplan opgesteld.
- Implementatiestatus: broncodeopslagplaats beschikbaar en statisch controlebewijs aanwezig
- Afhankelijkheden: geen
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-055](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); De bronpagina's zijn eenmalig gelezen en op canonieke ID met elkaar afgestemd. Resultaat: Dit legt de toegewezen uit rapporten afgeleide bewering vast en vormt geen onafhankelijk bewijs van implementatie of gedrag in de uitvoeringsomgeving.
- Bewijs 2: [KNOWLEDGE_HUB.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/4bd94b5a589182ece0c25e086486decec6d5e5da/KNOWLEDGE_HUB.md); Inspectie van het onveranderlijke bestuur op de canonieke hoofdvertakking. Resultaat: Het kenniscentrum is uitdrukkelijk een uit rapporten afgeleide basislijn en geen bewijs van de productiestatus; verzoeken, instructies, toestemmingen en de actieve Versie vormen afzonderlijke canonieke gebieden.
- Bewijs 3: [instructions/KNOWLEDGE_HUB_MAINTENANCE.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/10630a566e81ff92542cea173d9021c764a7ec1a/instructions/KNOWLEDGE_HUB_MAINTENANCE.md); Inspectie van de onveranderlijke canonieke instructievertakking. Resultaat: Uit rapporten afgeleide beweringen vereisen nieuw bewijs en moeten worden afgestemd met de actuele projectbeschrijving, het stappenplan of het problemenregister vóór uitspraken over de live omgeving.
- Bewijs 4: [docs/audit/v45-nonworking-functions-fix-list.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/audit/v45-nonworking-functions-fix-list.md); Uitsluitend inspectie van onveranderlijke boomstructuur en geschiedenis; controleproza werd niet door herhaling als bewijs geaccepteerd. Resultaat: Er bestaan meerdere controle-artefacten, wat onbeschikbaarheid van de broncodeopslagplaats weerlegt maar geen volledige controle van de uitvoeringsomgeving bewijst.
- Bewijs 5: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Enkelvoudige statische inspectie van functies, koppelvlakken en patronen met schoning van gevoelige letterlijke waarden. Resultaat: Ontdubbeling van meldingen voor eigenaar en gelijke e-mailberichten, begrensde afleverregisters, status voor peilen en voortzetting, vergrendelingen op script- en gebruikersniveau, eenmalige startgetallen, validatie van webhaaksleutels, herinneringen, synchronisatie van Gmail-geschiedenis en Telegram-terugkoppelingen aangetroffen.
- Beperkingen: De bron in het kenniscentrum is uit rapporten afgeleide herkomst en vormt geen onafhankelijk bewijs.; Het huidige bewijs kan niet aantonen waartoe de auteur van het eerdere rapport op de rapportdatum toegang had.; Er is geen status van Gmail, Telegram, Apps Script, testomgeving of productieomgeving geraadpleegd.

## KH-PLAN-037

- Status: `aanbeveling`
- Categorie: `KH-PLAN`; type: `plan`
- Relevantie: actuele controlemethode
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: Eerst `appsscript.json` inspecteren: Gmail-toegangsbereiken, `script.external_request`, starters, functiegrenzen en de scheiding tussen uitbreiding en webtoepassing.
- Implementatiestatus: manifest geïnspecteerd in deze analysestroom
- Afhankelijkheden: geen
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-056](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); De bronpagina's zijn eenmalig gelezen en op canonieke ID met elkaar afgestemd. Resultaat: Dit legt de toegewezen uit rapporten afgeleide bewering vast en vormt geen onafhankelijk bewijs van implementatie of gedrag in de uitvoeringsomgeving.
- Bewijs 2: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Exacte inspectie van het onveranderlijke manifest. Resultaat: Het project schakelt Gmail v1 in en vraagt de toegangsbereiken gmail.modify, drive.readonly, script.external_request en script.scriptapp aan; de webtoepassing wordt uitgevoerd namens de uitroller en staat anoniem inkomend verkeer toe dat door de toepassingscode moet worden geauthenticeerd.
- Beperkingen: De bron in het kenniscentrum is uit rapporten afgeleide herkomst en vormt geen onafhankelijk bewijs.; Statische inspectie stelt de implementatiestructuur vast, maar niet een geslaagde uitvoering.; Er is geen status van Gmail, Telegram, Apps Script, testomgeving of productieomgeving geraadpleegd.

## KH-PLAN-038

- Status: `aanbeveling`
- Categorie: `KH-PLAN`; type: `plan`
- Relevantie: actuele beveiligingscontrole
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: Broncode en Git-geschiedenis inspecteren op vastgelegde geheimen, directe webhaakadressen, privé-identificatoren in testgegevens en volledige logregistratie van verzoeken of antwoorden.
- Implementatiestatus: huidige bestanden geïnspecteerd, volledige historische controle op waardeniveau niet uitgevoerd
- Afhankelijkheden: referentieplatformpad in fase 3; contextuele minimale werkende versie voor Gmail in fase 4; automatisering en Telegram in fase 5
- Conflicten: geen
- Gevoeligheid: `intern`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-058](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); De bronpagina's zijn eenmalig gelezen en op canonieke ID met elkaar afgestemd. Resultaat: Dit legt de toegewezen uit rapporten afgeleide bewering vast en vormt geen onafhankelijk bewijs van implementatie of gedrag in de uitvoeringsomgeving.
- Bewijs 2: [](https://github.com/Tarasevych/gmail-telegram-controls/tree/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a); Exacte inspectie van het negeerbeleid. Resultaat: Op inloggegevens lijkende bestanden, toegangssleutels, sleutels, logboeken, tussenopslag en lokale artefacten worden op patroon uitgesloten; dit bewijst geen serverzijdige geheimenscans op GitHub.
- Bewijs 3: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Enkelvoudige statische inspectie van functies, koppelvlakken en patronen met schoning van gevoelige letterlijke waarden. Resultaat: Ontdubbeling van meldingen voor eigenaar en gelijke e-mailberichten, begrensde afleverregisters, status voor peilen en voortzetting, vergrendelingen op script- en gebruikersniveau, eenmalige startgetallen, validatie van webhaaksleutels, herinneringen, synchronisatie van Gmail-geschiedenis en Telegram-terugkoppelingen aangetroffen.
- Bewijs 4: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Enkelvoudige statische inspectie van functies, koppelvlakken en patronen met schoning van gevoelige letterlijke waarden. Resultaat: Accountgebonden aanroepen op afstand, focusregels, vierdelige aandachtstriage, achterstandsherstel, gezamenlijke verwerking, functionele meetwaarden, op bewijs gebaseerde overdracht, schoningsfuncties, controles van webadressen en DNS, bewerkingslogboeken, gepland verzenden, sessies en door vergrendeling beschermde statuspaden aangetroffen.
- Bewijs 5: [apps-script/tools/release_apps_script_versie_001_20260719.ps1](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tools/release_apps_script_versie_001_20260719.ps1); Exacte statische inspectie van het vrijgavehulpscript met weglating van inloggegevens, omgevingsidentificatoren en lokale padwaarden. Resultaat: Het hulpscript pint hashes vast voor pakketten voor terugdraaien, eerdere testomgeving en kandidaat; scheidt voorcontrole, voorbereiding, promotie, opschoning en terugdraaien; registreert hoogstens-eenmalige aanmaakacties; en verifieert onveranderlijke inhoud.
- Bewijs 6: [apps-script/tools/release_apps_script_versie_001_20260719.ps1](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tools/release_apps_script_versie_001_20260719.ps1); Statische inspectie met schoning van alle gevoelige waarden. Resultaat: Het openbare hulpscript bevat omgevingsspecifieke project- en uitrolidentificatoren en een letterlijk lokaal herstelpad; geen enkele waarde hiervan wordt in dit rapport overgenomen.
- Beperkingen: De bron in het kenniscentrum is uit rapporten afgeleide herkomst en vormt geen onafhankelijk bewijs.; Statische inspectie stelt de implementatiestructuur vast, maar niet een geslaagde uitvoering.; Er is geen geheimenscan op waardeniveau uitgevoerd op afgeschermde opslagplaatsen of alle historische broncodeobjecten.; Aanwezigheid of afwezigheid is uitsluitend vastgesteld voor de toegewezen onveranderlijke vastlegging.

## KH-PLAN-039

- Status: `gedeeltelijk`
- Categorie: `KH-PLAN`; type: `plan`
- Relevantie: actuele gelijktijdigheidscontrole
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: De vergrendelingsdiscipline controleren voor statusbeheer, wachtrijen, controlepunten, verzendbewerkingen, Telegram-aanroepen en het vernieuwen van toegangssleutels.
- Implementatiestatus: vele vergrendelingspaden aanwezig, leemte in lokale vergrendeling bij vernieuwen van Gmail-sleutel blijft bestaan
- Afhankelijkheden: referentieplatformpad in fase 3; contextuele minimale werkende versie voor Gmail in fase 4; automatisering en Telegram in fase 5
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-060](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); De bronpagina's zijn eenmalig gelezen en op canonieke ID met elkaar afgestemd. Resultaat: Dit legt de toegewezen uit rapporten afgeleide bewering vast en vormt geen onafhankelijk bewijs van implementatie of gedrag in de uitvoeringsomgeving.
- Bewijs 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Enkelvoudige statische inspectie van functies, koppelvlakken en patronen met schoning van gevoelige letterlijke waarden. Resultaat: Ontdubbeling van meldingen voor eigenaar en gelijke e-mailberichten, begrensde afleverregisters, status voor peilen en voortzetting, vergrendelingen op script- en gebruikersniveau, eenmalige startgetallen, validatie van webhaaksleutels, herinneringen, synchronisatie van Gmail-geschiedenis en Telegram-terugkoppelingen aangetroffen.
- Bewijs 3: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Enkelvoudige statische inspectie van functies, koppelvlakken en patronen met schoning van gevoelige letterlijke waarden. Resultaat: Accountgebonden aanroepen op afstand, focusregels, vierdelige aandachtstriage, achterstandsherstel, gezamenlijke verwerking, functionele meetwaarden, op bewijs gebaseerde overdracht, schoningsfuncties, controles van webadressen en DNS, bewerkingslogboeken, gepland verzenden, sessies en door vergrendeling beschermde statuspaden aangetroffen.
- Bewijs 4: [apps-script/MultiAccount.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MultiAccount.gs); Enkelvoudige statische inspectie van OAuth, identiteit, status en vergrendelingen met schoning van gevoelige letterlijke waarden. Resultaat: Autorisatie van Telegram-gebruiker, zone en verbinding, eenmalige OAuth-status, afzonderlijke afgeschermde sleutelregistraties, vastlegging van profielafbeeldingen, accountgebonden registers en talrijke vergrendelingen aangetroffen; de functie voor het vernieuwen van de Gmail-toegangssleutel heeft geen lokale vergrendeling binnen die functie.
- Bewijs 5: [apps-script/tests/mail_client.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_client.test.js); Uitsluitend statische inspectie van testnamen en relevante contracten; testen zijn niet uitgevoerd. Resultaat: Testdefinities dekken tegen herhaling bestand zijnde sessies, sleutel- en statusvergrendelingen, accountisolatie, focusmodus, triage, energie en herinneringen, gezamenlijke verwerking, achterstandsherstel, inhoudsvrije meetwaarden, veiligheid van webadressen, idempotent verzenden en gepland verzenden.
- Beperkingen: De bron in het kenniscentrum is uit rapporten afgeleide herkomst en vormt geen onafhankelijk bewijs.; Statische inspectie stelt de implementatiestructuur vast, maar niet een geslaagde uitvoering.; Er zijn geen testen uitgevoerd; geïnspecteerde testdefinities bewijzen niet dat een test is geslaagd.; Er is geen gelijktijdige uitvoering of reproductie van gelijktijdigheidsconflicten uitgevoerd.; Er is geen status van Gmail, Telegram, Apps Script, testomgeving of productieomgeving geraadpleegd.

## KH-PLAN-040

- Status: `gedeeltelijk`
- Categorie: `KH-PLAN`; type: `plan`
- Relevantie: actuele beveiliging van webhaken
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: Bij inkomende webhaken controleren op handtekening- of sleutelvalidatie, toegestane methoden, idempotentie, ontdubbeling en het ontbreken van foutopsporingsuitvoer in productie.
- Implementatiestatus: sleutelvalidatie en ontdubbeling aanwezig, afwezigheid van foutopsporingsuitvoer niet in de uitvoeringsomgeving bewezen
- Afhankelijkheden: referentieplatformpad in fase 3; contextuele minimale werkende versie voor Gmail in fase 4; automatisering en Telegram in fase 5
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-061](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); De bronpagina's zijn eenmalig gelezen en op canonieke ID met elkaar afgestemd. Resultaat: Dit legt de toegewezen uit rapporten afgeleide bewering vast en vormt geen onafhankelijk bewijs van implementatie of gedrag in de uitvoeringsomgeving.
- Bewijs 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Enkelvoudige statische inspectie van functies, koppelvlakken en patronen met schoning van gevoelige letterlijke waarden. Resultaat: Ontdubbeling van meldingen voor eigenaar en gelijke e-mailberichten, begrensde afleverregisters, status voor peilen en voortzetting, vergrendelingen op script- en gebruikersniveau, eenmalige startgetallen, validatie van webhaaksleutels, herinneringen, synchronisatie van Gmail-geschiedenis en Telegram-terugkoppelingen aangetroffen.
- Bewijs 3: [apps-script/tests/mail_actions.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_actions.test.js); Uitsluitend statische inspectie van testnamen en relevante contracten; testen zijn niet uitgevoerd. Resultaat: Testdefinities dekken gmail.modify zonder volledig e-mail- of verzendbereik, tijdconstante geheimcontrole voor webhaken, ontdubbeling van terugkoppelingen, begrensd peilen en herhalen, accountisolatie, veiligheid van webadressen en DNS, Gmail-geschiedenis en herinneringen tijdens stille uren.
- Beperkingen: De bron in het kenniscentrum is uit rapporten afgeleide herkomst en vormt geen onafhankelijk bewijs.; Statische inspectie stelt de implementatiestructuur vast, maar niet een geslaagde uitvoering.; Er zijn geen testen uitgevoerd; geïnspecteerde testdefinities bewijzen niet dat een test is geslaagd.; Er is geen status van Gmail, Telegram, Apps Script, testomgeving of productieomgeving geraadpleegd.

## KH-PLAN-041

- Status: `geverifieerd`
- Categorie: `KH-PLAN`; type: `plan`
- Relevantie: actuele controle van de broncodeopslagplaats
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: Verkenning van de broncodeopslagplaats: manifest, toegangsbereiken, uitrolconfiguratie, werkstromen, documentatie, vrijgavenotities en gebruik van geheimen.
- Implementatiestatus: voltooid voor de toegewezen vastlegging
- Afhankelijkheden: afstemming van bevoegdheden in fase 0
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-073](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); De bronpagina's zijn eenmalig gelezen en op canonieke ID met elkaar afgestemd. Resultaat: Dit legt de toegewezen uit rapporten afgeleide bewering vast en vormt geen onafhankelijk bewijs van implementatie of gedrag in de uitvoeringsomgeving.
- Bewijs 2: [README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/README.md); Volledige onveranderlijke inventarisatie via git ls-tree plus gerichte statische inspectie. Resultaat: De broncodeopslagplaats bestaat uit Apps Script, een statische terugkeerpagina, documentatie, testen en vrijgavegereedschap; er bestaat geen implementatie van Mailcow, Stalwart, Dovecot, Postfix, Redis, PostgreSQL, Pub/Sub, Cloud Run of Microsoft Graph.
- Bewijs 3: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Exacte inspectie van het onveranderlijke manifest. Resultaat: Het project schakelt Gmail v1 in en vraagt de toegangsbereiken gmail.modify, drive.readonly, script.external_request en script.scriptapp aan; de webtoepassing wordt uitgevoerd namens de uitroller en staat anoniem inkomend verkeer toe dat door de toepassingscode moet worden geauthenticeerd.
- Bewijs 4: [](https://github.com/Tarasevych/gmail-telegram-controls/tree/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a); Exacte inspectie van werkstromen plus inventarisatie van de onveranderlijke .github-boomstructuur. Resultaat: Deze werkstroom controleert uitsluitend tweetalige documentatie met alleen-lezen toegangsrechten voor de inhoud.
- Bewijs 5: [docs/en/releases/VERSIE-001-2026-07-19.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/releases/VERSIE-001-2026-07-19.md); Inspectie van het onveranderlijke vrijgave-artikel; lopende tekst werd behandeld als bewering tenzij bevestigd door broncode of Git-metadata. Resultaat: Versie 1 is uitdrukkelijk in uitvoering en niet gepromoveerd, gelabeld of vertegenwoordigd door een vrijgavevertakking; productie-acceptatie blijft onvolledig.
- Bewijs 6: [](https://github.com/Tarasevych/gmail-telegram-controls/tree/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a); Exacte inspectie van het negeerbeleid. Resultaat: Op inloggegevens lijkende bestanden, toegangssleutels, sleutels, logboeken, tussenopslag en lokale artefacten worden op patroon uitgesloten; dit bewijst geen serverzijdige geheimenscans op GitHub.
- Beperkingen: De bron in het kenniscentrum is uit rapporten afgeleide herkomst en vormt geen onafhankelijk bewijs.; Statische inspectie stelt de implementatiestructuur vast, maar niet een geslaagde uitvoering.; Er is geen geheimenscan op waardeniveau uitgevoerd op afgeschermde opslagplaatsen of alle historische broncodeobjecten.; Aanwezigheid of afwezigheid is uitsluitend vastgesteld voor de toegewezen onveranderlijke vastlegging.

## KH-PLAN-042

- Status: `gedeeltelijk`
- Categorie: `KH-PLAN`; type: `plan`
- Relevantie: actuele OAuth-controle
- Bereik en niveau: `gemengd` / `E2`
- Bewering: OAuth-spoorcontrole: terugkeeradres, toestemmingsscherm, toegangsbereiken, sleutelfouten en gelijktijdigheidsconflicten.
- Implementatiestatus: statisch spoor van doorverwijzing, toegangsbereiken, status en vernieuwing voltooid, uitvoeringsspoor ontbreekt
- Afhankelijkheden: afstemming van bevoegdheden in fase 0
- Conflicten: geen
- Gevoeligheid: `intern`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-074](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); De bronpagina's zijn eenmalig gelezen en op canonieke ID met elkaar afgestemd. Resultaat: Dit legt de toegewezen uit rapporten afgeleide bewering vast en vormt geen onafhankelijk bewijs van implementatie of gedrag in de uitvoeringsomgeving.
- Bewijs 2: [apps-script/MultiAccount.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MultiAccount.gs); Enkelvoudige statische inspectie van OAuth, identiteit, status en vergrendelingen met schoning van gevoelige letterlijke waarden. Resultaat: Autorisatie van Telegram-gebruiker, zone en verbinding, eenmalige OAuth-status, afzonderlijke afgeschermde sleutelregistraties, vastlegging van profielafbeeldingen, accountgebonden registers en talrijke vergrendelingen aangetroffen; de functie voor het vernieuwen van de Gmail-toegangssleutel heeft geen lokale vergrendeling binnen die functie.
- Bewijs 3: [gmail-oauth-callback.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/gmail-oauth-callback.html); Exacte inspectie van het onveranderlijke terugkeer-doorgiftebestand; omgevingsspecifieke eindpuntwaarde weggelaten. Resultaat: Het doorgiftebestand wist de zoekparameters uit de browsergeschiedenis, valideert begrensde status en code, stuurt uitsluitend actie, status en code door en sluit veilig af bij ongeldige invoer.
- Bewijs 4: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Exacte inspectie van het onveranderlijke manifest. Resultaat: Het project schakelt Gmail v1 in en vraagt de toegangsbereiken gmail.modify, drive.readonly, script.external_request en script.scriptapp aan; de webtoepassing wordt uitgevoerd namens de uitroller en staat anoniem inkomend verkeer toe dat door de toepassingscode moet worden geauthenticeerd.
- Bewijs 5: [apps-script/tests/oauth_callback_bridge.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/oauth_callback_bridge.test.js); Uitsluitend exacte statische inspectie van testdefinities; testen zijn niet uitgevoerd. Resultaat: Het contract staat uitsluitend eenmalige doorgifte van status en code toe en sluit authuser, prompt, scope, iss, browseropslag en consolelogboeken uit.
- Beperkingen: De bron in het kenniscentrum is uit rapporten afgeleide herkomst en vormt geen onafhankelijk bewijs.; Statische inspectie stelt de implementatiestructuur vast, maar niet een geslaagde uitvoering.; Er zijn geen testen uitgevoerd; geïnspecteerde testdefinities bewijzen niet dat een test is geslaagd.; Er is geen status van Gmail, Telegram, Apps Script, testomgeving of productieomgeving geraadpleegd.; Er is geen gelijktijdige uitvoering of reproductie van gelijktijdigheidsconflicten uitgevoerd.

## KH-PLAN-043

- Status: `gedeeltelijk`
- Categorie: `KH-PLAN`; type: `plan`
- Relevantie: actuele controle van de gebruikersinterface
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: Spoorcontrole van de Gmail-gebruikersinterface: startpagina, contextkaarten, opstelscherm, lege toestanden en foutkaarten.
- Implementatiestatus: statisch spoor van gebruikersinterface voltooid, weergegeven gedrag ongeverifieerd
- Afhankelijkheden: afstemming van bevoegdheden in fase 0
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-075](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); De bronpagina's zijn eenmalig gelezen en op canonieke ID met elkaar afgestemd. Resultaat: Dit legt de toegewezen uit rapporten afgeleide bewering vast en vormt geen onafhankelijk bewijs van implementatie of gedrag in de uitvoeringsomgeving.
- Bewijs 2: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Enkelvoudige statische inspectie van functies, documentmodel en patronen met schoning van gevoelige letterlijke waarden. Resultaat: Focusweergave, triage, instellingen voor energie, herinneringen en dichtheid, stille uren, gezamenlijke verwerking, milde mijlpalen, achterstandsherstel, bewijsweergave, profielafbeeldingen van accounts, directe OAuth-navigatie met terugvalroute, lege toestanden en foutkaarten, opstelscherm, schoning van het documentmodel en idempotente bewerkings-ID's aan clientzijde aangetroffen.
- Bewijs 3: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Enkelvoudige statische inspectie van functies, koppelvlakken en patronen met schoning van gevoelige letterlijke waarden. Resultaat: Accountgebonden aanroepen op afstand, focusregels, vierdelige aandachtstriage, achterstandsherstel, gezamenlijke verwerking, functionele meetwaarden, op bewijs gebaseerde overdracht, schoningsfuncties, controles van webadressen en DNS, bewerkingslogboeken, gepland verzenden, sessies en door vergrendeling beschermde statuspaden aangetroffen.
- Bewijs 4: [apps-script/tests/mail_app_contract.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_app_contract.test.js); Uitsluitend statische inspectie van testnamen en relevante contracten; testen zijn niet uitgevoerd. Resultaat: Testdefinities dekken routering van profielafbeeldingen, exact accountbehoud, drie primaire focusacties, ondersteunende instellingen voor energie en herinneringen, adaptieve dichtheid, gezamenlijke verwerking, milde mijlpalen, achterstandsherstel, inhoudsvrije meetwaarden, toegankelijke introductie en idempotent opstellen.
- Beperkingen: De bron in het kenniscentrum is uit rapporten afgeleide herkomst en vormt geen onafhankelijk bewijs.; Statische inspectie stelt de implementatiestructuur vast, maar niet een geslaagde uitvoering.; Er zijn geen testen uitgevoerd; geïnspecteerde testdefinities bewijzen niet dat een test is geslaagd.; Er is geen status van Gmail, Telegram, Apps Script, testomgeving of productieomgeving geraadpleegd.; Er is geen gebruikersonderzoek, acceptatie van de weergegeven interface of meting van gedragsresultaten uitgevoerd.

## KH-PLAN-044

- Status: `geblokkeerd`
- Categorie: `KH-PLAN`; type: `plan`
- Relevantie: actuele bewijsleemte in de uitvoeringsomgeving
- Bereik en niveau: `uitvoeringsomgeving` / `E2`
- Bewering: Netwerkspoorcontrole: externe aanroepen, antwoordcodes, herhaalpogingen, duplicaten en vertraging.
- Implementatiestatus: uitsluitend statische aanroeppaden
- Afhankelijkheden: afstemming van bevoegdheden in fase 0
- Conflicten: geen
- Gevoeligheid: `intern`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-076](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); De bronpagina's zijn eenmalig gelezen en op canonieke ID met elkaar afgestemd. Resultaat: Dit legt de toegewezen uit rapporten afgeleide bewering vast en vormt geen onafhankelijk bewijs van implementatie of gedrag in de uitvoeringsomgeving.
- Bewijs 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Enkelvoudige statische inspectie van functies, koppelvlakken en patronen met schoning van gevoelige letterlijke waarden. Resultaat: Ontdubbeling van meldingen voor eigenaar en gelijke e-mailberichten, begrensde afleverregisters, status voor peilen en voortzetting, vergrendelingen op script- en gebruikersniveau, eenmalige startgetallen, validatie van webhaaksleutels, herinneringen, synchronisatie van Gmail-geschiedenis en Telegram-terugkoppelingen aangetroffen.
- Bewijs 3: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Enkelvoudige statische inspectie van functies, koppelvlakken en patronen met schoning van gevoelige letterlijke waarden. Resultaat: Accountgebonden aanroepen op afstand, focusregels, vierdelige aandachtstriage, achterstandsherstel, gezamenlijke verwerking, functionele meetwaarden, op bewijs gebaseerde overdracht, schoningsfuncties, controles van webadressen en DNS, bewerkingslogboeken, gepland verzenden, sessies en door vergrendeling beschermde statuspaden aangetroffen.
- Beperkingen: De bron in het kenniscentrum is uit rapporten afgeleide herkomst en vormt geen onafhankelijk bewijs.; Er is geen status van Gmail, Telegram, Apps Script, testomgeving of productieomgeving geraadpleegd.; Het exacte veilige ontbrekende bewijs is een alleen-lezen netwerkspoor uit de testomgeving gekoppeld aan deze vastlegging, met weergave van de geschoonde eindpuntklasse, antwoordcode, uitkomst van herhaalpogingen en ontdubbeling, en vertraging.

## KH-PLAN-045

- Status: `geblokkeerd`
- Categorie: `KH-PLAN`; type: `plan`
- Relevantie: actuele bewijsleemte in de uitvoeringsomgeving
- Bereik en niveau: `uitvoeringsomgeving` / `E2`
- Bewering: Uitvoeringsspoorcontrole: uitvoeringslogboeken, uitgeschakelde starters, herhaallussen, voortzettingsstatus en `historyId`.
- Implementatiestatus: uitsluitend statische voortzettings- en geschiedenispaden
- Afhankelijkheden: afstemming van bevoegdheden in fase 0
- Conflicten: geen
- Gevoeligheid: `intern`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-077](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); De bronpagina's zijn eenmalig gelezen en op canonieke ID met elkaar afgestemd. Resultaat: Dit legt de toegewezen uit rapporten afgeleide bewering vast en vormt geen onafhankelijk bewijs van implementatie of gedrag in de uitvoeringsomgeving.
- Bewijs 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Enkelvoudige statische inspectie van functies, koppelvlakken en patronen met schoning van gevoelige letterlijke waarden. Resultaat: Ontdubbeling van meldingen voor eigenaar en gelijke e-mailberichten, begrensde afleverregisters, status voor peilen en voortzetting, vergrendelingen op script- en gebruikersniveau, eenmalige startgetallen, validatie van webhaaksleutels, herinneringen, synchronisatie van Gmail-geschiedenis en Telegram-terugkoppelingen aangetroffen.
- Bewijs 3: [docs/en/ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/ROADMAP.md); Inspectie van het onveranderlijke tweetalige stappenplan. Resultaat: Versie 1 is de enige actieve versie; lokale herstelwijzigingen, handmatige OAuth-acceptatie, onveranderlijke testopstelling, promotie, opschoning, label en vrijgavevertakking vormen afzonderlijke poorten.
- Beperkingen: De bron in het kenniscentrum is uit rapporten afgeleide herkomst en vormt geen onafhankelijk bewijs.; Er is geen status van Gmail, Telegram, Apps Script, testomgeving of productieomgeving geraadpleegd.; Het exacte veilige ontbrekende bewijs is een alleen-lezen momentopname van uitvoeringslogboeken en starters in Apps Script, gekoppeld aan de onveranderlijke uitrol en vastlegging, inclusief status voor herhaalpogingen, voortzetting en historyId met geschoonde privéwaarden.

## KH-PLAN-046

- Status: `gedeeltelijk`
- Categorie: `KH-PLAN`; type: `plan`
- Relevantie: actuele bewijsleemte voor vrijgave
- Bereik en niveau: `gemengd` / `E2`
- Bewering: Vrijgavespoorcontrole: scheiding tussen test- en productieomgeving, terugdraaien, gegevensbescherming in logboeken, CodeQL en geheimenscans.
- Implementatiestatus: statische paden voor vrijgave en terugdraaien aanwezig, beveiligingsdiensten en scheiding van uitvoeringsomgevingen niet bewezen
- Afhankelijkheden: contextuele minimale werkende versie voor Gmail in fase 4; automatisering en Telegram in fase 5; beveiligings- en vrijgaveverharding in fase 6
- Conflicten: geen
- Gevoeligheid: `intern`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-078](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); De bronpagina's zijn eenmalig gelezen en op canonieke ID met elkaar afgestemd. Resultaat: Dit legt de toegewezen uit rapporten afgeleide bewering vast en vormt geen onafhankelijk bewijs van implementatie of gedrag in de uitvoeringsomgeving.
- Bewijs 2: [apps-script/tools/release_apps_script_versie_001_20260719.ps1](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tools/release_apps_script_versie_001_20260719.ps1); Exacte statische inspectie van het vrijgavehulpscript met weglating van inloggegevens, omgevingsidentificatoren en lokale padwaarden. Resultaat: Het hulpscript pint hashes vast voor pakketten voor terugdraaien, eerdere testomgeving en kandidaat; scheidt voorcontrole, voorbereiding, promotie, opschoning en terugdraaien; registreert hoogstens-eenmalige aanmaakacties; en verifieert onveranderlijke inhoud.
- Bewijs 3: [docs/en/releases/VERSIE-001-2026-07-19.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/releases/VERSIE-001-2026-07-19.md); Lokale inspectie van git show-ref, labels, vertakkingen, gemeenschappelijke voorouder (merge-base) en divergentie bij de toegewezen vastlegging. Resultaat: De actieve lokale en externe vertakking Versie kwamen overeen met de toegewezen vastlegging; er bestond geen label of verwijzing release/versie-001, en de hoofdvertakking main bevond zich op een afwijkende publicatielijn.
- Bewijs 4: [](https://github.com/Tarasevych/gmail-telegram-controls/tree/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a); Exacte inspectie van werkstromen plus inventarisatie van de onveranderlijke .github-boomstructuur. Resultaat: Deze werkstroom controleert uitsluitend tweetalige documentatie met alleen-lezen toegangsrechten voor de inhoud.
- Bewijs 5: [](https://github.com/Tarasevych/gmail-telegram-controls/tree/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a); Exacte inspectie van werkstromen plus inventarisatie van de onveranderlijke .github-boomstructuur. Resultaat: Deze werkstroom valideert uitsluitend de consistentie van het tweetalige kenniscentrum; er bestaat bij deze vastlegging geen CodeQL, Dependabot-configuratie, uitrolwerkstroom, rooktestpijplijn voor de testomgeving of afzonderlijke beveiligingspijplijn.
- Bewijs 6: [docs/en/releases/VERSIE-001-2026-07-19.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/releases/VERSIE-001-2026-07-19.md); Inspectie van het onveranderlijke vrijgave-artikel; lopende tekst werd behandeld als bewering tenzij bevestigd door broncode of Git-metadata. Resultaat: Versie 1 is uitdrukkelijk in uitvoering en niet gepromoveerd, gelabeld of vertegenwoordigd door een vrijgavevertakking; productie-acceptatie blijft onvolledig.
- Beperkingen: De bron in het kenniscentrum is uit rapporten afgeleide herkomst en vormt geen onafhankelijk bewijs.; Statische inspectie stelt de implementatiestructuur vast, maar niet een geslaagde uitvoering.; Er is geen status van Gmail, Telegram, Apps Script, testomgeving of productieomgeving geraadpleegd.; Serverzijdige beveiligingsinstellingen van GitHub zijn niet uitgelezen.; Er is geen geheimenscan op waardeniveau uitgevoerd op afgeschermde opslagplaatsen of alle historische broncodeobjecten.

## KH-PLAN-047

- Status: `gedeeltelijk`
- Categorie: `KH-PLAN`; type: `plan`
- Relevantie: actuele neuro-inclusieve gebruikerservaring
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: Spoorcontrole van de gebruikerservaring: aantal primaire actieknoppen, toon van het overzicht, stille modus en schuldvrije achterstand.
- Implementatiestatus: statische contracten aanwezig, gedragsacceptatie ontbreekt
- Afhankelijkheden: afstemming van bevoegdheden in fase 0; controle van bewijs en fundament in fase 1; beveiligings- en vrijgaveverharding in fase 6
- Conflicten: CF-001
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-079](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); De bronpagina's zijn eenmalig gelezen en op canonieke ID met elkaar afgestemd. Resultaat: Dit legt de toegewezen uit rapporten afgeleide bewering vast en vormt geen onafhankelijk bewijs van implementatie of gedrag in de uitvoeringsomgeving.
- Bewijs 2: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Enkelvoudige statische inspectie van functies, documentmodel en patronen met schoning van gevoelige letterlijke waarden. Resultaat: Focusweergave, triage, instellingen voor energie, herinneringen en dichtheid, stille uren, gezamenlijke verwerking, milde mijlpalen, achterstandsherstel, bewijsweergave, profielafbeeldingen van accounts, directe OAuth-navigatie met terugvalroute, lege toestanden en foutkaarten, opstelscherm, schoning van het documentmodel en idempotente bewerkings-ID's aan clientzijde aangetroffen.
- Bewijs 3: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Enkelvoudige statische inspectie van functies, koppelvlakken en patronen met schoning van gevoelige letterlijke waarden. Resultaat: Ontdubbeling van meldingen voor eigenaar en gelijke e-mailberichten, begrensde afleverregisters, status voor peilen en voortzetting, vergrendelingen op script- en gebruikersniveau, eenmalige startgetallen, validatie van webhaaksleutels, herinneringen, synchronisatie van Gmail-geschiedenis en Telegram-terugkoppelingen aangetroffen.
- Bewijs 4: [apps-script/tests/mail_app_contract.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_app_contract.test.js); Uitsluitend statische inspectie van testnamen en relevante contracten; testen zijn niet uitgevoerd. Resultaat: Testdefinities dekken routering van profielafbeeldingen, exact accountbehoud, drie primaire focusacties, ondersteunende instellingen voor energie en herinneringen, adaptieve dichtheid, gezamenlijke verwerking, milde mijlpalen, achterstandsherstel, inhoudsvrije meetwaarden, toegankelijke introductie en idempotent opstellen.
- Beperkingen: De bron in het kenniscentrum is uit rapporten afgeleide herkomst en vormt geen onafhankelijk bewijs.; Statische inspectie stelt de implementatiestructuur vast, maar niet een geslaagde uitvoering.; Er zijn geen testen uitgevoerd; geïnspecteerde testdefinities bewijzen niet dat een test is geslaagd.; Er is geen status van Gmail, Telegram, Apps Script, testomgeving of productieomgeving geraadpleegd.; Er is geen gebruikersonderzoek, acceptatie van de weergegeven interface of meting van gedragsresultaten uitgevoerd.

## KH-PLAN-048

- Status: `gedeeltelijk`
- Categorie: `KH-PLAN`; type: `plan`
- Relevantie: actuele acceptatieleemte
- Bereik en niveau: `gemengd` / `E2`
- Bewering: Acceptatie-artefacten: toegangsbereiken, eindpuntenkaart, toestandsdiagram, knelpunten bij gelijktijdigheid, locaties met blootstellingsrisico voor persoonsgegevens, OAuth-reproductie, bewijs van de gebruikersinterface en een voor/na-herstelplan.
- Implementatiestatus: meerdere artefacten aanwezig maar volledig pakket niet bewezen
- Afhankelijkheden: contextuele minimale werkende versie voor Gmail in fase 4; automatisering en Telegram in fase 5; beveiligings- en vrijgaveverharding in fase 6
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-081](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); De bronpagina's zijn eenmalig gelezen en op canonieke ID met elkaar afgestemd. Resultaat: Dit legt de toegewezen uit rapporten afgeleide bewering vast en vormt geen onafhankelijk bewijs van implementatie of gedrag in de uitvoeringsomgeving.
- Bewijs 2: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Exacte inspectie van het onveranderlijke manifest. Resultaat: Het project schakelt Gmail v1 in en vraagt de toegangsbereiken gmail.modify, drive.readonly, script.external_request en script.scriptapp aan; de webtoepassing wordt uitgevoerd namens de uitroller en staat anoniem inkomend verkeer toe dat door de toepassingscode moet worden geauthenticeerd.
- Bewijs 3: [apps-script/V26_MULTI_ACCOUNT_ARCHITECTURE.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/V26_MULTI_ACCOUNT_ARCHITECTURE.md); Inspectie van het onveranderlijke architectuurcontract, waar mogelijk bevestigd door huidige broncode. Resultaat: Een contract voor de koppeling van Gmail- en Telegram-identiteit naar zone, rol en verbinding en een toekomstig gepartitioneerd opslagpad zijn gedocumenteerd; Mailcow, Stalwart en Microsoft Graph vormen niet de huidige implementatie.
- Bewijs 4: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Enkelvoudige statische inspectie van functies, documentmodel en patronen met schoning van gevoelige letterlijke waarden. Resultaat: Focusweergave, triage, instellingen voor energie, herinneringen en dichtheid, stille uren, gezamenlijke verwerking, milde mijlpalen, achterstandsherstel, bewijsweergave, profielafbeeldingen van accounts, directe OAuth-navigatie met terugvalroute, lege toestanden en foutkaarten, opstelscherm, schoning van het documentmodel en idempotente bewerkings-ID's aan clientzijde aangetroffen.
- Bewijs 5: [gmail-oauth-callback.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/gmail-oauth-callback.html); Exacte inspectie van het onveranderlijke terugkeer-doorgiftebestand; omgevingsspecifieke eindpuntwaarde weggelaten. Resultaat: Het doorgiftebestand wist de zoekparameters uit de browsergeschiedenis, valideert begrensde status en code, stuurt uitsluitend actie, status en code door en sluit veilig af bij ongeldige invoer.
- Bewijs 6: [apps-script/tools/release_apps_script_versie_001_20260719.ps1](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tools/release_apps_script_versie_001_20260719.ps1); Exacte statische inspectie van het vrijgavehulpscript met weglating van inloggegevens, omgevingsidentificatoren en lokale padwaarden. Resultaat: Het hulpscript pint hashes vast voor pakketten voor terugdraaien, eerdere testomgeving en kandidaat; scheidt voorcontrole, voorbereiding, promotie, opschoning en terugdraaien; registreert hoogstens-eenmalige aanmaakacties; en verifieert onveranderlijke inhoud.
- Bewijs 7: [docs/audit/v45-nonworking-functions-fix-list.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/audit/v45-nonworking-functions-fix-list.md); Uitsluitend inspectie van onveranderlijke boomstructuur en geschiedenis; controleproza werd niet door herhaling als bewijs geaccepteerd. Resultaat: Er bestaan meerdere controle-artefacten, wat onbeschikbaarheid van de broncodeopslagplaats weerlegt maar geen volledige controle van de uitvoeringsomgeving bewijst.
- Beperkingen: De bron in het kenniscentrum is uit rapporten afgeleide herkomst en vormt geen onafhankelijk bewijs.; Statische inspectie stelt de implementatiestructuur vast, maar niet een geslaagde uitvoering.; Er zijn geen testen uitgevoerd; geïnspecteerde testdefinities bewijzen niet dat een test is geslaagd.; Er is geen status van Gmail, Telegram, Apps Script, testomgeving of productieomgeving geraadpleegd.; Er is geen geheimenscan op waardeniveau uitgevoerd op afgeschermde opslagplaatsen of alle historische broncodeobjecten.

## KH-PROD-001

- Status: `gedeeltelijk`
- Categorie: `KH-PROD`; type: `product`
- Relevantie: hoog
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: Kunstmatige intelligentie moet een bericht omzetten in een volgende stap, concept, herinnering, taak of uitgestelde actie.
- Implementatiestatus: gedeeltelijk geïmplementeerd
- Afhankelijkheden: KH-DEP-013; KH-DEP-015
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R1-006](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Bewijs 1: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Functies voor gesprekssamenvatting, bewijsbronnen, extractie van acties, vervaldatums, bedragen en risico's en deterministische scoreberekening geïnspecteerd. Resultaat: De serverlaag bouwt Oekraïense samenvattingen met bronfragmenten en actiemetadata met behulp van deterministische heuristieken.
- Bewijs 2: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Symbolen voor weergave van samenvattingen en bewijs en voor overdracht naar taken en agenda geïnspecteerd. Resultaat: De gebruikersinterface geeft samenvattingsbewijs en gestructureerde vervolgsuggesties weer.
- Bewijs 3: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Voorbereiding en toepassing van acties, sluimeren, labels, antwoordsjablonen en afstemming van verplaatsingen in Telegram geïnspecteerd. Resultaat: De serverlaag implementeert archief en postvak, sluimeren en uitstellen, labels, antwoordsjablonen en afgestemde actiestatus.
- Bewijs 4: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Routering van Telegram-terugkoppelingen, kaartacties, herinneringsterugkoppelingen en Gmail-afstemming geïnspecteerd. Resultaat: Korte acties in Telegram en de bijbehorende statusafstemming met Gmail zijn aanwezig.
- Bewijs 5: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Functies voor validatie, opslag, reservering, herhaalpogingen, annulering en verwerking van geplande verzendingen geïnspecteerd. Resultaat: Duurzame accountgebonden conceptplanning en door starters aangestuurde verwerking zijn in de broncode aanwezig.
- Bewijs 6: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Functies voor de status van vertraagd verzenden, bedieningselementen, conceptopslag en verzending vanuit het opstelscherm geïnspecteerd. Resultaat: De opstelinterface kan vertraagde conceptverzendingen plannen, verplaatsen, annuleren en weergeven.
- Beperkingen: Statische broncode ondersteunt samenvattingen, volgende acties, concepten, herinneringen, taken en uitstel, maar bewijst niet de modelkwaliteit of geslaagd eind-tot-eind-gedrag.

## KH-PROD-002

- Status: `gedeeltelijk`
- Categorie: `KH-PROD`; type: `product`
- Relevantie: hoog
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: Bied energie- en contextbewuste tijdmodi, inspanningsschattingen en verlooprisico.
- Implementatiestatus: gedeeltelijk geïmplementeerd
- Afhankelijkheden: KH-DEP-011; KH-DEP-015
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R1-011](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md), [R1-016](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md), [R1-037](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md), [R2-064](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md), [R3-011](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Interfacesymbolen voor focus, energie, dichtheid, sessie, volgende actie en hervatting in het vastgepinde broncodeobject geïnspecteerd. Resultaat: De gebruikersinterface bevat focusinstellingen, weergave van focussessies, dichtheidsmodi, een bewerker voor de volgende actie en een hervattingsbalk; dit bewijst uitsluitend de aanwezigheid van broncode.
- Bewijs 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Functies voor focusregistratie, focusevaluatie en aandachtsstatus in het vastgepinde broncodeobject geïnspecteerd. Resultaat: De serverlaag bevat accountgebonden focusniveaus en -regels, aandachtsstatus, achterstandsherstel en opgeslagen sessiegerelateerde gegevensoverdrachtsobjecten.
- Bewijs 3: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Functies voor gesprekssamenvatting, bewijsbronnen, extractie van acties, vervaldatums, bedragen en risico's en deterministische scoreberekening geïnspecteerd. Resultaat: De serverlaag bouwt Oekraïense samenvattingen met bronfragmenten en actiemetadata met behulp van deterministische heuristieken.
- Bewijs 4: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Symbolen voor weergave van samenvattingen en bewijs en voor overdracht naar taken en agenda geïnspecteerd. Resultaat: De gebruikersinterface geeft samenvattingsbewijs en gestructureerde vervolgsuggesties weer.
- Beperkingen: Energie- en focusstatus en heuristische extractie van vervaldatums en risico's zijn aanwezig; gekalibreerde inspanningsschattingen en contextbewuste tijdsbepaling zijn niet volledig door statische inspectie vastgesteld.

## KH-PROD-003

- Status: `gedeeltelijk`
- Categorie: `KH-PROD`; type: `product`
- Relevantie: hoog
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: Bundel e-mail in gecontroleerde sessies met behoud van een afzonderlijk kanaal voor daadwerkelijk urgente signalen.
- Implementatiestatus: gedeeltelijk geïmplementeerd
- Afhankelijkheden: KH-DEP-011; KH-DEP-015
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R1-015](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md), [R2-069](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md), [R3-015](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Interfacesymbolen voor focus, energie, dichtheid, sessie, volgende actie en hervatting in het vastgepinde broncodeobject geïnspecteerd. Resultaat: De gebruikersinterface bevat focusinstellingen, weergave van focussessies, dichtheidsmodi, een bewerker voor de volgende actie en een hervattingsbalk; dit bewijst uitsluitend de aanwezigheid van broncode.
- Bewijs 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Functies voor focusregistratie, focusevaluatie en aandachtsstatus in het vastgepinde broncodeobject geïnspecteerd. Resultaat: De serverlaag bevat accountgebonden focusniveaus en -regels, aandachtsstatus, achterstandsherstel en opgeslagen sessiegerelateerde gegevensoverdrachtsobjecten.
- Bewijs 3: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Functies voor herinneringsreservering, poortbewaking voor stille uren en overzichten, verzending, terugkoppelingen en verwerking geïnspecteerd. Resultaat: De serverlaag implementeert begrensde zachte herinneringen, overzichtsvensters, acties voor later, herhaalpogingen en orkestratie van Telegram-aflevering.
- Bewijs 4: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Herinneringskeuzes tijdens de introductie en de gebruikersinterface voor overzichtsvensters geïnspecteerd. Resultaat: De gebruikersinterface biedt voorkeuren voor zachte herinneringen, overzichten en meldingen voor uitsluitend urgente berichten.
- Beperkingen: Beheerde focussessies en een voorkeur voor uitsluitend urgente meldingen bestaan, maar een afzonderlijk noodkanaal en de routering daarvan in de uitvoeringsomgeving zijn niet bewezen.

## KH-PROD-004

- Status: `gedeeltelijk`
- Categorie: `KH-PROD`; type: `product`
- Relevantie: hoog
- Bereik en niveau: `gemengd` / `E2`
- Bewering: Beloon concrete kleine afrondingen zonder gokmechanismen, volumedoelen of sancties bij onderbroken reeksen.
- Implementatiestatus: geïmplementeerd
- Afhankelijkheden: KH-DEP-011
- Conflicten: CF-005
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R1-017](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md), [R1-044](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md), [R2-067](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md), [R3-017](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); De functies resetGentleMilestones, recordGentleMilestone en renderGentleMilestoneCard geïnspecteerd. Resultaat: Een wegklikbare interface voor milde mijlpalen registreert kleine afrondingsgebeurtenissen; in de geselecteerde broncode is geen reeks- of gokmechanisme aangetroffen.
- Beperkingen: De broncode voor milde mijlpalen ondersteunt erkenning van kleine afrondingen en er is geen reeksmechanisme aangetroffen, maar het uitsluiten van manipulatieve effecten vereist een beoordeling van de gebruikerservaring.

## KH-PROD-005

- Status: `gedeeltelijk`
- Categorie: `KH-PROD`; type: `product`
- Relevantie: hoog
- Bereik en niveau: `gemengd` / `E2`
- Bewering: Toon in de start- of lage-energiemodus uitsluitend enkele kleinst haalbare acties zonder schuldgevoel op te wekken.
- Implementatiestatus: geïmplementeerd
- Afhankelijkheden: KH-DEP-011; KH-DEP-015
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R1-021](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md), [R2-063](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md), [R3-008](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Interfacesymbolen voor focus, energie, dichtheid, sessie, volgende actie en hervatting in het vastgepinde broncodeobject geïnspecteerd. Resultaat: De gebruikersinterface bevat focusinstellingen, weergave van focussessies, dichtheidsmodi, een bewerker voor de volgende actie en een hervattingsbalk; dit bewijst uitsluitend de aanwezigheid van broncode.
- Bewijs 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Functies voor focusregistratie, focusevaluatie en aandachtsstatus in het vastgepinde broncodeobject geïnspecteerd. Resultaat: De serverlaag bevat accountgebonden focusniveaus en -regels, aandachtsstatus, achterstandsherstel en opgeslagen sessiegerelateerde gegevensoverdrachtsobjecten.
- Beperkingen: Oppervlakken voor lage-energiemodus en begrensde acties zijn aanwezig; het schuldvrije resultaat en de geschiktheid van acties vereisen acceptatiebewijs voor toegankelijkheid en bruikbaarheid.

## KH-PROD-006

- Status: `gedeeltelijk`
- Categorie: `KH-PROD`; type: `product`
- Relevantie: hoog
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: Vang besluiteloosheid op met kant-en-klare keuzes: `Later beantwoorden`, `Omzetten naar taak`, `Vraag AI om concept` en `Archiveren met herinnering`.
- Implementatiestatus: gedeeltelijk geïmplementeerd
- Afhankelijkheden: KH-DEP-013; KH-DEP-015
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R1-023](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Bewijs 1: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Voorbereiding en toepassing van acties, sluimeren, labels, antwoordsjablonen en afstemming van verplaatsingen in Telegram geïnspecteerd. Resultaat: De serverlaag implementeert archief en postvak, sluimeren en uitstellen, labels, antwoordsjablonen en afgestemde actiestatus.
- Bewijs 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Routering van Telegram-terugkoppelingen, kaartacties, herinneringsterugkoppelingen en Gmail-afstemming geïnspecteerd. Resultaat: Korte acties in Telegram en de bijbehorende statusafstemming met Gmail zijn aanwezig.
- Bewijs 3: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Opbouw van op bewijs gebaseerde taaktitels en agendasuggesties geïnspecteerd. Resultaat: Suggesties voor overdracht naar taken en Agenda worden afgeleid uit berichtbewijs; de serverlaag vermijdt uitdrukkelijk het verzinnen van datums of het rechtstreeks aanmaken van Agenda-objecten.
- Bewijs 4: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Bewijsweergave voor taken en agenda en opbouw van webadressen voor agenda-overdracht geïnspecteerd. Resultaat: De gebruikersinterface biedt acties voor overdracht naar taken en Agenda.
- Bewijs 5: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Functies voor validatie, opslag, reservering, herhaalpogingen, annulering en verwerking van geplande verzendingen geïnspecteerd. Resultaat: Duurzame accountgebonden conceptplanning en door starters aangestuurde verwerking zijn in de broncode aanwezig.
- Bewijs 6: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Functies voor de status van vertraagd verzenden, bedieningselementen, conceptopslag en verzending vanuit het opstelscherm geïnspecteerd. Resultaat: De opstelinterface kan vertraagde conceptverzendingen plannen, verplaatsen, annuleren en weergeven.
- Beperkingen: Stromen voor beantwoorden en uitstellen, taakoverdracht, archiveren en sluimeren en concepten bestaan; het exacte vierkeuzecontract, met name `Vraag AI om concept`, is niet vastgesteld.

## KH-PROD-007

- Status: `gedeeltelijk`
- Categorie: `KH-PROD`; type: `product`
- Relevantie: hoog
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: Het focusoppervlak moet een lage informatiedichtheid hebben, uit één kolom of kaarten bestaan en geen volledige e-mailclient nabootsen.
- Implementatiestatus: gedeeltelijk geïmplementeerd
- Afhankelijkheden: KH-DEP-011
- Conflicten: CF-001
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R1-035](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md), [R2-066](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md), [R3-107](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Interfacesymbolen voor focus, energie, dichtheid, sessie, volgende actie en hervatting in het vastgepinde broncodeobject geïnspecteerd. Resultaat: De gebruikersinterface bevat focusinstellingen, weergave van focussessies, dichtheidsmodi, een bewerker voor de volgende actie en een hervattingsbalk; dit bewijst uitsluitend de aanwezigheid van broncode.
- Bewijs 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Functies voor focusregistratie, focusevaluatie en aandachtsstatus in het vastgepinde broncodeobject geïnspecteerd. Resultaat: De serverlaag bevat accountgebonden focusniveaus en -regels, aandachtsstatus, achterstandsherstel en opgeslagen sessiegerelateerde gegevensoverdrachtsobjecten.
- Bewijs 3: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Gebruikersinterface voor mappen, gesprekken, opstellen, bijlagen, labels, focus en adaptieve dichtheid geïnspecteerd. Resultaat: De broncodeopslagplaats implementeert een brede e-mailwebtoepassing met een optioneel gericht en adaptief oppervlak, niet slechts een minimaal kaartoppervlak.
- Beperkingen: Er bestaat een adaptieve focusinterface met lage informatiedichtheid, maar deze is ingebed in een brede volledige e-mailclient; of het focusoppervlak daadwerkelijk als afzonderlijk wordt ervaren, vereist bewijs van de weergegeven gebruikerservaring.

## KH-PROD-008

- Status: `geverifieerd`
- Categorie: `KH-PROD`; type: `product`
- Relevantie: hoog
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: `Hervattingsbalk`: laatste gesprek, onderbrekingspunt en automatisch opgeslagen positie, status en gedeeltelijke triage.
- Implementatiestatus: geïmplementeerd
- Afhankelijkheden: KH-DEP-015; KH-DEP-018
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R1-036](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Bewijs 1: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); De functies normalizeResumeRail, buildResumeRail, automatische opslag tijdens de levenscyclus en sessiebalkfuncties geïnspecteerd. Resultaat: De broncode voor de hervattingsbalk en automatische opslag bewaart geselecteerde interface- en sessiestatus.
- Bewijs 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Status voor aandachtshervatting en functies voor opgeslagen sessiegroepen geïnspecteerd. Resultaat: De status in de serverlaag ondersteunt werkhervatting en sessiecontinuïteit.
- Beperkingen: Statische implementatie-inspectie bewijst uitsluitend de aanwezigheid van broncode; er is geen geautomatiseerde test, teruglezing uit de testomgeving of productie-acceptatie uitgevoerd.

## KH-PROD-009

- Status: `ongeverifieerd`
- Categorie: `KH-PROD`; type: `product`
- Relevantie: gemiddeld
- Bereik en niveau: `broncodeopslagplaats` / `E1`
- Bewering: `Startknop`: beginnen met één zin, een samenvatting, een besluit of een datumwijziging.
- Implementatiestatus: onbekend
- Afhankelijkheden: KH-DEP-011
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R1-038](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Bewijs 1: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); De volledige vastgepinde Git-boomstructuur vergeleken met de expliciete toestemmingslijst voor Apps Script-uitrol en het manifest. Resultaat: De uitrolbare reeks bestaat uit vier Apps Script- en HTML-bronbestanden plus het manifest. De actieve boomstructuur bevat geen Node-pakketmanifest, Redis, Mailcow, Postfix of Dovecot, Pub/Sub of Cloud Run, OpenPGP, S/MIME of declaraties van de genoemde e-mailbibliotheken.
- Beperkingen: De geselecteerde implementatie-inventaris heeft geen afzonderlijk contract voor een `Startknop` vastgesteld; aangrenzende bedieningselementen voor samenvatting en volgende actie vormen geen gelijkwaardig bewijs.

## KH-PROD-010

- Status: `geverifieerd`
- Categorie: `KH-PROD`; type: `product`
- Relevantie: hoog
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: Gebruik rustige, niet-veroordelende herinneringen en een overzicht met slechts enkele berichten met de grootste impact.
- Implementatiestatus: geïmplementeerd
- Afhankelijkheden: KH-DEP-011; KH-DEP-015
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R1-039](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md), [R1-045](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md), [R2-065](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md), [R3-013](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md), [R3-016](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Functies voor herinneringsreservering, poortbewaking voor stille uren en overzichten, verzending, terugkoppelingen en verwerking geïnspecteerd. Resultaat: De serverlaag implementeert begrensde zachte herinneringen, overzichtsvensters, acties voor later, herhaalpogingen en orkestratie van Telegram-aflevering.
- Bewijs 2: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Herinneringskeuzes tijdens de introductie en de gebruikersinterface voor overzichtsvensters geïnspecteerd. Resultaat: De gebruikersinterface biedt voorkeuren voor zachte herinneringen, overzichten en meldingen voor uitsluitend urgente berichten.
- Beperkingen: Statische implementatie-inspectie bewijst uitsluitend de aanwezigheid van broncode; er is geen geautomatiseerde test, teruglezing uit de testomgeving of productie-acceptatie uitgevoerd.

## KH-PROD-011

- Status: `gedeeltelijk`
- Categorie: `KH-PROD`; type: `product`
- Relevantie: hoog
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: Verdeel berichten over enkele brede toestanden: actie, wachten, naslag en later.
- Implementatiestatus: gedeeltelijk geïmplementeerd
- Afhankelijkheden: KH-DEP-013
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R1-040](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md), [R3-014](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Voorbereiding en toepassing van acties, sluimeren, labels, antwoordsjablonen en afstemming van verplaatsingen in Telegram geïnspecteerd. Resultaat: De serverlaag implementeert archief en postvak, sluimeren en uitstellen, labels, antwoordsjablonen en afgestemde actiestatus.
- Bewijs 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Routering van Telegram-terugkoppelingen, kaartacties, herinneringsterugkoppelingen en Gmail-afstemming geïnspecteerd. Resultaat: Korte acties in Telegram en de bijbehorende statusafstemming met Gmail zijn aanwezig.
- Beperkingen: Archief en postvak, sluimeren en later, labels en actiestatus bestaan; de exacte vierdeling (actie, wachten, naslag, later) is niet volledig vertegenwoordigd.

## KH-PROD-012

- Status: `gedeeltelijk`
- Categorie: `KH-PROD`; type: `product`
- Relevantie: hoog
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: `Samenvatting met bronverwijzing`: een samenvatting, drie belangrijke bronzinnen en een blok `wie/wat/wanneer/volgende-actie`.
- Implementatiestatus: gedeeltelijk geïmplementeerd
- Afhankelijkheden: KH-DEP-013
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R1-041](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Bewijs 1: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Functies voor gesprekssamenvatting, bewijsbronnen, extractie van acties, vervaldatums, bedragen en risico's en deterministische scoreberekening geïnspecteerd. Resultaat: De serverlaag bouwt Oekraïense samenvattingen met bronfragmenten en actiemetadata met behulp van deterministische heuristieken.
- Bewijs 2: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Symbolen voor weergave van samenvattingen en bewijs en voor overdracht naar taken en agenda geïnspecteerd. Resultaat: De gebruikersinterface geeft samenvattingsbewijs en gestructureerde vervolgsuggesties weer.
- Beperkingen: Bewijsfragmenten en metadata voor acties, vervaldatums, bedragen en risico's bestaan, maar exact drie zinnen en het volledige schema `wie/wat/wanneer/volgende-actie` zijn niet vastgesteld.

## KH-PROD-013

- Status: `gedeeltelijk`
- Categorie: `KH-PROD`; type: `product`
- Relevantie: hoog
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: `Vertrouwenslaag`: AI-label, betrouwbaarheidsband, bronweergave en bevestiging van risicovolle beweringen.
- Implementatiestatus: gedeeltelijk geïmplementeerd
- Afhankelijkheden: KH-DEP-013
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R1-042](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Bewijs 1: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Functies voor gesprekssamenvatting, bewijsbronnen, extractie van acties, vervaldatums, bedragen en risico's en deterministische scoreberekening geïnspecteerd. Resultaat: De serverlaag bouwt Oekraïense samenvattingen met bronfragmenten en actiemetadata met behulp van deterministische heuristieken.
- Bewijs 2: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Symbolen voor weergave van samenvattingen en bewijs en voor overdracht naar taken en agenda geïnspecteerd. Resultaat: De gebruikersinterface geeft samenvattingsbewijs en gestructureerde vervolgsuggesties weer.
- Beperkingen: Een label voor geautomatiseerde analyse, bewijsbron en risicoheuristieken bestaan; een gekalibreerde betrouwbaarheidsband en een expliciete bevestigingspoort voor hoog risico zijn niet volledig vastgesteld.

## KH-PROD-014

- Status: `geverifieerd`
- Categorie: `KH-PROD`; type: `product`
- Relevantie: hoog
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: Bied korte, op het energieniveau afgestemde antwoordsjablonen en gecontroleerd vertraagd verzenden zonder privé-inhoud te reproduceren.
- Implementatiestatus: geïmplementeerd
- Afhankelijkheden: KH-DEP-013; KH-DEP-015
- Conflicten: CF-004
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R1-043](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md), [R2-068](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md), [R3-035](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Interfacesymbolen voor focus, energie, dichtheid, sessie, volgende actie en hervatting in het vastgepinde broncodeobject geïnspecteerd. Resultaat: De gebruikersinterface bevat focusinstellingen, weergave van focussessies, dichtheidsmodi, een bewerker voor de volgende actie en een hervattingsbalk; dit bewijst uitsluitend de aanwezigheid van broncode.
- Bewijs 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Functies voor focusregistratie, focusevaluatie en aandachtsstatus in het vastgepinde broncodeobject geïnspecteerd. Resultaat: De serverlaag bevat accountgebonden focusniveaus en -regels, aandachtsstatus, achterstandsherstel en opgeslagen sessiegerelateerde gegevensoverdrachtsobjecten.
- Bewijs 3: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Functies voor validatie, opslag, reservering, herhaalpogingen, annulering en verwerking van geplande verzendingen geïnspecteerd. Resultaat: Duurzame accountgebonden conceptplanning en door starters aangestuurde verwerking zijn in de broncode aanwezig.
- Bewijs 4: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Functies voor de status van vertraagd verzenden, bedieningselementen, conceptopslag en verzending vanuit het opstelscherm geïnspecteerd. Resultaat: De opstelinterface kan vertraagde conceptverzendingen plannen, verplaatsen, annuleren en weergeven.
- Bewijs 5: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Schoningsfuncties voor HTML, stijlen, labels en bijlagen en grenzen voor bronfragmenten geïnspecteerd. Resultaat: De serverlaag bevat expliciete gegevensschoning, begrensde bewijsfragmenten en autorisatiecontroles voor eigenaar en sessie.
- Bewijs 6: [gmail-oauth-callback.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/gmail-oauth-callback.html); Inhoudsbeveiligingsbeleid (CSP), verwijzersbeleid, status- en codevalidatie en verwijdering van zoekparameters geïnspecteerd. Resultaat: Het terugkeer-doorgiftebestand minimaliseert bewaarde OAuth-antwoordgegevens en wijst ongeldige invoer af.
- Beperkingen: Statische implementatie-inspectie bewijst uitsluitend de aanwezigheid van broncode; er is geen geautomatiseerde test, teruglezing uit de testomgeving of productie-acceptatie uitgevoerd.

## KH-PROD-015

- Status: `geverifieerd`
- Categorie: `KH-PROD`; type: `product`
- Relevantie: hoog
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: Bied een korte modus voor gezamenlijke verwerking of aanwezigheidsondersteuning gericht op één actie zonder privé-inhoud te dupliceren.
- Implementatiestatus: geïmplementeerd
- Afhankelijkheden: KH-DEP-015
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R1-046](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md), [R3-040](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); De functie mailboxCoProcessingSession_ en functies voor aanwezigheidsnormalisatie en gegevensoverdracht geïnspecteerd. Resultaat: Besloten sessies voor gezamenlijke verwerking van 10 of 25 minuten zijn geïmplementeerd als accountgebonden aanwezigheidsstatus.
- Bewijs 2: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Kaart voor gezamenlijke verwerking, klok, toelichting en sessiebediening geïnspecteerd. Resultaat: Een afzonderlijk oppervlak voor gezamenlijke verwerking gericht op één actie is aanwezig.
- Bewijs 3: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Schoningsfuncties voor HTML, stijlen, labels en bijlagen en grenzen voor bronfragmenten geïnspecteerd. Resultaat: De serverlaag bevat expliciete gegevensschoning, begrensde bewijsfragmenten en autorisatiecontroles voor eigenaar en sessie.
- Bewijs 4: [gmail-oauth-callback.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/gmail-oauth-callback.html); Inhoudsbeveiligingsbeleid (CSP), verwijzersbeleid, status- en codevalidatie en verwijdering van zoekparameters geïnspecteerd. Resultaat: Het terugkeer-doorgiftebestand minimaliseert bewaarde OAuth-antwoordgegevens en wijst ongeldige invoer af.
- Beperkingen: Statische implementatie-inspectie bewijst uitsluitend de aanwezigheid van broncode; er is geen geautomatiseerde test, teruglezing uit de testomgeving of productie-acceptatie uitgevoerd.

## KH-PROD-016

- Status: `gedeeltelijk`
- Categorie: `KH-PROD`; type: `product`
- Relevantie: hoog
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: `Neuro-inclusieve introductie`: drie stappen, voortgangsweergave, een vastgezette samenvatting, magische koppelingen of toegangssleutels en een vaste plek voor hulp.
- Implementatiestatus: gedeeltelijk geïmplementeerd
- Afhankelijkheden: KH-DEP-011; KH-DEP-019
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R1-047](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Bewijs 1: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Functies voor introductievoorkeuren, weergave, focusisolatie, keuze en afronding geïnspecteerd. Resultaat: Een meerstaps neuro-inclusieve introductiestroom met voortgang, voorkeuren en bereikbare hulpinterface is aanwezig; een implementatie van toegangssleutels of magische koppelingen is niet vastgesteld.
- Bewijs 2: [gmail-oauth-callback.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/gmail-oauth-callback.html); De geschoonde doorgiftepagina voor OAuth-terugkoppeling geïnspecteerd. Resultaat: De verbindingsstroom is gebaseerd op OAuth-terugkoppeling, niet op magische koppelingen of toegangssleutels.
- Beperkingen: Meerstapsintroductie en een vaste hulpplek zijn aanwezig; er is geen implementatie van magische koppelingen of toegangssleutels aangetroffen, en het gedrag van een vastgezette samenvatting is niet volledig vastgesteld.

## KH-PROD-017

- Status: `gedeeltelijk`
- Categorie: `KH-PROD`; type: `product`
- Relevantie: gemiddeld
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: Visuele ankers omvatten een gesprekstijdlijn, statuslabels, sessievoortgang en een vastgezette volgende stap.
- Implementatiestatus: gedeeltelijk geïmplementeerd
- Afhankelijkheden: KH-DEP-011
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R1-049](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Bewijs 1: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Interfacesymbolen voor focus, energie, dichtheid, sessie, volgende actie en hervatting in het vastgepinde broncodeobject geïnspecteerd. Resultaat: De gebruikersinterface bevat focusinstellingen, weergave van focussessies, dichtheidsmodi, een bewerker voor de volgende actie en een hervattingsbalk; dit bewijst uitsluitend de aanwezigheid van broncode.
- Bewijs 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Functies voor focusregistratie, focusevaluatie en aandachtsstatus in het vastgepinde broncodeobject geïnspecteerd. Resultaat: De serverlaag bevat accountgebonden focusniveaus en -regels, aandachtsstatus, achterstandsherstel en opgeslagen sessiegerelateerde gegevensoverdrachtsobjecten.
- Bewijs 3: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Voorbereiding en toepassing van acties, sluimeren, labels, antwoordsjablonen en afstemming van verplaatsingen in Telegram geïnspecteerd. Resultaat: De serverlaag implementeert archief en postvak, sluimeren en uitstellen, labels, antwoordsjablonen en afgestemde actiestatus.
- Bewijs 4: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Routering van Telegram-terugkoppelingen, kaartacties, herinneringsterugkoppelingen en Gmail-afstemming geïnspecteerd. Resultaat: Korte acties in Telegram en de bijbehorende statusafstemming met Gmail zijn aanwezig.
- Beperkingen: Sessievoortgang, gespreksstatuslabels en bediening voor de volgende actie bestaan; een volledige gesprekstijdlijn en een contract voor een vastgezette volgende stap zijn niet vastgesteld.

## KH-PROD-018

- Status: `gedeeltelijk`
- Categorie: `KH-PROD`; type: `product`
- Relevantie: hoog
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: Combineer deterministische regels, statistische scores en kunstmatige intelligentie voor ruisonderdrukking, samenvattingen en actie-extractie.
- Implementatiestatus: gedeeltelijk geïmplementeerd
- Afhankelijkheden: KH-DEP-013
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R1-050](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md), [R2-048](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Bewijs 1: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Functies voor gesprekssamenvatting, bewijsbronnen, extractie van acties, vervaldatums, bedragen en risico's en deterministische scoreberekening geïnspecteerd. Resultaat: De serverlaag bouwt Oekraïense samenvattingen met bronfragmenten en actiemetadata met behulp van deterministische heuristieken.
- Bewijs 2: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Symbolen voor weergave van samenvattingen en bewijs en voor overdracht naar taken en agenda geïnspecteerd. Resultaat: De gebruikersinterface geeft samenvattingsbewijs en gestructureerde vervolgsuggesties weer.
- Bewijs 3: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); De volledige vastgepinde Git-boomstructuur vergeleken met de expliciete toestemmingslijst voor Apps Script-uitrol en het manifest. Resultaat: De uitrolbare reeks bestaat uit vier Apps Script- en HTML-bronbestanden plus het manifest. De actieve boomstructuur bevat geen Node-pakketmanifest, Redis, Mailcow, Postfix of Dovecot, Pub/Sub of Cloud Run, OpenPGP, S/MIME of declaraties van de genoemde e-mailbibliotheken.
- Beperkingen: Deterministische regels en heuristische scores zijn geïmplementeerd, maar er is geen afhankelijkheid of declaratie van een statistisch model of externe kunstmatige intelligentie aangetroffen; het label `automated-ai-analysis` alleen vormt geen bewijs van kunstmatige intelligentie.

## KH-PROD-019

- Status: `gedeeltelijk`
- Categorie: `KH-PROD`; type: `product`
- Relevantie: hoog
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: Agenda- en taakgerichte berichten moeten een afspraak, herinnering of controlelijst aanbieden.
- Implementatiestatus: gedeeltelijk geïmplementeerd
- Afhankelijkheden: KH-DEP-013
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R1-051](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Bewijs 1: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Opbouw van op bewijs gebaseerde taaktitels en agendasuggesties geïnspecteerd. Resultaat: Suggesties voor overdracht naar taken en Agenda worden afgeleid uit berichtbewijs; de serverlaag vermijdt uitdrukkelijk het verzinnen van datums of het rechtstreeks aanmaken van Agenda-objecten.
- Bewijs 2: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Bewijsweergave voor taken en agenda en opbouw van webadressen voor agenda-overdracht geïnspecteerd. Resultaat: De gebruikersinterface biedt acties voor overdracht naar taken en Agenda.
- Beperkingen: Op bewijs gebaseerde overdracht naar taken en Agenda is aanwezig; dekking voor herinneringen en controlelijsten en eind-tot-eind-aanmaak zijn niet bewezen.

## KH-PROD-020

- Status: `gedeeltelijk`
- Categorie: `KH-PROD`; type: `product`
- Relevantie: hoog
- Bereik en niveau: `gemengd` / `E2`
- Bewering: De AI-assistent moet samenvattingen, actie-ondersteuning en automatisering aanpassen aan het energieniveau zonder een afzonderlijke drukke chatinterface.
- Implementatiestatus: gedeeltelijk geïmplementeerd
- Afhankelijkheden: KH-DEP-013; KH-DEP-015
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R1-052](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md), [R2-070](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Bewijs 1: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Interfacesymbolen voor focus, energie, dichtheid, sessie, volgende actie en hervatting in het vastgepinde broncodeobject geïnspecteerd. Resultaat: De gebruikersinterface bevat focusinstellingen, weergave van focussessies, dichtheidsmodi, een bewerker voor de volgende actie en een hervattingsbalk; dit bewijst uitsluitend de aanwezigheid van broncode.
- Bewijs 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Functies voor focusregistratie, focusevaluatie en aandachtsstatus in het vastgepinde broncodeobject geïnspecteerd. Resultaat: De serverlaag bevat accountgebonden focusniveaus en -regels, aandachtsstatus, achterstandsherstel en opgeslagen sessiegerelateerde gegevensoverdrachtsobjecten.
- Bewijs 3: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Functies voor gesprekssamenvatting, bewijsbronnen, extractie van acties, vervaldatums, bedragen en risico's en deterministische scoreberekening geïnspecteerd. Resultaat: De serverlaag bouwt Oekraïense samenvattingen met bronfragmenten en actiemetadata met behulp van deterministische heuristieken.
- Bewijs 4: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Symbolen voor weergave van samenvattingen en bewijs en voor overdracht naar taken en agenda geïnspecteerd. Resultaat: De gebruikersinterface geeft samenvattingsbewijs en gestructureerde vervolgsuggesties weer.
- Bewijs 5: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); De volledige vastgepinde Git-boomstructuur vergeleken met de expliciete toestemmingslijst voor Apps Script-uitrol en het manifest. Resultaat: De uitrolbare reeks bestaat uit vier Apps Script- en HTML-bronbestanden plus het manifest. De actieve boomstructuur bevat geen Node-pakketmanifest, Redis, Mailcow, Postfix of Dovecot, Pub/Sub of Cloud Run, OpenPGP, S/MIME of declaraties van de genoemde e-mailbibliotheken.
- Beperkingen: Energiebewuste structuur en een gebruikersinterface zonder aparte chat zijn aanwezig; daadwerkelijke aanpassing door kunstmatige intelligentie en resultaatkwaliteit worden niet door statische broncode vastgesteld.

## KH-PROD-021

- Status: `geblokkeerd`
- Categorie: `KH-PROD`; type: `product`
- Relevantie: hoog
- Bereik en niveau: `gemengd` / `E2`
- Bewering: Doelconcept: e-mail neemt een deel van de executieve belasting over, vermindert ruis, verklaart prioriteit, bewaart context en deelt werk op in kleinere stappen.
- Implementatiestatus: gedeeltelijk geïmplementeerd
- Afhankelijkheden: KH-DEP-011; KH-DEP-013; KH-DEP-015
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R1-063](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Bewijs 1: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Interfacesymbolen voor focus, energie, dichtheid, sessie, volgende actie en hervatting in het vastgepinde broncodeobject geïnspecteerd. Resultaat: De gebruikersinterface bevat focusinstellingen, weergave van focussessies, dichtheidsmodi, een bewerker voor de volgende actie en een hervattingsbalk; dit bewijst uitsluitend de aanwezigheid van broncode.
- Bewijs 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Functies voor focusregistratie, focusevaluatie en aandachtsstatus in het vastgepinde broncodeobject geïnspecteerd. Resultaat: De serverlaag bevat accountgebonden focusniveaus en -regels, aandachtsstatus, achterstandsherstel en opgeslagen sessiegerelateerde gegevensoverdrachtsobjecten.
- Bewijs 3: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Functies voor gesprekssamenvatting, bewijsbronnen, extractie van acties, vervaldatums, bedragen en risico's en deterministische scoreberekening geïnspecteerd. Resultaat: De serverlaag bouwt Oekraïense samenvattingen met bronfragmenten en actiemetadata met behulp van deterministische heuristieken.
- Bewijs 4: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Symbolen voor weergave van samenvattingen en bewijs en voor overdracht naar taken en agenda geïnspecteerd. Resultaat: De gebruikersinterface geeft samenvattingsbewijs en gestructureerde vervolgsuggesties weer.
- Bewijs 5: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); De functies normalizeResumeRail, buildResumeRail, automatische opslag tijdens de levenscyclus en sessiebalkfuncties geïnspecteerd. Resultaat: De broncode voor de hervattingsbalk en automatische opslag bewaart geselecteerde interface- en sessiestatus.
- Bewijs 6: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Status voor aandachtshervatting en functies voor opgeslagen sessiegroepen geïnspecteerd. Resultaat: De status in de serverlaag ondersteunt werkhervatting en sessiecontinuïteit.
- Beperkingen: Veilig ontbrekend bewijs: een alleen-lezen acceptatie- of bruikbaarheidsresultaat gekoppeld aan de vastgepinde vastlegging dat minder ruis, begrijpelijke prioriteit, behouden context en geslaagde taakopdeling aantoont.

## KH-PROD-022

- Status: `aanbeveling`
- Categorie: `KH-PROD`; type: `product`
- Relevantie: laag
- Bereik en niveau: `gemengd` / `E1`
- Bewering: Modulair pad: Postfix plus Dovecot met afzonderlijke componenten voor antispam, DKIM/DMARC/ARC, webmail en DAV.
- Implementatiestatus: niet geïmplementeerd
- Afhankelijkheden: Postfix; Dovecot; antispam; DAV
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R2-003](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Bewijs 1: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); De volledige vastgepinde Git-boomstructuur vergeleken met de expliciete toestemmingslijst voor Apps Script-uitrol en het manifest. Resultaat: De uitrolbare reeks bestaat uit vier Apps Script- en HTML-bronbestanden plus het manifest. De actieve boomstructuur bevat geen Node-pakketmanifest, Redis, Mailcow, Postfix of Dovecot, Pub/Sub of Cloud Run, OpenPGP, S/MIME of declaraties van de genoemde e-mailbibliotheken.
- Beperkingen: Dit is een normatieve architectuuraanbeveling. Aanwezigheid of afwezigheid in de broncodeopslagplaats vormt geen verificatie van de externe waarde, compatibiliteit, licentievoorwaarden of actuele limieten.

## KH-PROD-023

- Status: `aanbeveling`
- Categorie: `KH-PROD`; type: `product`
- Relevantie: laag
- Bereik en niveau: `gemengd` / `E1`
- Bewering: Geïntegreerd containerpad: Mailcow of Docker Mailserver voor een snellere start met minder koppelcode.
- Implementatiestatus: niet geïmplementeerd
- Afhankelijkheden: Mailcow; Docker Mailserver
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R2-004](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Bewijs 1: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); De volledige vastgepinde Git-boomstructuur vergeleken met de expliciete toestemmingslijst voor Apps Script-uitrol en het manifest. Resultaat: De uitrolbare reeks bestaat uit vier Apps Script- en HTML-bronbestanden plus het manifest. De actieve boomstructuur bevat geen Node-pakketmanifest, Redis, Mailcow, Postfix of Dovecot, Pub/Sub of Cloud Run, OpenPGP, S/MIME of declaraties van de genoemde e-mailbibliotheken.
- Beperkingen: Dit is een normatieve architectuuraanbeveling. Aanwezigheid of afwezigheid in de broncodeopslagplaats vormt geen verificatie van de externe waarde, compatibiliteit, licentievoorwaarden of actuele limieten.

## KH-PROD-024

- Status: `aanbeveling`
- Categorie: `KH-PROD`; type: `product`
- Relevantie: laag
- Bereik en niveau: `gemengd` / `E1`
- Bewering: Alles-in-één-pad: Stalwart, en in geselecteerde scenario's Maddy of Apache James; Stalwart is de leidende moderne kandidaat.
- Implementatiestatus: niet geïmplementeerd
- Afhankelijkheden: Stalwart; Maddy; Apache James
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R2-005](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Bewijs 1: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); De volledige vastgepinde Git-boomstructuur vergeleken met de expliciete toestemmingslijst voor Apps Script-uitrol en het manifest. Resultaat: De uitrolbare reeks bestaat uit vier Apps Script- en HTML-bronbestanden plus het manifest. De actieve boomstructuur bevat geen Node-pakketmanifest, Redis, Mailcow, Postfix of Dovecot, Pub/Sub of Cloud Run, OpenPGP, S/MIME of declaraties van de genoemde e-mailbibliotheken.
- Beperkingen: Dit is een normatieve architectuuraanbeveling. Aanwezigheid of afwezigheid in de broncodeopslagplaats vormt geen verificatie van de externe waarde, compatibiliteit, licentievoorwaarden of actuele limieten.

## KH-PROD-025

- Status: `aanbeveling`
- Categorie: `KH-PROD`; type: `product`
- Relevantie: laag
- Bereik en niveau: `gemengd` / `E1`
- Bewering: Voeg Thunderbird-autoconfiguratie-XML toe en volg het IETF-werk rond automatische configuratie om drempels bij de ingebruikname te verlagen.
- Implementatiestatus: niet geïmplementeerd
- Afhankelijkheden: Automatische configuratie voor Thunderbird; Automatische configuratie volgens IETF
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R2-012](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Bewijs 1: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); De volledige vastgepinde Git-boomstructuur vergeleken met de expliciete toestemmingslijst voor Apps Script-uitrol en het manifest. Resultaat: De uitrolbare reeks bestaat uit vier Apps Script- en HTML-bronbestanden plus het manifest. De actieve boomstructuur bevat geen Node-pakketmanifest, Redis, Mailcow, Postfix of Dovecot, Pub/Sub of Cloud Run, OpenPGP, S/MIME of declaraties van de genoemde e-mailbibliotheken.
- Beperkingen: Dit is een normatieve architectuuraanbeveling. Aanwezigheid of afwezigheid in de broncodeopslagplaats vormt geen verificatie van de externe waarde, compatibiliteit, licentievoorwaarden of actuele limieten.

## KH-PROD-026

- Status: `ongeverifieerd`
- Categorie: `KH-PROD`; type: `product`
- Relevantie: laag
- Bereik en niveau: `extern` / `E1`
- Bewering: Postfix plus Dovecot biedt een volwassen SMTP/IMAP/POP3-opzet; kanttekening: Dovecot CE wordt beschreven als een editie voor één server.
- Implementatiestatus: niet van toepassing
- Afhankelijkheden: Postfix; Dovecot
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R2-014](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Bewijs 1: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); De volledige vastgepinde Git-boomstructuur vergeleken met de expliciete toestemmingslijst voor Apps Script-uitrol en het manifest. Resultaat: De uitrolbare reeks bestaat uit vier Apps Script- en HTML-bronbestanden plus het manifest. De actieve boomstructuur bevat geen Node-pakketmanifest, Redis, Mailcow, Postfix of Dovecot, Pub/Sub of Cloud Run, OpenPGP, S/MIME of declaraties van de genoemde e-mailbibliotheken.
- Beperkingen: De broncodeopslagplaats kan huidige externe mogelijkheden, versies, licenties, limieten of aanbiedersgedrag niet vaststellen; er is geen actuele primaire externe bron geraadpleegd.

## KH-PROD-027

- Status: `ongeverifieerd`
- Categorie: `KH-PROD`; type: `product`
- Relevantie: laag
- Bereik en niveau: `extern` / `E1`
- Bewering: Mailcow integreert Postfix, Dovecot, Rspamd, Redis, MariaDB, SOGo, Nginx en ACME; kanttekening: het is een zwaar pakket met meerdere containers.
- Implementatiestatus: niet van toepassing
- Afhankelijkheden: Mailcow
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R2-015](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Bewijs 1: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); De volledige vastgepinde Git-boomstructuur vergeleken met de expliciete toestemmingslijst voor Apps Script-uitrol en het manifest. Resultaat: De uitrolbare reeks bestaat uit vier Apps Script- en HTML-bronbestanden plus het manifest. De actieve boomstructuur bevat geen Node-pakketmanifest, Redis, Mailcow, Postfix of Dovecot, Pub/Sub of Cloud Run, OpenPGP, S/MIME of declaraties van de genoemde e-mailbibliotheken.
- Beperkingen: De broncodeopslagplaats kan huidige externe mogelijkheden, versies, licenties, limieten of aanbiedersgedrag niet vaststellen; er is geen actuele primaire externe bron geraadpleegd.

## KH-PROD-028

- Status: `ongeverifieerd`
- Categorie: `KH-PROD`; type: `product`
- Relevantie: laag
- Bereik en niveau: `extern` / `E1`
- Bewering: Stalwart combineert JMAP, IMAP, POP3, SMTP, CalDAV, CardDAV en WebDAV; kanttekening: het heeft een groot beheeroppervlak.
- Implementatiestatus: niet van toepassing
- Afhankelijkheden: Stalwart
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R2-016](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Bewijs 1: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); De volledige vastgepinde Git-boomstructuur vergeleken met de expliciete toestemmingslijst voor Apps Script-uitrol en het manifest. Resultaat: De uitrolbare reeks bestaat uit vier Apps Script- en HTML-bronbestanden plus het manifest. De actieve boomstructuur bevat geen Node-pakketmanifest, Redis, Mailcow, Postfix of Dovecot, Pub/Sub of Cloud Run, OpenPGP, S/MIME of declaraties van de genoemde e-mailbibliotheken.
- Beperkingen: De broncodeopslagplaats kan huidige externe mogelijkheden, versies, licenties, limieten of aanbiedersgedrag niet vaststellen; er is geen actuele primaire externe bron geraadpleegd.

## KH-PROD-029

- Status: `ongeverifieerd`
- Categorie: `KH-PROD`; type: `product`
- Relevantie: laag
- Bereik en niveau: `extern` / `E1`
- Bewering: Docker Mailserver is een eenvoudigere, op containers gerichte mailserver zonder SQL, maar heeft minder geïntegreerde groepswerkfuncties.
- Implementatiestatus: niet van toepassing
- Afhankelijkheden: Docker Mailserver
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R2-017](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Bewijs 1: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); De volledige vastgepinde Git-boomstructuur vergeleken met de expliciete toestemmingslijst voor Apps Script-uitrol en het manifest. Resultaat: De uitrolbare reeks bestaat uit vier Apps Script- en HTML-bronbestanden plus het manifest. De actieve boomstructuur bevat geen Node-pakketmanifest, Redis, Mailcow, Postfix of Dovecot, Pub/Sub of Cloud Run, OpenPGP, S/MIME of declaraties van de genoemde e-mailbibliotheken.
- Beperkingen: De broncodeopslagplaats kan huidige externe mogelijkheden, versies, licenties, limieten of aanbiedersgedrag niet vaststellen; er is geen actuele primaire externe bron geraadpleegd.

## KH-PROD-030

- Status: `ongeverifieerd`
- Categorie: `KH-PROD`; type: `product`
- Relevantie: laag
- Bereik en niveau: `extern` / `E1`
- Bewering: Maddy is een lichtgewicht alles-in-één SMTP- en IMAP-server met minder koppelcode, maar een kleiner integratie-ecosysteem.
- Implementatiestatus: niet van toepassing
- Afhankelijkheden: Maddy
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R2-018](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Bewijs 1: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); De volledige vastgepinde Git-boomstructuur vergeleken met de expliciete toestemmingslijst voor Apps Script-uitrol en het manifest. Resultaat: De uitrolbare reeks bestaat uit vier Apps Script- en HTML-bronbestanden plus het manifest. De actieve boomstructuur bevat geen Node-pakketmanifest, Redis, Mailcow, Postfix of Dovecot, Pub/Sub of Cloud Run, OpenPGP, S/MIME of declaraties van de genoemde e-mailbibliotheken.
- Beperkingen: De broncodeopslagplaats kan huidige externe mogelijkheden, versies, licenties, limieten of aanbiedersgedrag niet vaststellen; er is geen actuele primaire externe bron geraadpleegd.

## KH-PROD-031

- Status: `ongeverifieerd`
- Categorie: `KH-PROD`; type: `product`
- Relevantie: laag
- Bereik en niveau: `extern` / `E1`
- Bewering: Cyrus IMAP en Apache James passen bij zakelijke, JMAP- en schaalscenario's, maar vereisen een strengere operationele discipline.
- Implementatiestatus: niet van toepassing
- Afhankelijkheden: Cyrus IMAP; Apache James
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R2-019](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Bewijs 1: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); De volledige vastgepinde Git-boomstructuur vergeleken met de expliciete toestemmingslijst voor Apps Script-uitrol en het manifest. Resultaat: De uitrolbare reeks bestaat uit vier Apps Script- en HTML-bronbestanden plus het manifest. De actieve boomstructuur bevat geen Node-pakketmanifest, Redis, Mailcow, Postfix of Dovecot, Pub/Sub of Cloud Run, OpenPGP, S/MIME of declaraties van de genoemde e-mailbibliotheken.
- Beperkingen: De broncodeopslagplaats kan huidige externe mogelijkheden, versies, licenties, limieten of aanbiedersgedrag niet vaststellen; er is geen actuele primaire externe bron geraadpleegd.

## KH-PROD-032

- Status: `ongeverifieerd`
- Categorie: `KH-PROD`; type: `product`
- Relevantie: laag
- Bereik en niveau: `extern` / `E1`
- Bewering: Stalwart gebruikt een minimale `config.json`, opslagconfiguratie, webinterface en opdrachtregel, initiële opstart en herstelmodi; het model ondersteunt stapsgewijze, declaratieve en meer-organisatie-aansturing.
- Implementatiestatus: niet van toepassing
- Afhankelijkheden: Stalwart
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R2-025](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Bewijs 1: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); De volledige vastgepinde Git-boomstructuur vergeleken met de expliciete toestemmingslijst voor Apps Script-uitrol en het manifest. Resultaat: De uitrolbare reeks bestaat uit vier Apps Script- en HTML-bronbestanden plus het manifest. De actieve boomstructuur bevat geen Node-pakketmanifest, Redis, Mailcow, Postfix of Dovecot, Pub/Sub of Cloud Run, OpenPGP, S/MIME of declaraties van de genoemde e-mailbibliotheken.
- Beperkingen: De broncodeopslagplaats kan huidige externe mogelijkheden, versies, licenties, limieten of aanbiedersgedrag niet vaststellen; er is geen actuele primaire externe bron geraadpleegd.

## KH-PROD-033

- Status: `geverifieerd`
- Categorie: `KH-PROD`; type: `product`
- Relevantie: hoog
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: Apps Script, GmailApp en de Gmail API bieden een laagdrempelige route voor automatisering en prototypebouw binnen Google Workspace.
- Implementatiestatus: geïmplementeerd
- Afhankelijkheden: Gmail API v1; Apps Script
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R2-027](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Bewijs 1: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Ingeschakelde geavanceerde diensten, OAuth-toegangsbereiken, uitvoeringsomgeving en declaratie van de webtoepassing geïnspecteerd. Resultaat: Het manifest schakelt Gmail API v1 in, declareert toegangsbereiken voor Gmail-wijziging, alleen-lezen toegang tot Drive, externe verzoeken en scriptbeheer, en declareert een webtoepassing; het bevat geen declaratie voor een Gmail-uitbreiding of bibliotheek van derden.
- Bewijs 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Aanroeplocaties van PropertiesService, CacheService, LockService, ScriptApp-starters, UrlFetchApp en OAuth-toegangssleutels geïnspecteerd. Resultaat: Primitieven van Apps Script voor status, tussenopslag, vergrendeling, externe ophaalverzoeken, installeerbare starters en Google OAuth-toegangssleutels worden gebruikt.
- Bewijs 3: [apps-script/MultiAccount.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MultiAccount.gs); Gebruik van accountregisters, OAuth-status, PropertiesService en LockService geïnspecteerd. Resultaat: OAuth- en autorisatiestatus voor meerdere accounts worden opgeslagen en afgeschermd met eigenschappen en vergrendelingen van Apps Script.
- Beperkingen: Statische implementatie-inspectie bewijst uitsluitend de aanwezigheid van broncode; er is geen geautomatiseerde test, teruglezing uit de testomgeving of productie-acceptatie uitgevoerd.

## KH-PROD-034

- Status: `aanbeveling`
- Categorie: `KH-PROD`; type: `product`
- Relevantie: laag
- Bereik en niveau: `extern` / `E1`
- Bewering: Postfix `postscreen` is de aanbevolen eerste buitenschil vóór inhoudsfiltering.
- Implementatiestatus: niet geïmplementeerd
- Afhankelijkheden: Postfix
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R2-035](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Bewijs 1: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); De volledige vastgepinde Git-boomstructuur vergeleken met de expliciete toestemmingslijst voor Apps Script-uitrol en het manifest. Resultaat: De uitrolbare reeks bestaat uit vier Apps Script- en HTML-bronbestanden plus het manifest. De actieve boomstructuur bevat geen Node-pakketmanifest, Redis, Mailcow, Postfix of Dovecot, Pub/Sub of Cloud Run, OpenPGP, S/MIME of declaraties van de genoemde e-mailbibliotheken.
- Beperkingen: Dit is een normatieve architectuuraanbeveling. Aanwezigheid of afwezigheid in de broncodeopslagplaats vormt geen verificatie van de externe waarde, compatibiliteit, licentievoorwaarden of actuele limieten.

## KH-PROD-035

- Status: `aanbeveling`
- Categorie: `KH-PROD`; type: `product`
- Relevantie: laag
- Bereik en niveau: `extern` / `E1`
- Bewering: Webmailkandidaten: Roundcube voor klassieke IMAP met uitbreidingen, SnappyMail voor een lichte gebruikersinterface, Nextcloud Mail voor pakketintegratie en Bulwark voor JMAP en Stalwart.
- Implementatiestatus: niet geïmplementeerd
- Afhankelijkheden: Roundcube; SnappyMail; Nextcloud Mail; Bulwark
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R2-043](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Bewijs 1: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); De volledige vastgepinde Git-boomstructuur vergeleken met de expliciete toestemmingslijst voor Apps Script-uitrol en het manifest. Resultaat: De uitrolbare reeks bestaat uit vier Apps Script- en HTML-bronbestanden plus het manifest. De actieve boomstructuur bevat geen Node-pakketmanifest, Redis, Mailcow, Postfix of Dovecot, Pub/Sub of Cloud Run, OpenPGP, S/MIME of declaraties van de genoemde e-mailbibliotheken.
- Beperkingen: Dit is een normatieve architectuuraanbeveling. Aanwezigheid of afwezigheid in de broncodeopslagplaats vormt geen verificatie van de externe waarde, compatibiliteit, licentievoorwaarden of actuele limieten.

## KH-PROD-036

- Status: `aanbeveling`
- Categorie: `KH-PROD`; type: `product`
- Relevantie: gemiddeld
- Bereik en niveau: `gemengd` / `E1`
- Bewering: Gebruikerstoepassingen: web/PWA met achtergrondwerkers en VAPID, React Native of Flutter met APNs/FCM, en Tauri of Electron voor bureaubladsystemen.
- Implementatiestatus: gedeeltelijk geïmplementeerd
- Afhankelijkheden: PWA; VAPID; React Native; Flutter; Tauri; Electron
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R2-051](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Bewijs 1: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); De volledige vastgepinde Git-boomstructuur vergeleken met de expliciete toestemmingslijst voor Apps Script-uitrol en het manifest. Resultaat: De uitrolbare reeks bestaat uit vier Apps Script- en HTML-bronbestanden plus het manifest. De actieve boomstructuur bevat geen Node-pakketmanifest, Redis, Mailcow, Postfix of Dovecot, Pub/Sub of Cloud Run, OpenPGP, S/MIME of declaraties van de genoemde e-mailbibliotheken.
- Beperkingen: Er bestaat een webtoepassing, maar de genoemde afhankelijkheden voor directe PWA-meldingen, mobiele toepassingen en bureaubladraamwerken zijn niet gedeclareerd. De bredere technologiekeuze blijft een aanbeveling.

## KH-PROD-037

- Status: `ongeverifieerd`
- Categorie: `KH-PROD`; type: `product`
- Relevantie: gemiddeld
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: De Gmail-uitbreiding is een contextueel kaartoppervlak voor snelle triage.
- Implementatiestatus: niet geïmplementeerd
- Afhankelijkheden: KH-DEP-011
- Conflicten: CF-001
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-018](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md), [R3-092](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Ingeschakelde geavanceerde diensten, OAuth-toegangsbereiken, uitvoeringsomgeving en declaratie van de webtoepassing geïnspecteerd. Resultaat: Het manifest schakelt Gmail API v1 in, declareert toegangsbereiken voor Gmail-wijziging, alleen-lezen toegang tot Drive, externe verzoeken en scriptbeheer, en declareert een webtoepassing; het bevat geen declaratie voor een Gmail-uitbreiding of bibliotheek van derden.
- Beperkingen: Het actieve manifest declareert uitsluitend een webtoepassing en geen configuratie voor een Gmail-uitbreiding; externe mogelijkheden voor Gmail-uitbreidingen zijn niet onafhankelijk geverifieerd.

## KH-PROD-038

- Status: `geverifieerd`
- Categorie: `KH-PROD`; type: `product`
- Relevantie: hoog
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: De webtoepassing vormt de stroomlaag voor overzichtsscherm, achterstand, regels, focus en energiemodi.
- Implementatiestatus: geïmplementeerd
- Afhankelijkheden: KH-DEP-011; KH-DEP-015
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-019](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md), [R3-093](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Ingeschakelde geavanceerde diensten, OAuth-toegangsbereiken, uitvoeringsomgeving en declaratie van de webtoepassing geïnspecteerd. Resultaat: Het manifest schakelt Gmail API v1 in, declareert toegangsbereiken voor Gmail-wijziging, alleen-lezen toegang tot Drive, externe verzoeken en scriptbeheer, en declareert een webtoepassing; het bevat geen declaratie voor een Gmail-uitbreiding of bibliotheek van derden.
- Bewijs 2: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Interfacesymbolen voor focus, energie, dichtheid, sessie, volgende actie en hervatting in het vastgepinde broncodeobject geïnspecteerd. Resultaat: De gebruikersinterface bevat focusinstellingen, weergave van focussessies, dichtheidsmodi, een bewerker voor de volgende actie en een hervattingsbalk; dit bewijst uitsluitend de aanwezigheid van broncode.
- Bewijs 3: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Functies voor focusregistratie, focusevaluatie en aandachtsstatus in het vastgepinde broncodeobject geïnspecteerd. Resultaat: De serverlaag bevat accountgebonden focusniveaus en -regels, aandachtsstatus, achterstandsherstel en opgeslagen sessiegerelateerde gegevensoverdrachtsobjecten.
- Bewijs 4: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Gebruikersinterface voor mappen, gesprekken, opstellen, bijlagen, labels, focus en adaptieve dichtheid geïnspecteerd. Resultaat: De broncodeopslagplaats implementeert een brede e-mailwebtoepassing met een optioneel gericht en adaptief oppervlak, niet slechts een minimaal kaartoppervlak.
- Beperkingen: Statische implementatie-inspectie bewijst uitsluitend de aanwezigheid van broncode; er is geen geautomatiseerde test, teruglezing uit de testomgeving of productie-acceptatie uitgevoerd.

## KH-PROD-039

- Status: `gedeeltelijk`
- Categorie: `KH-PROD`; type: `product`
- Relevantie: hoog
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: `Automatiseringslaag`: `watch`, `history.list`, wachtrij of achtergrondwerker, en orkestratie via Apps Script.
- Implementatiestatus: gedeeltelijk geïmplementeerd
- Afhankelijkheden: KH-DEP-013; KH-DEP-015; KH-DEP-018
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-020](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Functies voor Gmail-geschiedenisstatus, huidige geschiedenis-ID, opzoeken van gewijzigde berichten, opslag van controlepunten en voortzetting via starters geïnspecteerd. Resultaat: Synchronisatie van Gmail-geschiedenis, begrensde voortzetting, herhaalpogingen en afstemming van Telegram-kaarten zijn geïmplementeerd in Apps Script.
- Bewijs 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Aanroeplocaties van PropertiesService, CacheService, LockService, ScriptApp-starters, UrlFetchApp en OAuth-toegangssleutels geïnspecteerd. Resultaat: Primitieven van Apps Script voor status, tussenopslag, vergrendeling, externe ophaalverzoeken, installeerbare starters en Google OAuth-toegangssleutels worden gebruikt.
- Bewijs 3: [apps-script/MultiAccount.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MultiAccount.gs); Gebruik van accountregisters, OAuth-status, PropertiesService en LockService geïnspecteerd. Resultaat: OAuth- en autorisatiestatus voor meerdere accounts worden opgeslagen en afgeschermd met eigenschappen en vergrendelingen van Apps Script.
- Bewijs 4: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); De volledige vastgepinde Git-boomstructuur vergeleken met de expliciete toestemmingslijst voor Apps Script-uitrol en het manifest. Resultaat: De uitrolbare reeks bestaat uit vier Apps Script- en HTML-bronbestanden plus het manifest. De actieve boomstructuur bevat geen Node-pakketmanifest, Redis, Mailcow, Postfix of Dovecot, Pub/Sub of Cloud Run, OpenPGP, S/MIME of declaraties van de genoemde e-mailbibliotheken.
- Beperkingen: Geschiedenissynchronisatie in Apps Script, op eigenschappen gebaseerde werkregisters, herhaalpogingen en starters bestaan; Gmail `watch`, inkomend verkeer via Pub/Sub en een externe achtergrondwerker zijn niet gedeclareerd.

## KH-PROD-040

- Status: `ongeverifieerd`
- Categorie: `KH-PROD`; type: `product`
- Relevantie: gemiddeld
- Bereik en niveau: `bestuur` / `E1`
- Bewering: De doelgroep omvat gebruikers met ADHD, executieve dysfunctie en veelvoorkomende bijkomende depressie.
- Implementatiestatus: onbekend
- Afhankelijkheden: geen
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-023](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); De volledige vastgepinde Git-boomstructuur vergeleken met de expliciete toestemmingslijst voor Apps Script-uitrol en het manifest. Resultaat: De uitrolbare reeks bestaat uit vier Apps Script- en HTML-bronbestanden plus het manifest. De actieve boomstructuur bevat geen Node-pakketmanifest, Redis, Mailcow, Postfix of Dovecot, Pub/Sub of Cloud Run, OpenPGP, S/MIME of declaraties van de genoemde e-mailbibliotheken.
- Beperkingen: Productiecode kan neuro-inclusieve patronen belichamen maar kan geen doelgroepdemografie, diagnoses of beweringen over gelijktijdig voorkomen vaststellen; er is geen onafhankelijk primair bewijs geraadpleegd.

## KH-PROD-041

- Status: `geblokkeerd`
- Categorie: `KH-PROD`; type: `product`
- Relevantie: hoog
- Bereik en niveau: `gemengd` / `E2`
- Bewering: Minimaliseer cognitieve belasting, beslissingsmoeheid, meldingsdruk en taakverlamming.
- Implementatiestatus: gedeeltelijk geïmplementeerd
- Afhankelijkheden: KH-DEP-001; KH-DEP-011
- Conflicten: CF-003
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-024](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Interfacesymbolen voor focus, energie, dichtheid, sessie, volgende actie en hervatting in het vastgepinde broncodeobject geïnspecteerd. Resultaat: De gebruikersinterface bevat focusinstellingen, weergave van focussessies, dichtheidsmodi, een bewerker voor de volgende actie en een hervattingsbalk; dit bewijst uitsluitend de aanwezigheid van broncode.
- Bewijs 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Functies voor focusregistratie, focusevaluatie en aandachtsstatus in het vastgepinde broncodeobject geïnspecteerd. Resultaat: De serverlaag bevat accountgebonden focusniveaus en -regels, aandachtsstatus, achterstandsherstel en opgeslagen sessiegerelateerde gegevensoverdrachtsobjecten.
- Bewijs 3: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Functies voor herinneringsreservering, poortbewaking voor stille uren en overzichten, verzending, terugkoppelingen en verwerking geïnspecteerd. Resultaat: De serverlaag implementeert begrensde zachte herinneringen, overzichtsvensters, acties voor later, herhaalpogingen en orkestratie van Telegram-aflevering.
- Bewijs 4: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Herinneringskeuzes tijdens de introductie en de gebruikersinterface voor overzichtsvensters geïnspecteerd. Resultaat: De gebruikersinterface biedt voorkeuren voor zachte herinneringen, overzichten en meldingen voor uitsluitend urgente berichten.
- Bewijs 5: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Stijlen voor zichtbare focus, focusbegrenzing in dialoogvensters, isolatiehulpfuncties, toegankelijke bedieningselementen en de interfacestructuur met verlaagde dichtheid geïnspecteerd. Resultaat: Statische toegankelijkheidsprimitieven bestaan, maar naleving en resultaten voor cognitieve toegankelijkheid vereisen een controle en acceptatiebewijs.
- Beperkingen: Veilig ontbrekend bewijs: een acceptatie-artefact voor toegankelijkheid en bruikbaarheid gekoppeld aan de vastgepinde vastlegging dat resultaten voor cognitieve belasting, beslissingsmoeheid, meldingsdruk en taakverlamming meet.

## KH-PROD-042

- Status: `gedeeltelijk`
- Categorie: `KH-PROD`; type: `product`
- Relevantie: hoog
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: De Gmail-integratie moet triage in de gebruikersinterface, vrijwel directe synchronisatie via `watch/history` en latere uitbreiding naar Telegram of een overzichtsscherm ondersteunen.
- Implementatiestatus: gedeeltelijk geïmplementeerd
- Afhankelijkheden: KH-DEP-013; KH-DEP-015; KH-DEP-018
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-027](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Functies voor Gmail-geschiedenisstatus, huidige geschiedenis-ID, opzoeken van gewijzigde berichten, opslag van controlepunten en voortzetting via starters geïnspecteerd. Resultaat: Synchronisatie van Gmail-geschiedenis, begrensde voortzetting, herhaalpogingen en afstemming van Telegram-kaarten zijn geïmplementeerd in Apps Script.
- Bewijs 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Validatie en routering van Telegram-bijwerkingen, afhandeling van terugkoppelingen, Bot API-verzoeken, overzichten en kaarten, bladerfuncties en menufuncties geïnspecteerd. Resultaat: De broncodeopslagplaats bevat een tot de eigenaar beperkt besturingsvlak via de Telegram Bot API met korte acties en berichtkaarten.
- Bewijs 3: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Gebruikersinterface voor mappen, gesprekken, opstellen, bijlagen, labels, focus en adaptieve dichtheid geïnspecteerd. Resultaat: De broncodeopslagplaats implementeert een brede e-mailwebtoepassing met een optioneel gericht en adaptief oppervlak, niet slechts een minimaal kaartoppervlak.
- Beperkingen: Triage in de gebruikersinterface, synchronisatie van Gmail-geschiedenis, Telegram en een overzichtsscherm-achtige webinterface bestaan; vrijwel directe aflevering via `watch` en Pub/Sub is niet gedeclareerd of bewezen.

## KH-PROD-043

- Status: `geverifieerd`
- Categorie: `KH-PROD`; type: `product`
- Relevantie: hoog
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: De Telegram Bot API is een extern bedieningsvlak voor korte opdrachten en overzichten.
- Implementatiestatus: geïmplementeerd
- Afhankelijkheden: Telegram Bot API
- Conflicten: CF-002
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-097](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Validatie en routering van Telegram-bijwerkingen, afhandeling van terugkoppelingen, Bot API-verzoeken, overzichten en kaarten, bladerfuncties en menufuncties geïnspecteerd. Resultaat: De broncodeopslagplaats bevat een tot de eigenaar beperkt besturingsvlak via de Telegram Bot API met korte acties en berichtkaarten.
- Bewijs 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Functies voor herinneringsreservering, poortbewaking voor stille uren en overzichten, verzending, terugkoppelingen en verwerking geïnspecteerd. Resultaat: De serverlaag implementeert begrensde zachte herinneringen, overzichtsvensters, acties voor later, herhaalpogingen en orkestratie van Telegram-aflevering.
- Bewijs 3: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Herinneringskeuzes tijdens de introductie en de gebruikersinterface voor overzichtsvensters geïnspecteerd. Resultaat: De gebruikersinterface biedt voorkeuren voor zachte herinneringen, overzichten en meldingen voor uitsluitend urgente berichten.
- Beperkingen: Statische implementatie-inspectie bewijst uitsluitend de aanwezigheid van broncode; er is geen geautomatiseerde test, teruglezing uit de testomgeving of productie-acceptatie uitgevoerd.

## KH-PROD-044

- Status: `gedeeltelijk`
- Categorie: `KH-PROD`; type: `product`
- Relevantie: hoog
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: Eerste kaartniveau: AI-samenvatting van één regel, typepictogram en geschatte inspanning.
- Implementatiestatus: gedeeltelijk geïmplementeerd
- Afhankelijkheden: KH-DEP-013
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-108](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Functies voor gesprekssamenvatting, bewijsbronnen, extractie van acties, vervaldatums, bedragen en risico's en deterministische scoreberekening geïnspecteerd. Resultaat: De serverlaag bouwt Oekraïense samenvattingen met bronfragmenten en actiemetadata met behulp van deterministische heuristieken.
- Bewijs 2: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Symbolen voor weergave van samenvattingen en bewijs en voor overdracht naar taken en agenda geïnspecteerd. Resultaat: De gebruikersinterface geeft samenvattingsbewijs en gestructureerde vervolgsuggesties weer.
- Bewijs 3: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Interfacesymbolen voor focus, energie, dichtheid, sessie, volgende actie en hervatting in het vastgepinde broncodeobject geïnspecteerd. Resultaat: De gebruikersinterface bevat focusinstellingen, weergave van focussessies, dichtheidsmodi, een bewerker voor de volgende actie en een hervattingsbalk; dit bewijst uitsluitend de aanwezigheid van broncode.
- Bewijs 4: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Functies voor focusregistratie, focusevaluatie en aandachtsstatus in het vastgepinde broncodeobject geïnspecteerd. Resultaat: De serverlaag bevat accountgebonden focusniveaus en -regels, aandachtsstatus, achterstandsherstel en opgeslagen sessiegerelateerde gegevensoverdrachtsobjecten.
- Beperkingen: Kaartsamenvattingen en visuele metadata bestaan; een daadwerkelijk model voor kunstmatige intelligentie en een gekalibreerde inspanningsschatting zijn niet vastgesteld.

## KH-PROD-045

- Status: `geverifieerd`
- Categorie: `KH-PROD`; type: `product`
- Relevantie: hoog
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: Tweede kaartniveau: drie acties: snel antwoorden, uitstellen en omzetten naar taak.
- Implementatiestatus: geïmplementeerd
- Afhankelijkheden: KH-DEP-013; KH-DEP-015
- Conflicten: CF-001
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-109](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Voorbereiding en toepassing van acties, sluimeren, labels, antwoordsjablonen en afstemming van verplaatsingen in Telegram geïnspecteerd. Resultaat: De serverlaag implementeert archief en postvak, sluimeren en uitstellen, labels, antwoordsjablonen en afgestemde actiestatus.
- Bewijs 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Routering van Telegram-terugkoppelingen, kaartacties, herinneringsterugkoppelingen en Gmail-afstemming geïnspecteerd. Resultaat: Korte acties in Telegram en de bijbehorende statusafstemming met Gmail zijn aanwezig.
- Bewijs 3: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Opbouw van op bewijs gebaseerde taaktitels en agendasuggesties geïnspecteerd. Resultaat: Suggesties voor overdracht naar taken en Agenda worden afgeleid uit berichtbewijs; de serverlaag vermijdt uitdrukkelijk het verzinnen van datums of het rechtstreeks aanmaken van Agenda-objecten.
- Bewijs 4: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Bewijsweergave voor taken en agenda en opbouw van webadressen voor agenda-overdracht geïnspecteerd. Resultaat: De gebruikersinterface biedt acties voor overdracht naar taken en Agenda.
- Bewijs 5: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Functies voor validatie, opslag, reservering, herhaalpogingen, annulering en verwerking van geplande verzendingen geïnspecteerd. Resultaat: Duurzame accountgebonden conceptplanning en door starters aangestuurde verwerking zijn in de broncode aanwezig.
- Bewijs 6: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Functies voor de status van vertraagd verzenden, bedieningselementen, conceptopslag en verzending vanuit het opstelscherm geïnspecteerd. Resultaat: De opstelinterface kan vertraagde conceptverzendingen plannen, verplaatsen, annuleren en weergeven.
- Beperkingen: Statische implementatie-inspectie bewijst uitsluitend de aanwezigheid van broncode; er is geen geautomatiseerde test, teruglezing uit de testomgeving of productie-acceptatie uitgevoerd.

## KH-PROD-046

- Status: `geverifieerd`
- Categorie: `KH-PROD`; type: `product`
- Relevantie: hoog
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: Derde kaartniveau: ingeklapte metadata, gespreksdetails, bijlagen en labels.
- Implementatiestatus: geïmplementeerd
- Afhankelijkheden: KH-DEP-013
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-110](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Gebruikersinterface voor mappen, gesprekken, opstellen, bijlagen, labels, focus en adaptieve dichtheid geïnspecteerd. Resultaat: De broncodeopslagplaats implementeert een brede e-mailwebtoepassing met een optioneel gericht en adaptief oppervlak, niet slechts een minimaal kaartoppervlak.
- Bewijs 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Voorbereiding en toepassing van acties, sluimeren, labels, antwoordsjablonen en afstemming van verplaatsingen in Telegram geïnspecteerd. Resultaat: De serverlaag implementeert archief en postvak, sluimeren en uitstellen, labels, antwoordsjablonen en afgestemde actiestatus.
- Bewijs 3: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Routering van Telegram-terugkoppelingen, kaartacties, herinneringsterugkoppelingen en Gmail-afstemming geïnspecteerd. Resultaat: Korte acties in Telegram en de bijbehorende statusafstemming met Gmail zijn aanwezig.
- Beperkingen: Statische implementatie-inspectie bewijst uitsluitend de aanwezigheid van broncode; er is geen geautomatiseerde test, teruglezing uit de testomgeving of productie-acceptatie uitgevoerd.

## KH-PROD-047

- Status: `gedeeltelijk`
- Categorie: `KH-PROD`; type: `product`
- Relevantie: hoog
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: De startpagina van Gmail moet een kleine geprioriteerde selectie tonen: prioriteitspost, snelle winst, kort werkblok en wachtende opvolging.
- Implementatiestatus: gedeeltelijk geïmplementeerd
- Afhankelijkheden: KH-DEP-011; KH-DEP-015
- Conflicten: CF-003
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-111](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Interfacesymbolen voor focus, energie, dichtheid, sessie, volgende actie en hervatting in het vastgepinde broncodeobject geïnspecteerd. Resultaat: De gebruikersinterface bevat focusinstellingen, weergave van focussessies, dichtheidsmodi, een bewerker voor de volgende actie en een hervattingsbalk; dit bewijst uitsluitend de aanwezigheid van broncode.
- Bewijs 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Functies voor focusregistratie, focusevaluatie en aandachtsstatus in het vastgepinde broncodeobject geïnspecteerd. Resultaat: De serverlaag bevat accountgebonden focusniveaus en -regels, aandachtsstatus, achterstandsherstel en opgeslagen sessiegerelateerde gegevensoverdrachtsobjecten.
- Beperkingen: Concepten voor prioriteit en focus, snelle winst en begrensde achterstands- en sessieverwerking zijn geïmplementeerd; de exacte vierdelige startpaginareeks, met name wachtende opvolging, is niet volledig vastgesteld.

## KH-PROD-048

- Status: `geverifieerd`
- Categorie: `KH-PROD`; type: `product`
- Relevantie: hoog
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: Minimale werkende versie voor vertraagd verzenden: maak een concept aan, bewaar `draftId`, `sendAt` en `messageIntent`, en laat vervolgens een starter of verwerker de verzending uitvoeren.
- Implementatiestatus: geïmplementeerd
- Afhankelijkheden: KH-DEP-013; KH-DEP-015
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-033](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Functies voor validatie, opslag, reservering, herhaalpogingen, annulering en verwerking van geplande verzendingen geïnspecteerd. Resultaat: Duurzame accountgebonden conceptplanning en door starters aangestuurde verwerking zijn in de broncode aanwezig.
- Bewijs 2: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Functies voor de status van vertraagd verzenden, bedieningselementen, conceptopslag en verzending vanuit het opstelscherm geïnspecteerd. Resultaat: De opstelinterface kan vertraagde conceptverzendingen plannen, verplaatsen, annuleren en weergeven.
- Bewijs 3: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Aanroeplocaties van PropertiesService, CacheService, LockService, ScriptApp-starters, UrlFetchApp en OAuth-toegangssleutels geïnspecteerd. Resultaat: Primitieven van Apps Script voor status, tussenopslag, vergrendeling, externe ophaalverzoeken, installeerbare starters en Google OAuth-toegangssleutels worden gebruikt.
- Bewijs 4: [apps-script/MultiAccount.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MultiAccount.gs); Gebruik van accountregisters, OAuth-status, PropertiesService en LockService geïnspecteerd. Resultaat: OAuth- en autorisatiestatus voor meerdere accounts worden opgeslagen en afgeschermd met eigenschappen en vergrendelingen van Apps Script.
- Beperkingen: Statische implementatie-inspectie bewijst uitsluitend de aanwezigheid van broncode; er is geen geautomatiseerde test, teruglezing uit de testomgeving of productie-acceptatie uitgevoerd.

## KH-PROD-049

- Status: `geblokkeerd`
- Categorie: `KH-PROD`; type: `product`
- Relevantie: hoog
- Bereik en niveau: `gemengd` / `E2`
- Bewering: Telegram moet een laagdrempelig bedieningsvlak zijn, geen kopie van Gmail.
- Implementatiestatus: geïmplementeerd
- Afhankelijkheden: Telegram Bot API
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-036](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Validatie en routering van Telegram-bijwerkingen, afhandeling van terugkoppelingen, Bot API-verzoeken, overzichten en kaarten, bladerfuncties en menufuncties geïnspecteerd. Resultaat: De broncodeopslagplaats bevat een tot de eigenaar beperkt besturingsvlak via de Telegram Bot API met korte acties en berichtkaarten.
- Bewijs 2: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Gebruikersinterface voor mappen, gesprekken, opstellen, bijlagen, labels, focus en adaptieve dichtheid geïnspecteerd. Resultaat: De broncodeopslagplaats implementeert een brede e-mailwebtoepassing met een optioneel gericht en adaptief oppervlak, niet slechts een minimaal kaartoppervlak.
- Beperkingen: Veilig ontbrekend bewijs: een alleen-lezen resultaat van de weergegeven gebruikerservaring of gebruikersacceptatie gekoppeld aan de vastgepinde vastlegging waaruit blijkt dat Telegram-interacties laagdrempelig zijn en wezenlijk compacter blijven dan de e-mailwebtoepassing.

## KH-PROD-050

- Status: `gedeeltelijk`
- Categorie: `KH-PROD`; type: `product`
- Relevantie: hoog
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: Het Telegram-overzicht moet een klein aantal berichten met de hoogste impact tonen.
- Implementatiestatus: geïmplementeerd
- Afhankelijkheden: KH-DEP-015
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-037](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Functies voor herinneringsreservering, poortbewaking voor stille uren en overzichten, verzending, terugkoppelingen en verwerking geïnspecteerd. Resultaat: De serverlaag implementeert begrensde zachte herinneringen, overzichtsvensters, acties voor later, herhaalpogingen en orkestratie van Telegram-aflevering.
- Bewijs 2: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Herinneringskeuzes tijdens de introductie en de gebruikersinterface voor overzichtsvensters geïnspecteerd. Resultaat: De gebruikersinterface biedt voorkeuren voor zachte herinneringen, overzichten en meldingen voor uitsluitend urgente berichten.
- Bewijs 3: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Validatie en routering van Telegram-bijwerkingen, afhandeling van terugkoppelingen, Bot API-verzoeken, overzichten en kaarten, bladerfuncties en menufuncties geïnspecteerd. Resultaat: De broncodeopslagplaats bevat een tot de eigenaar beperkt besturingsvlak via de Telegram Bot API met korte acties en berichtkaarten.
- Beperkingen: Begrensde overzichtsaflevering en prioriteitsgegevens bestaan; statische inspectie bewijst niet dat de rangschikking consequent de berichten met de grootste impact selecteert.

## KH-PROD-051

- Status: `gedeeltelijk`
- Categorie: `KH-PROD`; type: `product`
- Relevantie: hoog
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: De bediening in Telegram moet `gereed`, `later`, `morgen herinneren` en `samenvatting tonen` ondersteunen.
- Implementatiestatus: gedeeltelijk geïmplementeerd
- Afhankelijkheden: Telegram Bot API; KH-DEP-015
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-038](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Validatie en routering van Telegram-bijwerkingen, afhandeling van terugkoppelingen, Bot API-verzoeken, overzichten en kaarten, bladerfuncties en menufuncties geïnspecteerd. Resultaat: De broncodeopslagplaats bevat een tot de eigenaar beperkt besturingsvlak via de Telegram Bot API met korte acties en berichtkaarten.
- Bewijs 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Functies voor herinneringsreservering, poortbewaking voor stille uren en overzichten, verzending, terugkoppelingen en verwerking geïnspecteerd. Resultaat: De serverlaag implementeert begrensde zachte herinneringen, overzichtsvensters, acties voor later, herhaalpogingen en orkestratie van Telegram-aflevering.
- Bewijs 3: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Herinneringskeuzes tijdens de introductie en de gebruikersinterface voor overzichtsvensters geïnspecteerd. Resultaat: De gebruikersinterface biedt voorkeuren voor zachte herinneringen, overzichten en meldingen voor uitsluitend urgente berichten.
- Bewijs 4: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Voorbereiding en toepassing van acties, sluimeren, labels, antwoordsjablonen en afstemming van verplaatsingen in Telegram geïnspecteerd. Resultaat: De serverlaag implementeert archief en postvak, sluimeren en uitstellen, labels, antwoordsjablonen en afgestemde actiestatus.
- Bewijs 5: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Routering van Telegram-terugkoppelingen, kaartacties, herinneringsterugkoppelingen en Gmail-afstemming geïnspecteerd. Resultaat: Korte acties in Telegram en de bijbehorende statusafstemming met Gmail zijn aanwezig.
- Beperkingen: Gereed en archiveren, later en sluimeren, herinneringsterugkoppelingen en samenvattings- of kaartweergaven bestaan, maar het exacte contract met vier letterlijke opdrachten is niet vastgesteld.

## KH-PROD-052

- Status: `gedeeltelijk`
- Categorie: `KH-PROD`; type: `product`
- Relevantie: hoog
- Bereik en niveau: `broncodeopslagplaats` / `E2`
- Bewering: Bied nooddoorgifte uitsluitend voor daadwerkelijk urgente berichten.
- Implementatiestatus: gedeeltelijk geïmplementeerd
- Afhankelijkheden: KH-DEP-015
- Conflicten: geen
- Gevoeligheid: `openbaar`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-039](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Functies voor herinneringsreservering, poortbewaking voor stille uren en overzichten, verzending, terugkoppelingen en verwerking geïnspecteerd. Resultaat: De serverlaag implementeert begrensde zachte herinneringen, overzichtsvensters, acties voor later, herhaalpogingen en orkestratie van Telegram-aflevering.
- Bewijs 2: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Herinneringskeuzes tijdens de introductie en de gebruikersinterface voor overzichtsvensters geïnspecteerd. Resultaat: De gebruikersinterface biedt voorkeuren voor zachte herinneringen, overzichten en meldingen voor uitsluitend urgente berichten.
- Beperkingen: Een voorkeur voor uitsluitend urgente herinneringen en prioriteitsbewaking bestaan; een afzonderlijk nooddoorgiftekanaal en bewijs van productieroutering ontbreken.

## KH-PRV-001

- Status: `ongeverifieerd`
- Categorie: `KH-PRV`; type: `gegevensbescherming`
- Relevantie: gegevensbescherming
- Bereik en niveau: `broncodeopslagplaats` / `E0`
- Bewering: Het rapport beschrijft de verwerking van e-mailinhoud met kunstmatige intelligentie, maar specificeert geen bewaartermijnen, dataminimalisatie, versleuteling, grenzen tussen aanbieders of gegevensverwijdering.
- Implementatiestatus: weglating in het rapport niet onafhankelijk bewezen
- Afhankelijkheden: goedgekeurde primaire bron of onafhankelijke specificatie voor gegevensbescherming
- Conflicten: geen
- Gevoeligheid: `intern`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R1-065](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Bewijs 1: [docs/en/knowledge-hub/PERMISSIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PERMISSIONS.md); Eenmalige lezing van het toegewezen paginapaar bij de onveranderlijke actieve vastlegging. Resultaat: Tweetalige ID's, bron-ID's, conflicten en formuleringen komen overeen; de pagina bestempelt het item als uit rapporten afgeleid en niet-gezaghebbend.
- Bewijs 2: [docs/en/knowledge-hub/sources/REPORT-1.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/sources/REPORT-1.md); Gevonden via een gerichte zoekopdracht op KH-PRV. Resultaat: Herhaalt de bewering maar vormt geen primair bewijs.
- Beperkingen: Exact veilig ontbrekend bewijs: een goedgekeurd geschoond uittreksel uit de primaire bron voor de geciteerde rapportonderdelen, of een onafhankelijke specificatie voor gegevensbescherming die aantoont wat wel en niet is gespecificeerd.

## KH-PRV-002

- Status: `aanbeveling`
- Categorie: `KH-PRV`; type: `gegevensbescherming`
- Relevantie: gegevensbescherming
- Bereik en niveau: `gemengd` / `E2`
- Bewering: Maatregelen voor de AVG en ePrivacy moeten versleuteling, toegangscontrole, auditlogboeken, dataminimalisatie, verwerkersovereenkomsten, bewaartermijnen, export en verwijdering, melding van datalekken en opslaglocatie omvatten.
- Implementatiestatus: gedeeltelijk geïmplementeerd, uitsluitend statisch bewijs
- Afhankelijkheden: gegevensbeschermingseffectbeoordeling; gegevensstroomkaart; bewaarschema; verwerkersovereenkomsten
- Conflicten: geen
- Gevoeligheid: `intern`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R2-039](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Bewijs 1: [docs/en/knowledge-hub/PERMISSIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PERMISSIONS.md); Eenmalige lezing van het toegewezen paginapaar bij de onveranderlijke actieve vastlegging. Resultaat: Tweetalige ID's, bron-ID's, conflicten en formuleringen komen overeen; de pagina bestempelt het item als uit rapporten afgeleid en niet-gezaghebbend.
- Bewijs 2: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Eenmalig gelezen bij de toegewezen vastlegging. Resultaat: De toegangsbereiken zijn gmail.modify, drive.readonly, script.external_request en script.scriptapp; er is geen beleid voor bewaartermijnen, opslaglocatie, melding van datalekken of telemetrievoorkeuren gedeclareerd.
- Bewijs 3: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Enkelvoudige alleen-lezen lexicale en identificatorinspectie van zes gevolgde implementatiebestanden; geen code uitgevoerd. Resultaat: Markeringen voor eigenschappen, schoning, verloop en controle- of logregistratie bestaan; overeenkomsten, opslaglocatie, rechten voor export en verwijdering, en afhandeling van datalekken zijn niet vastgesteld.
- Beperkingen: Juridische naleving wordt niet door broncode bewezen; er zijn geen afgeschermde configuraties, uitvoeringsgegevens, overeenkomsten of externe beleidsdocumenten geraadpleegd.

## KH-PRV-003

- Status: `aanbeveling`
- Categorie: `KH-PRV`; type: `gegevensbescherming`
- Relevantie: gegevensbescherming
- Bereik en niveau: `gemengd` / `E2`
- Bewering: Schakel het volgen van geopende berichten niet standaard in voor toepassingen die gevoelig zijn binnen de Europese Unie; voeg juridische poorten, een voorkeurencentrum, gerichte toestemming en een scheiding tussen afleveringsgegevens en marketingtelemetrie toe.
- Implementatiestatus: niet vastgesteld, één statische overeenkomst onopgelost
- Afhankelijkheden: contextuele beoordeling van de statische overeenkomst; telemetrie-inventaris; contract voor standaardinstellingen
- Conflicten: geen
- Gevoeligheid: `intern`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R2-041](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Bewijs 1: [docs/en/knowledge-hub/PERMISSIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PERMISSIONS.md); Eenmalige lezing van het toegewezen paginapaar bij de onveranderlijke actieve vastlegging. Resultaat: Tweetalige ID's, bron-ID's, conflicten en formuleringen komen overeen; de pagina bestempelt het item als uit rapporten afgeleid en niet-gezaghebbend.
- Bewijs 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Enkelvoudige alleen-lezen lexicale en identificatorinspectie van zes gevolgde implementatiebestanden; geen code uitgevoerd. Resultaat: Er verscheen één lexicale overeenkomst met een volgpatroon in MailClient.gs en nul in de overige vijf geïnspecteerde implementatiebestanden; de context is niet bewaard, zodat aanwezigheid of afwezigheid niet is vastgesteld.
- Beperkingen: Exact veilig ontbrekend bewijs: contextuele beoordeling van de ene overeenkomst plus een inventaris van telemetrie en standaardinstellingen en een alleen-lezen netwerkspoor.

## KH-PRV-004

- Status: `aanbeveling`
- Categorie: `KH-PRV`; type: `gegevensbescherming`
- Relevantie: gegevensbescherming
- Bereik en niveau: `gemengd` / `E2`
- Bewering: Minimale rechten, duidelijke gegevensgrenzen, minimale extractie van berichtinhoud en vroegtijdige planning van verificatiegrenzen zijn architectonische vereisten.
- Implementatiestatus: gedeeltelijk geïmplementeerd, uitsluitend statisch bewijs
- Afhankelijkheden: rechtvaardigingsmatrix voor toegangsbereiken; gegevensstroomkaart; test voor minimale extractie van berichtinhoud
- Conflicten: geen
- Gevoeligheid: `intern`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-042](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md), [R3-102](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [docs/en/knowledge-hub/PERMISSIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PERMISSIONS.md); Eenmalige lezing van het toegewezen paginapaar bij de onveranderlijke actieve vastlegging. Resultaat: Tweetalige ID's, bron-ID's, conflicten en formuleringen komen overeen; de pagina bestempelt het item als uit rapporten afgeleid en niet-gezaghebbend.
- Bewijs 2: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Eenmalig gelezen bij de toegewezen vastlegging. Resultaat: De toegangsbereiken zijn gmail.modify, drive.readonly, script.external_request en script.scriptapp; er is geen beleid voor bewaartermijnen, opslaglocatie, melding van datalekken of telemetrievoorkeuren gedeclareerd.
- Bewijs 3: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Enkelvoudige alleen-lezen lexicale en identificatorinspectie van zes gevolgde implementatiebestanden; geen code uitgevoerd. Resultaat: Account- en sessieafbakening en afgeschermde sleutel- en sessie-identificatoren duiden grenzen aan; minimale extractie van berichtinhoud en de toereikendheid van minimale rechten zijn niet vastgesteld.
- Beperkingen: De bereiken gmail.modify en scriptapp kunnen noodzakelijk zijn, maar minimale rechten vereisen een controle van toegangsbereiken per functie; isolatie in de uitvoeringsomgeving is niet getest.

## KH-PRV-005

- Status: `aanbeveling`
- Categorie: `KH-PRV`; type: `gegevensbescherming`
- Relevantie: gegevensbescherming
- Bereik en niveau: `gemengd` / `E2`
- Bewering: Sla geen inloggegevens op in de broncode; bewaar geheimen in eigenschappenopslag of een externe kluis en verwijder adressen, berichtkoppen en sleutelfragmenten uit logboeken.
- Implementatiestatus: gedeeltelijk geïmplementeerd, uitsluitend statisch bewijs
- Afhankelijkheden: inloggegevensveilige geheimenscan; beoordeling van de gegevensstroom voor logregistratie; synthetische schoningstesten
- Conflicten: geen
- Gevoeligheid: `intern`
- Rapport en project: [VR-001](OVERZICHT.md); [Project](../../../PROJECT.md); [machinedossier](../../../../verification-reports/VR-001/claims.json)
- Exacte herkomst: [R3-047](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Bewijs 1: [docs/en/knowledge-hub/PERMISSIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PERMISSIONS.md); Eenmalige lezing van het toegewezen paginapaar bij de onveranderlijke actieve vastlegging. Resultaat: Tweetalige ID's, bron-ID's, conflicten en formuleringen komen overeen; de pagina bestempelt het item als uit rapporten afgeleid en niet-gezaghebbend.
- Bewijs 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Enkelvoudige alleen-lezen lexicale en identificatorinspectie van zes gevolgde implementatiebestanden; geen code uitgevoerd. Resultaat: Gebruik van PropertiesService (138 markeringen), identificatoren voor schoning en 84 logboekaanroepen bestaan; dit bewijst niet dat elk logboekitem is geschoond of dat er geen letterlijke inloggegevens voorkomen.
- Bewijs 3: [AGENTS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/AGENTS.md); Eenmalig gelezen bij de toegewezen vastlegging. Resultaat: Regelt de routering van verzoeken, bewijsvoering, omgang met geheimen en vrijgavepoorten; neemt geen enkele KH-INS-ID over.
- Beperkingen: Er is geen afgeschermde opslag of geheime waarde benaderd. Exact veilig ontbrekend bewijs: een voor inloggegevens veilige scan van de broncodeopslagplaats en een contextuele beoordeling van elk logboekdoel.
