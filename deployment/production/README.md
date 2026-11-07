# Produktionsstand vom 7. November 2026

Der Manifestabgleich erfasst die im Repository verwalteten Programmdateien des aktiven Themes `strc-app` und des Plugins `strc-core`. Die Git-Blob-Hashes in `program-manifest-2026-11-07.json` stammen aus einem lesenden Vergleich mit dem Produktionsserver. Das alternative Theme `strc` liegt im Repository, ist aber nicht auf dem Produktionsserver installiert.

Zum Prüfzeitpunkt: WordPress 7.1.4, PHP 8.3.36, WooCommerce 11.2.2, Zahls-Plugin 2.0.7 und STRC Core 0.10.0. Drittanbieter und Composer-Abhängigkeiten werden gemäss ihren Paketdefinitionen installiert und nicht als Vendor-Kopien übernommen.

Der Produktionsserver enthält zusätzliche betriebsspezifische MU-Plugins: eine Sperre für ein Testkonto und eine vorübergehende, kontobeschränkte Zahls-Testfreigabe. Zahls war beim Abgleich nicht allgemein freigegeben; die Rückmeldung einer Testzahlung war noch ungeklärt. Diese lokalen Schalter sind kein Bestandteil des Anwendungscodes in diesem Repository und dürfen bei einer Neuinstallation nicht ungeprüft übernommen werden.

Dieses öffentliche Repository enthält keine Produktionsdatenbank, Mitgliederkonten, persönlichen Dokumente, Uploads, Zugangsdaten oder geheimen Serverkonfigurationen. Es ist daher ein Programmstand und keine vollständige Sicherung oder Wiederherstellung der laufenden Website. Die Staging-Momentaufnahme bleibt separat dokumentiert und ist nicht identisch mit der Produktionskonfiguration.
