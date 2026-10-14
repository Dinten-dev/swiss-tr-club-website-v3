'use client';
import {t} from './UILanguage';
import Image from 'next/image';
import {imageFrameStyle} from './ImageFrame';
import {useEffect,useState,type ReactNode} from 'react';
import {query} from './ClubApi';
import {assetUrl,RichHtml,type ContentValues} from './SiteContent';

export default function RegionalContent({documentKey,values={},events,canEdit=false}:{documentKey:string;values?:ContentValues;events?:ReactNode;canEdit?:boolean}) {
 const text=(key:string)=>typeof values[key]==='string'?values[key] as string:'';
 const tri=documentKey==='triungsters';
 const rich=(key:string,fallback:string)=>text(key).replace(/<[^>]+>/g,'').trim()?<RichHtml html={text(key)}/>:<p className="regional-empty">{t(fallback)}</p>;
 const whatsapp=/^https:\/\//i.test(text('whatsappUrl'))?text('whatsappUrl'):'';
 return <div className="regional-content"><div className="regional-toolbar"><a className="club-secondary" href={canEdit?'#redaktion/'+documentKey:'#mitglieder'}>{t(canEdit?(tri?'TRiungsters bearbeiten':'Region bearbeiten'):'Moderator-Login')}</a>{canEdit&&!tri&&<a className="market-primary" href={'#agenda-verwalten/neu/'+encodeURIComponent(documentKey.replace(/^region-/,''))}>{t('Termin erstellen')}</a>}</div>
 {text('image')&&<figure className="static-cover"><Image src={assetUrl(text('image'))} alt={text('imageAlt')||text('title')} width={1440} height={800} style={imageFrameStyle(text('imageFrame'))}/>{text('imageCaption')&&<figcaption>{text('imageCaption')}</figcaption>}</figure>}<div className="regional-grid">
 <section className="regional-panel"><h2>{t('Kontakt')}</h2><div className="regional-contact">{text('contactImage')?<Image src={assetUrl(text('contactImage'))} alt={text('contactName')||t('Ansprechperson')} width={160} height={160} style={imageFrameStyle(text('contactImageFrame'),'cover')}/>:<div className="regional-avatar" aria-hidden="true">◉</div>}<div><h3>{text('contactName')||t('Ansprechperson folgt')}</h3><p>{text('contactRole')||t(tri?'TRiungsters-Kontakt':'Regionalleitung')}</p>{text('contactPhone')&&<a href={'tel:'+text('contactPhone').replace(/[^+\d]/g,'')}>{text('contactPhone')}</a>}{text('contactEmail')&&<a href={'mailto:'+encodeURIComponent(text('contactEmail'))}>{text('contactEmail')}</a>}</div></div></section>
 <section className="regional-panel"><h2>{t("Treffpunkt")}</h2><h3>{text('meetName')||t('Treffpunkt wird ergänzt')}</h3>{text('meetAddress')&&<p>{text('meetAddress')}</p>}{text('meetSchedule')&&<p className="regional-schedule">{text('meetSchedule').replace(/\s*\|\s*/g,'\n')}</p>}</section>
 <section className="regional-panel"><h2>{t("Nächste Treffen")}</h2>{rich('meetDates','Die nächsten Stammtischtermine werden hier ergänzt.')}</section>
 <section className="regional-panel regional-whatsapp"><h2>{t("WhatsApp-Gruppe")}</h2>{text('whatsappQr')&&<Image src={assetUrl(text('whatsappQr'))} alt={t("QR-Code zur WhatsApp-Gruppe")} width={180} height={180}/>}<p>{t(whatsapp?'In Verbindung bleiben und sich für die nächste Ausfahrt verabreden.':'Der Gruppenlink wird noch ergänzt.')}</p>{whatsapp&&<a className="club-secondary" href={whatsapp} target="_blank" rel="noopener noreferrer">{t("Gruppe beitreten")}</a>}</section>
 </div>
 <section className="regional-panel"><h2>{t(tri?'Über die TRiungsters':'Regionale Informationen')}</h2>{rich('body','Informationen zu unserer Gemeinschaft folgen.')}</section>
 <RegionalDocuments documentKey={documentKey}/>
 <section className="regional-panel"><h2>{t(tri?'TRiungsters-News':'Regionale Neuigkeiten')}</h2>{rich('news','Noch keine Neuigkeiten veröffentlicht.')}</section>
 <section className="regional-panel regional-events-panel"><h2>{t(tri?'Veranstaltungen':'Regionale Veranstaltungen')}</h2>{text('eventBody')&&<RichHtml html={text('eventBody')}/>} {events||<p className="regional-empty">{t("Neue Veranstaltungen werden hier angekündigt. Alle Termine findest du in der")} <a href="#agenda">{t('Agenda')}</a>.</p>}</section>
 </div>;
}

/** Von der Regionalleitung hochgeladene PDFs erscheinen automatisch als Liste. */
function RegionalDocuments({documentKey}:{documentKey:string}){
 const [documents,setDocuments]=useState<{id:number;title:string;url:string}[]>([]);
 useEffect(()=>{const controller=new AbortController();query<{documents:{id:number;title:string;url:string}[]}>('strc_editorial',{operation:'public-documents',key:documentKey},controller.signal).then(result=>setDocuments(result.documents)).catch(()=>{});return()=>controller.abort();},[documentKey]);
 if(!documents.length)return null;
 return <section className="regional-panel regional-documents"><h2>{t('Dokumente')}</h2><ul>{documents.map(document=><li key={document.id}><a href={document.url} target="_blank" rel="noopener noreferrer"><span aria-hidden="true">PDF</span>{document.title}</a></li>)}</ul></section>;
}
