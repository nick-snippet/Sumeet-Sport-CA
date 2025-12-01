import express from "express";
import upload from "../middlewares/upload.js";
import { firebaseAuth, requireAdmin } from "../middlewares/auth.js";
import * as coachesController from "../controller/coachesController.js";

const router = express.Router();

router.get("/", coachesController.listCoaches);

router.post(
  "/",
  firebaseAuth,
  requireAdmin,
  upload.single("image"),
  coachesController.createCoach
);

router.put(
  "/:id",
  firebaseAuth,
  requireAdmin,
  upload.single("image"),
  coachesController.updateCoach
);

router.delete(
  "/:id",
  firebaseAuth,
  requireAdmin,
  coachesController.deleteCoach
);

export default router;
