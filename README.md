# Deluxe Brow Studio

React 18 + Vite 6 + CSS, mobile-first premium black-and-gold design matched to the approved screen references.

## Content and functionality

- Full phone-viewport hero with real artist-at-work photo, responsive typography, both CTAs and all three features.
- Smaller glowing original brand logo, rotating gold halo and subtle permanent gradient animations.
- Full-viewport dropdown navigation with body scroll lock, close / Escape support.
- Services: six AI-generated eyebrow photos (two each for correction, tinting, lamination), continuous slow marquee, pointer-hold pause and full-screen lightbox.
- Instagram: continuous slow marquee featuring genuine supplied studio images plus clearly marked AI example imagery.
- Three interactive before/after draggable comparisons with AI-generated split-image pairs. These are **illustrations**, not real client outcomes.
- Mobile-friendly three-row price cards and gift card.
- Booking form with name, phone or email, service, future date, time and optional message. Netlify Forms receives form data; fields reset only following HTTP 2xx response. The chosen time is a request, not confirmed availability.
- All image assets served locally from `public/images/`, including nine optimized image-generation assets.

## Deployment

```bash
npm install
npm run dev
npm run build
```

Netlify: existing `netlify.toml` sets `npm run build`, publish `dist`, Node 22. The hidden HTML form in `index.html` enables Netlify form detection. Visit Netlify dashboard → Forms to inspect submissions; enable notifications as appropriate.

## Owner approval and commercial/legal checks

- Mockup prices 30/40/60 € and holiday 30% promotion are **not confirmed actual prices or valid offers**. A real Instagram price list previously provided by the owner differs. Verify and replace before making this a public commercial site.
- The generated before/after results are AI demonstrations, not genuine treatment evidence; never claim otherwise.
- Owner must approve use of real photos and confirm client consent for any genuine treatment results.
- Review Impressum, Datenschutzerklärung and forms-related GDPR obligations before commercial launch.

## Visual/interaction refinements

- Golden ring rotates extremely slowly (180s) and glow softly pulses (42s). Buttons shimmer over 65s with reduced contrast, not flashing.
- Both galleries use frame-time-corrected requestAnimationFrame motion at 11-13 px/s, seamless duplicated groups, pause on pointer hold/hover/focus, lightbox on tap.
- Before/after comparisons preserve the generated composite half-photo's native 2:3 ratio, preventing horizontal stretching. The range slider still adjusts the split.
- Form clears all values on confirmed successful POST only. Failed POST retains inputs for a retry, preventing accidental data loss.
