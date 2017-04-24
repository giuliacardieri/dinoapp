(function() {
  'use strict';

  // Registering the Service Worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./service-worker.js')
             .then(function() { console.log('Service Worker Registered'); });
  }

  //  Subscribing for notifications
  navigator.serviceWorker && navigator.serviceWorker.ready
      .then(function(serviceWorkerRegistration) {  
        serviceWorkerRegistration.pushManager.getSubscription()  
        .then(function(subscription) {  
           if (subscription) {
            console.info('Got existing', subscription);
            return;  // got one, yay
          }
          serviceWorkerRegistration.pushManager.subscribe({userVisibleOnly: true})
            .then(function(subscription) { 
              console.info('Newly subscribed to push!', subscription);
            });
        });
      });

})();
