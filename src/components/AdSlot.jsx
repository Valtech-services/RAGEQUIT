// Emplacement publicitaire du site. N'affiche RIEN tant que la régie n'est pas
// activée (voir src/lib/ads.js) : pas de cadre vide « Advertisement ».
import { useEffect, useState } from 'react'
import { ADS_ENABLED, SLOTS, displaySlot } from '../lib/ads'
import { hasConsent } from '../lib/consent'

export default function AdSlot({ slot, className = '' }) {
  const id = SLOTS[slot]
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (!ADS_ENABLED || !id) return undefined
    const check = () => setShow(hasConsent())
    check()
    window.addEventListener('rq-consent-change', check)
    return () => window.removeEventListener('rq-consent-change', check)
  }, [id])

  useEffect(() => { if (show) displaySlot(id) }, [show, id])

  if (!show) return null
  return <div className={className}><div id={id} /></div>
}
