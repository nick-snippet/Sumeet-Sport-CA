// src/routes/playersRoutes.js
const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const { firebaseAuth, requireAdmin } = require("../middlewares/auth");
const playerControllers = require("../controller/playerControllers");

router.get("/", playerControllers.listPlayers);
router.post("/", firebaseAuth, requireAdmin, upload.single("image"), playerControllers.createPlayer);
router.delete("/:id", firebaseAuth, requireAdmin, playerControllers.deletePlayer);

module.exports = router;