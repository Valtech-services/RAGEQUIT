import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

/*
  AuthContext — état d'authentification partagé dans toute l'app.

  Expose :
    user            : l'objet utilisateur Supabase (ou null)
    profile         : la ligne profiles correspondante (username, etc.)
    loading         : true tant que la session initiale n'est pas résolue
    signUpEmail     : inscription email + mot de passe + username
    signInEmail     : connexion email + mot de passe
    signInGoogle    : connexion OAuth Google
    signOut         : déconnexion

  Usage : envelopper <App/> dans <AuthProvider> (voir main.jsx), puis
  useAuth() dans n'importe quel composant.
*/

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  // Récupère la ligne profile liée à l'utilisateur
  async function loadProfile(userId) {
    if (!userId) { setProfile(null); return }
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    if (!error) setProfile(data)
  }

  useEffect(() => {
    // Session initiale au chargement
    supabase.auth.getSession().then(({ data: { session } }) => {
      const u = session?.user ?? null
      setUser(u)
      if (u) loadProfile(u.id)
      setLoading(false)
    })

    // Écoute les changements (connexion, déconnexion, refresh token)
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

  /* ---- Inscription email + mot de passe + username ---- */
  async function signUpEmail({ email, password, username }) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        // username stocké dans les métadonnées ; un trigger SQL crée
        // ensuite la ligne dans la table profiles (voir SQL fourni).
        data: { username },
      },
    })
    return { data, error }
  }

  /* ---- Connexion email + mot de passe ---- */
  async function signInEmail({ email, password }) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    return { data, error }
  }

  /* ---- Connexion Google (OAuth) ---- */
  async function signInGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin },
    })
    return { data, error }
  }

  /* ---- Déconnexion ---- */
  async function signOut() {
    await supabase.auth.signOut()
    setUser(null)
    setProfile(null)
  }

  const value = {
    user, profile, loading,
    signUpEmail, signInEmail, signInGoogle, signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth doit être utilisé dans un <AuthProvider>')
  return ctx
}
