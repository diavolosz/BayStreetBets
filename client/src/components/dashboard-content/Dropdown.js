import { useState } from "react"
import '../../stylesheet/Dropdown.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine } from '@fortawesome/free-solid-svg-icons'

export default function Dropdown(props) {
  const [open, setOpen] = useState(false)
  const [selection, setSelection] = useState([])
  const toggle = () => setOpen(!open)

  // const handleOnClick = () => {props.setGraph()}

  const renderList = (props.items).map((each, index) => {
    return (
      <li key={index} onClick={() => {
        props.setGraph("something")
        console.log(props.graph)
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