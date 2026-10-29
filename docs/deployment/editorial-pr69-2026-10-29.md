# Redaktionsentscheid vom 29.10.2026: PR 69

Diese Freigabe setzt Peters fachliche Vorgaben um. Die vorherigen
Integrationsnotizen zu PR 66 und 67 beschreiben einen historischen Zwischenschritt.

## Verbindliches Verhalten

- Galerieoriginale laufen vier Monate nach dem Upload ab, unabhängig von alten
  Verlängerungsmarkierungen. Fehlt das Uploaddatum, zählt das Erstellungsdatum
  des Albums. Der Verlängerungsschalter entfällt.
- Mitgliederporträts sind Profilinhalt und bleiben ausgenommen.
- Vor dem Löschen wird eine Webkopie angefordert. Ohne vorhandene Webkopie
  verweigert der Dateispeicher das Löschen des Originals.
- Der Agenda-Slider erhält keinen zusätzlichen Pause-Knopf. Bei Mauszeiger,
  Tastaturfokus, verborgenem Browser-Tab oder reduzierter Bewegung pausiert er
  weiterhin. Die Plakatvergrösserung bleibt erhalten.
- STRC Admin und Superadmin übersteuern die Vorstandsstufe. Vorstand allein
  gewährt Leserechte; Bibliotheksmoderation allein gewährt keinen Vorstandszugriff.
  Vorstand plus Bibliotheksmoderation darf die Dokumente pflegen.
- Endgültiges Löschen von Vorstandsunterlagen bleibt auch für Admins gesperrt.
- Die 16-MB-Fotogrenze und die übrigen Sicherheitskorrekturen bleiben erhalten.

## Integration und Prüfungen

- Keine fachliche Umgestaltung gegenüber PR 69. Ergänzt werden Regressionen
  für die tatsächlichen Admin-Rollen und ihre Archivaktionen.
- Tests umfassen 18 Upload-/Passwort-/Sliderprüfungen, die native PHP-Suite,
  65 Sicherheitsprüfungen, 63 Baur-/Mailprüfungen und Redaktionstests.
- Lint, TypeScript, Anwendungs- und WordPress-Build sowie Strukturprüfung.
- Quelle und erzeugte Website-Dateien werden zusammen versioniert.
- PR 70 ist nicht Teil dieses Freigabepakets.

## Staging

Ziel ist ausschliesslich https://staging.swisstrclub.ch. Vor der Veröffentlichung
werden Datenbank und vollständiges Staging-Webverzeichnis serverseitig und
zugriffsbeschränkt gesichert. Prüfsummen und Archivlesbarkeit werden geprüft.
Der aktuelle Serverstand wurde mit dem letzten verifizierten Release verglichen.
Beim Vorabcheck fiel kein vorhandenes Fotooriginal unter die neue Löschfrist.

Nach der Veröffentlichung werden Programmdateien, Vorstandsrubriken,
Dokumentstatus und Rollenrechte auf dem echten Staging-Backend geprüft.
Synthetische Rollenprüfungen laufen in einer zurückgerollten Transaktion;
Testmails und externe Aufrufe werden abgefangen. Das ist kein Zustellnachweis.
Die zusätzliche Abnahme in `scripts/tests/editorial-staging.php` verwendet
ausschliesslich eigene Testdokumente und Testdateien. Sie prüft die Migration
aller Dokumentstatus, Originalablauf, Webkopien, junge Bilder und Porträts.

Die Aussage «Keine Veröffentlichung auf Staging oder Produktion in diesem
Arbeitsschritt» in früheren Notizen bezeichnet nur die damalige
GitHub-Zusammenführung. Sie verbietet keine spätere, freigegebene Veröffentlichung.

Produktion ist nicht freigegeben und bleibt unverändert. Bei einem Rückfall
werden nur die ausgetauschten Programmdateien nach Prüfsummenvergleich
wiederhergestellt; eine pauschale Datenbankrücksetzung würde parallele Inhalte
überschreiben und ist deshalb nicht vorgesehen.
