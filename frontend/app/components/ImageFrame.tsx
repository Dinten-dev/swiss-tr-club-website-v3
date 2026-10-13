'use client';
import Image from 'next/image';
import type {CSSProperties} from 'react';
import {assetUrl} from './SiteContent';
export function imageFrameStyle(value:unknown,defaultFit:'contain'|'cover'='contain'):CSSProperties {
 const [fit,x,y]=typeof value==='string'?value.split('|'):[];
 const percent=(v:string|undefined)=>v!==undefined&&/^\d{1,3}$/.test(v)?Math.min(100,Math.max(0,Number(v))):50;
 return {objectFit:fit==='cover'||fit==='contain'?fit:defaultFit,objectPosition:`${percent(x)}% ${percent(y)}%`};
}
export default function ImageFrameControl({value='',image='',label='Bild im Rahmen',changed,portrait=false}:{value?:string;image?:string;label?:string;changed:(v:string)=>void;portrait?:boolean}) {
 const style=imageFrameStyle(value,portrait?'cover':'contain');const [x,y]=String(style.objectPosition).replaceAll('%','').split(' ');
 const set=(fit:string,a:string,b:string)=>changed(`${fit}|${a}|${b}`);
 return <fieldset className="image-frame-control"><legend>{label}</legend>{image&&<div className={`image-frame-preview${portrait?' portrait':''}`}><Image src={assetUrl(image)} alt="Vorschau des Bildausschnitts" width={720} height={portrait?900:430} style={style}/></div>}<label>Einpassen<select value={style.objectFit} onChange={e=>set(e.target.value,x,y)}><option value="contain">Ganzes Bild zeigen</option><option value="cover">Rahmen ausfüllen / zuschneiden</option></select></label><div className="club-form-row"><label>Horizontal: {x}%<input type="range" min="0" max="100" value={x} onChange={e=>set(String(style.objectFit),e.target.value,y)}/></label><label>Vertikal: {y}%<input type="range" min="0" max="100" value={y} onChange={e=>set(String(style.objectFit),x,e.target.value)}/></label></div><small>Links / oben: 0%, Mitte: 50%, rechts / unten: 100%. Das Originalbild bleibt erhalten. Änderungen anschliessend veröffentlichen.</small></fieldset>;
}
