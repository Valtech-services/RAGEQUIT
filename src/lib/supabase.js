import { createClient } from '@supabase/supabase-js'

/*
  Client Supabase — initialisé depuis les variables d'environnement Vite.
  Les valeurs viennent du fichier .env à la racine :
    VITE_SUPABASE_URL
    VITE_SUPABASE_ANON_KEY
  La clé anon est publique (utilisable côté navigateur) ; la sécurité réelle
  repose sur les Row Level Security policies définies dans Supabase.
*/
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  // Message clair en dev si le .env n'est pas configuré
  console.warn(
    '[Supabase] Variables manquantes. Vérifie VITE_SUPABASE_URL et ' +
    'VITE_SUPABASE_ANON_KEY dans ton fichier .env, puis redémarre le serveur.'
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
