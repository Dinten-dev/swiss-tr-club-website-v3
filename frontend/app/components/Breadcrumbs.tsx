'use client';
import {t} from './UILanguage';
import {useSiteContent} from './SiteContent';
import {useSyncExternalStore} from 'react';

/* Rückweg zur Ausgangsseite: merkt sich besuchte Seiten samt Scrollposition (z. B. Startseite → TRiungsters → «Zurück» an dieselbe Stelle). */
type Visit={hash:string;y:number};
const visits:Visit[]=[];let currentHash='';let lastY=0;let installed=false;const listeners=new Set<()=>void>();
const normal=(hash:string)=>hash&&hash!=='#'?hash:'#';
function install(){
 if(installed||typeof window==='undefined')return;installed=true;currentHash=normal(window.location.hash);
 window.addEventListener('scroll',()=>{lastY=window.scrollY;},{passive:true});
 window.addEventListener('hashchange',()=>{
  const next=normal(window.location.hash);if(next===currentHash)return;
  const previous=visits[visits.length-1];
  if(previous&&previous.hash===next){visits.pop();const target=previous.y;for(const delay of [80,250,600])window.setTimeout(()=>window.scrollTo({top:target,behavior:'instant' as ScrollBehavior}),delay);}
  else{visits.push({hash:currentHash,y:lastY});if(visits.length>30)visits.shift();}
  currentHash=next;lastY=0;listeners.forEach(listener=>listener());
 });
}
install();
const subscribeVisits=(listener:()=>void)=>{listeners.add(listener);return()=>{listeners.delete(listener);};};
function BackLink(){
 const previous=useSyncExternalStore(subscribeVisits,()=>visits[visits.length-1]?.hash||'',()=>'');
 if(!previous)return null;
 return <button type="button" className="site-back-link" onClick={()=>window.history.back()}>← {t(previous==='#'?'Zurück zur Startseite':'Zurück')}</button>;
}
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
 return <nav className="site-breadcrumbs" aria-label={t("Seitenpfad")}><BackLink/><ol><li><a href="#">{t("Startseite")}</a></li>{parents.map(([url,label])=><li key={url}><a href={url}>{t(label)}</a></li>)}{detail?<><li><a href={'#'+(routes[page]||'')}>{t(names[page])}</a></li><li aria-current="page">{t(detail)}</li></>:<li aria-current="page">{t(names[page]||'Swiss TR-Club')}</li>}</ol></nav>;
}
