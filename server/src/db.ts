import pg from "pg";

const { Pool } = pg;

let pool: pg.Pool;

export function getDb(): pg.Pool {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.POSTGRES_URL,
      max: 5,
    });
  }
  return pool;
}

export async function migrate() {
  const db = getDb();
  await db.query(`
    CREATE TABLE IF NOT EXISTS parts (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      "partNumber" TEXT NOT NULL,
      "oemNumbers" TEXT NOT NULL DEFAULT '[]',
      brand TEXT NOT NULL DEFAULT '',
      category TEXT NOT NULL,
      subcategory TEXT NOT NULL DEFAULT '',
      description TEXT NOT NULL DEFAULT '',
      "shortDescription" TEXT NOT NULL DEFAULT '',
      images TEXT NOT NULL DEFAULT '[]',
      specifications TEXT NOT NULL DEFAULT '[]',
      compatibility TEXT NOT NULL DEFAULT '[]',
      "stockStatus" TEXT NOT NULL DEFAULT 'in_stock',
      "stockNote" TEXT,
      tags TEXT NOT NULL DEFAULT '[]',
      "viewCount" INTEGER NOT NULL DEFAULT 0,
      featured INTEGER NOT NULL DEFAULT 0,
      "createdAt" TEXT NOT NULL,
      "updatedAt" TEXT NOT NULL
    )
  `);
  await db.query(`
    CREATE TABLE IF NOT EXISTS inquiries (
      id TEXT PRIMARY KEY,
      "contactName" TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT,
      "companyName" TEXT,
      notes TEXT,
      "preferredContact" TEXT NOT NULL DEFAULT 'whatsapp',
      "itemsJson" TEXT NOT NULL,
      "createdAt" TEXT NOT NULL
    )
  `);
  await db.query("CREATE INDEX IF NOT EXISTS idx_parts_slug ON parts(slug)").catch(() => {});
  await db.query("CREATE INDEX IF NOT EXISTS idx_parts_category ON parts(category)").catch(() => {});
  await db.query("CREATE INDEX IF NOT EXISTS idx_parts_brand ON parts(brand)").catch(() => {});
  await db.query("CREATE INDEX IF NOT EXISTS idx_parts_featured ON parts(featured)").catch(() => {});

  await db.query(`
    CREATE TABLE IF NOT EXISTS vehicles (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      make TEXT NOT NULL,
      model TEXT NOT NULL,
      image TEXT,
      "createdAt" TEXT NOT NULL,
      "updatedAt" TEXT NOT NULL
    )
  `);
  await db.query(`
    CREATE TABLE IF NOT EXISTS vehicle_parts (
      vehicle_id TEXT NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
      part_id TEXT NOT NULL REFERENCES parts(id) ON DELETE CASCADE,
      PRIMARY KEY (vehicle_id, part_id)
    )
  `);
}
