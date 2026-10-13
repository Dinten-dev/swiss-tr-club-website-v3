# Staging-Stand vom 13. Oktober 2026

`main` enthält den gesicherten Programmstand von https://staging.swisstrclub.ch/:

- vollständiges STRC-Core-Plugin und STRC-App-Theme;
- ausgeliefertes Frontend inklusive zusätzlicher Bundle-Anpassungen, Bilder und PDF-Ressourcen;
- vorhandene React-/TypeScript-Quellen, Abhängigkeiten und Tests;
- Dateiprüfsummen in `deployment/staging/manifest.json`;
- WordPress 7.1.3, WooCommerce 11.1.2 und zahls.ch-Gateway 2.0.7 als dokumentierte Laufzeitversionen.

Die gesicherten Programmdateien wurden ausschließlich vom Server gelesen. Die Datenbank, redaktionelle Beiträge, Mitgliederdaten, Uploads, erzeugte Importkataloge und Zugangsdaten gehören zum bestehenden Serverbestand und werden durch diesen Repository-Abgleich nicht verändert oder veröffentlicht. Composer-Abhängigkeiten werden mit `composer install` anhand des vorhandenen Lockfiles hergestellt. WordPress und die beiden Drittanbieter-Plugins werden in den oben genannten Versionen installiert.

## Reproduzieren und prüfen

```sh
cd frontend
npm ci
npm run lint
npm run build:wordpress
cd ..
node scripts/verify-staging-snapshot.mjs
```

Einige Änderungen auf Staging wurden im ausgelieferten JavaScript vorgenommen. Sie sind vollständig als überprüfbare Delta-Datei `deployment/staging/app.bundle.delta.json` erfasst. Der WordPress-Build erstellt zuerst das vorhandene Frontend in einem temporären Verzeichnis und ergänzt danach genau diese Änderungen. Ausgangs- und Ergebnisdatei werden per SHA-256 geprüft. Alle aktuell verwendeten JavaScript-Dateien und das CSS müssen dem gesicherten Staging-Stand entsprechen. Vorhandene ältere Chunks werden ebenfalls erhalten und durch das Manifest geprüft.

`npm run build:wordpress:source` baut ausschließlich die React-/TypeScript-Quellen. Bei späteren Änderungen müssen die erfassten Bundle-Anpassungen in die ursprünglichen Komponenten übernommen oder die Delta-Datei bewusst aktualisiert werden. Ein veränderter Ausgangsbuild bricht den Snapshot-Build ab, damit diese Anpassungen nicht unbemerkt verschwinden.

## Konfiguration und Veröffentlichung

Eine persönliche Empfängeradresse war im Staging-Code der Antragsbenachrichtigung fest eingetragen. Im Repository wird dafür die WordPress-Einstellung `admin_email` verwendet. Auf Staging wurde lesend bestätigt, dass beide Empfänger identisch sind. Das Manifest kennzeichnet diese reine Konfigurationsnormalisierung und enthält die ursprüngliche Dateiprüfsumme, aber keine persönliche Adresse.

Die fertigen Programmdateien liegen unter `wordpress/wp-content/plugins/strc-core/` und `wordpress/wp-content/themes/strc-app/`. Eine spätere Veröffentlichung darf nur diese Programmdateien austauschen. Sie darf weder die Datenbank importieren noch vorhandene Beiträge, Einstellungen, Mitgliederdaten oder Uploads ersetzen. Dieser Abgleich veröffentlicht nichts auf der Website und löst keinen E-Mail- oder Fairgate-Vorgang aus.
