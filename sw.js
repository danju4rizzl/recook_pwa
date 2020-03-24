const staticCacheName = 'site-static-v1';

const assets = [
  '/',
  '/index.html',
  '/js/app.js',
  '/js/ui.js',
  '/js/materialize.min.js',
  '/css/styles.css',
  '/css/materialize.min.css',
  '/img/dish.png',
  // The next 2 CDN links are for fonts
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://fonts.gstatic.com/s/materialicons/v50/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2'
];

// install the service worker
self.addEventListener('install', evt => {
  // console.log('Service Worker is Installed', evt);
  evt.waitUntil(
    caches.open(staticCacheName).then(cache => {
      console.log('Caching service worker');
      cache.addAll(assets);
    })
  );
});

// Activate
self.addEventListener('activate', evt => {
  // console.log('service worker has be activated');
  evt.waitUntil(
    caches.keys().then(keys => {
      Promise.all(
        keys
          .filter(key => key !== staticCacheName)
          .map(key => caches.delete(key))
      );
    })
  );
});

// Fetch event
self.addEventListener('fetch', evt => {
  // console.log('Event fetched!🔥', evt);
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request);
    })
  );
});
