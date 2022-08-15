
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
        <p className="footer-links-item">Legal Stuff</p>
        <span className="footer-links-item">|</span>
        <p className="footer-links-item">Privacy Policy</p>
        <span className="footer-links-item">|</span>
        <p className="footer-links-item">About Us</p>
      </div>
    </footer>
  );
}


