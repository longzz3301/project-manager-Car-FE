// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.9.0/firebase-analytics.js');
importScripts('https://www.gstatic.com/firebasejs/8.9.0/firebase-messaging.js')


if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('../firebase-messaging-sw.js')
  .then(function(registration) {
    console.log('Registration successful, scope is:', registration.scope);
  }).catch(function(err) {
    console.log('Service worker registration failed, error:', err);
  });
}

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
  apiKey: "AIzaSyBNAH1HlcNy9F9cOLd4ju7EOy0Ts-dVuY8",
  authDomain: "quanlixebtw2.firebaseapp.com",
  projectId: "quanlixebtw2",
  storageBucket: "quanlixebtw2.appspot.com",
  messagingSenderId: "234508292721",
  appId: "1:234508292721:web:2e1d2941ea7e1fd86e81d0",
  measurementId: "G-0YKDP9BMRG"
};

// phần firebaseConfig tương tự như ở trên nhé

firebase.initializeApp(firebaseConfig);
if (firebase.messaging.isSupported()) {
  const messaging = firebase.messaging();
  const channel = new BroadcastChannel('notifications');
  messaging.onBackgroundMessage(function (payload) {
    //can not console.log here
    channel.postMessage(payload);
  });
}

const message = firebase.messaging()
message.onBackgroundMessage(function (payload) {
  //can not console.log here
  console.log(`[message.onBackgroundMessage]: `, payload)
  const channel = new BroadcastChannel('notifications');
  channel.postMessage(payload);
});