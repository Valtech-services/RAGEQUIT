/* =====================================================================
   i18n.js — Configuration internationalisation Ragequit Arcade
   À importer une fois dans main.jsx : import './i18n/i18n'
   ===================================================================== */
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import en from './locales/en.json'

/* A-019 : seuls les textes anglais sont dans le script principal. Les 11
   autres langues sont des fichiers séparés, chargés à la demande par ce
   petit « backend » i18next (le prérendu les charge toutes d'un coup via
   src/i18n/allLocales.js). */
const localeLoaders = import.meta.glob(['./locales/*.json', '!./locales/en.json'])
const lazyLocales = {
  type: 'backend',
  init() {},
  read(lang, ns, callback) {
    const load = localeLoaders['./locales/' + lang + '.json']
    if (!load) return callback(null, {})
    load().then(m => callback(null, m.default || m), err => callback(err, null))
  },
}

/*
  Chaque langue a un "countryCode" ISO 3166-1 alpha-2 en minuscules,
  utilisé par flag-icons pour afficher un vrai drapeau SVG en couleur.
*/
export const LANGUAGES = [
  { code: 'en', label: 'English',    country: 'gb' },
  { code: 'fr', label: 'Français',   country: 'fr' },
  { code: 'es', label: 'Español',    country: 'es' },
  { code: 'pt', label: 'Português',  country: 'pt' },
  { code: 'de', label: 'Deutsch',    country: 'de' },
  { code: 'it', label: 'Italiano',   country: 'it' },
  { code: 'nl', label: 'Nederlands', country: 'nl' },
  { code: 'pl', label: 'Polski',     country: 'pl' },
  { code: 'tr', label: 'Türkçe',     country: 'tr' },
  { code: 'ru', label: 'Русский',    country: 'ru' },
  { code: 'ar', label: 'العربية',    country: 'sa' },
  { code: 'ja', label: '日本語',      country: 'jp' },
]

/* Vrai si le visiteur n'a encore jamais choisi de langue (avant que le
   détecteur n'enregistre sa langue). Sert à la redirection de première visite. */
let stored = null
try { stored = localStorage.getItem('rq_lang') } catch (e) { /* ignore */ }
export const firstVisit = !stored

i18n
  .use(lazyLocales)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: { en: { translation: en } },
    partialBundledLanguages: true,
    load: 'languageOnly',
    // Pas de Suspense : le texte anglais s'affiche le temps qu'une langue arrive.
    react: { useSuspense: false },
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'rq_lang',
    },
  })

export default i18n
