import '../../../stylesheet/ErrorAlert.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

export default function ErrorAlert(props) {
  return (
    <div id="sell-alert-container">
      <div>
        <FontAwesomeIcon onClick={props.setDisplayAlert("")} id="container-icon" icon={faXmark} />
      </div>
      <h2>{props.message}</h2>
    </div>
  )
}