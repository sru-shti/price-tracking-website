// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDDZIrRfqxuFdjw8s75YljBbk_6wQwAvGY",
  authDomain: "price-tracking-15fa8.firebaseapp.com",
  projectId: "price-tracking-15fa8",
  storageBucket: "price-tracking-15fa8.firebasestorage.app",
  messagingSenderId: "714023931337",
  appId: "1:714023931337:web:d0ec63a6188c2989386c18"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services you want to use in your app
export const auth = getAuth(app);
export const db = getFirestore(app);
