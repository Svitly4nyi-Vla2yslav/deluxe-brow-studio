import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const requestedUrl = process.env.VITE_SITE_URL || process.env.URL || '';
const siteUrl = /^https:\/\/[a-z0-9.-]+(?::\d+)?$/i.test(requestedUrl.replace(/\/$/, ''))
  ? requestedUrl.replace(/\/$/, '')
  : '';
const shareImage = siteUrl
  ? siteUrl + '/og-deluxe.jpg'
  : 'https://raw.githubusercontent.com/Svitly4nyi-Vla2yslav/deluxe-brow-studio/main/public/images/logo.jpg';
const description = 'Deluxe Brow Studio in Hildesheim: Augenbrauenkorrektur, Augenbrauenfärben und Augenbrauenlaminierung. Brow Artist Anastasia.';
const title = 'Deluxe Brow Studio | Perfekte Brows mit Stil.';
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const schema = {
  '@context': 'https://schema.org', '@type': 'BeautySalon',
  name: 'Deluxe Brow Studio', description,
  image: shareImage,
  logo: siteUrl ? siteUrl + '/icon-512.png' : shareImage,
  ...(siteUrl ? {url: siteUrl + '/'} : {}),
  address: {'@type': 'PostalAddress', addressLocality: 'Hildesheim', addressCountry: 'DE'},
  sameAs: ['https://www.instagram.com/deluxe.browstudio/']
};

export default defineConfig({
 plugins: [
  react(),
  {
   name:'deluxe-search-and-social-meta',
   transformIndexHtml(html) {
    const tags = [
     siteUrl ? '<link rel="canonical" href="' + esc(siteUrl) + '/"/>' : '',
     '<meta property="og:type" content="website"/>',
     '<meta property="og:locale" content="de_DE"/>',
     '<meta property="og:site_name" content="Deluxe Brow Studio"/>',
     '<meta property="og:title" content="' + esc(title) + '"/>',
     '<meta property="og:description" content="' + esc(description) + '"/>',
     siteUrl ? '<meta property="og:url" content="' + esc(siteUrl) + '/"/>' : '',
     '<meta property="og:image" content="' + esc(shareImage) + '"/>',
     '<meta property="og:image:secure_url" content="' + esc(shareImage) + '"/>',
     '<meta property="og:image:width" content="1200"/>',
     '<meta property="og:image:height" content="630"/>',
     '<meta property="og:image:alt" content="Deluxe Brow Studio – goldenes Logo und Beauty-Angebot in Hildesheim"/>',
     '<meta name="twitter:card" content="summary_large_image"/>',
     '<meta name="twitter:title" content="' + esc(title) + '"/>',
     '<meta name="twitter:description" content="' + esc(description) + '"/>',
     '<meta name="twitter:image" content="' + esc(shareImage) + '"/>',
     '<script type="application/ld+json">' + JSON.stringify(schema).replace(/</g, '\\u003c') + '</script>'
    ].filter(Boolean).join('\n    ');
    return html.replace('<!-- BRAND_SEO_META -->',tags);
   }
  }
 ],
 base:'/',
 build:{outDir:'dist',emptyOutDir:true}
});
