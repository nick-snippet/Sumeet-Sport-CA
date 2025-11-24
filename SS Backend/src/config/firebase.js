// src/config/firebase.js
// Firebase Admin initialization for backend (Node.js Express)

import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

/**
 * ============================
 * 🔥 HOW TO FILL THE .ENV FILE
 * ============================
 *
 * 1️⃣ FIREBASE_PROJECT_ID
 *     • Go to: Firebase Console → Project Settings → General
 *     • Copy “Project ID”
 *
 * 2️⃣ FIREBASE_CLIENT_EMAIL
 *     • Go to: Project Settings → Service Accounts
 *     • Under “Firebase Admin SDK”, copy: client_email
 *
 * 3️⃣ FIREBASE_PRIVATE_KEY
 *     • In the same Service Accounts section, click:
 *           "Generate new private key" → downloads JSON
 *     • Inside the JSON, copy the entire `private_key` value.
 *     • Replace ALL newlines with `\n`
 *
 *        Example:
 *        FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nABC123...\n-----END PRIVATE KEY-----\n"
 *
 * 4️⃣ FIREBASE_STORAGE_BUCKET
 *     • Go to Firebase Console → Storage
 *     • At the top, you will see something like:
 *           gs://your-project-id.appspot.com
 *     • Put only:
 *           your-project-id.appspot.com
 *
 * 5️⃣ Frontend VITE_FIREBASE_* values
 *     • These come from Firebase Console → Project Settings → General → "Your Apps" → Web App
 *     • These are NOT used in backend; they are only for your frontend.
 */

// Fix private key formatting (\n → actual newlines)
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

// Initialize Firebase Admin SDK once
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
  } catch (err) {
    console.error("Failed to initialize Firebase Admin:", err);
  }
}

// Export Firebase admin tools
const db = admin.firestore();
const bucket = admin.storage().bucket();

export { admin, db, bucket };