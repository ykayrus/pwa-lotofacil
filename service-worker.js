const CACHE_NAME = "loto-facil-v1";
const urlsToCache = [
    "/",
    "/index.html",
    "/style2.css",
    "/img/loto.png",
    "/manifest.json"
];

// Instalando o Service Worker e armazenando os arquivos no cache
self.addEventListener("install", (event) => {
    console.log("[Service Worker] Instalando...");
    self.skipWaiting(); // Ativa imediatamente
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("[Service Worker] Arquivos em cache adicionados com sucesso!");
            return cache.addAll(urlsToCache);
        }).catch((error) => console.error("[Service Worker] Falha ao adicionar ao cache:", error))
    );
});

// Intercepta as requisições e retorna arquivos do cache
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            if (response) {
                console.log("[Service Worker] Retornando do cache:", event.request.url);
                return response;
            }
            console.log("[Service Worker] Buscando da rede:", event.request.url);
            return fetch(event.request).catch(() => {
                console.warn("[Service Worker] Falha ao buscar da rede:", event.request.url);
                return caches.match("/index.html"); // Retorna a página principal como fallback
            });
        })
    );
});

// Atualiza o Service Worker limpando o cache antigo e assumindo controle imediato
self.addEventListener("activate", (event) => {
    console.log("[Service Worker] Ativando...");
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log("[Service Worker] Removendo cache antigo:", cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
    self.clients.claim(); // Assume controle imediatamente
});
