import { useRef, useState } from 'react'
import { UploadCloud, Loader2 } from 'lucide-react'
import './ImageDropzone.css'

function ImageDropzone({ onUpload, uploading = false }) {
  const inputRef = useRef(null)
  const [dragging, setDragging] = useState(false)

  function handleFiles(files) {
    const file = files?.[0]
    if (file) onUpload(file)
  }

  return (
    <div
      className={`image-dropzone ${dragging ? 'image-dropzone-active' : ''}`}
      onClick={() => inputRef.current?.click()}
      onDragOver={(event) => {
        event.preventDefault()
        setDragging(true)
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(event) => {
        event.preventDefault()
        setDragging(false)
        handleFiles(event.dataTransfer.files)
      }}
      role="button"
      tabIndex={0}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(event) => handleFiles(event.target.files)}
      />
      {uploading ? <Loader2 size={22} className="image-dropzone-spinner" /> : <UploadCloud size={22} />}
      <span>{uploading ? 'Subiendo imagen...' : 'Arrastra una imagen o haz clic para subir'}</span>
      <span className="image-dropzone-hint">JPG, PNG o WebP · máx. 5 MB</span>
    </div>
  )
}

export default ImageDropzone
