'use client';
import {t,useUILanguage} from './UILanguage';
import {useEffect,useRef,useState,useSyncExternalStore,type KeyboardEvent,type PointerEvent} from 'react';
import Image from 'next/image';
import {useSiteContent,assetUrl,type ContentImage} from './SiteContent';

const motionQuery='(prefers-reduced-motion: reduce)';
const subscribeMotion=(change:()=>void)=>{const query=matchMedia(motionQuery);query.addEventListener('change',change);return()=>query.removeEventListener('change',change);};
const subscribeVisibility=(change:()=>void)=>{document.addEventListener('visibilitychange',change);return()=>document.removeEventListener('visibilitychange',change);};

/** Kopfbereich der Agenda: Anlass-Plakate in der Reihenfolge der Redaktion, vollständig sichtbar (kein Zuschnitt). */
export default function AgendaSlider(){
 const {values}=useSiteContent();const {language}=useUILanguage();
 const slides=((values.agenda?.slides??[]) as ContentImage[]).filter(slide=>slide.url);
 const reduced=useSyncExternalStore(subscribeMotion,()=>matchMedia(motionQuery).matches,()=>true);
 const visible=useSyncExternalStore(subscribeVisibility,()=>!document.hidden,()=>false);
 const [index,setIndex]=useState(0);const [hovered,setHovered]=useState(false);const [focused,setFocused]=useState(false);const [stopped,setStopped]=useState(false);
 const swipe=useRef<number|null>(null);
 const count=slides.length;const current=count?index%count:0;
 useEffect(()=>{if(reduced||hovered||focused||stopped||!visible||count<2)return;const timer=window.setTimeout(()=>setIndex(value=>(value+1)%count),6000);return()=>window.clearTimeout(timer);},[reduced,hovered,focused,stopped,visible,count,index]);
 if(!count)return null;
 const go=(step:number)=>setIndex((current+step+count)%count);
 const alt=(slide:ContentImage)=>language==='fr'&&slide.altFr?slide.altFr:slide.alt;
 const key=(event:KeyboardEvent<HTMLElement>)=>{if(event.key==='ArrowLeft'){event.preventDefault();go(-1);}if(event.key==='ArrowRight'){event.preventDefault();go(1);}};
 const down=(event:PointerEvent<HTMLDivElement>)=>{if(!event.isPrimary||event.button!==0||(event.target as HTMLElement).closest('button,a'))return;swipe.current=event.clientX;event.currentTarget.setPointerCapture(event.pointerId);};
 const up=(event:PointerEvent<HTMLDivElement>)=>{const start=swipe.current;swipe.current=null;if(start===null)return;const delta=event.clientX-start;if(Math.abs(delta)>40)go(delta<0?1:-1);};
 return <section className="agenda-slider" aria-roledescription="carousel" aria-label={t('Anlässe im Überblick')} onKeyDown={key}
  onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)} onFocusCapture={()=>setFocused(true)} onBlurCapture={event=>{if(!event.currentTarget.contains(event.relatedTarget as Node|null))setFocused(false);}}>
  <div className="agenda-slider-stage" onPointerDown={down} onPointerUp={up} onPointerCancel={()=>{swipe.current=null;}}>
   {slides.map((slide,position)=><figure key={slide.url+position} className={`agenda-slide${position===current?' is-active':''}`} aria-roledescription="slide" aria-label={`${position+1} / ${count}`} aria-hidden={position!==current}>
    <div className="agenda-slide-backdrop" style={{backgroundImage:`url("${assetUrl(slide.url)}")`}} aria-hidden="true"/>
    <Image src={assetUrl(slide.url)} alt={alt(slide)} width={1600} height={1130} priority={position===0} loading={position===0?undefined:'lazy'} draggable={false}/>
   </figure>)}
   {count>1&&<><button type="button" className="agenda-slider-arrow is-prev" onClick={()=>go(-1)} aria-label={t('Vorheriges Bild')}>‹</button><button type="button" className="agenda-slider-arrow is-next" onClick={()=>go(1)} aria-label={t('Nächstes Bild')}>›</button></>}
  </div>
  <div className="agenda-slider-controls">
   {count>1&&<div className="agenda-slider-dots" role="group" aria-label={t('Bild wählen')}>{slides.map((slide,position)=><button key={slide.url+position} type="button" aria-label={alt(slide)||`${t('Bild')} ${position+1}`} aria-current={position===current} onClick={()=>setIndex(position)}/>)}</div>}
   {count>1&&!reduced&&<button type="button" className="club-secondary" aria-pressed={stopped} onClick={()=>setStopped(value=>!value)}>{t(stopped?'Automatischen Wechsel fortsetzen':'Automatischen Wechsel pausieren')}</button>}
   <a href={assetUrl(slides[current].url)} target="_blank" rel="noopener noreferrer">{t('Plakat vergrössern')}</a>
  </div>
 </section>;
}
