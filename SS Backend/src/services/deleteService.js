// src/services/deleteService.js
import { bucket } from "../config/firebase.js";

export async function deleteFileFromBucket(pathInBucket) {
  if (!bucket) throw new Error("Firebase bucket not initialized");
  try {
    const file = bucket.file(pathInBucket);
    await file.delete();
    return true;
  } catch (err) {
    // if file doesn't exist, ignore
    if (err.code === 404) return false;
    throw err;
  }
}
