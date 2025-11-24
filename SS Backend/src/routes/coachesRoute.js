// src/routes/coachesRoutes.js
const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const { firebaseAuth, requireAdmin } = require("../middlewares/auth");
const coachesController = require("../controllers/coachesController");

// Public read
router.get("/", coachesController.listCoaches);

// Admin create (single image field: image)
router.post("/", firebaseAuth, requireAdmin, upload.single("image"), coachesController.createCoach);

// Admin delete
router.delete("/:id", firebaseAuth, requireAdmin, coachesController.deleteCoach);

module.exports = router;