// service-worker.js

// Nama cache yang digunakan untuk menyimpan aset
const CACHE_NAME = 'ndaru-otopart-cache-v1';

// Daftar URL aset yang akan disimpan dalam cache
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
  // Tambahkan aset lain yang ingin Anda simpan dalam cache
];

// Event listener yang dipanggil saat service worker di-install
self.addEventListener('install', event => {
  event.waitUntil(
    // Membuka cache dengan nama CACHE_NAME
    caches.open(CACHE_NAME)
      .then(cache => {
        // Menambahkan semua URL dalam daftar urlsToCache ke dalam cache
        return cache.addAll(urlsToCache);
      })
  );
});

// Event listener yang dipanggil setiap kali ada permintaan fetch
self.addEventListener('fetch', event => {
  event.respondWith(
    // Mencocokkan permintaan fetch dengan entri yang ada dalam cache
    caches.match(event.request)
      .then(response => {
        if (response) {
          // Mengembalikan respons dari cache jika tersedia
          return response;
        }
        // Jika tidak ada dalam cache, lakukan fetch ke jaringan
        return fetch(event.request);
      })
  );
});

// Event listener yang dipanggil saat service worker di-aktivasi
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    // Menghapus cache lama yang tidak termasuk dalam cacheWhitelist
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
