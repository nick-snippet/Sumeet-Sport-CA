// Small helper utilities (currently unused but useful later)

export function safeGet(obj, path, fallback = undefined) {
  try {
    return path
      .split(".")
      .reduce((acc, key) => (acc ? acc[key] : undefined), obj) ?? fallback;
  } catch {
    return fallback;
  }
}