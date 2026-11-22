import { config } from "./config.js";

/* ---------- Analytics bridge (off unless config.analytics.enabled) ---------- */
function track(event, params = {}) {
  if (!config.analytics?.enabled) return;
  try {
    if (Array.isArray(window.dataLayer)) window.dataLayer.push({ event, ...params });
    if (typeof window.gtag === "function") window.gtag("event", event, params);
    if (typeof window.plausible === "function") window.plausible(event, { props: params });
  } catch (err) {
    console.warn("[analytics]", err);
  }
}

/* ---------- Fill the page from config ---------- */
const formatPrice = () => `${config.currencySymbol}${Number(config.price).toFixed(2)}`;

const bindings = {
  productName: config.productName,
  subtitle: config.subtitle,
  price: formatPrice(),
  currency: config.currency,
  pages: String(config.pages),
  ageRange: config.ageRange,
  printLicense: config.printLicense,
  copyrightHolder: config.copyrightHolder,
};

document.querySelectorAll("[data-bind]").forEach((el) => {
  const value = bindings[el.dataset.bind];
  if (value !== undefined) el.textContent = value;
});
document.querySelectorAll("data[data-bind='price']").forEach((el) => {
  el.value = String(config.price);
});
document.querySelectorAll("[data-support-email]").forEach((el) => {
  el.textContent = config.supportEmail;
  el.href = `mailto:${config.supportEmail}`;
});
document.querySelectorAll("[data-link]").forEach((el) => {
  const href = config.links?.[el.dataset.link];
  if (href) el.href = href;
});
document.querySelectorAll("[data-year]").forEach((el) => {
  el.textContent = String(new Date().getFullYear());
});
document.querySelectorAll("[data-img='cover']").forEach((el) => {
  if (!el.src.endsWith(config.images.cover)) el.src = config.images.cover;
});
document.querySelectorAll("[data-preview-index]").forEach((el) => {
  const item = config.images.previews[Number(el.dataset.previewIndex)];
  if (item && !el.src.endsWith(item.src)) el.src = item.src;
});

/* ---------- Checkout buttons ---------- */
const checkoutReady = /^https?:\/\//i.test(config.checkoutUrl || "");
const missingDialog = document.getElementById("checkout-missing");

if (!checkoutReady) {
  console.warn("[Cute Forest Friends] checkoutUrl is not set in js/config.js — purchase buttons are inactive.");
}

document.querySelectorAll("[data-checkout]").forEach((btn) => {
  if (checkoutReady) btn.href = config.checkoutUrl;
  btn.addEventListener("click", (event) => {
    track("click_primary_cta", { location: btn.dataset.cta });
    if (!checkoutReady) {
      event.preventDefault();
      missingDialog?.showModal();
      return;
    }
    track("click_checkout", { location: btn.dataset.cta, value: config.price, currency: config.currency });
  });
});

/* ---------- Gallery + lightbox ---------- */
const gallery = document.getElementById("gallery");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const previews = config.images.previews;
let current = 0;

if (gallery) {
  previews.forEach((item, index) => {
    const li = document.createElement("li");
    li.className = "gallery__item";
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "gallery__btn";
    btn.setAttribute("aria-label", `Enlarge preview ${index + 1} of ${previews.length}`);
    const img = document.createElement("img");
    img.src = item.src;
    img.alt = item.alt;
    img.loading = "lazy";
    img.decoding = "async";
    img.width = 300;
    img.height = 400;
    btn.append(img);
    btn.addEventListener("click", () => openLightbox(index));
    li.append(btn);
    gallery.append(li);
  });
}

function showPreview(index) {
  current = (index + previews.length) % previews.length;
  lightboxImg.src = previews[current].src;
  lightboxImg.alt = previews[current].alt;
}
function openLightbox(index) {
  if (!lightbox || typeof lightbox.showModal !== "function") return;
  showPreview(index);
  lightbox.showModal();
  track("view_preview", { index: current + 1 });
}
lightbox?.querySelector("[data-lb='prev']")?.addEventListener("click", () => showPreview(current - 1));
lightbox?.querySelector("[data-lb='next']")?.addEventListener("click", () => showPreview(current + 1));
lightbox?.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") showPreview(current - 1);
  if (e.key === "ArrowRight") showPreview(current + 1);
});
lightbox?.addEventListener("click", (e) => {
  if (e.target === lightbox) lightbox.close(); // click on the backdrop
});

/* ---------- FAQ analytics ---------- */
document.querySelectorAll(".faq details").forEach((d) => {
  d.addEventListener("toggle", () => {
    if (d.open) track("faq_open", { question: d.querySelector("summary")?.textContent.trim() });
  });
});

/* ---------- Sticky mobile CTA: show after the hero, hide near the offer / final CTA ---------- */
const sticky = document.getElementById("sticky-cta");
const hero = document.getElementById("top");
if (sticky && hero && "IntersectionObserver" in window) {
  const state = { heroVisible: true, ctaVisible: false };
  const apply = () => {
    const show = !state.heroVisible && !state.ctaVisible;
    sticky.hidden = !show;
    document.body.classList.toggle("has-sticky", show);
  };
  new IntersectionObserver(([e]) => { state.heroVisible = e.isIntersecting; apply(); }).observe(hero);
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { state[e.target.id] = e.isIntersecting; });
    state.ctaVisible = Boolean(state.offer || state.final);
    apply();
  });
  ["offer", "final"].forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
}

/* ---------- view_product: fire once when the offer is seen ---------- */
const offer = document.getElementById("offer");
if (offer && "IntersectionObserver" in window) {
  const once = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) { track("view_product", { price: config.price, currency: config.currency }); once.disconnect(); }
  }, { threshold: 0.4 });
  once.observe(offer);
}

track("page_view");
