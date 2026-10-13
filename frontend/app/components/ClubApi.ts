import {t} from './UILanguage';
export const wordpressUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL ?? 'http://localhost:8080';

export class ClubApiError extends Error { constructor(message:string,public readonly status:number){super(message);this.name='ClubApiError';} }

async function response<T>(res:Response):Promise<T> {
  let result:{success:boolean;data:T & {message?:string}};
  try { result=await res.json(); } catch { throw new Error(t('Die Anfrage konnte nicht verarbeitet werden. Bitte erneut versuchen.')); }
  if(!res.ok||!result.success) throw new ClubApiError(t(result.data?.message||'Die Anfrage konnte nicht abgeschlossen werden.'),res.status);
  return result.data;
}
async function connect(url:string,options:RequestInit):Promise<Response>{try{return await fetch(url,options);}catch(reason){if(options.signal?.aborted)throw reason;throw new Error(t('Verbindung unterbrochen. Bitte erneut versuchen.'));}}
export async function query<T>(action:string,parameters:Record<string,string>,signal?:AbortSignal) {
  const url=`${wordpressUrl}/wp-admin/admin-ajax.php?${new URLSearchParams({action,...parameters})}`;
  const options:RequestInit={credentials:'include',cache:'no-store',signal};
  let res:Response;
  try{res=await connect(url,options);}catch(reason){if(signal?.aborted)throw reason;res=await connect(url,options);}
  if([502,503,504].includes(res.status))res=await connect(url,options);
  return response<T>(res);
}
export async function mutate<T>(action:string,nonce:string,form:FormData) {
  // Long editorial sessions can outlive a WordPress nonce. Refresh without
  // reloading the editor or discarding any unsaved work.
  if(action==='strc_editorial'){
    const sessionResponse=await connect(`${wordpressUrl}/wp-admin/admin-ajax.php?action=strc_session`,{credentials:'include',cache:'no-store'});
    if(!sessionResponse.ok)throw new Error('Anmeldung konnte nicht geprüft werden. Bitte erneut speichern.');
    const session=await sessionResponse.json() as {authenticated?:boolean;canEditContent?:boolean;editorialNonce?:string};
    if(!session.authenticated||!session.canEditContent||!session.editorialNonce)throw new ClubApiError('Bitte in einem zweiten Tab erneut anmelden und danach hier nochmals speichern.',403);
    nonce=session.editorialNonce;
  }
  form.set('action',action); form.set('nonce',nonce);
  return connect(`${wordpressUrl}/wp-admin/admin-ajax.php`,{method:'POST',credentials:'include',body:form}).then(response<T>);
}
export function fields(values:Record<string,string>):FormData { const form=new FormData();for(const [key,value] of Object.entries(values))form.set(key,value);return form; }
