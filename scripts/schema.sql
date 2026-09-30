-- Base de clientes de jA Comunicación (Neon). Desde que piden la clave, son clientes.
CREATE TABLE IF NOT EXISTS clients (
  id          serial PRIMARY KEY,
  name        text NOT NULL,
  whatsapp    text NOT NULL,
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- Cada diagnóstico tiene su clave; un cliente puede hacer más de uno con el tiempo
CREATE TABLE IF NOT EXISTS diagnostics (
  id            serial PRIMARY KEY,
  client_id     integer NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  code          text NOT NULL UNIQUE,
  created_at    timestamptz NOT NULL DEFAULT now(),
  started_at    timestamptz,
  completed_at  timestamptz,
  profile       jsonb,
  answers       jsonb,
  report        jsonb
);
