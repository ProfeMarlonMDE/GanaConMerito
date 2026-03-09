import fs from 'node:fs/promises';
import { Client } from 'pg';

const seedPath = new URL('../supabase/seed.sql', import.meta.url);
const seedSql = await fs.readFile(seedPath, 'utf8');

const databaseUrl = process.env.SUPABASE_DB_URL;
if (!databaseUrl) {
  throw new Error('Missing SUPABASE_DB_URL');
}

const client = new Client({
  connectionString: databaseUrl,
  ssl: { rejectUnauthorized: false },
});

try {
  await client.connect();
  await client.query(seedSql);
  console.log('Seed applied successfully.');
} finally {
  await client.end();
}
