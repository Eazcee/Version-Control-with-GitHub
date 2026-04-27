/**
 * Pure helpers for color entry and SearchColors-style API payloads.
 * Used by tests and available for wiring into the front end later.
 */

/**
 * @param {string} raw
 * @returns {{ ok: boolean, error?: string, value?: string }}
 */
export function validateColorInput(raw) {
  const value = typeof raw === "string" ? raw.trim() : "";
  if (value.length === 0) {
    return { ok: false, error: "Color name is required" };
  }
  if (value.length > 120) {
    return { ok: false, error: "Color name is too long" };
  }
  return { ok: true, value };
}

/**
 * @param {string} search
 * @param {number} userId
 * @returns {{ search: string, userId: number }}
 */
export function buildSearchPayload(search, userId) {
  return {
    search: typeof search === "string" ? search : "",
    userId: Number(userId) || 0,
  };
}

/**
 * Parses and validates SearchColors API JSON (matches front-end expectations).
 * @param {string} responseText
 * @returns {{ results: string[] }}
 */
export function parseSearchColorsResponse(responseText) {
  let jsonObject;
  try {
    jsonObject = JSON.parse(responseText);
  } catch {
    throw new Error("Invalid JSON from SearchColors");
  }
  if (
    jsonObject === null ||
    typeof jsonObject !== "object" ||
    !Array.isArray(jsonObject.results)
  ) {
    throw new Error("Invalid SearchColors response: expected { results: string[] }");
  }
  if (!jsonObject.results.every((item) => typeof item === "string")) {
    throw new Error("Invalid SearchColors response: results must be strings");
  }
  return jsonObject;
}
