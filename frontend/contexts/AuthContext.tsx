'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { authApi } from '@/lib/api/auth'
import type { User } from '@/types'

interface AuthContextType {
  user: User | null
  token: string | null
  loading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string; user?: User }>
  register: (data: {
    name: string
    email: string
    password: string
    phone?: string
    role?: 'user' | 'helper'
  }) => Promise<{ success: boolean; error?: string; user?: User }>
  logout: () => void
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing token
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      setToken(storedToken)
      refreshUser()
    } else {
      setLoading(false)
    }
  }, [])

  const refreshUser = async () => {
    try {
      const response = await authApi.getCurrentUser()
      if (response.success && response.data) {
        setUser(response.data)
      } else {
        // Token might be invalid, clear it
        setToken(null)
        localStorage.removeItem('token')
        setUser(null)
      }
    } catch (error) {
      console.error('Error refreshing user:', error)
      setToken(null)
      localStorage.removeItem('token')
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const response = await authApi.login({ email, password })
      if (response.success && response.data) {
        const { user: userData, token: tokenData } = response.data
        // Ensure role is set (backend should provide it, but ensure it's there)
        if (!userData.role && userData.type === 'helper') {
          userData.role = 'helper'
        }
        setUser(userData)
        setToken(tokenData)
        localStorage.setItem('token', tokenData)
        // Refresh to get full profile (this will update user state in background)
        refreshUser().catch(console.error)
        return { success: true, user: userData }
      }
      return { success: false, error: response.error || 'Login failed' }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, error: 'Network error. Please try again.' }
    }
  }

  const register = async (data: {
    name: string
    email: string
    password: string
    phone?: string
    role?: 'user' | 'helper'
  }) => {
    try {
      const response = await authApi.register(data)
      if (response.success && response.data) {
        const { user: userData, token: tokenData } = response.data
        setUser(userData)
        setToken(tokenData)
        localStorage.setItem('token', tokenData)
        // Refresh to get full profile
        await refreshUser()
        return { success: true, user: userData }
      }
      return { success: false, error: response.error || 'Registration failed' }
    } catch (error) {
      console.error('Registration error:', error)
      return { success: false, error: 'Network error. Please try again.' }
    }
  }

  const logout = () => {
    authApi.logout()
    setUser(null)
    setToken(null)
    localStorage.removeItem('token')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
