// Administración de Julio: alta de clientes con su clave y lectura de resultados
import { sql, json, isAdmin, newCode } from './_lib.js';

export async function GET(req: Request) {
  if (!isAdmin(req)) return json({ error: 'unauthorized' }, 401);
  const rows = await sql`
    SELECT c.id AS client_id, c.name, c.whatsapp, c.created_at,
           d.code, d.started_at, d.completed_at, d.profile, d.report
    FROM clients c LEFT JOIN diagnostics d ON d.client_id = c.id
    ORDER BY c.created_at DESC, d.created_at DESC`;
  return json({ rows });
}

export async function POST(req: Request) {
  if (!isAdmin(req)) return json({ error: 'unauthorized' }, 401);
  const { name, whatsapp } = await req.json().catch(() => ({}));
  const cleanName = String(name ?? '').trim();
  const cleanPhone = String(whatsapp ?? '').replace(/[^0-9]/g, '');
  if (!cleanName || cleanPhone.length < 8) return json({ error: 'invalid' }, 400);

  const [client] = await sql`
    INSERT INTO clients (name, whatsapp) VALUES (${cleanName}, ${cleanPhone}) RETURNING id`;

  // Reintenta si la clave generada ya existiera (muy improbable)
  for (let attempt = 0; attempt < 5; attempt++) {
    const code = newCode();
    const inserted = await sql`
      INSERT INTO diagnostics (client_id, code) VALUES (${client.id}, ${code})
      ON CONFLICT (code) DO NOTHING RETURNING code`;
    if (inserted.length) return json({ name: cleanName, whatsapp: cleanPhone, code });
  }
  return json({ error: 'code_collision' }, 500);
}
