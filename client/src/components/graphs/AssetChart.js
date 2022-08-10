import { useEffect, useState } from 'react'
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



// gets the stocks and totals in portfolio
const findStocksInPortfolio = function (transactions) {
  let stockAndShares = {};

  transactions.map((transaction) => {
    if (!stockAndShares[transaction.symbol]) {
      stockAndShares[transaction.symbol] = transaction.number_of_shares
    } else {
      stockAndShares[transaction.symbol] = stockAndShares[transaction.symbol] + transaction.number_of_shares
    }
  })

  return stockAndShares
}

// gets the stocks in portfolio that are not 0
const removeZeroStocks = function (stockObject) {
  let keys = Object.keys(stockObject)

  for (let key of keys) {
    if (stockObject[key] === 0) {
      delete stockObject[key]
    }
  }

  return stockObject
}

// creates total amount of stock money, finds stock percent and moeny amount, creates final array to generate graph data
const createFinalAssets = function (transactions, stocksToAdd) {
  let finalAssets = []
  let totalAmount = 0;
  let keys = Object.keys(stocksToAdd)

  keys.map((key) => {
    transactions.map((transaction) => {
      if (key === transaction.symbol) {
        totalAmount += transaction.price * transaction.number_of_shares
      }
    })
  })

  keys.map((key, index, array) => {
    let stockAmount = 0

    if (index + 1 !== array.length) {
      transactions.map((transaction) => {
        if (key === transaction.symbol) {
          stockAmount += transaction.price * transaction.number_of_shares
        }
      })

      finalAssets.push(
        {
          stock: key,
          amount: stockAmount,
          percentage: (Math.ceil((stockAmount / totalAmount) * 100))
        }
      )
      
    } else {
      transactions.map((transaction) => {
        if (key === transaction.symbol) {
          stockAmount += transaction.price * transaction.number_of_shares
        }
      })

      let percentSoFar = 0;

      finalAssets.map ((asset) => {
        percentSoFar += asset.percentage
      })

      finalAssets.push(
        {
          stock: key,
          amount: stockAmount,
          percentage: (100 - percentSoFar)
        }
      )
    }
  })

  return finalAssets
}


export default function AssetChart(props) {

  const [pieData, setpieData] = useState({ labels: [], datasets: [] })

  //   // function 1
  //   let stockAndShares = {};
  //   props.transactions.map((transaction) => {
  //     if (!stockAndShares[transaction.symbol]) {
  //       stockAndShares[transaction.symbol] = transaction.number_of_shares
  //     } else {
  //       stockAndShares[transaction.symbol] = stockAndShares[transaction.symbol] + transaction.number_of_shares
  //     }
  //   })

  //   console.log("function 1 output { AAPL: 10, TWTR: 5 }")
  // // function 1

  // // function 2
  //   let keys = Object.keys(stockAndShares)

  //   for (let key of keys) {
  //     if (stockAndShares[key] === 0) {
  //       delete stockAndShares[key]
  //     }
  //   }

  //   console.log("function 2 output { AAPL: 10, TWTR: 5 }")
  // // function 2


  // //  function 3
  //   let finalAssets = []
  //   let totalAmount = 0;
  //   keys = Object.keys(stockAndShares)



  //   keys.map((key) => {
  //     props.transactions.map((transaction) => {
  //       if (key === transaction.symbol) {
  //         totalAmount += transaction.price * transaction.number_of_shares
  //       }
  //     })
  //   })

  //   keys.map((key) => {
  //     let stockAmount = 0
  //     props.transactions.map((transaction) => {
  //       if (key === transaction.symbol) {
  //         stockAmount += transaction.price * transaction.number_of_shares
  //       }
  //     })

  //     finalAssets.push(
  //       {
  //         stock: key,
  //         amount: stockAmount,
  //         percentage: (Math.ceil((stockAmount / totalAmount) * 100))
  //       }
  //     )

  //   })

  //   // function 3

  useEffect(() => {
    let stocksAndShares = findStocksInPortfolio(props.transactions)
    let portfolioStocks = removeZeroStocks(stocksAndShares)
    let finalAssets = createFinalAssets(props.transactions, portfolioStocks)

    const colours = [];

    for (let length of finalAssets) {
      colours.push(randomColour())
    }

    setpieData({
      labels: finalAssets.map((asset) => `${asset.stock} (${asset.percentage})`),
      datasets: [{
        data: finalAssets.map((asset) => asset.amount),
        backgroundColor: colours
      }]
    })


  }, [props.current_competition])



  // console.log ("stocks and shares", stocksAndShares)



  // console.log ("portfolio stocks", portfolioStocks)



  // console.log("final assets", finalAssets)

  // const [pieData, setpieData] = useState({
  //   labels: finalAssets.map((asset) => `${asset.stock} (${asset.percentage})`),
  //   datasets: [{
  //     data: finalAssets.map((asset) => asset.amount),
  //     backgroundColor: colours
  //   }]
  // })

  // setpieData({
  //   labels: finalAssets.map((asset) => `${asset.stock} (${asset.percentage})`),
  //   datasets: [{
  //     data: finalAssets.map((asset) => asset.amount),
  //     backgroundColor: colours
  //   }]
  // })

  return (
    <Pie data={pieData} options={{
      maintainAspectRatio: false,

    }} />
  )

}