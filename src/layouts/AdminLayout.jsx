import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { LayoutDashboard, FileText, Wrench, Building2, Tag, Image as ImageIcon, MessageSquare, Phone, Settings, LogOut } from 'lucide-react'
import Logo from '../components/ui/Logo.jsx'
import { useAuth } from '../hooks/useAuth.js'
import { useToast } from '../hooks/useToast.js'
import './AdminLayout.css'

const NAV_ITEMS = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/contenido', label: 'Contenido', icon: FileText },
  { to: '/admin/servicios', label: 'Servicios', icon: Wrench },
  { to: '/admin/sectores', label: 'Sectores', icon: Building2 },
  { to: '/admin/ofertas', label: 'Ofertas', icon: Tag },
  { to: '/admin/multimedia', label: 'Multimedia', icon: ImageIcon },
  { to: '/admin/mensajes', label: 'Mensajes', icon: MessageSquare },
  { to: '/admin/contacto', label: 'Contacto', icon: Phone },
  { to: '/admin/configuracion', label: 'Configuración', icon: Settings }
]

function AdminLayout() {
  const { user, logout } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

  async function handleLogout() {
    await logout()
    showToast('Sesión cerrada correctamente.', 'info')
    navigate('/admin/login')
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-brand">
          <Logo size={26} />
        </div>

        <nav className="admin-nav">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className="admin-nav-link">
              <item.icon size={18} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <button className="admin-logout" onClick={handleLogout}>
          <LogOut size={18} />
          <span>Cerrar sesión</span>
        </button>
      </aside>

      <div className="admin-content">
        <header className="admin-header">
          <span>Panel administrativo</span>
          {user && <span className="admin-header-user">{user.name}</span>}
        </header>
        <main className="admin-main">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
