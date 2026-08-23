import { useEffect, useState } from 'react'
import { Trash2 } from 'lucide-react'
import ImageDropzone from '../../components/admin/ImageDropzone.jsx'
import ConfirmDialog from '../../components/admin/ConfirmDialog.jsx'
import { fetchMedia, uploadMedia, deleteMedia } from '../../services/mediaService.js'
import { useToast } from '../../hooks/useToast.js'
import './AdminMedia.css'

function AdminMedia() {
  const { showToast } = useToast()
  const [assets, setAssets] = useState(null)
  const [error, setError] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [pendingDelete, setPendingDelete] = useState(null)

  function load() {
    setError(false)
    fetchMedia().then(setAssets).catch(() => setError(true))
  }

  useEffect(load, [])

  async function handleUpload(file) {
    setUploading(true)
    try {
      const asset = await uploadMedia(file)
      setAssets((prev) => [asset, ...(prev || [])])
      showToast('Imagen subida correctamente.', 'success')
    } catch {
      showToast('No fue posible subir la imagen. Verifica el formato y el tamaño.', 'error')
    } finally {
      setUploading(false)
    }
  }

  async function handleDelete() {
    if (!pendingDelete) return
    try {
      await deleteMedia(pendingDelete.id)
      setAssets((prev) => prev.filter((asset) => asset.id !== pendingDelete.id))
      showToast('Imagen eliminada.', 'success')
    } catch (err) {
      const message = err.response?.data?.message || 'No fue posible eliminar la imagen.'
      showToast(message, 'error')
    } finally {
      setPendingDelete(null)
    }
  }

  return (
    <div className="admin-media">
      <h1 className="admin-page-title">Multimedia</h1>
      <p className="admin-page-subtitle">Imágenes disponibles para usar en el sitio (Cloudinary).</p>

      <div className="admin-media-upload">
        <ImageDropzone onUpload={handleUpload} uploading={uploading} />
      </div>

      {error && (
        <div className="admin-empty">
          <p>No fue posible cargar la biblioteca.</p>
          <button className="btn-secondary" onClick={load}>Reintentar</button>
        </div>
      )}

      {!error && assets === null && <div className="skeleton" style={{ height: 200 }} />}

      {!error && assets && assets.length === 0 && (
        <div className="admin-empty"><p>Todavía no hay imágenes.</p></div>
      )}

      {!error && assets && assets.length > 0 && (
        <div className="admin-media-grid">
          {assets.map((asset) => (
            <div key={asset.id} className="admin-media-item">
              <img src={asset.secureUrl} alt={asset.altText || ''} loading="lazy" />
              <button
                className="admin-media-delete"
                onClick={() => setPendingDelete(asset)}
                aria-label="Eliminar imagen"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      {pendingDelete && (
        <ConfirmDialog
          title="Eliminar imagen"
          message="Si esta imagen se está usando en alguna sección de la página, no se podrá eliminar hasta que se quite de ahí primero."
          onConfirm={handleDelete}
          onCancel={() => setPendingDelete(null)}
        />
      )}
    </div>
  )
}

export default AdminMedia
