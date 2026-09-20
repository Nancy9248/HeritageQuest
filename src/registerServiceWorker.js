// Service Worker Registration for HeritageQuest Progressive Web App

export function registerServiceWorker() {
  if ('serviceWorker' in navigator && import.meta.env.PROD) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('HeritageQuest PWA ServiceWorker registered with scope:', registration.scope);

          // Force check for updated service worker on every load
          registration.update();

          registration.onupdatefound = () => {
            const installingWorker = registration.installing;
            if (installingWorker == null) return;

            installingWorker.onstatechange = () => {
              if (installingWorker.state === 'installed') {
                if (navigator.serviceWorker.controller) {
                  console.log('New HeritageQuest version installed; refreshing page...');
                  window.location.reload();
                } else {
                  console.log('HeritageQuest app shell cached for offline use.');
                }
              }
            };
          };
        })
        .catch((error) => {
          console.error('Error during HeritageQuest Service Worker registration:', error);
        });
    });
  } else if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').then((reg) => {
        reg.update();
        console.log('HeritageQuest Dev ServiceWorker registered:', reg.scope);
      }).catch(err => console.warn('Dev SW registration bypass:', err));
    });
  }
}
