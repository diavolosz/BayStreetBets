import '../../stylesheet/EventStatistic.scss'
import StockChart from '../graphs/StockChart'
import AssetChart from '../graphs/AssetChart'
import PortfolioChart from '../graphs/PortfolioChart'
import StockDetails from '../graphs/StockDetails'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useForm } from "../../hooks/useForm";
import { useEffect, useState } from 'react'
import axios from 'axios'




export default function EventStatistic(props) {
  const [stockSearch, setStockSearch] = useState ({
    details: null, 
    historical: null
  })

  const search = function (event) {
    event.preventDefault();
    //console.log(event.target[0].value)

    Promise.all ([
      axios.get(`https://cloud.iexapis.com/stable/stock/${event.target[0].value}/quote?token=${process.env.REACT_APP_CLOUD_TOKEN}`),
      axios.get(`https://cloud.iexapis.com/stable/stock/${event.target[0].value}/chart/5d?token=${process.env.REACT_APP_CLOUD_TOKEN}`)
    ])

    .then((response) => {
      setStockSearch(prev => ({
        ...prev,
        details: response[0].data,
        historical: response[1].data
      }))

      console.log(response)

    })
    .catch(e => {
      console.log (e)
    })
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
            <StockChart 
            stockSearch={stockSearch}
            setStockSearch={setStockSearch}
            companyName={stockSearch.details ? stockSearch.details.companyName : null}
            />
          </div>
        </div>
        <div className='stock-details-container'>
          <div className='detail-title'>
            Core Info and Indicators
          </div>
          <StockDetails 
          stockSearch={stockSearch}
          setStockSearch={setStockSearch}
          />
        </div>

      </div>

      <div id="portfolio-change-container">

        <div id="protfolio-change-graph">
          <div className='portfolio-chart'>
            <span>User Portfolio Change (Total Equity Change $)</span>
            <PortfolioChart 
            state={props.state}
            setState={props.setState}
    
            competitions_enrolled={props.competitions_enrolled}
            current_competition={props.current_competition}
            
            transactions={props.transactions}
            user_balance={props.user_balance}
            />
          </div>
        </div>

        <div id="protfolio-change-chart">
          <div className='pie-chart'>
            <div className='asset-title'>Total Asset Breakdown</div>
            <AssetChart 
            state={props.state}
            setState={props.setState}
    
            competitions_enrolled={props.competitions_enrolled}
            current_competition={props.current_competition}
            
            transactions={props.transactions}
            />
          </div>
        </div>

      </div>
    </div>
  )
}