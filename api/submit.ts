// Guarda el test terminado. El resultado no vuelve a la persona: lo ve Julio en /admin
import { sql, json, normalizeCode } from './_lib.js';
import { MAIN_QUESTIONS, PROFILE_QUESTIONS } from '../src/data/questions.js';
import { generateDiagnostic } from '../src/logic/diagnosticLogic.js';

const VALID_VALUES = new Set([0, 50, 100]);

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const code = normalizeCode(body.code);
  const answers = body.answers ?? {};
  const profile = body.profile ?? {};

  // Las 48 respuestas tienen que estar y valer 0, 50 o 100
  const complete = MAIN_QUESTIONS.every(q => VALID_VALUES.has(answers[q.id]));
  const profileOk = PROFILE_QUESTIONS.every(q => typeof profile[q.id] === 'string');
  if (!complete || !profileOk) return json({ error: 'incomplete' }, 400);

  const cleanAnswers = Object.fromEntries(MAIN_QUESTIONS.map(q => [q.id, answers[q.id]]));
  const cleanProfile = Object.fromEntries(PROFILE_QUESTIONS.map(q => [q.id, profile[q.id]]));
  const report = generateDiagnostic(cleanAnswers);

  const rows = await sql`
    UPDATE diagnostics
    SET completed_at = now(),
        profile = ${JSON.stringify(cleanProfile)}::jsonb,
        answers = ${JSON.stringify(cleanAnswers)}::jsonb,
        report  = ${JSON.stringify(report)}::jsonb
    WHERE code = ${code} AND completed_at IS NULL
    RETURNING id`;
  if (rows.length === 0) return json({ error: 'not_available' }, 409);

  return json({ ok: true });
}
