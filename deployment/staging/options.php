<?php
/** Non-secret staging defaults. Install privately and include before wp-settings.php. */
if(!defined('STRC_FAIRGATE_SYNC_FIELDS'))define('STRC_FAIRGATE_SYNC_FIELDS',[
    'contactId'=>'/basefields/contact_id',
    'status'=>'/status',
    'startedOn'=>'/membership/first_joining_date',
    'gender'=>'/basefields/gender',
    'language'=>'/basefields/correspondence_language',
]);
if(!defined('STRC_FAIRGATE_STATUS_VALUES'))define('STRC_FAIRGATE_STATUS_VALUES',['active'=>'active','archived'=>'inactive']);
if(!defined('STRC_FAIRGATE_PROFILE_WRITE'))define('STRC_FAIRGATE_PROFILE_WRITE',['enabled'=>false]);
// Rechnungen Shop/Anlässe (ADR 0003): Rechnungssteller und QR-IBAN wie auf den Fairgate-Rechnungen; nicht geheim.
if(!defined('STRC_BILLING_CREDITOR'))define('STRC_BILLING_CREDITOR',['name'=>'The Swiss TR-Club','street'=>'Sonnenbergstrasse','house_number'=>'24c','postcode'=>'9524','city'=>'Zuzwil','country'=>'CH','qr_iban'=>'CH753000523397351041H','web'=>'www.swisstrclub.ch']);
// Fairgate-Referenzen: 225480 + 0…; Website: 2254809 + Dokumentart (1 Shop, 2 Anlass) → nie überschneidend.
if(!defined('STRC_QR_REFERENCE_PREFIX'))define('STRC_QR_REFERENCE_PREFIX','2254809');
if(!defined('STRC_WHATSAPP_TEMPLATE_DE'))define('STRC_WHATSAPP_TEMPLATE_DE','tr_forum_de');
if(!defined('STRC_WHATSAPP_TEMPLATE_FR'))define('STRC_WHATSAPP_TEMPLATE_FR','tr_forum_fr');
if(!defined('STRC_MAKE_WHATSAPP_ENABLED'))define('STRC_MAKE_WHATSAPP_ENABLED',false);
if(!defined('STRC_ZAHLS_ENABLED'))define('STRC_ZAHLS_ENABLED',false);
if(!defined('STRC_ZAHLS_MODE'))define('STRC_ZAHLS_MODE','TEST');
// Never guess inaccessible vehicle, birth-date, copilot or subscription field identifiers.
// API keys and webhook secrets belong only in the server's private configuration.
