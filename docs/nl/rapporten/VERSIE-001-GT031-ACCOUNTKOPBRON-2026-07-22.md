# Broncodecorrectie voor de koptekst van het actieve account (GT-031) in Versie 1

[Oekraïens](../../uk/звіти/ВИПУСК-001-ГТ031-ДЖЕРЕЛО-ЗАГОЛОВКА-ОБЛІКОВОГО-ЗАПИСУ-2026-07-22.md)

- **Datum:** 2026-07-22
- **Status:** `PARTIAL`
- **Bronverzoek:** `REQ-0033`
- **Atomaire verificatie:** [VR-012](../verificatierapporten/rapporten/VR-012/OVERZICHT.md)

## Waargenomen defect

De oorspronkelijke acceptatie van v63 toonde aan dat bij een gecontroleerd alternatief account het einde van het e-mailadres kon wegvallen in de smalle koptekst van de actieve context. De dynamische naam, de stabiele accountselectie en het gedrag van de profielafbeelding bleven verder correct.

## Grondoorzaak

De ondertitel voor het bureaublad stond tekstterugloop al toe, maar de smalle bovenbalk met vaste hoogte bracht deze terug tot een afgekapte regel. De enige volledige waarde voor één enkel account bleef achter in de metagegevens voor aankondiging en titel; in tegenstelling tot de gedeelde modus ontbrak een zichtbaar aanraakbaar uitklapelement voor gebruikers met een aanraakscherm.

## Broncodecorrectie

- hergebruik van de bestaande `mailContextDetails` en accountkaart voor zowel enkelvoudige als gedeelde contexten;
- behoud van tekstterugloop op bredere schermen met expliciete normale witruimte en woordafbreking;
- gebruik van een compacte ondertitel van één regel plus een zichtbaar uitklapelement `Volledig adres` op smalle schermen;
- behoud van de volledige koppeling tussen naam en e-mailadres binnen een oorspronkelijk `<details>`-element;
- afleiding van alle waarden uit het bestaande model met stabiele verbindings-ID's;
- behoud van toetsenbordbediening, focusomlijning, ARIA-aankondiging en voorrang van de verborgen staat.

Er is geen enkel contract voor Gmail, OAuth, accountselectie of lidmaatschap van de gedeelde weergave gewijzigd.

## Testbewijs

- gerichte testreeks `mail_app_contract.test.js`: `88/88`;
- volledige Apps Script-testreeks: `501/501`;
- de eerste volledige uitvoering faalde terecht uitsluitend omdat de test voor de onveranderlijke v63 de huidige werkbroncode nog vergeleek met zijn bevroren controlesom;
- de v63-test is in lijn gebracht met het bestaande patroon van de historische v62: de test bewijst nog steeds elke bevroren controlesom van het hulpscript, maar vereist niet langer dat toekomstige broncode gelijk blijft aan de onveranderlijke v63;
- het hulpscript van de onveranderlijke v63, de implementatie, de vastgezette broncodecontrolesommen en het terugdraaidoel zijn niet bewerkt.

## Uitgavegrens

De productieomgeving en de HEAD-uitvoeringsomgeving blijven op de onveranderlijke v63 met testomgeving `0`. De broncodecorrectie wordt niet als actief gepresenteerd. Hiervoor zijn een normale broncode-PR, een nieuw cumulatief hulpscript voor de onveranderlijke v64, visuele acceptatie in de testomgeving uitsluitend voor de eigenaar en pas na het slagen daarvan promotie naar productie vereist.

## Vereiste actieve acceptatie

- de smalle weergave in het oorspronkelijke Telegram Desktop toont een zichtbaar uitklapelement voor het volledige adres;
- het openen ervan toont het volledige geselecteerde e-mailadres zonder overlapping;
- wisselen tussen bestaande accounts werkt zowel de zichtbare regel als het uitklapelement bij zonder OAuth;
- de gedeelde modus toont nog steeds elk paar van naam en e-mailadres;
- de toestanden voor laden, ontbrekende naam of foto en fouten blijven goed leesbaar;
- er vindt geen volledige paginaherlading of lek tussen accountzones plaats.
