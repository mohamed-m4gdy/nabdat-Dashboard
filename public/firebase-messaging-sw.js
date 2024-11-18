// Import the Firebase SDK
import linkGenrator from '@/helpers/linkGenrator'
import axios from '@axios'

importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker
firebase.initializeApp({
    apiKey: "AIzaSyDEF6Aa40owGZ0K8C1_35sr6MEZdZ19udw",
    authDomain: "nabdat-854e6.firebaseapp.com",
    databaseURL: "https://nabdat-854e6-default-rtdb.firebaseio.com",
    projectId: "nabdat-854e6",
    storageBucket: "nabdat-854e6.appspot.com",
    messagingSenderId: "627959663340",
    appId: "1:627959663340:web:5c2d58dfb70e84b50473c9",
    measurementId: "G-QN39P260QJ"
});

// Retrieve an instance of Firebase Messaging
const messaging = firebase.messaging();

// Add your custom notification handling logic here
messaging.onBackgroundMessage((payload) => {
    const { title, body } = payload.notification;
    self.registration.showNotification(title, { body });
});
