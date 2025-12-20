var CACHE_NAME = "readify-cache-v1";
var urlsToCache = [
    "index.html",
    "books.html",
    "tracker.html",
    "random.html",
    "flow.html",
    "feedback.html",
    "css/style.css",
    "js/main.js",
    "images/hero-books.jpg",
    "images/author-placeholder.jpg",
    "images/favicon-192.png",
    "images/favicon-512.png"
];

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            if (response) {
                return response;
            }
            return fetch(event.request);
        })
    );
});
