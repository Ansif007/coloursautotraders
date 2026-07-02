import { Router } from "express";
import { getDb } from "../db.js";
import { authMiddleware } from "../auth.js";
import { v4 as uuid } from "uuid";

const router = Router();

function rowToPart(row: any) {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    partNumber: row.partNumber,
    oemNumbers: JSON.parse(row.oemNumbers || "[]"),
    brand: row.brand,
    category: row.category,
    subcategory: row.subcategory,
    description: row.description,
    shortDescription: row.shortDescription,
    images: JSON.parse(row.images || "[]"),
    specifications: JSON.parse(row.specifications || "[]"),
    compatibility: JSON.parse(row.compatibility || "[]"),
    stockStatus: row.stockStatus,
    stockNote: row.stockNote || undefined,
    tags: JSON.parse(row.tags || "[]"),
    viewCount: row.viewCount,
    featured: Boolean(row.featured),
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
  const result = await db.query("SELECT * FROM parts ORDER BY \"updatedAt\" DESC");
  res.json(result.rows.map(rowToPart));
});

router.get("/:slug", async (req, res) => {
  const db = getDb();
  const result = await db.query("SELECT * FROM parts WHERE slug = $1", [req.params.slug]);
  if (result.rows.length === 0) {
    res.status(404).json({ error: "Part not found" });
    return;
  }
  const row = result.rows[0];
  await db.query("UPDATE parts SET \"viewCount\" = \"viewCount\" + 1 WHERE id = $1", [row.id]);
  row.viewCount += 1;
  res.json(rowToPart(row));
});

router.post("/", authMiddleware, async (req, res) => {
  const db = getDb();
  const body = req.body;
  const id = body.id || uuid();
  const slug = body.slug || slugify(body.name || "");
  const now = new Date().toISOString();

  await db.query(
    `INSERT INTO parts (id, slug, name, "partNumber", "oemNumbers", brand, category, subcategory,
      description, "shortDescription", images, specifications, compatibility,
      "stockStatus", "stockNote", tags, "viewCount", featured, "createdAt", "updatedAt")
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20)`,
    [
      id, slug, body.name, body.partNumber,
      JSON.stringify(body.oemNumbers || []),
      body.brand || "", body.category, body.subcategory || "",
      body.description || "", body.shortDescription || "",
      JSON.stringify(body.images || []),
      JSON.stringify(body.specifications || []),
      JSON.stringify(body.compatibility || []),
      body.stockStatus || "in_stock", body.stockNote || null,
      JSON.stringify(body.tags || []),
      body.viewCount || 0, body.featured ? 1 : 0,
      body.createdAt || now, now,
    ]
  );

  const result = await db.query("SELECT * FROM parts WHERE id = $1", [id]);
  res.status(201).json(rowToPart(result.rows[0]));
});

router.put("/:id", authMiddleware, async (req, res) => {
  const db = getDb();
  const body = req.body;
  const now = new Date().toISOString();

  const existing = await db.query("SELECT * FROM parts WHERE id = $1", [req.params.id]);
  if (existing.rows.length === 0) {
    res.status(404).json({ error: "Part not found" });
    return;
  }

  await db.query(
    `UPDATE parts SET
      name = $1, slug = $2, "partNumber" = $3, "oemNumbers" = $4, brand = $5, category = $6,
      subcategory = $7, description = $8, "shortDescription" = $9, images = $10,
      specifications = $11, compatibility = $12, "stockStatus" = $13, "stockNote" = $14,
      tags = $15, featured = $16, "updatedAt" = $17
     WHERE id = $18`,
    [
      body.name, body.slug || slugify(body.name), body.partNumber,
      JSON.stringify(body.oemNumbers || []), body.brand || "", body.category,
      body.subcategory || "", body.description || "", body.shortDescription || "",
      JSON.stringify(body.images || []),
      JSON.stringify(body.specifications || []),
      JSON.stringify(body.compatibility || []),
      body.stockStatus || "in_stock", body.stockNote || null,
      JSON.stringify(body.tags || []), body.featured ? 1 : 0, now,
      req.params.id,
    ]
  );

  const result = await db.query("SELECT * FROM parts WHERE id = $1", [req.params.id]);
  res.json(rowToPart(result.rows[0]));
});

router.delete("/:id", authMiddleware, async (req, res) => {
  const db = getDb();
  const result = await db.query("DELETE FROM parts WHERE id = $1", [req.params.id]);
  if (result.rowCount === 0) {
    res.status(404).json({ error: "Part not found" });
    return;
  }
  res.json({ ok: true });
});

export default router;
