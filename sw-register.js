// sw-register.js — NASA-level optimized Service Worker registration
(function () {
  // Check for Service Worker support
  if (!('serviceWorker' in navigator)) {
    console.warn('[SW] Service Workers not supported in this browser');
    return;
  }

  let reloaded = false;

  // Use BroadcastChannel if available for SW status notifications
  const bc = ('BroadcastChannel' in window) ? new BroadcastChannel('sw-updates') : null;

  window.addEventListener('load', async () => {
    try {
      // Register the Service Worker (ensure /sw.js is at root for scope '/')
      const reg = await navigator.serviceWorker.register('/sw.js', { scope: '/' });
      console.info('[SW] Registered successfully:', reg);

      // Force update check immediately after registration
      await reg.update();

      // If a waiting SW exists, request immediate activation
      if (reg.waiting) {
        console.info('[SW] Found waiting SW, sending SKIP_WAITING');
        reg.waiting.postMessage({ type: 'SKIP_WAITING' });
      }

      // Reload page once when controller changes (new SW takes control)
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
        console.info('[SW] Update found, state:', sw.state);
        sw.addEventListener('statechange', () => {
          console.info('[SW] State changed to', sw.state);
          if (sw.state === 'installed' && navigator.serviceWorker.controller) {
            console.info('[SW] New SW installed, sending SKIP_WAITING');
            sw.postMessage({ type: 'SKIP_WAITING' });
            if (bc) bc.postMessage({ type: 'NEW_VERSION_READY' });
          }
        });
      });

    } catch (e) {
      console.error('[SW] Registration or update failed:', e);
      if (bc) bc.postMessage({ type: 'SW_ERROR', error: e.message });
    }
  });
})();
