import { uploadToFirebase } from "../services/uploadService.js";

let galleryEvents = [];

export const uploadGallery = async (req, res) => {
  try {
    let images = [];

    for (const file of req.files) {
      const url = await uploadToFirebase(file, "gallery");
      images.push(url);
    }

    const event = {
      title: req.body.title,
      description: req.body.description,
      images
    };

    galleryEvents.push(event);

    res.json({ success: true, event });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getGallery = (req, res) => {
  res.json(galleryEvents);
};