# Versie 1: uitgavepoging v62 en exacte terugdraaiing

[Huidige staat](../HUIDIGE-STAAT.md) | [VR-010](../verificatierapporten/rapporten/VR-010/OVERZICHT.md) | [Oekraïens](../../uk/звіти/ВИПУСК-001-В62-СПРОБА-ВИПУСКУ-ТА-ПОВЕРНЕННЯ-2026-07-22.md)

- **Datum:** 2026-07-22
- **Bronverzoek:** `REQ-0033`
- **Algehele status:** `BLOCKED`
- **Productie na sluiting:** onveranderlijke v57
- **Historische kandidaat:** onveranderlijke v62
- **Implementaties in testomgeving:** 0

## Geïmplementeerde kandidaat

Versie v62 bevatte cumulatief het P0-clientwerk van Versie 1, de dynamische context voor actieve en gedeelde accounts, de geharmoniseerde interface voor Gmail-labels, het herstel van verouderde routes, de begrensde accountgebonden cache, controlepunten voor conceptherstel, versiebewuste clientactivering en exacte isolatie van lijstaanvragen per account. PR #29 en PR #30 zijn normaal samengevoegd; GitHub en de privéspiegel op GitLab bereikten `42dfbd76d1e904fe065094010f61418da8896978`.

## Geverifieerd bewijs

- Product- en uitgavetests: `494/494`; brugtests: `3/3`; de verplichte GitHub-controles zijn geslaagd.
- De onveranderlijke v62 en de bijbehorende broncodecontrolesommen zijn exact teruggelezen; tijdens de acceptatie bestond er slechts één beveiligde implementatie in de testomgeving.
- De testomgeving uitsluitend voor de eigenaar laadde het postvak, de profielafbeelding, drie geïsoleerde Gmail-hoofdmappen en de gedeelde weergave; wisselen naar het gecontroleerde secundaire account en terug vereiste geen OAuth. De zichtbare lijst bleef begrensd tot het gevraagde account.
- Twee nieuwe productiestarts van v62 laadden het postvak na promotie.
- Eén goedgekeurde eigen kopie van de eigenaar maakte onder de `SENT`-uitsluiting geen Telegram-kaart aan; twee `/check`-uitvoeringen maakten geen duplicaat aan. Dit bewijst de onderdrukkings- en ontdubbelingsgrens, maar niet de externe automatische aflevering in `INBOX`.
- De uitvoer van de exacte terugdraaiing meldde v62 -> v57. Voorcontrole na terugdraaiing: stabiele v57, HEAD `stable_v57`, onveranderlijke v62 gereed, testomgeving 0 en logboek `rolled_back`.
- Twee nieuwe productiestarts van v57 laadden het postvak zonder netwerkfout.

## Geblokkeerd bewijs

Het vereiste uitvoeringsspoor van Apps Script na v62 kon niet worden verkregen. Het officiële proceseindpunt gaf een 403-status terug en `clasp logs` stopte omdat er geen GCP-project-ID was geconfigureerd. Het migreren van het door Apps Script beheerde standaardproject uitsluitend voor logboeken werd afgewezen omdat dit de bestaande autorisaties zou kunnen intrekken. Er is geen nieuwe OAuth-toestemming gestart.

GT-030 blijft daarom openstaan: v62 behield dezelfde werkercode als de kandidaatlijn die eerder een uitvoering van 214,96 seconden en een overlappend uitvoeringsvenster veroorzaakte. Die broncodegelijkheid is geverifieerd; een specifiek aan v62 toe te schrijven uitvoeringsregressie is niet bewezen. Zonder een inhoudsloos fase- en tijdvakspoor blijft de uitgavedrempel van 150 seconden zonder overlapping `UNVERIFIED`.

## Veilige eindstaat

De productieomgeving draait op de exacte onveranderlijke v57, de testomgeving staat op 0, het Telegram-menu wijst naar productie en de onveranderlijke v62 blijft bewaard voor historische vergelijking. v62 mag niet worden gewijzigd of opnieuw worden bevorderd. Een toekomstige onveranderlijke versie vereist een oorzakelijke oplossing voor GT-030 en nieuw uitvoeringsbewijs; gewone e-mailwijzigingen rechtvaardigen geen heen-en-weergeschakel tussen uitgaven.

Tijdens de afsluiting zijn geen willekeurige e-mails, Gmail-labels, concepten, OAuth-records, toegangsbewijzen, geheime eigenschappen of koppelingen van accountzones gewijzigd.
