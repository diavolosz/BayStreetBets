import { useEffect, useState } from 'react'
import { Pie } from 'react-chartjs-2'
import Chart from 'chart.js/auto';
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
    if (stockAndShares.length === 0) {
      stockAndShares.push({
        stock: transaction.symbol,
        shares: transaction.number_of_shares,
        totalAmount: transaction.number_of_shares * transaction.price
      })

      stockTracker.push(transaction.symbol)

    } else {

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
          };

          if (item.shares < 1) {
            stockAndShares.splice(index, 1)
            let itemToRemove = stockTracker.indexOf(item.stock);
            stockTracker.splice(itemToRemove, 1)
          };
        })
      }
    }
  })

  return stockAndShares;
}

const finalAssetsV2 = function (stocksWithShares) {

  let finalAssets = [];
  let totalStocks = 0;
  let usedPercent = 0;

  stocksWithShares.forEach((item) => {
    totalStocks += item.shares
  });

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
      );
    }
  })

  return finalAssets;
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

        let stocksAndShares = findPortfolioStocksAndSharesPrice(newTransactions.data)
        let finalAssets = finalAssetsV2(stocksAndShares)

        const colours = [];
        for (let length of finalAssets) {
          colours.push(randomColour())
        };

        let labelList = finalAssets.map((asset) => `${asset.stock} (${asset.percentage})`);

        let datasetList = [{
          data: finalAssets.map((asset) => asset.amount),
          backgroundColor: colours
        }];

        setpieData(prev => ({
          ...prev,
          labels: labelList,
          datasets: datasetList
        }));
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