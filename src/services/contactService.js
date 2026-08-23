import api from './api.js'

export async function sendContactMessage(payload) {
  const response = await api.post('/contact', payload)
  return response.data.data
}

export async function fetchContactMessages(params = {}) {
  const response = await api.get('/contact', { params })
  return response.data.data
}

export async function updateContactStatus(id, status) {
  const response = await api.patch(`/contact/${id}`, { status })
  return response.data.data
}
