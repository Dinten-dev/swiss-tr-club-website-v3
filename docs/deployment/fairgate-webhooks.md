# Fairgate-Webhooks

## Ablauf

`POST /wp-json/strc/v1/fairgate/events/<256-Bit-Geheimnis>` quittiert eine Meldung mit HTTP 202, nachdem ein persistenter Auftrag gespeichert wurde. Der HTTP-Empfänger führt keinen Fairgate-Abruf aus und speichert weder Nutzdaten noch den URL-Schlüssel. Meldungen dienen ausschliesslich als Änderungshinweis. Der Worker liest die vollständige Kontaktliste erneut über die authentifizierte API und aktualisiert nur bestehende, verifizierte Kontoverknüpfungen. Neue Konten benötigen weiterhin einen geprüften Import. Fehlende Kontakte führen nicht zur automatischen Löschung.

Der Worker läuft ausschliesslich im Cron-Kontext. Nach der Antwort wird ein geschützter Cron-Loopback gestartet. Ein minütlicher WordPress-Cron-Wächter übernimmt unterbrochene Aufträge. Eine während des Abrufs eingehende Meldung erhält eine neue Revision und bleibt zur Nachverarbeitung erhalten. Fehler bewahren die Warteschlange und verzögern Wiederholungen von einer Minute bis höchstens einer Stunde. Der bisherige tägliche Abgleich bleibt zusätzlich erhalten. Ohne funktionierende WordPress-Cron-Ausführung ist keine garantierte Zustellzeit möglich.

## Absicherung

Die offizielle [Integrator-Anleitung](https://support.fairgate.ch/de/kb/articles/contacts-api-hilfe-fur-integratoren) und [OpenAPI-Spezifikation](https://fsa.fairgate.ch/docs/fsa_openapi3) beschreiben die Subscription-Registrierung. Ein verbindliches Callback-Nutzdatenformat und eine Signaturprüfung sind dort nicht angegeben. Deshalb setzt die Integration keine erfundene Fairgate-Signatur voraus. Sie verwendet einen zufälligen 256-Bit-URL-Schlüssel als geteiltes Geheimnis und übernimmt ausschliesslich Werte aus einem anschliessenden authentifizierten API-Abruf. Das ist eine eigene Zugangssicherung, kein Nachweis einer digitalen Fairgate-Signatur.

Der Schlüssel liegt ausschliesslich in der privaten Serverkonfiguration. Er gehört nicht in Git, Statusseiten, Screenshots oder Supportnachrichten. Callback-URLs können in Fairgate sowie Server-Zugriffsprotokollen vorkommen; diese benötigen die gleiche Zugriffsbeschränkung wie andere Zugangsdaten. Bei möglicher Offenlegung Schlüssel und Subscription gemeinsam wechseln. WordPress prüft ausschliesslich den URL-Parameter mit konstantzeitlichem Vergleich; Body-/Query-Werte ersetzen ihn nicht. Maximal 64 KiB Nutzdaten, keine Weiterleitungen beim API-Zugriff und ausschliesslich HTTPS.

Auf Staging erlaubt die Webserver-Ausnahme ausschliesslich POST auf die exakte geheime Callback-URL. Alle anderen Pfade, Methoden und direkten Ressourcen behalten den bestehenden Passwortschutz. Der Empfänger gewährt keinen Mitglieder- oder Redaktionszugang. Rückschreiben von Kontaktdaten nach Fairgate bleibt in Staging auf Client- und Profilebene gesperrt.

## Einrichtung

Privat vor `wp-settings.php` konfigurieren: `STRC_FAIRGATE_WEBHOOK_ENABLED=true` und `STRC_FAIRGATE_WEBHOOK_SECRET` mit 64 zufälligen Hex-Zeichen. Zusätzlich werden der bestehende lesende API-Zugang und `STRC_FAIRGATE_IMPORT_ENABLED` / `STRC_FAIRGATE_READ_ONLY` benötigt.

`scripts/fairgate-webhook-setup.php` wird ausschliesslich über WP-CLI als berechtigter Webmaster ausgeführt. Ohne Argument zeigt es verfügbare und abonnierte Ereignisse sowie Status ohne Callback-Adresse. Mit `activate` registriert es fehlende, tatsächlich verfügbare Ereignisse und liest die Registrierung zur Bestätigung erneut. Bestehende fremde Callback-Adressen werden nicht überschrieben. Ein unklarer POST-Ausgang wird nicht blind wiederholt; zuerst den aktuellen Subscription-Stand lesen.

Der aktuelle Vereinszugang bietet `contact.data.updated`, `contact.created`, `contact.deleted` und `contact.job.complete`. Die allgemeine Spezifikation nennt zusätzlich Vorstandsfunktionen und Zuordnungen; diese sind für den aktuellen Zugang nicht als verfügbare Ereignisse gemeldet und werden daher nicht registriert.

Unter Werkzeuge → STRC System Status erscheinen Aktivierung, letzte Meldung, letzter erfolgreicher Abgleich, ausstehende Verarbeitung und Fehlerzeitpunkt. Die Warteschlange enthält keine Kontaktwerte. Der bestehende Importbericht enthält die gezielten Aktualisierungen und unverändert ausgelassenen Kontakte.

## Feldfreigaben und Grenzen

Ein Webhook erweitert keine API-Berechtigung. Eintrittsdatum, Geschlecht und Korrespondenzsprache werden anhand bestätigter Zuordnungen synchronisiert. Fahrzeuge, Geburtstage, Co-Pilot und Abos werden vom aktuellen API-Zugang weiterhin nicht geliefert; deren Freigabe muss in Fairgate erfolgen. Es werden keine Feldnamen oder Feld-IDs geraten und keine Fairgate-Kontaktdaten für Tests geändert. Profiländerungen auf Staging bleiben nachvollziehbare Anfragen.

## Rückkehr

Vor Veröffentlichung Programmdateien, `.htaccess`, WordPress-Konfiguration und bestehenden Subscription-Stand privat sichern. Nur selbst registrierte Ereignisse entfernen, deren Callback weiterhin exakt der eigenen Adresse entspricht; fremde spätere Änderungen zuerst klären. Bei Dateirückkehr aktuelle Prüfsummen gegen den installierten Stand abgleichen. Den privaten Include entfernen, Webhook-Cron-Hooks leeren und Warteschlangen-/Statusoptionen nur nach Sicherung entfernen. Den vorhandenen Passwortschutz vollständig wiederherstellen. Keine Mitgliederdatenbank, Inhalte, Rollen oder Uploads zurückspielen.

## Bestätigte Aktivierung am 20. Oktober 2026

Nach ausdrücklicher Nutzerfreigabe wurde der Empfänger auf Staging aktiviert. Alle vier tatsächlich angebotenen Ereignisse sind registriert und lesend bestätigt. Die exakte POST-Ausnahme verwendet eine Apache-kompatible Prüfung der ursprünglichen HTTP-Anfrage, sodass interne WordPress-Weiterleitungen den Zugriff nicht auf andere Ressourcen erweitern. Andere Methoden und Pfade behalten den Passwortschutz.

17 HTTP-Prüfungen bestanden; die gültige Testmeldung wurde in 1,319 Sekunden mit 202 beantwortet. Der reale Cron-Worker schloss den lesenden Abgleich aller 285 bestehenden Mitgliedschaften ohne Fehler ab. Ein vom Verein in Fairgate erzeugtes reales Änderungsereignis wurde nicht absichtlich ausgelöst. Für spätere Prüfung sind letzte Meldung und letzter Abschluss im Systemstatus sichtbar. Die fehlenden Zusatzfeldfreigaben und der Staging-Schreibschutz bleiben bestehen.

Aktivierungsnachweis und vollständiges privates Rückkehrpaket liegen unter `.private/fairgate-webhook-2026-10-20/`, serverseitig unter `/private/strc-peter-release-20261020173307`. Vor Rückkehr eigene registrierte Subscriptions anhand ihrer aktuellen Callback-Adresse prüfen, ausschliesslich eigene Abonnements entfernen und Konfigurations-/Programmprüfsummen abgleichen.
