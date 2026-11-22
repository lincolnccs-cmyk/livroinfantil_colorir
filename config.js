/**
 * Cute Forest Friends — central product configuration.
 *
 * This file is the single source of truth for the values below. The page reads
 * it at load time (see js/main.js) and fills every matching element in
 * index.html, so you only ever edit values here.
 *
 * Items marked TODO are placeholders that must be replaced before you accept
 * real payments. See README.md for the full checklist.
 */
export const config = {
  productName: "Cute Forest Friends",
  subtitle: "A Cute Animal Coloring Book for Kids",
  description:
    "40 adorable woodland animal coloring pages for kids ages 3–8. Download the printable PDF and print at home.",

  // Price is shown everywhere as `${currencySymbol}${price}`. Change it here only.
  price: 6.99,
  currency: "USD",
  currencySymbol: "$",

  pages: 40,
  ageRange: "3–8",

  // TODO: paste the real Hubla checkout URL (https://…). While this is empty,
  // every purchase button shows a "checkout not connected" message instead of
  // pretending to sell anything.
  checkoutUrl: "",

  // TODO: replace with a real support inbox.
  supportEmail: "support@example.com",

  // TODO: point these at your real policy pages (or leave "#" until they exist).
  links: {
    privacy: "#",
    terms: "#",
    refund: "#",
  },

  // TODO: replace with the wording from your actual product license.
  printLicense:
    "[Placeholder — replace with your license terms.] As a general guide, digital coloring pages like these are usually licensed for personal, non-commercial use, such as printing copies for your own family.",

  // Shown in the footer copyright line.
  copyrightHolder: "Cute Forest Friends",

  // Artwork. `cover` and `previews` currently use concept art cropped from the
  // visual references; swap in the final files (same paths or new ones).
  images: {
    cover: "cover.webp",
    previews: [
      { src: "page-fox.webp", alt: "Coloring page preview: a fox sitting among leaves and clouds" },
      { src: "page-rabbit.webp", alt: "Coloring page preview: a rabbit holding a carrot" },
      { src: "page-bear.webp", alt: "Coloring page preview: a smiling bear cub" },
      { src: "page-deer.webp", alt: "Coloring page preview: a spotted fawn standing in a meadow" },
    ],
  },

  // Optional analytics bridge. Off by default; nothing is loaded or sent unless
  // you enable it AND your own analytics snippet (GA4 / Plausible / GTM) is on
  // the page with the consent your region requires.
  analytics: {
    enabled: false,
  },
};
