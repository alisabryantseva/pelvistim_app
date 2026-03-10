import { useState, useEffect, useMemo, useCallback } from "react";
import ankleDeviceImg from "./assets/ankle-device-guide.png";
import pelvicFloorDiagramImg from "./assets/pelvic-floor-diagram.jpg";

// ─── Brand Palette ────────────────────────────────────────────────────────────
const C = {
  peach:   "#fbd1a2",
  peachDark: "#f5a85a",
  mint:    "#7dcfb6",
  mintDark:"#4db89b",
  cyan:    "#00b2ca",
  cyanDark:"#0090a8",
  navy:    "#1d4e89",
  navyDark:"#163b6b",
};


// ─── SVG Icon Library ─────────────────────────────────────────────────────────
const Settings=({className})=><svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>;
const BookOpen=({className})=><svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>;
const Activity=({className})=><svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>;
const CheckCircle2=({className})=><svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>;
const Plus=({className})=><svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
const Minus=({className})=><svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>;
const ChevronLeft=({className})=><svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>;
const ChevronRight=({className})=><svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>;
const ChevronDown=({className})=><svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>;
const ChevronUp=({className})=><svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>;
const Pause=({className})=><svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>;
const Play=({className})=><svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>;
const X=({className})=><svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const ArrowLeft=({className})=><svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>;
const ArrowRight=({className})=><svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>;
const AlertCircle=({className})=><svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>;
const Save=({className})=><svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>;
const Pin=({className})=><svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="17" x2="12" y2="22"/><path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24z"/></svg>;
const PinOff=({className})=><svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="2" y1="2" x2="22" y2="22"/><line x1="12" y1="17" x2="12" y2="22"/><path d="M9 9v1.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V17h12"/><path d="M15 9.34V6h1a2 2 0 0 0 0-4H7.89"/></svg>;
const Trash2=({className})=><svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>;
const Clock=({className})=><svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const Home=({className})=><svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const Calendar=({className})=><svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
const Heart=({className})=><svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>;
const Brain=({className})=><svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-1.04-4.79A2.5 2.5 0 0 1 7 10c-.11-.66.03-1.37.4-2a2.5 2.5 0 0 1 2.1-6z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 1.04-4.79A2.5 2.5 0 0 0 17 10c.11-.66-.03-1.37-.4-2a2.5 2.5 0 0 0-2.1-6z"/></svg>;
const HelpCircle=({className})=><svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>;
const Sparkles=({className})=><svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.88 5.76L20 10l-5.76 1.88L12 20l-1.88-5.76L4 14l5.76-1.88z"/><path d="M5 3v4"/><path d="M3 5h4"/><path d="M19 17v4"/><path d="M17 19h4"/></svg>;
const Shield=({className})=><svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
const Bell=({className})=><svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>;
const BarChart2=({className})=><svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>;
const Repeat=({className})=><svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>;
const ClipboardList=({className})=><svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><line x1="12" y1="11" x2="12" y2="17"/><line x1="9" y1="14" x2="15" y2="14"/></svg>;
const Info=({className})=><svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>;
const Timer=({className})=><svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2"/><path d="M5 3 2 6"/><path d="m22 6-3-3"/><path d="M6.38 18.7 4 21"/><path d="M17.64 18.67 20 21"/></svg>;

const UrgencyIcon=({className})=><svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C12 2 5 10 5 14a7 7 0 0 0 14 0c0-4-7-12-7-12z"/><line x1="12" y1="11" x2="12" y2="14"/><circle cx="12" cy="16.5" r="0.5" fill="currentColor"/></svg>;
const CupIcon=({className})=><svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 8h10l-1.5 9H8.5L7 8z"/><path d="M5 8h14"/><path d="M9 8V5"/><path d="M15 8V5"/><path d="M9 21h6"/><path d="M12 17v4"/><path d="M17 11h2a2 2 0 0 1 0 4h-2"/></svg>;
const FecalIcon=({className})=><svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a4 4 0 0 1 4-4h0a4 4 0 0 1 4 4v0a4 4 0 0 1-4 4h0a4 4 0 0 0-4 4v0a4 4 0 0 0 4 4h4"/><path d="M18 16a2 2 0 0 1-2 2"/></svg>;
const ConstipationIcon=({className})=><svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="10" width="18" height="4" rx="1"/><path d="M12 3v4"/><path d="M12 17v4"/><path d="M8 6l4-3 4 3"/><path d="M8 18l4 3 4-3"/></svg>;

// ─── Utilities ────────────────────────────────────────────────────────────────
const DAY_MS=86400000;
const fmt=(d,o)=>new Date(d).toLocaleDateString("en-US",o);
const sameDay=(a,b)=>new Date(a).toDateString()===new Date(b).toDateString();
const startOfDayFn=(d)=>{const r=new Date(d);r.setHours(0,0,0,0);return r;};
const isAfterDay=(a,b)=>startOfDayFn(a)>startOfDayFn(b);
const startOfWeek=(d)=>{const r=new Date(d);r.setDate(r.getDate()-r.getDay());r.setHours(0,0,0,0);return r;};
const endOfWeek=(d)=>{const r=startOfWeek(d);r.setDate(r.getDate()+6);r.setHours(23,59,59,999);return r;};
const startOfMonth=(d)=>new Date(d.getFullYear(),d.getMonth(),1);
const endOfMonth=(d)=>new Date(d.getFullYear(),d.getMonth()+1,0,23,59,59,999);
const isSameMonth=(a,b)=>new Date(a).getMonth()===new Date(b).getMonth()&&new Date(a).getFullYear()===new Date(b).getFullYear();
const eachDay=(s,e)=>{const d=[];const c=new Date(s);while(c<=e){d.push(new Date(c));c.setDate(c.getDate()+1);}return d;};
const addDays=(d,n)=>new Date(d.getTime()+n*DAY_MS);
const getWeekKey=(d)=>{const ws=startOfWeek(d);return`${ws.getFullYear()}-${ws.getMonth()}-${ws.getDate()}`;};
const weekDayLetters=["S","M","T","W","T","F","S"];
const weekDaysFull=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const weekdayNameToIndex={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};
const cn=(...c)=>c.filter(Boolean).join(" ");
const roundHalf=(n)=>Math.round(n*2)/2;
const defaultTimeZone=(()=>{try{return Intl.DateTimeFormat().resolvedOptions().timeZone||"America/New_York";}catch{return"America/New_York";}})();
const COMMON_TIMEZONES=[
  {label:"EST / EDT (New York)",value:"America/New_York"},
  {label:"CST / CDT (Chicago)",value:"America/Chicago"},
  {label:"MST / MDT (Denver)",value:"America/Denver"},
  {label:"PST / PDT (Los Angeles)",value:"America/Los_Angeles"},
  {label:"AKST / AKDT (Anchorage)",value:"America/Anchorage"},
  {label:"HST (Honolulu)",value:"Pacific/Honolulu"},
  {label:"UTC",value:"UTC"},
  {label:"GMT / BST (London)",value:"Europe/London"},
  {label:"CET / CEST (Berlin)",value:"Europe/Berlin"},
  {label:"IST (India)",value:"Asia/Kolkata"},
  {label:"JST (Tokyo)",value:"Asia/Tokyo"},
  {label:"AEST / AEDT (Sydney)",value:"Australia/Sydney"},
];

const fmtTimeDisplay=(d,use24)=>{
  const dt=new Date(d);
  if(use24) return dt.toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit"});
  return dt.toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit",hour12:true});
};
const fmtAlarmTime=(timeStr,use24)=>{
  if(!timeStr) return "";
  const [h,m]=timeStr.split(":").map(Number);
  if(use24) return `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}`;
  const ampm=h>=12?"PM":"AM";
  const h12=h%12||12;
  return `${h12}:${String(m).padStart(2,"0")} ${ampm}`;
};
const two=(n)=>String(n).padStart(2,"0");
const ymd=(y,m,d)=>`${y}-${two(m)}-${two(d)}`;
function getZonedParts(date,timeZone){
  const parts=new Intl.DateTimeFormat("en-US",{timeZone,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:false,weekday:"short"}).formatToParts(date);
  const get=(type)=>parts.find(p=>p.type===type)?.value||"";
  return{
    year:Number(get("year")),
    month:Number(get("month")),
    day:Number(get("day")),
    hour:Number(get("hour")),
    minute:Number(get("minute")),
    weekday:weekdayNameToIndex[get("weekday")]??0,
  };
}
function addDaysToYmd(y,m,d,delta){
  const dt=new Date(Date.UTC(y,m-1,d));
  dt.setUTCDate(dt.getUTCDate()+delta);
  return ymd(dt.getUTCFullYear(),dt.getUTCMonth()+1,dt.getUTCDate());
}
function getTriggerSpec(alarm){
  const [h,m]=String(alarm.time||"00:00").split(":").map(Number);
  const lead=alarm.alarmType==="reminder"?(alarm.leadMins||10):0;
  let triggerMin=(h*60+m)-lead;
  let dayShift=0;
  while(triggerMin<0){triggerMin+=1440;dayShift-=1;}
  while(triggerMin>=1440){triggerMin-=1440;dayShift+=1;}
  return{hour:Math.floor(triggerMin/60),minute:triggerMin%60,dayShift};
}

const BG="bg-gradient-to-br from-blue-50 via-sky-100 to-blue-100";
const TOUR_TARGET="relative z-[115] ring-2 ring-white/70 shadow-[0_0_0_6px_rgba(0,178,202,0.18),0_0_26px_rgba(0,178,202,0.45)] animate-pulse";
const TOUR_NUMERIC_PANEL="relative z-[115] rounded-2xl bg-white border border-gray-100 shadow-[0_8px_24px_rgba(15,23,42,0.08)]";

// ─── PelviStim Logo SVG ───────────────────────────────────────────────────────
function PelviStimLogo({size=36}){
  return(
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <circle cx="50" cy="50" r="48" stroke="#1d4e89" strokeWidth="3" fill="white"/>
      <path d="M28 55 Q22 42 32 36 Q40 31 50 34 Q60 31 68 36 Q78 42 72 55" fill="none" stroke="#1d4e89" strokeWidth="3.5" strokeLinecap="round"/>
      <path d="M28 55 Q25 64 30 70 Q36 76 42 72 Q46 70 50 68 Q54 70 58 72 Q64 76 70 70 Q75 64 72 55" fill="none" stroke="#1d4e89" strokeWidth="3.5" strokeLinecap="round"/>
      <rect x="44" y="38" width="12" height="20" rx="4" fill="#00b2ca" opacity="0.7"/>
      <line x1="50" y1="42" x2="50" y2="54" stroke="white" strokeWidth="1.5"/>
      <line x1="46" y1="46" x2="54" y2="46" stroke="white" strokeWidth="1"/>
      <line x1="46" y1="50" x2="54" y2="50" stroke="white" strokeWidth="1"/>
      <path d="M15 32 Q30 22 50 28 Q70 34 85 24" fill="none" stroke="#00b2ca" strokeWidth="3" strokeLinecap="round"/>
      <path d="M20 38 Q35 28 55 34 Q72 40 88 30" fill="none" stroke="#7dcfb6" strokeWidth="2" strokeLinecap="round" opacity="0.7"/>
    </svg>
  );
}

// ─── Base Components ──────────────────────────────────────────────────────────
function Button({children,className,variant="default",size="default",disabled,onClick,...p}){
  const base="inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:pointer-events-none active:scale-[0.97]";
  const v={
    default:"text-white shadow-md",
    outline:"border-2 border-gray-200 bg-white hover:bg-gray-50 text-gray-700",
    ghost:"hover:bg-white/60 text-gray-600",
    destructive:"bg-red-500 text-white hover:bg-red-600",
    secondary:"bg-gray-100 text-gray-800 hover:bg-gray-200",
    success:"text-white shadow-md",
    cyan:"text-white shadow-md",
    mint:"text-white shadow-md",
    navy:"text-white shadow-md",
    peach:"text-white shadow-md",
  };
  const vStyle={
    default:{background:C.navy,boxShadow:`0 4px 14px ${C.navy}40`},
    success:{background:C.mint,boxShadow:`0 4px 14px ${C.mint}40`},
    cyan:{background:C.cyan,boxShadow:`0 4px 14px ${C.cyan}40`},
    mint:{background:C.mint,boxShadow:`0 4px 14px ${C.mint}40`},
    navy:{background:C.navy,boxShadow:`0 4px 14px ${C.navy}40`},
    peach:{background:C.peachDark,boxShadow:`0 4px 14px ${C.peachDark}40`},
  };
  const s={default:"h-10 px-5 text-sm",sm:"h-8 px-3 text-xs",lg:"h-12 px-8 text-base",icon:"h-10 w-10"};
  return(
    <button
      className={cn(base,v[variant]||v.default,s[size],className)}
      style={vStyle[variant]||{}}
      disabled={disabled}
      onClick={onClick}
      {...p}
    >{children}</button>
  );
}
function Card({children,className,onClick,style}){return <div className={cn("rounded-2xl border border-gray-200/80 bg-white shadow-sm",className)} style={style} onClick={onClick}>{children}</div>;}
function Progress({value,className}){return <div className={cn("h-3 w-full rounded-full bg-gray-100 overflow-hidden",className)}><div className="h-full rounded-full transition-all duration-500" style={{width:`${Math.min(100,Math.max(0,value))}%`,background:`linear-gradient(to right, ${C.cyan}, ${C.navy})`}}/></div>;}
function Checkbox({checked,onChange}){return <button role="checkbox" aria-checked={checked} onClick={()=>onChange(!checked)} className={cn("h-5 w-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 shrink-0",checked?"border-transparent":"border-gray-300 bg-white")} style={checked?{background:C.navy,borderColor:C.navy}:{}}>{checked&&<svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>}</button>;}

function Toggle({checked,onChange}){
  return(
    <button
      onClick={()=>onChange(!checked)}
      className="relative focus:outline-none flex-shrink-0"
      style={{width:52,height:28,borderRadius:14,background:checked?C.navy:"#d1d5db",transition:"background 0.2s",border:"none",cursor:"pointer",padding:0,display:"inline-flex",alignItems:"center"}}
    >
      <span style={{
        position:"absolute",
        top:3,
        left:checked?27:3,
        width:22,height:22,
        borderRadius:"50%",
        background:"white",
        boxShadow:"0 1px 4px rgba(0,0,0,0.25)",
        transition:"left 0.2s",
        display:"block",
      }}/>
    </button>
  );
}

function IntensityStepper({value,onChange,min=0,max=10,disabled=false,large=false}){
  const dec=()=>{const n=roundHalf(value-0.5);if(n>=min)onChange(n);};
  const inc=()=>{const n=roundHalf(value+0.5);if(n<=max)onChange(n);};
  return(
    <div className="flex items-center gap-4">
      <button onClick={dec} disabled={disabled||value<=min} className="rounded-2xl border-2 border-gray-200 bg-white flex items-center justify-center transition-all active:scale-90 disabled:opacity-40" style={{width:large?56:44,height:large?56:44,flexShrink:0}}>
        <Minus className={large?"w-6 h-6 text-gray-600":"w-4 h-4 text-gray-600"}/>
      </button>
      <div className="text-center" style={{minWidth:large?72:64}}>
        <div className={cn("font-bold tabular-nums",large?"text-6xl":"text-4xl")} style={{color:C.navy}}>{value.toFixed(1)}</div>
        <div className="text-[10px] text-gray-400 mt-0.5">of {max}.0</div>
      </div>
      <button onClick={inc} disabled={disabled||value>=max} className="rounded-2xl border-2 border-gray-200 bg-white flex items-center justify-center transition-all active:scale-90 disabled:opacity-40" style={{width:large?56:44,height:large?56:44,flexShrink:0}}>
        <Plus className={large?"w-6 h-6 text-gray-600":"w-4 h-4 text-gray-600"}/>
      </button>
    </div>
  );
}

// ─── Bottom Nav ───────────────────────────────────────────────────────────────
function BottomNav({current,onNav}){
  const active=(k)=>current===k;
  return(
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-200/80 px-1 py-2 flex items-center justify-around z-50">
      {[
        {k:"guides",Icon:BookOpen,label:"Guides"},
        {k:"schedule",Icon:Bell,label:"Schedule"},
      ].map(({k,Icon,label})=>(
        <button key={k} onClick={()=>onNav(k)} className="flex flex-col items-center gap-0.5 py-1 px-2 min-w-0">
          <Icon className="w-5 h-5 shrink-0" style={{color:active(k)?C.cyan:"#9ca3af"}}/>
          <span className="text-[9px]" style={{color:active(k)?C.cyan:"#9ca3af",fontWeight:active(k)?700:400}}>{label}</span>
        </button>
      ))}
      <button onClick={()=>onNav("today")} className="flex flex-col items-center min-w-0" style={{marginTop:-20}}>
        <div className="h-14 w-14 rounded-2xl flex items-center justify-center shadow-lg transition-all" style={{background:`linear-gradient(135deg, ${C.cyan}, ${C.navy})`,boxShadow:`0 6px 20px ${C.navy}50`,transform:active("today")?"scale(1.08)":"scale(1)"}}>
          <Home className="w-6 h-6 text-white"/>
        </div>
        <span className="text-[9px] mt-1 font-bold" style={{color:C.navy}}>Home</span>
      </button>
      {[
        {k:"diary",Icon:ClipboardList,label:"Diary"},
        {k:"settings",Icon:Settings,label:"Settings"},
      ].map(({k,Icon,label})=>(
        <button key={k} onClick={()=>onNav(k)} className="flex flex-col items-center gap-0.5 py-1 px-2 min-w-0">
          <Icon className="w-5 h-5 shrink-0" style={{color:active(k)?C.cyan:"#9ca3af"}}/>
          <span className="text-[9px]" style={{color:active(k)?C.cyan:"#9ca3af",fontWeight:active(k)?700:400}}>{label}</span>
        </button>
      ))}
    </div>
  );
}

// ─── Constants ────────────────────────────────────────────────────────────────
const INCONTINENCE_SUBTYPES={
  urge:{label:"Urge Incontinence",Icon:UrgencyIcon,desc:"Leakage associated with a sudden, hard-to-delay urge to urinate",accent:C.cyan},
  urgency:{label:"Urinary Urgency",Icon:AlertCircle,desc:"Sudden, strong urge to urinate that is difficult to defer",accent:C.cyan},
  frequency:{label:"Urinary Frequency",Icon:Clock,desc:"Needing to urinate more often than usual during the day",accent:C.cyan},
  hesitancy:{label:"Urinary Hesitancy / Difficulty Emptying",Icon:Timer,desc:"Trouble starting urine flow or feeling incompletely emptied",accent:C.cyan},
  fecal:{label:"Fecal Incontinence",Icon:FecalIcon,desc:"Difficulty controlling bowel movements",accent:C.cyan},
  constipation:{label:"Constipation",Icon:ConstipationIcon,desc:"Infrequent or difficult bowel movements, often from slow colonic motility or idiopathic causes",accent:C.cyan},
  pelvicPain:{label:"Pelvic Pain",Icon:Heart,desc:"Persistent pain or discomfort in the pelvic region",accent:C.cyan},
};

const GENDER_OPTIONS=["Female","Male","Non-binary","Other / Prefer not to say"];
const EDUCATION_LEVELS=["Prefer not to say","Less than high school","High school / GED","Some college","Associate's degree","Bachelor's degree","Graduate degree"];
const RACE_ETHNICITY_OPTIONS=["Prefer not to say","American Indian or Alaska Native","Asian","Black or African American","Hispanic or Latino","Middle Eastern or North African","Native Hawaiian or Other Pacific Islander","White","Multiracial"];


// ─── Schedule Screen ──────────────────────────────────────────────────────────
const LEAD_OPTIONS=[5,10,15,30];
const DEFAULT_ALARMS=[
  {id:"d2",time:"19:30",label:"Evening Session",alarmType:"autostart",isRecurring:true,days:{0:true,1:true,2:true,3:true,4:true,5:true,6:true},active:false},
];

function ScheduleScreen({onNav,alarms,onUpdateAlarms,use24}){
  const [editAlarm,setEditAlarm]=useState(null);
  const [time,setTime]=useState("09:00");
  const [label,setLabel]=useState("");
  const [alarmType,setAlarmType]=useState("reminder");
  const [isRecurring,setIsRecurring]=useState(true);
  const [days,setDays]=useState({0:false,1:true,2:true,3:true,4:true,5:true,6:false});
  const [oneTimeDate,setOneTimeDate]=useState(()=>new Date().toISOString().split("T")[0]);
  const [leadMins,setLeadMins]=useState(10);
  const dayNames=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

  const openNew=()=>{setEditAlarm("new");setTime("09:00");setLabel("");setAlarmType("reminder");setIsRecurring(true);setDays({0:false,1:true,2:true,3:true,4:true,5:true,6:false});setOneTimeDate(new Date().toISOString().split("T")[0]);setLeadMins(10);};
  const openEdit=(a)=>{setEditAlarm(a);setTime(a.time);setLabel(a.label);setAlarmType(a.alarmType||"reminder");setIsRecurring(a.isRecurring!==false);setDays(a.days||{0:false,1:true,2:true,3:true,4:true,5:true,6:false});setOneTimeDate(a.oneTimeDate||new Date().toISOString().split("T")[0]);setLeadMins(a.leadMins||10);};
  const closeEdit=()=>setEditAlarm(null);

  const saveAlarm=()=>{
    const isNew=editAlarm==="new";
    const alarm={id:isNew?Date.now().toString():editAlarm.id,time,label:label||(alarmType==="autostart"?"Scheduled Session":"Session Reminder"),alarmType,isRecurring,days:isRecurring?days:{},oneTimeDate:isRecurring?null:oneTimeDate,leadMins,active:isNew?true:editAlarm.active};
    if(isNew)onUpdateAlarms([...alarms,alarm]);
    else onUpdateAlarms(alarms.map(a=>a.id===editAlarm.id?alarm:a));
    closeEdit();
  };

  const toggleAlarm=(id)=>onUpdateAlarms(alarms.map(a=>a.id===id?{...a,active:!a.active}:a));
  const deleteAlarm=(id)=>onUpdateAlarms(alarms.filter(a=>a.id!==id));

  const formatSchedule=(a)=>{
    if(!a.isRecurring)return fmt(a.oneTimeDate,{weekday:"short",month:"short",day:"numeric"});
    const on=Object.entries(a.days||{}).filter(([,v])=>v).map(([k])=>dayNames[k]);
    if(on.length===7)return"Every day";
    if(on.join(",")===["Mon","Tue","Wed","Thu","Fri"].join(","))return"Weekdays";
    if(on.join(",")===["Sat","Sun"].join(","))return"Weekends";
    return on.join(", ")||"No days set";
  };

  const canSave=isRecurring?Object.values(days).some(Boolean):oneTimeDate.length>0;

  if(editAlarm!==null){
    return(
      <div className={cn("min-h-screen pb-28",BG)}>
        <div className="max-w-2xl mx-auto p-6 space-y-5">
          <div className="flex items-center gap-3">
            <button onClick={closeEdit} className="h-10 w-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-all">
              <ArrowLeft className="w-5 h-5 text-gray-600"/>
            </button>
            <h1 className="text-xl font-bold flex-1">{editAlarm==="new"?"New Schedule":"Edit Schedule"}</h1>
            <button onClick={closeEdit} className="px-4 py-2 rounded-xl text-sm font-semibold bg-white border border-gray-200 text-gray-600 hover:bg-gray-50">Exit</button>
          </div>

          <Card className="p-5 space-y-5">
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">Type</label>
              <div className="grid grid-cols-2 gap-3">
                <button onClick={()=>setAlarmType("reminder")} className="p-4 rounded-xl border-2 text-left transition-all" style={{borderColor:alarmType==="reminder"?C.cyan:"#e5e7eb",background:alarmType==="reminder"?"#e8f9fb":"white"}}>
                  <Bell className="w-5 h-5 mb-1.5" style={{color:alarmType==="reminder"?C.cyan:"#9ca3af"}}/>
                  <div className="font-semibold text-sm">Reminder</div>
                  <div className="text-[10px] text-gray-400 mt-0.5">Notify before session</div>
                </button>
                <button onClick={()=>setAlarmType("autostart")} className="p-4 rounded-xl border-2 text-left transition-all" style={{borderColor:alarmType==="autostart"?C.mint:"#e5e7eb",background:alarmType==="autostart"?"#e8faf4":"white"}}>
                  <Timer className="w-5 h-5 mb-1.5" style={{color:alarmType==="autostart"?C.mint:"#9ca3af"}}/>
                  <div className="font-semibold text-sm">Scheduled Session</div>
                  <div className="text-[10px] text-gray-400 mt-0.5">Launches automatically</div>
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">Label</label>
              <input value={label} onChange={e=>setLabel(e.target.value)} placeholder={alarmType==="autostart"?"Scheduled Session":"Session Reminder"} className="w-full h-10 rounded-xl border-2 border-gray-200 px-3 text-sm focus:outline-none" style={{borderColor:"#e5e7eb"}} onFocus={e=>e.target.style.borderColor=C.cyan} onBlur={e=>e.target.style.borderColor="#e5e7eb"}/>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">Session Time</label>
              <input type="time" value={time} onChange={e=>setTime(e.target.value)} className="w-full h-12 rounded-xl border-2 border-gray-200 px-3 text-lg font-bold focus:outline-none" style={{borderColor:"#e5e7eb"}} onFocus={e=>e.target.style.borderColor=C.cyan} onBlur={e=>e.target.style.borderColor="#e5e7eb"}/>
            </div>

            <div className="flex bg-gray-100 rounded-xl p-1">
              <button onClick={()=>setIsRecurring(true)} className={cn("flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-1.5",isRecurring?"bg-white shadow-sm text-gray-900":"text-gray-400")}><Repeat className="w-3.5 h-3.5"/>Weekly</button>
              <button onClick={()=>setIsRecurring(false)} className={cn("flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-1.5",!isRecurring?"bg-white shadow-sm text-gray-900":"text-gray-400")}><Calendar className="w-3.5 h-3.5"/>One-time</button>
            </div>

            {isRecurring?(
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">Repeat on</label>
                <div className="flex gap-1.5">
                  {dayNames.map((d,i)=>(
                    <button key={i} onClick={()=>setDays(p=>({...p,[i]:!p[i]}))} className="flex-1 py-2.5 rounded-xl text-xs font-bold transition-all" style={{background:days[i]?C.navy:"#f3f4f6",color:days[i]?"white":"#6b7280"}}>{d[0]}</button>
                  ))}
                </div>
              </div>
            ):(
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">Date</label>
                <input type="date" value={oneTimeDate} onChange={e=>setOneTimeDate(e.target.value)} className="w-full h-10 rounded-xl border-2 border-gray-200 px-3 text-sm focus:outline-none"/>
              </div>
            )}

            {alarmType==="reminder"&&(
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">Notify me</label>
                <div className="flex gap-2 flex-wrap">
                  {LEAD_OPTIONS.map(m=>(
                    <button key={m} onClick={()=>setLeadMins(m)} className="px-3 py-2 rounded-xl text-xs font-semibold border-2 transition-all" style={{borderColor:leadMins===m?C.cyan:"#e5e7eb",background:leadMins===m?"#e8f9fb":"white",color:leadMins===m?C.cyanDark:"#6b7280"}}>{m} min before</button>
                  ))}
                </div>
              </div>
            )}

            <button onClick={saveAlarm} disabled={!canSave} className="w-full h-12 rounded-2xl text-white font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50" style={{background:`linear-gradient(135deg, ${C.cyan}, ${C.navy})`,boxShadow:`0 4px 14px ${C.navy}40`}}>
              <Save className="w-4 h-4"/>Save Schedule
            </button>
          </Card>
        </div>
        <BottomNav current="schedule" onNav={onNav}/>
      </div>
    );
  }

  const reminders=alarms.filter(a=>a.alarmType==="reminder"||!a.alarmType);
  const autostarts=alarms.filter(a=>a.alarmType==="autostart");

  return(
    <div className={cn("min-h-screen pb-28",BG)}>
      <div className="max-w-2xl mx-auto p-6 space-y-5">
        <div className="flex items-center justify-between">
          <div><h1 className="text-2xl font-bold tracking-tight">Session Schedule</h1><p className="text-sm text-gray-500">Reminders and scheduled sessions</p></div>
          <button onClick={openNew} className="h-10 px-4 rounded-xl text-white text-sm font-semibold flex items-center gap-1.5" style={{background:C.navy,boxShadow:`0 4px 12px ${C.navy}40`}}>
            <Plus className="w-4 h-4"/>Add
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Card className="p-4" style={{borderColor:`${C.cyan}30`,borderWidth:2}}>
            <Bell className="w-5 h-5 mb-2" style={{color:C.cyan}}/>
            <h3 className="font-bold text-sm mb-1" style={{color:C.cyanDark}}>Reminders</h3>
            <p className="text-[11px] text-gray-500">Get notified before your session. You tap to start manually.</p>
          </Card>
          <Card className="p-4" style={{borderColor:`${C.mint}40`,borderWidth:2}}>
            <Timer className="w-5 h-5 mb-2" style={{color:C.mint}}/>
            <h3 className="font-bold text-sm mb-1" style={{color:C.mintDark}}>Scheduled Sessions</h3>
            <p className="text-[11px] text-gray-500">Session launches automatically — just sit down.</p>
          </Card>
        </div>

        {reminders.length>0&&(
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Reminders</h3>
            <div className="space-y-2">{reminders.map(a=>(<AlarmCard key={a.id} a={a} onEdit={openEdit} onToggle={toggleAlarm} onDelete={deleteAlarm} formatSchedule={formatSchedule} use24={use24}/>))}</div>
          </div>
        )}

        {autostarts.length>0&&(
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Scheduled Sessions</h3>
            <div className="space-y-2">{autostarts.map(a=>(<AlarmCard key={a.id} a={a} onEdit={openEdit} onToggle={toggleAlarm} onDelete={deleteAlarm} formatSchedule={formatSchedule} use24={use24}/>))}</div>
          </div>
        )}

        {alarms.length===0&&(
          <Card className="p-12 text-center">
            <Bell className="w-14 h-14 mx-auto mb-4" style={{color:"#e5e7eb"}}/>
            <h3 className="font-bold text-gray-600 mb-2">No Schedules Yet</h3>
            <p className="text-xs text-gray-400 mb-5">Set reminders or scheduled sessions that launch like an alarm clock.</p>
            <button onClick={openNew} className="h-11 px-6 rounded-xl text-white text-sm font-bold inline-flex items-center gap-2" style={{background:C.navy}}>
              <Plus className="w-4 h-4"/>Add First Schedule
            </button>
          </Card>
        )}
      </div>
      <BottomNav current="schedule" onNav={onNav}/>
    </div>
  );
}

function AlarmCard({a,onEdit,onToggle,onDelete,formatSchedule,use24}){
  const isAutostart=a.alarmType==="autostart";
  const accentColor=isAutostart?C.mint:C.cyan;
  return(
    <Card className="overflow-hidden" style={{borderLeft:`4px solid ${accentColor}`,opacity:a.active?1:0.55}}>
      <div className="p-4 flex items-center gap-3">
        <div className="h-12 w-12 rounded-xl flex items-center justify-center shrink-0" style={{background:`${accentColor}20`}}>
          {isAutostart?<Timer className="w-6 h-6" style={{color:accentColor}}/>:<Bell className="w-6 h-6" style={{color:accentColor}}/>}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-2xl font-black tabular-nums text-gray-900">{fmtAlarmTime(a.time,use24)}</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{background:`${accentColor}20`,color:accentColor}}>{isAutostart?"Scheduled":"Reminder"}</span>
          </div>
          <p className="text-xs text-gray-600 font-medium truncate">{a.label}</p>
          <p className="text-[10px] text-gray-400 mt-0.5">{formatSchedule(a)}{!isAutostart&&a.leadMins?` · ${a.leadMins} min notice`:""}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0 ml-1">
          <Toggle checked={!!a.active} onChange={()=>onToggle(a.id)}/>
          <button onClick={()=>onEdit(a)} className="h-9 w-9 rounded-xl flex items-center justify-center transition-all hover:bg-gray-100" style={{border:"1.5px solid #e5e7eb"}}>
            <Settings className="w-4 h-4 text-gray-500"/>
          </button>
          <button onClick={()=>onDelete(a.id)} className="h-9 w-9 rounded-xl flex items-center justify-center transition-all hover:bg-red-50" style={{border:"1.5px solid #fca5a5"}}>
            <Trash2 className="w-4 h-4 text-red-400"/>
          </button>
        </div>
      </div>
    </Card>
  );
}

// ─── Voiding Diary ────────────────────────────────────────────────────────────
function DiaryScreen({onNav,settings,diaryEntries,onSaveDiary,use24,isTourActive=false,tourStep=null,onTourDayOpen,onTourSymptomLog}){
  const today=new Date();
  const ws=startOfWeek(today);
  const ms=startOfMonth(today);
  const me=endOfMonth(today);
  const daysInMonth=me.getDate();
  const monthEntries=diaryEntries.filter(e=>{
    const d=new Date(e.date);
    return d>=ms&&d<=me;
  });
  const completedDays=diaryEntries.filter(e=>{
    const d=new Date(e.date);
    return e.completed&&d>=ms&&d<=me;
  });
  const calendarDays=eachDay(startOfWeek(ms),endOfWeek(me));
  const [activeDay,setActiveDay]=useState(null);
  const [form,setForm]=useState({urgencyEpisodes:0,leakageEpisodes:0,daytimeVoids:0,nighttimeVoids:0,fecalIncontinenceEpisodes:0,bowelMovements:0});
  const allowDayPick=!isTourActive||tourStep===7;
  const allowSymptomEdit=!isTourActive||tourStep===8;
  const onlyUrgencyControl=isTourActive&&tourStep===8;
  const urinarySelected=Object.entries((settings?.pfdTypes)||{}).some(([k,v])=>v&&["urge","urgency","frequency","hesitancy"].includes(k));
  const fecalSelected=Object.entries((settings?.pfdTypes)||{}).some(([k,v])=>v&&["fecal","constipation"].includes(k));
  const showUrinary=isTourActive||urinarySelected||(!urinarySelected&&!fecalSelected);
  const showFecal=fecalSelected||(!urinarySelected&&!fecalSelected);

  const openDay=(day)=>{
    const existing=monthEntries.find(e=>sameDay(e.date,day));
    setForm(existing?{urgencyEpisodes:existing.urgencyEpisodes,leakageEpisodes:existing.leakageEpisodes||0,daytimeVoids:existing.daytimeVoids||0,nighttimeVoids:existing.nighttimeVoids||0,fecalIncontinenceEpisodes:existing.fecalIncontinenceEpisodes||0,bowelMovements:existing.bowelMovements||0}:{urgencyEpisodes:0,leakageEpisodes:0,daytimeVoids:0,nighttimeVoids:0,fecalIncontinenceEpisodes:0,bowelMovements:0});
    setActiveDay(day);
    onTourDayOpen?.(day);
  };

  const updateAndSave=(field,val)=>{
    const newForm={...form,[field]:Math.max(0,val)};
    setForm(newForm);
    if(activeDay){
      if(isTourActive){
        onTourSymptomLog?.(field,newForm[field]);
        return;
      }
      const existing=diaryEntries.find(e=>sameDay(e.date,activeDay));
      const entry={id:existing?existing.id:Date.now().toString(),weekKey:getWeekKey(activeDay),date:new Date(activeDay),completed:true,...newForm};
      if(existing)onSaveDiary(diaryEntries.map(e=>e.id===existing.id?entry:e));
      else onSaveDiary([...diaryEntries,entry]);
      onTourSymptomLog?.(field,newForm[field]);
    }
  };

  const extrapolated=useMemo(()=>{
    if(completedDays.length<1)return null;
    const avg={
      urgencyEpisodes:completedDays.reduce((s,e)=>s+e.urgencyEpisodes,0)/completedDays.length,
      leakageEpisodes:completedDays.reduce((s,e)=>s+(e.leakageEpisodes||0),0)/completedDays.length,
      daytimeVoids:completedDays.reduce((s,e)=>s+(e.daytimeVoids||0),0)/completedDays.length,
      nighttimeVoids:completedDays.reduce((s,e)=>s+(e.nighttimeVoids||0),0)/completedDays.length,
      fecalIncontinenceEpisodes:completedDays.reduce((s,e)=>s+(e.fecalIncontinenceEpisodes||0),0)/completedDays.length,
      bowelMovements:completedDays.reduce((s,e)=>s+(e.bowelMovements||0),0)/completedDays.length,
    };
    return{
      perMonth:{urgencyEpisodes:avg.urgencyEpisodes*daysInMonth,leakageEpisodes:avg.leakageEpisodes*daysInMonth,daytimeVoids:avg.daytimeVoids*daysInMonth,nighttimeVoids:avg.nighttimeVoids*daysInMonth,fecalIncontinenceEpisodes:avg.fecalIncontinenceEpisodes*daysInMonth,bowelMovements:avg.bowelMovements*daysInMonth},
    };
  },[completedDays,daysInMonth]);

  const trendData=useMemo(()=>{
    return Array.from({length:4},(_,i)=>{
      const wStart=addDays(ws,-(3-i)*7);
      const wEnd=addDays(wStart,6);
      wEnd.setHours(23,59,59,999);
      const entries=diaryEntries.filter(e=>{
        const d=new Date(e.date);
        return e.completed&&d>=wStart&&d<=wEnd;
      });
      if(entries.length>0){
        return{label:i===3?"Now":`-${3-i}w`,leaks:entries.reduce((s,e)=>s+(e.leakageEpisodes||0),0)/entries.length,urgency:entries.reduce((s,e)=>s+e.urgencyEpisodes,0)/entries.length};
      }
      return{label:i===3?"Now":`-${3-i}w`,leaks:null,urgency:null};
    });
  },[diaryEntries,ws]);

  return(
    <div className={cn("min-h-screen pb-28",BG)}>
      <div className="max-w-2xl mx-auto p-6 space-y-5">
        <div><h1 className="text-2xl font-bold tracking-tight">Voiding Diary</h1><p className="text-sm text-gray-500">Track at least 3 days this month — we extrapolate the rest</p></div>

        <Card className={cn("p-6",isTourActive&&tourStep===7&&TOUR_TARGET)} style={{background:"linear-gradient(135deg,#ffffff,#f6fbff)"}}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-sm font-bold">This Month</span>
              <p className="text-[10px] text-gray-400 mt-0.5">Tap a day to log symptoms</p>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full" style={{background:completedDays.length>=3?"#e8faf4":"#e8f9fb",color:completedDays.length>=3?C.mintDark:C.cyanDark}}>{completedDays.length}/3 days logged</span>
          </div>
          <div className="grid grid-cols-7 gap-2 mb-2">
            {weekDaysFull.map(d=><div key={d} className="text-center text-[10px] text-gray-400 font-semibold py-1">{d}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((day,i)=>{
              const inMonth=isSameMonth(day,today);
              const future=isAfterDay(day,today);
              const disabled=!inMonth||future;
              const entry=monthEntries.find(e=>sameDay(e.date,day));
              const hasEntry=!!entry;
              const isToday=sameDay(day,today);
              const isActive=activeDay&&sameDay(day,activeDay);
              return(
                <button key={i} disabled={disabled||!allowDayPick} onClick={()=>!disabled&&allowDayPick&&openDay(day)}
                  className="aspect-square rounded-2xl flex flex-col items-center justify-center text-[11px] transition-all relative border-2 shadow-sm"
                  style={{
                    opacity:!inMonth?0.25:future?0.55:1,
                    cursor:disabled||!allowDayPick?"default":"pointer",
                    borderColor:isActive?C.navy:future?"#d1d5db":hasEntry?C.cyan:isToday?C.cyan:"#e5e7eb",
                    background:isActive?C.navy:future?"#f3f4f6":hasEntry?`linear-gradient(135deg,${C.cyan}22,#ffffff)`:isToday?"linear-gradient(135deg,#e8f9fb,#ffffff)":"white",
                    color:isActive?"white":future?"#9ca3af":hasEntry?C.cyanDark:isToday?C.cyanDark:"#374151",
                  }}>
                  {day.getDate()}
                  {entry&&!isActive&&!future&&<div className="absolute bottom-1 h-1.5 w-1.5 rounded-full" style={{background:C.cyan}}/>}
                </button>
              );
            })}
          </div>
          {!activeDay&&<p className="text-xs text-gray-400 text-center mt-3">Only today and past dates can be logged</p>}
        </Card>

        {activeDay&&(
          <Card className="p-5" style={{borderWidth:2,borderColor:C.cyan}}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-sm">{fmt(activeDay,{weekday:"long",month:"long",day:"numeric"})}</h3>
                <p className="text-[10px] text-gray-400 mt-0.5 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" style={{color:C.mint}}/> Saves automatically</p>
              </div>
              <button onClick={()=>setActiveDay(null)} disabled={!allowSymptomEdit||onlyUrgencyControl} className="h-8 w-8 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 disabled:opacity-40">
                <X className="w-4 h-4 text-gray-500"/>
              </button>
            </div>

            {showUrinary&&(
              <>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-xl flex items-center justify-center shrink-0" style={{background:"#e8f9fb"}}>
                    <UrgencyIcon className="w-5 h-5" style={{color:C.cyanDark}}/>
                  </div>
                    <div>
                      <div className="font-semibold text-sm">Urgency Episodes</div>
                      <div className="text-[10px] text-gray-400">Strong urge, no leak</div>
                    </div>
                  </div>
                  <div className={cn("flex items-center gap-2",isTourActive&&tourStep===8&&cn(TOUR_NUMERIC_PANEL,"px-3 py-2"))}>
                    <button disabled={!allowSymptomEdit} onClick={()=>updateAndSave("urgencyEpisodes",form.urgencyEpisodes-1)} className="h-9 w-9 rounded-xl flex items-center justify-center active:scale-90 font-bold text-lg disabled:opacity-40" style={{background:"#e8f9fb",color:C.cyanDark}}>−</button>
                    <span className="text-2xl font-black w-8 text-center tabular-nums" style={{color:C.cyanDark}}>{form.urgencyEpisodes}</span>
                    <button disabled={!allowSymptomEdit} onClick={()=>updateAndSave("urgencyEpisodes",form.urgencyEpisodes+1)} className="h-9 w-9 rounded-xl flex items-center justify-center active:scale-90 font-bold text-lg disabled:opacity-40" style={{background:"#e8f9fb",color:C.cyanDark}}>+</button>
                  </div>
                </div>

                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-xl flex items-center justify-center shrink-0" style={{background:"#e8f9fb"}}>
                      <CupIcon className="w-5 h-5" style={{color:C.cyanDark}}/>
                    </div>
                    <div>
                      <div className="font-semibold text-sm">Leakage Episodes</div>
                      <div className="text-[10px] text-gray-400">Any unintended leakage</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button disabled={!allowSymptomEdit||onlyUrgencyControl} onClick={()=>updateAndSave("leakageEpisodes",form.leakageEpisodes-1)} className="h-9 w-9 rounded-xl flex items-center justify-center active:scale-90 font-bold text-lg disabled:opacity-40" style={{background:"#e8f9fb",color:C.cyanDark}}>−</button>
                    <span className="text-2xl font-black w-8 text-center tabular-nums" style={{color:C.cyanDark}}>{form.leakageEpisodes}</span>
                    <button disabled={!allowSymptomEdit||onlyUrgencyControl} onClick={()=>updateAndSave("leakageEpisodes",form.leakageEpisodes+1)} className="h-9 w-9 rounded-xl flex items-center justify-center active:scale-90 font-bold text-lg disabled:opacity-40" style={{background:"#e8f9fb",color:C.cyanDark}}>+</button>
                  </div>
                </div>

                <div className="flex items-center justify-between py-3 border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-xl flex items-center justify-center shrink-0" style={{background:"#e8f9fb"}}>
                      <Clock className="w-5 h-5" style={{color:C.cyanDark}}/>
                    </div>
                    <div>
                      <div className="font-semibold text-sm">Daytime Voids</div>
                      <div className="text-[10px] text-gray-400"># of times urinating during daytime</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button disabled={!allowSymptomEdit||onlyUrgencyControl} onClick={()=>updateAndSave("daytimeVoids",form.daytimeVoids-1)} className="h-9 w-9 rounded-xl flex items-center justify-center active:scale-90 font-bold text-lg disabled:opacity-40" style={{background:"#e8f9fb",color:C.cyanDark}}>−</button>
                    <span className="text-2xl font-black w-8 text-center tabular-nums" style={{color:C.cyanDark}}>{form.daytimeVoids}</span>
                    <button disabled={!allowSymptomEdit||onlyUrgencyControl} onClick={()=>updateAndSave("daytimeVoids",form.daytimeVoids+1)} className="h-9 w-9 rounded-xl flex items-center justify-center active:scale-90 font-bold text-lg disabled:opacity-40" style={{background:"#e8f9fb",color:C.cyanDark}}>+</button>
                  </div>
                </div>

                <div className="flex items-center justify-between py-3 border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-xl flex items-center justify-center shrink-0" style={{background:"#e8f9fb"}}>
                      <Clock className="w-5 h-5" style={{color:C.cyanDark}}/>
                    </div>
                    <div>
                      <div className="font-semibold text-sm">Nighttime Voids</div>
                      <div className="text-[10px] text-gray-400"># of times urinating from bedtime to wake time</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button disabled={!allowSymptomEdit||onlyUrgencyControl} onClick={()=>updateAndSave("nighttimeVoids",form.nighttimeVoids-1)} className="h-9 w-9 rounded-xl flex items-center justify-center active:scale-90 font-bold text-lg disabled:opacity-40" style={{background:"#e8f9fb",color:C.cyanDark}}>−</button>
                    <span className="text-2xl font-black w-8 text-center tabular-nums" style={{color:C.cyanDark}}>{form.nighttimeVoids}</span>
                    <button disabled={!allowSymptomEdit||onlyUrgencyControl} onClick={()=>updateAndSave("nighttimeVoids",form.nighttimeVoids+1)} className="h-9 w-9 rounded-xl flex items-center justify-center active:scale-90 font-bold text-lg disabled:opacity-40" style={{background:"#e8f9fb",color:C.cyanDark}}>+</button>
                  </div>
                </div>
              </>
            )}

            {showFecal&&(
              <>
                <div className="flex items-center justify-between py-3 border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-xl flex items-center justify-center shrink-0" style={{background:"#e8f9fb"}}>
                      <FecalIcon className="w-5 h-5" style={{color:C.cyanDark}}/>
                    </div>
                    <div>
                      <div className="font-semibold text-sm">Fecal Incontinence Episodes</div>
                      <div className="text-[10px] text-gray-400">Any unintended bowel leakage</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button disabled={!allowSymptomEdit||onlyUrgencyControl} onClick={()=>updateAndSave("fecalIncontinenceEpisodes",form.fecalIncontinenceEpisodes-1)} className="h-9 w-9 rounded-xl flex items-center justify-center active:scale-90 font-bold text-lg disabled:opacity-40" style={{background:"#e8f9fb",color:C.cyanDark}}>−</button>
                    <span className="text-2xl font-black w-8 text-center tabular-nums" style={{color:C.cyanDark}}>{form.fecalIncontinenceEpisodes}</span>
                    <button disabled={!allowSymptomEdit||onlyUrgencyControl} onClick={()=>updateAndSave("fecalIncontinenceEpisodes",form.fecalIncontinenceEpisodes+1)} className="h-9 w-9 rounded-xl flex items-center justify-center active:scale-90 font-bold text-lg disabled:opacity-40" style={{background:"#e8f9fb",color:C.cyanDark}}>+</button>
                  </div>
                </div>

                <div className="flex items-center justify-between py-3 border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-xl flex items-center justify-center shrink-0" style={{background:"#e8f9fb"}}>
                      <ConstipationIcon className="w-5 h-5" style={{color:C.cyanDark}}/>
                    </div>
                    <div>
                      <div className="font-semibold text-sm">Bowel Movements</div>
                      <div className="text-[10px] text-gray-400"># of bowel movements today</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button disabled={!allowSymptomEdit||onlyUrgencyControl} onClick={()=>updateAndSave("bowelMovements",form.bowelMovements-1)} className="h-9 w-9 rounded-xl flex items-center justify-center active:scale-90 font-bold text-lg disabled:opacity-40" style={{background:"#e8f9fb",color:C.cyanDark}}>−</button>
                    <span className="text-2xl font-black w-8 text-center tabular-nums" style={{color:C.cyanDark}}>{form.bowelMovements}</span>
                    <button disabled={!allowSymptomEdit||onlyUrgencyControl} onClick={()=>updateAndSave("bowelMovements",form.bowelMovements+1)} className="h-9 w-9 rounded-xl flex items-center justify-center active:scale-90 font-bold text-lg disabled:opacity-40" style={{background:"#e8f9fb",color:C.cyanDark}}>+</button>
                  </div>
                </div>
              </>
            )}
          </Card>
        )}

        {extrapolated&&(
          <Card className="p-5" style={{background:"linear-gradient(135deg, #e8f9fb, #e8faf4)",borderColor:`${C.cyan}30`,borderWidth:2}}>
            <div className="flex items-center gap-2 mb-3"><Sparkles className="w-4 h-4" style={{color:C.cyan}}/><span className="font-bold text-sm">Monthly Estimate</span><span className="text-[10px] text-gray-400 ml-auto">From {completedDays.length} day{completedDays.length>1?"s":""}</span></div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-xl p-3 text-center shadow-sm">
                <div className="text-2xl font-black" style={{color:C.cyan}}>{extrapolated.perMonth.urgencyEpisodes.toFixed(1)}</div>
                <div className="text-[10px] text-gray-500 mt-0.5">Urgency episodes/mo</div>
              </div>
              <div className="bg-white rounded-xl p-3 text-center shadow-sm">
                <div className="text-2xl font-black" style={{color:C.cyan}}>{extrapolated.perMonth.leakageEpisodes.toFixed(1)}</div>
                <div className="text-[10px] text-gray-500 mt-0.5">Leakage episodes/mo</div>
              </div>
              <div className="bg-white rounded-xl p-3 text-center shadow-sm">
                <div className="text-2xl font-black" style={{color:C.cyan}}>{extrapolated.perMonth.daytimeVoids.toFixed(1)}</div>
                <div className="text-[10px] text-gray-500 mt-0.5">Daytime voids/mo</div>
              </div>
              <div className="bg-white rounded-xl p-3 text-center shadow-sm">
                <div className="text-2xl font-black" style={{color:C.cyan}}>{extrapolated.perMonth.nighttimeVoids.toFixed(1)}</div>
                <div className="text-[10px] text-gray-500 mt-0.5">Nighttime voids/mo</div>
              </div>
              {showFecal&&(
                <>
                  <div className="bg-white rounded-xl p-3 text-center shadow-sm">
                    <div className="text-2xl font-black" style={{color:C.cyan}}>{extrapolated.perMonth.fecalIncontinenceEpisodes.toFixed(1)}</div>
                    <div className="text-[10px] text-gray-500 mt-0.5">Fecal incontinence/mo</div>
                  </div>
                  <div className="bg-white rounded-xl p-3 text-center shadow-sm">
                    <div className="text-2xl font-black" style={{color:C.cyan}}>{extrapolated.perMonth.bowelMovements.toFixed(1)}</div>
                    <div className="text-[10px] text-gray-500 mt-0.5">Bowel movements/mo</div>
                  </div>
                </>
              )}
            </div>
          </Card>
        )}

        {trendData.some(w=>w.leaks!==null)&&(
          <Card className="p-5">
            <div className="flex items-center gap-2 mb-4"><BarChart2 className="w-4 h-4" style={{color:C.navy}}/><span className="font-bold text-sm">4-Week Trend</span></div>
            <div className="flex items-end gap-3 h-20">
              {trendData.map((w,i)=>{
                const maxL=Math.max(...trendData.filter(x=>x.leaks!==null).map(x=>x.leaks),1);
                const maxU=Math.max(...trendData.filter(x=>x.urgency!==null).map(x=>x.urgency),1);
                return(
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full flex gap-0.5 items-end h-14">
                      {w.leaks!==null&&<div className="flex-1 rounded-t min-h-[2px]" style={{height:`${(w.leaks/maxL)*100}%`,background:C.navy}}/>}
                      {w.urgency!==null&&<div className="flex-1 rounded-t min-h-[2px]" style={{height:`${(w.urgency/maxU)*100}%`,background:C.cyan}}/>}
                      {w.leaks===null&&<div className="flex-1 rounded-t bg-gray-100" style={{height:12}}/>}
                    </div>
                    <span className="text-[9px] text-gray-400">{w.label}</span>
                  </div>
                );
              })}
            </div>
            <div className="flex gap-4 mt-2">
              <div className="flex items-center gap-1.5"><div className="h-2 w-3 rounded-sm" style={{background:C.navy}}/><span className="text-[9px] text-gray-500">Leakage</span></div>
              <div className="flex items-center gap-1.5"><div className="h-2 w-3 rounded-sm" style={{background:C.cyan}}/><span className="text-[9px] text-gray-500">Urgency</span></div>
            </div>
          </Card>
        )}

      </div>
      <BottomNav current="diary" onNav={onNav}/>
    </div>
  );
}

// ─── Welcome / Home ───────────────────────────────────────────────────────────
function WelcomeScreen({onStartSession,onResumeSession,pausedSession,onNav,sessions,diaryEntries,onOpenCalendar,use24,isTourActive=false,tourStep=null}){
  const [selectedDate,setSelectedDate]=useState(new Date());
  const [weekOffset,setWeekOffset]=useState(0);
  const today=new Date();
  const weekCenter=addDays(today,weekOffset*7);
  const weekDays=Array.from({length:7},(_,i)=>addDays(weekCenter,i-3));
  const todaySessions=sessions.filter(s=>sameDay(s.timestamp,selectedDate));
  const hasCompleteSession=todaySessions.some(s=>s.complete);
  const hasSession=todaySessions.length>0;
  const isPausedToday=pausedSession&&sameDay(new Date(),selectedDate);
  const forceTourStart=isTourActive&&tourStep===1;

  const sessionStats=useMemo(()=>{
    const ws=startOfWeek(today),we=endOfWeek(today),ms=startOfMonth(today),me=endOfMonth(today);
    const wSes=sessions.filter(s=>new Date(s.timestamp)>=ws&&new Date(s.timestamp)<=we).length;
    const mSes=sessions.filter(s=>new Date(s.timestamp)>=ms&&new Date(s.timestamp)<=me).length;
    const weeks=Array.from({length:4},(_,i)=>{
      const wStart=addDays(ws,-i*7);const wEnd=new Date(wStart);wEnd.setDate(wEnd.getDate()+6);wEnd.setHours(23,59,59,999);
      return sessions.filter(s=>new Date(s.timestamp)>=wStart&&new Date(s.timestamp)<=wEnd).length;
    }).reverse();
    return{wSes,mSes,weeks};
  },[sessions,today]);

  const thisMonthDiary=useMemo(()=>{
    const ms=startOfMonth(today);
    const me=endOfMonth(today);
    const entries=diaryEntries.filter(e=>{
      const d=new Date(e.date);
      return e.completed&&d>=ms&&d<=me;
    });
    if(entries.length===0)return null;
    return{leaksPerDay:(entries.reduce((s,e)=>s+(e.leakageEpisodes||0),0)/entries.length).toFixed(1),urgencyPerDay:(entries.reduce((s,e)=>s+e.urgencyEpisodes,0)/entries.length).toFixed(1),daysLogged:entries.length};
  },[diaryEntries,today]);

  return(
    <div className={cn("min-h-screen pb-28",BG)}>
      <div className="flex items-center justify-between px-6 pt-6 pb-3">
        <div className="flex items-center gap-2.5">
          <PelviStimLogo size={38}/>
          <span className="text-base font-black tracking-tight" style={{color:C.navy}}>PelviStim</span>
        </div>
        <h1 className="text-base font-bold text-gray-800">{fmt(selectedDate,{month:"long",day:"numeric"})}</h1>
        <button disabled={isTourActive} onClick={onOpenCalendar} className="h-10 w-10 flex items-center justify-center rounded-xl bg-white/70 hover:bg-white transition-colors disabled:opacity-40">
          <Calendar className="w-5 h-5" style={{color:C.navy}}/>
        </button>
      </div>

      <div className="px-6 pb-4">
        <div className="flex items-center gap-2">
          <button disabled={isTourActive} onClick={()=>setWeekOffset(weekOffset-1)} className="h-8 w-8 shrink-0 rounded-xl bg-white/70 flex items-center justify-center hover:bg-white disabled:opacity-40"><ChevronLeft className="w-4 h-4 text-gray-600"/></button>
          <div className="grid grid-cols-7 gap-1 flex-1">
            {weekDays.map((day,i)=>{
              const sel=sameDay(day,selectedDate);const future=isAfterDay(day,today);const hasSes=sessions.some(s=>sameDay(s.timestamp,day));const isToday2=sameDay(day,today);
              return(<button key={i} disabled={future||isTourActive} onClick={()=>!future&&!isTourActive&&setSelectedDate(day)} className={cn("flex flex-col items-center py-1 transition-all",(future||isTourActive)&&"opacity-30")}>
                <span className="text-[10px] text-gray-400 mb-1">{weekDayLetters[new Date(day).getDay()]}</span>
                <div className="h-9 w-9 rounded-xl flex items-center justify-center text-sm font-bold relative transition-all duration-200" style={{background:sel?C.navy:isToday2?"#e8f9fb":"transparent",color:sel?"white":isToday2?C.cyanDark:"#374151",boxShadow:sel?`0 4px 12px ${C.navy}40`:"none",transform:sel?"scale(1.1)":"scale(1)"}}>
                  {new Date(day).getDate()}{hasSes&&!sel&&<div className="absolute bottom-0.5 h-1.5 w-1.5 rounded-full" style={{background:C.mint}}/>}
                </div>
              </button>);
            })}
          </div>
          <button onClick={()=>setWeekOffset(weekOffset+1)} disabled={weekOffset>=0||isTourActive} className="h-8 w-8 shrink-0 rounded-xl bg-white/70 flex items-center justify-center hover:bg-white disabled:opacity-30"><ChevronRight className="w-4 h-4 text-gray-600"/></button>
        </div>
      </div>

      <div className="px-6 pb-5">
        {forceTourStart?(
          <Card className={cn("p-6 text-center",isTourActive&&tourStep===1&&TOUR_TARGET)} style={{background:`linear-gradient(135deg, #e8f9fb, #e8ecff)`,borderColor:`${C.cyan}40`,borderWidth:2}}>
            <h2 className="text-2xl font-black mb-5" style={{color:C.navy}}>Tap Start Session</h2>
            <button onClick={onStartSession} className="h-12 px-8 rounded-2xl text-white font-bold text-base inline-flex items-center gap-2" style={{background:`linear-gradient(135deg,${C.cyan},${C.navy})`,boxShadow:`0 6px 20px ${C.navy}50`}}>
              <Activity className="w-5 h-5"/>Start Session
            </button>
          </Card>
        ):isPausedToday?(
          <Card className="p-6 text-center" style={{background:"linear-gradient(135deg, #fff7ed, #fef9f0)",borderColor:C.peachDark,borderWidth:2}}>
            <h2 className="text-2xl font-black mb-5" style={{color:C.peachDark}}>Session Paused</h2>
            <button onClick={onResumeSession} className="h-12 px-8 rounded-2xl text-white font-bold text-base inline-flex items-center gap-2" style={{background:C.peachDark,boxShadow:`0 4px 14px ${C.peachDark}50`}}><Play className="w-5 h-5"/>Resume Session</button>
          </Card>
        ):!hasSession?(
          <Card className="p-6 text-center" style={{background:`linear-gradient(135deg, #e8f9fb, #e8ecff)`,borderColor:`${C.cyan}40`,borderWidth:2}}>
            <h2 className="text-2xl font-black mb-5" style={{color:C.navy}}>{sameDay(selectedDate,today)?"Ready for your session":"No session logged"}</h2>
            {sameDay(selectedDate,today)&&(
              <button onClick={onStartSession} className="h-12 px-8 rounded-2xl text-white font-bold text-base inline-flex items-center gap-2" style={{background:`linear-gradient(135deg,${C.cyan},${C.navy})`,boxShadow:`0 6px 20px ${C.navy}50`}}>
                <Activity className="w-5 h-5"/>Start Session
              </button>
            )}
          </Card>
        ):hasCompleteSession?(
          <Card className="p-6 text-center" style={{background:"linear-gradient(135deg, #e8faf4, #f0fbf8)",borderColor:`${C.mint}40`,borderWidth:2}}>
            <h2 className="text-2xl font-black mb-5" style={{color:C.mintDark}}>Session Complete!</h2>
            {sameDay(selectedDate,today)&&(
              <button onClick={onStartSession} className="h-12 px-8 rounded-2xl text-white font-bold text-base inline-flex items-center gap-2" style={{background:`linear-gradient(135deg,${C.mint},${C.mintDark})`,boxShadow:`0 6px 20px ${C.mint}50`}}>
                <CheckCircle2 className="w-5 h-5"/>Start New Session
              </button>
            )}
          </Card>
        ):(
          <Card className="p-6 text-center" style={{background:"linear-gradient(135deg, #fff7ed, #fef9f0)",borderColor:`${C.peachDark}40`,borderWidth:2}}>
            <h2 className="text-2xl font-black mb-5" style={{color:C.peachDark}}>Session Ended Early</h2>
            {sameDay(selectedDate,today)&&(
              <button onClick={onStartSession} className="h-12 px-8 rounded-2xl text-white font-bold text-base inline-flex items-center gap-2" style={{background:`linear-gradient(135deg,${C.peachDark},${C.navy})`,boxShadow:`0 6px 20px ${C.navy}40`}}>
                <Activity className="w-5 h-5"/>Start New Session
              </button>
            )}
          </Card>
        )}
      </div>

      <div className="px-6 pb-5">
        <h3 className="text-base font-black mb-3" style={{color:C.navy}}>Insights</h3>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <Card className="p-5 text-center" style={{borderTop:`4px solid ${C.cyan}`,boxShadow:`0 4px 16px ${C.cyan}20`}}>
            <div className="text-xs font-bold uppercase tracking-wider mb-2" style={{color:C.cyan}}>This Week</div>
            <div className="text-5xl font-black mb-1" style={{color:C.navy}}>{sessionStats.wSes}</div>
            <div className="text-xs font-semibold text-gray-400">sessions</div>
          </Card>
          <Card className="p-5 text-center" style={{borderTop:`4px solid ${C.mint}`,boxShadow:`0 4px 16px ${C.mint}20`}}>
            <div className="text-xs font-bold uppercase tracking-wider mb-2" style={{color:C.mint}}>This Month</div>
            <div className="text-5xl font-black mb-1" style={{color:C.navy}}>{sessionStats.mSes}</div>
            <div className="text-xs font-semibold text-gray-400">sessions</div>
          </Card>
        </div>

        <Card className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <BarChart2 className="w-4 h-4" style={{color:C.navy}}/>
            <span className="text-xs font-bold text-gray-600">Sessions / Week</span>
          </div>
          <div className="flex items-end gap-2 h-12">
            {sessionStats.weeks.map((count,i)=>{
              const max=Math.max(...sessionStats.weeks,1);
              return(
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full rounded-t transition-all" style={{height:`${(count/max)*100}%`,minHeight:count>0?4:0,background:i===3?C.cyan:`${C.navy}60`}}/>
                  <span className="text-[8px] text-gray-400">{i===3?"Now":`-${3-i}w`}</span>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {thisMonthDiary&&(
        <div className="px-6 pb-5">
          <Card className="p-4" style={{borderLeft:`4px solid ${C.mint}`}}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <ClipboardList className="w-4 h-4" style={{color:C.mint}}/>
                <span className="text-xs font-bold text-gray-600">Diary — {thisMonthDiary.daysLogged} day{thisMonthDiary.daysLogged>1?"s":""} this month</span>
              </div>
              <button onClick={()=>onNav("diary")} className="text-[10px] font-bold hover:underline" style={{color:C.cyan}}>View →</button>
            </div>
            <div className="flex gap-5 text-xs text-gray-500">
              <span><span className="font-black" style={{color:C.navy}}>{thisMonthDiary.leaksPerDay}</span> leakage/day</span>
              <span><span className="font-black" style={{color:C.cyan}}>{thisMonthDiary.urgencyPerDay}</span> urgency/day</span>
            </div>
          </Card>
        </div>
      )}
      <BottomNav current="today" onNav={onNav}/>
    </div>
  );
}

// ─── Unified Calendar ─────────────────────────────────────────────────────────
function UnifiedCalendar({onBack,onNav,sessions,diaryEntries,use24}){
  const [calMonth,setCalMonth]=useState(new Date());
  const [calSelected,setCalSelected]=useState(null);
  const today=new Date();
  const calDays=useMemo(()=>{const ms=startOfMonth(calMonth),me=endOfMonth(calMonth);return eachDay(startOfWeek(ms),endOfWeek(me));},[calMonth]);
  const selSession=calSelected?sessions.filter(s=>sameDay(s.timestamp,calSelected)).length:0;
  const selDiary=calSelected?diaryEntries.find(e=>sameDay(e.date,calSelected)):null;
  const monthSessions=sessions.filter(s=>isSameMonth(s.timestamp,calMonth)).length;
  const getHeatmapColor=(day)=>{
    const d=diaryEntries.find(e=>sameDay(e.date,day));
    if(!d)return"#f3f4f6";
    const leaks=d.leakageEpisodes||0;
    if(leaks===0)return"#e8faf4";
    if(leaks<=2)return"#bfedff";
    if(leaks<=4)return"#fde68a";
    return"#fca5a5";
  };
  return(
    <div className={cn("min-h-screen pb-28",BG)}>
      <div className="flex items-center justify-between px-6 pt-6 pb-3">
        <button onClick={onBack} className="h-10 w-10 rounded-xl bg-white/70 flex items-center justify-center"><ChevronLeft className="w-5 h-5 text-gray-600"/></button>
        <h1 className="text-lg font-black" style={{color:C.navy}}>Calendar & Progress</h1>
        <div className="w-10"/>
      </div>
      {calSelected&&(<div className="px-6 pb-4"><Card className="p-4">
        <h3 className="text-sm font-bold mb-3">{fmt(calSelected,{weekday:"long",month:"long",day:"numeric",year:"numeric"})}</h3>
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="flex flex-col items-center p-3 rounded-xl" style={{background:`${C.mint}15`}}><Activity className="w-4 h-4 mb-0.5" style={{color:C.mint}}/><div className="text-lg font-black" style={{color:C.navy}}>{selSession}</div><span className="text-[9px] font-semibold" style={{color:C.mintDark}}>Sessions</span></div>
          <div className="flex flex-col items-center p-3 rounded-xl" style={{background:`${C.cyan}15`}}><ClipboardList className="w-4 h-4 mb-0.5" style={{color:C.cyan}}/><div className="text-lg font-black" style={{color:C.navy}}>{selDiary?"Logged":"—"}</div><span className="text-[9px] font-semibold" style={{color:C.cyanDark}}>Diary</span></div>
        </div>
        {selDiary&&<div className="flex gap-4 text-xs text-gray-600 bg-gray-50 rounded-xl p-3">
          <span className="flex items-center gap-1"><UrgencyIcon className="w-3.5 h-3.5" style={{color:C.cyan}}/>{selDiary.urgencyEpisodes} urgency</span>
          <span className="flex items-center gap-1"><CupIcon className="w-3.5 h-3.5" style={{color:C.navy}}/>{selDiary.leakageEpisodes||0} leakage</span>
        </div>}
        {selSession===0&&!selDiary&&<p className="text-center text-xs text-gray-400 py-2">No activity</p>}
      </Card></div>)}
      <div className="px-6 pb-4"><Card className="p-5">
        <div className="flex items-center justify-between mb-4">
          <button className="h-8 w-8 rounded-xl border-2 border-gray-200 flex items-center justify-center" onClick={()=>{const d=new Date(calMonth);d.setMonth(d.getMonth()-1);setCalMonth(d);}}><ChevronLeft className="w-4 h-4 text-gray-600"/></button>
          <div className="text-center"><h2 className="text-base font-black">{fmt(calMonth,{month:"long",year:"numeric"})}</h2><p className="text-[10px] text-gray-400">{monthSessions} sessions this month</p></div>
          <button className="h-8 w-8 rounded-xl border-2 border-gray-200 flex items-center justify-center" onClick={()=>{const d=new Date(calMonth);d.setMonth(d.getMonth()+1);setCalMonth(d);}}><ChevronRight className="w-4 h-4 text-gray-600"/></button>
        </div>
        <div className="grid grid-cols-7 gap-1 mb-1">{weekDaysFull.map(d=><div key={d} className="text-center text-[9px] text-gray-400 font-semibold py-1">{d}</div>)}</div>
        <div className="grid grid-cols-7 gap-1">{calDays.map((day,i)=>{const cur=isSameMonth(day,calMonth);const td=sameDay(day,today);const sel=calSelected&&sameDay(day,calSelected);const hasSes=sessions.some(s=>sameDay(s.timestamp,day));return(<button key={i} disabled={!cur} onClick={()=>setCalSelected(day)} className="aspect-square rounded-lg flex flex-col items-center justify-center text-[10px] transition-all relative" style={{opacity:cur?1:0.2,background:sel?C.navy:getHeatmapColor(day),outline:td?`2px solid ${C.cyan}`:"none",outlineOffset:1,fontWeight:td?"800":"600",color:sel?"white":"#374151",cursor:cur?"pointer":"default"}}>{cur&&new Date(day).getDate()}{cur&&hasSes&&<div className="absolute top-0.5 right-0.5 text-[8px] font-black" style={{color:sel?"#7dcfb6":C.mint}}>✓</div>}</button>);})}</div>
        <div className="flex items-center justify-center gap-3 pt-3 border-t mt-3 flex-wrap text-[8px] text-gray-400">
          {[["#f3f4f6","No data"],["#e8faf4","0 leaks"],["#bfedff","1-2"],["#fde68a","3-4"],["#fca5a5","5+"]].map(([bg,l])=>(<div key={l} className="flex items-center gap-0.5"><div className="h-2.5 w-2.5 rounded border border-gray-200" style={{background:bg}}/><span>{l}</span></div>))}
        </div>
      </Card></div>
      <div className="px-6 pb-6"><h3 className="text-base font-black mb-3" style={{color:C.navy}}>Recent Sessions</h3>
        {sessions.length===0?<Card className="p-5 text-center"><p className="text-sm text-gray-400">No sessions yet</p></Card>:(
          <Card className="p-4"><div className="space-y-2">{[...sessions].sort((a,b)=>b.timestamp-a.timestamp).slice(0,6).map((s,i)=>(<div key={i} className="flex items-center justify-between p-2.5 rounded-xl border hover:bg-gray-50 transition-colors"><div className="flex items-center gap-3"><div className="h-2 w-2 rounded-full" style={{background:C.mint}}/><div><div className="text-sm font-semibold">{fmt(s.timestamp,{weekday:"short",month:"short",day:"numeric"})}</div><div className="text-[10px] text-gray-400">{fmtTimeDisplay(s.timestamp,use24)}</div></div></div><span className="text-xs text-gray-400">30 min</span></div>))}</div></Card>
        )}
      </div>
      <BottomNav current="today" onNav={onNav}/>
    </div>
  );
}

// ─── Pre-Check ────────────────────────────────────────────────────────────────
// onViewDeviceSetup and onViewCalibrationGuide now route to session-context guide screens
function PreCheckScreen({onComplete,onBack,onViewDeviceSetup,onViewCalibrationGuide,onNav,isTourActive=false,tourStep=null,onTourIntensityChange,onTourCheckboxChange,onTourContinue}){
  const [intensity,setIntensity]=useState(1.0);
  const [electrode,setElectrode]=useState(false);
  const [spread,setSpread]=useState(false);
  const canContinue=electrode&&spread;
  const allowIntensity=!isTourActive||tourStep===2;
  const allowChecks=!isTourActive||tourStep===3||tourStep===4;
  const allowContinue=!isTourActive||tourStep===4;
  const allowBack=!isTourActive;
  const allowGuideButtons=!isTourActive;
  const setIntensityWithTour=(v)=>{
    setIntensity(v);
    onTourIntensityChange?.(v);
  };
  const toggleElectrode=()=>{
    const next=!electrode;
    setElectrode(next);
    onTourCheckboxChange?.("electrode",next);
  };
  const toggleSpread=()=>{
    const next=!spread;
    setSpread(next);
    onTourCheckboxChange?.("spread",next);
  };
  const handleContinue=()=>{
    if(isTourActive&&onTourContinue){
      const handled=onTourContinue({intensity,electrode,spread,canContinue});
      if(handled) return;
    }
    onComplete(intensity);
  };
  return(
    <div className={cn("min-h-screen pb-28",BG)}>
      <div className="flex items-center justify-center min-h-[calc(100vh-5rem)] p-5">
        <Card className="w-full max-w-lg p-7"><div className="space-y-6">
          <div className="text-center"><h2 className="text-2xl font-black mb-2" style={{color:C.navy}}>Pre-Stimulation Calibration</h2><p className="text-gray-500 text-sm">Increase intensity and confirm sensations in order</p></div>

          {/* Two guide buttons side by side */}
          <div className="grid grid-cols-2 gap-3">
            <button disabled={!allowGuideButtons} onClick={onViewDeviceSetup} className="h-11 rounded-xl border-2 border-gray-200 bg-white text-xs font-semibold text-gray-600 flex items-center justify-center gap-1.5 hover:bg-gray-50 transition-all disabled:opacity-40">
              <BookOpen className="w-4 h-4 shrink-0" style={{color:C.navy}}/>Device Setup
            </button>
            <button disabled={!allowGuideButtons} onClick={onViewCalibrationGuide} className="h-11 rounded-xl border-2 border-gray-200 bg-white text-xs font-semibold text-gray-600 flex items-center justify-center gap-1.5 hover:bg-gray-50 transition-all disabled:opacity-40">
              <Info className="w-4 h-4 shrink-0" style={{color:C.cyan}}/>Calibration Guide
            </button>
          </div>

          <div className={cn("flex flex-col items-center py-4",isTourActive&&tourStep===2&&cn(TOUR_TARGET,"rounded-2xl bg-white"))}>
            {isTourActive&&tourStep===2&&<p className="text-xs font-bold text-cyan-800 mb-2">Step 1: Use + or − to change intensity</p>}
            <span className="text-sm font-semibold text-gray-500 mb-4">Stimulation Intensity (0-10)</span>
            <div className={cn(isTourActive&&tourStep===2&&cn(TOUR_NUMERIC_PANEL,"px-5 py-4"))}>
              <IntensityStepper value={intensity} onChange={setIntensityWithTour} large disabled={!allowIntensity}/>
            </div>
          </div>
          {intensity>=10&&<div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700 flex gap-2"><AlertCircle className="w-4 h-4 mt-0.5 shrink-0"/>Reposition the band higher or lower if no sensation at max intensity.</div>}
          <div className={cn("space-y-2",isTourActive&&tourStep===3&&cn(TOUR_TARGET,"rounded-2xl p-2 bg-white"))}>
            {isTourActive&&tourStep===3&&<p className="text-xs font-bold text-cyan-800 mb-1">Step 2: Check both sensation boxes</p>}
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Confirm sensations</p>
            {[
              {state:electrode,set:toggleElectrode,label:"Tingling at electrode site",sub:"First sensation where the electrode touches the skin",num:1,prev:true},
              {state:spread,set:toggleSpread,label:"Tingling migrates to heel and/or toes",sub:"Heel-only is okay. You may also feel tingling along the arch into the toes; at higher intensity, toes may curl",num:2,prev:electrode},
            ].map(({state,set,label,sub,num,prev})=>(
              <button key={num} disabled={!prev||!allowChecks} onClick={()=>prev&&allowChecks&&set(!state)} className="flex items-center gap-3 w-full p-4 rounded-xl border-2 text-left transition-all" style={{opacity:!prev||!allowChecks?0.4:1,cursor:!prev||!allowChecks?"not-allowed":"pointer",borderColor:state?C.mint:"#e5e7eb",background:state?"#e8faf4":"white"}}>
                <Checkbox checked={state} onChange={prev?set:()=>{}}/>
                <div>
                  <div className="font-semibold text-sm flex items-center gap-2">
                    <span className="h-5 w-5 rounded-full text-[10px] flex items-center justify-center font-black shrink-0" style={{background:state?"#e8faf4":prev?"#e8f9fb":"#f3f4f6",color:state?C.mintDark:prev?C.cyanDark:"#9ca3af"}}>{num}</span>
                    {label}
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
                </div>
              </button>
            ))}
          </div>
          {canContinue&&<div className="flex items-center gap-2 p-3 rounded-xl text-sm" style={{background:"#e8faf4",border:`1px solid ${C.mint}40`,color:C.mintDark}}><CheckCircle2 className="w-4 h-4 shrink-0"/>Calibration confirmed. Ready to start.</div>}
          <div className={cn("pt-2",isTourActive&&tourStep===4&&cn(TOUR_TARGET,"rounded-2xl p-2 bg-white"))}>
            {isTourActive&&tourStep===4&&<p className="text-xs font-bold text-cyan-800 mb-2">Step 3: Tap Continue</p>}
            <div className="flex gap-3">
              <button disabled={!allowBack} onClick={onBack} className="flex-1 h-11 rounded-2xl border-2 border-gray-200 bg-white text-sm font-bold text-gray-600 flex items-center justify-center gap-2 hover:bg-gray-50 disabled:opacity-40"><ArrowLeft className="w-4 h-4"/>Back</button>
              <button onClick={handleContinue} disabled={!canContinue||!allowContinue} className="flex-1 h-11 rounded-2xl text-white font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-50" style={{background:`linear-gradient(135deg,${C.cyan},${C.navy})`,boxShadow:`0 4px 14px ${C.navy}40`}}>Continue<ArrowRight className="w-4 h-4"/></button>
            </div>
          </div>
        </div></Card>
      </div>
      <BottomNav current="start-session" onNav={onNav}/>
    </div>
  );
}

// ─── Preset ───────────────────────────────────────────────────────────────────
function PresetScreen({onStart,onBack,initialIntensity,presets,onNav,isTourActive=false,tourStep=null,onTourCustomizeOpen,onTourCustomEdit,onTourStartSession}){
  const [selected,setSelected]=useState("default");
  const [showCustom,setShowCustom]=useState(false);
  const [dur,setDur]=useState("30");
  const [freq,setFreq]=useState("10");
  const [intensity,setIntensity]=useState(initialIntensity);
  const allowCustomize=!isTourActive||tourStep===5;
  const allowCustomEdit=!isTourActive||tourStep===5;
  const allowStart=!isTourActive||tourStep===6;
  const allowBack=!isTourActive;
  const handleStart=()=>{
    if(isTourActive&&onTourStartSession){
      const handled=onTourStartSession({showCustom,dur,freq,intensity,selected});
      if(handled) return;
    }
    if(showCustom)onStart(parseInt(dur)||30,parseInt(freq)||10,intensity);
    else if(selected==="default")onStart(30,10,intensity);
    else{
      const p=presets.find(p=>p.id===selected);
      if(p)onStart(p.duration,p.frequency,intensity);
    }
  };
  const setDurWithTour=(v)=>{setDur(v);onTourCustomEdit?.("duration",v);};
  const setFreqWithTour=(v)=>{setFreq(v);onTourCustomEdit?.("frequency",v);};
  return(
    <div className={cn("min-h-screen pb-28",BG)}>
      <div className="flex items-center justify-center min-h-[calc(100vh-5rem)] p-5">
        <Card className="w-full max-w-lg p-7"><div className="space-y-5">
          <div className="text-center"><h2 className="text-2xl font-black mb-2" style={{color:C.navy}}>Select Preset</h2><p className="text-gray-500 text-sm">Choose a preset or customize</p></div>
          <div className="rounded-xl p-4 flex items-center justify-between" style={{background:"#e8f9fb",border:`1.5px solid ${C.cyan}30`}}>
            <div><span className="text-sm font-bold text-gray-700">Starting Intensity</span><p className="text-[10px] text-gray-500 mt-0.5">Adjustable during session</p></div>
            <IntensityStepper value={intensity} onChange={setIntensity} disabled={isTourActive}/>
          </div>
          <div><span className="text-sm font-bold text-gray-500 block mb-2">Quick Start</span>
            <button disabled={isTourActive} onClick={()=>{setSelected("default");setShowCustom(false);}} className="w-full p-4 rounded-xl border-2 text-left transition-all disabled:opacity-40" style={{borderColor:selected==="default"&&!showCustom?C.cyan:"#e5e7eb",background:selected==="default"&&!showCustom?"#e8f9fb":"white"}}>
              <div className="flex items-center justify-between"><div><span className="font-bold text-sm">Standard Session</span><span className="ml-2 text-[10px] px-2 py-0.5 rounded-full font-bold" style={{background:`${C.cyan}20`,color:C.cyanDark}}>Default</span><p className="text-xs text-gray-400 mt-1">30 min · 10 Hz</p></div>{selected==="default"&&!showCustom&&<CheckCircle2 className="w-5 h-5" style={{color:C.cyan}}/>}</div>
            </button>
          </div>
          {presets.length>0&&(<div><span className="text-sm font-bold text-gray-500 block mb-2">Your Presets</span><div className="space-y-2">{presets.map(p=>(<button disabled={isTourActive} key={p.id} onClick={()=>{setSelected(p.id);setShowCustom(false);}} className="w-full p-4 rounded-xl border-2 text-left transition-all disabled:opacity-40" style={{borderColor:selected===p.id&&!showCustom?C.cyan:"#e5e7eb",background:selected===p.id&&!showCustom?"#e8f9fb":"white"}}><div className="flex items-center justify-between"><div><span className="font-bold text-sm flex items-center gap-2">{p.name}</span><p className="text-xs text-gray-400 mt-1">{p.duration} min · {p.frequency} Hz</p></div>{selected===p.id&&!showCustom&&<CheckCircle2 className="w-5 h-5" style={{color:C.cyan}}/>}</div></button>))}</div></div>)}
          <div className={cn(isTourActive&&tourStep===5&&cn(TOUR_TARGET,"rounded-2xl p-2 bg-white"))}>
            {isTourActive&&tourStep===5&&<p className="text-xs font-bold text-cyan-800 mb-2">Step 4: Tap Customize, then edit a value</p>}
            {!showCustom?<button disabled={!allowCustomize} onClick={()=>{setShowCustom(true);setSelected(null);onTourCustomizeOpen?.();}} className="w-full h-11 rounded-2xl border-2 border-gray-200 bg-white text-sm font-bold text-gray-600 flex items-center justify-center gap-2 hover:bg-gray-50 disabled:opacity-40"><Plus className="w-4 h-4"/>Customize (One-Time)</button>:<Card className={cn("p-4",isTourActive&&tourStep===5&&TOUR_NUMERIC_PANEL)} style={{borderColor:`${C.mint}30`,borderWidth:1.5}}><div className="flex items-center justify-between mb-3"><span className="text-sm font-bold">Custom Session</span><button disabled={isTourActive} onClick={()=>{setShowCustom(false);setSelected("default");}} className="h-7 w-7 rounded-lg bg-gray-100 flex items-center justify-center disabled:opacity-40"><X className="w-3.5 h-3.5 text-gray-500"/></button></div><div className="grid grid-cols-2 gap-3"><div><label className="text-[10px] text-gray-400 font-semibold">Duration (min)</label><input disabled={!allowCustomEdit} type="number" min="1" max="120" value={dur} onChange={e=>setDurWithTour(e.target.value)} className={cn("w-full h-10 rounded-xl border-2 border-gray-200 px-3 text-sm focus:outline-none mt-1 disabled:opacity-40",isTourActive&&tourStep===5&&"ring-2 ring-cyan-300")}/></div><div><label className="text-[10px] text-gray-400 font-semibold">Frequency (Hz)</label><input disabled={!allowCustomEdit} type="number" min="1" max="100" value={freq} onChange={e=>setFreqWithTour(e.target.value)} className={cn("w-full h-10 rounded-xl border-2 border-gray-200 px-3 text-sm focus:outline-none mt-1 disabled:opacity-40",isTourActive&&tourStep===5&&"ring-2 ring-cyan-300")}/></div></div></Card>}
          </div>
          <div className={cn("pt-2",isTourActive&&tourStep===6&&cn(TOUR_TARGET,"rounded-2xl p-2 bg-white"))}>
            {isTourActive&&tourStep===6&&<p className="text-xs font-bold text-cyan-800 mb-2">Step 5: Tap Start Session</p>}
            <div className="flex gap-3">
            <button disabled={!allowBack} onClick={onBack} className="flex-1 h-12 rounded-2xl border-2 border-gray-200 bg-white font-bold text-sm text-gray-600 flex items-center justify-center gap-2 disabled:opacity-40"><ArrowLeft className="w-4 h-4"/>Back</button>
            <button onClick={handleStart} disabled={!selected&&!showCustom||!allowStart} className="flex-1 h-12 rounded-2xl text-white font-bold text-base flex items-center justify-center gap-2 disabled:opacity-50" style={{background:`linear-gradient(135deg,${C.cyan},${C.navy})`,boxShadow:`0 4px 14px ${C.navy}40`}}><Play className="w-5 h-5"/>Start Session</button>
            </div>
          </div>
        </div></Card>
      </div>
      <BottomNav current="start-session" onNav={onNav}/>
    </div>
  );
}

// ─── Session ──────────────────────────────────────────────────────────────────
function SessionScreen({onComplete,onPause,duration,frequency,initialIntensity,initialRemaining,onNav}){
  const TOTAL=duration*60;
  const [remaining,setRemaining]=useState(initialRemaining||TOTAL);
  const [paused,setPaused]=useState(false);
  const [intensity,setIntensity]=useState(initialIntensity);
  const [startTime]=useState(new Date());
  useEffect(()=>{if(paused||remaining<=0)return;const t=setInterval(()=>setRemaining(p=>{if(p<=1){clearInterval(t);setTimeout(()=>onComplete(startTime,new Date(),true),500);return 0;}return p-1;}),1000);return()=>clearInterval(t);},[paused,remaining]);
  const mins=String(Math.floor(remaining/60)).padStart(2,"0");
  const secs=String(remaining%60).padStart(2,"0");
  const progress=((TOTAL-remaining)/TOTAL)*100;
  return(
    <div className={cn("min-h-screen pb-28",BG)}>
      <div className="flex items-center justify-center min-h-[calc(100vh-5rem)] p-5">
        <Card className="w-full max-w-lg p-7"><div className="space-y-7">
          <div className="text-center">
            <div className="mx-auto h-16 w-16 rounded-2xl flex items-center justify-center mb-4" style={{background:`linear-gradient(135deg,${C.cyan}20,${C.navy}20)`}}>
              <Activity className={cn("w-8 h-8",remaining>0&&!paused&&"animate-pulse")} style={{color:C.navy}}/>
            </div>
            <h2 className="text-xl font-black" style={{color:C.navy}}>Stimulation in Progress</h2>
            <p className="text-gray-500 text-sm mt-1">{paused?"Session Paused":"Keep the device in place and relax"}</p>
          </div>
          <div className="text-center"><div className="text-6xl font-mono font-black tracking-tighter" style={{color:C.navy}}>{mins}:{secs}</div><p className="text-xs text-gray-400 mt-1">{remaining===0?"Complete!":"Time Remaining"}</p></div>
          <div><Progress value={progress}/><div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>0:00</span><span>{progress.toFixed(0)}%</span><span>{String(Math.floor(TOTAL/60)).padStart(2,"0")}:{String(TOTAL%60).padStart(2,"0")}</span></div></div>
          <div className="rounded-2xl p-5" style={{background:"#e8f9fb"}}>
            <p className="text-xs font-bold text-gray-500 text-center mb-4 uppercase tracking-wider">Stimulation Intensity</p>
            <div className="flex justify-center"><IntensityStepper value={intensity} onChange={setIntensity} disabled={remaining===0} large/></div>
          </div>
          <div className="flex gap-3">
            <button onClick={()=>{setPaused(true);onPause({remaining,intensity,startTime,duration,frequency});}} disabled={remaining===0||paused} className="flex-1 h-11 rounded-2xl border-2 border-gray-200 bg-white font-bold text-sm text-gray-600 flex items-center justify-center gap-2 disabled:opacity-40"><Pause className="w-4 h-4"/>Pause</button>
            <button onClick={()=>onComplete(startTime,new Date(),false)} className="flex-1 h-11 rounded-2xl text-white font-bold text-sm flex items-center justify-center gap-2" style={{background:"#ef4444"}}><X className="w-4 h-4"/>End Session</button>
          </div>
        </div></Card>
      </div>
      <BottomNav current="start-session" onNav={onNav}/>
    </div>
  );
}

// ─── Complete ─────────────────────────────────────────────────────────────────
function CompleteScreen({onHome,startTime,endTime,onNav,use24}){
  const dur=Math.round((endTime-startTime)/60000);
  return(
    <div className="min-h-screen pb-28" style={{background:"linear-gradient(135deg,#e8faf4,#e8f9fb)"}}>
      <div className="flex items-center justify-center min-h-[calc(100vh-5rem)] p-5">
        <Card className="w-full max-w-lg p-7"><div className="space-y-6 text-center">
          <div className="mx-auto h-20 w-20 rounded-full flex items-center justify-center" style={{background:`linear-gradient(135deg,${C.mint}40,${C.cyan}40)`}}><CheckCircle2 className="w-12 h-12" style={{color:C.mint}}/></div>
          <div><h2 className="text-3xl font-black" style={{color:C.navy}}>Great Job!</h2><p className="text-gray-500 mt-1">Session completed and saved</p></div>
          <Card className="p-5 text-left" style={{background:"linear-gradient(135deg,#e8f9fb,white)",border:"none"}}>
            <div className="flex items-center justify-center gap-2 mb-3" style={{color:C.cyan}}><Clock className="w-4 h-4"/><span className="font-bold text-sm">Session Summary</span></div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Duration:</span><span className="font-black text-lg" style={{color:C.navy}}>{dur} min</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Time:</span><span className="font-semibold">{fmtTimeDisplay(startTime,use24)} – {fmtTimeDisplay(endTime,use24)}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Date:</span><span className="font-semibold">{fmt(startTime,{month:"long",day:"numeric",year:"numeric"})}</span></div>
            </div>
          </Card>
          <button onClick={onHome} className="w-full h-12 rounded-2xl text-white font-bold text-base flex items-center justify-center gap-2" style={{background:`linear-gradient(135deg,${C.mint},${C.navy})`,boxShadow:`0 4px 16px ${C.navy}40`}}><Home className="w-5 h-5"/>Back to Home</button>
        </div></Card>
      </div>
      <BottomNav current="start-session" onNav={onNav}/>
    </div>
  );
}

// ─── Guides ───────────────────────────────────────────────────────────────────
function PelvicFloorIllustration(){
  return (
    <img
      src={ankleDeviceImg}
      alt="Pelvic floor anatomy diagram"
      className="w-full h-auto rounded-xl"
    />
  );
}

// GuidesScreen now accepts fromSession prop and onBackToSession callback
// When fromSession=true: exit/back returns to precheck; device-setup shows "Next: Calibration" button
function GuidesScreen({onBack,onNav,initialSection="menu",fromSession=false,onBackToSession,onReplayIntro,forceSequence=false,onTourGuidesComplete}){
  const [section,setSection]=useState(initialSection);
  const [step,setStep]=useState(0);
  const [expandedFaq,setExpandedFaq]=useState(null);
  const goToMenu=()=>setSection("menu");
  const lockToSequence=forceSequence&&!fromSession;
  const highlightActions=forceSequence;

  useEffect(()=>{
    if(lockToSequence&&section==="menu"){
      setSection("learn");
    }
  },[lockToSequence,section]);

  // Back/exit target: if fromSession, go back to precheck; otherwise back to guides menu or main back
  const handleExit=()=>{
    if(lockToSequence) return;
    if(fromSession&&onBackToSession) onBackToSession();
    else onBack();
  };

  const steps=[
    {
      title:"Clean and Dry Your Ankle",
      desc:"Thoroughly clean and dry the skin around your ankle area before applying the device. Dry skin ensures a secure fit and better contact.",
    },
    {
      title:"Slide the Band onto Your Ankle",
      desc:"Slip the elastic band around your ankle. Twist it so the ring sits directly over your medial malleolus — the bony bump on the inside of your ankle. Press the band snugly against the skin.",
      hasPhoto:true,
    },
    {
      title:"Turn On the Device",
      desc:"Power on your PelviStim device and confirm the connection is solid before calibrating.",
    },
  ];

  const faqs=[{q:"How often should I do sessions?",a:"We recommend daily sessions of 30 minutes. Consistency every day leads to the best outcomes — the duration can be adjusted based on your tolerance and provider guidance."},{q:"Is neuromodulation painful?",a:"Not at all. Most feel a gentle tingling or mild pulsing near the ankle. Intensity is always adjustable and should feel comfortable."},{q:"How long before I see results?",a:"Many notice improvement within 6–8 weeks of daily sessions."},{q:"Are there any side effects?",a:"Minimal. Some experience slight skin redness at the electrode site, resolving quickly."},{q:"Can I use this during pregnancy?",a:"Consult your provider first. It is generally recommended to wait until after delivery."}];

  if(section==="device-setup"){
    const s=steps[step];
    const isLast=step===steps.length-1;
    const showForwardHint=lockToSequence||fromSession;
    return(
      <div className={cn("min-h-screen pb-28",BG)}>
        <div className="max-w-2xl mx-auto p-6 space-y-5">
          <div className="flex items-center gap-3">
            <button onClick={()=>{
              if(step>0){setStep(step-1);return;}
              if(lockToSequence){setSection("learn");return;}
              goToMenu();
              if(fromSession&&onBackToSession)onBackToSession();
            }} className="h-10 w-10 rounded-xl bg-white/70 flex items-center justify-center">
              <ChevronLeft className="w-5 h-5 text-gray-600"/>
            </button>
            <h1 className="text-xl font-black flex-1" style={{color:C.navy}}>Device Setup Guide</h1>
            {!lockToSequence&&<button onClick={handleExit} className="px-4 py-2 rounded-xl text-sm font-bold bg-white border border-gray-200 text-gray-600 hover:bg-gray-50">
              {fromSession?"Back to Setup":"Exit Guide"}
            </button>}
          </div>
          <Card className="p-7">
            <div className="flex justify-center gap-2 mb-6">{steps.map((_,i)=><div key={i} className="h-2.5 rounded-full transition-all" style={{width:i===step?24:10,background:i===step?C.navy:i<step?C.cyan:"#e5e7eb"}}/>)}</div>
            <div className="flex justify-center mb-5"><div className="h-14 w-14 rounded-full flex items-center justify-center text-2xl font-black text-white" style={{background:`linear-gradient(135deg,${C.cyan},${C.navy})`}}>{step+1}</div></div>
            <div className="text-center mb-5"><h2 className="text-xl font-black mb-2" style={{color:C.navy}}>{s.title}</h2><p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p></div>

            {/* Step 2: real device photo */}
            {step===1&&(
              <div className="my-5 rounded-2xl overflow-hidden border-2 border-gray-100">
                <img
                  src={pelvicFloorDiagramImg}
                  alt="Device band with ring positioned over the inside ankle bone (medial malleolus)"
                  className="w-full object-cover"
                  style={{maxHeight:260}}
                />
                <div className="bg-gray-50 px-4 py-2.5">
                  <p className="text-xs text-gray-500 text-center">
                    <span className="font-bold" style={{color:C.navy}}>Ring position:</span> Centered over the inner ankle bone (medial malleolus — the bump on the inside of your ankle)
                  </p>
                </div>
              </div>
            )}

            {showForwardHint&&<p className="text-xs font-bold text-cyan-800 text-center mb-2">Use the highlighted button below to move forward.</p>}
            <div className="flex gap-3 mt-6">
              {step>0&&<button onClick={()=>setStep(step-1)} className="flex-1 h-11 rounded-2xl border-2 border-gray-200 bg-white font-bold text-sm text-gray-600 flex items-center justify-center gap-2"><ArrowLeft className="w-4 h-4"/>Previous</button>}
              {!isLast&&<button onClick={()=>setStep(step+1)} className={cn("flex-1 h-11 rounded-2xl text-white font-bold text-sm flex items-center justify-center gap-2",highlightActions&&TOUR_TARGET)} style={{background:`linear-gradient(135deg,${C.cyan},${C.navy})`}}>Next<ChevronRight className="w-4 h-4"/></button>}
              {isLast&&!fromSession&&!lockToSequence&&<button onClick={goToMenu} className={cn("flex-1 h-11 rounded-2xl text-white font-bold text-sm flex items-center justify-center gap-2",highlightActions&&TOUR_TARGET)} style={{background:`linear-gradient(135deg,${C.mint},${C.mintDark})`}}><CheckCircle2 className="w-4 h-4"/>Done — Back to Guides</button>}
              {isLast&&!fromSession&&lockToSequence&&(
                <button onClick={()=>setSection("calibration")} className={cn("flex-1 h-11 rounded-2xl text-white font-bold text-sm flex items-center justify-center gap-2",highlightActions&&TOUR_TARGET)} style={{background:`linear-gradient(135deg,${C.cyan},${C.navy})`}}>
                  <ArrowRight className="w-4 h-4"/>Next Guide: Calibration
                </button>
              )}
              {isLast&&fromSession&&(
                <button onClick={()=>setSection("calibration")} className={cn("flex-1 h-11 rounded-2xl text-white font-bold text-sm flex items-center justify-center gap-2",highlightActions&&TOUR_TARGET)} style={{background:`linear-gradient(135deg,${C.cyan},${C.navy})`}}>
                  <ArrowRight className="w-4 h-4"/>Next: Calibration Guide
                </button>
              )}
            </div>
            {isLast&&fromSession&&(
              <button onClick={handleExit} className={cn("w-full h-11 rounded-2xl text-white font-bold text-sm flex items-center justify-center gap-2 mt-2",highlightActions&&TOUR_TARGET)} style={{background:`linear-gradient(135deg,${C.mint},${C.mintDark})`}}>
                <CheckCircle2 className="w-4 h-4"/>Done — Back to Setup
              </button>
            )}
          </Card>
        </div>
        <BottomNav current={fromSession?"start-session":"guides"} onNav={k=>k==="guides"?(fromSession?handleExit():goToMenu()):onNav(k)}/>
      </div>
    );
  }

  if(section==="calibration"){return(
    <div className={cn("min-h-screen pb-28",BG)}>
      <div className="max-w-2xl mx-auto p-6 space-y-5">
        <div className="flex items-center gap-3">
          <button onClick={()=>goToMenu()} className="h-10 w-10 rounded-xl bg-white/70 flex items-center justify-center"><ChevronLeft className="w-5 h-5 text-gray-600"/></button>
          <h1 className="text-xl font-black flex-1" style={{color:C.navy}}>Calibration Guide</h1>
          {!lockToSequence&&<button onClick={handleExit} className="px-4 py-2 rounded-xl text-sm font-bold bg-white border border-gray-200 text-gray-600">
            {fromSession?"Back to Setup":"Exit Guide"}
          </button>}
        </div>
        <Card className="p-7">
          <div className="text-center mb-5"><div className="mx-auto h-14 w-14 rounded-2xl flex items-center justify-center mb-3" style={{background:`linear-gradient(135deg,${C.cyan}20,${C.navy}20)`}}><BookOpen className="w-7 h-7" style={{color:C.navy}}/></div><h2 className="text-xl font-black" style={{color:C.navy}}>Sensation Progression</h2></div>
          <div className="rounded-xl p-5 space-y-3 mb-5" style={{background:"#e8f9fb"}}>
            <h3 className="font-bold text-sm mb-2">Sensations should appear in this order:</h3>
            {[
              {n:1,t:"Electrode Site",d:"Tingling begins exactly where the electrode touches the skin on your ankle",c:C.cyan},
              {n:2,t:"Heel",d:"Sensation migrates downward toward your heel as intensity rises",c:C.cyanDark},
              {n:3,t:"Foot / Toes",d:"You may feel tingling spread along bottom side of foot along the arch and into the toes. When intensity is higher, you may notice your toes curl",c:C.navy},
            ].map(({n,t,d,c})=>(
              <div key={n} className="flex items-start gap-3"><span className="h-6 w-6 rounded-full text-xs flex items-center justify-center font-black shrink-0 mt-0.5 text-white" style={{background:c}}>{n}</span><div><p className="text-sm font-bold">{t}</p><p className="text-xs text-gray-600">{d}</p></div></div>
            ))}
          </div>
          <div className="rounded-xl p-4 mb-5" style={{background:"#fffbeb",border:"1px solid #fde68a"}}>
            <h3 className="font-bold text-sm text-amber-800 mb-2">Important</h3>
            <ul className="text-xs text-amber-700 space-y-1.5">
              <li>• Reposition the band higher or lower if you feel nothing even at high intensity</li>
              <li>• If sensation is only in the heel, that can still be okay</li>
              <li>• Reduce intensity immediately if anything feels painful or uncomfortable</li>
              <li>• Contact the manufacturer if you cannot achieve sensation</li>
            </ul>
          </div>
          {!lockToSequence&&<button onClick={handleExit} className="w-full h-11 rounded-2xl text-white font-bold text-sm flex items-center justify-center gap-2" style={{background:`linear-gradient(135deg,${C.mint},${C.mintDark})`}}>
            <CheckCircle2 className="w-4 h-4"/>{fromSession?"Done — Back to Setup":"Done — Back to Guides"}
          </button>}
          {lockToSequence&&(
            <button onClick={onTourGuidesComplete} className={cn("w-full h-11 rounded-2xl text-white font-bold text-sm flex items-center justify-center gap-2",highlightActions&&TOUR_TARGET)} style={{background:`linear-gradient(135deg,${C.mint},${C.mintDark})`}}>
              <CheckCircle2 className="w-4 h-4"/>Finish Guides and Continue
            </button>
          )}
        </Card>
      </div>
      <BottomNav current={fromSession?"start-session":"guides"} onNav={k=>k==="guides"?(fromSession?handleExit():goToMenu()):onNav(k)}/>
    </div>
  );}

  if(section==="learn"){return(
    <div className={cn("min-h-screen pb-28",BG)}>
      <div className="max-w-2xl mx-auto p-6 space-y-5">
        <div className="flex items-center gap-3"><button onClick={goToMenu} className="h-10 w-10 rounded-xl bg-white/70 flex items-center justify-center"><ChevronLeft className="w-5 h-5 text-gray-600"/></button><div><h1 className="text-xl font-black" style={{color:C.navy}}>Understanding PFD & Neuromodulation</h1><p className="text-xs text-gray-500">A guide to your treatment</p></div></div>
        <Card className="p-5"><div className="flex items-center gap-2 mb-3"><Heart className="w-5 h-5 text-pink-500"/><h2 className="font-black text-base" style={{color:C.navy}}>What is the Pelvic Floor?</h2></div><p className="text-sm text-gray-600 leading-relaxed mb-4">The pelvic floor is a group of muscles at the base of your pelvis — like a hammock supporting your bladder, bowel, and uterus. When these muscles weaken, it causes problems with bladder and bowel control.</p><PelvicFloorIllustration/></Card>
        <Card className="p-5" style={{background:"linear-gradient(135deg,#e8faf4,#e8f9fb)",border:"none"}}><div className="flex items-center gap-2 mb-3"><Shield className="w-5 h-5" style={{color:C.mint}}/><h2 className="font-black text-base" style={{color:C.navy}}>What to Expect</h2></div><div className="space-y-3 text-sm text-gray-600"><div className="flex gap-2"><CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{color:C.mint}}/><p><strong>During a session:</strong> Gentle tingling near ankle — never painful.</p></div><div className="flex gap-2"><CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{color:C.mint}}/><p><strong>Recommended:</strong> Daily sessions of 30 minutes (adjustable).</p></div><div className="flex gap-2"><CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{color:C.mint}}/><p><strong>Timeline:</strong> Most see improvement in 6–8 weeks with daily use.</p></div></div></Card>
        <Card className="p-5"><div className="flex items-center gap-2 mb-3"><HelpCircle className="w-5 h-5" style={{color:C.cyan}}/><h2 className="font-black text-base" style={{color:C.navy}}>Frequently Asked Questions</h2></div><div className="space-y-1">{faqs.map((faq,i)=>(<div key={i}><button onClick={()=>setExpandedFaq(expandedFaq===i?null:i)} className="flex items-center justify-between w-full p-3 rounded-xl hover:bg-gray-50 text-left"><span className="font-bold text-sm pr-2">{faq.q}</span>{expandedFaq===i?<ChevronUp className="w-4 h-4 text-gray-400 shrink-0"/>:<ChevronDown className="w-4 h-4 text-gray-400 shrink-0"/>}</button>{expandedFaq===i&&<div className="px-3 pb-3"><p className="text-xs text-gray-600 rounded-lg p-3 leading-relaxed" style={{background:"#e8f9fb"}}>{faq.a}</p></div>}</div>))}</div></Card>
        {lockToSequence&&(
          <button onClick={()=>{setStep(0);setSection("device-setup");}} className={cn("w-full h-11 rounded-2xl text-white font-bold text-sm flex items-center justify-center gap-2",highlightActions&&TOUR_TARGET)} style={{background:`linear-gradient(135deg,${C.cyan},${C.navy})`}}>
            Next Guide: Device Setup <ArrowRight className="w-4 h-4"/>
          </button>
        )}
      </div>
      <BottomNav current="guides" onNav={k=>k==="guides"?goToMenu():onNav(k)}/>
    </div>
  );}

  // Menu view — only shown when not fromSession (fromSession always lands on device-setup or calibration directly)
  return(
    <div className={cn("min-h-screen pb-28",BG)}>
      <div className="max-w-2xl mx-auto p-6 space-y-5">
        <div><h1 className="text-2xl font-black" style={{color:C.navy}}>Guides</h1><p className="text-sm text-gray-500">Learn about your condition and device</p></div>
        {!fromSession&&onReplayIntro&&(
          <button onClick={onReplayIntro} className="w-full h-10 rounded-xl border-2 border-gray-200 bg-white text-sm font-bold text-gray-700 hover:bg-gray-50">
            Replay Initial Walkthrough
          </button>
        )}
        <Card className="p-5 cursor-pointer hover:shadow-md transition-all active:scale-[0.98]" style={{borderLeft:`5px solid ${C.cyan}`,background:"linear-gradient(135deg,#e8f9fb,white)"}} onClick={()=>setSection("learn")}>
          <div className="flex items-center justify-between"><div className="flex items-center gap-3"><div className="h-11 w-11 rounded-xl flex items-center justify-center shrink-0" style={{background:`${C.cyan}20`}}><Brain className="w-6 h-6" style={{color:C.navy}}/></div><div><h2 className="font-black text-sm" style={{color:C.navy}}>Understanding PFD & Neuromodulation</h2><p className="text-xs text-gray-500 mt-0.5">Learn what PFD is and how treatment works</p></div></div><ChevronRight className="w-5 h-5 text-gray-400 shrink-0"/></div>
        </Card>
        <div>
          <h3 className="text-sm font-black text-gray-400 uppercase tracking-wider mb-3">Device Guides</h3>
          <Card className="p-4 mb-3" style={{background:`${C.mint}10`,borderColor:`${C.mint}30`,borderWidth:1.5}}>
            <h3 className="font-bold text-sm mb-2" style={{color:C.navy}}>Quick Tips</h3>
            <ul className="text-xs text-gray-600 space-y-1.5">
              <li className="flex gap-2"><span className="font-black" style={{color:C.cyan}}>·</span>Clean and dry skin before applying the device</li>
              <li className="flex gap-2"><span className="font-black" style={{color:C.cyan}}>·</span>Position the ring over the inner ankle bone</li>
              <li className="flex gap-2"><span className="font-black" style={{color:C.cyan}}>·</span>Start at low intensity and increase gradually</li>
              <li className="flex gap-2"><span className="font-black" style={{color:C.cyan}}>·</span>Should feel comfortable — never painful</li>
              <li className="flex gap-2"><span className="font-black" style={{color:C.cyan}}>·</span>Daily 30-minute sessions recommended</li>
            </ul>
          </Card>
          <div className="space-y-3">
            <Card className="p-5 cursor-pointer hover:shadow-md transition-all active:scale-[0.98]" onClick={()=>{setSection("device-setup");setStep(0);}}><div className="flex items-center justify-between"><div><h2 className="font-black text-sm" style={{color:C.navy}}>Device Setup Instructions</h2><p className="text-xs text-gray-500 mt-0.5">Step-by-step band and ring placement</p></div><ChevronRight className="w-5 h-5 text-gray-400"/></div></Card>
            <Card className="p-5 cursor-pointer hover:shadow-md transition-all active:scale-[0.98]" onClick={()=>setSection("calibration")}><div className="flex items-center justify-between"><div><h2 className="font-black text-sm" style={{color:C.navy}}>Calibration Guide</h2><p className="text-xs text-gray-500 mt-0.5">Understanding the sensation progression</p></div><ChevronRight className="w-5 h-5 text-gray-400"/></div></Card>
          </div>
        </div>
      </div>
      <BottomNav current="guides" onNav={onNav}/>
    </div>
  );
}

// ─── Settings ─────────────────────────────────────────────────────────────────
function SettingsScreen({onNav,settings,onSave,presets,onUpdatePresets,onLogout}){
  const [tab,setTab]=useState("profile");
  const [form,setForm]=useState(settings);
  const [saved,setSaved]=useState(false);
  const [pName,setPName]=useState("");const [pDur,setPDur]=useState("30");const [pFreq,setPFreq]=useState("10");
  const hasPfdSelected=Object.values(form.pfdTypes||{}).some(Boolean);
  const handleSave=()=>{
    if(!hasPfdSelected) return;
    onSave(form);
    setSaved(true);
    setTimeout(()=>setSaved(false),2000);
  };
  const addPreset=()=>{if(!pName.trim())return;onUpdatePresets([...presets,{id:Date.now().toString(),name:pName.trim(),duration:parseInt(pDur)||30,frequency:parseInt(pFreq)||10}]);setPName("");setPDur("30");setPFreq("10");};

  const toggle24=(v)=>{ setForm({...form,use24:v}); };

  return(
    <div className={cn("min-h-screen pb-28",BG)}>
      <div className="max-w-2xl mx-auto p-6 space-y-5">
        <div><h1 className="text-2xl font-black" style={{color:C.navy}}>Settings</h1><p className="text-sm text-gray-500">Manage profile and preferences</p></div>
        <div className="flex bg-gray-100 rounded-xl p-1">
          {["profile","presets"].map(t=>(
            <button key={t} onClick={()=>setTab(t)} className={cn("flex-1 py-2.5 rounded-xl text-sm font-bold transition-all capitalize",tab===t?"bg-white shadow-sm text-gray-900":"text-gray-400")}>{t}</button>
          ))}
        </div>

        {tab==="profile"&&(
          <div className="space-y-4">
            <Card className="p-6"><div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Name</label><input value={form.name||""} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Your name" className="w-full h-10 rounded-xl border-2 border-gray-200 px-3 text-sm focus:outline-none"/></div>
                <div><label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Email</label><input type="email" value={form.email||""} onChange={e=>setForm({...form,email:e.target.value})} placeholder="Email" className="w-full h-10 rounded-xl border-2 border-gray-200 px-3 text-sm focus:outline-none"/></div>
                <div><label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Age</label><input type="number" min="0" max="120" value={form.age||""} onChange={e=>setForm({...form,age:Math.max(0,parseInt(e.target.value)||0)})} placeholder="Age" className="w-full h-10 rounded-xl border-2 border-gray-200 px-3 text-sm focus:outline-none"/></div>
                <div><label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Weight (lbs)</label><input type="number" min="0" value={form.weight||""} onChange={e=>setForm({...form,weight:Math.max(0,parseInt(e.target.value)||0)})} placeholder="Weight" className="w-full h-10 rounded-xl border-2 border-gray-200 px-3 text-sm focus:outline-none"/></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div><label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Gender</label><select value={form.gender||""} onChange={e=>setForm({...form,gender:e.target.value})} className="w-full h-10 rounded-xl border-2 border-gray-200 px-3 text-sm focus:outline-none bg-white"><option value="">Select...</option>{GENDER_OPTIONS.map(l=><option key={l}>{l}</option>)}</select></div>
                <div><label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Education Level</label><select value={form.education||""} onChange={e=>setForm({...form,education:e.target.value})} className="w-full h-10 rounded-xl border-2 border-gray-200 px-3 text-sm focus:outline-none bg-white"><option value="">Select...</option>{EDUCATION_LEVELS.map(l=><option key={l}>{l}</option>)}</select></div>
                <div><label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Race / Ethnicity</label><select value={form.raceEthnicity||""} onChange={e=>setForm({...form,raceEthnicity:e.target.value})} className="w-full h-10 rounded-xl border-2 border-gray-200 px-3 text-sm focus:outline-none bg-white"><option value="">Select...</option>{RACE_ETHNICITY_OPTIONS.map(l=><option key={l}>{l}</option>)}</select></div>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Time Zone</label>
                <select value={form.timezone||defaultTimeZone} onChange={e=>setForm({...form,timezone:e.target.value})} className="w-full h-10 rounded-xl border-2 border-gray-200 px-3 text-sm focus:outline-none bg-white">
                  {COMMON_TIMEZONES.map(z=><option key={z.value} value={z.value}>{z.label}</option>)}
                </select>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl" style={{background:"#f8fafc",border:"1.5px solid #e5e7eb"}}>
                <div><p className="text-sm font-bold text-gray-700">Time Format</p><p className="text-xs text-gray-400">Used in Schedule and sessions</p></div>
                <div className="flex bg-gray-100 rounded-xl p-1 gap-1">
                  <button onClick={()=>toggle24(false)} className={cn("px-3 py-1.5 rounded-lg text-xs font-bold transition-all",!form.use24?"bg-white shadow-sm text-gray-900":"text-gray-400")}>12h</button>
                  <button onClick={()=>toggle24(true)} className={cn("px-3 py-1.5 rounded-lg text-xs font-bold transition-all",form.use24?"bg-white shadow-sm text-gray-900":"text-gray-400")}>24h</button>
                </div>
              </div>

              <button onClick={handleSave} disabled={!hasPfdSelected} className="w-full h-11 rounded-2xl text-white font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-50" style={{background:`linear-gradient(135deg,${C.cyan},${C.navy})`,boxShadow:`0 4px 14px ${C.navy}30`}}>
                <Save className="w-4 h-4"/>{saved?"Saved!":"Save Profile"}
              </button>
            </div></Card>

            <Card className="p-5">
              <h3 className="font-black text-sm mb-1" style={{color:C.navy}}>Symptom Type</h3>
              <p className="text-xs text-gray-400 mb-3">Select all that apply</p>
              {!hasPfdSelected&&<p className="text-[11px] text-amber-700 mb-2">Choose at least one symptom type to save settings.</p>}
              <div className="space-y-2">
                {Object.entries(INCONTINENCE_SUBTYPES).map(([k,v])=>{
                  const {Icon,accent}=v;const checked=!!form.pfdTypes?.[k];
                  return(
                    <button key={k} onClick={()=>setForm({...form,pfdTypes:{...form.pfdTypes,[k]:!checked}})} className="flex items-center gap-3 w-full p-3 rounded-xl border-2 text-left text-sm transition-all" style={{borderColor:checked?accent:"#e5e7eb",background:checked?`${accent}12`:"white"}}>
                      <Checkbox checked={checked} onChange={()=>{}}/>
                      <div className="h-9 w-9 rounded-lg flex items-center justify-center shrink-0" style={{background:`${accent}20`}}><Icon className="w-5 h-5" style={{color:accent}}/></div>
                      <div className="flex-1 min-w-0"><div className="font-bold text-sm">{v.label}</div><div className="text-xs text-gray-400 truncate">{v.desc}</div></div>
                    </button>
                  );
                })}
              </div>
            </Card>

            <button onClick={handleSave} disabled={!hasPfdSelected} className="w-full h-11 rounded-2xl text-white font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-50" style={{background:`linear-gradient(135deg,${C.cyan},${C.navy})`}}>
              <Save className="w-4 h-4"/>{saved?"Saved!":"Save All Settings"}
            </button>
          </div>
        )}

        {tab==="presets"&&(
          <div className="space-y-4">
            <Card className="p-5" style={{background:"linear-gradient(135deg,#e8f9fb,white)",borderColor:`${C.cyan}30`,borderWidth:1.5}}>
              <span className="text-sm font-black block mb-3" style={{color:C.navy}}>Create New Preset</span>
              <div className="space-y-3">
                <input value={pName} onChange={e=>setPName(e.target.value)} placeholder="Preset name" className="w-full h-10 rounded-xl border-2 border-gray-200 px-3 text-sm focus:outline-none"/>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="text-[10px] font-bold text-gray-400 uppercase">Duration (min)</label><input type="number" min="1" value={pDur} onChange={e=>setPDur(e.target.value)} className="w-full h-10 rounded-xl border-2 border-gray-200 px-3 text-sm focus:outline-none mt-1"/></div>
                  <div><label className="text-[10px] font-bold text-gray-400 uppercase">Frequency (Hz)</label><input type="number" min="1" value={pFreq} onChange={e=>setPFreq(e.target.value)} className="w-full h-10 rounded-xl border-2 border-gray-200 px-3 text-sm focus:outline-none mt-1"/></div>
                </div>
                <button onClick={addPreset} disabled={!pName.trim()} className="w-full h-10 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-50" style={{background:C.navy}}><Plus className="w-4 h-4"/>Add Preset</button>
              </div>
            </Card>
            {presets.length>0?(
              <div className="space-y-2">{presets.map(p=>(<Card key={p.id} className="p-4"><div className="flex items-center justify-between"><div><div className="flex items-center gap-2"><span className="font-bold text-sm">{p.name}</span></div><p className="text-xs text-gray-400 mt-0.5">{p.duration} min · {p.frequency} Hz</p></div><div className="flex gap-2"><button onClick={()=>onUpdatePresets(presets.filter(x=>x.id!==p.id))} className="h-9 w-9 rounded-xl flex items-center justify-center hover:bg-red-50" style={{border:"2px solid #fca5a5"}}><Trash2 className="w-4 h-4 text-red-400"/></button></div></div></Card>))}</div>
            ):(
              <Card className="p-8 text-center"><Activity className="w-10 h-10 mx-auto mb-2" style={{color:"#e5e7eb"}}/><h3 className="font-bold text-sm mb-1 text-gray-600">No Presets Yet</h3><p className="text-xs text-gray-400">Create your first preset above.</p></Card>
            )}
          </div>
        )}
      </div>
      <div className="max-w-2xl mx-auto px-6 pb-4">
        <button onClick={onLogout} className="w-full h-11 rounded-2xl border-2 border-red-200 bg-white text-sm font-bold text-red-600 hover:bg-red-50">
          Log Out
        </button>
      </div>
      <BottomNav current="settings" onNav={onNav}/>
    </div>
  );
}

function OnboardingScreen({onComplete}){
  const [step,setStep]=useState(0);
  const [form,setForm]=useState({
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    pfdTypes:{urge:false,urgency:false,frequency:false,hesitancy:false,constipation:false,pelvicPain:false,fecal:false},
    age:"",
    weight:"",
    gender:"",
    education:"",
    raceEthnicity:"",
    timezone:defaultTimeZone,
  });

  const canContinueProfile=!!form.firstName.trim()&&!!form.lastName.trim()&&!!form.email.trim()&&!!form.password.trim();
  const hasDx=Object.values(form.pfdTypes).some(Boolean);

  const complete=()=>{
    onComplete({
      profile:{firstName:form.firstName.trim(),lastName:form.lastName.trim(),email:form.email.trim(),password:form.password},
      settings:{
        name:`${form.firstName.trim()} ${form.lastName.trim()}`.trim(),
        email:form.email.trim(),
        age:form.age||"",
        weight:form.weight||"",
        gender:form.gender||"",
        education:form.education||"",
        raceEthnicity:form.raceEthnicity||"",
        timezone:form.timezone||defaultTimeZone,
        pfdTypes:form.pfdTypes,
      },
    });
  };

  return(
    <div className={cn("min-h-screen pb-10",BG)}>
      <div className="max-w-2xl mx-auto p-6 space-y-5">
        <div>
          <div>
            <h1 className="text-2xl font-black" style={{color:C.navy}}>Welcome to PelviStim</h1>
            <p className="text-sm text-gray-500">First-time setup</p>
          </div>
        </div>
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-4">
            {[0,1,2].map(i=><div key={i} className="h-2.5 rounded-full transition-all" style={{width:step===i?26:10,background:step===i?C.navy:step>i?C.cyan:"#e5e7eb"}}/>)}
            <span className="ml-auto text-[10px] font-bold text-gray-400">Step {step+1} of 3</span>
          </div>

          {step===0&&(
            <div className="space-y-4">
              <h2 className="text-base font-black" style={{color:C.navy}}>Create Your Profile</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div><label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1.5">First Name *</label><input value={form.firstName} onChange={e=>setForm({...form,firstName:e.target.value})} className="w-full h-10 rounded-xl border-2 border-gray-200 px-3 text-sm focus:outline-none"/></div>
                <div><label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Last Name *</label><input value={form.lastName} onChange={e=>setForm({...form,lastName:e.target.value})} className="w-full h-10 rounded-xl border-2 border-gray-200 px-3 text-sm focus:outline-none"/></div>
                <div><label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Email *</label><input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="w-full h-10 rounded-xl border-2 border-gray-200 px-3 text-sm focus:outline-none"/></div>
                <div><label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Password *</label><input type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} className="w-full h-10 rounded-xl border-2 border-gray-200 px-3 text-sm focus:outline-none"/></div>
              </div>
            </div>
          )}

          {step===1&&(
            <div className="space-y-4">
              <h2 className="text-base font-black" style={{color:C.navy}}>Diagnosis & Symptoms</h2>
              <p className="text-xs text-gray-500">Select all that apply</p>
              <div className="space-y-2">
                {Object.entries(INCONTINENCE_SUBTYPES).map(([k,v])=>{
                  const checked=!!form.pfdTypes[k];
                  const {Icon,accent}=v;
                  return(
                    <button key={k} onClick={()=>setForm({...form,pfdTypes:{...form.pfdTypes,[k]:!checked}})} className="flex items-center gap-3 w-full p-3 rounded-xl border-2 text-left text-sm transition-all" style={{borderColor:checked?accent:"#e5e7eb",background:checked?`${accent}12`:"white"}}>
                      <Checkbox checked={checked} onChange={()=>{}}/>
                      <div className="h-9 w-9 rounded-lg flex items-center justify-center shrink-0" style={{background:`${accent}20`}}><Icon className="w-5 h-5" style={{color:accent}}/></div>
                      <div className="flex-1 min-w-0"><div className="font-bold text-sm">{v.label}</div><div className="text-xs text-gray-400 truncate">{v.desc}</div></div>
                    </button>
                  );
                })}
              </div>
              {!hasDx&&<p className="text-[11px] text-amber-700">Select at least one symptom to continue.</p>}
            </div>
          )}

          {step===2&&(
            <div className="space-y-4">
              <h2 className="text-base font-black" style={{color:C.navy}}>Optional Demographics</h2>
              <p className="text-xs text-gray-500">You can skip any field</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div><label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Age</label><input type="number" min="0" max="120" value={form.age} onChange={e=>setForm({...form,age:e.target.value})} className="w-full h-10 rounded-xl border-2 border-gray-200 px-3 text-sm focus:outline-none"/></div>
                <div><label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Weight (lbs)</label><input type="number" min="0" value={form.weight} onChange={e=>setForm({...form,weight:e.target.value})} className="w-full h-10 rounded-xl border-2 border-gray-200 px-3 text-sm focus:outline-none"/></div>
                <div><label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Gender</label><select value={form.gender} onChange={e=>setForm({...form,gender:e.target.value})} className="w-full h-10 rounded-xl border-2 border-gray-200 px-3 text-sm focus:outline-none bg-white"><option value="">Select...</option>{GENDER_OPTIONS.map(l=><option key={l}>{l}</option>)}</select></div>
                <div><label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Education</label><select value={form.education} onChange={e=>setForm({...form,education:e.target.value})} className="w-full h-10 rounded-xl border-2 border-gray-200 px-3 text-sm focus:outline-none bg-white"><option value="">Select...</option>{EDUCATION_LEVELS.map(l=><option key={l}>{l}</option>)}</select></div>
              </div>
              <div><label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Race / Ethnicity</label><select value={form.raceEthnicity} onChange={e=>setForm({...form,raceEthnicity:e.target.value})} className="w-full h-10 rounded-xl border-2 border-gray-200 px-3 text-sm focus:outline-none bg-white"><option value="">Select...</option>{RACE_ETHNICITY_OPTIONS.map(l=><option key={l}>{l}</option>)}</select></div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Time Zone</label>
                <select value={form.timezone||defaultTimeZone} onChange={e=>setForm({...form,timezone:e.target.value})} className="w-full h-10 rounded-xl border-2 border-gray-200 px-3 text-sm focus:outline-none bg-white">
                  {COMMON_TIMEZONES.map(z=><option key={z.value} value={z.value}>{z.label}</option>)}
                </select>
              </div>
            </div>
          )}

          <div className="flex gap-3 mt-5">
            {step>0&&<button onClick={()=>setStep(step-1)} className="flex-1 h-11 rounded-2xl border-2 border-gray-200 bg-white text-sm font-bold text-gray-600">Back</button>}
            {step<2&&<button onClick={()=>setStep(step+1)} disabled={(step===0&&!canContinueProfile)||(step===1&&!hasDx)} className="flex-1 h-11 rounded-2xl text-white font-bold text-sm disabled:opacity-50" style={{background:`linear-gradient(135deg,${C.cyan},${C.navy})`}}>Continue</button>}
            {step===2&&<button onClick={complete} className="flex-1 h-11 rounded-2xl text-white font-bold text-sm" style={{background:`linear-gradient(135deg,${C.cyan},${C.navy})`}}>Complete Setup</button>}
          </div>
        </Card>
      </div>
    </div>
  );
}

function AuthLandingScreen({hasAccount,onChooseLogin,onChooseCreate}){
  return(
    <div className={cn("min-h-screen pb-10",BG)}>
      <div className="max-w-md mx-auto p-6">
        <Card className="p-6 text-center">
          <h1 className="text-2xl font-black mb-1" style={{color:C.navy}}>Welcome to PelviStim</h1>
          <p className="text-sm text-gray-500 mb-6">{hasAccount?"Sign in or create another account":"Get started by creating your account"}</p>
          <div className="space-y-3">
            <button onClick={onChooseLogin} disabled={!hasAccount} className="w-full h-11 rounded-2xl text-white font-bold text-sm disabled:opacity-50" style={{background:`linear-gradient(135deg,${C.cyan},${C.navy})`}}>Log In</button>
            <button onClick={onChooseCreate} className="w-full h-11 rounded-2xl border-2 border-gray-200 bg-white font-bold text-sm text-gray-700 hover:bg-gray-50">Create New Account</button>
          </div>
        </Card>
      </div>
    </div>
  );
}

function LoginScreen({onLogin,onBackToStart}){
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState("");
  const submit=()=>{
    const ok=onLogin(email,password);
    if(ok){
      setError("");
      return;
    }
    setError("Incorrect email or password.");
  };
  return(
    <div className={cn("min-h-screen pb-10",BG)}>
      <div className="max-w-md mx-auto p-6">
        <Card className="p-6">
          <h1 className="text-2xl font-black mb-1" style={{color:C.navy}}>Log In</h1>
          <p className="text-sm text-gray-500 mb-5">Sign in to continue</p>
          <div className="space-y-3">
            <div><label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Email</label><input type="email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full h-10 rounded-xl border-2 border-gray-200 px-3 text-sm focus:outline-none"/></div>
            <div><label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Password</label><input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full h-10 rounded-xl border-2 border-gray-200 px-3 text-sm focus:outline-none"/></div>
            {error&&<p className="text-xs text-red-600">{error}</p>}
            <button onClick={submit} className="w-full h-11 rounded-2xl text-white font-bold text-sm" style={{background:`linear-gradient(135deg,${C.cyan},${C.navy})`}}>Log In</button>
            <button onClick={onBackToStart} className="w-full h-10 rounded-xl border-2 border-gray-200 bg-white text-xs font-bold text-gray-600 hover:bg-gray-50">Back</button>
          </div>
        </Card>
      </div>
    </div>
  );
}

function IntroCoachmark({step,total,onNext,onSkip,actionRequired=false,actionLabel=""}){
  const isLast=step===total-1;
  const steps=[
    {title:"Guides",body:"Start here: complete the guides in order (Learn, Device Setup, Calibration).",pos:"bottom-28 left-3"},
    {title:"Start Stimulation",body:"Tap Start Session on Home to begin the guided setup.",pos:"bottom-40 left-1/2 -translate-x-1/2"},
    {title:"Adjust Intensity",body:"Use + or − to change intensity at least once.",pos:"bottom-28 right-3"},
    {title:"Confirm Sensations",body:"Check both sensation boxes to continue.",pos:"bottom-28 right-3"},
    {title:"Continue",body:"Now tap Continue to move to presets.",pos:"bottom-28 right-3"},
    {title:"Customize Preset",body:"Tap Customize, then edit duration or frequency.",pos:"bottom-28 right-3"},
    {title:"Start Button",body:"Tap Start Session to finish this tutorial. No stimulation will start.",pos:"bottom-28 right-3"},
    {title:"Open Diary Day",body:"Tap a date in the diary calendar to create or open an entry.",pos:"bottom-28 right-20"},
    {title:"Log Symptoms",body:"Now add at least one symptom value using + or -.",pos:"bottom-28 right-20"},
    {title:"Settings",body:"Use Settings for profile, reminders, and logout.",pos:"bottom-28 right-2"},
  ];
  const s=steps[step]||steps[0];
  return(
    <div className="fixed inset-0 z-[120] pointer-events-none">
      <div className={cn("absolute pointer-events-auto flex items-end gap-2 max-w-[calc(100%-1rem)]",s.pos)}>
        <div className="relative rounded-2xl border border-gray-200 bg-white shadow-lg p-4 w-[min(360px,calc(100vw-5.5rem))]">
          <div className="absolute -bottom-1.5 left-5 h-3 w-3 rotate-45 bg-white border-r border-b border-gray-200"/>
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="font-black text-xl leading-tight" style={{color:C.navy}}>{s.title}</h3>
              <p className="text-lg text-gray-700 mt-2 leading-snug">{s.body}</p>
            </div>
            <button onClick={onSkip} className="text-sm font-bold text-gray-500 hover:underline shrink-0">Skip</button>
          </div>
          <div className="flex items-center justify-between mt-3.5">
            <span className="text-sm text-gray-500">Step {step+1} of {total}</span>
            {actionRequired?(
              <span className="text-sm font-bold px-2.5 py-1.5 rounded-lg" style={{background:`${C.peach}35`,color:C.peachDark}}>{actionLabel||"Complete the highlighted action"}</span>
            ):(
              <button onClick={onNext} className="h-10 px-4 rounded-xl text-white text-base font-bold" style={{background:`linear-gradient(135deg,${C.cyan},${C.navy})`}}>{isLast?"Finish":"Next"}</button>
            )}
          </div>
        </div>
        <div className="h-12 w-12 rounded-full border-2 border-white shadow-md flex items-center justify-center" style={{background:`linear-gradient(135deg,${C.cyan}25,${C.mint}25)`}}>
          <div className="h-8 w-8 rounded-full bg-white/95 border border-gray-200 relative">
            <div className="absolute top-2 left-2 h-1.5 w-1.5 rounded-full bg-gray-700"/>
            <div className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-gray-700"/>
            <div className="absolute left-1/2 -translate-x-1/2 bottom-2 h-2 w-4 border-b-2 border-gray-700 rounded-b-full"/>
          </div>
        </div>
      </div>
    </div>
  );
}

function TourFocusOverlay({active=false}){
  if(!active) return null;
  return null;
}

// ─── Reminder Popup ───────────────────────────────────────────────────────────
function ReminderPopup({alarm,onDismiss,onStartSession,use24}){
  const isAutostart=alarm.alarmType==="autostart";
  return(
    <div className="fixed inset-0 flex items-center justify-center z-[100] p-6" style={{background:"rgba(0,0,0,0.45)",backdropFilter:"blur(4px)"}}>
      <Card className="w-full max-w-sm p-7 text-center">
        <div className="mx-auto h-16 w-16 rounded-full flex items-center justify-center mb-4" style={{background:isAutostart?`${C.mint}20`:`${C.cyan}20`}}>
          {isAutostart?<Timer className="w-8 h-8" style={{color:C.mint}}/>:<Bell className="w-8 h-8" style={{color:C.cyan}}/>}
        </div>
        <h2 className="text-xl font-black mb-1" style={{color:C.navy}}>{isAutostart?"Session Starting":"Session Reminder"}</h2>
        <p className="text-gray-500 text-sm mb-1">{alarm.label}</p>
        <p className="text-gray-400 text-xs mb-6">{isAutostart?`Scheduled for ${fmtAlarmTime(alarm.time,use24)} — tap to begin.`:`Session at ${fmtAlarmTime(alarm.time,use24)} in ${alarm.leadMins||10} minutes.`}</p>
        <div className="space-y-2">
          <button onClick={onStartSession} className="w-full h-11 rounded-2xl text-white font-bold text-sm flex items-center justify-center gap-2" style={{background:`linear-gradient(135deg,${C.cyan},${C.navy})`}}><Play className="w-4 h-4"/>Start Session Now</button>
          <button onClick={onDismiss} className="w-full h-11 rounded-2xl border-2 border-gray-200 text-sm font-semibold text-gray-500 hover:bg-gray-50">Dismiss</button>
        </div>
      </Card>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App(){
  const AUTH_STORAGE_KEY="pelvistim_auth_v1";
  const ACCOUNT_STORAGE_VERSION=2;
  const [screen,setScreen]=useState("welcome");
  const [sessions,setSessions]=useState([]);
  const [diaryEntries,setDiaryEntries]=useState([]);
  const [presets,setPresets]=useState([]);
  const [alarms,setAlarms]=useState(DEFAULT_ALARMS);
  const [intensity,setIntensity]=useState(5.0);
  const [duration,setDuration]=useState(30);
  const [frequency,setFrequency]=useState(10);
  const [lastStart,setLastStart]=useState(new Date());
  const [lastEnd,setLastEnd]=useState(new Date());
  const [guidesInit,setGuidesInit]=useState("menu");
  const [pausedSession,setPausedSession]=useState(null);
  const [activeReminder,setActiveReminder]=useState(null);
  const [accounts,setAccounts]=useState([]);
  const [currentUserId,setCurrentUserId]=useState(null);
  const [authProfile,setAuthProfile]=useState(null);
  const [storedSettings,setStoredSettings]=useState(null);
  const [onboardingComplete,setOnboardingComplete]=useState(false);
  const [isAuthenticated,setIsAuthenticated]=useState(false);
  const [introDone,setIntroDone]=useState(false);
  const [tourStep,setTourStep]=useState(null);
  const [,setTourProgress]=useState({intensityAdjusted:false,electrodeChecked:false,spreadChecked:false,customOpened:false,customEdited:false});
  const [authStep,setAuthStep]=useState("start");
  const [settings,setSettings]=useState({name:"",email:"",age:"",weight:"",gender:"",education:"",raceEthnicity:"",timezone:defaultTimeZone,use24:false,pfdTypes:{urge:false,urgency:false,frequency:false,hesitancy:false,fecal:false,constipation:false,pelvicPain:false}});

  const use24=settings.use24||false;
  const isTourActive=tourStep!==null;

  useEffect(()=>{
    try{
      const raw=localStorage.getItem(AUTH_STORAGE_KEY);
      if(!raw) return;
      const parsed=JSON.parse(raw);
      if(Array.isArray(parsed?.accounts)){
        setAccounts(parsed.accounts);
        setCurrentUserId(parsed.currentUserId||null);
        if(parsed.accounts.length>0) setAuthStep("start");
        return;
      }

      // Backward compatibility for single-account storage shape.
      if(parsed?.profile){
        const migratedSettings={...(parsed.settings||{})};
        if(!migratedSettings.timezone) migratedSettings.timezone=defaultTimeZone;
        const migrated={
          id:`acct_${Date.now()}`,
          profile:parsed.profile,
          settings:migratedSettings,
          onboardingComplete:!!parsed.onboardingComplete,
          introDone:parsed.introDone ?? !!parsed.onboardingComplete,
          sessions:Array.isArray(parsed.sessions)?parsed.sessions:[],
          diaryEntries:Array.isArray(parsed.diaryEntries)?parsed.diaryEntries:[],
          presets:Array.isArray(parsed.presets)?parsed.presets:[],
          alarms:Array.isArray(parsed.alarms)?parsed.alarms:DEFAULT_ALARMS,
        };
        setAccounts([migrated]);
        setCurrentUserId(migrated.id);
        setAuthStep("start");
      }
    }catch{}
  },[]);

  useEffect(()=>{
    if(!currentUserId||!authProfile) return;
    setAccounts(prev=>{
      const next=[...prev];
      const idx=next.findIndex(a=>a.id===currentUserId);
      const payload={
        id:currentUserId,
        profile:authProfile,
        settings:storedSettings,
        onboardingComplete,
        introDone,
        sessions,
        diaryEntries,
        presets,
        alarms,
      };
      if(idx>=0) next[idx]=payload;
      else next.push(payload);
      return next;
    });
  },[currentUserId,authProfile,storedSettings,onboardingComplete,introDone,sessions,diaryEntries,presets,alarms]);

  useEffect(()=>{
    try{
      localStorage.setItem(AUTH_STORAGE_KEY,JSON.stringify({
        version:ACCOUNT_STORAGE_VERSION,
        currentUserId,
        accounts,
      }));
    }catch{}
  },[currentUserId,accounts]);

  useEffect(()=>{
    if(!isAuthenticated) return;
    const firedKeys=new Set();
    const tick=()=>{
      const tz=settings.timezone||defaultTimeZone;
      const now=new Date();
      const zp=getZonedParts(now,tz);
      const currentMinuteKey=`${ymd(zp.year,zp.month,zp.day)} ${two(zp.hour)}:${two(zp.minute)}`;
      for(const a of alarms){
        if(!a?.active||!a.time) continue;
        const {hour,minute,dayShift}=getTriggerSpec(a);
        if(zp.hour!==hour||zp.minute!==minute) continue;

        if(a.isRecurring!==false){
          const sessionDay=(zp.weekday-dayShift+7)%7;
          if(!a.days?.[sessionDay]) continue;
        }else{
          if(!a.oneTimeDate) continue;
          const sessionDate=addDaysToYmd(zp.year,zp.month,zp.day,-dayShift);
          if(sessionDate!==a.oneTimeDate) continue;
        }

        const key=`${a.id}|${currentMinuteKey}`;
        if(firedKeys.has(key)) continue;
        firedKeys.add(key);
        setActiveReminder(a);
      }
    };
    tick();
    const t=setInterval(tick,20000);
    return()=>clearInterval(t);
  },[isAuthenticated,alarms,settings.timezone]);

  const handleSaveSettings=(s)=>{setSettings(s);setStoredSettings(s);};

  const handleOnboardingComplete=({profile,settings:setupSettings})=>{
    const accountId=`acct_${Date.now()}`;
    const existingIdx=accounts.findIndex(a=>String(a.profile?.email||"").toLowerCase()===profile.email.toLowerCase());
    const newAccount={
      id:accountId,
      profile,
      settings:setupSettings,
      onboardingComplete:true,
      introDone:false,
      sessions:[],
      diaryEntries:[],
      presets:[],
      alarms:DEFAULT_ALARMS,
    };
    if(existingIdx>=0){
      setAccounts(prev=>prev.map((a,i)=>i===existingIdx?newAccount:a));
    }else{
      setAccounts(prev=>[...prev,newAccount]);
    }
    setCurrentUserId(accountId);
    setAuthProfile(profile);
    setSettings(prev=>({
      ...prev,
      ...setupSettings,
      email:profile.email,
      name:`${profile.firstName} ${profile.lastName}`.trim(),
      pfdTypes:setupSettings.pfdTypes||prev.pfdTypes,
    }));
    setStoredSettings(setupSettings);
    setSessions([]);
    setDiaryEntries([]);
    setPresets([]);
    setAlarms(DEFAULT_ALARMS);
    setOnboardingComplete(true);
    setIsAuthenticated(true);
    setIntroDone(false);
    setTourStep(0);
    setTourProgress({intensityAdjusted:false,electrodeChecked:false,spreadChecked:false,customOpened:false,customEdited:false});
    setScreen("guides");
    setGuidesInit("menu");
    setAuthStep("start");
  };

  const handleLogin=(email,password)=>{
    const account=accounts.find(a=>
      String(a.profile?.email||"").toLowerCase()===String(email||"").trim().toLowerCase()&&
      a.profile?.password===password
    );
    if(!account) return false;

    setCurrentUserId(account.id);
    setAuthProfile(account.profile||null);
    setStoredSettings(account.settings||null);
    if(account.settings){
      setSettings(prev=>({
        ...prev,
        ...account.settings,
        email:account.profile?.email||account.settings.email||prev.email,
        name:account.settings.name||`${account.profile?.firstName||""} ${account.profile?.lastName||""}`.trim(),
        timezone:account.settings.timezone||defaultTimeZone,
      }));
    }else{
      setSettings(prev=>({
        ...prev,
        email:account.profile?.email||prev.email,
        name:`${account.profile?.firstName||""} ${account.profile?.lastName||""}`.trim()||prev.name,
        timezone:prev.timezone||defaultTimeZone,
      }));
    }
    setSessions(Array.isArray(account.sessions)?account.sessions:[]);
    setDiaryEntries(Array.isArray(account.diaryEntries)?account.diaryEntries:[]);
    setPresets(Array.isArray(account.presets)?account.presets:[]);
    setAlarms(Array.isArray(account.alarms)?account.alarms:DEFAULT_ALARMS);
    setOnboardingComplete(!!account.onboardingComplete);
    setIntroDone(account.introDone ?? !!account.onboardingComplete);
    setIsAuthenticated(true);
    setScreen("welcome");
    return true;
  };

  const finishTour=()=>{
    setTourStep(null);
    setIntroDone(true);
    setScreen("welcome");
  };

  const handleReplayIntro=()=>{
    setIntroDone(false);
    setTourStep(0);
    setTourProgress({intensityAdjusted:false,electrodeChecked:false,spreadChecked:false,customOpened:false,customEdited:false});
    setGuidesInit("menu");
    setScreen("guides");
  };

  const handleLogout=()=>{
    setIsAuthenticated(false);
    setAuthStep("start");
    setScreen("welcome");
    setTourStep(null);
    setActiveReminder(null);
  };

  const handleStartSession=()=>{
    if(isTourActive){
      if(tourStep===1){
        setTourStep(2);
        setScreen("precheck");
      }
      return;
    }
    setScreen("precheck");
  };

  const handleTourIntensityChange=(value)=>{
    if(!isTourActive||tourStep!==2) return;
    if(value!==1.0){
      setTourProgress(p=>({...p,intensityAdjusted:true}));
      setTourStep(3);
    }
  };

  const handleTourCheckboxChange=(key,checked)=>{
    if(!isTourActive||(tourStep!==3&&tourStep!==4)) return;
    setTourProgress(p=>{
      const next={...p};
      if(key==="electrode") next.electrodeChecked=checked;
      if(key==="spread") next.spreadChecked=checked;
      if(next.electrodeChecked&&next.spreadChecked&&tourStep===3) setTourStep(4);
      return next;
    });
  };

  const handleTourPrecheckContinue=({intensity,canContinue})=>{
    if(!isTourActive||tourStep!==4) return false;
    if(!canContinue) return true;
    setIntensity(intensity);
    setTourStep(5);
    setScreen("preset");
    return true;
  };

  const handleTourCustomizeOpen=()=>{
    if(!isTourActive||tourStep!==5) return;
    setTourProgress(p=>({...p,customOpened:true}));
  };

  const handleTourCustomEdit=(field,val)=>{
    if(!isTourActive||tourStep!==5) return;
    if((field==="duration"&&val!=="30")||(field==="frequency"&&val!=="10")){
      setTourProgress(p=>({...p,customEdited:true}));
      setTourStep(6);
    }
  };

  const handleTourStartFromPreset=()=>{
    if(!isTourActive||tourStep!==6) return false;
    setTourStep(7);
    setScreen("diary");
    return true;
  };

  const handleTourDiaryDayOpen=()=>{
    if(!isTourActive||tourStep!==7) return;
    setTourStep(8);
  };

  const handleTourDiarySymptomLog=(field,value)=>{
    if(!isTourActive||tourStep!==8) return;
    if(typeof value==="number"&&value>0){
      setTourStep(9);
      setScreen("settings");
    }
  };

  const handleTourGuidesComplete=()=>{
    if(!isTourActive||tourStep!==0) return;
    setTourStep(1);
    setScreen("welcome");
  };

  const nextTourStep=()=>{
    if(tourStep===null) return;
    if([0,1,2,3,4,5,6,7,8].includes(tourStep)) return;
    if(tourStep>=9){finishTour();return;}
    setTourStep(tourStep+1);
  };

  useEffect(()=>{
    if(!isAuthenticated||tourStep===null) return;
    if(tourStep===0){
      setScreen("guides");
      setGuidesInit("learn");
      return;
    }
    if(tourStep===1){setScreen("welcome");return;}
    if(tourStep===2||tourStep===3||tourStep===4){setScreen("precheck");return;}
    if(tourStep===5||tourStep===6){setScreen("preset");return;}
    if(tourStep===7||tourStep===8){setScreen("diary");return;}
    if(tourStep===9){setScreen("settings");}
  },[isAuthenticated,tourStep]);

  const nav=useCallback((key)=>{
    if(isTourActive&&[0,1,2,3,4,5,6,7,8].includes(tourStep??-1)) return;
    if(key==="today")setScreen("welcome");
    else if(key==="start-session"){if(isTourActive)return;setScreen("precheck");}
    else if(key==="guides"){setGuidesInit("menu");setScreen("guides");}
    else if(key==="settings")setScreen("settings");
    else if(key==="schedule")setScreen("schedule");
    else if(key==="diary")setScreen("diary");
  },[isTourActive,tourStep]);

  if(!isAuthenticated){
    if(authStep==="start"){
      return <AuthLandingScreen hasAccount={accounts.length>0} onChooseLogin={()=>setAuthStep("login")} onChooseCreate={()=>setAuthStep("create")}/>;
    }
    if(authStep==="create"){
      return <OnboardingScreen onComplete={handleOnboardingComplete}/>;
    }
    return <LoginScreen onLogin={handleLogin} onBackToStart={()=>setAuthStep("start")}/>;
  }

  return(
    <div className="h-full w-full overflow-auto" style={{fontFamily:"'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif"}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,700;0,9..40,800;0,9..40,900&display=swap');`}</style>

      {activeReminder&&<ReminderPopup alarm={activeReminder} onDismiss={()=>setActiveReminder(null)} onStartSession={()=>{setActiveReminder(null);handleStartSession();}} use24={use24}/>}

      {screen==="welcome"&&<WelcomeScreen onStartSession={handleStartSession} onResumeSession={()=>{if(pausedSession){setDuration(pausedSession.duration);setFrequency(pausedSession.frequency);setIntensity(pausedSession.intensity);setScreen("session-resume");}}} pausedSession={pausedSession} onNav={nav} sessions={sessions} diaryEntries={diaryEntries} onOpenCalendar={()=>setScreen("calendar")} use24={use24} isTourActive={isTourActive} tourStep={tourStep}/>}
      {screen==="calendar"&&<UnifiedCalendar onBack={()=>setScreen("welcome")} onNav={nav} sessions={sessions} diaryEntries={diaryEntries} use24={use24}/>}
      {screen==="schedule"&&<ScheduleScreen onNav={nav} alarms={alarms} onUpdateAlarms={setAlarms} use24={use24}/>}
      {screen==="diary"&&<DiaryScreen
        onNav={nav}
        settings={settings}
        diaryEntries={diaryEntries}
        onSaveDiary={setDiaryEntries}
        use24={use24}
        isTourActive={isTourActive}
        tourStep={tourStep}
        onTourDayOpen={handleTourDiaryDayOpen}
        onTourSymptomLog={handleTourDiarySymptomLog}
      />}

      {/* Precheck: two guide buttons route to session-context guide screens */}
      {screen==="precheck"&&<PreCheckScreen
        onComplete={i=>{setIntensity(i);setScreen("preset");}}
        onBack={()=>setScreen("welcome")}
        onNav={nav}
        onViewDeviceSetup={()=>setScreen("guides-session-setup")}
        onViewCalibrationGuide={()=>setScreen("guides-session-cal")}
        isTourActive={isTourActive}
        tourStep={tourStep}
        onTourIntensityChange={handleTourIntensityChange}
        onTourCheckboxChange={handleTourCheckboxChange}
        onTourContinue={handleTourPrecheckContinue}
      />}

      {screen==="preset"&&<PresetScreen
        onStart={(d,f,i)=>{setDuration(d);setFrequency(f);setIntensity(i);setScreen("session");}}
        onBack={()=>setScreen("precheck")}
        initialIntensity={intensity}
        presets={presets}
        onNav={nav}
        isTourActive={isTourActive}
        tourStep={tourStep}
        onTourCustomizeOpen={handleTourCustomizeOpen}
        onTourCustomEdit={handleTourCustomEdit}
        onTourStartSession={handleTourStartFromPreset}
      />}
      {screen==="session"&&<SessionScreen onComplete={(s,e,complete)=>{setLastStart(s);setLastEnd(e);setSessions(p=>[...p,{timestamp:new Date(),complete}]);setPausedSession(null);setScreen("complete");}} onPause={ps=>{setPausedSession(ps);setScreen("welcome");}} duration={duration} frequency={frequency} initialIntensity={intensity} onNav={nav}/>}
      {screen==="session-resume"&&pausedSession&&<SessionScreen onComplete={(s,e,complete)=>{setLastStart(s);setLastEnd(e);setSessions(p=>[...p,{timestamp:new Date(),complete}]);setPausedSession(null);setScreen("complete");}} onPause={ps=>{setPausedSession(ps);setScreen("welcome");}} duration={pausedSession.duration} frequency={pausedSession.frequency} initialIntensity={pausedSession.intensity} initialRemaining={pausedSession.remaining} onNav={nav}/>}
      {screen==="complete"&&<CompleteScreen onHome={()=>setScreen("welcome")} startTime={lastStart} endTime={lastEnd} onNav={nav} use24={use24}/>}

      {/* Guides accessed from main nav — normal back behavior */}
      {screen==="guides"&&(
        isTourActive&&tourStep===0
          ? <GuidesScreen key={`guides-tour-${tourStep}`} onBack={()=>setScreen("welcome")} onNav={nav} initialSection="learn" onReplayIntro={isAuthenticated?handleReplayIntro:undefined} forceSequence onTourGuidesComplete={handleTourGuidesComplete}/>
          : <GuidesScreen key={`guides-${guidesInit}-${tourStep===null?"normal":tourStep}`} onBack={()=>setScreen("welcome")} onNav={nav} initialSection={guidesInit} onReplayIntro={isAuthenticated?handleReplayIntro:undefined}/>
      )}

      {/* Guides accessed from precheck — exit returns to precheck */}
      {screen==="guides-session-setup"&&<GuidesScreen
        onBack={()=>setScreen("precheck")}
        onNav={nav}
        initialSection="device-setup"
        fromSession={true}
        onBackToSession={()=>setScreen("precheck")}
      />}
      {screen==="guides-session-cal"&&<GuidesScreen
        onBack={()=>setScreen("precheck")}
        onNav={nav}
        initialSection="calibration"
        fromSession={true}
        onBackToSession={()=>setScreen("precheck")}
      />}

      {screen==="settings"&&<SettingsScreen onNav={nav} settings={settings} onSave={handleSaveSettings} presets={presets} onUpdatePresets={setPresets} onLogout={handleLogout}/>}
      {tourStep!==null&&<IntroCoachmark
        step={tourStep}
        total={10}
        onNext={nextTourStep}
        onSkip={finishTour}
        actionRequired={[0,1,2,3,4,5,6,7,8].includes(tourStep)}
        actionLabel={
          tourStep===0?"Finish all 3 guides":
          tourStep===1?"Tap Start Session":
          tourStep===2?"Adjust intensity":
          tourStep===3?"Check both boxes":
          tourStep===4?"Tap Continue":
          tourStep===5?"Customize and edit values":
          tourStep===6?"Tap Start Session (simulated)":
          tourStep===7?"Tap a diary date":
          tourStep===8?"Log at least one symptom":
          ""
        }
      />}
      <TourFocusOverlay active={tourStep!==null&&[1,2,3,4,5,6,7,8].includes(tourStep)}/>
    </div>
  );
}
