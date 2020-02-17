
    var CACHE_NAME = 'ModelViewer';
    var urlsToCache = [
    	"./876724.json",
	"./README.md",
	"./__game-scripts.js",
	"./__loading__.js",
	"./__modules__.js",
	"./__start__.js",
	"./config.json",
	"./files/assets/28157566/1/sandy_cloth_parker.vrm",
	"./files/assets/28157568/1/sandy_christmas01.vrm",
	"./files/assets/28157569/1/mplus-2p-medium.png",
	"./files/assets/28157572/1/sandy_onepiece.vrm",
	"./files/assets/28157573/1/ammo.js",
	"./files/assets/28157579/1/sandy_powersuit.vrm",
	"./files/assets/28157580/1/transformToonEdgeVS.glsl",
	"./files/assets/28157583/1/ammo.wasm.wasm",
	"./files/assets/28157585/1/ammo.wasm.js",
	"./files/assets/28157586/1/transformToonEdgeSkinnedVS.glsl",
	"./files/assets/28157587/1/arrow512.png",
	"./files/assets/28157588/1/arrow-right512.png",
	"./files/assets/28157594/1/Stabbing.json",
	"./files/assets/28157597/1/lightDiffueseToonPS.glsl",
	"./files/assets/28157598/1/Stabbing.json",
	"./files/assets/28157602/1/mplus-1m-bold.png",
	"./files/assets/28157604/1/edgeToonPS.glsl",
	"./files/assets/28157605/1/sandy_cloth_t-shirts.vrm",
	"./files/assets/28159123/1/anim2.json",
	"./files/assets/28159403/1/anim3.json",
	"./files/assets/28159408/1/anim3.json",
	"./files/assets/28159524/1/sendagaya-shibu.vrm",
	"./index.html",
	"./logo.png",
	"./manifest.json",
	"./playcanvas-stable.min.js",
	"./styles.css"
    ];
    
    self.addEventListener("install", function(event) {
      event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
          return cache.addAll(urlsToCache);
        })
      );
    });
    
    self.addEventListener('activate', function(event) {
      event.waitUntil(
        caches.keys().then(function(keys) {
              var promises = [];
              keys.forEach(function(cacheName) {
                if (cacheName != CACHE_NAME)
                  promises.push(caches.delete(cacheName));
              });
              return Promise.all(promises);
            }));
    });

    self.addEventListener('fetch', (event) => {
      event.respondWith(
        caches.match(event.request, {
          ignoreSearch: true
        }).then((response) => {
          if (response) {
            return response;
          }
          let fetchRequest = event.request.clone();
          return fetch(fetchRequest)
            .then((response) => {
              let responseToCache = response.clone();
              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(event.request, responseToCache);
                });
              return response;
            });
        })
      );
    });

    