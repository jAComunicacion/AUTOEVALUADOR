// Datos de contacto y textos que Julio puede ajustar sin tocar las pantallas
export const JA_WHATSAPP = '5493442319480';
export const SITE_URL = 'diagnostico.jacomunicacion.com.ar';

// Mensaje precargado cuando alguien pide su clave
export const REQUEST_MESSAGE = 'Hola, quiero hacer el diagnóstico de mi empresa. Mi nombre es ';

// Mensaje precargado cuando Julio le manda la clave a un cliente
export const keyMessage = (name: string, code: string) =>
  `Hola ${name}, tu clave para el diagnóstico de jA Comunicación es ${formatCode(code)}. Entrá en ${SITE_URL}`;

export const waLink = (phone: string, text: string) =>
  `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;

// "K7M4PQ" -> "K7M 4PQ", más fácil de leer y dictar
export const formatCode = (code: string) => `${code.slice(0, 3)} ${code.slice(3)}`;

// Número argentino tal como lo escribe Julio ("3442 319480") -> formato de wa.me ("5493442319480")
export function toWaPhone(raw: string): string {
  const digits = raw.replace(/[^0-9]/g, '');
  if (digits.startsWith('54')) return digits;
  return `549${digits.replace(/^0/, '')}`;
}
