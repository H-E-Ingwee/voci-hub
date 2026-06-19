import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase, auth, db } from '../lib/supabase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Check active session on mount
    const initAuth = async () => {
      const session = await auth.getSession()
      if (session?.user) {
        setUser(session.user)
        await loadProfile(session.user.id)
      }
      setLoading(false)
    }
    initAuth()

    // Listen for auth changes
    const { data: { subscription } } = auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        setUser(session.user)
        await loadProfile(session.user.id)
      } else if (event === 'SIGNED_OUT') {
        setUser(null)
        setProfile(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const loadProfile = async (userId) => {
    const { data, error } = await db.getProfile(userId)
    if (data) setProfile(data)
    if (error) console.error('Profile load error:', error)
  }

  const signUp = async ({ email, password, name, sphere }) => {
    setError(null)
    const { data, error } = await auth.signUp({ email, password, name, sphere })
    if (error) { setError(error.message); return { error } }
    return { data }
  }

  const signIn = async ({ email, password }) => {
    setError(null)
    const { data, error } = await auth.signIn({ email, password })
    if (error) { setError(error.message); return { error } }
    return { data }
  }

  const signOut = async () => {
    await auth.signOut()
  }

  const updateProfile = async (updates) => {
    if (!user) return
    const { data, error } = await db.updateProfile(user.id, updates)
    if (data) setProfile(data)
    return { data, error }
  }

  return (
    <AuthContext.Provider value={{
      user, profile, loading, error,
      signUp, signIn, signOut, updateProfile,
      isAuthenticated: !!user,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)