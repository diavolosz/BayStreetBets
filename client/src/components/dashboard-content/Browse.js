import '../../stylesheet/Browse.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

import BrowseListItem from './browse-content/BrowseListItem'
import axios from 'axios'


export default function Browse(props) {


  const eventFilterByIdHelper = (mainArray, filterItemArray1, filterItemArray2) => {
    let filtered = []
    for (let each of filterItemArray1) {
      filtered.push(each.id)
    }
    if (filterItemArray2) {
      for (let each of filterItemArray2) {
        filtered.push(each.id)
      }
    }
    let main = []
    for (let each of mainArray) {
      main.push(each.id)
    }
    let output = main.filter((each) => !filtered.includes(each))

    let outputArray = []
    for (let each of mainArray) {
      if (output.includes(each.id)) {
        outputArray.push(each)
      }
    }
    return outputArray
  }


  const eventInfoDisplay = (data, deleteOption = false) => {
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
            deleteOption={deleteOption}
            setState={props.setState}
            state={props.state}
          />
        )
      })
    )
  }

  const [displayEvent, setDisplayEvent] = useState("browseEvent");


  const [search, setSearch] = useState("")
  const [displaySearch, setDisplaySearch] = useState({})

  const handleSubmitEvent = (event) => {
    event.preventDefault()
    console.log(search)

    axios.post('/api/competitions/search', { search })
    .then((res) => {
      console.log(res.data.rows)
      setDisplaySearch(res.data.rows)
      setDisplayEvent("searchEvent")
    })

  }

  return (
    <div id="browse-inner-container">
      <div id="search-box-container">
        <div id="search-box-buttons">
          <span onClick={() => setDisplayEvent("browseEvent")}>BROWSE EVENT</span>
          <span onClick={() => setDisplayEvent("myEvent")}>MY EVENT</span>
        </div>
        <form id="search-box-search-bar" onSubmit={handleSubmitEvent}>
          <input
            type="text"
            placeholder="Search Event..."
            name="search"
            onChange={event => setSearch(event.target.value)}
            value={search}
          />
          <button type='submit'><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
        </form>
      </div>
      <div id="event-display-container">
        {displayEvent === "browseEvent" && eventInfoDisplay(eventFilterByIdHelper(props.competitions, props.user_competitions_created, props.user_competitions_enrolled), null)}

        {displayEvent === "myEvent" && <h3>Created Events</h3>}
        {displayEvent === "myEvent" && eventInfoDisplay(props.user_competitions_created, true)}
        {displayEvent === "myEvent" && <h3>Joined Events</h3>}
        {displayEvent === "myEvent" && eventInfoDisplay(props.user_competitions_enrolled)}

        {displayEvent === "searchEvent" && eventInfoDisplay(eventFilterByIdHelper(displaySearch, props.user_competitions_enrolled, props.user_competitions_enrolled), null)}

      </div>
    </div>
  )
}