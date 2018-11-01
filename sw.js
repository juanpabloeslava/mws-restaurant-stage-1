// service worker file JP

/* Service worker */
const CACHE_VERSION = 1;
const STATIC_CACHE = `static-cache-v${CACHE_VERSION}`;

/* Listeners */
// Listen for Install Event
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
    // the .waitUntil method is used to tell the browser not to terminate the service worker until 
    // the promise passed to .waitUntil is either resolved or rejected. GOOD TO REMEMBER
    event.waitUntil (
        caches.open(STATIC_CACHE)
        .then (function (cache) {
            // log the current cache, just for safe measure
            console.log (`Current Cache: ${STATIC_CACHE}`);
            // add all the cached things
            return cache.addAll(thingsToCache);
        })
    );
});

// Listen for Activate Event
self.addEventListener('activate', function(event) {
    event.waitUntil (
        caches.keys()
        .then( function (cacheNames) {
            return Promise.all(
                cacheNames.filter(function(cacheName) {
                    // get all old cache versions
                    return cacheName.startsWith('static-cache-') && cacheName != STATIC_CACHE;
                }).map(function (cacheName) {
                    // delete previous cache versions
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

// Listen for Fetch Event 
self.addEventListener ('fetch', function (event) {
    // respond to the request with our stored data first (offline first)
    event.respondWith (
        // look in the cached data for a match of the request
        caches.match(event.request)
        .then( function (response) {
            // If there's a match, return it, if not, fetch a request
            if (response) {
                console.log (`Request ${event.request} was Found in Cache`); 
                return response; 
            } else {
                console.log (`Request ${event.request} was NOT FOUND in Cache. FETCHING NOW...`); 
                // fetch the request
                fetch (event.request)
                // it worked, so go add the request to the cache, for later use
                .then ( function (response) {
                    caches.open (STATIC_CACHE)
                    .then ( function (cache) {
                        cache.put (event.request, response);
                    })
                    return response;
                })
                // it didn't work, so log the error
                .catch ( function (error) {
                    console.log (`There was an error: ${error}`);
                })
            }
        })
    );
});
