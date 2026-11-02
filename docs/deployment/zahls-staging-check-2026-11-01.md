# zahls.ch: Verbindungsprüfung auf Staging

Stand: 01.11.2026. Ziel: `https://staging.swisstrclub.ch`. Installiertes zahls.ch-Plugin: 2.0.7.

## Befund

- Der API-Schlüssel ist in WooCommerce vorhanden. Das installierte Plugin liest `apiKey` und verwendet andernfalls das ältere Feld `sid`.
- Der bisherige Website-Check las ausschliesslich `api_key`. Die Korrektur erkennt die tatsächlich verwendeten Felder; die ausdrückliche Zahlungsfreigabe und die Trennung von TEST und LIVE bleiben erforderlich.
- Reine Leseanfragen über die Schnittstelle des installierten Plugins werden mit HTTP 403 und «API is not included in your license.» abgewiesen. Die Provider-Freischaltung allein bestätigt daher noch keine nutzbare API-Anbindung.
- Der lokale Modus steht auf TEST. Der tatsächliche Modus im zahls.ch-Konto konnte wegen der verweigerten API und des fehlenden Dashboard-Zugangs nicht bestätigt oder geändert werden.
- Die Shopfreigabe bleibt ausgeschaltet. Für Anlässe fehlen weiterhin die getrennte API-/Webhook-Konfiguration und der Signaturschlüssel. Es wurde keine Zahlung angelegt oder durchgeführt.

## Webhook und Kontakt

Die vom installierten WooCommerce-Plugin angegebene Adresse lautet:

`https://staging.swisstrclub.ch/?wc-api=wc_zahls_gateway`

Die offizielle [WooCommerce-Anleitung](https://www.zahls.ch/de/hilfe/integration/e-commerce/woocommerce) verlangt dafür einen Webhook mit Inhaltstyp PHP-Post und Ereignis Transaction. Die Einrichtung erfolgt im zahls.ch-Konto, nicht durch das Eintragen einer WooCommerce-Webhook-Ausgangsadresse. Der Nutzer hat die Entfernung des Staging-Passwortschutzes angeordnet. Der WooCommerce-Eingang prüft auf Staging vor der Plugin-Verarbeitung eine HMAC-Signatur über den unveränderten PHP-Post-Inhalt. Der individuelle Schlüssel ist ausschliesslich serverseitig als `STRC_ZAHLS_WOO_WEBHOOK_KEY` zu hinterlegen. Bis dahin werden alle Webhooks abgelehnt. Produktion ist von dieser Prüfung nicht betroffen.

Der Nutzer hat die vorgesehenen technischen Kontaktdaten bestätigt, besitzt aber keinen Zugang zum zahls.ch-Dashboard. Weder Webhook noch technischer Kontakt konnten dort gespeichert werden. Die API-Berechtigung, ein bestätigter Testmodus und die konto-seitige Webhook-Konfiguration sind durch die zuständige Person beziehungsweise zahls.ch zu vervollständigen. Schlüssel gehören ausschliesslich in geschützte Server-/Plugin-Einstellungen.

## Prüfung und Veröffentlichung

Elf isolierte Prüfungen decken die drei unterstützten Schlüsselfelder, Fallback, fehlende Angaben, deaktiviertes Gateway, unbekanntes Gateway, fehlendes WooCommerce sowie den Schutz von Produktion und ausdrücklicher Freigabe ab. Der WordPress-Build und das Release-Manifest werden mit der Korrektur aktualisiert.

Die Codekorrektur wird zuerst auf GitHub bereitgestellt. Eine Staging-Veröffentlichung betrifft ausschliesslich die Bereitschaftsprüfung, aktiviert keine Zahlung und ersetzt weder API-Lizenz noch Testmodus- oder Webhook-Abnahme. Konfiguration, Zugangsdaten und echte Clubdaten bleiben erhalten. Produktion bleibt unverändert.


## Veröffentlichtes Prüfergebnis

Die Korrektur ist am 01.11.2026 nach erfolgreicher GitHub-CI auf Staging veröffentlicht: eine PHP-Datei, vorherige Fassung und Rückfallprotokoll unter `/private/strc-peter-release-20261101184524`. Alle 483 Programmdateien entsprechen dem Release-Manifest. Die elf isolierten Prüfungen bestehen auch mit nativem PHP 8.3.36 auf Staging. Plugin-Einstellungen und Freigabeschalter sind unverändert; Online-Zahlung bleibt gesperrt.

Vor der Freigabe antwortete ein nicht authentifizierter POST durch den Staging-Passwortschutz mit HTTP 401. Danach wurde die passwortlose Startseite mit HTTP 200 geprüft; ein unsignierter PHP-Post wird weiterhin von der Signaturprüfung mit HTTP 401 abgewiesen. Der Serverstand der früheren Zugriffskonfiguration liegt unter `/private/strc-staging-backups/20261101T200442Z-webhook-auth/htaccess-before`. Der abschliessende native Lesezugriff auf die Gateway-API bestätigt denselben Lizenzfehler wie die Provider-/Zahlungsmittelabfragen. Kein Checkout und keine Geldbewegung wurden ausgelöst.


Die Webhook-Prüfung ist auf Staging veröffentlicht; der Code liegt in PR #83. Zehn Signatur-/Formatprüfungen, 94 native Rollen-/Sicherheitsprüfungen und der Vergleich aller 484 Programmdateien waren erfolgreich. Die anonyme Mailverwaltung bleibt geschützt. Die frühere Plugin-Version liegt unter `/private/strc-peter-release-20261101200443`. Die Einstellung für Ereignis «Transaction», der Webhook und der individuelle Signaturschlüssel müssen im zahls.ch-Konto eingerichtet werden; ohne Konto-Zugang und API-Lizenz konnte keine echte Testzahlung durchgeführt werden.
