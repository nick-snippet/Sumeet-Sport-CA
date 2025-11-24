import { uploadFileToFirebase } from "../services/uploadService.js";

const galleryStore = []; // { id, title, desc, images: [ { publicUrl, pathInBucket } ] }

export function listEvents(req, res) {
  res.json(galleryStore);
}

/**
 * Expect: form-data → title, desc, images[]
 */
export async function createEvent(req, res, next) {
  try {
    const { title, desc } = req.body;
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ error: "At least one image required" });
    }

    const uploaded = [];

    for (const file of files) {
      const uploadResult = await uploadFileToFirebase(file.path, "gallery");
      uploaded.push(uploadResult);
    }

    const event = {
      id: Date.now().toString(),
      title,
      desc,
      images: uploaded,
    };

    galleryStore.push(event);
    res.status(201).json(event);
  } catch (err) {
    next(err);
  }
}

export function deleteEvent(req, res) {
  const { id } = req.params;

  const idx = galleryStore.findIndex((g) => g.id === id);
  if (idx === -1) {
    return res.status(404).json({ error: "Not found" });
  }

  galleryStore.splice(idx, 1);
  res.json({ ok: true });
}