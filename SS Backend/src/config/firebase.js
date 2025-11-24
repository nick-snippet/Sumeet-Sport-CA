// src/config/firebase.js
// CommonJS Firebase Admin setup - expects firebase-admin.json at project root.
// DO NOT commit your firebase-admin.json to source control.

const admin = require("firebase-admin");
const path = require("path");
const fs = require("fs");

// Path to service account JSON (place the file at SS-backend/firebase-admin.json)
const serviceAccountPath = path.resolve(__dirname, "../../firebase-admin.json");

if (!fs.existsSync(serviceAccountPath)) {
  console.warn("WARNING: firebase-admin.json not found at project root.");
  console.warn("Please place your Firebase Admin SDK JSON at: " + serviceAccountPath);
  // If you prefer to paste the JSON object inline, you can change below to use a variable.
  // For safety we stop initialisation to avoid throwing later.
  // Continue without initialization may break things — but we still export placeholders.
}

let bucket;
try {
  const serviceAccount = require(serviceAccountPath); // throws if missing
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    // Set bucket below or use env var FIREBASE_STORAGE_BUCKET
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "sumeet-sports.firebasestorage.app",
  });

  bucket = admin.storage().bucket();
} catch (e) {
  // fail gracefully but inform
  console.error("Firebase admin initialization failed. Check firebase-admin.json and FIREBASE_STORAGE_BUCKET.");
  console.error(e.message);
}

module.exports = {
  admin,
  bucket,
};