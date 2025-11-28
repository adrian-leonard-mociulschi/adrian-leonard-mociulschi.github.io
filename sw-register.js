// sw-register.js — Optimized Service Worker registration
(function () {
  if (!('serviceWorker' in navigator)) {
    console.warn('[SW] Service Workers not supported in this browser');
    return;
  }

  let reloaded = false;
  const bc = ('BroadcastChannel' in window) ? new BroadcastChannel('sw-updates') : null;

  window.addEventListener('load', async () => {
    try {
      // Register the Service Worker
      const reg = await navigator.serviceWorker.register('/sw.js', { scope: '/' });
      console.info('[SW] Registered successfully');

      // Force update check immediately
      await reg.update();

      // If a waiting SW exists, request immediate activation
      if (reg.waiting) {
        reg.waiting.postMessage({ type: 'SKIP_WAITING' });
      }

      // Reload page once when controller changes
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (reloaded) return;
        reloaded = true;
        console.info('[SW] Controller changed, reloading page');
        if (bc) bc.postMessage({ type: 'RELOADING' });
        location.reload();
      });

      // Detect new SW installation and accelerate activation
      reg.addEventListener('updatefound', () => {
        const sw = reg.installing;
        if (!sw) return;
        sw.addEventListener('statechange', () => {
          if (sw.state === 'installed' && navigator.serviceWorker.controller) {
            sw.postMessage({ type: 'SKIP_WAITING' });
            if (bc) bc.postMessage({ type: 'NEW_VERSION_READY' });
          }
        });
      });

    } catch (e) {
      console.error('[SW] Registration failed:', e);
      if (bc) bc.postMessage({ type: 'SW_ERROR', error: e.message });
    }
  });
})();
