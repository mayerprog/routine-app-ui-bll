import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
  getAuth,
} from "firebase/auth";

import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyCkPA4C3W6hETVLLRdCQAaPC0K0vdc59EU",
  authDomain: "routine-app-393118.firebaseapp.com",
  projectId: "routine-app-393118",
  storageBucket: "routine-app-393118.appspot.com",
  messagingSenderId: "778041551755",
  appId: "1:778041551755:web:4a7310e72b9e3e9dc8dd8e",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
// export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
