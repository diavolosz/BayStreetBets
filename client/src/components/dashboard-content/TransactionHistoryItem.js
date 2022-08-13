import { useEffect, useState } from "react";

export default function TransactionHistoryItem(props) {
  const { transactions } = props;

  //console.log (transactions)

  let listed;

  listed = transactions.transactions
    ? transactions.transactions.map((transaction, index) => {
        return (
          <tbody key={index}>
            <tr>
              <td>{transaction.symbol}</td>
              <td>{transaction.buy_sell}</td>
              <td>{Math.abs(transaction.number_of_shares)}</td>
              <td>{`$${transaction.price}`}</td>
              <td>{`$${Math.abs(
                transaction.number_of_shares * transaction.price
              )}`}</td>
            </tr>
          </tbody>
        );
      })
    : null;

  return listed;
}