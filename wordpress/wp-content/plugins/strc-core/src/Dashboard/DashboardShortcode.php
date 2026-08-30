<?php

declare(strict_types=1);

namespace SwissTRClub\Core\Dashboard;

use SwissTRClub\Core\Events\EventPostType;
use WP_Query;

final class DashboardShortcode
{
    public function registerHooks(): void
    {
        add_shortcode('strc_member_dashboard', array($this, 'render'));
    }

    public function render(): string
    {
        if (! is_user_logged_in()) {
            return sprintf(
                '<section class="strc-dashboard-message"><h2>%s</h2><p>%s</p><a class="wp-element-button" href="%s">%s</a></section>',
                esc_html__('Member area', 'strc-core'),
                esc_html__('Please sign in to access your personal club area.', 'strc-core'),
                esc_url(wp_login_url((string) get_permalink())),
                esc_html__('Sign in', 'strc-core')
            );
        }

        if (! current_user_can('strc_access_member_area')) {
            return sprintf(
                '<section class="strc-dashboard-message"><h2>%s</h2><p>%s</p></section>',
                esc_html__('Access unavailable', 'strc-core'),
                esc_html__('Your current membership status does not allow access. Please contact the club administration.', 'strc-core')
            );
        }

        $user = wp_get_current_user();
        $events = new WP_Query(
            array(
                'post_type' => EventPostType::POST_TYPE,
                'post_status' => 'publish',
                'posts_per_page' => 3,
                'meta_key' => 'strc_start_at',
                'orderby' => 'meta_value',
                'order' => 'ASC',
                'meta_query' => array(
                    array(
                        'key' => 'strc_start_at',
                        'value' => current_time('c'),
                        'compare' => '>=',
                        'type' => 'CHAR',
                    ),
                ),
            )
        );

        ob_start();
        ?>
        <section class="strc-member-dashboard" aria-labelledby="strc-dashboard-title">
            <p class="strc-kicker"><?php echo esc_html__('Welcome back', 'strc-core'); ?></p>
            <h1 id="strc-dashboard-title"><?php echo esc_html($user->display_name); ?></h1>
            <div class="strc-dashboard-grid">
                <article>
                    <h2><?php echo esc_html__('My profile', 'strc-core'); ?></h2>
                    <p><?php echo esc_html($user->user_email); ?></p>
                    <a href="<?php echo esc_url(get_edit_profile_url($user->ID)); ?>"><?php echo esc_html__('Edit profile', 'strc-core'); ?></a>
                </article>
                <article>
                    <h2><?php echo esc_html__('Upcoming events', 'strc-core'); ?></h2>
                    <?php if ($events->have_posts()) : ?>
                        <ul>
                            <?php while ($events->have_posts()) : $events->the_post(); ?>
                                <li><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></li>
                            <?php endwhile; ?>
                        </ul>
                    <?php else : ?>
                        <p><?php echo esc_html__('No upcoming events are published yet.', 'strc-core'); ?></p>
                    <?php endif; ?>
                    <?php wp_reset_postdata(); ?>
                </article>
                <article>
                    <h2><?php echo esc_html__('Quick actions', 'strc-core'); ?></h2>
                    <ul>
                        <li><a href="<?php echo esc_url(get_post_type_archive_link(EventPostType::POST_TYPE) ?: home_url('/agenda/')); ?>"><?php echo esc_html__('View agenda', 'strc-core'); ?></a></li>
                        <li><a href="<?php echo esc_url(home_url('/bibliothek/')); ?>"><?php echo esc_html__('Find a document', 'strc-core'); ?></a></li>
                        <li><a href="<?php echo esc_url(home_url('/mitglieder/')); ?>"><?php echo esc_html__('Member directory', 'strc-core'); ?></a></li>
                    </ul>
                </article>
            </div>
        </section>
        <?php

        return (string) ob_get_clean();
    }
}
