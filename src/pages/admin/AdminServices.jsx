import CollectionManager from '../../components/admin/CollectionManager.jsx'
import ImageField from '../../components/admin/ImageField.jsx'
import { serviceService } from '../../services/contentAdminService.js'
import { ICON_KEYS } from '../../lib/icons.js'

const INITIAL_STATE = { key: '', title: '', description: '', iconKey: ICON_KEYS[0], imageAsset: null, active: true }

function toFormState(item) {
  return {
    key: item.key,
    title: item.title,
    description: item.description,
    iconKey: item.iconKey,
    imageAsset: item.imageAsset || null,
    active: item.active
  }
}

function toPayload(formState) {
  return {
    key: formState.key,
    title: formState.title,
    description: formState.description,
    iconKey: formState.iconKey,
    imageAssetId: formState.imageAsset?.id || null,
    active: formState.active
  }
}

function AdminServices() {
  return (
    <CollectionManager
      title="Servicios"
      itemLabel="servicio"
      service={serviceService}
      emptyState="Todavía no hay servicios. Agrega el primero."
      columns={[
        { key: 'title', label: 'Servicio' },
        { key: 'description', label: 'Descripción' }
      ]}
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
            <label htmlFor="title">Título</label>
            <input
              id="title"
              type="text"
              value={formState.title}
              onChange={(e) => setFormState({ ...formState, title: e.target.value })}
              required
            />
          </div>
          <div className="collection-form-field">
            <label htmlFor="description">Descripción</label>
            <textarea
              id="description"
              rows={3}
              value={formState.description}
              onChange={(e) => setFormState({ ...formState, description: e.target.value })}
              required
            />
          </div>
          <div className="collection-form-field">
            <label htmlFor="iconKey">Ícono</label>
            <select
              id="iconKey"
              value={formState.iconKey}
              onChange={(e) => setFormState({ ...formState, iconKey: e.target.value })}
            >
              {ICON_KEYS.map((key) => <option key={key} value={key}>{key}</option>)}
            </select>
          </div>
          <ImageField
            label="Imagen (opcional, reemplaza el ícono)"
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

export default AdminServices
