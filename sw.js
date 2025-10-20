const CACHE_NAME = 'alm-cache-v1';
const urlsToCache = [
  '/',
  '/manifest.json',
  '/Favicon-new.png',
  '/Favicon-new.ico'
];

// Instalare și cache inițial
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Interceptare request-uri
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
