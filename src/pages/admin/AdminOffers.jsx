import CollectionManager from '../../components/admin/CollectionManager.jsx'
import ImageField from '../../components/admin/ImageField.jsx'
import { offerService } from '../../services/contentAdminService.js'

const INITIAL_STATE = {
  title: '', description: '', priceText: '', ctaLabel: '', ctaLink: '',
  imageAsset: null, active: false
}

function toFormState(item) {
  return {
    title: item.title,
    description: item.description,
    priceText: item.priceText || '',
    ctaLabel: item.ctaLabel || '',
    ctaLink: item.ctaLink || '',
    imageAsset: item.imageAsset || null,
    active: item.active
  }
}

function toPayload(formState) {
  return {
    title: formState.title,
    description: formState.description,
    priceText: formState.priceText || null,
    ctaLabel: formState.ctaLabel || null,
    ctaLink: formState.ctaLink || null,
    imageAssetId: formState.imageAsset?.id || null,
    active: formState.active
  }
}

function AdminOffers() {
  return (
    <CollectionManager
      title="Ofertas"
      itemLabel="oferta"
      service={offerService}
      emptyState="No hay ofertas activas. Solo se muestran en la página cuando existe al menos una."
      columns={[
        { key: 'title', label: 'Oferta' },
        { key: 'priceText', label: 'Precio / texto' }
      ]}
      initialFormState={INITIAL_STATE}
      toFormState={toFormState}
      toPayload={toPayload}
      renderFields={({ formState, setFormState }) => (
        <>
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
            <label htmlFor="priceText">Precio o texto destacado (opcional)</label>
            <input
              id="priceText"
              type="text"
              value={formState.priceText}
              onChange={(e) => setFormState({ ...formState, priceText: e.target.value })}
            />
          </div>
          <div className="collection-form-field">
            <label htmlFor="ctaLabel">Texto del botón (opcional)</label>
            <input
              id="ctaLabel"
              type="text"
              value={formState.ctaLabel}
              onChange={(e) => setFormState({ ...formState, ctaLabel: e.target.value })}
              placeholder="Más información"
            />
          </div>
          <div className="collection-form-field">
            <label htmlFor="ctaLink">Enlace del botón (opcional, si no se define usa WhatsApp)</label>
            <input
              id="ctaLink"
              type="url"
              value={formState.ctaLink}
              onChange={(e) => setFormState({ ...formState, ctaLink: e.target.value })}
              placeholder="https://..."
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
            <label htmlFor="active">Publicada en la página</label>
          </div>
        </>
      )}
    />
  )
}

export default AdminOffers
