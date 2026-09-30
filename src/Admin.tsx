import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { PROFILE_QUESTIONS } from './data/questions';
import { formatCode, keyMessage, toWaPhone, waLink } from './config';

// Página de Julio: alta de clientes (nombre + WhatsApp -> clave) y resultados recibidos.
// La vista de resultados es provisoria: el entregable final se diseña con los primeros casos reales.

interface Row {
  client_id: number;
  name: string;
  whatsapp: string;
  created_at: string;
  code: string | null;
  started_at: string | null;
  completed_at: string | null;
  profile: Record<string, string> | null;
  report: { market_position: string; scores: Record<string, number> } | null;
}

const ADMIN_KEY_STORE = 'ja-admin-key';
const date = (iso: string) => new Date(iso).toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: '2-digit' });

export default function Admin() {
  const [adminKey, setAdminKey] = useState(() => sessionStorage.getItem(ADMIN_KEY_STORE) || '');
  const [rows, setRows] = useState<Row[] | null>(null);
  const [authError, setAuthError] = useState(false);

  const loadRows = useCallback(async (key: string) => {
    const res = await fetch('/api/admin', { headers: { 'x-admin-key': key } });
    if (res.status === 401) { setAuthError(true); setRows(null); sessionStorage.removeItem(ADMIN_KEY_STORE); return; }
    setAuthError(false);
    sessionStorage.setItem(ADMIN_KEY_STORE, key);
    setRows((await res.json()).rows);
  }, []);

  useEffect(() => { if (adminKey) loadRows(adminKey); }, []);

  if (!rows) {
    return (
      <div className="shell admin">
        <header className="topbar"><img src="/logos/ja-logotipo.jpg" alt="jA Comunicación" /></header>
        <main className="stage">
          <form className="stagger" style={{ maxWidth: 420 }} onSubmit={(e) => { e.preventDefault(); loadRows(adminKey); }}>
            <p className="eyebrow">Administración</p>
            <h1 className="title">Clientes y diagnósticos</h1>
            <label className="field">
              <span>Clave de administración</span>
              <input className="input" type="password" value={adminKey} onChange={(e) => setAdminKey(e.target.value)} autoFocus />
            </label>
            {authError && <p className="error">Clave incorrecta.</p>}
            <button className="btn" type="submit" disabled={!adminKey}>Entrar</button>
          </form>
        </main>
      </div>
    );
  }

  return (
    <div className="shell admin">
      <header className="topbar">
        <img src="/logos/ja-logotipo.jpg" alt="jA Comunicación" />
        <button className="link" onClick={() => { sessionStorage.removeItem(ADMIN_KEY_STORE); setRows(null); setAdminKey(''); }}>Salir</button>
      </header>
      <main className="stage">
        <p className="eyebrow">Administración</p>
        <h1 className="title">Clientes y diagnósticos</h1>
        <div className="admin-grid">
          <NewClient adminKey={adminKey} onCreated={() => loadRows(adminKey)} />
          <ClientList rows={rows} />
        </div>
      </main>
    </div>
  );
}

function NewClient({ adminKey, onCreated }: { adminKey: string; onCreated: () => void }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [created, setCreated] = useState<{ name: string; whatsapp: string; code: string } | null>(null);
  const [error, setError] = useState('');

  async function create(e: FormEvent) {
    e.preventDefault();
    setError('');
    const res = await fetch('/api/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-key': adminKey },
      body: JSON.stringify({ name, whatsapp: toWaPhone(phone) }),
    });
    if (!res.ok) { setError('Revisá el nombre y el número.'); return; }
    setCreated(await res.json());
    setName(''); setPhone('');
    onCreated();
  }

  return (
    <section className="panel">
      <h2>Nueva clave</h2>
      <form onSubmit={create}>
        <label className="field">
          <span>Nombre</span>
          <input className="input" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label className="field">
          <span>WhatsApp (con característica, ej. 3442 319480)</span>
          <input className="input" inputMode="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </label>
        {error && <p className="error">{error}</p>}
        <button className="btn" type="submit" disabled={!name.trim() || phone.replace(/\D/g, '').length < 8}>Generar clave</button>
      </form>

      {created && (
        <div className="stagger" style={{ marginTop: '1.8rem' }}>
          <p className="client-sub">Clave para {created.name}</p>
          <p className="code-big">{formatCode(created.code)}</p>
          <a className="btn btn-ghost" href={waLink(created.whatsapp, keyMessage(created.name, created.code))} target="_blank" rel="noopener">
            Mandarla por WhatsApp
          </a>
        </div>
      )}
    </section>
  );
}

function ClientList({ rows }: { rows: Row[] }) {
  const [open, setOpen] = useState<string | null>(null);
  if (rows.length === 0) return <section className="list"><h2>Todavía no hay clientes cargados.</h2></section>;

  return (
    <section className="list">
      <h2>{new Set(rows.map(r => r.client_id)).size} clientes</h2>
      {rows.map((r) => {
        const rowKey = `${r.client_id}-${r.code}`;
        const status = r.completed_at ? `Completo · ${date(r.completed_at)}`
          : r.started_at ? `Empezó · ${date(r.started_at)}` : 'Clave sin usar';
        return (
          <article className="client" key={rowKey}>
            <div className="client-head">
              <div>
                <p className="client-name">{r.name}</p>
                <p className="client-sub">
                  <a className="link" href={`https://wa.me/${r.whatsapp}`} target="_blank" rel="noopener">+{r.whatsapp}</a>
                  {r.code && <> · clave {formatCode(r.code)}</>}
                </p>
              </div>
              <span className={`status${r.completed_at ? ' done' : r.started_at ? ' started' : ''}`}>{status}</span>
            </div>

            {r.report && (
              <>
                <div className="scores">
                  <div><span>Posición</span><br /><b>{r.report.market_position}</b></div>
                  <div><span>Marca</span><br /><b>{Math.round(r.report.scores.marca)}%</b></div>
                  <div><span>Mercado</span><br /><b>{Math.round(r.report.scores.mercado)}%</b></div>
                  <div><span>Operación</span><br /><b>{Math.round(r.report.scores.operacion)}%</b></div>
                  <div><span>Comunicación</span><br /><b>{Math.round(r.report.scores.comunicacion)}%</b></div>
                </div>
                <button className="link" style={{ marginTop: '.8rem' }} onClick={() => setOpen(open === rowKey ? null : rowKey)}>
                  {open === rowKey ? 'Ocultar perfil' : 'Ver perfil de la empresa'}
                </button>
                {open === rowKey && r.profile && (
                  <div className="scores">
                    {PROFILE_QUESTIONS.map(q => (
                      <div key={q.id}><span>{q.text.replace(/^\d+\.\s*/, '')}</span><br /><b>{r.profile![q.id]}</b></div>
                    ))}
                  </div>
                )}
              </>
            )}
          </article>
        );
      })}
    </section>
  );
}
