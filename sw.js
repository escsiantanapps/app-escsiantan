const CACHE_NAME = 'esc-siantan-v1';
const assets = [
  'index.html',
  'manifest.json',
  'icon-192.png',
  'icon-512.png'
];

// 1. Tahap Install: Menyimpan file inti ke dalam cache HP
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching assets...');
      return cache.addAll(assets);
    })
  );
});

// 2. Tahap Aktivasi: Menghapus cache lama jika ada update
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
});

// 3. Tahap Fetch: Mengambil data dari cache jika offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});