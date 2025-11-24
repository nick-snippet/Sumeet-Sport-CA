///
import { uploadFileToFirebase } from "../services/uploadService.js";

// Temporary in-memory store (replace with Firestore later)
const coachesStore = []; // { id, name, title, description, imageUrl, pathInBucket }

export function listCoaches(req, res) {
  return res.json(coachesStore);
}

export async function createCoach(req, res, next) {
  try {
    const { name, title, description } = req.body;
    if (!req.file) {
      return res.status(400).json({ error: "Image file required" });
    }

    const uploadResult = await uploadFileToFirebase(req.file.path, "coaches");

    const newCoach = {
      id: Date.now().toString(),
      name,
      title,
      description,
      imageUrl: uploadResult.publicUrl,
      pathInBucket: uploadResult.pathInBucket,
    };

    coachesStore.push(newCoach);
    return res.status(201).json(newCoach);
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

  coachesStore.splice(idx, 1);
  return res.json({ ok: true });
}