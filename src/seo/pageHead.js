/* =====================================================================
   pageHead.js — titre, description, versions linguistiques et données
   structurées (JSON-LD) de chaque URL publique.
   Partagé par le prérendu (entry-server.jsx -> scripts/prerender.mjs) et
   par le navigateur (hooks/usePageTitle.js) : le titre de l'onglet reste
   identique au HTML prérendu, dans la langue de l'URL (points A-003, A-005).
   ===================================================================== */
import { getGames, getCategories, getPosts, getSiteSeo } from '../data/localized'
import { legalFor } from '../data/legalSource'
import { ALL_CONTENT_LANGS, LOCALES, RTL_LANGS, langFromPath, stripLang, withLang } from '../i18n/locale'

export const SITE_URL = 'https://ragequit-arcade.com'
const BRAND = 'Ragequit Arcade'
/* Image de partage par défaut (A-008) : 1200x630, logo + jeux. */
export const SHARE_IMAGE = '/og-image.jpg'
const SOCIALS = [
  'https://www.instagram.com/ragequit_arcade/',
  'https://www.tiktok.com/@ragequit.arcade',
  'https://www.facebook.com/profile.php?id=61590613932840',
  'https://x.com/ragequitarcade',
]

/* Libellés des pages sans contenu dédié (blog, classement), par langue. */
const UI = {
  en: { blog: 'Blog', blogDesc: 'Guides, tips and stories from Ragequit Arcade. Learn how to master our free browser games and get the highest scores.', lb: 'Leaderboards', lbDesc: 'Global leaderboards for every free game on Ragequit Arcade. See the best scores, find your rank and challenge the top players.' },
  fr: { blog: 'Blog', blogDesc: 'Guides, astuces et coulisses de Ragequit Arcade. Apprenez à maîtriser nos jeux gratuits en ligne et à battre les meilleurs scores.', lb: 'Classements', lbDesc: 'Les classements mondiaux de tous les jeux gratuits de Ragequit Arcade. Découvrez les meilleurs scores, votre rang et défiez les meilleurs joueurs.' },
  es: { blog: 'Blog', blogDesc: 'Guías, consejos e historias de Ragequit Arcade. Aprende a dominar nuestros juegos gratis en el navegador y a conseguir las mejores puntuaciones.', lb: 'Clasificaciones', lbDesc: 'Las clasificaciones mundiales de todos los juegos gratis de Ragequit Arcade. Mira las mejores puntuaciones, encuentra tu puesto y reta a los mejores.' },
  de: { blog: 'Blog', blogDesc: 'Guides, Tipps und Geschichten von Ragequit Arcade. Lerne, unsere kostenlosen Browserspiele zu meistern und die besten Punktzahlen zu holen.', lb: 'Ranglisten', lbDesc: 'Die weltweiten Ranglisten aller kostenlosen Spiele auf Ragequit Arcade. Sieh dir die besten Punktzahlen an, finde deinen Rang und fordere die Besten heraus.' },
  it: { blog: 'Blog', blogDesc: 'Guide, consigli e storie di Ragequit Arcade. Impara a padroneggiare i nostri giochi da browser gratis e a ottenere i punteggi più alti.', lb: 'Classifiche', lbDesc: 'Le classifiche mondiali di tutti i giochi gratis di Ragequit Arcade. Scopri i punteggi migliori, trova la tua posizione e sfida i migliori giocatori.' },
  tr: { blog: 'Blog', blogDesc: 'Ragequit Arcade\'den rehberler, ipuçları ve hikâyeler. Ücretsiz tarayıcı oyunlarımızda ustalaşmayı ve en yüksek skorları almayı öğren.', lb: 'Sıralamalar', lbDesc: 'Ragequit Arcade\'deki tüm ücretsiz oyunların dünya sıralamaları. En iyi skorları gör, yerini bul ve en iyilere meydan oku.' },
  ru: { blog: 'Блог', blogDesc: 'Гайды, советы и истории от Ragequit Arcade. Узнай, как освоить наши бесплатные браузерные игры и набирать лучшие результаты.', lb: 'Рейтинги', lbDesc: 'Мировые рейтинги всех бесплатных игр Ragequit Arcade. Смотри лучшие результаты, находи своё место и бросай вызов лучшим.' },
  ja: { blog: 'ブログ', blogDesc: 'Ragequit Arcade の攻略ガイド、コツ、ストーリー。無料ブラウザゲームを極めてハイスコアを狙おう。', lb: 'ランキング', lbDesc: 'Ragequit Arcade の全無料ゲームの世界ランキング。トップスコアを確認し、自分の順位を見つけて、上位プレイヤーに挑戦しよう。' },
  ar: { blog: 'المدونة', blogDesc: 'أدلة ونصائح وقصص من Ragequit Arcade. تعلّم كيف تتقن ألعاب المتصفح المجانية لدينا وتحقق أعلى النتائج.', lb: 'لوحات الصدارة', lbDesc: 'لوحات الصدارة العالمية لكل الألعاب المجانية في Ragequit Arcade. شاهد أفضل النتائج واعثر على ترتيبك وتحدَّ الأفضل.' },
  nl: { blog: 'Blog', blogDesc: 'Gidsen, tips en verhalen van Ragequit Arcade. Leer onze gratis browsergames beheersen en haal de hoogste scores.', lb: 'Klassementen', lbDesc: 'De wereldwijde klassementen van alle gratis games op Ragequit Arcade. Bekijk de beste scores, vind je positie en daag de toppers uit.' },
  pl: { blog: 'Blog', blogDesc: 'Poradniki, wskazówki i historie od Ragequit Arcade. Naucz się opanować nasze darmowe gry przeglądarkowe i zdobywaj najwyższe wyniki.', lb: 'Rankingi', lbDesc: 'Światowe rankingi wszystkich darmowych gier w Ragequit Arcade. Zobacz najlepsze wyniki, sprawdź swoją pozycję i rzuć wyzwanie najlepszym.' },
  pt: { blog: 'Blog', blogDesc: 'Guias, dicas e histórias da Ragequit Arcade. Aprenda a dominar os nossos jogos gratuitos no navegador e a conseguir as melhores pontuações.', lb: 'Classificações', lbDesc: 'As classificações mundiais de todos os jogos gratuitos da Ragequit Arcade. Veja as melhores pontuações, descubra a sua posição e desafie os melhores.' },
}

/* Titre, description, image, langue et versions linguistiques de chaque URL.
   matched = false pour une URL inconnue (page 404, admin). */
export function pageHead(url) {
  const lang = langFromPath(url)
  const path = stripLang(url)
  const site = getSiteSeo(lang)
  const ui = UI[lang] || UI.en
  const def = { title: site.title, description: site.description, image: SHARE_IMAGE }
  const [, section, id] = path.split('/')
  let h = null
  if (path === '/') {
    h = def
  } else if (section === 'game' && id) {
    const g = getGames(lang).find(x => x.id === id)
    if (g) h = { title: g.seo?.title || g.title + ' | ' + BRAND, description: g.seo?.metaDescription || def.description, image: g.thumbnail }
  } else if (section === 'category' && id) {
    const c = getCategories(lang).find(x => x.id === id && x.id !== 'all')
    if (c) h = { title: c.seo?.title || c.label + ' | ' + BRAND, description: c.seo?.metaDescription || def.description, image: c.image || def.image }
  } else if (section === 'blog' && id) {
    const p = getPosts(lang).find(x => x.slug === id)
    if (p) h = { title: p.seo?.title || p.title + ' | ' + BRAND, description: p.seo?.metaDescription || p.excerpt, image: p.image || def.image }
  } else if (section === 'blog' && path === '/blog') {
    h = { title: ui.blog + ' | ' + BRAND, description: ui.blogDesc, image: def.image }
  } else if (section === 'leaderboard' && path === '/leaderboard') {
    h = { title: ui.lb + ' | ' + BRAND, description: ui.lbDesc, image: def.image }
  } else if (section === 'legal' && id) {
    const l = legalFor(lang)[id]
    if (l) h = { title: l.title + ' | ' + BRAND, description: (l.sections?.[0]?.paragraphs?.[0] || def.description).slice(0, 155), image: def.image }
  }
  const matched = !!h
  const alternates = ALL_CONTENT_LANGS.map(l => ({ lang: l, href: SITE_URL + withLang(path, l) }))
  return { ...(h || def), matched, lang, locale: (LOCALES[lang] || 'en-US').replace('-', '_'), dir: RTL_LANGS.includes(lang) ? 'rtl' : 'ltr', alternates, xDefault: SITE_URL + path }
}

/* ---------- Données structurées schema.org (JSON-LD) ---------- */
const abs = u => (!u ? undefined : u.startsWith('http') ? u : SITE_URL + u)
const ORG_ID = SITE_URL + '/#organization'
const SITE_ID = SITE_URL + '/#website'

function organization() {
  return { '@type': 'Organization', '@id': ORG_ID, name: BRAND, url: SITE_URL + '/', logo: abs('/icon-512.png'), sameAs: SOCIALS }
}

function breadcrumb(lang, items) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: SITE_URL + withLang(it.path, lang) })),
  }
}

function faqPage(faq) {
  if (!faq || !faq.length) return null
  return {
    '@type': 'FAQPage',
    mainEntity: faq.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }
}

/* Objet JSON-LD (@graph) de l'URL, ou null si l'URL est inconnue. */
export function structuredData(url) {
  const h = pageHead(url)
  if (!h.matched) return null
  const { lang } = h
  const path = stripLang(url)
  const [, section, id] = path.split('/')
  const pageUrl = SITE_URL + withLang(path, lang)
  const site = getSiteSeo(lang)
  const home = { name: BRAND, path: '/' }
  const ui = UI[lang] || UI.en
  const graph = []

  if (path === '/') {
    graph.push(organization())
    graph.push({ '@type': 'WebSite', '@id': SITE_ID, url: pageUrl, name: BRAND, description: h.description, inLanguage: lang, publisher: { '@id': ORG_ID } })
    graph.push(faqPage(site.faq))
  } else if (section === 'game') {
    const g = getGames(lang).find(x => x.id === id)
    const cat = getCategories(lang).find(c => c.id === g.category)
    graph.push({
      '@type': 'VideoGame',
      '@id': pageUrl + '#game',
      name: g.title,
      url: pageUrl,
      description: h.description,
      image: abs(g.thumbnail),
      genre: cat ? cat.label : undefined,
      keywords: Array.isArray(g.tags) && g.tags.length ? g.tags.join(', ') : undefined,
      gamePlatform: 'Web browser',
      operatingSystem: 'Any',
      applicationCategory: 'GameApplication',
      inLanguage: lang,
      isAccessibleForFree: true,
      datePublished: g.addedAt || undefined,
      author: { '@id': ORG_ID },
      publisher: { '@id': ORG_ID },
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', availability: 'https://schema.org/InStock', url: pageUrl },
    })
    graph.push(faqPage(g.seo?.faq))
    graph.push(breadcrumb(lang, [home, ...(cat ? [{ name: cat.label, path: '/category/' + cat.id }] : []), { name: g.title, path }]))
    graph.push(organization())
  } else if (section === 'category') {
    const c = getCategories(lang).find(x => x.id === id)
    const list = getGames(lang).filter(g => g.category === id)
    graph.push({
      '@type': 'CollectionPage', url: pageUrl, name: h.title, description: h.description, inLanguage: lang, isPartOf: { '@id': SITE_ID },
      mainEntity: { '@type': 'ItemList', itemListElement: list.map((g, i) => ({ '@type': 'ListItem', position: i + 1, url: SITE_URL + withLang('/game/' + g.id, lang), name: g.title })) },
    })
    graph.push(faqPage(c.seo?.faq))
    graph.push(breadcrumb(lang, [home, { name: c.label, path }]))
  } else if (section === 'blog' && id) {
    const p = getPosts(lang).find(x => x.slug === id)
    graph.push({
      '@type': 'BlogPosting', '@id': pageUrl + '#article', mainEntityOfPage: pageUrl, url: pageUrl,
      headline: p.title, description: h.description, image: abs(p.image), inLanguage: lang,
      datePublished: p.date || undefined, dateModified: p.updated || p.date || undefined,
      author: { '@type': 'Organization', name: p.author || BRAND, url: SITE_URL + '/' },
      publisher: { '@id': ORG_ID },
    })
    graph.push(breadcrumb(lang, [home, { name: ui.blog, path: '/blog' }, { name: p.title, path }]))
    graph.push(organization())
  } else if (section === 'blog') {
    graph.push({ '@type': 'Blog', url: pageUrl, name: h.title, description: h.description, inLanguage: lang, publisher: { '@id': ORG_ID } })
    graph.push(breadcrumb(lang, [home, { name: ui.blog, path }]))
    graph.push(organization())
  } else {
    graph.push({ '@type': 'WebPage', url: pageUrl, name: h.title, description: h.description, inLanguage: lang, isPartOf: { '@id': SITE_ID } })
    graph.push(breadcrumb(lang, [home, { name: h.title.replace(' | ' + BRAND, ''), path }]))
  }
  return { '@context': 'https://schema.org', '@graph': graph.filter(Boolean) }
}

/* Texte prêt à placer dans <script type="application/ld+json">. */
export function structuredDataJson(url) {
  const d = structuredData(url)
  return d ? JSON.stringify(d).replace(/</g, '\\u003c') : ''
}
