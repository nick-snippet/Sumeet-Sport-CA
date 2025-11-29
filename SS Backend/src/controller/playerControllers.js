// src/controller/playerControllers.js
import { uploadFileToFirebase } from "../services/uploadService.js";
import { deleteFileFromFirebase } from "../services/deleteService.js";

const playersStore = []; // { id, name, tournament, imageUrl, pathInBucket }

export function listPlayers(req, res) {
  res.json(playersStore);
}

export async function createPlayer(req, res, next) {
  try {
    const { name, tournament } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "Image file required" });
    }

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
}

export async function updatePlayer(req, res, next) {
  try {
    const { id } = req.params;
    const { name, tournament } = req.body;

    const idx = playersStore.findIndex((p) => p.id === id);
    if (idx === -1) return res.status(404).json({ error: "Player not found" });

    const player = playersStore[idx];

    if (req.file) {
      if (player.pathInBucket) {
        try {
          await deleteFileFromFirebase(player.pathInBucket);
        } catch (e) {
          console.warn("Failed to delete old player image:", e.message);
        }
      }
      const uploadResult = await uploadFileToFirebase(req.file.path, "players");
      player.imageUrl = uploadResult.publicUrl;
      player.pathInBucket = uploadResult.pathInBucket;
    }

    if (typeof name !== "undefined") player.name = name;
    if (typeof tournament !== "undefined") player.tournament = tournament;

    playersStore[idx] = player;
    res.json(player);
  } catch (err) {
    next(err);
  }
}

export function deletePlayer(req, res) {
  const { id } = req.params;

  const idx = playersStore.findIndex((p) => p.id === id);
  if (idx === -1) {
    return res.status(404).json({ error: "Not found" });
  }

  const player = playersStore[idx];
  if (player.pathInBucket) {
    deleteFileFromFirebase(player.pathInBucket).catch((e) => console.warn(e.message));
  }

  playersStore.splice(idx, 1);
  res.json({ ok: true });
}