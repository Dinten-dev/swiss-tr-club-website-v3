'use client';
import {t} from './UILanguage';
import {useSiteContent} from './SiteContent';
const names:Record<string,string>={history:'Club-Geschichte',news:'Neuigkeiten',applications:'Anträge',registration:'Anmeldung',profile:'Mitgliedschafts-Profil',triungsters:'TRiungsters',organisation:'Organisation',mission:'Leitbild',membership:'Mitglied werden',models:'TR-Modelle',shop:'TR-Shop',club:'Club',agenda:'Agenda',regions:'Regionen',market:'Marktplatz',members:'Mitgliederbereich',forum:'Forum',gallery:'Galerie',library:'Bibliothek',clubdocs:'Clubdokumente',directory:'Mitgliederverzeichnis',contact:'Kontakt',privacy:'Datenschutz',statutes:'Statuten','event-admin':'Agenda verwalten',finance:'Kasse',editorial:'Redaktion'};
const routes:Record<string,string>={regions:'regionen',models:'tr-modelle',editorial:'redaktion',market:'marktplatz',shop:'tr-shop'};
const marketSections:Record<string,string>={fahrzeuge:'Fahrzeuge',ersatzteile:'Ersatzteile',meine:'Meine Inserate',pruefung:'In Prüfung'};
const shopSections:Record<string,string>={artikel:'Artikel erfassen',lager:'Lager',abrechnung:'Abrechnung'};
const regionNames:Record<string,string>={zuerich:'Zürich','suisse-romande':'Suisse romande'};
const memberPages=['profile','applications','forum','gallery','library','clubdocs','directory','editorial','event-admin','finance'];
export default function Breadcrumbs({page,subroute}:{page:string;subroute:string}) {
 const {text}=useSiteContent();
 if(page==='home')return null;
 const parents=['history','organisation','mission','membership','models'].includes(page)?[['#club','Club']]:page==='triungsters'?[['#regionen','Regionen']]:memberPages.includes(page)?[['#mitglieder','Mitgliederbereich']]:page==='registration'?[['#agenda','Agenda']]:page==='shop'?[['#marktplatz','Marktplatz']]:[];
 if(page==='clubdocs')parents.push(['#bibliothek','Bibliothek']);
 const detail=page==='regions'&&subroute?regionNames[subroute]||subroute.split('-').map(v=>v.charAt(0).toUpperCase()+v.slice(1)).join(' ')
  :page==='models'&&subroute?text('model-'+subroute+'.title',subroute.toUpperCase())
  :page==='editorial'&&subroute?(subroute==='people'?'Moderatorrollen':text(subroute+'.title','Seite bearbeiten'))
  :page==='market'?marketSections[subroute]||''
  :page==='shop'?shopSections[subroute]||''
  :'';
 return <nav className="site-breadcrumbs" aria-label={t("Seitenpfad")}><ol><li><a href="#">{t("Startseite")}</a></li>{parents.map(([url,label])=><li key={url}><a href={url}>{t(label)}</a></li>)}{detail?<><li><a href={'#'+(routes[page]||'')}>{t(names[page])}</a></li><li aria-current="page">{t(detail)}</li></>:<li aria-current="page">{t(names[page]||'Swiss TR-Club')}</li>}</ol></nav>;
}
