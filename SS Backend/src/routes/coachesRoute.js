import express from "express";
import upload from "../middlewares/upload.js";
import { uploadCoach, getCoaches } from "../controller/coachescontroller.js";

const router = express.Router();

router.post("/upload", upload.single("image"), uploadCoach);
router.get("/", getCoaches);

export default router;