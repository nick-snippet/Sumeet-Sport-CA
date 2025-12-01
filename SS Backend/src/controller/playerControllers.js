import { db } from "../config/firebase.js";
import { uploadFileToFirebase } from "../services/uploadService.js";
import { deleteFileFromBucket } from "../utils/storageUtils.js";

const PLAYERS_COLLECTION = "players";

export async function listPlayers(req, res, next) {
  try {
    const snap = await db.collection(PLAYERS_COLLECTION)
      .orderBy("createdAt", "desc")
      .get();

    const players = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    res.json(players);

  } catch (err) {
    next(err);
  }
}

export async function createPlayer(req, res, next) {
  try {
    const { name, tournament } = req.body;
    if (!req.file) return res.status(400).json({ error: "Image file required" });

    const uploaded = await uploadFileToFirebase(req.file.path, "players");

    const ref = await db.collection(PLAYERS_COLLECTION).add({
      name,
      tournament,
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

export async function updatePlayer(req, res, next) {
  try {
    const { id } = req.params;
    const ref = db.collection(PLAYERS_COLLECTION).doc(id);
    const snap = await ref.get();

    if (!snap.exists) return res.status(404).json({ error: "Player not found" });

    const data = snap.data();
    const updateData = {};

    const { name, tournament } = req.body;
    if (name !== undefined) updateData.name = name;
    if (tournament !== undefined) updateData.tournament = tournament;

    if (req.file) {
      const uploaded = await uploadFileToFirebase(req.file.path, "players");

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

export async function deletePlayer(req, res, next) {
  try {
    const { id } = req.params;
    const ref = db.collection(PLAYERS_COLLECTION).doc(id);
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
