'use client';
import {useState} from 'react';
import Image from 'next/image';
import {Dialog} from './Marketplace';
import {t} from './UILanguage';

export default function ZoomImage({src,alt,children}:{src:string;alt:string;children:React.ReactNode}){
 const [open,setOpen]=useState(false),[zoom,setZoom]=useState(1);
 return <><button type="button" className="agenda-image-open" onClick={()=>{setZoom(1);setOpen(true);}} aria-label={t('Jahresprogramm vergrössern')}>{children}<span>{t('Vergrössern und zoomen')}</span></button>{open&&<Dialog title={alt||t('Jahresprogramm')} close={()=>setOpen(false)}><div className="image-zoom-toolbar" role="group" aria-label={t('Bildzoom')}><button type="button" className="club-secondary" disabled={zoom<=.5} onClick={()=>setZoom(v=>Math.max(.5,v-.25))}>−</button><span aria-live="polite">{Math.round(zoom*100)} %</span><button type="button" className="club-secondary" disabled={zoom>=3} onClick={()=>setZoom(v=>Math.min(3,v+.25))}>+</button><a href={src} target="_blank" rel="noopener noreferrer">{t('Originaldatei öffnen')}</a></div><div className="image-zoom-viewport"><Image unoptimized src={src} alt={alt} width={2400} height={1600} style={{width:`${zoom*100}%`,maxWidth:'none',height:'auto'}}/></div></Dialog>}</>;
}
