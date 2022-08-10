import { useState } from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'

let assets = [
  { stock: 'AAPL', amount: 159.60, percentage: '8%' },
  { stock: 'TSLA', amount: 1000, percentage: '54%' },
  { stock: 'TWTR', amount: 53.60, percentage: '3%' },
  { stock: 'GOOGL', amount: 500, percentage: '27%' },
  { stock: 'LCID', amount: 120.20, percentage: '8%' },
]

const randomColour = function () {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return "rgb(" + r + "," + g + "," + b + ")";
};



export default function AssetChart(props) {
  console.log(props.transactions)

  // let totalAmount = 0;
  // props.transactions.map((transaction) => {
  //   totalAmount += (transaction.number_of_shares * transaction.price)
  // })

  // let stockList = []
  // props.transactions.map((transaction) => {
  //   if (!stockList.includes(transaction.symbol)) {
  //     stockList.push(transaction.symbol)
  //   }
  // })

  let stockAndShares = {};
  props.transactions.map((transaction) => {
    if (!stockAndShares[transaction.symbol]) {
      stockAndShares[transaction.symbol] = transaction.number_of_shares
    } else {
      stockAndShares[transaction.symbol] = stockAndShares[transaction.symbol] + transaction.number_of_shares
    }
  })

  console.log ("before removal of stock and shares", stockAndShares)

  let keys = Object.keys(stockAndShares)

  for (let key of keys) {
    if (stockAndShares[key] === 0) {
      delete stockAndShares[key]
    }
  }

  console.log ("after removal of stock and shares", stockAndShares)

  let finalAssets = []
  let totalAmount = 0;
  keys = Object.keys(stockAndShares)

  keys.map((key) => {
    let stockAmount = 0;
    props.transactions.map((transaction) => {
      if (key === transaction.symbol) {
        totalAmount += transaction.price * transaction.number_of_shares
        stockAmount += transaction.price * transaction.number_of_shares
      }
    })


    finalAssets.push(
      {
        stock: key,
        amount: stockAmount,
        percentage: (Math.floor((stockAmount / totalAmount) * 100))
      }
    )
  })


  console.log("final assets", finalAssets)



  const colours = [];

  // for (let length of assets) {
  //   colours.push(randomColour())
  // }

  for (let length of finalAssets) {
    colours.push(randomColour())
  }

  const [pieData, setpieData] = useState({
    labels: finalAssets.map((asset) => `${asset.stock} (${asset.percentage})`),
    datasets: [{
      data: finalAssets.map((asset) => asset.amount),
      backgroundColor: colours
    }]
  })

  return (
    <Pie data={pieData} options={{
      maintainAspectRatio: false,

    }} />
  )

}