const formateDate = (date) => {
  return (new Date(date).toLocaleDateString())
};

export default function TransactionHistoryItem(props) {
  const { transactions } = props;
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
            <td>{`${formateDate(transaction.transaction_date)}`}</td>
          </tr>
        </tbody>
      );
    })
    : null;

  return listed;
}