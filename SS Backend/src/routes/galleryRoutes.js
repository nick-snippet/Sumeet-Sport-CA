import express from "express";
import upload from "../middlewares/upload.js";
import { uploadGallery, getGallery } from "../controllers/galleryController.js";

const router = express.Router();

router.post("/upload", upload.array("images", 10), uploadGallery);
router.get("/", getGallery);

export default router;