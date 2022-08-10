import { useEffect, useState } from 'react';
import axios from 'axios';

import "../../stylesheet/TransactionHistory.scss"


export default function TransactionHistory(prop) {

  //console.log(prop)

  useEffect(() => {
    Promise.all([
      axios.post("/api/transactions", {
        data: {
          user: prop.state.user,
          competition: prop.current_competition
        }
      })
    ]).then((transactions) => {
    //console.log (transactions)
      prop.setState(prev => ({
        ...prev,
        transactions: transactions[0].data
      }));
    })


  }, [])

  let listedTransactions = prop.state.transactions.map((transaction, index) => {

    let total = transaction.number_of_shares * Number (transaction.price.replace('$', ''))

    return (
      <tbody key={index}>
        <tr>
          <td>{transaction.symbol}</td>
          <td>{transaction.buy_sell}</td>
          <td>{transaction.number_of_shares}</td>
          <td>{transaction.price}</td>
          <td>{`$${total}`}</td>
        </tr>
      </tbody>
    )
  })


  return (
    <div id="transaction-history-container">
      <h1>Transaction History: {prop.current_competition.name}</h1>
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