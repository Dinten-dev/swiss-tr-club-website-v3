'use client';
import {t} from './UILanguage';
import {useEffect,useRef,useState} from 'react';
import type {PDFDocumentProxy} from 'pdfjs-dist';

// Blätter-Ansicht für das TR-Magazin im Mitglieder-Dashboard.
// Querformat-PDF-Seiten werden in zwei Magazinseiten geteilt; Titel- und Rückseite
// (Querformat mit leeren Rändern) werden mittig ausgeschnitten.
const assetBase=process.env.NEXT_PUBLIC_ASSET_BASE??'';
type Part='full'|'left'|'right'|'center';
type Entry={p:number;part:Part;r:number;edge?:boolean};
type Turn={under:number[];front:number;back:number;side:'left'|'right';reverse?:boolean;go:boolean};

// `pages`: optionale Auswahl von Magazinseiten (Nummerierung wie in der vollen Blätter-Ansicht), z. B. für die Vorschau auf der Startseite.
export default function StrcFlipbook({url,title,classic,pages}:{url:string;title:string;classic?:()=>void;pages?:number[]}){
  const selection=(pages||[]).join(',');
  const [doc,setDoc]=useState<PDFDocumentProxy|null>(null);
  const [error,setError]=useState('');
  const [layout,setLayout]=useState<Entry[]|null>(null);
  const [images,setImages]=useState<Record<string,string>>({});
  const [page,setPage]=useState(1);
  const [anim,setAnim]=useState<Turn|null>(null);
  const [narrow,setNarrow]=useState(()=>typeof window!=='undefined'&&window.innerWidth<760);
  const [userSingle,setUserSingle]=useState<boolean|null>(null);
  const store=useRef<Record<string,string>>({});
  const busy=useRef(new Set<number>());
  const touch=useRef<number|'swiped'|null>(null);
  const layoutRef=useRef<Entry[]|null>(null);const timers=useRef<ReturnType<typeof setTimeout>[]>([]);const generation=useRef(0);
  useEffect(()=>()=>{timers.current.forEach(clearTimeout);generation.current++;},[]);

  useEffect(()=>{
    let disposed=false;timers.current.forEach(clearTimeout);timers.current=[];generation.current++;store.current={};busy.current.clear();layoutRef.current=null;
    let task:ReturnType<typeof import('pdfjs-dist')['getDocument']>|undefined;
    (async()=>{
      const pdf=await import('pdfjs-dist/legacy/build/pdf.mjs');
      if(disposed)return;
      setDoc(null);setLayout(null);setImages({});setPage(1);setError('');setAnim(null);
      pdf.GlobalWorkerOptions.workerSrc=`${assetBase}/pdfjs/pdf.worker.min.js`;
      task=pdf.getDocument({url,withCredentials:true,rangeChunkSize:65536,cMapUrl:`${assetBase}/pdfjs/cmaps/`,cMapPacked:true,standardFontDataUrl:`${assetBase}/pdfjs/standard_fonts/`,wasmUrl:`${assetBase}/pdfjs/wasm/`});
      const loaded=await task.promise;
      if(disposed)return;
      const entries:Entry[]=[];
      for(let p=1;p<=loaded.numPages;p++){
        const v=(await loaded.getPage(p)).getViewport({scale:1});
        if(disposed)return;
        const r=v.width/2/v.height;
        if(v.width/v.height>1.2){
          if(p===1||p===loaded.numPages)entries.push({p,part:'center',r,edge:true});
          else entries.push({p,part:'left',r},{p,part:'right',r});
        }else entries.push({p,part:'full',r:v.width/v.height});
      }
      const chosen=selection?selection.split(',').map(Number).map(n=>entries[n-1]).filter((entry):entry is Entry=>!!entry):entries;
      layoutRef.current=chosen;setLayout(chosen);setDoc(loaded);
    })().catch(()=>{if(!disposed)setError(t('Das PDF konnte nicht geöffnet werden. Bitte erneut versuchen.'));});
    return()=>{disposed=true;task?.destroy().catch(()=>{});};
  },[url,selection]);

  useEffect(()=>{
    const resize=()=>setNarrow(window.innerWidth<760);
    window.addEventListener('resize',resize);
    return()=>window.removeEventListener('resize',resize);
  },[]);

  const one=userSingle??narrow,total=layout?layout.length:0;
  const spreadOf=(p:number)=>one?[p]:p<=1?[0,1]:[p-p%2,p-p%2+1<=total?p-p%2+1:0];
  const firstOf=(p:number)=>one?p:p<=1?1:p-p%2;
  const current=spreadOf(page),currentFirst=firstOf(page);
  const nextFirst=one?currentFirst+1:currentFirst<=1?2:currentFirst+2;
  const prevFirst=one?currentFirst-1:currentFirst<=3?1:currentFirst-2;
  const hasNext=total>0&&nextFirst<=total,hasPrev=currentFirst>1;
  const keyOf=(v:number)=>{const x=layout?.[v-1];return x?`${x.p}:${x.part}`:'';};

  function crop(c:HTMLCanvasElement,sx:number,sw:number){
    const out=document.createElement('canvas');
    out.width=Math.floor(sw);out.height=c.height;
    out.getContext('2d')!.drawImage(c,sx,0,sw,c.height,0,0,sw,c.height);
    return out.toDataURL('image/jpeg',.86);
  }
  function blankSides(c:HTMLCanvasElement){
    try{
      const x=c.getContext('2d')!,w=c.width,h=c.height;
      const count=(sx:number)=>{const d=x.getImageData(Math.floor(sx),0,Math.floor(w*.18),h).data;let n=0;for(let i=0;i<d.length;i+=16)if(d[i]+d[i+1]+d[i+2]<690)n++;return n/(d.length/16);};
      return count(w*.03)<.02&&count(w*.79)<.02;
    }catch{return true;}
  }
  async function draw(v:number){
    const entries=layoutRef.current,x=entries?.[v-1];
    if(!doc||!x||store.current[`${x.p}:${x.part}`]||busy.current.has(x.p))return;
    busy.current.add(x.p);const active=generation.current;
    try{
      const pdfPage=await doc.getPage(x.p),v1=pdfPage.getViewport({scale:1}),vp=pdfPage.getViewport({scale:Math.min(2.2,1300/v1.height)});
      const c=document.createElement('canvas');c.width=Math.floor(vp.width);c.height=Math.floor(vp.height);
      await pdfPage.render({canvas:c,viewport:vp}).promise;
      if(active!==generation.current)return;
      const add:Record<string,string>={};
      if(x.part==='full')add[`${x.p}:full`]=c.toDataURL('image/jpeg',.86);
      else{
        add[`${x.p}:left`]=crop(c,0,c.width/2);add[`${x.p}:right`]=crop(c,c.width/2,c.width/2);
        if(x.edge){
          if(selection||blankSides(c))add[`${x.p}:center`]=crop(c,c.width/4,c.width/2);
          else{const split=entries!.flatMap(y=>y===x?[{p:y.p,part:'left' as Part,r:y.r},{p:y.p,part:'right' as Part,r:y.r}]:[y]);layoutRef.current=split;setLayout(split);}
        }
      }
      store.current={...store.current,...add};setImages(store.current);pdfPage.cleanup();c.width=0;
    }catch{if(active===generation.current)setError(t('Die Seite konnte nicht geladen werden. Öffne Suche, Text & Download.'));}finally{busy.current.delete(x.p);}
  }
  useEffect(()=>{
    if(!doc||!layout)return;
    const wanted=[...spreadOf(page),...spreadOf(Math.min(total,nextFirst)),...spreadOf(Math.max(1,prevFirst)),...spreadOf(Math.min(total,nextFirst+(one?1:2)))];
    (async()=>{for(const v of wanted)if(v)await draw(v);})();
  // eslint-disable-next-line react-hooks/exhaustive-deps -- draw liest den aktuellen Stand über Refs.
  },[doc,layout,page,one]);

  const ratio=layout?.length?(layout[1]||layout[0]).r:.707;
  function turn(dir:1|-1){
    if(anim||!doc)return;
    if((dir>0&&!hasNext)||(dir<0&&!hasPrev))return;
    const target=dir>0?nextFirst:prevFirst,to=spreadOf(target);
    const next:Omit<Turn,'go'>=one
      ?dir>0?{under:[to[0]],front:current[0],back:-1,side:'right'}:{under:[current[0]],front:to[0],back:-1,side:'right',reverse:true}
      :dir>0?{under:[current[0],to[1]],front:current[1],back:to[0],side:'right'}:{under:[to[0],current[1]],front:current[0],back:to[1],side:'left'};
    setAnim({...next,go:false});
    timers.current.push(setTimeout(()=>setAnim(x=>x&&{...x,go:true}),30));
    timers.current.push(setTimeout(()=>{setPage(target);setAnim(null);},window.matchMedia('(prefers-reduced-motion: reduce)').matches?40:680));
  }


  const face=(v:number,className:string)=>{
    if(v===-1)return <div className={`fb-face fb-paper ${className}`}/>;
    if(!v)return <div className={`fb-face fb-empty ${className}`}/>;
    const src=images[keyOf(v)];const shownNumber=number(v);
    // eslint-disable-next-line @next/next/no-img-element -- lokal gerenderte PDF-Seite als Data-URL.
    return <div className={`fb-face ${className}`}>{src?<img src={src} alt={`${t('Seite')} ${shownNumber}`} draggable={false}/>:<span className="fb-loading">{t('Seite wird geladen …')}</span>}</div>;
  };
  const under=anim?anim.under:current,shown=current.filter(Boolean);
  const numbers=selection?selection.split(',').map(Number):null,number=(v:number)=>numbers?.[v-1]??v;
  const label=total?numbers?shown.map(number).join('–'):`${shown.length>1?shown.join('–'):String(shown[0]||1)} ${t('von')} ${total}`:'';

  return <div className={'strc-flipbook'+(one?' is-single':'')}>
    <div className="fb-toolbar">
      <button type="button" className="club-secondary" onClick={()=>turn(-1)} disabled={!hasPrev||!!anim}>← {t('Zurück')}</button>
      <span aria-live="polite">{total?`${t('Seite')} ${label}`:t('Magazin wird geladen …')}</span>
      <button type="button" className="club-secondary" onClick={()=>turn(1)} disabled={!hasNext||!!anim}>{t('Weiter')} →</button>
      <button type="button" className="club-secondary fb-mode" onClick={()=>setUserSingle(!one)}>{one?t('Doppelseite'):t('Einzelseite')}</button>
      {classic&&<button type="button" className="club-secondary fb-mode" onClick={classic}>{t('Suche, Text & Download')}</button>}
    </div>
    {error?<p role="alert">{error}</p>:<div className="fb-book" style={{aspectRatio:String((one?1:2)*ratio),['--fb-ratio' as string]:(one?1:2)*ratio}} tabIndex={0} role="group" aria-label={`${title} – ${t('Blättern mit Pfeiltasten, Klick oder Wischen')}`}
      onKeyDown={e=>{if(e.key==='ArrowRight'){e.preventDefault();turn(1);}else if(e.key==='ArrowLeft'){e.preventDefault();turn(-1);}}}
      onClick={e=>{if(touch.current==='swiped'){touch.current=null;return;}const r=e.currentTarget.getBoundingClientRect();turn(e.clientX-r.left>r.width/2?1:-1);}}
      onPointerDown={e=>{touch.current=e.clientX;}}
      onPointerUp={e=>{const s=touch.current;touch.current=null;if(typeof s==='number'&&Math.abs(e.clientX-s)>50){touch.current='swiped';turn(e.clientX<s?1:-1);}}}>
      {one?face(under[0],'fb-single'):<>{face(under[0],'fb-left')}{face(under[1],'fb-right')}</>}
      {anim&&<div className={`fb-leaf fb-leaf-${one?'single':anim.side}${anim.reverse?' is-reverse':''}${anim.go?' is-turning':''}`}>{face(anim.front,'fb-front')}{face(anim.back,'fb-back')}</div>}
      {!one&&<span className="fb-spine" aria-hidden="true"/>}
    </div>}
    <p className="fb-hint">{t('Zum Blättern auf die rechte oder linke Seite klicken, wischen oder die Pfeiltasten benutzen.')}</p>
  </div>;
}
