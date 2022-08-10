import '../../stylesheet/Browse.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

import BrowseListItem from './browse-content/BrowseListItem'


export default function Browse(props) {

  const eventInfoDisplay = (data, deleteOption = false, allEventDisplay = false) => {
    return (
      data.map((each, index) => {
        const { id, user_id, name, description, starting_amount } = each
        return (
          <BrowseListItem 
            key={id}
            id={id}
            user_id={user_id}
            name={name}
            description={description}
            starting_amount={starting_amount}
            allEventDisplay={allEventDisplay}
            deleteOption={deleteOption}
            setState={props.setState}
            state={props.state}
          />
        )
      })
    )
  }

  const [displayEvent, setDisplayEvent] = useState("browseEvent");
  
  return (
    <div id="browse-inner-container">
      <div id="search-box-container">
        <div id="search-box-buttons">
          <span onClick={() => setDisplayEvent("browseEvent")}>BROWSE EVENT</span>
          <span onClick={() => setDisplayEvent("myEvent")}>MY EVENT</span>
        </div>
        <form id="search-box-search-bar">
          <input type="text" placeholder="Search Event..." name="search" />
          <button type='submit'><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
        </form>
      </div>
      <div id="event-display-container">
        {displayEvent === "browseEvent" && eventInfoDisplay(props.competitions, null, true)}

        {displayEvent === "myEvent" && <h3>Created Events</h3>}
        {displayEvent === "myEvent" && eventInfoDisplay(props.user_competitions_created, true)}
        {displayEvent === "myEvent" && <h3>Joined Events</h3>}
        {displayEvent === "myEvent" && eventInfoDisplay(props.user_competitions_enrolled)}

      </div>
    </div>
  )
}