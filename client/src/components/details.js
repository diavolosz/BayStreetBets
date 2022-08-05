import '../stylesheet/details.scss';
import Aos from 'aos';
import "aos/dist/aos.css"
import { useEffect } from 'react';

export default function Details() {


  useEffect(() => {
    Aos.init({ duration: 500 })
  }, [])

  return (
    <div className="description-block-1" >
      <p data-aos="fade-right" id="quote" className='blockquote'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p> 
      <img data-aos="fade-left" id="img1" src="img/stock1.jpg" alt="building1" />
      <img data-aos="fade-left" id="img2" src="img/stock2.jpeg" alt="building2" />
    </div>
  );
}
