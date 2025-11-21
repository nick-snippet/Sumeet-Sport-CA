// /utils/helpers.js

// Generates clean filenames for Firebase Storage
export const generateFileName = (originalName) => {
  const ext = originalName.split(".").pop();
  const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
  return `${unique}.${ext}`;
};

// Standard success response wrapper
export const success = (res, data, message = "OK") => {
  return res.status(200).json({ success: true, message, data });
};

// Standard error response wrapper
export const failure = (res, error, code = 400) => {
  return res.status(code).json({ success: false, error });
};