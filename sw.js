const CACHE_NAME = 'adi-site-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/about.html',
  '/writings.html',
  '/op-ed.html',
  '/vbox.html',
  '/assets/style.css',
  '/assets/img/Favicon-new.png',
  '/assets/img/Favicon-new.svg',
  '/assets/img/Favicon-new.ico',
  '/manifest.json' // cache manifest too
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting(); // activate immediately
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(name => (name !== CACHE_NAME ? caches.delete(name) : undefined))
      )
    )
  );
  self.clients.claim(); // take control without reload
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  if (event.request.mode === 'navigate') {
    // Network first for pages, fallback to index.html offline
    event.respondWith(
      fetch(event.request).catch(() => caches.match('/index.html'))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
