/* =====================================================================
   localized.js — contenu (jeux, catégories, blog) dans la langue de l'URL
   Les textes anglais de référence restent dans games.js et blog.js.
   Les traductions sont dans src/data/i18n/<langue>.js ; tout texte absent
   d'une traduction retombe sur l'anglais.
   ===================================================================== */
import { games as baseGames, categories as baseCategories, siteSeo as baseSiteSeo } from './games'
import { posts as basePosts } from './blog'
import { useLang } from '../i18n/locale'
import fr from './i18n/fr/index.js'
import es from './i18n/es/index.js'
import pt from './i18n/pt/index.js'

export const TRANSLATIONS = { fr, es, pt }

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

export const useGames = () => getGames(useLang())
export const useCategories = () => getCategories(useLang())
export const usePosts = () => getPosts(useLang())
export const useSiteSeo = () => getSiteSeo(useLang())

/* Contrôle : liste des contenus anglais sans traduction pour une langue. */
export function missingTranslations(lang) {
  const t = TRANSLATIONS[lang] || {}
  return [
    ...baseGames.filter(g => !t.games?.[g.id]).map(g => 'game:' + g.id),
    ...baseCategories.filter(c => c.id !== 'all' && !t.categories?.[c.id]).map(c => 'category:' + c.id),
    ...basePosts.filter(p => !t.posts?.[p.slug] || t.posts[p.slug].content?.length !== p.content.length).map(p => 'post:' + p.slug),
  ]
}
