import express from "express";
import upload from "../middlewares/upload.js";
import { firebaseAuth, requireAdmin } from "../middlewares/auth.js";
import * as playerControllers from "../controller/playerControllers.js";

const router = express.Router();

// Public list
router.get("/", playerControllers.listPlayers);

// Admin create (single image)
router.post(
  "/",
  firebaseAuth,
  requireAdmin,
  upload.single("image"),
  playerControllers.createPlayer
);

// Admin update
router.put(
  "/:id",
  firebaseAuth,
  requireAdmin,
  upload.single("image"),
  playerControllers.updatePlayer
);

// Admin delete
router.delete(
  "/:id",
  firebaseAuth,
  requireAdmin,
  playerControllers.deletePlayer
);

export default router;
