import { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import Chart from 'chart.js/auto';

export default function StockChart(props) {
  const [historicalData, setHistoricalData] = useState({
    labels: [],
    datasets: []
  });


  useEffect(() => {
    if (props.stockSearch.historical !== null) {
      setHistoricalData({
        labels: props.stockSearch.historical.map((day) => day.label),
        datasets: [{
          label: `${props.companyName} (${props.stockSearch.historical[0].symbol})`,
          data: props.stockSearch.historical.map((day) => day.close)
        }]

      })
    }
  }, [props.stockSearch])

  return (
    <Line data={historicalData} options={{
      maintainAspectRatio: false,
      backgroundColor: 'rgb(0, 0, 255)',
      borderColor: 'rgb(0, 0, 0)',
      color: 'rgb(0, 0, 0)',
      borderWidth: 1,
      pointStyle: 'rectRot',
      pointRadius: 5,
      tension: 0.3,
      plugins: {
        legend: {
          labels: {
            boxWidth: 0,
            font: {
              size: 17
            }
          }
        }
      }
    }} />
  )
}