// The Water Check Crew invite: https://expectedend.co/join/ABCD-EFG
//
// On a phone with the app, iOS Universal Links (and Android App Links once verified) open the app before
// this page loads. Everyone else lands here: the code, a button that opens the app by its own link
// (thewatercheck://join/CODE), and a way to copy the code. The page never looks the Crew up, so the link
// tells nobody who is in it.
//
// It speaks the site's 43 languages: a first visit asks which one (closing keeps English), and the pick is
// the same one the rest of expectedend.co remembers (ee_lang in this browser's storage).
import { CHOOSER, JOIN_TEXT, LANGUAGES } from "./strings.js";

const ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
const CODE = new RegExp(`^[${ALPHABET}]{4}-[${ALPHABET}]{3}$`);

// Everything the page script needs, safe to drop inside a <script> element.
const PAGE_DATA = JSON.stringify({ languages: LANGUAGES, chooser: CHOOSER, text: JOIN_TEXT }).replace(/</g, '\\u003c');

export function normalizeCode(raw) {
  const letters = String(raw ?? '').toUpperCase().replace(/[^A-Z0-9]/g, '');
  if (letters.length !== 7) return null;
  const code = `${letters.slice(0, 4)}-${letters.slice(4)}`;
  return CODE.test(code) ? code : null;
}

export function joinPage(code) {
  const valid = code !== null;
  const appLink = valid ? `thewatercheck://join/${code}` : 'thewatercheck://crew';
  const en = JOIN_TEXT.en;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="robots" content="noindex, nofollow">
<meta name="theme-color" content="#041f45">
<title>${en.pageTitle}</title>
<meta property="og:title" content="Join my Crew on The Water Check">
<meta property="og:description" content="Drink water together. Tap to join.">
<meta property="og:image" content="https://expectedend.co/brand/thewatercheck.png">
<link rel="icon" href="/brand/thewatercheck.png">
<style>
  @font-face { font-family: 'DM Sans'; src: url('/fonts/dm-sans-latin.woff2') format('woff2'); font-weight: 100 1000; font-display: swap; }
  :root { color-scheme: dark; }
  * { box-sizing: border-box; }
  body { margin: 0; min-height: 100dvh; display: grid; place-items: center; padding: 24px 16px;
    font-family: 'DM Sans', system-ui, sans-serif; color: #eef7ff;
    background: linear-gradient(180deg, #02142f 0%, #063463 40%, #0a5ea8 78%, #1387cf 100%); }
  main { width: min(100%, 420px); text-align: center; padding: 28px 22px 22px; border-radius: 28px;
    border: 1px solid rgba(255,255,255,0.2); background: rgba(255,255,255,0.1);
    box-shadow: 0 20px 55px rgba(1,12,30,0.45); backdrop-filter: blur(18px); }
  img { width: 84px; height: 84px; border-radius: 22px; }
  .eyebrow { margin: 16px 0 0; font-size: 0.72rem; font-weight: 800; letter-spacing: 0.17em; text-transform: uppercase; color: #8fe6ff; }
  h1 { margin: 6px 0 0; font-size: 1.7rem; line-height: 1.1; letter-spacing: -0.03em; }
  p { margin: 10px 0 0; color: rgba(238,247,255,0.78); line-height: 1.5; }
  .code { margin: 18px 0 0; padding: 14px; border-radius: 18px; background: rgba(255,255,255,0.12);
    font-size: 1.9rem; font-weight: 800; letter-spacing: 0.2em; }
  a.button, main button { display: flex; width: 100%; min-height: 54px; margin-top: 14px; align-items: center; justify-content: center;
    border: 0; border-radius: 18px; font: inherit; font-weight: 800; text-decoration: none; cursor: pointer; }
  a.button { color: #03203f; background: linear-gradient(135deg, #0b6fd0, #5ccfea); }
  main button { color: #eef7ff; background: rgba(255,255,255,0.14); }
  small { display: block; margin-top: 18px; color: rgba(238,247,255,0.6); line-height: 1.5; }
  .globe { position: fixed; left: max(16px, env(safe-area-inset-left, 0px)); bottom: max(16px, env(safe-area-inset-bottom, 0px));
    display: grid; width: 42px; height: 42px; place-items: center; padding: 0; color: #8fe6ff; cursor: pointer;
    background: rgba(2,20,47,0.66); border: 1px solid rgba(143,230,255,0.38); border-radius: 50%; backdrop-filter: blur(14px); }
  .globe svg, .mark svg { width: 20px; height: 20px; }
  .chooser { position: fixed; inset: 0; z-index: 10; display: grid; place-items: center; padding: 16px; background: rgba(1,12,30,0.6); backdrop-filter: blur(6px); }
  .chooser[hidden] { display: none; }
  .card { position: relative; display: flex; flex-direction: column; width: min(100%, 540px); max-height: min(88dvh, 760px);
    padding: 30px 22px 18px; text-align: center; background: linear-gradient(180deg, #063463 0%, #02142f 100%);
    border: 1px solid rgba(143,230,255,0.38); border-radius: 24px; box-shadow: 0 32px 90px rgba(0,6,28,0.55); }
  .card > * { flex: none; }
  .close { position: absolute; top: 12px; right: 12px; display: grid; width: 36px; height: 36px; place-items: center; padding: 0;
    color: rgba(238,247,255,0.72); background: none; border: 0; border-radius: 50%; font: inherit; font-size: 1.4rem; cursor: pointer; }
  .mark { display: grid; width: 44px; height: 44px; margin: 0 auto 12px; place-items: center; color: #8fe6ff; border: 1px solid rgba(143,230,255,0.38); border-radius: 50%; }
  .card h2 { margin: 0; font-size: 1.5rem; line-height: 1.15; letter-spacing: -0.02em; }
  .card p { margin: 8px auto 0; max-width: 40ch; font-size: 0.92rem; }
  .card .english { margin-top: 6px; color: #8fe6ff; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; }
  .list { flex: 0 1 auto; min-height: 0; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; margin: 12px -6px 0;
    padding: 8px 6px; overflow-y: auto; overscroll-behavior: contain; text-align: left; }
  .list button { display: flex; min-width: 0; min-height: 52px; align-items: center; gap: 10px; padding: 8px 12px; color: #eef7ff; font: inherit; text-align: left;
    background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 14px; cursor: pointer; }
  .list button[aria-pressed="true"] { background: rgba(143,230,255,0.12); border-color: #8fe6ff; }
  .list .flag { flex: none; font-size: 1.35rem; line-height: 1; }
  .list .names { display: flex; min-width: 0; flex-direction: column; }
  .list b { overflow: hidden; font-size: 0.92rem; text-overflow: ellipsis; white-space: nowrap; }
  .list span span { overflow: hidden; color: rgba(238,247,255,0.72); font-size: 0.7rem; text-overflow: ellipsis; white-space: nowrap; }
  .globe:focus-visible, .close:focus-visible, .list button:focus-visible { outline: 2px solid #8fe6ff; outline-offset: 2px; }
  .list button:focus-visible { outline-offset: -4px; }
  @media (max-width: 380px) { .list { grid-template-columns: 1fr; } }
</style>
</head>
<body>
<main>
  <img src="/brand/thewatercheck.png" alt="The Water Check">
  <p class="eyebrow">The Water Check</p>
  ${valid ? `
  <h1 data-t="invited">${en.invited}</h1>
  <p data-t="invitedBody">${en.invitedBody}</p>
  <div class="code" id="code">${code}</div>
  <a class="button" href="${appLink}" data-t="open">${en.open}</a>
  <button type="button" id="copy" data-t="copy">${en.copy}</button>
  <small data-t="noApp">${en.noApp}</small>
  ` : `
  <h1 data-t="incomplete">${en.incomplete}</h1>
  <p data-t="incompleteBody">${en.incompleteBody}</p>
  <a class="button" href="${appLink}" data-t="open">${en.open}</a>
  `}
</main>
<button type="button" class="globe" id="globe" aria-haspopup="dialog" aria-label="${CHOOSER.en.languages}" title="${CHOOSER.en.languages}">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 2.5 15.5 0 18M12 3c-2.5 2.5-2.5 15.5 0 18"/></svg>
</button>
<div class="chooser" id="chooser" hidden>
  <div class="card" role="dialog" aria-modal="true" aria-labelledby="chooser-title" aria-describedby="chooser-intro" translate="no">
    <button type="button" class="close" id="chooser-close">×</button>
    <span class="mark" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 2.5 15.5 0 18M12 3c-2.5 2.5-2.5 15.5 0 18"/></svg></span>
    <h2 id="chooser-title"></h2>
    <p id="chooser-intro"></p>
    <p class="english" id="chooser-english" lang="en" hidden>${CHOOSER.en.title}</p>
    <div class="list" id="chooser-list" role="group"></div>
  </div>
</div>
<script>
(() => {
  const DATA = ${PAGE_DATA};
  const KEY = 'ee_lang';
  const known = (id) => DATA.languages.some((language) => language.id === id);
  const $ = (id) => document.getElementById(id);
  let saved = null;
  try { saved = localStorage.getItem(KEY); } catch {}
  let current = known(saved) ? saved : 'en';
  let firstVisit = !known(saved);

  const guess = () => {
    for (const tag of navigator.languages || [navigator.language]) {
      const base = String(tag).toLowerCase().split('-')[0];
      const id = { fil: 'tl', nb: 'no', nn: 'no' }[base] || base;
      if (known(id)) return id;
    }
    return 'en';
  };

  const show = (id) => {
    current = id;
    const words = DATA.text[id] || DATA.text.en;
    document.documentElement.lang = id;
    document.title = words.pageTitle;
    document.querySelectorAll('[data-t]').forEach((element) => { element.textContent = words[element.dataset.t]; });
    $('globe').setAttribute('aria-label', DATA.chooser[id].languages);
    $('globe').title = DATA.chooser[id].languages;
  };

  const close = (pick) => {
    $('chooser').hidden = true;
    if (pick || firstVisit) {
      try { localStorage.setItem(KEY, pick || 'en'); } catch {}
      show(pick || 'en');
    }
    if (!firstVisit) $('globe').focus();
    firstVisit = false;
  };

  const open = (lit) => {
    const words = DATA.chooser[lit];
    $('chooser-title').textContent = words.title;
    $('chooser-title').lang = lit;
    $('chooser-intro').textContent = words.intro;
    $('chooser-intro').lang = lit;
    $('chooser-english').hidden = lit === 'en';
    $('chooser-close').setAttribute('aria-label', words.close);
    const list = $('chooser-list');
    list.setAttribute('aria-label', words.list);
    list.replaceChildren(...DATA.languages.map((language) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.lang = language.id;
      button.setAttribute('aria-pressed', String(language.id === lit));
      const flag = document.createElement('span');
      flag.className = 'flag';
      flag.setAttribute('aria-hidden', 'true');
      flag.textContent = language.flag;
      const names = document.createElement('span');
      names.className = 'names';
      const native = document.createElement('b');
      native.textContent = language.nativeName;
      names.append(native);
      if (language.englishName !== language.nativeName) {
        const english = document.createElement('span');
        english.lang = 'en';
        english.textContent = language.englishName;
        names.append(english);
      }
      button.append(flag, names);
      button.addEventListener('click', () => close(language.id));
      return button;
    }));
    $('chooser').hidden = false;
    const pressed = list.querySelector('[aria-pressed="true"]');
    pressed?.focus({ preventScroll: true });
    pressed?.scrollIntoView({ block: 'center' });
  };

  $('chooser-close').addEventListener('click', () => close());
  $('chooser').addEventListener('click', (event) => { if (event.target === event.currentTarget) close(); });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && !$('chooser').hidden) close(); });
  $('globe').addEventListener('click', () => open(current));
  $('copy')?.addEventListener('click', async (event) => {
    try { await navigator.clipboard.writeText(${valid ? JSON.stringify(code) : "''"}); event.target.textContent = (DATA.text[current] || DATA.text.en).copied; } catch {}
  });

  if (firstVisit) open(guess());
  else show(current);
})();
</script>
</body>
</html>`;
}

export function onRequestGet({ params }) {
  return new Response(joinPage(normalizeCode(params.code)), {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=300',
      'X-Robots-Tag': 'noindex, nofollow',
      'Referrer-Policy': 'no-referrer',
      // The page is all its own: its style, its one script, its font and its image. Nothing else may load,
      // and no other site may frame it.
      'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline'; img-src 'self'; font-src 'self'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'",
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'Strict-Transport-Security': 'max-age=31536000',
      // The same switches every other page sends: nothing here may ask for the camera, microphone or location.
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
    },
  });
}
