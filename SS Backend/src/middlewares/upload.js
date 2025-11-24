// src/middlewares/upload.js
const multer = require("multer");
const os = require("os");
const path = require("path");

// Store files temporarily in OS tmp dir; uploadService will push to Firebase and unlink.
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, os.tmpdir());
  },
  filename: function (req, file, cb) {
    const name = `${Date.now()}-${file.originalname.replace(/\s+/g, "_")}`;
    cb(null, name);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB per file
});

module.exports = upload;