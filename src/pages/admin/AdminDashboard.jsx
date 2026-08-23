import { useEffect, useState } from 'react'
import { MessageSquare, Inbox, Rocket } from 'lucide-react'
import { fetchContactMessages } from '../../services/contactService.js'
import { useAuth } from '../../hooks/useAuth.js'
import './AdminDashboard.css'

function AdminDashboard() {
  const { user } = useAuth()
  const [messages, setMessages] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetchContactMessages()
      .then(setMessages)
      .catch(() => setError(true))
  }, [])

  const total = messages?.length ?? null
  const newCount = messages?.filter((message) => message.status === 'NEW').length ?? null

  return (
    <div className="admin-dashboard">
      <h1 className="admin-page-title">Hola, {user?.name?.split(' ')[0] || 'administrador'}</h1>
      <p className="admin-page-subtitle">Este es el estado actual de XilotCode.</p>

      <div className="kpi-grid">
        <div className="kpi-card">
          <Inbox size={20} />
          <span className="kpi-value">{error ? '—' : total ?? '...'}</span>
          <span className="kpi-label">Mensajes recibidos</span>
        </div>
        <div className="kpi-card">
          <MessageSquare size={20} />
          <span className="kpi-value">{error ? '—' : newCount ?? '...'}</span>
          <span className="kpi-label">Mensajes nuevos</span>
        </div>
      </div>

      <div className="admin-notice">
        <Rocket size={18} />
        <p>
          El módulo de proyectos (Trabajos Anteriores) y la subida de imágenes a Cloudinary
          se habilitarán en la siguiente fase del panel.
        </p>
      </div>
    </div>
  )
}

export default AdminDashboard
