import { useState } from "react"
import '../../stylesheet/Dropdown.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine } from '@fortawesome/free-solid-svg-icons'
import { getAllCompetitions } from "../../helpers/selectors"

export default function Dropdown(props) {
  const [open, setOpen] = useState(false)
  const [selection, setSelection] = useState([])
  const toggle = () => setOpen(!open)

  // const handleOnClick = () => {props.setGraph()}

  const items = getAllCompetitions(props.state);
  const renderList = items.map((each, index) => {
    return (
      <li key={index} onClick={() => {
        props.setState(prev => ({...prev, current_competition: {id: each.id, name: each.name, starting_amount:each.starting_amount}}))
      }}>
        <FontAwesomeIcon id="list-icon" icon={faChartLine} />
        <span>{each.name}</span>
      </li>
    )
  })
  return (
    <div id="dash-board-dropdown">
      <div
        role="button"
        onKeyPress={() => toggle(!open)}
        onClick={() => toggle(!open)}
      >
        <div>
          <p>{props.title}</p>
        </div>
      </div>
      {open && (
        <ul id="dash-board-dropdown-item">
          {renderList}
        </ul>
      )}
    </div>
  )
}