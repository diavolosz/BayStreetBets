import { useEffect, useState } from 'react';
import axios from 'axios';

import "../../stylesheet/TransactionHistory.scss"


export default function TransactionHistory(props) {

  //console.log(prop)

  useEffect(() => {
    Promise.all([
      axios.post("/api/transactions", {
        data: {
          user: props.state.user,
          competition: props.current_competition
        }
      })
    ]).then((transactions) => {
      //console.log (transactions)
      props.setState(prev => ({
        ...prev,
        transactions: transactions[0].data
      }));
    })


  }, [props.state.current_competition])

  let listedTransactions = props.state.transactions.map((transaction) => {
    return (
      <tbody>
        <tr>
          <td>{transaction.symbol}</td>
          <td>{transaction.buy_sell}</td>
          <td>{Math.abs(transaction.number_of_shares)}</td>
          <td>{`$${transaction.price}`}</td>
          <td>{`$${Math.abs(transaction.number_of_shares * transaction.price)}`}</td>
        </tr>
      </tbody>
    )
  })


  return (
    <div id="transaction-history-container">
      <h1>Transaction History: {props.current_competition.name}</h1>
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
        {listedTransactions}
      </table>
    </div>
  )
}