import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import coachesRoutes from "./src/routes/coachesRoutes.js";
import playersRoutes from "./src/routes/playersRoutes.js";
import galleryRoutes from "./src/routes/galleryRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/coaches", coachesRoutes);
app.use("/api/players", playersRoutes);
app.use("/api/gallery", galleryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on PORT ${PORT}`));