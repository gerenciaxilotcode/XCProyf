import { useEffect, useState } from 'react'
import { useAuth } from '../../hooks/useAuth.js'
import { useToast } from '../../hooks/useToast.js'
import { getBrand, updateBrand } from '../../services/contentAdminService.js'
import ImageField from '../../components/admin/ImageField.jsx'
import './AdminDashboard.css'
import './AdminContent.css'

const EMPTY_BRAND = { name: '', tagline: '', description: '', logoAsset: null, faviconAsset: null }

function BrandForm() {
  const { showToast } = useToast()
  const [form, setForm] = useState(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => { getBrand().then((data) => setForm(data || EMPTY_BRAND)) }, [])

  async function handleSubmit(event) {
    event.preventDefault()
    setSaving(true)
    try {
      const payload = {
        name: form.name,
        tagline: form.tagline,
        description: form.description,
        logoAssetId: form.logoAsset?.id || null,
        faviconAssetId: form.faviconAsset?.id || null
      }
      const updated = await updateBrand(payload)
      setForm(updated)
      showToast('Marca actualizada.', 'success')
    } catch {
      showToast('No fue posible guardar. Intenta nuevamente.', 'error')
    } finally {
      setSaving(false)
    }
  }

  if (!form) return <div className="skeleton" style={{ height: 300 }} />

  return (
    <form className="admin-content-form" onSubmit={handleSubmit}>
      <div className="admin-content-grid">
        <div className="collection-form-field">
          <label>Nombre</label>
          <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        </div>
        <div className="collection-form-field">
          <label>Tagline</label>
          <input type="text" value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })} required />
        </div>
        <div className="collection-form-field" style={{ gridColumn: '1 / -1' }}>
          <label>Descripción</label>
          <textarea rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
        </div>
      </div>
      <div className="admin-content-grid">
        <ImageField
          label="Logo"
          value={form.logoAsset}
          onChange={(asset) => setForm({ ...form, logoAsset: asset })}
          removeLabel="Restaurar logo predeterminado"
        />
        <ImageField label="Favicon" value={form.faviconAsset} onChange={(asset) => setForm({ ...form, faviconAsset: asset })} />
      </div>
      <p className="admin-page-subtitle" style={{ marginBottom: 0, marginTop: -8 }}>
        El logo se sube y administra desde aquí (se guarda en Cloudinary). Si no subes uno propio, el sitio usa el
        logo predeterminado de XilotCode.
      </p>
      <button type="submit" className="btn-primary" disabled={saving}>{saving ? 'Guardando...' : 'Guardar cambios'}</button>
    </form>
  )
}

function AdminSettings() {
  const { user } = useAuth()

  return (
    <div className="admin-settings">
      <h1 className="admin-page-title">Configuración</h1>
      <p className="admin-page-subtitle">Cuenta administrativa e identidad de marca de XilotCode.</p>

      <div className="kpi-grid">
        <div className="kpi-card">
          <span className="kpi-label">Nombre</span>
          <span className="kpi-value" style={{ fontSize: '1.1rem' }}>{user?.name}</span>
        </div>
        <div className="kpi-card">
          <span className="kpi-label">Correo</span>
          <span className="kpi-value" style={{ fontSize: '1.1rem' }}>{user?.email}</span>
        </div>
      </div>

      <h2 className="admin-page-title" style={{ fontSize: '1.2rem', marginTop: 'var(--space-5)' }}>Marca</h2>
      <p className="admin-page-subtitle">Nombre, tagline, descripción, logo y favicon que se muestran en todo el sitio.</p>

      <BrandForm />
    </div>
  )
}

export default AdminSettings
