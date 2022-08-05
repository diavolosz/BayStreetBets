import '../stylesheet/non-logged.scss';
import { Link } from 'react-router-dom'

export default function nonLogged() {
  return (
    <div className="info-container">
      <header>
        <h1>BayStreet</h1>
        <h1>Bets</h1>
      </header>

      <nav>
        <span>LOGIN</span>
        <span>|</span>
        <span>SIGN UP</span>
        <span>|</span>
        <span>
          <Link to="/about-us" className="route-link">ABOUT</Link>
        </span>
      </nav>
    </div>
  );
}