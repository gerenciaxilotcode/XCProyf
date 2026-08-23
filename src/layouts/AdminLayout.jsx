import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { LayoutDashboard, MessageSquare, Settings, LogOut } from 'lucide-react'
import Logo from '../components/ui/Logo.jsx'
import { useAuth } from '../hooks/useAuth.js'
import { useToast } from '../hooks/useToast.js'
import './AdminLayout.css'

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
          <NavLink to="/admin" end className="admin-nav-link">
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>
          <NavLink to="/admin/mensajes" className="admin-nav-link">
            <MessageSquare size={18} />
            Mensajes
          </NavLink>
          <NavLink to="/admin/configuracion" className="admin-nav-link">
            <Settings size={18} />
            Configuración
          </NavLink>
        </nav>

        <button className="admin-logout" onClick={handleLogout}>
          <LogOut size={18} />
          Cerrar sesión
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
