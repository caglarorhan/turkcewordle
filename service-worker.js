self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('my-cache').then(function(cache) {
            return cache.addAll([
                '/',
                '/index.html',
                '/css/index.css',
                '/js/index.js',
                '/img/TurkceWordle_256.png',
                '/js/dictionary.js',
                '/js/materialize.min.js',
                '/css/materialize.min.css'
            ]);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});
