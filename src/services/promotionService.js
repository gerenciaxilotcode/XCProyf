import api from './api.js'

export async function fetchPromotions(params = {}) {
  const response = await api.get('/promotions', { params })
  return response.data.data
}

export async function createPromotion(payload) {
  const response = await api.post('/promotions', payload)
  return response.data.data
}

export async function updatePromotion(id, payload) {
  const response = await api.put(`/promotions/${id}`, payload)
  return response.data.data
}

export async function deletePromotion(id) {
  await api.delete(`/promotions/${id}`)
}
