import BentoGrid from '../../components/BentoGrid/BentoGrid'
import SeoBlock from '../../components/SeoBlock/SeoBlock'
import Footer from '../../components/Footer/Footer'
import { siteSeo } from '../../data/games'
import usePageTitle from '../../hooks/usePageTitle'
import './Home.css'

export default function Home() {
  usePageTitle()   // → "RAGEQUIT — Jeux Gratuits en Ligne"
  return (
    <div className="home">
      <BentoGrid showNav={true} />
      <SeoBlock type="site" data={siteSeo} />
      <Footer />
    </div>
  )
}
