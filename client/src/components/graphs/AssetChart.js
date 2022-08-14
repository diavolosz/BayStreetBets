import { useEffect, useState } from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'
import axios from 'axios';

const randomColour = function () {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return "rgb(" + r + "," + g + "," + b + ")";
};

const findPortfolioStocksAndSharesPrice = function (transactions) {
  let stockAndShares = [];
  let stockTracker = [];



  transactions.forEach((transaction) => {

    //console.log(stockAndShares)

    if (stockAndShares.length === 0) {

      stockAndShares.push({
        stock: transaction.symbol,
        shares: transaction.number_of_shares,
        totalAmount: transaction.number_of_shares * transaction.price
      })

      stockTracker.push(transaction.symbol)

    } else {

      //console.log(stockTracker.includes(transaction.symbol))

      if (!stockTracker.includes(transaction.symbol)) {

        stockAndShares.push({
          stock: transaction.symbol,
          shares: transaction.number_of_shares,
          totalAmount: transaction.number_of_shares * transaction.price
        })

        stockTracker.push(transaction.symbol)

      } else {
        stockAndShares.forEach((item, index, array) => {

          if (item.stock === transaction.symbol) {
            item.shares += transaction.number_of_shares
            item.totalAmount += transaction.number_of_shares * transaction.price
          }

          //console.log("before splice",item)

          if (item.shares < 1) {

            stockAndShares.splice(index, 1)

            let itemToRemove = stockTracker.indexOf(item.stock);

            stockTracker.splice(itemToRemove, 1)
          }

        })

        //console.log( stockTracker)
      }
    }
  })

  return stockAndShares
}


// gets the stocks and totals in portfolio
// const findStocksInPortfolio = function (transactions) {
//   let stockAndShares = {};

//   transactions.map((transaction) => {
//     if (!stockAndShares[transaction.symbol]) {
//       stockAndShares[transaction.symbol] = transaction.number_of_shares
//     } else {
//       stockAndShares[transaction.symbol] = stockAndShares[transaction.symbol] + transaction.number_of_shares
//     }
//   })

//   return stockAndShares
// }

// gets the stocks in portfolio that are not 0
// const removeZeroStocks = function (stockObject) {
//   let keys = Object.keys(stockObject)

//   for (let key of keys) {
//     if (stockObject[key] === 0) {
//       delete stockObject[key]
//     }
//   }

//   return stockObject
// }

// creates total amount of stock money, finds stock percent and moeny amount, creates final array to generate graph data
// const createFinalAssets = function (transactions, stocksToAdd) {
//   let finalAssets = []
//   let totalAmount = 0;
//   let keys = Object.keys(stocksToAdd)

//   keys.map((key) => {
//     transactions.map((transaction) => {
//       if (key === transaction.symbol) {
//         totalAmount += transaction.price * transaction.number_of_shares
//       }
//     })
//   })

//   keys.map((key, index, array) => {
//     let stockAmount = 0

//     if (index + 1 !== array.length) {
//       transactions.map((transaction) => {
//         if (key === transaction.symbol) {
//           stockAmount += transaction.price * transaction.number_of_shares
//         }
//       })

//       finalAssets.push(
//         {
//           stock: key,
//           amount: stockAmount,
//           percentage: (Math.ceil((stockAmount / totalAmount) * 100))
//         }
//       )

//     } else {
//       transactions.map((transaction) => {
//         if (key === transaction.symbol) {
//           stockAmount += transaction.price * transaction.number_of_shares
//         }
//       })

//       let percentSoFar = 0;

//       finalAssets.map((asset) => {
//         percentSoFar += asset.percentage
//       })

//       finalAssets.push(
//         {
//           stock: key,
//           amount: stockAmount,
//           percentage: (100 - percentSoFar)
//         }
//       )
//     }
//   })

//   return finalAssets
// }





const finalAssetsV2 = function (stocksWithShares) {

  let finalAssets = [];
  let totalStocks = 0;
  let usedPercent = 0;

  stocksWithShares.forEach((item) => {
    totalStocks += item.shares
  })

  stocksWithShares.forEach((item, index, array) => {

    if (index + 1 === array.length) {
      finalAssets.push(
        {
          stock: item.stock,
          amount: item.shares,
          percentage: 100 - usedPercent
        }
      )
    } else {

      usedPercent += (Math.ceil((item.shares / totalStocks) * 100))

      finalAssets.push(


        {
          stock: item.stock,
          amount: item.shares,
          percentage: (Math.ceil((item.shares / totalStocks) * 100))
        }
      )

    }

  })

  return finalAssets
}



















export default function AssetChart(props) {

  const [pieData, setpieData] = useState({
    labels: [],
    datasets: []
  })

  // for current comp change
  useEffect(() => {

    if (props.transactions !== null) {

      axios.post("/api/charts/pie", {
        data: {
          user: props.state.user,
          user_competitions: props.state.current_competition
        }
      }).then(newTransactions => {

        //console.log(newTransactions.data)


        let stocksAndShares = findPortfolioStocksAndSharesPrice(newTransactions.data)

        let finalAssets = finalAssetsV2(stocksAndShares)

        // console.log(stocksAndShares)
        // console.log(portfolioStocks)
        // console.log(finalAssets)


        // let stocksAndShares = findStocksInPortfolio(newTransactions.data)
        // let portfolioStocks = removeZeroStocks(stocksAndShares)
        // let finalAssets = createFinalAssets(newTransactions.data, portfolioStocks)

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


        setpieData(prev => ({
          ...prev,
          labels: labelList,
          datasets: datasetList
        }))

      })

    }

  }, [props.current_competition, props.transactions])




  return (
    <Pie
      data={pieData}
      options={{
        maintainAspectRatio: false,
        elements: {
          arc: {
            borderWidth: 0
          }
        },
        plugins: {
          datalabels: {
            display: false
          }
        }

      }}

    />
  )

}