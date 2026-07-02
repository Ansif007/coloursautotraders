import { Router } from "express";
import { getDb } from "../db";
import { authMiddleware } from "../auth";
import { v4 as uuid } from "uuid";

const router = Router();

router.post("/", (req, res) => {
  const body = req.body;

  if (
    !body.contactName ||
    typeof body.contactName !== "string" ||
    body.contactName.trim().length < 2
  ) {
    res.status(400).json({ error: "Full name is required (min 2 characters)" });
    return;
  }
  if (!body.phone || typeof body.phone !== "string" || body.phone.trim().length < 7) {
    res.status(400).json({ error: "Phone number is required (min 7 characters)" });
    return;
  }
  if (!Array.isArray(body.items) || body.items.length === 0) {
    res.status(400).json({ error: "At least one item is required" });
    return;
  }

  const db = getDb();
  const id = uuid();
  const now = new Date().toISOString();

  db.prepare(
    `
    INSERT INTO inquiries (id, contactName, phone, email, companyName, notes, preferredContact, itemsJson, createdAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `
  ).run(
    id,
    body.contactName.trim(),
    body.phone.trim(),
    body.email?.trim() || null,
    body.companyName?.trim() || null,
    body.notes?.trim() || null,
    body.preferredContact || "whatsapp",
    JSON.stringify(body.items),
    now
  );

  res.status(201).json({ ok: true, id });
});

router.get("/", authMiddleware, (_req, res) => {
  const db = getDb();
  const rows = db.prepare("SELECT * FROM inquiries ORDER BY createdAt DESC").all();
  res.json(rows);
});

export default router;
