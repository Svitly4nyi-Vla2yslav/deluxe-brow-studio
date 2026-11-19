import React, { useEffect, useRef, useState } from "react";
import {
  CalendarDays,
  Menu,
  X,
  Instagram,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Diamond,
  Heart,
  Sparkles,
  Gift,
  Clock3,
  Feather,
  Layers,
  Droplets,
  Target,
  UserRound,
  Mail,
  Send,
  CheckCircle2,
  Maximize2,
  Volume2,
  VolumeX,
  Film,
} from "lucide-react";
import "./styles.css";

const IG = "https://www.instagram.com/deluxe.browstudio/";
const IMG = {
  hero: "/images/hero.jpg",
  artist: "/images/artist.jpg",
  logo: "/images/logo-transparent.png",
  tools: "/images/tools.jpg",
};
const SERVICES = [
  {
    id: "korrektur",
    name: "Augenbrauen-Korrektur",
    short: "Augenbrauen-korrektur",
    price: 15,
    images: ["/images/correction-1.jpg", "/images/correction-2.jpg"],
    pair: "/images/correction-pair.jpg",
    description:
      "Professionelle Formgebung und präzise Korrektur für gepflegte, harmonische Brauen.",
    benefits: [
      ["diamond", "Perfekte Form & Symmetrie"],
      ["sparkles", "Gepflegter & klarer Look"],
      ["heart", "Betont deine natürliche Schönheit"],
    ],
    cta: "Termin für Korrektur buchen",
  },
  {
    id: "faerben",
    name: "Augenbrauen-Färbung + Korrektur",
    short: "Augenbrauen-färbung + Korrektur",
    price: 30,
    images: ["/images/tint-1.jpg", "/images/tint-2.jpg"],
    pair: "/images/tint-pair.jpg",
    description:
      "Sanfte Farbintensivierung und präzise Korrektur für ausdrucksstarke Brauen.",
    benefits: [
      ["droplets", "Intensiverer Brow-Look"],
      ["sparkles", "Mehr Definition"],
      ["calendar", "Langanhaltendes Ergebnis"],
    ],
    cta: "Termin für Färbung + Korrektur buchen",
  },
  {
    id: "laminierung",
    name: "Augenbrauen-Laminierung",
    short: "Augenbrauen-laminierung",
    price: 30,
    images: ["/images/lamination-1.jpg", "/images/lamination-2.jpg"],
    pair: "/images/lamination-pair.jpg",
    description:
      "Für einen gelifteten, modernen und perfekt geformten Brow-Look – mit mehr Fülle, Struktur und einem gepflegten Finish.",
    benefits: [
      ["layers", "Gelifteter Brow-Effekt"],
      ["diamond", "Mehr Fülle & Struktur"],
      ["sparkles", "Gepflegter, moderner Look"],
    ],
    cta: "Termin zur Laminierung buchen",
  },
];
const COMBO_SERVICE = {
  id: "laminierung-faerbung",
  name: "Augenbrauen-Laminierung + Färbung",
  price: 40,
  images: ["/images/lamination-2.jpg"],
};
const PRICE_SERVICES = [SERVICES[2], SERVICES[1], COMBO_SERVICE, SERVICES[0]];
const ICONS = {
  diamond: Diamond,
  sparkles: Sparkles,
  heart: Heart,
  droplets: Droplets,
  calendar: CalendarDays,
  layers: Layers,
  target: Target,
  feather: Feather,
};
const formatDate = (d) =>
  [
    d.getFullYear(),
    String(d.getMonth() + 1).padStart(2, "0"),
    String(d.getDate()).padStart(2, "0"),
  ].join("-");
const getToday = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};
function Logo({ onClick }) {
  return (
    <a
      className="brand"
      href="#home"
      onClick={onClick}
      aria-label="Deluxe Brow Studio, Startseite"
    >
      <img src={IMG.logo} alt="Deluxe Brow Studio" />
    </a>
  );
}
function GoldButton({ children, href = "#booking", onClick, outline = false }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={outline ? "outline-button" : "gold-button"}
    >
      {children}
    </a>
  );
}
function Divider() {
  return (
    <div className="heart-divider" aria-hidden="true">
      <span />
      <Heart size={22} />
      <span />
    </div>
  );
}
function SectionLabel({ children }) {
  return (
    <div className="section-label">
      <span />
      {children}
      <span />
    </div>
  );
}
function Header() {
  const [open, setOpen] = useState(false);
  const closeRef = useRef(null);
  useEffect(() => {
    if (!open) return;
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const escape = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", escape);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = old;
      document.removeEventListener("keydown", escape);
    };
  }, [open]);
  const navigation = [
    ["services", "Leistungen"],
    ["about", "Über uns"],
    ["instagram", "Instagram"],
    ["preise", "Preise"],
    ["gutscheine", "Gutscheine"],
    ["booking", "Kontakt"],
  ];
  return (
    <>
      <header className="site-header">
        <button
          type="button"
          className="header-control mobile-menu-toggle"
          aria-label="Menü öffnen"
          aria-expanded={open}
          onClick={() => setOpen(true)}
        >
          <Menu />
        </button>
        <Logo />
        <nav className="desktop-nav" aria-label="Hauptnavigation">
          {navigation.map(([id, label]) => (
            <a key={id} href={"#" + id}>
              {label}
            </a>
          ))}
        </nav>
        <a
          className="header-control mobile-calendar-toggle"
          aria-label="Zum Kalender"
          href="#booking"
        >
          <CalendarDays />
        </a>
        <a className="desktop-book-button" href="#booking">
          <CalendarDays size={17} /> Termin buchen <ArrowRight size={16} />
        </a>
      </header>
      <div
        className={"menu-overlay" + (open ? " is-open" : "")}
        role="dialog"
        aria-modal="true"
        aria-label="Hauptmenü"
        aria-hidden={!open}
      >
        <div className="menu-photo" />
        <button
          type="button"
          ref={closeRef}
          className="menu-close"
          aria-label="Menü schließen"
          onClick={() => setOpen(false)}
        >
          <X />
        </button>
        <div className="menu-inner">
          <Logo onClick={() => setOpen(false)} />
          <nav className="menu-links">
            {[["home", "Start"], ...navigation].map(([id, label]) => (
              <a
                key={id}
                href={"#" + id}
                onClick={() => setOpen(false)}
                className={id === "booking" ? "menu-book" : ""}
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
function Hero() {
  return (
    <section id="home" className="hero">
      <picture className="hero-picture">
        <source media="(min-width: 1024px)" srcSet="/images/hero-desktop.jpg" />
        <img
          className="hero-bg"
          src="/images/hero-mobile.jpg"
          alt="Brow Artist bei einer Augenbrauenbehandlung – KI-optimiertes Fotomotiv"
          fetchPriority="high"
          decoding="async"
        />
      </picture>
      <div className="hero-shade" aria-hidden="true" />
      <div className="hero-spacer" />
      <div className="hero-copy">
        <h1>
          Perfekte Brows
          <br />
          <em>mit Stil.</em>
        </h1>
        <p>
          Augenbrauenkorrektur, Augenbrauenfärben &amp;
          <br className="hero-break" /> Augenbrauenlaminierung in Hildesheim.
        </p>
        <Divider />
        <GoldButton>Termin buchen</GoldButton>
        <GoldButton outline href={IG}>
          {" "}
          <Instagram size={18} /> Instagram ansehen
        </GoldButton>
      </div>
      <div className="hero-features">
        {[
          [Diamond, "Hochwertige Behandlungen"],
          [MapPin, "In Hildesheim"],
          [Heart, "Mit Leidenschaft für Brows"],
        ].map(([Icon, label]) => (
          <div key={label}>
            <Icon />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
function Lightbox({ item, onClose }) {
  useEffect(() => {
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const fn = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", fn);
    return () => {
      document.body.style.overflow = old;
      document.removeEventListener("keydown", fn);
    };
  }, [onClose]);
  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={item.label}
      onClick={onClose}
    >
      <button
        aria-label="Bild schließen"
        className="lightbox-close"
        onClick={onClose}
      >
        <X />
      </button>
      <img
        src={item.src}
        alt={item.label}
        onClick={(e) => e.stopPropagation()}
      />
      <p>
        {item.label} ·{" "}
        {item.generated ? "KI-Visualisierung" : "Foto aus dem Studio"}
      </p>
    </div>
  );
}
function Marquee({ items, kind = "services", onImageClick }) {
  const [holding, setHolding] = useState(false);
  useEffect(() => {
    const release = () => setHolding(false);
    window.addEventListener("pointerup", release);
    window.addEventListener("pointercancel", release);
    window.addEventListener("blur", release);
    return () => {
      window.removeEventListener("pointerup", release);
      window.removeEventListener("pointercancel", release);
      window.removeEventListener("blur", release);
    };
  }, []);
  return (
    <div
      className={
        "marquee-viewport marquee-" + kind + (holding ? " is-paused" : "")
      }
      aria-label={
        kind === "instagram"
          ? "Instagram Fotogalerie"
          : "Fotogalerie der Behandlungen"
      }
      onPointerDown={() => setHolding(true)}
      onPointerCancel={() => setHolding(false)}
    >
      <div className="marquee-track">
        {[0, 1].map((repeat) => (
          <div
            className="marquee-group"
            key={repeat}
            aria-hidden={repeat === 1 ? "true" : undefined}
          >
            {items.map((item, i) => (
              <button
                className="marquee-item"
                type="button"
                key={i}
                tabIndex={repeat === 1 ? -1 : 0}
                onClick={() => onImageClick(item)}
                aria-label={item.label + " vergrößern"}
              >
                <img
                  loading="lazy"
                  src={item.src}
                  alt={repeat === 1 ? "" : item.label}
                />
                <span>{item.label}</span>
                <Maximize2 size={16} className="zoom-icon" />
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
function Services({ openImage }) {
  const items = [
    ...SERVICES.flatMap((s) =>
      s.images.map((src) => ({ src, label: s.name, generated: true })),
    ),
    {
      src: "/images/studio-client-3089.jpg",
      label: "Brow Styling · Originalfoto",
      generated: false,
    },
    {
      src: "/images/studio-client-3389.jpg",
      label: "Brow Styling · Originalfoto",
      generated: false,
    },
  ];
  return (
    <section className="services-intro" id="services">
      <h2>Unsere Leistungen</h2>
      <p className="italic-subtitle">
        Luxuriöse Behandlungen für perfekt geformte, ausdrucksstarke und
        gepflegte Brows.
      </p>
      <Divider />
      <Marquee items={items} onImageClick={openImage} />
      <p className="carousel-hint">
        Automatisch gleitend · per Finger anhalten · antippen zum Vergrößern
      </p>
      <GoldButton>Termin buchen</GoldButton>
      <GoldButton outline href={IG}>
        <Instagram size={18} /> Instagram ansehen
      </GoldButton>
    </section>
  );
}
const ORIGINAL_REELS = [
  {
    src: "/videos/deluxe-01.webm",
    poster: "/images/deluxe-01.jpg",
    title: "Brow Moment 01",
    label: "Natürlich schön",
  },
  {
    src: "/videos/deluxe-02.webm",
    poster: "/images/deluxe-02.jpg",
    title: "Brow Moment 02",
    label: "Beauty Details",
  },
  {
    src: "/videos/deluxe-03.webm",
    poster: "/images/deluxe-03.jpg",
    title: "Brow Moment 03",
    label: "Brow Styling",
  },
  {
    src: "/videos/deluxe-04.webm",
    poster: "/images/deluxe-04.jpg",
    title: "Brow Moment 04",
    label: "Feine Details",
  },
  {
    src: "/videos/deluxe-05.webm",
    poster: "/images/deluxe-05.jpg",
    title: "Brow Moment 05",
    label: "Pure Eleganz",
  },
  {
    src: "/videos/deluxe-06.webm",
    poster: "/images/deluxe-06.jpg",
    title: "Brow Moment 06",
    label: "Studio Moments",
  },
  {
    src: "/videos/deluxe-07.webm",
    poster: "/images/deluxe-07.jpg",
    title: "Brow Moment 07",
    label: "Deluxe Beauty",
  },
];
function OriginalReelCard({item,duplicate=false,viewportRef}) {
  const cardRef=useRef(null);
  const videoRef=useRef(null);
  const [visible,setVisible]=useState(false);
  const [soundOn,setSoundOn]=useState(false);
  const [mediaError,setMediaError]=useState(false);
  const id=item.src.match(/deluxe-(\d\d)/)?.[1];
  const isMobile=typeof window!=='undefined' && window.matchMedia('(max-width: 900px), (pointer: coarse)').matches;
  const videoSrc='/videos/deluxe-'+id+(isMobile?'-mobile':'')+'.mp4';

  useEffect(()=>{
    const card=cardRef.current;
    const root=viewportRef.current;
    if(!card||!root)return;
    let live=false;
    const observer=new IntersectionObserver(([entry])=>{
      // Use the clipped carousel as the root. A partial glimpse must not
      // start another decoder on low-memory Android devices.
      const onScreen=!document.hidden && entry.isIntersecting &&
        entry.intersectionRatio>=0.22;
      if(onScreen!==live){live=onScreen;setVisible(onScreen);}
    },{root,threshold:[0,0.05,0.22,0.5,0.8]});
    observer.observe(card);
    const pageVisibility=()=>{
      if(document.hidden){live=false;setVisible(false);}
      else observer.unobserve(card),observer.observe(card);
    };
    document.addEventListener('visibilitychange',pageVisibility);
    return()=>{observer.disconnect();document.removeEventListener('visibilitychange',pageVisibility)};
  },[viewportRef]);

  // Mount <video> only while visible. Off-screen cards are lightweight still
  // images, with no network requests, no media buffer and no active decoder.
  useEffect(()=>{
    if(!visible){setSoundOn(false);setMediaError(false);return;}
    const video=videoRef.current;
    if(!video)return;
    video.defaultMuted=true;
    video.muted=true;
    const playMuted=()=>{
      if(document.hidden)return;
      const promise=video.play();
      if(promise?.catch)promise.catch(()=>{});
    };
    video.addEventListener('loadeddata',playMuted);
    video.addEventListener('canplay',playMuted);
    playMuted();
    return()=>{
      video.removeEventListener('loadeddata',playMuted);
      video.removeEventListener('canplay',playMuted);
      video.pause();
    };
  },[visible]);

  const toggleSound=()=>{
    setSoundOn(previous=>{
      const next=!previous;
      const video=videoRef.current;
      if(video){
        video.muted=!next;
        if(visible && video.paused){
          const promise=video.play();
          if(promise?.catch)promise.catch(()=>{});
        }
      }
      return next;
    });
  };

  return <article ref={cardRef} className="reel-card original-reel-card">
    <div className="reel-frame">
      {visible ? <video
        ref={videoRef} key={videoSrc} className="reel-video"
        src={videoSrc} poster={item.poster}
        playsInline muted autoPlay loop preload="metadata"
        disablePictureInPicture
        aria-label={'Deluxe Brow Studio – '+item.title}
        onError={()=>setMediaError(true)}
        onLoadedData={()=>setMediaError(false)}
      /> : <img className="reel-poster" loading="lazy" src={item.poster}
        alt={'Vorschaubild: '+item.title}/>}
      {mediaError && <div className="reel-video-error" role="status">
        Video derzeit nicht verfügbar
      </div>}
      <button type="button" className="reel-sound"
        onClick={toggleSound} tabIndex={duplicate?-1:0}
        aria-label={soundOn?'Ton ausschalten: '+item.title:'Ton einschalten: '+item.title}
        aria-pressed={soundOn}>
        {soundOn?<Volume2 size={19}/>:<VolumeX size={19}/>}
        <span>{soundOn?'Ton an':'Ton aus'}</span>
      </button>
    </div>
    <div className="reel-card-copy"><h3>{item.label}</h3></div>
  </article>;
}

function StudioReels() {
  const sectionRef=useRef(null);
  const viewportRef=useRef(null);
  const firstSetRef=useRef(null);
  const drag=useRef({active:false,initialX:0,previousX:0,distance:0,wasDragged:false});
  const pauseUntil=useRef(0);
  const [dragging,setDragging]=useState(false);

  useEffect(()=>{
    const viewport=viewportRef.current;
    const section=sectionRef.current;
    const first=firstSetRef.current;
    if(!viewport||!section||!first)return;

    let groupWidth=0,frame=0,previous=0,sectionVisible=false,needsInit=true;
    const prefersReducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
    const getWidth=()=>{
      const width=first.getBoundingClientRect().width;
      if(width<=0)return;
      const old=groupWidth;
      groupWidth=width;
      if(needsInit){
        viewport.scrollLeft=groupWidth;
        needsInit=false;
      }else if(old>0){
        viewport.scrollLeft+=(groupWidth-old);
      }
    };
    const keepLooped=()=>{
      if(groupWidth<=0)return;
      // Both groups are identical. Wrapping by one full group is invisible.
      if(viewport.scrollLeft<=0)viewport.scrollLeft+=groupWidth;
      if(viewport.scrollLeft>groupWidth)viewport.scrollLeft-=groupWidth;
    };
    const resizeObserver=new ResizeObserver(getWidth);
    resizeObserver.observe(first);
    const viewObserver=new IntersectionObserver(([entry])=>{
      sectionVisible=entry.isIntersecting;
      if(entry.isIntersecting) getWidth();
    },{threshold:0});
    viewObserver.observe(section);

    const tick=(time)=>{
      const delta=previous?Math.min(48,time-previous):0;
      previous=time;
      const shouldMove=groupWidth>0 && sectionVisible && !document.hidden &&
        !drag.current.active && time>=pauseUntil.current &&
        !prefersReducedMotion.matches;
      if(shouldMove){
        const speed=window.innerWidth<740?15:24;
        viewport.scrollLeft-=delta*speed/1000; // left-to-right content motion
        keepLooped();
      }
      frame=requestAnimationFrame(tick);
    };
    getWidth();
    frame=requestAnimationFrame(tick);

    // Manual scrolling by mouse wheel/trackpad also wraps seamlessly.
    const onScroll=()=>keepLooped();
    viewport.addEventListener('scroll',onScroll,{passive:true});
    const onWindowBlur=()=>{drag.current.active=false;setDragging(false)};
    window.addEventListener('blur',onWindowBlur);
    return()=>{
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();viewObserver.disconnect();
      viewport.removeEventListener('scroll',onScroll);
      window.removeEventListener('blur',onWindowBlur);
    };
  },[]);

  const startDrag=e=>{
    // Buttons remain independently clickable.
    if(e.target.closest('button'))return;
    drag.current={active:true,initialX:e.clientX,previousX:e.clientX,distance:0,wasDragged:false};
    pauseUntil.current=performance.now()+2000;
    setDragging(true);
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const moveDrag=e=>{
    const d=drag.current;
    if(!d.active)return;
    const movement=e.clientX-d.previousX;
    d.previousX=e.clientX;
    d.distance+=Math.abs(movement);
    if(d.distance>5)d.wasDragged=true;
    const viewport=viewportRef.current;
    if(viewport)viewport.scrollLeft-=movement;
  };
  const endDrag=e=>{
    drag.current.active=false;
    pauseUntil.current=performance.now()+2300;
    setDragging(false);
    if(e.currentTarget.hasPointerCapture?.(e.pointerId)){
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };
  return <section ref={sectionRef} className="studio-reels" id="reels" aria-labelledby="studio-reels-heading">
    <SectionLabel>EINBLICKE IN UNSERE ARBEIT</SectionLabel>
    <h2 id="studio-reels-heading">Beauty in Bewegung</h2>
    <p className="italic-subtitle">Sieben echte Momente aus dem Studio.</p>
    <Divider/>
    <div ref={viewportRef}
      className={'reels-marquee reels-scroll-viewport'+(dragging?' is-dragging':'')}
      onPointerDown={startDrag} onPointerMove={moveDrag}
      onPointerUp={endDrag} onPointerCancel={endDrag}
      onWheel={()=>{pauseUntil.current=performance.now()+1800}}
      aria-label="Sieben Originalvideos: automatisch laufend, mit Finger oder Maus verschiebbar">
      <div className="reels-track reels-track-js">
        {[0,1].map(copy=><div className="reels-set" ref={copy===0?firstSetRef:undefined}
          key={copy} aria-hidden={copy===1?'true':undefined}>
          {ORIGINAL_REELS.map((item,i)=>
            <OriginalReelCard item={item} viewportRef={viewportRef} duplicate={copy===1} key={i}/>)}
        </div>)}
      </div>
    </div>
    <p className="reels-note">Automatisch gleitende Videos. Mit Finger oder Maus wischen, um schneller zu schauen. Videos spielen nur im sichtbaren Bereich und zunächst ohne Ton.</p>
  </section>;
}

function About({ openImage }) {
  const items = [
    { src: IMG.hero, label: "Brow Artist", generated: false },
    { src: IMG.artist, label: "Anastasia", generated: false },
    { src: IMG.tools, label: "Studio", generated: false },
    {
      src: "/images/correction-1.jpg",
      label: "Brow Look (KI)",
      generated: true,
    },
    {
      src: "/images/tint-2.jpg",
      label: "Beauty Details (KI)",
      generated: true,
    },
  ];
  return (
    <section id="about" className="about-section">
      <div className="about-card glow-panel">
        <img
          src={IMG.artist}
          loading="lazy"
          alt="Anastasia, Brow Artist im Deluxe Brow Studio"
        />
        <div>
          <h2>
            Über
            <br />
            Anastasia
          </h2>
          <Divider />
          <p>
            Hallo, ich bin Anastasia, Brow Artist mit Leidenschaft für perfekt
            geformte, natürliche Augenbrauen.
          </p>
        </div>
      </div>
      <div className="about-chips">
        <span>
          <UserRound /> Brow Artist
        </span>
        <span>
          <Diamond /> Studio
        </span>
        <span>
          <Layers /> Arbeiten
        </span>
        <span>
          <MapPin /> Hildesheim
        </span>
      </div>
      <div id="instagram" className="instagram-section">
        <h2>Instagram</h2>
        <Divider />
        <Marquee
          items={items}
          kind="instagram"
          duration="112s"
          onImageClick={openImage}
        />
        <GoldButton href={IG}>
          <Instagram size={18} /> Instagram ansehen <ArrowRight size={18} />
        </GoldButton>
      </div>
    </section>
  );
}
function Comparison({ pair, name }) {
  const [value, setValue] = useState(50);
  const wrapper = useRef(null);
  const dragging = useRef(false);
  function change(clientX) {
    const box = wrapper.current?.getBoundingClientRect();
    if (!box) return;
    setValue(
      Math.max(0, Math.min(100, ((clientX - box.left) / box.width) * 100)),
    );
  }
  return (
    <div
      className="comparison"
      ref={wrapper}
      role="group"
      aria-label={name + " KI Vorher-Nachher-Beispiel"}
    >
      <div
        className="comparison-half comparison-after"
        style={{ backgroundImage: "url(" + pair + ")" }}
      />
      <div
        className="comparison-half comparison-before"
        style={{
          backgroundImage: "url(" + pair + ")",
          clipPath: "inset(0 " + (100 - value) + "% 0 0)",
        }}
      />
      <span className="comparison-label comparison-label-left">Vorher</span>
      <span className="comparison-label comparison-label-right">Nachher</span>
      <div
        className="comparison-handle"
        style={{ left: value + "%" }}
        aria-hidden="true"
      >
        <span>
          <ChevronLeft size={15} />
          <ChevronRight size={15} />
        </span>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={Math.round(value)}
        onChange={(e) => setValue(Number(e.target.value))}
        aria-label={"Vergleich von Vorher und Nachher für " + name}
      />
    </div>
  );
}
function ServiceSection({ service, onBook }) {
  return (
    <section id={service.id} className="service-detail">
      <h2>{service.name}</h2>
      <p className="italic-subtitle">{service.description}</p>
      <Divider />
      <Comparison pair={service.pair} name={service.name} />
      <p className="visual-note">
        KI-Visualisierung zur Demonstration der Behandlung. Keine dokumentierten Kundenergebnisse.
      </p>
      <div className="service-benefits glow-panel">
        {service.benefits.map(([icon,label]) => {
          const Icon = ICONS[icon];
          return <div key={label}><Icon/><span>{label}</span></div>;
        })}
      </div>
      <div className="service-pricing glow-panel">
        <span className="service-price-label">Studio-Preis</span>
        <strong className="service-current-price">{service.price} €</strong>
        <Sparkles className="service-price-decoration" size={23} aria-hidden="true"/>
      </div>
      <GoldButton href="#booking" onClick={() => onBook(service.name)}>{service.cta}</GoldButton>
    </section>
  );
}
function Prices({ onBook }) {
  return (
    <section className="prices-section" id="preise">
      <h2>Unsere Preise</h2>
      <p className="italic-subtitle">
        Augenbrauen-Styling und kombinierte Behandlungen – mit Liebe zum Detail.
      </p>
      <Divider />
      <div className="price-list">
        {PRICE_SERVICES.map((s) => (
          <a key={s.id} className="price-row glow-panel"
            href="#booking" onClick={() => onBook(s.name)}>
            <img src={s.images[0]} loading="lazy" alt={"KI-Motiv " + s.name} />
            <div>
              <h3>{s.name}</h3>
              <div className="price-values">
                <span className="price-caption">Studio-Preis</span>
                <strong>{s.price} €</strong>
              </div>
              <span className="studio-price-badge"><Sparkles size={15}/> Brow Beauty in Hildesheim</span>
            </div>
          </a>
        ))}
      </div>
      <p className="visual-note">
        Aktuelle Preise laut Studio. Teilweise KI-generierte Illustrationsbilder.
      </p>
    </section>
  );
}
function Vouchers() {
  return (
    <section className="vouchers-section" id="gutscheine">
      <h2>Gutscheine verschenken</h2>
      <p className="italic-subtitle">
        Die perfekte Geschenkidee für Beauty-Liebhaberinnen – auch zu
        Weihnachten und Neujahr.
      </p>
      <div className="gift-card glow-panel">
        <span className="gift-ribbon">✦</span>
        <img src={IMG.logo} alt="Deluxe Brow Studio Logo" loading="lazy" />
        <h3>Beauty-Gutschein</h3>
        <Divider />
        <span>AUGENBRAUEN · PFLEGE · STYLING</span>
      </div>
      <GoldButton href="#booking">
        <Gift size={19} /> Gutschein anfragen
      </GoldButton>
    </section>
  );
}
function Calendar({ date, setDate, month, setMonth }) {
  const today = getToday();
  const first =
    (new Date(month.getFullYear(), month.getMonth(), 1).getDay() + 6) % 7;
  const total = new Date(
    month.getFullYear(),
    month.getMonth() + 1,
    0,
  ).getDate();
  const days = [
    ...Array(first).fill(null),
    ...Array.from({ length: total }, (_, i) => i + 1),
  ];
  return (
    <div className="calendar">
      <div className="month-heading">
        <button
          type="button"
          aria-label="Vorheriger Monat"
          onClick={() =>
            setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))
          }
        >
          <ChevronLeft />
        </button>
        <strong>
          {new Intl.DateTimeFormat("de-DE", {
            month: "long",
            year: "numeric",
          }).format(month)}
        </strong>
        <button
          type="button"
          aria-label="Nächster Monat"
          onClick={() =>
            setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))
          }
        >
          <ChevronRight />
        </button>
      </div>
      <div className="calendar-grid">
        {["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"].map((day) => (
          <b key={day}>{day}</b>
        ))}
        {days.map((day, i) => {
          const value = day
            ? formatDate(new Date(month.getFullYear(), month.getMonth(), day))
            : "";
          const unavailable =
            !day ||
            new Date(month.getFullYear(), month.getMonth(), day) < today;
          return (
            <button
              type="button"
              key={i}
              className={date === value ? "selected" : ""}
              disabled={unavailable}
              onClick={() => setDate(value)}
            >
              {day || ""}
            </button>
          );
        })}
      </div>
    </div>
  );
}
function Booking({ picked }) {
  const [name, setName] = useState(""),
    [contact, setContact] = useState(""),
    [service, setService] = useState(""),
    [date, setDate] = useState(""),
    [time, setTime] = useState(""),
    [message, setMessage] = useState(""),
    [month, setMonth] = useState(
      () => new Date(getToday().getFullYear(), getToday().getMonth(), 1),
    ),
    [status, setStatus] = useState(""),
    [sending, setSending] = useState(false);
  useEffect(() => {
    if (picked) setService(picked);
  }, [picked]);
  const times = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
  ];
  const contactValid =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.trim()) ||
    contact.replace(/\D/g, "").length >= 7;
  const submit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !contactValid || !service || !date || !time) {
      setStatus(
        "Bitte alle Pflichtfelder ausfüllen und eine gültige Telefonnummer oder E-Mail eingeben.",
      );
      return;
    }
    setSending(true);
    setStatus("");
    try {
      const fields = new URLSearchParams({
        "form-name": "booking",
        name: name.trim(),
        contact: contact.trim(),
        service,
        date,
        time,
        message,
      });
      const result = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: fields.toString(),
      });
      if (!result.ok) throw new Error("HTTP " + result.status);
      setName("");
      setContact("");
      setService("");
      setDate("");
      setTime("");
      setMessage("");
      const current = getToday();
      setMonth(new Date(current.getFullYear(), current.getMonth(), 1));
      setStatus(
        "Deine Anfrage wurde gesendet. Wir melden uns bei dir. Der Termin ist noch nicht bestätigt.",
      );
    } catch {
      setStatus(
        "Die Anfrage konnte nicht gesendet werden. Bitte versuche es erneut oder kontaktiere uns über Instagram.",
      );
    } finally {
      setSending(false);
    }
  };
  return (
    <section id="booking" className="booking-section">
      <h2>Termin buchen</h2>
      <Divider />
      <form
        name="booking"
        className="booking-form glow-panel"
        onSubmit={submit}
      >
        <input type="hidden" name="form-name" value="booking" />
        <label>
          <UserRound /> Name *
          <input
            name="name"
            placeholder="Ihr vollständiger Name"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            maxLength={100}
          />
        </label>
        <label>
          <Mail /> Telefonnummer oder E-Mail *
          <input
            name="contact"
            placeholder="+49 151 12345678 oder name@beispiel.de"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
            maxLength={150}
          />
        </label>
        <label>
          <Layers /> Leistung *
          <select
            name="service"
            value={service}
            onChange={(e) => setService(e.target.value)}
            required
          >
            <option value="">Bitte Leistung auswählen</option>
            {[...SERVICES, COMBO_SERVICE].map((s) => (
              <option key={s.id} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
        </label>
        <div className="booking-chooser">
          <div>
            <div className="chooser-title">
              <CalendarDays /> Datum *
            </div>
            <Calendar
              date={date}
              setDate={(d) => {
                setDate(d);
                setTime("");
              }}
              month={month}
              setMonth={(d) => {
                setMonth(d);
                setDate("");
                setTime("");
              }}
            />
          </div>
          <div>
            <div className="chooser-title">
              <Clock3 /> Uhrzeit *
            </div>
            <div className="time-grid">
              {times.map((slot) => (
                <button
                  type="button"
                  key={slot}
                  disabled={!date}
                  className={time === slot ? "selected" : ""}
                  onClick={() => setTime(slot)}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        </div>
        <label>
          <Send /> Nachricht (optional)
          <textarea
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={500}
            rows={3}
            placeholder="Wünsche, Hinweise oder Fragen ..."
          />
        </label>
        <button
          disabled={sending}
          className="gold-button submit-button"
          type="submit"
        >
          <Send size={20} />
          {sending ? "Wird gesendet ..." : "Anfrage senden"}
        </button>
        {status && (
          <p role="status" className="form-status">
            {status}
          </p>
        )}
        <p className="form-footnote">
          Nach erfolgreichem Senden werden alle Felder und die Terminauswahl
          zurückgesetzt. Angezeigte Zeiten sind unverbindliche Wunschzeiten,
          keine Live-Verfügbarkeit.
        </p>
      </form>
    </section>
  );
}
function Footer() {
  return (
    <footer id="contact" className="site-footer">
      <div className="footer-shell">
        <div className="footer-branding">
          <a className="footer-logo" href="#home">
            <img src={IMG.logo} alt="Deluxe Brow Studio" />
          </a>
          <div>
            <h2>Deluxe Brow Studio</h2>
            <p>
              Perfekte Brows mit Stil. Schönheit und präzise Brow-Behandlungen
              in Hildesheim.
            </p>
          </div>
        </div>
        <nav className="footer-links" aria-label="Footer Navigation">
          <h3>Entdecken</h3>
          <a href="#services">Leistungen</a>
          <a href="#about">Über Anastasia</a>
          <a href="#preise">Preise</a>
          <a href="#gutscheine">Gutscheine</a>
        </nav>
        <div className="footer-contact">
          <h3>Kontakt</h3>
          <a href={IG} target="_blank" rel="noreferrer">
            <Instagram size={19} /> @deluxe.browstudio
          </a>
          <span>
            <MapPin size={19} /> Hildesheim, Germany
          </span>
          <a className="footer-book" href="#booking">
            <CalendarDays size={19} /> Termin anfragen <ArrowRight size={16} />
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} Deluxe Brow Studio · Konzeptansicht
        </span>
        <a href="#home">Zurück nach oben ↑</a>
      </div>
    </footer>
  );
}
export default function App() {
  const [lightbox, setLightbox] = useState(null),
    [selectedService, setSelectedService] = useState("");
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services openImage={setLightbox} />
        <StudioReels />
        <About openImage={setLightbox} />
        {SERVICES.map((s) => (
          <ServiceSection key={s.id} service={s} onBook={setSelectedService} />
        ))}
        <Prices onBook={setSelectedService} />
        <Vouchers />
        <Booking picked={selectedService} />
        <Footer />
      </main>
      {lightbox && (
        <Lightbox item={lightbox} onClose={() => setLightbox(null)} />
      )}
    </>
  );
}
