import { useState } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'

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






export default function PortfolioChart() {

  const [userData, setUserData] = useState({
    labels: portfolio.map((item) => item.date),
    datasets: [{
      label: "User Portfolio Change",
      data: portfolio.map((item) => item.totalEquity)
    }]
  })

let delayed;

  return (

    <Line data={userData} options={{
      maintainAspectRatio: false,
      backgroundColor: 'rgb(0, 0, 255)',
      borderColor: 'rgb(0, 0, 0)',
      color: 'rgb(0, 0, 0)',
      borderWidth: 1,
      pointStyle: 'rectRot',
      pointRadius: 5,
      tension: 0.3,


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