<?php
/**
 * Plugin Name: STRC Core
 * Description: Club-specific business logic for the Swiss TR-Club website.
 * Version: 0.10.0
 * Requires at least: 7.1
 * Requires PHP: 8.3
 * Author: Swiss TR-Club
 * License: GPL-2.0-or-later
 * Text Domain: strc-core
 */

declare(strict_types=1);

namespace SwissTRClub\Core;

use SwissTRClub\Core\Infrastructure\Activator;

if (! defined('ABSPATH')) {
    exit;
}

define('STRC_CORE_VERSION', '0.10.0');
define('STRC_CORE_FILE', __FILE__);
define('STRC_CORE_PATH', plugin_dir_path(__FILE__));

if (file_exists(STRC_CORE_PATH . 'vendor/autoload.php')) {
    require_once STRC_CORE_PATH . 'vendor/autoload.php';
}

require_once STRC_CORE_PATH . 'src/Roles/RoleDefinitions.php';
require_once STRC_CORE_PATH . 'src/Roles/RoleManager.php';
require_once STRC_CORE_PATH . 'src/Events/EventPostType.php';
require_once STRC_CORE_PATH . 'src/Events/EventArchiveRetention.php';
require_once STRC_CORE_PATH . 'src/Events/RegionDirectory.php';
require_once STRC_CORE_PATH . 'src/Events/EventPublicEndpoint.php';
require_once STRC_CORE_PATH . 'src/Http/AjaxRequest.php';
require_once STRC_CORE_PATH . 'src/Editorial/EditorialAccess.php';
require_once STRC_CORE_PATH . 'src/Editorial/EditorialEndpoint.php';
require_once STRC_CORE_PATH . 'src/Events/RegionalEventAccess.php';
require_once STRC_CORE_PATH . 'src/Events/EventManagementEndpoint.php';
require_once STRC_CORE_PATH . 'src/Community/PrivateUploadStore.php';
require_once STRC_CORE_PATH . 'src/Community/LibraryPolicy.php';
require_once STRC_CORE_PATH . 'src/Community/LibraryImportCommand.php';
require_once STRC_CORE_PATH . 'src/Community/CommunityEndpoint.php';
require_once STRC_CORE_PATH . 'src/Content/ContentPostTypes.php';
require_once STRC_CORE_PATH . 'src/Content/HomepageEndpoint.php';
require_once STRC_CORE_PATH . 'src/Marketplace/MarketplaceEndpoint.php';
require_once STRC_CORE_PATH . 'src/Shop/ShopAccessPolicy.php';
require_once STRC_CORE_PATH . 'src/Shop/ShopEndpoint.php';
require_once STRC_CORE_PATH . 'src/Integrations/Fairgate/FairgateApiException.php';
require_once STRC_CORE_PATH . 'src/Integrations/Fairgate/FairgateConfiguration.php';
require_once STRC_CORE_PATH . 'src/Integrations/Fairgate/FairgateClient.php';
require_once STRC_CORE_PATH . 'src/Infrastructure/Schema.php';
require_once STRC_CORE_PATH . 'src/Members/MembershipRepository.php';
require_once STRC_CORE_PATH . 'src/Members/MembershipAccessPolicy.php';
require_once STRC_CORE_PATH . 'src/Members/MembershipTypePolicy.php';
require_once STRC_CORE_PATH . 'src/Members/MembershipAccessGuard.php';
require_once STRC_CORE_PATH . 'src/Members/MemberSessionEndpoint.php';
require_once STRC_CORE_PATH . 'src/Members/MemberProfileFields.php';
require_once STRC_CORE_PATH . 'src/Members/MemberSetupPreparation.php';
require_once STRC_CORE_PATH . 'src/Admin/MemberSetupPage.php';
require_once STRC_CORE_PATH . 'src/Mail/MailConfiguration.php';
require_once STRC_CORE_PATH . 'src/Mail/ApplicationNotification.php';
require_once STRC_CORE_PATH . 'src/Mail/NewsletterEndpoint.php';
require_once STRC_CORE_PATH . 'src/Dashboard/DashboardShortcode.php';
require_once STRC_CORE_PATH . 'src/Admin/SystemStatusPage.php';
require_once STRC_CORE_PATH . 'src/Admin/FairgateAdministrationPage.php';
require_once STRC_CORE_PATH . 'src/Infrastructure/Activator.php';
require_once STRC_CORE_PATH . 'src/Plugin.php';

register_activation_hook(__FILE__, array(Activator::class, 'activate'));

add_action(
    'plugins_loaded',
    static function (): void {
        Plugin::boot();
    }
);
