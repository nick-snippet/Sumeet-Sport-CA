// src/routes/galleryRoutes.js
const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const { firebaseAuth, requireAdmin } = require("../middlewares/auth");
const galleryControllers = require("../controller/galleryControllers");

// Public
router.get("/", galleryControllers.listEvents);

// Admin create (multiple images: images[])
router.post("/", firebaseAuth, requireAdmin, upload.array("images", 12), galleryControllers.createEvent);
router.delete("/:id", firebaseAuth, requireAdmin, galleryControllers.deleteEvent);

module.exports = router;