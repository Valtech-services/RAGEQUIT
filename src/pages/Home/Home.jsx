import BentoGrid from '../../components/BentoGrid/BentoGrid'
import SeoBlock from '../../components/SeoBlock/SeoBlock'
import Footer from '../../components/Footer/Footer'
import { siteSeo } from '../../data/games'
import './Home.css'

/*
  Home — page d'accueil.
  La BentoGrid gère elle-même la Navbar en mode floating (posée sur le
  trou réservé en haut à gauche, suit le scroll). Rien d'autre à faire ici.
*/
export default function Home() {
  return (
    <div className="home">
      <BentoGrid showNav={true} />
      <SeoBlock type="site" data={siteSeo} />
      <Footer />
    </div>
  )
}
