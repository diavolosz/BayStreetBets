import { useState } from "react"
import '../../stylesheet/Dropdown.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine } from '@fortawesome/free-solid-svg-icons'
import { getAllCompetitions } from "../../helpers/selectors"

export default function Dropdown(props) {
  const [open, setOpen] = useState(false);
  
  const toggle = () => setOpen(!open);
  const items = getAllCompetitions(props.state);

  const renderList = items.map((each, index) => {
    return (
      <li key={index} onClick={() => {

        props.setState(prev => ({
          ...prev,
          current_competition: {
            id: each.id,
            name: each.name,
            starting_amount: each.starting_amount,
            start_date: each.start_date,
            end_date: each.end_date
          }
        }))
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