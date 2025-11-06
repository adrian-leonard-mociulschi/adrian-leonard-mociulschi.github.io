// sw.js — killer (deploy 1)
self.addEventListener('install', (event) => {
  // activare imediată
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    // 1) curățăm toate cache-urile
    const keys = await caches.keys();
    await Promise.all(keys.map((k) => caches.delete(k)));

    // 2) dezinstalăm service worker-ul
    await self.registration.unregister();

    // 3) reîncărcăm ferestrele controlate, ca să iasă de sub SW
    const clients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    clients.forEach((c) => c.navigate(c.url));
  })());
});

// fără fetch handler: nu mai interceptăm nimic
