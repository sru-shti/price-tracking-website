import { initializeApp, getApps } from "firebase/app";
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

// Check if Firebase app is already initialized to avoid duplicate errors
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
