import '../stylesheet/Details.scss';
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
          <h2>Trading anywhere else would be unsettling</h2>
          <p id="quote" className='blockquote'>BayStreetBets is building a robust trading simulator platform to provide our user the most realistic trading simulation environment. The competitive element that this unique platform offers will enhance users' ability to practice and develop real-word trading skills in a safe envorinemnt. Whether you are investing for the first time or looking to get more familiar, there is something for you. The BayStreetBets offers over 2,000 equities for you to practice trading and investing in.</p>
        </div>
        <img data-aos="fade-left" id="img1" src="img/stock1.jpg" alt="stock1" />
        <img data-aos="fade-left" id="img2" src="img/stock2.jpeg" alt="stock2" />
      </div>

      <div id="description-block-2" >
        <div data-aos="fade-up" id='inner-container-3'>
          <img id="img3" src="img/stock3.png" alt="stock3" />
          <div>
            <span id="small-quote-3">Practice stock trading with virtual money.</span>
            <p id="small-paragraph-3">No deposit needed. Practice trading with virtual money to sharpen your knowledge of how the stock market works and how to use an online brokerage. The Investopedia Simulator will help you gain confidence before risking your own money.</p>
          </div>
        </div>
        <div data-aos="fade-up" id='inner-container-4'>
          <div>
            <span id="small-quote-4">Trade by yourself or compete with others.</span>
            <p id="small-paragraph-4">Practice trading and investing by yourself or join a game with hundreds of thousands of other like-minded educated investors and compete for the top rank.</p>
          </div>
          <img data-aos="" id="img4" src="img/stock4.jpg" alt="stock4" />
        </div>
      </div>

      <AwesomeSlider id="description-block-3">
        <div data-aos="fade-up" data-aos-duration="2500" className="item">
          <img className="block-3-img" src="img/stock5.jpg" alt="stock4" />
        </div>
        <div data-aos="fade-up" data-aos-duration="2500" className="item">
          <img className="block-3-img" src="img/stock5.jpg" alt="stock4" />
        </div>
        <div data-aos="fade-up" data-aos-duration="2500" className="item">
          <img className="block-3-img" src="img/stock5.jpg" alt="stock4" />
        </div>
        <div data-aos="fade-up" data-aos-duration="2500" className="item">
          <img className="block-3-img" src="img/stock5.jpg" alt="stock4" />
        </div>
      </AwesomeSlider>


    </div>
  );
}
