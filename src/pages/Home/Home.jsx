import { useEffect } from 'react'
import BentoGrid from '../../components/BentoGrid/BentoGrid'
import SeoBlock from '../../components/SeoBlock/SeoBlock'
import Footer from '../../components/Footer/Footer'
import { siteSeo } from '../../data/games'
import usePageTitle from '../../hooks/usePageTitle'
import { trackPageView } from '../../lib/analytics'
import './Home.css'

export default function Home() {
  usePageTitle()   // → "RAGEQUIT — Jeux Gratuits en Ligne"

  // Enregistre une vue de la page d'accueil (une fois au montage).
  useEffect(() => { trackPageView() }, [])

  return (
    <div className="home">
      <BentoGrid showNav={true} />
      <SeoBlock type="site" data={siteSeo} />
      <Footer />
    </div>
  )
}
