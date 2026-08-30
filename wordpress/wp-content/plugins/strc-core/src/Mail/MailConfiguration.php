<?php

declare(strict_types=1);

namespace SwissTRClub\Core\Mail;

use PHPMailer\PHPMailer\PHPMailer;

final class MailConfiguration
{
    public function registerHooks(): void
    {
        add_filter('wp_mail_from', array($this, 'localFromAddress'));
        add_filter('wp_mail_from_name', array($this, 'localFromName'));
        add_action('phpmailer_init', array($this, 'configureLocalMailer'));
    }

    public function localFromAddress(string $address): string
    {
        return 'local' === wp_get_environment_type() ? 'noreply@strc.local' : $address;
    }

    public function localFromName(string $name): string
    {
        return 'local' === wp_get_environment_type() ? 'Swiss TR-Club' : $name;
    }

    public function configureLocalMailer(PHPMailer $mailer): void
    {
        if ('local' !== wp_get_environment_type()) {
            return;
        }
        $mailer->isSMTP();
        $mailer->Host = 'mailpit';
        $mailer->Port = 1025;
        $mailer->SMTPAuth = false;
        $mailer->SMTPSecure = '';
        $mailer->From = 'noreply@strc.local';
        $mailer->FromName = 'Swiss TR-Club';
    }
}
