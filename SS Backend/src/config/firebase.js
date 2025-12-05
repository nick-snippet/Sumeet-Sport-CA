// src/config/firebase.js
import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

// ========================
// 🛑 SAFETY CHECKS
// ========================
if (!process.env.FIREBASE_PROJECT_ID ||
    !process.env.FIREBASE_CLIENT_EMAIL ||
    !process.env.FIREBASE_PRIVATE_KEY ||
    !process.env.FIREBASE_STORAGE_BUCKET) {
  console.error("❌ Missing Firebase environment variables.\nCheck your .env file!");
  console.error("➡ Required keys: FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY, FIREBASE_STORAGE_BUCKET");
  process.exit(1);
}

// Convert newline-escaped private key to actual newlines
const privateKey = process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n");

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey,
      }),
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    });

    console.log("🔥 Firebase Admin initialized successfully!");
  } catch (err) {
    console.error("❌ Firebase Admin Initialization Failed:", err);
    process.exit(1);
  }
}

// Exports
export const db = admin.firestore();
export const bucket = admin.storage().bucket();
export { admin };
export default admin;