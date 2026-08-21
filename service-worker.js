const CACHE='door2airport-v4';
const ASSETS=['/','/index.html','/styles.css','/script.js','/manifest.webmanifest','/assets/logo.svg','/assets/favicon.svg','/assets/app-icon.svg','/assets/app-icon-192.png','/assets/app-icon-512.png','/assets/apple-touch-icon.png','/assets/hero-van.png','/assets/jerry-walsh-driver.jpg','/assets/whatsapp.svg'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{if(event.request.method!=='GET')return;event.respondWith(fetch(event.request).then(response=>{const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));return response}).catch(()=>caches.match(event.request).then(hit=>hit||caches.match('/index.html'))))});
