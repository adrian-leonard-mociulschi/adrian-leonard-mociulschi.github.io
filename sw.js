const CACHE_NAME = 'adi-site-cache-v3';
const PRECACHE_URLS = [
  '/', '/index.html', '/about.html', '/writings.html', '/op-ed.html', '/vbox.html',
  // NU mai include /assets/style.css aici
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

  // 2) CSS: network-first (ca să vezi imediat modificările)
  if (event.request.destination === 'style') {
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

  // 3) Restul (imagini, svg, ico): cache-first
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  );
});
