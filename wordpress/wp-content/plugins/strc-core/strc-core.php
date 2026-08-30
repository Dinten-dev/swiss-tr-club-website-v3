<?php
/**
 * Plugin Name: STRC Core
 * Description: Club-specific business logic for the Swiss TR-Club website.
 * Version: 0.7.0
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

define('STRC_CORE_VERSION', '0.7.0');
define('STRC_CORE_FILE', __FILE__);
define('STRC_CORE_PATH', plugin_dir_path(__FILE__));

if (file_exists(STRC_CORE_PATH . 'vendor/autoload.php')) {
    require_once STRC_CORE_PATH . 'vendor/autoload.php';
}

require_once STRC_CORE_PATH . 'src/Roles/RoleDefinitions.php';
require_once STRC_CORE_PATH . 'src/Roles/RoleManager.php';
require_once STRC_CORE_PATH . 'src/Events/EventPostType.php';
require_once STRC_CORE_PATH . 'src/Events/EventPublicEndpoint.php';
require_once STRC_CORE_PATH . 'src/Content/ContentPostTypes.php';
require_once STRC_CORE_PATH . 'src/Infrastructure/Schema.php';
require_once STRC_CORE_PATH . 'src/Members/MembershipRepository.php';
require_once STRC_CORE_PATH . 'src/Members/MembershipAccessPolicy.php';
require_once STRC_CORE_PATH . 'src/Members/MembershipTypePolicy.php';
require_once STRC_CORE_PATH . 'src/Members/MembershipAccessGuard.php';
require_once STRC_CORE_PATH . 'src/Members/MemberCsvReader.php';
require_once STRC_CORE_PATH . 'src/Members/MemberCsvImporter.php';
require_once STRC_CORE_PATH . 'src/Members/MemberActivationMailer.php';
require_once STRC_CORE_PATH . 'src/Members/MemberSessionEndpoint.php';
require_once STRC_CORE_PATH . 'src/Members/MemberProfileFields.php';
require_once STRC_CORE_PATH . 'src/Finance/QrReference.php';
require_once STRC_CORE_PATH . 'src/Finance/InvoiceRepository.php';
require_once STRC_CORE_PATH . 'src/Finance/CamtImporter.php';
require_once STRC_CORE_PATH . 'src/Finance/QrInvoicePdf.php';
require_once STRC_CORE_PATH . 'src/Mail/BulkMailer.php';
require_once STRC_CORE_PATH . 'src/Mail/MailConfiguration.php';
require_once STRC_CORE_PATH . 'src/Dashboard/DashboardShortcode.php';
require_once STRC_CORE_PATH . 'src/Admin/SystemStatusPage.php';
require_once STRC_CORE_PATH . 'src/Admin/ClubManagementPage.php';
require_once STRC_CORE_PATH . 'src/Infrastructure/Activator.php';
require_once STRC_CORE_PATH . 'src/Plugin.php';

register_activation_hook(__FILE__, array(Activator::class, 'activate'));

add_action(
    'plugins_loaded',
    static function (): void {
        Plugin::boot();
    }
);
