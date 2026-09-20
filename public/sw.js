// HeritageQuest Progressive Web App Service Worker (v2.0.0)
// Provides full offline resilience for rural/low-network heritage sites & all mobile/desktop devices

const CACHE_NAME = 'heritagequest-v3';
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/assets/hosts/taj-mahal-male.svg',
  '/assets/hosts/taj-mahal-female.svg',
  '/assets/hosts/mysore-palace-male.svg',
  '/assets/hosts/mysore-palace-female.svg',
  '/assets/hosts/konark-sun-temple-male.svg',
  '/assets/hosts/konark-sun-temple-female.svg',
  '/assets/hosts/gateway-of-india-male.svg',
  '/assets/hosts/gateway-of-india-female.svg',
  '/assets/hosts/hawa-mahal-male.svg',
  '/assets/hosts/hawa-mahal-female.svg',
  '/assets/hosts/victoria-memorial-male.svg',
  '/assets/hosts/victoria-memorial-female.svg',
  '/assets/hosts/brihadisvara-temple-male.svg',
  '/assets/hosts/brihadisvara-temple-female.svg',
  '/assets/hosts/sanchi-stupa-male.svg',
  '/assets/hosts/sanchi-stupa-female.svg'
];

// Install Event: Pre-cache app shell & skip waiting to activate immediately
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Pre-caching core HeritageQuest app shell (v2)...');
      return cache.addAll(PRECACHE_ASSETS);
    })
  );
});

// Activate Event: Delete legacy caches (heritagequest-v1) and claim clients immediately
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[Service Worker] Purging legacy cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event: Network-First for HTML/JS/CSS bundles to ensure updates propagate instantly,
// Stale-While-Revalidate for static media assets.
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Ignore non-GET requests or browser extension requests
  if (request.method !== 'GET' || !url.protocol.startsWith('http')) {
    return;
  }

  // Strategy 1: HTML / Navigation / JS & CSS bundles -> Network First, update cache, fallback to cache
  if (
    request.mode === 'navigate' ||
    request.destination === 'script' ||
    request.destination === 'style' ||
    url.pathname.endsWith('.html') ||
    url.pathname.includes('/assets/')
  ) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
          }
          return response;
        })
        .catch(() => {
          return caches.match(request).then((cached) => {
            if (cached) return cached;
            if (request.mode === 'navigate') {
              return caches.match('/index.html') || caches.match('/');
            }
          });
        })
    );
    return;
  }

  // Strategy 2: Images & Fonts -> Cache First with background network update
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const fetchPromise = fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
          }
          return networkResponse;
        })
        .catch(() => cachedResponse);

      return cachedResponse || fetchPromise;
    })
  );
});
