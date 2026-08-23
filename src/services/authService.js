import api from './api.js'

export async function login(email, password) {
  const response = await api.post('/auth/login', { email, password })
  return response.data.data
}

export async function logout() {
  await api.post('/auth/logout')
}

export async function getCurrentUser() {
  const response = await api.get('/auth/me')
  return response.data.data
}
