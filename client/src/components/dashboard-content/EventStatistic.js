import "../../stylesheet/EventStatistic.scss";
import StockChart from "../graphs/StockChart";
import AssetChart from "../graphs/AssetChart";
import PortfolioChart from "../graphs/PortfolioChart";
import StockDetails from "../graphs/StockDetails";
import SellAlert from './eventStatistic-content/SellAlert'
import BuyAlert from './eventStatistic-content/BuyAlert'
import ErrorAlert from "./eventStatistic-content/ErrorAlert";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import {
  updateTransactions,
  deriveCashFromTransactions,
  getTransactionsForCompetition,
  getHolding,
} from "../../helpers/selectors";
import { useState } from "react";
import axios from "axios";

export default function EventStatistic(props) {

  const [displayAlert, setDisplayAlert] = useState("")
  const [stockSearch, setStockSearch] = useState({
    details: null,
    historical: null,
  });

  const search = function (event) {
    event.preventDefault();

    Promise.all([
      axios.get(
        `https://cloud.iexapis.com/stable/stock/${event.target[0].value}/quote?token=${process.env.REACT_APP_CLOUD_TOKEN}`
      ),
      axios.get(
        `https://cloud.iexapis.com/stable/stock/${event.target[0].value}/chart/5d?token=${process.env.REACT_APP_CLOUD_TOKEN}`
      ),
    ])
      .then(response => {
        if (response[1].data || response[0].data) {
          setStockSearch(prev => ({
            ...prev,
            details: response[0].data,
            historical: response[1].data,
          }))

        } else {
          event.target[0].value = "Stock not found, please search another stock"
        }
      })
      .catch(e => {
        console.log(e);
      });
  };

  const [buy, setBuy] = useState(0);
  const [sell, setSell] = useState(0);
  const user_profile = props.user_profile;
  const competition_id = props.current_competition;

  const handleBuy = event => {
    event.preventDefault();
    const start_date = new Date(props.current_competition.start_date).getTime()
    const current_date = Date.now()
    if (current_date < start_date) {
      setDisplayAlert("EarlyEvent")
      return setBuy(0);
    } else {
      const transactionsForCompetition = getTransactionsForCompetition(
        props.state,
        props.current_competition.id
      );

      let castedStartingAmount;

      if (typeof props.current_competition.starting_amount === 'string') {
        castedStartingAmount = Number(
          props.current_competition.starting_amount.replace(/[^0-9.-]+/g, "")
        );

      } else {
        castedStartingAmount = props.current_competition.starting_amount
      }

      const cash = deriveCashFromTransactions(
        transactionsForCompetition,
        castedStartingAmount
      );

      if (cash < stockSearch.details.latestPrice * buy) {
        setDisplayAlert("ErrorAlert-overBuy")
        return setBuy(0);
      }

      if (buy === 0) {
        setDisplayAlert("ErrorAlert-missingValue")
        return;
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
            setDisplayAlert("BoughtStocks");
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
    }
  };


  const handleSell = event => {
    event.preventDefault();
    const start_date = new Date(props.current_competition.start_date).getTime()
    const current_date = Date.now()
    if (current_date < start_date) {
      setDisplayAlert("EarlyEvent")
      return setSell(0);

    } else {
      const transactionsForCompetition = getTransactionsForCompetition(
        props.state,
        props.current_competition.id
      );

      const sharesOwned = getHolding(
        transactionsForCompetition,
        stockSearch.details.symbol
      );

      if (sharesOwned < parseInt(sell)) {
        setDisplayAlert("ErrorAlert-overSold")
        return setSell(0);
      }

      if (sell === 0) {
        setDisplayAlert("ErrorAlert-missingValue")
        return;
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
            setDisplayAlert("SoldStocks");
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
    }
  };

  return (
    <div id="portfolio-inner-container">
      {displayAlert === "EarlyEvent" && <ErrorAlert setDisplayAlert={() => setDisplayAlert} message={"Event has not started yet. Please return on start date."} />}
      {displayAlert === "BoughtStocks" && <BuyAlert setDisplayAlert={() => setDisplayAlert} />}
      {displayAlert === "SoldStocks" && <SellAlert setDisplayAlert={() => setDisplayAlert} />}
      {displayAlert === "ErrorAlert-overBuy" && <ErrorAlert setDisplayAlert={() => setDisplayAlert} message={"Not enough cash for the action."} />}
      {displayAlert === "ErrorAlert-overSold" && <ErrorAlert setDisplayAlert={() => setDisplayAlert} message={"You don't own enough shares."} />}
      {displayAlert === "ErrorAlert-missingValue" && <ErrorAlert setDisplayAlert={() => setDisplayAlert} message={"You must enter a number to buy/sell."} />}

      <div id="search-box">
        <div className="stock-chart">
          <form className="stock-search-box" onSubmit={search}>
            <input type="text" placeholder="Search Stock Symbol..." name="symbol" />
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
                stockSearch.details ? stockSearch.details.companyName : null} />
          </div>
        </div>
        <div className="stock-details-container">
          <div className="detail-title">Core Info and Indicators</div>
          <StockDetails
            stockSearch={stockSearch}
            setStockSearch={setStockSearch} />
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
