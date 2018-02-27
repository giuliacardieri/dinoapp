// Copyright 2016 Google Inc.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//      http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

var dataCacheName = 'dinokikiData-v3';
var cacheName = 'dinokiki-3';
var filesToCache = [
  'index.html',
  'record.html',
  'photo.html',
  'styles/dinostyle.css',
  'scripts/audios.json',
  'scripts/app.js',
  'scripts/getaudio.js',
  'scripts/recorder.js',
  'scripts/dinoscript.js',
  'styles/Code_Pro_Demo-webfont.ttf',
  'audio/KikiG.mp3',
  'audio/KikiM.mp3',
  'audio/KikiR.mp3',
  'audio/KikiI.mp3',
  'audio/KikiJ.mp3',
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      console.log('filesToCache' + filesToCache);
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName && key !== dataCacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  /*
   * Fixes a corner case in which the app wasn't returning the latest data.
   * The code below essentially lets you activate the service worker faster.
   */
  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  console.log('[Service Worker] Fetch', e.request.url);
  /*
   * The app is asking for app shell files. In this scenario the app uses the
   * "Cache, falling back to the network" offline strategy:
   * https://jakearchibald.com/2014/offline-cookbook/#cache-falling-back-to-network
   */
    e.respondWith(
      caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
      })
    );
});

// adding push notifications
self.addEventListener('push', function(event) {
  event.waitUntil(
    self.registration.showNotification('Dinokiki misses you!', {
  body: 'Come back to the Kiki World :D',
  icon: '../images/icons/icon.png',
  badge: '../images/icons/badge.png'
   }));
});

// notifications clicks
self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] Notification click Received.');

  event.notification.close();

  event.waitUntil(
    clients.openWindow('http://dinokiki.com')
  );
});
