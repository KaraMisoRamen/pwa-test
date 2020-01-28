function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

const publicVapidKey = 'BOK-YxcIPGxxywWYDgFMLVF6rw20w2tiy3j4Dg2VDXYkc07SBJn_SguGcyJUj4XwYuK7_-XoH9DE4xJf5d3x3zQ';


async function init () {
  if ('serviceWorker' in navigator) {
    alert('registered')
    const register = await navigator.serviceWorker.register('./sw.js', {
      scope: '/pwa-test/'
    });

    const subscription = await register.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
    });
  }
}

init()
