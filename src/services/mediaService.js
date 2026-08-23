import api from './api.js'

export async function fetchMedia() {
  const response = await api.get('/admin/media')
  return response.data.data
}

export async function uploadMedia(file, label) {
  const formData = new FormData()
  formData.append('file', file)
  if (label) formData.append('label', label)

  const response = await api.post('/admin/media', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
  return response.data.data
}

export async function updateMediaMeta(id, payload) {
  const response = await api.patch(`/admin/media/${id}`, payload)
  return response.data.data
}

export async function deleteMedia(id) {
  const response = await api.delete(`/admin/media/${id}`)
  return response.data
}
