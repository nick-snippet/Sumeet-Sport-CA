# SS-backend README

## Purpose
This backend provides:
- Upload endpoints for Coaches, Players, Gallery (images stored in Firebase Storage).
- Admin protected routes (via Firebase authentication + custom claim fallback).
- Simple in-memory stores for metadata (replace with Firestore or other DB later).

## Quick setup
1. Place `firebase-admin.json` (service account key) at project root: `SS-backend/firebase-admin.json`.
2. Copy `.env.example` to `.env` and fill `FIREBASE_STORAGE_BUCKET`.
3. Install dependencies: