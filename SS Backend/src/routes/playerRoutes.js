import express from "express";
import upload from "../middlewares/upload.js";
import { firebaseAuth, requireAdmin } from "../middlewares/auth.js";
import * as playerControllers from "../controller/playerControllers.js";

const router = express.Router();

router.get("/", playerControllers.listPlayers);

router.post(
  "/",
  firebaseAuth,
  requireAdmin,
  upload.single("image"),
  playerControllers.createPlayer
);

router.put(
  "/:id",
  firebaseAuth,
  requireAdmin,
  upload.single("image"),
  playerControllers.updatePlayer
);

router.delete(
  "/:id",
  firebaseAuth,
  requireAdmin,
  playerControllers.deletePlayer
);

export default router;
