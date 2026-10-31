/* =====================================================================
   locale.jsx — langue portée par l'URL
   - Anglais : à la racine (/game/linestorm)
   - Langues avec contenu traduit : préfixe (/fr/game/linestorm, /es/..., /pt/...)
   Pour ajouter une langue de contenu : l'ajouter à CONTENT_LANGS, créer
   src/data/i18n/<code>/ (même structure que fr/) et traduire tout le contenu.
   ===================================================================== */
import { forwardRef } from 'react'
import { Link as RRLink, NavLink as RRNavLink, useLocation, useNavigate as rrUseNavigate } from 'react-router-dom'

export const CONTENT_LANGS = ['fr', 'es', 'pt', 'de', 'it', 'nl', 'pl', 'tr', 'ru', 'ja', 'ar']
export const ALL_CONTENT_LANGS = ['en', ...CONTENT_LANGS]
/* Code régional (dates, og:locale) et sens d'écriture de chaque langue. */
export const LOCALES = { en: 'en-US', fr: 'fr-FR', es: 'es-ES', pt: 'pt-BR', de: 'de-DE', it: 'it-IT', nl: 'nl-NL', pl: 'pl-PL', tr: 'tr-TR', ru: 'ru-RU', ar: 'ar', ja: 'ja-JP' }
export const RTL_LANGS = ['ar']
const PREFIX_RE = new RegExp(`^/(${CONTENT_LANGS.join('|')})(?=/|$)`)

/* Langue de contenu d'un chemin : 'fr' pour /fr/..., 'en' sinon. */
export function langFromPath(pathname = '/') {
  const m = pathname.match(PREFIX_RE)
  return m ? m[1] : 'en'
}

/* Chemin sans préfixe de langue : /fr/game/x -> /game/x */
export function stripLang(pathname = '/') {
  const s = pathname.replace(PREFIX_RE, '')
  return s === '' ? '/' : s
}

/* Chemin dans une langue donnée : withLang('/game/x', 'fr') -> /fr/game/x */
export function withLang(path, lang) {
  const base = stripLang(path)
  if (base.startsWith('/admin') || base.startsWith('/games/')) return base
  if (!lang || lang === 'en' || !CONTENT_LANGS.includes(lang)) return base
  return '/' + lang + (base === '/' ? '' : base)
}

export function useLang() {
  const { pathname } = useLocation()
  return langFromPath(pathname)
}

/* Préfixe automatiquement les liens internes absolus avec la langue de la page. */
function localize(to, lang) {
  if (typeof to !== 'string' || !to.startsWith('/') || to.startsWith('//')) return to
  if (to.startsWith('/admin') || to.startsWith('/games/')) return to
  if (PREFIX_RE.test(to)) return to
  return withLang(to, lang)
}

export const Link = forwardRef(function Link({ to, ...props }, ref) {
  const lang = useLang()
  return <RRLink ref={ref} to={localize(to, lang)} {...props} />
})

export const NavLink = forwardRef(function NavLink({ to, ...props }, ref) {
  const lang = useLang()
  return <RRNavLink ref={ref} to={localize(to, lang)} {...props} />
})

export function useNavigate() {
  const navigate = rrUseNavigate()
  const lang = useLang()
  return (to, opts) => navigate(localize(to, lang), opts)
}
