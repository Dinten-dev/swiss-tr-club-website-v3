'use client';
import {t} from './UILanguage';
import {useSiteContent} from './SiteContent';
const names:Record<string,string>={history:'Club-Geschichte',news:'Neuigkeiten',applications:'Anträge',registration:'Anmeldung',profile:'Mein Profil',triungsters:'TRiungsters',organisation:'Organisation',mission:'Leitbild',membership:'Mitglied werden',models:'TR-Modelle',shop:'TR-Shop',club:'Club',agenda:'Agenda',regions:'Regionen',market:'Marktplatz',members:'Mitgliederbereich',forum:'Forum',gallery:'Galerie',library:'Bibliothek',directory:'Mitgliederverzeichnis',contact:'Kontakt',privacy:'Datenschutz',statutes:'Statuten','event-admin':'Agenda verwalten',editorial:'Redaktion'};
export default function Breadcrumbs({page,subroute}:{page:string;subroute:string}) {
 const {text}=useSiteContent();
 if(page==='home')return null;
 const parents=['history','triungsters','organisation','mission','membership','models'].includes(page)?[['#club','Club']]:['profile','applications','forum','gallery','library','directory','editorial'].includes(page)?[['#mitglieder','Mitgliederbereich']]:page==='registration'||page==='event-admin'?[['#agenda','Agenda']]:page==='shop'?[['#marktplatz','Marktplatz']]:[];
 const detail=page==='regions'&&subroute?subroute.split('-').map(v=>v.charAt(0).toUpperCase()+v.slice(1)).join(' '):page==='models'&&subroute?text('model-'+subroute+'.title',subroute.toUpperCase()):page==='editorial'&&subroute?text(subroute+'.title','Seite bearbeiten'):'';
 const route=page==='regions'?'regionen':page==='models'?'tr-modelle':'redaktion';
 return <nav className="site-breadcrumbs" aria-label={t("Seitenpfad")}><ol><li><a href="#">{t("Startseite")}</a></li>{parents.map(([url,label])=><li key={url}><a href={url}>{t(label)}</a></li>)}{detail?<><li><a href={'#'+route}>{t(names[page])}</a></li><li aria-current="page">{t(detail)}</li></>:<li aria-current="page">{t(names[page]||'Swiss TR-Club')}</li>}</ol></nav>;
}
