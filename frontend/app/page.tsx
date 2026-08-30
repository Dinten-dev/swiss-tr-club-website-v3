'use client';

import { createElement, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

type Page = 'home' | 'club' | 'agenda' | 'regions' | 'market' | 'members' | 'forum' | 'gallery' | 'library' | 'directory';
type Lang = 'de' | 'fr';
type MemberSession = {
  authenticated: boolean;
  memberAccess: boolean;
  displayName?: string;
  vehicle?: string;
  membership?: { memberNumber:string; status:string; type:string; region:string; startedOn:string } | null;
};
type EventTerm = { name:string; slug:string } | null;
type ClubEvent = {
  id:number;
  title:string;
  summary:string;
  description:string;
  startAt:string;
  endAt:string;
  location:string;
  eventType:EventTerm;
  scope:EventTerm;
  region:EventTerm;
  registrationRequired:boolean;
  registrationStatus:'information'|'scheduled'|'open'|'closed';
  registrationOpenAt:string;
  registrationCloseAt:string;
  capacity:number;
  image:string;
};

const wordpressUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL ?? 'http://localhost:8080';
const frontendUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

const regions = ['Zürich','Zentralschweiz','Nordwestschweiz','Bern','Ostschweiz','Romandie','Tessin','Wallis'];
const products = [
  { icon:'◈', name:'Polo-Shirt Club Edition', price:45, type:'Shop' },
  { icon:'▤', name:'TR6 Workshop Manual', price:55, type:'Shop' },
  { icon:'◉', name:'Speichenräder 15 Zoll', price:680, type:'Teile' },
  { icon:'TR4', name:'Triumph TR4A IRS 1967', price:34800, type:'Fahrzeuge' },
];

const copy = {
  de: { club:'Club', agenda:'Agenda', regions:'Regionen', market:'Marktplatz', members:'Mitglieder', login:'Mitglieder-Login', welcome:'Willkommen beim Swiss TR-Club', headline:'British roadsters.', accent:'Swiss roads.', intro:'Gemeinsam fahren, erhalten und erleben wir Triumph TR-Sportwagen – in acht Regionen der Schweiz.', drive:'Nächste Ausfahrt', discover:'Club entdecken' },
  fr: { club:'Club', agenda:'Agenda', regions:'Régions', market:'Marché', members:'Membres', login:'Connexion membres', welcome:'Bienvenue au Swiss TR-Club', headline:'British roadsters.', accent:'Swiss roads.', intro:'Nous conduisons, préservons et célébrons ensemble les Triumph TR – dans huit régions de Suisse.', drive:'Prochaine sortie', discover:'Découvrir le club' },
};

export default function Home() {
  const [page, setPage] = useState<Page>('home');
  const [lang, setLang] = useState<Lang>('de');
  const [memberSession, setMemberSession] = useState<MemberSession | null>(null);
  const [events, setEvents] = useState<ClubEvent[]>([]);
  const [eventsState, setEventsState] = useState<'loading'|'ready'|'error'>('loading');
  const [selectedEvent, setSelectedEvent] = useState<ClubEvent | null>(null);
  const [cart, setCart] = useState(0);
  const [toast, setToast] = useState('');
  const t = copy[lang];

  useEffect(() => {
    let active = true;
    fetch(`${wordpressUrl}/wp-admin/admin-ajax.php?action=strc_session`, { credentials:'include' })
      .then((response) => response.ok ? response.json() as Promise<MemberSession> : Promise.reject())
      .then((session) => { if (active) setMemberSession(session); })
      .catch(() => { if (active) setMemberSession({ authenticated:false, memberAccess:false }); });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    let active = true;
    fetch(`${wordpressUrl}/wp-json/strc/v1/events?view=upcoming&limit=100`)
      .then((response) => response.ok ? response.json() as Promise<{events:ClubEvent[]}> : Promise.reject())
      .then((result) => { if (active) { setEvents(result.events); setEventsState('ready'); } })
      .catch(() => { if (active) setEventsState('error'); });
    return () => { active = false; };
  }, []);

  function navigate(next: Page) { setPage(next); setSelectedEvent(null); window.scrollTo({ top:0, behavior:'smooth' }); }
  function notify(message: string) { setToast(message); window.setTimeout(() => setToast(''), 2600); }

  return <main>
    <header className="site-header">
      <button className="brand brand-button" onClick={() => navigate('home')} aria-label="Swiss TR-Club Startseite">
        <Image className="brand-logo" src="/strc-logo.png" width={954} height={954} alt="Swiss TR-Club Logo" priority/><span><strong>Swiss TR-Club</strong><small>Passion since 1973</small></span>
      </button>
      <nav aria-label="Hauptnavigation">
        <button className={page==='club'?'active':''} onClick={() => navigate('club')}>{t.club}</button>
        <button className={page==='agenda'?'active':''} onClick={() => navigate('agenda')}>{t.agenda}</button>
        <button className={page==='regions'?'active':''} onClick={() => navigate('regions')}>{t.regions}</button>
        <button className={page==='market'?'active':''} onClick={() => navigate('market')}>{t.market}{cart>0&&<b className="cart-count">{cart}</b>}</button>
      </nav>
      <div className="header-actions">
        <button className="language" onClick={() => setLang(lang==='de'?'fr':'de')} aria-label="Sprache wechseln">{lang.toUpperCase()} <span>⇄</span></button>
        <button className="login" onClick={() => navigate('members')}>{memberSession?.memberAccess?'Mein Bereich':t.login}</button>
      </div>
    </header>

    {page==='home' && <HomePage t={t} navigate={navigate} events={events} eventsState={eventsState} openEvent={setSelectedEvent}/>}
    {page==='club' && <ClubPage navigate={navigate}/>} 
    {page==='agenda' && <AgendaPage events={events} eventsState={eventsState} openEvent={setSelectedEvent}/>}
    {page==='regions' && <RegionsPage notify={notify}/>} 
    {page==='market' && <MarketPage cart={cart} add={() => { setCart(cart+1); notify('Artikel wurde dem Warenkorb hinzugefügt.'); }}/>} 
    {page==='members' && <MembersPage session={memberSession} navigate={navigate}/>}
    {page==='forum' && <ForumPage notify={notify}/>} 
    {page==='gallery' && <GalleryPage notify={notify}/>} 
    {page==='library' && <LibraryPage/>} 
    {page==='directory' && <DirectoryPage/>} 

    <footer><div className="footer-brand"><Image className="footer-logo" src="/strc-logo.png" width={954} height={954} alt="Swiss TR-Club Logo"/><div><strong>Swiss TR-Club</strong><p>Freude an britischen Roadstern seit 1973.</p></div></div><div><strong>Entdecken</strong><button onClick={() => navigate('club')}>Über den Club</button><button onClick={() => navigate('agenda')}>Veranstaltungen</button><button onClick={() => navigate('regions')}>Regionen</button></div><div><strong>Mitglieder</strong><button onClick={() => navigate('members')}>Dashboard</button><button onClick={() => navigate('forum')}>Forum</button><button onClick={() => navigate('library')}>Bibliothek</button></div><div><strong>Kontakt & Recht</strong><p>Kontakt · Impressum<br/>Datenschutz · Statuten</p></div></footer>

    {selectedEvent && <EventDialog event={selectedEvent} close={() => setSelectedEvent(null)}/>}
    {toast && <div className="toast" role="status">✓ {toast}</div>}
  </main>;
}

function HomePage({t,navigate,events,eventsState,openEvent}:{t:typeof copy.de,navigate:(p:Page)=>void,events:ClubEvent[],eventsState:'loading'|'ready'|'error',openEvent:(event:ClubEvent)=>void}) {
  return <>
    <section className="hero" id="top"><div className="hero-stage"><div className="hero-road" aria-hidden="true"/><div className="hero-copy"><p className="eyebrow">{t.welcome}</p><h1>{t.headline}<br/><em>{t.accent}</em></h1><p className="intro">{t.intro}</p><div className="hero-actions"><button className="primary" onClick={() => navigate('agenda')}>{t.drive}</button><button className="secondary" onClick={() => navigate('club')}>{t.discover} <span>→</span></button></div><div className="hero-facts"><span><strong>50+</strong> Jahre Clubgeschichte</span><span><strong>316</strong> aktive Mitglieder</span><span><strong>8</strong> Regionen</span></div></div><ScrollRoadster/><div className="scroll-cue" aria-hidden="true"><span/>Drehen und losfahren</div></div></section>
    <section className="content-grid"><div className="section-heading"><p className="eyebrow">Unterwegs mit Freunden</p><h2>Die nächsten Erlebnisse</h2></div><div className="events"><EventCollectionState state={eventsState} count={events.length}/>{events.slice(0,3).map((event)=><EventCard key={event.id} event={event} open={() => openEvent(event)}/>)}</div><aside className="magazine-card"><p className="eyebrow">Aktuelle Ausgabe</p><div className="magazine"><span>51. Jahrgang</span><strong>Swiss<br/>TR-Magazin</strong><b>2 | 2026</b></div><h3>Geschichten, Technik und Menschen</h3><p>Für Mitglieder digital verfügbar.</p><button onClick={() => navigate('library')}>Magazin öffnen →</button></aside></section>
    <section className="feature-band"><div><p className="eyebrow">Mehr als ein Automobilclub</p><h2>Menschen. Technik. Leidenschaft.</h2><p>Gemeinsame Ausfahrten, technisches Wissen und Freundschaften über Sprachgrenzen hinweg.</p></div><div className="feature-cards"><article><span>01</span><h3>Fahren</h3><p>Ausfahrten und Treffen in der ganzen Schweiz.</p></article><article><span>02</span><h3>Erhalten</h3><p>Erfahrung und Dokumentation für jeden TR.</p></article><article><span>03</span><h3>Verbinden</h3><p>Acht Regionen, eine lebendige Gemeinschaft.</p></article></div></section>
  </>;
}

function ScrollRoadster() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    type ViewerElement = HTMLElement & {
      loaded?: boolean;
      model?: { materials: Array<{ name:string; pbrMetallicRoughness:{ setBaseColorFactor:(color:[number,number,number,number])=>void } }> };
    };
    let disposed = false;
    let viewer: ViewerElement | null = null;
    const section = hostRef.current?.closest('.hero') as HTMLElement | null;
    const stage = hostRef.current?.closest('.hero-stage') as HTMLElement | null;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const paintRed = () => {
      const paint = viewer?.model?.materials.find((material) => material.name === 'carpaint');
      paint?.pbrMetallicRoughness.setBaseColorFactor([0.58, 0.025, 0.035, 1]);
    };
    const update = () => {
      if (!section || !viewer) return;
      const distance = Math.max(section.offsetHeight - window.innerHeight, 1);
      const progress = Math.min(1, Math.max(0, (window.scrollY - section.offsetTop) / distance));
      const turnProgress = reduceMotion ? 0 : Math.min(1, progress / 0.62);
      const driveProgress = reduceMotion ? 0 : Math.max(0, Math.min(1, (progress - 0.62) / 0.38));
      const orbit = 35 + turnProgress * 180;
      const elevation = 72 - Math.sin(turnProgress * Math.PI) * 8;
      viewer.setAttribute('camera-orbit', `${orbit}deg ${elevation}deg 105%`);
      hostRef.current?.style.setProperty('--turn-progress', turnProgress.toFixed(3));
      hostRef.current?.style.setProperty('--drive-progress', driveProgress.toFixed(3));
      stage?.style.setProperty('--scene-progress', progress.toFixed(3));
    };
    void import('@google/model-viewer').then(() => {
      if (disposed) return;
      viewer = hostRef.current?.querySelector('model-viewer') as ViewerElement | null;
      viewer?.addEventListener('load', paintRed);
      if (viewer?.loaded) paintRed();
      update();
    });
    window.addEventListener('scroll', update, { passive:true });
    window.addEventListener('resize', update);
    return () => {
      disposed = true;
      viewer?.removeEventListener('load', paintRed);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return <div className="model-art" ref={hostRef}>
    <div className="model-halo" aria-hidden="true"/>
    {createElement('model-viewer', {
      class: 'tr6-model',
      src: '/models/triumph-tr6.glb',
      poster: '/models/triumph-tr6-red-poster.png',
      alt: 'Interaktives 3D-Modell eines Triumph TR6',
      'camera-orbit': '35deg 72deg 105%',
      'field-of-view': '28deg',
      'shadow-intensity': '1.1',
      'shadow-softness': '1',
      exposure: '1.1',
      loading: 'eager',
      reveal: 'auto',
      'interaction-prompt': 'none',
      'disable-zoom': true,
    })}
  </div>;
}

function PageHero({eyebrow,title,text}:{eyebrow:string,title:string,text:string}) { return <section className="page-hero"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{text}</p></section>; }
function eventDateParts(value:string) { const date=new Date(value); if(Number.isNaN(date.getTime())) return {day:'–',month:'DATUM',year:''}; return {day:new Intl.DateTimeFormat('de-CH',{day:'2-digit'}).format(date),month:new Intl.DateTimeFormat('de-CH',{month:'short'}).format(date).replace('.','').toUpperCase(),year:new Intl.DateTimeFormat('de-CH',{year:'numeric'}).format(date)}; }
function eventDateTime(value:string) { const date=new Date(value); return Number.isNaN(date.getTime())?'Wird bekanntgegeben':new Intl.DateTimeFormat('de-CH',{dateStyle:'long',timeStyle:'short'}).format(date); }
function eventContext(event:ClubEvent) { return event.region?.name||event.scope?.name||event.eventType?.name||'Swiss TR-Club'; }
function registrationLabel(status:ClubEvent['registrationStatus']) { return {information:'Keine Anmeldung erforderlich',scheduled:'Anmeldung öffnet später',open:'Anmeldung erforderlich',closed:'Anmeldung geschlossen'}[status]; }
function EventCollectionState({state,count}:{state:'loading'|'ready'|'error',count:number}) { if(state==='loading') return <p className="collection-state" role="status">Agenda wird geladen …</p>; if(state==='error') return <p className="collection-state error" role="alert">Die Agenda kann momentan nicht geladen werden.</p>; if(count===0) return <p className="collection-state">Momentan sind keine kommenden Veranstaltungen veröffentlicht.</p>; return null; }
function EventCard({event,open}:{event:ClubEvent,open:()=>void}) { const date=eventDateParts(event.startAt); return <article className="event-card"><div className="event-date"><strong>{date.day}</strong><span>{date.month}</span></div><div><p>{eventContext(event)}</p><h3>{event.title}</h3><span>{event.location||event.eventType?.name} · {registrationLabel(event.registrationStatus)}</span></div><button onClick={open} aria-label={`${event.title} öffnen`}>→</button></article>; }

function ClubPage({navigate}:{navigate:(p:Page)=>void}) { return <><PageHero eyebrow="Der Club" title="Gemeinsam unterwegs seit 1973." text="Der Swiss TR-Club verbindet Menschen, die britische Triumph-Roadster fahren, pflegen und lieben."/><section className="story-grid"><article className="story-main"><p className="eyebrow">Unsere Mission</p><h2>Automobile Geschichte lebendig halten.</h2><p>Wir bewahren nicht nur Fahrzeuge. Wir teilen Wissen, organisieren Erlebnisse und schaffen Verbindungen zwischen Generationen und Sprachregionen.</p><blockquote>«Der TR bringt uns zusammen. Die Freundschaften halten uns zusammen.»</blockquote></article><aside className="timeline"><div><b>1973</b><span>Gründung des Clubs</span></div><div><b>8</b><span>Regionen in der Schweiz</span></div><div><b>316</b><span>Aktive Mitglieder</span></div><div><b>2026</b><span>Neue digitale Plattform</span></div></aside></section><section className="membership-cta"><div><p className="eyebrow">Mitglied werden</p><h2>Ihr Triumph gehört dazu.</h2><p>Profitieren Sie von Veranstaltungen, Wissen und Gemeinschaft.</p></div><button onClick={() => navigate('members')}>Mitgliedschaft entdecken →</button></section></>; }

function AgendaPage({events,eventsState,openEvent}:{events:ClubEvent[],eventsState:'loading'|'ready'|'error',openEvent:(event:ClubEvent)=>void}) { const [filter,setFilter]=useState('Alle'); const visible=events.filter(event=>filter==='Alle'||(filter==='Club Schweiz'&&event.scope?.slug==='club-national')||(filter==='Regionen'&&event.scope?.slug==='region')||(filter==='International'&&event.scope?.slug==='external')); return <><PageHero eyebrow="Veranstaltungen" title="Agenda" text="Clubausfahrten, regionale Treffen und internationale Begegnungen."/><section className="page-content"><div className="filterbar">{['Alle','Club Schweiz','Regionen','International'].map(x=><button className={filter===x?'active':''} onClick={()=>setFilter(x)} key={x}>{x}</button>)}</div><div className="agenda-list"><EventCollectionState state={eventsState} count={visible.length}/>{visible.map((event)=>{const date=eventDateParts(event.startAt);return <div className="agenda-row" key={event.id}><div className="agenda-date"><strong>{date.day}</strong><span>{date.month}<br/>{date.year}</span></div><div><p className="eyebrow">{eventContext(event)}</p><h2>{event.title}</h2><p>{event.summary}</p><span className={`status ${event.registrationStatus==='open'?'open':'closed'}`}>{registrationLabel(event.registrationStatus)}</span> {event.location&&<small>{event.location}</small>}</div><div className="agenda-price"><strong>{event.eventType?.name||'Clubveranstaltung'}</strong><button onClick={()=>openEvent(event)}>Details →</button></div></div>})}</div></section></>; }

function RegionsPage({notify}:{notify:(s:string)=>void}) { return <><PageHero eyebrow="In Ihrer Nähe" title="Acht Regionen. Ein Club." text="Lokale Treffen, persönliche Kontakte und gemeinsame Ausfahrten."/><section className="page-content regions-grid">{regions.map((region,i)=><article key={region}><span>0{i+1}</span><h2>{region}</h2><p>{28+i*4} Mitglieder · monatlicher Stammtisch</p><button onClick={()=>notify(`Region ${region} geöffnet.`)}>Region ansehen →</button></article>)}</section></>; }

function MarketPage({cart,add}:{cart:number,add:()=>void}) { const [tab,setTab]=useState('Alle'); return <><PageHero eyebrow="Marktplatz" title="Für Fahrer und Fahrzeuge." text="Clubartikel, Ersatzteile und Fahrzeuge aus der Gemeinschaft."/><section className="page-content"><div className="market-head"><div className="filterbar">{['Alle','Shop','Teile','Fahrzeuge'].map(x=><button className={tab===x?'active':''} onClick={()=>setTab(x)} key={x}>{x}</button>)}</div><span className="basket">Warenkorb · {cart}</span></div><div className="product-grid">{products.filter(p=>tab==='Alle'||p.type===tab).map(p=><article key={p.name}><div className="product-image">{p.icon}</div><p className="eyebrow">{p.type}</p><h3>{p.name}</h3><strong>CHF {p.price.toLocaleString('de-CH')}.–</strong><button onClick={add}>{p.type==='Shop'?'In den Warenkorb':'Details anfragen'} →</button></article>)}</div></section></>; }

function MembersPage({session,navigate}:{session:MemberSession|null,navigate:(p:Page)=>void}) { if(!session?.memberAccess) return <><PageHero eyebrow="Geschützter Bereich" title="Willkommen zurück." text="Anmelden und alle Clubaktivitäten an einem Ort sehen."/><section className="login-panel"><form method="post" action={`${wordpressUrl}/wp-login.php`}><p className="secure-label">Geschützter Mitgliederbereich</p><h2>Mitglieder-Login</h2>{session?.authenticated&&<p className="login-warning">Ihre Mitgliedschaft besitzt momentan keinen Zugang zum Mitgliederbereich.</p>}<label>E-Mail-Adresse<input name="log" type="email" autoComplete="email" required/></label><label>Passwort<input name="pwd" type="password" autoComplete="current-password" required/></label><input type="hidden" name="redirect_to" value={`${frontendUrl}/?member=1`}/><button type="submit">Sicher anmelden →</button><a href={`${wordpressUrl}/wp-login.php?action=lostpassword`}>Passwort vergessen?</a></form><aside><p className="eyebrow">Noch nicht dabei?</p><h2>Gemeinschaft beginnt mit einer ersten Ausfahrt.</h2><p>Mitgliedsanträge werden persönlich geprüft und direkt durch den Swiss TR-Club verwaltet.</p><button onClick={() => navigate('club')}>Mitgliedschaft ansehen</button></aside></section></>;
  const tools:[Page,string,string][]=[['agenda','◫','Meine Events'],['forum','◎','Forum'],['gallery','▧','Galerie'],['library','▤','Bibliothek'],['directory','◉','Mitglieder'],['market','◇','Marktplatz']];
  return <><section className="dashboard-hero"><p>Willkommen,</p><h1>{session.displayName}</h1><span>{session.membership?.memberNumber} · Region {session.membership?.region||'noch nicht zugeordnet'}</span>{session.vehicle&&<div><b>{session.vehicle}</b></div>}</section><section className="dashboard"><div className="dashboard-main"><article><p className="eyebrow">Mitgliedschaft</p><h2>{session.membership?.status==='active'?'Aktiv':'Kulanzstatus'}</h2><p>Ihre Mitgliedsdaten werden direkt durch den Swiss TR-Club verwaltet.</p><span className="status open">Zugang bestätigt</span></article><article><p className="eyebrow">Aktuell</p><ul><li>Clubtermine in der Agenda entdecken</li><li>TR-Magazin digital lesen</li><li>Marktplatz und Forum nutzen</li></ul></article></div><div className="quick-grid">{tools.map(([target,icon,label])=><button key={label} onClick={()=>navigate(target)}><span>{icon}</span><strong>{label}</strong><small>Öffnen →</small></button>)}</div></section></>; }

function ForumPage({notify}:{notify:(s:string)=>void}) { const topics=[['Technik & Werkstatt','TR6 Overdrive – Schaltpunkt einstellen','12 Antworten'],['Ersatzteile gesucht','Differential TR4A gesucht','5 Antworten'],['Ausfahrten & Reisen','Roadbook Alpenpässe 2027','18 Antworten'],['Clubleben','Fotos vom Grilltag','9 Antworten']]; return <><PageHero eyebrow="Mitgliederforum" title="Wissen, das weiterfährt." text="Fragen stellen, Erfahrungen teilen und Lösungen bewahren."/><section className="page-content forum-layout"><div><div className="searchbox">⌕ Themen durchsuchen …</div>{topics.map(t=><article className="topic" key={t[1]}><div><p>{t[0]}</p><h3>{t[1]}</h3><span>Zuletzt aktiv vor 2 Stunden</span></div><b>{t[2]}</b></article>)}</div><aside className="forum-side"><h3>Neues Thema</h3><p>Eine Frage an die Clubgemeinschaft stellen.</p><button onClick={()=>notify('Themeneditor geöffnet.')}>Thema erstellen</button><h3>TR-Experten</h3><p>23 markierte Fachpersonen helfen bei Technikfragen.</p></aside></section></>; }

function GalleryPage({notify}:{notify:(s:string)=>void}) { const albums=['Sommerausfahrt Lüderenalp','Dégommage Romandie','Ostereier-Rallye Zürich','50 Jahre Swiss TR-Club','TR-Restaurationen','Historisches Clubarchiv']; return <><PageHero eyebrow="Clubgalerie" title="Momente, die bleiben." text="Ausfahrten, Menschen und Fahrzeuge aus über fünf Jahrzehnten."/><section className="page-content"><div className="gallery-actions"><span>24 Alben · 1&apos;846 Bilder</span><button onClick={()=>notify('Uploadbereich geöffnet.')}>Fotos hochladen</button></div><div className="album-grid">{albums.map((x,i)=><article key={x}><div className={`album-art art-${i%3}`}><span>{i%3===0?'⌁':i%3===1?'TR':'◆'}</span></div><p>{12+i*7} Fotos · 2026</p><h3>{x}</h3><button onClick={()=>notify(`${x} geöffnet.`)}>Album öffnen →</button></article>)}</div></section></>; }

function LibraryPage() { const [q,setQ]=useState(''); const docs=['TR-Magazin 2|2026','Werkstatthandbuch TR6','Roadbook Zentralschweizer Pässe','Vergaser SU – Einstellanleitung','Clubstatuten 2025','Technisches Bulletin Overdrive']; return <><PageHero eyebrow="Digitale Bibliothek" title="Das Clubwissen. Durchsuchbar." text="Magazine, Technik, Roadbooks und Clubdokumente."/><section className="page-content library"><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Dokumente durchsuchen …"/><div className="doc-list">{docs.filter(d=>d.toLowerCase().includes(q.toLowerCase())).map((d,i)=><article key={d}><span>{i===0?'▥':'▤'}</span><div><p>{i===0?'TR-Magazin':i<4?'Technik':'Clubdokument'}</p><h3>{d}</h3><small>PDF · DE/FR · Aktualisiert 2026</small></div><button>Öffnen ↓</button></article>)}</div></section></>; }

function DirectoryPage() { const [q,setQ]=useState(''); const people=[['Anna Keller','Zürich','TR4A IRS'],['Marc Dubois','Romandie','TR6 PI'],['Luca Bernasconi','Tessin','TR3A'],['Peter Muster','Zürich','TR4A · TR6'],['Eva Meier','Bern','TR5 PI']]; return <><PageHero eyebrow="Nur für Mitglieder" title="Die Clubgemeinschaft." text="Mitglieder und Triumph-Fahrzeuge datensparsam finden."/><section className="page-content directory"><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Name, Region oder Fahrzeug suchen …"/><div className="member-table"><div><b>Mitglied</b><b>Region</b><b>Fahrzeug</b><b></b></div>{people.filter(p=>p.join(' ').toLowerCase().includes(q.toLowerCase())).map((p)=><div key={p[0]}><span className="avatar">{p[0].split(' ').map(x=>x[0]).join('')}</span><strong>{p[0]}</strong><span>{p[1]}</span><span>{p[2]}</span><button>Profil →</button></div>)}</div></section></>; }

function EventDialog({event,close}:{event:ClubEvent,close:()=>void}) { const closeRef=useRef<HTMLButtonElement>(null); useEffect(()=>{const onKeyDown=(keyboardEvent:KeyboardEvent)=>{if(keyboardEvent.key==='Escape')close();};const previousOverflow=document.body.style.overflow;document.body.style.overflow='hidden';window.addEventListener('keydown',onKeyDown);closeRef.current?.focus();return()=>{document.body.style.overflow=previousOverflow;window.removeEventListener('keydown',onKeyDown);};},[close]); return <div className="modal-backdrop" onMouseDown={close}><section className="modal" role="dialog" aria-modal="true" aria-labelledby="event-dialog-title" onMouseDown={e=>e.stopPropagation()}><button ref={closeRef} className="modal-close" onClick={close} aria-label="Eventdetail schliessen">×</button><p className="eyebrow">{eventContext(event)} · {event.eventType?.name}</p><h2 id="event-dialog-title">{event.title}</h2><p>{event.description||event.summary}</p><div className="detail-box"><span>Beginn</span><strong>{event.startAt?eventDateTime(event.startAt):'Wird bekanntgegeben'}</strong><span>Ort</span><strong>{event.location||'Wird bekanntgegeben'}</strong><span>Anmeldung</span><strong>{registrationLabel(event.registrationStatus)}</strong></div><button className="modal-action" onClick={close}>Schliessen</button></section></div>; }
