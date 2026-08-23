import { Link } from 'react-router-dom'
import Logo from '../ui/Logo.jsx'
import { buildWhatsAppLink } from '../../lib/whatsapp.js'
import { useSiteContent } from '../../hooks/useSiteContent.js'
import './Footer.css'

function Footer() {
  const { brand, contact } = useSiteContent()
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <Logo size={28} src={brand.logoAsset?.secureUrl} />
          <p className="footer-tagline">{brand.tagline}</p>
        </div>

        <nav className="footer-links" aria-label="Enlaces del sitio">
          <Link to="/">Inicio</Link>
          <Link to="/#servicios">Servicios</Link>
          <Link to="/portafolio">Portafolio</Link>
          <Link to="/contacto">Contacto</Link>
        </nav>

        <div className="footer-contact">
          <a href={buildWhatsAppLink(contact.whatsappMessage, contact.whatsappNumber)} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
          {contact.email && <a href={`mailto:${contact.email}`}>{contact.email}</a>}
        </div>
      </div>

      <div className="container">
        <p className="footer-copy">© {year} {brand.name}. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}

export default Footer
