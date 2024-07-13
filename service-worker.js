const cacheName = 'uts-app-v1';
const assets = [
  '/',
  '/index.html',
  '/styles.css',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css',
  '/images/logo.png'  // Add paths to other assets that you want to cache
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(assets);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== cacheName) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
