/* =====================================================================
   paragraphs.js — découpe une description en paragraphes (A-017)
   Les descriptions sont des chaînes uniques. Si elles contiennent des
   lignes vides ("\n\n"), on les respecte ; sinon on regroupe les phrases
   en paragraphes d'environ 50 à 70 mots (ou 140 caractères en japonais),
   pour éviter un mur de texte sur mobile. Fonctionne dans toutes les
   langues du site (ponctuation latine, arabe et japonaise).
   ===================================================================== */
export function splitSentences(text) {
  if (!text) return []
  const out = []
  let start = 0
  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    let end = -1
    if ('。！？'.includes(c)) end = i + 1
    else if ('.!?؟'.includes(c)) {
      let j = i + 1
      while (j < text.length && '.!?؟"»”\')]'.includes(text[j])) j++
      // Fin de phrase seulement si suivie d'un espace ou de la fin du texte
      // (1.5, 3.2x ne coupent pas).
      if (j >= text.length || /\s/.test(text[j])) end = j
      i = j - 1
    }
    if (end > 0) {
      const s = text.slice(start, end).trim()
      if (s) out.push(s)
      start = end
    }
  }
  const tail = text.slice(start).trim()
  if (tail) out.push(tail)
  return out
}

export function toParagraphs(text) {
  if (!text) return []
  if (text.includes('\n\n')) return text.split(/\n\s*\n/).map(s => s.trim()).filter(Boolean)
  const cjk = /[぀-ヿ一-鿿]/.test(text)
  const limit = cjk ? 140 : 340
  const sentences = splitSentences(text)
  const paras = []
  let cur = ''
  for (const s of sentences) {
    cur = cur ? cur + (cjk ? '' : ' ') + s : s
    if (cur.length >= limit) { paras.push(cur); cur = '' }
  }
  if (cur) {
    // Une fin trop courte rejoint le paragraphe précédent.
    if (paras.length && cur.length < limit / 3) paras[paras.length - 1] += (cjk ? '' : ' ') + cur
    else paras.push(cur)
  }
  return paras
}

/* Début d'une description pour l'accroche mobile : environ 2 phrases. */
export function teaser(text, max = 220) {
  const sentences = splitSentences((text || '').replace(/\n\s*\n/g, ' '))
  let out = ''
  for (const s of sentences) {
    if (out && out.length + s.length > max) break
    out = out ? out + ' ' + s : s
  }
  return out
}
