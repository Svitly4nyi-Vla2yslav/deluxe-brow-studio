# DELUXE Brow Studio

React + Vite + CSS website prototype.

## Development
```bash
npm install
npm run dev
```

## Netlify deployment

The repository includes `netlify.toml`. **Netlify should build with `npm run build` and publish `dist`, not the repository root**. Node.js 22 is selected with `.nvmrc`.

In Netlify: **Site configuration → Build & deploy → Build settings**:
- Base directory: (empty)
- Build command: `npm run build`
- Publish directory: `dist`
- Production branch: `main`

After this change, deploy with **Deploys → Trigger deploy → Clear cache and deploy site** if needed.

`index.html` refers to `/src/main.jsx` before the build. Publishing the raw source folder would produce a white screen because the browser cannot execute JSX source directly. Netlify must serve the built `dist/index.html` with the transformed assets.

## Important: visual demo, not a live booking or verified portfolio

The images are externally loaded illustration placeholders, not actual studio photos. Prices and seasonal discount are demo content. The calendar does not confirm appointment availability or send a message. Obtain owner approval, genuine portfolio images, studio information, and a booking integration before publicly advertising this as a finished business website.
