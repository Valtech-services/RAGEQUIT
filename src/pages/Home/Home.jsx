import Navbar from '../../components/Navbar/Navbar'
import BentoGrid from '../../components/BentoGrid/BentoGrid'
import SeoBlock from '../../components/SeoBlock/SeoBlock'
import Footer from '../../components/Footer/Footer'
import { siteSeo } from '../../data/games'
import './Home.css'

/*
  Home — page d'accueil.
  La Navbar est sticky au niveau de la page entière : elle suit le scroll
  jusqu'en bas (grille + SeoBlock + Footer), pas seulement la grille.
  Elle occupe visuellement la première "case" en haut à gauche grâce au
  positionnement, et la grille lui réserve la place via une cellule fantôme.
*/
export default function Home() {
  return (
    <div className="home">

      {/* Navbar sticky sur toute la page */}
      <div className="home__navbar">
        <Navbar inGrid={true} />
      </div>

      {/* La grille réserve la place de la navbar (cellule fantôme) */}
      <BentoGrid reserveNav={true} />

      <SeoBlock type="site" data={siteSeo} />
      <Footer />

    </div>
  )
}
