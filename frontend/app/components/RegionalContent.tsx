'use client';
import {t} from './UILanguage';
import Image from 'next/image';
import {imageFrameStyle} from './ImageFrame';
import {useEffect,useState,type ReactNode} from 'react';
import {fields,mutate,query,wordpressUrl} from './ClubApi';
import {assetUrl,RichHtml,useSiteContent,type ContentValues} from './SiteContent';
import RichEditor from './RichEditor';
import PublicDocuments from './PublicDocuments';
import {ImageField} from './EditorialDashboard';

type Field={key:string;label:string;type:string;adminOnly?:boolean;translationOf?:string;legacy?:boolean;imageKey?:string};
type Doc={key:string;schema:{title:string;route:string;fields:Field[]};revision:number;values:ContentValues;hasDraft:boolean;canAdminister?:boolean};
type Editing={doc:Doc;values:ContentValues;nonce:string};
// Felder, die direkt im jeweiligen Kasten der Regionalseite bearbeitet werden; alle übrigen Admin-Felder stehen im Kasten «Administration».
const inlineKeys=['contactName','contactRole','contactImage','contactImageFrame','contactPhone','contactEmail','meetName','meetAddress','meetSchedule','meetDates','whatsappUrl','whatsappQr','body','news','eventBody'];

export default function RegionalContent({documentKey,values={},events,canEdit=false}:{documentKey:string;values?:ContentValues;events?:ReactNode;canEdit?:boolean}) {
 const {refresh}=useSiteContent();
 const [edit,setEdit]=useState<Editing|null>(null);const [busy,setBusy]=useState(false);const [uploading,setUploading]=useState(false);const [error,setError]=useState('');const [notice,setNotice]=useState('');const [confirmCancel,setConfirmCancel]=useState(false);
 const shown=edit?edit.values:values;
 const text=(key:string)=>typeof shown[key]==='string'?shown[key] as string:'';
 const tri=documentKey==='triungsters';
 const rich=(key:string,fallback:string)=>text(key).replace(/<[^>]+>/g,'').trim()?<RichHtml html={text(key)}/>:<p className="regional-empty">{t(fallback)}</p>;
 const whatsapp=/^https:\/\//i.test(text('whatsappUrl'))?text('whatsappUrl'):'';
 const dirty=!!edit&&JSON.stringify(edit.values)!==JSON.stringify(edit.doc.values);
 const locked=busy||uploading;
 useEffect(()=>{if(!dirty)return;const guard=(event:BeforeUnloadEvent)=>{event.preventDefault();event.returnValue='';};window.addEventListener('beforeunload',guard);return()=>window.removeEventListener('beforeunload',guard);},[dirty]);

 async function start(){
  setBusy(true);setError('');setNotice('');
  try{
   const session=await fetch(`${wordpressUrl}/wp-admin/admin-ajax.php?action=strc_session`,{credentials:'include'}).then(r=>r.json() as Promise<{editorialNonce?:string}>);
   const doc=await query<Doc>('strc_editorial',{operation:'document',key:documentKey});
   setEdit({doc,values:doc.values,nonce:session.editorialNonce||''});
   if(doc.hasDraft)setNotice(t('Sie bearbeiten einen gespeicherten Entwurf. Besucher sehen noch die veröffentlichte Fassung.'));
  }catch(reason){setError((reason as Error).message);}finally{setBusy(false);}
 }
 async function save(mode:'draft'|'publish'){
  if(!edit||locked)return;setBusy(true);setError('');setNotice('');
  try{
   const doc=await mutate<Doc>('strc_editorial',edit.nonce,fields({operation:'save',key:documentKey,revision:String(edit.doc.revision),mode,values:JSON.stringify(edit.values)}));
   if(mode==='publish'){await refresh();setEdit(null);setNotice(t('Veröffentlicht. Die Regionalseite zeigt jetzt die neue Fassung.'));}
   else{setEdit({...edit,doc,values:doc.values});setNotice(t('Entwurf gespeichert. Besucher sehen weiterhin die veröffentlichte Fassung.'));}
  }catch(reason){setError((reason as Error).message);}finally{setBusy(false);}
 }
 function cancel(){if(dirty&&!confirmCancel){setConfirmCancel(true);return;}setConfirmCancel(false);setEdit(null);setError('');setNotice('');}

 const field=(key:string)=>edit?.doc.schema.fields.find(row=>row.key===key&&!row.translationOf);
 const allowed=(key:string)=>{const def=field(key);return !!edit&&!!def&&(!!edit.doc.canAdminister||!def.adminOnly);};
 const set=(key:string,value:string)=>{setEdit(current=>current?{...current,values:{...current.values,[key]:value}}:current);setConfirmCancel(false);};
 const label=(key:string,fallback:string)=>t(field(key)?.label||fallback);
 const input=(key:string,fallback:string,multiline=false)=>allowed(key)?<label className="regional-edit-field">{label(key,fallback)}{multiline?<textarea rows={2} value={text(key).replace(/\s*\|\s*/g,'\n')} onChange={event=>set(key,event.target.value)} disabled={locked}/>:<input value={text(key)} onChange={event=>set(key,event.target.value)} disabled={locked}/>}</label>:null;
 const richInput=(key:string,fallback:string)=>allowed(key)?<div className="regional-edit-field"><RichEditor label={label(key,fallback)} value={text(key)} onChange={value=>set(key,value)} disabled={locked}/></div>:null;
 const imageInput=(key:string,fallback:string)=>allowed(key)&&edit?<ImageField label={label(key,fallback)} value={text(key)} changed={url=>set(key,url)} nonce={edit.nonce} target={{key:documentKey}} uploadState={setUploading}/>:null;
 const adminFields=edit?.doc.canAdminister?edit.doc.schema.fields.filter(row=>row.adminOnly&&!row.translationOf&&!row.legacy&&!inlineKeys.includes(row.key)&&['text','textarea','url','rich','image'].includes(row.type)):[];

 return <div className={'regional-content'+(edit?' is-editing':'')}>
 <div className="regional-toolbar">{canEdit?(edit?null:<><button type="button" className="club-secondary" disabled={busy} onClick={()=>void start()}>{t(busy?'Wird geladen …':tri?'TRiungsters-Seite bearbeiten':'Diese Seite bearbeiten')}</button>{!tri&&<a className="market-primary" href={'#agenda-verwalten/neu/'+encodeURIComponent(documentKey.replace(/^region-/,''))}>{t('Termin erstellen')}</a>}</>):<a className="club-secondary" href="#mitglieder">{t('Moderator-Login')}</a>}</div>
 {edit&&<div className="regional-edit-bar" role="region" aria-label={t('Bearbeitungsmodus')}><div><strong>{t('Bearbeitungsmodus')}</strong><span>{dirty?t('Ungespeicherte Änderungen'):t('Felder direkt in den Kästen ändern')}</span></div><div className="regional-edit-actions">{confirmCancel?<><span>{t('Änderungen verwerfen?')}</span><button type="button" className="club-secondary is-danger" onClick={cancel}>{t('Verwerfen')}</button><button type="button" className="club-secondary" onClick={()=>setConfirmCancel(false)}>{t('Weiter bearbeiten')}</button></>:<><button type="button" className="club-secondary" disabled={locked} onClick={cancel}>{t('Beenden')}</button><button type="button" className="club-secondary" disabled={locked||!dirty} onClick={()=>void save('draft')}>{t('Entwurf speichern')}</button><button type="button" className="market-primary" disabled={locked} onClick={()=>void save('publish')}>{t(uploading?'Bild wird hochgeladen …':busy?'Bitte warten …':'Veröffentlichen')}</button></>}</div></div>}
 {(error||notice)&&<p role={error?'alert':'status'} className={error?'collection-state error':'club-notice'}>{error||notice}</p>}
 {edit&&adminFields.length>0&&<section className="regional-panel regional-admin-panel"><h2>{t('Administration')}</h2><p className="club-hint">{t('Nur für die Administration sichtbar.')}</p>{adminFields.map(row=>row.type==='rich'?<div key={row.key}>{richInput(row.key,row.label)}</div>:row.type==='image'?<div key={row.key}>{imageInput(row.key,row.label)}</div>:<div key={row.key}>{input(row.key,row.label,row.type==='textarea')}</div>)}</section>}
 {text('image')&&<figure className="static-cover"><Image src={assetUrl(text('image'))} alt={text('imageAlt')||text('title')} width={1440} height={800} style={imageFrameStyle(text('imageFrame'))}/>{text('imageCaption')&&<figcaption>{text('imageCaption')}</figcaption>}</figure>}<div className="regional-grid">
 <section className="regional-panel"><h2>{t('Kontakt')}</h2><div className="regional-contact">{text('contactImage')?<Image src={assetUrl(text('contactImage'))} alt={text('contactName')||t('Ansprechperson')} width={160} height={160} style={imageFrameStyle(text('contactImageFrame'),'cover')}/>:<div className="regional-avatar" aria-hidden="true">◉</div>}<div><h3>{text('contactName')||t('Ansprechperson folgt')}</h3><p>{text('contactRole')||t(tri?'TRiungsters-Kontakt':'Regionalleitung')}</p>{text('contactPhone')&&<a href={'tel:'+text('contactPhone').replace(/[^+\d]/g,'')}>{text('contactPhone')}</a>}{text('contactEmail')&&<a href={'mailto:'+encodeURIComponent(text('contactEmail'))}>{text('contactEmail')}</a>}</div></div>
  {edit&&(allowed('contactName')?<div className="regional-edit-group">{input('contactName','Name')}{input('contactRole','Funktion')}{input('contactPhone','Telefon')}{input('contactEmail','E-Mail')}{imageInput('contactImage','Porträt')}</div>:<p className="regional-edit-hint">{t('Die Kontaktangaben pflegt die Administration.')}</p>)}</section>
 <section className="regional-panel"><h2>{t("Treffpunkt")}</h2>{edit?<div className="regional-edit-group">{input('meetName','Treffpunkt: Name')}{input('meetAddress','Treffpunkt: Adresse')}{input('meetSchedule','Rhythmus und Zeit',true)}</div>:<><h3>{text('meetName')||t('Treffpunkt wird ergänzt')}</h3>{text('meetAddress')&&<p>{text('meetAddress')}</p>}{text('meetSchedule')&&<p className="regional-schedule">{text('meetSchedule').replace(/\s*\|\s*/g,'\n')}</p>}</>}</section>
 <section className="regional-panel"><h2>{t("Nächste Treffen")}</h2>{edit?richInput('meetDates','Nächste Treffen'):rich('meetDates','Die nächsten Stammtischtermine werden hier ergänzt.')}</section>
 <section className="regional-panel regional-whatsapp"><h2>{t("WhatsApp-Gruppe")}</h2>{text('whatsappQr')&&<Image src={assetUrl(text('whatsappQr'))} alt={t("QR-Code zur WhatsApp-Gruppe")} width={180} height={180}/>}<p>{t(whatsapp?'In Verbindung bleiben und sich für die nächste Ausfahrt verabreden.':'Der Gruppenlink wird noch ergänzt.')}</p>{whatsapp&&<a className="club-secondary" href={whatsapp} target="_blank" rel="noopener noreferrer">{t("Gruppe beitreten")}</a>}
  {edit&&(allowed('whatsappUrl')?<div className="regional-edit-group">{input('whatsappUrl','Beitrittslink')}{imageInput('whatsappQr','QR-Code als Bild')}</div>:<p className="regional-edit-hint">{t('Die WhatsApp-Gruppe pflegt die Administration.')}</p>)}</section>
 </div>
 <section className="regional-panel"><h2>{t(tri?'Über die TRiungsters':'Weitere Termine')}</h2>{edit?richInput('body',tri?'Über die TRiungsters':'Weitere Termine'):rich('body','Informationen zu unserer Gemeinschaft folgen.')}</section>
 <section className="regional-panel"><h2>{t(tri?'TRiungsters-News':'Neuigkeiten')}</h2>{edit?richInput('news',tri?'TRiungsters-News':'Neuigkeiten'):rich('news','Noch keine Neuigkeiten veröffentlicht.')}</section>
 <section className="regional-panel regional-events-panel"><h2>{t(tri?'Veranstaltungen':'Unsere Anlässe')}</h2>{edit?richInput('eventBody','Text über der Terminliste'):text('eventBody')&&<RichHtml html={text('eventBody')}/>} {events||<p className="regional-empty">{t("Neue Veranstaltungen werden hier angekündigt. Alle Termine findest du in der")} <a href="#agenda">{t('Agenda')}</a>.</p>}</section>
 {edit?<section className="regional-panel regional-documents"><h2>{t('Dokumente')}</h2><PublicDocuments docKey={documentKey} nonce={edit.nonce} disabled={locked} uploadState={setUploading} regional/></section>:<RegionalDocuments documentKey={documentKey}/>}
 {edit&&<p className="regional-edit-hint">{t('Französische Texte und frühere Fassungen:')} <a href={'#redaktion/'+documentKey}>{t('im Redaktionsbereich öffnen')}</a></p>}
 </div>;
}

/** Von der Regionalleitung hochgeladene PDFs erscheinen automatisch als Liste. */
function RegionalDocuments({documentKey}:{documentKey:string}){
 const [documents,setDocuments]=useState<{id:number;title:string;url:string}[]>([]);
 useEffect(()=>{const controller=new AbortController();query<{documents:{id:number;title:string;url:string}[]}>('strc_editorial',{operation:'public-documents',key:documentKey},controller.signal).then(result=>setDocuments(result.documents)).catch(()=>{});return()=>controller.abort();},[documentKey]);
 if(!documents.length)return null;
 return <section className="regional-panel regional-documents"><h2>{t('Dokumente')}</h2><ul>{documents.map(document=><li key={document.id}><a href={document.url} target="_blank" rel="noopener noreferrer"><span aria-hidden="true">PDF</span>{document.title}</a></li>)}</ul></section>;
}
