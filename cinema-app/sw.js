const CACHE = 'lumen-v2';
const LOCAL = ['./', 'index.html', 'movie.html', 'seats.html', 'checkout.html', 'ticket.html', 'history.html',
    'js/ui.js', 'js/data.js', 'js/storage.js', 'manifest.json', 'icons/icon-192.png', 'icons/icon-512.png',
    'assets/posters/1.jpg', 'assets/posters/2.jpg', 'assets/posters/3.jpg',
    'assets/posters/4.jpg', 'assets/posters/5.jpg', 'assets/posters/6.jpg'];
const CDN = ['https://cdn.tailwindcss.com',
    'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js',
    'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;700&display=swap'];

self.addEventListener('install', e => {
    e.waitUntil(caches.open(CACHE).then(async c => {
        await c.addAll(LOCAL);
        // file CDN disimpan tanpa CORS; kalau satu gagal, instalasi tetap lanjut
        await Promise.allSettled(CDN.map(u => fetch(u, { mode: 'no-cors' }).then(r => c.put(u, r))));
    }));
    self.skipWaiting();
});

self.addEventListener('activate', e => {
    e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))));
    self.clients.claim();
});

const put = (req, res) => {
    if (res.ok || res.type === 'opaque') { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
    return res;
};
// file proyek: ambil yang terbaru dulu, cache hanya cadangan saat offline (jadi edit kode langsung terlihat)
const networkFirst = r => fetch(r).then(res => put(r, res)).catch(() => caches.match(r, { ignoreSearch: true }));
// file CDN: pakai cache dulu supaya cepat dan tetap jalan offline
const cacheFirst = r => caches.match(r).then(hit => hit || fetch(r).then(res => put(r, res)));

self.addEventListener('fetch', e => {
    if (e.request.method !== 'GET') return;
    const own = new URL(e.request.url).origin === location.origin;
    e.respondWith(own ? networkFirst(e.request) : cacheFirst(e.request));
});