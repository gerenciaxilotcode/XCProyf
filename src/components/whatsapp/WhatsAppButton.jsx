import { useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { buildWhatsAppLink } from '../../lib/whatsapp.js'
import { useSiteContent } from '../../hooks/useSiteContent.js'
import './WhatsAppButton.css'

function WhatsAppButton() {
  const { contact } = useSiteContent()
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href={buildWhatsAppLink(contact.whatsappMessage, contact.whatsappNumber)}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-fab"
      aria-label="Habla con XilotCode por WhatsApp"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered && <span className="whatsapp-tooltip">¿Hablamos de tu proyecto?</span>}
      <MessageCircle size={26} strokeWidth={2} />
    </a>
  )
}

export default WhatsAppButton
