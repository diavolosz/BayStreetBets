import '../../stylesheet/Dashboard.scss';
import '../../uikit/dist/css/uikit.css'
import Navbar from './Navbar';
import StockChart from './StockChart';



export default function Dashboard() {

  return (

    <div className='main-container'>

      <Navbar />

      <section className='stock-info-view'>


        <section className='chart'>
          <div style={{ width: 600 }}>
            <StockChart />

          </div>
        </section>


        <section className='stocks-details'>

        </section>


      </section>


    </div>
  )
}