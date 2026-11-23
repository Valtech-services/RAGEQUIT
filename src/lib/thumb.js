/* =====================================================================
   thumb.js — miniatures légères des jeux (point d'audit A-001)
   Les miniatures d'origine (public/thumbnails/<id>.jpg, 1024 px) servent
   aux images de partage. Les cartes affichent des WebP 320 / 640 px
   générés par scripts/optimize-images.py. Si une variante manque (jeu
   ajouté sans lancer le script), l'image d'origine est rechargée.
   Usage : <img {...thumbImg(game.thumbnail, '120px')} alt=... />
   ===================================================================== */
const RE = /^\/thumbnails\/([\w-]+)\.(jpe?g|png|webp)$/i

function fallback(original, onFail) {
  return e => {
    const img = e.currentTarget
    if (img.dataset.fallback) { if (onFail) onFail(e); return }
    img.dataset.fallback = '1'
    img.removeAttribute('srcset')
    img.src = original
  }
}

export function thumbImg(src, sizes = '(max-width: 767px) 45vw, 280px') {
  const m = RE.exec(src || '')
  if (!m) return { src }
  const id = m[1]
  return {
    src: `/thumbnails/w640/${id}.webp`,
    srcSet: `/thumbnails/w320/${id}.webp 320w, /thumbnails/w640/${id}.webp 640w`,
    sizes,
    onError: fallback(src),
  }
}

/* Images de blog (16:9) : WebP 640 px pour les cartes, original 1376 px
   pour les grands écrans. En cas d'échec total, l'image est masquée. */
const BLOG_RE = /^\/blog\/([\w-]+)\.(jpe?g|png)$/i

export function blogImg(src, sizes = '(max-width: 767px) 92vw, 420px') {
  const m = BLOG_RE.exec(src || '')
  const hide = e => { e.currentTarget.style.display = 'none' }
  if (!m) return { src, onError: hide }
  const small = `/blog/w640/${m[1]}.webp`
  return {
    src: small,
    srcSet: `${small} 640w, ${src} 1376w`,
    sizes,
    onError: e => {
      const img = e.currentTarget
      if (img.dataset.fallback) return hide(e)
      img.dataset.fallback = '1'
      img.removeAttribute('srcset')
      img.src = src
    },
  }
}

/* Images de catégories : affichées en 28 à 48 px, WebP 128 px. */
const CAT_RE = /^\/categories\/([\w-]+)\.(jpe?g|png)$/i

export function catImg(src, onFail) {
  const m = CAT_RE.exec(src || '')
  if (!m) return { src, onError: onFail }
  return { src: `/categories/w128/${m[1]}.webp`, onError: fallback(src, onFail) }
}
