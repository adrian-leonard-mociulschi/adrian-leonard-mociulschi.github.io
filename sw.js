// sw.js — Improved Version for GitHub Pages
// VERSION bump for cache-busting
const VERSION = 'v38';
const CACHES = {
  pages:  `adi-pages-${VERSION}`,
  assets: `adi-assets-${VERSION}`,
  images: `adi-images-${VERSION}`
};

const PRECACHE_PAGES = [
  '/', '/index.html', '/about.html', '/writings.html', '/op-ed.html', '/vbox.html'
];
const PRECACHE_ASSETS = [
  '/assets/img/Favicon-new.png',
  '/assets/img/Favicon-new.svg',
  '/assets/img/Favicon-new.ico',
  '/manifest.json'
];

// BroadcastChannel for notifying clients about updates
const bc = ('BroadcastChannel' in self) ? new BroadcastChannel('sw-updates') : null;

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
    if (self.registration.navigationPreload) {
      try { await self.registration.navigationPreload.enable(); } catch {}
    }
    const keep = new Set(Object.values(CACHES));
    const names = await caches.keys();
    await Promise.all(names.map((n) => (keep.has(n) ? undefined : caches.delete(n))));
    await self.clients.claim();
    if (bc) {
      bc.postMessage({ type: 'SW_ACTIVATED', version: VERSION });
      bc.postMessage({ type: 'SW_UPDATED',    version: VERSION });
    }
  })());
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});

// Limit cache entries globally
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

  // Navigation: network-first with preload, fallback offline
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
                 headers: {
                   'Content-Type': 'text/html',
                   'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'"
                 },
                 status: 504,
                 statusText: 'Offline'
               });
      }
    })());
    return;
  }

  // Ticker: always network-first, NO caching
  if (url.pathname.endsWith('/ticker.json')) {
    event.respondWith((async () => {
      try {
        return await fetch(event.request, { cache: 'reload' });
      } catch {
        return new Response('{}', { status: 504 });
      }
    })());
    return;
  }

  // CSS: network-first, then cache
  if (dest === 'style' || url.pathname.endsWith('.css')) {
    event.respondWith((async () => {
      try {
        const net = await fetch(event.request, { cache: 'reload' });
        if (net && net.ok) {
          const cache = await caches.open(CACHES.assets);
          cache.put(event.request, net.clone());
        }
        return net;
      } catch {
        const cache = await caches.open(CACHES.assets);
        const hit = await cache.match(event.request, { ignoreSearch: true });
        return hit || new Response('/* CSS unavailable */', { status: 504 });
      }
    })());
    return;
  }

  // Images: stale-while-revalidate
  if (dest === 'image' || /(png|jpe?g|gif|webp|svg|ico|avif|bmp)$/i.test(url.pathname)) {
    event.respondWith((async () => {
      const cache = await caches.open(CACHES.images);
      const cached = await cache.match(event.request, { ignoreSearch: true });
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

  // Other: cache-first, then network
  event.respondWith((async () => {
    const cache = await caches.open(CACHES.assets);
    const cached = await cache.match(event.request, { ignoreSearch: true });
    if (cached) return cached;
    const resp = await fetch(event.request).catch(() => null);
    if (resp && (resp.ok || resp.type === 'opaque')) cache.put(event.request, resp.clone());
    return resp || new Response('Resource unavailable', { status: 504 });
  })());
});
