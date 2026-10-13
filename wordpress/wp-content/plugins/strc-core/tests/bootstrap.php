<?php

declare(strict_types=1);

require_once dirname(__DIR__) . '/src/Roles/RoleDefinitions.php';
require_once dirname(__DIR__) . '/src/Mail/WelcomeMailSettings.php';
require_once dirname(__DIR__) . '/src/Finance/QrReference.php';
require_once dirname(__DIR__) . '/src/Members/MembershipAccessPolicy.php';
require_once dirname(__DIR__) . '/src/Members/MembershipTypePolicy.php';
require_once dirname(__DIR__) . '/src/Events/EventArchiveRetention.php';
require_once dirname(__DIR__) . '/src/Events/RegionDirectory.php';
require_once dirname(__DIR__) . '/src/Shop/ShopAccessPolicy.php';
require_once dirname(__DIR__) . '/src/Members/MemberCsvReader.php';
require_once dirname(__DIR__) . '/src/Integrations/Fairgate/FairgateApiException.php';
require_once dirname(__DIR__) . '/src/Integrations/Fairgate/FairgateConfiguration.php';
require_once dirname(__DIR__) . '/src/Integrations/Fairgate/FairgateClient.php';
require_once dirname(__DIR__) . '/src/Integrations/Fairgate/FairgateMemberMapping.php';
