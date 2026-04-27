import {
  validateColorInput,
  buildSearchPayload,
  parseSearchColorsResponse,
} from "../../lib/colorUtils.js";

describe("validateColorInput", () => {
  it("accepts a non-empty trimmed color name", () => {
    expect(validateColorInput("  Teal  ")).toEqual({ ok: true, value: "Teal" });
  });

  it("rejects empty or whitespace-only input", () => {
    expect(validateColorInput("")).toEqual({
      ok: false,
      error: "Color name is required",
    });
    expect(validateColorInput("   ")).toEqual({
      ok: false,
      error: "Color name is required",
    });
  });

  it("rejects overly long names", () => {
    const long = "x".repeat(121);
    expect(validateColorInput(long).ok).toBe(false);
  });
});

describe("buildSearchPayload", () => {
  it("builds the JSON-shaped object used by SearchColors", () => {
    expect(buildSearchPayload("red", 42)).toEqual({ search: "red", userId: 42 });
  });

  it("normalizes missing user id to 0", () => {
    expect(buildSearchPayload("blue", NaN)).toEqual({ search: "blue", userId: 0 });
  });
});

describe("parseSearchColorsResponse", () => {
  it("parses valid SearchColors JSON", () => {
    const text = JSON.stringify({ results: ["a", "b"] });
    expect(parseSearchColorsResponse(text)).toEqual({ results: ["a", "b"] });
  });

  it("throws when results is missing or not an array", () => {
    expect(() => parseSearchColorsResponse("{}")).toThrow(/expected/);
    expect(() =>
      parseSearchColorsResponse(JSON.stringify({ results: "no" }))
    ).toThrow(/expected/);
  });

  it("throws when results entries are not strings", () => {
    const bad = JSON.stringify({ results: [1, 2] });
    expect(() => parseSearchColorsResponse(bad)).toThrow(/strings/);
  });
});
