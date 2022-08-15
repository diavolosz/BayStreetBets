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

import Leaderboard from "../dashboard-content/Leaderboard";
import PortfolioList from "./PortfolioList";



const findPortfolioStocksAndSharesPrice = function (transactions) {
  let stockAndShares = [];
  let stockTracker = [];



  transactions.forEach((transaction) => {

    //console.log(stockAndShares)

    if (stockAndShares.length === 0) {

      stockAndShares.push({
        stock: transaction.symbol,
        shares: transaction.number_of_shares,
        totalAmount: transaction.number_of_shares * transaction.price
      })

      stockTracker.push(transaction.symbol)

    } else {

      //console.log(stockTracker.includes(transaction.symbol))

      if (!stockTracker.includes(transaction.symbol)) {

        stockAndShares.push({
          stock: transaction.symbol,
          shares: transaction.number_of_shares,
          totalAmount: transaction.number_of_shares * transaction.price
        })

        stockTracker.push(transaction.symbol)

      } else {
        stockAndShares.forEach((item, index, array) => {

          if (item.stock === transaction.symbol) {
            item.shares += transaction.number_of_shares
            item.totalAmount += transaction.number_of_shares * transaction.price
          }

          //console.log("before splice",item)

          if (item.shares < 1) {

            stockAndShares.splice(index, 1)

            let itemToRemove = stockTracker.indexOf(item.stock);

            stockTracker.splice(itemToRemove, 1)
          }

        })


        //console.log( stockTracker)
      }

    }

    // else {

    //   stockAndShares.forEach((item, index, array) => {
    //     if (transaction.symbol === item.stock) {
    //       item.shares += transaction.number_of_shares
    //       let priceTotal = transaction.number_of_shares * transaction.price
    //       item.totalAmount += priceTotal
    //     }




    //     if (!stockTracker.includes(transaction.symbol)) {
    //       stockAndShares.push({
    //         stock: transaction.symbol,
    //         shares: transaction.number_of_shares,
    //         totalAmount: transaction.number_of_shares * transaction.price
    //       })
    //       stockTracker.push(transaction.symbol)

    //     }



    //     if (index + 1 === array.length) {
    //       if (!stockTracker.includes(transaction.symbol)) {
    //         stockAndShares.push({
    //           stock: transaction.symbol,
    //           shares: transaction.number_of_shares,
    //           totalAmount: transaction.number_of_shares * transaction.price
    //         })
    //       }
    //     }
    //   })


    // }
  })


  //console.log ("final stocks and shares", stockAndShares)
  //console.log("end tracker", stockTracker)

  return stockAndShares
}





export default function Dashboard(props) {
  const navigate = useNavigate();

  const [component, setComponent] = useState("EventStatistic");

  const [portfolioDetails, setPortfolioDetails] = useState({
    cash: null,
    daysLeft: null,
    cashAssets: null,
    stockListDetails: [],
    leaderboardState: null,
  })

  const [compState, setCompState] = useState('')

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
      }))

      let user_balance_info = response[0].data[0]

      let currentDate = new Date().getTime();
      let startDate = new Date(props.current_competition.start_date).getTime();
      let endDate = new Date(props.current_competition.end_date).getTime();
      let dayDifference = Math.round((endDate - currentDate) / (1000 * 60 * 60 * 24))



      let newTransactions = response[1].data
      let allPortfolioStocksInfo = findPortfolioStocksAndSharesPrice(newTransactions)
      let updatedStockTotal = 0



      // console.log("not started", currentDate < startDate)


      // console.log("finished", currentDate > endDate)


      // console.log("inbetween", currentDate < endDate && currentDate > startDate)


      if (currentDate > endDate) {
        setCompState('finished')
      } else if (currentDate < endDate && currentDate > startDate) {
        dayDifference = Math.round((endDate - currentDate) / (1000 * 60 * 60 * 24))
        setCompState('in progress')
      } else if (currentDate < startDate) {
        dayDifference = Math.round((startDate - currentDate) / (1000 * 60 * 60 * 24))
        setCompState('not started')
      }


      // console.log (portfolioDetails.stockListDetails)



      // allPortfolioStocksInfo.forEach((stock) => {

      //   axios.get(`https://cloud.iexapis.com/stable/stock/${stock.stock}/quote?token=${process.env.REACT_APP_CLOUD_TOKEN}`)

      //     .then(response => {

      //       let marketPrice = response.data.close

      //       let marketEquity = stock.shares * marketPrice

      //       marketEquity = parseInt(marketEquity.toFixed(2))

      //       let updatedEquity = props.user_balance.user_balance + marketEquity


      //       allPortfolioStocksInfo.forEach((stock) => {
      //         stock.totalAmount += marketEquity
      //       })




      // THE IF ADDS A CHECK TO ADD A FINA LEQUITY TO USER_COMPETITIONS SO LEADERBOARD CAN ACCESS THE VALUE

      // if (currentDate > endDate) {

      //   console.log (user_balance_info.user_balance)

      //   axios.post("/api/competitions/final_equity", {
      //     data: {
      //       user: props.state.user,
      //       user_competitions: props.state.current_competition,
      //       finalEquity: updatedEquity
      //     }
      //   }).then (response => {

      //     //console.log (response)

      //     props.setState(prev => ({
      //       ...prev,
      //       user_balance: user_balance_info,

      //     }))

      //     let LeaderboardStatus = ""
      //     if (dayDifference < 0) {
      //       LeaderboardStatus = "Leaderboard"
      //     }
      //     if (dayDifference > 0) {
      //       LeaderboardStatus = "EventStatistic"
      //     }

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
      //   }
      //   if (dayDifference > 0) {
      //     LeaderboardStatus = "EventStatistic"
      //   }

      //   setPortfolioDetails(prev => ({
      //     ...prev,
      //     cash: user_balance_info.user_balance,
      //     daysLeft: dayDifference,
      //     cashAssets: updatedEquity,
      //     stockListDetails: allPortfolioStocksInfo,
      //     leaderboardState: LeaderboardStatus
      //   }))
      //   setComponent(LeaderboardStatus)


      // }



      // BELOW IS BACKUP CODE IF LEADERBOARD CHECK DOESNT WORK





      //       props.setState(prev => ({
      //         ...prev,
      //         user_balance: user_balance_info,

      //       }))

      //       let LeaderboardStatus = ""
      //       if (dayDifference < 0) {
      //         LeaderboardStatus = "Leaderboard"
      //       }
      //       if (dayDifference > 0) {
      //         LeaderboardStatus = "EventStatistic"
      //       }


      //       setPortfolioDetails(prev => ({
      //         ...prev,
      //         cash: props.state.user_balance.user_balance,
      //         daysLeft: dayDifference,
      //         cashAssets: updatedEquity,
      //         stockListDetails: allPortfolioStocksInfo,
      //         leaderboardState: LeaderboardStatus
      //       }))

      //       setComponent(LeaderboardStatus)

      //     })

      // })



      allPortfolioStocksInfo.forEach((stock) => {
        updatedStockTotal += stock.shares * stock.totalAmount
      })

      let updatedEquity = user_balance_info.user_balance + updatedStockTotal


      if (currentDate > endDate) {

        //console.log(props.current_competition)

        axios.post("/api/competitions/final_equity", {
          data: {
            user: props.state.user,
            user_competitions: props.state.current_competition,
            finalEquity: updatedEquity
          }
        }).then(response => {

          //console.log (response)

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





      // props.setState(prev => ({
      //   ...prev,
      //   user_balance: user_balance_info,

      // }))

      // let LeaderboardStatus = ""
      // if (dayDifference < 0) {
      //   LeaderboardStatus = "Leaderboard"
      // }
      // if (dayDifference > 0) {
      //   LeaderboardStatus = "EventStatistic"
      // }

      // setPortfolioDetails(prev => ({
      //   ...prev,
      //   cash: user_balance_info.user_balance,
      //   daysLeft: dayDifference,
      //   cashAssets: updatedEquity,
      //   stockListDetails: allPortfolioStocksInfo,
      //   leaderboardState: LeaderboardStatus
      // }))
      // setComponent(LeaderboardStatus)




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
            <li
              id="side-nav-dashboard"
            >
              <FontAwesomeIcon icon={faClipboard} />
              <Dropdown
                title="Dashboard"
                items={props.user_competitions_enrolled}
                setState={props.setState}
                state={props.state}
                current_competition={props.current_competition}
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

          {compState === 'finished' ? (

            <div className="user-details-block">
              <span className="user-details-section">Competition Finished</span>
              {/* <span>Finished</span> */}
            </div>

          ) : null}


          {compState === 'in progress' ? (

            <div className="user-details-block">
              <span className="user-details-section">Days Left:</span>
              <span>{`${portfolioDetails.daysLeft} left`}</span>
            </div>

          ) : null}


          {compState === 'not started' ? (

            <div className="user-details-block">
              <span className="user-details-section">Days to start:</span>
              <span>{`${portfolioDetails.daysLeft} left`}</span>
            </div>

          ) : null}


          {/* <div className="user-details-block">

            <span className="user-details-section">Days Left:</span>

            {compState === 'finished' ? (
              <span>Finished</span>
            ) : null}

            {compState === 'in progress' ? (
              <span>{portfolioDetails.daysLeft}</span>
            ) : null}

            {compState === 'not started' ? (
              <span>Not Started</span>
            ) : null} */}


          {/* <span className="user-details-section">Days Left:</span>
            <span>{portfolioDetails.daysLeft ? `${portfolioDetails.daysLeft} Days` : 'NOTHING'}</span> */}

          {/* 
          </div> */}


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
          user_profile={props.user_profile}





        />}

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
