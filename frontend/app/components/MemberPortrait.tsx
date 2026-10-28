'use client';
import {t} from './UILanguage';
import {useEffect,useState} from 'react';
import Image from 'next/image';
import {Dialog} from './Marketplace';
import {fields,mutate,query} from './ClubApi';
import {vehicleModels} from './FormFields';

/** Mitgliedergalerie: ein Bild, Steckbrief und ein Text bis 800 Zeichen. Gepflegt nur von der Redaktion. */
export type Portrait={vehicle:string;chassis:string;year:string;note:string;features:string;owner:string;place:string;region?:string};
type MemberVehicle={id:number;model:string;details:string;year:string;chassis:string;notes:string;photo:string};
type MemberMatch={id:number;name:string;region:string;place:string;vehicles:MemberVehicle[]};
const regions=['Zürich','Bern','Ostschweiz','Mittelland','Innerschweiz','Nordwestschweiz','Suisse Romande'];
type PortraitItem={id:number;title:string;description:string;canReview:boolean;coverKey:string;files:{key:string;url:string;name:string;mime:string}[];portrait?:Portrait|[]};
const empty:Portrait={vehicle:'',chassis:'',year:'',note:'',features:'',owner:'',place:'',region:''};
export const TEXT_LIMIT=800;

export function portraitOf(item:{portrait?:Portrait|[]}|null|undefined):Portrait|null{
 const value=item?.portrait;return value&&!Array.isArray(value)&&value.owner?value:null;
}

export function PortraitView({item,edit}:{item:PortraitItem;edit?:()=>void}){
 const portrait=portraitOf(item);if(!portrait)return null;
 const image=item.files.find(file=>file.key===item.coverKey)||item.files.find(file=>file.mime.startsWith('image/'));
 const features=portrait.features.split('\n').map(line=>line.trim()).filter(Boolean);
 const facts=[portrait.chassis&&`${t('Chassis')}: ${portrait.chassis}`,portrait.year&&`${t('Baujahr')}: ${portrait.year}`,portrait.note].filter(Boolean);
 return <div className="portrait">
  <div className="portrait-top">
   {image?<a className="portrait-photo" href={image.url} target="_blank" rel="noopener noreferrer"><Image unoptimized src={image.url} alt={item.title} width={900} height={600}/></a>:<div className="portrait-photo is-empty" aria-hidden="true"/>}
   <aside className="portrait-card" aria-label={t('Steckbrief')}>
    <h3>{t('Steckbrief')}</h3>
    <p className="portrait-vehicle">{portrait.vehicle}</p>
    {facts.map(line=><p key={line}>{line}</p>)}
    {features.length>0&&<><h4>{t('Besonderheiten')}:</h4>{features.map(line=><p key={line}>{line}</p>)}</>}
    <h4>{t('Besitzer')}:</h4><p>{portrait.owner}</p>{portrait.place&&<p>{portrait.place}</p>}{portrait.region&&<p>{t('Region')} {t(portrait.region)}</p>}
   </aside>
  </div>
  {item.description&&<div className="portrait-text">{item.description.split(/\n+/).map((paragraph,index)=><p key={index}>{paragraph}</p>)}</div>}
  {edit&&item.canReview&&<div className="club-actions"><button type="button" className="club-secondary" onClick={edit}>{t('Porträt bearbeiten')}</button></div>}
 </div>;
}

export function PortraitForm({item,nonce,close,saved,deleted}:{item:PortraitItem|null;nonce:string;close:()=>void;saved:(id:number)=>void;deleted?:()=>void}){
 const start=portraitOf(item)||empty;
 const [values,setValues]=useState<Portrait>(start);const [text,setText]=useState(item?.description||'');const [file,setFile]=useState<File|null>(null);const [preview,setPreview]=useState('');
 // Neues Porträt: zuerst das Mitglied suchen; Name, Ort, Region und Fahrzeuge kommen aus seinem Profil.
 const [search,setSearch]=useState('');const [matches,setMatches]=useState<MemberMatch[]|null>(null);const [member,setMember]=useState<MemberMatch|null>(null);const [vehiclePhoto,setVehiclePhoto]=useState<MemberVehicle|null>(null);
 useEffect(()=>{if(item||member||search.trim().length<2)return;const controller=new AbortController();const timer=window.setTimeout(()=>{query<{members:MemberMatch[]}>('strc_community',{operation:'portrait-member',search:search.trim()},controller.signal).then(result=>setMatches(result.members)).catch(()=>{if(!controller.signal.aborted)setMatches([]);});},250);return()=>{window.clearTimeout(timer);controller.abort();};},[search,item,member]);
 function chooseMember(next:MemberMatch){setMember(next);setValues({...empty,owner:next.name,place:next.place,region:next.region});if(next.vehicles.length===1)chooseVehicle(next.vehicles[0]);}
 function chooseVehicle(vehicle:MemberVehicle){setValues(rows=>({...rows,vehicle:[vehicle.model,vehicle.details].filter(Boolean).join(' ').slice(0,60),chassis:vehicle.chassis.slice(0,40),year:/^(19|20)\d{2}$/.test(vehicle.year)?vehicle.year:rows.year,features:rows.features||vehicle.notes.slice(0,300)}));setVehiclePhoto(vehicle.photo?vehicle:null);}
 const [consent,setConsent]=useState(!!item);const [busy,setBusy]=useState(false);const [error,setError]=useState('');const [confirmDelete,setConfirmDelete]=useState(false);
 useEffect(()=>()=>{if(preview)URL.revokeObjectURL(preview);},[preview]);
 const current=item?.files.find(entry=>entry.key===item.coverKey)||item?.files[0];
 const set=(key:keyof Portrait)=>(event:{target:{value:string}})=>setValues(rows=>({...rows,[key]:event.target.value}));
 function pick(next:File|undefined){setError('');if(!next)return;if(!['image/jpeg','image/png','image/webp'].includes(next.type)){setError(t('Bitte ein JPG-, PNG- oder WebP-Bild wählen.'));return;}if(next.size>20*1024*1024){setError(t('Das Bild darf höchstens 20 MB gross sein.'));return;}setFile(next);setPreview(URL.createObjectURL(next));}
 async function submit(){if(busy)return;if(!item&&!file&&!vehiclePhoto){setError(t('Bitte ein Bild auswählen.'));return;}setBusy(true);setError('');try{const form=fields({operation:'portrait',...(item?{id:String(item.id)}:{}),...values,region:values.region||'',text,consent:consent?'1':'0',...(!file&&vehiclePhoto?{vehiclePhoto:String(vehiclePhoto.id)}:{})});if(file)form.append('files[]',file);const result=await mutate<{id:number}>('strc_community',nonce,form);saved(result.id);}catch(reason){setError((reason as Error).message);}finally{setBusy(false);}}
 async function remove(){if(!item)return;setBusy(true);setError('');try{await mutate('strc_community',nonce,fields({operation:'portrait-delete',id:String(item.id)}));deleted?.();}catch(reason){setError((reason as Error).message);setBusy(false);}}
 const draft:PortraitItem={id:item?.id||0,title:values.owner||t('Vorschau'),description:text,canReview:false,coverKey:'preview',files:preview?[{key:'preview',url:preview,name:'',mime:'image/jpeg'}]:vehiclePhoto?[{key:'preview',url:vehiclePhoto.photo,name:'',mime:'image/jpeg'}]:current?[current]:[],portrait:{...values,owner:values.owner||'…',vehicle:values.vehicle||'…'}};
 return <Dialog title={t(item?'Mitgliederporträt bearbeiten':'Mitgliederporträt erfassen')} close={close} busy={busy}><form className="club-form portrait-form" onSubmit={event=>{event.preventDefault();void submit();}}>
  <p className="club-hint">{t('Mitgliedergalerie: ein Bild, ein Steckbrief und ein kurzer Text. Das Porträt ist nach dem Speichern sofort für Mitglieder sichtbar.')}</p>
  {!item&&<fieldset className="portrait-fields portrait-member"><legend>{t('1. Mitglied')}</legend>
   {member?<div className="portrait-member-chosen"><p><strong>{member.name}</strong>{[member.place,member.region&&t(member.region)].filter(Boolean).length>0&&<> · {[member.place,member.region&&t(member.region)].filter(Boolean).join(' · ')}</>}</p><button type="button" className="market-text-button" onClick={()=>{setMember(null);setVehiclePhoto(null);setMatches(null);}}>{t('Anderes Mitglied wählen')}</button>
    {member.vehicles.length>1&&<label>{t('Fahrzeug aus dem Profil')}<select defaultValue="" onChange={event=>{const vehicle=member.vehicles.find(entry=>String(entry.id)===event.target.value);if(vehicle)chooseVehicle(vehicle);}}><option value="">{t('Bitte wählen')}</option>{member.vehicles.map(vehicle=><option key={vehicle.id} value={vehicle.id}>{[vehicle.model,vehicle.details,vehicle.year].filter(Boolean).join(' ')}</option>)}</select></label>}
    {!member.vehicles.length&&<p className="club-hint">{t('Im Profil ist noch kein Fahrzeug erfasst. Bitte die Angaben unten eintragen.')}</p>}
    {vehiclePhoto&&!file&&<p className="club-hint">{t('Das Fahrzeugbild aus dem Profil wird übernommen. Ein eigenes Bild unten ersetzt es.')}</p>}</div>
   :<><label>{t('Name des Mitglieds')}<input type="search" value={search} onChange={event=>{setSearch(event.target.value);setMatches(null);}} placeholder={t('Vorname oder Name')} autoComplete="off"/></label>
    {matches&&(matches.length?<ul className="portrait-member-matches">{matches.map(match=><li key={match.id}><button type="button" className="market-text-button" onClick={()=>chooseMember(match)}><strong>{match.name}</strong> {[match.place,match.region&&t(match.region),match.vehicles.map(vehicle=>vehicle.model).join(', ')].filter(Boolean).join(' · ')}</button></li>)}</ul>:<p className="club-hint">{t('Kein aktives Mitglied gefunden. Die Angaben lassen sich auch von Hand eintragen.')}</p>)}</>}
  </fieldset>}
  <fieldset className="portrait-fields"><legend>{t('Bild')}</legend>
   <label>{t(item?'Bild ersetzen (optional)':'Bild *')}<input type="file" accept="image/jpeg,image/png,image/webp" disabled={busy} onChange={event=>{pick(event.target.files?.[0]);event.target.value='';}}/><small>{t('JPG, PNG oder WebP bis 20 MB, Querformat empfohlen.')}</small></label>
  </fieldset>
  <fieldset className="portrait-fields"><legend>{t('Steckbrief')}</legend>
   <div className="club-form-row"><label>{t('Fahrzeug *')}<input required maxLength={60} list="portrait-models" value={values.vehicle} onChange={set('vehicle')} placeholder="TR6"/></label><label>{t('Chassis')}<input maxLength={40} value={values.chassis} onChange={set('chassis')} placeholder="CF 2754 U"/></label></div>
   <datalist id="portrait-models">{vehicleModels.map(model=><option key={model} value={model}/>)}</datalist>
   <div className="club-form-row"><label>{t('Baujahr')}<input inputMode="numeric" pattern="(19|20)[0-9]{2}" maxLength={4} value={values.year} onChange={set('year')} placeholder="1973"/></label><label>{t('Zusatz')}<input maxLength={60} value={values.note} onChange={set('note')} placeholder={t('z. B. MFK-Veteran')}/></label></div>
   <label>{t('Besonderheiten (eine pro Zeile)')}<textarea rows={3} maxLength={300} value={values.features} onChange={set('features')} placeholder={'US-Modell\nMallard-Blue'}/></label>
   <div className="club-form-row"><label>{t('Besitzer/in *')}<input required maxLength={80} value={values.owner} onChange={set('owner')} placeholder={t('Vorname Name')}/></label><label>{t('PLZ und Ort')}<input maxLength={80} value={values.place} onChange={set('place')} placeholder="8427 Freienstein"/></label></div>
   <label>{t('Region')}<select value={values.region||''} onChange={set('region')}><option value="">{t('Bitte wählen')}</option>{regions.map(region=><option key={region} value={region}>{t(region)}</option>)}</select></label>
  </fieldset>
  <fieldset className="portrait-fields"><legend>{t('Text')}</legend>
   <label>{t('Text des Mitglieds')}<textarea rows={8} maxLength={TEXT_LIMIT} value={text} onChange={event=>setText(event.target.value)}/><small className={text.length>=TEXT_LIMIT?'is-limit':''}>{text.length} / {TEXT_LIMIT} {t('Zeichen')}</small></label>
  </fieldset>
  <details className="portrait-preview" open><summary>{t('Vorschau')}</summary><PortraitView item={draft}/></details>
  <label className="application-consent"><input type="checkbox" checked={consent} onChange={event=>setConsent(event.target.checked)}/>{t('Das Mitglied ist mit der Veröffentlichung von Bild, Steckbrief und Text im Mitgliederbereich einverstanden.')}</label>
  {error&&<p role="alert">{error}</p>}
  <div className="club-actions"><button type="button" className="club-secondary" disabled={busy} onClick={close}>{t('Abbrechen')}</button><button className="market-primary" disabled={busy||!consent}>{busy?t('Wird gespeichert …'):t(item?'Änderungen speichern':'Porträt veröffentlichen')}</button></div>
  {item&&deleted&&<div className="portrait-delete">{confirmDelete?<span>{t('Porträt mit Bild endgültig löschen?')} <button type="button" className="club-secondary is-danger" disabled={busy} onClick={()=>void remove()}>{t('Ja, löschen')}</button> <button type="button" className="club-secondary" onClick={()=>setConfirmDelete(false)}>{t('Abbrechen')}</button></span>:<button type="button" className="market-text-button" onClick={()=>setConfirmDelete(true)}>{t('Porträt löschen')}</button>}</div>}
 </form></Dialog>;
}
