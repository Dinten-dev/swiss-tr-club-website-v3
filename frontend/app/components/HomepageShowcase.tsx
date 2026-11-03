'use client';
import {t,uiLocale,useUILanguage} from './UILanguage';

import {useEffect,useRef,useState,useSyncExternalStore} from 'react';
import Image from 'next/image';
import {RichHtml,useSiteContent,assetUrl,regionalLandscape,type ContentImage,type ContentValues} from './SiteContent';
import {imageFrameStyle} from './ImageFrame';
import {query} from './ClubApi';
import {trModels,Placeholder} from './VehicleModels';
import {swissOutline,regionPins} from './swissOutline';
import type {ClubEvent} from '../page';

export type HomeStats={members:number|null;vehicles:number|null;youth?:number|null;regions:{name:string;slug:string}[]};

/** Reduced-motion preference, updated live. The server snapshot counts as "reduced" so nothing moves before hydration. */
const motionQuery='(prefers-reduced-motion: reduce)';
const subscribeMotion=(change:()=>void)=>{const query=matchMedia(motionQuery);query.addEventListener('change',change);return()=>query.removeEventListener('change',change);};
function useReducedMotion(){return useSyncExternalStore(subscribeMotion,()=>matchMedia(motionQuery).matches,()=>true);}
const scrollBehavior=():ScrollBehavior=>matchMedia(motionQuery).matches?'instant':'smooth';
const photoAlt=(photo:ContentImage,language:string)=>language==='fr'&&photo.altFr?photo.altFr:photo.alt;

/* Vorschlag 1 · grosses Titelbild mit Bildwechsel */
export function HomeHero({nextEvent}:{nextEvent?:ClubEvent}){
 const {text:c,values}=useSiteContent();const {language}=useUILanguage();
 const reduced=useReducedMotion();
 const heroImage=c('home.heroImage').trim();
 const gallery=((values.home?.photos??[]) as ContentImage[]).filter(photo=>photo.url);
 const slides=[...(heroImage?[{url:heroImage,alt:''} as ContentImage]:[]),...gallery.filter(photo=>photo.url!==heroImage)].slice(0,4);
 if(!slides.length)slides.push({url:'/club/scheinwerfer.jpg',alt:''});
 // Einstiegstext und Leitbild wechseln sich unter dem Titel ab, im Takt der Bilder.
 const leads=[c('home.intro'),c('home.mission')].filter(html=>html.replace(/<[^>]*>/g,'').replace(/&nbsp;/g,'').trim());
 const [index,setIndex]=useState(0);const [paused,setPaused]=useState(false);const [visible,setVisible]=useState(true);
 useEffect(()=>{const update=()=>setVisible(!document.hidden);document.addEventListener('visibilitychange',update);return()=>document.removeEventListener('visibilitychange',update);},[]);
 useEffect(()=>{if(reduced||paused||!visible||Math.max(slides.length,leads.length)<2)return;const timer=window.setTimeout(()=>setIndex(current=>current+1),7000);return()=>window.clearTimeout(timer);},[reduced,paused,visible,slides.length,leads.length,index]);
 const slideIndex=index%slides.length;
 const caption=photoAlt(slides[slideIndex]??slides[0],language);
 return <section className="hx-hero" aria-labelledby="home-arrival-title" onFocusCapture={()=>setPaused(true)} onBlurCapture={event=>{if(!event.currentTarget.contains(event.relatedTarget as Node|null))setPaused(false);}}>
  {slides.map((photo,slide)=><div key={photo.url+slide} className={`hx-hero-slide${slide===slideIndex?' is-active':''}${reduced?'':' is-moving'}`} aria-hidden="true"><Image src={assetUrl(photo.url)} alt="" width={1920} height={1080} priority={slide===0} loading={slide===0?undefined:'lazy'} style={imageFrameStyle(photo.frame,'cover')}/></div>)}
  <div className="hx-hero-shade" aria-hidden="true"/>
  <div className="home-width hx-hero-copy">
   <p className="hx-eyebrow">{c('home.eyebrow','Willkommen beim Swiss TR-Club')}</p>
   <h1 id="home-arrival-title">{c('home.title')}</h1>
   {leads.length>1&&!reduced?<div className="hx-hero-leads" aria-live="off">{leads.map((lead,position)=><RichHtml key={position} html={lead} className={`hx-hero-intro${position===index%leads.length?' is-active':''}`}/>)}</div>:leads.map((lead,position)=><RichHtml key={position} html={lead} className="hx-hero-intro is-active"/>)}
   <div className="hx-hero-actions"><a className="hx-button hx-button-red" href="#anmeldung">{t('Mitglied werden')} <span aria-hidden="true">→</span></a>{!nextEvent&&<a className="hx-button hx-button-ghost" href="#agenda">{t('Zur Agenda')}</a>}</div>
  </div>
  {slides.length>1&&<div className="home-width hx-hero-meta">{caption&&<span>{caption}</span>}<div className="hx-hero-dots" role="group" aria-label={t('Titelbild wählen')}>{slides.map((photo,slide)=><button key={photo.url+slide} type="button" aria-label={`${t('Bild')} ${slide+1}`} aria-current={slide===slideIndex} onClick={()=>setIndex(slide)}/>)}</div></div>}
 </section>;
}

/* Vorschlag 2 · nächster Anlass mit Countdown */
function remaining(target:number,now:number){const minutes=Math.max(0,Math.floor((target-now)/60000));return {days:Math.floor(minutes/1440),hours:Math.floor(minutes/60)%24,minutes:minutes%60};}
export function HomeNextEvent({event,open}:{event?:ClubEvent;open?:(event:ClubEvent)=>void}){
 const [now,setNow]=useState(()=>Date.now());
 useEffect(()=>{const timer=window.setInterval(()=>setNow(Date.now()),30000);return()=>window.clearInterval(timer);},[]);
 if(!event)return null;
 const start=new Date(event.startAt);if(Number.isNaN(start.getTime()))return null;
 const left=remaining(start.getTime(),now);
 const locale=uiLocale();const zone={timeZone:'Europe/Zurich'} as const;
 const when=`${start.toLocaleDateString(locale,{...zone,weekday:'short',day:'numeric',month:'long',year:'numeric'})}, ${start.toLocaleTimeString(locale,{...zone,hour:'2-digit',minute:'2-digit'})}`;
 const place=event.location||event.region?.name||'';
 const closes=event.registrationCloseAt?new Date(event.registrationCloseAt):null;
 const status=event.registrationStatus==='open'?(closes&&!Number.isNaN(closes.getTime())?`${t('Anmeldung offen bis')} ${closes.toLocaleDateString(locale,{...zone,day:'numeric',month:'long'})}`:t('Anmeldung offen')):event.registrationStatus==='waiting'?t('Warteliste offen'):'';
 const pad=(value:number)=>String(value).padStart(2,'0');
 const action=t(event.registrationStatus==='open'||event.registrationStatus==='waiting'?'Jetzt anmelden':'Details ansehen');
 return <div className="home-width hx-next" id="home-next-event" tabIndex={-1}>
  <section className="hx-next-card" aria-labelledby="hx-next-title">
   <time className="hx-calendar" dateTime={event.startAt}><span>{start.toLocaleDateString(locale,{...zone,month:'short'}).replace('.','')}</span><strong>{start.toLocaleDateString(locale,{...zone,day:'numeric'})}</strong></time>
   <div className="hx-next-info"><p className="eyebrow">{t('Nächster Anlass')}</p><h2 id="hx-next-title">{event.title}</h2><p>{[when,place].filter(Boolean).join(' · ')}</p>{status&&<span className="hx-next-status">{status}</span>}</div>
   <div className="hx-countdown" aria-label={`${t('Noch')} ${left.days} ${t(left.days===1?'Tag':'Tage')}`}>
    <div aria-hidden="true"><b>{left.days}</b><small>{t(left.days===1?'Tag':'Tage')}</small></div>
    <div aria-hidden="true"><b>{pad(left.hours)}</b><small>{t('Std')}</small></div>
    <div aria-hidden="true"><b>{pad(left.minutes)}</b><small>{t('Min')}</small></div>
   </div>
   {open?<button type="button" className="hx-button hx-button-red" onClick={()=>open(event)}>{action}</button>:<a className="hx-button hx-button-red" href={`#agenda/${event.id}`}>{action}</a>}
  </section>
 </div>;
}

/* Vorschlag 3 · der Club in Zahlen */
function CountUp({value,from=0,run}:{value:number;from?:number;run:boolean}){
 const [shown,setShown]=useState(value);
 useEffect(()=>{if(!run)return;let frame=0;const begin=performance.now();const step=(time:number)=>{const progress=Math.min(1,(time-begin)/1400);setShown(Math.round(from+(value-from)*(1-Math.pow(1-progress,3))));if(progress<1)frame=requestAnimationFrame(step);};frame=requestAnimationFrame(step);return()=>cancelAnimationFrame(frame);},[run,value,from]);
 return <>{shown}</>;
}
export function HomeStatsBand({stats}:{stats:HomeStats|null|undefined}){
 const reduced=useReducedMotion();const ref=useRef<HTMLElement>(null);const [run,setRun]=useState(false);
 useEffect(()=>{const node=ref.current;if(!node||reduced||run||!('IntersectionObserver' in window))return;const observer=new IntersectionObserver(entries=>{if(entries[0]?.isIntersecting){setRun(true);observer.disconnect();}},{threshold:.4});observer.observe(node);return()=>observer.disconnect();},[reduced,run,stats]);
 const items:[number,string,string,number][]=[[1975,'gegründet','über 50 Jahre Clubgeschichte',1900]];
 if(stats?.members)items.push([stats.members,'Mitglieder','in der ganzen Schweiz',0]);
 if(stats?.vehicles)items.push([stats.vehicles,'Triumph im Club','vom TR2 bis zum TR8',0]);
 if(stats?.regions.length)items.push([stats.regions.length,'Regionen','mit eigenem Stamm',0]);
 if(items.length<2)return null;
 return <section className="hx-stats" ref={ref} aria-label={t('Der Club in Zahlen')}><div className="home-width"><ul>{items.map(([value,label,note,from])=><li key={label}><b><CountUp value={value} from={from} run={run}/></b><span>{t(label)}</span><small>{t(note)}</small></li>)}</ul></div></section>;
}

/* TRiungsters · eigener Bereich für die junge Zielgruppe */
export function HomeTRiungsters({count}:{count?:number|null}){
 const {text:c}=useSiteContent();
 const image=c('home.triungstersImage').trim()||c('triungsters.image').trim();
 const title=c('home.triungstersTitle');
 if(!title)return null;
 return <section className="hx-triungsters" aria-labelledby="hx-triungsters-title"><div className="home-width hx-triungsters-inner">
  <div className="hx-triungsters-image"><Image src={image?assetUrl(image):regionalLandscape('triungsters')} alt="" width={900} height={675}/>{count?<p className="hx-triungsters-count"><b>{count}</b><span>{t('TRiungsters im Club')}</span></p>:null}</div>
  <div className="hx-triungsters-copy">
   <p className="hx-eyebrow">{c('home.triungstersLabel')}</p>
   <h2 id="hx-triungsters-title">{title}</h2>
   {c('home.triungstersText')&&<p>{c('home.triungstersText')}</p>}
   <div className="hx-hero-actions"><a className="hx-button hx-button-red" href="#triungsters">{t('Mehr über die TRiungsters')} <span aria-hidden="true">→</span></a><a className="hx-button hx-button-ghost" href="#anmeldung">{t('Als TRiungster beitreten')}</a></div>
  </div>
 </div></section>;
}

/* Vorschlag 4 · Modellreihe */
// Platzhalterwerte der Redaktion («Beispiel: …») erscheinen nicht auf der Startseite.
const modelText=(values:ContentValues,key:string)=>{const value=typeof values[key]==='string'?(values[key] as string).trim():'';return /^(?:beispiel|exemple|example)\b/i.test(value)?'':value;};
const decode=(html:string)=>html.replace(/<[^>]*>/g,'').replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/&#8217;|&rsquo;/g,'’').replace(/&#039;|&#39;/g,"'").replace(/\s+/g,' ').trim();
/** Erste Zeile nach einer fett gesetzten Bezeichnung im freien Datenfeld («<strong>Bauzeit</strong><br>1953 bis 1955»). */
function factFromBody(values:ContentValues,labels:string[]):string{
 const body=typeof values.factsBody==='string'?values.factsBody:'';
 for(const paragraph of body.split(/<\/p>/i)){
  const match=paragraph.match(/<strong>([\s\S]*?)<\/strong>([\s\S]*)/i);
  if(!match||!labels.some(label=>decode(match[1]).toLowerCase()===label.toLowerCase()))continue;
  const line=match[2].split(/<br\s*\/?>/i).map(decode).find(Boolean)||'';
  return /^(?:beispiel|exemple|example)\b/i.test(line)?'':line;
 }
 return '';
}
export function HomeModels(){
 const {values,published}=useSiteContent();const track=useRef<HTMLDivElement>(null);
 // Nur veröffentlichte Modellporträts liefern Bild und Daten; Beispielwerte erscheinen nicht auf der Startseite.
 const content=(model:string):ContentValues=>{const key='model-'+model.toLowerCase();return published[key]?(values[key]||{}) as ContentValues:{};};
 const step=(direction:number)=>{const node=track.current;if(node)node.scrollBy({left:direction*node.clientWidth*.8,behavior:scrollBehavior()});};
 return <section className="hx-models" aria-labelledby="hx-models-title"><div className="home-width">
  <div className="hx-head"><div><p className="eyebrow">{t('Die Triumph TR-Familie')}</p><h2 id="hx-models-title"><a href="#tr-modelle">{t('Vom TR2 bis zum TR8')}</a></h2></div><div className="hx-track-controls"><button type="button" aria-label={t('Vorherige Modelle')} onClick={()=>step(-1)}>←</button><button type="button" aria-label={t('Weitere Modelle')} onClick={()=>step(1)}>→</button></div></div>
  <div className="hx-model-track" ref={track}>{trModels.map(model=>{const data=content(model);const image=modelText(data,'image');const years=factFromBody(data,['Bauzeit','Période de production'])||modelText(data,'years');const detail=factFromBody(data,['Motor','Moteur'])||[modelText(data,'engine'),modelText(data,'displacement')].filter(Boolean).join(' · ');return <a key={model} className="hx-model" href={`#tr-modelle/${model.toLowerCase()}`}>
   <span className="hx-model-image">{image?<Image src={assetUrl(image)} alt="" width={420} height={250} style={imageFrameStyle(data.imageFrame)}/>:<Placeholder model={model}/>}</span>
   <strong>{modelText(data,'title')||model}</strong>{years&&<span className="hx-model-years">{years}</span>}{detail&&<small>{detail}</small>}
  </a>;})}</div>
 </div></section>;
}

/* Vorschlag 5 · Schweizerkarte mit den Regionen */
type LabelPlacement=['start'|'middle'|'end',number,number];
const defaultLabel:LabelPlacement=['start',14,5];
const labelSide:Record<string,LabelPlacement>={nordwestschweiz:['end',-14,5],mittelland:['end',-14,5],zuerich:['middle',0,30]};
export function HomeRegionMap({regions}:{regions:{name:string;slug:string}[]}){
 const {text:c}=useSiteContent();
 const placed=regions.filter(region=>regionPins[region.slug]);
 const [selected,setSelected]=useState('innerschweiz');
 const current=placed.find(region=>region.slug===selected)||placed[0];
 if(!current)return null;
 const intro=(slug:string)=>c(`region-${slug}.intro`,c('regions.intro'));
 return <section className="hx-regions" aria-labelledby="hx-regions-title"><div className="home-width">
  <div className="hx-head"><div><p className="eyebrow">{t('Lokal präsent – lokal aktiv')}</p><h2 id="hx-regions-title"><a href="#regionen">{t('Unsere Regionen')}</a></h2></div><a className="hx-more" href="#regionen">{t('Alle Regionen')} <span aria-hidden="true">→</span></a></div>
  <div className="hx-regions-grid">
   <div>
    <svg className="hx-map" viewBox={`0 0 ${swissOutline.width} ${swissOutline.height}`} role="img" aria-label={t('Schweizerkarte mit den Regionen des Swiss TR-Club')}>
     <path className="hx-map-land" d={swissOutline.path}/>
     {placed.map(region=>{const [x,y]=regionPins[region.slug];const [anchor,dx,dy]=labelSide[region.slug]??defaultLabel;return <g key={region.slug} className={`hx-pin${region.slug===current.slug?' is-active':''}`} onClick={()=>setSelected(region.slug)} aria-hidden="true"><circle className="hx-pin-halo" cx={x} cy={y} r={12}/><circle className="hx-pin-dot" cx={x} cy={y} r={9}/><text x={x+dx} y={y+dy} textAnchor={anchor}>{t(region.name)}</text></g>;})}
    </svg>
    <div className="hx-region-chips" role="group" aria-label={t('Region wählen')}>{placed.map(region=><button key={region.slug} type="button" aria-pressed={region.slug===current.slug} onClick={()=>setSelected(region.slug)}>{t(region.name)}</button>)}</div>
   </div>
   <article className="hx-region-panel" aria-live="polite">
    <Image src={regionalLandscape(current.slug)} alt="" width={800} height={600}/>
    <div><p className="eyebrow">{t('Region')}</p><h3>{t(current.name)}</h3>{intro(current.slug)&&<p>{intro(current.slug)}</p>}<a className="hx-button hx-button-line" href={`#regionen/${current.slug}`}>{t('Regionalseite öffnen')} <span aria-hidden="true">→</span></a></div>
   </article>
  </div>
 </div></section>;
}

/* Vorschlag 6 · Foto-Wand ohne Namen */
export function HomePhotoWall(){
 const {values}=useSiteContent();const {language}=useUILanguage();
 // Momente aus dem Clubleben: in den Alben für die Startseite ausgewählte Bilder (zuletzt ausgewählte zuerst); Redaktionsbilder als Ersatz.
 const [albumPhotos,setAlbumPhotos]=useState<{url:string;caption:string}[]>([]);
 useEffect(()=>{const controller=new AbortController();query<{url:string;caption:string}[]>('strc_community',{operation:'teasers'},controller.signal).then(rows=>{if(Array.isArray(rows))setAlbumPhotos(rows);}).catch(()=>{});return()=>controller.abort();},[]);
 const editorial=((values.home?.photos??[]) as ContentImage[]).filter(photo=>photo.url).slice(0,6);
 const fromAlbums=albumPhotos.length>=3;
 const count=fromAlbums?Math.min(6,albumPhotos.length):editorial.length;
 if(count<3)return null;
 return <section className="hx-wall-section" aria-labelledby="hx-wall-title"><div className="home-width">
  <div className="hx-head"><div><p className="eyebrow">{t('Galerie')}</p><h2 id="hx-wall-title">{t('Momente aus dem Clubleben')}</h2></div></div>
  <div className={`hx-wall is-${count}`}>{fromAlbums?albumPhotos.slice(0,6).map((photo,index)=><figure key={photo.url+index}><Image unoptimized src={photo.url} alt={photo.caption||t('Clubfoto')} width={900} height={640} loading="lazy" style={{objectFit:'cover'}}/>{photo.caption&&<figcaption aria-hidden="true">{photo.caption.replace(/[.!?]+$/,'')}</figcaption>}</figure>)
   :editorial.map((photo,index)=>{const alt=photoAlt(photo,language);return <figure key={photo.url+index}><Image src={assetUrl(photo.url)} alt={alt} width={900} height={640} loading="lazy" style={imageFrameStyle(photo.frame,'cover')}/>{alt&&<figcaption aria-hidden="true">{alt.replace(/[.!?]+$/,'')}</figcaption>}</figure>;})}</div>
 </div></section>;
}
