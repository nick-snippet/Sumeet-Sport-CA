// src/controllers/galleryController.js
const { uploadFileToFirebase } = require("../services/uploadService");

const galleryStore = []; // { id, title, desc, images: [ { publicUrl, pathInBucket } ] }

exports.listEvents = (req, res) => {
  res.json(galleryStore);
};

/**
 * Expect form-data: title, desc, images[] (multiple)
 */
exports.createEvent = async (req, res, next) => {
  try {
    const { title, desc } = req.body;
    const files = req.files;
    if (!files || files.length === 0) return res.status(400).json({ error: "At least one image required" });

    const uploaded = [];
    for (const f of files) {
      const r = await uploadFileToFirebase(f.path, "gallery");
      uploaded.push(r);
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
};

exports.deleteEvent = (req, res) => {
  const { id } = req.params;
  const idx = galleryStore.findIndex((g) => g.id === id);
  if (idx === -1) return res.status(404).json({ error: "Not found" });
  galleryStore.splice(idx, 1);
  res.json({ ok: true });
};