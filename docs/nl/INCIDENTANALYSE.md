# Incidentanalyse van de aflevering in Versie 1: v42-v55

[Oekraïens](../uk/РОЗБІР-ІНЦИДЕНТІВ.md) | [Projectoverzicht](OVERZICHT.md) | [VR-002](verificatierapporten/rapporten/VR-002/OVERZICHT.md)

Bronverzoek: `REQ-0010`. Verificatiekader: `REQ-0004`.

## Bewijsgrens

Deze incidentanalyse is een gestructureerde reconstructie van het aangeleverde agentsessielogboek van v42-v55 en het bijbehorende architectuuroverzicht. Inspectie van de broncode of een lokale test wordt hiermee niet verheven tot productiebewijs. Beweringen die niet door de aangeleverde tekst worden aangetoond, zijn gemarkeerd als `unverified`. In het bijzonder bevat v55 lokale kandidaatwijzigingen, maar had deze versie nog geen tests, voorcontrole, onveranderlijke implementatie of productieacceptatie voltooid toen het bronlogboek eindigde.

## Architectuur per deelsysteem

### Directe afleveringsstrook

- v42 legde de afleveringsstoring bloot: onderhoud en de verwerking van de bevroren achterstand werden uitgevoerd vóór de aflevering, terwijl de bevroren bovengrens geen berichten kon omvatten die na de start van die verwerkingsronde waren aangemaakt.
- v43 introduceerde een begrensde directe afleveringsstrook (nieuwste eerst), een voortgangsmarkering en herhaalstaat per verbinding, gedeelde ontdubbeling van reeds geziene berichten en planning met voorrang voor aflevering. De scanner voor de bevroren achterstand bleef behouden als herstelmechanisme.
- v44 corrigeerde de afstemming van bereik en zoekopdracht voor de snelle strook.
- v45-v46 behielden fasespecifieke fouten in plaats van toe te staan dat een later succes of onderhoudsuitvoer deze verhuld zou laten.
- v48 isoleerde direct werk van een gedeeld `UserLock` dat tijdens tragere invoer/uitvoer kon worden vastgehouden.
- v51 bewaarde en bundelde elk strookresultaat over meerdere accounts en behield het ernstniveau `REAUTH`.
- v52-v54 breidden de gecontroleerde acceptatie uit naar Ongewenste e-mail en herstelden het exacte geval van ongewenste e-mail dat in het logboek werd beschreven.
- v55 sluit `SENT+INBOX` uit van meldingsgeschiktheid om te voorkomen dat één logisch bericht twee kaarten oplevert. Deze correctie in v55 is `unverified`.

### Scanner voor bevroren achterstand

- v42 toonde aan dat een bevroren `upperBoundMs` veilig is voor deterministische inhaalverwerking, maar ongeschikt als enige directe bron.
- v43 plaatste de scanner achter de directe afleveringsstrook en behield deze voor begrensd herstel en inhaalwerk.
- v44 bracht het zoekbereik in overeenstemming met het afleveringscontract.
- v48 voorkwam dat de vergrendeling van de scanner de directe aflevering blokkeerde.
- v52-v54 brachten het herstel van Ongewenste e-mail in lijn met dezelfde canonieke geschiktheids- en ontdubbelingsverwachtingen als de directe aflevering.

### Index en capaciteit van Telegram-kaarten

- v47 voegde indexverdichting toe, maar de capaciteitsbewaker telde op een overgebleven aanroeppunt nog steeds de ruwe index.
- v49-v50 wijzigden de capaciteitsberekening naar geldige actieve records in plaats van geserialiseerde items en voegden opschoning van beëindigde records toe.
- De invariant is één fysieke Telegram-kaart per logisch Gmail-bericht. Accounthoofdmappen zijn gefilterde weergaven, geen dubbele kaartopslagplaatsen.

### Bewaring en verwijdering

- v47 introduceerde verdichting als eerste opschoningsgrens.
- v49-v50 verhielpen de waargenomen capaciteitsuitputting die werd veroorzaakt door verouderde of beëindigde records, waaronder `delete_too_old`-items.
- De capaciteit moet worden berekend na validatie en verwijdering; de lengte van een ruwe eigenschap of index is geen toelaatbare capaciteitsmaatstaf.

### Verspreiding over meerdere accounts

- Inspectie van de broncode in v42 toonde aan dat de verspreiding van meldingen `notificationConnectionIds` gebruikte; het actieve account was een selectie in de gebruikersinterface, niet de afleveringsgrens.
- v51 verhielp het weggooien van resultaten per account, behield herautorisatiefouten en maakte de uitkomsten per afzonderlijk account waarneembaar.
- Een gedeeld register van geziene berichten dwingt het ten-hoogste-éénmaal aanmaken van een kaart af, terwijl terugkoppelingen en labels gebonden blijven aan de specifieke verbinding.
- Uitvoeringsacceptatie met elk beoogd echt account wordt niet enkel door broncode-inspectie bewezen en blijft `unverified` waar het aangeleverde logboek geen acceptatiebewijs bevat.

### Onveranderlijke uitgave, testomgeving en terugdraaiing

- v43 legde afwijkingen in de voorcontrole bloot die werden veroorzaakt door witruimtegevoelige artefacten en verouderde controlesommen en beschrijvingen voor terugdraaiing.
- Elke onveranderlijke versie moet worden opgebouwd uit exact de geteste broncodebundel, worden vastgezet met een controlesom, na wijziging worden teruggelezen en in de testomgeving worden geaccepteerd vóór promotie naar productie.
- Terugdraaien betekent het selecteren van een eerder geverifieerd onveranderlijk artefact; het betekent nooit het bewerken of opnieuw opbouwen van die historische uitgave.
- v55 bleef aan het einde van het aangeleverde logboek een lokale kandidaat en mag daarom niet als geïmplementeerd of geaccepteerd worden beschreven.

## Analyse van grondoorzaken

| Nr. | Ontdekt in | Symptoom | Grondoorzaak | Correctie | Toekomstige preventie |
|---:|---|---|---|---|---|
| 1 | v42 | Nieuwe Gmail-post leverde geen Telegram-kaart op | Onderhoud en verwerking van de bevroren achterstand gingen vooraf aan de directe aflevering; de bevroren bovengrens sloot nieuwere post uit | v43 | Voer eerst een begrensde directe strook uit en bewaar bevroren scans voor herstel |
| 2 | v43 | De voorcontrole weigerde verder gelijkwaardige artefacten | De uitgavevergelijking was gevoelig voor witruimte | v43 | Normaliseer deterministisch en bereken de controlesom over de exacte uitgavebundel |
| 3 | v43 | Metagegevens voor terugdraaiing kwamen niet overeen met de kandidaat | Controlesommen en beschrijvingen werden gekopieerd uit een verouderde uitgavestaat | v43 | Genereer metagegevens uit de vastgezette bundel en controleer de teruglezing |
| 4 | v44 | De dekking van de snelle strook kwam niet overeen met het contract | De grenzen van zoekbereik en zoekopdracht liepen uiteen | v44 | Test de zoekopdrachtgrens met berichten binnen en buiten elke strook |
| 5 | controle testomgeving | `/check` gaf een fout-negatief resultaat | De aanroep naar de testomgeving liet de vereiste privésleutel weg | Aangepaste aanroep | Behandel de vorm van een geauthenticeerde peiling als een getest contract |
| 6 | v45-v46 | Een fasestoring werd verborgen door latere uitvoer | De resultaatbundeling overschreef fasespecifieke fouten of liet na deze te bewaren | v45-v46 | Bundel uitkomsten monotoon en behoud de fout met de hoogste ernst |
| 7 | v47 | De kaartcapaciteit werd te vroeg als uitgeput gemeld | Een bewaker telde de ruwe geserialiseerde index | v49-v50 | Tel uitsluitend gevalideerde actieve records na verdichting |
| 8 | v49-v50 | De capaciteit bleef uitgeput rond 72 records | Beëindigde en verouderde records namen nog steeds ruimte binnen de limiet in | v50 | Verwijder beëindigde records voordat de capaciteit wordt beoordeeld |
| 9 | v48 | Directe aflevering wachtte achter ongerelateerd werk | Een gedeeld `UserLock` omvatte trage invoer en uitvoer | v48 | Houd vergrendelingen accountgebonden en houd ze nooit vast tijdens externe invoer/uitvoer |
| 10 | v50 | `delete_too_old`-records hoopten zich op | Het bewaarbeleid miste een volledige verwijdering van eindtoestanden | v50 | Definieer en test levenscyclusovergangen en opschoning van eindtoestanden |
| 11 | v47 | Verdichting bestond al, maar voorkwam de bewakersstoring niet | Een aanroeppunt voor capaciteit gebruikte nog de oude ruwe index | v49-v50 | Test elke aanroeper van de invariant, niet alleen de hulpfunctie |
| 12 | v51 | Sommige accountuitkomsten verdwenen | Terugkeerwaarden van de verspreiding werden genegeerd | v51 | Verzamel een getypeerd resultaat voor elke verbinding en controleer het aantal resultaten |
| 13 | v51 | `REAUTH` kon verschijnen als een uitkomst met lagere ernst | De bundeling behield de voorrang van ernstniveaus niet | v51 | Definieer een expliciete ernsthiërarchie en test gemengde uitkomsten |
| 14 | v52-v54 | Het gecontroleerde `kimnata`-bericht werd niet afgeleverd | Het bericht bevond zich in Ongewenste e-mail terwijl het relevante pad uitging van Postvak IN | v52-v54 | Test de canonieke geschiktheid voor combinaties van Postvak IN, Ongewenste e-mail en uitgesloten Verzonden berichten |
| 15 | v51 | Opnieuw proberen kon een aanmaak- of logboekovergang verdubbelen of verliezen | Externe aanmaak en zichtbaarheid in het logboek waren uiteindelijk consistent | v51 | Gebruik idempotentie-sleutels en herstel via teruglezing rond dubbelzinnige mutaties |
| 16 | ongeverifieerde versie | De uitvoeringspeiling mislukte ondanks een geldig eindpunt | De peiling gebruikte `GET` waar het uitvoeringscontract `POST` vereiste | Correcte `POST`-peiling | Houd methode, authenticatie en lading binnen één uitvoerbaar peilingscontract |
| 17 | ongeverifieerde versie | Een structureel gelijk testobject faalde bij `deepStrictEqual` | De objecten waren afkomstig uit verschillende VM-domeinen | Domeinveilige controle | Vergelijk geserialiseerde of domeinvelden in plaats van domeinprototypes |
| 18 | v55 | Eén logisch bericht kon twee Telegram-kaarten opleveren | `SENT+INBOX` kwam overeen met meer dan één meldingspad | v55-kandidaat, `unverified` | Dwing één canonieke geschiktheidsfunctie en een gedeelde sleutel voor ten-hoogste-één-verwerking af |
| 19 | vóór v43 | Oekraïense en Engelse probleemverwijzingen liepen uiteen | Gekoppelde pagina's gebruikten inconsistente `GT-*`-identificaties | Gecorrigeerd vóór v43 | Valideer zowel de gelijkheid van identificaties als de gelijkheid van bestanden |
| 20 | v55 | De kandidaatstatus kon gemakkelijk worden overschat | Het werk stopte vóór tests, voorcontrole, implementatie en acceptatie | In afwachting van verificatie | Maak de uitgavestatus bewijsgestuurd en leid voltooiing nooit af uit bewerkingen alleen |

## Duurzame invarianten

1. Het actieve Gmail-account bepaalt uitsluitend de context van de gebruikersinterface; de aflevering verspreidt berichten naar alle ingeschakelde verbindingen.
2. Eén logisch Gmail-bericht maakt ten hoogste één Telegram-kaart aan.
3. Directe aflevering wordt nooit geblokkeerd door verwerking van een bevroren achterstand of door een globale vergrendeling tijdens invoer en uitvoer.
4. De capaciteit telt uitsluitend gevalideerde actieve records na verwijdering.
5. Een uitgave is pas geaccepteerd nadat tests, voorcontrole, teruglezing van de onveranderlijke versie, de testomgeving en de productieacceptatie afzonderlijk met bewijs zijn gestaafd.

## Publicatieverificatie

GitHub Actions-uitvoering [29788979153](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29788979153) bewees dat de controles voor tweetalige documentatie en de kennisbank slaagden, maar dat de controle voor verificatierapporten faalde omdat beide VR-002-pagina's de voor de gehele opslagplaats verplichte kadermarkering `REQ-0004` misten. De gekoppelde VR-002-correctie maakt deel uit van deze documentatiefase; een nieuwe geslaagde uitvoering is vereist voordat de publicatie als geverifieerd wordt beschouwd.

## Huidige bijwerking van de lokale verificatie

Na de grens van het aangeleverde logboek is kandidaatvastlegging `b5a5452` geslaagd voor alle `432/432` lokale tests en voor `PreflightOnly`. De teruglezing van de voorcontrole meldde stabiele v50, huidige testomgeving `0`, één verouderde testomgevingsimplementatie en `readyToStage=true`. Hiermee wordt v55 opgewaardeerd van uitsluitend broncode (`unverified`) naar lokaal geverifieerd; implementatie in de testomgeving en gecontroleerde actieve acceptatie van één kaart per bericht blijven `unverified`.

## Bijwerking van het VR-003-bewijs (2026-07-21)

[VR-003](verificatierapporten/rapporten/VR-003/OVERZICHT.md) deelt het verslag van de twee sessies onafhankelijk in atomaire beweringen in. De bevestigde oorzaken blijven de capaciteitsberekening op basis van de ruwe kaartindex (verholpen in v47), de concurrentie op het gedeelde directe `UserLock` (verholpen in v48) en het uiteenlopen van de stroken voor `SENT+INBOX` (verholpen in v55). De oorzakelijkheid van de OAuth-terugkoppeling en de actieve productieacceptatie blijven expliciet ongeverifieerd of geblokkeerd.
