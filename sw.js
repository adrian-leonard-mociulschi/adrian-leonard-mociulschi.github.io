// sw.js (root scope)
/* v1.1 - activare imediată + claim + fallback simplu */

const CACHE_NAME = 'alm-cache-v1';
const urlsToCache = [
  '/',                 // pagina principală
  '/install.html',     // (opțional) pagina de test install
  '/install.js',       // (opțional) scriptul de install UI
  '/manifest.json',
  '/Favicon-new.png',
  '/Favicon-new.ico'
];

// Instalare și cache inițial
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
  self.skipWaiting(); // nou: promovează imediat SW-ul curent
});

// Activare (preia controlul fără reload suplimentar)
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Interceptare request-uri (cache-first, altfel network)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
