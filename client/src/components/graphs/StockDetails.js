import { useState } from 'react'
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

export default function StockDetails() {

  return (
    <div className='stock-details'>
      <div className='info-block'>
        <ul>
          <li>Symbol</li>
          <li>{quote[0].symbol}</li>
        </ul>
      </div>

      <div className='info-block'>
        <ul>
          <li>Bid Price</li>
          <li>{quote[0].bidPrice}</li>
        </ul>
      </div>

      <div className='info-block'>
        <ul>
          <li>Big Size</li>
          <li>{quote[0].bidSize}</li>
        </ul>
      </div>

      <div className='info-block'>
        <ul>
          <li>Ask Price</li>
          <li>{quote[0].askPrice}</li>
        </ul>
      </div>

      <div className='info-block'>
        <ul>
          <li>Ask Size</li>
          <li>{quote[0].askSize}</li>
        </ul>
      </div>

      <div className='info-block'>
        <ul>
          <li>Ask Size</li>
          <li>{quote[0].askSize}</li>
        </ul>
      </div>

      <div className='info-block'>
        <ul>
          <li>Ask Size</li>
          <li>{quote[0].askSize}</li>
        </ul>
      </div>

      <div className='info-block'>
        <ul>
          <li>Ask Size</li>
          <li>{quote[0].askSize}</li>
        </ul>
      </div>

      <div className='info-block'>
        <ul>
          <li>Ask Size</li>
          <li>{quote[0].askSize}</li>
        </ul>
      </div>

      <div className='info-block'>
        <ul>
          <li>Ask Size</li>
          <li>{quote[0].askSize}</li>
        </ul>
      </div>

      <div className='info-block'>
        <ul>
          <li>Ask Size</li>
          <li>{quote[0].askSize}</li>
        </ul>
      </div>


    </div>
  )
}