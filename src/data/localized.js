/* =====================================================================
   localized.js — contenu (jeux, catégories, blog) dans la langue de l'URL
   Les textes anglais de référence restent dans games.js et blog.js.
   Les traductions sont dans src/data/i18n/<langue>/ ; tout texte absent
   d'une traduction retombe sur l'anglais.
   Côté navigateur, chaque langue est un fichier séparé chargé à la demande
   (loadTranslations) : un visiteur ne télécharge que sa langue.
   Le prérendu enregistre toutes les langues d'un coup (src/data/i18n/all.js).
   ===================================================================== */
import { games as baseGames, categories as baseCategories, siteSeo as baseSiteSeo } from './games'
import { posts as basePosts } from './blog'
import { useSyncExternalStore } from 'react'
import { useLang } from '../i18n/locale'

export const TRANSLATIONS = {}
const loaders = import.meta.glob('./i18n/*/index.js')
const listeners = new Set()
const pending = {}
let version = 0

export function registerTranslations(lang, data) {
  TRANSLATIONS[lang] = data
  for (const k of Object.keys(cache)) if (k.slice(1) === lang) delete cache[k]
  version++
  listeners.forEach(fn => fn())
}

/* Charge la traduction d'une langue (une seule fois). Résolue même en cas d'échec. */
export function loadTranslations(lang) {
  if (!lang || lang === 'en' || TRANSLATIONS[lang]) return Promise.resolve()
  const loader = loaders['./i18n/' + lang + '/index.js']
  if (!loader) return Promise.resolve()
  return pending[lang] || (pending[lang] = loader()
    .then(m => registerTranslations(lang, m.default))
    .catch(() => { delete pending[lang] }))
}

function subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn) }
const getVersion = () => version

/* Langue de la page + rendu à nouveau quand sa traduction arrive. */
function useContentLang() {
  const lang = useLang()
  useSyncExternalStore(subscribe, getVersion, getVersion)
  if (lang !== 'en' && !TRANSLATIONS[lang]) loadTranslations(lang)
  return lang
}

function mergeSeo(base = {}, tr = {}) {
  return { ...base, ...tr, faq: tr.faq && tr.faq.length ? tr.faq : base.faq }
}

function localizeGame(g, lang) {
  const t = TRANSLATIONS[lang]?.games?.[g.id]
  if (!t) return g
  return { ...g, description: t.description || g.description, controls: t.controls || g.controls, seo: mergeSeo(g.seo, t.seo) }
}

function localizeCategory(c, lang) {
  const t = TRANSLATIONS[lang]?.categories?.[c.id]
  if (!t) return c
  return { ...c, label: t.label || c.label, description: t.description || c.description, seo: mergeSeo(c.seo, t.seo) }
}

function localizePost(p, lang) {
  const t = TRANSLATIONS[lang]?.posts?.[p.slug]
  if (!t) return p
  return {
    ...p,
    title: t.title || p.title,
    excerpt: t.excerpt || p.excerpt,
    seo: { ...p.seo, ...(t.seo || {}) },
    content: t.content && t.content.length === p.content.length ? t.content : p.content,
  }
}

const cache = {}
function cached(key, fn) { return cache[key] || (cache[key] = fn()) }

export const getGames = (lang = 'en') => cached('g' + lang, () => baseGames.map(g => localizeGame(g, lang)))
export const getCategories = (lang = 'en') => cached('c' + lang, () => baseCategories.map(c => localizeCategory(c, lang)))
export const getPosts = (lang = 'en') => cached('p' + lang, () => basePosts.map(p => localizePost(p, lang)))
export const getPost = (slug, lang = 'en') => getPosts(lang).find(p => p.slug === slug) || null
export const getSiteSeo = (lang = 'en') => cached('s' + lang, () => ({ ...baseSiteSeo, ...(TRANSLATIONS[lang]?.siteSeo || {}) }))

export const useGames = () => getGames(useContentLang())
export const useCategories = () => getCategories(useContentLang())
export const usePosts = () => getPosts(useContentLang())
export const useSiteSeo = () => getSiteSeo(useContentLang())

/* Contrôle : liste des contenus anglais sans traduction pour une langue. */
export function missingTranslations(lang) {
  const t = TRANSLATIONS[lang] || {}
  return [
    ...baseGames.filter(g => !t.games?.[g.id]).map(g => 'game:' + g.id),
    ...baseCategories.filter(c => c.id !== 'all' && !t.categories?.[c.id]).map(c => 'category:' + c.id),
    ...basePosts.filter(p => !t.posts?.[p.slug] || t.posts[p.slug].content?.length !== p.content.length).map(p => 'post:' + p.slug),
  ]
}
