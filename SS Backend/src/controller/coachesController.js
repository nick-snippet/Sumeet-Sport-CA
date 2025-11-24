// src/controller/coachesController.js
const { uploadFileToFirebase } = require("../services/uploadService");

// For demo/simple persistence we will store metadata in-memory.
// Replace with real DB (Firestore / Mongo) later.
const coachesStore = []; // each item: { id, name, title, description, imageUrl, pathInBucket }

exports.listCoaches = (req, res) => {
  return res.json(coachesStore);
};

exports.createCoach = async (req, res, next) => {
  try {
    const { name, title, description } = req.body;
    if (!req.file) return res.status(400).json({ error: "Image file required" });

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
};

exports.deleteCoach = (req, res) => {
  const { id } = req.params;
  const idx = coachesStore.findIndex((c) => c.id === id);
  if (idx === -1) return res.status(404).json({ error: "Not found" });
  coachesStore.splice(idx, 1);
  return res.json({ ok: true });
};