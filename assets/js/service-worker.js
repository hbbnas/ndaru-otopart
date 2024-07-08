// service-worker.js

const CACHE_NAME = 'ndaru-otopart-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/about.html',
  '/service.html',
  '/project.html',
  '/assets/css/style.css',
  '/assets/images/logo.png',
  '/assets/images/hero-banner.png',
  '/assets/images/hero-bg.jpg',
  // Add other assets that you want to cache
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
