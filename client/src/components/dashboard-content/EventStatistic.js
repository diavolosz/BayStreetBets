
import "../../stylesheet/EventStatistic.scss";
import StockChart from "../graphs/StockChart";
import AssetChart from "../graphs/AssetChart";
import PortfolioChart from "../graphs/PortfolioChart";
import StockDetails from "../graphs/StockDetails";
import SellAlert from './eventStatistic-content/SellAlert'
import BuyAlert from './eventStatistic-content/BuyAlert'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import { useForm } from "../../hooks/useForm";
import {
  updateTransactions,
  deriveCashFromTransactions,
  getTransactionsForCompetition,
  getHolding,
} from "../../helpers/selectors";
import { useEffect, useState } from "react";
import axios from "axios";

export default function EventStatistic(props) {
  const [stockSearch, setStockSearch] = useState({
    details: null,
    historical: null,
  });

  const search = function (event) {
    event.preventDefault();
    //console.log(event.target[0].value)

    Promise.all([
      axios.get(
        `https://cloud.iexapis.com/stable/stock/${event.target[0].value}/quote?token=${process.env.REACT_APP_CLOUD_TOKEN}`
      ),
      axios.get(
        `https://cloud.iexapis.com/stable/stock/${event.target[0].value}/chart/5d?token=${process.env.REACT_APP_CLOUD_TOKEN}`
      ),
    ])

      .then(response => {
        setStockSearch(prev => ({
          ...prev,
          details: response[0].data,
          historical: response[1].data,
        }));

        console.log(response);
      })
      .catch(e => {
        console.log(e);
      });
  };


  // const user_profile = props.user_profile
  // const competition_id = props.current_competition
  
  // const handleBuy = (event) => {
  //   event.preventDefault();
  //   axios.post("/api/transactions/buy", { stockSearch, buy, user_profile, competition_id })
  //     .then((res) => {
  //       res.data.price = parseInt((res.data.price).replace(/[^0-9.-]+/g,""))
  //       props.transactions.push(res.data)
  //       props.setState(prev => ({...prev, transactions: props.transactions}))
  //     })
  //     .then(() => setBuy(0))
  //     .then(() => setDisplayAlert("boughtStocks"))
  // }
  // const handleSell = (event) => {
  //   event.preventDefault();
  //   axios.post("/api/transactions/sell", { stockSearch, sell, user_profile, competition_id })
  //   .then((res) => {
  //     res.data.price = parseInt((res.data.price).replace(/[^0-9.-]+/g,""))
  //     props.transactions.push(res.data)
  //     props.setState(prev => ({...prev, transactions: props.transactions}))
  //   })
  //   .then(() => setSell(0))
  //   .then(() => setDisplayAlert("soldStocks"))
  // }
  const [buy, setBuy] = useState(0);
  const [sell, setSell] = useState(0);
  const [displayAlert, setDisplayAlert] = useState("")
  const user_profile = props.user_profile;
  const competition_id = props.current_competition;

  const handleBuy = event => {
    event.preventDefault();
    const transactionsForCompetition = getTransactionsForCompetition(
      props.state,
      props.current_competition.id
    );

    const castedStartingAmount = Number(
      props.current_competition.starting_amount.replace(/[^0-9.-]+/g, "")
    );
    const cash = deriveCashFromTransactions(
      transactionsForCompetition,
      castedStartingAmount
    );

    if (cash < stockSearch.details.latestPrice * buy) {
      return alert("No enough cash.");
    }

    axios
      .post("/api/transactions/buy", {
        stockSearch,
        buy,
        user_profile,
        competition_id,
      })
      .then(response => {
        if (response.status === 200) {
          const price = response.data.price;
          const convertedPrice = parseInt(price.replace(/[^0-9.-]+/g, ""));
          response.data.price = convertedPrice;
          setBuy(0);
          setDisplayAlert("boughtStocks");
          const updatedTransactions = updateTransactions(
            props.state,
            response.data
          );
          props.setState(prev => ({
            ...prev,
            transactions: updatedTransactions,
          }));
        }
      });
  };
  const handleSell = event => {
    event.preventDefault();
    console.log(props.state);
    const transactionsForCompetition = getTransactionsForCompetition(
      props.state,
      props.current_competition.id
    );

    const sharesOwned = getHolding(
      transactionsForCompetition,
      stockSearch.details.symbol
    );

    if (sharesOwned < parseInt(sell)) {
      return alert("You don't own enough shares.");
    }
    axios
      .post("/api/transactions/sell", {
        stockSearch,
        sell,
        user_profile,
        competition_id,
      })
      .then(response => {
        if (response.status === 200) {
          const price = response.data.price;
          const convertedPrice = parseInt(price.replace(/[^0-9.-]+/g, ""));
          response.data.price = convertedPrice;
          setSell(0);
          setDisplayAlert("soldStocks");
          const updatedTransactions = updateTransactions(
            props.state,
            response.data
          );
          props.setState(prev => ({
            ...prev,
            transactions: updatedTransactions,
          }));
        }
      });
  };

  return (
    <div id="portfolio-inner-container">
      {displayAlert === "boughtStocks" && <BuyAlert setDisplayAlert={() => setDisplayAlert}/>}
      {displayAlert === "soldStocks" && <SellAlert setDisplayAlert={() => setDisplayAlert}/>}
      <div id="search-box">
        <div className="stock-chart">
          <form className="stock-search-box" onSubmit={search}>
            <input type="text" placeholder="Search Stock ..." name="symbol" />
            <button type="submit">
              <FontAwesomeIcon
                className="search-icon"
                icon={faMagnifyingGlass}
              />
            </button>
          </form>
          <div id="stock-chart-container">
            <StockChart
              stockSearch={stockSearch}
              setStockSearch={setStockSearch}
              companyName={
                stockSearch.details ? stockSearch.details.companyName : null
              }
            />
          </div>
        </div>
        <div className="stock-details-container">
          <div className="detail-title">Core Info and Indicators</div>
          <StockDetails
            stockSearch={stockSearch}
            setStockSearch={setStockSearch}
          />
          {stockSearch.details !== null && (
            <div id="buy-sell-container">
              <form onSubmit={handleBuy}>
                <input type="submit" value="BUY" className="buy-button"></input>
                <input
                  type="number"
                  min="0"
                  value={buy}
                  onChange={event => setBuy(event.target.value)}
                />
              </form>
              <form onSubmit={handleSell}>
                <input
                  type="submit"
                  value="SELL"
                  className="sell-button"
                ></input>
                <input
                  type="number"
                  min="0"
                  value={sell}
                  onChange={event => setSell(event.target.value)}
                />
              </form>
            </div>
          )}
        </div>
      </div>

      <div id="portfolio-change-container">
        <div id="protfolio-change-graph">
          <div className="portfolio-chart">
            <span>User Portfolio Change (Total Equity Change $)</span>
            <PortfolioChart
              state={props.state}
              setState={props.setState}
              competitions_enrolled={props.competitions_enrolled}
              current_competition={props.current_competition}
              transactions={props.transactions}
              user_balance={props.user_balance}
            />
          </div>
        </div>

        <div id="protfolio-change-chart">
          <div className="pie-chart">
            <div className="asset-title">Total Asset Breakdown</div>
            <AssetChart
              state={props.state}
              setState={props.setState}
              competitions_enrolled={props.competitions_enrolled}
              current_competition={props.current_competition}
              transactions={props.transactions}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
