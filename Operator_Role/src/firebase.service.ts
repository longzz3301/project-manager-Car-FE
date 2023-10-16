import { useEffect } from 'react';
import firebase from "firebase/app";
import "firebase/messaging";
import { firebaseConfig } from './constants';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

let messaging: firebase.messaging.Messaging;

if (typeof window !== "undefined") {
  if (firebase.messaging.isSupported()) {
    messaging = firebase.messaging();
  }
}

export const getMessagingToken = async () => {
  let currentToken = "";
  if (!messaging) return;
  try {
    currentToken = await messaging.getToken({
      vapidKey: "AAAANpnIknE:APA91bHDILiLd8StfOfrKSh-Lo7OSI9pWsOunPk6n4fyOIHUz1L2g88I9onWrjzxs8r5B9Pr7AyHZHazFktNNOvxa94DlSLIdtbL5Y90LoGoN2u6fVWdXq4fHz_g4Ee2XuE-eyUcyDn5",
    });
    console.log("FCM registration token", currentToken);
  } catch (error) {
    console.log("An error occurred while retrieving token. ", error);
  }
  return currentToken;
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
  });