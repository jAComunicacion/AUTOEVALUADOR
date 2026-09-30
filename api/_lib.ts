// Utilidades compartidas por las funciones de /api (el guion bajo evita que Vercel lo publique como ruta).
// Las claves se generan en panel.jacomunicacion.com.ar; acá solo se validan y se guarda el resultado.
import { neon } from '@neondatabase/serverless';

export const sql = neon(process.env.DATABASE_URL!);

export function json(data: unknown, status = 200) {
  return Response.json(data, { status });
}

// Normaliza lo que tipea la persona: "k7m-4pq" o "K7M 4PQ" -> "K7M4PQ"
export function normalizeCode(raw: unknown): string {
  return String(raw ?? '').toUpperCase().replace(/[^A-Z0-9]/g, '');
}
