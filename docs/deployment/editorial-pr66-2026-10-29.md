# Redaktionsänderungen: PR 66

Diese Notiz beschreibt die damalige GitHub-Integration. Die Angaben zur
verlängerten Fotoaufbewahrung werden durch Peters Entscheid in PR 69 ersetzt.
«Keine Veröffentlichung … in diesem Arbeitsschritt» bedeutet ausschliesslich,
dass jener GitHub-Schritt keine Dateien auf dem Server verändert hat.

## Übernommen

- Galerie: neue Bilder sofort für Mitglieder sichtbar, Moderation kann ausblenden;
  keine neue Prüfbenachrichtigung oder Dashboard-Prüfwarteschlange.
- Bibliothek: endgültiges Löschen gewöhnlicher archivierter Dokumente nach
  Bestätigung, ausschliesslich durch die Bibliotheksmoderation.
- Alte Vorstandsrubriken werden stapelweise auf Sitzung beziehungsweise Finanzen
  umgestellt. Dateien, Archivstatus und zusätzliche Klassifikationsfelder bleiben.
- Startseite: Einstieg und Leitbild wechseln im Titelbild; bei reduzierter
  Bewegung erscheinen beide. Partnerlogos bleiben farbig.
- Inseratsanfragen enthalten Angaben zum Inserat und eine Nachrichtenkopie,
  als HTML mit Textalternative und Empfängersprache Deutsch/Französisch.
- Fahrzeuge erscheinen in Erfassungsreihenfolge.

## Integrationskorrekturen

- Sämtliche Rechtekorrekturen aus PR 68 bleiben erhalten. Vorstandszugriff allein
  gewährt weder Bearbeitung, Wiederherstellung noch Löschung fremder Dokumente.
- Die Vorstandsmigration aktualisiert auch den Zugriffs- und Suchindex;
  eigene Kategorien und bestehende Metadaten bleiben erhalten.
- Bereits abgelehnte Album-Entwürfe, archivierte Alben und ausgeblendete Fotos
  werden durch die Freigabemigration nicht veröffentlicht.
- Bestehende Aufbewahrungsentscheidungen für Fotooriginale bleiben wirksam.
  Fehlende Uploaddaten führen nicht zu rückwirkender Löschung. Eine Webkopie
  wird vor Ablauf eines dafür freigegebenen Originals angefordert; bei fehlender
  Webkopie verweigert der bestehende Dateispeicher das Löschen.
- Die vorhandene Uploadgrenze von 16 MB und der Wiederholungsschutz bleiben.
- Neue Galeriehinweise verwenden die Du-Form und französische Übersetzungen.

## Prüfung

- Lokal mit PHP 8.3.33: 65 Sicherheits-, 63 Baur-/Mail- und 21 Redaktionstests.
- Lint, TypeScript, Anwendungsbuild, WordPress-Build, Strukturprüfung und zehn
  Upload-/Passworttests erfolgreich.
- Die lokale PHP-WebAssembly-Laufzeit kann die von PHPUnit verlangten separaten
  nativen PHP-Prozesse nicht starten. Die vollständige native PHP-Suite und
  Syntaxprüfung werden deshalb zusätzlich im GitHub-Quality-Workflow geprüft;
  vor dessen Erfolg erfolgt keine Zusammenführung.
- Quelle und erzeugte Website-Dateien werden zusammen versioniert.
- Keine Veröffentlichung auf Staging oder Produktion in diesem Arbeitsschritt.

Die unabhängige lokale Änderung an
`peter-pr56-pr58-2026-10-27.md` gehört nicht zu dieser Integration.
