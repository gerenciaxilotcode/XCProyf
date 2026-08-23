import api from './api.js'

export async function fetchPublicContent() {
  const response = await api.get('/content')
  return response.data.data
}
