import React, { useEffect, useRef, useState } from 'react';
import { CalendarDays, Menu, X, Instagram, ArrowRight, ChevronLeft, ChevronRight, MapPin, Diamond, Heart, Sparkles, Gift, Clock3, Feather, Layers, Droplets, Target, UserRound, Mail, Send, CheckCircle2, Maximize2 } from 'lucide-react';
import './styles.css';

const IG = 'https://www.instagram.com/deluxe.browstudio/';
const IMG = {
  hero: '/images/hero.jpg',
  artist: '/images/artist.jpg',
  logo: '/images/logo.jpg',
  tools: '/images/tools.jpg',
};
const SERVICES = [
  {id:'korrektur', name:'Augenbrauenkorrektur', short:'Augenbrauen-korrektur', old:30, promo:21, images:['/images/correction-1.jpg','/images/correction-2.jpg'], pair:'/images/correction-pair.jpg',
  description:'Professionelle Formgebung und präzise Korrektur für gepflegte, harmonische Brauen.',
  benefits:[['diamond','Perfekte Form & Symmetrie'],['sparkles','Gepflegter & klarer Look'],['heart','Betont deine natürliche Schönheit']], cta:'Termin für Korrektur buchen'},
  {id:'faerben',name:'Augenbrauenfärben',short:'Augenbrauen-färben',old:40,promo:28,images:['/images/tint-1.jpg','/images/tint-2.jpg'],pair:'/images/tint-pair.jpg',
  description:'Für mehr Ausdruck und Definition – durch sanftes Färben der Augenbrauen.',
  benefits:[['droplets','Intensiverer Brow-Look'],['sparkles','Mehr Definition'],['calendar','Langanhaltendes Ergebnis']],cta:'Termin zum Färben buchen'},
  {id:'laminierung',name:'Augenbrauenlaminierung',short:'Augenbrauen-laminierung',old:60,promo:42,images:['/images/lamination-1.jpg','/images/lamination-2.jpg'],pair:'/images/lamination-pair.jpg',
  description:'Für einen gelifteten, modernen und perfekt geformten Brow-Look – mit mehr Fülle, Struktur und einem gepflegten Finish.',
  benefits:[['layers','Gelifteter Brow-Effekt'],['diamond','Mehr Fülle & Struktur'],['sparkles','Gepflegter, moderner Look']],cta:'Termin zur Laminierung buchen'}
];
const ICONS = {diamond:Diamond,sparkles:Sparkles,heart:Heart,droplets:Droplets,calendar:CalendarDays,layers:Layers,target:Target,feather:Feather};
const formatDate = (d) => [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-');
const getToday = () => {const d=new Date();d.setHours(0,0,0,0);return d;};
function Logo({onClick}) {return <a className="brand" href="#home" onClick={onClick} aria-label="Deluxe Brow Studio, Startseite"><img src={IMG.logo} alt="Deluxe Brow Studio" /></a>}
function GoldButton({children,href='#booking',onClick,outline=false}) {return <a href={href} onClick={onClick} className={outline?'outline-button':'gold-button'}>{children}</a>}
function Divider(){return <div className="heart-divider" aria-hidden="true"><span/><Heart size={22}/><span/></div>}
function SectionLabel({children}){return <div className="section-label"><span/>{children}<span/></div>}
function Header(){
 const [open,setOpen]=useState(false);const closeRef=useRef(null);
 useEffect(()=>{if(!open)return;const old=document.body.style.overflow;document.body.style.overflow='hidden';const escape=e=>{if(e.key==='Escape')setOpen(false)};document.addEventListener('keydown',escape);closeRef.current?.focus();return()=>{document.body.style.overflow=old;document.removeEventListener('keydown',escape)}},[open]);
 return <>
 <header className="site-header"><button type="button" className="header-control" aria-label="Menü öffnen" aria-expanded={open} onClick={()=>setOpen(true)}><Menu/></button><Logo/><a className="header-control" aria-label="Zum Kalender" href="#booking"><CalendarDays/></a></header>
 <div className={'menu-overlay'+(open?' is-open':'')} role="dialog" aria-modal="true" aria-label="Hauptmenü" aria-hidden={!open}>
   <div className="menu-photo"/>
   <button type="button" ref={closeRef} className="menu-close" aria-label="Menü schließen" onClick={()=>setOpen(false)}><X/></button>
   <div className="menu-inner"><Logo onClick={()=>setOpen(false)}/>
   <nav className="menu-links">{[['home','Start'],['services','Leistungen'],['instagram','Instagram'],['preise','Preise & Weihnachtsrabatt'],['gutscheine','Gutscheine'],['about','Über Anastasia'],['booking','Termin buchen'],['contact','Kontakt']].map(([id,label])=><a key={id} href={'#'+id} onClick={()=>setOpen(false)} className={id==='booking'?'menu-book':''}>{label}</a>)}</nav>
   </div>
 </div>
 </>;
}
function Hero(){return <section id="home" className="hero">
   <img className="hero-bg" src={IMG.hero} alt="Anastasia bei einer Augenbrauenbehandlung" fetchPriority="high"/>
   <div className="hero-shade" aria-hidden="true"/>
   <div className="hero-spacer"/>
   <div className="hero-copy"><h1>Perfekte Brows<br/><em>mit Stil.</em></h1><p>Augenbrauenkorrektur, Augenbrauenfärben &amp;<br className="hero-break"/> Augenbrauenlaminierung in Hildesheim.</p><Divider/><GoldButton>Termin buchen</GoldButton><GoldButton outline href={IG}> <Instagram size={18}/> Instagram ansehen</GoldButton></div>
   <div className="hero-features">{[[Diamond,'Hochwertige Behandlungen'],[MapPin,'In Hildesheim'],[Heart,'Mit Leidenschaft für Brows']].map(([Icon,label])=><div key={label}><Icon/><span>{label}</span></div>)}</div>
 </section>}
function Lightbox({item,onClose}){
 useEffect(()=>{const old=document.body.style.overflow;document.body.style.overflow='hidden';const fn=e=>{if(e.key==='Escape')onClose()};document.addEventListener('keydown',fn);return()=>{document.body.style.overflow=old;document.removeEventListener('keydown',fn)}},[onClose]);
 return <div className="lightbox" role="dialog" aria-modal="true" aria-label={item.label} onClick={onClose}><button aria-label="Bild schließen" className="lightbox-close" onClick={onClose}><X/></button><img src={item.src} alt={item.label} onClick={e=>e.stopPropagation()}/><p>{item.label} · {item.generated?'KI-Visualisierung':'Foto aus dem Studio'}</p></div>
}
function Marquee({items,kind='services',duration='145s',onImageClick}){
 const trackRef=useRef(null);
 const frameRef=useRef(0);
 const offsetRef=useRef(0);
 const pausedRef=useRef(false);
 const [paused,setPaused]=useState(false);
 useEffect(()=>{
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  let previous=0;
  const speed=kind==='instagram'?11:13;
  const tick=(time)=>{
   const track=trackRef.current;
   if(track && !reduced.matches && !pausedRef.current && !document.hidden){
    const halfWidth=track.scrollWidth/2;
    if(halfWidth>0){
     const delta=previous?Math.min(time-previous,60):0;
     offsetRef.current=(offsetRef.current+delta*speed/1000)%halfWidth;
     track.style.transform='translate3d('+(-offsetRef.current)+'px,0,0)';
    }
   }
   previous=time;
   frameRef.current=requestAnimationFrame(tick);
  };
  frameRef.current=requestAnimationFrame(tick);
  return ()=>cancelAnimationFrame(frameRef.current);
 },[kind,items.length]);
 const pause=()=>{pausedRef.current=true;setPaused(true)};
 const resume=()=>{pausedRef.current=false;setPaused(false)};
 return <div className={'marquee-viewport marquee-'+kind+(paused?' is-paused':'')}
    onPointerDown={pause} onPointerUp={resume} onPointerCancel={resume}
    onPointerLeave={resume} onMouseEnter={pause} onMouseLeave={resume}
    onFocusCapture={pause} onBlurCapture={resume}>
   <div className="marquee-track" ref={trackRef}>
    {[0,1].map(repeat=><div className="marquee-group" key={repeat} aria-hidden={repeat===1?'true':undefined}>
     {items.map((item,i)=><button className="marquee-item" key={i} type="button"
       tabIndex={repeat===1?-1:0} onClick={()=>onImageClick(item)}
       aria-label={item.label+' vergrößern'}>
       <img loading="lazy" src={item.src} alt={repeat===1?'':item.label}/>
       <span>{item.label}</span><Maximize2 size={16} className="zoom-icon"/>
      </button>)}
    </div>)}
   </div>
  </div>;
}
function Services({openImage}){
 const items=SERVICES.flatMap(s=>s.images.map(src=>({src,label:s.name,generated:true})));
 return <section className="services-intro" id="services"><h2>Unsere Leistungen</h2><p className="italic-subtitle">Luxuriöse Behandlungen für perfekt geformte, ausdrucksstarke und gepflegte Brows.</p><Divider/><Marquee items={items} onImageClick={openImage}/><p className="carousel-hint">Automatisch gleitend · per Finger anhalten · antippen zum Vergrößern</p><GoldButton>Termin buchen</GoldButton><GoldButton outline href={IG}><Instagram size={18}/> Instagram ansehen</GoldButton></section>
}
function About({openImage}){
 const items=[{src:IMG.hero,label:'Brow Artist',generated:false},{src:IMG.artist,label:'Anastasia',generated:false},{src:IMG.tools,label:'Studio',generated:false},{src:'/images/correction-1.jpg',label:'Brow Look (KI)',generated:true},{src:'/images/tint-2.jpg',label:'Beauty Details (KI)',generated:true}];
 return <section id="about" className="about-section"><div className="about-card glow-panel"><img src={IMG.artist} loading="lazy" alt="Anastasia, Brow Artist im Deluxe Brow Studio"/><div><h2>Über<br/>Anastasia</h2><Divider/><p>Hallo, ich bin Anastasia, Brow Artist mit Leidenschaft für perfekt geformte, natürliche Augenbrauen.</p></div></div><div className="about-chips"><span><UserRound/> Brow Artist</span><span><Diamond/> Studio</span><span><Layers/> Arbeiten</span><span><MapPin/> Hildesheim</span></div><div id="instagram" className="instagram-section"><h2>Instagram</h2><Divider/><Marquee items={items} kind="instagram" duration="112s" onImageClick={openImage}/><GoldButton href={IG}><Instagram size={18}/> Instagram ansehen <ArrowRight size={18}/></GoldButton></div></section>
}
function Comparison({pair,name}){
 const[value,setValue]=useState(50);
 const wrapper=useRef(null);
 const dragging=useRef(false);
 function change(clientX){const box=wrapper.current?.getBoundingClientRect();if(!box)return;setValue(Math.max(0,Math.min(100,(clientX-box.left)/box.width*100)))}
 return <div className="comparison" ref={wrapper} role="group" aria-label={name+' KI Vorher-Nachher-Beispiel'}>
  <div className="comparison-half comparison-after" style={{backgroundImage:'url('+pair+')'}}/>
  <div className="comparison-half comparison-before" style={{backgroundImage:'url('+pair+')',clipPath:'inset(0 '+(100-value)+'% 0 0)'}}/>
  <span className="comparison-label comparison-label-left">Vorher</span><span className="comparison-label comparison-label-right">Nachher</span>
  <div className="comparison-handle" style={{left:value+'%'}} aria-hidden="true"><span><ChevronLeft size={15}/><ChevronRight size={15}/></span></div>
  <input type="range" min="0" max="100" value={Math.round(value)} onChange={e=>setValue(Number(e.target.value))} aria-label={'Vergleich von Vorher und Nachher für '+name} />
 </div>;
}
function ServiceSection({service,onBook}){
 return <section id={service.id} className="service-detail"><h2>{service.name}</h2><p className="italic-subtitle">{service.description}</p><Divider/><Comparison pair={service.pair} name={service.name}/><p className="visual-note">KI-Visualisierung zur Demonstration der Behandlung. Keine dokumentierten Kundenergebnisse.</p><div className="service-benefits glow-panel">{service.benefits.map(([icon,label])=>{const Icon=ICONS[icon];return <div key={label}><Icon/><span>{label}</span></div>})}</div><div className="service-pricing glow-panel"><span>Regulär <del>{service.old} €</del></span><span>Jetzt <strong>{service.promo} €</strong></span><b>−30%</b></div><GoldButton href="#booking" onClick={()=>onBook(service.name)}>{service.cta}</GoldButton></section>
}
function Prices({onBook}){
 return <section className="prices-section" id="preise"><h2>Preise &amp; Weihnachtsrabatt</h2><p className="italic-subtitle">Festliche Beauty-Angebote für perfekt geformte, gepflegte und ausdrucksstarke Brows.</p><Divider/><div className="price-list">{SERVICES.map(s=><a key={s.id} className="price-row glow-panel" href="#booking" onClick={()=>onBook(s.name)}><img src={s.images[0]} loading="lazy" alt={'KI-Motiv '+s.name}/><div><h3>{s.name}</h3><div className="price-values"><del>{s.old} €</del><strong>{s.promo} €</strong></div><span className="promo-badge"><Gift size={15}/> 30% Weihnachts- &amp; Neujahrsrabatt</span></div></a>)}</div><p className="visual-note">Die Preise und die Weihnachtsaktion stammen aus dem Designentwurf und sind noch nicht als aktuelle Angebote bestätigt.</p></section>
}
function Vouchers(){return <section className="vouchers-section" id="gutscheine"><h2>Gutscheine verschenken</h2><p className="italic-subtitle">Die perfekte Geschenkidee für Beauty-Liebhaberinnen – auch zu Weihnachten und Neujahr.</p><div className="gift-card glow-panel"><span className="gift-ribbon">✦</span><img src={IMG.logo} alt="Deluxe Brow Studio Logo" loading="lazy"/><h3>Beauty-Gutschein</h3><Divider/><span>AUGENBRAUEN · PFLEGE · STYLING</span></div><GoldButton href="#booking"><Gift size={19}/> Gutschein anfragen</GoldButton></section>}
function Calendar({date,setDate,month,setMonth}){
 const today=getToday();
 const first=(new Date(month.getFullYear(),month.getMonth(),1).getDay()+6)%7;
 const total=new Date(month.getFullYear(),month.getMonth()+1,0).getDate();
 const days=[...Array(first).fill(null),...Array.from({length:total},(_,i)=>i+1)];
 return <div className="calendar"><div className="month-heading"><button type="button" aria-label="Vorheriger Monat" onClick={()=>setMonth(new Date(month.getFullYear(),month.getMonth()-1,1))}><ChevronLeft/></button><strong>{new Intl.DateTimeFormat('de-DE',{month:'long',year:'numeric'}).format(month)}</strong><button type="button" aria-label="Nächster Monat" onClick={()=>setMonth(new Date(month.getFullYear(),month.getMonth()+1,1))}><ChevronRight/></button></div><div className="calendar-grid">{['Mo','Di','Mi','Do','Fr','Sa','So'].map(day=><b key={day}>{day}</b>)}{days.map((day,i)=>{const value=day?formatDate(new Date(month.getFullYear(),month.getMonth(),day)):'';const unavailable=!day||new Date(month.getFullYear(),month.getMonth(),day)<today;return <button type="button" key={i} className={date===value?'selected':''} disabled={unavailable} onClick={()=>setDate(value)}>{day||''}</button>})}</div></div>
}
function Booking({picked}){
 const[name,setName]=useState(''),[contact,setContact]=useState(''),[service,setService]=useState(''),[date,setDate]=useState(''),[time,setTime]=useState(''),[message,setMessage]=useState(''),[month,setMonth]=useState(()=>new Date(getToday().getFullYear(),getToday().getMonth(),1)),[status,setStatus]=useState(''),[sending,setSending]=useState(false);
 useEffect(()=>{if(picked)setService(picked)},[picked]);
 const times=['09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00'];
 const contactValid=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.trim())||contact.replace(/\D/g,'').length>=7;
 const submit=async e=>{e.preventDefault();if(!name.trim()||!contactValid||!service||!date||!time){setStatus('Bitte alle Pflichtfelder ausfüllen und eine gültige Telefonnummer oder E-Mail eingeben.');return}
  setSending(true);setStatus('');
  try{const fields=new URLSearchParams({'form-name':'booking',name:name.trim(),contact:contact.trim(),service,date,time,message});
    const result=await fetch('/',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:fields.toString()});
    if(!result.ok)throw new Error('HTTP '+result.status);
    setName('');setContact('');setService('');setDate('');setTime('');setMessage('');const current=getToday();setMonth(new Date(current.getFullYear(),current.getMonth(),1));setStatus('Deine Anfrage wurde gesendet. Wir melden uns bei dir. Der Termin ist noch nicht bestätigt.');
  }catch{setStatus('Die Anfrage konnte nicht gesendet werden. Bitte versuche es erneut oder kontaktiere uns über Instagram.')}finally{setSending(false)}
 };
 return <section id="booking" className="booking-section"><h2>Termin buchen</h2><Divider/><form name="booking" className="booking-form glow-panel" onSubmit={submit}><input type="hidden" name="form-name" value="booking"/><label><UserRound/> Name *<input name="name" placeholder="Ihr vollständiger Name" autoComplete="name" value={name} onChange={e=>setName(e.target.value)} required maxLength={100}/></label><label><Mail/> Telefonnummer oder E-Mail *<input name="contact" placeholder="+49 151 12345678 oder name@beispiel.de" value={contact} onChange={e=>setContact(e.target.value)} required maxLength={150}/></label><label><Layers/> Leistung *<select name="service" value={service} onChange={e=>setService(e.target.value)} required><option value="">Bitte Leistung auswählen</option>{SERVICES.map(s=><option key={s.id} value={s.name}>{s.name}</option>)}</select></label><div className="booking-chooser"><div><div className="chooser-title"><CalendarDays/> Datum *</div><Calendar date={date} setDate={d=>{setDate(d);setTime('')}} month={month} setMonth={d=>{setMonth(d);setDate('');setTime('')}}/></div><div><div className="chooser-title"><Clock3/> Uhrzeit *</div><div className="time-grid">{times.map(slot=><button type="button" key={slot} disabled={!date} className={time===slot?'selected':''} onClick={()=>setTime(slot)}>{slot}</button>)}</div></div></div><label><Send/> Nachricht (optional)<textarea name="message" value={message} onChange={e=>setMessage(e.target.value)} maxLength={500} rows={3} placeholder="Wünsche, Hinweise oder Fragen ..."/></label><button disabled={sending} className="gold-button submit-button" type="submit"><Send size={20}/>{sending?'Wird gesendet ...':'Anfrage senden'}</button>{status&&<p role="status" className="form-status">{status}</p>}<p className="form-footnote">Nach erfolgreichem Senden werden alle Felder und die Terminauswahl zurückgesetzt. Angezeigte Zeiten sind unverbindliche Wunschzeiten, keine Live-Verfügbarkeit.</p></form></section>
}
function Footer(){return <footer id="contact"><a href={IG} target="_blank" rel="noreferrer"><Instagram/> @deluxe.browstudio</a><span><MapPin/> Hildesheim, Germany</span><small>© {new Date().getFullYear()} Deluxe Brow Studio · Konzeptansicht</small></footer>}
export default function App(){
 const[lightbox,setLightbox]=useState(null),[selectedService,setSelectedService]=useState('');
 return <><Header/><main><Hero/><Services openImage={setLightbox}/><About openImage={setLightbox}/>{SERVICES.map(s=><ServiceSection key={s.id} service={s} onBook={setSelectedService}/>)}<Prices onBook={setSelectedService}/><Vouchers/><Booking picked={selectedService}/><Footer/></main>{lightbox&&<Lightbox item={lightbox} onClose={()=>setLightbox(null)}/>}</>
}
