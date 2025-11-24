// src/util/helpers.js
// Small helper utilities (currently unused but useful later)

function safeGet(obj, path, fallback = undefined) {
  try {
    return path.split(".").reduce((acc, k) => (acc ? acc[k] : undefined), obj) || fallback;
  } catch {
    return fallback;
  }
}

module.exports = {
  safeGet,
};