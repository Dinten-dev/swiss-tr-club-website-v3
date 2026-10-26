'use client';
import {t} from './UILanguage';

import { useEffect, useRef, useState } from 'react';
import type { PDFDocumentProxy, RenderTask } from 'pdfjs-dist';

const assetBase=process.env.NEXT_PUBLIC_ASSET_BASE??'';

export default function MagazineReader({url,title,back,initialFullscreen=false}:{url:string;title:string;back:()=>void;initialFullscreen?:boolean}) {
  const canvas=useRef<HTMLCanvasElement>(null);
  const viewport=useRef<HTMLDivElement>(null);
  const [document,setDocument]=useState<PDFDocumentProxy|null>(null);
  const [page,setPage]=useState(1);
  const [zoom,setZoom]=useState(1);
  const [width,setWidth]=useState(600);const [height,setHeight]=useState(600);const [fit,setFit]=useState(initialFullscreen);
  const [error,setError]=useState('');
  const [busy,setBusy]=useState(true);
  const [revision,setRevision]=useState(0);
  const [text,setText]=useState('');
  const [textMode,setTextMode]=useState(false);
  const [fullscreen,setFullscreen]=useState(initialFullscreen);const [searched,setSearched]=useState(false);const [search,setSearch]=useState('');const [matches,setMatches]=useState<number[]>([]);const [finding,setFinding]=useState(false);const searchRevision=useRef(0);const touchStart=useRef<number|null>(null);
  useEffect(()=>{
    let disposed=false;const cancelSearch=()=>{searchRevision.current++;};
    let task:ReturnType<typeof import('pdfjs-dist')['getDocument']>|undefined;
    (async()=>{
      const pdf=await import('pdfjs-dist/legacy/build/pdf.mjs');
      if(disposed)return;
      pdf.GlobalWorkerOptions.workerSrc=`${assetBase}/pdfjs/pdf.worker.min.js`;
      task=pdf.getDocument({url,withCredentials:true,rangeChunkSize:65536,cMapUrl:`${assetBase}/pdfjs/cmaps/`,cMapPacked:true,standardFontDataUrl:`${assetBase}/pdfjs/standard_fonts/`,wasmUrl:`${assetBase}/pdfjs/wasm/`});
      const loaded=await task.promise;if(!disposed)setDocument(loaded);
    })().catch(()=>{if(!disposed){setError(t('Das PDF konnte nicht geöffnet werden. Bitte erneut versuchen.'));setBusy(false);}});
    return()=>{disposed=true;cancelSearch();void task?.destroy().catch(()=>{});};
  },[url,revision]);
  useEffect(()=>{
    const element=viewport.current;if(!element)return;
    const observer=new ResizeObserver(entries=>{setWidth(Math.max(180,entries[0].contentRect.width-24));setHeight(Math.max(1,entries[0].contentRect.height-24));});
    observer.observe(element);return()=>observer.disconnect();
  },[]);
  useEffect(()=>{
    if(!document||!canvas.current)return;
    let disposed=false;let rendering:RenderTask|undefined;
    const target=canvas.current;
    (async()=>{
      setBusy(true);setText('');
      const pdfPage=await document.getPage(page);if(disposed)return;
      const natural=pdfPage.getViewport({scale:1});
      // «Ganze Seite»: die Seite passt vollständig in die sichtbare Fläche; sonst Seitenbreite (max. 160 %).
      const displayScale=(fit?Math.min(width/natural.width,height/natural.height):Math.min(width/natural.width,1.6))*zoom;
      const pixelRatio=Math.min(window.devicePixelRatio||1,2);
      const view=pdfPage.getViewport({scale:displayScale*pixelRatio});
      target.width=Math.floor(view.width);target.height=Math.floor(view.height);
      target.style.width=`${view.width/pixelRatio}px`;target.style.height=`${view.height/pixelRatio}px`;
      rendering=pdfPage.render({canvas:target,viewport:view});
      await rendering.promise;
      if(!disposed)setBusy(false);
      // Safari does not implement ReadableStream's async iterator in every supported version.
      const reader=pdfPage.streamTextContent().getReader();
      let pageText='';
      try {
        while(!disposed){const chunk=await reader.read();if(chunk.done)break;pageText+=chunk.value.items.map((item:{str?:string;hasEOL?:boolean})=>item.str?(item.str+(item.hasEOL?'\n':' ')):'').join('');}
        if(!disposed)setText(pageText);
      } finally {await reader.cancel(new Error('PDF view changed.')).catch(()=>{});reader.releaseLock();}
    })().catch(()=>{if(!disposed){setError(t('Diese Seite konnte nicht angezeigt werden. Bitte erneut versuchen oder die PDF herunterladen.'));setBusy(false);}});
    return()=>{disposed=true;rendering?.cancel();};
  },[document,page,zoom,width,height,fit]);
  async function find(){if(!document||!search.trim())return;const generation=++searchRevision.current;setFinding(true);setSearched(false);setMatches([]);const found:number[]=[];try{for(let number=1;number<=document.numPages;number++){if(generation!==searchRevision.current)return;const content=await (await document.getPage(number)).getTextContent();const terms=content.items.map(item=>'str' in item?item.str:'').join(' ').toLocaleLowerCase();if(terms.includes(search.trim().toLocaleLowerCase()))found.push(number);}if(generation===searchRevision.current){setMatches(found);setSearched(true);if(found[0])setPage(found[0]);}}catch{setError(t('Die Suche konnte nicht abgeschlossen werden.'));}finally{if(generation===searchRevision.current)setFinding(false);}}
  const changePage=(next:number)=>{if(document){setPage(Math.max(1,Math.min(document.numPages,next)));viewport.current?.scrollTo({top:0,left:0});}};
  return <div className={"magazine-reader"+(fullscreen?" is-fullscreen":"")} onKeyDown={event=>{if(event.key==='Escape'&&fullscreen){event.preventDefault();event.stopPropagation();setFullscreen(false);setFit(false);setZoom(1);return;}if(event.target instanceof HTMLElement&&event.target.closest('input,select,textarea,[contenteditable]'))return;if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();changePage(page+(event.key==='ArrowRight'?1:-1));}}}>
    <div className="magazine-reader-toolbar" role="toolbar" aria-label={t('Magazin bedienen')}>
      <div className="reader-group"><button onClick={()=>changePage(page-1)} disabled={!document||page===1} aria-label={t('Vorherige Seite')}>‹</button><span className="reader-page" aria-live="polite">{page} / {document?.numPages??'…'}</span><button onClick={()=>changePage(page+1)} disabled={!document||page===document.numPages} aria-label={t('Nächste Seite')}>›</button></div>
      <div className="reader-group"><button onClick={()=>setZoom(value=>Math.max(.5,value-.25))} disabled={zoom<=.5} aria-label={t('Seite verkleinern')}>−</button><span className="reader-zoom">{Math.round(zoom*100)} %</span><button onClick={()=>setZoom(value=>Math.min(3,value+.25))} disabled={zoom>=3} aria-label={t('Seite vergrössern')}>+</button><button aria-pressed={fit} onClick={()=>{setFit(value=>!value);setZoom(1);}}>{t(fit?'Seitenbreite':'Ganze Seite')}</button></div>
      <form className="reader-group reader-search" role="search" onSubmit={e=>{e.preventDefault();void find();}}><input type="search" aria-label={t('PDF durchsuchen')} placeholder={t('Im PDF suchen')} value={search} onChange={e=>{setSearch(e.target.value);setSearched(false);setMatches([]);searchRevision.current++;setFinding(false);}}/><button disabled={!document||finding||!search.trim()}>{t(finding?'Wird gesucht …':'Suchen')}</button>{matches.length>0&&<select aria-label={t('Treffer')} value={matches.includes(page)?String(page):''} onChange={e=>{if(e.target.value)changePage(Number(e.target.value));}}><option value="">{matches.length} {t(matches.length===1?'Treffer':'Treffer')}</option>{matches.map(number=><option key={number} value={number}>{t('Seite')} {number}</option>)}</select>}{searched&&!matches.length&&<span role="status">{t('Keine Treffer')}</span>}</form>
      <div className="reader-group"><button onClick={()=>setTextMode(value=>!value)} aria-pressed={textMode}>{t(textMode?'Seitenansicht':'Text')}</button><button aria-pressed={fullscreen} onClick={()=>{setFullscreen(value=>!value);setFit(!fullscreen);setZoom(1);}} aria-label={t(fullscreen?'Vollbild beenden':'Vollbild')}>{fullscreen?'✕':'⛶'}</button></div>
    </div>
    {error&&<div className="collection-state error" role="alert"><p>{error}</p><button onClick={()=>{setError('');setDocument(null);setBusy(true);setPage(1);setRevision(value=>value+1);}}>{t('Erneut versuchen')}</button></div>}
    <div className="magazine-reader-page" ref={viewport} aria-busy={busy} onTouchStart={event=>{touchStart.current=event.touches[0]?.clientX??null;}} onTouchEnd={event=>{const start=touchStart.current;touchStart.current=null;if(start===null)return;const delta=event.changedTouches[0]?.clientX-start;if(typeof delta==='number'&&Math.abs(delta)>55)changePage(page+(delta<0?1:-1));}}>{busy&&!error&&<p role="status">{t('Seite wird geladen …')}</p>}<canvas ref={canvas} hidden={textMode||!!error} aria-hidden={busy} style={{visibility:busy?'hidden':'visible'}} role="img" aria-label={`${title}, ${t('Seite')} ${page}. ${t('Für vorlesbaren Inhalt Textansicht wählen.')}`}/>{textMode&&!error&&<div className="magazine-reader-text" style={{fontSize:`${20*zoom}px`}}>{text||(!busy?t('Diese Seite enthält keinen auslesbaren Text. Bitte die Seitenansicht verwenden.'):'')}</div>}</div>
    <div className="magazine-reader-footer"><button onClick={back}>{t('Zurück zur Übersicht')}</button><span className="magazine-reader-credit">{t('Mitgliederansicht')} · © Swiss TR-Club</span><a href={url} download>{t('PDF herunterladen')}</a></div>
  </div>;
}
