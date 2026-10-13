'use client';
import {t,useUILanguage} from './UILanguage';
import {lazy,Suspense,useEffect,useRef,useState} from 'react';
import Image from 'next/image';
import {Dialog} from './Marketplace';
const MagazineReader=lazy(()=>import('./MagazineReader'));
export type MagazineIssue={id:number;title:string;teaser:string;cover:string;previewPages?:string[];previewCaptions?:string[];previewKind?:string;public:boolean;canRead:boolean;fileUrl:string;loginUrl:string};
export default function Magazine({issue,loading,error,retry}:{issue:MagazineIssue|null;loading:boolean;error:boolean;retry:()=>void}){
 const {language}=useUILanguage();const l=(de:string,fr:string)=>language==='fr'?fr:de;
 const [open,setOpen]=useState(false);const [reading,setReading]=useState(false);const [index,setIndex]=useState(0);const [zoom,setZoom]=useState(false);
 const opener=useRef<HTMLAnchorElement|null>(null);const returned=useRef(false);
 const pages=(issue?.previewPages||[]).slice(0,6);const current=Math.min(index,Math.max(0,pages.length-1));
 const caption=issue?.previewCaptions?.[current]||`${l('Vorschau','Aperçu')} ${current+1} · ${issue?.title||''}`;
 useEffect(()=>{if(!issue||returned.current||new URLSearchParams(window.location.search).get('magazine')!==String(issue.id))return;returned.current=true;const frame=requestAnimationFrame(()=>{setOpen(true);setReading(issue.canRead);});return()=>{cancelAnimationFrame(frame);returned.current=false;};},[issue]);
 function close(){setOpen(false);setZoom(false);setReading(false);const url=new URL(window.location.href);url.searchParams.delete('magazine');window.history.replaceState(null,'',url);requestAnimationFrame(()=>opener.current?.focus({preventScroll:true}));}
 const preview=pages[current]||issue?.cover;
 const pager=pages.length>1&&<div className="magazine-spread-pager"><button className="club-secondary" disabled={current===0} onClick={()=>setIndex(current-1)} aria-label={l('Vorherige Vorschau','Aperçu précédent')}>←</button><span aria-live="polite">{current+1} / {pages.length}</span><button className="club-secondary" disabled={current===pages.length-1} onClick={()=>setIndex(current+1)} aria-label={l('Nächste Vorschau','Aperçu suivant')}>→</button></div>;
 return <section className="home-magazine" id="home-magazine" aria-label={l('Das TR-Magazin','Le TR-Magazine')}>
  <a className={`home-preview-card home-tile-magazine${preview?' has-cover':''}`} href="#home-magazine" aria-haspopup="dialog" aria-disabled={loading} onClick={e=>{e.preventDefault();if(loading)return;if(error){retry();return;}opener.current=e.currentTarget;setReading(!!issue?.canRead);setOpen(true);}}>
   {preview?<div className="home-tile-cover"><Image unoptimized src={preview} alt={caption} width={900} height={650}/></div>:<div className="home-magazine-mark" aria-hidden="true">TR<span>MAGAZINE</span></div>}
   <div className="home-tile-magazine-caption"><p className="eyebrow">TR Magazine</p><h2>{issue?.title||l('Das TR-Magazin','Le TR-Magazine')}</h2><p>{error?l('Die Ausgabe konnte nicht geladen werden. Hier erneut versuchen.','L’édition n’a pas pu être chargée. Réessayer ici.'):loading?l('Magazin wird geladen …','Chargement du magazine…'):pages.length?caption:issue?.teaser||l('Die aktuelle Ausgabe wird hier ergänzt.','La dernière édition sera ajoutée ici.')}</p></div>
  </a>{pages.length>1&&<div className="magazine-home-pager">{pager}</div>}
  {open&&<Dialog title={issue?.title||l('Das TR-Magazin','Le TR-Magazine')} close={zoom?()=>setZoom(false):close}>
   {reading&&issue?.canRead?<Suspense fallback={<p role="status">{l('Leseansicht wird geladen …','Chargement du lecteur…')}</p>}><MagazineReader url={issue.fileUrl} title={issue.title} initialFullscreen back={()=>setReading(false)}/></Suspense>:<div className="home-magazine-preview">
    {preview&&<button className={`magazine-spread-stage${zoom?' is-zoomed':''}`} onClick={()=>setZoom(value=>!value)} aria-label={l(zoom?'Verkleinern':'Vorschau vergrössern',zoom?'Réduire':'Agrandir l’aperçu')}><Image unoptimized className="magazine-spread-image" src={preview} alt={caption} width={1800} height={1300}/></button>}
    {preview&&<p>{caption}</p>}{pager}<p>{issue?.teaser||l('Die aktuelle Ausgabe wird hier ergänzt.','La dernière édition sera ajoutée ici.')}</p>
    {issue?.canRead?<button className="home-button" onClick={()=>setReading(true)}>{l('Magazin lesen','Lire le magazine')} →</button>:issue&&<><p>{l('Die vollständige Ausgabe ist für Clubmitglieder.','L’édition complète est réservée aux membres.')}</p><a className="home-button" href={issue.loginUrl}>{l('Anmelden & lesen','Se connecter et lire')} →</a></>}
    <button className="home-text-link" onClick={close}>{t('Schliessen')}</button>
   </div>}
  </Dialog>}
 </section>;
}
