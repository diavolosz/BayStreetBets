import "../../stylesheet/DashboardMain.scss";

export default function PortfolioList(props) {
  const { stockList } = props;
  let list;

  if (stockList !== null) {
    list = stockList.map((stock, index) => {

      return (
        <tr key={index}>
          <td>{stock.stock}</td>
          <td>${stock.totalAmount}</td>
          <td>{stock.shares}</td>
        </tr>
      );
    });
  }

  return list
}