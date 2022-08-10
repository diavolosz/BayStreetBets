import '../../stylesheet/Browse.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

import BrowseListItem from './browse-content/BrowseListItem'


export default function Browse(props) {

  const eventCreatedDisplay = (data, deleteOption = false) => {
    return (
      data.map((each, index) => {
        const { id, user_id, name, description, starting_amount } = each
        return (
          <BrowseListItem 
            key={index}
            id={id}
            user_id={user_id}
            name={name}
            description={description}
            starting_amount={starting_amount}
            deleteOption={deleteOption}
            setState={props.setState}
            state={props.state}
          />
        )
      })
    )
  }

  const eventEnrolledDisplay = (data, deleteOption = false) => {
    const filteredData = (data).filter((each) => {props.user_competitions_created.includes(each)})
    return (
      filteredData.map((each, index) => {
        const { id, user_id, name, description, starting_amount } = each
        return (
          <BrowseListItem 
            key={index}
            id={id}
            user_id={user_id}
            name={name}
            description={description}
            starting_amount={starting_amount}
            deleteOption={deleteOption}
            setState={props.setState}
            state={props.state}
          />
        )
      })
    )
  }

  const eventInfoDisplay = (data) => {
    return (
      data.map((each, index) => {
        const { id, user_id, name, description, starting_amount } = each
        return (
          <BrowseListItem 
            key={index}
            id={id}
            user_id={user_id}
            name={name}
            description={description}
            starting_amount={starting_amount}
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
        {displayEvent === "myEvent" && eventCreatedDisplay(props.user_competitions_created, true)}
        {displayEvent === "myEvent" && <h3>Enrolled Events</h3>}
        {displayEvent === "myEvent" && eventEnrolledDisplay(props.user_competitions_enrolled)}

      </div>
    </div>
  )
}