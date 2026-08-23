import { useEffect, useState } from 'react'
import { fetchContactMessages, updateContactStatus } from '../../services/contactService.js'
import { PROJECT_TYPE_LABELS } from '../../lib/validations.js'
import { useToast } from '../../hooks/useToast.js'
import './AdminMessages.css'

const STATUS_LABELS = {
  NEW: 'Nuevo',
  READ: 'Leído',
  CONTACTED: 'Contactado',
  ARCHIVED: 'Archivado'
}

function AdminMessages() {
  const { showToast } = useToast()
  const [messages, setMessages] = useState(null)
  const [error, setError] = useState(false)

  function loadMessages() {
    setError(false)
    fetchContactMessages()
      .then(setMessages)
      .catch(() => setError(true))
  }

  useEffect(loadMessages, [])

  async function handleStatusChange(id, status) {
    try {
      await updateContactStatus(id, status)
      setMessages((prev) => prev.map((message) => (message.id === id ? { ...message, status } : message)))
      showToast('Estado actualizado.', 'success')
    } catch {
      showToast('No fue posible actualizar el mensaje. Intenta nuevamente.', 'error')
    }
  }

  return (
    <div className="admin-messages">
      <h1 className="admin-page-title">Mensajes de contacto</h1>
      <p className="admin-page-subtitle">Solicitudes enviadas desde el formulario de contacto.</p>

      {error && (
        <div className="admin-empty">
          <p>No fue posible cargar los mensajes.</p>
          <button className="btn-secondary" onClick={loadMessages}>Reintentar</button>
        </div>
      )}

      {!error && messages === null && (
        <div className="messages-table">
          {[1, 2, 3].map((row) => (
            <div key={row} className="skeleton" style={{ height: 56, marginBottom: 10 }} />
          ))}
        </div>
      )}

      {!error && messages && messages.length === 0 && (
        <div className="admin-empty">
          <p>Todavía no hay mensajes de contacto.</p>
        </div>
      )}

      {!error && messages && messages.length > 0 && (
        <div className="messages-table-wrapper">
          <table className="messages-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Contacto</th>
                <th>Proyecto</th>
                <th>Mensaje</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((message) => (
                <tr key={message.id}>
                  <td>
                    <strong>{message.name}</strong>
                    {message.business && <div className="messages-muted">{message.business}</div>}
                  </td>
                  <td>
                    <div>{message.email}</div>
                    {message.phone && <div className="messages-muted">{message.phone}</div>}
                  </td>
                  <td>{PROJECT_TYPE_LABELS[message.projectType] || message.projectType}</td>
                  <td className="messages-message">{message.message}</td>
                  <td>
                    <select
                      value={message.status}
                      onChange={(event) => handleStatusChange(message.id, event.target.value)}
                    >
                      {Object.entries(STATUS_LABELS).map(([value, label]) => (
                        <option key={value} value={value}>{label}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default AdminMessages
