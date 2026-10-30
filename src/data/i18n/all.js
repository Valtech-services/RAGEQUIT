/* Toutes les traductions de contenu, chargées d'un coup.
   Utilisé uniquement par le prérendu (src/entry-server.jsx), jamais par le navigateur. */
import { registerTranslations } from '../localized'

const mods = import.meta.glob('./*/index.js', { eager: true })
for (const [file, mod] of Object.entries(mods)) {
  registerTranslations(file.split('/')[1], mod.default)
}
