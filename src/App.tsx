import { useEffect, useState, type CSSProperties, type FormEvent } from 'react';
import { MAIN_QUESTIONS, SECTIONS, INTRO_TEXT, PROFILE_QUESTIONS, PROFILE_SUBTITLE } from './data/questions';
import { JA_WHATSAPP, REQUEST_MESSAGE, waLink } from './config';

// Recorrido: clave (modal) -> bienvenida -> perfil -> 4 secciones x 12 preguntas -> cierre (modal).
// El resultado no se muestra: se guarda en Neon y lo ve Julio en /admin.

type Step = 'key' | 'intro' | 'profile' | 'section' | 'question' | 'sending' | 'done';

interface Progress {
  step: Step;
  profileIdx: number;
  questionIdx: number;
  profile: Record<string, string>;
  answers: Record<string, number>;
}

const START: Progress = { step: 'intro', profileIdx: 0, questionIdx: 0, profile: {}, answers: {} };
const SESSION_KEY = 'ja-diag-session';
const TOTAL = MAIN_QUESTIONS.length;
const PER_SECTION = TOTAL / SECTIONS.length;

// localStorage puede fallar (navegación privada): el test sigue funcionando igual, solo sin retomar
function load<T>(key: string): T | null {
  try { return JSON.parse(localStorage.getItem(key) || 'null'); } catch { return null; }
}
function save(key: string, value: unknown) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* sin persistencia */ }
}
function forget(key: string) {
  try { localStorage.removeItem(key); } catch { /* sin persistencia */ }
}

const stripNumber = (text: string) => text.replace(/^\d+\.\s*/, '');
const idx = (i: number) => ({ '--i': i } as CSSProperties);

export default function App() {
  const saved = load<{ code: string; name: string }>(SESSION_KEY);
  const [session, setSession] = useState(saved);
  const [progress, setProgress] = useState<Progress>(() =>
    (saved && load<Progress>(`ja-diag-${saved.code}`)) || (saved ? START : { ...START, step: 'key' }));
  const [picked, setPicked] = useState<string | null>(null);
  const [sendError, setSendError] = useState(false);

  // Guarda el avance en cada paso, para retomar si se cierra la pestaña
  useEffect(() => {
    if (session && progress.step !== 'done') save(`ja-diag-${session.code}`, progress);
  }, [session, progress]);

  const update = (patch: Partial<Progress>) => setProgress(p => ({ ...p, ...patch }));

  const question = MAIN_QUESTIONS[progress.questionIdx];
  const section = SECTIONS.find(s => s.id === question?.section);
  const profileQ = PROFILE_QUESTIONS[progress.profileIdx];

  // Pequeña pausa para que se vea la opción elegida antes de pasar
  const choose = (id: string, then: () => void) => {
    setPicked(id);
    setTimeout(() => { setPicked(null); then(); }, 280);
  };

  const answerProfile = (value: string) => choose(value, () => {
    const profile = { ...progress.profile, [profileQ.id]: value };
    if (progress.profileIdx < PROFILE_QUESTIONS.length - 1) update({ profile, profileIdx: progress.profileIdx + 1 });
    else update({ profile, step: 'section' });
  });

  const answerQuestion = (value: number, optionKey: string) => choose(optionKey, () => {
    const answers = { ...progress.answers, [question.id]: value };
    const next = progress.questionIdx + 1;
    if (next >= TOTAL) { submit(answers); return; }
    update({ answers, questionIdx: next, step: next % PER_SECTION === 0 ? 'section' : 'question' });
  });

  const back = () => {
    if (progress.step === 'question' && progress.questionIdx % PER_SECTION === 0) update({ step: 'section' });
    else if (progress.step === 'question') update({ questionIdx: progress.questionIdx - 1 });
    else if (progress.step === 'section' && progress.questionIdx === 0) update({ step: 'profile' });
    else if (progress.step === 'section') update({ step: 'question', questionIdx: progress.questionIdx - 1 });
    else if (progress.step === 'profile' && progress.profileIdx > 0) update({ profileIdx: progress.profileIdx - 1 });
    else update({ step: 'intro' });
  };

  async function submit(answers: Record<string, number>) {
    update({ answers, step: 'sending' });
    setSendError(false);
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: session!.code, profile: progress.profile, answers }),
      });
      if (!res.ok) throw new Error(String(res.status));
      forget(`ja-diag-${session!.code}`);
      forget(SESSION_KEY);
      update({ step: 'done' });
    } catch {
      setSendError(true);
    }
  }

  const answered = progress.step === 'done' || progress.step === 'sending' ? TOTAL : progress.questionIdx;
  const inTest = progress.step === 'section' || progress.step === 'question';

  return (
    <div className="shell">
      <header className="topbar">
        <img src="/logos/ja-logotipo.jpg" alt="jA Comunicación" />
        {inTest && <span className="count">{progress.questionIdx + 1} / {TOTAL}</span>}
      </header>
      <div className="progress" aria-hidden="true"><span style={{ width: `${(answered / TOTAL) * 100}%` }} /></div>

      <main className="stage">
        {progress.step === 'intro' && session && (
          <div className="stagger" key="intro">
            <p className="eyebrow" style={idx(0)}>Diagnóstico</p>
            <h1 className="title" style={idx(1)}>Hola, {session.name}.</h1>
            <p className="lede" style={idx(2)}>{INTRO_TEXT}</p>
            <div className="row" style={idx(3)}>
              <button className="btn" onClick={() => update({ step: 'profile' })}>Empezar</button>
            </div>
          </div>
        )}

        {progress.step === 'profile' && (
          <div className="stagger" key={`p-${progress.profileIdx}`}>
            <div className="meta" style={idx(0)}>
              <p className="eyebrow" style={{ margin: 0 }}>Tu empresa · {progress.profileIdx + 1} de {PROFILE_QUESTIONS.length}</p>
              <button className="link" onClick={back}>Anterior</button>
            </div>
            {progress.profileIdx === 0 && <p className="lede" style={idx(1)}>{PROFILE_SUBTITLE}</p>}
            <h2 className="question" style={idx(2)}>{stripNumber(profileQ.text)}</h2>
            <ul className="options" style={idx(3)}>
              {profileQ.options.map((opt, i) => (
                <li key={opt}>
                  <button
                    className={`option${picked === opt || (!picked && progress.profile[profileQ.id] === opt) ? ' is-picked' : ''}`}
                    onClick={() => answerProfile(opt)}>
                    <span className="mark">{String.fromCharCode(65 + i)}</span>{opt}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {progress.step === 'section' && section && (
          <div className="stagger" key={`s-${section.id}`}>
            <p className="eyebrow" style={idx(0)}>Parte {section.id} de {SECTIONS.length}</p>
            <h1 className="title" style={idx(1)}>{section.title}</h1>
            <p className="lede" style={idx(2)}>{section.summary}</p>
            <div className="row" style={idx(3)}>
              <button className="btn" onClick={() => update({ step: 'question' })}>Ver preguntas</button>
              <button className="link" onClick={back}>Anterior</button>
            </div>
          </div>
        )}

        {progress.step === 'question' && question && (
          <div className="stagger" key={`q-${question.id}`}>
            <div className="meta" style={idx(0)}>
              <p className="eyebrow" style={{ margin: 0 }}>{section?.title}</p>
              <button className="link" onClick={back}>Anterior</button>
            </div>
            <h2 className="question" style={idx(1)}>{question.text}</h2>
            <ul className="options" style={idx(2)}>
              {question.options.map((opt, i) => {
                const key = `${question.id}-${i}`;
                const isPicked = picked === key || (!picked && progress.answers[question.id] === opt.value);
                return (
                  <li key={key}>
                    <button className={`option${isPicked ? ' is-picked' : ''}`} onClick={() => answerQuestion(opt.value, key)}>
                      <span className="mark">{String.fromCharCode(65 + i)}</span>{opt.text}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {progress.step === 'sending' && (
          <div className="stagger" key="sending">
            <p className="eyebrow" style={idx(0)}>Diagnóstico</p>
            <h1 className="title" style={idx(1)}>{sendError ? 'No pudimos guardar tus respuestas.' : 'Guardando tus respuestas…'}</h1>
            {sendError && (
              <div className="row" style={idx(2)}>
                <button className="btn" onClick={() => submit(progress.answers)}>Reintentar</button>
                <a className="link" href={waLink(JA_WHATSAPP, 'Hola, terminé el diagnóstico pero no se pudo guardar.')} target="_blank" rel="noopener">Avisar por WhatsApp</a>
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="foot">
        <span>jA Comunicación</span>
        <span>Concepción del Uruguay · Entre Ríos</span>
      </footer>

      {progress.step === 'key' && (
        <KeyModal onEnter={(s) => { save(SESSION_KEY, s); setSession(s); setProgress(load<Progress>(`ja-diag-${s.code}`) || START); }} />
      )}

      {progress.step === 'done' && (
        <div className="modal-backdrop">
          <div className="modal stagger" role="dialog" aria-labelledby="done-title">
            <img className="watermark" src="/logos/IsoLogojAComunicacion.png" alt="" />
            <p className="eyebrow" style={idx(0)}>Diagnóstico completo</p>
            <h1 className="title" id="done-title" style={idx(1)}>Listo, {session?.name}.</h1>
            <p className="lede" style={{ ...idx(2), marginBottom: 0 }}>
              Tu diagnóstico ya está con nosotros. Te escribimos por WhatsApp.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// Modal de entrada: clave, o pedirla por WhatsApp (sin email en ningún paso)
function KeyModal({ onEnter }: { onEnter: (s: { code: string; name: string }) => void }) {
  // El link que manda Julio trae la clave (?clave=XG6VJZ): se completa y entra sola, sin tipear
  const linkCode = new URLSearchParams(window.location.search).get('clave') ?? '';
  const [code, setCode] = useState(linkCode);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => { if (linkCode) tryCode(linkCode); }, []);

  function enter(e: FormEvent) {
    e.preventDefault();
    tryCode(code);
  }

  async function tryCode(value: string) {
    setBusy(true);
    setError('');
    try {
      const res = await fetch('/api/access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: value }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) return onEnter({ code: data.code, name: data.name });
      setError(
        data.error === 'used' ? 'Esa clave ya se usó para un diagnóstico completo.'
        : data.error === 'invalid' ? 'La clave tiene 6 caracteres.'
        : 'No encontramos esa clave. Revisala o pedinos una nueva.');
    } catch {
      setError('No hay conexión. Probá de nuevo en un momento.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="modal-backdrop">
      <form className="modal stagger" role="dialog" aria-labelledby="key-title" onSubmit={enter}>
        <img className="watermark" src="/logos/IsoLogojAComunicacion.png" alt="" />
        <p className="eyebrow" style={idx(0)}>Diagnóstico</p>
        <h1 className="title" id="key-title" style={idx(1)}>¿En qué posición está tu marca?</h1>

        <label className="field" style={idx(2)}>
          <span>Tu clave</span>
          <input
            className="input input-code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            maxLength={8}
            autoComplete="off"
            autoCapitalize="characters"
            spellCheck={false}
            placeholder="······"
          />
        </label>
        {error && <p className="error">{error}</p>}
        <div className="row" style={idx(3)}>
          <button className="btn" type="submit" disabled={busy || code.replace(/[^a-z0-9]/gi, '').length < 6}>
            {busy ? 'Entrando…' : 'Entrar'}
          </button>
        </div>

        <div className="divider" style={idx(4)} />
        <p className="lede" style={{ ...idx(5), marginBottom: '1.2rem' }}>¿Todavía no tenés tu clave? Pedila por WhatsApp.</p>
        <div style={idx(6)}>
          <a className="btn btn-ghost" href={waLink(JA_WHATSAPP, REQUEST_MESSAGE)} target="_blank" rel="noopener">
            Pedir mi clave
          </a>
        </div>
      </form>
    </div>
  );
}
