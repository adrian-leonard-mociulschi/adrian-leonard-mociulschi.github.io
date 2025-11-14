<script>
// sw-register.js — încarcă și actualizează automat Service Worker-ul
(function () {
  if (!('serviceWorker' in navigator)) return;

  let reloaded = false;

  window.addEventListener('load', async () => {
    try {
      // Înregistrează SW (asigură-te că /sw.js e în rădăcină)
      const reg = await navigator.serviceWorker.register('/sw.js', { scope: '/' });

      // Caută versiune nouă de SW
      await reg.update();

      // Dacă există un SW în waiting, cere activare imediată
      if (reg.waiting) reg.waiting.postMessage({ type: 'SKIP_WAITING' });

      // Reîncarcă o singură dată când controllerul se schimbă (intră noul SW)
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (reloaded) return;
        reloaded = true;
        location.reload();
      });

      // Dacă apare un SW nou, grăbește activarea
      reg.addEventListener('updatefound', () => {
        const sw = reg.installing;
        if (!sw) return;
        sw.addEventListener('statechange', () => {
          if (sw.state === 'installed' && navigator.serviceWorker.controller) {
            sw.postMessage({ type: 'SKIP_WAITING' });
          }
        });
      });
    } catch (e) {
      console.warn('[SW] register/update failed', e);
    }
  });
})();
</script>
