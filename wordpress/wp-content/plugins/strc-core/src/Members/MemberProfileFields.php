<?php

declare(strict_types=1);

namespace SwissTRClub\Core\Members;

use WP_User;

final class MemberProfileFields
{
    /** @var array<string, string> */
    private const FAIRGATE_FIELDS = array(
        'strc_phone' => 'Telefon',
        'strc_street' => 'Strasse',
        'strc_house_number' => 'Hausnummer',
        'strc_postcode' => 'Postleitzahl',
        'strc_city' => 'Ort',
        'strc_country' => 'Land',
    );

    public function registerHooks(): void
    {
        add_action('show_user_profile', array($this, 'render'));
        add_action('edit_user_profile', array($this, 'render'));
        add_action('personal_options_update', array($this, 'save'));
        add_action('edit_user_profile_update', array($this, 'save'));
    }

    public function render(WP_User $user): void
    {
        if (! current_user_can('edit_user', $user->ID)) {
            return;
        }
        ?>
        <h2><?php echo esc_html__('STRC Mitgliedsdaten', 'strc-core'); ?></h2>
        <p><?php echo esc_html__('Offizielle Kontaktdaten werden schreibgeschützt aus Fairgate synchronisiert.', 'strc-core'); ?></p>
        <table class="form-table" role="presentation">
            <?php foreach (self::FAIRGATE_FIELDS as $key => $label) : ?>
                <tr>
                    <th><label for="<?php echo esc_attr($key); ?>"><?php echo esc_html($label); ?></label></th>
                    <td><input class="regular-text" id="<?php echo esc_attr($key); ?>" value="<?php echo esc_attr((string) get_user_meta($user->ID, $key, true)); ?>" readonly></td>
                </tr>
            <?php endforeach; ?>
            <tr>
                <th><label for="strc_vehicle"><?php echo esc_html__('Triumph-Fahrzeug', 'strc-core'); ?></label></th>
                <td><input class="regular-text" id="strc_vehicle" name="strc_vehicle" value="<?php echo esc_attr((string) get_user_meta($user->ID, 'strc_vehicle', true)); ?>"></td>
            </tr>
        </table>
        <?php
        wp_nonce_field('strc_member_profile_' . $user->ID, 'strc_member_profile_nonce');
    }

    public function save(int $userId): void
    {
        if (! current_user_can('edit_user', $userId)) {
            return;
        }
        $nonce = sanitize_text_field(wp_unslash($_POST['strc_member_profile_nonce'] ?? ''));
        if (! wp_verify_nonce($nonce, 'strc_member_profile_' . $userId)) {
            return;
        }

        update_user_meta($userId, 'strc_vehicle', sanitize_text_field(wp_unslash($_POST['strc_vehicle'] ?? '')));
    }
}
