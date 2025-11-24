// setAdmin.cjs
const admin = require("firebase-admin");
const path = require("path");

const serviceAccountPath = path.resolve(__dirname, "firebase-admin.json");
if (!serviceAccountPath) throw new Error("Place firebase-admin.json at project root.");

admin.initializeApp({
  credential: admin.credential.cert(require(serviceAccountPath)),
});

const email = "admin@gmail.com"; // change here
(async () => {
  try {
    const user = await admin.auth().getUserByEmail(email);
    await admin.auth().setCustomUserClaims(user.uid, { admin: true });
    console.log(`Set admin claim for ${email}`);
  } catch (e) {
    console.error(e.message);
  }
  process.exit();
})();