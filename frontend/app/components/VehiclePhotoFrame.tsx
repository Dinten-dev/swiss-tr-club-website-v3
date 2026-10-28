'use client';
import {t} from './UILanguage';
import {useRef,type KeyboardEvent,type PointerEvent} from 'react';
import {imageFrameStyle} from './ImageFrame';

/** Seitenverhältnis der Fahrzeugbilder in Profil, Mitgliederliste und Dashboard (Querformat wie Handyfotos). */
export const vehiclePhotoRatio='16 / 9';

const position=(value:string|undefined)=>{const [,x,y]=(value||'').split('|');const n=(v:string|undefined)=>v!==undefined&&/^\d{1,3}$/.test(v)?Math.min(100,Math.max(0,Number(v))):50;return {x:n(x),y:n(y)};};

/** Bildausschnitt wählen: Bild im 16:9-Rahmen mit Maus oder Finger verschieben, Pfeiltasten für feine Schritte. */
export default function VehiclePhotoFrame({src,value,changed}:{src:string;value?:string;changed:(value:string)=>void}){
 const drag=useRef<{x:number;y:number;startX:number;startY:number;width:number;height:number}|null>(null);
 const {x,y}=position(value);
 const set=(nx:number,ny:number)=>changed(`cover|${Math.round(Math.min(100,Math.max(0,nx)))}|${Math.round(Math.min(100,Math.max(0,ny)))}`);
 const down=(event:PointerEvent<HTMLDivElement>)=>{const box=event.currentTarget.getBoundingClientRect();drag.current={x,y,startX:event.clientX,startY:event.clientY,width:box.width,height:box.height};event.currentTarget.setPointerCapture(event.pointerId);};
 // Ziehen nach rechts zeigt mehr vom linken Bildteil: Position läuft entgegen der Zugrichtung.
 const move=(event:PointerEvent<HTMLDivElement>)=>{const d=drag.current;if(!d)return;set(d.x-(event.clientX-d.startX)/d.width*100,d.y-(event.clientY-d.startY)/d.height*100);};
 const key=(event:KeyboardEvent<HTMLDivElement>)=>{const step=event.shiftKey?10:2;const moves:Record<string,[number,number]>={ArrowLeft:[-step,0],ArrowRight:[step,0],ArrowUp:[0,-step],ArrowDown:[0,step]};const delta=moves[event.key];if(!delta)return;event.preventDefault();set(x+delta[0],y+delta[1]);};
 return <div className="vehicle-photo-frame">
  <p className="vehicle-photo-frame-label">{t('Bildausschnitt')}</p>
  <div className="vehicle-photo-frame-box" style={{aspectRatio:vehiclePhotoRatio}} role="slider" tabIndex={0} aria-label={t('Bildausschnitt verschieben')} aria-valuetext={`${x}% / ${y}%`} aria-valuenow={x} aria-valuemin={0} aria-valuemax={100}
   onPointerDown={down} onPointerMove={move} onPointerUp={()=>{drag.current=null;}} onPointerCancel={()=>{drag.current=null;}} onKeyDown={key}>
   {/* eslint-disable-next-line @next/next/no-img-element -- lokale Vorschau (auch noch nicht hochgeladene Datei) */}
   <img src={src} alt="" draggable={false} style={imageFrameStyle(`cover|${x}|${y}`,'cover')}/>
  </div>
  <p className="club-hint">{t('Bild mit Maus oder Finger an die gewünschte Stelle ziehen. So erscheint es im Profil, in der Mitgliederliste und im Dashboard.')} <button type="button" className="market-text-button" onClick={()=>changed('')}>{t('Zentrieren')}</button></p>
 </div>;
}
