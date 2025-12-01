// src/controller/galleryControllers.js
import { db } from "../config/firebase.js";
import { uploadFileToFirebase } from "../services/uploadService.js";
import { deleteFileFromBucket } from "../services/deleteService.js";

/**
 * Firestore collection: "gallery"
 * doc fields: { title, category, url, pathInBucket, createdAt }
 */

const COLLECTION = "gallery";

export async function listImages(req, res, next) {
  try {
    const snap = await db.collection(COLLECTION).orderBy("createdAt", "asc").get();
    const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    res.json(items);
  } catch (err) {
    next(err);
  }
}

/**
 * POST /api/gallery
 * multipart/form-data with: image (file), title (optional), category (optional)
 */
export async function createImage(req, res, next) {
  try {
    const { title = "", category = "" } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "Image file required" });
    }

    const uploadResult = await uploadFileToFirebase(req.file.path, "gallery");

    const docRef = await db.collection(COLLECTION).add({
      title,
      category,
      url: uploadResult.publicUrl,
      pathInBucket: uploadResult.pathInBucket,
      createdAt: Date.now(),
    });

    const doc = await docRef.get();
    res.status(201).json({ id: doc.id, ...doc.data() });
  } catch (err) {
    next(err);
  }
}

/**
 * PUT /api/gallery/:id
 * multipart/form-data allowed for optional image replacement
 * body: title, category
 */
export async function updateImage(req, res, next) {
  try {
    const { id } = req.params;
    const { title, category } = req.body;

    const docRef = db.collection(COLLECTION).doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: "Not found" });
    }

    const data = doc.data();
    const updates = {};

    // Update title/category if provided
    if (typeof title !== "undefined") updates.title = title;
    if (typeof category !== "undefined") updates.category = category;

    // If new image uploaded, upload and delete old
    if (req.file) {
      // upload new
      const uploadResult = await uploadFileToFirebase(req.file.path, "gallery");
      updates.url = uploadResult.publicUrl;
      updates.pathInBucket = uploadResult.pathInBucket;

      // delete old file (best-effort)
      if (data.pathInBucket) {
        try {
          await deleteFileFromBucket(data.pathInBucket);
        } catch (err) {
          console.warn("Failed to delete old gallery file:", err.message);
        }
      }
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: "Nothing to update" });
    }

    updates.updatedAt = Date.now();

    await docRef.update(updates);

    const updatedDoc = await docRef.get();
    res.json({ id: updatedDoc.id, ...updatedDoc.data() });
  } catch (err) {
    next(err);
  }
}

/**
 * DELETE /api/gallery/:id
 */
export async function deleteImage(req, res, next) {
  try {
    const { id } = req.params;
    const docRef = db.collection(COLLECTION).doc(id);
    const doc = await docRef.get();

    if (!doc.exists) return res.status(404).json({ error: "Not found" });

    const data = doc.data();

    // delete document
    await docRef.delete();

    // delete file from storage (best-effort)
    if (data.pathInBucket) {
      try {
        await deleteFileFromBucket(data.pathInBucket);
      } catch (err) {
        console.warn("deleteImage: failed to delete file from bucket:", err.message);
      }
    }

    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
}
