import "../../stylesheet/DashboardMain.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboard,
  faPersonCirclePlus,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate, Navigate } from "react-router";

import EventStatistic from "../dashboard-content/EventStatistic";
import TransactionHistory from "../dashboard-content/TransactionHistory";
import ProfileEdit from "../dashboard-content/Profile";
import Organize from "../dashboard-content/Organize";
import Browse from "../dashboard-content/Browse";
import Dropdown from "../dashboard-content/Dropdown";
import Leaderboard from "../dashboard-content/Leaderboard";

export default function Dashboard(props) {
  const navigate = useNavigate();

  const dataSet = [
    { symbol: "APPL", price: 166.13, share: 50 },
    { symbol: "APPL", price: 166.13, share: 50 },
    { symbol: "APPL", price: 166.13, share: 50 },
    { symbol: "APPL", price: 166.13, share: 50 },
    { symbol: "APPL", price: 166.13, share: 50 },
    { symbol: "APPL", price: 166.13, share: 50 },
    { symbol: "APPL", price: 166.13, share: 50 },
    { symbol: "APPL", price: 166.13, share: 50 },
    { symbol: "APPL", price: 166.13, share: 50 },
    { symbol: "APPL", price: 166.13, share: 50 },
    { symbol: "APPL", price: 166.13, share: 50 },
    { symbol: "APPL", price: 166.13, share: 50 },
    { symbol: "APPL", price: 166.13, share: 50 },
    { symbol: "APPL", price: 166.13, share: 50 },
  ];

  const portfolioData = dataSet.map((each, index) => {
    return (
      <tr key={index}>
        <td>{each.symbol}</td>
        <td>${each.price}</td>
        <td>{each.share}</td>
      </tr>
    );
  });

  const [component, setComponent] = useState("Leaderboard");

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
            <span>$ 14650</span>
          </div>
          <div className="user-details-block">
            <span className="user-details-section">Days Left:</span>
            <span>9 Days</span>
          </div>
          <div className="user-details-block">
            <span className="user-details-section">CASH & ASSET:</span>
            <span>$ 20000</span>
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
              <tbody>{portfolioData}</tbody>
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
        {component === "Leaderboard" && <Leaderboard />}

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
