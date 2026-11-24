/* =====================================================================
   legalSource.js — accès aux textes légaux sans les embarquer partout
   (point d'audit A-019). Les textes légaux en 12 langues (~280 Ko) ne
   sont chargés qu'avec la page légale (LegalPage, chargée à la demande)
   et par le prérendu. Ils s'enregistrent ici ; pageHead.js les lit ici.
   ===================================================================== */
let source = null

export function setLegalSource(fn) { source = fn }

/* Contenu légal d'une langue, ou {} si la page légale n'est pas chargée. */
export function legalFor(lang) {
  return source ? source(lang) : {}
}
