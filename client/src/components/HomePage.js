import NonLogged from './NonLogged'
import Details from './Details';
import Footer from './Footer';

import '../stylesheet/HomePage.scss'

export default function HomePage() {
  return (
    <div className="background-container">
      <img src="img/background.jpg" className="background-image" />
      <NonLogged />
      <Details />
      <Footer />
    </div>
  )
}