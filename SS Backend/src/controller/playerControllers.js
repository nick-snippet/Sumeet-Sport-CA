// src/controllers/playersController.js
const { uploadFileToFirebase } = require("../services/uploadService");

const playersStore = []; // { id, name, tournament, imageUrl, pathInBucket }

exports.listPlayers = (req, res) => {
  res.json(playersStore);
};

exports.createPlayer = async (req, res, next) => {
  try {
    const { name, tournament } = req.body;
    if (!req.file) return res.status(400).json({ error: "Image file required" });
    const uploadResult = await uploadFileToFirebase(req.file.path, "players");
    const newPlayer = {
      id: Date.now().toString(),
      name,
      tournament,
      imageUrl: uploadResult.publicUrl,
      pathInBucket: uploadResult.pathInBucket,
    };
    playersStore.push(newPlayer);
    return res.status(201).json(newPlayer);
  } catch (err) {
    next(err);
  }
};

exports.deletePlayer = (req, res) => {
  const { id } = req.params;
  const idx = playersStore.findIndex((p) => p.id === id);
  if (idx === -1) return res.status(404).json({ error: "Not found" });
  playersStore.splice(idx, 1);
  res.json({ ok: true });
};