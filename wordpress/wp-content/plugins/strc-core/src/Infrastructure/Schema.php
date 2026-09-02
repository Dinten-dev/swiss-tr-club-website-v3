<?php

declare(strict_types=1);

namespace SwissTRClub\Core\Infrastructure;

final class Schema
{
    public static function install(): void
    {
        global $wpdb;

        require_once ABSPATH . 'wp-admin/includes/upgrade.php';

        $charset = $wpdb->get_charset_collate();
        $memberships = $wpdb->prefix . 'strc_memberships';
        $invoices = $wpdb->prefix . 'strc_invoices';
        $payments = $wpdb->prefix . 'strc_payments';
        $mailings = $wpdb->prefix . 'strc_mailings';
        $recipients = $wpdb->prefix . 'strc_mailing_recipients';

        dbDelta("CREATE TABLE {$memberships} (
            id bigint unsigned NOT NULL AUTO_INCREMENT,
            user_id bigint unsigned NOT NULL,
            fairgate_contact_id varchar(64) NULL,
            member_number varchar(32) NOT NULL,
            membership_type varchar(64) NOT NULL DEFAULT 'individual',
            partner_user_id bigint unsigned NULL,
            status varchar(24) NOT NULL DEFAULT 'active',
            region varchar(64) NOT NULL DEFAULT '',
            started_on date NULL,
            expires_on date NULL,
            annual_fee decimal(12,2) NOT NULL DEFAULT 0,
            created_at datetime NOT NULL,
            updated_at datetime NOT NULL,
            PRIMARY KEY (id),
            UNIQUE KEY user_id (user_id),
            UNIQUE KEY fairgate_contact_id (fairgate_contact_id),
            UNIQUE KEY member_number (member_number),
            KEY partner_user_id (partner_user_id),
            KEY status (status)
        ) {$charset};");

        dbDelta("CREATE TABLE {$invoices} (
            id bigint unsigned NOT NULL AUTO_INCREMENT,
            invoice_number varchar(40) NOT NULL,
            user_id bigint unsigned NOT NULL,
            membership_id bigint unsigned NULL,
            amount decimal(12,2) NOT NULL,
            currency char(3) NOT NULL DEFAULT 'CHF',
            due_on date NOT NULL,
            status varchar(24) NOT NULL DEFAULT 'open',
            qr_reference varchar(27) NOT NULL,
            issued_at datetime NOT NULL,
            paid_at datetime NULL,
            PRIMARY KEY (id),
            UNIQUE KEY invoice_number (invoice_number),
            UNIQUE KEY qr_reference (qr_reference),
            KEY user_id (user_id),
            KEY status (status)
        ) {$charset};");

        dbDelta("CREATE TABLE {$payments} (
            id bigint unsigned NOT NULL AUTO_INCREMENT,
            transaction_key varchar(128) NOT NULL,
            booking_date date NOT NULL,
            amount decimal(12,2) NOT NULL,
            currency char(3) NOT NULL DEFAULT 'CHF',
            reference varchar(140) NOT NULL DEFAULT '',
            debtor_name varchar(190) NOT NULL DEFAULT '',
            invoice_id bigint unsigned NULL,
            status varchar(24) NOT NULL DEFAULT 'unmatched',
            imported_at datetime NOT NULL,
            PRIMARY KEY (id),
            UNIQUE KEY transaction_key (transaction_key),
            KEY invoice_id (invoice_id),
            KEY status (status)
        ) {$charset};");

        dbDelta("CREATE TABLE {$mailings} (
            id bigint unsigned NOT NULL AUTO_INCREMENT,
            subject varchar(190) NOT NULL,
            body longtext NOT NULL,
            status varchar(24) NOT NULL DEFAULT 'queued',
            created_by bigint unsigned NOT NULL,
            created_at datetime NOT NULL,
            completed_at datetime NULL,
            PRIMARY KEY (id),
            KEY status (status)
        ) {$charset};");

        dbDelta("CREATE TABLE {$recipients} (
            id bigint unsigned NOT NULL AUTO_INCREMENT,
            mailing_id bigint unsigned NOT NULL,
            user_id bigint unsigned NOT NULL,
            email varchar(190) NOT NULL,
            status varchar(24) NOT NULL DEFAULT 'queued',
            attempts smallint unsigned NOT NULL DEFAULT 0,
            sent_at datetime NULL,
            last_error varchar(255) NOT NULL DEFAULT '',
            PRIMARY KEY (id),
            UNIQUE KEY mailing_user (mailing_id,user_id),
            KEY status (status)
        ) {$charset};");

        $wpdb->query("UPDATE {$memberships} SET membership_type = 'individual' WHERE membership_type = 'standard'");
    }
}
