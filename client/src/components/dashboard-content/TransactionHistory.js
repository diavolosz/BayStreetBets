import { useEffect, useState } from 'react';
import axios from 'axios';
import "../../stylesheet/TransactionHistory.scss"

import TransactionHistoryItem from './TransactionHistoryItem';


import { getTransactionsForCompetition } from "../../helpers/selectors";

export default function TransactionHistory(props) {
  const [transactionData, setTransactionData] = useState({
    transactions: null
  })


  useEffect(() => {
    Promise.all([
      axios.post("/api/transactions/history", {
        data: {
          user: props.state.user,
          competition: props.current_competition
        }
      })
    ]).then((newTransactions) => {

      //console.log (newTransactions[0].data)

      setTransactionData(prev => ({
        ...prev,
        transactions: newTransactions[0].data
      }))



      // setTransactionData(prev => ({
      //   ...prev,
      //   transactions: getTransactionsForCompetition(props.state, props.current_competition.id)
      // }))




      // let listed = newTransactions[0].data.map((transaction) => {
      //   return (
      //     <tbody>
      //       <tr>
      //         <td>{transaction.symbol}</td>
      //         <td>{transaction.buy_sell}</td>
      //         <td>{Math.abs(transaction.number_of_shares)}</td>
      //         <td>{`$${transaction.price}`}</td>
      //         <td>{`$${Math.abs(transaction.number_of_shares * transaction.price)}`}</td>
      //       </tr>
      //     </tbody>
      //   )
      // })
    })



  }, [props.current_competition, props.transactions])

  return (
    <div id="transaction-history-container">
      <h1>Transaction History: {props.current_competition ? props.current_competition.name : 'NO COMPETITION'}</h1>
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Buy/Sell</th>
            <th>Shares</th>
            <th>Price per Share</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <TransactionHistoryItem 
        key={transactionData} 
        transactions={transactionData}/>
      </table>
    </div>
  )
}