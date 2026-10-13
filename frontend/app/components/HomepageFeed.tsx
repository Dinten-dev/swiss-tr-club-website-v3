'use client';

import {uiLocale,useUILanguage} from './UILanguage';
import {useState} from 'react';
import Magazine,{type MagazineIssue} from './Magazine';
import type {ClubEvent} from '../page';

export type Highlight={id:number;kind:'news'|'event'|'forum';title:string;excerpt:string;bodyHtml:string;date:string;image:string;href:string};
export type Activity={id:number;kind:'forum'|'reply'|'gallery'|'library'|'market';title:string;date:string;author:string;photoCount:number;href:string};
export type HomeFeed={highlights:{items:Highlight[];total:number}|null;activities:Activity[];magazine:MagazineIssue|null;memberAccess:boolean};
let cachedCycle:{day:number;cycle:number}|undefined;

/** One step per full page load; retries, route changes and language changes keep the selection. */
export function homepageCycle():number {
 const parts=new Intl.DateTimeFormat('en',{timeZone:'Europe/Zurich',year:'numeric',month:'numeric',day:'numeric'}).formatToParts(new Date());
 const part=(type:string)=>Number(parts.find(value=>value.type===type)?.value);
 const day=Math.floor(Date.UTC(part('year'),part('month')-1,part('day'))/86400000);
 if(cachedCycle?.day===day)return cachedCycle.cycle;
 let cycle=0;
 try {
  const previous=JSON.parse(sessionStorage.getItem('strc_home_cycle')||'null') as {day:number;cycle:number}|null;
  if(previous&&Number.isSafeInteger(previous.cycle)&&previous.cycle>=0&&Number.isSafeInteger(previous.day))cycle=(previous.cycle+Math.max(1,day-previous.day))%2147483647;
  sessionStorage.setItem('strc_home_cycle',JSON.stringify({day,cycle}));
 }catch{ /* Rotation remains usable when browser storage is unavailable. */ }
 cachedCycle={day,cycle};
 return cycle;
}

export default function HomepageFeed({content,loading,error,retry,events,eventsState,openNews,openEvent}:{content:HomeFeed|null;loading:boolean;error:boolean;retry:()=>void;events:ClubEvent[];eventsState:'loading'|'ready'|'error';openNews:(item:Highlight,button:HTMLButtonElement)=>void;openEvent?:(event:ClubEvent)=>void}) {
 const {language}=useUILanguage();const l=(de:string,fr:string)=>language==='fr'?fr:de;
 const [now]=useState(()=>Date.now());
 const upcoming=events.filter(event=>new Date(event.startAt).getTime()>=now).sort((a,b)=>Date.parse(a.startAt)-Date.parse(b.startAt)).slice(0,3);
 const date=(value:string)=>new Date(value).toLocaleDateString(uiLocale(),{day:'numeric',month:'long',year:'numeric'});
 const status:Record<ClubEvent['registrationStatus'],string>={information:l('Ohne Anmeldung','Sans inscription'),scheduled:l('Anmeldung folgt','Inscription à venir'),open:l('Anmeldung offen','Inscription ouverte'),closed:l('Anmeldung geschlossen','Inscription close'),full:l('Ausgebucht','Complet'),waiting:l('Warteliste offen','Liste d’attente ouverte')};
 const kinds={news:l('Clubnews','Actualités du club'),event:l('Veranstaltung','Événement'),forum:'Forum'};
 const activityText={forum:l('hat ein Thema veröffentlicht','a publié un sujet'),reply:l('hat im Forum geantwortet','a répondu dans le forum'),gallery:l('hat Fotos geteilt','a partagé des photos'),library:l('hat ein Dokument bereitgestellt','a partagé un document'),market:l('hat ein Inserat veröffentlicht','a publié une annonce')};
 const failure=<p className="home-feed-state" role="alert">{l('Die Übersicht konnte nicht geladen werden.','La vue d’ensemble n’a pas pu être chargée.')} <button className="home-text-link" onClick={retry}>{l('Erneut versuchen','Réessayer')}</button></p>;
 return <div className="home-width home-feed" id="home-feed">
  <div className="home-feed-grid">
   <section className="home-feed-panel home-feed-news" aria-labelledby="home-highlights-title"><p className="eyebrow">{l('Das Neueste','Les dernières nouvelles')}</p><h2 id="home-highlights-title"><a href="#neuigkeiten">{l('Aktuell im Club','L’actualité du club')}</a></h2>
    {error?failure:loading?<p role="status">{l('Neuigkeiten werden geladen …','Chargement des actualités…')}</p>:!content?.highlights?.items.length?<p className="home-feed-state">{l('Aktuell sind keine Beiträge für diese Übersicht veröffentlicht.','Aucune publication n’est actuellement disponible dans cette sélection.')}</p>:<ol className="home-feed-list">{content.highlights.items.map(item=><li key={item.id}><p className="home-feed-meta">{kinds[item.kind]} · <time dateTime={item.date}>{date(item.date)}</time></p><h3>{item.kind==='news'?<button onClick={e=>openNews(item,e.currentTarget)}>{item.title}</button>:<a href={item.href}>{item.title}</a>}</h3><p>{item.excerpt}</p></li>)}</ol>}
   </section>
   <section className="home-feed-panel" aria-labelledby="home-next-events-title"><p className="eyebrow">{l('Nächste Events','Prochains événements')}</p><h2 id="home-next-events-title"><a href="#agenda">{l('Gemeinsam unterwegs','En route ensemble')}</a></h2>
    {eventsState==='loading'?<p role="status">{l('Veranstaltungen werden geladen …','Chargement des événements…')}</p>:eventsState==='error'?<p className="home-feed-state" role="alert">{l('Veranstaltungen konnten nicht geladen werden.','Les événements n’ont pas pu être chargés.')} <a href="#agenda">{l('Agenda öffnen','Ouvrir l’agenda')}</a></p>:!upcoming.length?<p className="home-feed-state">{l('Zurzeit sind keine kommenden Veranstaltungen veröffentlicht. Neue Termine findest du hier, sobald sie freigegeben sind.','Aucun événement à venir n’est actuellement publié. Les nouvelles dates apparaîtront ici dès leur publication.')}</p>:<ol className="home-feed-list home-feed-events">{upcoming.map(event=><li key={event.id}><time className="home-feed-date" dateTime={event.startAt}><strong>{new Date(event.startAt).toLocaleDateString(uiLocale(),{day:'2-digit'})}</strong><span>{new Date(event.startAt).toLocaleDateString(uiLocale(),{month:'short'})}</span></time><div><h3>{openEvent?<button onClick={()=>openEvent(event)}>{event.title}</button>:<a href={`#agenda/${event.id}`}>{event.title}</a>}</h3><p>{[event.region?.name,event.location].filter(Boolean).join(' · ')}</p><span className="home-feed-status">{status[event.registrationStatus]}</span></div></li>)}</ol>}
   </section>
   <section className="home-feed-panel home-feed-community" aria-labelledby="home-community-title"><p className="eyebrow">{l('Community','Communauté')}</p><h2 id="home-community-title"><a href="#mitglieder">{l('Aus dem Clubleben','La vie du club')}</a></h2>
    {error?failure:loading?<p role="status">{l('Beiträge werden geladen …','Chargement des publications…')}</p>:!content?.memberAccess?<div className="home-feed-state"><p>{l('Fotos, Wissen und Geschichten unserer Mitglieder. Melde dich an, um die neuesten Beiträge zu sehen.','Photos, connaissances et récits de nos membres. Connecte-toi pour découvrir les dernières publications.')}</p><a className="home-button" href="#club">{l('Zum Club','Le club')} <span aria-hidden="true">→</span></a></div>:!content.activities.length?<p className="home-feed-state">{l('Noch keine freigegebenen Community-Beiträge.','Aucune publication de la communauté n’a encore été approuvée.')}</p>:<ol className="home-feed-list">{content.activities.map((item,i)=><li className="home-feed-activity" key={`${item.kind}-${item.id}-${i}`}><span className="home-feed-avatar" aria-hidden="true">{item.author?item.author.split(/\s+/).slice(0,2).map(part=>Array.from(part)[0]).join(''):'TR'}</span><div><p><strong>{item.author||l('Clubmitglied','Membre du club')}</strong> {activityText[item.kind]}</p><h3><a href={item.href}>{item.title}</a></h3><p className="home-feed-meta">{item.kind==='gallery'&&<>{item.photoCount} {l('freigegebene Fotos','photos approuvées')} · </>}<time dateTime={item.date}>{date(item.date)}</time></p></div></li>)}</ol>}
   </section>
  <Magazine issue={content?.magazine??null} loading={loading} error={error} retry={retry}/>
  </div>
 </div>;
}
