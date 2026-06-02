import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  async function loadProfile(userId) {
    if (!userId) { setProfile(null); return }
    const { data, error } = await supabase
      .from('profiles').select('*').eq('id', userId).single()
    if (!error) setProfile(data)
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      const u = session?.user ?? null
      setUser(u)
      if (u) loadProfile(u.id)
      setLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        const u = session?.user ?? null
        setUser(u)
        if (u) loadProfile(u.id)
        else setProfile(null)
      }
    )
    return () => subscription.unsubscribe()
  }, [])

  async function signUpEmail({ email, password, username }) {
    const { data, error } = await supabase.auth.signUp({
      email, password,
      options: { data: { username } },
    })
    return { data, error }
  }

  async function signInEmail({ email, password }) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    return { data, error }
  }

  async function signInGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin },
    })
    return { data, error }
  }

  async function signOut() {
    await supabase.auth.signOut()
    setUser(null); setProfile(null)
  }

  /* Met à jour le profil (pays, jeu favori, etc.) et recharge le state */
  async function updateProfile(updates) {
    if (!user) return { error: 'Not authenticated' }
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single()
    if (!error && data) setProfile(data)
    return { data, error }
  }

  /* Incrémente le compteur de parties + met à jour le streak */
  async function recordPlay(gameId) {
    if (!user || !profile) return
    const now = new Date()
    const last = profile.last_played_at ? new Date(profile.last_played_at) : null
    const isNewDay = !last || now.toDateString() !== last.toDateString()
    const isConsecutive = last &&
      (now - last) < 1000 * 60 * 60 * 48   // moins de 48h entre les sessions

    const newStreak = isNewDay
      ? (isConsecutive ? (profile.streak_days || 0) + 1 : 1)
      : (profile.streak_days || 0)

    await updateProfile({
      games_played:   (profile.games_played || 0) + 1,
      streak_days:    newStreak,
      last_played_at: now.toISOString(),
    })
  }

  const value = {
    user, profile, loading,
    signUpEmail, signInEmail, signInGoogle, signOut,
    updateProfile, recordPlay,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth doit être utilisé dans un <AuthProvider>')
  return ctx
}
