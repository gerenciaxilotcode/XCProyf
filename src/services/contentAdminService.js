import api from './api.js'

export async function getHero() {
  const response = await api.get('/admin/content/hero')
  return response.data.data
}

export async function updateHero(payload) {
  const response = await api.put('/admin/content/hero', payload)
  return response.data.data
}

export async function getCta() {
  const response = await api.get('/admin/content/cta')
  return response.data.data
}

export async function updateCta(payload) {
  const response = await api.put('/admin/content/cta', payload)
  return response.data.data
}

export async function getBrand() {
  const response = await api.get('/admin/content/brand')
  return response.data.data
}

export async function updateBrand(payload) {
  const response = await api.put('/admin/content/brand', payload)
  return response.data.data
}

export async function getContactInfo() {
  const response = await api.get('/admin/content/contact')
  return response.data.data
}

export async function updateContactInfo(payload) {
  const response = await api.put('/admin/content/contact', payload)
  return response.data.data
}

export function createCollectionService(resource) {
  const base = `/admin/content/${resource}`

  return {
    async list() {
      const response = await api.get(base)
      return response.data.data
    },
    async create(payload) {
      const response = await api.post(base, payload)
      return response.data.data
    },
    async update(id, payload) {
      const response = await api.put(`${base}/${id}`, payload)
      return response.data.data
    },
    async remove(id) {
      await api.delete(`${base}/${id}`)
    },
    async reorder(items) {
      const response = await api.post(`${base}/reorder`, { items })
      return response.data.data
    }
  }
}

export const processStepService = createCollectionService('process-steps')
export const serviceService = createCollectionService('services')
export const sectorService = createCollectionService('sectors')
export const differentiatorService = createCollectionService('differentiators')
export const offerService = createCollectionService('offers')
