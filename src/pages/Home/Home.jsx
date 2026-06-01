import BentoGrid from '../../components/BentoGrid/BentoGrid'
import SeoBlock from '../../components/SeoBlock/SeoBlock'
import Footer from '../../components/Footer/Footer'
import { siteSeo } from '../../data/games'
import './Home.css'

/*
  Home — page d'accueil.
  La Navbar est intégrée DANS BentoGrid (première cellule sticky).
  Pas de Navbar ici, pas de padding-top à compenser.
*/
export default function Home() {
  return (
    <div className="home">

      {/* BentoGrid contient la navbar + tous les jeux */}
      <BentoGrid />

      {/* Blocs pleine largeur sous la grille */}
      <SeoBlock type="site" data={siteSeo} />
      <Footer />

    </div>
  )
}