/* =====================================================================
   postContent.js — texte d'un article dans la langue de la page (A-019)
   Chargé seulement avec ArticlePage et par le prérendu : le texte complet
   des articles (blogContent.js) ne pèse plus sur les autres pages.
   ===================================================================== */
import { posts as basePosts } from './blog'
import { postContent } from './blogContent'
import { TRANSLATIONS, missingTranslations as missingBase } from './localized'

export function baseContent(p) {
  return (p && (p.content || postContent[p.slug])) || []
}

/* Blocs de l'article traduits si la traduction a exactement les mêmes blocs,
   sinon le texte anglais. */
export function getPostContent(slug, lang = 'en') {
  const base = baseContent(basePosts.find(p => p.slug === slug))
  const tr = TRANSLATIONS[lang]?.posts?.[slug]?.content
  return tr && tr.length === base.length ? tr : base
}

/* Contrôle du prérendu : contenus anglais sans traduction complète. */
export function missingTranslations(lang) {
  const t = TRANSLATIONS[lang] || {}
  const posts = basePosts
    .filter(p => !t.posts?.[p.slug] || t.posts[p.slug].content?.length !== baseContent(p).length)
    .map(p => 'post:' + p.slug)
  return [...missingBase(lang), ...posts]
}
