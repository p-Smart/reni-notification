importScripts('https://www.gstatic.com/firebasejs/9.14.0/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/9.14.0/firebase-messaging-compat.js')



const firebaseConfig = {
    apiKey: "AIzaSyCRZYezyYFoS6sDxgP6aEhU_OIf-vPVcvw",
    authDomain: "push-notifications-8740d.firebaseapp.com",
    projectId: "push-notifications-8740d",
    storageBucket: "push-notifications-8740d.appspot.com",
    messagingSenderId: "614726507164",
    appId: "1:614726507164:web:90a5c0daee7a351e8beb59",
    measurementId: "G-6RSTCB360P"
};
  

const app = firebase.initializeApp(firebaseConfig)
const messaging = firebase.messaging()


self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    var promise = new Promise((resolve) => {
      setTimeout(resolve, 1000);
    })
    .then(() => {
        return clients.openWindow(event.notification?.data?.click_action);
    })

    event.waitUntil(promise);
})


messaging.onBackgroundMessage((payload) => {
    console.log('Message from Service Worker ', payload);
    if (!payload.hasOwnProperty('notification')) {
        const notificationTitle = payload.data.title
        const notificationOptions = {
            body: payload.data.body,
            icon: payload.data.icon,
            image: payload.data.image,
            data: {
                click_action: payload.data.click_action
            }
        }
        return self.registration.showNotification(notificationTitle, notificationOptions)
    }
})
