import { useState } from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'

let assets = [
  {stock: 'AAPL', amount: 159.60, percentage: '8%'},
  {stock: 'TSLA', amount: 1000, percentage: '54%'},
  {stock: 'TWTR', amount: 53.60, percentage: '3%'},
  {stock: 'GOOGL', amount: 500, percentage: '27%'},
  {stock: 'LCID', amount: 120.20, percentage: '8%'},
]

const randomColour = function() {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return "rgb(" + r + "," + g + "," + b + ")";
};

const colours = [];

for (let length of assets) {
  colours.push(randomColour())
}

export default function AssetChart() {

  const [userData, setUserData] = useState({
    labels: assets.map((asset) => `${asset.stock} (${asset.percentage})`),
    datasets: [{
      data: assets.map((asset) => asset.amount),
      backgroundColor: colours
    }]
  })

  return (
    <Pie data={userData} options={{maintainAspectRatio: false}}/>
  )

}