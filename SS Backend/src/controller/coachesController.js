import { db } from "../config/firebase.js";
import { uploadFileToFirebase } from "../services/uploadService.js";
import { deleteFileFromBucket } from "../utils/storageUtils.js";

const COACHES_COLLECTION = "coaches";

export async function listCoaches(req, res, next) {
  try {
    const snap = await db.collection(COACHES_COLLECTION)
      .orderBy("createdAt", "desc")
      .get();

    const coaches = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    res.json(coaches);

  } catch (err) {
    next(err);
  }
}

export async function createCoach(req, res, next) {
  try {
    const { name, title, description } = req.body;
    if (!req.file) return res.status(400).json({ error: "Image file required" });

    const uploaded = await uploadFileToFirebase(req.file.path, "coaches");

    const ref = await db.collection(COACHES_COLLECTION).add({
      name,
      title,
      description,
      imageUrl: uploaded.publicUrl,
      pathInBucket: uploaded.pathInBucket,
      createdAt: Date.now(),
    });

    const doc = await ref.get();
    res.status(201).json({ id: doc.id, ...doc.data() });

  } catch (err) {
    next(err);
  }
}

export async function updateCoach(req, res, next) {
  try {
    const { id } = req.params;
    const ref = db.collection(COACHES_COLLECTION).doc(id);
    const snap = await ref.get();
    if (!snap.exists) return res.status(404).json({ error: "Coach not found" });

    const data = snap.data();
    const updateData = {};

    const { name, title, description } = req.body;
    if (name !== undefined) updateData.name = name;
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;

    if (req.file) {
      const uploaded = await uploadFileToFirebase(req.file.path, "coaches");

      // Delete old image
      if (data.pathInBucket) {
        await deleteFileFromBucket(data.pathInBucket);
      }

      updateData.imageUrl = uploaded.publicUrl;
      updateData.pathInBucket = uploaded.pathInBucket;
    }

    updateData.updatedAt = Date.now();
    await ref.update(updateData);

    const updated = await ref.get();
    res.json({ id, ...updated.data() });

  } catch (err) {
    next(err);
  }
}

export async function deleteCoach(req, res, next) {
  try {
    const { id } = req.params;
    const ref = db.collection(COACHES_COLLECTION).doc(id);
    const snap = await ref.get();

    if (!snap.exists) return res.status(404).json({ error: "Not found" });

    const data = snap.data();

    if (data.pathInBucket) {
      await deleteFileFromBucket(data.pathInBucket);
    }

    await ref.delete();
    res.json({ ok: true });

  } catch (err) {
    next(err);
  }
}
