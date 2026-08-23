import { Link } from 'react-router-dom'
import Logo from '../ui/Logo.jsx'
import { buildWhatsAppLink } from '../../lib/whatsapp.js'
import './Footer.css'

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <Logo size={28} />
          <p className="footer-tagline">Automatiza. Optimiza. Crece.</p>
        </div>

        <nav className="footer-links" aria-label="Enlaces del sitio">
          <Link to="/">Inicio</Link>
          <Link to="/#servicios">Servicios</Link>
          <Link to="/proyectos">Proyectos</Link>
          <Link to="/contacto">Contacto</Link>
        </nav>

        <div className="footer-contact">
          <a href={buildWhatsAppLink()} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
        </div>
      </div>

      <div className="container">
        <p className="footer-copy">© {year} XilotCode. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}

export default Footer
