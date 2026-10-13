<?php
declare(strict_types=1);
namespace SwissTRClub\Core\Members;

use SwissTRClub\Core\Forms\FormStore;
use SwissTRClub\Core\Integrations\Fairgate\FairgateStagingImport;

/** Preparation only: no password keys, mail delivery, queues or scheduled sends. */
final class MemberSetupPreparation
{
    public const OPTION = 'strc_member_setup_preparation';

    public function __construct(private readonly FairgateStagingImport $import) {}

    public static function guard(): void
    {
        if (!current_user_can('strc_manage_platform') || !current_user_can('strc_manage_members')) {
            throw new \RuntimeException('Nur die berechtigte Website-Verwaltung darf Einrichtungsmails vorbereiten.');
        }
    }

    public function prepare(): array
    {
        self::guard();
        return FormStore::locked('member-setup-preparation', function (): array {
            $contacts = $this->import->fetch();
            $plan = $this->import->plan($contacts);
            $byId = [];
            foreach ($contacts as $contact) $byId[(string)$contact['basefields']['contact_id']] = $contact;
            global $wpdb;
            $rows = [];
            $review = [];
            $languages = [];
            foreach ($plan as $candidate) {
                if (trim((string)($candidate['label'] ?? '')) === '') continue;
                $id = (string)$candidate['id'];
                if ($candidate['action'] !== 'update' || ($candidate['status'] ?? '') !== 'active') {
                    $review[] = ['contactId'=>$id, 'name'=>$candidate['name'] ?? '', 'reason'=>$candidate['reason'] ?? ($candidate['action']==='create' ? 'Website-Konto zuerst übernehmen' : 'Keine aktive Mitgliedschaft')];
                    continue;
                }
                $userId = (int)$wpdb->get_var($wpdb->prepare("SELECT user_id FROM {$wpdb->prefix}strc_memberships WHERE fairgate_contact_id=%s AND status='active'", $id));
                $user = $userId ? get_userdata($userId) : false;
                if (!$user || strcasecmp($user->user_email, $candidate['email']) !== 0) {
                    $review[] = ['contactId'=>$id, 'name'=>$candidate['name'], 'reason'=>'Website-Zuordnung hat sich geändert'];
                    continue;
                }
                // This is the tenant field confirmed by the current Contacts API response.
                $language = strtolower(trim((string)($byId[$id]['configured_fields']['correspondence_lang'] ?? '')));
                $supported = in_array($language, ['de', 'fr'], true);
                $languages[$language ?: 'unknown'] = ($languages[$language ?: 'unknown'] ?? 0) + 1;
                $rows[] = ['userId'=>$userId, 'contactId'=>$id, 'name'=>$candidate['name'], 'email'=>$user->user_email,
                    'language'=>$language, 'ready'=>$supported, 'reviewReason'=>$supported ? '' : 'Mail-Sprache DE/FR vor Versand bestätigen'];
            }
            usort($rows, static fn($a,$b)=>strnatcasecmp($a['name'],$b['name']));
            $data = ['version'=>1, 'status'=>'draft_no_send', 'createdAt'=>gmdate(DATE_ATOM), 'createdBy'=>get_current_user_id(),
                'site'=>home_url(), 'sender'=>'no-reply@swisstrclub.ch', 'senderName'=>'Swiss TR-Club',
                'senderVerified'=>false, 'mailDeliveryAuthorized'=>false, 'recipients'=>$rows, 'review'=>$review,
                'summary'=>['contactsRead'=>count($contacts), 'addresses'=>count($rows),
                    'ready'=>count(array_filter($rows, static fn($row)=>$row['ready'])), 'languages'=>$languages,
                    'reviewContacts'=>count($review)], 'fingerprint'=>hash('sha256', wp_json_encode([$rows,$review]))];
            update_option(self::OPTION, $data, false);
            if ((get_option(self::OPTION)['fingerprint'] ?? null) !== $data['fingerprint']) throw new \RuntimeException('Empfängervorschau konnte nicht gespeichert werden.');
            return $data;
        });
    }

    public static function template(string $language): array
    {
        if ($language === 'fr') {
            return ['subject'=>'Swiss TR-Club : configurer ton accès au nouveau site',
                'body'=>"Bonjour {{Nom}},\n\nLe nouveau site du Swiss TR-Club est prêt. Ton compte de membre est déjà créé.\n\nChoisis ton mot de passe personnel pour le site avec ce lien :\n{{Lien personnel}}\n\nCe lien est à usage unique et sa validité est limitée. S’il a expiré, tu peux demander un nouveau lien via « Mot de passe oublié » sur la page de connexion.\n\nSi tu as déjà un mot de passe pour le nouveau site, tu peux continuer à l’utiliser. Ton mot de passe Fairgate reste inchangé.\n\nConnexion : {{Page de connexion}}\n\nBonne découverte !\nSwiss TR-Club\n\nCeci est un message automatique. Merci de ne pas répondre à cette adresse."];
        }
        if ($language !== 'de') throw new \InvalidArgumentException('Die Mail-Sprache muss zuerst bestätigt werden.');
        return ['subject'=>'Swiss TR-Club: Zugang zur neuen Website einrichten',
            'body'=>"Hoi {{Name}}\n\nDie neue Swiss TR-Club Website ist bereit. Dein Mitgliederkonto ist bereits angelegt.\n\nLege mit diesem persönlichen Link dein Website-Passwort fest:\n{{Persönlicher Einrichtungslink}}\n\nDer Link ist zeitlich begrenzt und nur einmal verwendbar. Falls er abgelaufen ist, kannst du auf der Anmeldeseite über «Passwort vergessen» einen neuen Link anfordern.\n\nWenn du bereits ein Passwort für die neue Website hast, kannst du es weiterhin verwenden. Dein Fairgate-Passwort bleibt unverändert.\n\nAnmelden: {{Anmeldeseite}}\n\nViel Freude beim Entdecken!\nSwiss TR-Club\n\nDies ist eine automatische Nachricht. Bitte antworte nicht an diese Adresse."];
    }
}
