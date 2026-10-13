<?php

declare(strict_types=1);
namespace SwissTRClub\Core\Content;

use SwissTRClub\Core\Community\LibraryPolicy;

/** Member activity, with the same publication and file visibility rules as each module. */
final class HomepageActivity
{
    public function latest(): array
    {
        if (!current_user_can('strc_access_member_area')) return [];
        $kinds = ['strc_topic'=>'forum', 'strc_album'=>'gallery', 'strc_document'=>'library', 'strc_ad'=>'market'];
        $items = [];
        foreach ($kinds as $type=>$kind) {
            $args = ['post_type'=>$type, 'post_status'=>'publish', 'has_password'=>false, 'numberposts'=>12, 'orderby'=>['modified'=>'DESC', 'ID'=>'DESC']];
            if ($kind === 'market') $args['meta_query'] = ['relation'=>'AND', ['key'=>'strc_ad_public_approved','value'=>'1'], ['key'=>'strc_ad_expires_at','value'=>time(),'compare'=>'>','type'=>'NUMERIC'], ['relation'=>'OR', ['key'=>'strc_ad_sold','compare'=>'NOT EXISTS'], ['key'=>'strc_ad_sold','value'=>'1','compare'=>'!=']]];
            foreach (get_posts($args) as $post) {
                if ($kind === 'library' && !LibraryPolicy::canRead((int)$post->ID)) continue;
                if ($kind === 'forum' && get_post_meta($post->ID,'strc_topic_merged_into',true)) continue;
                $date = get_post_time(DATE_ATOM, true, $post);
                $author = (int)$post->post_author;
                $count = 0;
                if ($kind === 'gallery') {
                    $files = get_post_meta($post->ID, 'strc_private_files', true);
                    foreach (is_array($files) ? $files : [] as $file) {
                        if (($file['reviewStatus'] ?? 'approved') !== 'approved' || !str_starts_with($file['mime'] ?? '', 'image/')) continue;
                        $count++;
                        $uploaded = $file['uploadedAt'] ?? '';
                        if ($uploaded && strtotime($uploaded) !== false && strtotime($uploaded) > strtotime($date)) {
                            $date = $uploaded;
                            $author = (int)($file['submittedBy'] ?? $post->post_author);
                        }
                    }
                    if ($count === 0) continue;
                }
                $items[] = $this->item((int)$post->ID, $kind, $post->post_title, $date, $author, $count);
            }
        }
        foreach (get_comments(['status'=>'approve', 'post_type'=>'strc_topic', 'number'=>12, 'orderby'=>'comment_date_gmt', 'order'=>'DESC']) as $reply) {
            $post = get_post((int)$reply->comment_post_ID);
            if (!$post || $post->post_status !== 'publish' || $post->post_password !== '' || get_post_meta($post->ID,'strc_topic_merged_into',true)) continue;
            $items[] = $this->item((int)$post->ID, 'reply', $post->post_title, mysql2date(DATE_ATOM, $reply->comment_date_gmt, false), (int)$reply->user_id, 0);
        }
        usort($items, static fn($a,$b)=>[strtotime($b['date']),$b['id'],$b['kind']] <=> [strtotime($a['date']),$a['id'],$a['kind']]);
        return array_slice($items, 0, 3);
    }

    private function item(int $id, string $kind, string $title, string $date, int $authorId, int $count): array
    {
        $author = get_userdata($authorId);
        $route = ['forum'=>'forum/', 'reply'=>'forum/', 'gallery'=>'galerie/', 'library'=>'bibliothek/', 'market'=>'marktplatz'];
        return ['id'=>$id, 'kind'=>$kind, 'title'=>html_entity_decode(wp_strip_all_tags($title), ENT_QUOTES | ENT_HTML5, 'UTF-8'), 'date'=>$date, 'author'=>$author ? wp_strip_all_tags($author->display_name) : '', 'photoCount'=>$count, 'href'=>'#'.$route[$kind].($kind === 'market' ? '' : $id)];
    }
}
