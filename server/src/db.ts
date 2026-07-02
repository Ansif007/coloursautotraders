import { DatabaseSync } from "node:sqlite";
import path from "path";
import fs from "fs";

const DB_PATH = process.env.DB_PATH || path.join(import.meta.dirname, "..", "data", "colours-auto-traders.db");

let db: DatabaseSync;

export function getDb(): DatabaseSync {
  if (!db) {
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    db = new DatabaseSync(DB_PATH);
    db.exec("PRAGMA journal_mode = WAL");
    db.exec("PRAGMA foreign_keys = ON");
    migrate(db);
  }
  return db;
}

function migrate(db: DatabaseSync) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS parts (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      partNumber TEXT NOT NULL,
      oemNumbers TEXT NOT NULL DEFAULT '[]',
      brand TEXT NOT NULL DEFAULT '',
      category TEXT NOT NULL,
      subcategory TEXT NOT NULL DEFAULT '',
      description TEXT NOT NULL DEFAULT '',
      shortDescription TEXT NOT NULL DEFAULT '',
      images TEXT NOT NULL DEFAULT '[]',
      specifications TEXT NOT NULL DEFAULT '[]',
      compatibility TEXT NOT NULL DEFAULT '[]',
      stockStatus TEXT NOT NULL DEFAULT 'in_stock',
      stockNote TEXT,
      tags TEXT NOT NULL DEFAULT '[]',
      viewCount INTEGER NOT NULL DEFAULT 0,
      featured INTEGER NOT NULL DEFAULT 0,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS inquiries (
      id TEXT PRIMARY KEY,
      contactName TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT,
      companyName TEXT,
      notes TEXT,
      preferredContact TEXT NOT NULL DEFAULT 'whatsapp',
      itemsJson TEXT NOT NULL,
      createdAt TEXT NOT NULL
    );
  `);

  // Create indexes if they don't exist (using try-skip approach)
  try { db.exec("CREATE INDEX IF NOT EXISTS idx_parts_slug ON parts(slug)"); } catch {}
  try { db.exec("CREATE INDEX IF NOT EXISTS idx_parts_category ON parts(category)"); } catch {}
  try { db.exec("CREATE INDEX IF NOT EXISTS idx_parts_brand ON parts(brand)"); } catch {}
  try { db.exec("CREATE INDEX IF NOT EXISTS idx_parts_featured ON parts(featured)"); } catch {}
}
