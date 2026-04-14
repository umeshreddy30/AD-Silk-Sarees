import { createContext, useContext, useMemo, useState } from 'react'
import { authService } from '../services/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('ad_silk_user')
    return raw ? JSON.parse(raw) : null
  })

  const login = async (email, password) => {
    const response = await authService.login({ email, password })
    localStorage.setItem('ad_silk_access_token', response.access_token)
    localStorage.setItem('ad_silk_refresh_token', response.refresh_token)
    localStorage.setItem('ad_silk_user', JSON.stringify(response.user))
    setUser(response.user)
    return response.user
  }

  const register = async (name, email, password) => authService.register({ name, email, password })

  const logout = () => {
    localStorage.removeItem('ad_silk_access_token')
    localStorage.removeItem('ad_silk_refresh_token')
    localStorage.removeItem('ad_silk_user')
    setUser(null)
  }

  const value = useMemo(() => ({ user, login, register, logout }), [user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
