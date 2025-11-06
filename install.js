// 0) Înregistrează Service Worker la rădăcină (controlează tot site-ul)
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js', { scope: '/' })
    .then(reg => console.log('[SW] Registered, scope:', reg.scope))
    .catch(err => console.error('[SW] Register error:', err));
}

// 1) Gestionare beforeinstallprompt (Chromium)
//  - salvăm evenimentul
//  - afișăm un banner cu butonul nostru
let deferredPrompt = null;

function ensureInstallBanner() {
  let banner = document.getElementById('install-banner');
  if (banner) return banner; // deja creat

  banner = document.createElement('div');
  banner.id = 'install-banner';
  banner.innerHTML = `
    <div style="
      position:fixed;inset:auto 0 0 0;display:flex;gap:12px;align-items:center;
      justify-content:center;padding:12px;background:#111;color:#fff;z-index:9999">
      <span>Install <strong>Adrian Leonard Mociulschi</strong> — folosești des acest site?</span>
      <button id="installBtn" style="padding:8px 14px;border:0;background:#0aa;color:#fff;border-radius:6px;cursor:pointer">
        Install
      </button>
    </div>`;
  document.body.appendChild(banner);
  return banner;
}

window.addEventListener('beforeinstallprompt', (e) => {
  // Blochează UI-ul implicit și salvează evenimentul (recomandarea MDN)
  e.preventDefault();
  deferredPrompt = e;

  const banner = ensureInstallBanner();
  const btn = banner.querySelector('#installBtn');

  // Asigură-te că butonul are un singur handler
  btn.addEventListener('click', async () => {
    try {
      // declanșăm promptul nativ
      const promptEvent = deferredPrompt;
      deferredPrompt = null;
      if (!promptEvent) return;

      await promptEvent.prompt();
      const { outcome } = await promptEvent.userChoice;
      console.log('[PWA] userChoice:', outcome);
    } catch (err) {
      console.error('[PWA] prompt error:', err);
    } finally {
      // ascundem UI după interacțiune; îl poți păstra dacă vrei să mai încerci mai târziu
      banner.remove();
    }
  }, { once: true });

  console.log('[PWA] beforeinstallprompt fired');
});

// 2) După instalare, ascunde orice UI de instalare
window.addEventListener('appinstalled', () => {
  console.log('[PWA] appinstalled');
  const b = document.getElementById('install-banner');
  if (b) b.remove();
});

// 3) Fallback simplu: dacă evenimentul nu apare (ex. iOS/Safari),
//    poți arăta instrucțiuni "Share → Add to Home Screen".
document.addEventListener('DOMContentLoaded', () => {
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches
                    || window.navigator.standalone === true;
  const supportsBIP = 'onbeforeinstallprompt' in window;

  if (!supportsBIP && !isStandalone) {
    // (opțional) arată un toast/tooltip cu instrucțiuni pentru iOS
    console.log('[PWA] No beforeinstallprompt (iOS/Safari). Show A2HS instructions if needed.');
  }
});
