'use client';
import {t,uiLocale} from './UILanguage';

import {useEffect,useRef,useState} from 'react';
import Image from 'next/image';
import type {ClubEvent} from '../page';

const eventDate=(value:string)=>{const date=new Date(value);return Number.isNaN(date.getTime())?t('Datum folgt'):new Intl.DateTimeFormat(uiLocale(),{day:'numeric',month:'long',year:'numeric'}).format(date);};

function EventSlide({event,past,open}:{event:ClubEvent;past:boolean;open:(event:ClubEvent)=>void}){
 const [imageFailed,setImageFailed]=useState(false);
 const place=event.location||t(event.region?.name||event.scope?.name||'Swiss TR-Club');
 const summary=event.summary?.replace(/^Programm(?=[A-ZÄÖÜ])/u,'').replace(/\s+/g,' ').trim();
 return <button className="home-event-card" type="button" onClick={()=>open(event)} aria-label={`${event.title}, ${eventDate(event.startAt)}, ${t(past?'Rückblick':'Bevorstehend')} – ${t('Details öffnen')}`}>
  <span className={`home-event-media${event.image&&!imageFailed?' has-image':''}`}>
   <Image src={event.image&&!imageFailed?event.image:'/club/club-morgenlicht.jpg'} alt="" width={720} height={440} onError={()=>setImageFailed(true)}/>
   <span className="home-event-status">{t(past?'Rückblick':'Bevorstehend')}</span>
  </span>
  <span className="home-event-copy"><time dateTime={event.startAt}>{eventDate(event.startAt)}</time><strong>{event.title}</strong><span>{place}</span>{summary&&<span className="home-event-summary">{summary}</span>}<small>{t("Event ansehen")}</small></span>
 </button>;
}

export default function HomepageEvents({upcoming,past,loading,error,open}:{upcoming:ClubEvent[];past:ClubEvent[];loading:boolean;error:boolean;open:(event:ClubEvent)=>void}){
 const track=useRef<HTMLDivElement>(null);
 const [canScroll,setCanScroll]=useState(false);
 const slides=[...upcoming.slice(0,5).map(event=>({event,past:false})),...past.slice(0,3).map(event=>({event,past:true}))];
 useEffect(()=>{const node=track.current;if(!node)return;const measure=()=>setCanScroll(node.scrollWidth>node.clientWidth+2);measure();const observer=new ResizeObserver(measure);observer.observe(node);return()=>observer.disconnect();},[slides.length]);
 const metrics=()=>{const node=track.current;const card=node?.querySelector<HTMLElement>('.home-event-card');if(!node||!card)return null;const gap=parseFloat(getComputedStyle(node).columnGap)||0;const stride=card.offsetWidth+gap;return {node,stride,max:Math.max(0,Math.ceil((node.scrollWidth-node.clientWidth-2)/stride))};};
 const step=(direction:number)=>{const result=metrics();if(!result)return;const current=Math.round(result.node.scrollLeft/result.stride);const next=current+direction>result.max?0:current+direction<0?result.max:current+direction;result.node.scrollTo({left:next*result.stride,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});};
 return <section className="home-events" aria-labelledby="home-events-title">
  <div className="home-events-heading"><div><p className="eyebrow">{t("Ausfahrten & Events")}</p><h2 id="home-events-title">{t("Gemeinsam unterwegs.")}</h2><p>{t("Die nächsten Erlebnisse und jüngsten Begegnungen.")}</p></div><a href="#agenda">{t("Zur ganzen Agenda")}</a></div>
  {slides.length?<><div className="home-events-track" data-count={Math.min(slides.length,3)} ref={track} aria-label={t("Veranstaltungen und Rückblicke")}>{slides.map(({event,past})=><EventSlide key={event.id} event={event} past={past} open={open}/>)}</div>{canScroll&&<div className="home-events-footer"><p>{t("Weitere Veranstaltungen entdecken.")}</p><div className="home-events-controls"><button type="button" aria-label={t("Vorherige Events")} onClick={()=>step(-1)}>‹</button><button type="button" aria-label={t("Nächste Events")} onClick={()=>step(1)}>›</button></div></div>}</>:<div className="home-events-empty"><p>{t(loading?'Veranstaltungen werden geladen …':error?'Die Veranstaltungen sind derzeit nicht erreichbar.':'Neue Termine erscheinen hier, sobald sie veröffentlicht sind.')}</p><a href="#agenda">{t("Agenda öffnen")}</a></div>}
 </section>;
}
