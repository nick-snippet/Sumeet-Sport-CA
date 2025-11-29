// src/services/deleteService.js
import { bucket } from "../config/firebase.js";

export async function deleteFileFromFirebase(pathInBucket) {
  if (!bucket) {
    console.warn("deleteFileFromFirebase: bucket not initialized");
    throw new Error("Storage bucket not initialized");
  }

  try {
    const file = bucket.file(pathInBucket);
    const [exists] = await file.exists();
    if (exists) {
      await file.delete();
      return true;
    }
    // not found → treat as success
    return false;
  } catch (err) {
    console.error("deleteFileFromFirebase error:", err.message || err);
    throw err;
  }
}