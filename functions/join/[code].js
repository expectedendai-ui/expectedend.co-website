// The Water Check Crew invite: https://expectedend.co/join/ABCD-EFG
//
// On a phone with the app, iOS Universal Links (and Android App Links once verified) open the app before
// this page loads. Everyone else lands here: the code, a button that opens the app by its own link
// (thewatercheck://join/CODE), and a way to copy the code. The page never looks the Crew up, so the link
// tells nobody who is in it.
const ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
const CODE = new RegExp(`^[${ALPHABET}]{4}-[${ALPHABET}]{3}$`);

export function normalizeCode(raw) {
  const letters = String(raw ?? '').toUpperCase().replace(/[^A-Z0-9]/g, '');
  if (letters.length !== 7) return null;
  const code = `${letters.slice(0, 4)}-${letters.slice(4)}`;
  return CODE.test(code) ? code : null;
}

export function joinPage(code) {
  const valid = code !== null;
  const appLink = valid ? `thewatercheck://join/${code}` : 'thewatercheck://crew';
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="robots" content="noindex, nofollow">
<meta name="theme-color" content="#041f45">
<title>Join a Crew · The Water Check</title>
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
  a.button, button { display: flex; width: 100%; min-height: 54px; margin-top: 14px; align-items: center; justify-content: center;
    border: 0; border-radius: 18px; font: inherit; font-weight: 800; text-decoration: none; cursor: pointer; }
  a.button { color: #03203f; background: linear-gradient(135deg, #0b6fd0, #5ccfea); }
  button { color: #eef7ff; background: rgba(255,255,255,0.14); }
  small { display: block; margin-top: 18px; color: rgba(238,247,255,0.6); line-height: 1.5; }
</style>
</head>
<body>
<main>
  <img src="/brand/thewatercheck.png" alt="The Water Check">
  <p class="eyebrow">The Water Check</p>
  ${valid ? `
  <h1>You’re invited to a Crew</h1>
  <p>Drink water together and cheer each other on. Open the app to join, or type this code under Crew.</p>
  <div class="code" id="code">${code}</div>
  <a class="button" href="${appLink}">Open The Water Check</a>
  <button type="button" id="copy">Copy the code</button>
  <small>No app yet? The Water Check is coming to the App Store and Google Play. Once you have it, open this link again or join with the code.</small>
  ` : `
  <h1>That invite link is not complete</h1>
  <p>Ask your friend to share the invite again, or join with the code they sent you under Crew in the app.</p>
  <a class="button" href="${appLink}">Open The Water Check</a>
  `}
</main>
${valid ? `<script>
  document.getElementById('copy').addEventListener('click', async (event) => {
    try { await navigator.clipboard.writeText(${JSON.stringify(code)}); event.target.textContent = 'Copied'; } catch {}
  });
</script>` : ''}
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
    },
  });
}
