// Crea las tablas en Neon. Uso: node --env-file=.env.local scripts/migrate.mjs
import { neon } from '@neondatabase/serverless';
import { readFileSync } from 'node:fs';

const sql = neon(process.env.DATABASE_URL);
const statements = readFileSync(new URL('./schema.sql', import.meta.url), 'utf8')
  .replace(/^--.*$/gm, '').split(';').map(s => s.trim()).filter(Boolean);
for (const statement of statements) await sql.query(statement);
console.log('Tablas listas:', (await sql`SELECT tablename FROM pg_tables WHERE schemaname = 'public'`).map(r => r.tablename));
