import '../../stylesheet/EventStatistic.scss'
import StockChart from '../graphs/StockChart'
import AssetChart from '../graphs/AssetChart'
import PortfolioChart from '../graphs/PortfolioChart'
import StockDetails from '../graphs/StockDetails'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useForm } from "../../hooks/useForm";

export default function EventStatistic() {

  const search = function (event) {
    event.preventDefault();
    console.log(event.target[0].value)
  }


  return (
    <div id="portfolio-inner-container">

      <div id="search-box">
        <div className='stock-chart'>

          <form className="stock-search-box" onSubmit={search}>
            <input type="text" placeholder="Search Stock ..." name="symbol" />
            <button type='submit'><FontAwesomeIcon className="search-icon" icon={faMagnifyingGlass} /></button>
          </form>
          <div id="stock-chart-container">
            <StockChart />
          </div>
        </div>
        <div className='stock-details-container'>
          <div className='detail-title'>
            Core Info and Indicators
          </div>
          <StockDetails />
        </div>

      </div>

      <div id="portfolio-change-container">

        <div id="protfolio-change-graph">
          <div className='portfolio-chart'>
            <span>User Portfolio Change (Total Equity Change $)</span>
            <PortfolioChart />
          </div>
        </div>

        <div id="protfolio-change-chart">
          <div className='pie-chart'>
            <div className='asset-title'>Total Asset Breakdown</div>
            <AssetChart />
          </div>
        </div>

      </div>
    </div>
  )
}