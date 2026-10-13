'use client';
import {t} from './UILanguage';
import {useEffect,useState} from 'react';
import Image from 'next/image';
import {query,wordpressUrl} from './ClubApi';
export default function PublicGallery(){const [images,setImages]=useState<{url:string;caption:string}[]>([]);useEffect(()=>{const controller=new AbortController();query<typeof images>('strc_community',{operation:'teasers'},controller.signal).then(setImages).catch(()=>{});return()=>controller.abort();},[]);return <section className="page-content"><h1>{t('Galerie')}</h1>{images.length>0&&<div className="community-grid">{images.map(image=><figure key={image.url}><a href={image.url}><Image unoptimized src={image.url} alt={image.caption||'Freigegebenes Clubfoto'} width={600} height={400}/></a>{image.caption&&<figcaption>{image.caption}</figcaption>}</figure>)}</div>}<p>{t('Die vollständige Galerie steht Clubmitgliedern zur Verfügung.')}</p><a className="market-primary" href={wordpressUrl+'/wp-login.php?redirect_to='+encodeURIComponent(wordpressUrl+'/#galerie')}>{t('Mitglieder-Login')}</a></section>;}
