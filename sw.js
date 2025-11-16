// sw.js — Adrian (state-of-the-art, cap–coadă)
// ► Bump VERSION la fiecare deploy major (activează cache nou + purge vechi)
const VERSION = 'v18';
const CACHES = {
  pages:  `adi-pages-${VERSION}`,
  assets: `adi-assets-${VERSION}`,
  images: `adi-images-${VERSION}`
};

// Pagini pentru offline fallback (NU punem CSS aici — îl tratăm separat, network-first)
const PRECACHE_PAGES = [
  '/', '/index.html', '/about.html', '/writings.html', '/op-ed.html', '/vbox.html'
];
const PRECACHE_ASSETS = [
  '/assets/img/Favicon-new.png',
  '/assets/img/Favicon-new.svg',
  '/assets/img/Favicon-new.ico',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const [pg, as] = await Promise.all([
      caches.open(CACHES.pages),
      caches.open(CACHES.assets)
    ]);
    await pg.addAll(PRECACHE_PAGES);
    await as.addAll(PRECACHE_ASSETS);
  })());
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    // 1) Enable navigation preload where supported (navigații mai rapide)
    if (self.registration.navigationPreload) {
      try { await self.registration.navigationPreload.enable(); } catch {}
    }
    // 2) Purge all old caches
    const keep = new Set(Object.values(CACHES));
    const names = await caches.keys();
    await Promise.all(names.map((n) => (keep.has(n) ? undefined : caches.delete(n))));
    // 3) Claim control imediat
    await self.clients.claim();
  })());
});

// Permite forțarea activării imediat (din pagină): postMessage({type:'SKIP_WAITING'})
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});

// Utilitar: limitează numărul de intrări dintr-un cache (FIFO simplu)
async function limitCache(cacheName, maxEntries = 60) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  const extra = keys.length - maxEntries;
  for (let i = 0; i < extra; i++) await cache.delete(keys[i]);
}

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  const dest = event.request.destination;

  // 1) Navigații: network-first cu preload; fallback la /index.html offline
  if (event.request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const preload = await event.preloadResponse;
        const netResp = preload || await fetch(event.request);
        if (netResp && (netResp.ok || netResp.type === 'opaqueredirect')) {
          const cache = await caches.open(CACHES.pages);
          cache.put(event.request, netResp.clone());
        }
        return netResp;
      } catch {
        const cache = await caches.open(CACHES.pages);
        return (await cache.match(event.request)) ||
               (await cache.match('/index.html')) ||
               new Response('<h1>Offline</h1><p>Pagina nu este disponibilă.</p>', {
                 headers: {'Content-Type': 'text/html'},
                 status: 504,
                 statusText: 'Offline'
               });
      }
    })());
    return;
  }

  // 2) CSS: network-first (fără stocarea din browser cache), apoi cache în assets
  if (dest === 'style' || url.pathname.endsWith('.css')) {
    event.respondWith((async () => {
      try {
        const net = await fetch(event.request, { cache: 'no-store' });
        if (net && net.ok) {
          const cache = await caches.open(CACHES.assets);
          cache.put(event.request, net.clone());
        }
        return net;
      } catch {
        const cache = await caches.open(CACHES.assets);
        const hit = await cache.match(event.request);
        return hit || new Response('/* CSS unavailable */', {
          status: 504,
          statusText: 'CSS unavailable'
        });
      }
    })());
    return;
  }

  // 3) Imagini/SVG/ICO: stale-while-revalidate (+ limitare intrări)
  if (dest === 'image' || /\.(png|jpe?g|gif|webp|svg|ico|avif|bmp)$/i.test(url.pathname)) {
    event.respondWith((async () => {
      const cache = await caches.open(CACHES.images);
      const cached = await cache.match(event.request);
      const networkPromise = fetch(event.request).then(async (resp) => {
        if (resp && (resp.ok || resp.type === 'opaque')) {
          cache.put(event.request, resp.clone());
          limitCache(CACHES.images, 80);
        }
        return resp;
      }).catch(() => null);
      return cached || (await networkPromise) || fetch(event.request);
    })());
    return;
  }

  // 4) Restul: cache-first din assets, apoi rețea, apoi populate cache
  event.respondWith((async () => {
    const cache = await caches.open(CACHES.assets);
    const cached = await cache.match(event.request);
    if (cached) return cached;
    const resp = await fetch(event.request).catch(() => null);
    if (resp && (resp.ok || resp.type === 'opaque')) cache.put(event.request, resp.clone());
    return resp || new Response('Resource unavailable', { status: 504 });
  })());
});
