self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open('golf-leaderboard-v1').then(function(cache) {
        return cache.addAll([
          '/',
          '/index.html',
          '/styles.css',
          '/app.js',
          '/manifest.json',
          '/day1.html',
          '/day2.html',
          '/day3.html',
          '/players.html',
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
  