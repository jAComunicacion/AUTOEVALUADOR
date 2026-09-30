import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import Admin from './Admin.tsx';

// Glow que sigue al cursor (variables leídas por body::before en index.css)
window.addEventListener('pointermove', (e) => {
  document.body.style.setProperty('--mx', `${e.clientX}px`);
  document.body.style.setProperty('--my', `${e.clientY}px`);
});

const isAdmin = window.location.pathname.replace(/\/$/, '') === '/admin';

createRoot(document.getElementById('root')!).render(
  <StrictMode>{isAdmin ? <Admin /> : <App />}</StrictMode>,
);
