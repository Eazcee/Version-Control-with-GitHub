import { createServer } from "node:http";
import { parseSearchColorsResponse } from "../../lib/colorUtils.js";

describe("SearchColors-style API (integration)", () => {
  let server;
  /** @type {string} */
  let baseUrl;

  beforeAll(() =>
    new Promise((resolve, reject) => {
      server = createServer((req, res) => {
        if (req.method !== "POST") {
          res.writeHead(405);
          res.end();
          return;
        }
        const body = JSON.stringify({
          results: ["Crimson", "Navy"],
        });
        res.writeHead(200, {
          "Content-Type": "application/json; charset=UTF-8",
        });
        res.end(body);
      });
      server.listen(0, "127.0.0.1", () => {
        const addr = server.address();
        if (addr && typeof addr !== "string") {
          baseUrl = `http://127.0.0.1:${addr.port}`;
          resolve(undefined);
        } else {
          reject(new Error("Could not bind test server"));
        }
      });
      server.on("error", reject);
    })
  );

  afterAll(
    () =>
      new Promise((resolve, reject) => {
        server.close((err) => (err ? reject(err) : resolve(undefined)));
      })
  );

  it("returns JSON with a results array matching the client contract", async () => {
    const response = await fetch(`${baseUrl}/SearchColors.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      body: JSON.stringify({ search: "blue", userId: 1 }),
    });

    expect(response.ok).toBe(true);
    expect(response.headers.get("content-type")).toMatch(/application\/json/);

    const text = await response.text();
    const data = parseSearchColorsResponse(text);

    expect(data).toHaveProperty("results");
    expect(Array.isArray(data.results)).toBe(true);
    expect(data.results).toEqual(["Crimson", "Navy"]);
  });
});
