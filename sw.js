const staticCacheName = 'cache-v8'
const prefetchFiles = [
    '/',
    '/index.html',
    '/sw.js',
    '/imgs/app-icon_16x16.png',
    '/imgs/app-icon_32x32.png',
    '/imgs/app-icon_48x48.png',
    '/imgs/app-icon_64x64.png',
    '/imgs/app-icon_72x72.png',
    '/imgs/app-icon_96x96.png',
    '/imgs/app-icon_128x128.png',
    '/imgs/app-icon_152x152.png',
    '/imgs/app-icon_192x192.png',
    '/imgs/app-icon_512x512.png',
    '/imgs/app-icon.png',
    '/imgs/Elon_Musk.jpg',
    '/imgs/pwaLogo.png'
]

self.addEventListener('install', function(event) {
    console.log('[Service Worker] Installing Service Worker ...', event);
    event.waitUntil(
        caches.open(staticCacheName).then(cache => {
            console.log('Opened cache');
            
            return cache.addAll(prefetchFiles);
      })
    );
});

self.addEventListener('activate', (event) => {
    console.log('[Service Worker] Activating Service Worker ...', event);
    
    event.waitUntil(  
        caches.keys().then((keyList) => {  
            return Promise.all(
                keyList.map((key) => {  
                    console.log('[ServiceWorker] Removing old cache', key);  
                    if (key !== staticCacheName) {  
                        return caches.delete(key);  
                    }  
                })
            );  
        })  
    ); 
});

// Deal with online & offline mode
self.addEventListener('fetch', event => {
	console.log('[ServiceWorker] Fetch', event.request.url);

	event.respondWith(
        caches.match(event.request).then(function(response) {  
          return response || fetch(event.request);  
        }) 
	);
});