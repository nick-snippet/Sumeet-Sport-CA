// src/routes/playersRoutes.js
const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const { firebaseAuth, requireAdmin } = require("../middlewares/auth");
const playersController = require("../controllers/playersController");

router.get("/", playersController.listPlayers);
router.post("/", firebaseAuth, requireAdmin, upload.single("image"), playersController.createPlayer);
router.delete("/:id", firebaseAuth, requireAdmin, playersController.deletePlayer);

module.exports = router;