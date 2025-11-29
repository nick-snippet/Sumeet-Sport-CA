// src/controller/galleryControllers.js
import { uploadFileToFirebase } from "../services/uploadService.js";
import { deleteFileFromFirebase } from "../services/deleteService.js";

const galleryStore = []; // { id, title, desc, images: [ { publicUrl, pathInBucket } ] }

export function listEvents(req, res) {
  res.json(galleryStore);
}

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

export async function addImagesToEvent(req, res, next) {
  try {
    const { id } = req.params;
    const files = req.files;

    const event = galleryStore.find((g) => g.id === id);
    if (!event) return res.status(404).json({ error: "Event not found" });

    const uploaded = [];
    for (const file of files) {
      const uploadResult = await uploadFileToFirebase(file.path, "gallery");
      uploaded.push(uploadResult);
    }

    event.images.push(...uploaded);

    res.json(event);
  } catch (err) {
    next(err);
  }
}

export async function replaceImageInEvent(req, res, next) {
  try {
    const { id, index } = req.params;

    const event = galleryStore.find((g) => g.id === id);
    if (!event) return res.status(404).json({ error: "Event not found" });

    const idx = parseInt(index, 10);
    if (!event.images[idx]) {
      return res.status(404).json({ error: "Image index not found" });
    }

    // Delete old image from Firebase
    await deleteFileFromFirebase(event.images[idx].pathInBucket);

    // Upload new image
    const uploadResult = await uploadFileToFirebase(req.file.path, "gallery");

    // Replace in array
    event.images[idx] = uploadResult;

    res.json(event);
  } catch (err) {
    next(err);
  }
}

export async function deleteImageInEvent(req, res, next) {
  try {
    const { id, index } = req.params;

    const event = galleryStore.find((g) => g.id === id);
    if (!event) return res.status(404).json({ error: "Event not found" });

    const idx = parseInt(index, 10);
    if (!event.images[idx]) {
      return res.status(404).json({ error: "Image index not found" });
    }

    // Delete from Firebase
    await deleteFileFromFirebase(event.images[idx].pathInBucket);

    // Remove from array
    event.images.splice(idx, 1);

    res.json(event);
  } catch (err) {
    next(err);
  }
}

// NEW: update title/desc (and category if you want)
export async function updateEvent(req, res, next) {
  try {
    const { id } = req.params;
    const { title, desc } = req.body;

    const event = galleryStore.find((g) => g.id === id);
    if (!event) return res.status(404).json({ error: "Event not found" });

    if (typeof title !== "undefined") event.title = title;
    if (typeof desc !== "undefined") event.desc = desc;

    res.json(event);
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

  // optional: delete all images from firebase
  const event = galleryStore[idx];
  if (Array.isArray(event.images)) {
    event.images.forEach((img) => {
      if (img.pathInBucket) deleteFileFromFirebase(img.pathInBucket).catch(() => {});
    });
  }

  galleryStore.splice(idx, 1);
  res.json({ ok: true });
}