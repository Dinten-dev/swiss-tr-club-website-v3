<?php
$strcFr=get_locale()==='fr_FR';$strcBase=rtrim(defined('STRC_FRONTEND_ORIGIN')?(string)STRC_FRONTEND_ORIGIN:home_url(),'/');
$strcCols=[
    [$strcFr?'Découvrir':'Entdecken',[['club',$strcFr?'À propos du club':'Über den Club'],['agenda',$strcFr?'Événements':'Veranstaltungen'],['regionen',$strcFr?'Régions':'Regionen']]],
    [$strcFr?'Membres':'Mitglieder',[['mitglieder',$strcFr?'Tableau de bord':'Dashboard'],['marktplatz',$strcFr?'Marché':'Marktplatz'],['forum','Forum'],['bibliothek',$strcFr?'Bibliothèque':'Bibliothek']]],
    [$strcFr?'Contact & mentions légales':'Kontakt & Recht',[['kontakt',$strcFr?'Contact & impressum':'Kontakt & Impressum'],['datenschutz',$strcFr?'Protection des données':'Datenschutz'],['statuten',$strcFr?'Statuts':'Statuten']]],
];
?>
<footer class="strc-store-footer is-full"><div class="footer-brand"><img class="footer-logo" src="<?php echo esc_url(get_template_directory_uri().'/build/strc-logo.png'); ?>" width="64" height="64" alt="Swiss TR-Club Logo"><div><strong>Swiss TR-Club</strong><p>Passion since 1975.</p></div></div><?php foreach($strcCols as $col){echo '<div><strong>'.esc_html($col[0]).'</strong>';foreach($col[1] as $link)printf('<a href="%s">%s</a>',esc_url($strcBase.'/#'.$link[0]),esc_html($link[1]));echo '</div>';} ?></footer><?php wp_footer(); ?></body></html>
