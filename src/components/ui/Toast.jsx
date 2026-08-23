import { CheckCircle2, AlertCircle, Info } from 'lucide-react'

const ICONS = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info
}

function Toast({ message, type = 'success' }) {
  const Icon = ICONS[type] || Info

  return (
    <div className={`toast toast-${type}`} role="status">
      <Icon size={18} />
      <span>{message}</span>
    </div>
  )
}

export default Toast
