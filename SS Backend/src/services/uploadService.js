// src/services/uploadService.js
const { bucket } = require("../config/firebase");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

if (!bucket) {
  console.warn("uploadService: Firebase bucket not initialized. Uploads will fail until firebase config is fixed.");
}

/**
 * Upload local file (multer stores file locally in tmp) to firebase storage
 * returns { publicUrl, pathInBucket }
 */
async function uploadFileToFirebase(localFilePath, destinationFolder = "uploads") {
  if (!bucket) throw new Error("Firebase bucket not initialized");

  const ext = path.extname(localFilePath);
  const filename = `${destinationFolder}/${Date.now()}-${uuidv4()}${ext}`;
  await bucket.upload(localFilePath, {
    destination: filename,
    public: false, // we will create signed URL
    metadata: {
      metadata: {
        firebaseStorageDownloadTokens: uuidv4(),
      },
    },
  });

  // create signed url (valid for 5 years)
  const file = bucket.file(filename);
  const expiresAt = Date.now() + 1000 * 60 * 60 * 24 * 365 * 5;
  const [url] = await file.getSignedUrl({
    action: "read",
    expires: new Date(expiresAt),
  });

  // remove local file
  try { fs.unlinkSync(localFilePath); } catch (e) {}

  return { publicUrl: url, pathInBucket: filename };
}

module.exports = {
  uploadFileToFirebase,
};