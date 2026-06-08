/* =====================================================================
   i18n.js — Configuration internationalisation Ragequit Arcade
   À importer une seule fois dans main.jsx : import './i18n/i18n'
   ===================================================================== */
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Import des fichiers de traduction
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

// Liste des langues disponibles (pour le sélecteur)
export const LANGUAGES = [
  { code: 'en', label: 'English',    flag: '🇬🇧' },
  { code: 'fr', label: 'Français',   flag: '🇫🇷' },
  { code: 'es', label: 'Español',    flag: '🇪🇸' },
  { code: 'pt', label: 'Português',  flag: '🇵🇹' },
  { code: 'de', label: 'Deutsch',    flag: '🇩🇪' },
  { code: 'it', label: 'Italiano',   flag: '🇮🇹' },
  { code: 'nl', label: 'Nederlands', flag: '🇳🇱' },
  { code: 'pl', label: 'Polski',     flag: '🇵🇱' },
  { code: 'tr', label: 'Türkçe',     flag: '🇹🇷' },
  { code: 'ru', label: 'Русский',    flag: '🇷🇺' },
  { code: 'ar', label: 'العربية',    flag: '🇸🇦' },
  { code: 'ja', label: '日本語',      flag: '🇯🇵' },
]

i18n
  .use(LanguageDetector)   // détecte la langue du navigateur automatiquement
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      fr: { translation: fr },
      es: { translation: es },
      pt: { translation: pt },
      de: { translation: de },
      it: { translation: it },
      nl: { translation: nl },
      pl: { translation: pl },
      tr: { translation: tr },
      ru: { translation: ru },
      ar: { translation: ar },
      ja: { translation: ja },
    },
    fallbackLng: 'en',        // si une clé manque → anglais
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'rq_lang',
    },
  })

export default i18n
