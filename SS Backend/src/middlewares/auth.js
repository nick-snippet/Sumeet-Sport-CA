// src/middlewares/auth.js
// Verifies Firebase ID token and enforces admin-only routes.
// Expects `src/config/firebase.js` to export `admin`.

import  admin  from "../config/firebase.js";

/**
 * Verify Firebase ID Token from Authorization header.
 * Adds req.user = { uid, email, name, claims } on success.
 */
export async function firebaseAuth(req, res, next) {
  if (!admin) {
    console.error("firebaseAuth: Firebase admin not initialized (admin is undefined).");
    return res.status(500).json({ error: "Server misconfiguration: auth provider not initialized" });
  }

  const authHeader = req.headers.authorization || "";
  const idToken = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

  if (!idToken) {
    return res.status(401).json({ error: "Missing or malformed Authorization header" });
  }

  try {
    const decoded = await admin.auth().verifyIdToken(idToken);

    req.user = {
      uid: decoded.uid,
      email: decoded.email,
      name: decoded.name || decoded.email,
      claims: decoded,
    };

    return next();
  } catch (err) {
    // Common causes: token expired, invalid token, network issues
    console.error("firebaseAuth: verifyIdToken failed:", err?.message || err);
    return res.status(401).json({ error: "Invalid or expired auth token" });
  }
}

/**
 * Admin-only middleware.
 * Checks:
 *  - Firebase custom claim `admin: true` OR
 *  - fallback admin email set via env ADMIN_EMAIL_FALLBACK
 *
 * NOTE: it's recommended to use custom claims rather than email fallback.
 */
export function requireAdmin(req, res, next) {
  // ensure firebaseAuth ran
  if (!req.user) {
    return res.status(401).json({ error: "Authentication required" });
  }

  const userClaims = req.user?.claims || {};
  const isAdminClaim = !!userClaims.admin;

  // Fallback admin email — read from env if provided (safer than hardcoding)
  const ADMIN_EMAIL_FALLBACK = process.env.ADMIN_EMAIL_FALLBACK || "admin@gmail.com";
  const isAdminByEmail = req.user?.email === ADMIN_EMAIL_FALLBACK;

  if (isAdminClaim || isAdminByEmail) {
    return next();
  }

  return res.status(403).json({ error: "Admin access required" });
}