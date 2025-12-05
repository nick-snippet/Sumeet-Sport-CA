import express from "express";
import upload from "../middlewares/upload.js";
import { firebaseAuth, requireAdmin } from "../middlewares/auth.js";
import * as galleryControllers from "../controller/galleryControllers.js";

const router = express.Router();

router.get("/", galleryControllers.listEvents);


router.post(
  "/",
  firebaseAuth,
  requireAdmin,
  upload.array("images", 24),
  galleryControllers.createEvent
);

// update event (fields or images)
router.put(
  "/:id",
  firebaseAuth,
  requireAdmin,
  upload.array("files", 24), // frontend can send files under 'files' or 'images' — be consistent
  galleryControllers.updateEvent
);

router.delete(
  "/:id",
  firebaseAuth,
  requireAdmin,
  galleryControllers.deleteEvent
);

export default router;
