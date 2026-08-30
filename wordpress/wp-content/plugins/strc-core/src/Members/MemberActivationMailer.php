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
        $message = "Guten Tag {$user->display_name}\n\nIhr Konto beim Swiss TR-Club ist vorbereitet. Legen Sie über folgenden sicheren Link Ihr persönliches Passwort fest:\n\n{$url}\n\nDer Link ist zeitlich begrenzt und nur einmal verwendbar.";
        if (! wp_mail($user->user_email, 'Ihr Konto beim Swiss TR-Club aktivieren', $message)) {
            throw new RuntimeException('Aktivierungs-E-Mail konnte nicht versendet werden.');
        }
        update_user_meta($userId, 'strc_activation_sent_at', time());
    }
}
