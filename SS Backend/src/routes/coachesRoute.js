import express from "express";
import multerUpload from "../middlewares/upload.js";
import { uploadCoach, getCoaches } from "../controllers/coachesController.js";
import { verifyAdmin } from "../middlewares/auth.js";

const router = express.Router();

// upload new coach
router.post("/upload", verifyAdmin, multerUpload.single("image"), uploadCoach);

// get all coaches
router.get("/all", getCoaches);

export default router;