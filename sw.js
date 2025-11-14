// sw.js — Adrian
const CACHE_NAME = 'adi-site-cache-v9'; // bump când faci modificări
const PRECACHE_URLS = [
  '/', '/index.html', '/about.html', '/writings.html', '/op-ed.html', '/vbox.html',
  // The "/assets/style.css" file should not be included here.
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

  // 1) Pages: Network-first with an offline index as a fallback.
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => caches.match('/index.html'))
    );
    return;
  }

  // 2) Pages: Network-first with an offline index as a fallback.
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

  // 3) Images/SVG/ICO: stale-while-revalidate. Don't stick with old assets.
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

  // 4) The rest is simple: cache-first.
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  );
});
