import { useEffect, useState, Fragment } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'

import '../../stylesheet/StockDetails.scss'

let quote = [{
  "symbol": "AAPL",
  "sector": "electronictechnology",
  "securityType": "cs",
  "bidPrice": 0,
  "bidSize": 0,
  "askPrice": 0,
  "askSize": 0,
  "lastUpdated": 1659732403127,
  "lastSalePrice": 165.28,
  "lastSaleSize": 400,
  "lastSaleTime": 1659729599447,
  "volume": 973609
}];

export default function StockDetailsItem(props) {

  let block = props.details ?

    <Fragment>



      <div className='info-block'>
        <h5>Symbol</h5>
        <p>{props.details.symbol}</p>
      </div>

      <div className='info-block'>
        <h5>Latest Price</h5>
        <p>${props.details.latestPrice}</p>
      </div>

      <div className='info-block'>
        <h5>High</h5>
        <p>${props.details.high}</p>
      </div>

      <div className='info-block'>
        <h5>Low</h5>
        <p>${props.details.low}</p>
      </div>

      <div className='info-block'>
        <h5>P/E Ratio</h5>
        <p>{props.details.peRatio}</p>
      </div>

      <div className='info-block'>
        <h5>Currency</h5>
        <p>${props.details.currency}</p>
      </div>

      <div className='info-block'>
        <h5>Average Total Volume</h5>
        <p>{props.details.volume}</p>
      </div>

    </Fragment>

    :

    <div className='info-block'>
      <h5>START SEARCHING!!!</h5>
    </div>


  return (

    block

  )
}