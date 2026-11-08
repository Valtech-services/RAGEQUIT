// ─────────────────────────────────────────────────────────────────────────
//  Hauteur réellement visible pour un jeu plein écran sur mobile.
//  Safari iOS ne prévient pas toujours quand sa barre du bas (adresse +
//  boutons) réapparaît : visualViewport peut rester sur la hauteur « barres
//  masquées » et le bas du jeu passe sous la barre. On combine donc :
//    - visualViewport.height (zoom, clavier, barres qui se replient) ;
//    - une sonde CSS de 100svh, la hauteur garantie avec toutes les barres
//      du navigateur affichées : on ne descend jamais plus bas ;
//    - une vérification régulière (4 fois par seconde) pendant la partie.
//  Le callback reçoit { height, top } en pixels CSS.
// ─────────────────────────────────────────────────────────────────────────
export function watchVisibleViewport(onChange) {
  if (typeof window === 'undefined') return () => {}
  const vv = window.visualViewport
  const probe = document.createElement('div')
  probe.setAttribute('aria-hidden', 'true')
  probe.style.cssText = 'position:fixed;left:0;top:0;width:0;height:100vh;height:100svh;visibility:hidden;pointer-events:none;'
  document.body.appendChild(probe)

  let last = ''
  const apply = () => {
    const vvH = vv ? vv.height : window.innerHeight
    const svh = probe.offsetHeight || Infinity
    const height = Math.round(Math.min(vvH, svh, window.innerHeight || Infinity))
    const top = Math.round(vv ? Math.max(0, vv.offsetTop) : 0)
    const key = height + ':' + top
    if (key === last) return
    last = key
    onChange({ height, top })
  }

  apply()
  const late = [setTimeout(apply, 150), setTimeout(apply, 500), setTimeout(apply, 1200)]
  const poll = setInterval(apply, 250)
  vv?.addEventListener('resize', apply)
  vv?.addEventListener('scroll', apply)
  window.addEventListener('resize', apply)
  window.addEventListener('orientationchange', apply)
  return () => {
    late.forEach(clearTimeout)
    clearInterval(poll)
    vv?.removeEventListener('resize', apply)
    vv?.removeEventListener('scroll', apply)
    window.removeEventListener('resize', apply)
    window.removeEventListener('orientationchange', apply)
    probe.remove()
  }
}
