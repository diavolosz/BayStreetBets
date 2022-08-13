import { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'

import '../../stylesheet/StockDetails.scss'

import StockDetailsItem from './StockDetailsItem'

export default function StockDetails(props) {
  const [itemDetails, setItemDetails] = useState({
    details: []
  })

  useEffect(() => {
    
    if (props.stockSearch.details !== null) {
      setItemDetails({
        details: props.stockSearch.details
      })
    }

  }, [props.stockSearch])

  return (
    <div className='stock-details'>

      <StockDetailsItem details={itemDetails.details} />

    </div>
  )
}