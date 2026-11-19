# Datenschutz & Cookie-Management – Deluxe Brow Studio

Stand: November 2026.

## Implementiert
- Dauerhaft erreichbare Seiten /datenschutz und /impressum, Links im Footer und an der Buchungsform.
- Datenschutz-Informationen zu Netlify Hosting, Server-Logs, Netlify Forms, lokalen Bildern/Videos, Instagram-Link und Betroffenenrechten.
- Keine externe Schriftart: Google-Fonts-Import entfernt, Systemschrift-Fallbacks.
- Cookie-Hinweis mit notwendiger Speicherung der Datenschutzauswahl. Aktuell keine Analyse- oder Werbecookies im eigenen Website-Code, daher kein irreführendes Opt-in-Angebot.
- Falls VITE_GA_MEASUREMENT_ID im Build gesetzt wird (z.B. G-XXXX): GA wird **erst nach ausdrücklichem Opt-in** dynamisch geladen; Ablehnung gleichwertig angeboten; Wahl im Footer jederzeit änderbar.
- Buchungsformular bleibt funktionsfähig; Hinweis auf Datenverarbeitung und Datenschutzerklärung ergänzt.

## Vor rechtssicherer Veröffentlichung verpflichtend klären
1. Echten Vornamen/Nachnamen der verantwortlichen Inhaberin (Anastasia), ladungsfähige Anschrift, E-Mail und weitere erforderliche Kontaktmöglichkeit im Impressum sowie in der Datenschutzerklärung ergänzen.
2. Prüfen, ob USt-IdNr., Registerangaben oder weitere Pflichtangaben vorhanden/erforderlich sind. Nichts ohne Rechtsgrundlage erfinden.
3. Netlify DPA/AVV, tatsächliche Hosting-Länder, Drittstaatentransfers, Logfiles und Speicherfristen prüfen; gegebenenfalls Vertrag zur Auftragsverarbeitung abschließen.
4. Netlify Forms: Benachrichtigungsempfänger, Zugriff, Löschroutine, tatsächliche Aufbewahrungsdauer und Rechtsgrundlage dokumentieren.
5. Netlify Dashboard prüfen: Analytics, Identity, Access, Add-ons, externe Skripte, Tracking-Pixel und Cookie-Setzung durch Drittanbieter unabhängig vom GitHub-Code.
6. Falls Analytics aktiviert wird: Datenschutzerklärung um GA-Konfiguration, Cookies, Anbieterinformationen, konkrete Datenübermittlungen und Widerruf ergänzen; Consent-Implementierung auf echten Geräten testen.
7. Bild-/Video-Einwilligungen von Kundinnen sowie Nutzungsrechte an Musik und Fotos prüfen.
8. Abschließende rechtliche Prüfung bei Betreiberin/qualifizierter Stelle vor Live-Betrieb. Vorhandene Platzhalter auf öffentlich erreichbaren Seiten sind NICHT rechtskonform.

Die Dokumente sind technische Entwürfe, keine Rechtsberatung und keine Bestätigung vollständiger DSGVO-Konformität.
