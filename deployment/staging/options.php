<?php
/** Non-secret staging defaults. Install privately and include before wp-settings.php. */
// Feldschlüssel gemäss Fairgate «Kontaktfeldzuordnung für API-Antwort» (Peter, 25.10.2026) und Prüfbericht docs/deployment/fairgate-check-2026-10-24.md.
if(!defined('STRC_FAIRGATE_SYNC_FIELDS'))define('STRC_FAIRGATE_SYNC_FIELDS',[
    'contactId'=>'/basefields/contact_id',
    'status'=>'/status',
    'startedOn'=>'/membership/first_joining_date',
    'gender'=>'/basefields/gender',
    'language'=>'/basefields/correspondence_language',
    'birthDate'=>'/configured_fields/geburtsdatum',
    // Nur vom Mitgliederimport gelesen; leere oder unplausible Nummern lassen den bisherigen Wert stehen.
    'memberNumber'=>'/configured_fields/mitglieder_nummer',
    // Unbekannte Werte werden übersprungen (Website zeigt dann «abonniert»).
    'printMagazine'=>'/configured_fields/t_r_magazin',
    'eNewsletter'=>'/configured_fields/e_newsletter',
    'copilotFirstName'=>'/configured_fields/co_pilot_in_vorname',
    'copilotLastName'=>'/configured_fields/co_pilot_in_nachname',
    'copilotGender'=>'/configured_fields/co_pilot_in_geschlecht',
    'copilotBirthDate'=>'/configured_fields/co_pilot_in_geburtsdatum',
    'copilotSalutation'=>'/configured_fields/co_pilot_in_anredeart',
    'copilotEmail'=>'/configured_fields/co_pilot_in_email',
    'copilotPhone'=>'/configured_fields/co_pilot_in_handy',
    // 'region' bewusst noch nicht: /configured_fields/region ist bei allen Kontakten leer und würde lokale Regionen leeren.
]);
// Fahrzeuge (Import nur über Vorschau → Übernehmen; Normalisierung PR #33). fahrzeug_kennzeichen ist keinem Platz sicher zugeordnet.
if(!defined('STRC_FAIRGATE_VEHICLE_FIELDS'))define('STRC_FAIRGATE_VEHICLE_FIELDS',[
    ['model'=>'/configured_fields/fahrzeug1_typ','details'=>'/configured_fields/fahrzeug1_modell_details','year'=>'/configured_fields/fahrzeug1_jahrgang','exteriorColour'=>'/configured_fields/fahrzeug1_farbe','chassisNumber'=>'/configured_fields/fahrzeug1_chassis'],
    ['model'=>'/configured_fields/fahrzeug2_typ','details'=>'/configured_fields/f_z2_modell_details','year'=>'/configured_fields/f_z2_jahrgang','exteriorColour'=>'/configured_fields/f_z2_farbe','chassisNumber'=>'/configured_fields/f_z2_chassis'],
    ['model'=>'/configured_fields/fahrzeug3_typ','details'=>'/configured_fields/f_z3_modell_details','year'=>'/configured_fields/f_z3_jahrgang','exteriorColour'=>'/configured_fields/f_z3_farbe','chassisNumber'=>'/configured_fields/f_z3_chassis'],
]);
// Paarmitgliedschaft (Label im Fairgate-Feld «Mitgliedschaft», für beide Partner gleich).
if(!defined('STRC_FAIRGATE_COUPLE_LABELS'))define('STRC_FAIRGATE_COUPLE_LABELS',['Paarmitglied']);
if(!defined('STRC_FAIRGATE_STATUS_VALUES'))define('STRC_FAIRGATE_STATUS_VALUES',['active'=>'active','archived'=>'inactive']);
// Schreiben nach Fairgate: nur Co-Pilot-Textfelder für den Paar-Antrag (Vorstandsfreigabe 25.10.2026).
// Geschlecht, Geburtsdatum und Anrede erst ergänzen, wenn das Werteformat der Fairgate-Felder bestätigt ist.
// Mitgliederfelder ('fields') bleiben aus: Profiländerungen der Tester gehen weiter ins Postfach der Mitgliederverwaltung.
if(!defined('STRC_FAIRGATE_PROFILE_WRITE'))define('STRC_FAIRGATE_PROFILE_WRITE',['enabled'=>true,'copilot'=>[
    'first_name'=>'co_pilot_in_vorname',
    'last_name'=>'co_pilot_in_nachname',
    'email'=>'co_pilot_in_email',
    'phone'=>'co_pilot_in_handy',
]]);
if(!defined('STRC_FAIRGATE_STAGING_COPILOT_WRITE'))define('STRC_FAIRGATE_STAGING_COPILOT_WRITE',true);
if(!defined('STRC_WHATSAPP_TEMPLATE_DE'))define('STRC_WHATSAPP_TEMPLATE_DE','tr_forum_de');
if(!defined('STRC_WHATSAPP_TEMPLATE_FR'))define('STRC_WHATSAPP_TEMPLATE_FR','tr_forum_fr');
if(!defined('STRC_MAKE_WHATSAPP_ENABLED'))define('STRC_MAKE_WHATSAPP_ENABLED',false);
if(!defined('STRC_ZAHLS_ENABLED'))define('STRC_ZAHLS_ENABLED',false);
if(!defined('STRC_ZAHLS_MODE'))define('STRC_ZAHLS_MODE','TEST');
// Never guess inaccessible field identifiers; all keys above are confirmed in Fairgate.
// API keys and webhook secrets belong only in the server's private configuration.
