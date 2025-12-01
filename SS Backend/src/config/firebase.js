// ---------------------------------------------------------
// 🔥 Firebase Admin SDK Initialization (Backend)
// ---------------------------------------------------------
//
// REQUIRED .env VALUES (EXAMPLE):
//
// FIREBASE_PROJECT_ID=sumeet-sports-app
// FIREBASE_CLIENT_EMAIL=firebase-adminsdk-abc12@sumeet-sports-app.iam.gserviceaccount.com
//
// IMPORTANT: PRIVATE KEY FORMAT MUST BE EXACT
//
// FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG...\n-----END PRIVATE KEY-----\n"
//
// FIREBASE_STORAGE_BUCKET=sumeet-sports-app.appspot.com
//
// ---------------------------------------------------------

import admin from "firebase-admin";

// Fix private key formatting completely
const FIXED_PRIVATE_KEY = process.env.FIREBASE_PRIVATE_KEY
  ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
  : undefined;

// Safety checks for missing env
if (!process.env.FIREBASE_PROJECT_ID) console.error("❌ Missing FIREBASE_PROJECT_ID");
if (!process.env.FIREBASE_CLIENT_EMAIL) console.error("❌ Missing FIREBASE_CLIENT_EMAIL");
if (!FIXED_PRIVATE_KEY) console.error("❌ Missing FIREBASE_PRIVATE_KEY");
if (!process.env.FIREBASE_STORAGE_BUCKET) console.error("❌ Missing FIREBASE_STORAGE_BUCKET");

// Initialize Admin SDK (only once)
if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: FIXED_PRIVATE_KEY,
      }),
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    });

    console.log("✅ Firebase Admin initialized successfully");

  } catch (error) {
    console.error("❌ Firebase Admin Initialization Failed:", error);
  }
}

// Export Firestore & Storage
export const db = admin.firestore();
export const bucket = admin.storage().bucket();

export default admin;
