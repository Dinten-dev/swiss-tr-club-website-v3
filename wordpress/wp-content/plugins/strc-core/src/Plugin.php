<?php

declare(strict_types=1);

namespace SwissTRClub\Core;

use SwissTRClub\Core\Admin\FairgateAdministrationPage;
use SwissTRClub\Core\Admin\SystemStatusPage;
use SwissTRClub\Core\Content\ContentPostTypes;
use SwissTRClub\Core\Dashboard\DashboardShortcode;
use SwissTRClub\Core\Events\EventPostType;
use SwissTRClub\Core\Events\EventPublicEndpoint;
use SwissTRClub\Core\Mail\MailConfiguration;
use SwissTRClub\Core\Marketplace\MarketplaceEndpoint;
use SwissTRClub\Core\Integrations\Fairgate\FairgateConfiguration;
use SwissTRClub\Core\Members\MemberProfileFields;
use SwissTRClub\Core\Members\MemberSessionEndpoint;
use SwissTRClub\Core\Members\MembershipAccessGuard;
use SwissTRClub\Core\Members\MembershipRepository;
use SwissTRClub\Core\Roles\RoleManager;

final class Plugin
{
    private static bool $booted = false;

    public static function boot(): void
    {
        if (self::$booted) {
            return;
        }

        self::$booted = true;
        \SwissTRClub\Core\Infrastructure\StagingAccessLoopback::registerHooks();
        add_filter('determine_locale',static function(string $locale):string{if(!is_admin()||wp_doing_ajax())return ($_COOKIE['strc_language']??'')==='fr'?'fr_FR':'de_CH';return $locale;});
        add_action('init', array(\SwissTRClub\Core\Http\UserLanguage::class, 'rememberSelection'));

        if ('20260926-2' !== get_option('strc_core_schema_version')) {
            \SwissTRClub\Core\Infrastructure\Schema::installNewsletter();
            update_option('strc_core_schema_version', '20260926-2', false);
        }

        (new RoleManager())->registerHooks();
        (new \SwissTRClub\Core\Forms\FormsEndpoint())->registerHooks();
        (new \SwissTRClub\Core\Forms\EventRegistration())->registerHooks();
        (new \SwissTRClub\Core\Forms\EventPayments())->registerHooks();
        (new \SwissTRClub\Core\Forms\EventFinance())->registerHooks();
        (new \SwissTRClub\Core\Editorial\EditorialEndpoint())->registerHooks();
        (new EventPostType())->registerHooks();
        (new EventPublicEndpoint())->registerHooks();
        (new \SwissTRClub\Core\Events\RegionalEventAccess())->registerHooks();
        (new \SwissTRClub\Core\Events\EventManagementEndpoint())->registerHooks();
        (new \SwissTRClub\Core\Community\CommunityEndpoint())->registerHooks();
        (new \SwissTRClub\Core\Community\CatalogSettings())->registerHooks();
        (new \SwissTRClub\Core\Community\ForumSettings())->registerHooks();
        (new \SwissTRClub\Core\Community\ReviewNotificationSettings())->registerHooks();
        (new \SwissTRClub\Core\Infrastructure\MacRomanRepair())->registerHooks();
        (new \SwissTRClub\Core\Community\GalleryRetention())->registerHooks();
        if(defined('WP_CLI')&&WP_CLI)\SwissTRClub\Core\Community\LibraryImportCommand::register();
        (new ContentPostTypes())->registerHooks();
        (new \SwissTRClub\Core\Content\HomepageEndpoint())->registerHooks();
        (new \SwissTRClub\Core\Content\MagazineEndpoint())->registerHooks();
        (new MarketplaceEndpoint())->registerHooks();
        (new \SwissTRClub\Core\Shop\ShopEndpoint())->registerHooks();
        (new \SwissTRClub\Core\Shop\ShippingPartner())->registerHooks();
        (new \SwissTRClub\Core\Shop\ShopInvoice())->registerHooks();
        (new \SwissTRClub\Core\Forms\EventInvoice())->registerHooks();
        (new DashboardShortcode())->registerHooks();
        $fairgate = FairgateConfiguration::fromConstants();
        (new SystemStatusPage($fairgate))->registerHooks();
        $gateway = new \SwissTRClub\Core\Integrations\Fairgate\FairgateGateway(new \SwissTRClub\Core\Integrations\Fairgate\FairgateClient($fairgate), $fairgate);
        $admission = new \SwissTRClub\Core\Members\ApplicationAdmission($gateway, $fairgate, \SwissTRClub\Core\Integrations\Fairgate\FairgateOnboardingSettings::fromConstants());
        $admission->registerHooks();
        (new \SwissTRClub\Core\Forms\ApplicationInbox($admission))->registerHooks();
        $sync = new \SwissTRClub\Core\Integrations\Fairgate\FairgateMemberSync($gateway, \SwissTRClub\Core\Integrations\Fairgate\FairgateMemberMapping::fromConstants());
        (new FairgateAdministrationPage($fairgate, $gateway, $sync))->registerHooks();
        $memberImport = new \SwissTRClub\Core\Integrations\Fairgate\FairgateStagingImport($gateway);
        $memberImport->registerHooks();
        (new \SwissTRClub\Core\Integrations\Fairgate\FairgateWebhook($memberImport))->registerHooks();
        (new \SwissTRClub\Core\Admin\FairgateImportPage($memberImport))->registerHooks();
        (new \SwissTRClub\Core\Admin\MemberSetupPage(new \SwissTRClub\Core\Members\MemberSetupPreparation($memberImport)))->registerHooks();
        (new \SwissTRClub\Core\Integrations\Fairgate\FairgateApplications($gateway, $fairgate, \SwissTRClub\Core\Integrations\Fairgate\FairgateApplicationSettings::fromConstants()))->registerHooks();
        (new MemberProfileFields())->registerHooks();
        (new MailConfiguration())->registerHooks();
        (new \SwissTRClub\Core\Admin\WelcomeMailSettingsPage())->registerHooks();
        (new \SwissTRClub\Core\Mail\ApplicationNotification())->registerHooks();
        (new \SwissTRClub\Core\Mail\NewsletterEndpoint())->registerHooks();

        $memberships = new MembershipRepository();
        (new MembershipAccessGuard($memberships))->registerHooks();
        (new MemberSessionEndpoint($memberships))->registerHooks();
        (new \SwissTRClub\Core\Members\MemberDirectoryEndpoint())->registerHooks();
        (new \SwissTRClub\Core\Members\MemberLoginExperience())->registerHooks();
        (new \SwissTRClub\Core\Dashboard\MemberDashboardEndpoint())->registerHooks();
    }
}
