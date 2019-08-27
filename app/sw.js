const cacheName = 'cache-v1';
const filesToCache = [
    '/',
    '/index.html',
    '/index.html?homescreen=1',
    '/?homescreen=1',
    '/styles/main.css',
    '/scripts/main.min.js',
    '/sounds/airhorn.mp3'
]

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName)
            .then(cache => {
                cache.addAll(filesToCache);
            })
    )
})

self.addEventListener('fetch', event => {
    console.log(event.request.url);
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response
                }

                return fetch(event.request);
            })

    )
})

self.addEventListener('activate', event => {
    console.log("Activated");
})
