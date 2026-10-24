<?php

declare(strict_types=1);

namespace SwissTRClub\Core\Tests;

use PHPUnit\Framework\TestCase;
use SwissTRClub\Core\Roles\RoleDefinitions;

final class RoleDefinitionsTest extends TestCase
{
    public function testEveryRoleCanRead(): void
    {
        foreach (RoleDefinitions::all() as $definition) {
            self::assertTrue($definition['capabilities']['read'] ?? false, $definition['name']);
        }
    }

    public function testMemberCanPublishOwnAdvertsAndTopics(): void
    {
        $member = RoleDefinitions::all()['strc_member']['capabilities'];

        self::assertTrue($member['publish_strc_ads']);
        self::assertTrue($member['publish_strc_topics']);
        self::assertArrayNotHasKey('edit_others_strc_ads', $member);
    }

    public function testForumExpertIsNotAnAdministrativeRole(): void
    {
        self::assertArrayNotHasKey('strc_forum_expert', RoleDefinitions::all());
    }

    public function testAdministratorCanManageEventsAndDrives(): void
    {
        $administrator = RoleDefinitions::all()['strc_administrator']['capabilities'];

        self::assertTrue($administrator['publish_strc_events']);
        self::assertTrue($administrator['publish_strc_drives']);
        self::assertTrue($administrator['strc_send_bulk_mail']);
        self::assertTrue($administrator['strc_manage_content_roles']);
        self::assertTrue($administrator['strc_edit_website_content']);
        self::assertTrue($administrator['strc_manage_community']);
        self::assertTrue($administrator['strc_manage_shop']);
    }

    public function testMemberAdministrationAndTreasurerAreExclusiveRoles(): void
    {
        foreach (array('strc_administrator', 'strc_superadmin', 'strc_developer') as $slug) {
            $capabilities = RoleDefinitions::all()[$slug]['capabilities'];
            self::assertArrayNotHasKey('strc_manage_members', $capabilities, $slug);
            self::assertArrayNotHasKey('strc_manage_finance', $capabilities, $slug);
            self::assertArrayNotHasKey('strc_manage_member_welcome_mail', $capabilities, $slug);
        }
        self::assertTrue(RoleDefinitions::all()['strc_registration_moderator']['capabilities']['strc_manage_members']);
        self::assertTrue(RoleDefinitions::all()['strc_registration_moderator']['capabilities']['strc_manage_member_welcome_mail']);
        self::assertTrue(RoleDefinitions::all()['strc_treasurer']['capabilities']['strc_manage_finance']);
    }

    public function testSuperadminHasAdminRightsAndAppointsAdmins(): void
    {
        $admin = RoleDefinitions::all()['strc_administrator']['capabilities'];
        $super = RoleDefinitions::all()['strc_superadmin']['capabilities'];
        foreach ($admin as $capability => $granted) self::assertTrue($super[$capability] ?? false, $capability);
        self::assertTrue($super['strc_assign_admins']);
        self::assertArrayNotHasKey('strc_assign_admins', $admin);
        self::assertArrayNotHasKey('manage_options', $super);
        self::assertArrayNotHasKey('strc_manage_platform', $super);
    }

    public function testWebmasterIsTechnicalOnly(): void
    {
        $developer = RoleDefinitions::all()['strc_developer']['capabilities'];

        self::assertTrue($developer['manage_options']);
        self::assertTrue($developer['strc_manage_platform']);
        self::assertTrue($developer['strc_assign_superadmin']);
        foreach (array('strc_edit_website_content', 'strc_manage_community', 'strc_manage_events', 'strc_manage_content_roles', 'publish_strc_events', 'publish_strc_ads', 'strc_manage_shop') as $capability) {
            self::assertArrayNotHasKey($capability, $developer, $capability);
        }
        self::assertArrayNotHasKey('strc_assign_superadmin', RoleDefinitions::operationalCapabilities());
        self::assertArrayHasKey('strc_manage_members', RoleDefinitions::operationalCapabilities());
    }

    public function testFunctionalRolesAreAdditiveWithoutMemberAccess(): void
    {
        foreach (RoleDefinitions::MODERATOR_ROLES as $slug) {
            self::assertArrayNotHasKey('strc_access_member_area', RoleDefinitions::all()[$slug]['capabilities'], $slug);
        }
        self::assertArrayHasKey('strc_manage_assigned_events', RoleDefinitions::all()['strc_event_organiser']['capabilities']);
        self::assertArrayNotHasKey('strc_manage_events', RoleDefinitions::all()['strc_event_organiser']['capabilities']);
    }

    public function testEachLevelAssignsOnlyTheLevelsBelow(): void
    {
        $admin = RoleDefinitions::assignableBy(false, false, true);
        self::assertArrayHasKey('strc_regional_manager', $admin);
        self::assertArrayHasKey('strc_treasurer', $admin);
        self::assertArrayHasKey('strc_board_member', $admin);
        self::assertArrayNotHasKey('strc_administrator', $admin);
        self::assertArrayNotHasKey('strc_superadmin', $admin);
        self::assertArrayNotHasKey('strc_developer', $admin);

        $super = RoleDefinitions::assignableBy(false, true, true);
        self::assertArrayHasKey('strc_administrator', $super);
        self::assertArrayNotHasKey('strc_superadmin', $super);
        self::assertArrayNotHasKey('strc_developer', $super);

        $webmaster = RoleDefinitions::assignableBy(true, false, false);
        self::assertSame(array('strc_superadmin', 'strc_developer'), array_keys($webmaster));
        self::assertArrayNotHasKey('strc_editor', RoleDefinitions::assignable());
        self::assertArrayNotHasKey('strc_administrator_editor', RoleDefinitions::assignable());
    }

    public function testAgendaModeratorIsAssignableWithoutUnrelatedPowers(): void
    {
        $role=RoleDefinitions::all()['strc_agenda_moderator']['capabilities'];
        self::assertTrue($role['strc_agenda_moderator']);
        foreach (['strc_manage_events','strc_edit_website_content','strc_manage_members','strc_manage_finance','strc_access_board_documents','strc_access_member_area'] as $cap) self::assertArrayNotHasKey($cap,$role);
        self::assertArrayHasKey('strc_agenda_moderator',RoleDefinitions::assignableBy(false,false,true));
        self::assertArrayNotHasKey('strc_agenda_moderator',RoleDefinitions::assignableBy(true,false,false));
    }

    public function testBoardDocumentsDoNotFollowTechnicalAdministration(): void
    {
        self::assertArrayHasKey('strc_access_board_documents', RoleDefinitions::all()['strc_board_member']['capabilities']);
        self::assertArrayNotHasKey('strc_access_board_documents', RoleDefinitions::allManagedCapabilities());
        self::assertArrayNotHasKey('strc_access_board_documents', RoleDefinitions::all()['strc_developer']['capabilities']);
        self::assertArrayNotHasKey('strc_access_board_documents', RoleDefinitions::all()['strc_superadmin']['capabilities']);
    }

    public function testShippingPartnerIsExternalWithoutMemberAccess(): void
    {
        $partner = RoleDefinitions::all()['strc_shipping_partner']['capabilities'];
        self::assertTrue($partner['strc_shipping']);
        self::assertArrayNotHasKey('strc_access_member_area', $partner);
        self::assertArrayNotHasKey('strc_manage_shop', $partner);
        self::assertArrayNotHasKey('strc_shipping_partner', RoleDefinitions::assignable());
    }
}
