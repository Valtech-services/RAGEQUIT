import BentoGrid from '../../components/BentoGrid/BentoGrid'
import SeoBlock from '../../components/SeoBlock/SeoBlock'
import Footer from '../../components/Footer/Footer'
import { siteSeo } from '../../data/games'
import './Home.css' // (inchangé — le wrapper sticky n'est plus utilisé)

/*
  Home — page d'accueil.
  La Navbar n'est plus posée en sticky par-dessus : elle est rendue par la
  BentoGrid comme PREMIÈRE cellule réelle de la grille (carrée, façon Poki).
  Cela garantit un alignement parfait avec les marges de la grille.
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
