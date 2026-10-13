'use client';
import {t} from './UILanguage';

import Image from 'next/image';
import {ContentBlock,useSiteContent,assetUrl,type ContentImage} from './SiteContent';
import {imageFrameStyle} from './ImageFrame';
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
  const {text:c,values}=useSiteContent();
  const available=((values.home?.photos??[]) as ContentImage[]).filter(photo=>photo.url);
  const photos=available.slice(0,12);
  const left=photos.slice(0,6);
  const right=photos.slice(6,12);
  const half=(list:ContentImage[],side:'left'|'right')=><div key={side} className={`home-reference-half is-${side}`}><div className={`home-reference-track${list.length>1?' is-moving':''} ${side==='left'?'to-right':'to-left'}`}>{(list.length>1?[0,1]:[0]).map(copy=><div className="home-reference-photo-set" key={copy} aria-hidden={copy===1}>{list.map((photo,index)=><figure key={photo.url+index}><Image src={assetUrl(photo.url)} alt={copy===0?photo.alt:''} width={640} height={480} priority={copy===0&&index<2} style={imageFrameStyle(photo.frame,'cover')}/></figure>)}</div>)}</div></div>;
  return <section className="home-arrival" aria-labelledby="home-arrival-title"><div className="home-width">
    <div className="home-reference-intro">
      <div><p className="eyebrow">{c('home.eyebrow','Willkommen beim Swiss TR-Club')}</p><h1 id="home-arrival-title">{c('home.title')}</h1></div>
      <ContentBlock id="home.intro" className="home-reference-description"/>
    </div>
    {photos.length>0&&<div className={`home-reference-photos${right.length?' is-split':''}`} role="region" aria-label={t("Einblicke ins Clubleben")} tabIndex={0}>
      {right.length?[half(left,'left'),half(right,'right')]:half(left,'left')}
    </div>}
    <ContentBlock id="home.mission" className="home-reference-story"/>
  </div></section>;
}
