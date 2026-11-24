/* Tous les textes d'interface d'un coup, pour le prérendu uniquement
   (src/entry-server.jsx). Le navigateur les charge à la demande (i18n.js). */
import i18n from './i18n'

const mods = import.meta.glob('./locales/*.json', { eager: true })
for (const [file, mod] of Object.entries(mods)) {
  const lang = file.match(/locales\/(\w+)\.json$/)[1]
  i18n.addResourceBundle(lang, 'translation', mod.default || mod, true, true)
}
