'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "version.json": "db8990b8a733cdd52065ba1549ba9aa5",
"index.html": "a7ffe2694596030e06e2569003d29831",
"/": "a7ffe2694596030e06e2569003d29831",
"main.dart.js": "8b09864f3091c825645e9b96479104a7",
"style.css": "216cbd04e6c1723ff8369b69bd0c078d",
"manifest.json": "c8605336f2ed7f96327720b3fd5e8191",
"assets/dotenv": "248ec69c4a3b1920d05366f01f1d4ca7",
"assets/AssetManifest.json": "26e86b9339d7eb0d4b7ee3a9d0b73fa4",
"assets/NOTICES": "70409a8453bd7584a669cd3495fbadb9",
"assets/FontManifest.json": "f0f4be009d67b49f6afb66286f706923",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/shaders/ink_sparkle.frag": "90a12a7948bc92b38796f86bce2a1746",
"assets/fonts/MaterialIcons-Regular.otf": "95db9098c58fd6db106f1116bae85a0b",
"assets/assets/experience/GDSC.png": "a144476dba333629f9a232e8c7cd64bf",
"assets/assets/experience/coding-ninjas.png": "5b94a7d8ef90a9b60a3967745e044778",
"assets/assets/experience/ekko.png": "465a59cd0ceb084c32ff599c728168b1",
"assets/assets/experience/Zero2One.png": "5ed2ddf32e38981a3d4c2df612768d6a",
"assets/assets/experience/RCJ.png": "d0e15087a703e869e0dcbd74d37afd81",
"assets/assets/experience/DRTM.png": "38aa6e33fd4c37fb661a5fadd145e0fc",
"assets/assets/experience/constant/experience.png": "8f6a768aa1f3a803088eff838313f7b0",
"assets/assets/experience/EC.png": "12ee333357c7ad2f92f48ec3c27d0f26",
"assets/assets/experience/ACM.png": "b21d24ae82ac81feb22b3f12694ef168",
"assets/assets/experience/rcctechz.png": "40de2922a15538d96a1210fd9eb8457c",
"assets/assets/experience/opensource.png": "997db9ffb7f57a2c0ef1323c6056c44b",
"assets/assets/experience/credanic.png": "27b5605cf2f3291e4cfe71f4f97daaf2",
"assets/assets/experience/nobe.png": "17b84c7a176f60b95beacd1ee9e72e73",
"assets/assets/experience/GuiderTech.png": "fffcaec7d8550cb4e0b25dced4ab5743",
"assets/assets/portfolio.json": "f92ffdf222098edbb85a261121a54155",
"assets/assets/home/constant/email.png": "b4ac60cde3dabbe4bc1b8b7c88dc4585",
"assets/assets/home/constant/link.png": "6bd16f15b5c2d30c08557a84b776f3a6",
"assets/assets/home/constant/instagram.png": "6a5e75ccceace8a900c3ca017bb5933b",
"assets/assets/home/constant/github.png": "9b1ceae0aa31486938531880614681a3",
"assets/assets/home/constant/medium.png": "5a77eaa1f4fc98e76a2129c5ebaa119a",
"assets/assets/home/constant/leetcode.png": "b76f662706530971dccaf8281a0acc45",
"assets/assets/home/constant/twitter.png": "babebb599190a8bd5bb5417e4f7fdcad",
"assets/assets/home/constant/linkedin.png": "f23f5409fa61de28d92d02527411c140",
"assets/assets/home/constant/stackoverflow.png": "c9fe76704b498db68c7d263216b9e680",
"assets/assets/home/constant/facebook.png": "9c8bf990645fc6189df6caedab34628c",
"assets/assets/projects/constant/forks.png": "84f1baf0bcf3b4cf3ea5edb36548e069",
"assets/assets/projects/constant/stars.png": "449614124a2ef5910c35e1e9d62aec5e",
"assets/assets/education/gitaram.png": "e0c528ff1e67d954a6039ce204c38c8f",
"assets/assets/education/rcciit.png": "e549f157d5783656caeb1f605259b897",
"assets/assets/education/constant/education.png": "1ebc9c3cdde631ddd2f356001c79eceb",
"assets/assets/education/stxaviers.png": "54936ceae932c0337c5c4096d2bf6037",
"assets/assets/education/UIUC.png": "602fa1715b748af1e383544b0ce9910d",
"assets/assets/what_i_do/git.png": "2f2db226d2f03acc82b77c7fe652fd3b",
"assets/assets/what_i_do/python.png": "d464079775fdeabf0ffb1323b2a02d2c",
"assets/assets/what_i_do/flutter.png": "5b26614dbdbcf4b3ecb80bed00ad3702",
"assets/assets/what_i_do/cpp.png": "efeec8be519a45426ed24cd91b86fc53",
"assets/assets/what_i_do/SQL.png": "3477dc23c44f4dfe8956aafc929c36f5",
"assets/assets/what_i_do/bash.png": "8aec2de4c0634c93202ec36d7ac4a5de",
"assets/assets/what_i_do/java.png": "53b82a97cf4e13fac807691e7b0be082",
"assets/assets/what_i_do/linux.png": "0dda41d21f571add8b3a558c9914c8ff",
"assets/assets/what_i_do/constant/checklist-light.png": "c6a80a3ff27e7db249fb88159383f74d",
"assets/assets/what_i_do/constant/checklist.png": "bce0e7781492fe752297f8369c666494",
"assets/assets/what_i_do/c.png": "9f6665a404d1b2384b4a90419ad08fd2",
"assets/assets/fonts/SourceCodePro-SemiBold.ttf": "420d3580f5b6e63ba1eabb8555b5f6cf",
"assets/assets/fonts/Montserrat-Medium.ttf": "c8b6e083af3f94009801989c3739425e",
"assets/assets/fonts/FjallaOne-Regular.ttf": "4fa3683005fa20dd058f47b9cfd411df",
"assets/assets/contact_me/constant/location-dark.png": "08a65e7c79b85fbcb40e8fce00953e47",
"assets/assets/contact_me/constant/location.png": "dbc10b089546daaee5c45d9bb754f989",
"assets/assets/contact_me/constant/picture.png": "1a817a95a42d8c43031378d122a05ffe",
"assets/assets/contact_me/sample.png": "13a4b677d9fa726efd9e771189222bf5",
"assets/assets/contact_me/picture.png": "14cb893b860c71960d1e60111e6c41d8"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
