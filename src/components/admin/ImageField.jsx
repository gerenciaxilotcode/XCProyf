import { useState } from 'react'
import { ImagePlus, X } from 'lucide-react'
import MediaPicker from './MediaPicker.jsx'
import './ImageField.css'

function ImageField({ label, value, onChange }) {
  const [pickerOpen, setPickerOpen] = useState(false)

  return (
    <div className="image-field">
      {label && <label>{label}</label>}

      <div className="image-field-preview">
        {value?.secureUrl ? (
          <img src={value.secureUrl} alt="" />
        ) : (
          <span className="image-field-empty">Sin imagen</span>
        )}
      </div>

      <div className="image-field-actions">
        <button type="button" className="btn-secondary" onClick={() => setPickerOpen(true)}>
          <ImagePlus size={16} />
          {value ? 'Cambiar' : 'Elegir imagen'}
        </button>
        {value && (
          <button type="button" className="image-field-remove" onClick={() => onChange(null)}>
            <X size={16} />
            Quitar
          </button>
        )}
      </div>

      {pickerOpen && (
        <MediaPicker
          onSelect={(asset) => {
            onChange(asset)
            setPickerOpen(false)
          }}
          onClose={() => setPickerOpen(false)}
        />
      )}
    </div>
  )
}

export default ImageField
