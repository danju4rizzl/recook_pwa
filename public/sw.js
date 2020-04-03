const staticCacheName = 'site-static-v4';
const dynamicCacheName = 'site-dynamic-v4';

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
  'https://fonts.gstatic.com/s/materialicons/v50/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2',
  // This is the fallback page incase the user is offline
  '/pages/offline.html'
];

// Caching size limit function
const limitCacheSize = (name, size) => {
  caches.open(name).then(cache => {
    cache.keys().then(keys => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};

// install the service worker
self.addEventListener('install', evt => {
  // console.log('Service Worker is Installed', evt);
  evt.waitUntil(
    caches.open(staticCacheName).then(cache => {
      // console.log('Caching service worker');
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
          .filter(key => key !== staticCacheName && key !== dynamicCacheName)
          .map(key => caches.delete(key))
      );
    })
  );
});

// Fetch event
self.addEventListener('fetch', evt => {
  if (evt.request.url.indexOf('firestore.googleapis.com') === -1) {
    evt.respondWith(
      caches
        .match(evt.request)
        .then(cacheRes => {
          return (
            cacheRes ||
            fetch(evt.request).then(fetchRes => {
              return caches.open(dynamicCacheName).then(cache => {
                cache.put(evt.request.url, fetchRes.clone());
                limitCacheSize(dynamicCacheName, 15);
                return fetchRes;
              });
            })
          );
        })
        .catch(() => {
          if (evt.request.url.indexOf('.html') > -1) {
            return caches.match('/pages/offline.html');
          }
        })
    );
  }
});
