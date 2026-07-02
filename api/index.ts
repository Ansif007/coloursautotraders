import app from "./app.js";
import { seed } from "./seed.js";

let seeded = false;

export default async function handler(
  req: import("express").Request,
  res: import("express").Response
) {
  if (!seeded) {
    seeded = true;
    await seed().catch((err) => console.error("Seed error:", err));
  }
  app(req, res);
}
