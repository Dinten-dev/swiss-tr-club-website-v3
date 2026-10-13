<?php

declare(strict_types=1);
namespace SwissTRClub\Core\Integrations\Fairgate;

final class FairgateMemberSync
{
    public function __construct(private readonly FairgateGateway $gateway, private readonly FairgateMemberMapping $mapping) {}

    public function ready(): bool { return $this->mapping->ready(); }

    public function synchronize(int $userId, ?string $linkId = null): void
    {
        global $wpdb;
        $lock='strc-fg-member-'.$userId;
        if ('1'!==(string)$wpdb->get_var($wpdb->prepare('SELECT GET_LOCK(%s, 2)',$lock))) throw new FairgateApiException('Dieses Mitglied wird bereits abgeglichen.');
        try {
            $table=$wpdb->prefix.'strc_memberships';
            $row=$wpdb->get_row($wpdb->prepare("SELECT * FROM {$table} WHERE user_id = %d",$userId),ARRAY_A);
            if (!is_array($row)) throw new FairgateApiException('Für dieses Website-Konto fehlt eine Mitgliedschaft.');
            $id=$linkId ?? (string)($row['fairgate_contact_id'] ?? '');
            if (!$id) throw new FairgateApiException('Die Fairgate Contact ID fehlt.');
            if ($linkId && !empty($row['fairgate_contact_id']) && $linkId!==$row['fairgate_contact_id']) throw new FairgateApiException('Eine bestehende Fairgate-Verknüpfung wird nicht automatisch ersetzt.');
            $fields=$this->mapping->map($this->gateway->contact($id),$id);
            $fields['fairgate_contact_id']=$id;
            $fields['updated_at']=current_time('mysql');
            // Unique constraints protect Contact ID/member number; no account or role is created.
            $saved=$wpdb->update($table,$fields,array('id'=>(int)$row['id']));
            if ($saved===false) throw new FairgateApiException('Abgleich konnte nicht gespeichert werden. Contact ID und Mitgliedsnummer auf Doppelbelegung prüfen.');
            update_user_meta($userId,'strc_fairgate_synced_at',gmdate(DATE_ATOM));
        } finally { $wpdb->get_var($wpdb->prepare('SELECT RELEASE_LOCK(%s)',$lock)); }
    }
}
