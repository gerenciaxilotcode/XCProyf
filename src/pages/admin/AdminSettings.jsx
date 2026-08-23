import { useAuth } from '../../hooks/useAuth.js'
import './AdminDashboard.css'

function AdminSettings() {
  const { user } = useAuth()

  return (
    <div className="admin-settings">
      <h1 className="admin-page-title">Configuración</h1>
      <p className="admin-page-subtitle">Información de tu cuenta administrativa.</p>

      <div className="kpi-card" style={{ maxWidth: 360 }}>
        <span className="kpi-label">Nombre</span>
        <span className="kpi-value" style={{ fontSize: '1.1rem' }}>{user?.name}</span>
      </div>

      <div className="kpi-card" style={{ maxWidth: 360, marginTop: 16 }}>
        <span className="kpi-label">Correo</span>
        <span className="kpi-value" style={{ fontSize: '1.1rem' }}>{user?.email}</span>
      </div>
    </div>
  )
}

export default AdminSettings
