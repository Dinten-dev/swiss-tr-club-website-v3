<?php
/** wp --user=<authorized operator> eval-file scripts/fairgate-vehicle-import.php preview|apply */
if(!defined('WP_CLI')||!WP_CLI||!current_user_can('strc_manage_members'))throw new RuntimeException('Mitgliederverwaltung erforderlich.');
$mode=$args[0]??'preview';
if(!in_array($mode,['preview','apply'],true))throw new InvalidArgumentException('preview oder apply wählen.');
$import=SwissTRClub\Core\Integrations\Fairgate\FairgateVehicleImport::fromConstants();
if(!$import->ready())throw new RuntimeException('STRC_FAIRGATE_VEHICLE_FIELDS muss auf tatsächlich freigegebene API-Felder zeigen.');
$config=SwissTRClub\Core\Integrations\Fairgate\FairgateConfiguration::fromConstants();
$gateway=new SwissTRClub\Core\Integrations\Fairgate\FairgateGateway(new SwissTRClub\Core\Integrations\Fairgate\FairgateClient($config),$config);
$contacts=(new SwissTRClub\Core\Integrations\Fairgate\FairgateStagingImport($gateway))->fetch();
echo wp_json_encode($mode==='apply'?$import->apply($contacts):$import->plan($contacts),JSON_PRETTY_PRINT);
