<?php

declare(strict_types=1);

namespace SwissTRClub\Core;

use SwissTRClub\Core\Admin\ClubManagementPage;
use SwissTRClub\Core\Admin\SystemStatusPage;
use SwissTRClub\Core\Content\ContentPostTypes;
use SwissTRClub\Core\Dashboard\DashboardShortcode;
use SwissTRClub\Core\Events\EventPostType;
use SwissTRClub\Core\Finance\CamtImporter;
use SwissTRClub\Core\Finance\InvoiceRepository;
use SwissTRClub\Core\Finance\QrInvoicePdf;
use SwissTRClub\Core\Mail\BulkMailer;
use SwissTRClub\Core\Mail\MailConfiguration;
use SwissTRClub\Core\Members\MemberProfileFields;
use SwissTRClub\Core\Members\MemberCsvImporter;
use SwissTRClub\Core\Members\MemberCsvReader;
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

        (new RoleManager())->registerHooks();
        (new EventPostType())->registerHooks();
        (new ContentPostTypes())->registerHooks();
        (new DashboardShortcode())->registerHooks();
        (new SystemStatusPage())->registerHooks();
        (new MemberProfileFields())->registerHooks();
        (new MailConfiguration())->registerHooks();

        $memberships = new MembershipRepository();
        $memberships->registerHooks();
        (new MembershipAccessGuard($memberships))->registerHooks();
        $invoices = new InvoiceRepository();
        $mailer = new BulkMailer();
        $mailer->registerHooks();

        (new ClubManagementPage(
            $memberships,
            $invoices,
            new CamtImporter($invoices),
            $mailer,
            new QrInvoicePdf(),
            new MemberCsvImporter($memberships, new MemberCsvReader())
        ))->registerHooks();
    }
}
