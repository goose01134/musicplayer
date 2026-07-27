// Name of the cache
const CACHE_NAME = "squeeze-cache-v1";

// Files to cache
const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/manifest.json",
  "/style.css",
  "/app.js",
  "/assets/icon.png",
  "/24K_Magic_KLICKAUD.mp3"
];

// Install event
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate event
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// Fetch event (offline support)
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // Serve from cache first, then network
      return response || fetch(event.request);
    })
  );
});
