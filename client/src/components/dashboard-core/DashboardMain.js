import "../../stylesheet/DashboardMain.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboard,
  faPersonCirclePlus,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router";
import axios from 'axios';

import EventStatistic from "../dashboard-content/EventStatistic";
import TransactionHistory from "../dashboard-content/TransactionHistory";
import ProfileEdit from "../dashboard-content/Profile";
import Organize from "../dashboard-content/Organize";
import Browse from "../dashboard-content/Browse";
import Dropdown from "../dashboard-content/Dropdown";
import PortfolioList from "./PortfolioList";



const findPortfolioStocksAndSharesPrice = function (transactions) {
  let stockAndShares = [];
  let stockTracker = [];

  transactions.map((transaction) => {

    if (stockAndShares.length === 0) {
      stockAndShares.push({
        stock: transaction.symbol,
        shares: transaction.number_of_shares,
        totalAmount: transaction.number_of_shares * transaction.price
      })

      stockTracker.push(transaction.symbol)
    } else {

      stockAndShares.forEach((item, index, array) => {
        if (transaction.symbol === item.stock) {
          item.shares += transaction.number_of_shares

          let priceTotal = transaction.number_of_shares * transaction.price

          item.totalAmount += priceTotal
        }

        if (!stockTracker.includes(transaction.symbol)) {
          stockAndShares.push({
            stock: transaction.symbol,
            shares: transaction.number_of_shares,
            totalAmount: transaction.number_of_shares * transaction.price
          })

          stockTracker.push(transaction.symbol)
        }




        if (index + 1 === array.length) {


          if (!stockTracker.includes(transaction.symbol)) {

            stockAndShares.push({
              stock: transaction.symbol,
              shares: transaction.number_of_shares,
              totalAmount: transaction.number_of_shares * transaction.price
            })
          }



        }


      })





    }

  })

  return stockAndShares
}


const removeZeroStocks = function (portfolioStocksAndShares) {

  for (let index in portfolioStocksAndShares) {
    if (portfolioStocksAndShares[index].shares === 0) {
      portfolioStocksAndShares.splice(index, 1)
    }

  }

  return portfolioStocksAndShares
}




export default function Dashboard(props) {
  const navigate = useNavigate();

  // const dataSet = [
  //   { symbol: "APPL", price: 166.13, share: 50 },
  //   { symbol: "APPL", price: 166.13, share: 50 },
  //   { symbol: "APPL", price: 166.13, share: 50 },
  //   { symbol: "APPL", price: 166.13, share: 50 },
  //   { symbol: "APPL", price: 166.13, share: 50 },
  //   { symbol: "APPL", price: 166.13, share: 50 },
  //   { symbol: "APPL", price: 166.13, share: 50 },
  //   { symbol: "APPL", price: 166.13, share: 50 },
  //   { symbol: "APPL", price: 166.13, share: 50 },
  //   { symbol: "APPL", price: 166.13, share: 50 },
  //   { symbol: "APPL", price: 166.13, share: 50 },
  //   { symbol: "APPL", price: 166.13, share: 50 },
  //   { symbol: "APPL", price: 166.13, share: 50 },
  //   { symbol: "APPL", price: 166.13, share: 50 },
  // ];

  // const portfolioData = dataSet.map((each, index) => {
  //   return (
  //     <tr key={index}>
  //       <td>{each.symbol}</td>
  //       <td>${each.price}</td>
  //       <td>{each.share}</td>
  //     </tr>
  //   );
  // });

  const [component, setComponent] = useState("EventStatistic");

  const [portfolioDetails, setPortfolioDetails] = useState({
    cash: null,
    daysLeft: null,
    cashAssets: null,
    stockListDetails: []
  })

  const logout = () => {
    localStorage.clear();

    props.setState({
      user: null,
      competitions: [],
      competitions_created: {},

      user_competitions_created: [],
      user_competitions_enrolled: [],

      transactions: [],
      competitions_enrolled: [],
      current_competition: {},
    });
    navigate("/");
  };






  useEffect(() => {

    Promise.all([
      axios.post("/api/charts/portfolio", {
        data: {
          user: props.state.user,
          user_competitions: props.current_competition
        }
      }),
      axios.post("/api/charts/pie", {
        data: {
          user: props.state.user,
          user_competitions: props.current_competition
        }
      }),


    ]).then(response => {

      let user_balance_info = response[0].data[0]




      let currentDate = new Date().getTime();

      let endDate = new Date(props.current_competition.end_date).getTime();

      // its rounded so not sure if calc is spot on
      let dayDifference = Math.round((endDate - currentDate) / (1000 * 60 * 60 * 24))



      //console.log(response[1].data)

      let newTransactions = response[1].data

      let allPortfolioStocksInfo = findPortfolioStocksAndSharesPrice(newTransactions)

      //console.log(allPortfolioStocksInfo)


      let portfolioStocksInfo = removeZeroStocks(allPortfolioStocksInfo)

      //console.log(portfolioStocksInfo)

      let updatedStockTotal = 0

      portfolioStocksInfo.forEach((stock) => {
        updatedStockTotal += stock.shares * stock.totalAmount
      })

      //console.log(portfolioStocksInfo)
      //console.log(updatedStockTotal)


      // portfolioStocksInfo.forEach((stock) => {

      //   axios.get(`https://cloud.iexapis.com/stable/stock/${stock.stock}/quote?token=${process.env.REACT_APP_CLOUD_TOKEN}`)

      //     .then(response => {

      //       let marketPrice = response.data.iexAskPrice

      //       let marketEquity = stock.shares * marketPrice


      //       let updatedEquity = props.user_balance.user_balance + marketEquity

      //       console.log (response)


      //       props.setState(prev => ({
      //         ...prev,
      //         user_balance: user_balance_info,
      //         transactions: newTransactions
      //       }))


      //       setPortfolioDetails(prev => ({
      //         ...prev,
      //         cash: props.state.user_balance.user_balance,
      //         daysLeft: dayDifference,
      //         cashAssets: updatedEquity,
      //         stockListDetails: portfolioStocksInfo
      //       }))

      //     })

      // })







      let updatedEquity = props.user_balance.user_balance + updatedStockTotal


      //console.log (updatedEquity)

      props.setState(prev => ({
        ...prev,
        user_balance: user_balance_info,
        transactions: newTransactions
      }))


      setPortfolioDetails(prev => ({
        ...prev,
        cash: props.state.user_balance.user_balance,
        daysLeft: dayDifference,
        cashAssets: updatedEquity,
        stockListDetails: portfolioStocksInfo
      }))


    })



  }, [props.current_competition])









  // const [toggle, setToggle] = useState(false)
  // const toggleClick = () => {
  //   setToggle(!toggle)
  // }

  // const [graph, setGraph] = useState("graph 1")

  return (
    <div id="page-container">
      <nav id="portfolio-side-nav">
        <div id="company-name">
          <span>BayStreetBets</span>
        </div>

        <div id="top-nav">
          <ul>
            <li
              id="side-nav-dashboard"
              onClick={() => {
                setComponent("EventStatistic");
              }}
            >
              <FontAwesomeIcon icon={faClipboard} />
              <Dropdown
                title="Dashboard"
                items={props.user_competitions_enrolled}
                setState={props.setState}
                state={props.state}
              />
            </li>
            <li onClick={() => setComponent("Browse")}>
              <FontAwesomeIcon icon={faClipboard} />
              <span>Browse</span>
            </li>
            <li onClick={() => setComponent("Organize")}>
              <FontAwesomeIcon icon={faClipboard} />
              <span>Organize Event</span>
            </li>
          </ul>
        </div>

        <div id="user-details">
          <div className="user-details-block">
            <span className="user-details-section">Cash on Hand:</span>
            <span>{portfolioDetails.cash ? `$${portfolioDetails.cash}` : 'NONE'}</span>
          </div>
          <div className="user-details-block">
            <span className="user-details-section">Days Left:</span>
            <span>{portfolioDetails.daysLeft ? `${portfolioDetails.daysLeft} Days` : 'NOTHING'}</span>
          </div>
          <div className="user-details-block">
            <span className="user-details-section">CASH & ASSET:</span>
            <span>{portfolioDetails.cashAssets ? `$${portfolioDetails.cashAssets}` : 'empty, such poor'}</span>
          </div>
        </div>

        <div id="portfolio">
          <header id="portfolio-header">
            <span>PORTFOLIO</span>
            <button onClick={() => setComponent("TransactionHistory")}>
              Transaction
            </button>
          </header>

          <table id="portfolio-table-category">
            <thead>
              <tr>
                <th>SYMBOL</th>
                <th>PRICE</th>
                <th>SHARES</th>
              </tr>
            </thead>
          </table>

          <article>
            <table id="portfolio-table">
              <tbody>

                <PortfolioList
                  stockList={portfolioDetails.stockListDetails}

                />

              </tbody>
            </table>
          </article>
        </div>

        <div id="bottom-nav">
          <ul>
            <li>
              <FontAwesomeIcon icon={faUser} />
              <span onClick={() => setComponent("ProfileEdit")}>Profile</span>
            </li>
            <li>
              <FontAwesomeIcon icon={faRightFromBracket} />
              <span onClick={logout}>Log Out</span>
            </li>
          </ul>
        </div>
      </nav>
      <article id="portfolio-side-article">

        {component === "EventStatistic" && <EventStatistic
          state={props.state}
          setState={props.setState}
          competitions_enrolled={props.competitions_enrolled}
          current_competition={props.current_competition}
          transactions={props.transactions}
          user_balance={props.user_balance}
          user_profile={props.user_profile}
        />}

        {component === "TransactionHistory" && <TransactionHistory
          state={props.state}
          setState={props.setState}
          competitions_enrolled={props.competitions_enrolled}
          current_competition={props.current_competition}
          transactions={props.transactions}
        />}

        {component === "ProfileEdit" && <ProfileEdit
          user_profile={props.user_profile}
          setState={props.setState}
          setComponent={setComponent}
        />}

        {component === "Organize" && <Organize
          user={props.user}
          setState={props.setState}
          state={props.state}
          setComponent={setComponent}
        />}

        {component === "Browse" && <Browse
          competitions={props.competitions}
          user_competitions_created={props.user_competitions_created}
          user_competitions_enrolled={props.user_competitions_enrolled}
          setState={props.setState}
          state={props.state}
        />}
      </article>
    </div>
  );
}
