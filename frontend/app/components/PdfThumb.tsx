'use client';
import {useEffect,useRef,useState} from 'react';

// Vorschaubild der ersten PDF-Seite (für Magazin-, Newsletter- und Clubdokument-Listen).
// Wird erst gerendert, wenn das Element sichtbar ist; bei Querformat (Titelseite mittig auf der Doppelseite) wird die Mitte gezeigt.
const assetBase=process.env.NEXT_PUBLIC_ASSET_BASE??'';
const cache=new Map<string,string>();
export default function PdfThumb({url,width=120}:{url:string;width?:number}){
  const box=useRef<HTMLSpanElement>(null);
  const [src,setSrc]=useState(()=>cache.get(url)||'');
  const [visible,setVisible]=useState(false);
  useEffect(()=>{
    if(src||!box.current)return;
    const observer=new IntersectionObserver(entries=>{if(entries.some(entry=>entry.isIntersecting)){setVisible(true);observer.disconnect();}},{rootMargin:'200px'});
    observer.observe(box.current);
    return()=>observer.disconnect();
  },[src]);
  useEffect(()=>{
    if(!visible||src)return;
    let disposed=false;
    let task:ReturnType<typeof import('pdfjs-dist')['getDocument']>|undefined;
    (async()=>{
      const pdf=await import('pdfjs-dist/legacy/build/pdf.mjs');
      pdf.GlobalWorkerOptions.workerSrc=`${assetBase}/pdfjs/pdf.worker.min.js`;
      task=pdf.getDocument({url,withCredentials:true,rangeChunkSize:65536,disableAutoFetch:true,cMapUrl:`${assetBase}/pdfjs/cmaps/`,cMapPacked:true,standardFontDataUrl:`${assetBase}/pdfjs/standard_fonts/`,wasmUrl:`${assetBase}/pdfjs/wasm/`});
      const doc=await task.promise;const page=await doc.getPage(1);
      const base=page.getViewport({scale:1});const landscape=base.width/base.height>1.2;
      const scale=(landscape?width*2:width)*2/base.width;const viewport=page.getViewport({scale});
      const canvas=document.createElement('canvas');canvas.width=Math.floor(viewport.width);canvas.height=Math.floor(viewport.height);
      await page.render({canvas,viewport}).promise;
      let out=canvas;
      if(landscape){out=document.createElement('canvas');out.width=Math.floor(canvas.width/2);out.height=canvas.height;out.getContext('2d')!.drawImage(canvas,canvas.width/4,0,canvas.width/2,canvas.height,0,0,canvas.width/2,canvas.height);}
      const data=out.toDataURL('image/jpeg',.8);cache.set(url,data);
      if(!disposed)setSrc(data);
      page.cleanup();
    })().catch(()=>{});
    return()=>{disposed=true;task?.destroy().catch(()=>{});};
  },[visible,src,url,width]);
  // eslint-disable-next-line @next/next/no-img-element -- lokal gerenderte PDF-Seite als Data-URL.
  return <span ref={box} className="pdf-thumb" style={{width}}>{src?<img src={src} alt=""/>:<span className="pdf-thumb-placeholder" aria-hidden="true">PDF</span>}</span>;
}
