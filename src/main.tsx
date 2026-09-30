import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

// Glow que sigue al cursor (variables leídas por body::before en index.css)
window.addEventListener('pointermove', (e) => {
  document.body.style.setProperty('--mx', `${e.clientX}px`);
  document.body.style.setProperty('--my', `${e.clientY}px`);
});

// La administración vive en panel.jacomunicacion.com.ar (clientes, claves y resultados)
createRoot(document.getElementById('root')!).render(
  <StrictMode><App /></StrictMode>,
);
