import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import Logo from '../ui/Logo.jsx'
import { buildWhatsAppLink } from '../../lib/whatsapp.js'
import './Navbar.css'

const NAV_LINKS = [
  { to: '/', label: 'Inicio' },
  { to: '/#servicios', label: 'Servicios' },
  { to: '/proyectos', label: 'Trabajos Anteriores' },
  { to: '/#nosotros', label: 'Nosotros' },
  { to: '/contacto', label: 'Contacto' }
]

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 12)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container navbar-inner">
        <Link to="/" className="navbar-brand" onClick={() => setOpen(false)}>
          <Logo size={30} />
        </Link>

        <nav className="navbar-links" aria-label="Navegación principal">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} className="navbar-link">
              {link.label}
            </NavLink>
          ))}
        </nav>

        <a
          href={buildWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary navbar-cta"
        >
          Solicitar proyecto
        </a>

        <button
          className="navbar-toggle"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="navbar-mobile">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} className="navbar-mobile-link" onClick={() => setOpen(false)}>
              {link.label}
            </NavLink>
          ))}
          <a
            href={buildWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            onClick={() => setOpen(false)}
          >
            Solicitar proyecto
          </a>
        </div>
      )}
    </header>
  )
}

export default Navbar
