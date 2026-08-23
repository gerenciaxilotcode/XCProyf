const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '524421319153'

export function buildWhatsAppLink(message = 'Hola, me llamo ') {
  const encoded = encodeURIComponent(message)
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`
}
