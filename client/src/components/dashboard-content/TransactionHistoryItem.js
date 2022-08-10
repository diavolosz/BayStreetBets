import { useEffect, useState } from 'react'

export default function TransactionHistoryItem(props) {
  const { transactions } = props

  console.log (transactions.transactions)

  let listed = transactions.transactions.map((transaction) => {
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
    listed
  )
}