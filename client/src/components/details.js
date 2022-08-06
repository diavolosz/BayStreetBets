import '../stylesheet/details.scss';
import Aos from 'aos';
import "aos/dist/aos.css"
import { useEffect } from 'react';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';

export default function Details() {


  useEffect(() => {
    Aos.init({ duration: 8000 })
  }, [])

  return (
    <div>
      <div id="description-block-1" >
        <div data-aos="fade-right">
          <h2>This is the title of some quoteblock</h2>
          <p id="quote" className='blockquote'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
        <img data-aos="fade-left" id="img1" src="img/stock1.jpg" alt="stock1" />
        <img data-aos="fade-left" id="img2" src="img/stock2.jpeg" alt="stock2" />
      </div>

      <div id="description-block-2" >
        <div data-aos="fade-up" id='inner-container-3'>
          <img id="img3" src="img/stock3.jpg" alt="stock3" />
          <span id="small-quote-3">"Many stocks, very trade, such popular, WOW !"</span>
        </div>
        <div data-aos="fade-up" id='inner-container-4'>
          <img data-aos="" id="img4" src="img/stock4.jpg" alt="stock4" />
          <span id="small-quote-4">"The way to become rich is to put all your eggs in one basket and then watch that basket"</span>
        </div>
      </div>

      <AwesomeSlider id="description-block-3">
        <div data-aos="fade-up" data-aos-duration="2500"  className="item">
          <img className="block-3-img"src="img/stock5.jpg" alt="stock4" />
        </div>
        <div data-aos="fade-up" data-aos-duration="2500" className="item">
          <img className="block-3-img"src="img/stock5.jpg" alt="stock4" />
        </div>
        <div data-aos="fade-up" data-aos-duration="2500" className="item">
          <img className="block-3-img"src="img/stock5.jpg" alt="stock4" />
        </div>
        <div data-aos="fade-up" data-aos-duration="2500" className="item">
          <img className="block-3-img"src="img/stock5.jpg" alt="stock4" />
        </div>
      </AwesomeSlider>


    </div>
  );
}
