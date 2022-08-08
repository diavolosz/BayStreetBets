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
        <h5>Symbol</h5>
        <p>{quote[0].symbol}</p>
      </div>

      <div className='info-block'>
        <h5>Symbol</h5>
        <p>{quote[0].symbol}</p>
      </div>

      <div className='info-block'>
        <h5>Symbol</h5>
        <p>{quote[0].symbol}</p>
      </div>

      <div className='info-block'>
        <h5>Symbol</h5>
        <p>{quote[0].symbol}</p>
      </div>

      <div className='info-block'>
        <h5>Symbol</h5>
        <p>{quote[0].symbol}</p>
      </div>

      <div className='info-block'>
        <h5>Symbol</h5>
        <p>{quote[0].symbol}</p>
      </div>

      <div className='info-block'>
        <h5>Symbol</h5>
        <p>{quote[0].symbol}</p>
      </div>

      <div className='info-block'>
        <h5>Symbol</h5>
        <p>{quote[0].symbol}</p>
      </div>

      <div className='info-block'>
        <h5>Symbol</h5>
        <p>{quote[0].symbol}</p>
      </div>

      <div className='info-block'>
        <h5>Symbol</h5>
        <p>{quote[0].symbol}</p>
      </div>

      <div className='info-block'>
        <h5>Symbol</h5>
        <p>{quote[0].symbol}</p>
      </div>

      <div className='info-block'>
        <h5>Symbol</h5>
        <p>{quote[0].symbol}</p>
      </div>

    </div>
  )
}