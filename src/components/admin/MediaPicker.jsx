import { useEffect, useState } from 'react'
import { X, Check } from 'lucide-react'
import ImageDropzone from './ImageDropzone.jsx'
import { fetchMedia, uploadMedia } from '../../services/mediaService.js'
import { useToast } from '../../hooks/useToast.js'
import './MediaPicker.css'

function MediaPicker({ onSelect, onClose }) {
  const { showToast } = useToast()
  const [assets, setAssets] = useState(null)
  const [uploading, setUploading] = useState(false)

  function load() {
    fetchMedia()
      .then(setAssets)
      .catch(() => setAssets([]))
  }

  useEffect(load, [])

  async function handleUpload(file) {
    setUploading(true)
    try {
      const asset = await uploadMedia(file)
      setAssets((prev) => [asset, ...(prev || [])])
      showToast('Imagen subida correctamente.', 'success')
    } catch {
      showToast('No fue posible subir la imagen. Intenta nuevamente.', 'error')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="media-picker-overlay" onClick={onClose}>
      <div className="media-picker-modal" onClick={(event) => event.stopPropagation()}>
        <div className="media-picker-header">
          <h3>Biblioteca multimedia</h3>
          <button className="media-picker-close" onClick={onClose} aria-label="Cerrar">
            <X size={20} />
          </button>
        </div>

        <ImageDropzone onUpload={handleUpload} uploading={uploading} />

        <div className="media-picker-grid">
          {assets === null && <p className="media-picker-empty">Cargando biblioteca...</p>}
          {assets && assets.length === 0 && (
            <p className="media-picker-empty">Todavía no hay imágenes. Sube la primera arriba.</p>
          )}
          {assets && assets.map((asset) => (
            <button key={asset.id} className="media-picker-item" onClick={() => onSelect(asset)}>
              <img src={asset.secureUrl} alt={asset.altText || ''} loading="lazy" />
              <span className="media-picker-item-overlay">
                <Check size={20} />
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MediaPicker
