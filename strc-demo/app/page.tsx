'use client';

import { useState } from 'react';
import Image from 'next/image';

type Page = 'home' | 'club' | 'agenda' | 'regions' | 'market' | 'members' | 'forum' | 'gallery' | 'library' | 'directory';
type Lang = 'de' | 'fr';

const events = [
  { day:'05', month:'JUL', title:'Grilltag Schwaderloch', region:'Nordwestschweiz', price:15, status:'Offen', seats:'18 Plätze frei', text:'Geselliger Grilltag am Rhein mit gemeinsamer Anfahrt.' },
  { day:'09', month:'AUG', title:'Sommerausfahrt Lüderenalp', region:'Zentralschweiz', price:39, status:'Offen', seats:'7 Plätze frei', text:'Kurvenreiche Tagesausfahrt inklusive Mittagessen.' },
  { day:'04', month:'SEP', title:'Euromeeting Belgien', region:'International', price:0, status:'Ausgebucht', seats:'Warteliste', text:'37. internationales Treffen europäischer TR-Clubs.' },
  { day:'25', month:'SEP', title:'TR-Club Weekend Solothurn', region:'Club Schweiz', price:280, status:'Offen', seats:'12 Zimmer frei', text:'Dreitägiges Clubwochenende mit Ausfahrt und Galaabend.' },
];

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
  const [loggedIn, setLoggedIn] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const [cart, setCart] = useState(0);
  const [toast, setToast] = useState('');
  const t = copy[lang];

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
        <button className="login" onClick={() => navigate('members')}>{loggedIn?'Mein Bereich':t.login}</button>
      </div>
    </header>

    {page==='home' && <HomePage t={t} navigate={navigate} openEvent={setSelectedEvent}/>} 
    {page==='club' && <ClubPage navigate={navigate}/>} 
    {page==='agenda' && <AgendaPage openEvent={setSelectedEvent}/>} 
    {page==='regions' && <RegionsPage notify={notify}/>} 
    {page==='market' && <MarketPage cart={cart} add={() => { setCart(cart+1); notify('Artikel wurde dem Demo-Warenkorb hinzugefügt.'); }}/>} 
    {page==='members' && <MembersPage loggedIn={loggedIn} login={() => { setLoggedIn(true); notify('Demo-Anmeldung erfolgreich.'); }} navigate={navigate}/>} 
    {page==='forum' && <ForumPage notify={notify}/>} 
    {page==='gallery' && <GalleryPage notify={notify}/>} 
    {page==='library' && <LibraryPage/>} 
    {page==='directory' && <DirectoryPage/>} 

    <footer><div className="footer-brand"><Image className="footer-logo" src="/strc-logo.png" width={954} height={954} alt="Swiss TR-Club Logo"/><div><strong>Swiss TR-Club</strong><p>Freude an britischen Roadstern seit 1973.</p></div></div><div><strong>Entdecken</strong><button onClick={() => navigate('club')}>Über den Club</button><button onClick={() => navigate('agenda')}>Veranstaltungen</button><button onClick={() => navigate('regions')}>Regionen</button></div><div><strong>Mitglieder</strong><button onClick={() => navigate('members')}>Dashboard</button><button onClick={() => navigate('forum')}>Forum</button><button onClick={() => navigate('library')}>Bibliothek</button></div><div><strong>Demo-Hinweis</strong><p>Unabhängiger Prototyp mit synthetischen Daten.</p></div></footer>

    {selectedEvent!==null && <EventDialog event={events[selectedEvent]} close={() => setSelectedEvent(null)} register={() => { setSelectedEvent(null); notify('Demo-Anmeldung gespeichert.'); }}/>} 
    {toast && <div className="toast" role="status">✓ {toast}</div>}
  </main>;
}

function HomePage({t,navigate,openEvent}:{t:typeof copy.de,navigate:(p:Page)=>void,openEvent:(i:number)=>void}) {
  return <>
    <section className="hero" id="top"><div className="hero-road" aria-hidden="true"/><div className="hero-copy"><p className="eyebrow">{t.welcome}</p><h1>{t.headline}<br/><em>{t.accent}</em></h1><p className="intro">{t.intro}</p><div className="hero-actions"><button className="primary" onClick={() => navigate('agenda')}>{t.drive}</button><button className="secondary" onClick={() => navigate('club')}>{t.discover} <span>→</span></button></div><div className="hero-facts"><span><strong>50+</strong> Jahre Clubgeschichte</span><span><strong>316</strong> aktive Mitglieder</span><span><strong>8</strong> Regionen</span></div></div><div className="car-art"><Image className="roadster-pictogram" src="/roadster-pictogram.png" width={1774} height={887} alt="Piktogramm eines klassischen Roadsters" priority/></div></section>
    <section className="content-grid"><div className="section-heading"><p className="eyebrow">Unterwegs mit Freunden</p><h2>Die nächsten Erlebnisse</h2></div><div className="events">{events.slice(0,3).map((event,index)=><EventCard key={event.title} event={event} open={() => openEvent(index)}/>)}</div><aside className="magazine-card"><p className="eyebrow">Aktuelle Ausgabe</p><div className="magazine"><span>51. Jahrgang</span><strong>Swiss<br/>TR-Magazin</strong><b>2 | 2026</b></div><h3>Geschichten, Technik und Menschen</h3><p>Für Mitglieder digital verfügbar.</p><button onClick={() => navigate('library')}>Magazin öffnen →</button></aside></section>
    <section className="feature-band"><div><p className="eyebrow">Mehr als ein Automobilclub</p><h2>Menschen. Technik. Leidenschaft.</h2><p>Gemeinsame Ausfahrten, technisches Wissen und Freundschaften über Sprachgrenzen hinweg.</p></div><div className="feature-cards"><article><span>01</span><h3>Fahren</h3><p>Ausfahrten und Treffen in der ganzen Schweiz.</p></article><article><span>02</span><h3>Erhalten</h3><p>Erfahrung und Dokumentation für jeden TR.</p></article><article><span>03</span><h3>Verbinden</h3><p>Acht Regionen, eine lebendige Gemeinschaft.</p></article></div></section>
  </>;
}

function PageHero({eyebrow,title,text}:{eyebrow:string,title:string,text:string}) { return <section className="page-hero"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{text}</p></section>; }
function EventCard({event,open}:{event:typeof events[number],open:()=>void}) { return <article className="event-card"><div className="event-date"><strong>{event.day}</strong><span>{event.month}</span></div><div><p>{event.region}</p><h3>{event.title}</h3><span>{event.price?`CHF ${event.price}.–`:'Kostenlos'} · {event.seats}</span></div><button onClick={open} aria-label={`${event.title} öffnen`}>→</button></article>; }

function ClubPage({navigate}:{navigate:(p:Page)=>void}) { return <><PageHero eyebrow="Der Club" title="Gemeinsam unterwegs seit 1973." text="Der Swiss TR-Club verbindet Menschen, die britische Triumph-Roadster fahren, pflegen und lieben."/><section className="story-grid"><article className="story-main"><p className="eyebrow">Unsere Mission</p><h2>Automobile Geschichte lebendig halten.</h2><p>Wir bewahren nicht nur Fahrzeuge. Wir teilen Wissen, organisieren Erlebnisse und schaffen Verbindungen zwischen Generationen und Sprachregionen.</p><blockquote>«Der TR bringt uns zusammen. Die Freundschaften halten uns zusammen.»</blockquote></article><aside className="timeline"><div><b>1973</b><span>Gründung des Clubs</span></div><div><b>8</b><span>Regionen in der Schweiz</span></div><div><b>316</b><span>Aktive Mitglieder</span></div><div><b>2026</b><span>Neue digitale Plattform</span></div></aside></section><section className="membership-cta"><div><p className="eyebrow">Mitglied werden</p><h2>Ihr Triumph gehört dazu.</h2><p>Profitieren Sie von Veranstaltungen, Wissen und Gemeinschaft.</p></div><button onClick={() => navigate('members')}>Mitgliedschaft entdecken →</button></section></>; }

function AgendaPage({openEvent}:{openEvent:(i:number)=>void}) { const [filter,setFilter]=useState('Alle'); return <><PageHero eyebrow="Veranstaltungen" title="Agenda 2026" text="Clubausfahrten, regionale Treffen und internationale Begegnungen."/><section className="page-content"><div className="filterbar">{['Alle','Club Schweiz','Regionen','International'].map(x=><button className={filter===x?'active':''} onClick={()=>setFilter(x)} key={x}>{x}</button>)}</div><div className="agenda-list">{events.filter(e=>filter==='Alle'||(filter==='Regionen'&&!['Club Schweiz','International'].includes(e.region))||e.region===filter).map((e)=><div className="agenda-row" key={e.title}><div className="agenda-date"><strong>{e.day}</strong><span>{e.month}<br/>2026</span></div><div><p className="eyebrow">{e.region}</p><h2>{e.title}</h2><p>{e.text}</p><span className={`status ${e.status==='Offen'?'open':'closed'}`}>{e.status}</span> <small>{e.seats}</small></div><div className="agenda-price"><strong>{e.price?`CHF ${e.price}.–`:'Kostenlos'}</strong><button onClick={()=>openEvent(events.indexOf(e))}>Details →</button></div></div>)}</div></section></>; }

function RegionsPage({notify}:{notify:(s:string)=>void}) { return <><PageHero eyebrow="In Ihrer Nähe" title="Acht Regionen. Ein Club." text="Lokale Treffen, persönliche Kontakte und gemeinsame Ausfahrten."/><section className="page-content regions-grid">{regions.map((region,i)=><article key={region}><span>0{i+1}</span><h2>{region}</h2><p>{28+i*4} Mitglieder · monatlicher Stammtisch</p><button onClick={()=>notify(`Region ${region} als Demo geöffnet.`)}>Region ansehen →</button></article>)}</section></>; }

function MarketPage({cart,add}:{cart:number,add:()=>void}) { const [tab,setTab]=useState('Alle'); return <><PageHero eyebrow="Marktplatz" title="Für Fahrer und Fahrzeuge." text="Clubartikel, Ersatzteile und Fahrzeuge aus der Gemeinschaft."/><section className="page-content"><div className="market-head"><div className="filterbar">{['Alle','Shop','Teile','Fahrzeuge'].map(x=><button className={tab===x?'active':''} onClick={()=>setTab(x)} key={x}>{x}</button>)}</div><span className="basket">Warenkorb · {cart}</span></div><div className="product-grid">{products.filter(p=>tab==='Alle'||p.type===tab).map(p=><article key={p.name}><div className="product-image">{p.icon}</div><p className="eyebrow">{p.type}</p><h3>{p.name}</h3><strong>CHF {p.price.toLocaleString('de-CH')}.–</strong><button onClick={add}>{p.type==='Shop'?'In den Warenkorb':'Details anfragen'} →</button></article>)}</div></section></>; }

function MembersPage({loggedIn,login,navigate}:{loggedIn:boolean,login:()=>void,navigate:(p:Page)=>void}) { if(!loggedIn) return <><PageHero eyebrow="Geschützter Bereich" title="Willkommen zurück." text="Anmelden und alle Clubaktivitäten an einem Ort sehen."/><section className="login-panel"><div><p className="demo-label">Demo-Zugang</p><h2>Mitglieder-Login</h2><label>E-Mail-Adresse<input defaultValue="demo@swiss-tr-club.ch"/></label><label>Passwort<input type="password" defaultValue="demozugang"/></label><button onClick={login}>Sicher anmelden →</button><a>Passwort vergessen?</a></div><aside><p className="eyebrow">Noch nicht dabei?</p><h2>Gemeinschaft beginnt mit einer ersten Ausfahrt.</h2><p>Mitgliedsanträge werden sicher geprüft und anschliessend mit Fairgate synchronisiert.</p><button onClick={login}>Demo-Mitgliedsantrag starten</button></aside></section></>;
  const tools:[Page,string,string][]=[['agenda','◫','Meine Events'],['forum','◎','Forum'],['gallery','▧','Galerie'],['library','▤','Bibliothek'],['directory','◉','Mitglieder'],['market','◇','Marktplatz']];
  return <><section className="dashboard-hero"><p>Guten Morgen,</p><h1>Peter Muster</h1><span>Mitglied seit 1998 · Region Zürich</span><div><b>TR4A IRS · 1967</b><b>TR6 PI · 1973</b></div></section><section className="dashboard"><div className="dashboard-main"><article><p className="eyebrow">Nächster Termin</p><h2>Sommerausfahrt Lüderenalp</h2><p>09. August · Treffpunkt ACE Café Rothenburg</p><span className="status open">Angemeldet</span></article><article><p className="eyebrow">Aktuell</p><ul><li>Neue Antwort auf «TR6 Overdrive»</li><li>TR-Magazin 2|2026 ist verfügbar</li><li>Bestellung #2026-034 wurde versandt</li></ul></article></div><div className="quick-grid">{tools.map(([target,icon,label])=><button key={label} onClick={()=>navigate(target)}><span>{icon}</span><strong>{label}</strong><small>Öffnen →</small></button>)}</div></section></>; }

function ForumPage({notify}:{notify:(s:string)=>void}) { const topics=[['Technik & Werkstatt','TR6 Overdrive – Schaltpunkt einstellen','12 Antworten'],['Ersatzteile gesucht','Differential TR4A gesucht','5 Antworten'],['Ausfahrten & Reisen','Roadbook Alpenpässe 2027','18 Antworten'],['Clubleben','Fotos vom Grilltag','9 Antworten']]; return <><PageHero eyebrow="Mitgliederforum" title="Wissen, das weiterfährt." text="Fragen stellen, Erfahrungen teilen und Lösungen bewahren."/><section className="page-content forum-layout"><div><div className="searchbox">⌕ Themen durchsuchen …</div>{topics.map(t=><article className="topic" key={t[1]}><div><p>{t[0]}</p><h3>{t[1]}</h3><span>Zuletzt aktiv vor 2 Stunden</span></div><b>{t[2]}</b></article>)}</div><aside className="forum-side"><h3>Neues Thema</h3><p>Eine Frage an die Clubgemeinschaft stellen.</p><button onClick={()=>notify('Demo-Themeneditor geöffnet.')}>Thema erstellen</button><h3>TR-Experten</h3><p>23 markierte Fachpersonen helfen bei Technikfragen.</p></aside></section></>; }

function GalleryPage({notify}:{notify:(s:string)=>void}) { const albums=['Sommerausfahrt Lüderenalp','Dégommage Romandie','Ostereier-Rallye Zürich','50 Jahre Swiss TR-Club','TR-Restaurationen','Historisches Clubarchiv']; return <><PageHero eyebrow="Clubgalerie" title="Momente, die bleiben." text="Ausfahrten, Menschen und Fahrzeuge aus über fünf Jahrzehnten."/><section className="page-content"><div className="gallery-actions"><span>24 Alben · 1&apos;846 Bilder</span><button onClick={()=>notify('Demo-Uploadbereich geöffnet.')}>Fotos hochladen</button></div><div className="album-grid">{albums.map((x,i)=><article key={x}><div className={`album-art art-${i%3}`}><span>{i%3===0?'⌁':i%3===1?'TR':'◆'}</span></div><p>{12+i*7} Fotos · 2026</p><h3>{x}</h3><button onClick={()=>notify(`${x} als Demo geöffnet.`)}>Album öffnen →</button></article>)}</div></section></>; }

function LibraryPage() { const [q,setQ]=useState(''); const docs=['TR-Magazin 2|2026','Werkstatthandbuch TR6','Roadbook Zentralschweizer Pässe','Vergaser SU – Einstellanleitung','Clubstatuten 2025','Technisches Bulletin Overdrive']; return <><PageHero eyebrow="Digitale Bibliothek" title="Das Clubwissen. Durchsuchbar." text="Magazine, Technik, Roadbooks und Clubdokumente."/><section className="page-content library"><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Dokumente durchsuchen …"/><div className="doc-list">{docs.filter(d=>d.toLowerCase().includes(q.toLowerCase())).map((d,i)=><article key={d}><span>{i===0?'▥':'▤'}</span><div><p>{i===0?'TR-Magazin':i<4?'Technik':'Clubdokument'}</p><h3>{d}</h3><small>PDF · DE/FR · Aktualisiert 2026</small></div><button>Öffnen ↓</button></article>)}</div></section></>; }

function DirectoryPage() { const [q,setQ]=useState(''); const people=[['Anna Keller','Zürich','TR4A IRS'],['Marc Dubois','Romandie','TR6 PI'],['Luca Bernasconi','Tessin','TR3A'],['Peter Muster','Zürich','TR4A · TR6'],['Eva Meier','Bern','TR5 PI']]; return <><PageHero eyebrow="Nur für Mitglieder" title="Die Clubgemeinschaft." text="Mitglieder und Triumph-Fahrzeuge datensparsam finden."/><section className="page-content directory"><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Name, Region oder Fahrzeug suchen …"/><div className="member-table"><div><b>Mitglied</b><b>Region</b><b>Fahrzeug</b><b></b></div>{people.filter(p=>p.join(' ').toLowerCase().includes(q.toLowerCase())).map((p)=><div key={p[0]}><span className="avatar">{p[0].split(' ').map(x=>x[0]).join('')}</span><strong>{p[0]}</strong><span>{p[1]}</span><span>{p[2]}</span><button>Profil →</button></div>)}</div></section></>; }

function EventDialog({event,close,register}:{event:typeof events[number],close:()=>void,register:()=>void}) { return <div className="modal-backdrop" onMouseDown={close}><section className="modal" role="dialog" aria-modal="true" aria-label={event.title} onMouseDown={e=>e.stopPropagation()}><button className="modal-close" onClick={close}>×</button><p className="eyebrow">{event.region} · {event.day}. {event.month}</p><h2>{event.title}</h2><p>{event.text}</p><div className="detail-box"><span>Teilnahme</span><strong>{event.price?`CHF ${event.price}.–`:'Kostenlos'}</strong><span>Verfügbarkeit</span><strong>{event.seats}</strong></div><button className="modal-action" disabled={event.status!=='Offen'} onClick={register}>{event.status==='Offen'?'Demo-Anmeldung starten →':'Warteliste geschlossen'}</button></section></div>; }
