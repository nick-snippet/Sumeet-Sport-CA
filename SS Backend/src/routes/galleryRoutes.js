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

// Admin delete
router.delete(
  "/:id",
  firebaseAuth,
  requireAdmin,
  galleryControllers.deleteEvent
);

export default router;