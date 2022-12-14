import "../../stylesheet/DashboardMain.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboard,
  faRightFromBracket,
  faUser,
  faMagnifyingGlass,
  faCalendarDays
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from 'axios';

import EventStatistic from "../dashboard-content/EventStatistic";
import TransactionHistory from "../dashboard-content/TransactionHistory";
import ProfileEdit from "../dashboard-content/Profile";
import Organize from "../dashboard-content/Organize";
import Browse from "../dashboard-content/Browse";
import Dropdown from "../dashboard-content/Dropdown";

import Leaderboard from "../dashboard-content/Leaderboard";
import PortfolioList from "./PortfolioList";

const findPortfolioStocksAndSharesPrice = function (transactions) {
  let stockAndShares = [];
  let stockTracker = [];

  transactions.forEach((transaction) => {

    if (stockAndShares.length === 0) {
      stockAndShares.push({
        stock: transaction.symbol,
        shares: transaction.number_of_shares,
        totalAmount: transaction.number_of_shares * transaction.price
      });

      stockTracker.push(transaction.symbol);

    } else {

      if (!stockTracker.includes(transaction.symbol)) {

        stockAndShares.push({
          stock: transaction.symbol,
          shares: transaction.number_of_shares,
          totalAmount: transaction.number_of_shares * transaction.price
        });

        stockTracker.push(transaction.symbol)

      } else {
        stockAndShares.forEach((item, index, array) => {

          if (item.stock === transaction.symbol) {
            item.shares += transaction.number_of_shares
            item.totalAmount += transaction.number_of_shares * transaction.price
          };


          if (item.shares < 1) {

            stockAndShares.splice(index, 1)

            let itemToRemove = stockTracker.indexOf(item.stock);

            stockTracker.splice(itemToRemove, 1)
          };
        })
      }
    }
  })

  return stockAndShares;
};

export default function Dashboard(props) {
  const navigate = useNavigate();
  const [component, setComponent] = useState("EventStatistic");
  const [compState, setCompState] = useState('')
  const [portfolioDetails, setPortfolioDetails] = useState({
    cash: null,
    daysLeft: null,
    cashAssets: null,
    stockListDetails: [],
    leaderboardState: null,
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
      axios.post("/api/transactions/history", {
        data: {
          user: props.state.user,
          competition: props.current_competition
        }
      })
    ]).then(response => {

      // empties portfolio list so when switching to empty comp it shows empty properly
      setPortfolioDetails(prev => ({
        ...prev,
        cash: null,
        daysLeft: null,
        cashAssets: null,
        stockListDetails: [],
      }));

      let user_balance_info = response[0].data[0]

      let currentDate = new Date().getTime();
      let startDate = new Date(props.current_competition.start_date).getTime();
      let endDate = new Date(props.current_competition.end_date).getTime();
      let dayDifference = Math.round((endDate - currentDate) / (1000 * 60 * 60 * 24))

      let newTransactions = response[1].data
      let allPortfolioStocksInfo = findPortfolioStocksAndSharesPrice(newTransactions)
      let updatedStockTotal = 0

      if (currentDate > endDate) {
        setCompState('finished')
      } else if (currentDate < endDate && currentDate > startDate) {
        dayDifference = Math.round((endDate - currentDate) / (1000 * 60 * 60 * 24))
        setCompState('in progress')
      } else if (currentDate < startDate) {
        dayDifference = Math.round((startDate - currentDate) / (1000 * 60 * 60 * 24))
        setCompState('not started')
      };


      // FOR LIVE UPDATES

      let updatedEquity = props.user_balance.user_balance
      let LeaderboardStatus = ""

      if (currentDate < startDate) {

        LeaderboardStatus = "EventStatistic"

        setPortfolioDetails(prev => ({
          ...prev,
          cash: user_balance_info.user_balance,
          daysLeft: Math.round((startDate - currentDate) / (1000 * 60 * 60 * 24)),
          cashAssets: user_balance_info.user_balance,
          stockListDetails: allPortfolioStocksInfo,
          leaderboardState: LeaderboardStatus
        }))

        setComponent(LeaderboardStatus)

      }


      allPortfolioStocksInfo.forEach((stock) => {
        axios.get(`https://cloud.iexapis.com/stable/stock/${stock.stock}/quote?token=${process.env.REACT_APP_CLOUD_TOKEN}`)
          .then(response => {

            let marketPrice = response.data.latestPrice
            let marketEquity = stock.shares * marketPrice
            marketEquity = parseInt(marketEquity.toFixed(2))

            updatedEquity += marketEquity

            stock.totalAmount = 0
            stock.totalAmount += marketEquity

            if (currentDate > endDate) {

              axios.post("/api/competitions/final_equity", {
                data: {
                  user: props.state.user,
                  user_competitions: props.state.current_competition,
                  finalEquity: updatedEquity
                }
              }).then(response => {
                props.setState(prev => ({
                  ...prev,
                  user_balance: user_balance_info,
                }))


                if (dayDifference < 0) {
                  LeaderboardStatus = "Leaderboard"
                }
                if (dayDifference > 0) {
                  LeaderboardStatus = "EventStatistic"
                }

                setPortfolioDetails(prev => ({
                  ...prev,
                  cash: user_balance_info.user_balance,
                  daysLeft: dayDifference,
                  cashAssets: updatedEquity,
                  stockListDetails: allPortfolioStocksInfo,
                  leaderboardState: LeaderboardStatus
                }))

                setComponent(LeaderboardStatus)
              })

            } else {

              props.setState(prev => ({
                ...prev,
                user_balance: user_balance_info,

              }))

              let LeaderboardStatus = ""
              if (dayDifference < 0) {
                LeaderboardStatus = "Leaderboard"
              }
              if (dayDifference > 0) {
                LeaderboardStatus = "EventStatistic"
              }

              setPortfolioDetails(prev => ({
                ...prev,
                cash: user_balance_info.user_balance,
                daysLeft: dayDifference,
                cashAssets: updatedEquity,
                stockListDetails: allPortfolioStocksInfo,
                leaderboardState: LeaderboardStatus
              }))

              setComponent(LeaderboardStatus)
            }
          })
      })



      // CURRENT CODE IN USE WITHOUT LIVE UDPATE

      // allPortfolioStocksInfo.forEach((stock) => {
      //   updatedStockTotal += stock.shares * stock.totalAmount;
      // });

      // let updatedEquity = user_balance_info.user_balance + updatedStockTotal;

      // if (currentDate > endDate) {
      //   axios.post("/api/competitions/final_equity", {
      //     data: {
      //       user: props.state.user,
      //       user_competitions: props.state.current_competition,
      //       finalEquity: updatedEquity
      //     }
      //   }).then(() => {
      //     props.setState(prev => ({
      //       ...prev,
      //       user_balance: user_balance_info,
      //     }));

      //     let LeaderboardStatus = ""
      //     if (dayDifference < 0) {
      //       LeaderboardStatus = "Leaderboard"
      //     };
      //     if (dayDifference > 0) {
      //       LeaderboardStatus = "EventStatistic"
      //     };

      //     setPortfolioDetails(prev => ({
      //       ...prev,
      //       cash: user_balance_info.user_balance,
      //       daysLeft: dayDifference,
      //       cashAssets: updatedEquity,
      //       stockListDetails: allPortfolioStocksInfo,
      //       leaderboardState: LeaderboardStatus
      //     }))
      //     setComponent(LeaderboardStatus)
      //   })

      // } else {
      //   props.setState(prev => ({
      //     ...prev,
      //     user_balance: user_balance_info,
      //   }))

      //   let LeaderboardStatus = ""
      //   if (dayDifference < 0) {
      //     LeaderboardStatus = "Leaderboard"
      //   };
      //   if (dayDifference > 0) {
      //     LeaderboardStatus = "EventStatistic"
      //   };

      //   setPortfolioDetails(prev => ({
      //     ...prev,
      //     cash: user_balance_info.user_balance,
      //     daysLeft: dayDifference,
      //     cashAssets: updatedEquity,
      //     stockListDetails: allPortfolioStocksInfo,
      //     leaderboardState: LeaderboardStatus
      //   }));

      //   setComponent(LeaderboardStatus);
      // }




    })
  }, [props.current_competition, props.transactions])

  return (
    <div id="page-container">
      <nav id="portfolio-side-nav">
        <div id="company-name">
          <span>BayStreetBets</span>
        </div>
        <div id="top-nav">
          <ul>
            <li id="side-nav-dashboard">
              <FontAwesomeIcon icon={faClipboard} />
              <Dropdown
                title="Dashboard"
                items={props.user_competitions_enrolled}
                setState={props.setState}
                state={props.state}
                current_competition={props.current_competition} />
            </li>
            <li onClick={() => setComponent("Browse")}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
              <span>Browse</span>
            </li>
            <li onClick={() => setComponent("Organize")}>
              <FontAwesomeIcon icon={faCalendarDays} />
              <span>Organize Event</span>
            </li>
          </ul>
        </div>

        <div id="user-details">
          <div className="user-details-block">
            <span className="user-details-section">Cash on Hand:</span>
            <span>{portfolioDetails.cash ? `$${portfolioDetails.cash}` : 'NONE'}</span>
          </div>
          {compState === 'finished' ? (
            <div className="user-details-block">
              <span className="user-details-section">Competition Finished</span>
            </div>)
            :
            null}

          {compState === 'in progress' ? (
            <div className="user-details-block">
              <span className="user-details-section">Days Left:</span>
              <span>{`${portfolioDetails.daysLeft} left`}</span>
            </div>)
            :
            null}

          {compState === 'not started' ? (

            <div className="user-details-block">
              <span className="user-details-section">Days to start:</span>
              <span>{`${portfolioDetails.daysLeft} left`}</span>
            </div>)
            :
            null}

          <div className="user-details-block">
            <span className="user-details-section">Total Equity:</span>
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
                <PortfolioList stockList={portfolioDetails.stockListDetails} />
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
        {component === "Leaderboard" && <Leaderboard
          state={props.state}
          setState={props.setState}
          competitions_enrolled={props.competitions_enrolled}
          current_competition={props.current_competition}
          transactions={props.transactions}
          user_balance={props.user_balance}
          user_profile={props.user_profile} />}

        {component === "EventStatistic" && <EventStatistic
          state={props.state}
          setState={props.setState}
          competitions_enrolled={props.competitions_enrolled}
          current_competition={props.current_competition}
          transactions={props.transactions}
          user_balance={props.user_balance}
          user_profile={props.user_profile} />}

        {component === "TransactionHistory" && <TransactionHistory
          state={props.state}
          setState={props.setState}
          competitions_enrolled={props.competitions_enrolled}
          current_competition={props.current_competition}
          transactions={props.transactions} />}

        {component === "ProfileEdit" && <ProfileEdit
          user_profile={props.user_profile}
          setState={props.setState}
          setComponent={setComponent} />}

        {component === "Organize" && <Organize
          user={props.user}
          setState={props.setState}
          state={props.state}
          setComponent={setComponent} />}

        {component === "Browse" && <Browse
          competitions={props.competitions}
          user_competitions_created={props.user_competitions_created}
          user_competitions_enrolled={props.user_competitions_enrolled}
          setState={props.setState}
          state={props.state} />}
      </article>
    </div>
  );
}
