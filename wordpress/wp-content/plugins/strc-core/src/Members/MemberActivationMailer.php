<?php

declare(strict_types=1);

namespace SwissTRClub\Core\Members;

use RuntimeException;

final class MemberActivationMailer
{
    public function send(int $userId): void
    {
        $user = get_userdata($userId);
        if (! $user) {
            throw new RuntimeException('Mitgliedskonto wurde nicht gefunden.');
        }
        $lastSent = (int) get_user_meta($userId, 'strc_activation_sent_at', true);
        if ($lastSent > time() - 300) {
            throw new RuntimeException('Die Aktivierungs-E-Mail wurde kürzlich versendet.');
        }

        $key = get_password_reset_key($user);
        if (is_wp_error($key)) {
            throw new RuntimeException($key->get_error_message());
        }
        $url = network_site_url(
            'wp-login.php?action=rp&key=' . rawurlencode($key) . '&login=' . rawurlencode($user->user_login),
            'login'
        );
        $mail = \SwissTRClub\Core\Mail\MailTemplates::render('member.activation', \SwissTRClub\Core\Http\UserLanguage::french((int) $user->ID) ? 'fr' : 'de', array('name' => $user->display_name, 'link' => $url));
        if (! wp_mail($user->user_email, $mail['subject'], $mail['body'])) {
            throw new RuntimeException('Aktivierungs-E-Mail konnte nicht versendet werden.');
        }
        update_user_meta($userId, 'strc_activation_sent_at', time());
    }
}
