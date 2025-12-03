// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// ------------------------------------------------------------
// 🔥 FRONTEND FIREBASE CONFIG (Your REAL values) 
// ------------------------------------------------------------

const firebaseConfig = {
  apiKey: "AIzaSyAoVg95Cg130eP-iIWo2V0WUlYZg01ETDo",
  authDomain: "sumeet-sports.firebaseapp.com",
  projectId: "sumeet-sports",
  storageBucket: "sumeet-sports.firebasestorage.app",
  messagingSenderId: "117371219052",
  appId: "1:117371219052:web:2c061c439f6f3ac5e9fc49",
  measurementId: "G-50N77PKYQ4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Authentication instance
export const auth = getAuth(app);

export default app;
