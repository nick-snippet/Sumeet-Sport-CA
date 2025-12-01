import { bucket } from "../config/firebase.js";

export async function deleteFileFromBucket(pathInBucket) {
  if (!bucket) {
    console.warn("deleteFileFromBucket: bucket not initialized");
    return;
  }

  try {
    const file = bucket.file(pathInBucket);
    const [exists] = await file.exists();
    if (!exists) return { ok: true, message: "File already missing" };

    await file.delete();
    return { ok: true };

  } catch (err) {
    console.error("deleteFileFromBucket error:", err.message || err);
    return { ok: false, error: err };
  }
}
