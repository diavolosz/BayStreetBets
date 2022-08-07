
import '../../stylesheet/DashboardMain.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboard, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons'

import EventStatistic from '../dashboard-content/EventStatistic'
import TransactionHistory from '../dashboard-content/TransactionHistory'
import Organize from '../dashboard-content/Organize'

export default function Dashboard() {

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

  ]

  const portfolioData = dataSet.map((each, index) => {
    return (
      <tr key={index}>
        <td>{each.symbol}</td>
        <td>${each.price}</td>
        <td>{each.share}</td>
      </tr>
    )
  })

  return (
    <div id="page-container">
      <nav id="portfolio-side-nav">
        <div id="company-name">
          <span>BayStreetBets</span>
        </div>

        <div id="top-nav">
          <ul>
            <li>
              <FontAwesomeIcon icon={faClipboard} />
              <span>Dashboard</span>
            </li>
            <li>
              <FontAwesomeIcon icon={faClipboard} />
              <span>Browse</span>
            </li>
            <li>
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
            <button>Transaction</button>
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
                {portfolioData}
              </tbody>
            </table>
          </article>
        </div>

        <div id="bottom-nav">
          <ul>
            <li>
              <FontAwesomeIcon icon={faUser} />
              <span>Profile</span>
            </li>
            <li>
              <FontAwesomeIcon icon={faRightFromBracket} />
              <span>Log Out</span>
            </li>
          </ul>
        </div>
      </nav>

      <article id="portfolio-side-article">
        {/* <EventStatistic /> */}
        {/* <TransactionHistory /> */}
        <Organize />
      </article>
    </div>
  );
}


