# Versie 1: productieacceptatie van de onveranderlijke v57 — 2026-07-22

[Uitgaveartikel](../uitgaven/UITGAVE-001-2026-07-19.md) | [Problemen](../PROBLEMEN.md) | [Stappenplan](../STAPPENPLAN.md) | [Oekraïens](../../uk/звіти/ВИПУСК-001-В57-ПРИЙМАННЯ-В-РОБОЧОМУ-СЕРЕДОВИЩІ-2026-07-22.md)

## Rapportgrens

Dit is een opgeschoonde feitelijke verificatie van de voortzetting van `REQ-0019`. Het rapport bevat geen e-mailadressen, bericht- of implementatie-identificaties, e-mailinhoud, toegangsbewijzen, cookies, `initData` of geheime eigenschappen. Historische artefacten van de onveranderlijke versies v56/v57 zijn niet herschreven; het product blijft `Versie 1`.

## Atomaire beweringen

| ID | Categorie | Actualiteit | Status | Afhankelijkheden | Conflicten | Gevoeligheid | Exacte herkomst |
|---|---|---|---|---|---|---|---|
| V57-A01 | Uitgave | actueel | geverifieerd | aan controlesommen gekoppeld v57-hulpscript | verouderd controlepunt v55 | opgeschoond | `PreflightOnly` na opschoning: stabiele v57, testomgeving 0, verouderde testomgeving 0, logboek `cleaned` |
| V57-A02 | Testomgeving | actueel | geverifieerd | bestaande ondertekende Telegram-sessie | geen | opgeschoond | v57 uitsluitend voor eigenaar: postvak, profielafbeelding, drie Gmail-hoofdmappen, wisselen naar gecontroleerde verbinding en terug zonder OAuth |
| V57-A03 | Productie | actueel | geverifieerd | A02, exacte terugdraaiing naar v55 | geen | opgeschoond | Standaardpromotie; twee nieuwe starts van v57 laadden het postvak, de profielafbeelding en de lezer zonder netwerkfout |
| V57-A04 | Uitvoeringsomgeving | actueel | geverifieerd met telemetriebeperking | werkertijdvak van 150 seconden; History-tijdvak van 15 minuten | overzichtduur omvat wachttijd in de rij | opgeschoond | Voltooid tijdstarterritme van volledig uitvoeren en tijdvak overslaan zonder gefaalde werker; broncode en regressietests bewijzen beide tijdvakcontracten |
| V57-A05 | Ontdubbeling | actueel | geverifieerd | Gmail-labels | eerdere acceptatieformulering voor berichten aan het eigen adres | opgeschoond | Peilingen binnen hetzelfde account en via gekoppelde aliassen ontvingen `INBOX+SENT` en maakten terecht geen kaart aan omdat het verzonden exemplaar als reeds gezien wordt bewaard |
| V57-A06 | Aflevering | actueel | geverifieerd | onafhankelijke, door eigenaar beheerde afzender die ontbreekt in `Send mail as` van het primaire account | geen | opgeschoond | Eén gemarkeerd bericht kwam binnen als `INBOX+UNREAD` zonder `SENT` en maakte automatisch één Telegram-kaart aan met de juiste accountmarkering |
| V57-A07 | Ontdubbeling | actueel | geverifieerd | A06 | geen | opgeschoond | Exact zoeken in Telegram vond één resultaat; twee daaropvolgende `/check`-uitvoeringen meldden geen nieuwe post en de toegankelijkheidsboom behield één gemarkeerd lijstitem |
| V57-A08 | Tests | actueel | geverifieerd | op `main` gebaseerde broncode | geen | openbaar | Lokale producttestreeks `444/444`; de drempels voor verzoekenregister, tweetaligheid, kennisbank en verificatierapporten zijn vóór publicatie geslaagd |
| V57-A09 | Herstel | actueel | geverifieerd | onveranderlijke geschiedenis | geen | opgeschoond | De onveranderlijke v56 en de exacte terugdraaiing naar v55 blijven bewaard; er resteert geen enkele testomgevingsimplementatie |

## Gecorrigeerd bewijsconflict

Eerder uitgavebewijs behandelde een bericht aan het eigen adres met `SENT+INBOX` als een geldige acceptatiepeiling voor één kaart. De feitelijke v57-labels en het regressiecontract bewijzen het tegendeel: een dergelijke peiling moet volledig worden overgeslagen. Acceptatie voor één kaart wordt in plaats daarvan bewezen door een extern `INBOX`-bericht zonder `SENT`; de ontdubbelingscode is niet afgezwakt.

## Nog ongeverifieerd

- Nieuwe Google-accountkeuze, toestemming en terugkoppeling voor een nieuwe Gmail-verbinding.
- Een afzonderlijk inkomend gemarkeerd bericht dat is gericht aan elke secundaire gekoppelde Gmail-hoofdmap in plaats van de primaire hoofdmap (zie de vervolgaanvulling hieronder).
- Rechtstreekse inhoudsloze productietelemetrie die elke daadwerkelijke Gmail History-ronde van 15 minuten afzonderlijk benoemt; het uitvoeringsritme wordt momenteel gecombineerd met bewijs uit broncode en tests.
- De concept-PR voor de leesadapter van de geavanceerde Gmail-dienst uitsluitend voor de eigenaar maakt geen deel uit van v57 en blijft niet-samengevoegd.

## Bewijskoppelingen

- [Uitgavehulpscript](../../../apps-script/tools/release_apps_script_versie_001_20260721_v57.ps1)
- [Tests voor uitvoeringstijdbudget](../../../apps-script/tests/runtime_budget.test.js)
- [Tests voor e-mailacties en ontdubbeling](../../../apps-script/tests/mail_actions.test.js)
- [Uitgaveartikel van Versie 1](../uitgaven/UITGAVE-001-2026-07-19.md)
- [Problemen](../PROBLEMEN.md)
- [Stappenplan](../STAPPENPLAN.md)
- [Officiële Apps Script-quota](https://developers.google.com/apps-script/guides/services/quotas)
- [Officiële referentie voor Gmail-labels](https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.labels)

## Uitgavegrens

Door productie geaccepteerde Apps Script-versie: onveranderlijke v57. De volgende onveranderlijke versie of `Versie 2` vereist een nieuwe exacte opdracht van de eigenaar. Er is geen nieuwe OAuth gestart; er heeft zich geen CAPTCHA, eenmalig wachtwoord/tweefactorauthenticatie, toegangssleutel of andere handmatige drempel voorgedaan.

## Vervolgbewijs: secundaire Gmail-hoofdmappen — 2026-07-22

| Vereiste | Geverifieerd bewijs | Status |
|---|---|---|
| Inkomende verspreiding hoofdmap 2 | Een nieuwe inhoudsloze zelftest van de eigenaar bereikte Postvak IN en maakte automatisch één kaart aan | geverifieerd |
| Accountidentiteit hoofdmap 2 | De kaart droeg de juiste markering van de tweede Gmail-zone | geverifieerd |
| Ontdubbeling hoofdmap 2 | Twee herhaalde `/check`-bewerkingen meldden geen nieuwe post; het aantal in de toegankelijkheidsboom bleef 1 | geverifieerd |
| Inkomende verspreiding hoofdmap 3 | Een afzonderlijke inhoudsloze zelftest van de eigenaar maakte automatisch één kaart aan | geverifieerd |
| Accountidentiteit hoofdmap 3 | De kaart droeg de juiste markering van de derde Gmail-zone | geverifieerd |
| Ontdubbeling hoofdmap 3 | Twee herhaalde `/check`-bewerkingen meldden geen nieuwe post; het aantal in de toegankelijkheidsboom bleef 1 | geverifieerd |
| Uitsluiting van ongewenste e-mail | Een gecontroleerd bericht voor hoofdmap 2 in Ongewenste e-mail maakte geen kaart aan | geverifieerd |
| Veiligheidsgrens | OAuth, machtigingsbereiken, implementatie, tijdstarters en productcode bleven ongewijzigd | geverifieerd |

### Waarnemingscorrectie

Een tussentijds zichtbaar deelvenster in Telegram toonde de kaart van hoofdmap 3 niet en vormde onvoldoende bewijs dat de aflevering achterwege was gebleven. Na het herstellen van de juiste schuifpositie werd de kaart gevonden en bevestigde de toegankelijkheidsindex atomair exact één overeenkomst met de markering. Toekomstige beweringen over afwezigheid mogen niet uitsluitend op het zichtbare deelvenster steunen.

### Incident met hulpmiddelen

De alleen-lezen inspectie in Chrome liep tweemaal vast door een tijdslimiet, en de Windows-browserterugval sloot foutveilig omdat deze de huidige URL niet betrouwbaar kon vaststellen. De productiestaat bleef ongewijzigd. Onafhankelijk bewijs werd verkregen via de reeds geautoriseerde Gmail-koppeling en de toegankelijkheidsboom van Telegram; OAuth is niet herhaald.
