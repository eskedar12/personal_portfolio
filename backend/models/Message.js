import { getPool } from "../config/db.js";

export async function insertMessage({ name, email, subject, message }) {
  const db = getPool();
  const { rows } = await db.query(
    `INSERT INTO messages (name, email, subject, message)
     VALUES ($1, $2, $3, $4)
     RETURNING id, name, email, subject, message, read, created_at`,
    [name, email, subject || "", message],
  );
  return rows[0];
}

export async function findMessages({ limit = 200 } = {}) {
  const db = getPool();
  const { rows } = await db.query(
    `SELECT id, name, email, subject, message, read, created_at
     FROM messages
     ORDER BY created_at DESC
     LIMIT $1`,
    [limit],
  );
  return rows;
}
