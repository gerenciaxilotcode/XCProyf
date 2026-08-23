import api from './api.js'

export async function fetchProjects(params = {}) {
  const response = await api.get('/projects', { params })
  return response.data.data
}

export async function fetchProjectBySlug(slug) {
  const response = await api.get(`/projects/${slug}`)
  return response.data.data
}

export async function createProject(payload) {
  const response = await api.post('/projects', payload)
  return response.data.data
}

export async function updateProject(id, payload) {
  const response = await api.put(`/projects/${id}`, payload)
  return response.data.data
}

export async function deleteProject(id) {
  await api.delete(`/projects/${id}`)
}

export async function togglePublish(id) {
  const response = await api.patch(`/projects/${id}/publish`)
  return response.data.data
}

export async function toggleFeatured(id) {
  const response = await api.patch(`/projects/${id}/featured`)
  return response.data.data
}
