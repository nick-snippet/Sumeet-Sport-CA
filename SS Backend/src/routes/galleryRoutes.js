// src/routes/galleryRoutes.js
const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const { firebaseAuth, requireAdmin } = require("../middlewares/auth");
const galleryController = require("../controllers/galleryController");

// Public
router.get("/", galleryController.listEvents);

// Admin create (multiple images: images[])
router.post("/", firebaseAuth, requireAdmin, upload.array("images", 12), galleryController.createEvent);
router.delete("/:id", firebaseAuth, requireAdmin, galleryController.deleteEvent);

module.exports = router;