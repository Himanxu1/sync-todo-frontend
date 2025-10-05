self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open("offline-cache")
      .then((cache) =>
        cache.addAll(["/", "/index.html", "/static/js/bundle.js"])
      )
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});

self.addEventListener("sync", (event) => {
  if (event.tag === "sync-tasks") {
    event.waitUntil(syncWithServer());
  }
});
