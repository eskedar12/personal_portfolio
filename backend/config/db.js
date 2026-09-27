import pg from "pg";

const { Pool } = pg;

let pool = null;

export function getPool() {
  if (pool) return pool;

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error("DATABASE_URL is not set. Add it to your .env file.");
    process.exit(1);
  }

  pool = new Pool({
    connectionString,
    // Most hosted Postgres providers (Render, Supabase, Neon, Railway) require
    // SSL. Set PGSSL=false in .env if you're connecting to a local database
    // that doesn't use SSL.
    ssl: process.env.PGSSL === "false" ? false : { rejectUnauthorized: false },
  });

  return pool;
}

export async function connectDB() {
  const db = getPool();

  try {
    await db.query("SELECT 1");
    console.log("PostgreSQL connected");
  } catch (err) {
    console.error("PostgreSQL connection error:", err.message);
    process.exit(1);
  }

  await db.query(`
    CREATE TABLE IF NOT EXISTS messages (
      id SERIAL PRIMARY KEY,
      name VARCHAR(120) NOT NULL,
      email VARCHAR(200) NOT NULL,
      subject VARCHAR(200) DEFAULT '',
      message TEXT NOT NULL,
      read BOOLEAN NOT NULL DEFAULT FALSE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
}
