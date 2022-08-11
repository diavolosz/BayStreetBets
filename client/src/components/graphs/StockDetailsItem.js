import { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'

import '../../stylesheet/StockDetails.scss'

export default function StockDetailsItem(props) {

  console.log(props.details)

  let block = props.details ?

    <div className='info-block'>
      <h5>Symbol</h5>
      <p>{props.details.symbol}</p>
    </div>

    : <p>START SEARCHING</p>


  return (

    block

  )
}