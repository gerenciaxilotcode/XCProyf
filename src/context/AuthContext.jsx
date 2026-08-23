import { createContext, useEffect, useState } from 'react'
import { getCurrentUser, login as loginRequest, logout as logoutRequest } from '../services/authService.js'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCurrentUser()
      .then((data) => setUser(data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false))
  }, [])

  async function login(email, password) {
    const data = await loginRequest(email, password)
    setUser(data)
    return data
  }

  async function logout() {
    await logoutRequest()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
