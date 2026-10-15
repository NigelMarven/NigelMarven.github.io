/* Service worker CyberJournal 2077: кэширует всё приложение для работы офлайн.
   Версия меняется при каждой сборке — так телефон узнаёт, что вышло обновление. */
const VERSION = '20261016-024244';
const CACHE = `cyberjournal-${VERSION}`;
const FILES = ['./', 'app.js', 'fonts/f000.woff2', 'fonts/f001.woff2', 'fonts/f002.woff2', 'fonts/f003.woff2', 'fonts/f004.woff2', 'fonts/f005.woff2', 'fonts/f006.woff2', 'fonts/f007.woff2', 'fonts/f008.woff2', 'fonts/f009.woff2', 'fonts/f010.woff2', 'fonts/f011.woff2', 'fonts/f012.woff2', 'fonts/f013.woff2', 'fonts/f014.woff2', 'fonts/fonts.css', 'icons/apple-touch-icon.png', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/icon-maskable-512.png', 'index.html', 'manifest.webmanifest', 'vendor/lucide-react.min.js', 'vendor/react.production.min.js', 'vendor/react-dom.production.min.js', 'vendor/tailwind.js'];

self.addEventListener('install', (e) => {
  e.waitUntil((async () => {
    const c = await caches.open(CACHE);
    await c.addAll(FILES.map((f) => new Request(f, { cache: 'reload' })));
    /* GitHub Pages обновляет файлы не одновременно: какое-то время рядом с новым sw.js
       могут лежать старые index.html / app.js. Принимаем кэш, только если оба файла из этой сборки,
       иначе установка отменяется и повторится при следующем запуске. */
    const idx = await (await c.match('index.html')).text();
    const app = await (await c.match('app.js')).text();
    if (!idx.includes(VERSION) || !app.includes(VERSION)) {
      await caches.delete(CACHE);
      throw new Error(`build ${VERSION}: site still serves older files, retry later`);
    }
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('cyberjournal-') && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  e.respondWith(
    caches.match(req, { ignoreSearch: true }).then((hit) => hit || fetch(req).catch(() => (
      req.mode === 'navigate' ? caches.match('./index.html') : Response.error()
    )))
  );
});
