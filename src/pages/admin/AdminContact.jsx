import { useEffect, useState } from 'react'
import { getContactInfo, updateContactInfo } from '../../services/contentAdminService.js'
import { useToast } from '../../hooks/useToast.js'
import './AdminContent.css'

const EMPTY = {
  phone: '', email: '', whatsappNumber: '', whatsappMessage: '',
  address: '', schedule: '', instagramUrl: '', facebookUrl: '', linkedinUrl: ''
}

function AdminContact() {
  const { showToast } = useToast()
  const [form, setForm] = useState(EMPTY)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    getContactInfo()
      .then((data) => {
        if (data) {
          setForm({
            phone: data.phone || '', email: data.email || '', whatsappNumber: data.whatsappNumber || '',
            whatsappMessage: data.whatsappMessage || '', address: data.address || '', schedule: data.schedule || '',
            instagramUrl: data.instagramUrl || '', facebookUrl: data.facebookUrl || '', linkedinUrl: data.linkedinUrl || ''
          })
        }
      })
      .finally(() => setLoading(false))
  }, [])

  async function handleSubmit(event) {
    event.preventDefault()
    setSaving(true)
    try {
      await updateContactInfo(form)
      showToast('Información de contacto guardada.', 'success')
    } catch {
      showToast('No fue posible guardar. Intenta nuevamente.', 'error')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="skeleton" style={{ height: 300 }} />
  }

  return (
    <div className="admin-content-page">
      <h1 className="admin-page-title">Contacto</h1>
      <p className="admin-page-subtitle">Información de contacto que se muestra en la página.</p>

      <form className="admin-content-form" onSubmit={handleSubmit}>
        <div className="admin-content-grid">
          <div className="collection-form-field">
            <label htmlFor="whatsappNumber">Número de WhatsApp</label>
            <input
              id="whatsappNumber"
              type="text"
              value={form.whatsappNumber}
              onChange={(e) => setForm({ ...form, whatsappNumber: e.target.value })}
              placeholder="524421319153"
              required
            />
          </div>
          <div className="collection-form-field">
            <label htmlFor="whatsappMessage">Mensaje inicial de WhatsApp</label>
            <input
              id="whatsappMessage"
              type="text"
              value={form.whatsappMessage}
              onChange={(e) => setForm({ ...form, whatsappMessage: e.target.value })}
            />
          </div>
          <div className="collection-form-field">
            <label htmlFor="phone">Teléfono (opcional)</label>
            <input id="phone" type="text" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </div>
          <div className="collection-form-field">
            <label htmlFor="email">Correo (opcional)</label>
            <input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div className="collection-form-field">
            <label htmlFor="address">Dirección (opcional)</label>
            <input id="address" type="text" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
          </div>
          <div className="collection-form-field">
            <label htmlFor="schedule">Horario de atención (opcional)</label>
            <input id="schedule" type="text" value={form.schedule} onChange={(e) => setForm({ ...form, schedule: e.target.value })} />
          </div>
          <div className="collection-form-field">
            <label htmlFor="instagramUrl">Instagram (opcional)</label>
            <input id="instagramUrl" type="url" value={form.instagramUrl} onChange={(e) => setForm({ ...form, instagramUrl: e.target.value })} />
          </div>
          <div className="collection-form-field">
            <label htmlFor="facebookUrl">Facebook (opcional)</label>
            <input id="facebookUrl" type="url" value={form.facebookUrl} onChange={(e) => setForm({ ...form, facebookUrl: e.target.value })} />
          </div>
          <div className="collection-form-field">
            <label htmlFor="linkedinUrl">LinkedIn (opcional)</label>
            <input id="linkedinUrl" type="url" value={form.linkedinUrl} onChange={(e) => setForm({ ...form, linkedinUrl: e.target.value })} />
          </div>
        </div>

        <button type="submit" className="btn-primary" disabled={saving}>
          {saving ? 'Guardando...' : 'Guardar cambios'}
        </button>
      </form>
    </div>
  )
}

export default AdminContact
