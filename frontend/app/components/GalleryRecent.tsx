'use client';
import {useEffect,useState} from 'react';
import Image from 'next/image';
import {t} from './UILanguage';
import {query} from './ClubApi';

type Album={id:number;title:string;description:string;createdAt:string;classification:Record<string,string|string[]|undefined>;files:{key:string;name:string;mime:string;url:string}[]};
type Attendee={name:string;vehicle:{model?:string;year?:string;color?:string}};
const text=(value:string|string[]|undefined)=>Array.isArray(value)?value.join(', '):value||'';

function Participants({eventId}:{eventId:string}){
  const [open,setOpen]=useState(false);const [people,setPeople]=useState<Attendee[]|null>(null);const [error,setError]=useState('');
  useEffect(()=>{if(!open||people)return;const controller=new AbortController();query<{participants:Attendee[]}>('strc_registration',{operation:'roster',eventId},controller.signal).then(data=>setPeople(data.participants)).catch(reason=>{if(!controller.signal.aborted)setError(reason.message);});return()=>controller.abort();},[open,people,eventId]);
  return <div className="gallery-participants"><button type="button" className="market-text-button" aria-expanded={open} onClick={()=>setOpen(value=>!value)}>{t('Teilnehmer')} {open?'▴':'▾'}</button>
    {open&&(error?<p role="alert">{error}</p>:!people?<p role="status">{t('Wird geladen …')}</p>:!people.length?<p>{t('Keine Teilnehmerliste vorhanden.')}</p>:<ul>{people.map((person,index)=><li key={index}>{person.name}{person.vehicle?.model&&<span> · {[person.vehicle.model,person.vehicle.year].filter(Boolean).join(' ')}</span>}</li>)}</ul>)}
  </div>;
}

/** Galerie-Hauptseite: die letzten fünf Veranstaltungen mit Album, Kurztext, Teilnehmenden und Vorschaubildern. */
export default function GalleryRecent({open}:{open:(id:number)=>void}){
  const [albums,setAlbums]=useState<Album[]|null>(null);
  useEffect(()=>{const controller=new AbortController();query<{items:Album[]}>('strc_community',{operation:'gallery-recent'},controller.signal).then(result=>setAlbums(result.items)).catch(()=>setAlbums([]));return()=>controller.abort();},[]);
  if(!albums?.length)return null;
  return <section className="gallery-recent" aria-label={t('Letzte Veranstaltungen')}>
    <h2>{t('Letzte Veranstaltungen')}</h2>
    {albums.map(album=>{const images=album.files.filter(file=>file.mime.startsWith('image/'));const date=text(album.classification.date);return <article key={album.id} className="gallery-recent-row">
      <div className="gallery-recent-copy">
        <h3><button type="button" className="card-title-button" onClick={()=>open(album.id)}>{album.title}</button></h3>
        {date&&<p className="eyebrow">{new Date(date).toLocaleDateString('de-CH')}</p>}
        {album.description&&<p>{album.description.slice(0,60)}{album.description.length>60?' …':''}</p>}
        <Participants eventId={text(album.classification.eventId)}/>
      </div>
      <div className="gallery-recent-thumbs">{images.slice(0,4).map(file=><button type="button" key={file.key} onClick={()=>open(album.id)} aria-label={`${album.title} öffnen`}><Image unoptimized src={file.url} alt="" width={180} height={130}/></button>)}{images.length>4&&<button type="button" className="gallery-recent-more" onClick={()=>open(album.id)}>+{images.length-4}</button>}</div>
    </article>;})}
    <h2>{t('Alle Alben')}</h2>
  </section>;
}
