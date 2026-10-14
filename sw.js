/* matcha design — offline shell */
var C='matcha-v1';
var FILES=["./", "index.html", "app.css", "fonts.css", "app.js", "data.js", "manifest.webmanifest", "assets/alpha-black.png", "assets/alpha-white.png", "assets/ed-wide.webp", "assets/hero-poster.jpg", "assets/hero.mp4", "assets/icon-192.png", "assets/icon-512.png", "assets/logo.png", "assets/p-camel-coat.webp", "assets/p-charcoal-coat.webp", "assets/p-sage-trench.webp", "assets/p-white-blazer.webp", "assets/story.webp", "fonts/1bf6b305a1.woff2", "fonts/28cfb3cb62.woff2", "fonts/2d243d02e5.woff2", "fonts/37513bae48.woff2", "fonts/52a6c245b9.woff2", "fonts/fd6f40d144.woff2"];
self.addEventListener('install',function(e){
  self.skipWaiting();
  e.waitUntil(caches.open(C).then(function(c){return c.addAll(FILES).catch(function(){});}));
});
self.addEventListener('activate',function(e){
  e.waitUntil(caches.keys().then(function(k){
    return Promise.all(k.filter(function(n){return n!==C;}).map(function(n){return caches.delete(n);}));
  }).then(function(){return self.clients.claim();}));
});
self.addEventListener('fetch',function(e){
  if(e.request.method!=='GET') return;
  var u=new URL(e.request.url);
  if(u.origin!==location.origin) return;
  e.respondWith(caches.match(e.request).then(function(r){
    return r || fetch(e.request).then(function(res){
      var copy=res.clone();
      caches.open(C).then(function(c){c.put(e.request,copy);});
      return res;
    }).catch(function(){ return caches.match('index.html'); });
  }));
});
