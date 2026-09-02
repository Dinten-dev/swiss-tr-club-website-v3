<?php

declare(strict_types=1);

namespace SwissTRClub\Core\Admin;

use SwissTRClub\Core\Integrations\Fairgate\FairgateConfiguration;

final class FairgateAdministrationPage
{
    public function __construct(private readonly FairgateConfiguration $configuration)
    {
    }

    public function registerHooks(): void
    {
        add_action('admin_menu', array($this, 'registerMenu'));
    }

    public function registerMenu(): void
    {
        add_menu_page(
            __('STRC Clubverwaltung', 'strc-core'),
            __('Clubverwaltung', 'strc-core'),
            'strc_manage_members',
            'strc-club',
            array($this, 'render'),
            'dashicons-groups',
            3
        );
    }

    public function render(): void
    {
        if (! current_user_can('strc_manage_members')) {
            wp_die(esc_html__('Kein Zugriff.', 'strc-core'));
        }
        ?>
        <div class="wrap">
            <h1><?php echo esc_html__('Clubverwaltung mit Fairgate', 'strc-core'); ?></h1>
            <p><?php echo esc_html__('Fairgate ist das führende System für Mitglieder, Mitgliedschaften, Rechnungen, Zahlungen und Clubkommunikation.', 'strc-core'); ?></p>
            <table class="widefat striped" role="presentation">
                <tbody>
                    <tr><th scope="row"><?php echo esc_html__('Contacts API', 'strc-core'); ?></th><td><?php echo esc_html($this->configuration->isConfigured() ? __('Konfiguriert', 'strc-core') : __('Noch nicht konfiguriert', 'strc-core')); ?></td></tr>
                    <tr><th scope="row"><?php echo esc_html__('WordPress-Mitgliedsdaten', 'strc-core'); ?></th><td><?php echo esc_html__('Minimierter, schreibgeschützter Synchronisationsbestand', 'strc-core'); ?></td></tr>
                    <tr><th scope="row"><?php echo esc_html__('WordPress-Login', 'strc-core'); ?></th><td><?php echo esc_html__('Bleibt getrennt von Fairgate', 'strc-core'); ?></td></tr>
                </tbody>
            </table>
            <?php if ('' !== $this->configuration->administrationUrl()) : ?>
                <p><a class="button button-primary" href="<?php echo esc_url($this->configuration->administrationUrl()); ?>" target="_blank" rel="noopener noreferrer"><?php echo esc_html__('Fairgate öffnen', 'strc-core'); ?></a></p>
            <?php else : ?>
                <div class="notice notice-warning inline"><p><?php echo esc_html__('STRC_FAIRGATE_ADMIN_URL muss in der Serverkonfiguration gesetzt werden.', 'strc-core'); ?></p></div>
            <?php endif; ?>
            <h2><?php echo esc_html__('Systemgrenze', 'strc-core'); ?></h2>
            <ul>
                <li><?php echo esc_html__('Fairgate: Mitglieder, Beiträge, Rechnungen, Zahlungen, Rundmails', 'strc-core'); ?></li>
                <li><?php echo esc_html__('WordPress: Website, Login, Profile, Events und Community', 'strc-core'); ?></li>
            </ul>
        </div>
        <?php
    }
}
