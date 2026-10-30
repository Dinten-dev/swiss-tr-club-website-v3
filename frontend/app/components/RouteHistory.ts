/** Hash routes keep their own history entry and scroll position, including browser back/forward. */
type Visit={id:string;hash:string;y:number};
const normal=(hash:string)=>hash&&hash!=='#'?hash:'#';
const stateKey='strcRouteVisit';
export function createRouteHistory(browser:Window){
 const visits:Visit[]=[];const listeners=new Set<()=>void>();let cursor=-1;let serial=0;
 const session=browser.crypto.randomUUID();let timers:number[]=[];let restoring=false;
 const cancel=()=>{timers.forEach(id=>browser.clearTimeout(id));timers=[];restoring=false;};
 const state=()=>typeof browser.history.state==='object'&&browser.history.state!==null?browser.history.state:{};
 const stamp=(id:string)=>browser.history.replaceState({...state(),[stateKey]:id},'');
 function route(){
  const hash=normal(browser.location.hash);const id=state()[stateKey];
  if(visits[cursor]?.id===id&&visits[cursor]?.hash===hash)return;
  cancel();
  const target=visits.findIndex(visit=>visit.id===id&&visit.hash===hash);
  if(target>=0){
   cursor=target;const visit=visits[cursor];restoring=true;
   for(const delay of [0,120,400])timers.push(browser.setTimeout(()=>{if(visits[cursor]===visit&&restoring)browser.scrollTo({top:visit.y,behavior:'instant'});},delay));
   timers.push(browser.setTimeout(()=>{restoring=false;timers=[];},450));
  }else{
   visits.splice(cursor+1);const visit={id:session+':'+(++serial),hash,y:0};visits.push(visit);cursor=visits.length-1;stamp(visit.id);
  }
  listeners.forEach(listener=>listener());
 }
 browser.history.scrollRestoration='manual';
 route();
 browser.addEventListener('scroll',()=>{if(!restoring&&visits[cursor])visits[cursor].y=browser.scrollY;},{passive:true});
 browser.addEventListener('hashchange',route);browser.addEventListener('popstate',route);
 for(const event of ['wheel','touchstart','pointerdown','keydown'])browser.addEventListener(event,cancel,{passive:true});
 return {replace:(url:string|URL)=>{cancel();browser.history.replaceState(state(),'',url);visits[cursor].hash=normal(browser.location.hash);visits[cursor].y=browser.scrollY;listeners.forEach(listener=>listener());},previous:()=>visits[cursor-1]?.hash||'',subscribe:(listener:()=>void)=>{listeners.add(listener);return()=>{listeners.delete(listener);};}};
}
let history:ReturnType<typeof createRouteHistory>|undefined;
function current(){if(!history&&typeof window!=='undefined')history=createRouteHistory(window);return history;}
export const previousRoute=()=>current()?.previous()||'';
export const subscribeRoutes=(listener:()=>void)=>current()?.subscribe(listener)||(()=>{});

export const replaceRoute=(url:string|URL)=>current()?.replace(url);
