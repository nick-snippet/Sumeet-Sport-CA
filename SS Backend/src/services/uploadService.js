import { bucket } from "../config/firebase.js";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";

if (!bucket) {
  console.warn(
    "uploadService: Firebase bucket not initialized. Uploads will fail until firebase config is fixed."
  );
}

/**
 * Upload a local file (multer tmp file) to Firebase Storage
 * Returns: { publicUrl, pathInBucket }
 */
export async function uploadFileToFirebase(localFilePath, destinationFolder = "uploads") {
  if (!bucket) {
    throw new Error("Firebase bucket not initialized");
  }

  const ext = path.extname(localFilePath);
  const filename = `${destinationFolder}/${Date.now()}-${uuidv4()}${ext}`;

  // Upload to Firebase Storage
  await bucket.upload(localFilePath, {
    destination: filename,
    public: false,
    metadata: {
      metadata: {
        firebaseStorageDownloadTokens: uuidv4(),
      },
    },
  });

  const file = bucket.file(filename);

  // Signed URL valid for 5 years
  const expiresAt = Date.now() + 1000 * 60 * 60 * 24 * 365 * 5;
  const [publicUrl] = await file.getSignedUrl({
    action: "read",
    expires: new Date(expiresAt),
  });

  // Remove local temp file
  try {
    fs.unlinkSync(localFilePath);
  } catch (err) {
    console.error("Failed to delete temp file:", err.message);
  }

  return {
    publicUrl,
    pathInBucket: filename,
  };
}