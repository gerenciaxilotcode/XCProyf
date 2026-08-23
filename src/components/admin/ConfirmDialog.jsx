import { AlertTriangle } from 'lucide-react'
import './ConfirmDialog.css'

function ConfirmDialog({ title, message, confirmLabel = 'Eliminar', onConfirm, onCancel }) {
  return (
    <div className="confirm-overlay" onClick={onCancel}>
      <div className="confirm-dialog" onClick={(event) => event.stopPropagation()}>
        <div className="confirm-icon">
          <AlertTriangle size={22} />
        </div>
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="confirm-actions">
          <button className="btn-secondary" onClick={onCancel}>Cancelar</button>
          <button className="confirm-danger-button" onClick={onConfirm}>{confirmLabel}</button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDialog
