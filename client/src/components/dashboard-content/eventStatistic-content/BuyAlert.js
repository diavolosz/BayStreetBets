import '../../../stylesheet/BuyAlert.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

export default function BuyAlert(props) {
  return (
    <div id="buy-alert-container">
      <div>
        <FontAwesomeIcon onClick={props.setDisplayAlert("")} id="container-icon" icon={faXmark} />
      </div>
      <h2>Stocks Bought Sucessfully</h2>
    </div>
  )
}