import { useEffect, useState, Fragment } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'

import '../../stylesheet/StockDetails.scss'

export default function StockDetailsItem(props) {

  console.log(props.details)

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
        <h5>Ask Price</h5>
        <p>${props.details.iexAskPrice}</p>
      </div>

      <div className='info-block'>
        <h5>Bid Price</h5>
        <p>${props.details.iexBidPrice}</p>
      </div>

      <div className='info-block'>
        <h5>52 Week Low</h5>
        <p>${props.details.week52Low}</p>
      </div>

      <div className='info-block'>
        <h5>52 Week High</h5>
        <p>${props.details.week52High}</p>
      </div>

      <div className='info-block'>
        <h5>P/E Ratio</h5>
        <p>{props.details.peRatio}</p>
      </div>

      <div className='info-block'>
        <h5>Currency</h5>
        <p>{props.details.currency}</p>
      </div>

      <div className='info-block'>
        <h5>Volume</h5>
        <p>{props.details.avgTotalVolume}</p>
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