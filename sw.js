// sw.js — Adrian
const CACHE_NAME = 'adi-site-cache-v6'; // bump când faci modificări
const PRECACHE_URLS = [
  '/', '/index.html', '/about.html', '/writings.html', '/op-ed.html', '/vbox.html',
  // NU include /assets/style.css aici
  '/assets/img/Favicon-new.png',
  '/assets/img/Favicon-new.svg',
  '/assets/img/Favicon-new.ico',
  '/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE_URLS)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(names =>
      Promise.all(names.map(n => (n !== CACHE_NAME ? caches.delete(n) : undefined)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  // 1) Pagini: network-first (fallback la index offline)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => caches.match('/index.html'))
    );
    return;
  }

  // 2) CSS: network-first (vezi imediat modificările)
  if (
    event.request.destination === 'style' ||
    event.request.url.endsWith('.css')
  ) {
    event.respondWith((async () => {
      try {
        const net = await fetch(event.request, { cache: 'no-store' });
        const cache = await caches.open(CACHE_NAME);
        cache.put(event.request, net.clone());
        return net;
      } catch {
        const hit = await caches.match(event.request);
        return hit || new Response('', { status: 504, statusText: 'CSS unavailable' });
      }
    })());
    return;
  }

  // 3) Imagini/SVG/ICO: stale-while-revalidate (nu rămâi cu asset-uri vechi)
  if (
    event.request.destination === 'image' ||
    /\.(png|jpe?g|gif|webp|svg|ico)$/i.test(new URL(event.request.url).pathname)
  ) {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE_NAME);
      const cached = await cache.match(event.request);
      const networkPromise = fetch(event.request).then(resp => {
        cache.put(event.request, resp.clone());
        return resp;
      }).catch(() => null);
      return cached || (await networkPromise) || fetch(event.request);
    })());
    return;
  }

  // 4) Restul: cache-first simplu
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  );
});
