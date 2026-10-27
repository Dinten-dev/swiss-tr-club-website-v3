'use client';
import {t} from './UILanguage';

import {ContentBlock,useSiteContent} from './SiteContent';
import {LandingCard} from './LandingPages';

export function scrollToHomeSection(id:string) {
  const section=document.getElementById(id);
  if(!section)return;
  section.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});
  section.focus({preventScroll:true});
}

export function HomeDirectLinks({memberAccess}:{memberAccess:boolean}) {
  const {text:c}=useSiteContent();
  return <div className="home-direct"><div><p className="eyebrow">{t("Einfach finden")}</p><h2>{t("Wohin möchtest du?")}</h2></div><div className="landing-grid landing-grid-three">
    <LandingCard href="#club" title={c('home.clubLandingTitle')} text={c('home.clubLandingText')}/>
    <LandingCard href="#agenda" title={c('home.agendaLandingTitle')} text={c('home.agendaLandingText')}/>
    <LandingCard href="#marktplatz" title={c('home.marketLandingTitle')} text={c('home.marketLandingText')}/>
  </div><nav className="home-direct-grid" aria-label={t("Weitere Clubbereiche")}>
    {[['regionen','Unsere Regionen'],['forum','Forum'],['galerie','Fotogalerie'],['bibliothek','Bibliothek'],['kontakt','Kontakt']].map(([route,label])=><a href={`#${route}`} key={route}>{label}<span aria-hidden="true">→</span></a>)}
  </nav><a className="home-direct-login" href="#mitglieder">{memberAccess?'Mein Mitgliederbereich':'Mitglieder-Login'}<span aria-hidden="true">→</span></a></div>;
}

export default function HomepageOverview() {
  const {text:c}=useSiteContent();
  if(!c('home.mission').replace(/<[^>]*>/g,'').trim())return null;
  return <section className="home-arrival hx-mission" aria-label={t("Über den Club")}><div className="home-width">
    <ContentBlock id="home.mission" className="home-reference-story"/>
  </div></section>;
}
