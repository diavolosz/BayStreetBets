

export default function BrowseListItem(props) {

// const { index, user_id, name, description, starting_amount, created } = props

  return (
    <div className="event-item">
      <div className="general-info-box">
        <span><strong>Creator: </strong>{props.user_id}</span>
        {/* <span><strong>Max Participant: </strong>{participant}</span> */}
        {/* <span><strong>Duration: </strong>{duration} Days</span> */}
        <span><strong>Starting Amount: </strong>{props.starting_amount}</span>
      </div>
      <div className="description-info-box">
        <span><strong>Event Name: </strong>{props.name}</span>
        <span><strong>Description: </strong>{props.description}</span>
        {props.deleteOption === true && <button>CANCEL EVENT</button>}
      </div>
    </div>
  )
}