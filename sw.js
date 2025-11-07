
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
  '/assets/img/Favicon-new.ico'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
