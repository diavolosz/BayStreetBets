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




let backupHistorical = [{"close":160.01,"high":162.41,"low":159.63,"open":160.1,"priceDate":"2022-08-02","symbol":"AAPL","volume":59907025,"id":"HISTORICAL_PRICES","key":"AAPL","subkey":"","date":"2022-08-02","updated":1660174218000,"changeOverTime":0,"marketChangeOverTime":0,"uOpen":160.1,"uClose":160.01,"uHigh":162.41,"uLow":159.63,"uVolume":59907025,"fOpen":159.878,"fClose":159.788,"fHigh":162.185,"fLow":159.409,"fVolume":59907025,"label":"Aug 2, 22","change":0,"changePercent":0},{"close":166.13,"high":166.59,"low":160.75,"open":160.84,"priceDate":"2022-08-03","symbol":"AAPL","volume":82507488,"id":"HISTORICAL_PRICES","key":"AAPL","subkey":"","date":"2022-08-03","updated":1660174233000,"changeOverTime":0.03824760952440476,"marketChangeOverTime":0.03824760952440476,"uOpen":160.84,"uClose":166.13,"uHigh":166.59,"uLow":160.75,"uVolume":82507488,"fOpen":160.617,"fClose":165.9,"fHigh":166.359,"fLow":160.527,"fVolume":82507488,"label":"Aug 3, 22","change":6.1200000000000045,"changePercent":0.0382},{"close":165.81,"high":167.19,"low":164.43,"open":166.005,"priceDate":"2022-08-04","symbol":"AAPL","volume":55474144,"id":"HISTORICAL_PRICES","key":"AAPL","subkey":"","date":"2022-08-04","updated":1660174249000,"changeOverTime":0.036247734516592786,"marketChangeOverTime":0.036247734516592786,"uOpen":166.005,"uClose":165.81,"uHigh":167.19,"uLow":164.43,"uVolume":55474144,"fOpen":165.775,"fClose":165.58,"fHigh":166.958,"fLow":164.202,"fVolume":55474144,"label":"Aug 4, 22","change":-0.3199999999999932,"changePercent":-0.0019},{"close":165.35,"high":165.85,"low":163,"open":163.21,"priceDate":"2022-08-05","symbol":"AAPL","volume":56696985,"id":"HISTORICAL_PRICES","key":"AAPL","subkey":"","date":"2022-08-05","updated":1660174238000,"changeOverTime":0.03337291419286297,"marketChangeOverTime":0.03337291419286297,"uOpen":163.21,"uClose":165.35,"uHigh":165.85,"uLow":163,"uVolume":56696985,"fOpen":163.21,"fClose":165.35,"fHigh":165.85,"fLow":163,"fVolume":56696985,"label":"Aug 5, 22","change":-0.46000000000000796,"changePercent":-0.0028},{"close":164.87,"high":167.81,"low":164.2,"open":166.37,"priceDate":"2022-08-08","symbol":"AAPL","volume":60362338,"id":"HISTORICAL_PRICES","key":"AAPL","subkey":"","date":"2022-08-08","updated":1660174221000,"changeOverTime":0.030373101681145015,"marketChangeOverTime":0.030373101681145015,"uOpen":166.37,"uClose":164.87,"uHigh":167.81,"uLow":164.2,"uVolume":60362338,"fOpen":166.37,"fClose":164.87,"fHigh":167.81,"fLow":164.2,"fVolume":60362338,"label":"Aug 8, 22","change":-0.47999999999998977,"changePercent":-0.0029},{"close":164.92,"high":165.82,"low":163.25,"open":164.02,"priceDate":"2022-08-09","symbol":"AAPL","volume":63135503,"id":"HISTORICAL_PRICES","key":"AAPL","subkey":"","date":"2022-08-09","updated":1660174218000,"changeOverTime":0.030685582151115536,"marketChangeOverTime":0.030685582151115536,"uOpen":164.02,"uClose":164.92,"uHigh":165.82,"uLow":163.25,"uVolume":63135503,"fOpen":164.02,"fClose":164.92,"fHigh":165.82,"fLow":163.25,"fVolume":63135503,"label":"Aug 9, 22","change":0.04999999999998295,"changePercent":0.0003},{"close":169.24,"high":169.34,"low":166.9,"open":167.68,"priceDate":"2022-08-10","symbol":"AAPL","volume":70170540,"id":"HISTORICAL_PRICES","key":"AAPL","subkey":"","date":"2022-08-10","updated":1660179625000,"changeOverTime":0.05768389475657783,"marketChangeOverTime":0.05768389475657783,"uOpen":167.68,"uClose":169.24,"uHigh":169.34,"uLow":166.9,"uVolume":70170540,"fOpen":167.68,"fClose":169.24,"fHigh":169.34,"fLow":166.9,"fVolume":70170540,"label":"Aug 10, 22","change":4.320000000000022,"changePercent":0.0262},{"close":168.49,"high":170.99,"low":168.19,"open":170.06,"priceDate":"2022-08-11","symbol":"AAPL","volume":57149159,"id":"HISTORICAL_PRICES","key":"AAPL","subkey":"","date":"2022-08-11","updated":1660269616000,"changeOverTime":0.05299668770701843,"marketChangeOverTime":0.05299668770701843,"uOpen":170.06,"uClose":168.49,"uHigh":170.99,"uLow":168.19,"uVolume":57149159,"fOpen":170.06,"fClose":168.49,"fHigh":170.99,"fLow":168.19,"fVolume":57149159,"label":"Aug 11, 22","change":-0.75,"changePercent":-0.0044},{"close":172.1,"high":172.17,"low":169.4,"open":169.82,"priceDate":"2022-08-12","symbol":"AAPL","volume":68039382,"id":"HISTORICAL_PRICES","key":"AAPL","subkey":"","date":"2022-08-12","updated":1660357917000,"changeOverTime":0.0755577776388976,"marketChangeOverTime":0.0755577776388976,"uOpen":169.82,"uClose":172.1,"uHigh":172.17,"uLow":169.4,"uVolume":68039382,"fOpen":169.82,"fClose":172.1,"fHigh":172.17,"fLow":169.4,"fVolume":68039382,"label":"Aug 12, 22","change":3.609999999999985,"changePercent":0.0214},{"close":173.19,"high":173.39,"low":171.345,"open":171.52,"priceDate":"2022-08-15","symbol":"AAPL","volume":54091694,"id":"HISTORICAL_PRICES","key":"AAPL","subkey":"","date":"2022-08-15","updated":1660611622000,"changeOverTime":0.08236985188425729,"marketChangeOverTime":0.08236985188425729,"uOpen":171.52,"uClose":173.19,"uHigh":173.39,"uLow":171.345,"uVolume":54091694,"fOpen":171.52,"fClose":173.19,"fHigh":173.39,"fLow":171.345,"fVolume":54091694,"label":"Aug 15, 22","change":1.0900000000000034,"changePercent":0.0063},{"close":173.03,"high":173.71,"low":171.6618,"open":172.78,"priceDate":"2022-08-16","symbol":"AAPL","volume":56377050,"id":"HISTORICAL_PRICES","key":"AAPL","subkey":"","date":"2022-08-16","updated":1660698035000,"changeOverTime":0.0813699143803513,"marketChangeOverTime":0.0813699143803513,"uOpen":172.78,"uClose":173.03,"uHigh":173.71,"uLow":171.6618,"uVolume":56377050,"fOpen":172.78,"fClose":173.03,"fHigh":173.71,"fLow":171.6618,"fVolume":56377050,"label":"Aug 16, 22","change":-0.1599999999999966,"changePercent":-0.0009}]




let quote = {"avgTotalVolume":67947678,"calculationPrice":"close","change":-0.16,"changePercent":-0.00092,"close":173.03,"closeSource":"official","closeTime":1660680000920,"companyName":"Apple Inc","currency":"USD","delayedPrice":173.08,"delayedPriceTime":1660679963529,"extendedChange":0.72,"extendedChangePercent":0.00416,"extendedPrice":173.75,"extendedPriceTime":1660694399016,"high":173.71,"highSource":"15 minute delayed price","highTime":1660679999971,"iexAskPrice":0,"iexAskSize":0,"iexBidPrice":0,"iexBidSize":0,"iexClose":173.03,"iexCloseTime":1660679999754,"iexLastUpdated":1660683311777,"iexMarketPercent":0.01615437487417309,"iexOpen":172.77,"iexOpenTime":1660656600244,"iexRealtimePrice":173.61,"iexRealtimeSize":100,"iexVolume":910736,"lastTradeTime":1660679999880,"latestPrice":173.03,"latestSource":"Close","latestTime":"August 16, 2022","latestUpdate":1660680000920,"latestVolume":56377050,"low":171.662,"lowSource":"15 minute delayed price","lowTime":1660659392990,"marketCap":2780722218560,"oddLotDelayedPrice":173.08,"oddLotDelayedPriceTime":1660679963524,"open":172.62,"openTime":1660656601466,"openSource":"official","peRatio":28.6,"previousClose":173.19,"previousVolume":54091694,"primaryExchange":"NASDAQ","symbol":"AAPL","volume":56377050,"week52High":182.19,"week52Low":128.86,"ytdChange":-0.02155015796360745,"isUSMarketOpen":false}

















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
        `https://cloud.iexapis.com/stable/stock/${event.target[0].value}/chart/15d?token=${process.env.REACT_APP_CLOUD_TOKEN}`
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
