import { uploadToFirebase } from "../services/uploadService.js";

let players = [];

export const uploadPlayer = async (req, res) => {
  try {
    const imageUrl = await uploadToFirebase(req.file, "players");

    const player = {
      name: req.body.name,
      tournament: req.body.tournament,
      image: imageUrl
    };

    players.push(player);
    res.json({ success: true, player });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getPlayers = (req, res) => {
  res.json(players);
};