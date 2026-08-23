const DEFAULT_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '524421319153'

export function buildWhatsAppLink(message = 'Hola, me llamo ', number = DEFAULT_NUMBER) {
  const encoded = encodeURIComponent(message)
  return `https://wa.me/${number || DEFAULT_NUMBER}?text=${encoded}`
}
