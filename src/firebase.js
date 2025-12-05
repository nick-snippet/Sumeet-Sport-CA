// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// ------------------------------------------------------------
// 🔥 FRONTEND FIREBASE CONFIG (Your REAL values) 



// ------------------------------------------------------------

const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_apiKey,
  authDomain:import.meta.env.VITE_FIREBASE_authDomain,
  projectId:import.meta.env.VITE_FIREBASE_projectId,
  storageBucket:import.meta.env.VITE_FIREBASE_storageBucket,
  messagingSenderId:import.meta.env.VITE_FIREBASE_messagingSenderId,
  appId:import.meta.env.VITE_FIREBASE_appId,
  measurementId:import.meta.env.VITE_FIREBASE_measurementId,
};

console.log("firebase config (frontend)=",firebaseConfig);

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Authentication instance
export const auth = getAuth(app);

export default app;
