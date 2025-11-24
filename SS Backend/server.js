import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

// Initialize Firebase Admin
import "./firebase.js";

const app = express();
app.use(cors());
app.use(express.json());

// Routes
import coachesRoutes from "./src/routes/coachesRoutes.js";
import playersRoutes from "./src/routes/playerRoutes.js";
import galleryRoutes from "./src/routes/galleryRoutes.js";

app.use("/api/coaches", coachesRoutes);
app.use("/api/players", playersRoutes);
app.use("/api/gallery", galleryRoutes);

// health check
app.get("/", (req, res) => {
  res.send("SS Backend running");
});

// error handler
app.use((err, req, res, next) => {
  console.error(err);
  res
    .status(err.status || 500)
    .json({ error: err.message || "Server error" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});