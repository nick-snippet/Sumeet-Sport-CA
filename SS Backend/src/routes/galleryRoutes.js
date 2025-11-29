import express from "express";
import upload from "../middlewares/upload.js";
import { firebaseAuth, requireAdmin } from "../middlewares/auth.js";
import * as galleryControllers from "../controller/galleryControllers.js";

const router = express.Router();

// Public
router.get("/", galleryControllers.listEvents);

// Admin create (multiple images)
router.post(
  "/",
  firebaseAuth,
  requireAdmin,
  upload.array("images", 12),
  galleryControllers.createEvent
);

// Admin: Edit title/desc
router.put(
  "/:id",
  firebaseAuth,
  requireAdmin,
  galleryControllers.updateEvent
);

// Admin: Add more images
router.post(
  "/:id/images",
  firebaseAuth,
  requireAdmin,
  upload.array("images", 12),
  galleryControllers.addImagesToEvent
);

// Admin: Replace single image
router.put(
  "/:id/images/:index",
  firebaseAuth,
  requireAdmin,
  upload.single("image"),
  galleryControllers.replaceImageInEvent
);

// Admin: Delete single image
router.delete(
  "/:id/images/:index",
  firebaseAuth,
  requireAdmin,
  galleryControllers.deleteImageInEvent
);

// Admin delete whole event
router.delete(
  "/:id",
  firebaseAuth,
  requireAdmin,
  galleryControllers.deleteEvent
);

export default router;