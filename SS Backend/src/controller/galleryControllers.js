// src/controller/galleryControllers.js
import { db } from "../config/firebase.js";
import { uploadFileToFirebase } from "../services/uploadService.js";
import { deleteFileFromBucket } from "../utils/storageUtils.js";

const GALLERY_COLLECTION = "gallery";

/**
 * listEvents — returns events ordered by createdAt (newest first)
 */
export async function listEvents(req, res, next) {
  try {
    const snap = await db.collection(GALLERY_COLLECTION).orderBy("createdAt", "desc").get();
    const events = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    res.json(events);
  } catch (err) {
    next(err);
  }
}

/**
 * createEvent — expects form-data: title, desc, category (optional), images[] (multipart)
 */
export async function createEvent(req, res, next) {
  try {
    const { title = "", desc = "", category = "" } = req.body;
    const files = req.files || [];

    if (!files.length) return res.status(400).json({ error: "At least one image required" });

    const uploaded = [];
    for (const file of files) {
      const resu = await uploadFileToFirebase(file.path, "gallery");
      uploaded.push({
        imageUrl: resu.publicUrl,
        pathInBucket: resu.pathInBucket,
      });
    }

    const docRef = await db.collection(GALLERY_COLLECTION).add({
      title,
      desc,
      category,
      images: uploaded, // preserve upload order
      createdAt: Date.now(),
    });

    const doc = await docRef.get();
    res.status(201).json({ id: doc.id, ...doc.data() });
  } catch (err) {
    next(err);
  }
}

/**
 * updateEvent — two modes:
 *  - replace entire event fields (title, desc, category) and optionally replace images[]
 *  - replace single image inside images[] (if you send imageIndex in body + single file)
 *
 * Expect:
 *  - multipart: files[] (optional)
 *  - body: title, desc, category, imageIndex (optional integer)
 */
export async function updateEvent(req, res, next) {
  try {
    const { id } = req.params;
    const docRef = db.collection(GALLERY_COLLECTION).doc(id);
    const doc = await docRef.get();
    if (!doc.exists) return res.status(404).json({ error: "Event not found" });

    const data = doc.data();
    const payload = {};
    const { title, desc, category } = req.body;
    if (title !== undefined) payload.title = title;
    if (desc !== undefined) payload.desc = desc;
    if (category !== undefined) payload.category = category;

    const files = req.files || [];
    const imageIndex = req.body.imageIndex !== undefined ? parseInt(req.body.imageIndex, 10) : undefined;

    // If imageIndex is provided and a single file is sent -> replace that image only
    if (imageIndex !== undefined && files.length === 1) {
      const oldImages = Array.isArray(data.images) ? data.images : [];
      const idx = imageIndex;
      if (idx < 0 || idx >= oldImages.length) {
        return res.status(400).json({ error: "imageIndex out of range" });
      }

      // upload new image
      const uploadResult = await uploadFileToFirebase(files[0].path, "gallery");
      // delete old file
      const oldPath = oldImages[idx].pathInBucket;
      if (oldPath) await deleteFileFromBucket(oldPath);

      // replace in array (preserve order)
      oldImages[idx] = {
        imageUrl: uploadResult.publicUrl,
        pathInBucket: uploadResult.pathInBucket,
      };

      payload.images = oldImages;
    } else if (files.length > 0) {
      // If multiple files provided -> append in order after existing images
      const existing = Array.isArray(data.images) ? data.images : [];
      const uploaded = [];
      for (const f of files) {
        const r = await uploadFileToFirebase(f.path, "gallery");
        uploaded.push({ imageUrl: r.publicUrl, pathInBucket: r.pathInBucket });
      }
      // append while preserving existing order
      payload.images = [...existing, ...uploaded];
    }

    payload.updatedAt = Date.now();
    await docRef.update(payload);

    const updated = await docRef.get();
    res.json({ id: updated.id, ...updated.data() });
  } catch (err) {
    next(err);
  }
}

/**
 * deleteEvent — deletes event doc and all images inside Storage
 */
export async function deleteEvent(req, res, next) {
  try {
    const { id } = req.params;
    const docRef = db.collection(GALLERY_COLLECTION).doc(id);
    const doc = await docRef.get();
    if (!doc.exists) return res.status(404).json({ error: "Not found" });

    const images = doc.data().images || [];
    for (const img of images) {
      if (img.pathInBucket) {
        await deleteFileFromBucket(img.pathInBucket);
      }
    }

    await docRef.delete();
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
}
