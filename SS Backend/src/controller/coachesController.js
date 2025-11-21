import { uploadToFirebase } from "../services/uploadService.js";

let coaches = []; // later convert to database

export const uploadCoach = async (req, res) => {
  try {
    const imageUrl = await uploadToFirebase(req.file, "coaches");

    const coach = {
      name: req.body.name,
      title: req.body.title,
      description: req.body.description,
      image: imageUrl
    };

    coaches.push(coach);
    res.json({ success: true, coach });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getCoaches = (req, res) => {
  res.json(coaches);
};