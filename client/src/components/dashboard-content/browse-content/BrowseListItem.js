import axios from "axios"
import { removeFromUserCompetitionCreated, removeFromCompetitions } from '../../../helpers/selectors';

export default function BrowseListItem(props) {

// const { index, user_id, name, description, starting_amount, created } = props

  const deleteCompetition = () => {
    axios.delete("/api/competitions",
      { 
        headers: {
          user: localStorage.getItem("user")
        },
        data: {
          creatorId: props.user_id,
          competitionId: props.id
        }
      }
    )
    .then((response) => {
      const updatedCompetitionsCreated = removeFromUserCompetitionCreated(props.state, props.id);
      const updatedCompetitions = removeFromCompetitions(props.state, props.id);
      if (response.status === 200) {
        props.setState(prev => ({
          ...prev,
          user_competitions_created: updatedCompetitionsCreated,
          competitions: updatedCompetitions
        }));
      }
    });
  }

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
        {props.deleteOption === true && <button onClick={deleteCompetition}>CANCEL EVENT</button>}
      </div>
    </div>
  )
}