import '../../stylesheet/Browse.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const res = [
  {
    creator: "Test User",
    participant: 50,
    eventName: "Test Event",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tempus egestas sed sed risus pretium quam vulputate dignissim.",
    duration: 20,
    startingAmount: 25000
  },
  {
    creator: "Test User",
    participant: 50,
    eventName: "Test Event",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tempus egestas sed sed risus pretium quam vulputate dignissim.",
    duration: 20,
    startingAmount: 25000
  },
  {
    creator: "Test User",
    participant: 50,
    eventName: "Test Event",
    description: "Lorem i",
    duration: 20,
    startingAmount: 25000
  },
  {
    creator: "Test User",
    participant: 50,
    eventName: "Test Event",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tempus egestas sed sed risus pretium quam vulputate dignissim.",
    duration: 20,
    startingAmount: 25000
  },
  {
    creator: "Test User",
    participant: 50,
    eventName: "Test Event",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tempus egestas sed sed risus pretium quam vulputate dignissim.orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tempus egestas sed sed risus pretium quam vulputate dignissimolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tempus egestas sed sed risus pretium quam vulputate dignissim.orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tempus egestas sed sed risus pretium quam vulputate dignissimolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tempus egestas sed sed risus pretium quam vulputate dignissim.orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tempus egestas sed sed risus pretium quam vulputate dignissim",
    duration: 20,
    startingAmount: 25000
  },
  {
    creator: "Test User",
    participant: 50,
    eventName: "Test Event",
    description: "Lorem ipsum dolor sit amet, cons",
    duration: 20,
    startingAmount: 25000
  },
  {
    creator: "Test User",
    participant: 50,
    eventName: "Test Event",
    description: "Lorem ip",
    duration: 20,
    startingAmount: 25000
  },
]

const eventInfoDisplay = res.map((eventInfo, index) => {
  const { creator, participant, eventName, description, duration, startingAmount } = eventInfo
  return (
    <div className="event-item" key={index}>
      <div className="general-info-box">
        <span><strong>Creator: </strong>{creator}</span>
        <span><strong>Max Participant: </strong>{participant}</span>
        <span><strong>Duration: </strong>{duration} Days</span>
        <span><strong>Starting Amount: $</strong>{startingAmount}</span>
      </div>
      <div className="description-info-box">
        <span><strong>Event Name: </strong>{eventName}</span>
        <span><strong>Description: </strong>{description}</span>
      </div>
    </div>
  )
})

export default function Browse() {
  return (
    <div id="browse-inner-container">
      <div id="search-box-container">
        <div id="search-box-buttons">
          <span>BROWSE EVENT</span>
          <span>MY EVENT</span>
        </div>
        <form id="search-box-search-bar">
          <input type="text" placeholder="Search Event..." name="search" />
          <button type='submit'><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
        </form>
      </div>
      <div id="event-display-container">
        {eventInfoDisplay}
      </div>
    </div>
  )
}