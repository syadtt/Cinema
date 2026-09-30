tailwind.config = {
    theme: {
        extend: {
            colors: { night: '#141210', panel: '#1f1b18', line: '#3a332d', ink: '#efe8dc', mute: '#a39a8e', accent: '#d2452f' },
            fontFamily: { display: ['"Bebas Neue"', 'sans-serif'], sans: ['"DM Sans"', 'sans-serif'] }
        }
    }
};

document.head.insertAdjacentHTML('beforeend',
    '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;700&display=swap">');

document.addEventListener('DOMContentLoaded', () => {
    const h = document.getElementById('hdr');
    if (!h) return;
    h.className = 'border-b border-line';
    h.innerHTML = `<div class="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
    <a href="index.html" class="font-display text-3xl">Lumen</a>
    <nav class="flex gap-5 text-sm"><a href="index.html">Film</a><a href="history.html">Pesanan saya</a></nav>
  </div>`;
});

// PWA: manifest, warna bar browser, ikon iOS, dan service worker
document.head.insertAdjacentHTML('beforeend',
    '<link rel="manifest" href="manifest.json">' +
    '<meta name="theme-color" content="#141210">' +
    '<link rel="apple-touch-icon" href="icons/icon-192.png">');
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => navigator.serviceWorker.register('sw.js'));
}