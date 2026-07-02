import app from "./app";
import { seed } from "./seed";

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
