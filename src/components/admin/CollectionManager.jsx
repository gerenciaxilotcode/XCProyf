import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2, ArrowUp, ArrowDown, X } from 'lucide-react'
import { useToast } from '../../hooks/useToast.js'
import ConfirmDialog from './ConfirmDialog.jsx'
import './CollectionManager.css'

function CollectionManager({
  title,
  itemLabel,
  service,
  columns,
  initialFormState,
  toFormState,
  toPayload,
  renderFields,
  emptyState = 'Todavía no hay elementos.'
}) {
  const { showToast } = useToast()
  const [items, setItems] = useState(null)
  const [error, setError] = useState(false)
  const [formOpen, setFormOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formState, setFormState] = useState(initialFormState)
  const [saving, setSaving] = useState(false)
  const [pendingDelete, setPendingDelete] = useState(null)

  function load() {
    setError(false)
    service.list().then(setItems).catch(() => setError(true))
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function openCreate() {
    setEditingId(null)
    setFormState(initialFormState)
    setFormOpen(true)
  }

  function openEdit(item) {
    setEditingId(item.id)
    setFormState(toFormState(item))
    setFormOpen(true)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setSaving(true)
    try {
      const payload = toPayload(formState)
      if (editingId) {
        await service.update(editingId, payload)
      } else {
        await service.create(payload)
      }
      showToast('Guardado correctamente.', 'success')
      setFormOpen(false)
      load()
    } catch (err) {
      const message = err.response?.data?.message || 'No fue posible guardar. Intenta nuevamente.'
      showToast(message, 'error')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!pendingDelete) return
    try {
      await service.remove(pendingDelete.id)
      showToast('Elemento eliminado.', 'success')
      setPendingDelete(null)
      load()
    } catch {
      showToast('No fue posible eliminar. Intenta nuevamente.', 'error')
    }
  }

  async function handleToggleActive(item) {
    try {
      await service.update(item.id, { active: !item.active })
      setItems((prev) => prev.map((row) => (row.id === item.id ? { ...row, active: !item.active } : row)))
    } catch {
      showToast('No fue posible actualizar el estado.', 'error')
    }
  }

  async function handleMove(item, direction) {
    if (!items) return
    const index = items.findIndex((row) => row.id === item.id)
    const swapIndex = direction === 'up' ? index - 1 : index + 1
    if (swapIndex < 0 || swapIndex >= items.length) return

    const reordered = [...items]
    ;[reordered[index], reordered[swapIndex]] = [reordered[swapIndex], reordered[index]]
    setItems(reordered)

    try {
      await service.reorder(reordered.map((row, i) => ({ id: row.id, order: i + 1 })))
    } catch {
      showToast('No fue posible reordenar.', 'error')
      load()
    }
  }

  return (
    <div className="collection-manager">
      <div className="collection-header">
        <div>
          <h1 className="admin-page-title">{title}</h1>
        </div>
        <button className="btn-primary" onClick={openCreate}>
          <Plus size={16} />
          Agregar
        </button>
      </div>

      {error && (
        <div className="admin-empty">
          <p>No fue posible cargar la información.</p>
          <button className="btn-secondary" onClick={load}>Reintentar</button>
        </div>
      )}

      {!error && items === null && (
        <div className="skeleton" style={{ height: 200 }} />
      )}

      {!error && items && items.length === 0 && (
        <div className="admin-empty"><p>{emptyState}</p></div>
      )}

      {!error && items && items.length > 0 && (
        <div className="messages-table-wrapper">
          <table className="messages-table collection-table">
            <thead>
              <tr>
                {columns.map((col) => <th key={col.key}>{col.label}</th>)}
                {'active' in items[0] && <th>Estado</th>}
                <th>Orden</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item.id}>
                  {columns.map((col) => (
                    <td key={col.key}>{col.render ? col.render(item) : item[col.key]}</td>
                  ))}
                  {'active' in item && (
                    <td>
                      <button
                        className={`status-toggle ${item.active ? 'status-toggle-on' : ''}`}
                        onClick={() => handleToggleActive(item)}
                      >
                        {item.active ? 'Activo' : 'Inactivo'}
                      </button>
                    </td>
                  )}
                  <td>
                    <div className="reorder-buttons">
                      <button disabled={index === 0} onClick={() => handleMove(item, 'up')} aria-label="Subir">
                        <ArrowUp size={14} />
                      </button>
                      <button disabled={index === items.length - 1} onClick={() => handleMove(item, 'down')} aria-label="Bajar">
                        <ArrowDown size={14} />
                      </button>
                    </div>
                  </td>
                  <td>
                    <div className="row-actions">
                      <button onClick={() => openEdit(item)} aria-label={`Editar ${itemLabel}`}>
                        <Pencil size={15} />
                      </button>
                      <button onClick={() => setPendingDelete(item)} aria-label={`Eliminar ${itemLabel}`} className="row-action-danger">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {formOpen && (
        <div className="collection-form-overlay" onClick={() => setFormOpen(false)}>
          <form
            className="collection-form"
            onClick={(event) => event.stopPropagation()}
            onSubmit={handleSubmit}
          >
            <div className="collection-form-header">
              <h2>{editingId ? `Editar ${itemLabel}` : `Nuevo ${itemLabel}`}</h2>
              <button type="button" onClick={() => setFormOpen(false)} aria-label="Cerrar">
                <X size={20} />
              </button>
            </div>

            <div className="collection-form-body">
              {renderFields({ formState, setFormState })}
            </div>

            <div className="collection-form-footer">
              <button type="button" className="btn-secondary" onClick={() => setFormOpen(false)}>
                Cancelar
              </button>
              <button type="submit" className="btn-primary" disabled={saving}>
                {saving ? 'Guardando...' : 'Guardar'}
              </button>
            </div>
          </form>
        </div>
      )}

      {pendingDelete && (
        <ConfirmDialog
          title={`Eliminar ${itemLabel}`}
          message={`¿Seguro que deseas eliminar este ${itemLabel}? Esta acción no se puede deshacer.`}
          onConfirm={handleDelete}
          onCancel={() => setPendingDelete(null)}
        />
      )}
    </div>
  )
}

export default CollectionManager
