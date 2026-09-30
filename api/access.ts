// Entrada al diagnóstico con la clave que Julio pasa por WhatsApp
import { sql, json, normalizeCode } from './_lib.js';

export async function POST(req: Request) {
  const { code } = await req.json().catch(() => ({}));
  const clean = normalizeCode(code);
  if (clean.length !== 6) return json({ error: 'invalid' }, 400);

  const rows = await sql`
    SELECT d.id, d.completed_at, c.name
    FROM diagnostics d JOIN clients c ON c.id = d.client_id
    WHERE d.code = ${clean}`;
  if (rows.length === 0) return json({ error: 'not_found' }, 404);
  if (rows[0].completed_at) return json({ error: 'used' }, 409);

  await sql`UPDATE diagnostics SET started_at = COALESCE(started_at, now()) WHERE id = ${rows[0].id}`;
  return json({ name: rows[0].name, code: clean });
}
