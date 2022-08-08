import '../../stylesheet/EventStatistic.scss'
import StockChart from '../graphs/StockChart'
import AssetChart from '../graphs/AssetChart'
import PortfolioChart from '../graphs/PortfolioChart'
import StockDetails from '../graphs/StockDetails'

export default function EventStatistic() {
  return (
    <div id="portfolio-inner-container">

      <div id="search-box">
        <div className='stock-chart'>
          <div className='search'>
            seach box here
          </div>
          <StockChart />
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