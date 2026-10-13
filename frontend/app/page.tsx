'use client';
import {t,uiLocale,UILanguageProvider,LanguageSwitcher,useUILanguage} from './components/UILanguage';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Marketplace, { Dialog, type MarketplaceSession } from './components/Marketplace';
import AgendaPage from './components/AgendaPage';
import EventManager, { type EventAdminSession } from './components/EventManager';
import {CatalogProvider} from './components/ClubCatalog';
import MemberDirectory from './components/MemberDirectory';
import MemberDashboard from './components/MemberDashboard';
import PublicGallery from './components/PublicGallery';
import Community from './components/Community';
import RegionalContent from './components/RegionalContent';
import Breadcrumbs from './components/Breadcrumbs';
import RegistrationForm from './components/RegistrationForm';
import MemberForms, {ContactForm} from './components/MemberForms';
import {VehicleGallery} from './components/VehicleModels';
import ApplicationInbox from './components/ApplicationInbox';
import HomepageSections from './components/HomepageSections';
import {SiteContentProvider,useSiteContent,ContentBlock,RichHtml,assetUrl,regionalLandscape,regionalCardBackground} from './components/SiteContent';
import LandingIntroduction from './components/LandingIntroduction';
import EditorialDashboard from './components/EditorialDashboard';
import {ClubLanding, MissionPage, StaticPage} from './components/LandingPages';

type Page = 'history' | 'news' | 'applications' | 'registration' | 'profile' | 'triungsters' | 'organisation' | 'mission' | 'membership' | 'models' | 'shop' | 'home' | 'club' | 'agenda' | 'regions' | 'market' | 'members' | 'forum' | 'gallery' | 'library' | 'clubdocs' | 'directory' | 'contact' | 'privacy' | 'statutes' | 'event-admin' | 'editorial';
type MemberSession = MarketplaceSession & EventAdminSession & {
  applicationsNonce?:string|null; communityNonce?: string | null; formsInboxUrl?:string|null;
  canEditContent?:boolean; canManageRoles?:boolean; editorialNonce?:string; editableDocuments?:string[]; logoutUrl?:string;
  authenticated: boolean;
  memberAccess: boolean;
  displayName?: string;
  vehicle?: string;
  membership?: { memberNumber:string; status:string; type:string; region:string; startedOn:string } | null;
};
type EventTerm = { name:string; slug:string } | null;
export type ClubEvent = {
  id:number;
  title:string;
  summary:string;
  description:string;
  descriptionHtml?:string;
  startAt:string;
  endAt:string;
  location:string;
  eventType:EventTerm;
  scope:EventTerm;
  region:EventTerm;
  registrationRequired:boolean; externalRegistrationUrl?:string;
  registrationStatus:'information'|'scheduled'|'open'|'closed'|'full'|'waiting';
  registrationOpenAt:string;
  registrationCloseAt:string;
  capacity:number; occupiedCount?:number; participantCount?:number;
  image:string;
};

const wordpressUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL ?? 'http://localhost:8080';
const frontendUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

type Region = { name:string; slug:string; description:string; memberCount:number|null };
const routes: Record<Page,string> = {history:'club-geschichte',news:'neuigkeiten',applications:'antraege',registration:'veranstaltung',profile:'profil',triungsters:'triungsters',organisation:'organisation',mission:'leitbild',membership:'anmeldung',models:'tr-modelle',shop:'tr-shop',home:'',club:'club',agenda:'agenda',regions:'regionen',market:'marktplatz',members:'mitglieder',forum:'forum',gallery:'galerie',library:'bibliothek',clubdocs:'clubdokumente',directory:'mitgliederliste',contact:'kontakt',privacy:'datenschutz',statutes:'statuten','event-admin':'agenda-verwalten',editorial:'redaktion'};


export default function Home(){return <UILanguageProvider><SiteContentProvider><CatalogProvider><ClubApp/></CatalogProvider></SiteContentProvider></UILanguageProvider>;}

function ClubApp() {
  const {language}=useUILanguage();
  const [page, setPage] = useState<Page>('home');
  const [subroute,setSubroute]=useState('');
  const [memberSession, setMemberSession] = useState<MemberSession | null>(null);
  const [events, setEvents] = useState<ClubEvent[]>([]);
  const [eventsState, setEventsState] = useState<'loading'|'ready'|'error'>('loading');
  const [selectedEvent, setSelectedEvent] = useState<ClubEvent | null>(null);
  const [toast, setToast] = useState('');
  const {text:c}=useSiteContent();
  const [eventsRevision, setEventsRevision] = useState(0);
  function retryEvents() { setEventsState('loading'); setEventsRevision(value => value + 1); }

  useEffect(() => {
    const restore = () => {
      const [slug,detail=''] = window.location.hash.slice(1).split('/');
      setSubroute(detail);
      const target = (Object.keys(routes) as Page[]).find(key => routes[key] === slug);
      setPage(!slug && new URLSearchParams(window.location.search).has('member') ? 'members' : target ?? 'home');
      setSelectedEvent(null);
      window.scrollTo({top:0, behavior:'instant'});
    };
    const frame = requestAnimationFrame(restore);
    window.addEventListener('hashchange', restore);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('hashchange', restore); };
  }, []);

  useEffect(() => {
    let active = true;
    fetch(`${wordpressUrl}/wp-admin/admin-ajax.php?action=strc_session`, { credentials:'include' })
      .then((response) => response.ok ? response.json() as Promise<MemberSession> : Promise.reject())
      .then((session) => { if (active) setMemberSession(session); })
      .catch(() => { if (active) setMemberSession({ authenticated:false, memberAccess:false }); });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    const controller=new AbortController();
    async function load(){const rows:ClubEvent[]=[];let page=1,pages=1;do{const response=await fetch(`${wordpressUrl}/?rest_route=/strc/v1/events&view=upcoming&limit=100&page=${page}&language=${language}`,{cache:'no-store',signal:controller.signal});if(!response.ok)throw new Error();const result=await response.json() as {events:ClubEvent[];pages:number};rows.push(...result.events);pages=result.pages||1;page++;}while(page<=pages);if(!controller.signal.aborted){setEvents(rows);setEventsState('ready');}}
    load().catch(()=>{if(!controller.signal.aborted)setEventsState('error');});
    return()=>controller.abort();
  }, [eventsRevision, page, language]);

  const linkedEvent = page === 'agenda' && /^\d+$/.test(subroute) ? events.find(event => event.id === Number(subroute)) ?? null : null;

  function navigate(next: Page) { setPage(next); setSelectedEvent(null); window.location.hash = routes[next]; window.scrollTo({top:0, behavior:'instant'}); }
  function notify(message: string) { setToast(message); window.setTimeout(() => setToast(''), 2600); }
  useEffect(()=>{const url=new URL(window.location.href);const status=url.searchParams.get('newsletter');if(!status)return;const messages:Record<string,string>={confirmed:'Newsletter-Anmeldung bestätigt. Willkommen!',unsubscribed:'Du wurdest vom Newsletter abgemeldet.',invalid:'Der Newsletter-Link ist ungültig oder wurde bereits verwendet.'};if(messages[status])window.setTimeout(()=>notify(messages[status]),0);url.searchParams.delete('newsletter');window.history.replaceState(null,'',url);},[]);

  const editorialKey=page==='mission'?'club':page==='models'?'model-'+subroute:page==='regions'&&subroute?'region-'+subroute:page;
  return <main>
    <header className="site-header">
      <button className="brand brand-button" onClick={() => navigate('home')} aria-label={t("Swiss TR-Club Startseite")}>
        <Image className="brand-logo" src={assetUrl(c('global.logo'))} width={954} height={954} alt={t("Swiss TR-Club Logo")} priority/><span><strong>{c('global.name')}</strong><small>{c('global.tagline')}</small></span>
      </button>
      <nav aria-label={t("Hauptnavigation")}>
        <div className="nav-tabs">
        <button className={page==='home'?'active':''} onClick={() => navigate('home')}>{t("Home")}</button>
        <button className={['club','organisation','mission','membership','models','triungsters','history'].includes(page)?'active':''} onClick={() => navigate('club')}>{c('global.navClub')}</button>
        <button className={page==='agenda'?'active':''} onClick={() => navigate('agenda')}>{c('global.navAgenda')}</button>
        <button className={page==='regions'?'active':''} onClick={() => navigate('regions')}>{c('global.navRegions')}</button>
        <button className={['market','shop'].includes(page)?'active':''} onClick={() => navigate('market')}>{c('global.navMarket')}</button>
        <button className={['members','profile','applications','forum','gallery','library','clubdocs','directory','editorial','event-admin'].includes(page)?'active':''} onClick={() => navigate('members')}>{t(memberSession?.memberAccess?'Mitgliederbereich':'Mitglieder-Login')}</button>
        </div>
        <LanguageSwitcher/>
      </nav>
    </header>

    {memberSession?.canEditContent&&<div className="editorial-access-bar"><a href="#redaktion">{t("Redaktion öffnen")}</a>{memberSession.editableDocuments?.includes(editorialKey)&&<a href={`#redaktion/${editorialKey}`}>{t("Diese Seite bearbeiten")}</a>}{memberSession.logoutUrl&&<a href={memberSession.logoutUrl}>{t("Abmelden")}</a>}</div>}
    <Breadcrumbs page={page} subroute={subroute}/>
    {page==='editorial'&&(memberSession?.canEditContent?<EditorialDashboard nonce={memberSession.editorialNonce||''} canManageEvents={!!memberSession.canManageEvents}/>:<MembersPage session={memberSession} navigate={navigate}/>)}
    {page==='home' && <HomePage memberAccess={!!memberSession?.memberAccess} navigate={navigate} events={events} eventsState={eventsState} openEvent={setSelectedEvent}/>}
    {page==='club' && <ClubLanding canEdit={!!memberSession?.canEditContent} memberAccess={!!memberSession?.memberAccess}/>}
    {page==='mission' && <MissionPage/>}
    {page==='models'&&<VehicleGallery key={subroute} selected={subroute} canEdit={!!memberSession?.canEditContent}/>}
    {['organisation','membership','shop','triungsters','history'].includes(page)&&<StaticPage key={editorialKey} documentKey={editorialKey} canEdit={memberSession?.editableDocuments?.includes(editorialKey)}/>}
    {page==='agenda' && <><AgendaPage memberAccess={!!memberSession?.memberAccess} events={events} eventsState={eventsState} retryEvents={retryEvents} openEvent={setSelectedEvent}/></>}
    {page==='regions' && <RegionsPage editableDocuments={memberSession?.editableDocuments||[]} events={events} eventsState={eventsState} retryEvents={retryEvents} openEvent={setSelectedEvent}/>}
    {page==='market' && <Marketplace key={subroute} section={subroute} session={memberSession} notify={notify}/>}
    {page==='profile' && (memberSession?.memberAccess?<MemberForms/>:<MembersPage session={memberSession} navigate={navigate}/>)}
    {page==='members' && <><MembersPage session={memberSession} navigate={navigate}/></>}
    {page==='registration'&&<section className="page-content"><a href="#mitglieder">{t("← Mitgliederbereich")}</a><RegistrationForm eventId={Number(subroute)} memberAccess={!!memberSession?.memberAccess}/></section>}
    {(['forum','gallery','library','clubdocs'] as Page[]).includes(page) && (memberSession?.memberAccess?<Community key={`${page}:${subroute}`} kind={page==='clubdocs'?'library':page as 'forum'|'gallery'|'library'} nonce={memberSession.communityNonce||''} selectedId={Number(subroute)||undefined} initialGroup={page==='clubdocs'?'club':''} title={page==='clubdocs'?'Clubdokumente':undefined}/>:page==='gallery'?<PublicGallery/>:<MembersPage session={memberSession} navigate={navigate}/>)}
    {page==='news' && <HomepageSections navigate={navigate} memberAccess={!!memberSession?.memberAccess} upcomingEvents={[]} eventPreview={{title:'',text:''}} archive/>}
    {page==='applications' && (memberSession?.applicationsNonce?<ApplicationInbox nonce={memberSession.applicationsNonce}/>:<MembersPage session={memberSession} navigate={navigate}/>)}
    {page==='directory' && (memberSession?.memberAccess?<MemberDirectory/>:<MembersPage session={memberSession} navigate={navigate}/>)}
    {page==='event-admin' && (memberSession?.canManageEvents?<EventManager session={memberSession} changed={retryEvents}/>:<MembersPage session={memberSession} navigate={navigate}/>)}
    {['contact','privacy','statutes'].includes(page) && <InformationPage key={page} page={page}/>}

    <footer><div className="footer-brand"><Image className="footer-logo" src={assetUrl(c('global.logo'))} width={954} height={954} alt={t("Swiss TR-Club Logo")}/><div><strong>{c('global.name')}</strong><p>{c('global.footer')}</p></div></div><div><strong>{t('Entdecken')}</strong><button onClick={() => navigate('club')}>{t('Über den Club')}</button><button onClick={() => navigate('agenda')}>{t('Veranstaltungen')}</button><button onClick={() => navigate('regions')}>{t('Regionen')}</button></div><div><strong>{t('Mitglieder')}</strong><button onClick={() => navigate('members')}>{t('Dashboard')}</button><button onClick={() => navigate('market')}>{t('Marktplatz')}</button><button onClick={() => navigate('forum')}>{t('Forum')}</button><button onClick={() => navigate('library')}>{t('Bibliothek')}</button></div><div><strong>{t('Kontakt & Recht')}</strong><button onClick={() => navigate('contact')}>{t('Kontakt & Impressum')}</button><button onClick={() => navigate('privacy')}>{t('Datenschutz')}</button><button onClick={() => navigate('statutes')}>{t('Statuten')}</button></div></footer>

    {(selectedEvent||linkedEvent) && <EventDialog event={(selectedEvent||linkedEvent)!} memberAccess={!!memberSession?.memberAccess} close={() => {setSelectedEvent(null);if(linkedEvent)window.location.hash='#agenda';}}/>}
    {toast && <div className="toast" role="status">✓ {toast}</div>}
  </main>;
}

function HomePage({navigate,events,eventsState,openEvent,memberAccess}:{memberAccess:boolean,navigate:(p:Page)=>void,events:ClubEvent[],eventsState:'loading'|'ready'|'error',openEvent:(event:ClubEvent)=>void}) {
  const next=events[0];
  const eventPreview=eventsState==='loading'?{title:t('Termine werden geladen …'),text:t('Die nächsten Treffen findest du hier.')}:eventsState==='error'?{title:t('Agenda derzeit nicht erreichbar'),text:t('Bitte versuche es in der Terminübersicht erneut.')}:next?{title:next.title,text:`${eventDateTime(next.startAt)} · ${next.location||eventContext(next)}`}:{title:t('Das nächste Wiedersehen'),text:t('Aktuell sind noch keine kommenden Termine veröffentlicht. Die Regionen ergänzen ihre Treffen hier.')};
  return <HomepageSections eventPreview={eventPreview} upcomingEvents={events.slice(0,5)} eventsState={eventsState} openEvent={openEvent} memberAccess={memberAccess} navigate={navigate}/>;
}

function PageHero({eyebrow,title,text,landscape}:{eyebrow:string,title:string,text:string,landscape?:string}) { return <section className={`page-hero${landscape?' regional-hero':''}`} style={landscape?{backgroundImage:`linear-gradient(90deg,rgba(10,37,63,.91),rgba(10,37,63,.66)),url("${regionalLandscape(landscape)}")`,backgroundSize:'cover',backgroundPosition:'center'}:undefined}><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{text}</p></section>; }
function eventDateParts(value:string) { const date=new Date(value); if(Number.isNaN(date.getTime())) return {day:'–',month:'DATUM',year:''}; return {day:new Intl.DateTimeFormat(uiLocale(),{day:'2-digit'}).format(date),month:new Intl.DateTimeFormat(uiLocale(),{month:'short'}).format(date).replace('.','').toUpperCase(),year:new Intl.DateTimeFormat(uiLocale(),{year:'numeric'}).format(date)}; }
function eventDateTime(value:string) { const date=new Date(value); return Number.isNaN(date.getTime())?t('Wird bekanntgegeben'):new Intl.DateTimeFormat(uiLocale(),{dateStyle:'long',timeStyle:'short'}).format(date); }
function eventContext(event:ClubEvent) { return t(event.region?.name||event.scope?.name||event.eventType?.name||'Swiss TR-Club'); }
function registrationLabel(status:ClubEvent['registrationStatus']) { return t({information:'Keine Anmeldung erforderlich',scheduled:'Anmeldung öffnet später',open:'Anmeldung offen',closed:'Anmeldung geschlossen',full:'Ausgebucht',waiting:'Warteliste offen'}[status]); }
function EventCollectionState({state,count,retry}:{retry:()=>void,state:'loading'|'ready'|'error',count:number}) { if(state==='loading') return <p className="collection-state" role="status">{t("Agenda wird geladen …")}</p>; if(state==='error') return <div className="collection-state error" role="alert">{t("Die Agenda kann momentan nicht geladen werden.")}<button className="market-text-button" onClick={retry}>{t('Erneut versuchen')}</button></div>; if(count===0) return <p className="collection-state">{t("Momentan sind keine kommenden Veranstaltungen veröffentlicht.")}</p>; return null; }
function EventCard({event,open}:{event:ClubEvent,open:()=>void}) { const date=eventDateParts(event.startAt); return <article className="event-card"><div className="event-date"><strong>{date.day}</strong><span>{date.month}</span></div><div><p>{eventContext(event)}</p><h3>{event.title}</h3><span>{event.location||event.eventType?.name} · {registrationLabel(event.registrationStatus)}</span></div><button onClick={open} aria-label={`${event.title} ${t('öffnen')}`}>→</button></article>; }

function RegionsPage({events,eventsState,retryEvents,openEvent,editableDocuments}:{editableDocuments:string[];events:ClubEvent[],eventsState:'loading'|'ready'|'error',retryEvents:()=>void,openEvent:(event:ClubEvent)=>void}) {
  const {text:c,values}=useSiteContent();
  const [regions,setRegions]=useState<Region[]>([]);
  const [selected,setSelected]=useState('');
  const [state,setState]=useState('loading');
  const [revision,setRevision]=useState(0);
  useEffect(()=>{
    const restore=()=>setSelected(decodeURIComponent(window.location.hash.split('/')[1]||''));
    const frame=requestAnimationFrame(restore); window.addEventListener('hashchange',restore);
    return()=>{cancelAnimationFrame(frame);window.removeEventListener('hashchange',restore);};
  },[]);
  useEffect(()=>{
    const controller=new AbortController();
    let hasLoaded=false;
    let activeRequest:AbortController|null=null;
    const load=()=>{
      if(document.visibilityState==='hidden')return;
      activeRequest?.abort();
      const request=new AbortController();
      activeRequest=request;
      fetch(`${wordpressUrl}/?rest_route=/strc/v1/regions`,{signal:request.signal,cache:'no-store'})
        .then(response=>response.ok?response.json() as Promise<{regions:Region[];triungstersMemberCount:number|null}>:Promise.reject())
        .then(result=>{if(!controller.signal.aborted&&!request.signal.aborted){hasLoaded=true;setRegions([...result.regions,{name:'TRiungsters',slug:'triungsters',description:'Die nächste Generation im Swiss TR-Club.',memberCount:result.triungstersMemberCount}]);setState('ready');}})
        .catch(()=>{if(!controller.signal.aborted&&!request.signal.aborted&&!hasLoaded)setState('error');});
    };
    load();
    const interval=window.setInterval(load,60_000);
    const refreshOnReturn=()=>{if(document.visibilityState==='visible')load();};
    document.addEventListener('visibilitychange',refreshOnReturn);
    window.addEventListener('focus',load);
    return()=>{controller.abort();activeRequest?.abort();window.clearInterval(interval);document.removeEventListener('visibilitychange',refreshOnReturn);window.removeEventListener('focus',load);};
  },[revision]);
  const region=regions.find(item=>item.slug===selected);
  const visible=events.filter(event=>event.region?.slug===selected);
  return <><PageHero eyebrow={t("Lokal präsent – lokal aktiv")} title={region?`${t('Region')} ${t(region.name)}`:c('regions.title')} text={region?c(`region-${region.slug}.intro`,c('regions.intro')):c('regions.intro')} landscape={region?.slug}/>{!selected&&<LandingIntroduction documentKey="regions"/>}
    <section className="page-content">
      {state==='loading'&&<p role="status">{t("Regionen werden geladen …")}</p>}
      {state==='error'&&<div className="collection-state error" role="alert">{t("Regionen konnten nicht geladen werden.")}<button className="market-text-button" onClick={()=>{setState('loading');setRevision(value=>value+1);}}>{t('Erneut versuchen')}</button></div>}
      {state==='ready'&&selected==='triungsters'&&<StaticPage key="triungsters-region" documentKey="triungsters" canEdit={editableDocuments.includes('triungsters')}/>}
      {state==='ready'&&selected!=='triungsters'&&(region?<>
        <RegionalContent documentKey={'region-'+region.slug} values={values['region-'+region.slug]||{body:region.description}} canEdit={editableDocuments.includes('region-'+region.slug)} events={<><EventCollectionState state={eventsState} count={visible.length} retry={retryEvents}/><div className="events">{visible.map(event=><EventCard key={event.id} event={event} open={()=>openEvent(event)}/>)}</div></>}/>

      </>:<>{selected&&<p role="alert">{t("Diese Region wurde nicht gefunden. Bitte wählen Sie eine Region.")}</p>}<div className="regions-grid">{regions.map(item=><a key={item.slug} className="region-card" href={item.slug==='triungsters'?'#triungsters':`#regionen/${item.slug}`} style={regionalCardBackground(item.slug)}><h2>{t(item.name).replace('Nordwestschweiz','Nordwest\u00adschweiz')}</h2>{typeof item.memberCount==='number'&&Number.isFinite(item.memberCount)&&item.memberCount>=0&&<p key={item.memberCount} className="region-member-count">{item.memberCount} {t("Mitglieder")}</p>}</a>)}</div>{!regions.length&&<p className="collection-state">{t("Es sind noch keine Regionen hinterlegt.")}</p>}</>)}
    </section></>;
}

function InformationPage({page}:{page:Page}) {const {text:c,error,refresh}=useSiteContent();return <><PageHero eyebrow={t("Swiss TR-Club")} title={c(`${page}.title`)} text={t("Informationen des Clubs")}/><section className="page-content"><div className="information-content">{error?<p role="alert">{error}<button onClick={()=>void refresh()}>{t('Erneut laden')}</button></p>:c(`${page}.body`)?<ContentBlock id={`${page}.body`}/>:<p>{t("Dieser Inhalt wurde noch nicht veröffentlicht.")}</p>}</div>{page==='contact'&&<ContactForm/>}</section></>;}

function MembersPage({session,navigate}:{session:MemberSession|null,navigate:(p:Page)=>void}) { const {text:c}=useSiteContent(); if(session===null)return <section className="page-content"><p role="status">{t("Mitgliederzugang wird geprüft …")}</p></section>; if(!session.memberAccess) return <><PageHero eyebrow={t("Geschützter Bereich")} title={c('members.title')} text={c('members.intro')}/><section className="login-panel"><form method="post" action={`${wordpressUrl}/wp-login.php`}><p className="secure-label">{t("Geschützter Mitgliederbereich")}</p><h2>{t('Mitglieder-Login')}</h2>{session?.authenticated&&<p className="login-warning">{t("Ihre Mitgliedschaft besitzt momentan keinen Zugang zum Mitgliederbereich.")}</p>}<label>{t("E-Mail oder Benutzername")}<input name="log" type="text" autoComplete="username" required/></label><label>{t("Passwort")}<input name="pwd" type="password" autoComplete="current-password" required/></label><input type="hidden" name="redirect_to" value={`${frontendUrl}/${window.location.hash||'#mitglieder'}`}/><button type="submit">{t("Sicher anmelden →")}</button><a href={`${wordpressUrl}/wp-login.php?action=lostpassword`}>{t("Passwort vergessen?")}</a></form><aside><p className="eyebrow">{t("Noch nicht dabei?")}</p><h2>{t("Gemeinschaft beginnt mit einer ersten Ausfahrt.")}</h2><p>{t("Mitgliedsanträge werden persönlich geprüft und direkt durch den Swiss TR-Club verwaltet.")}</p><button onClick={() => navigate('club')}>{t("Mitgliedschaft ansehen")}</button></aside></section></>;
  const extraTools=[];
  if(session.canEditContent&&session.canManageRoles)extraTools.push({url:'#redaktion',label:'Redaktion',icon:'✎'});
  if(session.canManageEvents)extraTools.push({url:'#agenda-verwalten',label:'Agenda verwalten',icon:'A'});
  if(session.formsInboxUrl)extraTools.push({url:'#antraege',label:'Anträge & Anfragen',icon:'✎'});
  return <><section className="page-content dashboard-introduction"><ContentBlock id="members.dashboardIntro"/></section><MemberDashboard extraTools={extraTools}/></>; }



function EventDialog({event,close,memberAccess}:{event:ClubEvent,close:()=>void;memberAccess:boolean}) {
  return <Dialog title={event.title} close={close}>
    <div className="event-details"><p className="eyebrow">{eventContext(event)} · {event.eventType?.name}</p>{event.descriptionHtml?<RichHtml html={event.descriptionHtml}/>:<p>{event.description||event.summary}</p>}
      <div className="detail-box"><span>{t("Beginn")}</span><strong>{event.startAt?eventDateTime(event.startAt):'Wird bekanntgegeben'}</strong>
        {event.endAt&&<><span>{t("Ende")}</span><strong>{eventDateTime(event.endAt)}</strong></>}
        <span>{t('Ort')}</span><strong>{event.location||t('Wird bekanntgegeben')}</strong><span>{t('Anmeldung')}</span><strong>{registrationLabel(event.registrationStatus)}</strong>
        {event.registrationOpenAt&&<><span>{t("Anmeldung ab")}</span><strong>{eventDateTime(event.registrationOpenAt)}</strong></>}
        {event.registrationCloseAt&&<><span>{t("Anmeldung bis")}</span><strong>{eventDateTime(event.registrationCloseAt)}</strong></>}
      </div>
      {event.registrationRequired&&(event.externalRegistrationUrl?<a className="market-primary" href={event.externalRegistrationUrl} target="_blank" rel="noopener noreferrer">{t("Extern anmelden (neuer Tab) →")}</a>:<RegistrationForm eventId={event.id} memberAccess={memberAccess} hideTitle/>)}
      <button className="modal-action" onClick={close}>{t("Schliessen")}</button>
    </div>
  </Dialog>;
}
