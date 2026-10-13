'use client';
import {t,uiLocale,useUILanguage} from './UILanguage';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Dialog } from './Marketplace';
import { query } from './ClubApi';
import {useSiteContent,RichHtml,assetUrl,type ContentPartner} from './SiteContent';
import HomepageOverview from './HomepageOverview';
import HomepageFeed,{homepageCycle,type HomeFeed,type Highlight} from './HomepageFeed';
import type { MagazineIssue } from './Magazine';
import type {ClubEvent} from '../page';

type Destination = 'club'|'agenda'|'regions'|'members'|'forum'|'gallery'|'library'|'market'|'contact'|'privacy'|'statutes';
type News = { id:number; title:string; excerpt:string; body:string; bodyHtml?:string; date:string; image:string };
type Content = HomeFeed & { news:News[]; newsPage:number; newsPages:number; magazine:MagazineIssue|null; memberAccess:boolean; staging:boolean; latestForum?:{id:number;title:string;excerpt:string}|null };
const date = (value:string) => new Date(value).toLocaleDateString(uiLocale(),{day:'numeric',month:'long',year:'numeric'});

export default function HomepageSections({memberAccess,archive=false,upcomingEvents,eventsState='ready',openEvent}:{archive?:boolean;eventPreview:{title:string;text:string};navigate:(page:Destination)=>void;upcomingEvents:ClubEvent[];eventsState?:'loading'|'ready'|'error';openEvent?:(event:ClubEvent)=>void;memberAccess:boolean}) {
  const {text:c,values}=useSiteContent();const {language}=useUILanguage();
  const sponsors=(values.home?.partners??[]) as ContentPartner[];
  const [content,setContent] = useState<Content|null>(null);
  const [error,setError] = useState('');
  const [revision,setRevision] = useState(0);
  const [news,setNews] = useState<News|null>(null);
  const [loadingMore,setLoadingMore]=useState(false);
  const [moreError,setMoreError]=useState('');
  const [cycle]=useState(homepageCycle);
  useEffect(()=>{
    const controller = new AbortController();
    query<Content>('strc_homepage',{language,operation:archive?'list':'overview',cycle:String(cycle)},controller.signal).then(result=>{setContent(result);setError('');setNews(current=>current?result.news.find(item=>item.id===current.id)||result.highlights?.items.filter(item=>item.kind==='news').map(item=>({...item,body:''})).find(item=>item.id===current.id)||null:null);}).catch(reason=>{if(!controller.signal.aborted)setError(reason.message);});
    return ()=>controller.abort();
  },[revision,memberAccess,language,archive,cycle]);
  const retry = () => {setError('');setContent(null);setRevision(value=>value+1);};
  const more=async()=>{
    if(!content||loadingMore)return;
    setLoadingMore(true);setMoreError('');
    try {
      const result=await query<Content>('strc_homepage',{page:String(content.newsPage+1),language});
      setContent(current=>current?{...current,news:[...current.news,...result.news.filter(item=>!current.news.some(previous=>previous.id===item.id))],newsPage:result.newsPage,newsPages:result.newsPages}:current);
      if(result.news[0])requestAnimationFrame(()=>document.getElementById(`home-news-${result.news[0].id}`)?.focus());
    }catch{setMoreError('Weitere Neuigkeiten konnten nicht geladen werden. Bitte erneut versuchen.');}
    finally{setLoadingMore(false);}
  };
  const openNews=(item:News,button:HTMLButtonElement)=>{button.focus({preventScroll:true});setNews(item);};
  return <div className="home-editorial">
    {!archive&&<HomepageOverview/>}
    {!archive&&<HomepageFeed content={content} loading={!content&&!error} error={Boolean(error)} retry={retry} events={upcomingEvents} eventsState={eventsState} openEvent={openEvent} openNews={(item:Highlight,button)=>openNews({...item,body:''},button)}/>}
    {archive&&<section className="home-width home-news" id="home-news" tabIndex={-1} aria-labelledby="home-news-title">
      <div className="home-section-heading"><div><p className="eyebrow">{t("Latest News · Neuigkeiten")}</p><h1 id="home-news-title">{c('home.newsTitle')}</h1></div><p>{c('home.newsIntro')}</p></div>
      {error?<div className="collection-state error" role="alert">{t("Die Neuigkeiten konnten nicht geladen werden.")}<button className="home-text-link" onClick={retry}>{t('Erneut versuchen')}</button></div>:!content?<p className="collection-state" role="status">{t("Neuigkeiten werden geladen …")}</p>:content.news.length===0?<div className="home-empty"><p>{t("Aktuell sind noch keine Neuigkeiten veröffentlicht.")}</p></div>:<><div className="home-news-grid">{content.news.map(item=><article className="home-news-card" key={item.id}>{item.image&&<button className="home-news-image" aria-label={`${item.title} ${t('lesen')}`} onClick={event=>openNews(item,event.currentTarget)}><Image src={item.image} alt="" width={1080} height={720}/><span aria-hidden="true">↗</span></button>}<div className="home-news-copy"><p className="home-meta"><time dateTime={item.date}>{date(item.date)}</time></p><h3><button id={`home-news-${item.id}`} onClick={event=>openNews(item,event.currentTarget)}>{item.title}</button></h3><p>{item.excerpt}</p><button className="home-text-link" onClick={event=>openNews(item,event.currentTarget)}>{t("Weiterlesen →")}</button></div></article>)}</div>{moreError&&<p role="alert">{moreError}</p>}{content.newsPage<content.newsPages&&<button className="home-button home-news-more" onClick={more} disabled={loadingMore}>{t(loadingMore?'Neuigkeiten werden geladen …':content.newsPage===1?'Alle Neuigkeiten anzeigen ↓':'Weitere Neuigkeiten laden ↓')}</button>}</>}
    </section>}

    {!archive&&<section className="home-sponsors" id="home-sponsors" tabIndex={-1} aria-label={t("Unsere Partner")}><div className="home-width"><div className="home-section-heading"><div><p className="eyebrow">{t("Unsere Partner")}</p></div>{c('home.sponsorsIntro')&&<p>{c('home.sponsorsIntro')}</p>}</div><div className="home-sponsor-logos">{sponsors.map(sponsor=><a key={sponsor.name} href={sponsor.url} target="_blank" rel="noopener noreferrer" aria-label={`${sponsor.name} – ${t('Website in neuem Tab')}`}><Image src={assetUrl(sponsor.image)} alt={sponsor.name} width={150} height={90}/></a>)}</div></div></section>}
    {news&&<Dialog title={news.title} close={()=>setNews(null)}><article className="home-news-detail"><p className="home-meta">{t("Clubnews ·")} {date(news.date)}</p>{news.image&&<Image src={news.image} alt="" width={1200} height={800}/>}{news.bodyHtml?<RichHtml html={news.bodyHtml}/>:<p>{news.body}</p>}</article></Dialog>}
  </div>;
}
