// Utilidades compartidas por las funciones de /api (el guion bajo evita que Vercel lo publique como ruta)
import { neon } from '@neondatabase/serverless';
import { randomInt, timingSafeEqual } from 'node:crypto';

export const sql = neon(process.env.DATABASE_URL!);

export function json(data: unknown, status = 200) {
  return Response.json(data, { status });
}

// Normaliza lo que tipea la persona: "k7m-4pq" o "K7M 4PQ" -> "K7M4PQ"
export function normalizeCode(raw: unknown): string {
  return String(raw ?? '').toUpperCase().replace(/[^A-Z0-9]/g, '');
}

// Clave de 6 caracteres sin letras/números que se confunden (0/O, 1/I/L)
const ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
export function newCode(): string {
  let code = '';
  for (let i = 0; i < 6; i++) code += ALPHABET[randomInt(ALPHABET.length)];
  return code;
}

export function isAdmin(req: Request): boolean {
  const expected = process.env.ADMIN_KEY ?? '';
  const given = req.headers.get('x-admin-key') ?? '';
  if (!expected || given.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(given), Buffer.from(expected));
}
