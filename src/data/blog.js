/* =====================================================================
   BLOG.JS — Ragequit Arcade
   Articles du blog. Ajouter un article = ajouter une entrée ici.
   Le contenu (content) est un tableau de blocs pour un rendu propre :
     { type: 'p',  text }      → paragraphe
     { type: 'h2', text }      → sous-titre
     { type: 'ul', items:[] }  → liste à puces
   ===================================================================== */

export const posts = [
  // Les articles seront ajoutés ici, un par un.
  // Exemple de structure (à remplir) :
  // {
  //   slug: 'why-we-build-our-own-games',
  //   title: 'Why We Build Our Own Games',
  //   date: '2026-09-01',
  //   author: 'Ragequit Arcade',
  //   excerpt: 'Une phrase de résumé qui donne envie de lire.',
  //   image: '/blog/why-we-build.jpg',
  //   seo: {
  //     title: '... | Ragequit Arcade',
  //     metaDescription: '...',
  //   },
  //   content: [
  //     { type: 'p', text: '...' },
  //     { type: 'h2', text: '...' },
  //     { type: 'p', text: '...' },
  //   ],
  // },
]

// Trouve un article par son slug.
export function getPost(slug) {
  return posts.find(p => p.slug === slug) || null
}
