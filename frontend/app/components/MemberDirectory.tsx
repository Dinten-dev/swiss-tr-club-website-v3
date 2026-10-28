'use client';
import {t} from './UILanguage';
import {useCallback,useEffect,useRef,useState} from 'react';
import Image from 'next/image';
import type {Map as LeafletMap} from 'leaflet';
import {query} from './ClubApi';
import {vehicleModels} from './FormFields';
import {Dialog} from './Marketplace';
import {Pagination} from './EventManager';
import {useSiteContent} from './SiteContent';
import {imageFrameStyle} from './ImageFrame';
import {vehiclePhotoRatio} from './VehiclePhotoFrame';
import 'leaflet/dist/leaflet.css';

type Vehicle={id:number;model:string;details?:string;year?:string;colour?:string;registration?:string;status:string;photo:string;photoFrame?:string};
type Member={id:number;name:string;firstName:string;lastName:string;city:string;postcode:string;region:string;country:string;photo:string;vehicles:Vehicle[];email?:string;phone?:string};
type MapMember={id:number;firstName:string;postcode:string;city:string;country:string;vehicle:string;position:[number,number]|null};
type Collection={mapMembers:MapMember[];members:Member[];total:number;pages:number;regions:string[]};
const sorts:[string,string][]=[['lastName','Nachname'],['firstName','Vorname'],['postcode','PLZ / Ort'],['region','Region'],['vehicle','Fahrzeug']];
const statusLabel=(status:string)=>status==='restoration'?'In Restauration':'Fahrbereit';

function VehicleChip({vehicle}:{vehicle:Vehicle}){
  const ready=vehicle.status!=='restoration';
  return <span className="dir-vehicle" title={t(statusLabel(vehicle.status))}><i className={'dir-dot '+(ready?'is-ready':'is-restoration')} aria-hidden="true"/>{vehicle.model}<span className="sr-only"> ({t(statusLabel(vehicle.status))})</span></span>;
}

export default function MemberDirectory(){
 const {text:c}=useSiteContent();
 const [data,setData]=useState<Collection|null>(null);const [search,setSearch]=useState('');const [region,setRegion]=useState('');const [model,setModel]=useState('');const [sort,setSort]=useState('lastName');const [page,setPage]=useState(1);const [error,setError]=useState('');const [selected,setSelected]=useState<Member|null>(null);const [map,setMap]=useState(false);const [revision,setRevision]=useState(0);const [loading,setLoading]=useState(true);
 useEffect(()=>{const controller=new AbortController();const timer=setTimeout(()=>{setLoading(true);query<Collection>('strc_directory',{operation:'list',search,region,model,sort,map:map?'1':'0',page:String(page)},controller.signal).then(result=>{setData(result);setError('');}).catch(reason=>{if(!controller.signal.aborted)setError(reason.message);}).finally(()=>{if(!controller.signal.aborted)setLoading(false);});},180);return()=>{clearTimeout(timer);controller.abort();};},[search,region,model,sort,page,map,revision]);
 const detail=useCallback(async(id:number)=>{try{setSelected(await query<Member>('strc_directory',{operation:'detail',id:String(id)}));}catch(reason){setError((reason as Error).message);}},[]);
 const change=(apply:()=>void)=>{apply();setPage(1);};
 return <><section className="page-hero"><p className="eyebrow">{t('Für Clubmitglieder')}</p><h1>{c('directory.title','Mitgliederverzeichnis')}</h1><p>{c('directory.intro','Mitglieder und ihre Triumphs finden.')}{data?` · ${data.total} ${t('Mitglieder')}`:''}</p></section>
 <section className="page-content member-directory">
  <div className="dir-toolbar">
   <div className="dir-switch" role="group" aria-label={t('Ansicht')}><button type="button" aria-pressed={!map} onClick={()=>setMap(false)}>☰ {t('Liste')}</button><button type="button" aria-pressed={map} onClick={()=>setMap(true)}>📍 {t('Karte')}</button></div>
   <label className="dir-search"><span className="sr-only">{t('Name suchen')}</span><input type="search" placeholder={t('Name suchen …')} value={search} onChange={e=>change(()=>setSearch(e.target.value))}/></label>
   <label><span className="sr-only">{t('Region')}</span><select value={region} onChange={e=>change(()=>setRegion(e.target.value))}><option value="">{t('Alle Regionen')}</option>{(data?.regions||[]).map(value=><option key={value} value={value}>{t(value)}</option>)}</select></label>
   <label><span className="sr-only">{t('Fahrzeug')}</span><select value={model} onChange={e=>change(()=>setModel(e.target.value))}><option value="">{t('Alle Fahrzeuge')}</option>{vehicleModels.map(value=><option key={value} value={value}>{t(value)}</option>)}</select></label>
   {!map&&<label><span className="sr-only">{t('Sortierung')}</span><select value={sort} onChange={e=>setSort(e.target.value)}>{sorts.map(([value,label])=><option key={value} value={value}>{t('Sortierung')}: {t(label)}</option>)}</select></label>}
  </div>
  <p className="dir-privacy">🔒 {c('directory.privacy','Diese Liste ist ausschliesslich für Mitglieder. Bitte keine Kontaktdaten ohne Zustimmung weitergeben.')}</p>
  {error&&<p role="alert">{error}<button className="market-text-button" onClick={()=>setRevision(v=>v+1)}>{t('Erneut versuchen')}</button></p>}
  {!data?<p role="status">{t("Mitglieder werden geladen …")}</p>:map?<DirectoryMap members={data.mapMembers} detail={detail} loading={loading}/>:<>
   <p className="dir-count" role="status">{data.total} {t(data.total===1?'Mitglied':'Mitglieder')}{loading?' · '+t('wird aktualisiert …'):''}</p>
   {data.members.length?<div className="table-scroll"><table className="dir-table"><thead><tr>{([['lastName','Name'],['postcode','PLZ / Ort'],['region','Region'],['vehicle','Fahrzeuge']] as [string,string][]).map(([key,label])=><th key={key} scope="col" aria-sort={sort===key?'ascending':undefined}><button type="button" onClick={()=>setSort(key)}>{t(label)} {sort===key?'↓':'↕'}</button></th>)}<th><span className="sr-only">{t('Profil')}</span></th></tr></thead>
    <tbody>{data.members.map(member=><tr key={member.id} onClick={()=>void detail(member.id)}><td><button type="button" className="dir-name" onClick={e=>{e.stopPropagation();void detail(member.id);}}>{member.lastName||member.name}{member.firstName?', '+member.firstName:''}</button></td><td>{[member.postcode,member.city].filter(Boolean).join(' ')}</td><td>{member.region&&<span className="dir-region">{t(member.region)}</span>}</td><td>{member.vehicles.map(vehicle=><VehicleChip key={vehicle.id} vehicle={vehicle}/>)}</td><td className="dir-arrow" aria-hidden="true">→</td></tr>)}</tbody></table></div>:<p className="collection-state">{t('Keine passenden Mitglieder gefunden.')}</p>}
   <p className="dir-legend"><i className="dir-dot is-ready" aria-hidden="true"/> {t('Fahrbereit')} <i className="dir-dot is-restoration" aria-hidden="true"/> {t('Nicht fahrbereit / in Restauration')}</p>
   <Pagination page={page} pages={data.pages} change={setPage}/></>}
 </section>
 {selected&&<Dialog title={selected.name} close={()=>setSelected(null)}><div className="club-dialog-body dir-detail">
  <div className="dir-detail-head">{selected.photo&&<Image unoptimized src={selected.photo} alt={selected.name} width={96} height={96}/>}<div><p>{[selected.postcode,selected.city].filter(Boolean).join(' ')}{selected.region?' · '+t(selected.region):''}</p>{selected.email&&<p><a href={'mailto:'+selected.email}>{selected.email}</a></p>}{selected.phone&&<p><a href={'tel:'+selected.phone.replace(/[^+0-9]/g,'')}>{selected.phone}</a></p>}</div></div>
  <h3>{t('Fahrzeuge')}</h3>{selected.vehicles.length?selected.vehicles.map(vehicle=><article key={vehicle.id} className="dir-vehicle-card">{vehicle.photo&&<Image unoptimized src={vehicle.photo} alt={vehicle.model} width={640} height={360} style={{...imageFrameStyle(vehicle.photoFrame,'cover'),aspectRatio:vehiclePhotoRatio,height:'auto'}}/>}<h4><VehicleChip vehicle={vehicle}/> {vehicle.details}</h4><dl className="profile-facts">{([['year','Baujahr'],['colour','Farbe'],['registration','Kennzeichen']] as [keyof Vehicle,string][]).map(([key,label])=><div key={key}><dt>{t(label)}</dt><dd>{String(vehicle[key]||'–')}</dd></div>)}<div><dt>{t('Status')}</dt><dd>{t(statusLabel(vehicle.status))}</dd></div></dl></article>):<p>{t('Keine Fahrzeuge erfasst.')}</p>}
 </div></Dialog>}</>;
}

// Clubfarben: blaue Nadel mit rotem Kern. Position nach Postleitzahl; keine Adress-Geokodierung.
const pinSvg='<svg xmlns="http://www.w3.org/2000/svg" width="28" height="38" viewBox="0 0 28 38"><path d="M14 1C7 1 1.5 6.5 1.5 13.5 1.5 23 14 37 14 37s12.5-14 12.5-23.5C26.5 6.5 21 1 14 1Z" fill="#114973" stroke="#fff" stroke-width="2"/><circle cx="14" cy="13.5" r="5" fill="#bd2028"/></svg>';
function DirectoryMap({members,detail,loading}:{members:MapMember[];detail:(id:number)=>void;loading:boolean}){
 const container=useRef<HTMLDivElement>(null);const [error,setError]=useState('');const [progress,setProgress]=useState({done:0,total:0});
 useEffect(()=>{let disposed=false;let map:LeafletMap|undefined;const controller=new AbortController();
  (async()=>{const L=await import('leaflet');if(disposed||!container.current)return;// Kleinste Zoomstufe = ganze Schweiz; weiter herauszoomen oder wegschieben geht nicht.
   const switzerland=L.latLngBounds([45.78,5.92],[47.86,10.53]);
   map=L.map(container.current,{scrollWheelZoom:true,maxZoom:16,maxBounds:switzerland.pad(0.08),maxBoundsViscosity:1}).fitBounds(switzerland);
   const limit=()=>{if(map){map.setMinZoom(map.getBoundsZoom(switzerland,false));}};limit();map.on('resize',limit);L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:16,attribution:'© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(map);
   const icon=L.divIcon({html:pinSvg,className:'dir-pin',iconSize:[28,38],iconAnchor:[14,37],popupAnchor:[0,-32]});
   const bounds:[number,number][]=[];
   const add=(position:[number,number],list:MapMember[],offset=0)=>{
    list.forEach((member,index)=>{const angle=(index+offset)*2.4,radius=index||offset?0.0012*Math.sqrt(index+offset):0;const point:[number,number]=[position[0]+radius*Math.cos(angle),position[1]+radius*1.4*Math.sin(angle)];bounds.push(point);
     const popup=document.createElement('button');popup.type='button';popup.className='dir-pin-popup';popup.innerHTML='';const name=document.createElement('strong');name.textContent=member.firstName;popup.appendChild(name);if(member.vehicle){const car=document.createElement('span');car.textContent=member.vehicle;popup.appendChild(car);}popup.addEventListener('click',()=>detail(member.id));
     L.marker(point,{icon,title:member.firstName}).addTo(map!).bindPopup(popup);});
   };
   members.filter(member=>member.position).forEach(member=>add(member.position!,[member]));
   const groups=new Map<string,MapMember[]>();members.forEach(member=>{if(!member.position&&member.postcode&&(!member.country||member.country==='CH')){const list=groups.get(member.postcode)||[];list.push(member);groups.set(member.postcode,list);}});
   const pending=Array.from(groups);let next=0;let done=0;setProgress({done:0,total:pending.length});setError('');
   async function load(){while(next<pending.length&&!disposed){const [postcode,list]=pending[next++];try{const result=await query<{position:[number,number]|null}>('strc_directory',{operation:'location',postcode},controller.signal);if(disposed)return;if(result.position)add(result.position,list);}catch{if(!disposed)setError(t('Einige Standorte konnten nicht geladen werden.'));}finally{if(!disposed)setProgress({done:++done,total:pending.length});}}}
   await Promise.all(Array.from({length:Math.min(4,pending.length)},load));
   if(!disposed&&bounds.length)map.fitBounds(bounds,{padding:[30,30],maxZoom:12});
  })().catch(()=>{if(!disposed)setError(t('Die Karte konnte nicht geladen werden.'));});return()=>{disposed=true;controller.abort();map?.remove();};
 },[members,detail]);
 return <div className="dir-map-wrap">{(loading||progress.done<progress.total)&&<p role="status" className="dir-map-status">{t('Standorte werden geladen …')} {progress.total?`${progress.done}/${progress.total}`:''}</p>}<div ref={container} className="directory-map" aria-label={t('Mitgliederkarte')}/><p className="dir-map-legend"><span className="dir-pin-mini" aria-hidden="true"/> {t('Mitglied · Ungefährer Standort nach Postleitzahl')}</p>{error&&<p role="status">{error}</p>}</div>;
}
