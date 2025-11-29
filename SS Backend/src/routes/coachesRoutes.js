import express from "express";
import upload from "../middlewares/upload.js";
import { firebaseAuth, requireAdmin } from "../middlewares/auth.js";
import * as coachesController from "../controller/coachesController.js";

const router = express.Router();

// Public read
router.get("/", coachesController.listCoaches);

// Admin create (single image)
router.post(
  "/",
  firebaseAuth,
  requireAdmin,
  upload.single("image"),
  coachesController.createCoach
);

// Admin update (supports optional image)
router.put(
  "/:id",
  firebaseAuth,
  requireAdmin,
  upload.single("image"),
  coachesController.updateCoach
);

// Admin delete
router.delete(
  "/:id",
  firebaseAuth,
  requireAdmin,
  coachesController.deleteCoach
);

export default router;