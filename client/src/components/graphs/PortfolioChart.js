import { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'
import axios from 'axios';

// import helpers?
let portfolio = [
  { date: "Jul 6, 22", totalEquity: 10000 },
  { date: "Jul 7, 22", totalEquity: 5000 },
  { date: "Jul 8, 22", totalEquity: 100 },
  { date: "Jul 9, 22", totalEquity: 8000 },
  { date: "Jul 10, 22", totalEquity: 16000 }];

//animation block of code
const totalDuration = 10000;
const delayBetweenPoints = totalDuration / portfolio.length;
const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
const animation = {
  x: {
    type: 'number',
    easing: 'linear',
    duration: delayBetweenPoints,
    from: NaN, // the point is initially skipped
    delay(ctx) {
      if (ctx.type !== 'data' || ctx.xStarted) {
        return 0;
      }
      ctx.xStarted = true;
      return ctx.index * delayBetweenPoints;
    }
  },
  y: {
    type: 'number',
    easing: 'linear',
    duration: delayBetweenPoints,
    from: previousY,
    delay(ctx) {
      if (ctx.type !== 'data' || ctx.yStarted) {
        return 0;
      }
      ctx.yStarted = true;
      return ctx.index * delayBetweenPoints;
    }
  }
};

// takes transaction_date to format like "July 2, 22"
const convertDate = function (dateString) {
  let year = dateString.slice(2, 4)
  let month = dateString.slice(5, 7)

  if (month === '01') {
    month = 'Jan'
  } else if (month === '02') {
    month = 'Feb'
  } else if (month === '03') {
    month = 'Mar'
  } else if (month === '04') {
    month = 'Apr'
  } else if (month === '05') {
    month = 'May'
  } else if (month === '06') {
    month = 'June'
  } else if (month === '07') {
    month = 'July'
  } else if (month === '08') {
    month = 'Aug'
  } else if (month === '09') {
    month = 'Sep'
  } else if (month === '010') {
    month = 'Oct'
  } else if (month === '11') {
    month = 'Nov'
  } else if (month === '12') {
    month = 'Dec'
  }

  let day = dateString.slice(8, 10)

  let date = `${month} ${day}, ${year}`

  return date
}

const getListOfDays = function (transactions) {
  let listOfDays = []

  transactions.map((transaction) => {
    if (!listOfDays.includes(transaction.transaction_date)) {
      listOfDays.push(transaction.transaction_date)
    }
  })

  return listOfDays
}

const createFinalPortfolio = function (listOfDays, transactions, current_competition) {
  let finalPortfolio = [];
  let totalBuyAmount = 0;

  let persisted = []

  listOfDays.map((day) => {

    transactions.map((transaction, index, item) => {
      if (day === transaction.transaction_date) {
        totalBuyAmount += transaction.number_of_shares * transaction.price

        persisted.push({
          stock: transaction.symbol,
          shares: transaction.number_of_shares,
          date: convertDate(transaction.transaction_date)
        })

      }

      if (index + 1 === item.length) {
        // added start amount to dropdown, but is in money format, this changse to num for calc
        if (typeof current_competition.starting_amount === 'string') {
          let slicedNum = current_competition.starting_amount.slice(1, current_competition.starting_amount.length)

          let formatNum = slicedNum.replace(',', '')
          let finalNum = Number(formatNum)

          finalPortfolio.push({
            date: convertDate(day),
            totalEquity: finalNum - totalBuyAmount,
            stocksWithShares: persisted
          })

        } else {


          finalPortfolio.push({
            date: convertDate(day),
            totalEquity: current_competition.starting_amount - totalBuyAmount,
            stocksWithShares: persisted
          })
        }

      }
    })
  })

  return finalPortfolio
}



export default function PortfolioChart(props) {
  const [equityData, setEquityData] = useState({
    labels: [], datasets: []
  })

  useEffect(() => {
    if (props.transactions !== null) {

      axios.post("/api/charts/pie", {
        data: {
          user: props.state.user,
          user_competitions: props.state.current_competition
        }
      }).then(fetchedTransactions => {

        let newTransactions = fetchedTransactions.data

        let dayList = getListOfDays(newTransactions)

        let finalPortfolio = createFinalPortfolio(dayList, newTransactions, props.current_competition)


        let currentStocks = []

        finalPortfolio.forEach((day) => {
          day.stocksWithShares.forEach((item) => {
            if (new Date(day.date) >= new Date(item.date)) {

              if (currentStocks.length === 0) {

                currentStocks.push({
                  stock: item.stock,
                  shares: item.shares
                })

              } else {

                currentStocks.forEach((currentItem) => {
                  if (currentItem.stock !== item.stock) {
                    currentStocks.push({
                      stock: item.stock,
                      shares: item.shares
                    })

                  } else if (currentItem.stock === item.stock) {
                    currentItem.shares += item.shares

                  }
                })
              }
            }
          })

          day['currentStocks'] = currentStocks
          currentStocks = []
        })

        //console.log(finalPortfolio)

        // finalPortfolio.forEach((item) => {

        //   item.stocksWithShares.forEach((stockCall) => {

        //     if (new Date(item.date) >= new Date(stockCall.date)) {


        //       axios.get(`https://cloud.iexapis.com/stable/stock/${stockCall.stock}/quote?token=${process.env.REACT_APP_CLOUD_TOKEN}`)
        //         .then(response => {

        //           let marketPrice = response.data.close


        //           console.log("before call", finalPortfolio)


        //           item.totalEquity += marketPrice * stockCall.shares

        //           console.log("after call", finalPortfolio)

        //         }).then(() => {


        //           let labelList = finalPortfolio.map((day) => {
        //             return day.date
        //           })



        //           let dataList = finalPortfolio.map((day) => {
        //             return day.totalEquity
        //           })







        //           setEquityData(prev => ({
        //             ...prev,
        //             labels: labelList,
        //             datasets: [{
        //               label: "",
        //               data: dataList
        //             }]
        //           }))




        //         })

        //     }


        //   })


        // })




        let labelList = finalPortfolio.map((day) => {
          return day.date
        })



        let dataList = finalPortfolio.map((day) => {
          return day.totalEquity
        })





        setEquityData(prev => ({
          ...prev,
          labels: labelList,
          datasets: [{
            label: "",
            data: dataList
          }]
        }))


      })
    }


  }, [props.current_competition])





  // const [userData, setUserData] = useState({
  //   labels: portfolio.map((item) => item.date),
  //   datasets: [{
  //     label: "",
  //     data: portfolio.map((item) => item.totalEquity)
  //   }]
  // })


  let delayed;

  return (
    <Line data={equityData} options={{
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
      },


      animation: {
        onComplete: () => {
          delayed = true;
        },
        delay: (context) => {
          let delay = 0;
          if (context.type === 'data' && context.mode === 'default' && !delayed) {
            delay = context.dataIndex * 300 + context.datasetIndex * 100;
          }
          return delay;
        },
      },
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true
        }
      }

    }} />
  )
}