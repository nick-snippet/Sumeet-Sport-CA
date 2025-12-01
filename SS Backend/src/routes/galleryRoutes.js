// src/routes/galleryRoutes.js
import express from "express";
import upload from "../middlewares/upload.js";
import { firebaseAuth, requireAdmin } from "../middlewares/auth.js";
import * as galleryController from "../controller/galleryControllers.js";

const router = express.Router();

// Public: list all gallery images
router.get("/", galleryController.listImages);

// Admin: create (single image)
router.post(
  "/",
  firebaseAuth,
  requireAdmin,
  upload.single("image"),
  galleryController.createImage
);

// Admin: update (title/category and optionally replace image)
router.put(
  "/:id",
  firebaseAuth,
  requireAdmin,
  upload.single("image"),
  galleryController.updateImage
);

// Admin: delete image
router.delete("/:id", firebaseAuth, requireAdmin, galleryController.deleteImage);

export default router;
