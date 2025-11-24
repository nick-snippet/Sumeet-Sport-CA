// src/middlewares/auth.js
// Validates Firebase ID Token sent in Authorization: Bearer <token>
// Also checks admin claim for admin-only routes.

const { admin } = require("../config/firebase");

/**
 * attach req.user = { uid, email, name, claims }
 */
async function firebaseAuth(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const idToken = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
  if (!idToken) return res.status(401).json({ error: "Missing auth token" });

  try {
    const decoded = await admin.auth().verifyIdToken(idToken);
    req.user = {
      uid: decoded.uid,
      email: decoded.email,
      name: decoded.name || decoded.email,
      claims: decoded,
    };
    next();
  } catch (err) {
    console.error("verifyIdToken failed:", err.message);
    return res.status(401).json({ error: "Invalid auth token" });
  }
}

/**
 * Admin-only middleware — expects a custom claim `admin: true`.
 * If you haven't set custom claims, you can check email (not recommended for prod).
 *
 * IMPORTANT: add your admin emails or set custom claims via Firebase admin SDK
 */
function requireAdmin(req, res, next) {
  const userClaims = (req.user && req.user.claims) || {};
  const isAdminClaim = !!userClaims.admin;

  // fallback: allow one specific admin email (change below)
  const ADMIN_EMAIL_FALLBACK = "admin@gmail.com"; // <<-- change this if needed

  const isAdminByEmail = req.user && req.user.email === ADMIN_EMAIL_FALLBACK;

  if (isAdminClaim || isAdminByEmail) return next();

  return res.status(403).json({ error: "Admin access required" });
}

module.exports = {
  firebaseAuth,
  requireAdmin,
};