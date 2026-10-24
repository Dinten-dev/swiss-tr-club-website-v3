# Fairgate-Freigabetest vom 24. Oktober 2026

## Ergebnis

Peters Freigabe ist wirksam: Die V2-API liefert neu Fahrzeugfelder, Geburtsdatum, Co-Pilot-Daten und ein Regionsfeld. Die Prüfung war lesend; es wurden keine Kontakte, Konten, Rollen, Konfigurationen oder Fahrzeuge geändert. Es wurden keine Nachrichten versandt und keine offenen Pull Requests zusammengeführt.

524 Kontakte wurden abgerufen. Die anschliessende Zuordnungsvorschau beschränkt sich auf die 285 bereits mit der Website verknüpften Mitgliedschaften. Diese Zahl ist nicht mit einer neuen Importfreigabe gleichzusetzen.

| Bereich | Tatsächlich gelieferter Pfad / Struktur | Ergebnis bei den 285 bestehenden Verknüpfungen |
|---|---|---|
| Geburtsdatum | `/configured_fields/geburtsdatum` → `birthDate` | 236 gültige Geburtstage, kein ungültiger nichtleerer Datumswert |
| Co-Pilot | `co_pilot_in_vorname`, `co_pilot_in_nachname`, `co_pilot_in_geschlecht`, `co_pilot_in_geburtsdatum`, `co_pilot_in_anredeart`, `co_pilot_in_email`, `co_pilot_in_handy` unter `/configured_fields/` | 135 Co-Piloten mit Vor-/Nachname zuordenbar; davon eine E-Mail, keine Mobilnummer und kein Geburtstag |
| Region | `/configured_fields/region` | Feld ist freigegeben, aber bei sämtlichen 524 API-Kontakten leer. Auch `group_assignments` liefert keine Zuordnungen. Noch keine Region übernehmbar. |
| Abos | Keine entsprechenden Schlüssel in `configured_fields` | Printmagazin und eNewsletter weiterhin nicht freigegeben bzw. nicht im API-Ergebnis vorhanden |
| Fahrzeuge | Bis drei Plätze, Einzelheiten nachfolgend | 271 formal gültige Importkandidaten; 76 ungültige Einträge. Noch kein Import durchgeführt. |

## Geprüfte Fahrzeugzuordnung

| Website-Schlüssel | Fahrzeug 1 | Fahrzeug 2 | Fahrzeug 3 |
|---|---|---|---|
| `model` | `fahrzeug1_typ` | `fahrzeug2_typ` | `fahrzeug3_typ` |
| `details` | `fahrzeug1_modell_details` | `f_z2_modell_details` | `f_z3_modell_details` |
| `year` | `fahrzeug1_jahrgang` | `f_z2_jahrgang` | `f_z3_jahrgang` |
| `exteriorColour` | `fahrzeug1_farbe` | `f_z2_farbe` | `f_z3_farbe` |
| `chassisNumber` | `fahrzeug1_chassis` | `f_z2_chassis` | `f_z3_chassis` |

Alle genannten Schlüssel liegen unter `/configured_fields/`. Das ebenfalls gelieferte allgemeine Feld `fahrzeug_kennzeichen` wurde keinem Fahrzeugplatz zugeordnet, da seine Zuordnung zu Fahrzeug 1, 2 oder 3 nicht bestätigt ist. Innenfarbe wird nicht geliefert.

Die vorhandene Website-Validierung weist 70 Modellangaben und sechs Baujahre ab. Die sechs Baujahre enthalten `?`. Unter den nicht akzeptierten Modellangaben befinden sich 25-mal `TR3/A/B`, 14-mal `kein TR`, 14-mal ein leerer Typ bei sonst gefüllten Fahrzeugangaben sowie Varianten wie `TR4A IRS`, `TR6 RHD`, `Spitfire IV` und Fremdfahrzeuge. Das ist kein Beweis einer fehlerhaften API: Die Werte sind jetzt sichtbar, entsprechen aber noch nicht dem engeren Website-Modellkatalog.

Vor einer Übernahme braucht es eine explizite Importnormalisierung mit Erhalt der Originalvariante in `details` sowie eine Behandlung von «kein TR», unbekannten Baujahren und Fremdfahrzeugen. `TR3/A/B` darf nicht ohne weitere Information einem konkreten Untermodell zugeordnet werden. Ein Import über die bisherige `apply`-Methode würde wegen der ungültigen Einträge insgesamt abgebrochen; der vorgeschlagene rohe Pfadsatz ist deshalb noch keine freigegebene produktive Fahrzeugkonfiguration.

## Was Peter noch prüfen muss

1. Das neue Regionsfeld mit den tatsächlichen Hauptregionen befüllen oder die vorhandene Fairgate-Stamm-/Regionszuordnung für die API freigeben. Ein neues leeres Feld stellt keine vorhandenen Regionsdaten bereit.
2. Den tatsächlichen Printmagazin- und eNewsletter-Bezug für den vorhandenen API-Zugang freigeben; beide Werte fehlen weiterhin.
3. Falls Co-Pilot-Geburtstage und Mobilnummern in alten Feldern vorhanden sind, Werte gesichert in die freigegebenen Felder übertragen oder die ursprünglichen Felder freigeben. Die neuen Felder sind zugänglich, aber leer. Keine Altfelder löschen.
4. Das verbindliche Filtermerkmal für die «grün markierten effektiven Mitglieder» benennen beziehungsweise in der API bereitstellen: **Alle 524 gelieferten Kontakte melden `status=active`**, obwohl 226 keine Mitgliedschaftsbezeichnung haben. Die übrigen 298 enthalten 269 Einzelmitglieder, 14 TRiungster, 14 Ehrenmitglieder und ein Paarmitglied. Eine pauschale Übernahme anhand von `active` wäre daher falsch. Ausländische Anschriften werden nicht ungeprüft als Ausschlussgrund verwendet. Die vorhandenen 285 Konten wurden weder erweitert noch gelöscht.

## Weitere Punkte aus Peters Nachrichten

- Der gemeinsame Testerzugang `strc-test` mit dem vorhandenen Passwort wurde direkt geprüft: ohne Testzugang HTTP 401, damit HTTP 200. Anschliessend erfolgt die persönliche Anmeldung beziehungsweise Passwort-Einrichtung mit der bereits importierten E-Mail. Kein Passwort wird in diesem Bericht veröffentlicht.
- PR #27 ist bereits veröffentlicht. Neu offen sind #28 (Mobilnummer) und #29 (Kosmetik). Die reale WooCommerce-Option steht auf `optional`; der neue PR #28 ergänzt Darstellung und serverseitige Prüfung. Beide PRs wurden in diesem Prüfauftrag nur gelesen, nicht übernommen.
- Peters Konto `nyf1@bluewin.ch` zeigt bereits «Peter Nyffenegger» und hat Mitglied + Superadmin. Seine Selbstbearbeitung ist durch die Rollenlogik grundsätzlich ausgeschlossen. Es wurde keine Vorstandsrolle ohne gesonderte Zuweisung vergeben.
- TRiungsters als zusätzliche «Region», eine eigene Agenda-Moderatorrolle, die gewünschte Selbstzuweisung und die Dokument-Löschbedienung sind damit noch nicht umgesetzt. Mitgliedschaftstyp TRiungster ist bereits bekannt; das ist bisher keine eigene Region.
- Ein persönliches Webmaster-Porträt wurde nicht bereitgestellt oder erfunden.

## Nachweise

Private Originalantwort, Feldbericht, geprüfte Pfadzuordnung, Importvorschau und Zugangsnachweis liegen unter `.private/fairgate-fields-2026-10-24/`. Dieser Bericht enthält keine Kontakte, Kennzeichen, Chassisnummern, Geburtstage oder Zugangsdaten. Vor einer späteren Änderung müssen aktuelle Staging-Dateien und betroffene Daten erneut gesichert und abgeglichen werden.
