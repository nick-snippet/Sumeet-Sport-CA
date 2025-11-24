import multer from "multer";
import os from "os";
import path from "path";

// Temporary local storage before upload to Firebase Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, os.tmpdir());
  },
  filename: (req, file, cb) => {
    const cleanName = file.originalname.replace(/\s+/g, "_");
    const uniqueName = `${Date.now()}-${cleanName}`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

export default upload;