import { useEffect, useState } from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'
import axios from 'axios';

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

      finalAssets.map((asset) => {
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

  useEffect(() => {

    if (props.transactions !== null) {

      axios.post("/api/charts/pie", {
        data: {
          user: props.state.user,
          user_competitions: props.state.current_competition
        }
      }).then(newTransactions => {

        //console.log(newTransactions.data)


        let stocksAndShares = findStocksInPortfolio(newTransactions.data)
        let portfolioStocks = removeZeroStocks(stocksAndShares)
        let finalAssets = createFinalAssets(props.transactions, portfolioStocks)

        const colours = [];

        for (let length of finalAssets) {
          colours.push(randomColour())
        }

        let labelList = finalAssets.map((asset) => `${asset.stock} (${asset.percentage})`)

        //console.log(labelList)

        let datasetList = [{
          data: finalAssets.map((asset) => asset.amount),
          backgroundColor: colours
        }]

        props.setState(prev => ({
          ...prev,
          transactions: newTransactions.data
        }))

        setpieData(prev => ({
          ...prev,
          labels: labelList,
          datasets: datasetList
        }))

      })

     


    }


  }, [props.current_competition])


  return (
    <Pie
      data={pieData}
      options={{
        maintainAspectRatio: false,
        elements: {
          arc: {
            borderWidth: 0
          }
        }

      }} 
      
      
      
      
      />
  )

}