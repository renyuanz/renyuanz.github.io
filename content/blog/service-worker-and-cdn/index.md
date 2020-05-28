---
title: Service worker might not work well with your CDN (e.g. Cloudflare)
date: "2020-05-28T07:26:03.284Z"
description: "Be aware of the content type your files are served by CDN."
---

TL;DR: if you want to use service worker to cache static assets, do not use it to cache images when your CDN is doing "same" caching mechanisme.

I recently rebuilt one of the most visited website from Next.js to Sapper (Svelte), the latter provides a native support of service-worker to enchance the app performance which is a good thing to have it maintained by the official team.

Everything went well until I finally pushed code to production, css files or images fetching returns 404 but they acctually exist on the server.

The reason is Cloudflare "Polish" feature (CDN only enabled for production domains) serves images as `.webp` if possible but not changing the pathname. This introduces a mismatch of content type while the pathname remains the same.

Solution is described as I said at the top of this article, disable service-worker.js and let your CDN to handle all static files, or just not handling images in your server-worker.

This is my workaround:

```javascript
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET" || event.request.headers.has("range"))
    return

  const url = new URL(event.request.url)
  // don't try to handle e.g. data: URIs
  if (!url.protocol.startsWith("http")) return

  // don't try to handle images as they are converted to webp by cloudflare
  const imgRegex = new RegExp(/\.(png|jpg|jpeg|gif)$/)
  if (imgRegex.test(url.pathname)) return

  // ignore dev server requests
  if (
    url.hostname === self.location.hostname &&
    url.port !== self.location.port
  )
    return

  // always serve static files and bundler-generated assets from cache
  if (url.host === self.location.host && cached.has(url.pathname)) {
    event.respondWith(caches.match(event.request))
    return
  }

  if (event.request.cache === "only-if-cached") return
})
```
