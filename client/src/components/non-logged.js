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
        <span>
        <Link to="/login" className="route-link">LOGIN</Link>
        </span>
        <span>|</span>
        <span>
        <Link to="/signup" className="route-link">SIGNUP</Link>
        </span>
        <span>|</span>
        <span>
          <Link to="/about-us" className="route-link">ABOUT</Link>
        </span>
      </nav>
    </div>
  );
}