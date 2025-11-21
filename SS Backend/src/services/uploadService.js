import bucket from "../config/firebase.js";
import { v4 as uuidv4 } from "uuid";

export const uploadToFirebase = async (file, folder) => {
  return new Promise((resolve, reject) => {
    const filename = `${folder}/${Date.now()}-${file.originalname}`;
    const blob = bucket.file(filename);
    const blobStream = blob.createWriteStream({
      resumable: false,
      metadata: {
        metadata: {
          firebaseStorageDownloadTokens: uuidv4()
        }
      }
    });

    blobStream.on("error", (err) => reject(err));

    blobStream.on("finish", async () => {
      const url = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(filename)}?alt=media`;
      resolve(url);
    });

    blobStream.end(file.buffer);
  });
};