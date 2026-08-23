import CollectionManager from '../../components/admin/CollectionManager.jsx'
import ImageField from '../../components/admin/ImageField.jsx'
import { sectorService } from '../../services/contentAdminService.js'

const INITIAL_STATE = { key: '', name: '', description: '', imageAsset: null, active: true }

function toFormState(item) {
  return {
    key: item.key,
    name: item.name,
    description: item.description || '',
    imageAsset: item.imageAsset || null,
    active: item.active
  }
}

function toPayload(formState) {
  return {
    key: formState.key,
    name: formState.name,
    description: formState.description || null,
    imageAssetId: formState.imageAsset?.id || null,
    active: formState.active
  }
}

function AdminSectors() {
  return (
    <CollectionManager
      title="Sectores"
      itemLabel="sector"
      service={sectorService}
      emptyState="Todavía no hay sectores. Agrega el primero."
      columns={[{ key: 'name', label: 'Sector' }]}
      initialFormState={INITIAL_STATE}
      toFormState={toFormState}
      toPayload={toPayload}
      renderFields={({ formState, setFormState }) => (
        <>
          <div className="collection-form-field">
            <label htmlFor="key">Clave (única, sin espacios)</label>
            <input
              id="key"
              type="text"
              value={formState.key}
              onChange={(e) => setFormState({ ...formState, key: e.target.value })}
              required
            />
          </div>
          <div className="collection-form-field">
            <label htmlFor="name">Nombre</label>
            <input
              id="name"
              type="text"
              value={formState.name}
              onChange={(e) => setFormState({ ...formState, name: e.target.value })}
              required
            />
          </div>
          <div className="collection-form-field">
            <label htmlFor="description">Descripción (opcional)</label>
            <textarea
              id="description"
              rows={2}
              value={formState.description}
              onChange={(e) => setFormState({ ...formState, description: e.target.value })}
            />
          </div>
          <ImageField
            label="Imagen (opcional)"
            value={formState.imageAsset}
            onChange={(asset) => setFormState({ ...formState, imageAsset: asset })}
          />
          <div className="collection-form-checkbox">
            <input
              id="active"
              type="checkbox"
              checked={formState.active}
              onChange={(e) => setFormState({ ...formState, active: e.target.checked })}
            />
            <label htmlFor="active">Publicado en la página</label>
          </div>
        </>
      )}
    />
  )
}

export default AdminSectors
