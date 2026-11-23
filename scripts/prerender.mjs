/* =====================================================================
   prerender.mjs — génère une page HTML complète par URL après le build.
   Lancé automatiquement par "npm run build" (donc par Vercel à chaque
   déploiement). Résultat : dist/game/<id>/index.html, dist/blog/<slug>/
   index.html, etc., avec tout le texte visible sans JavaScript.
   dist/200.html garde la coquille vide pour les URL non prérendues.
   ===================================================================== */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { JSDOM } from 'jsdom'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const ssrEntry = path.join(root, 'dist-ssr', 'entry-server.js')

/* Environnement navigateur simulé : certains composants lisent window,
   localStorage ou navigator pendant le rendu. */
const dom = new JSDOM('<!doctype html><html><head></head><body><div id="root"></div></body></html>', {
  url: 'https://ragequit-arcade.com/',
  pretendToBeVisual: true,
})
const w = dom.window
const expose = ['window', 'document', 'localStorage', 'sessionStorage', 'navigator', 'location', 'HTMLElement', 'Element', 'Node', 'getComputedStyle', 'matchMedia', 'requestAnimationFrame', 'cancelAnimationFrame']
if (!w.matchMedia) w.matchMedia = () => ({ matches: false, addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {} })
for (const k of expose) {
  try { Object.defineProperty(globalThis, k, { value: k === 'window' ? w : w[k], configurable: true, writable: true }) } catch (e) { /* ignore */ }
}
Object.defineProperty(globalThis, 'navigator', { value: { ...w.navigator, language: 'en-US', languages: ['en-US', 'en'], userAgent: 'Mozilla/5.0 (prerender)' }, configurable: true, writable: true })

const esc = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function buildHead(template, url, h, siteUrl, season) {
  const abs = u => (u && u.startsWith('http') ? u : siteUrl + (u || ''))
  const canonical = siteUrl + (url === '/' ? '/' : url)
  let html = template
    .replace(/<html lang="[^"]*">/, `<html lang="${h.lang || 'en'}"${h.dir === 'rtl' ? ' dir="rtl"' : ''}${season ? ` data-season="${season}"` : ''}>`)
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(h.title)}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${esc(h.description)}" />`)
  const tags = [
    `<link rel="canonical" href="${esc(canonical)}" />`,
    ...(h.alternates || []).map(a => `<link rel="alternate" hreflang="${a.lang}" href="${esc(a.href)}" />`),
    ...(h.xDefault ? [`<link rel="alternate" hreflang="x-default" href="${esc(h.xDefault)}" />`] : []),
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="${h.locale || 'en_US'}" />`,
    `<meta property="og:site_name" content="Ragequit Arcade" />`,
    `<meta property="og:title" content="${esc(h.title)}" />`,
    `<meta property="og:description" content="${esc(h.description)}" />`,
    `<meta property="og:url" content="${esc(canonical)}" />`,
    `<meta property="og:image" content="${esc(abs(h.image))}" />`,
    // Dimensions connues de l'image de partage par défaut (A-008).
    ...(h.image === '/og-image.jpg' ? [`<meta property="og:image:width" content="1200" />`, `<meta property="og:image:height" content="630" />`] : []),
    `<meta name="twitter:card" content="summary_large_image" />`,
    ...(h.robots ? [`<meta name="robots" content="${h.robots}" />`] : []),
    // Données structurées schema.org (A-003). L'id permet au navigateur de
    // les remplacer lors d'une navigation interne.
    ...(h.jsonLd ? [`<script type="application/ld+json" id="rq-jsonld">${h.jsonLd}</script>`] : []),
  ].join('\n    ')
  return html.replace('</head>', `    ${tags}\n  </head>`)
}

async function main() {
  const templatePath = path.join(dist, 'index.html')
  const template = fs.readFileSync(templatePath, 'utf8')
  // Coquille vide conservée pour les URL non prérendues (admin, 404...).
  fs.writeFileSync(path.join(dist, '200.html'), template)

  const { render, routes, head, SITE_URL, missingTranslations, CONTENT_LANGS, SEASON_THEME } = await import(pathToFileURL(ssrEntry).href)
  for (const l of CONTENT_LANGS) {
    const miss = missingTranslations(l)
    if (miss.length) console.warn(`[prerender] traductions manquantes (${l}) : ${miss.length} -> ${miss.slice(0, 8).join(', ')}${miss.length > 8 ? '…' : ''}`)
    else console.log(`[prerender] traductions ${l} : complètes`)
  }
  const urls = routes()
  let ok = 0
  const failed = []
  for (const url of urls) {
    try {
      const appHtml = render(url)
      if (!appHtml || appHtml.length < 200) throw new Error('rendu vide')
      const page = buildHead(template, url, head(url), SITE_URL, SEASON_THEME)
        .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
      const out = url === '/' ? templatePath : path.join(dist, url.slice(1), 'index.html')
      fs.mkdirSync(path.dirname(out), { recursive: true })
      fs.writeFileSync(out, page)
      ok++
    } catch (e) {
      failed.push(url + ' : ' + (e && e.message))
    }
  }
  console.log(`[prerender] ${ok}/${urls.length} pages prérendues`)

  // Page 404 (A-002) : servie par Vercel avec le statut HTTP 404 pour toute
  // URL inconnue. Contenu complet (menu, jeux, liens) et noindex.
  try {
    const nfUrl = '/page-not-found-404'
    const nfHtml = render(nfUrl)
    const nfHead = { ...head(nfUrl), title: 'Page not found | Ragequit Arcade', robots: 'noindex, follow', alternates: [], xDefault: null, jsonLd: '' }
    const nfPage = buildHead(template, nfUrl, nfHead, SITE_URL, SEASON_THEME)
      .replace(/\n\s*<link rel="canonical"[^>]*>/, '')
      .replace(/\n\s*<meta property="og:url"[^>]*>/, '')
      .replace('<div id="root"></div>', `<div id="root">${nfHtml}</div>`)
    fs.writeFileSync(path.join(dist, '404.html'), nfPage)
    console.log('[prerender] page 404 écrite')
  } catch (e) {
    failed.push('404 : ' + (e && e.message))
  }

  // Miniatures légères (A-001) : chaque jeu doit avoir ses variantes WebP.
  const thumbs = new Set()
  for (const u of urls) { const m = u.match(/^\/game\/([\w-]+)$/); if (m) thumbs.add(m[1]) }
  const noVariant = [...thumbs].filter(id => !fs.existsSync(path.join(dist, 'thumbnails', 'w640', id + '.webp')))
  if (noVariant.length) console.warn('[prerender] miniatures WebP manquantes (lancer python3 scripts/optimize-images.py) : ' + noVariant.join(', '))
  else console.log('[prerender] miniatures WebP : complètes')

  // Sitemap : toute URL prérendue absente de sitemap.xml y est ajoutée
  // automatiquement (date du jour), pour qu'aucun jeu ni article ne soit oublié.
  const smPath = path.join(dist, 'sitemap.xml')
  if (fs.existsSync(smPath)) {
    let sm = fs.readFileSync(smPath, 'utf8')
    const today = new Date().toISOString().slice(0, 10)
    const missing = urls.filter(u => !sm.includes(`<loc>${SITE_URL}${u === '/' ? '/' : u}</loc>`))
    if (missing.length) {
      const add = missing.map(u => `  <url>\n    <loc>${SITE_URL}${u}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${u.startsWith('/game/') ? 'weekly' : 'monthly'}</changefreq>\n    <priority>${u.startsWith('/game/') ? '0.9' : '0.6'}</priority>\n  </url>\n`).join('')
      sm = sm.replace('</urlset>', add + '</urlset>')
      fs.writeFileSync(smPath, sm)
      console.log('[prerender] sitemap : ajout automatique de ' + missing.join(', '))
    }
  }
  failed.forEach(f => console.warn('[prerender] échec ' + f))
  // Échec du build si trop de pages ratent : Vercel garde alors la
  // version précédente en ligne au lieu de publier un site sans contenu.
  if (ok === 0 || failed.length > urls.length * 0.2) process.exit(1)
}

main().then(() => process.exit(0), e => { console.error('[prerender] erreur fatale', e); process.exit(1) })
