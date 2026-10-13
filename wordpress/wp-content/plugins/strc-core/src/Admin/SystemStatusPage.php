<?php

declare(strict_types=1);

namespace SwissTRClub\Core\Admin;

use SwissTRClub\Core\Integrations\Fairgate\FairgateConfiguration;

final class SystemStatusPage
{
    public function __construct(private readonly ?FairgateConfiguration $fairgate = null)
    {
    }

    public function registerHooks(): void
    {
        add_action('admin_menu', array($this, 'registerPage'));
    }

    public function registerPage(): void
    {
        add_management_page(
            __('STRC System Status', 'strc-core'),
            __('STRC System Status', 'strc-core'),
            'strc_manage_platform',
            'strc-system-status',
            array($this, 'render')
        );
    }

    public function render(): void
    {
        if (! current_user_can('strc_manage_platform')) {
            wp_die(esc_html__('You are not allowed to view this page.', 'strc-core'));
        }

        $checks = array(
            __('STRC Core version', 'strc-core') => STRC_CORE_VERSION,
            __('WordPress version', 'strc-core') => get_bloginfo('version'),
            __('PHP version', 'strc-core') => PHP_VERSION,
            __('Environment', 'strc-core') => wp_get_environment_type(),
            __('Pretty permalinks', 'strc-core') => get_option('permalink_structure') ? __('Enabled', 'strc-core') : __('Disabled', 'strc-core'),
            __('Debug display', 'strc-core') => (defined('WP_DEBUG_DISPLAY') && WP_DEBUG_DISPLAY) ? __('Enabled', 'strc-core') : __('Disabled', 'strc-core'),
            __('Mitgliedschaft und Buchhaltung', 'strc-core') => __('Fairgate (führendes System)', 'strc-core'),
            __('Fairgate Contacts API', 'strc-core') => $this->fairgate?->isConfigured() ? __('Configured', 'strc-core') : __('Not configured', 'strc-core'),
        );
        ?>
        <div class="wrap">
            <h1><?php echo esc_html__('STRC System Status', 'strc-core'); ?></h1>
            <p><?php echo esc_html__('This page exposes operational checks without secrets or member data.', 'strc-core'); ?></p>
            <table class="widefat striped" role="presentation">
                <tbody>
                    <?php foreach ($checks as $label => $value) : ?>
                        <tr><th scope="row"><?php echo esc_html($label); ?></th><td><?php echo esc_html((string) $value); ?></td></tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
        <?php
    }
}
