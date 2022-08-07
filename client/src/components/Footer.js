
import '../stylesheet/Footer.scss';
import Aos from 'aos';
import "aos/dist/aos.css"
import { useEffect } from 'react';
import { Link } from 'react-router-dom'

export default function Footer() {
  useEffect(() => {
    Aos.init({duration: 800})
  }, [])
  
  return (
    <footer>
      <div id="footer-title">BAYSTREETBETS</div>
      <div id="footer-copyright">Copyright &copy; 2022 BayStreetsBets Inc.</div>
      <div id="footer-links">
        <Link to="/legal-stuff" className="footer-links-item">Legal Stuff</Link>
        <span className="footer-links-item">|</span>
        <Link to="/private-policy" className="footer-links-item">Privacy Policy</Link>
        <span className="footer-links-item">|</span>
        <Link to="/about-us" className="footer-links-item">About Us</Link>
      </div>
    </footer>
  );
}


