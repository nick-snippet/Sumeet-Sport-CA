import express from "express";
import upload from "../middlewares/upload.js";
import { uploadPlayer, getPlayers } from "../controllers/playersController.js";

const router = express.Router();

router.post("/upload", upload.single("image"), uploadPlayer);
router.get("/", getPlayers);

export default router;