# Cute Forest Friends — landing page

Static, dependency-free sales page for the printable coloring book **Cute Forest Friends**
(40 pages, ages 3–8, PDF download). Plain HTML + CSS + one small ES module. No build step.

## Run locally

```bash
python3 -m http.server 8000     # or: npx serve .
# open http://localhost:8000
```
(Serve it over HTTP; ES modules do not load from `file://`.)

## Deploy

Upload the repository root to any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages).
Publish directory: `/` (root). No build command.

## Where to change things — `config.js`

| What | Key |
| --- | --- |
| Price / currency | `price`, `currency`, `currencySymbol` |
| Hubla checkout URL | `checkoutUrl` |
| Support email | `supportEmail` |
| Privacy / Terms / Refund links | `links.privacy`, `links.terms`, `links.refund` |
| Print-license answer (FAQ) | `printLicense` |
| Product name, subtitle, pages, ages | `productName`, `subtitle`, `pages`, `ageRange` |
| Cover + preview images | `images.cover`, `images.previews` |
| Analytics bridge | `analytics.enabled` |

All purchase buttons share the one `checkoutUrl`. While it is empty they open a
"Checkout isn't connected yet" message instead of faking a purchase.

## Before accepting real payments

1. Set `checkoutUrl` to the real Hubla checkout link.
2. Replace `supportEmail` and the three policy links; write the real policy pages.
3. Replace `printLicense` with your actual license wording.
4. Replace concept art with final files (see below).
5. In `index.html`: set the real domain in `<link rel="canonical">`, `og:url` and `og:image`.
6. Confirm the Hubla product delivers the PDF and that the steps text ("configured checkout / delivery system") matches the real flow.
7. If you enable analytics, add your snippet and a consent banner where your audience's laws require it.

## Assets

- `assets/landing_page_visual_reference.png`, `assets/forest_friends_illustration_style.png` — art-direction references (not used as page backgrounds).
- `assets/img/*.webp` — **individual crops of those two references**, used as stand-ins:
  `cover.webp` (book cover), `page-*.webp` (4 coloring-page previews, upscaled and low-res),
  `fox/rabbit/bear/deer/hedgehog/owl.webp` and `forest-scene.webp` (watercolor characters).
  **Replace `cover.webp` and `page-*.webp` with the real product files** — the previews are
  concept drawings, not the final pages. Keep the same filenames or update `config.js`.
- `assets/img/og.jpg` — social share image (1200×630).
- `assets/fonts/` — self-hosted Fredoka and Nunito (SIL OFL 1.1).

## Design system (from the references)

Leaf `#45862c`, orange `#fe842c`, lime `#cbd355`, sun `#fdda6a`, cream `#fff6df`, bark `#a15719`
(sampled from the reference swatches), deepened forest `#1f4a1b` for text and buttons.
Fredoka for headings, Nunito for body. Arch (book-window) frames, rounded 20–40 px cards,
chunky orange-shadow buttons. CSS variables are at the top of `css/styles.css`.

## Analytics

Off by default. With `analytics.enabled: true` the page pushes `page_view`, `view_product`,
`click_primary_cta`, `click_checkout`, `view_preview`, `faq_open` to `dataLayer` / `gtag` /
`plausible` if present. It loads no tracking scripts itself.
