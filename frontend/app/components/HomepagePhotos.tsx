'use client';
import {t} from './UILanguage';

import {useEffect,useState} from 'react';
import Image from 'next/image';
import {ContentBlock,useSiteContent,assetUrl,type ContentImage} from './SiteContent';
import {imageFrameStyle} from './ImageFrame';

export function HomepageHero(){
 const {text:c}=useSiteContent();
 const heroImage=c('home.heroImage').trim()||'/club/scheinwerfer.jpg';
 return <section className="home-visual-hero" aria-labelledby="home-arrival-title">
  <Image className="home-visual-image" src={assetUrl(heroImage)} alt="" width={1600} height={1000} priority/>
  <div className="home-visual-shade" aria-hidden="true"/>
  <div className="home-visual-copy">
   <p className="home-visual-welcome">{c('home.eyebrow','Willkommen beim Swiss TR-Club')}</p>
   <h1 id="home-arrival-title">{c('home.title')}</h1>
   <ContentBlock id="home.intro" className="home-visual-intro"/>
   <div className="home-visual-actions"><a className="home-visual-primary" href="#agenda">{c('home.heroAction','Ausfahrten entdecken')}</a><a className="home-visual-secondary" href="#club">{c('home.heroSecondaryAction','Den Club kennenlernen')}</a></div>
  </div>
 </section>;
}

export function HomepageMission(){
 const {text:c}=useSiteContent();
 const title=t('Die Freude am Fahren bringt uns zusammen.');
 const summary=c('home.missionSummary');
 const displaySummary=summary.startsWith(`${title} `)?summary.slice(title.length).trim():summary;
 return <section className="home-values" aria-labelledby="home-values-title">
  <div><p className="eyebrow">{t("Unsere Gemeinschaft")}</p><h2 id="home-values-title">{title}</h2><p>{displaySummary}</p></div>
  <details><summary>{c('home.missionToggle','Was uns verbindet')}<span aria-hidden="true">＋</span></summary><ContentBlock id="home.mission"/></details>
 </section>;
}

function MomentsSlideshow({photos}:{photos:ContentImage[]}){
 const [index,setIndex]=useState(0);const [userPaused,setUserPaused]=useState(false);const [hovered,setHovered]=useState(false);const [focused,setFocused]=useState(false);const [reduced,setReduced]=useState(true);const [pageVisible,setPageVisible]=useState(true);
 useEffect(()=>{const preference=matchMedia('(prefers-reduced-motion: reduce)');const update=()=>setReduced(preference.matches);const visibility=()=>setPageVisible(!document.hidden);update();visibility();preference.addEventListener('change',update);document.addEventListener('visibilitychange',visibility);return()=>{preference.removeEventListener('change',update);document.removeEventListener('visibilitychange',visibility);};},[]);
 useEffect(()=>{if(userPaused||hovered||focused||reduced||!pageVisible||photos.length<2)return;const timer=window.setInterval(()=>setIndex(current=>(current+1)%photos.length),4500);return()=>window.clearInterval(timer);},[userPaused,hovered,focused,reduced,pageVisible,photos.length,index]);
 const move=(step:number)=>setIndex(current=>(current+step+photos.length)%photos.length);if(!photos.length)return null;
 const currentTitle=photos[index]?.alt?.replace(/[.!?]+$/,'')||t('Gemeinsam unterwegs');
 return <section className="home-moments" aria-label={t("Blick ins Clubleben")}>
  <div className="home-moments-heading"><div><p className="eyebrow">{t("Ein Blick ins Clubleben")}</p><h2 key={index}>{currentTitle}</h2></div><div className="home-moments-controls"><button type="button" aria-label={t("Vorheriges Bild")} onClick={()=>move(-1)}>‹</button><button type="button" aria-label={t("Nächstes Bild")} onClick={()=>move(1)}>›</button><button type="button" className="home-moments-play" aria-pressed={userPaused||reduced} disabled={reduced} onClick={()=>setUserPaused(value=>!value)}>{t(reduced?'Bewegung reduziert':userPaused?'Abspielen':'Pause')}</button></div></div>
  <div className="home-moments-stage" onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)} onFocusCapture={()=>setFocused(true)} onBlurCapture={event=>{if(!event.currentTarget.contains(event.relatedTarget as Node|null))setFocused(false);}}>
   {photos.map((photo,slide)=><figure className={`home-moments-slide${slide===index?' is-active':''}`} key={photo.url+slide} aria-hidden={slide!==index}><Image src={assetUrl(photo.url)} alt={photo.alt} width={1600} height={900} loading="lazy" style={imageFrameStyle(photo.frame,'cover')}/></figure>)}
  </div>
  {reduced&&<p className="home-moments-note">{t("Automatischer Bildwechsel ist bei reduzierter Bewegung pausiert.")}</p>}
 </section>;
}

export function HomepageClublife(){
 const {values,text:c}=useSiteContent();
 const heroImage=c('home.heroImage').trim()||'/club/scheinwerfer.jpg';
 const photos=((values.home?.photos??[]) as ContentImage[]).filter(photo=>photo.url&&photo.url!==heroImage);
 return photos.length?<MomentsSlideshow photos={photos}/>:null;
}
