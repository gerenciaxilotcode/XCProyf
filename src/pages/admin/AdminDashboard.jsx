import { useEffect, useState } from 'react'
import { MessageSquare, Inbox, LayoutGrid, Image as ImageIcon } from 'lucide-react'
import { fetchContactMessages } from '../../services/contactService.js'
import { fetchMedia } from '../../services/mediaService.js'
import { serviceService, sectorService } from '../../services/contentAdminService.js'
import { useAuth } from '../../hooks/useAuth.js'
import './AdminDashboard.css'

function AdminDashboard() {
  const { user } = useAuth()
  const [messages, setMessages] = useState(null)
  const [services, setServices] = useState(null)
  const [sectors, setSectors] = useState(null)
  const [media, setMedia] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    Promise.all([fetchContactMessages(), serviceService.list(), sectorService.list(), fetchMedia()])
      .then(([m, s, sec, med]) => {
        setMessages(m)
        setServices(s)
        setSectors(sec)
        setMedia(med)
      })
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
        <div className="kpi-card">
          <LayoutGrid size={20} />
          <span className="kpi-value">{error ? '—' : services?.length ?? '...'}</span>
          <span className="kpi-label">Servicios publicados</span>
        </div>
        <div className="kpi-card">
          <LayoutGrid size={20} />
          <span className="kpi-value">{error ? '—' : sectors?.length ?? '...'}</span>
          <span className="kpi-label">Sectores</span>
        </div>
        <div className="kpi-card">
          <ImageIcon size={20} />
          <span className="kpi-value">{error ? '—' : media?.length ?? '...'}</span>
          <span className="kpi-label">Imágenes en biblioteca</span>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
