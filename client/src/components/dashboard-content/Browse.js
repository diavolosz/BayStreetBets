import '../../stylesheet/Browse.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'



const eventInfoDisplay = (data) => {
  return (
    data.map((data, index) => {
      const { user_id, name, description, starting_amount } = data
      return (
        <div className="event-item" key={index}>
          <div className="general-info-box">
            <span><strong>Creator: </strong>{user_id}</span>
            {/* <span><strong>Max Participant: </strong>{participant}</span> */}
            {/* <span><strong>Duration: </strong>{duration} Days</span> */}
            <span><strong>Starting Amount: </strong>{starting_amount}</span>
          </div>
          <div className="description-info-box">
            <span><strong>Event Name: </strong>{name}</span>
            <span><strong>Description: </strong>{description}</span>
          </div>
        </div>
      )
    })
  )
}


export default function Browse(props) {

  
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
        {eventInfoDisplay(props.competitions)}
      </div>
    </div>
  )
}