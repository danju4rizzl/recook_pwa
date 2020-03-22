// install the service worker
self.addEventListener('install', evt => {
  console.log('Service Worker is Installed', evt);
});

// Activate
self.addEventListener('activate', evt => {
  console.log('service worker has be activated');
});
