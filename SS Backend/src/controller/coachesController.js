// src/controller/coachesController.js
import { uploadFileToFirebase } from "../services/uploadService.js";
import { deleteFileFromFirebase } from "../services/deleteService.js";

// Temporary in-memory store (replace with Firestore later)
const coachesStore = []; // { id, name, title, description, imageUrl, pathInBucket }

export function listCoaches(req, res) {
  return res.json(coachesStore);
}

export async function createCoach(req, res, next) {
  try {
    const { name, title, description, instagram } = req.body;
    if (!req.file) {
      return res.status(400).json({ error: "Image file required" });
    }

    const uploadResult = await uploadFileToFirebase(req.file.path, "coaches");

    const newCoach = {
      id: Date.now().toString(),
      name,
      title,
      description,
      instagram,
      imageUrl: uploadResult.publicUrl,
      pathInBucket: uploadResult.pathInBucket,
    };

    coachesStore.push(newCoach);
    return res.status(201).json(newCoach);
  } catch (err) {
    next(err);
  }
}

export async function updateCoach(req, res, next) {
  try {
    const { id } = req.params;
    const { name, title, description, instagram } = req.body;

    const idx = coachesStore.findIndex((c) => c.id === id);
    if (idx === -1) return res.status(404).json({ error: "Coach not found" });

    const coach = coachesStore[idx];

    // If new file present, delete old and upload new
    if (req.file) {
      if (coach.pathInBucket) {
        try {
          await deleteFileFromFirebase(coach.pathInBucket);
        } catch (e) {
          console.warn("Failed to delete old coach image:", e.message);
        }
      }

      const uploadResult = await uploadFileToFirebase(req.file.path, "coaches");
      coach.imageUrl = uploadResult.publicUrl;
      coach.pathInBucket = uploadResult.pathInBucket;
    }

    // Update text fields (only if provided)
    if (typeof name !== "undefined") coach.name = name;
    if (typeof title !== "undefined") coach.title = title;
    if (typeof description !== "undefined") coach.description = description;
    if (typeof instagram !== "undefined") coach.instagram = instagram;

    coachesStore[idx] = coach;
    res.json(coach);
  } catch (err) {
    next(err);
  }
}

export function deleteCoach(req, res) {
  const { id } = req.params;

  const idx = coachesStore.findIndex((c) => c.id === id);
  if (idx === -1) {
    return res.status(404).json({ error: "Not found" });
  }

  // optionally delete file from storage if exists
  const coach = coachesStore[idx];
  if (coach.pathInBucket) {
    // fire-and-forget; you may want to await
    deleteFileFromFirebase(coach.pathInBucket).catch((e) => console.warn(e.message));
  }

  coachesStore.splice(idx, 1);
  return res.json({ ok: true });
}
