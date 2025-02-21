import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Correct import for AsyncStorage

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDGKvU2OAdojntc68K4brrrktIicCUOycI",
  authDomain: "green-garden-be99b.firebaseapp.com",
  projectId: "green-garden-be99b",
  storageBucket: "green-garden-be99b.appspot.com",
  messagingSenderId: "757150999521",
  appId: "1:757150999521:web:dee1fafe2ad9ebf07ea8a0",
  measurementId: "G-726HQVJDDM",
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);

// Initialisation de l'authentification avec persistance via AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { auth };
