// service worker file JP

/* Service worker */
const CACHE_VERSION = 1;
const STATIC_CACHE = `static-cache-v${CACHE_VERSION}`;


/* Functions */



/* Listeners */
self.addEventListener ('install', function (event) {
    
    // store everything that's important into a variable that we will cache 
    const thingsToCache = [
        '/',
        '/index.html',
        '/restaurant.html',
        '/css/jp-styles.css',
        '/data/restaurants.json',
        '/js/dbhelper.js',
        '/js/main.js',
        '/js/restaurant_info.js',
        '/js/sw-controller.js',
        '/img/1.jpg',
        '/img/2.jpg',
        '/img/3.jpg',
        '/img/4.jpg',
        '/img/5.jpg',
        '/img/6.jpg',
        '/img/7.jpg',
        '/img/8.jpg',
        '/img/9.jpg',
        '/img/10.jpg',
    ];

    //
    event.waitUntil(
        caches.open(STATIC_CACHE)
        .then (function (cache) {
            // log the current cache, just for safe measure
            console.log (`Current Cache: ${STATIC_CACHE}`);
            // add all the cached things
            return cache.addAll(thingsToCache);
        })
    );
});