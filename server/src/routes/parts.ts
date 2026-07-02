import { Router } from "express";
import { getDb } from "../db";
import { authMiddleware } from "../auth";
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

router.get("/", (_req, res) => {
  const db = getDb();
  const rows = db.prepare("SELECT * FROM parts ORDER BY updatedAt DESC").all();
  res.json(rows.map(rowToPart));
});

router.get("/:slug", (req, res) => {
  const db = getDb();
  const row = db.prepare("SELECT * FROM parts WHERE slug = ?").get(req.params.slug);
  if (!row) {
    res.status(404).json({ error: "Part not found" });
    return;
  }
  db.prepare("UPDATE parts SET viewCount = viewCount + 1 WHERE id = ?").run(
    (row as any).id
  );
  (row as any).viewCount += 1;
  res.json(rowToPart(row));
});

router.post("/", authMiddleware, (req, res) => {
  const db = getDb();
  const body = req.body;
  const id = body.id || uuid();
  const slug = body.slug || slugify(body.name || "");
  const now = new Date().toISOString();

  db.prepare(
    `
    INSERT INTO parts (id, slug, name, partNumber, oemNumbers, brand, category, subcategory,
      description, shortDescription, images, specifications, compatibility,
      stockStatus, stockNote, tags, viewCount, featured, createdAt, updatedAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `
  ).run(
    id,
    slug,
    body.name,
    body.partNumber,
    JSON.stringify(body.oemNumbers || []),
    body.brand || "",
    body.category,
    body.subcategory || "",
    body.description || "",
    body.shortDescription || "",
    JSON.stringify(body.images || []),
    JSON.stringify(body.specifications || []),
    JSON.stringify(body.compatibility || []),
    body.stockStatus || "in_stock",
    body.stockNote || null,
    JSON.stringify(body.tags || []),
    body.viewCount || 0,
    body.featured ? 1 : 0,
    body.createdAt || now,
    now
  );

  const row = db.prepare("SELECT * FROM parts WHERE id = ?").get(id);
  res.status(201).json(rowToPart(row));
});

router.put("/:id", authMiddleware, (req, res) => {
  const db = getDb();
  const body = req.body;
  const now = new Date().toISOString();

  const existing = db.prepare("SELECT * FROM parts WHERE id = ?").get(req.params.id);
  if (!existing) {
    res.status(404).json({ error: "Part not found" });
    return;
  }

  db.prepare(
    `
    UPDATE parts SET
      name = ?, slug = ?, partNumber = ?, oemNumbers = ?, brand = ?, category = ?,
      subcategory = ?, description = ?, shortDescription = ?, images = ?,
      specifications = ?, compatibility = ?, stockStatus = ?, stockNote = ?,
      tags = ?, featured = ?, updatedAt = ?
    WHERE id = ?
  `
  ).run(
    body.name,
    body.slug || slugify(body.name),
    body.partNumber,
    JSON.stringify(body.oemNumbers || []),
    body.brand || "",
    body.category,
    body.subcategory || "",
    body.description || "",
    body.shortDescription || "",
    JSON.stringify(body.images || []),
    JSON.stringify(body.specifications || []),
    JSON.stringify(body.compatibility || []),
    body.stockStatus || "in_stock",
    body.stockNote || null,
    JSON.stringify(body.tags || []),
    body.featured ? 1 : 0,
    now,
    req.params.id
  );

  const row = db.prepare("SELECT * FROM parts WHERE id = ?").get(req.params.id);
  res.json(rowToPart(row));
});

router.delete("/:id", authMiddleware, (req, res) => {
  const db = getDb();
  const result = db.prepare("DELETE FROM parts WHERE id = ?").run(req.params.id);
  if (result.changes === 0) {
    res.status(404).json({ error: "Part not found" });
    return;
  }
  res.json({ ok: true });
});

export default router;
