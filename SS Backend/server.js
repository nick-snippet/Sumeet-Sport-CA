const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const coachesRoutes = require("./src/routes/coachesRoutes");
const playersRoutes = require("./src/routes/playersRoutes");
const galleryRoutes = require("./src/routes/galleryRoutes");

app.use("/api/coaches", coachesRoutes);
app.use("/api/players", playersRoutes);
app.use("/api/gallery", galleryRoutes);

// health
app.get("/", (req, res) => res.send("SS Backend running"));

// error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || "Server error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));