import '../../../stylesheet/SellAlert.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

export default function SellAlert(props) {
  return (
    <div id="sell-alert-container">
      <div>
        <FontAwesomeIcon onClick={props.setDisplayAlert("")} id="container-icon" icon={faXmark} />
      </div>
      <h2>Stocks Sold Sucessfully</h2>
    </div>
  )
}