import { Router } from "express";
import { getDb } from "../db";
import { authMiddleware } from "../auth";
import { v4 as uuid } from "uuid";

const router = Router();

function rowToVehicle(row: any) {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    make: row.make,
    model: row.model,
    image: row.image || undefined,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

function slugify(text: string): string {
  return (
    text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim() || "untitled"
  );
}

router.get("/", async (_req, res) => {
  const db = getDb();
  const result = await db.query(
    `SELECT v.*, COUNT(vp.part_id)::int as part_count
     FROM vehicles v
     LEFT JOIN vehicle_parts vp ON vp.vehicle_id = v.id
     GROUP BY v.id
     ORDER BY v.name ASC`
  );
  res.json(result.rows.map((row: any) => ({
    ...rowToVehicle(row),
    partCount: row.part_count,
  })));
});

router.get("/:slug", async (req, res) => {
  const db = getDb();
  const vResult = await db.query("SELECT * FROM vehicles WHERE slug = $1", [req.params.slug]);
  if (vResult.rows.length === 0) {
    res.status(404).json({ error: "Vehicle not found" });
    return;
  }
  const vehicle = rowToVehicle(vResult.rows[0]);

  const pResult = await db.query(
    `SELECT p.* FROM parts p
     JOIN vehicle_parts vp ON vp.part_id = p.id
     WHERE vp.vehicle_id = $1
     ORDER BY p.name ASC`,
    [vehicle.id]
  );

  res.json({ ...vehicle, parts: pResult.rows });
});

router.get("/:slug/parts", async (req, res) => {
  const db = getDb();
  const vResult = await db.query("SELECT * FROM vehicles WHERE slug = $1", [req.params.slug]);
  if (vResult.rows.length === 0) {
    res.status(404).json({ error: "Vehicle not found" });
    return;
  }

  const pResult = await db.query(
    `SELECT p.* FROM parts p
     JOIN vehicle_parts vp ON vp.part_id = p.id
     WHERE vp.vehicle_id = $1
     ORDER BY p.name ASC`,
    [vResult.rows[0].id]
  );

  res.json(pResult.rows);
});

router.post("/", authMiddleware, async (req, res) => {
  const db = getDb();
  const body = req.body;
  const id = uuid();
  const slug = body.slug || slugify(body.name || "");
  const now = new Date().toISOString();

  await db.query(
    `INSERT INTO vehicles (id, slug, name, make, model, image, "createdAt", "updatedAt")
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
    [id, slug, body.name, body.make, body.model, body.image || null, now, now]
  );

  const result = await db.query("SELECT * FROM vehicles WHERE id = $1", [id]);
  res.status(201).json(rowToVehicle(result.rows[0]));
});

router.put("/:id", authMiddleware, async (req, res) => {
  const db = getDb();
  const body = req.body;
  const now = new Date().toISOString();

  const existing = await db.query("SELECT * FROM vehicles WHERE id = $1", [req.params.id]);
  if (existing.rows.length === 0) {
    res.status(404).json({ error: "Vehicle not found" });
    return;
  }

  await db.query(
    `UPDATE vehicles SET name = $1, slug = $2, make = $3, model = $4, image = $5, "updatedAt" = $6 WHERE id = $7`,
    [body.name, body.slug || slugify(body.name), body.make, body.model, body.image || null, now, req.params.id]
  );

  const result = await db.query("SELECT * FROM vehicles WHERE id = $1", [req.params.id]);
  res.json(rowToVehicle(result.rows[0]));
});

router.delete("/:id", authMiddleware, async (req, res) => {
  const db = getDb();
  await db.query("DELETE FROM vehicle_parts WHERE vehicle_id = $1", [req.params.id]);
  const result = await db.query("DELETE FROM vehicles WHERE id = $1", [req.params.id]);
  if (result.rowCount === 0) {
    res.status(404).json({ error: "Vehicle not found" });
    return;
  }
  res.json({ ok: true });
});

// Link/unlink parts
router.post("/:id/parts", authMiddleware, async (req, res) => {
  const db = getDb();
  const { partId } = req.body;
  if (!partId) {
    res.status(400).json({ error: "partId is required" });
    return;
  }
  await db.query(
    "INSERT INTO vehicle_parts (vehicle_id, part_id) VALUES ($1, $2) ON CONFLICT DO NOTHING",
    [req.params.id, partId]
  );
  res.json({ ok: true });
});

router.delete("/:id/parts/:partId", authMiddleware, async (req, res) => {
  const db = getDb();
  await db.query(
    "DELETE FROM vehicle_parts WHERE vehicle_id = $1 AND part_id = $2",
    [req.params.id, req.params.partId]
  );
  res.json({ ok: true });
});

export default router;
