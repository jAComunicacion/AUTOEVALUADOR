// Datos de contacto y textos que Julio puede ajustar sin tocar las pantallas
export const JA_WHATSAPP = '5493442319480';

// Mensaje precargado cuando alguien pide su clave
export const REQUEST_MESSAGE = 'Hola, quiero hacer el diagnóstico de mi empresa. Mi nombre es ';

export const waLink = (phone: string, text: string) =>
  `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;

