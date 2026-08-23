import { useEffect, useState } from 'react'
import CollectionManager from '../../components/admin/CollectionManager.jsx'
import ImageField from '../../components/admin/ImageField.jsx'
import { getHero, updateHero, getCta, updateCta, getBrand, updateBrand, processStepService, differentiatorService } from '../../services/contentAdminService.js'
import { useToast } from '../../hooks/useToast.js'
import { ICON_KEYS } from '../../lib/icons.js'
import './AdminContent.css'

const TABS = [
  { key: 'hero', label: 'Inicio' },
  { key: 'process', label: 'Cómo trabajamos' },
  { key: 'differentiators', label: 'Diferenciadores' },
  { key: 'cta', label: 'CTA' },
  { key: 'brand', label: 'Marca' }
]

function HeroTab() {
  const { showToast } = useToast()
  const [form, setForm] = useState(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => { getHero().then(setForm) }, [])

  async function handleSubmit(event) {
    event.preventDefault()
    setSaving(true)
    try {
      const payload = { ...form, imageAssetId: form.imageAsset?.id || null }
      delete payload.imageAsset
      delete payload.id
      delete payload.updatedAt
      const updated = await updateHero(payload)
      setForm(updated)
      showToast('Inicio actualizado.', 'success')
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
          <label>Texto superior (eyebrow)</label>
          <input type="text" value={form.eyebrow} onChange={(e) => setForm({ ...form, eyebrow: e.target.value })} required />
        </div>
        <div className="collection-form-field">
          <label>Título principal</label>
          <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        </div>
        <div className="collection-form-field" style={{ gridColumn: '1 / -1' }}>
          <label>Subtítulo</label>
          <textarea rows={2} value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} required />
        </div>
        <div className="collection-form-field">
          <label>Texto botón principal (WhatsApp)</label>
          <input type="text" value={form.ctaPrimaryLabel} onChange={(e) => setForm({ ...form, ctaPrimaryLabel: e.target.value })} required />
        </div>
        <div className="collection-form-field">
          <label>Texto botón secundario</label>
          <input type="text" value={form.ctaSecondaryLabel} onChange={(e) => setForm({ ...form, ctaSecondaryLabel: e.target.value })} required />
        </div>
        <div className="collection-form-field">
          <label>Frase de marca (tagline)</label>
          <input type="text" value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })} required />
        </div>
      </div>
      <ImageField label="Imagen del Hero (opcional)" value={form.imageAsset} onChange={(asset) => setForm({ ...form, imageAsset: asset })} />
      <button type="submit" className="btn-primary" disabled={saving}>{saving ? 'Guardando...' : 'Guardar cambios'}</button>
    </form>
  )
}

function CtaTab() {
  const { showToast } = useToast()
  const [form, setForm] = useState(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => { getCta().then(setForm) }, [])

  async function handleSubmit(event) {
    event.preventDefault()
    setSaving(true)
    try {
      const updated = await updateCta({ title: form.title, description: form.description, buttonLabel: form.buttonLabel })
      setForm(updated)
      showToast('CTA actualizado.', 'success')
    } catch {
      showToast('No fue posible guardar. Intenta nuevamente.', 'error')
    } finally {
      setSaving(false)
    }
  }

  if (!form) return <div className="skeleton" style={{ height: 200 }} />

  return (
    <form className="admin-content-form" onSubmit={handleSubmit}>
      <div className="collection-form-field">
        <label>Título</label>
        <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
      </div>
      <div className="collection-form-field">
        <label>Descripción</label>
        <textarea rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
      </div>
      <div className="collection-form-field">
        <label>Texto del botón</label>
        <input type="text" value={form.buttonLabel} onChange={(e) => setForm({ ...form, buttonLabel: e.target.value })} required />
      </div>
      <button type="submit" className="btn-primary" disabled={saving}>{saving ? 'Guardando...' : 'Guardar cambios'}</button>
    </form>
  )
}

function BrandTab() {
  const { showToast } = useToast()
  const [form, setForm] = useState(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => { getBrand().then(setForm) }, [])

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
        <ImageField label="Logo" value={form.logoAsset} onChange={(asset) => setForm({ ...form, logoAsset: asset })} />
        <ImageField label="Favicon" value={form.faviconAsset} onChange={(asset) => setForm({ ...form, faviconAsset: asset })} />
      </div>
      <button type="submit" className="btn-primary" disabled={saving}>{saving ? 'Guardando...' : 'Guardar cambios'}</button>
    </form>
  )
}

function ProcessTab() {
  return (
    <CollectionManager
      title=""
      itemLabel="paso"
      service={processStepService}
      emptyState="Todavía no hay pasos. Agrega el primero."
      columns={[{ key: 'title', label: 'Paso' }, { key: 'description', label: 'Descripción' }]}
      initialFormState={{ key: '', title: '', description: '', active: true }}
      toFormState={(item) => ({ key: item.key, title: item.title, description: item.description, active: item.active })}
      toPayload={(f) => f}
      renderFields={({ formState, setFormState }) => (
        <>
          <div className="collection-form-field">
            <label>Clave (única)</label>
            <input type="text" value={formState.key} onChange={(e) => setFormState({ ...formState, key: e.target.value })} required />
          </div>
          <div className="collection-form-field">
            <label>Título</label>
            <input type="text" value={formState.title} onChange={(e) => setFormState({ ...formState, title: e.target.value })} required />
          </div>
          <div className="collection-form-field">
            <label>Descripción</label>
            <textarea rows={2} value={formState.description} onChange={(e) => setFormState({ ...formState, description: e.target.value })} required />
          </div>
          <div className="collection-form-checkbox">
            <input id="pactive" type="checkbox" checked={formState.active} onChange={(e) => setFormState({ ...formState, active: e.target.checked })} />
            <label htmlFor="pactive">Publicado en la página</label>
          </div>
        </>
      )}
    />
  )
}

function DifferentiatorsTab() {
  return (
    <CollectionManager
      title=""
      itemLabel="diferenciador"
      service={differentiatorService}
      emptyState="Todavía no hay diferenciadores. Agrega el primero."
      columns={[{ key: 'title', label: 'Diferenciador' }, { key: 'description', label: 'Descripción' }]}
      initialFormState={{ key: '', title: '', description: '', iconKey: ICON_KEYS[0], imageAsset: null, active: true }}
      toFormState={(item) => ({ key: item.key, title: item.title, description: item.description, iconKey: item.iconKey, imageAsset: item.imageAsset || null, active: item.active })}
      toPayload={(f) => ({ key: f.key, title: f.title, description: f.description, iconKey: f.iconKey, imageAssetId: f.imageAsset?.id || null, active: f.active })}
      renderFields={({ formState, setFormState }) => (
        <>
          <div className="collection-form-field">
            <label>Clave (única)</label>
            <input type="text" value={formState.key} onChange={(e) => setFormState({ ...formState, key: e.target.value })} required />
          </div>
          <div className="collection-form-field">
            <label>Título</label>
            <input type="text" value={formState.title} onChange={(e) => setFormState({ ...formState, title: e.target.value })} required />
          </div>
          <div className="collection-form-field">
            <label>Descripción</label>
            <textarea rows={2} value={formState.description} onChange={(e) => setFormState({ ...formState, description: e.target.value })} required />
          </div>
          <div className="collection-form-field">
            <label>Ícono</label>
            <select value={formState.iconKey} onChange={(e) => setFormState({ ...formState, iconKey: e.target.value })}>
              {ICON_KEYS.map((key) => <option key={key} value={key}>{key}</option>)}
            </select>
          </div>
          <ImageField label="Imagen (opcional)" value={formState.imageAsset} onChange={(asset) => setFormState({ ...formState, imageAsset: asset })} />
          <div className="collection-form-checkbox">
            <input id="dactive" type="checkbox" checked={formState.active} onChange={(e) => setFormState({ ...formState, active: e.target.checked })} />
            <label htmlFor="dactive">Publicado en la página</label>
          </div>
        </>
      )}
    />
  )
}

function AdminContent() {
  const [activeTab, setActiveTab] = useState('hero')

  return (
    <div className="admin-content-page">
      <h1 className="admin-page-title">Contenido</h1>
      <p className="admin-page-subtitle">Edita el contenido que se muestra en la página de inicio.</p>

      <div className="admin-tabs">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            className={`admin-tab ${activeTab === tab.key ? 'admin-tab-active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="admin-tab-panel">
        {activeTab === 'hero' && <HeroTab />}
        {activeTab === 'process' && <ProcessTab />}
        {activeTab === 'differentiators' && <DifferentiatorsTab />}
        {activeTab === 'cta' && <CtaTab />}
        {activeTab === 'brand' && <BrandTab />}
      </div>
    </div>
  )
}

export default AdminContent
