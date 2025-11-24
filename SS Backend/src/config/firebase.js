// src/config/firebase.js
//
// ⭐ Firebase Admin SDK configured using ENVIRONMENT VARIABLES ⭐
// This version does NOT use firebase-admin.json.
// You MUST set the env vars in:
//   - .env   (for local development)
//   - Railway → Variables  (for deployment)
//
// Required ENV variables:
//  - FIREBASE_PROJECT_ID
//  - FIREBASE_PRIVATE_KEY         (private key from your service account JSON)
//  - FIREBASE_CLIENT_EMAIL
//  - FIREBASE_STORAGE_BUCKET      (example: "your-project-id.appspot.com")

const admin = require("firebase-admin");

// Load values from environment variables
// (Your `.env` will set these when running locally)
const projectId = process.env.FIREBASE_PROJECT_ID;  // Example: "sumeet-sports-12345"
const privateKey = process.env.FIREBASE_PRIVATE_KEY
  ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n") // Required to restore line breaks
  : undefined;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL; // Example: "firebase-adminsdk@project-id.iam.gserviceaccount.com"
const storageBucket = process.env.FIREBASE_STORAGE_BUCKET; // Example: "sumeet-sports.appspot.com"

// Warn if any variables are missing
if (!projectId || !privateKey || !clientEmail) {
  console.warn("⚠️ WARNING: Missing Firebase Admin ENV vars.");
  console.warn("Make sure the following variables are set:");
  console.warn("  - FIREBASE_PROJECT_ID");
  console.warn("  - FIREBASE_PRIVATE_KEY");
  console.warn("  - FIREBASE_CLIENT_EMAIL");
}

// Initialize Firebase Admin with the above values
admin.initializeApp({
  credential: admin.credential.cert({
    // 🔽 These 3 values come from firebase-admin.json, but now read from ENV instead
    projectId:"7586f4ca74e3cb37dfaf793784c4a9fbd50c2311",     // Your Firebase Project ID
    privateKey:"-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDCH1E8GCKgjixY\nXU58SaHHlUPtrYm6x/qM1XGOYMYD2lI9+9pTFWX+MfWTgb9UyP6HscTdTnq0w0PJ\n3Ha1lXRmLkOniNNa28AeNFz0kFJ0Rdoa1Z6P7zU0o6ghFNOPWHcwrDXjEpceTxtn\nXbDM5CaohYKpgP+/f2UN2Dexh7/LQ5hpjYROEmme9+Dpa74a6LvQbKqTqPJCRqE6\ncfVjRJPg4nF04VSvslfLDXY2dITuMSErRQ03UW5ulAH3lXSdiXtX57TSJgZEYpOm\nb0tD6Ue5lJ5aPkLAwRXkS+Viia2OMQACs822m2yzXvn8/m1hmg+fbUbDcfwT3GKY\npiUtKohPAgMBAAECggEACkLuNWIFOpLUD0ZnZrSHDm4lLW7gpUn67u+S1XbndhQC\nsu9u8WNj2oBjkzeRmKFuAFhKUsnaPKycbGhGB3/uAOoYfhutKH64n3V0eyJslA7j\n4kqWhinxQxC/oM1hXZDMmXsQ937nvsdpvcNlxtRB+DiOg/f4t55msMj+21iUr+GR\ne0rGotDRJ/CQqB4o7yV2ZSoL4NxXqkXTDQqLUgSLQTa9fZqj0ZoKebVfbpEFUcci\nyHKVtwwFanAQkGNYFM8NLFVaJCaYrcsET6KaDTEm600gpHyv+ZoWbUkDdGaZMEM3\nO5ZyrYDQFkeNBv7IZ2HswKXoEuVQA1V5kw0GGDsO+QKBgQD4lyYjjwPwj9FHCJ+r\ny5K0Ed6g9OFWPaNR8GXralbUk1euGOmpfiulOg+kw/t9p1tQxEDwKm/1/6B1wdNE\nQbZ9Qluygf8WZKfaeTN/I88UuHVmUW90Xkz51EP6lzcTqkYOs+pBInc7FkLfWX5M\nDY7dh4CjnutG6t3W1AqqMV8c8wKBgQDH6I2155E4sG/WTJNXG+ZbsWsB/b6H2Sz0\nL3/CAWmAtNMBgUAna1K358f2Wa8nPT6Ol4naX8lriqbFDT7qRPsFUnjiWlgwWzUQ\nB7Nu7uwBjyV6xCincdgKFBAKUTGGsAmfP6M6ELGP8oLL8s4JRnjMRZezwl0pB8dt\nKS9JO5rONQKBgC76WXHE2CjA9PqojYwot3uiGOFwBZmHonKcrJYVjX00rxAukxG9\nzz+1PjmT89XmJ6KWw/LfAjOJ8Gfwjh1LEdKQFMYiPPOdZ/8ogmvXd43h4gXJA/gI\nziE0VPhpVTY5Km4i3/UZL1ESPub4gZ6bvVDuB4hkQvAu+GddwPoyxFezAoGAcOa5\nKhP3Y3HaJ8ilqhu6tOx1h/Fb6vNPvTUaTWJoyGTXitEJf3nQhMblmw85qcqgCv4w\nv+E7K35qA34gm0SMFIxoc0Yc6mqIhF4lC7DqH1NOEpC4eSEFp2N/T6RdeTjwpjzV\nndSRw79t+WtOy9Q+Ivfm3oIWBTc8fT02VIDSREUCgYBeu14DtNL6HHlagWKOU9qB\nKTXc6MD1cBNINqmWoKew7bt/WY4/UZSAyBTUaJqclx8T9795XzQ+mkBUhYdJ0qwp\no0dv/Gt0A6mSR4baPu6/33zLOICw8olkazxhM5dSz6Lm3Q+N36F/1r9PaMMWOYBU\neEGdqDy4lfKmFcn/seWcUg==\n-----END PRIVATE KEY-----\n",    // Your private key (with \n replaced properly)
    clientEmail:"firebase-adminsdk-fbsvc@sumeet-sports.iam.gserviceaccount.com",   // Service account email
  }),
  storageBucket:"sumeet-sports.firebasestorage.app",   // Firebase Storage Bucket URL
});

// Create a reference to the storage bucket (used for uploads)
const bucket = admin.storage().bucket();

module.exports = {
  admin,
  bucket,
};