self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('my-cache')
            .then(function(cache) {
            return cache.addAll([
                '/',
                '/index.html',
                '/css/index.css',
                '/img/TurkceWordle_256.png'
            ]);
        })
    );
    self.skipWaiting();
});

self.addEventListener('fetch', function(event) {
    // Check if the request is for the file you want to always fetch from the network
    if (event.request.url.includes('i18n') || event.request.url.includes('dictionaries')) {
        // Fetch the file from the network
        event.respondWith(fetch(event.request));
    } else {
        // For other files, serve them from the cache
        event.respondWith(
            caches.match(event.request).then(function(response) {
                return response || fetch(event.request);
            })
        );
    }
});
