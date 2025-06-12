/**
 * Service Worker para SecotoGPT
 * Controla el cacheo inteligente y actualizaciones automáticas
 */

const CACHE_NAME = 'secotogpt-v1.0.0';
const DYNAMIC_CACHE = 'secotogpt-dynamic-v1.0.0';

// Archivos que siempre deben estar frescos (no cachear)
const NO_CACHE_FILES = [
  '/secotogpt.html',
  '/src/paginas/',
  '/scripts/version.json'
];

// Archivos estáticos que pueden cachearse por más tiempo
const STATIC_CACHE_FILES = [
  '/imagenes/',
  '/public/tailwind.css',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
  'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css',
  'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap'
];

self.addEventListener('install', event => {
  console.log('🔧 Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('📦 Service Worker: Precaching static files');
        return cache.addAll(STATIC_CACHE_FILES.filter(url => !url.startsWith('http')));
      })
      .then(() => {
        console.log('✅ Service Worker: Installation complete');
        return self.skipWaiting();
      })
  );
});

self.addEventListener('activate', event => {
  console.log('🚀 Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME && cacheName !== DYNAMIC_CACHE) {
              console.log('🗑️ Service Worker: Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('✅ Service Worker: Activation complete');
        return self.clients.claim();
      })
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  
  // Solo interceptar peticiones GET
  if (request.method !== 'GET') {
    return;
  }
  
  // Verificar si es un archivo que no debe cachearse
  const shouldNotCache = NO_CACHE_FILES.some(pattern => 
    url.pathname.includes(pattern)
  );
  
  if (shouldNotCache) {
    // Para archivos HTML y scripts críticos: siempre ir a la red
    event.respondWith(
      fetch(request)
        .then(response => {
          // Clonar respuesta para el caché dinámico
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(DYNAMIC_CACHE)
              .then(cache => {
                cache.put(request, responseClone);
              });
          }
          return response;
        })
        .catch(() => {
          // Si falla la red, intentar desde caché dinámico
          return caches.match(request);
        })
    );
    return;
  }
  
  // Para archivos estáticos: estrategia cache-first
  if (url.pathname.includes('/imagenes/') || 
      url.pathname.includes('/public/') ||
      url.hostname.includes('cdn.') ||
      url.hostname.includes('fonts.')) {
    
    event.respondWith(
      caches.match(request)
        .then(response => {
          if (response) {
            return response;
          }
          
          return fetch(request)
            .then(fetchResponse => {
              const responseClone = fetchResponse.clone();
              caches.open(CACHE_NAME)
                .then(cache => {
                  cache.put(request, responseClone);
                });
              return fetchResponse;
            });
        })
    );
    return;
  }
  
  // Para CSS/JS locales: estrategia stale-while-revalidate
  if (url.pathname.endsWith('.css') || url.pathname.endsWith('.js')) {
    event.respondWith(
      caches.match(request)
        .then(response => {
          const fetchPromise = fetch(request)
            .then(fetchResponse => {
              const responseClone = fetchResponse.clone();
              caches.open(DYNAMIC_CACHE)
                .then(cache => {
                  cache.put(request, responseClone);
                });
              return fetchResponse;
            });
          
          return response || fetchPromise;
        })
    );
    return;
  }
});

// Listener para mensajes del cliente
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    console.log('🔄 Service Worker: Skip waiting requested');
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({
      version: CACHE_NAME,
      timestamp: Date.now()
    });
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    console.log('🗑️ Service Worker: Clearing all caches');
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
      );
    }).then(() => {
      event.ports[0].postMessage({ success: true });
    });
  }
});

// Manejar actualizaciones automáticas
self.addEventListener('updatefound', () => {
  console.log('🔄 Service Worker: Update found');
});

console.log('🎯 Service Worker: SecotoGPT SW loaded successfully');
