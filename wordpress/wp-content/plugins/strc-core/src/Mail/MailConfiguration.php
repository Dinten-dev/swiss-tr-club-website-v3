<?php

declare(strict_types=1);

namespace SwissTRClub\Core\Mail;

use PHPMailer\PHPMailer\PHPMailer;

final class MailConfiguration
{
    public function registerHooks(): void
    {
        add_action('phpmailer_init', array($this, 'configureLocalMailer'));
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
