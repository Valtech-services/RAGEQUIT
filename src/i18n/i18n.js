/* =====================================================================
   i18n.js — Configuration internationalisation Ragequit Arcade
   À importer une fois dans main.jsx : import './i18n/i18n'
   ===================================================================== */
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import en from './locales/en.json'
import fr from './locales/fr.json'
import es from './locales/es.json'
import pt from './locales/pt.json'
import de from './locales/de.json'
import it from './locales/it.json'
import nl from './locales/nl.json'
import pl from './locales/pl.json'
import tr from './locales/tr.json'
import ru from './locales/ru.json'
import ar from './locales/ar.json'
import ja from './locales/ja.json'

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

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en }, fr: { translation: fr }, es: { translation: es },
      pt: { translation: pt }, de: { translation: de }, it: { translation: it },
      nl: { translation: nl }, pl: { translation: pl }, tr: { translation: tr },
      ru: { translation: ru }, ar: { translation: ar }, ja: { translation: ja },
    },
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'rq_lang',
    },
  })

export default i18n
