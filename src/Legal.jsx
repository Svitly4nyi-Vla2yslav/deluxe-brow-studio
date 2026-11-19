import React, {useEffect, useRef, useState} from "react";
import {ShieldCheck, Settings2, X, Check, ArrowLeft} from "lucide-react";

const KEY="deluxe-privacy-choice-v1";
const GA=(import.meta.env.VITE_GA_MEASUREMENT_ID || "").trim();
const HAS_ANALYTICS=/^G-[A-Z0-9]+$/.test(GA);
const POLICY_VERSION="2026-11";
function readChoice(){
 try {
  const raw=localStorage.getItem(KEY);
  if(!raw)return null;
  const choice=JSON.parse(raw);
  return choice.version===POLICY_VERSION && typeof choice.statistics==="boolean" ? choice:null;
 } catch {return null;}
}
function writeChoice(statistics){
 const choice={version:POLICY_VERSION,statistics:HAS_ANALYTICS && Boolean(statistics),savedAt:new Date().toISOString()};
 try{localStorage.setItem(KEY,JSON.stringify(choice));}catch{}
 return choice;
}
function deleteGaCookies(){
 // The owner must also check browser-level third party cookies/Netlify dashboard integrations.
 for(const name of document.cookie.split(";").map(x=>x.trim().split("=")[0]).filter(x=>/^_ga|^_gid$|^_gat/.test(x))){
  document.cookie=encodeURIComponent(name)+"=;Max-Age=0;path=/;SameSite=Lax";
  const parts=location.hostname.split(".");
  if(parts.length>2){
   document.cookie=encodeURIComponent(name)+"=;Max-Age=0;path=/;domain=."+parts.slice(-2).join(".")+";SameSite=Lax";
  }
 }
}
export function PrivacyControls(){
 const [choice,setChoice]=useState(readChoice);
 const [open,setOpen]=useState(()=>!readChoice());
 const [details,setDetails]=useState(false);
 const [statistics,setStatistics]=useState(false);
 const dialogRef=useRef(null);
 useEffect(()=>{
  const handler=()=>{setStatistics(choice?.statistics||false);setDetails(true);setOpen(true)};
  document.addEventListener("deluxe:privacy-settings",handler);
  return()=>document.removeEventListener("deluxe:privacy-settings",handler);
 },[choice]);
 useEffect(()=>{
  if(!HAS_ANALYTICS)return;
  const allow=Boolean(choice?.statistics);
  window["ga-disable-"+GA]=!allow;
  if(!allow){
   deleteGaCookies();
   const gaScript=document.querySelector('script[data-deluxe-ga]');
   if(gaScript)gaScript.remove();
   return;
  }
  if(!document.querySelector('script[data-deluxe-ga]')){
   window.dataLayer=window.dataLayer||[];
   window.gtag=function(){window.dataLayer.push(arguments)};
   window.gtag("js",new Date());
   window.gtag("config",GA,{anonymize_ip:true});
   const s=document.createElement("script");
   s.async=true;
   s.dataset.deluxeGa="true";
   s.src="https://www.googletagmanager.com/gtag/js?id="+encodeURIComponent(GA);
   document.head.appendChild(s);
  }
 },[choice]);
 useEffect(()=>{if(open)dialogRef.current?.focus()},[open]);
 const save=(value)=>{
  const next=writeChoice(value);
  setChoice(next);setOpen(false);setDetails(false);
 };
 if(!open)return null;
 return <div className="privacy-overlay" role="presentation">
  <div className="privacy-dialog" ref={dialogRef} tabIndex={-1} role="dialog"
   aria-modal="true" aria-labelledby="privacy-heading" aria-describedby="privacy-description">
   <div className="privacy-dialog-top">
    <ShieldCheck size={25} aria-hidden="true"/>
    <h2 id="privacy-heading">Privatsphäre & Cookies</h2>
   </div>
   <p id="privacy-description">
    Wir verwenden technisch notwendige Speicherungen, damit die Website funktioniert und deine Datenschutzeinstellungen erhalten bleiben.
    {HAS_ANALYTICS
      ? " Google Analytics wird nur mit deiner freiwilligen Einwilligung geladen. Ohne Zustimmung findet keine Google-Analyse durch diese Website statt."
      : " Aktuell verwenden wir auf dieser Website keine Analyse- oder Werbe-Cookies."}
   </p>
   {details && <div className="privacy-choices">
    <div><strong>Notwendig</strong><span>Technischer Betrieb, Sicherheit und Speicherung deiner Auswahl. Immer aktiv.</span></div>
    <div><strong>Statistik {HAS_ANALYTICS?"(Google Analytics)":"(nicht aktiv)"}</strong>
     <span>{HAS_ANALYTICS?"Anonyme bzw. pseudonyme Nutzungsstatistik. Daten können an Google übermittelt werden, auch in Drittländer.":"Kein Analytics-Dienst im aktuellen Website-Code aktiviert."}</span>
     <label className="privacy-switch">
      <input type="checkbox" checked={HAS_ANALYTICS&&statistics} disabled={!HAS_ANALYTICS}
       onChange={e=>setStatistics(e.target.checked)} aria-label="Statistik erlauben"/>
      <span>{HAS_ANALYTICS&&statistics?"Ein":"Aus"}</span>
     </label>
    </div>
   </div>}
   <p className="privacy-more">Details findest du in unserer <a href="/datenschutz">Datenschutzerklärung</a>. Du kannst deine Einstellung jederzeit über den Footer ändern.</p>
   <div className="privacy-actions">
    <button type="button" className="privacy-button privacy-reject" onClick={()=>save(false)}>
     {HAS_ANALYTICS?"Nur notwendige":"Verstanden"}
    </button>
    {HAS_ANALYTICS && <button type="button" className="privacy-button privacy-accept" onClick={()=>save(true)}>Alle akzeptieren</button>}
    <button type="button" className="privacy-button privacy-settings" onClick={()=>{
     if(details)save(statistics);else setDetails(true);
    }}><Settings2 size={15}/>{details?"Auswahl speichern":"Einstellungen"}</button>
   </div>
  </div>
 </div>;
}
export function openPrivacySettings(){
 document.dispatchEvent(new Event("deluxe:privacy-settings"));
}
function Notice(){
 return <div className="legal-pending" role="note"><strong>Hinweis für die Betreiberin:</strong> Diese rechtlichen Informationen müssen vor dem endgültigen öffentlichen Betrieb mit den echten Pflichtangaben und den tatsächlich abgeschlossenen Verträgen vervollständigt und geprüft werden. Fehlende Angaben wurden bewusst nicht erfunden.</div>;
}
export function LegalPage({kind}){
 useEffect(()=>{
  const previous=document.title;
  document.title=(kind==="impressum"?"Impressum":"Datenschutzerklärung")+" | Deluxe Brow Studio";
  window.scrollTo(0,0);
  return()=>{document.title=previous};
 },[kind]);
 const imprint=kind==="impressum";
 return <div className="legal-page">
  <header className="legal-header">
   <a href="/" className="legal-home"><img src="/images/logo-transparent.png" alt="Deluxe Brow Studio"/> Deluxe Brow Studio</a>
   <a href="/" className="legal-back"><ArrowLeft size={18}/> Zur Startseite</a>
  </header>
  <main className="legal-content">
   <p className="legal-eyebrow">RECHTLICHE INFORMATIONEN</p>
   <h1>{imprint?"Impressum":"Datenschutzerklärung"}</h1>
   <Notice/>
   {imprint ? <>
    <section><h2>Angaben gemäß § 5 DDG</h2>
     <p>Deluxe Brow Studio</p>
     <p>Inhaberin: <strong>[VOLLSTÄNDIGER VOR- UND NACHNAME DER INHABERIN EINTRAGEN]</strong></p>
     <p><strong>[LADUNGSFÄHIGE STRASSE, HAUSNUMMER, POSTLEITZAHL, HILDESHEIM EINTRAGEN]</strong></p>
     <p>Deutschland</p>
    </section>
    <section><h2>Kontakt</h2>
     <p>E-Mail: <strong>[GESCHÄFTLICHE E-MAIL-ADRESSE EINTRAGEN]</strong></p>
     <p>Telefon bzw. weiterer schneller Kommunikationsweg: <strong>[KONTAKT EINTRAGEN]</strong></p>
     <p>Instagram: <a href="https://www.instagram.com/deluxe.browstudio/" target="_blank" rel="noopener noreferrer">@deluxe.browstudio</a></p>
    </section>
    <section><h2>Weitere Angaben, soweit einschlägig</h2>
     <p>Umsatzsteuer-Identifikationsnummer nach § 27a UStG: <strong>[NUR ANGEBEN, WENN VORHANDEN]</strong></p>
     <p>Gegebenenfalls Registereintrag, zuständige Aufsichtsbehörde und weitere berufsrechtliche Angaben ergänzen, sofern anwendbar.</p>
    </section>
    <section><h2>Inhaltlich verantwortlich</h2><p>Verantwortlich für dieses Angebot ist die oben genannte Inhaberin. Die vollständigen Angaben müssen ergänzt werden.</p></section>
   </> : <>
    <section><h2>1. Verantwortliche Stelle</h2>
     <p>Deluxe Brow Studio, Inhaberin <strong>[VOLLSTÄNDIGER NAME]</strong>, <strong>[LADUNGSFÄHIGE ANSCHRIFT]</strong>, Deutschland.</p>
     <p>Kontakt für Datenschutzanfragen: <strong>[E-MAIL-ADRESSE]</strong>.</p>
     <p>Die Verantwortliche entscheidet über die Zwecke und Mittel der Verarbeitung personenbezogener Daten.</p>
    </section>
    <section><h2>2. Besuch der Website und Hosting</h2>
     <p>Die Website wird bei Netlify bereitgestellt. Beim Abruf können technisch erforderliche Verbindungsdaten wie IP-Adresse, Zeitpunkt, angeforderte Datei, Browserangaben und technische Fehlermeldungen verarbeitet werden, um die Website auszuliefern und ihre Sicherheit zu gewährleisten.</p>
     <p>Rechtsgrundlage ist grundsätzlich Art. 6 Abs. 1 lit. f DSGVO (sicherer und zuverlässiger Betrieb). Sofern Verträge mit Netlify oder Übermittlungen außerhalb des EWR relevant sind, müssen die tatsächlichen Empfänger, Übermittlungsgrundlagen und Speicherfristen anhand des Netlify-Vertrags und der Hosting-Konfiguration konkretisiert werden.</p>
    </section>
    <section><h2>3. Kontakt- und Terminanfragen</h2>
     <p>Wenn du das Formular verwendest, verarbeiten wir deinen Namen, deine angegebene Kontaktmöglichkeit, die gewünschte Behandlung, Datum und Uhrzeit sowie gegebenenfalls deine Nachricht, um deine Anfrage zu beantworten und einen Termin abzustimmen.</p>
     <p>Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Anfrage). Die Formulardaten werden über Netlify Forms übermittelt. Ein gebuchter oder bestätigter Termin entsteht dadurch noch nicht.</p>
     <p>Die Angaben werden nur so lange aufbewahrt, wie sie für die Bearbeitung der Anfrage benötigt werden, sofern keine gesetzliche Aufbewahrungspflicht greift. <strong>[TATSÄCHLICHE LÖSCHROUTINE UND NETLIFY-FORMULARSPEICHERUNG PRÜFEN]</strong></p>
     <p>Bitte keine sensiblen Gesundheitsangaben über das Freitextfeld senden.</p>
    </section>
    <section><h2>4. Cookies und lokale Speicherung</h2>
     <p>Die Website speichert deine Datenschutzauswahl unter dem Schlüssel <code>deluxe-privacy-choice-v1</code> im Local Storage, damit die Entscheidung nicht bei jedem Besuch erneut abgefragt werden muss. Diese technisch zweckgebundene Speicherung erfordert grundsätzlich keine Einwilligung gemäß § 25 Abs. 2 TDDDG.</p>
     <p>Notwendige technische Speicherungen anderer beteiligter Anbieter hängen von deren tatsächlicher Konfiguration ab. Die Website setzt im eigenen Code ohne Einwilligung keine Marketing- oder Statistik-Cookies.</p>
    </section>
    <section><h2>5. Optionale Reichweitenmessung</h2>
     <p>Sofern Google Analytics künftig technisch aktiviert wird, erfolgt das Laden des Analytics-Skripts durch diesen Website-Code ausschließlich nach deiner freiwilligen Zustimmung gemäß § 25 Abs. 1 TDDDG und Art. 6 Abs. 1 lit. a DSGVO. Ohne Zustimmung wird es nicht eingebunden.</p>
     <p>Bei Aktivierung können Nutzungsdaten an Google übermittelt werden und eine Datenübertragung in Drittländer stattfinden. Vor der Inbetriebnahme müssen Google-Vertragsbedingungen, etwaige internationale Übermittlungen und Löschfristen tatsächlich geprüft und diese Erklärung konkretisiert werden. Du kannst deine Zustimmung jederzeit über „Cookie-Einstellungen“ im Footer widerrufen.</p>
    </section>
    <section><h2>6. Schriften, Bilder, Videos und Instagram</h2>
     <p>Die Fotos, das Logo und die Videodateien werden vom eigenen Hosting ausgeliefert. Für die Darstellung verwenden wir lokal verfügbare Systemschriften, ohne Google Fonts beim Seitenaufruf zu kontaktieren.</p>
     <p>Der Instagram-Link führt erst durch aktives Anklicken zur externen Plattform Meta/Instagram. Auf dieser Website werden keine Instagram-Posts oder Tracking-Pixel eingebettet. Bei einem Besuch von Instagram gelten die Datenschutzhinweise des Anbieters.</p>
    </section>
    <section><h2>7. Rechte betroffener Personen</h2>
     <p>Im Rahmen der gesetzlichen Voraussetzungen bestehen Rechte auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung (Art. 18), Datenübertragbarkeit (Art. 20) und Widerspruch (Art. 21) sowie Widerruf einer Einwilligung mit Wirkung für die Zukunft (Art. 7 Abs. 3).</p>
     <p>Es besteht das Recht, sich bei einer Datenschutzaufsichtsbehörde zu beschweren, z. B. beim <a href="https://www.lfd.niedersachsen.de/" target="_blank" rel="noopener noreferrer">Landesbeauftragten für den Datenschutz Niedersachsen</a>.</p>
    </section>
    <section><h2>8. Aktualität</h2><p>Stand: November 2026. Diese Information ist vor Freigabe um die tatsächlichen Kontaktdaten, technischen Integrationen und Aufbewahrungsfristen zu ergänzen.</p></section>
   </>}
   <div className="legal-links"><a href="/impressum">Impressum</a><a href="/datenschutz">Datenschutz</a><button type="button" onClick={openPrivacySettings}>Cookie-Einstellungen</button></div>
  </main>
  <footer className="legal-bottom"><a href="/">© Deluxe Brow Studio · Zurück zur Startseite</a></footer>
 </div>;
}
