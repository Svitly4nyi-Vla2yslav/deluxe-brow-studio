# DELUXE Brow Studio

Mobile-first React/Vite landing page based on the three earlier concept screens. Warm ivory, champagne and taupe, glossy frosted-glass UI, slow Instagram-style image marquee, portfolio, services, seasonal promo, voucher selector and a demo appointment calendar.

## Start

```bash
npm install
npm run dev
```

Open the URL shown by Vite. For production: `npm run build`; deploy the `dist` folder on Netlify/Vercel.

## Stack

React 18, Vite 6, a single plain CSS file (`src/styles.css`) and lucide-react icons. **No styled-components, no CSS-in-JS, no animation framework.** All gradients, blur, layout and motion are native CSS.

## IMPORTANT: design demo, not a live salon website

- Images are temporary, externally loaded illustrative stock photos and **not actual DELUXE Brow Studio photos**. Obtain licensing and replace them with the studio's own images in `public/images/` before production. No third-party Instagram content is scraped.
- Prices, services, the holiday 30% banner and voucher amounts are placeholders and must be explicitly confirmed by the owner before publishing.
- Calendar and time slots are a **local frontend demonstration only**. They do not represent real availability or submit any data. Integrate a booking service or backend + consent/privacy disclosures before enabling reservations.
- No invented address, phone, opening hours or customer testimonials.
- The before/after slider demonstrates the UI with **unrelated illustrative photos**, not actual treatment results.
- Disable or replace seasonal promo after its actual, owner-confirmed validity window.

## Customization

Change `demoImages`, `services`, Instagram link and copy in `src/App.jsx`. Main design variables start at the top of `src/styles.css`.

## Scope

First visual implementation inspired by the previous mobile sketches; exact photographic equivalence is impossible without the original artwork, studio-approved images, typography files and full-size reference exports.
